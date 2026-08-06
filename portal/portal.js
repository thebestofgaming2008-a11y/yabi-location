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
    Home: "Accueil",
    "My actions": "Mes actions",
    "My vehicles": "Mes véhicules",
    "Team operations": "Opérations de l’équipe",
    "Mechanic workspace": "Espace mécanicien",
    "Customer portal": "Espace client",
    "Driver portal": "Espace chauffeur",
    "External work": "Interventions externes",
    "What do you need to do?": "Que devez-vous faire ?",
    "Choose an action below. The form will guide you step by step.": "Choisissez une action ci-dessous. Le formulaire vous guidera étape par étape.",
    "Record maintenance or report a concern.": "Enregistrez un entretien ou signalez un problème.",
    "Complete the required vehicle procedure.": "Effectuez la procédure requise pour le véhicule.",
    "Report a problem, accident, payment, or monthly inspection.": "Signalez un problème, un accident, un paiement ou effectuez l’inspection mensuelle.",
    "Report a problem, accident, or monthly inspection.": "Signalez un problème, un accident ou effectuez l’inspection mensuelle.",
    "Complete the assigned handover or vehicle movement.": "Effectuez la remise ou le déplacement de véhicule demandé.",
    Start: "Commencer",
    Urgent: "Urgent",
    "Your recent work": "Vos activités récentes",
    "Your submitted records appear here.": "Vos enregistrements envoyés apparaissent ici.",
    "Vehicles available for your work": "Véhicules disponibles pour votre intervention",
    "No work recorded yet": "Aucune activité enregistrée",
    "Complete an action and it will appear here.": "Effectuez une action ; elle apparaîtra ensuite ici.",
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
    "Vehicle identification": "Identification du véhicule",
    "Date and time": "Date et heure",
    "Recorded automatically by the server.": "Enregistrées automatiquement par le serveur.",
    "Registration plate": "Plaque d’immatriculation",
    "Select a fleet vehicle to show its plate.": "Sélectionnez un véhicule de la flotte pour afficher sa plaque.",
    "Mechanic name": "Nom du mécanicien",
    "Taken from the signed-in account.": "Repris du compte connecté.",
    "Intervention type": "Type d’intervention",
    "Regular maintenance": "Entretien régulier",
    "Breakdown / repair": "Panne / réparation",
    "Technical inspection": "Contrôle technique",
    "Parts and work performed": "Pièces et travaux effectués",
    "Select every item completed during this intervention.": "Cochez chaque élément effectué pendant cette intervention.",
    "Final notes and closure": "Remarques et clôture",
    "Other part / details": "Autre pièce / précisions",
    "Road test performed?": "Essai routier effectué ?",
    "Vehicle ready to return to service?": "Véhicule prêt à reprendre le service ?",
    Yes: "Oui",
    No: "Non",
    "Mechanic notes (optional)": "Remarques du mécanicien (facultatif)",
    "Mechanic notes": "Remarques du mécanicien",
    "Optional photos": "Photos facultatives",
    "Mechanic signature": "Signature du mécanicien",
    "Select at least one completed item or add details.": "Cochez au moins un élément effectué ou ajoutez des précisions.",
    "Maintenance checklist is incomplete.": "La fiche d’entretien est incomplète.",
    "Invalid maintenance selection.": "La sélection d’entretien n’est pas valide.",
    "Parts / work completed": "Pièces / travaux effectués",
    "Road test": "Essai routier",
    "Ready for service": "Prêt à reprendre le service",
    "Other maintenance details": "Autres précisions d’entretien",
    "Server date and time": "Date et heure du serveur",
    Evidence: "Preuves",
    "Person's full name": "Nom complet de la personne",
    "Vehicle condition photos": "Photos de l’état du véhicule",
    "Customer selfie (optional)": "Photo du client (facultatif)",
    "Before washing": "Avant le lavage",
    "After washing": "Après le lavage",
    "Mileage after": "Kilométrage après",
    "Mileage (km)": "Kilométrage (km)",
    "Choose or take photos": "Choisir ou prendre des photos",
    "Choose or take a photo": "Choisir ou prendre une photo",
    "Camera or gallery": "Appareil photo ou galerie",
    "No photo selected": "Aucune photo sélectionnée",
    "photo selected": "photo sélectionnée",
    "photos selected": "photos sélectionnées",
    Front: "Avant",
    "Right side": "Côté droit",
    "Left side": "Côté gauche",
    Rear: "Arrière",
    Interior: "Intérieur",
    Dashboard: "Tableau de bord",
    "Vehicle photos": "Photos du véhicule",
    "Vehicle must be started": "Le véhicule doit être démarré",
    "The dashboard must clearly show mileage and autonomy.": "Le tableau de bord doit afficher clairement le kilométrage et l’autonomie.",
    "Dashboard photo — vehicle started": "Photo du tableau de bord — véhicule démarré",
    "Autonomy (km)": "Autonomie (km)",
    "Driver / guest full name": "Nom complet du conducteur / client",
    "Driver signature": "Signature du conducteur",
    "Employee signature": "Signature de l’employé",
    "Employee full name": "Nom complet de l’employé",
    "Destination address (required when moved by me)": "Adresse de destination (obligatoire si déplacé par moi-même)",
    "Employee full name (required when moved by me)": "Nom complet de l’employé (obligatoire si déplacé par moi-même)",
    "Employee signature — only required when moved by me": "Signature de l’employé — obligatoire uniquement si déplacé par moi-même",
    "Notes (optional)": "Remarques (facultatif)",
    "Extra photos (optional)": "Photos supplémentaires (facultatif)",
    "Extra photo": "Photo supplémentaire",
    "Breakdown replacement": "Remplacement en cas de panne",
    "Move vehicle": "Déplacer un véhicule",
    "YABI replacement vehicle": "Véhicule de remplacement YABI",
    "Key handover": "Remise des clés",
    "Customer full name": "Nom complet du client",
    "Defective customer vehicle": "Véhicule défectueux du client",
    "What happened to the defective vehicle?": "Prise en charge du véhicule défectueux",
    Disposition: "Prise en charge",
    "Moved by me": "Déplacé par moi-même",
    "Towing service": "Dépannage",
    "Mechanic came": "Le mécanicien est venu",
    Other: "Autre",
    "Point A — origin address": "Point A — adresse de départ",
    "Point B — destination address": "Point B — adresse d’arrivée",
    Applications: "Demandes",
    "A clear view of what needs attention today.": "Une vue claire de ce qui nécessite votre attention aujourd’hui.",
    "Review new rental requests and create access after agreement.": "Examinez les nouvelles demandes de location et créez un accès après accord.",
    "Create personal access codes and control permissions.": "Créez des codes d’accès personnels et gérez les autorisations.",
    "Customer records used by rentals and inspections.": "Dossiers clients utilisés pour les locations et les inspections.",
    "Availability, mileage, and vehicle status at a glance.": "Disponibilité, kilométrage et statut des véhicules en un coup d’œil.",
    "Follow every rental from planning to closure.": "Suivez chaque location de sa planification à sa clôture.",
    "Guided procedures with time-stamped evidence.": "Procédures guidées avec preuves horodatées.",
    "A traceable record of sensitive actions.": "Un historique traçable des actions sensibles.",
    "Keep your personal and licence information accurate.": "Gardez vos informations personnelles et de permis à jour.",
    "Complete your personal rental information.": "Complétez vos informations personnelles de location.",
    "Record mileage, fuel, photos and signature.": "Enregistrez le kilométrage, le carburant, les photos et la signature.",
    "Document the vehicle when it returns.": "Documentez le véhicule lors de son retour.",
    "Capture before-and-after photos and mileage.": "Prenez les photos avant et après ainsi que le kilométrage.",
    "Record the work, changes and evidence.": "Enregistrez les travaux, les modifications et les preuves.",
    "Record who takes the vehicle and its condition.": "Enregistrez qui prend le véhicule et son état.",
    "Record who returns the vehicle and its condition.": "Enregistrez qui restitue le véhicule et son état.",
    "Document the replacement vehicle and the defective vehicle.": "Documentez le véhicule de remplacement et le véhicule défectueux.",
    "Document a vehicle transfer from point A to point B.": "Documentez le transfert d’un véhicule du point A au point B.",
    "Report damage, a problem or a modification.": "Signalez un dommage, un problème ou une modification.",
    "No photos selected": "Aucune photo sélectionnée",
    "Choose one or more": "Choisissez un ou plusieurs éléments",
    "item selected": "élément sélectionné",
    "items selected": "éléments sélectionnés",
    "Ready to upload": "Prêt à envoyer",
    Remove: "Supprimer",
    "Accepted evidence": "Preuves acceptées",
    "These files were securely accepted with this record.": "Ces fichiers ont été acceptés et sécurisés avec cet enregistrement.",
    "Complete operation": "Terminer l’opération",
    Procedure: "Procédure",
    "Operation recorded.": "Opération enregistrée.",
    Resolution: "Résolution",
    "Resolve report": "Résoudre le signalement",
    "Mark resolved": "Marquer comme résolu",
    Fuel: "Carburant",
    Autonomy: "Autonomie",
    "Driver / guest": "Conducteur / client",
    "Defective vehicle plate": "Plaque du véhicule défectueux",
    "Defective vehicle mileage": "Kilométrage du véhicule défectueux",
    "Defective vehicle autonomy": "Autonomie du véhicule défectueux",
    "Point A / origin": "Point A / départ",
    "Point B / destination": "Point B / destination",
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
    "Uploading evidence": "Téléchargement de la preuve",
    of: "sur",
    "The latest records visible to your role.": "Derniers enregistrements accessibles.",
    "Choose one clear next step.": "Choisissez l’action suivante.",
    "That access code is not valid.": "Ce code d’accès n’est pas valide.",
    "This account has been disabled.": "Ce compte a été désactivé.",
    "Too many attempts. Please wait and try again.": "Trop de tentatives. Veuillez patienter.",
    "Your session expired. Sign in again.": "Votre session a expiré. Reconnectez-vous.",
    "Your role does not allow this action.": "Votre rôle ne permet pas cette action.",
    "This operation is not available for your role.": "Cette opération n’est pas disponible pour votre rôle.",
    "Check the required information and try again.": "Vérifiez les champs obligatoires.",
    "Add the required photos and signature.": "Ajoutez les photos et la signature requises.",
    "Add every required photo and signature.": "Ajoutez chaque photo et signature requise.",
    "Complete all required operation details.": "Complétez toutes les informations obligatoires de l’opération.",
    "You selected too many photos. Keep the total at 24 or fewer.": "Vous avez sélectionné trop de photos. Limitez le total à 24.",
    "Photo storage is temporarily unavailable.": "Le stockage des photos est temporairement indisponible.",
    Driver: "Chauffeur",
    Drivers: "Chauffeurs",
    "Driver space": "Espace chauffeur",
    "Manage company drivers and their personal access.": "Gérez les chauffeurs de l’entreprise et leurs accès personnels.",
    "Problem or damage": "Problème ou dommage",
    "Report an accident": "Signaler un accident",
    "Payment proof": "Preuve de paiement",
    "Monthly inspection": "Inspection mensuelle",
    "Report a technical problem, damage or dashboard warning.": "Signalez un problème technique, un dommage ou un voyant du tableau de bord.",
    "Record an accident and its supporting evidence.": "Enregistrez un accident et ses preuves.",
    "Send an invoice payment proof to accounting.": "Envoyez une preuve de paiement à la comptabilité.",
    "Complete the required monthly vehicle inspection.": "Effectuez l’inspection mensuelle obligatoire du véhicule.",
    "Assigned vehicles": "Véhicules attribués",
    "Monthly inspections": "Inspections mensuelles",
    "Add driver": "Ajouter un chauffeur",
    "Create driver access": "Créer l’accès chauffeur",
    "Create code": "Créer un code",
    Deactivate: "Désactiver",
    Reactivate: "Réactiver",
    "No access code": "Aucun code d’accès",
    "No drivers": "Aucun chauffeur",
    "Add a driver to create personal access.": "Ajoutez un chauffeur pour créer son accès personnel.",
    "First name": "Prénom",
    "Last name": "Nom",
    "Date of birth": "Date de naissance",
    "Identity-card number": "Numéro de carte d’identité",
    "National-register number": "Numéro de registre national",
    "Driving-licence number": "Numéro de permis de conduire",
    "Licence issue date": "Date de délivrance du permis",
    "Licence valid since": "Permis valide depuis",
    "Identity and driving-licence photographs": "Photos d’identité et du permis de conduire",
    Eligibility: "Conditions d’accès",
    "Clear photographs are required. Only authorised administrators and the linked customer can view them.": "Des photos nettes sont obligatoires. Seuls les administrateurs autorisés et le client lié peuvent les consulter.",
    "ID card — front": "Carte d’identité — recto",
    "ID card — back": "Carte d’identité — verso",
    "Driving licence — front": "Permis de conduire — recto",
    "Driving licence — back": "Permis de conduire — verso",
    "Protected documents": "Documents protégés",
    "Customer / company": "Client / entreprise",
    "Linked customer": "Client lié",
    "Edit account": "Modifier le compte",
    Edit: "Modifier",
    "View / edit": "Voir / modifier",
    "View / edit customer": "Voir / modifier le client",
    "Save changes": "Enregistrer les modifications",
    "Belgian VAT number": "Numéro de TVA belge",
    Street: "Rue",
    "House number": "Numéro",
    Box: "Boîte",
    Province: "Province",
    Antwerp: "Anvers",
    "East Flanders": "Flandre-Orientale",
    "Flemish Brabant": "Brabant flamand",
    Hainaut: "Hainaut",
    Liège: "Liège",
    Limburg: "Limbourg",
    Luxembourg: "Luxembourg",
    Namur: "Namur",
    "Walloon Brabant": "Brabant wallon",
    "West Flanders": "Flandre-Occidentale",
    Brussels: "Bruxelles",
    Lead: "Prospect",
    "Emergency contact": "Contact d’urgence",
    "Internal notes": "Notes internes",
    "Assigned operations": "Opérations attribuées",
    "Describe the problem or damage": "Décrivez le problème ou le dommage",
    "Photographic evidence": "Preuves photographiques",
    "Problem or dashboard warning": "Problème ou voyant du tableau de bord",
    "Accident date and time": "Date et heure de l’accident",
    Liability: "Responsabilité",
    "At fault": "En tort",
    "Not at fault": "Pas en tort",
    "Accident description": "Description de l’accident",
    "Accident evidence": "Preuves de l’accident",
    "Damage to our vehicle": "Dommages à notre véhicule",
    "Damage to the other party": "Dommages au véhicule adverse",
    "Signed European accident statement": "Constat européen signé",
    "Extra accident photos (optional)": "Photos supplémentaires de l’accident (facultatif)",
    "Possible amicable settlement": "Règlement amiable possible",
    "Will the accident be settled amicably?": "L’accident sera-t-il réglé à l’amiable ?",
    "Important responsibility": "Responsabilité importante",
    "If settled amicably, the customer or driver remains responsible for repairing the YABI vehicle.": "En cas de règlement amiable, le client ou le chauffeur reste responsable de la réparation du véhicule YABI.",
    "Joint written amicable agreement": "Accord amiable écrit conjointement",
    "Invoice number or reference": "Numéro ou référence de facture",
    "Proof for accounting": "Justificatif pour la comptabilité",
    "Choose a photo or PDF": "Choisir une photo ou un PDF",
    "Photo or PDF": "Photo ou PDF",
    "No file selected": "Aucun fichier sélectionné",
    "file selected": "fichier sélectionné",
    "files selected": "fichiers sélectionnés",
    "Performed by": "Effectué par",
    "Required monthly photographs": "Photos mensuelles obligatoires",
    "The dashboard photo must clearly show the current mileage while the engine is running.": "La photo du tableau de bord doit montrer clairement le kilométrage actuel lorsque le moteur tourne.",
    "Amicable settlement": "Règlement amiable",
    "Inspection month": "Mois de l’inspection",
    "Company notification": "Notification à l’entreprise",
    "Open document": "Ouvrir le document",
    pending: "en attente",
    sent: "envoyée",
    failed: "échouée",
    not_configured: "non configurée",
    "Deactivate this driver? Access stops immediately.": "Désactiver ce chauffeur ? Son accès sera immédiatement bloqué.",
    "Reactivate this driver?": "Réactiver ce chauffeur ?",
    "The driver must be at least 23 and must have held a valid licence for at least five years.": "Le chauffeur doit avoir au moins 23 ans et détenir un permis valide depuis au moins cinq ans.",
    "All four identity and driving-licence photos are required.": "Les quatre photos d’identité et du permis sont obligatoires.",
    "This monthly inspection has already been submitted for this vehicle.": "L’inspection mensuelle de ce véhicule a déjà été envoyée.",
    "This account is not linked to a customer.": "Ce compte n’est lié à aucun client.",
    "This driver account is not linked correctly.": "Ce compte chauffeur n’est pas lié correctement.",
    "Choose the linked customer for this driver.": "Choisissez le client lié à ce chauffeur.",
    "This driver already has an access account.": "Ce chauffeur possède déjà un compte d’accès.",
    "Complete the accident details and liability choice.": "Complétez les informations sur l’accident et la responsabilité.",
    "Enter the invoice number or reference.": "Saisissez le numéro ou la référence de facture.",
    "Complete the mileage and monthly inspection details.": "Complétez le kilométrage et les informations de l’inspection mensuelle.",
    "Add all six required monthly inspection photos.": "Ajoutez les six photos obligatoires de l’inspection mensuelle.",
    "One or more uploaded files could not be verified. Please upload them again.": "Un ou plusieurs fichiers n’ont pas pu être vérifiés. Téléchargez-les à nouveau.",
    "You cannot change your own administrator role.": "Vous ne pouvez pas modifier votre propre rôle d’administrateur.",
    "Account updated.": "Compte mis à jour.",
    "Customer updated.": "Client mis à jour.",
    "Driver deactivated.": "Chauffeur désactivé.",
    "Driver reactivated.": "Chauffeur réactivé.",
    "Add a customer before adding a driver.": "Ajoutez un client avant d’ajouter un chauffeur.",
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
    Home: "Start",
    "My actions": "Mijn acties",
    "My vehicles": "Mijn voertuigen",
    "Team operations": "Teamactiviteiten",
    "Mechanic workspace": "Werkplaats monteur",
    "Customer portal": "Klantenportaal",
    "Driver portal": "Chauffeursportaal",
    "External work": "Externe opdrachten",
    "What do you need to do?": "Wat moet u doen?",
    "Choose an action below. The form will guide you step by step.": "Kies hieronder een actie. Het formulier begeleidt u stap voor stap.",
    "Record maintenance or report a concern.": "Registreer onderhoud of meld een probleem.",
    "Complete the required vehicle procedure.": "Voer de vereiste voertuigprocedure uit.",
    "Report a problem, accident, payment, or monthly inspection.": "Meld een probleem, ongeval of betaling, of voer de maandelijkse inspectie uit.",
    "Report a problem, accident, or monthly inspection.": "Meld een probleem of ongeval, of voer de maandelijkse inspectie uit.",
    "Complete the assigned handover or vehicle movement.": "Voer de toegewezen overdracht of voertuigverplaatsing uit.",
    Start: "Starten",
    Urgent: "Dringend",
    "Your recent work": "Uw recente activiteiten",
    "Your submitted records appear here.": "Uw ingediende registraties verschijnen hier.",
    "Vehicles available for your work": "Voertuigen beschikbaar voor uw opdracht",
    "No work recorded yet": "Nog geen activiteit geregistreerd",
    "Complete an action and it will appear here.": "Voer een actie uit; daarna verschijnt ze hier.",
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
    "Vehicle identification": "Voertuigidentificatie",
    "Date and time": "Datum en tijd",
    "Recorded automatically by the server.": "Automatisch geregistreerd door de server.",
    "Registration plate": "Nummerplaat",
    "Select a fleet vehicle to show its plate.": "Selecteer een voertuig uit het wagenpark om de nummerplaat te tonen.",
    "Mechanic name": "Naam mecanicien",
    "Taken from the signed-in account.": "Overgenomen van het aangemelde account.",
    "Intervention type": "Type interventie",
    "Regular maintenance": "Regulier onderhoud",
    "Breakdown / repair": "Pech / reparatie",
    "Technical inspection": "Technische keuring",
    "Parts and work performed": "Onderdelen en uitgevoerde werkzaamheden",
    "Select every item completed during this intervention.": "Vink elk onderdeel aan dat tijdens deze interventie is uitgevoerd.",
    "Final notes and closure": "Opmerkingen en afsluiting",
    "Other part / details": "Ander onderdeel / toelichting",
    "Road test performed?": "Proefrit uitgevoerd?",
    "Vehicle ready to return to service?": "Voertuig klaar om opnieuw ingezet te worden?",
    Yes: "Ja",
    No: "Nee",
    "Mechanic notes (optional)": "Opmerkingen mecanicien (optioneel)",
    "Mechanic notes": "Opmerkingen mecanicien",
    "Optional photos": "Optionele foto’s",
    "Mechanic signature": "Handtekening mecanicien",
    "Select at least one completed item or add details.": "Vink minstens één uitgevoerd onderdeel aan of voeg een toelichting toe.",
    "Maintenance checklist is incomplete.": "De onderhoudsfiche is onvolledig.",
    "Invalid maintenance selection.": "De onderhoudsselectie is ongeldig.",
    "Parts / work completed": "Uitgevoerde onderdelen / werkzaamheden",
    "Road test": "Proefrit",
    "Ready for service": "Klaar voor inzet",
    "Other maintenance details": "Andere onderhoudsdetails",
    "Server date and time": "Serverdatum en -tijd",
    Evidence: "Bewijs",
    "Person's full name": "Volledige naam persoon",
    "Vehicle condition photos": "Foto’s voertuigstaat",
    "Customer selfie (optional)": "Foto van klant (optioneel)",
    "Before washing": "Voor het wassen",
    "After washing": "Na het wassen",
    "Mileage after": "Kilometerstand nadien",
    "Mileage (km)": "Kilometerstand (km)",
    "Choose or take photos": "Foto’s kiezen of nemen",
    "Choose or take a photo": "Foto kiezen of nemen",
    "Camera or gallery": "Camera of galerij",
    "No photo selected": "Geen foto geselecteerd",
    "photo selected": "foto geselecteerd",
    "photos selected": "foto’s geselecteerd",
    Front: "Voorkant",
    "Right side": "Rechterkant",
    "Left side": "Linkerkant",
    Rear: "Achterkant",
    Interior: "Binnenkant",
    Dashboard: "Dashboard",
    "Vehicle photos": "Voertuigfoto’s",
    "Vehicle must be started": "Het voertuig moet gestart zijn",
    "The dashboard must clearly show mileage and autonomy.": "Het dashboard moet de kilometerstand en autonomie duidelijk tonen.",
    "Dashboard photo — vehicle started": "Foto van dashboard — voertuig gestart",
    "Autonomy (km)": "Actieradius (km)",
    "Driver / guest full name": "Volledige naam bestuurder / klant",
    "Driver signature": "Handtekening bestuurder",
    "Employee signature": "Handtekening medewerker",
    "Employee full name": "Volledige naam medewerker",
    "Destination address (required when moved by me)": "Bestemmingsadres (verplicht wanneer door mij verplaatst)",
    "Employee full name (required when moved by me)": "Volledige naam medewerker (verplicht wanneer door mij verplaatst)",
    "Employee signature — only required when moved by me": "Handtekening medewerker — alleen verplicht wanneer door mij verplaatst",
    "Notes (optional)": "Opmerkingen (optioneel)",
    "Extra photos (optional)": "Extra foto’s (optioneel)",
    "Extra photo": "Extra foto",
    "Breakdown replacement": "Vervangwagen bij pech",
    "Move vehicle": "Voertuig verplaatsen",
    "YABI replacement vehicle": "YABI-vervangwagen",
    "Key handover": "Sleuteloverdracht",
    "Customer full name": "Volledige naam klant",
    "Defective customer vehicle": "Defect voertuig van de klant",
    "What happened to the defective vehicle?": "Afhandeling van het defecte voertuig",
    Disposition: "Afhandeling",
    "Moved by me": "Door mij verplaatst",
    "Towing service": "Depannage",
    "Mechanic came": "Monteur ter plaatse",
    Other: "Anders",
    "Point A — origin address": "Punt A — vertrekadres",
    "Point B — destination address": "Punt B — bestemmingsadres",
    Applications: "Aanvragen",
    "A clear view of what needs attention today.": "Een helder overzicht van wat vandaag aandacht nodig heeft.",
    "Review new rental requests and create access after agreement.": "Beoordeel nieuwe huuraanvragen en maak na akkoord toegang aan.",
    "Create personal access codes and control permissions.": "Maak persoonlijke toegangscodes en beheer machtigingen.",
    "Customer records used by rentals and inspections.": "Klantendossiers voor verhuur en inspecties.",
    "Availability, mileage, and vehicle status at a glance.": "Beschikbaarheid, kilometerstand en voertuigstatus in één oogopslag.",
    "Follow every rental from planning to closure.": "Volg elke verhuur van planning tot afsluiting.",
    "Guided procedures with time-stamped evidence.": "Begeleide procedures met bewijs voorzien van een tijdstempel.",
    "A traceable record of sensitive actions.": "Een traceerbaar overzicht van gevoelige acties.",
    "Keep your personal and licence information accurate.": "Houd uw persoonlijke en rijbewijsgegevens correct.",
    "Complete your personal rental information.": "Vul uw persoonlijke huurgegevens in.",
    "Record mileage, fuel, photos and signature.": "Registreer kilometerstand, brandstof, foto’s en handtekening.",
    "Document the vehicle when it returns.": "Documenteer het voertuig bij terugkomst.",
    "Capture before-and-after photos and mileage.": "Leg foto’s voor en na het wassen en de kilometerstand vast.",
    "Record the work, changes and evidence.": "Registreer werkzaamheden, wijzigingen en bewijs.",
    "Record who takes the vehicle and its condition.": "Registreer wie het voertuig meeneemt en de staat ervan.",
    "Record who returns the vehicle and its condition.": "Registreer wie het voertuig terugbrengt en de staat ervan.",
    "Document the replacement vehicle and the defective vehicle.": "Documenteer de vervangwagen en het defecte voertuig.",
    "Document a vehicle transfer from point A to point B.": "Documenteer een voertuigverplaatsing van punt A naar punt B.",
    "Report damage, a problem or a modification.": "Meld schade, een probleem of een wijziging.",
    "No photos selected": "Geen foto’s geselecteerd",
    "Choose one or more": "Kies één of meer items",
    "item selected": "item geselecteerd",
    "items selected": "items geselecteerd",
    "Ready to upload": "Klaar om te uploaden",
    Remove: "Verwijderen",
    "Accepted evidence": "Geaccepteerd bewijs",
    "These files were securely accepted with this record.": "Deze bestanden zijn veilig geaccepteerd bij deze registratie.",
    "Complete operation": "Werkzaamheid voltooien",
    Procedure: "Procedure",
    "Operation recorded.": "Werkzaamheid geregistreerd.",
    Resolution: "Oplossing",
    "Resolve report": "Melding oplossen",
    "Mark resolved": "Markeren als opgelost",
    Fuel: "Brandstof",
    Autonomy: "Actieradius",
    "Driver / guest": "Bestuurder / klant",
    "Defective vehicle plate": "Nummerplaat defect voertuig",
    "Defective vehicle mileage": "Kilometerstand defect voertuig",
    "Defective vehicle autonomy": "Actieradius defect voertuig",
    "Point A / origin": "Punt A / vertrek",
    "Point B / destination": "Punt B / bestemming",
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
    "Uploading evidence": "Bewijs uploaden",
    of: "van",
    "The latest records visible to your role.": "Laatste registraties voor uw rol.",
    "Choose one clear next step.": "Kies de volgende actie.",
    "That access code is not valid.": "Deze toegangscode is niet geldig.",
    "This account has been disabled.": "Dit account is gedeactiveerd.",
    "Too many attempts. Please wait and try again.": "Te veel pogingen. Wacht even en probeer opnieuw.",
    "Your session expired. Sign in again.": "Uw sessie is verlopen. Meld u opnieuw aan.",
    "Your role does not allow this action.": "Uw rol staat deze actie niet toe.",
    "This operation is not available for your role.": "Deze werkzaamheid is niet beschikbaar voor uw rol.",
    "Check the required information and try again.": "Controleer de verplichte gegevens.",
    "Add the required photos and signature.": "Voeg de vereiste foto’s en handtekening toe.",
    "Add every required photo and signature.": "Voeg elke vereiste foto en handtekening toe.",
    "Complete all required operation details.": "Vul alle verplichte gegevens van de werkzaamheid in.",
    "You selected too many photos. Keep the total at 24 or fewer.": "U hebt te veel foto’s geselecteerd. Beperk het totaal tot 24.",
    "Photo storage is temporarily unavailable.": "Foto-opslag is tijdelijk niet beschikbaar.",
    Driver: "Chauffeur",
    Drivers: "Chauffeurs",
    "Driver space": "Chauffeursportaal",
    "Manage company drivers and their personal access.": "Beheer de chauffeurs van het bedrijf en hun persoonlijke toegang.",
    "Problem or damage": "Probleem of schade",
    "Report an accident": "Ongeval melden",
    "Payment proof": "Betalingsbewijs",
    "Monthly inspection": "Maandelijkse inspectie",
    "Report a technical problem, damage or dashboard warning.": "Meld een technisch probleem, schade of een dashboardwaarschuwing.",
    "Record an accident and its supporting evidence.": "Registreer een ongeval met het nodige bewijs.",
    "Send an invoice payment proof to accounting.": "Stuur een betalingsbewijs naar de boekhouding.",
    "Complete the required monthly vehicle inspection.": "Voer de verplichte maandelijkse voertuiginspectie uit.",
    "Assigned vehicles": "Toegewezen voertuigen",
    "Monthly inspections": "Maandelijkse inspecties",
    "Add driver": "Chauffeur toevoegen",
    "Create driver access": "Chauffeurstoegang aanmaken",
    "Create code": "Code aanmaken",
    Deactivate: "Deactiveren",
    Reactivate: "Heractiveren",
    "No access code": "Geen toegangscode",
    "No drivers": "Geen chauffeurs",
    "Add a driver to create personal access.": "Voeg een chauffeur toe om persoonlijke toegang aan te maken.",
    "First name": "Voornaam",
    "Last name": "Achternaam",
    "Date of birth": "Geboortedatum",
    "Identity-card number": "Identiteitskaartnummer",
    "National-register number": "Rijksregisternummer",
    "Driving-licence number": "Rijbewijsnummer",
    "Licence issue date": "Afgiftedatum rijbewijs",
    "Licence valid since": "Rijbewijs geldig sinds",
    "Identity and driving-licence photographs": "Foto’s van identiteitskaart en rijbewijs",
    Eligibility: "Toelatingsvoorwaarden",
    "Clear photographs are required. Only authorised administrators and the linked customer can view them.": "Duidelijke foto’s zijn verplicht. Alleen bevoegde beheerders en de gekoppelde klant kunnen ze bekijken.",
    "ID card — front": "Identiteitskaart — voorkant",
    "ID card — back": "Identiteitskaart — achterkant",
    "Driving licence — front": "Rijbewijs — voorkant",
    "Driving licence — back": "Rijbewijs — achterkant",
    "Protected documents": "Beveiligde documenten",
    "Customer / company": "Klant / bedrijf",
    "Linked customer": "Gekoppelde klant",
    "Edit account": "Account wijzigen",
    Edit: "Wijzigen",
    "View / edit": "Bekijken / wijzigen",
    "View / edit customer": "Klant bekijken / wijzigen",
    "Save changes": "Wijzigingen opslaan",
    "Belgian VAT number": "Belgisch btw-nummer",
    Street: "Straat",
    "House number": "Huisnummer",
    Box: "Bus",
    Province: "Provincie",
    Antwerp: "Antwerpen",
    "East Flanders": "Oost-Vlaanderen",
    "Flemish Brabant": "Vlaams-Brabant",
    Hainaut: "Henegouwen",
    Liège: "Luik",
    Limburg: "Limburg",
    Luxembourg: "Luxemburg",
    Namur: "Namen",
    "Walloon Brabant": "Waals-Brabant",
    "West Flanders": "West-Vlaanderen",
    Brussels: "Brussel",
    Lead: "Prospect",
    "Emergency contact": "Noodcontact",
    "Internal notes": "Interne notities",
    "Assigned operations": "Toegewezen werkzaamheden",
    "Describe the problem or damage": "Beschrijf het probleem of de schade",
    "Photographic evidence": "Fotobewijs",
    "Problem or dashboard warning": "Probleem of dashboardwaarschuwing",
    "Accident date and time": "Datum en tijd van het ongeval",
    Liability: "Aansprakelijkheid",
    "At fault": "In fout",
    "Not at fault": "Niet in fout",
    "Accident description": "Beschrijving van het ongeval",
    "Accident evidence": "Bewijs van het ongeval",
    "Damage to our vehicle": "Schade aan ons voertuig",
    "Damage to the other party": "Schade aan de tegenpartij",
    "Signed European accident statement": "Ondertekend Europees aanrijdingsformulier",
    "Extra accident photos (optional)": "Extra ongevalsfoto’s (optioneel)",
    "Possible amicable settlement": "Mogelijke minnelijke schikking",
    "Will the accident be settled amicably?": "Wordt het ongeval onderling geregeld?",
    "Important responsibility": "Belangrijke verantwoordelijkheid",
    "If settled amicably, the customer or driver remains responsible for repairing the YABI vehicle.": "Bij een minnelijke regeling blijft de klant of chauffeur verantwoordelijk voor de herstelling van het YABI-voertuig.",
    "Joint written amicable agreement": "Gezamenlijke schriftelijke overeenkomst",
    "Invoice number or reference": "Factuurnummer of referentie",
    "Proof for accounting": "Bewijs voor de boekhouding",
    "Choose a photo or PDF": "Kies een foto of PDF",
    "Photo or PDF": "Foto of PDF",
    "No file selected": "Geen bestand geselecteerd",
    "file selected": "bestand geselecteerd",
    "files selected": "bestanden geselecteerd",
    "Performed by": "Uitgevoerd door",
    "Required monthly photographs": "Verplichte maandelijkse foto’s",
    "The dashboard photo must clearly show the current mileage while the engine is running.": "De dashboardfoto moet de huidige kilometerstand duidelijk tonen terwijl de motor draait.",
    "Amicable settlement": "Minnelijke schikking",
    "Inspection month": "Inspectiemaand",
    "Company notification": "Bedrijfskennisgeving",
    "Open document": "Document openen",
    pending: "in afwachting",
    sent: "verzonden",
    failed: "mislukt",
    not_configured: "niet geconfigureerd",
    "Deactivate this driver? Access stops immediately.": "Deze chauffeur deactiveren? De toegang stopt onmiddellijk.",
    "Reactivate this driver?": "Deze chauffeur heractiveren?",
    "The driver must be at least 23 and must have held a valid licence for at least five years.": "De chauffeur moet minstens 23 jaar zijn en al minstens vijf jaar een geldig rijbewijs hebben.",
    "All four identity and driving-licence photos are required.": "Alle vier foto’s van identiteitskaart en rijbewijs zijn verplicht.",
    "This monthly inspection has already been submitted for this vehicle.": "De maandelijkse inspectie voor dit voertuig is al ingediend.",
    "This account is not linked to a customer.": "Dit account is niet aan een klant gekoppeld.",
    "This driver account is not linked correctly.": "Dit chauffeursaccount is niet correct gekoppeld.",
    "Choose the linked customer for this driver.": "Kies de gekoppelde klant voor deze chauffeur.",
    "This driver already has an access account.": "Deze chauffeur heeft al een toegangsaccount.",
    "Complete the accident details and liability choice.": "Vul de ongevalsgegevens en aansprakelijkheidskeuze in.",
    "Enter the invoice number or reference.": "Voer het factuurnummer of de referentie in.",
    "Complete the mileage and monthly inspection details.": "Vul de kilometerstand en gegevens van de maandelijkse inspectie in.",
    "Add all six required monthly inspection photos.": "Voeg alle zes verplichte foto’s van de maandelijkse inspectie toe.",
    "One or more uploaded files could not be verified. Please upload them again.": "Een of meer geüploade bestanden konden niet worden geverifieerd. Upload ze opnieuw.",
    "You cannot change your own administrator role.": "U kunt uw eigen beheerdersrol niet wijzigen.",
    "Account updated.": "Account bijgewerkt.",
    "Customer updated.": "Klant bijgewerkt.",
    "Driver deactivated.": "Chauffeur gedeactiveerd.",
    "Driver reactivated.": "Chauffeur geheractiveerd.",
    "Add a customer before adding a driver.": "Voeg eerst een klant toe voordat u een chauffeur toevoegt.",
    "Something went wrong. Please try again.": "Er is iets misgegaan. Probeer opnieuw.",
  },
};

const roles = {
  admin: "Administrator",
  employee: "Employee",
  customer: "Customer",
  driver: "Driver",
  mechanic: "Mechanic",
  contractor: "External worker",
};

const roleViews = {
  admin: ["overview", "applications", "access", "customers", "drivers", "fleet", "rentals", "operations", "audit"],
  employee: ["overview", "customers", "fleet", "rentals", "operations"],
  mechanic: ["overview", "fleet", "operations"],
  contractor: ["overview", "rentals", "operations"],
  customer: ["overview", "profile", "fleet", "drivers", "operations"],
  driver: ["overview", "fleet", "operations"],
};

const roleWorkflows = {
  admin: ["check_in", "check_out", "wash", "breakdown_replacement", "vehicle_transfer", "maintenance", "handover_take", "handover_return", "report", "problem_report", "accident_report", "payment_proof", "monthly_inspection"],
  employee: ["check_in", "check_out", "wash", "breakdown_replacement", "vehicle_transfer", "handover_take", "handover_return", "report"],
  mechanic: ["maintenance", "report"],
  contractor: ["check_in", "check_out", "breakdown_replacement", "vehicle_transfer", "handover_take", "handover_return", "report"],
  customer: ["problem_report", "accident_report", "payment_proof", "monthly_inspection"],
  driver: ["problem_report", "accident_report", "monthly_inspection"],
};

const viewCopy = {
  overview: ["Overview", "A clear view of what needs attention today."],
  applications: ["Applications", "Review new rental requests and create access after agreement."],
  access: ["Access & roles", "Create personal access codes and control permissions."],
  customers: ["Customers", "Customer records used by rentals and inspections."],
  drivers: ["Drivers", "Manage company drivers and their personal access."],
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
  breakdown_replacement: ["08", "Breakdown replacement", "Document the replacement vehicle and the defective vehicle."],
  vehicle_transfer: ["09", "Move vehicle", "Document a vehicle transfer from point A to point B."],
  report: ["07", "Report an issue", "Report damage, a problem or a modification."],
  problem_report: ["10", "Problem or damage", "Report a technical problem, damage or dashboard warning."],
  accident_report: ["11", "Report an accident", "Record an accident and its supporting evidence."],
  payment_proof: ["12", "Payment proof", "Send an invoice payment proof to accounting."],
  monthly_inspection: ["13", "Monthly inspection", "Complete the required monthly vehicle inspection."],
};

const maintenanceCopy = (en, fr, nl) => ({ en, fr, nl });
const maintenanceCatalog = [
  {
    title: maintenanceCopy("Oil change & filters", "Vidange et filtres", "Olie verversen en filters"),
    items: [
      ["engine_oil_change", maintenanceCopy("Engine oil (oil change completed)", "Huile moteur (vidange effectuée)", "Motorolie (olie ververst)")],
      ["oil_filter", maintenanceCopy("Oil filter", "Filtre à huile", "Oliefilter")],
      ["engine_air_filter", maintenanceCopy("Engine air filter", "Filtre à air moteur", "Motorluchtfilter")],
      ["cabin_filter", maintenanceCopy("Cabin filter (pollen / air conditioning)", "Filtre d’habitacle (pollen / climatisation)", "Interieurfilter (pollen / airconditioning)")],
      ["fuel_filter", maintenanceCopy("Fuel filter (diesel / petrol)", "Filtre à carburant (gazole / essence)", "Brandstoffilter (diesel / benzine)")],
      ["drain_plug_seal", maintenanceCopy("Drain plug seal", "Joint de bouchon de vidange", "Afdichtring aftapplug")],
      ["gearbox_oil_change", maintenanceCopy("Gearbox oil change (manual / automatic)", "Vidange boîte de vitesses (manuelle / auto)", "Versnellingsbakolie vervangen (handmatig / automatisch)")],
      ["differential_oil_change", maintenanceCopy("Axle / differential oil change", "Vidange pont / différentiel", "As- / differentieelolie vervangen")],
    ],
  },
  {
    title: maintenanceCopy("Braking", "Freinage", "Remmen"),
    items: [
      ["front_brake_pads", maintenanceCopy("Front brake pads", "Plaquettes de frein avant", "Remblokken voor")],
      ["rear_brake_pads", maintenanceCopy("Rear brake pads", "Plaquettes de frein arrière", "Remblokken achter")],
      ["front_brake_discs", maintenanceCopy("Front brake discs", "Disques de frein avant", "Remschijven voor")],
      ["rear_brake_discs", maintenanceCopy("Rear brake discs", "Disques de frein arrière", "Remschijven achter")],
      ["brake_wear_sensor", maintenanceCopy("Brake wear sensor", "Témoin d’usure des freins", "Remslijtagesensor")],
      ["brake_caliper", maintenanceCopy("Brake caliper (front / rear)", "Étrier de frein (AV / AR)", "Remklauw (voor / achter)")],
      ["brake_fluid", maintenanceCopy("Brake fluid (bleed / replacement)", "Liquide de frein (purge / remplacement)", "Remvloeistof (ontluchten / vervangen)")],
      ["handbrake_cable", maintenanceCopy("Handbrake cable", "Câble de frein à main", "Handremkabel")],
      ["rear_drum_brake_kit", maintenanceCopy("Rear drum brake kit", "Kit de freins à tambour (arrière)", "Trommelremset achter")],
    ],
  },
  {
    title: maintenanceCopy("Engine & timing", "Moteur et distribution", "Motor en distributie"),
    items: [
      ["timing_belt_kit", maintenanceCopy("Timing belt kit (belt + rollers)", "Kit de distribution (courroie + galets)", "Distributieriemset (riem + rollen)")],
      ["water_pump", maintenanceCopy("Water pump", "Pompe à eau", "Waterpomp")],
      ["accessory_belt", maintenanceCopy("Accessory / alternator belt", "Courroie d’accessoires / alternateur", "Multiriem / dynamoriem")],
      ["accessory_tensioner", maintenanceCopy("Accessory belt tensioner", "Galet tendeur d’accessoires", "Spanrol multiriem")],
      ["spark_plugs", maintenanceCopy("Spark plugs (petrol)", "Bougies d’allumage (essence)", "Bougies (benzine)")],
      ["glow_plugs", maintenanceCopy("Glow plugs (diesel)", "Bougies de préchauffage (diesel)", "Gloeibougies (diesel)")],
      ["injectors", maintenanceCopy("Injectors", "Injecteurs", "Injectoren")],
      ["head_gasket_engine_seals", maintenanceCopy("Head gasket / engine seals", "Joint de culasse / joints moteur", "Koppakking / motorafdichtingen")],
      ["air_turbo_hose", maintenanceCopy("Air / turbo hose", "Durite d’air / durite de turbo", "Lucht- / turboslang")],
      ["engine_mount", maintenanceCopy("Engine mount (silent block)", "Support moteur (silentbloc)", "Motorsteun (silentblok)")],
    ],
  },
  {
    title: maintenanceCopy("Suspension & steering", "Suspension et liaison au sol", "Ophanging en stuurinrichting"),
    items: [
      ["front_shock_absorbers", maintenanceCopy("Front shock absorbers", "Amortisseurs avant", "Schokdempers voor")],
      ["rear_shock_absorbers", maintenanceCopy("Rear shock absorbers", "Amortisseurs arrière", "Schokdempers achter")],
      ["strut_mounts", maintenanceCopy("Strut mounts", "Coupelles d’amortisseur", "Veerpootlagers")],
      ["tie_rod_ends", maintenanceCopy("Tie-rod ends (left / right)", "Rotules de direction (gauche / droite)", "Spoorstangeinden (links / rechts)")],
      ["ball_joints", maintenanceCopy("Suspension ball joints", "Rotules de suspension", "Fuseekogels")],
      ["stabilizer_links", maintenanceCopy("Stabilizer links", "Biellettes de barre stabilisatrice", "Stabilisatorstangen")],
      ["suspension_arms", maintenanceCopy("Suspension arms", "Triangles / bras de suspension", "Draagarmen")],
      ["wheel_bearings", maintenanceCopy("Wheel bearings (front / rear)", "Roulements de roue (AV / AR)", "Wiellagers (voor / achter)")],
      ["driveshaft_cv_boot", maintenanceCopy("Driveshaft / CV boot", "Cardan / soufflet de cardan", "Aandrijfas / homokineethoes")],
    ],
  },
  {
    title: maintenanceCopy("Electrical, charging & starting", "Électricité, charge et démarrage", "Elektriciteit, laden en starten"),
    items: [
      ["battery_12v", maintenanceCopy("12V battery", "Batterie 12V", "12V-accu")],
      ["alternator", maintenanceCopy("Alternator", "Alternateur", "Dynamo")],
      ["starter_motor", maintenanceCopy("Starter motor", "Démarreur", "Startmotor")],
      ["bulbs_lights", maintenanceCopy("Bulbs / headlights / rear lights", "Ampoules / phares / feux arrière", "Lampen / koplampen / achterlichten")],
      ["fuses_relays", maintenanceCopy("Fuses / relays", "Fusibles / relais", "Zekeringen / relais")],
      ["sensors", maintenanceCopy("Sensors (ABS, engine, pressure)", "Capteurs / sondes (ABS, moteur, pression)", "Sensoren (ABS, motor, druk)")],
      ["ignition_switch", maintenanceCopy("Ignition lock / starter switch", "Neiman / contacteur de démarrage", "Contactslot / startschakelaar")],
    ],
  },
  {
    title: maintenanceCopy("Exhaust & emissions", "Échappement et dépollution", "Uitlaat en emissieregeling"),
    items: [
      ["egr_valve", maintenanceCopy("EGR valve (cleaning or replacement)", "Vanne EGR (nettoyage ou remplacement)", "EGR-klep (reinigen of vervangen)")],
      ["particulate_filter", maintenanceCopy("Particulate filter / DPF (regeneration or replacement)", "Filtre à particules - FAP (régénération ou remplacement)", "Roetfilter / DPF (regenereren of vervangen)")],
      ["lambda_sensor", maintenanceCopy("Lambda sensor", "Sonde lambda", "Lambdasonde")],
      ["exhaust_system", maintenanceCopy("Exhaust system / silencer", "Ligne d’échappement / silencieux", "Uitlaatsysteem / demper")],
      ["adblue_refill", maintenanceCopy("AdBlue refill", "Remplissage AdBlue", "AdBlue bijvullen")],
    ],
  },
  {
    title: maintenanceCopy("Transmission & clutch", "Transmission et embrayage", "Transmissie en koppeling"),
    items: [
      ["clutch_kit", maintenanceCopy("Clutch kit (disc + mechanism)", "Kit d’embrayage (disque + mécanisme)", "Koppelingsset (plaat + mechanisme)")],
      ["flywheel", maintenanceCopy("Flywheel (dual mass)", "Volant moteur (bi-masse)", "Vliegwiel (dubbele massa)")],
      ["clutch_release_hydraulics", maintenanceCopy("Release bearing / clutch hydraulics", "Butée d’embrayage / émetteur-récepteur", "Druklager / koppelingshydrauliek")],
      ["transmission_flex_disc", maintenanceCopy("Transmission flex disc", "Flector de transmission", "Hardyschijf aandrijving")],
    ],
  },
  {
    title: maintenanceCopy("Tyres & wheel alignment", "Pneumatiques et géométrie", "Banden en uitlijning"),
    items: [
      ["front_tyres", maintenanceCopy("Front tyre(s) (replacement + balancing)", "Pneu(s) avant (remplacement + équilibrage)", "Voorband(en) (vervanging + balanceren)")],
      ["rear_tyres", maintenanceCopy("Rear tyre(s) (replacement + balancing)", "Pneu(s) arrière (remplacement + équilibrage)", "Achterband(en) (vervanging + balanceren)")],
      ["puncture_repair", maintenanceCopy("Puncture repair / plug", "Réparation crevaison / mèche", "Bandenreparatie / prop")],
      ["wheel_alignment", maintenanceCopy("Wheel alignment / geometry", "Réglage parallélisme / géométrie", "Uitlijning / geometrie")],
      ["tyre_pressure", maintenanceCopy("Tyre pressure adjustment", "Ajustement pression des pneus", "Bandenspanning aanpassen")],
    ],
  },
  {
    title: maintenanceCopy("Visibility, air conditioning & fluid levels", "Visibilité, climatisation et niveaux", "Zicht, airconditioning en vloeistofniveaus"),
    items: [
      ["wiper_blades", maintenanceCopy("Wiper blades (front / rear)", "Balais d’essuie-glace (AV / AR)", "Ruitenwissers (voor / achter)")],
      ["washer_fluid", maintenanceCopy("Washer fluid top-up", "Appoint liquide lave-glace", "Ruitensproeiervloeistof bijvullen")],
      ["air_conditioning_recharge", maintenanceCopy("Air-conditioning recharge (gas)", "Recharge climatisation (gaz)", "Airconditioning bijvullen (gas)")],
      ["coolant", maintenanceCopy("Coolant (top-up / bleed)", "Liquide de refroidissement (appoint / purge)", "Koelvloeistof (bijvullen / ontluchten)")],
      ["lock_handle_window_regulator", maintenanceCopy("Lock / handle / window regulator", "Serrure / poignée / lève-vitre", "Slot / handgreep / raammechanisme")],
    ],
  },
];

const maintenanceItemsByCode = new Map(
  maintenanceCatalog.flatMap((category) => category.items),
);

function maintenanceLabel(copy) {
  return copy?.[state.language] || copy?.en || "";
}

const operationalWorkflowDefaults = ["wash", "check_in", "check_out", "breakdown_replacement", "vehicle_transfer"];

function allowedWorkflows() {
  const base = roleWorkflows[state.data.account.role] || [];
  const assigned = state.data.account.allowedWorkflowTypes;
  return Array.isArray(assigned) ? base.filter((type) => assigned.includes(type)) : base;
}

function allowedViews() {
  if (state.data?.account?.role === "employee" && Array.isArray(state.data.account.allowedWorkflowTypes)) {
    return ["overview", "operations"];
  }
  return roleViews[state.data.account.role] || ["overview"];
}

function navigationLabel(view, role) {
  if (view === "overview" && role !== "admin") return "Home";
  if (view === "operations" && role !== "admin") return "My actions";
  if (view === "fleet" && ["customer", "driver"].includes(role)) return "My vehicles";
  return viewCopy[view]?.[0] || view;
}

function workspaceLabel(role) {
  return {
    admin: "Operations",
    employee: "Team operations",
    mechanic: "Mechanic workspace",
    contractor: "External work",
    customer: "Customer portal",
    driver: "Driver portal",
  }[role] || "Operations";
}

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

// Google Material Symbols (Apache 2.0), embedded locally for reliable portal rendering.
const pictogramPaths = {
  home: '<path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"/>',
  applications: '<path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h207q-2-37 26-66.5t67-29.5q39 0 67 29.5t26 66.5h207q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm55-60h490v-9q-54-46-116-69.5T480-282q-67 0-129 23.5T235-189v9Zm119-184q23 0 38.5-15.5T408-418q0-23-15.5-38.5T354-472q-23 0-38.5 15.5T300-418q0 23 15.5 38.5T354-364Z"/>',
  access: '<path d="M232-432q-20-20-20-48t20-48q20-20 48-20t48 20q20 20 20 48t-20 48q-20 20-48 20t-48-20Zm48 192q-100 0-170-70T40-480q0-100 70-170t170-70q72 0 126 34t85 103h356l113 113-167 153-88-64-88 64-75-60h-51q-25 60-78.5 98.5T280-240Zm0-60q58 0 107-38.5t63-98.5h114l54 45 88-63 82 62 85-79-51-51H450q-12-56-60-96.5T280-660q-75 0-127.5 52.5T100-480q0 75 52.5 127.5T280-300Z"/>',
  customers: '<path d="M0-240v-53q0-39 42-63t108-24q12 0 23.5.5T196-377q-8 17-12 35t-4 37v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-20-3.5-37.5T765-377q11-2 22-2.5t23-.5q68 0 109 24t41 63v53H780ZM480-480q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z"/>',
  drivers: '<path d="M140-80q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h250v-140q0-24 18-42t42-18h60q24 0 42 18t18 42v140h250q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm92-167h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265-312q-15 5-24 19t-9 32v14Zm336-67h170v-50H568v50Zm-214-50q23 0 38.5-15.5T408-418q0-23-15.5-38.5T354-472q-23 0-38.5 15.5T300-418q0 23 15.5 38.5T354-364Zm214-63h170v-50H568v50Z"/>',
  fleet: '<path d="M200-204v54q0 13-8.5 21.5T170-120h-20q-13 0-21.5-8.5T120-150v-324l85-256q5-14 16.5-22t26.5-8h464q15 0 26.5 8t16.5 22l85 256v324q0 13-8.5 21.5T810-120h-21q-13 0-21-8.5t-8-21.5v-54H200Zm3-330h554l-55-166H258l-55 166Zm-23 270h600v-210H180v210Zm106-50q23 0 38.5-15.5T340-368q0-23-15.5-39.5T286-424q-23 0-39.5 16.5T230-368q0 23 16.5 38.5T286-314Zm389 0q23 0 39.5-15.5T731-368q0-23-16.5-39.5T675-424q-23 0-38.5 16.5T621-368q0 23 15.5 38.5T675-314Z"/>',
  rentals: '<path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm140 230q17 0 28.5-11.5T360-440q0-17-11.5-28.5T320-480q-17 0-28.5 11.5T280-440q0 17 11.5 28.5T320-400Zm160 0q17 0 28.5-11.5T520-440q0-17-11.5-28.5T480-480q-17 0-28.5 11.5T440-440q0 17 11.5 28.5T480-400Zm160 0q17 0 28.5-11.5T680-440q0-17-11.5-28.5T640-480q-17 0-28.5 11.5T600-440q0 17 11.5 28.5T640-400Z"/>',
  operations: '<path d="M222-214 80-356l42-42 100 99 179-179 42 43-221 221Zm0-320L80-676l42-42 100 99 179-179 42 43-221 221Zm298 244v-60h360v60H520Zm0-320v-60h360v60H520Z"/>',
  audit: '<path d="M477-120q-149 0-253-105.5T120-481h60q0 125 86 213t211 88q127 0 215-89t88-216q0-124-89-209.5T477-780q-68 0-127.5 31T246-667h105v60H142v-208h60v106q52-61 123.5-96T477-840q75 0 141 28t115.5 76.5Q783-687 811.5-622T840-482q0 75-28.5 141t-78 115Q684-177 618-148.5T477-120Zm128-197L451-469v-214h60v189l137 134-43 43Z"/>',
  profile: '<path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm160.5-234.5Q343-529 343-587t39.5-97.5Q422-724 480-724t97.5 39.5Q617-645 617-587t-39.5 97.5Q538-450 480-450t-97.5-39.5ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>',
  accident_report: '<path d="M140-224v-210 210ZM80-434l85-256q5-14 16.5-22t26.5-8h228q-2 15-2 30t2 30H218l-55 166h362q33 28 75 44t89 16H140v210h600v-215q16-3 31-8t29-13v349q0 13-8.5 21.5T770-80h-21q-13 0-21-8.5t-8-21.5v-54H160v54q0 13-8.5 21.5T130-80h-20q-13 0-21.5-8.5T80-110v-324Zm557 170q23 0 38.5-15.5T691-328q0-23-15.5-39.5T637-384q-23 0-39.5 16.5T581-328q0 23 16.5 38.5T637-274Zm52-224q-79 0-135-56t-56-135q0-79 56-135t135-56q80 0 135.5 55.5T880-689q0 80-56 135.5T689-498Zm-15-161h35v-143h-35v143Zm18 85q10 0 16-6t6-16q0-10-6.5-16t-15.5-6q-10 0-16 6t-6 16q0 10 6 16t16 6Z"/>',
  problem_report: '<path d="M480-281q14 0 24.5-10.5T515-316q0-14-10.5-24.5T480-351q-14 0-24.5 10.5T445-316q0 14 10.5 24.5T480-281Zm-30-144h60v-263h-60v263ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm25-60h250l175-175v-250L605-780H355L180-605v250l175 175Z"/>',
  report: '<path d="M480-281q14 0 24.5-10.5T515-316q0-14-10.5-24.5T480-351q-14 0-24.5 10.5T445-316q0 14 10.5 24.5T480-281Zm-30-144h60v-263h-60v263ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm25-60h250l175-175v-250L605-780H355L180-605v250l175 175Z"/>',
  check_in: '<path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/>',
  check_out: '<path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"/>',
  wash: '<path d="M442-787q-18-17-18-41 0-19 13.5-39.5T483-920q32 32 45.5 52.5T542-828q0 24-17.5 41.5T483-769q-24 0-41-18Zm-242 663v54q0 13-8.5 21.5T170-40h-20q-13 0-21.5-8.5T120-70v-324l85-256q3-14 15.5-22t27.5-8h464q15 0 27.5 8t15.5 22l85 256v324q0 13-8.5 21.5T810-40h-21q-13 0-21.5-8.5T759-70v-54H200Zm3-330h554l-55-166H258l-55 166Zm-23 270h600v-210H180v210Zm106-50q23 0 38.5-15.5T340-288q0-23-15.5-39.5T286-344q-23 0-39.5 16.5T230-288q0 23 16.5 38.5T286-234Zm389 0q23 0 39.5-15.5T731-288q0-23-16.5-39.5T675-344q-23 0-38.5 16.5T621-288q0 23 15.5 38.5T675-234Z"/>',
  breakdown_replacement: '<path d="M450-80v-120H160v-60h640v60H510v120h-60ZM200-616l66-192q5-14 16.5-23t25.5-9h344q14 0 25.5 9t16.5 23l66 192v272q0 11-7 17.5t-17 6.5h-12q-11 0-17.5-6.5T700-344v-64H260v64q0 11-6.5 17.5T236-320h-12q-11 0-17.5-6.5T200-344v-272Zm77-42h407l-41-122H317l-40 122Zm-17 190h440v-130H260v130Z"/>',
  vehicle_transfer: '<path d="M245-166q-45-45-45-109v-349q-35-13-57.5-41.5T120-730q0-46 32.5-78t78-32q45.5 0 77.5 32t32 78q0 36-22.5 64.5T260-624v349q0 39 27.5 67t68 28q40.5 0 67.5-28t27-67v-410q0-65 45-110t110-45q65 0 110 45t45 110v349q35 13 57.5 41.5T840-230q0 45-32 77.5T730-120q-45 0-77.5-32.5T620-230q0-36 22.5-65t57.5-41v-349q0-40-27.5-67.5T605-780q-40 0-67.5 27.5T510-685v410q0 64-45 109.5T355-120q-65 0-110-46Z"/>',
  maintenance: '<path d="M705-128 447-388q-23 8-46 13t-47 5q-97 0-165-68t-68-164q0-31 8-60t23-56l145 145 92-86-149-149q26-15 55-23.5t59-8.5q99 0 168.5 69.5T592-602q0 24-5 47t-13 46l259 258q11 11 11 26.5T833-198l-76 70q-11 11-26 11t-26-11Zm28-57 40-40-273-273q16-21 24-49.5t8-54.5q0-75-55.5-127T350-782l102 104q9 9 8.5 21.5T451-635L318-510q-9 8-21.5 8T276-510l-98-97q3 77 54.5 127T354-430q25 0 53-8t49-24l277 277Z"/>',
  handover_take: '<path d="M232-432q-20-20-20-48t20-48q20-20 48-20t48 20q20 20 20 48t-20 48q-20 20-48 20t-48-20Zm48 192q-100 0-170-70T40-480q0-100 70-170t170-70q72 0 126 34t85 103h356l113 113-167 153-88-64-88 64-75-60h-51q-25 60-78.5 98.5T280-240Z"/>',
  handover_return: '<path d="M475-140q5 0 11.5-2.5T497-149l337-338q13-13 19.5-30t6.5-33q0-17-6.5-34T834-614L654-794q-13-13-30-19.5t-34-6.5q-17 0-33.5 6.5T527-794l-18 18 81 82q13 14 23 32.5t10 40.5q0 38-29.5 67T526-525q-25 0-41.5-7.5T454-554l-73-73-181 181q-9 9-9 22t8.5 21.5Q208-394 221-394q6 0 11.5-3t9.5-7l138-138 42 42-137 137q-9 9-9 23t9 21q9 9 21 9 6 0 11.5-2.5t9.5-6.5l138-138 42 42-137 137q-9 9-9 21t9 21q9 9 21 9 6 0 11-2t10-7l138-138 42 42-138 138q-9 9-9 22 0 14 8 22t22 8Z"/>',
  payment_proof: '<path d="M222-80q-44 0-74.5-30.5T117-185v-125h127v-570l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60v695q0 44-30.5 74.5T738-80H222Zm135-542v-60h240v60H357Zm0 134v-60h240v60H357Zm-136 348h412v-110H177v65q0 20 12.5 32.5T221-140Z"/>',
  monthly_inspection: '<path d="M132-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h696q24 0 42 18t18 42v600q0 24-18 42t-42 18H132Zm68-160h200v-80H200v80Zm382-80 198-198-57-57-141 142-57-57-56 57 113 113Zm-382-80h200v-80H200v80Zm0-160h200v-80H200v80Z"/>',
};

function pictogram(name, className = "pictogram") {
  const path = pictogramPaths[name] || pictogramPaths.operations;
  return `<span class="${clean(className)}" aria-hidden="true"><svg viewBox="0 -960 960 960" focusable="false">${path}</svg></span>`;
}

function actionPictogram(target) {
  const aliases = { customer_onboarding: "applications" };
  return pictogram(aliases[target] || target, "action-pictogram");
}

function navigationPictogram(view) {
  return pictogram(view === "overview" ? "home" : view, "nav-pictogram");
}

function vehicleBrandMark(make, className = "vehicle-brand-mark") {
  const safeMake = clean(make || "Vehicle");
  const brand = String(make || "").toLowerCase();
  let brandClass = "generic";
  let asset = "";
  if (brand.includes("renault")) {
    brandClass = "renault";
    asset = "renault";
  } else if (brand.includes("citro")) {
    brandClass = "citroen";
    asset = "citroen";
  } else if (brand.includes("opel")) {
    brandClass = "opel";
    asset = "opel";
  } else if (brand.includes("fiat")) {
    brandClass = "fiat";
    asset = "fiat";
  } else if (brand.includes("peugeot")) {
    brandClass = "peugeot";
    asset = "peugeot";
  }
  const mark = asset
    ? `<img src="brand-icons/${asset}.svg" alt="" loading="lazy">`
    : '<svg viewBox="0 0 32 32"><path d="M5 13h22l3 6v7H2v-7Zm4 13a3 3 0 1 0 6 0m6 0a3 3 0 1 0 6 0M8 13l3-6h10l4 6"/></svg>';
  return `<span class="${clean(className)} brand-${brandClass}" title="${safeMake}" aria-label="${safeMake} logo">${mark}</span>`;
}

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
    required_evidence_missing: "Add every required photo and signature.",
    operation_details_required: "Complete all required operation details.",
    maintenance_details_required: "Maintenance checklist is incomplete.",
    invalid_maintenance_items: "Invalid maintenance selection.",
    too_many_files: "You selected too many photos. Keep the total at 24 or fewer.",
    media_service_unavailable: "Photo storage is temporarily unavailable.",
    customer_link_required: "Choose a customer for this customer account.",
    customer_already_linked: "That customer already has an access account.",
    customer_not_linked: "This account is not linked to a customer.",
    driver_not_linked: "This driver account is not linked correctly.",
    driver_link_required: "Choose the linked customer for this driver.",
    driver_already_linked: "This driver already has an access account.",
    driver_documents_required: "All four identity and driving-licence photos are required.",
    driver_eligibility_failed: "The driver must be at least 23 and must have held a valid licence for at least five years.",
    accident_details_required: "Complete the accident details and liability choice.",
    payment_details_required: "Enter the invoice number or reference.",
    inspection_details_required: "Complete the mileage and monthly inspection details.",
    inspection_already_submitted: "This monthly inspection has already been submitted for this vehicle.",
    inspection_media_required: "Add all six required monthly inspection photos.",
    invalid_media: "One or more uploaded files could not be verified. Please upload them again.",
    cannot_change_self_role: "You cannot change your own administrator role.",
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
  window.yabiShowPortalEntry?.();
}

function showApp() {
  el.login.hidden = true;
  el.app.hidden = false;
}

async function refresh() {
  try {
    const result = await api("/api/portal/data");
    state.data = result.data;
    const allowed = allowedViews();
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
  el.profileRole.textContent = tr(roles[account.role] || account.role);
  el.profileAvatar.textContent = initials(account.displayName);
  el.workspace.textContent = workspaceLabel(account.role);
  el.navigation.innerHTML = allowedViews()
    .map(
      (view) => `<button class="nav-button ${state.view === view ? "active" : ""}" data-view="${view}">
        ${navigationPictogram(view)}
        <strong>${clean(navigationLabel(view, account.role))}</strong>
      </button>`,
    )
    .join("");
  translateTree(el.sidebar);
}

function header(actions = "") {
  const title = navigationLabel(state.view, state.data.account.role);
  return `<header class="view-header">
    <div><h1>${clean(title)}</h1></div>
    ${actions ? `<div class="view-actions">${actions}</div>` : ""}
  </header>`;
}

function empty(title, description, action = "") {
  return `<div class="empty-state"><span>YB</span><h3>${clean(tr(title))}</h3>${description ? `<p>${clean(tr(description))}</p>` : ""}${action}</div>`;
}

function table(head, rows) {
  return `<div class="data-panel"><div class="table-wrap"><table class="data-table">
    <thead><tr>${head.map((item) => `<th>${clean(item)}</th>`).join("")}</tr></thead>
    <tbody>${rows}</tbody>
  </table></div></div>`;
}

function maps() {
  return {
    accounts: new Map((state.data.accounts || []).map((item) => [item.id, item])),
    customers: new Map((state.data.customers || []).map((item) => [item.id, item])),
    drivers: new Map((state.data.drivers || []).map((item) => [item.id, item])),
    vehicles: new Map((state.data.vehicles || []).map((item) => [item.id, item])),
    rentals: new Map((state.data.rentals || []).map((item) => [item.id, item])),
  };
}

function render() {
  const views = {
    overview: renderOverview,
    applications: renderApplications,
    access: renderAccess,
    customers: renderCustomers,
    drivers: renderDrivers,
    fleet: renderFleet,
    rentals: renderRentals,
    operations: renderOperations,
    audit: renderAudit,
    profile: renderProfile,
  };
  (views[state.view] || renderOverview)();
  translateTree(el.view);
}

function renderApplications() {
  if (typeof window.renderApplicationsAdmin === "function") {
    window.renderApplicationsAdmin(el.view);
    return;
  }
  el.view.innerHTML = `${header()}${empty("No applications", "")}`;
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
      ["Breakdown replacement", "Replace a defective customer vehicle", "breakdown_replacement"],
      ["Move vehicle", "Transfer a vehicle from A to B", "vehicle_transfer"],
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
      ["Report an accident", "Record an accident immediately", "accident_report"],
      ["Problem or damage", "Tell us about a vehicle problem", "problem_report"],
      ["Monthly inspection", "Inspect an assigned vehicle", "monthly_inspection"],
      ["Payment proof", "Send proof to accounting", "payment_proof"],
      ["Drivers", "Manage company drivers and their personal access.", "drivers"],
    ],
    driver: [
      ["Report an accident", "Record an accident immediately", "accident_report"],
      ["Problem or damage", "Tell us about a vehicle problem", "problem_report"],
      ["Monthly inspection", "Inspect an assigned vehicle", "monthly_inspection"],
    ],
  };
  const allowed = allowedWorkflows();
  return (choices[role] || []).filter(([, , target]) => !workflows[target] || allowed.includes(target));
}

function roleIntroduction(role) {
  return {
    mechanic: "Record maintenance or report a concern.",
    employee: "Complete the required vehicle procedure.",
    contractor: "Complete the assigned handover or vehicle movement.",
    customer: "Report a problem, accident, payment, or monthly inspection.",
    driver: "Report a problem, accident, or monthly inspection.",
  }[role] || "Choose an action below. The form will guide you step by step.";
}

function actionCards(actions, role) {
  return `<div class="role-task-grid role-task-grid-${clean(role)}">${actions
    .map(([title, description, target], index) => {
      const isUrgent = target === "accident_report";
      const isPrimary = (role === "mechanic" && target === "maintenance") ||
        (role === "employee" && index === 0);
      const number = workflows[target]?.[0] || String(index + 1).padStart(2, "0");
      const supportingCopy = workflows[target]?.[2] || description;
      return `<button class="role-task-card${isPrimary ? " is-primary" : ""}${isUrgent ? " is-urgent" : ""}" ${workflows[target] ? `data-workflow="${target}"` : `data-view="${target}"`}>
        <span class="role-task-heading">${actionPictogram(target)}<span class="role-task-number">${clean(number)}</span></span>
        ${isUrgent ? `<span class="role-task-flag">${clean(tr("Urgent"))}</span>` : ""}
        <strong>${clean(tr(title))}</strong>
        <small>${clean(tr(supportingCopy))}</small>
        <span class="role-task-cta">${clean(tr("Start"))} <b aria-hidden="true">&rarr;</b></span>
      </button>`;
    })
    .join("")}</div>`;
}

function vehicleCards(vehicles) {
  return `<div class="role-vehicle-grid">${vehicles.slice(0, 4).map((vehicle) => `<article class="role-vehicle-card">
    <div><strong>${clean(vehicle.registrationPlate)}</strong>${badge(vehicle.status)}</div>
    <p>${vehicleBrandMark(vehicle.make)}<span>${clean(vehicle.make)} ${clean(vehicle.model)}</span></p>
    <small>${clean(vehicle.currentMileage.toLocaleString(languageLocales[state.language]))} km</small>
  </article>`).join("")}</div>`;
}

function recentRecordCards(records) {
  if (!records.length) return empty("No work recorded yet", "Complete an action and it will appear here.");
  const dataMaps = maps();
  return `<div class="role-record-list">${records.slice(0, 5).map((record) => {
    const vehicle = dataMaps.vehicles.get(record.vehicleId);
    return `<article class="role-record-card">
      <div class="record-operation-identity">${actionPictogram(record.type)}<span><strong>${clean(tr(workflows[record.type]?.[1] || record.type))}</strong><small>${clean(record.reference)}</small></span></div>
      <div class="role-record-meta"><span class="record-vehicle-identity">${vehicleBrandMark(vehicle?.make, "vehicle-brand-mark is-compact")}<span>${clean(vehicle?.registrationPlate || record.licensePlate || "—")}</span></span><span>${clean(date(record.occurredAt, true))}</span>${badge(record.status)}</div>
      <button class="icon-button" data-action="view-record" data-id="${record.id}">${clean(tr("View"))}</button>
    </article>`;
  }).join("")}</div>`;
}

function renderRoleOverview() {
  const { account } = state.data;
  const role = account.role;
  const actions = quickActions();
  const vehicles = state.data.vehicles || [];
  const records = (state.data.workflows || []).filter((record) =>
    role === "customer" || record.actorAccountId === account.id,
  );
  const vehicleHeading = ["customer", "driver"].includes(role)
    ? "Assigned vehicles"
    : "Vehicles available for your work";

  el.view.innerHTML = `<section class="role-home-hero">
      <span>${clean(tr(roles[role] || role))}</span>
      <h1>${clean(tr("What do you need to do?"))}</h1>
      <p>${clean(tr(roleIntroduction(role)))}</p>
    </section>
    <section class="role-home-section role-actions-section">
      <header><div><span>01</span><h2>${clean(tr("My actions"))}</h2></div><p>${clean(tr("Choose an action below. The form will guide you step by step."))}</p></header>
      ${actionCards(actions, role)}
    </section>
    ${vehicles.length ? `<section class="role-home-section">
      <header><div><span>02</span><h2>${clean(tr(vehicleHeading))}</h2></div><button class="text-button" data-view="fleet">${clean(tr("View all"))}</button></header>
      ${vehicleCards(vehicles)}
    </section>` : ""}
    <section class="role-home-section">
      <header><div><span>${vehicles.length ? "03" : "02"}</span><h2>${clean(tr("Your recent work"))}</h2></div><p>${clean(tr("Your submitted records appear here."))}</p></header>
      ${recentRecordCards(records)}
    </section>`;
}

function renderOverview() {
  const role = state.data.account.role;
  if (role !== "admin") {
    renderRoleOverview();
    return;
  }
  const vehicles = state.data.vehicles;
  const rentals = state.data.rentals;
  const records = state.data.workflows;
  const reportTypes = ["report", "problem_report", "accident_report"];
  const openReports = records.filter((item) => reportTypes.includes(item.type) && item.status !== "resolved");
  const metrics =
    ["customer", "driver"].includes(role)
      ? [
          ["Assigned vehicles", vehicles.length],
          ["Monthly inspections", records.filter((r) => r.type === "monthly_inspection").length],
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
          .map(([title, , target]) => `<button class="quick-action" ${workflows[target] ? `data-workflow="${target}"` : `data-view="${target}"`}>
            ${actionPictogram(target)}<span><strong>${clean(title)}</strong></span><span>→</span>
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
        <td><div class="table-actions"><button class="icon-button" data-action="edit-account" data-id="${account.id}">Edit</button><button class="icon-button" data-action="rotate-code" data-id="${account.id}">New code</button>
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
      <td>${clean(customer.email)}</td><td>${clean(customer.phone)}</td><td>${clean([customer.address, customer.postalCode, customer.city].filter(Boolean).join(", ") || "Not completed")}</td><td>${badge(customer.status)}</td>
      <td><button class="icon-button" data-action="edit-customer" data-id="${customer.id}">${state.data.account.role === "admin" ? "View / edit" : "View"}</button></td></tr>`,
    )
    .join("");
  el.view.innerHTML = `${header(canCreate ? '<button class="primary-button" data-action="create-customer">Add customer</button>' : "")}
    ${customers.length ? table(["Customer", "Email", "Phone", "Address", "Status", ""], rows) : empty("No customers", "Add a customer before creating a rental.")}`;
}

function renderDrivers() {
  const drivers = state.data.drivers || [];
  const dataMaps = maps();
  const canManage = ["admin", "customer"].includes(state.data.account.role);
  const rows = drivers.map((driver) => {
    const customer = dataMaps.customers.get(driver.customerId);
    return `<tr><td><strong>${clean(driver.fullName)}</strong><small>${clean(driver.email)}</small></td>
      ${state.data.account.role === "admin" ? `<td>${clean(customer?.company || customer?.fullName || "—")}</td>` : ""}
      <td>${clean(driver.phone)}</td><td>${badge(driver.active && driver.accountActive !== false ? "active" : "inactive")}</td>
      <td>${driver.codeHint ? `•••• ${clean(driver.codeHint)}` : clean(tr("No access code"))}</td>
      <td><div class="table-actions"><button class="icon-button" data-action="view-driver" data-id="${driver.id}">View</button>
      ${canManage && !driver.portalAccountId ? `<button class="icon-button" data-action="driver-access" data-id="${driver.id}">Create code</button>` : ""}
      ${canManage ? `<button class="icon-button" data-action="toggle-driver" data-id="${driver.id}" data-active="${driver.active && driver.accountActive !== false}">${driver.active && driver.accountActive !== false ? "Deactivate" : "Reactivate"}</button>` : ""}</div></td></tr>`;
  }).join("");
  el.view.innerHTML = `${header(canManage ? '<button class="primary-button" data-action="create-driver">Add driver</button>' : "")}
    ${drivers.length ? table(["Driver", ...(state.data.account.role === "admin" ? ["Customer"] : []), "Phone", "Status", "Access", ""], rows) : empty("No drivers", "Add a driver to create personal access.")}`;
}

function renderFleet() {
  const vehicles = state.data.vehicles;
  const canUpdate = ["admin", "employee"].includes(state.data.account.role);
  const rows = vehicles
    .map(
      (vehicle) => `<tr><td><span class="vehicle-table-identity">${vehicleBrandMark(vehicle.make)}<span><strong>${clean(vehicle.registrationPlate)}</strong><small>${clean(vehicle.make)} ${clean(vehicle.model)}</small></span></span></td>
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
        <td>${vehicle ? `<span class="vehicle-table-identity">${vehicleBrandMark(vehicle.make)}<span>${clean(`${vehicle.registrationPlate} · ${vehicle.make} ${vehicle.model}`)}</span></span>` : "—"}</td>
        <td>${date(rental.startDate)} → ${date(rental.expectedEndDate)}</td>
        <td>${money(rental.monthlyPriceCents)}<small>excl. VAT / month</small></td><td>${badge(rental.status)}</td>
        ${admin ? `<td><button class="icon-button" data-action="rental-status" data-id="${rental.id}">Update</button></td>` : ""}</tr>`;
    })
    .join("");
  el.view.innerHTML = `${header(admin ? '<button class="primary-button" data-action="create-rental">Create rental</button>' : "")}
    ${rentals.length ? table(["Reference", "Customer", "Vehicle", "Period", "Price", "Status", ...(admin ? [""] : [])], rows) : empty("No rentals", admin ? "Create a rental after adding a customer and vehicle." : "No rentals are connected to this account.")}`;
}

function renderOperations() {
  const allowed = allowedWorkflows();
  const role = state.data.account.role;
  if (role !== "admin") {
    const actions = quickActions().filter(([, , target]) => workflows[target] && allowed.includes(target));
    const records = (state.data.workflows || []).filter((record) =>
      role === "customer" || record.actorAccountId === state.data.account.id,
    );
    el.view.innerHTML = `${header()}
      <section class="role-home-section role-actions-section role-actions-page">
        <header><div><span>01</span><h2>${clean(tr("My actions"))}</h2></div><p>${clean(tr("Choose an action below. The form will guide you step by step."))}</p></header>
        ${actionCards(actions, role)}
      </section>
      <section class="role-home-section">
        <header><div><span>02</span><h2>${clean(tr("Your recent work"))}</h2></div><p>${clean(tr("Your submitted records appear here."))}</p></header>
        ${recentRecordCards(records)}
      </section>`;
    return;
  }
  el.view.innerHTML = `${header()}
    <section class="workflow-grid">${allowed
      .map((type) => `<button class="workflow-card" data-workflow="${type}"><span class="workflow-card-top">${actionPictogram(type)}<b>${workflows[type][0]}</b></span><strong>${clean(workflows[type][1])}</strong></button>`)
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
      return `<tr><td><span class="record-operation-identity">${actionPictogram(record.type)}<span><strong>${clean(workflows[record.type]?.[1] || record.type)}</strong><small>${clean(record.reference)}</small></span></span></td>
        <td><span class="record-vehicle-identity">${vehicleBrandMark(vehicle?.make, "vehicle-brand-mark is-compact")}<span>${clean(vehicle ? vehicle.registrationPlate : record.licensePlate || "—")}</span></span></td>
        ${compact ? "" : `<td>${clean(record.performedByName || account?.displayName || "Portal user")}</td>`}<td>${date(record.occurredAt, true)}</td>
        <td>${badge(record.status)}</td><td><div class="table-actions"><button class="icon-button" data-action="view-record" data-id="${record.id}">View</button>
        ${["report", "problem_report", "accident_report", "payment_proof"].includes(record.type) && record.status !== "resolved" && ["admin", "employee"].includes(state.data.account.role) ? `<button class="icon-button" data-action="resolve-report" data-id="${record.id}">Resolve</button>` : ""}</div></td></tr>`;
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
        ${options.map(([value, text, leading = ""]) => `<button class="custom-select-option" type="button" role="option" data-value="${clean(value)}" aria-selected="false"><span class="custom-select-option-content">${leading}<span>${clean(tr(text))}</span></span></button>`).join("")}
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
  value.innerHTML = option.querySelector(".custom-select-option-content")?.innerHTML || clean(option.textContent);
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
  el.modalBody.querySelectorAll('input[type="file"]').forEach(releaseUploadPreviewUrls);
  if (el.modal.open) el.modal.close();
  el.modalBody.innerHTML = "";
}

function revealCode(person, code) {
  modal({
    title: `${tr("Access for")} ${person}`,
    content: `<div class="code-reveal"><p>This code is shown only once.</p><strong>${clean(code)}</strong><small>Share it privately. Anyone with this code can sign in.</small></div>
      <div class="form-submit-row"><button class="ghost-button" id="copy-code">Copy code</button><button class="primary-button" data-close>Done</button></div>`,
  });
  el.modalBody.querySelector("#copy-code").addEventListener("click", async () => {
    await navigator.clipboard.writeText(code);
    toast("Access code copied.");
  });
  el.modalBody.querySelector("[data-close]").addEventListener("click", closeModal);
}

window.yabiRevealAccessCode = (code) => revealCode("Customer", code);

function createAccount() {
  const permissionOptions = operationalWorkflowDefaults
    .map((type) => `<label class="permission-option"><input type="checkbox" name="workflowAccess" value="${type}" checked>${actionPictogram(type)}<span><strong>${clean(workflows[type][1])}</strong></span></label>`)
    .join("");
  modal({
    title: "Create personal access",
    submit: "Create access",
    content: `<form class="portal-form">${field("Display name", "displayName", "", true)}
      ${select("Role", "role", Object.entries(roles).filter(([role]) => role !== "driver"), true)}
      <fieldset id="workflow-access" class="permission-field" hidden><legend>Assigned operations</legend><div class="permission-grid">${permissionOptions}</div></fieldset>
      <div id="customer-link" hidden>${select("Linked customer", "linkedCustomerId", state.data.customers.map((c) => [c.id, c.fullName]), true)}</div></form>`,
    handler: async (data) => {
      const body = { operation: "create_account", displayName: data.get("displayName"), role: data.get("role") };
      if (body.role === "customer") body.linkedCustomerId = data.get("linkedCustomerId");
      if (["employee", "contractor"].includes(body.role)) body.allowedWorkflowTypes = data.getAll("workflowAccess");
      const result = await api("/api/portal/admin", { method: "POST", body });
      closeModal();
      await refresh();
      revealCode(body.displayName, result.accessCode);
    },
  });
  const role = el.modalBody.querySelector('[name="role"]');
  const wrapper = el.modalBody.querySelector("#customer-link");
  const workflowAccess = el.modalBody.querySelector("#workflow-access");
  const customerSelect = wrapper.querySelector("[data-custom-select]");
  role.addEventListener("change", () => {
    wrapper.hidden = role.value !== "customer";
    workflowAccess.hidden = !["employee", "contractor"].includes(role.value);
    customerSelect.dataset.required = String(role.value === "customer");
    if (role.value !== "customer") setCustomValue(wrapper, "linkedCustomerId", "");
  });
}

function editAccount(id) {
  const account = state.data.accounts.find((item) => item.id === id);
  if (!account) return;
  const allowedRoles = account.role === "driver" ? [["driver", "Driver"]] : Object.entries(roles).filter(([role]) => role !== "driver");
  const permissionOptions = operationalWorkflowDefaults.map((type) => `<label class="permission-option"><input type="checkbox" name="workflowAccess" value="${type}" ${account.allowedWorkflowTypes?.includes(type) ? "checked" : ""}>${actionPictogram(type)}<span><strong>${clean(workflows[type][1])}</strong></span></label>`).join("");
  modal({
    title: "Edit account",
    submit: "Update account",
    content: `<form class="portal-form">${field("Display name", "displayName", account.displayName, true)}
      ${select("Role", "role", allowedRoles, true)}
      <fieldset id="workflow-access" class="permission-field" ${["employee", "contractor"].includes(account.role) ? "" : "hidden"}><legend>${clean(tr("Assigned operations"))}</legend><div class="permission-grid">${permissionOptions}</div></fieldset>
      <div id="customer-link" ${["customer", "driver"].includes(account.role) ? "" : "hidden"}>${select("Linked customer", "linkedCustomerId", state.data.customers.map((c) => [c.id, c.company || c.fullName]), ["customer", "driver"].includes(account.role))}</div></form>`,
    handler: async (data) => {
      const body = { operation: "update_account", targetAccountId: id, displayName: data.get("displayName"), role: data.get("role") };
      if (["customer", "driver"].includes(body.role)) body.linkedCustomerId = data.get("linkedCustomerId");
      if (["employee", "contractor"].includes(body.role)) body.allowedWorkflowTypes = data.getAll("workflowAccess");
      await api("/api/portal/admin", { method: "POST", body });
      closeModal();
      toast("Account updated.");
      await refresh();
    },
  });
  setCustomValue(el.modalBody, "role", account.role);
  setCustomValue(el.modalBody, "linkedCustomerId", account.linkedCustomerId || "");
  const roleInput = el.modalBody.querySelector('[name="role"]');
  roleInput.addEventListener("change", () => {
    const linked = ["customer", "driver"].includes(roleInput.value);
    el.modalBody.querySelector("#customer-link").hidden = !linked;
    el.modalBody.querySelector("#customer-link [data-custom-select]").dataset.required = String(linked);
    el.modalBody.querySelector("#workflow-access").hidden = !["employee", "contractor"].includes(roleInput.value);
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

const provinceOptions = [
  ["antwerp", "Antwerp"], ["east_flanders", "East Flanders"], ["flemish_brabant", "Flemish Brabant"],
  ["hainaut", "Hainaut"], ["liege", "Liège"], ["limburg", "Limburg"], ["luxembourg", "Luxembourg"],
  ["namur", "Namur"], ["walloon_brabant", "Walloon Brabant"], ["west_flanders", "West Flanders"], ["brussels_capital", "Brussels"],
];

function editCustomer(id) {
  const customer = state.data.customers.find((item) => item.id === id);
  if (!customer) return;
  const admin = state.data.account.role === "admin";
  const detail = (label, value) => `<div class="field readonly-field"><label>${clean(tr(label))}</label><div class="readonly-value">${clean(value || "—")}</div></div>`;
  if (!admin) {
    modal({ title: customer.fullName, content: `<div class="portal-form"><div class="form-grid">${detail("Company", customer.company)}${detail("Email", customer.email)}${detail("Phone", customer.phone)}${detail("Address", [customer.street, customer.houseNumber, customer.addressBox, customer.postalCode, customer.city].filter(Boolean).join(" "))}</div></div>` });
    return;
  }
  modal({
    title: "View / edit customer",
    submit: "Save changes",
    content: `<form class="portal-form"><div class="form-grid">
      ${field("Full name", "fullName", customer.fullName, true)}${field("Company", "company", customer.company || "")}
      ${field("Belgian VAT number", "companyVatNumber", customer.companyVatNumber || "")}${field("Email", "email", customer.email, true, "email")}${field("Phone", "phone", customer.phone, true, "tel")}
      ${field("Street", "street", customer.street || "")}${field("House number", "houseNumber", customer.houseNumber || "")}${field("Box", "addressBox", customer.addressBox || "")}
      ${field("Postal code", "postalCode", customer.postalCode || "")}${field("City", "city", customer.city || "")}${select("Province", "province", provinceOptions)}
      ${field("Identity-card number", "identityCardNumber", customer.identityCardNumber || "")}${field("National-register number", "nationalRegisterNumber", customer.nationalRegisterNumber || "")}
      ${field("Driving licence number", "drivingLicenseNumber", customer.drivingLicenseNumber || "")}${field("Emergency contact", "emergencyContact", customer.emergencyContact || "")}
      ${select("Status", "status", [["lead", "Lead"], ["active", "Active"], ["inactive", "Inactive"]], true)}</div>
      <div class="field"><label>${clean(tr("Internal notes"))}</label><textarea name="notes">${clean(customer.notes || "")}</textarea></div></form>`,
    handler: async (data) => {
      await api("/api/portal/admin", { method: "POST", body: { operation: "update_customer", customerId: id, ...Object.fromEntries(data) } });
      closeModal();
      toast("Customer updated.");
      await refresh();
    },
  });
  setCustomValue(el.modalBody, "province", customer.province || "");
  setCustomValue(el.modalBody, "status", customer.status);
}

function createDriver() {
  if (state.data.account.role === "admin" && !state.data.customers.length) {
    toast("Add a customer before adding a driver.", "error");
    return;
  }
  const customerField = state.data.account.role === "admin"
    ? select("Customer / company", "customerId", state.data.customers.filter((c) => c.status === "active").map((c) => [c.id, c.company || c.fullName]), true)
    : "";
  modal({
    title: "Add driver",
    submit: "Create driver access",
    content: `<form class="portal-form">${customerField}<div class="form-grid">
      ${field("First name", "firstName", "", true)}${field("Last name", "lastName", "", true)}${field("Phone", "phone", "", true, "tel")}${field("Email", "email", "", true, "email")}
      ${field("Date of birth", "dateOfBirth", "", true, "date")}${field("Identity-card number", "identityCardNumber", "", true)}
      ${field("Driving-licence number", "drivingLicenceNumber", "", true)}${field("Licence issue date", "licenceIssueDate", "", true, "date")}${field("Licence valid since", "licenceValidSince", "", true, "date")}</div>
      <div class="started-vehicle-note"><strong>${clean(tr("Eligibility"))}</strong><span>${clean(tr("The driver must be at least 23 and must have held a valid licence for at least five years."))}</span></div>
      <section class="form-section"><h3>${clean(tr("Identity and driving-licence photographs"))}</h3><p>${clean(tr("Clear photographs are required. Only authorised administrators and the linked customer can view them."))}</p>
      <div class="evidence-grid">${uploadField("ID card — front", "driver_identity_front", "driver_document", true, "driver_identity_front")}${uploadField("ID card — back", "driver_identity_back", "driver_document", true, "driver_identity_back")}${uploadField("Driving licence — front", "driver_licence_front", "driver_document", true, "driver_licence_front")}${uploadField("Driving licence — back", "driver_licence_back", "driver_document", true, "driver_licence_back")}</div></section></form>`,
    handler: async (data, form) => {
      const files = [...form.querySelectorAll('input[type="file"]')].map((input, sortOrder) => ({ file: input.files[0], category: "driver_document", slot: input.dataset.slot, captureSource: "gallery", sortOrder }));
      if (files.some((item) => !item.file)) throw new Error("driver_documents_required");
      const progress = document.createElement("div");
      progress.className = "upload-progress visible";
      progress.innerHTML = `<div class="progress-track"><i></i></div><span>${clean(tr("Preparing evidence…"))}</span>`;
      form.querySelector(".form-submit-row").before(progress);
      const uploadGroupId = crypto.randomUUID();
      const mediaIds = await upload(files, uploadGroupId, (done, total) => {
        progress.querySelector("i").style.width = `${Math.round((done / Math.max(1, total)) * 100)}%`;
        progress.querySelector("span").textContent = `${tr("Uploading evidence")} ${Math.ceil(done)} ${tr("of")} ${total}`;
      });
      const values = Object.fromEntries(data);
      const result = await api("/api/portal/drivers", { method: "POST", body: { operation: "create", uploadGroupId, mediaIds, ...values } });
      closeModal();
      await refresh();
      revealCode(`${values.firstName} ${values.lastName}`, result.accessCode);
    },
  });
  bindUploads();
}

async function createDriverAccess(id) {
  const driver = state.data.drivers.find((item) => item.id === id);
  try {
    const result = await api("/api/portal/drivers", { method: "POST", body: { operation: "create_access", driverId: id } });
    await refresh();
    revealCode(driver?.fullName || "Driver", result.accessCode);
  } catch (error) { toast(messageFor(error), "error"); }
}

async function toggleDriver(id, active) {
  if (!confirm(active ? tr("Deactivate this driver? Access stops immediately.") : tr("Reactivate this driver?"))) return;
  try {
    await api("/api/portal/drivers", { method: "POST", body: { operation: "set_active", driverId: id, active: !active } });
    toast(active ? "Driver deactivated." : "Driver reactivated.");
    await refresh();
  } catch (error) { toast(messageFor(error), "error"); }
}

async function viewDriver(id) {
  const driver = state.data.drivers.find((item) => item.id === id);
  if (!driver) return;
  try {
    const result = await api("/api/portal/driver-media", { method: "POST", body: { driverId: id } });
    const details = [["Full name", driver.fullName], ["Email", driver.email], ["Phone", driver.phone], ["Date of birth", driver.dateOfBirth], ["Identity-card number", driver.identityCardNumber], ["Driving-licence number", driver.drivingLicenceNumber], ["Licence issue date", driver.licenceIssueDate], ["Licence valid since", driver.licenceValidSince]];
    modal({ title: driver.fullName, content: `<div class="portal-form"><div class="form-grid">${details.map(([label, value]) => readonlyField(label, value)).join("")}</div>
      <section class="form-section"><h3>${clean(tr("Protected documents"))}</h3><div class="media-gallery">${result.items.sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99)).map((item) => `<figure><img src="${clean(item.url)}" alt="${clean(mediaSlotLabel(item.slot, item.category))}" loading="lazy"><figcaption>${clean(mediaSlotLabel(item.slot, item.category))}</figcaption></figure>`).join("")}</div></section></div>` });
  } catch (error) { toast(messageFor(error), "error"); }
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
      ${select("Vehicle", "vehicleId", state.data.vehicles.filter((v) => ["available", "reserved"].includes(v.status)).map((v) => [v.id, `${v.registrationPlate} · ${v.make} ${v.model}`, vehicleBrandMark(v.make, "vehicle-brand-mark is-select")]), true)}
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

function uploadField(label, name, category, required = false, slot = name, multiple = false, accept = "image/jpeg,image/png,image/webp") {
  const documentAllowed = accept.includes("application/pdf");
  return `<div class="upload-field"><label>${clean(tr(label))}${required ? " *" : ""}</label><label class="upload-drop">
    <input type="file" name="${clean(name)}" accept="${clean(accept)}" data-category="${clean(category)}" data-slot="${clean(slot)}" ${multiple ? "multiple" : ""} ${required ? "required" : ""}>
    <strong>${clean(tr(documentAllowed ? "Choose a photo or PDF" : "Choose or take a photo"))}</strong><span>${clean(tr(documentAllowed ? "Photo or PDF" : "Camera or gallery"))} · ${documentAllowed ? "JPG, PNG, WebP, PDF" : "JPG, PNG, WebP"}</span></label><div class="file-summary" aria-live="polite">${clean(tr(documentAllowed ? "No file selected" : "No photo selected"))}</div><div class="file-preview-grid" data-file-previews></div></div>`;
}

function signature(slot, label, required = true) {
  return `<div class="signature-wrap" data-signature-wrap><div class="signature-controls"><span>${clean(tr(label))}${required ? " *" : ""}</span><button type="button" data-clear-signature>${clean(tr("Clear"))}</button></div>
    <canvas class="signature-canvas" data-signature-slot="${clean(slot)}" data-required="${required}"></canvas></div>`;
}

function standardEvidence(prefix = "", category = "vehicle_exterior") {
  const names = [["front", "Front"], ["right", "Right side"], ["left", "Left side"], ["rear", "Rear"], ["interior", "Interior"]];
  return `<div class="evidence-grid">${names.map(([slot, label]) => uploadField(label, `${prefix}${slot}`, category, true, `${prefix}${slot}`)).join("")}</div>`;
}

function dashboardEvidence(prefix = "") {
  return `<div class="started-vehicle-note"><strong>${clean(tr("Vehicle must be started"))}</strong><span>${clean(tr("The dashboard must clearly show mileage and autonomy."))}</span></div>${uploadField("Dashboard photo — vehicle started", `${prefix}dashboard_started`, "vehicle_interior", true, `${prefix}dashboard_started`)}`;
}

function notesAndExtras(prefix = "extra") {
  return `<div class="field"><label>${clean(tr("Notes (optional)"))}</label><textarea name="description"></textarea></div>${uploadField("Extra photos (optional)", prefix, "other", false, prefix, true)}`;
}

function mediaSlotLabel(slot, category) {
  const standardLabels = {
    front: "Front",
    right: "Right side",
    left: "Left side",
    rear: "Rear",
    interior: "Interior",
  };
  if (slot === "dashboard_started") return tr("Dashboard photo — vehicle started");
  if (slot === "customer_signature") return tr("Customer signature");
  if (slot === "employee_signature") return tr("Employee signature");
  if (slot === "mechanic_signature") return tr("Mechanic signature");
  if (slot?.startsWith("problem_photo_")) return `${tr("Problem or dashboard warning")} ${slot.slice(14)}`;
  if (slot?.startsWith("own_vehicle_damage_")) return `${tr("Damage to our vehicle")} ${slot.slice(19)}`;
  if (slot?.startsWith("third_party_damage_")) return `${tr("Damage to the other party")} ${slot.slice(19)}`;
  if (slot === "accident_form") return tr("Signed European accident statement");
  if (slot === "amicable_agreement") return tr("Joint written amicable agreement");
  if (slot === "payment_proof") return tr("Payment proof");
  if (slot === "driver_identity_front") return tr("ID card — front");
  if (slot === "driver_identity_back") return tr("ID card — back");
  if (slot === "driver_licence_front") return tr("Driving licence — front");
  if (slot === "driver_licence_back") return tr("Driving licence — back");
  if (slot?.startsWith("before_")) return `${tr("Before washing")} — ${tr(standardLabels[slot.slice(7)] || slot.slice(7))}`;
  if (slot?.startsWith("after_")) return `${tr("After washing")} — ${tr(standardLabels[slot.slice(6)] || slot.slice(6))}`;
  if (slot === "outgoing_dashboard_started") return `${tr("YABI replacement vehicle")} — ${tr("Dashboard photo — vehicle started")}`;
  if (slot?.startsWith("outgoing_")) return `${tr("YABI replacement vehicle")} — ${tr(standardLabels[slot.slice(9)] || slot.slice(9))}`;
  if (slot === "defective_dashboard_started") return `${tr("Defective customer vehicle")} — ${tr("Dashboard photo — vehicle started")}`;
  if (slot?.startsWith("defective_")) return `${tr("Defective customer vehicle")} — ${tr(standardLabels[slot.slice(10)] || slot.slice(10))}`;
  if (slot?.startsWith("extra_")) return `${tr("Extra photo")} ${slot.slice(6)}`;
  if (slot?.startsWith("maintenance_photo_")) return `${tr("Optional photos")} ${slot.slice(18)}`;
  if (standardLabels[slot]) return tr(standardLabels[slot]);
  return tr(String(slot || category || "Evidence").replaceAll("_", " "));
}

function readonlyField(label, value, help = "", valueAttribute = "") {
  return `<div class="field readonly-field"><label>${clean(tr(label))}</label><div class="readonly-value" ${valueAttribute}>${clean(value || "—")}</div>${help ? `<small>${clean(tr(help))}</small>` : ""}</div>`;
}

function maintenanceSelectionLabel(count) {
  if (!count) return tr("Choose one or more");
  return `${count} ${tr(count === 1 ? "item selected" : "items selected")}`;
}

function maintenanceChecklist() {
  return `<div class="maintenance-accordion">${maintenanceCatalog.map((category, categoryIndex) => `
    <details class="maintenance-category">
      <summary>
        <span class="maintenance-category-number">${String(categoryIndex + 1).padStart(2, "0")}</span>
        <span class="maintenance-category-title">${clean(maintenanceLabel(category.title))}</span>
        <span class="maintenance-category-count" data-maintenance-count>${clean(maintenanceSelectionLabel(0))}</span>
        <span class="maintenance-category-chevron" aria-hidden="true"></span>
      </summary>
      <div class="maintenance-category-body"><div class="maintenance-check-grid">
        ${category.items.map(([code, label]) => `<label class="maintenance-check"><input type="checkbox" name="maintenanceItems" value="${clean(code)}"><span>${clean(maintenanceLabel(label))}</span></label>`).join("")}
      </div></div>
    </details>`).join("")}</div>`;
}

function workflowForm(type) {
  const dataMaps = maps();
  const vehicles = state.data.vehicles.map((v) => [v.id, `${v.registrationPlate} · ${v.make} ${v.model}`, vehicleBrandMark(v.make, "vehicle-brand-mark is-select")]);
  const rentals = state.data.rentals
    .filter((r) => !["closed", "cancelled"].includes(r.status))
    .map((r) => {
      const rentalVehicle = dataMaps.vehicles.get(r.vehicleId);
      return [r.id, `${r.reference} · ${rentalVehicle?.registrationPlate || "vehicle"}`, vehicleBrandMark(rentalVehicle?.make, "vehicle-brand-mark is-select")];
    });
  const vehicle = select("Vehicle", "vehicleId", vehicles, true);
  const rental = select("Rental (optional)", "rentalId", rentals);
  const mileage = field("Mileage (km)", "mileage", "", true, "number", 'min="0"');
  if (type === "problem_report") {
    return `<form class="portal-form">${vehicle}${readonlyField("Date and time", date(Date.now(), true), "Recorded automatically by the server.")}
      <div class="field"><label>${clean(tr("Describe the problem or damage"))} *</label><textarea name="description" required></textarea></div>
      <section class="form-section"><h3>${clean(tr("Photographic evidence"))}</h3>${uploadField("Problem or dashboard warning", "problem_photo", "damage", true, "problem_photo", true)}${uploadField("Extra photos (optional)", "extra", "damage", false, "extra", true)}</section></form>`;
  }
  if (type === "accident_report") {
    const localNow = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    return `<form class="portal-form">${vehicle}<div class="form-grid">${field("Accident date and time", "eventOccurredAt", localNow, true, "datetime-local")}${select("Liability", "accidentLiability", [["at_fault", "At fault"], ["not_at_fault", "Not at fault"]], true)}</div>
      <div class="field"><label>${clean(tr("Accident description"))} *</label><textarea name="description" required></textarea></div>
      <section class="form-section"><h3>${clean(tr("Accident evidence"))}</h3><div class="evidence-grid">${uploadField("Damage to our vehicle", "own_vehicle_damage", "accident", true, "own_vehicle_damage", true)}${uploadField("Damage to the other party", "third_party_damage", "accident", true, "third_party_damage", true)}${uploadField("Signed European accident statement", "accident_form", "accident", true, "accident_form")}</div>${uploadField("Extra accident photos (optional)", "extra", "accident", false, "extra", true)}</section>
      <section class="form-section" data-amicable-section hidden><h3>${clean(tr("Possible amicable settlement"))}</h3>${select("Will the accident be settled amicably?", "amicableSettlement", [["true", "Yes"], ["false", "No"]])}<div class="responsibility-warning"><strong>${clean(tr("Important responsibility"))}</strong><span>${clean(tr("If settled amicably, the customer or driver remains responsible for repairing the YABI vehicle."))}</span></div><div data-amicable-upload hidden>${uploadField("Joint written amicable agreement", "amicable_agreement", "accident", false, "amicable_agreement")}</div></section></form>`;
  }
  if (type === "payment_proof") {
    return `<form class="portal-form">${field("Invoice number or reference", "invoiceReference", "", true)}${readonlyField("Date and time", date(Date.now(), true), "Recorded automatically by the server.")}
      <section class="form-section"><h3>${clean(tr("Proof for accounting"))}</h3>${uploadField("Payment proof", "payment_proof", "payment", true, "payment_proof", false, "image/jpeg,image/png,image/webp,application/pdf")}</section></form>`;
  }
  if (type === "monthly_inspection") {
    return `<form class="portal-form">${vehicle}<div class="form-grid">${mileage}${readonlyField("Performed by", state.data.account.displayName, "Taken from the signed-in account.")}${readonlyField("Date and time", date(Date.now(), true), "Recorded automatically by the server.")}</div>
      <section class="form-section"><h3>${clean(tr("Required monthly photographs"))}</h3><div class="evidence-grid">${uploadField("Interior", "interior", "inspection", true, "interior")}${uploadField("Front", "front", "inspection", true, "front")}${uploadField("Right side", "right", "inspection", true, "right")}${uploadField("Left side", "left", "inspection", true, "left")}${uploadField("Rear", "rear", "inspection", true, "rear")}</div>
      <div class="started-vehicle-note"><strong>${clean(tr("Vehicle must be started"))}</strong><span>${clean(tr("The dashboard photo must clearly show the current mileage while the engine is running."))}</span></div>${uploadField("Dashboard photo — vehicle started", "dashboard_started", "inspection", true, "dashboard_started")}</section></form>`;
  }
  if (["check_in", "check_out"].includes(type)) {
    return `<form class="portal-form">${vehicle}${rentals.length ? rental : ""}<div class="form-grid">${field("Driver / guest full name", "personName", "", true)}${mileage}${field("Autonomy (km)", "autonomyKm", "", true, "number", 'min="0" max="5000"')}</div>
      <section class="form-section"><h3>${clean(tr("Dashboard"))}</h3>${dashboardEvidence()}</section>
      <section class="form-section"><h3>${clean(tr("Vehicle photos"))}</h3>${standardEvidence()}</section>
      ${signature("customer_signature", "Driver signature")}${notesAndExtras()}</form>`;
  }
  if (type === "wash") {
    return `<form class="portal-form">${vehicle}<div class="form-grid">${mileage}</div>
      <section class="form-section"><h3>${clean(tr("Before washing"))}</h3>${standardEvidence("before_", "before")}</section>
      <section class="form-section"><h3>${clean(tr("After washing"))}</h3>${standardEvidence("after_", "after")}</section>${notesAndExtras()}</form>`;
  }
  if (type === "breakdown_replacement") {
    return `<form class="portal-form">${vehicle}
      <section class="form-section"><h3>${clean(tr("YABI replacement vehicle"))}</h3><div class="form-grid">${mileage}${field("Autonomy (km)", "autonomyKm", "", true, "number", 'min="0" max="5000"')}</div>${dashboardEvidence("outgoing_")}${standardEvidence("outgoing_")}</section>
      <section class="form-section"><h3>${clean(tr("Key handover"))}</h3>${field("Customer full name", "customerName", "", true)}${signature("customer_signature", "Customer signature")}</section>
      <section class="form-section"><h3>${clean(tr("Defective customer vehicle"))}</h3><div class="form-grid">${field("Licence plate", "secondaryLicensePlate", "", true)}${field("Mileage (km)", "secondaryMileage", "", true, "number", 'min="0"')}${field("Autonomy (km)", "secondaryAutonomyKm", "", true, "number", 'min="0" max="5000"')}</div>${dashboardEvidence("defective_")}${standardEvidence("defective_")}</section>
      <section class="form-section"><h3>${clean(tr("What happened to the defective vehicle?"))}</h3>${select("Disposition", "disposition", [["self", "Moved by me"], ["towing", "Towing service"], ["mechanic", "Mechanic came"], ["other", "Other"]], true)}<div class="form-grid">${field("Destination address (required when moved by me)", "destinationAddress")}${field("Employee full name (required when moved by me)", "employeeName", state.data.account.displayName)}</div>${signature("employee_signature", "Employee signature — only required when moved by me", false)}</section>${notesAndExtras()}</form>`;
  }
  if (type === "vehicle_transfer") {
    return `<form class="portal-form">${vehicle}<div class="form-grid">${mileage}${field("Employee full name", "employeeName", state.data.account.displayName, true)}${field("Point A — origin address", "originAddress", "", true)}${field("Point B — destination address", "destinationAddress", "", true)}</div>
      <section class="form-section"><h3>${clean(tr("Dashboard"))}</h3>${dashboardEvidence()}</section><section class="form-section"><h3>${clean(tr("Vehicle photos"))}</h3>${standardEvidence()}</section>${signature("employee_signature", "Employee signature")}${notesAndExtras()}</form>`;
  }
  if (type === "maintenance") {
    return `<form class="portal-form maintenance-form">
      <section class="form-section"><h3>${clean(tr("Vehicle identification"))}</h3><div class="form-grid">${vehicle}${readonlyField("Registration plate", "—", "Select a fleet vehicle to show its plate.", "data-maintenance-plate")}${mileage}${readonlyField("Mechanic name", state.data.account.displayName, "Taken from the signed-in account.")}${readonlyField("Date and time", date(Date.now(), true), "Recorded automatically by the server.")}${select("Intervention type", "maintenanceInterventionType", [["regular_service", "Regular maintenance"], ["breakdown_repair", "Breakdown / repair"], ["technical_inspection", "Technical inspection"]], true)}</div></section>
      <section class="form-section maintenance-parts"><h3>${clean(tr("Parts and work performed"))}</h3><p>${clean(tr("Select every item completed during this intervention."))}</p>${maintenanceChecklist()}</section>
      <section class="form-section"><h3>${clean(tr("Final notes and closure"))}</h3><div class="field"><label>${clean(tr("Other part / details"))}</label><textarea name="maintenanceOtherDetails"></textarea><small>${clean(tr("Select at least one completed item or add details."))}</small></div><div class="form-grid">${select("Road test performed?", "roadTestPerformed", [["true", "Yes"], ["false", "No"]], true)}${select("Vehicle ready to return to service?", "readyForService", [["true", "Yes"], ["false", "No"]], true)}</div><div class="field"><label>${clean(tr("Mechanic notes (optional)"))}</label><textarea name="description"></textarea></div>${uploadField("Optional photos", "maintenance_photo", "maintenance", false, "maintenance_photo", true)}${signature("mechanic_signature", "Mechanic signature")}</section>
    </form>`;
  }
  if (["handover_take", "handover_return"].includes(type)) {
    return `<form class="portal-form">${vehicle}<div class="form-grid">${field("Person's full name", "personName", state.data.account.displayName, true)}${mileage}</div>
      ${uploadField("Vehicle condition photos", "handover", type === "handover_take" ? "before" : "after", true, "handover", true)}</form>`;
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
  if (!allowedWorkflows().includes(type)) {
    toast("This operation is not available for your role.", "error");
    return;
  }
  modal({
    kicker: `${tr("Procedure")} ${workflows[type][0]}`,
    title: workflows[type][1],
    submit: "Complete operation",
    content: workflowForm(type),
    handler: async (formData, form) => {
      const signatureCanvases = [...form.querySelectorAll(".signature-canvas")];
      const disposition = formData.get("disposition");
      const missingSignature = signatureCanvases.find((canvas) =>
        (canvas.dataset.required === "true" || (canvas.dataset.signatureSlot === "employee_signature" && disposition === "self")) &&
        canvas.dataset.signed !== "true",
      );
      if (missingSignature) throw new Error("media_required");
      if (type === "breakdown_replacement" && disposition === "self" && (!formData.get("destinationAddress") || !formData.get("employeeName"))) {
        throw new Error("validation_failed");
      }
      const maintenanceItems = type === "maintenance"
        ? formData.getAll("maintenanceItems").map(String)
        : [];
      if (
        type === "maintenance" &&
        maintenanceItems.length === 0 &&
        !String(formData.get("maintenanceOtherDetails") || "").trim()
      ) {
        throw new Error("maintenance_details_required");
      }
      const files = [];
      form.querySelectorAll('input[type="file"]').forEach((input) => {
        [...input.files].forEach((file, index) => files.push({
          file,
          category: input.dataset.category,
          slot: input.multiple ? `${input.dataset.slot}_${index + 1}` : input.dataset.slot,
          captureSource: "gallery",
          sortOrder: files.length,
        }));
      });
      if (files.length > 24) throw new Error("too_many_files");
      if (
        ["handover_take", "handover_return"].includes(type) &&
          form.querySelector('[name="handover"]').files.length < 2)
      {
        throw new Error("media_required");
      }
      for (const canvas of signatureCanvases.filter((item) => item.dataset.signed === "true")) {
        const blob = await canvasBlob(canvas);
        files.push({
          file: new File([blob], `${canvas.dataset.signatureSlot}.webp`, { type: "image/webp" }),
          category: "signature",
          slot: canvas.dataset.signatureSlot,
          captureSource: "signature",
          sortOrder: files.length,
        });
      }
      const progress = document.createElement("div");
      progress.className = "upload-progress visible";
      progress.innerHTML = `<div class="progress-track"><i></i></div><span>${clean(tr("Preparing evidence…"))}</span>`;
      form.querySelector(".form-submit-row").before(progress);
      const uploadGroupId = crypto.randomUUID();
      const mediaIds = await upload(files, uploadGroupId, (done, total) => {
        progress.querySelector("i").style.width = `${Math.round((done / Math.max(1, total)) * 100)}%`;
        progress.querySelector("span").textContent = total
          ? `${tr("Uploading evidence")} ${Math.ceil(done)} ${tr("of")} ${total}`
          : tr("Saving record…");
      });
      const values = {};
      for (const [key, value] of formData.entries()) {
        if (!(value instanceof File)) values[key] = value;
      }
      if (type === "maintenance") {
        values.maintenanceItems = maintenanceItems;
        values.maintenanceWork = maintenanceItems.join(", ") || values.maintenanceOtherDetails;
        values.roadTestPerformed = values.roadTestPerformed === "true";
        values.readyForService = values.readyForService === "true";
      }
      if (type === "accident_report") {
        values.eventOccurredAt = new Date(String(values.eventOccurredAt)).getTime();
        if (!Number.isFinite(values.eventOccurredAt)) throw new Error("validation_failed");
        if (values.accidentLiability === "at_fault") values.amicableSettlement = values.amicableSettlement === "true";
        else delete values.amicableSettlement;
      }
      ["mileage", "mileageAfter", "fuelPercent", "autonomyKm", "secondaryMileage", "secondaryAutonomyKm"].forEach((key) => {
        if (values[key]) values[key] = Number(values[key]);
        else delete values[key];
      });
      if (values.rentalId) {
        const selectedRental = state.data.rentals.find((r) => r.id === values.rentalId);
        values.vehicleId ||= selectedRental?.vehicleId;
        values.customerId = selectedRental?.customerId;
      }
      const result = await api("/api/portal/workflows", { method: "POST", body: { type, uploadGroupId, mediaIds, ...values } });
      closeModal();
      toast("Operation recorded.");
      await refresh();
      navigate("operations");
      await viewRecord(result.recordId);
    },
  });
  bindUploads();
  bindSignature();
  if (type === "maintenance") bindMaintenanceForm();
  if (type === "accident_report") bindAccidentForm();
}

function bindAccidentForm() {
  const liability = el.modalBody.querySelector('[name="accidentLiability"]');
  const amicable = el.modalBody.querySelector('[name="amicableSettlement"]');
  const section = el.modalBody.querySelector("[data-amicable-section]");
  const uploadWrap = el.modalBody.querySelector("[data-amicable-upload]");
  const uploadInput = uploadWrap.querySelector('input[type="file"]');
  const syncLiability = () => {
    const atFault = liability.value === "at_fault";
    section.hidden = !atFault;
    amicable.closest("[data-custom-select]").dataset.required = String(atFault);
    if (!atFault) setCustomValue(section, "amicableSettlement", "");
  };
  const syncAgreement = () => {
    const required = liability.value === "at_fault" && amicable.value === "true";
    uploadWrap.hidden = !required;
    uploadInput.required = required;
    if (!required) uploadInput.value = "";
  };
  liability.addEventListener("change", () => { syncLiability(); syncAgreement(); });
  amicable.addEventListener("change", syncAgreement);
  syncLiability();
  syncAgreement();
}

function bindMaintenanceForm() {
  const updateCounts = () => {
    el.modalBody.querySelectorAll(".maintenance-category").forEach((category) => {
      const count = category.querySelectorAll('input[name="maintenanceItems"]:checked').length;
      const counter = category.querySelector("[data-maintenance-count]");
      if (counter) counter.textContent = maintenanceSelectionLabel(count);
    });
  };
  el.modalBody.querySelectorAll('input[name="maintenanceItems"]').forEach((input) => input.addEventListener("change", updateCounts));
  updateCounts();
  const vehicleInput = el.modalBody.querySelector('[name="vehicleId"]');
  const plate = el.modalBody.querySelector("[data-maintenance-plate]");
  if (!vehicleInput || !plate) return;
  const updatePlate = () => {
    const vehicle = state.data.vehicles.find((item) => item.id === vehicleInput.value);
    plate.textContent = vehicle?.registrationPlate || "—";
  };
  vehicleInput.addEventListener("change", updatePlate);
  updatePlate();
}

function bindUploads() {
  el.modalBody.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", () => renderUploadPreviews(input));
  });
}

const uploadPreviewUrls = new WeakMap();

function releaseUploadPreviewUrls(input) {
  (uploadPreviewUrls.get(input) || []).forEach((url) => URL.revokeObjectURL(url));
  uploadPreviewUrls.delete(input);
}

function fileSizeLabel(size) {
  if (size < 1_000_000) return `${Math.max(1, Math.round(size / 1_000))} KB`;
  return `${(size / 1_000_000).toFixed(1)} MB`;
}

function removeUploadFile(input, removeIndex) {
  if (typeof DataTransfer !== "function") {
    input.value = "";
    renderUploadPreviews(input);
    return;
  }
  const transfer = new DataTransfer();
  [...input.files].forEach((file, index) => {
    if (index !== removeIndex) transfer.items.add(file);
  });
  input.files = transfer.files;
  renderUploadPreviews(input);
}

function renderUploadPreviews(input) {
  const field = input.closest(".upload-field");
  const previewGrid = field.querySelector("[data-file-previews]");
  const files = [...input.files];
  const documentAllowed = input.accept.includes("application/pdf");
  releaseUploadPreviewUrls(input);
  const urls = [];
  uploadPreviewUrls.set(input, urls);
  field.classList.toggle("has-files", files.length > 0);
  field.querySelector(".file-summary").textContent = files.length
    ? `${files.length} ${tr(documentAllowed ? (files.length === 1 ? "file selected" : "files selected") : (files.length === 1 ? "photo selected" : "photos selected"))}`
    : tr(documentAllowed ? "No file selected" : "No photos selected");
  previewGrid.innerHTML = files.map((file, index) => {
    const isImage = file.type.startsWith("image/");
    const previewUrl = isImage ? URL.createObjectURL(file) : "";
    if (previewUrl) urls.push(previewUrl);
    const visual = isImage
      ? `<img src="${clean(previewUrl)}" alt="${clean(file.name)}">`
      : `<div class="file-preview-document" aria-hidden="true">PDF</div>`;
    return `<article class="file-preview-card">${visual}<div class="file-preview-info"><strong title="${clean(file.name)}">${clean(file.name)}</strong><span>${clean(fileSizeLabel(file.size))} · ${clean(tr("Ready to upload"))}</span></div><button type="button" data-remove-upload="${index}" aria-label="${clean(`${tr("Remove")} ${file.name}`)}">${clean(tr("Remove"))}</button></article>`;
  }).join("");
  previewGrid.querySelectorAll("[data-remove-upload]").forEach((button) => {
    button.addEventListener("click", () => removeUploadFile(input, Number(button.dataset.removeUpload)));
  });
}

function bindSignature() {
  el.modalBody.querySelectorAll(".signature-canvas").forEach((canvas) => {
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
    canvas.closest("[data-signature-wrap]").querySelector("[data-clear-signature]").addEventListener("click", () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      delete canvas.dataset.signed;
    });
  });
}

async function optimise(file) {
  if (file.size > 20_000_000) throw new Error("upload_failed");
  if (file.type === "application/pdf") {
    if (file.size > 8_000_000) throw new Error("upload_failed");
    return file;
  }
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
      body: {
        uploadGroupId,
        fileName: file.name,
        contentType: file.type,
        size: file.size,
        category: files[index].category,
        slot: files[index].slot,
        captureSource: files[index].captureSource,
        sortOrder: files[index].sortOrder,
      },
    });
    const response = await fetch(prepared.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
    if (!response.ok) throw new Error("upload_failed");
    ids.push(prepared.mediaId);
    progress(index + 1, files.length);
  }
  return ids;
}

function recordDetailValue(value) {
  if (Array.isArray(value)) {
    return `<ul class="record-detail-list">${value.map((item) => `<li>${clean(item)}</li>`).join("")}</ul>`;
  }
  return `<div>${clean(value)}</div>`;
}

async function viewRecord(id) {
  try {
    const result = await api("/api/portal/record-media", { method: "POST", body: { recordId: id } });
    const record = state.data.workflows.find((item) => item.id === id);
    const interventionLabel = record.maintenanceInterventionType
      ? tr({
        regular_service: "Regular maintenance",
        breakdown_repair: "Breakdown / repair",
        technical_inspection: "Technical inspection",
      }[record.maintenanceInterventionType])
      : "";
    const details = [
      ["Server date and time", date(record.occurredAt, true)],
      ["Accident date and time", record.eventOccurredAt ? date(record.eventOccurredAt, true) : ""],
      ["Performed by", record.performedByName],
      ["Registration plate", record.licensePlate],
      ["Mileage", record.mileage != null ? `${record.mileage} km` : ""],
      ["Mileage after", record.mileageAfter != null ? `${record.mileageAfter} km` : ""],
      ["Fuel", record.fuelPercent != null ? `${record.fuelPercent}%` : ""],
      ["Autonomy", record.autonomyKm != null ? `${record.autonomyKm} km` : ""],
      ["Driver / guest", record.personName],
      ["Customer", record.customerName],
      ["Employee", record.employeeName],
      ["Defective vehicle plate", record.secondaryLicensePlate],
      ["Defective vehicle mileage", record.secondaryMileage != null ? `${record.secondaryMileage} km` : ""],
      ["Defective vehicle autonomy", record.secondaryAutonomyKm != null ? `${record.secondaryAutonomyKm} km` : ""],
      ["Point A / origin", record.originAddress],
      ["Point B / destination", record.destinationAddress],
      ["Disposition", record.disposition ? tr({ self: "Moved by me", towing: "Towing service", mechanic: "Mechanic came", other: "Other" }[record.disposition]) : ""],
      ["Liability", record.accidentLiability ? tr(record.accidentLiability === "at_fault" ? "At fault" : "Not at fault") : ""],
      ["Amicable settlement", record.amicableSettlement == null ? "" : tr(record.amicableSettlement ? "Yes" : "No")],
      ["Invoice number or reference", record.invoiceReference],
      ["Inspection month", record.inspectionMonth],
      ["Company notification", record.notificationEmailStatus ? tr(record.notificationEmailStatus) : ""],
      ["Mechanic name", record.mechanicName],
      ["Intervention type", interventionLabel],
      ["Parts / work completed", record.maintenanceItems?.length ? record.maintenanceItems.map((code) => maintenanceLabel(maintenanceItemsByCode.get(code)) || code) : ""],
      ["Other maintenance details", record.maintenanceOtherDetails],
      ["Road test", record.roadTestPerformed == null ? "" : tr(record.roadTestPerformed ? "Yes" : "No")],
      ["Ready for service", record.readyForService == null ? "" : tr(record.readyForService ? "Yes" : "No")],
      ["Maintenance", !record.maintenanceItems?.length ? record.maintenanceWork : ""],
      ["Changes", record.changesMade],
      [record.type === "maintenance" ? "Mechanic notes" : "Description", record.description],
      ["Resolution", record.resolution],
    ].filter(([, value]) => value);
    modal({
      kicker: record.reference,
      title: workflows[record.type]?.[1] || "Operation",
      content: `<div class="portal-form">${details.map(([label, value]) => `<div class="field"><label>${clean(tr(label))}</label>${recordDetailValue(value)}</div>`).join("")}
        ${result.items.length ? `<section class="accepted-evidence"><h3>${clean(tr("Accepted evidence"))}</h3><p>${clean(tr("These files were securely accepted with this record."))}</p><div class="media-gallery">${result.items.sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99)).map((item) => {
          const caption = mediaSlotLabel(item.slot, item.category);
          return `<figure>${item.contentType === "application/pdf" ? `<a class="document-link" href="${clean(item.url)}" target="_blank" rel="noopener"><strong>PDF</strong><span>${clean(tr("Open document"))}</span></a>` : `<img src="${clean(item.url)}" alt="${clean(caption)}" loading="lazy">`}<figcaption>${clean(caption)}</figcaption></figure>`;
        }).join("")}</div></section>` : `<p>${clean(tr("No media attached."))}</p>`}</div>`,
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
  const allowed = allowedViews();
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

document.querySelector("#profile-button").addEventListener("click", () => {
  navigate(allowedViews().includes("profile") ? "profile" : "overview");
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
  if (action === "edit-account") editAccount(id);
  if (action === "create-customer") createCustomer();
  if (action === "edit-customer") editCustomer(id);
  if (action === "create-driver") createDriver();
  if (action === "view-driver") viewDriver(id);
  if (action === "driver-access") createDriverAccess(id);
  if (action === "toggle-driver") toggleDriver(id, button.dataset.active === "true");
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
