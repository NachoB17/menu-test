// Configuration de l'application Admin Maison Fleurie

// ⚠️ IMPORTANT : Vous devrez créer ces clés dans Google Cloud Console
// Instructions détaillées fournies dans SETUP.md

export const CONFIG = {
  // ID Google Cloud OAuth Client (vous le créerez dans Google Cloud Console)
  // Format : "XXXXXX.apps.googleusercontent.com"
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',

  // ID de votre Google Sheet
  // Trouvez-le dans l'URL : https://docs.google.com/spreadsheets/d/[ID_ICI]/edit
  GOOGLE_SHEET_ID: '1lgd-rGS2kLCn0yPtGMc7RyMDue-YERmKOjNT3QKgJ3Y',

  // API Key Google (vous la créerez dans Google Cloud Console)
  GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY || '',

  // Nom de l'onglet (tab) dans le Google Sheet
  SHEET_TAB_NAME: 'Feuille 1',

  // Liste blanche des emails autorisés (max 10 pour commencer)
  AUTHORIZED_EMAILS: [
    // Ajoutez les emails de vos gérants ici
    // Exemple : 'gerant1@example.com',
    //           'gerant2@example.com',
  ],

  // Tags disponibles pour les vins
  WINE_TAGS: {
    couleur: ['rouge', 'blanc', 'rose'],
    format: ['verre', 'bouteille'],
    moment: ['apero', 'plat', 'degustation'],
    style: ['frais', 'rond', 'souple', 'puissant', 'nature', 'orange'],
    accord: ['poisson', 'viande_blanche', 'viande_rouge', 'vegetarien']
  },

  // Onglets du menu (sections principales)
  MENU_TABS: [
    { id: 'cocktails', label: '🍸 Cocktails', icon: 'Wine' },
    { id: 'vins', label: '🍷 Vins', icon: 'GlassWater' },
    { id: 'bieres', label: '🍺 Bières', icon: 'Beer' },
    { id: 'softs', label: '🥤 Softs', icon: 'Coffee' },
    { id: 'chaudes', label: '☕ Chaudes', icon: 'Coffee' },
    { id: 'deguster', label: '🍽️ À déguster', icon: 'UtensilsCrossed' },
  ]
};

// Validation de la configuration
export const validateConfig = () => {
  const errors = [];

  if (!CONFIG.GOOGLE_CLIENT_ID) {
    errors.push('GOOGLE_CLIENT_ID manquant - créez-le dans Google Cloud Console');
  }

  if (!CONFIG.GOOGLE_API_KEY) {
    errors.push('GOOGLE_API_KEY manquante - créez-la dans Google Cloud Console');
  }

  if (!CONFIG.GOOGLE_SHEET_ID) {
    errors.push('GOOGLE_SHEET_ID manquant - vérifiez config.js');
  }

  if (CONFIG.AUTHORIZED_EMAILS.length === 0) {
    errors.push('AUTHORIZED_EMAILS vide - ajoutez au moins un email autorisé');
  }

  return { valid: errors.length === 0, errors };
};
