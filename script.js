const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuBackdrop = document.querySelector(".menu-backdrop");
const siteChrome = document.querySelector("#site-chrome");

function setMenuState(isOpen) {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  navLinks?.classList.toggle("open", isOpen);
  menuBackdrop?.classList.toggle("is-visible", isOpen);
  if (menuBackdrop) menuBackdrop.tabIndex = isOpen ? 0 : -1;
  document.body.classList.toggle("menu-open", isOpen);
  siteChrome?.classList.remove("is-hidden");
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

function updateSiteChrome() {
  const currentScrollY = Math.max(window.scrollY, 0);
  const movement = currentScrollY - previousScrollY;
  const menuIsOpen = menuToggle?.getAttribute("aria-expanded") === "true";

  siteChrome?.classList.toggle("has-scrolled", currentScrollY > 8);
  if (!menuIsOpen) {
    if (currentScrollY < 16 || movement < -7) {
      siteChrome?.classList.remove("is-hidden");
    } else if (movement > 7 && currentScrollY > 120) {
      siteChrome?.classList.add("is-hidden");
    }
  }

  previousScrollY = currentScrollY;
  scrollFrameRequested = false;
}

window.addEventListener("scroll", () => {
  if (!scrollFrameRequested) {
    scrollFrameRequested = true;
    window.requestAnimationFrame(updateSiteChrome);
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
    const vehicleSelect = document.querySelector("#vehicle-select");
    if (vehicleSelect) vehicleSelect.value = button.dataset.vehicle || "";
    document.querySelector("#devis")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => vehicleSelect?.focus(), 650);
  });
});

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
  expandButton.innerHTML = allExpanded ? "Tout replier <span>↑</span>" : "Tout déplier <span>↓</span>";
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
      feedback.textContent = "Le service de devis est momentanément indisponible. Appelez-nous au 0489 82 76 77.";
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
    vehicle: data.get("vehicle"),
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
    feedback.textContent = "Envoi sécurisé de votre demande…";
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
        throw new Error("Vous avez envoyé plusieurs demandes. Réessayez dans quelques minutes ou appelez-nous.");
      }
      throw new Error("La demande n’a pas pu être envoyée. Vérifiez vos informations ou appelez-nous.");
    }

    quoteForm.reset();
    formIdempotencyKey = crypto.randomUUID();
    if (feedback) {
      feedback.className = "form-feedback is-success";
      feedback.textContent = `Demande envoyée avec succès. Votre référence : ${result.reference}.`;
    }
  } catch (error) {
    if (feedback) {
      feedback.className = "form-feedback is-error";
      const message = error instanceof Error ? error.message : "Une erreur inattendue est survenue.";
      feedback.textContent = `${message} 0489 82 76 77`;
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
  }
});
