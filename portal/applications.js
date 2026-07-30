(() => {
  const apiBase = document.body.dataset.apiBase.replace(/\/$/, "");
  const tokenKey = "yabi_portal_session";
  const languageKey = "yabi_portal_language";
  const copy = {
    fr: {
      Portal: "Portail",
      "Choose how you want to continue.": "Choisissez comment continuer.",
      "Log in": "Se connecter",
      "I already have an access code": "J’ai déjà un code d’accès",
      "New account": "Nouveau dossier",
      "I want to submit a rental application": "Je souhaite introduire une demande de location",
      "Rental application": "Demande de location",
      "Contract holder": "Le locataire",
      "This information is required to prepare the rental contract.": "Ces informations sont nécessaires pour préparer le contrat de location.",
      "Full name or company": "Nom et prénom / Société",
      Address: "Adresse",
      Phone: "Téléphone",
      "Identity card number": "N° de carte d’identité",
      "National register number": "N° de registre national",
      Email: "E-mail",
      Drivers: "Conducteurs",
      "Every driver must be at least 23. Take clear live photos of both sides of the identity card and driving licence.": "Chaque conducteur doit avoir au moins 23 ans. Prenez des photos nettes, en direct, du recto et du verso de la carte d’identité et du permis.",
      "Add another driver": "Ajouter un conducteur",
      "Check and submit": "Vérifier et envoyer",
      "The YABI administrator will review the information and prepare the contract outside the portal. Submitting does not confirm a rental.": "L’administrateur YABI vérifiera les informations et préparera le contrat en dehors du portail. L’envoi ne confirme pas la location.",
      "I confirm the information is correct and allow YABI Location to use it and the document photos to prepare and manage my rental contract.": "Je confirme que les informations sont correctes et j’autorise YABI Location à les utiliser, ainsi que les photos des documents, pour préparer et gérer mon contrat de location.",
      Previous: "Précédent",
      Continue: "Continuer",
      "Submit application": "Envoyer la demande",
      "Application sent": "Demande envoyée",
      "Your information has been sent to YABI Location. The team will contact you after reviewing it.": "Vos informations ont été envoyées à YABI Location. L’équipe vous contactera après vérification.",
      "Back to portal": "Retour au portail",
      "Live camera": "Appareil photo en direct",
      "Place the whole document inside the frame. Make sure every detail is sharp and readable.": "Placez le document entier dans le cadre. Tous les détails doivent être nets et lisibles.",
      Retake: "Reprendre",
      "Take photo": "Prendre la photo",
      "Use photo": "Utiliser la photo",
      "Try camera again": "Réessayer l’appareil photo",
      "Camera permission is blocked. Allow Camera for yabi-location.pages.dev in your browser settings, then try again. If this page is open inside another app, open it in Chrome or Safari.": "L’accès à l’appareil photo est bloqué. Autorisez l’appareil photo pour yabi-location.pages.dev dans les réglages du navigateur, puis réessayez. Si la page est ouverte dans une autre application, ouvrez-la dans Chrome ou Safari.",
      "This browser cannot use the camera here. Open the portal directly in Chrome or Safari.": "Ce navigateur ne peut pas utiliser l’appareil photo ici. Ouvrez directement le portail dans Chrome ou Safari.",
      "The photo could not be prepared. Retake it and try again.": "La photo n’a pas pu être préparée. Reprenez-la puis réessayez.",
      "The secure upload was rejected. Keep this photo and tap Use photo again.": "L’envoi sécurisé a été refusé. Gardez cette photo et appuyez de nouveau sur Utiliser la photo.",
      "Main driver": "Conducteur principal",
      "Additional driver": "Conducteur supplémentaire",
      "Same information as contract holder": "Mêmes informations que le locataire",
      "Full name": "Nom et prénom",
      "Driving licence number": "N° de permis de conduire",
      "Licence issue date": "Date de délivrance du permis",
      "Licence valid since": "Permis valable depuis le",
      "I confirm this driver is at least 23 years old.": "Je confirme que ce conducteur est âgé d’au moins 23 ans.",
      "Identity card — front": "Carte d’identité — recto",
      "Identity card — back": "Carte d’identité — verso",
      "Driving licence — front": "Permis de conduire — recto",
      "Driving licence — back": "Permis de conduire — verso",
      "Open camera": "Ouvrir l’appareil photo",
      "Photo ready": "Photo prête",
      Remove: "Supprimer",
      "Camera access is required. Allow camera permission and try again.": "L’accès à l’appareil photo est obligatoire. Autorisez-le puis réessayez.",
      "Check all required fields.": "Vérifiez tous les champs obligatoires.",
      "Add all four clear document photos for every driver.": "Ajoutez les quatre photos nettes pour chaque conducteur.",
      "Starting secure application…": "Ouverture du dossier sécurisé…",
      "Uploading photo…": "Envoi de la photo…",
      "Sending application…": "Envoi de la demande…",
      "Something went wrong. Please try again.": "Une erreur s’est produite. Veuillez réessayer.",
      "Your secure application expired. Start again.": "Votre dossier sécurisé a expiré. Recommencez.",
      "Application reference": "Référence de la demande",
      "Drivers included": "Conducteurs inclus",
      "Document photos": "Photos des documents",
      Complete: "Complet",
      Applications: "Demandes",
      Reference: "Référence",
      Customer: "Client",
      Status: "Statut",
      View: "Voir",
      "No applications": "Aucune demande",
      Application: "Demande",
      "Name / company": "Nom / société",
      "Identity card": "Carte d’identité",
      "Driving licence": "Permis de conduire",
      Issued: "Délivré le",
      "Valid since": "Valable depuis",
      "Internal notes": "Notes internes",
      "Mark contacted": "Marquer contacté",
      "Mark agreed": "Marquer accepté",
      "Create client access": "Créer l’accès client",
      Reject: "Refuser",
      "Could not load applications": "Impossible de charger les demandes",
    },
    nl: {
      Portal: "Portaal",
      "Choose how you want to continue.": "Kies hoe u wilt doorgaan.",
      "Log in": "Aanmelden",
      "I already have an access code": "Ik heb al een toegangscode",
      "New account": "Nieuwe aanvraag",
      "I want to submit a rental application": "Ik wil een huuraanvraag indienen",
      "Rental application": "Huuraanvraag",
      "Contract holder": "Contracthouder",
      "This information is required to prepare the rental contract.": "Deze informatie is nodig om het huurcontract op te stellen.",
      "Full name or company": "Naam en voornaam / Bedrijf",
      Address: "Adres",
      Phone: "Telefoon",
      "Identity card number": "Identiteitskaartnummer",
      "National register number": "Rijksregisternummer",
      Email: "E-mail",
      Drivers: "Bestuurders",
      "Every driver must be at least 23. Take clear live photos of both sides of the identity card and driving licence.": "Elke bestuurder moet minstens 23 jaar zijn. Maak duidelijke livefoto’s van de voor- en achterkant van identiteitskaart en rijbewijs.",
      "Add another driver": "Bestuurder toevoegen",
      "Check and submit": "Controleren en verzenden",
      "The YABI administrator will review the information and prepare the contract outside the portal. Submitting does not confirm a rental.": "De YABI-beheerder controleert de informatie en maakt het contract buiten het portaal. Indienen bevestigt geen huur.",
      "I confirm the information is correct and allow YABI Location to use it and the document photos to prepare and manage my rental contract.": "Ik bevestig dat de informatie correct is en geef YABI Location toestemming om deze gegevens en documentfoto’s te gebruiken voor mijn huurcontract.",
      Previous: "Vorige",
      Continue: "Doorgaan",
      "Submit application": "Aanvraag verzenden",
      "Application sent": "Aanvraag verzonden",
      "Your information has been sent to YABI Location. The team will contact you after reviewing it.": "Uw informatie is naar YABI Location verzonden. Het team neemt na controle contact met u op.",
      "Back to portal": "Terug naar portaal",
      "Live camera": "Livecamera",
      "Place the whole document inside the frame. Make sure every detail is sharp and readable.": "Plaats het volledige document in het kader. Zorg dat alles scherp en leesbaar is.",
      Retake: "Opnieuw",
      "Take photo": "Foto nemen",
      "Use photo": "Foto gebruiken",
      "Try camera again": "Camera opnieuw proberen",
      "Camera permission is blocked. Allow Camera for yabi-location.pages.dev in your browser settings, then try again. If this page is open inside another app, open it in Chrome or Safari.": "Cameratoegang is geblokkeerd. Sta Camera toe voor yabi-location.pages.dev in de browserinstellingen en probeer opnieuw. Staat deze pagina in een andere app open, open ze dan in Chrome of Safari.",
      "This browser cannot use the camera here. Open the portal directly in Chrome or Safari.": "Deze browser kan de camera hier niet gebruiken. Open het portaal rechtstreeks in Chrome of Safari.",
      "The photo could not be prepared. Retake it and try again.": "De foto kon niet worden voorbereid. Neem hem opnieuw en probeer nogmaals.",
      "The secure upload was rejected. Keep this photo and tap Use photo again.": "De beveiligde upload werd geweigerd. Bewaar deze foto en tik opnieuw op Foto gebruiken.",
      "Main driver": "Hoofdbestuurder",
      "Additional driver": "Extra bestuurder",
      "Same information as contract holder": "Zelfde gegevens als contracthouder",
      "Full name": "Naam en voornaam",
      "Driving licence number": "Rijbewijsnummer",
      "Licence issue date": "Afgiftedatum rijbewijs",
      "Licence valid since": "Rijbewijs geldig sinds",
      "I confirm this driver is at least 23 years old.": "Ik bevestig dat deze bestuurder minstens 23 jaar is.",
      "Identity card — front": "Identiteitskaart — voorkant",
      "Identity card — back": "Identiteitskaart — achterkant",
      "Driving licence — front": "Rijbewijs — voorkant",
      "Driving licence — back": "Rijbewijs — achterkant",
      "Open camera": "Camera openen",
      "Photo ready": "Foto klaar",
      Remove: "Verwijderen",
      "Camera access is required. Allow camera permission and try again.": "Cameratoegang is verplicht. Geef toestemming en probeer opnieuw.",
      "Check all required fields.": "Controleer alle verplichte velden.",
      "Add all four clear document photos for every driver.": "Voeg voor elke bestuurder vier duidelijke documentfoto’s toe.",
      "Starting secure application…": "Beveiligde aanvraag wordt gestart…",
      "Uploading photo…": "Foto wordt verzonden…",
      "Sending application…": "Aanvraag wordt verzonden…",
      "Something went wrong. Please try again.": "Er is iets misgegaan. Probeer opnieuw.",
      "Your secure application expired. Start again.": "Uw beveiligde aanvraag is verlopen. Begin opnieuw.",
      "Application reference": "Aanvraagreferentie",
      "Drivers included": "Bestuurders",
      "Document photos": "Documentfoto’s",
      Complete: "Volledig",
      Applications: "Aanvragen",
      Reference: "Referentie",
      Customer: "Klant",
      Status: "Status",
      View: "Bekijken",
      "No applications": "Geen aanvragen",
      Application: "Aanvraag",
      "Name / company": "Naam / bedrijf",
      "Identity card": "Identiteitskaart",
      "Driving licence": "Rijbewijs",
      Issued: "Afgegeven",
      "Valid since": "Geldig sinds",
      "Internal notes": "Interne notities",
      "Mark contacted": "Markeer gecontacteerd",
      "Mark agreed": "Markeer akkoord",
      "Create client access": "Klanttoegang aanmaken",
      Reject: "Weigeren",
      "Could not load applications": "Aanvragen konden niet worden geladen",
    },
  };

  const ui = {
    screen: document.querySelector("#login-screen"),
    panel: document.querySelector(".login-panel"),
    card: document.querySelector(".login-card"),
    entry: document.querySelector("#portal-entry"),
    login: document.querySelector("#login-flow"),
    application: document.querySelector("#application-flow"),
    success: document.querySelector("#application-success"),
    form: document.querySelector("#application-form"),
    pages: [...document.querySelectorAll("[data-application-page]")],
    step: document.querySelector("#application-step"),
    reference: document.querySelector("#application-reference"),
    drivers: document.querySelector("#driver-list"),
    addDriver: document.querySelector("#add-driver"),
    previous: document.querySelector("#application-previous"),
    next: document.querySelector("#application-next"),
    submit: document.querySelector("#application-submit"),
    message: document.querySelector("#application-message"),
    summary: document.querySelector("#application-summary"),
    successReference: document.querySelector("#success-reference"),
    camera: document.querySelector("#camera-dialog"),
    cameraTitle: document.querySelector("#camera-title"),
    cameraVideo: document.querySelector("#camera-video"),
    cameraStage: document.querySelector(".camera-stage"),
    cameraCanvas: document.querySelector("#camera-canvas"),
    cameraPreview: document.querySelector("#camera-preview"),
    cameraStatus: document.querySelector("#camera-status"),
    cameraClose: document.querySelector("#camera-close"),
    cameraCapture: document.querySelector("#camera-capture"),
    cameraRetake: document.querySelector("#camera-retake"),
    cameraConfirm: document.querySelector("#camera-confirm"),
  };

  const documentTypes = [
    ["identity_front", "Identity card — front"],
    ["identity_back", "Identity card — back"],
    ["licence_front", "Driving licence — front"],
    ["licence_back", "Driving licence — back"],
  ];

  const applicationState = {
    language: ["en", "fr", "nl"].includes(localStorage.getItem(languageKey))
      ? localStorage.getItem(languageKey)
      : "en",
    page: 1,
    applicationId: "",
    applicationToken: "",
    reference: "",
    stream: null,
    activeCapture: null,
    captureBlob: null,
    captureUrl: "",
    drivers: [makeDriver("main")],
  };

  function makeDriver(kind) {
    return {
      clientKey: crypto.randomUUID(),
      kind,
      fullName: "",
      phone: "",
      identityCardNumber: "",
      nationalRegisterNumber: "",
      drivingLicenceNumber: "",
      licenceIssueDate: "",
      licenceValidSince: "",
      ageConfirmed: false,
      photos: {},
    };
  }

  function t(value) {
    return copy[applicationState.language]?.[value] || value;
  }

  function escape(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function nationalRegisterNumberValid(value = "") {
    return (
      /^[0-9.\s/-]+$/.test(value) &&
      value.replace(/\D/g, "").length === 11
    );
  }

  async function publicApi(path, body) {
    const response = await fetch(`${apiBase}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      const error = new Error(result.error || "request_failed");
      error.status = response.status;
      throw error;
    }
    return result;
  }

  function showFlow(name) {
    ui.entry.hidden = name !== "entry";
    ui.login.hidden = name !== "login";
    ui.application.hidden = name !== "signup";
    ui.success.hidden = name !== "success";
    ui.panel.classList.toggle("application-mode", name === "signup");
    ui.card.classList.toggle("wide", name === "signup");
    if (name === "signup") {
      setPage(1);
      renderDrivers();
    }
  }

  function translateApplicantUi() {
    document.querySelectorAll("[data-app-i18n]").forEach((node) => {
      const key = node.dataset.appI18n;
      if (node.matches("input[placeholder]")) node.placeholder = t(key);
      else node.textContent = t(key);
    });
    if (!ui.application.hidden) {
      syncDrivers();
      renderDrivers();
      if (applicationState.page === 3) renderSummary();
    }
  }

  function field(label, name, value, type = "text") {
    const inputMode =
      type === "tel"
        ? 'inputmode="tel"'
        : name === "nationalRegisterNumber"
          ? 'inputmode="numeric" autocomplete="off" maxlength="24"'
          : "";
    return `<label class="app-field"><span>${escape(t(label))}</span><input name="${escape(name)}" type="${type}" value="${escape(value)}" ${inputMode} required></label>`;
  }

  function renderDrivers() {
    ui.drivers.innerHTML = applicationState.drivers
      .map((driver, index) => {
        const title = driver.kind === "main" ? "Main driver" : "Additional driver";
        return `<article class="driver-card" data-driver-key="${escape(driver.clientKey)}">
          <div class="driver-head"><h3>${escape(t(title))} ${driver.kind === "additional" ? index + 1 : ""}</h3>
          ${driver.kind === "additional" ? `<button type="button" data-remove-driver="${escape(driver.clientKey)}">${escape(t("Remove"))}</button>` : ""}</div>
          ${driver.kind === "main" ? `<label class="same-holder"><input type="checkbox" data-same-holder><span>${escape(t("Same information as contract holder"))}</span></label>` : ""}
          <div class="application-grid">
            ${field("Full name", "fullName", driver.fullName)}
            ${field("Phone", "phone", driver.phone, "tel")}
            ${field("Identity card number", "identityCardNumber", driver.identityCardNumber)}
            ${field("National register number", "nationalRegisterNumber", driver.nationalRegisterNumber)}
            ${field("Driving licence number", "drivingLicenceNumber", driver.drivingLicenceNumber)}
            ${field("Licence issue date", "licenceIssueDate", driver.licenceIssueDate, "date")}
            ${field("Licence valid since", "licenceValidSince", driver.licenceValidSince, "date")}
          </div>
          <label class="age-check"><input type="checkbox" name="ageConfirmed" ${driver.ageConfirmed ? "checked" : ""} required><span>${escape(t("I confirm this driver is at least 23 years old."))}</span></label>
          <div class="document-grid">${documentTypes.map(([category, label]) => {
            const photo = driver.photos[category];
            return `<div class="document-capture"><span>${escape(t(label))}</span><button class="capture-button ${photo ? "complete" : ""}" type="button" data-camera-driver="${escape(driver.clientKey)}" data-camera-category="${category}">
              ${photo ? `<img src="${escape(photo.previewUrl)}" alt="">` : '<img alt="" aria-hidden="true">'}
              <span><strong>${escape(t(photo ? "Photo ready" : "Open camera"))}</strong><small>${escape(t(label))}</small></span>
            </button></div>`;
          }).join("")}</div>
        </article>`;
      })
      .join("");
  }

  function syncDrivers() {
    ui.drivers.querySelectorAll("[data-driver-key]").forEach((card) => {
      const driver = applicationState.drivers.find(
        (item) => item.clientKey === card.dataset.driverKey,
      );
      if (!driver) return;
      [
        "fullName",
        "phone",
        "identityCardNumber",
        "nationalRegisterNumber",
        "drivingLicenceNumber",
        "licenceIssueDate",
        "licenceValidSince",
      ].forEach((key) => {
        driver[key] = card.querySelector(`[name="${key}"]`)?.value.trim() || "";
      });
      driver.ageConfirmed = card.querySelector('[name="ageConfirmed"]')?.checked === true;
    });
  }

  function validatePage() {
    ui.message.textContent = "";
    if (applicationState.page === 1) {
      const fields = [...ui.pages[0].querySelectorAll("input")];
      const valid = fields.every((input) => {
        const okay =
          input.checkValidity() &&
          (input.name !== "holderNationalRegisterNumber" ||
            nationalRegisterNumberValid(input.value));
        input.setAttribute("aria-invalid", String(!okay));
        return okay;
      });
      if (!valid) ui.message.textContent = t("Check all required fields.");
      return valid;
    }
    if (applicationState.page === 2) {
      syncDrivers();
      const missingFields = applicationState.drivers.some(
        (driver) =>
          !driver.fullName ||
          !driver.phone ||
          !driver.identityCardNumber ||
          !nationalRegisterNumberValid(driver.nationalRegisterNumber) ||
          !driver.drivingLicenceNumber ||
          !driver.licenceIssueDate ||
          !driver.licenceValidSince ||
          !driver.ageConfirmed,
      );
      if (missingFields) {
        ui.message.textContent = t("Check all required fields.");
        return false;
      }
      const missingPhotos = applicationState.drivers.some((driver) =>
        documentTypes.some(([category]) => !driver.photos[category]),
      );
      if (missingPhotos) {
        ui.message.textContent = t("Add all four clear document photos for every driver.");
        return false;
      }
    }
    return true;
  }

  function setPage(page) {
    applicationState.page = page;
    ui.pages.forEach((section) => {
      section.hidden = Number(section.dataset.applicationPage) !== page;
    });
    ui.step.textContent = `${page} / 3`;
    ui.previous.hidden = page === 1;
    ui.next.hidden = page === 3;
    ui.submit.hidden = page !== 3;
    ui.message.textContent = "";
    if (page === 3) renderSummary();
  }

  function renderSummary() {
    const holder = new FormData(ui.form);
    ui.summary.innerHTML = [
      [t("Contract holder"), holder.get("holderNameOrCompany")],
      [
        t("National register number"),
        holder.get("holderNationalRegisterNumber"),
      ],
      [t("Email"), holder.get("holderEmail")],
      [t("Drivers included"), applicationState.drivers.length],
      [t("Document photos"), `${applicationState.drivers.length * 4} · ${t("Complete")}`],
    ]
      .map(
        ([label, value]) =>
          `<div class="summary-row"><span>${escape(label)}</span><strong>${escape(value)}</strong></div>`,
      )
      .join("");
  }

  async function ensureApplication() {
    if (applicationState.applicationToken) return;
    ui.cameraStatus.textContent = t("Starting secure application…");
    const started = await publicApi("/api/portal/applications/start", {
      locale: applicationState.language,
    });
    applicationState.applicationId = started.applicationId;
    applicationState.applicationToken = started.applicationToken;
    applicationState.reference = started.reference;
    ui.reference.textContent = started.reference;
  }

  async function openCamera(driverClientKey, category) {
    ui.cameraStatus.textContent = "";
    applicationState.activeCapture = { driverClientKey, category };
    const label = documentTypes.find(([value]) => value === category)?.[1] || "Document photo";
    ui.cameraTitle.textContent = t(label);
    resetCameraPreview();
    ui.camera.showModal();
    await requestCamera();
  }

  async function requestCamera() {
    stopCamera();
    ui.cameraStatus.textContent = "";
    ui.cameraCapture.disabled = true;
    ui.cameraCapture.textContent = t("Take photo");
    try {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
        throw new DOMException("Camera unavailable", "NotSupportedError");
      }
      applicationState.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1440 },
        },
      });
      ui.cameraVideo.srcObject = applicationState.stream;
      await ui.cameraVideo.play();
      const width = ui.cameraVideo.videoWidth;
      const height = ui.cameraVideo.videoHeight;
      if (width && height) {
        ui.cameraStage.style.setProperty("--camera-ratio", `${width} / ${height}`);
      }
      ui.cameraStatus.textContent = "";
      ui.cameraCapture.disabled = false;
      ui.cameraCapture.dataset.cameraMode = "capture";
    } catch (error) {
      stopCamera();
      const unsupported =
        error?.name === "NotSupportedError" ||
        !window.isSecureContext ||
        !navigator.mediaDevices?.getUserMedia;
      ui.cameraStatus.textContent = t(
        unsupported
          ? "This browser cannot use the camera here. Open the portal directly in Chrome or Safari."
          : "Camera permission is blocked. Allow Camera for yabi-location.pages.dev in your browser settings, then try again. If this page is open inside another app, open it in Chrome or Safari.",
      );
      ui.cameraCapture.disabled = false;
      ui.cameraCapture.dataset.cameraMode = "retry";
      ui.cameraCapture.textContent = t("Try camera again");
    }
  }

  function stopCamera() {
    applicationState.stream?.getTracks().forEach((track) => track.stop());
    applicationState.stream = null;
    ui.cameraVideo.srcObject = null;
  }

  function resetCameraPreview() {
    if (applicationState.captureUrl) URL.revokeObjectURL(applicationState.captureUrl);
    applicationState.captureBlob = null;
    applicationState.captureUrl = "";
    ui.cameraVideo.hidden = false;
    ui.cameraPreview.hidden = true;
    ui.cameraCanvas.hidden = true;
    ui.cameraCapture.hidden = false;
    ui.cameraCapture.disabled = false;
    ui.cameraCapture.dataset.cameraMode = applicationState.stream ? "capture" : "retry";
    ui.cameraCapture.textContent = t(
      applicationState.stream ? "Take photo" : "Try camera again",
    );
    ui.cameraRetake.hidden = true;
    ui.cameraConfirm.hidden = true;
  }

  function takePhoto() {
    const width = ui.cameraVideo.videoWidth;
    const height = ui.cameraVideo.videoHeight;
    if (width < 640 || height < 480) {
      ui.cameraStatus.textContent = t("Camera access is required. Allow camera permission and try again.");
      return;
    }
    const maximum = 2400;
    const scale = Math.min(1, maximum / Math.max(width, height));
    ui.cameraCanvas.width = Math.round(width * scale);
    ui.cameraCanvas.height = Math.round(height * scale);
    ui.cameraCanvas
      .getContext("2d", { alpha: false })
      .drawImage(ui.cameraVideo, 0, 0, ui.cameraCanvas.width, ui.cameraCanvas.height);
    ui.cameraCanvas.toBlob(
      (blob) => {
        if (!blob) {
          ui.cameraStatus.textContent = t(
            "The photo could not be prepared. Retake it and try again.",
          );
          return;
        }
        applicationState.captureBlob = blob;
        applicationState.captureUrl = URL.createObjectURL(blob);
        ui.cameraPreview.src = applicationState.captureUrl;
        ui.cameraVideo.hidden = true;
        ui.cameraPreview.hidden = false;
        ui.cameraCapture.hidden = true;
        ui.cameraRetake.hidden = false;
        ui.cameraConfirm.hidden = false;
      },
      "image/jpeg",
      0.92,
    );
  }

  async function confirmPhoto() {
    const capture = applicationState.activeCapture;
    const blob = applicationState.captureBlob;
    if (!capture || !blob) return;
    ui.cameraConfirm.disabled = true;
    ui.cameraStatus.textContent = t("Uploading photo…");
    try {
      await ensureApplication();
      const capturedAt = Date.now();
      const prepared = await publicApi("/api/portal/applications/upload", {
        applicationToken: applicationState.applicationToken,
        driverClientKey: capture.driverClientKey,
        category: capture.category,
        contentType: blob.type,
        size: blob.size,
        width: ui.cameraCanvas.width,
        height: ui.cameraCanvas.height,
        capturedAt,
      });
      const response = await fetch(prepared.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": blob.type },
        body: blob,
      });
      if (!response.ok) throw new Error("upload_failed");
      syncDrivers();
      const driver = applicationState.drivers.find(
        (item) => item.clientKey === capture.driverClientKey,
      );
      const persistentPreview = URL.createObjectURL(blob);
      const previous = driver.photos[capture.category];
      if (previous?.previewUrl) URL.revokeObjectURL(previous.previewUrl);
      driver.photos[capture.category] = {
        mediaId: prepared.mediaId,
        previewUrl: persistentPreview,
        capturedAt,
      };
      stopCamera();
      ui.camera.close();
      resetCameraPreview();
      renderDrivers();
    } catch (error) {
      ui.cameraStatus.textContent =
        error.message === "application_unauthorized"
          ? t("Your secure application expired. Start again.")
          : error.message === "invalid_capture" ||
              error.message === "invalid_file_type"
            ? t("The photo could not be prepared. Retake it and try again.")
            : t(
                "The secure upload was rejected. Keep this photo and tap Use photo again.",
              );
    } finally {
      ui.cameraConfirm.disabled = false;
    }
  }

  function driverPayload() {
    syncDrivers();
    return applicationState.drivers.map((driver, index) => ({
      clientKey: driver.clientKey,
      kind: driver.kind,
      sortOrder: index,
      fullName: driver.fullName,
      phone: driver.phone,
      identityCardNumber: driver.identityCardNumber,
      nationalRegisterNumber: driver.nationalRegisterNumber,
      drivingLicenceNumber: driver.drivingLicenceNumber,
      licenceIssueDate: driver.licenceIssueDate,
      licenceValidSince: driver.licenceValidSince,
      ageConfirmed: driver.ageConfirmed,
    }));
  }

  document.addEventListener("click", (event) => {
    const mode = event.target.closest("[data-entry-mode]");
    if (mode) {
      showFlow(mode.dataset.entryMode);
      return;
    }
    const back = event.target.closest("[data-entry-back]");
    if (back) {
      showFlow("entry");
      return;
    }
    const language = event.target.closest("[data-language]");
    if (language) {
      applicationState.language = language.dataset.language;
      translateApplicantUi();
    }
    const camera = event.target.closest("[data-camera-driver]");
    if (camera) {
      syncDrivers();
      openCamera(camera.dataset.cameraDriver, camera.dataset.cameraCategory);
    }
    const remove = event.target.closest("[data-remove-driver]");
    if (remove) {
      syncDrivers();
      applicationState.drivers = applicationState.drivers.filter(
        (driver) => driver.clientKey !== remove.dataset.removeDriver,
      );
      renderDrivers();
    }
  });

  ui.drivers.addEventListener("change", (event) => {
    if (!event.target.matches("[data-same-holder]") || !event.target.checked) return;
    const card = event.target.closest("[data-driver-key]");
    card.querySelector('[name="fullName"]').value =
      ui.form.elements.holderNameOrCompany.value;
    card.querySelector('[name="phone"]').value = ui.form.elements.holderPhone.value;
    card.querySelector('[name="identityCardNumber"]').value =
      ui.form.elements.holderIdentityCardNumber.value;
    card.querySelector('[name="nationalRegisterNumber"]').value =
      ui.form.elements.holderNationalRegisterNumber.value;
    syncDrivers();
  });

  ui.addDriver.addEventListener("click", () => {
    syncDrivers();
    if (applicationState.drivers.length >= 6) return;
    applicationState.drivers.push(makeDriver("additional"));
    renderDrivers();
  });
  ui.next.addEventListener("click", () => {
    if (validatePage()) setPage(applicationState.page + 1);
  });
  ui.previous.addEventListener("click", () => setPage(applicationState.page - 1));
  ui.cameraClose.addEventListener("click", () => {
    stopCamera();
    ui.camera.close();
    resetCameraPreview();
  });
  ui.camera.addEventListener("cancel", (event) => {
    event.preventDefault();
    stopCamera();
    ui.camera.close();
    resetCameraPreview();
  });
  ui.cameraCapture.addEventListener("click", () => {
    if (
      ui.cameraCapture.dataset.cameraMode === "retry" ||
      !applicationState.stream
    ) {
      requestCamera();
      return;
    }
    takePhoto();
  });
  ui.cameraRetake.addEventListener("click", () => {
    resetCameraPreview();
    ui.cameraStatus.textContent = "";
  });
  ui.cameraConfirm.addEventListener("click", confirmPhoto);

  ui.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validatePage() || !ui.form.elements.privacyAccepted.checked) {
      ui.message.textContent = t("Check all required fields.");
      return;
    }
    ui.submit.disabled = true;
    ui.message.textContent = t("Sending application…");
    try {
      if (!applicationState.applicationToken) await ensureApplication();
      const form = new FormData(ui.form);
      const result = await publicApi("/api/portal/applications/submit", {
        applicationToken: applicationState.applicationToken,
        holderNameOrCompany: form.get("holderNameOrCompany"),
        holderAddress: form.get("holderAddress"),
        holderPhone: form.get("holderPhone"),
        holderIdentityCardNumber: form.get("holderIdentityCardNumber"),
        holderNationalRegisterNumber: form.get(
          "holderNationalRegisterNumber",
        ),
        holderEmail: form.get("holderEmail"),
        privacyAccepted: form.get("privacyAccepted") === "on",
        drivers: driverPayload(),
      });
      ui.successReference.textContent = `${t("Application reference")}: ${result.reference}`;
      showFlow("success");
    } catch (error) {
      ui.message.textContent =
        error.message === "application_unauthorized"
          ? t("Your secure application expired. Start again.")
          : error.message === "application_documents_missing"
            ? t("Add all four clear document photos for every driver.")
            : t("Something went wrong. Please try again.");
    } finally {
      ui.submit.disabled = false;
    }
  });

  window.renderApplicationsAdmin = renderApplicationsAdmin;
  window.yabiShowPortalEntry = () => showFlow("entry");

  async function adminApi(path, options = {}) {
    const response = await fetch(`${apiBase}${path}`, {
      method: options.method || "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey) || ""}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) throw new Error(result.error || "request_failed");
    return result;
  }

  async function renderApplicationsAdmin(root) {
    root.innerHTML = '<div class="loading-state"><span></span><p>Loading…</p></div>';
    try {
      const result = await adminApi("/api/portal/applications/admin");
      const rows = result.items
        .map(
          (item) => `<tr><td><strong>${escape(item.reference)}</strong><small>${item.submittedAt ? new Date(item.submittedAt).toLocaleString() : ""}</small></td>
          <td>${escape(item.holderNameOrCompany || "")}</td><td>${escape(item.holderEmail || "")}</td>
          <td><span class="status-badge status-${escape(item.status)}">${escape(item.status)}</span></td>
          <td><button class="icon-button" data-application-action="view" data-id="${escape(item.id)}">${escape(t("View"))}</button></td></tr>`,
        )
        .join("");
      root.innerHTML = `<header class="view-header"><div><h1>${escape(t("Applications"))}</h1></div></header>
        ${rows ? `<div class="data-panel"><div class="table-wrap"><table class="data-table"><thead><tr><th>${escape(t("Reference"))}</th><th>${escape(t("Customer"))}</th><th>${escape(t("Email"))}</th><th>${escape(t("Status"))}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></div>` : `<div class="empty-state"><span>YB</span><h3>${escape(t("No applications"))}</h3></div>`}`;
    } catch {
      root.innerHTML = `<div class="empty-state"><span>!</span><h3>${escape(t("Could not load applications"))}</h3></div>`;
    }
  }

  async function openAdminApplication(id) {
    const modalElement = document.querySelector("#portal-modal");
    const modalBody = document.querySelector("#modal-body");
    const modalTitle = document.querySelector("#modal-title");
    const modalKicker = document.querySelector("#modal-kicker");
    modalTitle.textContent = t("Application");
    modalKicker.textContent = "YABI";
    modalBody.innerHTML = '<div class="loading-state"><span></span><p>Loading…</p></div>';
    modalElement.showModal();
    try {
      const result = await adminApi(
        `/api/portal/applications/admin?id=${encodeURIComponent(id)}`,
      );
      const app = result.application;
      modalTitle.textContent = app.reference;
      const documentsByDriver = new Map();
      result.documents.forEach((document) => {
        const items = documentsByDriver.get(document.driverClientKey) || [];
        items.push(document);
        documentsByDriver.set(document.driverClientKey, items);
      });
      modalBody.innerHTML = `<div class="application-admin-detail">
        <section class="detail-block"><h3>${escape(t("Contract holder"))}</h3>
          <dl><div><dt>${escape(t("Name / company"))}</dt><dd>${escape(app.holderNameOrCompany || "")}</dd></div>
          <div><dt>${escape(t("Address"))}</dt><dd>${escape(app.holderAddress || "")}</dd></div>
          <div><dt>${escape(t("Phone"))}</dt><dd>${escape(app.holderPhone || "")}</dd></div>
          <div><dt>${escape(t("Email"))}</dt><dd>${escape(app.holderEmail || "")}</dd></div>
          <div><dt>${escape(t("Identity card"))}</dt><dd>${escape(app.holderIdentityCardNumber || "")}</dd></div>
          <div><dt>${escape(t("National register number"))}</dt><dd>${escape(app.holderNationalRegisterNumber || "")}</dd></div></dl>
        </section>
        ${result.drivers.map((driver) => `<section class="detail-block"><h3>${escape(t(driver.kind === "main" ? "Main driver" : "Additional driver"))} · ${escape(driver.fullName)}</h3>
          <dl><div><dt>${escape(t("Phone"))}</dt><dd>${escape(driver.phone)}</dd></div><div><dt>${escape(t("Identity card"))}</dt><dd>${escape(driver.identityCardNumber)}</dd></div>
          <div><dt>${escape(t("National register number"))}</dt><dd>${escape(driver.nationalRegisterNumber || "")}</dd></div>
          <div><dt>${escape(t("Driving licence"))}</dt><dd>${escape(driver.drivingLicenceNumber)}</dd></div><div><dt>${escape(t("Issued"))}</dt><dd>${escape(driver.licenceIssueDate)}</dd></div>
          <div><dt>${escape(t("Valid since"))}</dt><dd>${escape(driver.licenceValidSince)}</dd></div></dl>
          <div class="document-review">${(documentsByDriver.get(driver.clientKey) || []).map((document) => `<a href="${escape(document.url)}" target="_blank" rel="noopener"><img src="${escape(document.url)}" alt="${escape(document.category)}"><span>${escape(document.category.replaceAll("_", " "))}</span></a>`).join("")}</div>
        </section>`).join("")}
        <label class="app-field"><span>${escape(t("Internal notes"))}</span><textarea id="application-admin-notes">${escape(app.adminNotes || "")}</textarea></label>
        <div class="application-admin-actions">
          ${app.status !== "activated" ? `<button class="ghost-button" data-application-action="status" data-status="contacted">${escape(t("Mark contacted"))}</button>` : ""}
          ${!["agreed", "activated"].includes(app.status) ? `<button class="secondary-button" data-application-action="status" data-status="agreed">${escape(t("Mark agreed"))}</button>` : ""}
          ${app.status === "agreed" ? `<button class="primary-button" data-application-action="activate">${escape(t("Create client access"))}</button>` : ""}
          ${app.status !== "activated" ? `<button class="danger-button" data-application-action="status" data-status="rejected">${escape(t("Reject"))}</button>` : ""}
        </div>
      </div>`;
      modalBody.dataset.applicationId = id;
    } catch {
      modalBody.innerHTML = "<p>Could not load this application.</p>";
    }
  }

  document.addEventListener("click", async (event) => {
    const action = event.target.closest("[data-application-action]");
    if (!action) return;
    const id =
      action.dataset.id ||
      document.querySelector("#modal-body")?.dataset.applicationId;
    if (action.dataset.applicationAction === "view") {
      await openAdminApplication(id);
      return;
    }
    action.disabled = true;
    try {
      if (action.dataset.applicationAction === "status") {
        await adminApi("/api/portal/applications/admin", {
          method: "POST",
          body: {
            operation: "update_status",
            applicationId: id,
            status: action.dataset.status,
            adminNotes:
              document.querySelector("#application-admin-notes")?.value || "",
          },
        });
        document.querySelector("#portal-modal").close();
        await renderApplicationsAdmin(document.querySelector("#view-root"));
      }
      if (action.dataset.applicationAction === "activate") {
        const result = await adminApi("/api/portal/applications/admin", {
          method: "POST",
          body: { operation: "activate", applicationId: id },
        });
        document.querySelector("#portal-modal").close();
        if (typeof window.yabiRevealAccessCode === "function") {
          window.yabiRevealAccessCode(result.accessCode);
        } else {
          alert(`Access code: ${result.accessCode}`);
        }
        await renderApplicationsAdmin(document.querySelector("#view-root"));
      }
    } catch {
      alert("The action could not be completed.");
    } finally {
      action.disabled = false;
    }
  });

  translateApplicantUi();
  showFlow("entry");
})();
