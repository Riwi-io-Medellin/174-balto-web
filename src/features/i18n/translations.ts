export const languages = ["es", "en"] as const;

export type Language = (typeof languages)[number];

export type TranslationKey =
  | "common.downloadApk"
  | "common.language"
  | "common.spanish"
  | "common.english"
  | "common.retry"
  | "common.loading"
  | "common.records"
  | "marketing.navHome"
  | "marketing.metaDescription"
  | "marketing.badge"
  | "marketing.heroTitle"
  | "marketing.heroDescription"
  | "marketing.statLiveRouteTitle"
  | "marketing.statLiveRouteText"
  | "marketing.statKycTitle"
  | "marketing.statKycText"
  | "marketing.statPetCareTitle"
  | "marketing.statPetCareText"
  | "marketing.previewSafeWalk"
  | "marketing.previewVerifiedWalker"
  | "marketing.previewNow"
  | "marketing.previewWalking"
  | "marketing.previewLive"
  | "marketing.previewPark"
  | "marketing.previewTime"
  | "marketing.previewDistance"
  | "marketing.previewWalker"
  | "marketing.previewWalkerRating"
  | "marketing.altCatHome"
  | "marketing.altPuppies"
  | "marketing.altWalking"
  | "marketing.altCat"
  | "marketing.altVet"
  | "marketing.altHero"
  | "marketing.walkStatus"
  | "marketing.live"
  | "marketing.routeHome"
  | "marketing.routePark"
  | "marketing.routeBack"
  | "marketing.walkEyebrow"
  | "marketing.walkTitle"
  | "marketing.walkDescription"
  | "marketing.featureScheduleTitle"
  | "marketing.featureScheduleText"
  | "marketing.featureRouteTitle"
  | "marketing.featureRouteText"
  | "marketing.featureVerifiedTitle"
  | "marketing.featureVerifiedText"
  | "marketing.featureServicesTitle"
  | "marketing.featureServicesText"
  | "marketing.careEyebrow"
  | "marketing.careTitle"
  | "marketing.careDescription"
  | "marketing.carePetProfile"
  | "marketing.careReminders"
  | "marketing.careHistory"
  | "marketing.careCommunity"
  | "marketing.aiLabel"
  | "marketing.aiText"
  | "marketing.servicesEyebrow"
  | "marketing.servicesTitle"
  | "marketing.servicesDescription"
  | "marketing.servicesCardTitle"
  | "marketing.servicesCardText"
  | "marketing.clearProfilesTitle"
  | "marketing.clearProfilesText"
  | "marketing.usefulRemindersTitle"
  | "marketing.usefulRemindersText"
  | "marketing.trustFirstTitle"
  | "marketing.trustFirstText"
  | "marketing.allInOneTitle"
  | "marketing.allInOneText"
  | "marketing.apkTitle"
  | "marketing.apkDescription"
  | "marketing.apkFileName"
  | "marketing.apkInstall"
  | "auth.privateAccess"
  | "auth.backoffice"
  | "auth.description"
  | "auth.email"
  | "auth.password"
  | "auth.error"
  | "auth.adminRequired"
  | "auth.submitting"
  | "auth.submit"
  | "auth.protectedSession"
  | "dashboard.privateBackoffice"
  | "dashboard.adminSession"
  | "dashboard.logout"
  | "dashboard.loadErrorTitle"
  | "dashboard.genericRetry"
  | "dashboard.eyebrow"
  | "dashboard.title"
  | "dashboard.description"
  | "dashboard.usersTab"
  | "dashboard.verificationTab"
  | "dashboard.metricUsers"
  | "dashboard.metricNewMonth"
  | "dashboard.metricWithLocation"
  | "dashboard.metricWithPhoto"
  | "dashboard.usersTitle"
  | "dashboard.usersDescription"
  | "users.user"
  | "users.document"
  | "users.phone"
  | "users.location"
  | "users.registered"
  | "users.noLocation"
  | "verification.loadErrorTitle"
  | "verification.title"
  | "verification.description"
  | "verification.ruleLabel"
  | "verification.ruleText"
  | "verification.businesses"
  | "verification.pendingBusinesses"
  | "verification.walkers"
  | "verification.pendingWalkers"
  | "verification.businessesDescription"
  | "verification.walkersDescription"
  | "verification.noBusinesses"
  | "verification.noWalkers"
  | "verification.businessType"
  | "verification.noBusinessType"
  | "verification.location"
  | "verification.noLocation"
  | "verification.phone"
  | "verification.kycName"
  | "verification.document"
  | "verification.experience"
  | "verification.noExtracted"
  | "verification.noExperience"
  | "verification.noZone"
  | "verification.acceptsBookings"
  | "verification.noBookings"
  | "verification.currentStatus"
  | "verification.updatingStatus"
  | "verification.documents"
  | "verification.noDocuments"
  | "verification.pending"
  | "verification.approved"
  | "verification.rejected"
  | "verification.approve"
  | "verification.reject";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  es: {
    "common.downloadApk": "Descargar APK",
    "common.language": "Idioma",
    "common.spanish": "Español",
    "common.english": "Inglés",
    "common.retry": "Reintentar",
    "common.loading": "Cargando",
    "common.records": "registros",
    "marketing.navHome": "Ir al inicio de Balto",
    "marketing.metaDescription": "Landing publica de descarga para la app movil Balto.",
    "marketing.badge": "Cuidado para mascotas, claro y conectado",
    "marketing.heroTitle": "Paseos seguros y cuidado diario para quienes mas quieres.",
    "marketing.heroDescription":
      "Balto reune paseadores verificados, seguimiento en vivo, veterinarias cercanas y recordatorios utiles para que cada mascota este acompanada antes, durante y despues del paseo.",
    "marketing.statLiveRouteTitle": "Ruta en vivo",
    "marketing.statLiveRouteText": "sabes donde esta tu perro",
    "marketing.statKycTitle": "Walkers KYC",
    "marketing.statKycText": "perfiles revisados",
    "marketing.statPetCareTitle": "Pet care",
    "marketing.statPetCareText": "servicios cerca de casa",
    "marketing.previewSafeWalk": "Paseo seguro",
    "marketing.previewVerifiedWalker": "walker verificado",
    "marketing.previewNow": "Ahora",
    "marketing.previewWalking": "Bruno esta paseando",
    "marketing.previewLive": "En vivo",
    "marketing.previewPark": "Parque Laureles",
    "marketing.previewTime": "Tiempo",
    "marketing.previewDistance": "Distancia",
    "marketing.previewWalker": "Ana Garcia",
    "marketing.previewWalkerRating": "Paseadora verificada · 4.9 estrellas",
    "marketing.altCatHome": "Gato tranquilo en casa",
    "marketing.altPuppies": "Cachorros jugando",
    "marketing.altWalking": "Persona paseando con un perro",
    "marketing.altCat": "Gato en una casa tranquila",
    "marketing.altVet": "Veterinaria revisando a un perro",
    "marketing.altHero": "Persona cuidando una mascota",
    "marketing.walkStatus": "Paseo activo",
    "marketing.live": "Live",
    "marketing.routeHome": "Casa",
    "marketing.routePark": "Parque",
    "marketing.routeBack": "Regreso",
    "marketing.walkEyebrow": "Paseos con tranquilidad",
    "marketing.walkTitle": "Tu perro sale a caminar. Tu sigues todo desde Balto.",
    "marketing.walkDescription":
      "Agenda paseos, confirma quien lo acompana y revisa la ruta sin escribir mil mensajes. La app pone lo importante en primer plano: seguridad, tiempo, distancia y estado del recorrido.",
    "marketing.featureScheduleTitle": "Agenda paseos sin enredos",
    "marketing.featureScheduleText":
      "Elige un walker, revisa su perfil y coordina la rutina de tu mascota desde la app.",
    "marketing.featureRouteTitle": "Sigue la ruta en vivo",
    "marketing.featureRouteText":
      "Mira el recorrido, la duracion y el estado del paseo mientras sucede.",
    "marketing.featureVerifiedTitle": "Walkers verificados",
    "marketing.featureVerifiedText":
      "Perfiles revisados para que tu perro salga con alguien de confianza.",
    "marketing.featureServicesTitle": "Servicios cerca de ti",
    "marketing.featureServicesText":
      "Encuentra veterinarias y aliados pet care para completar el cuidado.",
    "marketing.careEyebrow": "Bienestar todos los dias",
    "marketing.careTitle": "No es solo sacar a pasear. Es cuidar una rutina.",
    "marketing.careDescription":
      "Balto ayuda a tener presente la informacion de cada mascota, recordar cuidados y mirar el historial para tomar mejores decisiones en casa.",
    "marketing.carePetProfile": "Perfil de mascota con informacion importante",
    "marketing.careReminders": "Recordatorios y senales de bienestar",
    "marketing.careHistory": "Historial de paseos y actividad",
    "marketing.careCommunity": "Comunidad para duenos, walkers y negocios",
    "marketing.aiLabel": "Balto IA",
    "marketing.aiText":
      "Bruno tuvo una ruta intensa. Hoy conviene una caminata mas suave y agua al llegar a casa.",
    "marketing.servicesEyebrow": "Servicios pet care",
    "marketing.servicesTitle": "Veterinarias y aliados para completar el cuidado.",
    "marketing.servicesDescription":
      "Cuando necesitas algo mas que un paseo, Balto te acerca a negocios y servicios para mascotas, con informacion clara para decidir mejor.",
    "marketing.servicesCardTitle": "Encuentra ayuda cerca",
    "marketing.servicesCardText":
      "Veterinarias, servicios y perfiles para cuidar mejor a tu mascota cuando lo necesite.",
    "marketing.clearProfilesTitle": "Perfiles claros",
    "marketing.clearProfilesText": "Mira servicios, informacion basica y disponibilidad.",
    "marketing.usefulRemindersTitle": "Recordatorios utiles",
    "marketing.usefulRemindersText": "Ten presente lo importante sin saturarte.",
    "marketing.trustFirstTitle": "Confianza primero",
    "marketing.trustFirstText":
      "La app prioriza perfiles revisados y experiencias seguras.",
    "marketing.allInOneTitle": "Todo en un lugar",
    "marketing.allInOneText": "Paseos, mascota, historial y servicios conectados.",
    "marketing.apkTitle": "Lleva Balto en el celular y empieza a cuidar mejor cada salida.",
    "marketing.apkDescription":
      "Descarga el APK para Android y prueba una experiencia pensada para duenos de mascotas, paseadores y servicios pet care.",
    "marketing.apkFileName": "balto.apk",
    "marketing.apkInstall": "Android · instalacion directa",
    "auth.privateAccess": "Acceso privado",
    "auth.backoffice": "Backoffice Balto",
    "auth.description": "Gestion administrativa de usuarios, verificaciones y servicios.",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.error": "No fue posible iniciar sesion con esas credenciales.",
    "auth.adminRequired": "Este acceso requiere una cuenta administradora.",
    "auth.submitting": "Ingresando...",
    "auth.submit": "Ingresar",
    "auth.protectedSession": "Sesion protegida mediante cookies httpOnly.",
    "dashboard.privateBackoffice": "Backoffice privado",
    "dashboard.adminSession": "Sesion administrativa",
    "dashboard.logout": "Salir",
    "dashboard.loadErrorTitle": "No fue posible cargar el dashboard",
    "dashboard.genericRetry": "Intenta nuevamente.",
    "dashboard.eyebrow": "Panel operativo",
    "dashboard.title": "Gestion de usuarios y actividad.",
    "dashboard.description":
      "El dashboard consume datos reales disponibles del backend y queda preparado para sumar metricas administrativas dedicadas.",
    "dashboard.usersTab": "Usuarios",
    "dashboard.verificationTab": "Verificaciones",
    "dashboard.metricUsers": "Usuarios",
    "dashboard.metricNewMonth": "Nuevos este mes",
    "dashboard.metricWithLocation": "Con ubicacion",
    "dashboard.metricWithPhoto": "Con foto",
    "dashboard.usersTitle": "Usuarios",
    "dashboard.usersDescription":
      "Gestion inicial basada en el endpoint existente de usuarios.",
    "users.user": "Usuario",
    "users.document": "Documento",
    "users.phone": "Telefono",
    "users.location": "Ubicacion",
    "users.registered": "Registro",
    "users.noLocation": "Sin registro",
    "verification.loadErrorTitle": "No fue posible cargar las verificaciones",
    "verification.title": "Revision manual de servicios",
    "verification.description":
      "Revisa el estado actual, abre los documentos cargados y decide si una veterinaria o walker queda aprobado o rechazado.",
    "verification.ruleLabel": "Regla operativa",
    "verification.ruleText": "Solo aprobado queda activo en la app",
    "verification.businesses": "Veterinarias",
    "verification.pendingBusinesses": "Veterinarias pendientes",
    "verification.walkers": "Walkers",
    "verification.pendingWalkers": "Walkers pendientes",
    "verification.businessesDescription": "Documentos legales y datos de contacto del negocio.",
    "verification.walkersDescription": "Cedula, resultado KYC y documentos para revision manual.",
    "verification.noBusinesses": "No hay veterinarias registradas.",
    "verification.noWalkers": "No hay walkers registrados.",
    "verification.businessType": "Tipo",
    "verification.noBusinessType": "Sin tipo",
    "verification.location": "Ubicacion",
    "verification.noLocation": "Sin ubicacion",
    "verification.phone": "Telefono",
    "verification.kycName": "Nombre KYC",
    "verification.document": "Documento",
    "verification.experience": "Experiencia",
    "verification.noExtracted": "No extraido",
    "verification.noExperience": "Sin registro",
    "verification.noZone": "Sin zona",
    "verification.acceptsBookings": "Acepta reservas",
    "verification.noBookings": "No acepta reservas",
    "verification.currentStatus": "Estado actual",
    "verification.updatingStatus": "Actualizando estado...",
    "verification.documents": "Documentos",
    "verification.noDocuments": "Sin documentos",
    "verification.pending": "Pendiente",
    "verification.approved": "Aprobado",
    "verification.rejected": "Rechazado",
    "verification.approve": "Aprobar",
    "verification.reject": "Rechazar",
  },
  en: {
    "common.downloadApk": "Download APK",
    "common.language": "Language",
    "common.spanish": "Spanish",
    "common.english": "English",
    "common.retry": "Retry",
    "common.loading": "Loading",
    "common.records": "records",
    "marketing.navHome": "Go to Balto home",
    "marketing.metaDescription": "Public download landing page for the Balto mobile app.",
    "marketing.badge": "Clear, connected care for pets",
    "marketing.heroTitle": "Safe walks and daily care for the pets you love most.",
    "marketing.heroDescription":
      "Balto brings together verified walkers, live tracking, nearby vets, and useful reminders so every pet is supported before, during, and after each walk.",
    "marketing.statLiveRouteTitle": "Live route",
    "marketing.statLiveRouteText": "know where your dog is",
    "marketing.statKycTitle": "KYC walkers",
    "marketing.statKycText": "reviewed profiles",
    "marketing.statPetCareTitle": "Pet care",
    "marketing.statPetCareText": "services near home",
    "marketing.previewSafeWalk": "Safe walk",
    "marketing.previewVerifiedWalker": "verified walker",
    "marketing.previewNow": "Now",
    "marketing.previewWalking": "Bruno is walking",
    "marketing.previewLive": "Live",
    "marketing.previewPark": "Laureles Park",
    "marketing.previewTime": "Time",
    "marketing.previewDistance": "Distance",
    "marketing.previewWalker": "Ana Garcia",
    "marketing.previewWalkerRating": "Verified walker · 4.9 stars",
    "marketing.altCatHome": "Calm cat at home",
    "marketing.altPuppies": "Puppies playing",
    "marketing.altWalking": "Person walking a dog",
    "marketing.altCat": "Cat in a calm home",
    "marketing.altVet": "Veterinarian checking a dog",
    "marketing.altHero": "Person caring for a pet",
    "marketing.walkStatus": "Active walk",
    "marketing.live": "Live",
    "marketing.routeHome": "Home",
    "marketing.routePark": "Park",
    "marketing.routeBack": "Return",
    "marketing.walkEyebrow": "Peace-of-mind walks",
    "marketing.walkTitle": "Your dog goes out for a walk. You follow everything from Balto.",
    "marketing.walkDescription":
      "Schedule walks, confirm who is walking your pet, and review the route without sending endless messages. The app brings what matters forward: safety, time, distance, and trip status.",
    "marketing.featureScheduleTitle": "Schedule walks without friction",
    "marketing.featureScheduleText":
      "Choose a walker, review their profile, and coordinate your pet's routine from the app.",
    "marketing.featureRouteTitle": "Follow the live route",
    "marketing.featureRouteText":
      "See the route, duration, and walk status while it happens.",
    "marketing.featureVerifiedTitle": "Verified walkers",
    "marketing.featureVerifiedText":
      "Reviewed profiles so your dog goes out with someone you can trust.",
    "marketing.featureServicesTitle": "Services near you",
    "marketing.featureServicesText":
      "Find vets and pet care partners to complete your pet's care.",
    "marketing.careEyebrow": "Everyday wellbeing",
    "marketing.careTitle": "It is not just a walk. It is caring for a routine.",
    "marketing.careDescription":
      "Balto helps you keep each pet's important information close, remember care tasks, and review history to make better decisions at home.",
    "marketing.carePetProfile": "Pet profile with important information",
    "marketing.careReminders": "Wellbeing reminders and signals",
    "marketing.careHistory": "Walk and activity history",
    "marketing.careCommunity": "Community for owners, walkers, and businesses",
    "marketing.aiLabel": "Balto AI",
    "marketing.aiText":
      "Bruno had an intense route. Today a softer walk and water when he gets home would be best.",
    "marketing.servicesEyebrow": "Pet care services",
    "marketing.servicesTitle": "Vets and partners to complete care.",
    "marketing.servicesDescription":
      "When you need more than a walk, Balto connects you with pet businesses and services, with clear information to help you decide.",
    "marketing.servicesCardTitle": "Find nearby help",
    "marketing.servicesCardText":
      "Vets, services, and profiles to better care for your pet when needed.",
    "marketing.clearProfilesTitle": "Clear profiles",
    "marketing.clearProfilesText": "View services, basic information, and availability.",
    "marketing.usefulRemindersTitle": "Useful reminders",
    "marketing.usefulRemindersText": "Keep what matters in mind without overload.",
    "marketing.trustFirstTitle": "Trust first",
    "marketing.trustFirstText": "The app prioritizes reviewed profiles and safe experiences.",
    "marketing.allInOneTitle": "Everything in one place",
    "marketing.allInOneText": "Walks, pets, history, and services connected.",
    "marketing.apkTitle": "Take Balto on your phone and start caring better for every outing.",
    "marketing.apkDescription":
      "Download the Android APK and try an experience designed for pet owners, walkers, and pet care services.",
    "marketing.apkFileName": "balto.apk",
    "marketing.apkInstall": "Android · direct install",
    "auth.privateAccess": "Private access",
    "auth.backoffice": "Balto backoffice",
    "auth.description": "Administrative management for users, verifications, and services.",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.error": "We could not sign you in with those credentials.",
    "auth.adminRequired": "This area requires an administrator account.",
    "auth.submitting": "Signing in...",
    "auth.submit": "Sign in",
    "auth.protectedSession": "Session protected with httpOnly cookies.",
    "dashboard.privateBackoffice": "Private backoffice",
    "dashboard.adminSession": "Administrative session",
    "dashboard.logout": "Log out",
    "dashboard.loadErrorTitle": "The dashboard could not be loaded",
    "dashboard.genericRetry": "Please try again.",
    "dashboard.eyebrow": "Operations panel",
    "dashboard.title": "User and activity management.",
    "dashboard.description":
      "The dashboard consumes real data available from the backend and is ready for dedicated administrative metrics.",
    "dashboard.usersTab": "Users",
    "dashboard.verificationTab": "Verifications",
    "dashboard.metricUsers": "Users",
    "dashboard.metricNewMonth": "New this month",
    "dashboard.metricWithLocation": "With location",
    "dashboard.metricWithPhoto": "With photo",
    "dashboard.usersTitle": "Users",
    "dashboard.usersDescription": "Initial management based on the existing users endpoint.",
    "users.user": "User",
    "users.document": "Document",
    "users.phone": "Phone",
    "users.location": "Location",
    "users.registered": "Registered",
    "users.noLocation": "Not registered",
    "verification.loadErrorTitle": "The verifications could not be loaded",
    "verification.title": "Manual service review",
    "verification.description":
      "Review the current status, open uploaded documents, and decide whether a veterinary business or walker is approved or rejected.",
    "verification.ruleLabel": "Operational rule",
    "verification.ruleText": "Only approved profiles become active in the app",
    "verification.businesses": "Veterinary businesses",
    "verification.pendingBusinesses": "Pending veterinary businesses",
    "verification.walkers": "Walkers",
    "verification.pendingWalkers": "Pending walkers",
    "verification.businessesDescription": "Legal documents and business contact details.",
    "verification.walkersDescription": "ID, KYC result, and documents for manual review.",
    "verification.noBusinesses": "No veterinary businesses registered.",
    "verification.noWalkers": "No walkers registered.",
    "verification.businessType": "Type",
    "verification.noBusinessType": "No type",
    "verification.location": "Location",
    "verification.noLocation": "No location",
    "verification.phone": "Phone",
    "verification.kycName": "KYC name",
    "verification.document": "Document",
    "verification.experience": "Experience",
    "verification.noExtracted": "Not extracted",
    "verification.noExperience": "Not registered",
    "verification.noZone": "No area",
    "verification.acceptsBookings": "Accepts bookings",
    "verification.noBookings": "Does not accept bookings",
    "verification.currentStatus": "Current status",
    "verification.updatingStatus": "Updating status...",
    "verification.documents": "Documents",
    "verification.noDocuments": "No documents",
    "verification.pending": "Pending",
    "verification.approved": "Approved",
    "verification.rejected": "Rejected",
    "verification.approve": "Approve",
    "verification.reject": "Reject",
  },
};
