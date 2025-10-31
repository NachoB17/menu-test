# 🏡 Maison Fleurie - Application d'Administration

Application web moderne pour gérer le menu de Maison Fleurie en temps réel.

## ✨ Fonctionnalités

- **Authentification sécurisée** : Connexion Google avec liste blanche d'emails
- **Gestion complète du menu** : CRUD (Créer, Lire, Mettre à jour, Supprimer)
- **Navigation par onglets** : Cocktails, Vins, Bières, Softs, Chaudes, À déguster
- **Recherche en temps réel** : Trouvez rapidement n'importe quel produit
- **Module spécial vins** : Sélecteurs de tags (couleur, format, moment, style, accord)
- **Interface mobile-first** : Optimisée pour téléphone et tablette
- **PWA** : Installable comme une app native (iOS & Android)
- **Synchronisation Google Sheets** : Modifications visibles instantanément
- **Confirmations de sécurité** : Protection contre les suppressions accidentelles

## 🛠️ Technologies

- **React 19** + **Vite** : Framework moderne et rapide
- **TailwindCSS** : Design system responsive
- **Google OAuth 2.0** : Authentification sécurisée
- **Google Sheets API v4** : Base de données en temps réel
- **Lucide React** : Icônes modernes

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier de configuration
cp .env.example .env

# Configurer (suivez SETUP.md)
```

## 🚀 Développement

```bash
# Lancer le serveur de dev
npm run dev

# L'app sera disponible sur http://localhost:5173
```

## 🏗️ Build

```bash
# Build pour production
npm run build

# Preview du build
npm run preview
```

## 📖 Configuration

Suivez le guide détaillé dans **[SETUP.md](./SETUP.md)** pour :

1. Créer un projet Google Cloud
2. Configurer OAuth et API Key
3. Ajouter les emails autorisés
4. Déployer sur GitHub Pages

## 🔐 Sécurité

- Liste blanche d'emails (max 10 pour commencer)
- OAuth Google pour l'authentification
- API Key restreinte par domaine
- Session temporaire (expire à la fermeture du navigateur)

## 📱 Utilisation Mobile

L'application est une **PWA** (Progressive Web App) :

- Installez-la sur l'écran d'accueil de votre téléphone
- Utilisez-la comme une app native
- Fonctionne en mode hors-ligne (lecture seule)

## 🎨 Palette de couleurs

- **Deep Sage** : `#1A2E25` (principal)
- **Sage Medium** : `#3D5A4C` (secondaire)
- **Cream** : `#FAF8F4` (fond)
- **Soft Gold** : `#C5B78F` (accents)
- **Bronze** : `#9B8B6C` (détails)

## 📂 Structure

```
admin/
├── src/
│   ├── components/      # Composants React
│   │   ├── Login.jsx           # Page de connexion
│   │   ├── Dashboard.jsx       # Interface principale
│   │   ├── ProductList.jsx     # Liste des produits
│   │   └── ProductDetail.jsx   # Formulaire d'édition
│   ├── services/        # Services API
│   │   └── googleSheets.js     # Google Sheets API
│   ├── config.js        # Configuration
│   ├── App.jsx          # App principale
│   └── main.jsx         # Point d'entrée
├── public/
│   └── manifest.json    # PWA manifest
├── .env.example         # Template de configuration
├── SETUP.md             # Guide de configuration
└── README.md            # Ce fichier
```

## 🤝 Contributeurs

Développé pour Maison Fleurie 🏡

## 📄 Licence

Usage privé - Maison Fleurie © 2025

---

**Pour toute question, consultez [SETUP.md](./SETUP.md) ou contactez l'administrateur.**
