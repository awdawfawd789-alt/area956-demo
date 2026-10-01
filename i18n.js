/* Auto language: Spanish if the browser asks for it, otherwise English.
   A saved EN/ES choice wins over the browser. ?lang=es or ?lang=en previews one language. */
(function () {
  const STR = {
    en: {
      "meta.title": "Area 956 Nail Art Lab · San Juan",
      "meta.desc": "Area 956 Nail Art Lab in San Juan, Texas. Gel-X, 3D nail designs, and volcano pedicures. Demo booking desk included.",
      "skip": "Skip to booking",
      "ribbon": "Demo site · a booking here stays in this browser and is not sent to the salon",
      "menu": "Menu",
      "lang.label": "Language",
      "nav.services": "Services",
      "nav.work": "Work",
      "nav.artists": "Artists",
      "nav.visit": "Visit",
      "nav.book": "Book",
      "logo.alt": "Area 956 Nail Art Lab",
      "kicker.place": "San Juan, Texas ·",
      "lede": "Gel-X, 3D designs, and volcano pedicures. Palms on the sign. A floor of 6–7 artists.",
      "wink": "Not Area 51. Close enough.",
      "cta.book": "Book a demo chair",
      "cta.sets": "See the sets",
      "marquee": "Gel-X · 3D nail art · Volcano pedicures · San Juan · Gel-X · 3D nail art · Volcano pedicures · San Juan ·",
      "svc.eyebrow": "The menu",
      "svc.h": "What they do",
      "svc.gelx.h": "Gel-X",
      "svc.gelx.p": "Full-cover soft gel tips, built to the shape and length you ask for. Come back for a fill when the grow-out shows.",
      "svc.3d.h": "3D nail designs",
      "svc.3d.p": "Charms, foil, hand-painted leaves, and sculpture. The talavera tips and the gold medal charm are the kind of set that leaves this chair.",
      "pedi.alt": "Volcano Spa eruption pedicure kit in the Romance scent",
      "svc.pedi.h": "Pedicures",
      "svc.pedi.p": "Classic pedicures, plus Volcano Spa eruption rituals. The Romance kit — bubbling soak, scrub, mask, and massage — is one they set out for the chair.",
      "gal.eyebrow": "From the chair",
      "gal.h": "Sets they already made",
      "gal.blush.alt": "Blush French tips with gold glitter lines and white leaf art",
      "gal.blush": "Blush French, gold line, white leaf",
      "gal.blue.alt": "Nude square nails with cobalt talavera tips, a flower charm, and a gold medal charm",
      "gal.blue": "Talavera tips, flower, medal charm",
      "gal.halloween.alt": "Pink Halloween nails with red splatter, striped tips, and a character decal",
      "gal.halloween": "Splatter, stripes, Halloween set",
      "shades.eyebrow": "Inside the lab",
      "shades.h": "The color board",
      "shades.p": "Glamour finger colors, cateye, and chrome. You point. They build. The film at the top of the page is a finished set from the same chair: hot pink, black, ghosts, and spiderwebs.",
      "shades.link": "Watch the clip they posted on Facebook",
      "art.eyebrow": "The floor",
      "art.h": "artists",
      "art.lead": "These are the names guests keep writing down. The bench is 6–7 artists.",
      "art.rachel": "Known for going past the ask, especially 3D roses.",
      "art.giselle": "Guests talk about how comfortable the chair feels with her.",
      "art.lori": "Named in reviews for the work and the service.",
      "art.twins": "First-timers leave saying they took their time and the sets were pretty.",
      "quote.1": "“10/10. The twins are amazing and super friendly.”",
      "quote.2": "“Rachel — I wouldn’t trade you at all.”",
      "quote.by": "Guest reviews on public listings",
      "book.eyebrow": "Demo desk",
      "book.h": "Hold a chair",
      "book.lead": "Pick a service, an artist, and a time. It saves on this device only. Area 956 is not notified, and nothing is charged.",
      "noscript": "This demo desk needs JavaScript.",
      "visit.eyebrow": "Find the lab",
      "visit.caption": "Hours from public listings. Confirm before you drive.",
      "visit.mf": "Monday – Friday",
      "visit.sat": "Saturday",
      "visit.sun": "Sunday",
      "visit.closed": "Closed",
      "visit.mf.time": "11:00 AM – 9:00 PM",
      "visit.sat.time": "10:00 AM – 6:00 PM",
      "visit.dir": "Directions",
      "visit.square": "Book on Square",
      "visit.map": "Map showing Area 956 Nail Art Lab at 302 E Business 83, Suite 12, San Juan, Texas",
      "fine": "Demo concept for the lab. Facebook is their public page. TikTok is @area956nailartlab. Instagram and Snapchat are set to @area956nail until those handles are confirmed. Hours and phone come from public listings.",
      "sound.off": "Sound off",
      "sound.on": "Sound on",
      "sound.play": "Play film",
      "hours.closedToday": "Closed today",
      "hours.opensAt": "Opens today at {time}",
      "hours.closedForToday": "Closed for today",
      "hours.openUntil": "Open today until {time}",
      "day.closed": "Closed",
      "day.full": "Full",
      "side.eyebrow": "Demo ticket",
      "side.h": "Your chair",
      "side.service": "Service",
      "side.artist": "Artist",
      "side.when": "When",
      "side.length": "Length",
      "side.note": "Priced at the chair. This desk does not charge a card and does not text the salon.",
      "side.square": "Their live Square page",
      "step.service": "Service",
      "step.artist": "Artist",
      "step.when": "When",
      "step.you": "You",
      "ask.service": "What are you coming in for?",
      "ask.artist": "Who do you want?",
      "ask.when": "Pick a day and a time",
      "ask.you": "Who should we hold it for?",
      "back": "Back",
      "hint.day": "Choose a day. Sundays are dark.",
      "hint.closed": "The lab is closed that day.",
      "hint.empty": "Nothing left that day for this service.",
      "field.name": "Name",
      "field.phone": "Phone",
      "field.notes": "Notes",
      "field.notes.ph": "Shape, length, a reference...",
      "hold": "Hold this chair",
      "gone": "That demo ticket is gone.",
      "done.eyebrow": "Demo confirmation",
      "done.h": "You're on the books.",
      "done.with": "with",
      "done.floor": "the floor",
      "done.warn": "Nothing was sent to Area 956. Call (956) 935-3072 or use Square for a real appointment.",
      "done.another": "Book another demo",
      "books.empty": "No demo appointments on this device yet.",
      "books.h": "Saved on this device",
      "books.clear": "Clear all",
      "books.remove": "Remove",
      "fallback.service": "Service",
      "fallback.artist": "Artist",
      "err.name": "Add a name.",
      "err.phone": "Add a phone number with at least 10 digits.",
      "err.pick": "Pick a service, artist, and time first.",
      "err.full": "Every chair is taken then. Pick another time.",
      "err.taken": "That chair was just taken in this demo. Pick another time.",
      "svc.gelx": "Gel-X set",
      "svc.gelx.d": "Soft-gel tips, your shape and length.",
      "svc.gelx-fill": "Gel-X fill",
      "svc.gelx-fill.d": "Maintenance on a set already on your hands.",
      "svc.3d": "3D nail design",
      "svc.3d.d": "Charms, sculpture, and hand-painted detail.",
      "svc.volcano": "Volcano pedicure",
      "svc.volcano.d": "Eruption soak, scrub, and massage.",
      "svc.pedi": "Classic pedicure",
      "svc.pedi.d": "Soak, shape, cuticle, and color.",
      "svc.mani": "Manicure",
      "svc.mani.d": "Shape, cuticle, and polish.",
      "artist.any": "First available",
      "artist.any.d": "Whoever is open on the floor.",
      "artist.rachel.d": "Guests ask for her 3D work.",
      "artist.giselle.d": "Named when people talk about feeling looked after.",
      "artist.lori.d": "Guests mention her by name.",
      "artist.twins": "The Twins",
      "artist.twins.d": "A shared chair in this demo.",
    },
    es: {
      "meta.title": "Area 956 Nail Art Lab · San Juan",
      "meta.desc": "Area 956 Nail Art Lab en San Juan, Texas. Gel-X, diseños 3D y pedicuras volcán. Incluye una recepción de citas de muestra.",
      "skip": "Saltar a la cita",
      "ribbon": "Sitio de muestra · una cita aquí se queda en este navegador y no se envía al salón",
      "menu": "Menú",
      "lang.label": "Idioma",
      "nav.services": "Servicios",
      "nav.work": "Trabajo",
      "nav.artists": "Artistas",
      "nav.visit": "Visítanos",
      "nav.book": "Agendar",
      "logo.alt": "Area 956 Nail Art Lab",
      "kicker.place": "San Juan, Texas ·",
      "lede": "Gel-X, diseños 3D y pedicuras volcán. Palmas en el letrero. Un piso de 6 a 7 artistas.",
      "wink": "No es el Área 51. Casi.",
      "cta.book": "Agendar una cita de muestra",
      "cta.sets": "Ver los sets",
      "marquee": "Gel-X · Nail art 3D · Pedicuras volcán · San Juan · Gel-X · Nail art 3D · Pedicuras volcán · San Juan ·",
      "svc.eyebrow": "El menú",
      "svc.h": "Lo que hacen",
      "svc.gelx.h": "Gel-X",
      "svc.gelx.p": "Tips de soft gel que cubren toda la uña, en la forma y el largo que pidas. Regresa a un relleno cuando se note el crecimiento.",
      "svc.3d.h": "Diseños 3D",
      "svc.3d.p": "Dijes, foil, hojas pintadas a mano y escultura. Las puntas talavera y el dije de medalla de oro son el tipo de set que sale de esta silla.",
      "pedi.alt": "Kit de pedicura Volcano Spa, aroma Romance, con remojo efervescente",
      "svc.pedi.h": "Pedicuras",
      "svc.pedi.p": "Pedicuras clásicas y rituales Volcano Spa. El kit Romance — remojo que burbujea, exfoliación, mascarilla y masaje — es uno que preparan para la silla.",
      "gal.eyebrow": "Desde la silla",
      "gal.h": "Sets que ya hicieron",
      "gal.blush.alt": "Uñas french blush con líneas de glitter dorado y hoja blanca",
      "gal.blush": "French blush, línea dorada, hoja blanca",
      "gal.blue.alt": "Uñas nude cuadradas con puntas talavera cobalto, dije de flor y medalla de oro",
      "gal.blue": "Puntas talavera, flor, dije de medalla",
      "gal.halloween.alt": "Uñas rosas de Halloween con salpicado rojo, puntas rayadas y un calco",
      "gal.halloween": "Salpicado, rayas, set de Halloween",
      "shades.eyebrow": "Dentro del laboratorio",
      "shades.h": "La tabla de colores",
      "shades.p": "Colores glamour, cateye y chrome. Tú señalas. Ellas lo arman. El video de arriba es un set terminado de la misma silla: rosa fuerte, negro, fantasmas y telarañas.",
      "shades.link": "Ver el clip que publicaron en Facebook",
      "art.eyebrow": "El piso",
      "art.h": "artistas",
      "art.lead": "Estos son los nombres que las clientas siguen anotando. El equipo es de 6 a 7 artistas.",
      "art.rachel": "Conocida por ir más allá de lo pedido, sobre todo en rosas 3D.",
      "art.giselle": "Las clientas hablan de lo cómoda que se siente la silla con ella.",
      "art.lori": "La nombran en reseñas por el trabajo y el trato.",
      "art.twins": "Quienes vienen por primera vez se van diciendo que se tomaron su tiempo y que los sets quedaron bonitos.",
      "quote.1": "“10/10. Las gemelas son increíbles y súper amables.”",
      "quote.2": "“Rachel, no te cambiaría por nada.”",
      "quote.by": "Reseñas de clientas en listados públicos",
      "book.eyebrow": "Recepción de muestra",
      "book.h": "Aparta una silla",
      "book.lead": "Elige servicio, artista y hora. Se guarda solo en este dispositivo. Area 956 no recibe aviso y no se cobra nada.",
      "noscript": "Esta recepción de muestra necesita JavaScript.",
      "visit.eyebrow": "Encuentra el laboratorio",
      "visit.caption": "Horario tomado de listados públicos. Confírmalo antes de manejar.",
      "visit.mf": "Lunes a viernes",
      "visit.sat": "Sábado",
      "visit.sun": "Domingo",
      "visit.closed": "Cerrado",
      "visit.mf.time": "11:00 a. m. – 9:00 p. m.",
      "visit.sat.time": "10:00 a. m. – 6:00 p. m.",
      "visit.dir": "Cómo llegar",
      "visit.square": "Agendar en Square",
      "visit.map": "Mapa de Area 956 Nail Art Lab en 302 E Business 83, Suite 12, San Juan, Texas",
      "fine": "Concepto de muestra para el laboratorio. Facebook es su página pública. TikTok es @area956nailartlab. Instagram y Snapchat están en @area956nail hasta confirmar esos usuarios. El horario y el teléfono salen de listados públicos.",
      "sound.off": "Sin sonido",
      "sound.on": "Con sonido",
      "sound.play": "Reproducir",
      "hours.closedToday": "Cerrado hoy",
      "hours.opensAt": "Abre hoy a las {time}",
      "hours.closedForToday": "Ya cerró por hoy",
      "hours.openUntil": "Abierto hoy hasta las {time}",
      "day.closed": "Cerrado",
      "day.full": "Lleno",
      "side.eyebrow": "Ticket de muestra",
      "side.h": "Tu silla",
      "side.service": "Servicio",
      "side.artist": "Artista",
      "side.when": "Cuándo",
      "side.length": "Duración",
      "side.note": "El precio se da en la silla. Esta recepción no cobra tarjeta ni le escribe al salón.",
      "side.square": "Su página real de Square",
      "step.service": "Servicio",
      "step.artist": "Artista",
      "step.when": "Hora",
      "step.you": "Tú",
      "ask.service": "¿Qué te vas a hacer?",
      "ask.artist": "¿Con quién quieres?",
      "ask.when": "Elige día y hora",
      "ask.you": "¿A nombre de quién la apartamos?",
      "back": "Atrás",
      "hint.day": "Elige un día. Los domingos no abren.",
      "hint.closed": "El laboratorio está cerrado ese día.",
      "hint.empty": "Ya no queda tiempo ese día para este servicio.",
      "field.name": "Nombre",
      "field.phone": "Teléfono",
      "field.notes": "Notas",
      "field.notes.ph": "Forma, largo, una referencia...",
      "hold": "Apartar esta silla",
      "gone": "Ese ticket de muestra ya no está.",
      "done.eyebrow": "Confirmación de muestra",
      "done.h": "Ya quedaste agendada.",
      "done.with": "con",
      "done.floor": "el piso",
      "done.warn": "No se envió nada a Area 956. Llama al (956) 935-3072 o usa Square para una cita de verdad.",
      "done.another": "Agendar otra muestra",
      "books.empty": "Todavía no hay citas de muestra en este dispositivo.",
      "books.h": "Guardadas en este dispositivo",
      "books.clear": "Borrar todo",
      "books.remove": "Quitar",
      "fallback.service": "Servicio",
      "fallback.artist": "Artista",
      "err.name": "Escribe un nombre.",
      "err.phone": "Escribe un teléfono de al menos 10 dígitos.",
      "err.pick": "Primero elige servicio, artista y hora.",
      "err.full": "Todas las sillas están ocupadas a esa hora. Elige otra.",
      "err.taken": "Esa silla se acaba de ocupar en esta muestra. Elige otra hora.",
      "svc.gelx": "Set de Gel-X",
      "svc.gelx.d": "Tips de soft gel, la forma y el largo que pidas.",
      "svc.gelx-fill": "Relleno de Gel-X",
      "svc.gelx-fill.d": "Mantenimiento de un set que ya traes.",
      "svc.3d": "Diseño 3D",
      "svc.3d.d": "Dijes, escultura y detalle pintado a mano.",
      "svc.volcano": "Pedicura volcán",
      "svc.volcano.d": "Remojo efervescente, exfoliación y masaje.",
      "svc.pedi": "Pedicura clásica",
      "svc.pedi.d": "Remojo, forma, cutícula y color.",
      "svc.mani": "Manicura",
      "svc.mani.d": "Forma, cutícula y esmalte.",
      "artist.any": "La primera disponible",
      "artist.any.d": "Quien esté libre en el piso.",
      "artist.rachel.d": "Las clientas piden su trabajo 3D.",
      "artist.giselle.d": "La mencionan cuando hablan de sentirse bien atendidas.",
      "artist.lori.d": "Las clientas la mencionan por su nombre.",
      "artist.twins": "Las gemelas",
      "artist.twins.d": "Una silla compartida en esta muestra.",
    },
  };

  function detect() {
    const list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    return list.some((item) => String(item).toLowerCase().startsWith("es")) ? "es" : "en";
  }

  function initial() {
    const query = new URLSearchParams(location.search).get("lang");
    if (query === "en" || query === "es") return query;
    const saved = localStorage.getItem("area956-lang");
    if (saved === "en" || saved === "es") return saved;
    return detect();
  }

  let lang = initial();

  function t(key) {
    const pack = STR[lang] || STR.en;
    return pack[key] || STR.en[key] || key;
  }

  function apply() {
    document.documentElement.lang = lang === "es" ? "es" : "en";
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.alt = t(el.dataset.i18nAlt);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.title = t(el.dataset.i18nTitle);
    });
    document.querySelectorAll("[data-i18n-label]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nLabel));
    });
    document.querySelectorAll("[data-set-lang]").forEach((button) => {
      const on = button.dataset.setLang === lang;
      button.classList.toggle("is-on", on);
      button.setAttribute("aria-pressed", String(on));
    });
  }

  function setLang(next, persist) {
    if (next !== "en" && next !== "es") return;
    lang = next;
    if (persist !== false) localStorage.setItem("area956-lang", next);
    apply();
    document.dispatchEvent(new CustomEvent("area956-lang"));
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-set-lang]");
    if (!button) return;
    setLang(button.dataset.setLang, true);
  });

  document.addEventListener("DOMContentLoaded", apply);

  window.I18N = {
    get lang() { return lang; },
    t,
    setLang,
    apply,
  };
})();
