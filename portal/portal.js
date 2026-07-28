const API_BASE = document.body.dataset.apiBase.replace(/\/$/, "");
const TOKEN_KEY = "yabi_portal_session";
const LANGUAGE_KEY = "yabi_portal_language";
const supportedLanguages = ["en", "fr", "nl"];
const languageLocales = { en: "en-BE", fr: "fr-BE", nl: "nl-BE" };

const translations = {
  fr: {
    "Skip to content": "Aller au contenu",
    "Sign in": "Connexion",
    "Use your personal access code.": "Utilisez votre code d’accès personnel.",
    "Access code": "Code d’accès",
    Continue: "Continuer",
    "Public website": "Site public",
    "Sign out": "Déconnexion",
    Loading: "Chargement",
    "Loading…": "Chargement…",
    Language: "Langue",
    "Open navigation": "Ouvrir le menu",
    "Close navigation": "Fermer le menu",
    Close: "Fermer",
    Administrator: "Administrateur",
    Employee: "Employé",
    Customer: "Client",
    Mechanic: "Mécanicien",
    "External worker": "Prestataire externe",
    "Customer space": "Espace client",
    Operations: "Opérations",
    Overview: "Vue d’ensemble",
    "Access & roles": "Accès et rôles",
    Customers: "Clients",
    Fleet: "Flotte",
    Rentals: "Locations",
    "Audit trail": "Journal d’audit",
    "My details": "Mes données",
    Available: "Disponible",
    Reserved: "Réservé",
    Rented: "Loué",
    Cleaning: "Nettoyage",
    Inactive: "Inactif",
    "Active rentals": "Locations actives",
    "Open reports": "Signalements ouverts",
    Today: "Aujourd’hui",
    "My rentals": "Mes locations",
    Active: "Actif",
    "Recent operations": "Opérations récentes",
    "View all": "Tout voir",
    "Quick actions": "Actions rapides",
    Access: "Accès",
    Rental: "Location",
    Report: "Signalement",
    "Check in": "Entrée",
    "Check out": "Sortie",
    Wash: "Lavage",
    Maintenance: "Entretien",
    "Take vehicle": "Prendre le véhicule",
    "Return vehicle": "Restituer le véhicule",
    "Customer details": "Informations client",
    "Vehicle check-in": "Entrée du véhicule",
    "Vehicle check-out": "Sortie du véhicule",
    "Wash vehicle": "Laver le véhicule",
    "Vehicle taken": "Véhicule pris",
    "Vehicle returned": "Véhicule restitué",
    "Report an issue": "Signaler un problème",
    "Recorded operations": "Opérations enregistrées",
    Person: "Personne",
    Role: "Rôle",
    Status: "Statut",
    "Last sign-in": "Dernière connexion",
    "New code": "Nouveau code",
    Disable: "Désactiver",
    Enable: "Activer",
    Email: "E-mail",
    Phone: "Téléphone",
    Address: "Adresse",
    Vehicle: "Véhicule",
    Format: "Format",
    Year: "Année",
    Colour: "Couleur",
    Mileage: "Kilométrage",
    Update: "Modifier",
    Reference: "Référence",
    Period: "Période",
    Price: "Prix",
    Operation: "Opération",
    Date: "Date",
    View: "Voir",
    Resolve: "Résoudre",
    "Create access": "Créer l’accès",
    "Add customer": "Ajouter un client",
    "Add vehicle": "Ajouter un véhicule",
    "Create rental": "Créer la location",
    "No accounts": "Aucun compte",
    "No customers": "Aucun client",
    "No vehicles": "Aucun véhicule",
    "No rentals": "Aucune location",
    "No operations recorded": "Aucune opération enregistrée",
    "No audit events": "Aucun événement d’audit",
    "Profile not linked": "Profil non lié",
    Save: "Enregistrer",
    Cancel: "Annuler",
    Done: "Terminé",
    "Display name": "Nom affiché",
    "Linked customer": "Client lié",
    "Choose…": "Choisir…",
    "Choose a value.": "Sélectionnez une valeur.",
    "Full name": "Nom complet",
    Company: "Entreprise",
    "Internal notes": "Notes internes",
    "Licence plate": "Plaque d’immatriculation",
    Make: "Marque",
    Model: "Modèle",
    "Current mileage": "Kilométrage actuel",
    "Fuel level (%)": "Niveau de carburant (%)",
    "Start date": "Date de début",
    "Expected end date": "Date de fin prévue",
    "Monthly price excl. VAT (€)": "Prix mensuel hors TVA (€)",
    "Deposit (€)": "Caution (€)",
    "Mileage allowance": "Kilométrage inclus",
    "Update status": "Modifier le statut",
    "Operational status": "Statut opérationnel",
    "Vehicle (optional)": "Véhicule (facultatif)",
    "Rental (optional)": "Location (facultatif)",
    Category: "Catégorie",
    Priority: "Priorité",
    Damage: "Dommage",
    Mechanical: "Mécanique",
    Administrative: "Administratif",
    Request: "Demande",
    Other: "Autre",
    Low: "Faible",
    Normal: "Normale",
    Urgent: "Urgente",
    "What happened?": "Que s’est-il passé ?",
    "Photos or evidence": "Photos ou preuves",
    "Customer signature": "Signature du client",
    Clear: "Effacer",
    "Work completed": "Travaux effectués",
    "Parts or settings changed": "Pièces ou réglages modifiés",
    Evidence: "Preuves",
    "Person's full name": "Nom complet de la personne",
    "Vehicle condition photos": "Photos de l’état du véhicule",
    "Customer selfie (optional)": "Photo du client (facultatif)",
    "Before washing": "Avant le lavage",
    "After washing": "Après le lavage",
    "Mileage after": "Kilométrage après",
    "Mileage (km)": "Kilométrage (km)",
    "Choose or take photos": "Choisir ou prendre des photos",
    "No photos selected": "Aucune photo sélectionnée",
    "Complete operation": "Terminer l’opération",
    Resolution: "Résolution",
    "Resolve report": "Résoudre le signalement",
    "Mark resolved": "Marquer comme résolu",
    Fuel: "Carburant",
    Changes: "Modifications",
    Description: "Description",
    "No media attached.": "Aucun média joint.",
    "Save my details": "Enregistrer mes données",
    "Postal code": "Code postal",
    City: "Ville",
    "Driving licence number": "Numéro de permis",
    "Emergency contact": "Contact d’urgence",
    inactive: "inactif",
    active: "actif",
    available: "disponible",
    reserved: "réservé",
    rented: "loué",
    maintenance: "entretien",
    cleaning: "nettoyage",
    draft: "brouillon",
    scheduled: "planifié",
    returned: "restitué",
    closed: "clôturé",
    cancelled: "annulé",
    submitted: "envoyé",
    resolved: "résolu",
    lead: "prospect",
    uploaded: "téléchargé",
    "Not completed": "Non complété",
    "Portal user": "Utilisateur du portail",
    System: "Système",
    "excl. VAT / month": "hors TVA / mois",
    "Access for": "Accès de",
    "Update account": "Modifier le compte",
    "This code is shown only once.": "Ce code n’est affiché qu’une fois.",
    "Share it privately. Anyone with this code can sign in.": "Partagez-le de façon privée.",
    "Copy code": "Copier le code",
    "Create personal access": "Créer un accès personnel",
    "Add a customer": "Ajouter un client",
    "Add a vehicle": "Ajouter un véhicule",
    "Create a rental": "Créer une location",
    "Update rental": "Modifier la location",
    "Update vehicle": "Modifier le véhicule",
    "Working…": "Traitement…",
    "Signing in…": "Connexion…",
    "Preparing evidence…": "Préparation des preuves…",
    "Saving record…": "Enregistrement…",
    "The latest records visible to your role.": "Derniers enregistrements accessibles.",
    "Choose one clear next step.": "Choisissez l’action suivante.",
    "That access code is not valid.": "Ce code d’accès n’est pas valide.",
    "This account has been disabled.": "Ce compte a été désactivé.",
    "Too many attempts. Please wait and try again.": "Trop de tentatives. Veuillez patienter.",
    "Your session expired. Sign in again.": "Votre session a expiré. Reconnectez-vous.",
    "Your role does not allow this action.": "Votre rôle ne permet pas cette action.",
    "Check the required information and try again.": "Vérifiez les champs obligatoires.",
    "Add the required photos and signature.": "Ajoutez les photos et la signature requises.",
    "Photo storage is temporarily unavailable.": "Le stockage des photos est temporairement indisponible.",
    "Something went wrong. Please try again.": "Une erreur s’est produite. Réessayez.",
  },
  nl: {
    "Skip to content": "Ga naar inhoud",
    "Sign in": "Aanmelden",
    "Use your personal access code.": "Gebruik uw persoonlijke toegangscode.",
    "Access code": "Toegangscode",
    Continue: "Doorgaan",
    "Public website": "Publieke website",
    "Sign out": "Afmelden",
    Loading: "Laden",
    "Loading…": "Laden…",
    Language: "Taal",
    "Open navigation": "Menu openen",
    "Close navigation": "Menu sluiten",
    Close: "Sluiten",
    Administrator: "Beheerder",
    Employee: "Medewerker",
    Customer: "Klant",
    Mechanic: "Mecanicien",
    "External worker": "Externe medewerker",
    "Customer space": "Klantenruimte",
    Operations: "Werkzaamheden",
    Overview: "Overzicht",
    "Access & roles": "Toegang en rollen",
    Customers: "Klanten",
    Fleet: "Wagenpark",
    Rentals: "Verhuur",
    "Audit trail": "Auditlog",
    "My details": "Mijn gegevens",
    Available: "Beschikbaar",
    Reserved: "Gereserveerd",
    Rented: "Verhuurd",
    Cleaning: "Reiniging",
    Inactive: "Inactief",
    "Active rentals": "Actieve verhuringen",
    "Open reports": "Open meldingen",
    Today: "Vandaag",
    "My rentals": "Mijn verhuringen",
    Active: "Actief",
    "Recent operations": "Recente werkzaamheden",
    "View all": "Alles bekijken",
    "Quick actions": "Snelle acties",
    Access: "Toegang",
    Rental: "Verhuur",
    Report: "Melding",
    "Check in": "Inchecken",
    "Check out": "Uitchecken",
    Wash: "Wassen",
    Maintenance: "Onderhoud",
    "Take vehicle": "Voertuig meenemen",
    "Return vehicle": "Voertuig terugbrengen",
    "Customer details": "Klantgegevens",
    "Vehicle check-in": "Voertuig inchecken",
    "Vehicle check-out": "Voertuig uitchecken",
    "Wash vehicle": "Voertuig wassen",
    "Vehicle taken": "Voertuig meegenomen",
    "Vehicle returned": "Voertuig teruggebracht",
    "Report an issue": "Probleem melden",
    "Recorded operations": "Geregistreerde werkzaamheden",
    Person: "Persoon",
    Role: "Rol",
    Status: "Status",
    "Last sign-in": "Laatste aanmelding",
    "New code": "Nieuwe code",
    Disable: "Deactiveren",
    Enable: "Activeren",
    Email: "E-mail",
    Phone: "Telefoon",
    Address: "Adres",
    Vehicle: "Voertuig",
    Format: "Formaat",
    Year: "Jaar",
    Colour: "Kleur",
    Mileage: "Kilometerstand",
    Update: "Wijzigen",
    Reference: "Referentie",
    Period: "Periode",
    Price: "Prijs",
    Operation: "Werkzaamheid",
    Date: "Datum",
    View: "Bekijken",
    Resolve: "Oplossen",
    "Create access": "Toegang aanmaken",
    "Add customer": "Klant toevoegen",
    "Add vehicle": "Voertuig toevoegen",
    "Create rental": "Verhuur aanmaken",
    "No accounts": "Geen accounts",
    "No customers": "Geen klanten",
    "No vehicles": "Geen voertuigen",
    "No rentals": "Geen verhuringen",
    "No operations recorded": "Geen werkzaamheden geregistreerd",
    "No audit events": "Geen auditgebeurtenissen",
    "Profile not linked": "Profiel niet gekoppeld",
    Save: "Opslaan",
    Cancel: "Annuleren",
    Done: "Klaar",
    "Display name": "Weergavenaam",
    "Linked customer": "Gekoppelde klant",
    "Choose…": "Kiezen…",
    "Choose a value.": "Kies een waarde.",
    "Full name": "Volledige naam",
    Company: "Bedrijf",
    "Internal notes": "Interne notities",
    "Licence plate": "Nummerplaat",
    Make: "Merk",
    Model: "Model",
    "Current mileage": "Huidige kilometerstand",
    "Fuel level (%)": "Brandstofniveau (%)",
    "Start date": "Startdatum",
    "Expected end date": "Verwachte einddatum",
    "Monthly price excl. VAT (€)": "Maandprijs excl. btw (€)",
    "Deposit (€)": "Waarborg (€)",
    "Mileage allowance": "Kilometerlimiet",
    "Update status": "Status wijzigen",
    "Operational status": "Operationele status",
    "Vehicle (optional)": "Voertuig (optioneel)",
    "Rental (optional)": "Verhuur (optioneel)",
    Category: "Categorie",
    Priority: "Prioriteit",
    Damage: "Schade",
    Mechanical: "Mechanisch",
    Administrative: "Administratief",
    Request: "Verzoek",
    Other: "Overig",
    Low: "Laag",
    Normal: "Normaal",
    Urgent: "Dringend",
    "What happened?": "Wat is er gebeurd?",
    "Photos or evidence": "Foto’s of bewijs",
    "Customer signature": "Handtekening klant",
    Clear: "Wissen",
    "Work completed": "Uitgevoerde werkzaamheden",
    "Parts or settings changed": "Gewijzigde onderdelen of instellingen",
    Evidence: "Bewijs",
    "Person's full name": "Volledige naam persoon",
    "Vehicle condition photos": "Foto’s voertuigstaat",
    "Customer selfie (optional)": "Foto van klant (optioneel)",
    "Before washing": "Voor het wassen",
    "After washing": "Na het wassen",
    "Mileage after": "Kilometerstand nadien",
    "Mileage (km)": "Kilometerstand (km)",
    "Choose or take photos": "Foto’s kiezen of nemen",
    "No photos selected": "Geen foto’s geselecteerd",
    "Complete operation": "Werkzaamheid voltooien",
    Resolution: "Oplossing",
    "Resolve report": "Melding oplossen",
    "Mark resolved": "Markeren als opgelost",
    Fuel: "Brandstof",
    Changes: "Wijzigingen",
    Description: "Beschrijving",
    "No media attached.": "Geen media toegevoegd.",
    "Save my details": "Mijn gegevens opslaan",
    "Postal code": "Postcode",
    City: "Plaats",
    "Driving licence number": "Rijbewijsnummer",
    "Emergency contact": "Noodcontact",
    inactive: "inactief",
    active: "actief",
    available: "beschikbaar",
    reserved: "gereserveerd",
    rented: "verhuurd",
    maintenance: "onderhoud",
    cleaning: "reiniging",
    draft: "concept",
    scheduled: "gepland",
    returned: "teruggebracht",
    closed: "gesloten",
    cancelled: "geannuleerd",
    submitted: "ingediend",
    resolved: "opgelost",
    lead: "lead",
    uploaded: "geüpload",
    "Not completed": "Niet ingevuld",
    "Portal user": "Portaalgebruiker",
    System: "Systeem",
    "excl. VAT / month": "excl. btw / maand",
    "Access for": "Toegang voor",
    "Update account": "Account wijzigen",
    "This code is shown only once.": "Deze code wordt maar één keer getoond.",
    "Share it privately. Anyone with this code can sign in.": "Deel de code uitsluitend privé.",
    "Copy code": "Code kopiëren",
    "Create personal access": "Persoonlijke toegang aanmaken",
    "Add a customer": "Klant toevoegen",
    "Add a vehicle": "Voertuig toevoegen",
    "Create a rental": "Verhuur aanmaken",
    "Update rental": "Verhuur wijzigen",
    "Update vehicle": "Voertuig wijzigen",
    "Working…": "Bezig…",
    "Signing in…": "Aanmelden…",
    "Preparing evidence…": "Bewijs voorbereiden…",
    "Saving record…": "Registratie opslaan…",
    "The latest records visible to your role.": "Laatste registraties voor uw rol.",
    "Choose one clear next step.": "Kies de volgende actie.",
    "That access code is not valid.": "Deze toegangscode is niet geldig.",
    "This account has been disabled.": "Dit account is gedeactiveerd.",
    "Too many attempts. Please wait and try again.": "Te veel pogingen. Wacht even en probeer opnieuw.",
    "Your session expired. Sign in again.": "Uw sessie is verlopen. Meld u opnieuw aan.",
    "Your role does not allow this action.": "Uw rol staat deze actie niet toe.",
    "Check the required information and try again.": "Controleer de verplichte gegevens.",
    "Add the required photos and signature.": "Voeg de vereiste foto’s en handtekening toe.",
    "Photo storage is temporarily unavailable.": "Foto-opslag is tijdelijk niet beschikbaar.",
    "Something went wrong. Please try again.": "Er is iets misgegaan. Probeer opnieuw.",
  },
};

const roles = {
  admin: "Administrator",
  employee: "Employee",
  customer: "Customer",
  mechanic: "Mechanic",
  contractor: "External worker",
};

const roleViews = {
  admin: ["overview", "access", "customers", "fleet", "rentals", "operations", "audit"],
  employee: ["overview", "customers", "fleet", "rentals", "operations"],
  mechanic: ["overview", "fleet", "operations"],
  contractor: ["overview", "rentals", "operations"],
  customer: ["overview", "profile", "rentals", "operations"],
};

const roleWorkflows = {
  admin: ["check_in", "check_out", "wash", "maintenance", "handover_take", "handover_return", "report"],
  employee: ["check_in", "check_out", "wash", "handover_take", "handover_return", "report"],
  mechanic: ["maintenance", "report"],
  contractor: ["check_in", "check_out", "handover_take", "handover_return", "report"],
  customer: ["customer_onboarding", "report"],
};

const viewCopy = {
  overview: ["Overview", "A clear view of what needs attention today."],
  access: ["Access & roles", "Create personal access codes and control permissions."],
  customers: ["Customers", "Customer records used by rentals and inspections."],
  fleet: ["Fleet", "Availability, mileage, and vehicle status at a glance."],
  rentals: ["Rentals", "Follow every rental from planning to closure."],
  operations: ["Operations", "Guided procedures with time-stamped evidence."],
  audit: ["Audit trail", "A traceable record of sensitive actions."],
  profile: ["My details", "Keep your personal and licence information accurate."],
};

const workflows = {
  customer_onboarding: ["01", "Customer details", "Complete your personal rental information."],
  check_in: ["02", "Vehicle check-in", "Record mileage, fuel, photos and signature."],
  check_out: ["03", "Vehicle check-out", "Document the vehicle when it returns."],
  wash: ["04", "Wash vehicle", "Capture before-and-after photos and mileage."],
  maintenance: ["05", "Maintenance", "Record the work, changes and evidence."],
  handover_take: ["06A", "Vehicle taken", "Record who takes the vehicle and its condition."],
  handover_return: ["06B", "Vehicle returned", "Record who returns the vehicle and its condition."],
  report: ["07", "Report an issue", "Report damage, a problem or a modification."],
};

const state = {
  token: localStorage.getItem(TOKEN_KEY) || "",
  data: null,
  view: location.hash.slice(1) || "overview",
  language: supportedLanguages.includes(localStorage.getItem(LANGUAGE_KEY))
    ? localStorage.getItem(LANGUAGE_KEY)
    : "en",
};

const mobileNavigation = window.matchMedia("(max-width: 820px)");

const el = {
  login: document.querySelector("#login-screen"),
  loginForm: document.querySelector("#login-form"),
  code: document.querySelector("#access-code"),
  loginMessage: document.querySelector("#login-message"),
  app: document.querySelector("#portal-app"),
  sidebar: document.querySelector("#portal-sidebar"),
  navigation: document.querySelector("#portal-navigation"),
  backdrop: document.querySelector("#sidebar-backdrop"),
  menu: document.querySelector("#menu-button"),
  view: document.querySelector("#view-root"),
  profileName: document.querySelector("#profile-name"),
  profileRole: document.querySelector("#profile-role"),
  profileAvatar: document.querySelector("#profile-avatar"),
  workspace: document.querySelector("#sidebar-workspace"),
  logout: document.querySelector("#logout-button"),
  modal: document.querySelector("#portal-modal"),
  modalKicker: document.querySelector("#modal-kicker"),
  modalTitle: document.querySelector("#modal-title"),
  modalBody: document.querySelector("#modal-body"),
  modalClose: document.querySelector("#modal-close"),
  toasts: document.querySelector("#toast-region"),
};

const clean = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function tr(value = "") {
  return translations[state.language]?.[String(value)] || String(value);
}

function translateTree(root) {
  if (!root || state.language === "en") return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (node.parentElement?.closest("script, style")) return;
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (!trimmed) return;
    const translated = tr(trimmed);
    if (translated !== trimmed) node.nodeValue = original.replace(trimmed, translated);
  });
}

function applyLanguage(language, rerender = true) {
  state.language = supportedLanguages.includes(language) ? language : "en";
  localStorage.setItem(LANGUAGE_KEY, state.language);
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === state.language));
  });
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = tr(node.dataset.i18n);
  });
  document.querySelectorAll('[aria-label="Language"]').forEach((node) => node.setAttribute("aria-label", tr("Language")));
  el.menu.setAttribute("aria-label", tr("Open navigation"));
  el.backdrop.setAttribute("aria-label", tr("Close navigation"));
  el.modalClose.setAttribute("aria-label", tr("Close"));
  if (rerender && state.data) {
    closeModal();
    renderNavigation();
    render();
  }
}

function initials(name) {
  return String(name || "Y")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function date(value, time = false) {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return new Intl.DateTimeFormat(languageLocales[state.language], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(time ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(parsed);
}

function money(cents) {
  return new Intl.NumberFormat(languageLocales[state.language], {
    style: "currency",
    currency: "EUR",
  }).format((Number(cents) || 0) / 100);
}

function badge(status) {
  return `<span class="status-badge ${clean(status)}">${clean(tr(status || "unknown"))}</span>`;
}

function toast(message, type = "success") {
  const node = document.createElement("div");
  node.className = `toast ${type}`;
  node.innerHTML = `<span>${type === "error" ? "!" : "✓"}</span><span>${clean(tr(message))}</span>`;
  el.toasts.append(node);
  setTimeout(() => node.remove(), 4500);
}

function messageFor(error) {
  const messages = {
    invalid_credentials: "That access code is not valid.",
    account_inactive: "This account has been disabled.",
    rate_limited: "Too many attempts. Please wait and try again.",
    unauthorized: "Your session expired. Sign in again.",
    forbidden: "Your role does not allow this action.",
    validation_failed: "Check the required information and try again.",
    media_required: "Add the required photos and signature.",
    media_service_unavailable: "Photo storage is temporarily unavailable.",
    customer_link_required: "Choose a customer for this customer account.",
    customer_already_linked: "That customer already has an access account.",
    vehicle_unavailable: "That vehicle is not available for a new rental.",
    vehicle_has_open_rental: "This vehicle still has a scheduled or active rental.",
  };
  return tr(messages[error?.message] || "Something went wrong. Please try again.");
}

async function api(path, { method = "GET", body, headers = {} } = {}) {
  const requestHeaders = new Headers(headers);
  if (state.token) requestHeaders.set("Authorization", `Bearer ${state.token}`);
  if (body && !(body instanceof Blob)) requestHeaders.set("Content-Type", "application/json");
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: requestHeaders,
    body: body && !(body instanceof Blob) ? JSON.stringify(body) : body,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || "request_failed");
    error.status = response.status;
    throw error;
  }
  return result;
}

function busy(button, active, text = "Working…") {
  if (!button) return;
  if (active) {
    button.dataset.label = button.innerHTML;
    button.disabled = true;
    button.textContent = tr(text);
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.label || button.innerHTML;
  }
}

function showLogin() {
  el.app.hidden = true;
  el.login.hidden = false;
  requestAnimationFrame(() => el.code.focus());
}

function showApp() {
  el.login.hidden = true;
  el.app.hidden = false;
}

async function refresh() {
  try {
    const result = await api("/api/portal/data");
    state.data = result.data;
    const allowed = roleViews[result.data.account.role] || ["overview"];
    if (!allowed.includes(state.view)) state.view = "overview";
    showApp();
    renderNavigation();
    render();
  } catch (error) {
    if (error.status === 401) {
      state.token = "";
      localStorage.removeItem(TOKEN_KEY);
      showLogin();
    }
    throw error;
  }
}

function renderNavigation() {
  const account = state.data.account;
  el.profileName.textContent = account.displayName;
  el.profileRole.textContent = roles[account.role] || account.role;
  el.profileAvatar.textContent = initials(account.displayName);
  el.workspace.textContent = account.role === "customer" ? "Customer space" : "Operations";
  el.navigation.innerHTML = roleViews[account.role]
    .map(
      (view, index) => `<button class="nav-button ${state.view === view ? "active" : ""}" data-view="${view}">
        <span class="nav-icon">${String(index + 1).padStart(2, "0")}</span>
        <strong>${clean(viewCopy[view][0])}</strong>
      </button>`,
    )
    .join("");
  translateTree(el.sidebar);
}

function header(actions = "") {
  const [title] = viewCopy[state.view];
  return `<header class="view-header">
    <div><h1>${clean(title)}</h1></div>
    ${actions ? `<div class="view-actions">${actions}</div>` : ""}
  </header>`;
}

function empty(title, description, action = "") {
  return `<div class="empty-state"><span>YB</span><h3>${clean(title)}</h3>${action}</div>`;
}

function table(head, rows) {
  return `<div class="data-panel"><div class="table-wrap"><table class="data-table">
    <thead><tr>${head.map((item) => `<th>${clean(item)}</th>`).join("")}</tr></thead>
    <tbody>${rows}</tbody>
  </table></div></div>`;
}

function maps() {
  return {
    accounts: new Map(state.data.accounts.map((item) => [item.id, item])),
    customers: new Map(state.data.customers.map((item) => [item.id, item])),
    vehicles: new Map(state.data.vehicles.map((item) => [item.id, item])),
    rentals: new Map(state.data.rentals.map((item) => [item.id, item])),
  };
}

function render() {
  const views = {
    overview: renderOverview,
    access: renderAccess,
    customers: renderCustomers,
    fleet: renderFleet,
    rentals: renderRentals,
    operations: renderOperations,
    audit: renderAudit,
    profile: renderProfile,
  };
  (views[state.view] || renderOverview)();
  translateTree(el.view);
}

function quickActions() {
  const role = state.data.account.role;
  const choices = {
    admin: [
      ["Access", "Create a personal code", "access"],
      ["Fleet", "Register a vehicle", "fleet"],
      ["Rental", "Connect customer and vehicle", "rentals"],
      ["Report", "Record a new issue", "report"],
    ],
    employee: [
      ["Check in", "Begin a rental inspection", "check_in"],
      ["Check out", "Record a return", "check_out"],
      ["Wash", "Add before and after evidence", "wash"],
      ["Report", "Flag a problem", "report"],
    ],
    mechanic: [
      ["Maintenance", "Record completed work", "maintenance"],
      ["Report", "Flag another concern", "report"],
    ],
    contractor: [
      ["Take vehicle", "Complete a handover", "handover_take"],
      ["Return vehicle", "Complete a return", "handover_return"],
      ["Report", "Flag a problem", "report"],
    ],
    customer: [
      ["My details", "Complete personal information", "profile"],
      ["My rentals", "Review rental history", "rentals"],
      ["Report", "Tell us about a problem", "report"],
    ],
  };
  return choices[role] || [];
}

function renderOverview() {
  const role = state.data.account.role;
  const vehicles = state.data.vehicles;
  const rentals = state.data.rentals;
  const records = state.data.workflows;
  const openReports = records.filter((item) => item.type === "report" && item.status !== "resolved");
  const metrics =
    role === "customer"
      ? [
          ["My rentals", rentals.length],
          ["Active", rentals.filter((r) => ["scheduled", "active"].includes(r.status)).length],
          ["Open reports", openReports.length],
        ]
      : [
          ["Available", vehicles.filter((v) => v.status === "available").length],
          ["Active rentals", rentals.filter((r) => ["scheduled", "active"].includes(r.status)).length],
          ["Open reports", openReports.length],
          ["Today", records.filter((r) => new Date(r.occurredAt).toDateString() === new Date().toDateString()).length],
        ];
  const actions = quickActions();
  el.view.innerHTML = `${header()}
    <section class="metric-grid">${metrics
      .map(([label, value]) => `<article class="metric-card"><span>${clean(label)}</span><strong>${value}</strong></article>`)
      .join("")}</section>
    <div class="content-grid">
      <section class="panel">
        <div class="panel-head"><div><h2>Recent operations</h2></div><button class="text-button" data-view="operations">View all</button></div>
        ${recordTable(records.slice(0, 5), true)}
      </section>
      <section class="panel">
        <div class="panel-head"><div><h2>Quick actions</h2></div></div>
        <div class="quick-actions">${actions
          .map(([title, , target], index) => `<button class="quick-action" ${workflows[target] ? `data-workflow="${target}"` : `data-view="${target}"`}>
            <span>${String(index + 1).padStart(2, "0")}</span><span><strong>${clean(title)}</strong></span><span>→</span>
          </button>`)
          .join("")}</div>
      </section>
    </div>`;
}

function renderAccess() {
  const accounts = state.data.accounts;
  const rows = accounts
    .map(
      (account) => `<tr>
        <td><strong>${clean(account.displayName)}</strong><small>•••• ${clean(account.codeHint)}</small></td>
        <td>${clean(roles[account.role])}</td><td>${badge(account.active ? "active" : "inactive")}</td>
        <td>${date(account.lastLoginAt, true)}</td>
        <td><div class="table-actions"><button class="icon-button" data-action="rotate-code" data-id="${account.id}">New code</button>
        ${account.id !== state.data.account.id ? `<button class="icon-button" data-action="toggle-account" data-id="${account.id}" data-active="${account.active}">${account.active ? "Disable" : "Enable"}</button>` : ""}</div></td>
      </tr>`,
    )
    .join("");
  el.view.innerHTML = `${header('<button class="primary-button" data-action="create-account">Create access</button>')}
    ${accounts.length ? table(["Person", "Role", "Status", "Last sign-in", ""], rows) : empty("No accounts", "Create the first personal access code.")}`;
}

function renderCustomers() {
  const customers = state.data.customers;
  const canCreate = ["admin", "employee"].includes(state.data.account.role);
  const rows = customers
    .map(
      (customer) => `<tr><td><strong>${clean(customer.fullName)}</strong><small>${clean(customer.company || "")}</small></td>
      <td>${clean(customer.email)}</td><td>${clean(customer.phone)}</td><td>${clean([customer.address, customer.postalCode, customer.city].filter(Boolean).join(", ") || "Not completed")}</td><td>${badge(customer.status)}</td></tr>`,
    )
    .join("");
  el.view.innerHTML = `${header(canCreate ? '<button class="primary-button" data-action="create-customer">Add customer</button>' : "")}
    ${customers.length ? table(["Customer", "Email", "Phone", "Address", "Status"], rows) : empty("No customers", "Add a customer before creating a rental.")}`;
}

function renderFleet() {
  const vehicles = state.data.vehicles;
  const canUpdate = ["admin", "employee"].includes(state.data.account.role);
  const rows = vehicles
    .map(
      (vehicle) => `<tr><td><strong>${clean(vehicle.registrationPlate)}</strong><small>${clean(vehicle.make)} ${clean(vehicle.model)}</small></td>
      <td>${clean(vehicle.format.toUpperCase())}</td><td>${clean(vehicle.year)}</td><td>${clean(vehicle.color)}</td>
      <td>${vehicle.currentMileage.toLocaleString(languageLocales[state.language])} km</td><td>${badge(vehicle.status)}</td>
      ${canUpdate ? `<td><button class="icon-button" data-action="vehicle-status" data-id="${vehicle.id}">Update</button></td>` : ""}</tr>`,
    )
    .join("");
  el.view.innerHTML = `${header(state.data.account.role === "admin" ? '<button class="primary-button" data-action="create-vehicle">Add vehicle</button>' : "")}
    ${vehicles.length ? table(["Vehicle", "Format", "Year", "Colour", "Mileage", "Status", ...(canUpdate ? [""] : [])], rows) : empty("No vehicles", "An administrator must register the fleet.")}`;
}

function renderRentals() {
  const dataMaps = maps();
  const rentals = state.data.rentals;
  const admin = state.data.account.role === "admin";
  const rows = rentals
    .map((rental) => {
      const customer = dataMaps.customers.get(rental.customerId);
      const vehicle = dataMaps.vehicles.get(rental.vehicleId);
      return `<tr><td><strong>${clean(rental.reference)}</strong></td><td>${clean(customer?.fullName || "—")}</td>
        <td>${clean(vehicle ? `${vehicle.registrationPlate} · ${vehicle.make} ${vehicle.model}` : "—")}</td>
        <td>${date(rental.startDate)} → ${date(rental.expectedEndDate)}</td>
        <td>${money(rental.monthlyPriceCents)}<small>excl. VAT / month</small></td><td>${badge(rental.status)}</td>
        ${admin ? `<td><button class="icon-button" data-action="rental-status" data-id="${rental.id}">Update</button></td>` : ""}</tr>`;
    })
    .join("");
  el.view.innerHTML = `${header(admin ? '<button class="primary-button" data-action="create-rental">Create rental</button>' : "")}
    ${rentals.length ? table(["Reference", "Customer", "Vehicle", "Period", "Price", "Status", ...(admin ? [""] : [])], rows) : empty("No rentals", admin ? "Create a rental after adding a customer and vehicle." : "No rentals are connected to this account.")}`;
}

function renderOperations() {
  const allowed = roleWorkflows[state.data.account.role] || [];
  el.view.innerHTML = `${header()}
    <section class="workflow-grid">${allowed
      .map((type) => `<button class="workflow-card" data-workflow="${type}"><span>${workflows[type][0]}</span><strong>${clean(workflows[type][1])}</strong></button>`)
      .join("")}</section>
    <section class="panel"><div class="panel-head"><div><h2>Recorded operations</h2></div></div>${recordTable(state.data.workflows)}</section>`;
}

function recordTable(records, compact = false) {
  if (!records.length) return empty("No operations recorded", "Completed procedures appear here.");
  const dataMaps = maps();
  const rows = records
    .map((record) => {
      const vehicle = dataMaps.vehicles.get(record.vehicleId);
      const account = dataMaps.accounts.get(record.actorAccountId);
      return `<tr><td><strong>${clean(workflows[record.type]?.[1] || record.type)}</strong><small>${clean(record.reference)}</small></td>
        <td>${clean(vehicle ? vehicle.registrationPlate : record.licensePlate || "—")}</td>
        ${compact ? "" : `<td>${clean(account?.displayName || "Portal user")}</td>`}<td>${date(record.occurredAt, true)}</td>
        <td>${badge(record.status)}</td><td><div class="table-actions"><button class="icon-button" data-action="view-record" data-id="${record.id}">View</button>
        ${record.type === "report" && record.status !== "resolved" && ["admin", "employee"].includes(state.data.account.role) ? `<button class="icon-button" data-action="resolve-report" data-id="${record.id}">Resolve</button>` : ""}</div></td></tr>`;
    })
    .join("");
  return table(["Operation", "Vehicle", ...(compact ? [] : ["Person"]), "Date", "Status", ""], rows);
}

function renderAudit() {
  const dataMaps = maps();
  el.view.innerHTML = `${header()}<section class="panel">${state.data.auditEvents.length
    ? `<div class="timeline">${state.data.auditEvents
        .map((event) => `<article class="timeline-item"><strong>${clean(event.summary)}</strong><span>${clean(dataMaps.accounts.get(event.actorAccountId)?.displayName || "System")} · ${date(event.createdAt, true)}</span></article>`)
        .join("")}</div>`
    : empty("No audit events", "Sensitive changes will appear here.")}</section>`;
}

function renderProfile() {
  const customer = state.data.customers[0];
  if (!customer) {
    el.view.innerHTML = `${header()}${empty("Profile not linked", "Ask an administrator to link this account to a customer record.")}`;
    return;
  }
  el.view.innerHTML = `${header()}<section class="panel"><form class="portal-form" id="profile-form">
    <div class="form-grid">
      ${field("Full name", "fullName", customer.fullName, true)}
      ${field("Company", "company", customer.company || "")}
      ${field("Email", "email", customer.email, true, "email")}
      ${field("Phone", "phone", customer.phone, true, "tel")}
      ${field("Address", "address", customer.address || "", true)}
      ${field("Postal code", "postalCode", customer.postalCode || "", true)}
      ${field("City", "city", customer.city || "", true)}
      ${field("Driving licence number", "drivingLicenseNumber", customer.drivingLicenseNumber || "", true)}
      ${field("Emergency contact", "emergencyContact", customer.emergencyContact || "")}
    </div>
    <div class="form-submit-row"><button class="primary-button" type="submit">Save my details</button></div>
  </form></section>`;
}

function field(label, name, value = "", required = false, type = "text", attributes = "") {
  return `<div class="field"><label for="field-${clean(name)}">${clean(tr(label))}${required ? " *" : ""}</label>
    <input id="field-${clean(name)}" type="${clean(type)}" name="${clean(name)}" value="${clean(value)}" ${required ? "required" : ""} ${attributes}></div>`;
}

let selectSequence = 0;

function select(label, name, options, required = false) {
  const id = `custom-select-${selectSequence += 1}`;
  return `<div class="field custom-select-field">
    <label id="${id}-label">${clean(tr(label))}${required ? " *" : ""}</label>
    <div class="custom-select" data-custom-select data-required="${required}">
      <input type="hidden" name="${clean(name)}" value="">
      <button class="custom-select-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="${id}-label ${id}-value">
        <span class="custom-select-value placeholder" id="${id}-value">${clean(tr("Choose…"))}</span>
        <span class="custom-select-chevron" aria-hidden="true"></span>
      </button>
      <div class="custom-select-menu" role="listbox" aria-labelledby="${id}-label" hidden>
        ${options.map(([value, text]) => `<button class="custom-select-option" type="button" role="option" data-value="${clean(value)}" aria-selected="false">${clean(tr(text))}</button>`).join("")}
      </div>
    </div>
  </div>`;
}

function closeCustomSelect(customSelect, returnFocus = false) {
  if (!customSelect) return;
  customSelect.classList.remove("open");
  const trigger = customSelect.querySelector(".custom-select-trigger");
  const menu = customSelect.querySelector(".custom-select-menu");
  trigger.setAttribute("aria-expanded", "false");
  menu.hidden = true;
  if (returnFocus) trigger.focus();
}

function closeAllCustomSelects(except = null) {
  document.querySelectorAll("[data-custom-select].open").forEach((customSelect) => {
    if (customSelect !== except) closeCustomSelect(customSelect);
  });
}

function chooseCustomOption(customSelect, option, notify = true) {
  if (!customSelect || !option) return;
  const input = customSelect.querySelector('input[type="hidden"]');
  const value = customSelect.querySelector(".custom-select-value");
  customSelect.querySelectorAll(".custom-select-option").forEach((item) => {
    item.setAttribute("aria-selected", String(item === option));
  });
  input.value = option.dataset.value;
  value.textContent = option.textContent;
  value.classList.remove("placeholder");
  customSelect.classList.remove("invalid");
  closeCustomSelect(customSelect, true);
  if (notify) input.dispatchEvent(new Event("change", { bubbles: true }));
}

function openCustomSelect(customSelect) {
  closeAllCustomSelects(customSelect);
  const trigger = customSelect.querySelector(".custom-select-trigger");
  const menu = customSelect.querySelector(".custom-select-menu");
  customSelect.classList.add("open");
  trigger.setAttribute("aria-expanded", "true");
  menu.hidden = false;
  requestAnimationFrame(() => {
    (menu.querySelector('[aria-selected="true"]') || menu.querySelector(".custom-select-option"))?.focus();
  });
}

function setupCustomSelects(root) {
  root.querySelectorAll("[data-custom-select]").forEach((customSelect) => {
    const trigger = customSelect.querySelector(".custom-select-trigger");
    const options = [...customSelect.querySelectorAll(".custom-select-option")];
    trigger.addEventListener("click", () => {
      if (customSelect.classList.contains("open")) closeCustomSelect(customSelect);
      else openCustomSelect(customSelect);
    });
    trigger.addEventListener("keydown", (event) => {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openCustomSelect(customSelect);
      }
    });
    options.forEach((option, index) => {
      option.addEventListener("click", () => chooseCustomOption(customSelect, option));
      option.addEventListener("keydown", (event) => {
        let target = null;
        if (event.key === "ArrowDown") target = options[(index + 1) % options.length];
        if (event.key === "ArrowUp") target = options[(index - 1 + options.length) % options.length];
        if (event.key === "Home") target = options[0];
        if (event.key === "End") target = options.at(-1);
        if (target) {
          event.preventDefault();
          target.focus();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          closeCustomSelect(customSelect, true);
        }
      });
    });
  });
}

function setCustomValue(root, name, selectedValue) {
  const input = root.querySelector(`input[type="hidden"][name="${CSS.escape(name)}"]`);
  if (!input) return;
  const customSelect = input.closest("[data-custom-select]");
  if (!selectedValue) {
    input.value = "";
    customSelect.querySelectorAll(".custom-select-option").forEach((item) => item.setAttribute("aria-selected", "false"));
    const value = customSelect.querySelector(".custom-select-value");
    value.textContent = tr("Choose…");
    value.classList.add("placeholder");
    return;
  }
  const option = [...customSelect.querySelectorAll(".custom-select-option")].find((item) => item.dataset.value === selectedValue);
  if (option) chooseCustomOption(customSelect, option, false);
}

function modal({ kicker = "YABI", title, content, submit = "Save", handler }) {
  el.modalKicker.textContent = tr(kicker);
  el.modalTitle.textContent = tr(title);
  el.modalBody.innerHTML = content;
  const form = el.modalBody.querySelector("form");
  if (form && handler) {
    form.insertAdjacentHTML("beforeend", `<div class="form-submit-row"><button class="ghost-button" type="button" data-close>${clean(tr("Cancel"))}</button><button class="primary-button" type="submit">${clean(tr(submit))}</button></div>`);
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const missing = [...form.querySelectorAll('[data-custom-select][data-required="true"]')].find(
        (customSelect) => !customSelect.querySelector('input[type="hidden"]').value,
      );
      if (missing) {
        missing.classList.add("invalid");
        missing.querySelector(".custom-select-trigger").focus();
        toast("Choose a value.", "error");
        return;
      }
      const button = form.querySelector('[type="submit"]');
      busy(button, true);
      try {
        await handler(new FormData(form), form);
      } catch (error) {
        toast(messageFor(error), "error");
      } finally {
        busy(button, false);
      }
    });
  }
  translateTree(el.modalBody);
  setupCustomSelects(el.modalBody);
  el.modalBody.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
  el.modal.showModal();
}

function closeModal() {
  if (el.modal.open) el.modal.close();
  el.modalBody.innerHTML = "";
}

function revealCode(person, code) {
  modal({
    title: `Access for ${person}`,
    content: `<div class="code-reveal"><p>This code is shown only once.</p><strong>${clean(code)}</strong><small>Share it privately. Anyone with this code can sign in.</small></div>
      <div class="form-submit-row"><button class="ghost-button" id="copy-code">Copy code</button><button class="primary-button" data-close>Done</button></div>`,
  });
  el.modalBody.querySelector("#copy-code").addEventListener("click", async () => {
    await navigator.clipboard.writeText(code);
    toast("Access code copied.");
  });
  el.modalBody.querySelector("[data-close]").addEventListener("click", closeModal);
}

function createAccount() {
  modal({
    title: "Create personal access",
    submit: "Create access",
    content: `<form class="portal-form">${field("Display name", "displayName", "", true)}
      ${select("Role", "role", Object.entries(roles), true)}
      <div id="customer-link" hidden>${select("Linked customer", "linkedCustomerId", state.data.customers.map((c) => [c.id, c.fullName]), true)}</div></form>`,
    handler: async (data) => {
      const body = { operation: "create_account", displayName: data.get("displayName"), role: data.get("role") };
      if (body.role === "customer") body.linkedCustomerId = data.get("linkedCustomerId");
      const result = await api("/api/portal/admin", { method: "POST", body });
      closeModal();
      await refresh();
      revealCode(body.displayName, result.accessCode);
    },
  });
  const role = el.modalBody.querySelector('[name="role"]');
  const wrapper = el.modalBody.querySelector("#customer-link");
  const customerSelect = wrapper.querySelector("[data-custom-select]");
  role.addEventListener("change", () => {
    wrapper.hidden = role.value !== "customer";
    customerSelect.dataset.required = String(role.value === "customer");
    if (role.value !== "customer") setCustomValue(wrapper, "linkedCustomerId", "");
  });
}

function createCustomer() {
  modal({
    title: "Add a customer",
    submit: "Add customer",
    content: `<form class="portal-form"><div class="form-grid">${field("Full name", "fullName", "", true)}
      ${field("Company", "company")}${field("Email", "email", "", true, "email")}${field("Phone", "phone", "", true, "tel")}</div>
      <div class="field"><label>Internal notes</label><textarea name="notes"></textarea></div></form>`,
    handler: async (data) => {
      await api("/api/portal/admin", { method: "POST", body: { operation: "create_customer", ...Object.fromEntries(data) } });
      closeModal();
      toast("Customer added.");
      await refresh();
    },
  });
}

function createVehicle() {
  modal({
    title: "Add a vehicle",
    submit: "Add vehicle",
    content: `<form class="portal-form"><div class="form-grid">
      ${field("Licence plate", "registrationPlate", "", true)}${field("Make", "make", "", true)}
      ${field("Model", "model", "", true)}${select("Format", "format", [["l1h1", "L1H1"], ["l2h2", "L2H2"], ["l3h2", "L3H2"]], true)}
      ${field("Year", "year", "", true, "number", 'min="1990" max="2100"')}${field("Colour", "color", "", true)}
      ${field("Current mileage", "currentMileage", "0", true, "number", 'min="0"')}${field("Fuel level (%)", "fuelPercent", "", false, "number", 'min="0" max="100"')}
      ${field("VIN", "vin")}</div></form>`,
    handler: async (data) => {
      const values = Object.fromEntries(data);
      values.year = Number(values.year);
      values.currentMileage = Number(values.currentMileage);
      if (values.fuelPercent) values.fuelPercent = Number(values.fuelPercent);
      await api("/api/portal/admin", { method: "POST", body: { operation: "create_vehicle", ...values } });
      closeModal();
      toast("Vehicle added.");
      await refresh();
    },
  });
}

function createRental() {
  if (!state.data.customers.length || !state.data.vehicles.length) {
    toast("Add a customer and an available vehicle first.", "error");
    return;
  }
  modal({
    title: "Create a rental",
    submit: "Create rental",
    content: `<form class="portal-form"><div class="form-grid">
      ${select("Customer", "customerId", state.data.customers.filter((c) => c.status === "active").map((c) => [c.id, c.fullName]), true)}
      ${select("Vehicle", "vehicleId", state.data.vehicles.filter((v) => ["available", "reserved"].includes(v.status)).map((v) => [v.id, `${v.registrationPlate} · ${v.make} ${v.model}`]), true)}
      ${field("Start date", "startDate", "", true, "date")}${field("Expected end date", "expectedEndDate", "", false, "date")}
      ${field("Monthly price excl. VAT (€)", "monthlyPrice", "", true, "number", 'min="0" step="0.01"')}
      ${field("Deposit (€)", "deposit", "", false, "number", 'min="0" step="0.01"')}
      ${field("Mileage allowance", "mileageAllowance", "", false, "number", 'min="0"')}</div>
      <div class="field"><label>Internal notes</label><textarea name="notes"></textarea></div></form>`,
    handler: async (data) => {
      const values = Object.fromEntries(data);
      values.monthlyPriceCents = Math.round(Number(values.monthlyPrice) * 100);
      values.depositCents = values.deposit ? Math.round(Number(values.deposit) * 100) : undefined;
      values.mileageAllowance = values.mileageAllowance ? Number(values.mileageAllowance) : undefined;
      delete values.monthlyPrice;
      delete values.deposit;
      const result = await api("/api/portal/admin", { method: "POST", body: { operation: "create_rental", ...values } });
      closeModal();
      toast(`Rental ${result.reference} created.`);
      await refresh();
    },
  });
}

function updateRental(id) {
  const rental = state.data.rentals.find((item) => item.id === id);
  modal({
    title: `Update ${rental.reference}`,
    submit: "Update status",
    content: `<form class="portal-form">${select("Status", "status", ["draft", "scheduled", "active", "returned", "closed", "cancelled"].map((item) => [item, item]), true)}</form>`,
    handler: async (data) => {
      await api("/api/portal/admin", { method: "POST", body: { operation: "update_rental_status", rentalId: id, status: data.get("status") } });
      closeModal();
      toast("Rental status updated.");
      await refresh();
    },
  });
  setCustomValue(el.modalBody, "status", rental.status);
}

function updateVehicle(id) {
  const vehicle = state.data.vehicles.find((item) => item.id === id);
  modal({
    title: `Update ${vehicle.registrationPlate}`,
    submit: "Update status",
    content: `<form class="portal-form">${select(
      "Operational status",
      "status",
      [
        ["available", "Available"],
        ["reserved", "Reserved"],
        ["rented", "Rented"],
        ["maintenance", "Maintenance"],
        ["cleaning", "Cleaning"],
        ["inactive", "Inactive"],
      ],
      true,
    )}</form>`,
    handler: async (data) => {
      await api("/api/portal/admin", {
        method: "POST",
        body: {
          operation: "update_vehicle_status",
          vehicleId: id,
          status: data.get("status"),
        },
      });
      closeModal();
      toast("Vehicle status updated.");
      await refresh();
    },
  });
  setCustomValue(el.modalBody, "status", vehicle.status);
}

function uploadField(label, name, category, required = false) {
  return `<div class="upload-field"><label>${clean(tr(label))}${required ? " *" : ""}</label><label class="upload-drop">
    <input type="file" name="${clean(name)}" accept="image/jpeg,image/png,image/webp" data-category="${clean(category)}" multiple ${required ? "required" : ""}>
    <strong>${clean(tr("Choose or take photos"))}</strong><span>JPG, PNG or WebP · 8 MB</span></label><div class="file-summary">${clean(tr("No photos selected"))}</div></div>`;
}

function signature() {
  return `<div class="signature-wrap"><div class="signature-controls"><span>${clean(tr("Customer signature"))} *</span><button type="button" data-clear-signature>${clean(tr("Clear"))}</button></div>
    <canvas class="signature-canvas" id="signature-canvas"></canvas></div>`;
}

function workflowForm(type) {
  const dataMaps = maps();
  const vehicles = state.data.vehicles.map((v) => [v.id, `${v.registrationPlate} · ${v.make} ${v.model}`]);
  const rentals = state.data.rentals
    .filter((r) => !["closed", "cancelled"].includes(r.status))
    .map((r) => [r.id, `${r.reference} · ${dataMaps.vehicles.get(r.vehicleId)?.registrationPlate || "vehicle"}`]);
  const vehicle = select("Vehicle", "vehicleId", vehicles, true);
  const rental = select("Rental", "rentalId", rentals, true);
  const mileage = field("Mileage (km)", "mileage", "", true, "number", 'min="0"');
  if (["check_in", "check_out"].includes(type)) {
    return `<form class="portal-form">${rental}<div class="form-grid">${mileage}${field("Fuel level (%)", "fuelPercent", "", true, "number", 'min="0" max="100"')}</div>
      <div class="upload-grid">${uploadField("Vehicle condition photos", "condition", "vehicle_exterior", true)}${uploadField("Customer selfie (optional)", "selfie", "selfie")}</div>${signature()}</form>`;
  }
  if (type === "wash") {
    return `<form class="portal-form">${vehicle}<div class="form-grid">${mileage}${field("Mileage after", "mileageAfter", "", true, "number", 'min="0"')}</div>
      <div class="upload-grid">${uploadField("Before washing", "before", "before", true)}${uploadField("After washing", "after", "after", true)}</div></form>`;
  }
  if (type === "maintenance") {
    return `<form class="portal-form">${vehicle}${mileage}<div class="field"><label>${clean(tr("Work completed"))} *</label><textarea name="maintenanceWork" required></textarea></div>
      <div class="field"><label>${clean(tr("Parts or settings changed"))}</label><textarea name="changesMade"></textarea></div>${uploadField("Evidence", "evidence", "maintenance")}</form>`;
  }
  if (["handover_take", "handover_return"].includes(type)) {
    return `<form class="portal-form">${vehicle}<div class="form-grid">${field("Person's full name", "personName", state.data.account.displayName, true)}${mileage}</div>
      ${uploadField("Vehicle condition photos", "handover", type === "handover_take" ? "before" : "after", true)}</form>`;
  }
  return `<form class="portal-form">${select("Vehicle (optional)", "vehicleId", vehicles)}${select("Rental (optional)", "rentalId", rentals)}
    <div class="form-grid">${select("Category", "reportCategory", [["damage", "Damage"], ["mechanical", "Mechanical"], ["administrative", "Administrative"], ["request", "Request"], ["other", "Other"]], true)}
    ${select("Priority", "reportPriority", [["low", "Low"], ["normal", "Normal"], ["urgent", "Urgent"]], true)}</div>
    <div class="field"><label>${clean(tr("What happened?"))} *</label><textarea name="description" required></textarea></div>${uploadField("Photos or evidence", "report", "damage")}</form>`;
}

function openWorkflow(type) {
  if (type === "customer_onboarding") {
    navigate("profile");
    return;
  }
  if (!roleWorkflows[state.data.account.role].includes(type)) {
    toast("This operation is not available for your role.", "error");
    return;
  }
  modal({
    kicker: `Procedure ${workflows[type][0]}`,
    title: workflows[type][1],
    submit: "Complete operation",
    content: workflowForm(type),
    handler: async (formData, form) => {
      const signatureCanvas = form.querySelector("#signature-canvas");
      if (signatureCanvas && signatureCanvas.dataset.signed !== "true") throw new Error("media_required");
      const files = [];
      form.querySelectorAll('input[type="file"]').forEach((input) => {
        [...input.files].forEach((file) => files.push({ file, category: input.dataset.category }));
      });
      if (
        (["check_in", "check_out"].includes(type) &&
          form.querySelector('[name="condition"]').files.length < 2) ||
        (["handover_take", "handover_return"].includes(type) &&
          form.querySelector('[name="handover"]').files.length < 2)
      ) {
        throw new Error("media_required");
      }
      if (signatureCanvas) {
        const blob = await canvasBlob(signatureCanvas);
        files.push({ file: new File([blob], "customer-signature.webp", { type: "image/webp" }), category: "signature" });
      }
      const progress = document.createElement("div");
      progress.className = "upload-progress visible";
      progress.innerHTML = '<div class="progress-track"><i></i></div><span>Preparing evidence…</span>';
      form.querySelector(".form-submit-row").before(progress);
      const uploadGroupId = crypto.randomUUID();
      const mediaIds = await upload(files, uploadGroupId, (done, total) => {
        progress.querySelector("i").style.width = `${Math.round((done / Math.max(1, total)) * 100)}%`;
        progress.querySelector("span").textContent = total ? `Uploading evidence ${Math.ceil(done)} of ${total}` : "Saving record…";
      });
      const values = Object.fromEntries(formData);
      ["mileage", "mileageAfter", "fuelPercent"].forEach((key) => {
        if (values[key]) values[key] = Number(values[key]);
        else delete values[key];
      });
      if (values.rentalId && !values.vehicleId) {
        const selectedRental = state.data.rentals.find((r) => r.id === values.rentalId);
        values.vehicleId = selectedRental?.vehicleId;
        values.customerId = selectedRental?.customerId;
      }
      await api("/api/portal/workflows", { method: "POST", body: { type, uploadGroupId, mediaIds, ...values } });
      closeModal();
      toast(`${workflows[type][1]} recorded.`);
      await refresh();
      navigate("operations");
    },
  });
  bindUploads();
  bindSignature();
}

function bindUploads() {
  el.modalBody.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", () => {
      input.closest(".upload-field").querySelector(".file-summary").textContent =
        input.files.length ? `${input.files.length} photo${input.files.length === 1 ? "" : "s"} selected` : "No photos selected";
    });
  });
}

function bindSignature() {
  const canvas = el.modalBody.querySelector("#signature-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  requestAnimationFrame(() => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    context.scale(ratio, ratio);
    context.strokeStyle = "#062f69";
    context.lineWidth = 2.2;
    context.lineCap = "round";
  });
  let drawing = false;
  const point = (event) => {
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
  };
  canvas.addEventListener("pointerdown", (event) => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(...point(event));
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!drawing) return;
    context.lineTo(...point(event));
    context.stroke();
    canvas.dataset.signed = "true";
  });
  canvas.addEventListener("pointerup", () => (drawing = false));
  el.modalBody.querySelector("[data-clear-signature]").addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    delete canvas.dataset.signed;
  });
}

async function optimise(file) {
  if (file.size > 20_000_000) throw new Error("upload_failed");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.84));
  if (!blob || blob.size > 8_000_000) throw new Error("upload_failed");
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
}

function canvasBlob(canvas) {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("upload_failed"))), "image/webp", 0.9));
}

async function upload(files, uploadGroupId, progress) {
  const ids = [];
  for (let index = 0; index < files.length; index += 1) {
    progress(index, files.length);
    const file = await optimise(files[index].file);
    const prepared = await api("/api/portal/uploads", {
      method: "POST",
      body: { uploadGroupId, fileName: file.name, contentType: file.type, size: file.size, category: files[index].category },
    });
    const response = await fetch(prepared.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
    if (!response.ok) throw new Error("upload_failed");
    ids.push(prepared.mediaId);
    progress(index + 1, files.length);
  }
  return ids;
}

async function viewRecord(id) {
  try {
    const result = await api("/api/portal/record-media", { method: "POST", body: { recordId: id } });
    const record = state.data.workflows.find((item) => item.id === id);
    const details = [
      ["Mileage", record.mileage != null ? `${record.mileage} km` : ""],
      ["Fuel", record.fuelPercent != null ? `${record.fuelPercent}%` : ""],
      ["Person", record.personName],
      ["Maintenance", record.maintenanceWork],
      ["Changes", record.changesMade],
      ["Description", record.description],
      ["Resolution", record.resolution],
    ].filter(([, value]) => value);
    modal({
      kicker: record.reference,
      title: workflows[record.type]?.[1] || "Operation",
      content: `<div class="portal-form">${details.map(([label, value]) => `<div class="field"><label>${clean(label)}</label><div>${clean(value)}</div></div>`).join("")}
        ${result.items.length ? `<div class="media-gallery">${result.items.map((item) => `<figure><img src="${clean(item.url)}" alt="${clean(item.category)}"><figcaption>${clean(item.category.replaceAll("_", " "))}</figcaption></figure>`).join("")}</div>` : "<p>No media attached.</p>"}</div>`,
    });
  } catch (error) {
    toast(messageFor(error), "error");
  }
}

function resolveReport(id) {
  modal({
    title: "Resolve report",
    submit: "Mark resolved",
    content: `<form class="portal-form"><div class="field"><label>${clean(tr("Resolution"))} *</label><textarea name="resolution" required></textarea></div></form>`,
    handler: async (data) => {
      await api("/api/portal/admin", { method: "POST", body: { operation: "resolve_report", recordId: id, resolution: data.get("resolution") } });
      closeModal();
      toast("Report resolved.");
      await refresh();
    },
  });
}

function navigate(view) {
  const allowed = roleViews[state.data.account.role];
  state.view = allowed.includes(view) ? view : "overview";
  history.replaceState(null, "", `#${state.view}`);
  renderNavigation();
  render();
  closeMenu();
  document.querySelector("#portal-main").focus({ preventScroll: true });
  scrollTo({ top: 0, behavior: "smooth" });
}

function openMenu() {
  el.sidebar.inert = false;
  el.sidebar.classList.add("open");
  el.backdrop.hidden = false;
  el.menu.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  el.sidebar.classList.remove("open");
  el.backdrop.hidden = true;
  el.menu.setAttribute("aria-expanded", "false");
  el.sidebar.inert = mobileNavigation.matches;
}

function syncNavigationMode() {
  if (mobileNavigation.matches) {
    el.sidebar.inert = !el.sidebar.classList.contains("open");
  } else {
    el.sidebar.inert = false;
    el.backdrop.hidden = true;
    el.sidebar.classList.remove("open");
    el.menu.setAttribute("aria-expanded", "false");
  }
}

el.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = el.loginForm.querySelector("button");
  el.loginMessage.textContent = "";
  busy(button, true, "Signing in…");
  try {
    const result = await api("/api/portal/login", { method: "POST", body: { code: el.code.value } });
    state.token = result.token;
    localStorage.setItem(TOKEN_KEY, state.token);
    state.view = "overview";
    await refresh();
    el.loginForm.reset();
  } catch (error) {
    el.loginMessage.textContent = messageFor(error);
  } finally {
    busy(button, false);
  }
});

el.code.addEventListener("input", () => {
  const value = el.code.value.toUpperCase().replace(/^YABI-?/, "").replace(/[^A-Z0-9]/g, "").slice(0, 12);
  el.code.value = value ? `YABI-${(value.match(/.{1,4}/g) || []).join("-")}` : "";
});

el.navigation.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) navigate(button.dataset.view);
});

el.view.addEventListener("click", async (event) => {
  const view = event.target.closest("[data-view]");
  if (view) return navigate(view.dataset.view);
  const workflow = event.target.closest("[data-workflow]");
  if (workflow) return openWorkflow(workflow.dataset.workflow);
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "create-account") createAccount();
  if (action === "create-customer") createCustomer();
  if (action === "create-vehicle") createVehicle();
  if (action === "create-rental") createRental();
  if (action === "vehicle-status") updateVehicle(id);
  if (action === "rental-status") updateRental(id);
  if (action === "view-record") viewRecord(id);
  if (action === "resolve-report") resolveReport(id);
  if (action === "rotate-code" && confirm("Generate a new code? The current code and all active sessions will stop working.")) {
    try {
      const account = state.data.accounts.find((item) => item.id === id);
      const result = await api("/api/portal/admin", { method: "POST", body: { operation: "rotate_code", targetAccountId: id } });
      await refresh();
      revealCode(account.displayName, result.accessCode);
    } catch (error) {
      toast(messageFor(error), "error");
    }
  }
  if (action === "toggle-account") {
    const active = button.dataset.active === "true";
    if (!confirm(`${active ? "Disable" : "Enable"} this account?`)) return;
    try {
      await api("/api/portal/admin", { method: "POST", body: { operation: "set_account_active", targetAccountId: id, active: !active } });
      toast(`Account ${active ? "disabled" : "enabled"}.`);
      await refresh();
    } catch (error) {
      toast(messageFor(error), "error");
    }
  }
});

el.view.addEventListener("submit", async (event) => {
  if (event.target.id !== "profile-form") return;
  event.preventDefault();
  const button = event.target.querySelector('[type="submit"]');
  busy(button, true);
  try {
    await api("/api/portal/profile", { method: "POST", body: Object.fromEntries(new FormData(event.target)) });
    toast("Your details were saved.");
    await refresh();
  } catch (error) {
    toast(messageFor(error), "error");
  } finally {
    busy(button, false);
  }
});

el.logout.addEventListener("click", async () => {
  try {
    await api("/api/portal/logout", { method: "POST" });
  } catch {}
  state.token = "";
  localStorage.removeItem(TOKEN_KEY);
  showLogin();
});

document.addEventListener("click", (event) => {
  const languageButton = event.target.closest("[data-language]");
  if (languageButton) {
    applyLanguage(languageButton.dataset.language);
    return;
  }
  if (!event.target.closest("[data-custom-select]")) closeAllCustomSelects();
});

el.menu.addEventListener("click", () => (el.sidebar.classList.contains("open") ? closeMenu() : openMenu()));
el.backdrop.addEventListener("click", closeMenu);
el.modalClose.addEventListener("click", closeModal);
window.addEventListener("hashchange", () => state.data && navigate(location.hash.slice(1) || "overview"));
mobileNavigation.addEventListener("change", syncNavigationMode);
syncNavigationMode();
applyLanguage(state.language, false);

if (state.token) refresh().catch(() => {});
else showLogin();
