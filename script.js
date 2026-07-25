const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks?.classList.toggle("open", !isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

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
      feedback.textContent = `${error.message} 0489 82 76 77`;
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
  }
});
