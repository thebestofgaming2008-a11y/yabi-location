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
      "Who is applying?": "Qui introduit la demande ?",
      "Choose the type of rental application.": "Choisissez le type de demande de location.",
      Individual: "Particulier",
      "I am renting privately": "Je loue à titre privé",
      Company: "Société",
      "I am renting for a company": "Je loue pour une société",
      "Contract holder": "Le locataire",
      "This information is required to prepare the rental contract.": "Ces informations sont nécessaires pour préparer le contrat de location.",
      "Company name": "Nom de la société",
      "Belgian VAT number": "Numéro de TVA belge",
      "Company address": "Adresse de la société",
      "Address details": "Adresse",
      "Full address": "Adresse complète",
      Street: "Rue",
      "House number": "Numéro",
      "Box / unit (optional)": "Boîte / unité (facultatif)",
      "Postal code": "Code postal",
      City: "Ville",
      Province: "Province",
      "Choose a province": "Choisissez une province",
      Antwerp: "Anvers",
      "Brussels-Capital": "Bruxelles-Capitale",
      "East Flanders": "Flandre-Orientale",
      "Flemish Brabant": "Brabant flamand",
      Hainaut: "Hainaut",
      Liège: "Liège",
      Limburg: "Limbourg",
      Luxembourg: "Luxembourg",
      Namur: "Namur",
      "Walloon Brabant": "Brabant wallon",
      "West Flanders": "Flandre-Occidentale",
      Address: "Adresse",
      Phone: "Téléphone",
      "Identity card number": "N° de carte d’identité",
      "National register number": "N° de registre national",
      Email: "E-mail",
      Drivers: "Conducteurs",
      "Every driver must be at least 23 and must have held a driving licence for at least 5 years. Take clear live photos of both sides of the identity card and driving licence.": "Chaque conducteur doit avoir au moins 23 ans et détenir un permis depuis au moins 5 ans. Prenez des photos nettes, en direct, du recto et du verso de la carte d’identité et du permis.",
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
      "Camera permission is blocked. Allow Camera for this site in your browser settings, then try again. If this page is open inside another app, open it in Chrome or Safari.": "L’accès à l’appareil photo est bloqué. Autorisez l’appareil photo pour ce site dans les réglages du navigateur, puis réessayez. Si la page est ouverte dans une autre application, ouvrez-la dans Chrome ou Safari.",
      "This browser cannot use the camera here. Open the portal directly in Chrome or Safari.": "Ce navigateur ne peut pas utiliser l’appareil photo ici. Ouvrez directement le portail dans Chrome ou Safari.",
      "The photo could not be prepared. Retake it and try again.": "La photo n’a pas pu être préparée. Reprenez-la puis réessayez.",
      "The secure upload was rejected. Keep this photo and tap Use photo again.": "L’envoi sécurisé a été refusé. Gardez cette photo et appuyez de nouveau sur Utiliser la photo.",
      "Main driver": "Conducteur principal",
      "Additional driver": "Conducteur supplémentaire",
      "Same information as contract holder": "Mêmes informations que le locataire",
      "Full name": "Nom et prénom",
      "Date of birth": "Date de naissance",
      "Position in company": "Fonction dans la société",
      "Driving licence number": "N° de permis de conduire",
      "Licence issue date": "Date de délivrance du permis",
      "Licence valid since": "Permis valable depuis le",
      "I confirm this driver is at least 23 years old and has held a driving licence for at least 5 years.": "Je confirme que ce conducteur a au moins 23 ans et détient un permis depuis au moins 5 ans.",
      "Identity card — front": "Carte d’identité — recto",
      "Identity card — back": "Carte d’identité — verso",
      "Driving licence — front": "Permis de conduire — recto",
      "Driving licence — back": "Permis de conduire — verso",
      "Open camera": "Ouvrir l’appareil photo",
      "Photo ready": "Photo prête",
      Remove: "Supprimer",
      "Camera access is required. Allow camera permission and try again.": "L’accès à l’appareil photo est obligatoire. Autorisez-le puis réessayez.",
      "Check all required fields.": "Vérifiez tous les champs obligatoires.",
      "Every driver must be at least 23 years old.": "Chaque conducteur doit avoir au moins 23 ans.",
      "Every driver must have held a driving licence for at least 5 years.": "Chaque conducteur doit détenir un permis depuis au moins 5 ans.",
      "Enter a valid Belgian VAT number.": "Saisissez un numéro de TVA belge valide.",
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
      "Applicant type": "Type de demandeur",
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
      "Who is applying?": "Wie dient de aanvraag in?",
      "Choose the type of rental application.": "Kies het type huuraanvraag.",
      Individual: "Particulier",
      "I am renting privately": "Ik huur als particulier",
      Company: "Vennootschap",
      "I am renting for a company": "Ik huur voor een vennootschap",
      "Contract holder": "Contracthouder",
      "This information is required to prepare the rental contract.": "Deze informatie is nodig om het huurcontract op te stellen.",
      "Company name": "Naam van de vennootschap",
      "Belgian VAT number": "Belgisch btw-nummer",
      "Company address": "Adres van de vennootschap",
      "Address details": "Adres",
      "Full address": "Volledig adres",
      Street: "Straat",
      "House number": "Huisnummer",
      "Box / unit (optional)": "Bus / eenheid (optioneel)",
      "Postal code": "Postcode",
      City: "Gemeente",
      Province: "Provincie",
      "Choose a province": "Kies een provincie",
      Antwerp: "Antwerpen",
      "Brussels-Capital": "Brussels Hoofdstedelijk Gewest",
      "East Flanders": "Oost-Vlaanderen",
      "Flemish Brabant": "Vlaams-Brabant",
      Hainaut: "Henegouwen",
      Liège: "Luik",
      Limburg: "Limburg",
      Luxembourg: "Luxemburg",
      Namur: "Namen",
      "Walloon Brabant": "Waals-Brabant",
      "West Flanders": "West-Vlaanderen",
      Address: "Adres",
      Phone: "Telefoon",
      "Identity card number": "Identiteitskaartnummer",
      "National register number": "Rijksregisternummer",
      Email: "E-mail",
      Drivers: "Bestuurders",
      "Every driver must be at least 23 and must have held a driving licence for at least 5 years. Take clear live photos of both sides of the identity card and driving licence.": "Elke bestuurder moet minstens 23 jaar zijn en minstens 5 jaar een rijbewijs hebben. Maak duidelijke livefoto’s van de voor- en achterkant van identiteitskaart en rijbewijs.",
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
      "Camera permission is blocked. Allow Camera for this site in your browser settings, then try again. If this page is open inside another app, open it in Chrome or Safari.": "Cameratoegang is geblokkeerd. Sta Camera toe voor deze site in de browserinstellingen en probeer opnieuw. Staat deze pagina in een andere app open, open ze dan in Chrome of Safari.",
      "This browser cannot use the camera here. Open the portal directly in Chrome or Safari.": "Deze browser kan de camera hier niet gebruiken. Open het portaal rechtstreeks in Chrome of Safari.",
      "The photo could not be prepared. Retake it and try again.": "De foto kon niet worden voorbereid. Neem hem opnieuw en probeer nogmaals.",
      "The secure upload was rejected. Keep this photo and tap Use photo again.": "De beveiligde upload werd geweigerd. Bewaar deze foto en tik opnieuw op Foto gebruiken.",
      "Main driver": "Hoofdbestuurder",
      "Additional driver": "Extra bestuurder",
      "Same information as contract holder": "Zelfde gegevens als contracthouder",
      "Full name": "Naam en voornaam",
      "Date of birth": "Geboortedatum",
      "Position in company": "Functie in de vennootschap",
      "Driving licence number": "Rijbewijsnummer",
      "Licence issue date": "Afgiftedatum rijbewijs",
      "Licence valid since": "Rijbewijs geldig sinds",
      "I confirm this driver is at least 23 years old and has held a driving licence for at least 5 years.": "Ik bevestig dat deze bestuurder minstens 23 jaar is en minstens 5 jaar een rijbewijs heeft.",
      "Identity card — front": "Identiteitskaart — voorkant",
      "Identity card — back": "Identiteitskaart — achterkant",
      "Driving licence — front": "Rijbewijs — voorkant",
      "Driving licence — back": "Rijbewijs — achterkant",
      "Open camera": "Camera openen",
      "Photo ready": "Foto klaar",
      Remove: "Verwijderen",
      "Camera access is required. Allow camera permission and try again.": "Cameratoegang is verplicht. Geef toestemming en probeer opnieuw.",
      "Check all required fields.": "Controleer alle verplichte velden.",
      "Every driver must be at least 23 years old.": "Elke bestuurder moet minstens 23 jaar zijn.",
      "Every driver must have held a driving licence for at least 5 years.": "Elke bestuurder moet minstens 5 jaar een rijbewijs hebben.",
      "Enter a valid Belgian VAT number.": "Vul een geldig Belgisch btw-nummer in.",
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
      "Applicant type": "Type aanvrager",
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
    applicantTypeStep: document.querySelector("#applicant-type-step"),
    applicationDetails: document.querySelector("#application-details"),
    holderAddressLabel: document.querySelector("#holder-address-label"),
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

  const provinceOptions = [
    ["antwerp", "Antwerp"],
    ["brussels_capital", "Brussels-Capital"],
    ["east_flanders", "East Flanders"],
    ["flemish_brabant", "Flemish Brabant"],
    ["hainaut", "Hainaut"],
    ["liege", "Liège"],
    ["limburg", "Limburg"],
    ["luxembourg", "Luxembourg"],
    ["namur", "Namur"],
    ["walloon_brabant", "Walloon Brabant"],
    ["west_flanders", "West Flanders"],
  ];

  const applicationState = {
    language: ["en", "fr", "nl"].includes(localStorage.getItem(languageKey))
      ? localStorage.getItem(languageKey)
      : "en",
    applicantType: null,
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
      address: "",
      street: "",
      houseNumber: "",
      addressBox: "",
      postalCode: "",
      city: "",
      province: "",
      email: "",
      phone: "",
      identityCardNumber: "",
      nationalRegisterNumber: "",
      dateOfBirth: "",
      companyPosition: "",
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

  function belgianVatNumberValid(value = "") {
    return /^(?:BE)?[01]\d{9}$/.test(
      value.replace(/[.\s-]/g, "").toUpperCase(),
    );
  }

  function dateCutoff(years) {
    const cutoff = new Date();
    cutoff.setUTCHours(0, 0, 0, 0);
    cutoff.setUTCFullYear(cutoff.getUTCFullYear() - years);
    return [
      cutoff.getUTCFullYear(),
      String(cutoff.getUTCMonth() + 1).padStart(2, "0"),
      String(cutoff.getUTCDate()).padStart(2, "0"),
    ].join("-");
  }

  function dateAtLeastYearsAgo(value, years) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && value <= dateCutoff(years);
  }

  function emailAddressValid(value = "") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function belgianPostalCodeValid(value = "") {
    return /^\d{4}$/.test(value);
  }

  function composeAddress({ street, houseNumber, addressBox, postalCode, city }) {
    const number = addressBox
      ? `${houseNumber} box ${addressBox}`
      : houseNumber;
    return `${street} ${number}, ${postalCode} ${city}`.trim();
  }

  function updateApplicationSelect(select) {
    const input = select.querySelector('input[type="hidden"]');
    const value = select.querySelector("[data-application-select-value]");
    const selected = provinceOptions.find(([code]) => code === input.value);
    value.textContent = selected ? t(selected[1]) : t(value.dataset.placeholderKey);
    value.classList.toggle("placeholder", !selected);
    select.classList.toggle("invalid", select.dataset.invalid === "true");
    select.querySelectorAll("[data-application-option]").forEach((option) => {
      option.textContent = t(option.dataset.labelKey);
      option.setAttribute(
        "aria-selected",
        String(option.dataset.applicationOption === input.value),
      );
    });
  }

  function closeApplicationSelects(except = null) {
    document.querySelectorAll("[data-application-select].open").forEach((select) => {
      if (select === except) return;
      select.classList.remove("open");
      select.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
      const menu = select.querySelector(".custom-select-menu");
      if (menu) menu.hidden = true;
    });
  }

  function provinceSelect(name, value, full = true) {
    return `<label class="app-field${full ? " full" : ""}"><span>${escape(t("Province"))}</span>
      <div class="custom-select application-select" data-application-select data-required="true">
        <input type="hidden" name="${escape(name)}" value="${escape(value)}" required>
        <button class="custom-select-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
          <span class="custom-select-value${value ? "" : " placeholder"}" data-application-select-value data-placeholder-key="Choose a province">${escape(value ? t(provinceOptions.find(([code]) => code === value)?.[1] || "Choose a province") : t("Choose a province"))}</span>
          <span class="custom-select-chevron" aria-hidden="true"></span>
        </button>
        <div class="custom-select-menu" role="listbox" hidden>
          ${provinceOptions.map(([code, label]) => `<button class="custom-select-option" type="button" role="option" data-application-option="${escape(code)}" data-label-key="${escape(label)}" aria-selected="${code === value}">${escape(t(label))}</button>`).join("")}
        </div>
      </div>
    </label>`;
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
      showApplicantTypeStep();
    }
  }

  function showApplicantTypeStep() {
    applicationState.applicantType = null;
    ui.applicantTypeStep.hidden = false;
    ui.applicationDetails.hidden = true;
    ui.message.textContent = "";
  }

  function selectApplicantType(type) {
    applicationState.applicantType = type;
    ui.applicantTypeStep.hidden = true;
    ui.applicationDetails.hidden = false;
    document.querySelectorAll(".company-only").forEach((field) => {
      const company = type === "company";
      field.hidden = !company;
      field.querySelectorAll("input").forEach((input) => {
        input.disabled = !company;
      });
    });
    ui.holderAddressLabel.textContent = t(
      type === "company" ? "Company address" : "Address details",
    );
    setPage(1);
    renderDrivers();
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
      if (applicationState.applicantType) {
        ui.holderAddressLabel.textContent = t(
          applicationState.applicantType === "company"
            ? "Company address"
            : "Address details",
        );
      }
      if (applicationState.page === 3) renderSummary();
    }
    document.querySelectorAll("[data-application-select]").forEach(
      updateApplicationSelect,
    );
  }

  function field(label, name, value, type = "text", full = false, required = true) {
    const attributes = {
      address: 'autocomplete="street-address" maxlength="300"',
      street: 'autocomplete="address-line1" maxlength="160"',
      houseNumber: 'autocomplete="address-line2" maxlength="20"',
      addressBox: 'maxlength="30"',
      postalCode:
        'inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{4}" maxlength="4"',
      city: 'autocomplete="address-level2" maxlength="100"',
      email: 'autocomplete="email" maxlength="254"',
      phone: 'inputmode="tel" autocomplete="tel" maxlength="40"',
      identityCardNumber: 'maxlength="80"',
      nationalRegisterNumber:
        'inputmode="numeric" autocomplete="off" maxlength="24"',
      dateOfBirth: `max="${dateCutoff(23)}"`,
      companyPosition: 'maxlength="120"',
      drivingLicenceNumber: 'maxlength="80"',
      licenceIssueDate: `max="${dateCutoff(0)}"`,
      licenceValidSince: `max="${dateCutoff(5)}"`,
    }[name] || "";
    return `<label class="app-field${full ? " full" : ""}"><span>${escape(t(label))}</span><input name="${escape(name)}" type="${type}" value="${escape(value)}" ${attributes} ${required ? "required" : ""}></label>`;
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
            ${field("Full name", "fullName", driver.fullName, "text", true)}
            <div class="address-group full"><strong>${escape(t("Address details"))}</strong><div class="application-grid">
              ${field("Street", "street", driver.street, "text", true)}
              ${field("House number", "houseNumber", driver.houseNumber)}
              ${field("Box / unit (optional)", "addressBox", driver.addressBox, "text", false, false)}
              ${field("Postal code", "postalCode", driver.postalCode)}
              ${field("City", "city", driver.city)}
              ${provinceSelect("province", driver.province)}
            </div></div>
            ${field("Email", "email", driver.email, "email")}
            ${field("Phone", "phone", driver.phone, "tel")}
            ${field("Date of birth", "dateOfBirth", driver.dateOfBirth, "date")}
            ${field("Identity card number", "identityCardNumber", driver.identityCardNumber)}
            ${field("National register number", "nationalRegisterNumber", driver.nationalRegisterNumber)}
            ${applicationState.applicantType === "company" ? field("Position in company", "companyPosition", driver.companyPosition, "text", true) : ""}
            ${field("Driving licence number", "drivingLicenceNumber", driver.drivingLicenceNumber)}
            ${field("Licence issue date", "licenceIssueDate", driver.licenceIssueDate, "date")}
            ${field("Licence valid since", "licenceValidSince", driver.licenceValidSince, "date")}
          </div>
          <label class="age-check"><input type="checkbox" name="ageConfirmed" ${driver.ageConfirmed ? "checked" : ""} required><span>${escape(t("I confirm this driver is at least 23 years old and has held a driving licence for at least 5 years."))}</span></label>
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
        "street",
        "houseNumber",
        "addressBox",
        "postalCode",
        "city",
        "province",
        "email",
        "phone",
        "identityCardNumber",
        "nationalRegisterNumber",
        "dateOfBirth",
        "companyPosition",
        "drivingLicenceNumber",
        "licenceIssueDate",
        "licenceValidSince",
      ].forEach((key) => {
        driver[key] = card.querySelector(`[name="${key}"]`)?.value.trim() || "";
      });
      driver.address = composeAddress(driver);
      driver.ageConfirmed = card.querySelector('[name="ageConfirmed"]')?.checked === true;
    });
  }

  function validatePage() {
    ui.message.textContent = "";
    if (applicationState.page === 1) {
      const fields = [...ui.pages[0].querySelectorAll("input:not(:disabled)")];
      const fieldsValid = fields.every((input) => {
        const okay =
          input.checkValidity() &&
          (input.name !== "holderNationalRegisterNumber" ||
            nationalRegisterNumberValid(input.value)) &&
          (input.name !== "companyVatNumber" ||
            belgianVatNumberValid(input.value));
        input.setAttribute("aria-invalid", String(!okay));
        return okay;
      });
      const province = ui.form.elements.holderProvince.value;
      const addressValid =
        belgianPostalCodeValid(ui.form.elements.holderPostalCode.value) &&
        provinceOptions.some(([code]) => code === province);
      const holderProvinceSelect = ui.pages[0].querySelector(
        '[data-application-select] input[name="holderProvince"]',
      )?.closest("[data-application-select]");
      if (holderProvinceSelect) {
        holderProvinceSelect.dataset.invalid = String(!province);
        updateApplicationSelect(holderProvinceSelect);
      }
      const valid = fieldsValid && addressValid;
      if (!valid) {
        ui.message.textContent =
          applicationState.applicantType === "company" &&
          !belgianVatNumberValid(ui.form.elements.companyVatNumber.value)
            ? t("Enter a valid Belgian VAT number.")
            : t("Check all required fields.");
      }
      return valid;
    }
    if (applicationState.page === 2) {
      syncDrivers();
      const missingFields = applicationState.drivers.some(
        (driver) =>
          !driver.fullName ||
          !driver.street ||
          !driver.houseNumber ||
          !belgianPostalCodeValid(driver.postalCode) ||
          !driver.city ||
          !provinceOptions.some(([code]) => code === driver.province) ||
          !emailAddressValid(driver.email) ||
          !driver.phone ||
          !driver.identityCardNumber ||
          !nationalRegisterNumberValid(driver.nationalRegisterNumber) ||
          !driver.dateOfBirth ||
          (applicationState.applicantType === "company" &&
            !driver.companyPosition) ||
          !driver.drivingLicenceNumber ||
          !driver.licenceIssueDate ||
          !driver.licenceValidSince ||
          !driver.ageConfirmed,
      );
      if (missingFields) {
        ui.message.textContent = t("Check all required fields.");
        return false;
      }
      if (
        applicationState.drivers.some(
          (driver) => !dateAtLeastYearsAgo(driver.dateOfBirth, 23),
        )
      ) {
        ui.message.textContent = t(
          "Every driver must be at least 23 years old.",
        );
        return false;
      }
      if (
        applicationState.drivers.some(
          (driver) => !dateAtLeastYearsAgo(driver.licenceValidSince, 5),
        )
      ) {
        ui.message.textContent = t(
          "Every driver must have held a driving licence for at least 5 years.",
        );
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
      [
        t("Applicant type"),
        t(applicationState.applicantType === "company" ? "Company" : "Individual"),
      ],
      ...(applicationState.applicantType === "company"
        ? [
            [t("Company name"), holder.get("companyName")],
            [t("Belgian VAT number"), holder.get("companyVatNumber")],
          ]
        : []),
      [t("Contract holder"), holder.get("holderFullName")],
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
          : "Camera permission is blocked. Allow Camera for this site in your browser settings, then try again. If this page is open inside another app, open it in Chrome or Safari.",
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
      address: driver.address,
      street: driver.street,
      houseNumber: driver.houseNumber,
      addressBox: driver.addressBox || undefined,
      postalCode: driver.postalCode,
      city: driver.city,
      province: driver.province,
      email: driver.email,
      phone: driver.phone,
      identityCardNumber: driver.identityCardNumber,
      nationalRegisterNumber: driver.nationalRegisterNumber,
      dateOfBirth: driver.dateOfBirth,
      companyPosition:
        applicationState.applicantType === "company"
          ? driver.companyPosition
          : undefined,
      drivingLicenceNumber: driver.drivingLicenceNumber,
      licenceIssueDate: driver.licenceIssueDate,
      licenceValidSince: driver.licenceValidSince,
      ageConfirmed: driver.ageConfirmed,
    }));
  }

  document.addEventListener("click", (event) => {
    const applicationOption = event.target.closest("[data-application-option]");
    if (applicationOption) {
      const select = applicationOption.closest("[data-application-select]");
      select.querySelector('input[type="hidden"]').value =
        applicationOption.dataset.applicationOption;
      select.dataset.invalid = "false";
      updateApplicationSelect(select);
      closeApplicationSelects();
      select.querySelector(".custom-select-trigger").focus();
      return;
    }
    const applicationSelectTrigger = event.target.closest(
      "[data-application-select] .custom-select-trigger",
    );
    if (applicationSelectTrigger) {
      const select = applicationSelectTrigger.closest("[data-application-select]");
      const opening = !select.classList.contains("open");
      closeApplicationSelects(select);
      select.classList.toggle("open", opening);
      applicationSelectTrigger.setAttribute("aria-expanded", String(opening));
      select.querySelector(".custom-select-menu").hidden = !opening;
      if (opening) {
        select.querySelector('[aria-selected="true"], [data-application-option]')?.focus();
      }
      return;
    }
    if (!event.target.closest("[data-application-select]")) {
      closeApplicationSelects();
    }
    const mode = event.target.closest("[data-entry-mode]");
    if (mode) {
      showFlow(mode.dataset.entryMode);
      return;
    }
    const applicantType = event.target.closest("[data-applicant-type]");
    if (applicantType) {
      selectApplicantType(applicantType.dataset.applicantType);
      return;
    }
    const back = event.target.closest("[data-entry-back]");
    if (back) {
      if (!ui.application.hidden && !ui.applicationDetails.hidden) {
        showApplicantTypeStep();
        return;
      }
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

  document.addEventListener("keydown", (event) => {
    const select = event.target.closest("[data-application-select]");
    if (!select) return;
    const options = [...select.querySelectorAll("[data-application-option]")];
    const index = options.indexOf(event.target);
    if (event.key === "Escape") {
      closeApplicationSelects();
      select.querySelector(".custom-select-trigger")?.focus();
      return;
    }
    if (index < 0 || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "ArrowDown"
      ? Math.min(options.length - 1, index + 1)
      : Math.max(0, index - 1);
    options[next]?.focus();
  });

  ui.drivers.addEventListener("change", (event) => {
    if (!event.target.matches("[data-same-holder]") || !event.target.checked) return;
    const card = event.target.closest("[data-driver-key]");
    card.querySelector('[name="fullName"]').value =
      ui.form.elements.holderFullName.value;
    [
      ["street", "holderStreet"],
      ["houseNumber", "holderHouseNumber"],
      ["addressBox", "holderAddressBox"],
      ["postalCode", "holderPostalCode"],
      ["city", "holderCity"],
      ["province", "holderProvince"],
    ].forEach(([driverField, holderField]) => {
      card.querySelector(`[name="${driverField}"]`).value =
        ui.form.elements[holderField].value;
    });
    updateApplicationSelect(
      card.querySelector('[name="province"]').closest("[data-application-select]"),
    );
    card.querySelector('[name="email"]').value =
      ui.form.elements.holderEmail.value;
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
        applicantType: applicationState.applicantType,
        holderFullName: form.get("holderFullName"),
        companyName:
          applicationState.applicantType === "company"
            ? form.get("companyName")
            : undefined,
        companyVatNumber:
          applicationState.applicantType === "company"
            ? form.get("companyVatNumber")
            : undefined,
        holderStreet: form.get("holderStreet"),
        holderHouseNumber: form.get("holderHouseNumber"),
        holderAddressBox: form.get("holderAddressBox") || undefined,
        holderPostalCode: form.get("holderPostalCode"),
        holderCity: form.get("holderCity"),
        holderProvince: form.get("holderProvince"),
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
          <dl><div><dt>${escape(t("Applicant type"))}</dt><dd>${escape(t(app.applicantType === "company" ? "Company" : "Individual"))}</dd></div>
          ${app.applicantType === "company" ? `<div><dt>${escape(t("Company name"))}</dt><dd>${escape(app.companyName || "")}</dd></div><div><dt>${escape(t("Belgian VAT number"))}</dt><dd>${escape(app.companyVatNumber || "")}</dd></div>` : ""}
          <div><dt>${escape(t("Full name"))}</dt><dd>${escape(app.holderFullName || app.holderNameOrCompany || "")}</dd></div>
          <div><dt>${escape(t("Address"))}</dt><dd>${escape(app.holderAddress || "")}</dd></div>
          <div><dt>${escape(t("Phone"))}</dt><dd>${escape(app.holderPhone || "")}</dd></div>
          <div><dt>${escape(t("Email"))}</dt><dd>${escape(app.holderEmail || "")}</dd></div>
          <div><dt>${escape(t("Identity card"))}</dt><dd>${escape(app.holderIdentityCardNumber || "")}</dd></div>
          <div><dt>${escape(t("National register number"))}</dt><dd>${escape(app.holderNationalRegisterNumber || "")}</dd></div></dl>
        </section>
        ${result.drivers.map((driver) => `<section class="detail-block"><h3>${escape(t(driver.kind === "main" ? "Main driver" : "Additional driver"))} · ${escape(driver.fullName)}</h3>
          <dl><div><dt>${escape(t("Full address"))}</dt><dd>${escape(driver.address || "")}</dd></div><div><dt>${escape(t("Email"))}</dt><dd>${escape(driver.email || "")}</dd></div>
          <div><dt>${escape(t("Phone"))}</dt><dd>${escape(driver.phone)}</dd></div><div><dt>${escape(t("Date of birth"))}</dt><dd>${escape(driver.dateOfBirth || "")}</dd></div>
          ${driver.companyPosition ? `<div><dt>${escape(t("Position in company"))}</dt><dd>${escape(driver.companyPosition)}</dd></div>` : ""}<div><dt>${escape(t("Identity card"))}</dt><dd>${escape(driver.identityCardNumber)}</dd></div>
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
