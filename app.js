/* Facebook page and TikTok @area956nailartlab are confirmed.
   Instagram and Snapchat still use @area956nail until those handles are confirmed. */

const HOURS = {
  0: null,
  1: [11, 21],
  2: [11, 21],
  3: [11, 21],
  4: [11, 21],
  5: [11, 21],
  6: [10, 18],
};

const SERVICES = [
  { id: "gelx", name: "Gel-X set", minutes: 120, detail: "Soft-gel tips, your shape and length." },
  { id: "gelx-fill", name: "Gel-X fill", minutes: 75, detail: "Maintenance on a set already on your hands." },
  { id: "3d", name: "3D nail design", minutes: 150, detail: "Charms, sculpture, and hand-painted detail." },
  { id: "volcano", name: "Volcano pedicure", minutes: 75, detail: "Eruption soak, scrub, and massage." },
  { id: "pedi", name: "Classic pedicure", minutes: 50, detail: "Soak, shape, cuticle, and color." },
  { id: "mani", name: "Manicure", minutes: 45, detail: "Shape, cuticle, and polish." },
];

const ARTISTS = [
  { id: "any", name: "First available", detail: "Whoever is open on the floor." },
  { id: "rachel", name: "Rachel", detail: "Guests ask for her 3D work." },
  { id: "giselle", name: "Giselle", detail: "Named when people talk about feeling looked after." },
  { id: "lori", name: "Lori", detail: "Guests mention her by name." },
  { id: "twins", name: "The Twins", detail: "A shared chair in this demo." },
];

const KEY = "area956-demo-bookings-v1";

function t(key) {
  return window.I18N ? window.I18N.t(key) : key;
}

function locale() {
  return window.I18N && window.I18N.lang === "es" ? "es-MX" : "en-US";
}

function fill(key, values) {
  return t(key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function serviceLabel(item) {
  return item ? t("svc." + item.id) : t("fallback.service");
}

function serviceDetail(item) {
  return item ? t("svc." + item.id + ".d") : "";
}

function artistLabel(item) {
  if (!item) return t("fallback.artist");
  if (item.id === "any" || item.id === "twins") return t("artist." + item.id);
  return item.name;
}

function artistDetail(item) {
  return item ? t("artist." + item.id + ".d") : "";
}

function uid() {
  try {
    if (crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* insecure context */
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const state = {
  step: 0,
  serviceId: null,
  artistId: null,
  date: null,
  time: null,
  name: "",
  phone: "",
  note: "",
  error: "",
  lastCode: null,
};

let bookings = [];

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function ymd(date) {
  const z = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${z(date.getMonth() + 1)}-${z(date.getDate())}`;
}

function parseYMD(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function fmtTime(mins) {
  let hour = Math.floor(mins / 60);
  const minute = mins % 60;
  const es = locale().startsWith("es");
  const suffix = hour >= 12 ? (es ? "p. m." : "PM") : (es ? "a. m." : "AM");
  hour = hour % 12 || 12;
  return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function fmtDur(mins) {
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  const es = locale().startsWith("es");
  if (!hours) return `${rest} min`;
  if (!rest) return es ? `${hours} h` : hours === 1 ? "1 hr" : `${hours} hr`;
  return es ? `${hours} h ${rest} min` : `${hours} hr ${rest} min`;
}

function prettyWhen(dateStr, mins) {
  const date = parseYMD(dateStr);
  const day = date.toLocaleDateString(locale(), {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return `${day} · ${fmtTime(mins)}`;
}

function serviceById(id) {
  return SERVICES.find((item) => item.id === id) || null;
}

function artistById(id) {
  return ARTISTS.find((item) => item.id === id) || null;
}

function statusLabel(now = new Date()) {
  const span = HOURS[now.getDay()];
  if (!span) return t("hours.closedToday");
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = span[0] * 60;
  const close = span[1] * 60;
  if (mins < open) return fill("hours.opensAt", { time: fmtTime(open) });
  if (mins >= close) return t("hours.closedForToday");
  return fill("hours.openUntil", { time: fmtTime(close) });
}

function overlaps(startA, durA, startB, durB) {
  return startA < startB + durB && startB < startA + durA;
}

function loadBookings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && item.id && item.date && item.serviceId && Number.isFinite(item.time));
  } catch {
    return [];
  }
}

function saveBookings() {
  localStorage.setItem(KEY, JSON.stringify(bookings));
}

function artistBusy(artistId, date, start, duration, ignoreId) {
  return bookings.some((item) => {
    if (item.id === ignoreId || item.artistId !== artistId || item.date !== date) return false;
    const other = serviceById(item.serviceId);
    return overlaps(start, duration, item.time, other ? other.minutes : 60);
  });
}

function chairFree(date, start, duration) {
  return ARTISTS.some((artist) => artist.id !== "any" && !artistBusy(artist.id, date, start, duration));
}

function slotOpen(dateStr, start, duration, artistId) {
  if (!artistId || artistId === "any") return chairFree(dateStr, start, duration);
  return !artistBusy(artistId, dateStr, start, duration);
}

function daySlots(dateStr) {
  const service = serviceById(state.serviceId);
  if (!service) return { closed: false, slots: [] };
  const date = parseYMD(dateStr);
  const span = HOURS[date.getDay()];
  if (!span) return { closed: true, slots: [] };
  const now = new Date();
  const today = ymd(now) === dateStr;
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const slots = [];
  for (let time = span[0] * 60; time + service.minutes <= span[1] * 60; time += 30) {
    if (today && time < nowMins + 20) continue;
    slots.push({
      time,
      open: slotOpen(dateStr, time, service.minutes, state.artistId),
    });
  }
  return { closed: false, slots };
}

function upcomingDays(count = 16) {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function renderStatus() {
  const node = document.querySelector("#openState");
  if (node) node.textContent = statusLabel();
}

function renderSummary() {
  const service = serviceById(state.serviceId);
  const artist = artistById(state.artistId);
  const when = state.date && state.time != null ? prettyWhen(state.date, state.time) : "—";
  return `
    <aside class="side">
      <p class="eyebrow">${esc(t("side.eyebrow"))}</p>
      <h3>${esc(t("side.h"))}</h3>
      <dl>
        <div><dt>${esc(t("side.service"))}</dt><dd>${service ? esc(serviceLabel(service)) : "—"}</dd></div>
        <div><dt>${esc(t("side.artist"))}</dt><dd>${artist ? esc(artistLabel(artist)) : "—"}</dd></div>
        <div><dt>${esc(t("side.when"))}</dt><dd>${esc(when)}</dd></div>
        <div><dt>${esc(t("side.length"))}</dt><dd>${service ? esc(fmtDur(service.minutes)) : "—"}</dd></div>
      </dl>
      <p class="side-note">${esc(t("side.note"))}</p>
      <a class="text-link" href="https://book.squareup.com/appointments/1iek3lw8pagp03/location/LCD28Q5E4VHZA/services" target="_blank" rel="noopener">${esc(t("side.square"))}</a>
    </aside>
  `;
}

function stepButtons() {
  const labels = [t("step.service"), t("step.artist"), t("step.when"), t("step.you")];
  return `
    <ol class="steps">
      ${labels.map((label, index) => {
        const reached = index <= furthest();
        return `<li><button type="button" data-act="jump" data-step="${index}" ${reached ? "" : "disabled"} ${state.step === index ? 'aria-current="step"' : ""}>${index + 1} ${esc(label)}</button></li>`;
      }).join("")}
    </ol>
  `;
}

function furthest() {
  if (state.serviceId && state.artistId && state.date && state.time != null) return 3;
  if (state.serviceId && state.artistId) return 2;
  if (state.serviceId) return 1;
  return 0;
}

function renderStep() {
  if (state.lastCode && state.step === 4) return renderDone();
  if (state.step === 0) {
    return `
      <h3>${esc(t("ask.service"))}</h3>
      <div class="choices">
        ${SERVICES.map((service) => `
          <button type="button" class="choice" data-act="service" data-id="${service.id}" aria-pressed="${state.serviceId === service.id}">
            <strong>${esc(serviceLabel(service))}</strong>
            <span>${esc(serviceDetail(service))} · ${esc(fmtDur(service.minutes))}</span>
          </button>
        `).join("")}
      </div>
    `;
  }
  if (state.step === 1) {
    return `
      <h3>${esc(t("ask.artist"))}</h3>
      <div class="choices">
        ${ARTISTS.map((artist) => `
          <button type="button" class="choice" data-act="artist" data-id="${artist.id}" aria-pressed="${state.artistId === artist.id}">
            <strong>${esc(artistLabel(artist))}</strong>
            <span>${esc(artistDetail(artist))}</span>
          </button>
        `).join("")}
      </div>
      <div class="step-nav"><button type="button" class="btn btn-ghost" data-act="back">${esc(t("back"))}</button></div>
    `;
  }
  if (state.step === 2) {
    const days = upcomingDays();
    return `
      <h3>${esc(t("ask.when"))}</h3>
      <div class="days" role="list">
        ${days.map((date) => {
          const value = ymd(date);
          const closed = !HOURS[date.getDay()];
          const info = closed ? { slots: [] } : daySlots(value);
          const full = !closed && info.slots.length > 0 && info.slots.every((slot) => !slot.open);
          const empty = !closed && info.slots.length === 0;
          const disabled = closed || full || empty;
          const note = closed ? t("day.closed") : full || empty ? t("day.full") : date.toLocaleDateString(locale(), { month: "short" });
          return `
            <button type="button" class="day" data-act="date" data-date="${value}" ${disabled ? "disabled" : ""} aria-pressed="${state.date === value}">
              <span>${esc(date.toLocaleDateString(locale(), { weekday: "short" }))}</span>
              <strong>${date.getDate()}</strong>
              <em>${esc(note)}</em>
            </button>
          `;
        }).join("")}
      </div>
      ${renderTimes()}
      <div class="step-nav"><button type="button" class="btn btn-ghost" data-act="back">${esc(t("back"))}</button></div>
    `;
  }
  return `
    <h3>${esc(t("ask.you"))}</h3>
    <form id="guestForm" class="guest">
      <label class="field"><span>${esc(t("field.name"))}</span><input name="name" autocomplete="name" maxlength="60" required value="${esc(state.name)}"></label>
      <label class="field"><span>${esc(t("field.phone"))}</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" required value="${esc(state.phone)}"></label>
      <label class="field"><span>${esc(t("field.notes"))}</span><textarea name="note" maxlength="240" placeholder="${esc(t("field.notes.ph"))}">${esc(state.note)}</textarea></label>
      <div class="step-nav">
        <button type="button" class="btn btn-ghost" data-act="back">${esc(t("back"))}</button>
        <button type="submit" class="btn btn-pink">${esc(t("hold"))}</button>
      </div>
    </form>
  `;
}

function renderTimes() {
  if (!state.date) return `<p class="hint">${esc(t("hint.day"))}</p>`;
  const info = daySlots(state.date);
  if (info.closed) return `<p class="hint">${esc(t("hint.closed"))}</p>`;
  if (!info.slots.length) return `<p class="hint">${esc(t("hint.empty"))}</p>`;
  return `
    <div class="times">
      ${info.slots.map((slot) => `
        <button type="button" class="time" data-act="time" data-time="${slot.time}" ${slot.open ? "" : "disabled"} aria-pressed="${state.time === slot.time}">
          ${esc(fmtTime(slot.time))}
        </button>
      `).join("")}
    </div>
  `;
}

function renderDone() {
  const booking = bookings.find((item) => item.code === state.lastCode);
  if (!booking) return `<p>${esc(t("gone"))}</p>`;
  const service = serviceById(booking.serviceId);
  const artist = artistById(booking.artistId);
  return `
    <div class="done">
      <p class="eyebrow">${esc(t("done.eyebrow"))}</p>
      <h3>${esc(t("done.h"))}</h3>
      <p class="code">${esc(booking.code)}</p>
      <p>${esc(serviceLabel(service))} ${esc(t("done.with"))} ${esc(artistLabel(artist))}</p>
      <p>${esc(prettyWhen(booking.date, booking.time))} · ${esc(fmtDur(service ? service.minutes : 60))}</p>
      <p>${esc(booking.name)} · ${esc(booking.phone)}</p>
      <p class="warn">${esc(t("done.warn"))}</p>
      <button type="button" class="btn btn-pink" data-act="another">${esc(t("done.another"))}</button>
    </div>
  `;
}

function renderDesk() {
  const desk = document.querySelector("#desk");
  if (!desk) return;
  desk.innerHTML = `
    ${renderSummary()}
    <div class="desk-main">
      ${state.step === 4 ? "" : stepButtons()}
      ${renderStep()}
      <p class="form-error" ${state.error ? "" : "hidden"}>${esc(state.error)}</p>
    </div>
  `;
}

function renderList() {
  const list = document.querySelector("#bookList");
  if (!list) return;
  const ordered = [...bookings].sort((a, b) => a.date.localeCompare(b.date) || a.time - b.time);
  if (!ordered.length) {
    list.innerHTML = `<p class="empty-books">${esc(t("books.empty"))}</p>`;
    return;
  }
  list.innerHTML = `
    <div class="book-head">
      <h3>${esc(t("books.h"))}</h3>
      <button type="button" class="text-btn" id="clearBookings">${esc(t("books.clear"))}</button>
    </div>
    <ul class="book-list">
      ${ordered.map((item) => {
        const service = serviceById(item.serviceId);
        const artist = artistById(item.artistId);
        return `
          <li>
            <div>
              <strong>${esc(item.code)}</strong>
              <span>${esc(item.name)} · ${esc(serviceLabel(service))} · ${esc(artistLabel(artist))}</span>
              <span>${esc(prettyWhen(item.date, item.time))}</span>
            </div>
            <button type="button" data-remove="${esc(item.id)}">${esc(t("books.remove"))}</button>
          </li>
        `;
      }).join("")}
    </ul>
  `;
}

function makeCode() {
  let code = "";
  do {
    code = `A956-${Math.floor(1000 + Math.random() * 9000)}`;
  } while (bookings.some((item) => item.code === code));
  return code;
}

function resetFlow() {
  state.step = 0;
  state.serviceId = null;
  state.artistId = null;
  state.date = null;
  state.time = null;
  state.name = "";
  state.phone = "";
  state.note = "";
  state.error = "";
  state.lastCode = null;
}

function bindDesk() {
  const desk = document.querySelector("#desk");
  desk.addEventListener("click", (event) => {
    const button = event.target.closest("[data-act]");
    if (!button || button.disabled) return;
    const act = button.dataset.act;
    state.error = "";
    if (act === "service") {
      state.serviceId = button.dataset.id;
      if (state.date && state.time != null) {
        const info = daySlots(state.date);
        const still = info.slots.some((slot) => slot.time === state.time && slot.open);
        if (!still) state.time = null;
      }
      state.step = 1;
    } else if (act === "artist") {
      state.artistId = button.dataset.id;
      if (state.date && state.time != null && !slotOpen(state.date, state.time, serviceById(state.serviceId).minutes, state.artistId)) {
        state.time = null;
      }
      state.step = 2;
    } else if (act === "date") {
      state.date = button.dataset.date;
      if (state.time != null) {
        const info = daySlots(state.date);
        const still = info.slots.some((slot) => slot.time === state.time && slot.open);
        if (!still) state.time = null;
      }
    } else if (act === "time") {
      state.time = Number(button.dataset.time);
      state.step = 3;
    } else if (act === "back") {
      state.step = Math.max(0, state.step - 1);
    } else if (act === "jump") {
      const next = Number(button.dataset.step);
      if (next <= furthest()) state.step = next;
    } else if (act === "another") {
      resetFlow();
    }
    renderDesk();
    renderList();
  });

  desk.addEventListener("input", (event) => {
    const field = event.target;
    if (field.name && field.name in state) state[field.name] = field.value;
  });

  desk.addEventListener("submit", (event) => {
    if (event.target.id !== "guestForm") return;
    event.preventDefault();
    const data = new FormData(event.target);
    state.name = String(data.get("name") || "").trim();
    state.phone = String(data.get("phone") || "").trim();
    state.note = String(data.get("note") || "").trim();
    const digits = state.phone.replace(/\D/g, "");
    if (state.name.length < 2) {
      state.error = t("err.name");
      renderDesk();
      return;
    }
    if (digits.length < 10) {
      state.error = t("err.phone");
      renderDesk();
      return;
    }
    const service = serviceById(state.serviceId);
    if (!service || !state.artistId || !state.date || state.time == null) {
      state.error = t("err.pick");
      renderDesk();
      return;
    }
    let artistId = state.artistId;
    if (artistId === "any") {
      const free = ARTISTS.find((artist) => artist.id !== "any" && !artistBusy(artist.id, state.date, state.time, service.minutes));
      if (!free) {
        state.error = t("err.full");
        state.step = 2;
        state.time = null;
        renderDesk();
        return;
      }
      artistId = free.id;
    } else if (artistBusy(artistId, state.date, state.time, service.minutes)) {
      state.error = t("err.taken");
      state.step = 2;
      state.time = null;
      renderDesk();
      return;
    }
    const booking = {
      id: uid(),
      code: makeCode(),
      serviceId: service.id,
      artistId,
      date: state.date,
      time: state.time,
      name: state.name,
      phone: state.phone,
      note: state.note,
    };
    bookings.push(booking);
    saveBookings();
    state.lastCode = booking.code;
    state.step = 4;
    state.error = "";
    renderDesk();
    renderList();
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function bindList() {
  const list = document.querySelector("#bookList");
  list.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove]");
    if (remove) {
      bookings = bookings.filter((item) => item.id !== remove.dataset.remove);
      saveBookings();
      if (state.step < 4) renderDesk();
      renderList();
      return;
    }
    if (event.target.id === "clearBookings") {
      bookings = [];
      saveBookings();
      if (state.step < 4) renderDesk();
      renderList();
    }
  });
}

function bindNav() {
  const button = document.querySelector("#menuBtn");
  const links = document.querySelector("#navLinks");
  if (!button || !links) return;
  button.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      links.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    }
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const anchors = [...links.querySelectorAll("a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      anchors.forEach((anchor) => {
        anchor.classList.toggle("is-on", anchor.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
  sections.forEach((section) => observer.observe(section));
}

function soundLabel(entry) {
  if (!entry) return t("sound.off");
  if (entry.paused) return t("sound.play");
  return entry.muted ? t("sound.off") : t("sound.on");
}

function bindVideo() {
  const entry = document.querySelector("#entryVideo");
  const sound = document.querySelector("#soundBtn");
  if (entry) {
    entry.play().catch(() => {
      if (sound) sound.textContent = t("sound.play");
    });
  }
  if (entry && sound) {
    sound.addEventListener("click", () => {
      if (entry.paused) {
        entry.muted = false;
        entry.play();
      } else {
        entry.muted = !entry.muted;
      }
      const on = !entry.muted && !entry.paused;
      sound.textContent = soundLabel(entry);
      sound.setAttribute("aria-pressed", String(on));
    });
  }
  const shades = document.querySelector("#shadesVideo");
  if (shades) shades.play().catch(() => {});
}

document.addEventListener("area956-lang", () => {
  const entry = document.querySelector("#entryVideo");
  const sound = document.querySelector("#soundBtn");
  if (sound) sound.textContent = soundLabel(entry);
  renderStatus();
  renderDesk();
  renderList();
});

document.addEventListener("DOMContentLoaded", () => {
  bookings = loadBookings();
  renderStatus();
  bindNav();
  bindVideo();
  bindDesk();
  bindList();
  renderDesk();
  renderList();
});
