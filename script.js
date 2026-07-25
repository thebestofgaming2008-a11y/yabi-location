const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuBackdrop = document.querySelector(".menu-backdrop");
const siteChrome = document.querySelector("#site-chrome");
const isEnglish = document.documentElement.lang?.startsWith("en");
const copy = isEnglish ? {
  expand: "Expand all <span>↓</span>",
  collapse: "Collapse all <span>↑</span>",
  unavailable: "The quote service is temporarily unavailable. Call us on 0489 82 76 77.",
  sending: "Sending your request securely...",
  tooMany: "You have sent several requests. Try again in a few minutes or call us.",
  failed: "The request could not be sent. Check your details or call us.",
  success: (reference) => `Request sent successfully. Your reference: ${reference}.`
} : {
  expand: "Tout déplier <span>↓</span>",
  collapse: "Tout replier <span>↑</span>",
  unavailable: "Le service de devis est momentanément indisponible. Appelez-nous au 0489 82 76 77.",
  sending: "Envoi sécurisé de votre demande...",
  tooMany: "Vous avez envoyé plusieurs demandes. Réessayez dans quelques minutes ou appelez-nous.",
  failed: "La demande n’a pas pu être envoyée. Vérifiez vos informations ou appelez-nous.",
  success: (reference) => `Demande envoyée avec succès. Votre référence : ${reference}.`
};

function setMenuState(isOpen) {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  navLinks?.classList.toggle("open", isOpen);
  menuBackdrop?.classList.toggle("is-visible", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  siteChrome?.classList.remove("notice-hidden");
}

menuToggle?.addEventListener("click", () => {
  setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

menuBackdrop?.addEventListener("click", () => setMenuState(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) setMenuState(false);
});

let previousScrollY = window.scrollY;
let scrollFrameRequested = false;

function updateHeaderOnScroll() {
  const currentScrollY = Math.max(window.scrollY, 0);
  const movement = currentScrollY - previousScrollY;
  const menuIsOpen = menuToggle?.getAttribute("aria-expanded") === "true";

  if (!menuIsOpen) {
    if (currentScrollY < 20 || movement < -5) {
      siteChrome?.classList.remove("notice-hidden");
    } else if (movement > 5 && currentScrollY > 80) {
      siteChrome?.classList.add("notice-hidden");
    }
  }

  previousScrollY = currentScrollY;
  scrollFrameRequested = false;
}

window.addEventListener("scroll", () => {
  if (!scrollFrameRequested) {
    scrollFrameRequested = true;
    window.requestAnimationFrame(updateHeaderOnScroll);
  }
}, { passive: true });

const startDate = document.querySelector("#start-date");
if (startDate) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  startDate.min = localDate.toISOString().slice(0, 10);
}

document.querySelectorAll(".select-vehicle").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#devis, #quote")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(
      () => document.querySelector('#quote-form input[name="name"]')?.focus(),
      650,
    );
  });
});

const showroom = document.querySelector("[data-showroom]");
if (showroom) {
  const choices = [...showroom.querySelectorAll(".showroom-choice")];
  const image = showroom.querySelector("#showroom-image");
  const previous = showroom.querySelector("#showroom-previous");
  const next = showroom.querySelector("#showroom-next");
  const count = showroom.querySelector("#showroom-view-count");
  const name = showroom.querySelector("#showroom-name");
  const format = showroom.querySelector("#showroom-format");
  const meta = showroom.querySelector("#showroom-meta");
  const price = showroom.querySelector("#showroom-price");
  const quote = showroom.querySelector("#showroom-quote");
  let activeChoice = choices[0];
  let activeView = 0;

  const getList = (key) => (activeChoice?.dataset[key] || "").split("|").filter(Boolean);

  const renderView = () => {
    const sources = getList("gallerySrcs");
    const alts = getList("galleryAlts");
    const views = getList("galleryViews");
    if (!sources.length || !image) return;

    activeView = (activeView + sources.length) % sources.length;
    image.src = sources[activeView];
    image.alt = alts[activeView] || activeChoice.dataset.galleryName || "";
    if (meta) {
      meta.textContent = [activeChoice.dataset.galleryColor, views[activeView]]
        .filter(Boolean)
        .join(" · ");
    }
    if (count) count.textContent = `${activeView + 1} / ${sources.length}`;
    if (previous) previous.disabled = sources.length < 2;
    if (next) next.disabled = sources.length < 2;
  };

  const selectChoice = (choice) => {
    activeChoice = choice;
    activeView = 0;
    choices.forEach((item) => {
      const selected = item === choice;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    if (name) name.textContent = choice.dataset.galleryName || "";
    if (format) format.textContent = choice.dataset.galleryFormat || "";
    if (price) price.textContent = choice.dataset.galleryPrice || "";
    if (quote) quote.dataset.vehicle = choice.dataset.galleryVehicle || "";
    renderView();
  };

  choices.forEach((choice) => choice.addEventListener("click", () => selectChoice(choice)));
  previous?.addEventListener("click", () => {
    activeView -= 1;
    renderView();
  });
  next?.addEventListener("click", () => {
    activeView += 1;
    renderView();
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const expandButton = document.querySelector("#expand-cgv");
let allExpanded = false;

expandButton?.addEventListener("click", () => {
  allExpanded = !allExpanded;
  document.querySelectorAll("#cgv-accordion details").forEach((detail) => {
    detail.open = allExpanded;
  });
  expandButton.innerHTML = allExpanded ? copy.collapse : copy.expand;
});

const quoteForm = document.querySelector("#quote-form");
const feedback = document.querySelector("#form-feedback");
const formStartedAt = Date.now();
let formIdempotencyKey = crypto.randomUUID();

quoteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const data = new FormData(quoteForm);
  const submitButton = quoteForm.querySelector('button[type="submit"]');
  const endpoint = quoteForm.dataset.endpoint;

  if (!endpoint) {
    if (feedback) {
      feedback.className = "form-feedback is-error";
      feedback.textContent = copy.unavailable;
    }
    return;
  }

  const payload = {
    idempotencyKey: formIdempotencyKey,
    formStartedAt,
    fullName: data.get("name"),
    company: data.get("company"),
    email: data.get("email"),
    phone: data.get("phone"),
    vehicle: "unspecified",
    duration: data.get("duration"),
    startDate: data.get("start"),
    message: data.get("message"),
    website: data.get("website"),
    consent: data.get("consent") === "on",
    pageUrl: window.location.href,
    referrer: document.referrer
  };

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
  }
  if (feedback) {
    feedback.className = "form-feedback";
    feedback.textContent = copy.sending;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      if (response.status === 429) {
        throw new Error(copy.tooMany);
      }
      throw new Error(copy.failed);
    }

    quoteForm.reset();
    formIdempotencyKey = crypto.randomUUID();
    if (feedback) {
      feedback.className = "form-feedback is-success";
      feedback.textContent = copy.success(result.reference);
    }
  } catch (error) {
    if (feedback) {
      feedback.className = "form-feedback is-error";
      feedback.textContent = `${error.message} 0489 82 76 77`;
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
  }
});
