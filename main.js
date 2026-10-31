/* =========================
   Seiten-Basis (aus dem eigenen <script src>)
========================= */
const SITE_BASE = new URL(".", document.currentScript.src);

/* =========================
   noindex nur auf *.github.io
========================= */
function isGithubPagesHost(hostname) {
  return hostname === "github.io" || hostname.endsWith(".github.io");
}

if (isGithubPagesHost(location.hostname)) {
  const robots = document.createElement("meta");
  robots.name = "robots";
  robots.content = "noindex, nofollow";
  document.head.appendChild(robots);
}

/* =========================
   Partials laden
========================= */
const NON_LOCAL_LINK = /^([a-z][a-z0-9+.-]*:|#|\/\/)/i;

function resolvePartialLinks(root) {
  root.querySelectorAll("[href], [src]").forEach((node) => {
    ["href", "src"].forEach((attr) => {
      const value = node.getAttribute(attr);
      if (value === null || NON_LOCAL_LINK.test(value)) return;
      node.setAttribute(attr, new URL(value, SITE_BASE).href);
    });
  });
}

async function loadPartial(selector, path) {
  const el = document.querySelector(selector);
  if (!el) return;
  const res = await fetch(new URL(path, SITE_BASE));
  // <template> ist inert: Bilder laden erst mit den aufgelösten Pfaden
  const template = document.createElement("template");
  template.innerHTML = await res.text();
  resolvePartialLinks(template.content);
  el.replaceChildren(template.content);
}

/* =========================
   Burger Navigation
========================= */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* =========================
   Footer Jahr
========================= */
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* =========================
   Init nach Partials
========================= */
(async function () {
  await loadPartial("#site-header", "partials/header.html");
  await loadPartial("#site-footer", "partials/footer.html");

  initNav();
  setYear();
})();

/* =========================
   DROPDOWNS (Mobile + Desktop clean)
========================= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav__link--btn");
  const dropdown = e.target.closest(".nav__dropdown");

  // Klick auf Dropdown-Button
  if (btn) {
    e.preventDefault();

    const wrap = btn.closest(".nav__dropdown");
    if (!wrap) return;

    // andere Dropdowns schließen
    document.querySelectorAll(".nav__dropdown.is-open").forEach((d) => {
      if (d !== wrap) d.classList.remove("is-open");
    });

    // aktuelles togglen
    wrap.classList.toggle("is-open");
    return;
  }

  // Klick außerhalb → alles schließen
  if (!dropdown) {
    document.querySelectorAll(".nav__dropdown.is-open").forEach((d) =>
      d.classList.remove("is-open")
    );
  }
});

// ESC → Dropdowns schließen
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".nav__dropdown.is-open").forEach((d) =>
      d.classList.remove("is-open")
    );
  }
});

/* =========================
   Fade-In on Scroll + Stagger
========================= */
document.addEventListener("DOMContentLoaded", () => {
  // Stagger für Pillars
  document.querySelectorAll(".pillars__grid").forEach((grid) => {
    grid.querySelectorAll(".pillar.reveal").forEach((el, i) => {
      el.style.setProperty("--delay", `${i * 220}ms`);
    });
  });

  const revealEls = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => io.observe(el));
});

/* =========================
   Counter Animation
========================= */
(() => {
  const nums = document.querySelectorAll(".stat__num[data-count]");
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const dur = 900;
    const t0 = performance.now();

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.floor(target * p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });

  nums.forEach((n) => io.observe(n));
})();
