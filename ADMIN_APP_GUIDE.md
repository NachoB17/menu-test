# 🎉 Application Admin Maison Fleurie - Guide Complet

## ✅ Ce qui a été créé

J'ai développé une **application web d'administration complète** pour gérer votre menu Maison Fleurie. Voici ce qui est inclus :

### 📱 Application React Moderne

```
admin/
├── src/
│   ├── components/
│   │   ├── Login.jsx          ✅ Page de connexion Google OAuth
│   │   ├── Dashboard.jsx      ✅ Interface principale avec stats et navigation
│   │   ├── ProductList.jsx    ✅ Liste des produits avec recherche
│   │   └── ProductDetail.jsx  ✅ Formulaire d'édition avec tags vins
│   ├── services/
│   │   └── googleSheets.js    ✅ API Google Sheets (CRUD complet)
│   ├── config.js              ✅ Configuration centralisée
│   ├── App.jsx                ✅ App principale avec routing
│   └── index.css              ✅ Styles TailwindCSS
├── public/
│   └── manifest.json          ✅ PWA manifest (installable sur mobile)
├── .env.example               ✅ Template de configuration
├── SETUP.md                   ✅ Guide de configuration Google Cloud
├── README.md                  ✅ Documentation technique
└── package.json               ✅ Dépendances et scripts
```

### 🎨 Fonctionnalités Implémentées

#### 🔐 Sécurité
- ✅ Authentification Google OAuth 2.0
- ✅ Liste blanche d'emails (max 10 gérants pour commencer)
- ✅ Session temporaire (expire à la fermeture du navigateur)
- ✅ Confirmations avant suppressions
- ✅ API Key restreinte par domaine

#### 📊 Gestion des Produits
- ✅ **Créer** : Ajouter de nouveaux produits avec ID auto-incrémenté
- ✅ **Lire** : Afficher tous les produits du Google Sheet
- ✅ **Modifier** : Éditer n'importe quel champ d'un produit
- ✅ **Supprimer** : Supprimer des produits (avec confirmation)

#### 🍷 Module Spécial Vins
- ✅ Sélecteurs de tags visuels par catégorie :
  - **Couleur** : rouge, blanc, rosé
  - **Format** : verre, bouteille
  - **Moment** : apéro, plat, dégustation
  - **Style** : frais, rond, souple, puissant, nature, orange
  - **Accord** : poisson, viande_blanche, viande_rouge, végétarien

#### 🎯 Interface Utilisateur
- ✅ Navigation par onglets : Cocktails, Vins, Bières, Softs, Chaudes, À déguster
- ✅ Recherche en temps réel (nom, description, section)
- ✅ Statistiques : total produits, actifs, inactifs
- ✅ Groupement par sections
- ✅ Indicateurs visuels (actif/inactif, "en ce moment")
- ✅ Interface responsive (mobile, tablette, desktop)

#### 📱 PWA (Progressive Web App)
- ✅ Installable sur écran d'accueil iOS et Android
- ✅ Icône d'application personnalisée
- ✅ Fonctionne comme une app native
- ✅ Optimisée pour mobile (touch-friendly)

---

## 🚀 Prochaines Étapes

### Étape 1 : Configuration Google Cloud ⚠️ OBLIGATOIRE

Suivez le guide détaillé dans `admin/SETUP.md` :

1. **Créer un projet Google Cloud Console**
2. **Activer l'API Google Sheets**
3. **Créer un OAuth 2.0 Client ID**
4. **Créer une API Key**
5. **Créer le fichier `.env`** avec vos clés
6. **Ajouter les emails autorisés** dans `admin/src/config.js`

**⏱️ Temps estimé : 15-20 minutes**

### Étape 2 : Test en local

```bash
cd admin
npm install
npm run dev
```

Ouvrez http://localhost:5173 et testez la connexion.

### Étape 3 : Déploiement sur GitHub Pages

Suivez le guide `DEPLOY_ADMIN.md` pour déployer l'application en ligne.

**⏱️ Temps estimé : 10 minutes**

### Étape 4 : Partager avec les gérants

Une fois déployé, partagez le lien :
```
https://VOTRE-USERNAME.github.io/menu-test/admin/
```

Montrez-leur comment l'installer sur leur téléphone (voir SETUP.md).

---

## 🎯 Comment Utiliser l'Application

### Pour les Gérants

#### 1. Se Connecter
- Ouvrir le lien de l'admin
- Cliquer sur "Se connecter avec Google"
- Sélectionner votre compte Google autorisé

#### 2. Naviguer dans le Menu
- Cliquer sur les onglets en haut (Cocktails, Vins, etc.)
- Utiliser la barre de recherche pour trouver un produit

#### 3. Modifier un Produit
- Cliquer sur le produit ou sur "Modifier"
- Modifier les champs nécessaires
- Pour les vins : sélectionner les tags en cliquant sur les boutons colorés
- Cliquer sur "Enregistrer"
- ✅ Les modifications sont instantanées sur le menu public !

#### 4. Ajouter un Nouveau Produit
- Cliquer sur "Nouveau produit"
- Sélectionner l'onglet et la section
- Remplir le nom, la description, le prix
- Pour les vins : sélectionner les tags appropriés
- Cliquer sur "Ajouter"

#### 5. Supprimer un Produit
- Cliquer sur le bouton rouge "Supprimer"
- Confirmer la suppression
- ⚠️ Cette action est irréversible !

#### 6. Activer/Désactiver un Produit
- Modifier le produit
- Changer "Actif" de OUI à NON (ou inversement)
- OUI = visible sur le menu public
- NON = masqué (mais toujours dans le Google Sheet)

#### 7. Mettre un Produit "En ce moment"
- Modifier le produit
- Changer "En ce moment" à OUI
- Le produit sera mis en avant sur le menu

---

## 📋 Configuration des Emails Autorisés

Dans `admin/src/config.js`, ajoutez les emails de vos gérants :

```javascript
AUTHORIZED_EMAILS: [
  'gerant1@gmail.com',
  'gerant2@gmail.com',
  'gerant3@gmail.com',
  // Jusqu'à 10 emails
],
```

**Important :** Seuls ces emails pourront se connecter !

---

## 🔄 Migration Future vers Supabase

L'application est conçue pour être facilement migrée vers Supabase :

1. Créer une base Supabase
2. Importer les données du Google Sheet
3. Remplacer `googleSheets.js` par `supabase.js`
4. Modifier `config.js` pour pointer vers Supabase

**Temps estimé : 1-2 heures**

Tous les composants React restent identiques ! Seule la couche de données change.

---

## 🆘 Dépannage

### Erreur "Configuration incomplète"
**Solution :** Vérifiez que le fichier `.env` existe avec les bonnes valeurs.

### Erreur "Accès refusé" après connexion
**Solution :** Ajoutez votre email dans `AUTHORIZED_EMAILS` dans `config.js`.

### Impossible de modifier les produits
**Solution :** Vérifiez que vous avez les droits "Éditeur" sur le Google Sheet.

### L'application ne se charge pas
**Solution :** Videz le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R).

### Les modifications ne s'affichent pas
**Solution :** Rafraîchissez la page ou cliquez sur le bouton "Rafraîchir" ↻.

---

## 💡 Conseils d'Utilisation

### Pour Éviter les Conflits
- ✅ Une seule personne modifie un produit à la fois
- ✅ Rafraîchissez avant de faire des modifications
- ✅ Enregistrez rapidement après vos changements

### Pour les Vins
- ✅ Toujours remplir au moins 3 tags (couleur, moment, style)
- ✅ Les tags sont utilisés par l'arbre de recommandation du menu public
- ✅ Si vous changez les tags, l'arbre s'adapte automatiquement

### Pour la Sécurité
- ✅ Ne partagez jamais vos clés API ou OAuth
- ✅ Ne commitez jamais le fichier `.env` dans Git
- ✅ Révoquez les accès des anciens gérants
- ✅ Utilisez des mots de passe forts pour vos comptes Google

---

## 📊 Structure du Google Sheet

L'application lit et écrit dans ces colonnes :

| Colonne | Description | Exemple |
|---------|-------------|---------|
| ID | Identifiant unique | 1, 2, 3... |
| Onglet | Catégorie principale | vins, cocktails... |
| Section | Sous-catégorie | Verre rouge, Signatures... |
| Nom | Nom du produit | Spicy margarita |
| Description | Description | tequila infusé piment... |
| Prix | Prix | 12€ ou 5€ / 28€ |
| Actif | Visible sur le menu ? | OUI / NON |
| En ce moment | Mis en avant ? | OUI / NON |
| tag_couleur | Tag couleur (vins) | rouge, blanc, rosé |
| tag_moment | Tag moment (vins) | apero, plat, degustation |
| tag_style | Tag style (vins) | frais, rond, puissant... |
| tag_accord | Tag accord (vins) | poisson, viande_rouge... |

**⚠️ Ne supprimez jamais ces colonnes du Google Sheet !**

> ℹ️ Le format verre/bouteille est désormais déterminé via la colonne **Section** (ex. « Verre rouge », « Bouteille rouge »).

---

## ✨ Fonctionnalités Futures Possibles

Voici ce qui pourrait être ajouté plus tard :

- 📸 Upload d'images pour les produits
- 📈 Statistiques d'utilisation (produits les plus modifiés)
- 🔔 Notifications push pour les gérants
- 👥 Niveaux d'accès (admin, gérant, lecteur)
- 📝 Historique des modifications
- 🌙 Mode sombre
- 🌍 Multi-langues (FR/EN)
- 💾 Export CSV/PDF du menu

---

## 📞 Support

Pour toute question :

1. Consultez `admin/SETUP.md` pour la configuration
2. Consultez `admin/README.md` pour la documentation technique
3. Consultez `DEPLOY_ADMIN.md` pour le déploiement
4. Vérifiez la console du navigateur (F12) pour les erreurs

---

## 🎉 Récapitulatif

✅ **Application React complète** : 4 composants principaux
✅ **Interface moderne et intuitive** : Mobile-first, responsive
✅ **Sécurité OAuth** : Seuls les emails autorisés peuvent se connecter
✅ **Gestion CRUD** : Créer, lire, modifier, supprimer
✅ **Module vins avancé** : Sélecteurs de tags visuels
✅ **PWA** : Installable sur mobile
✅ **Documentation complète** : SETUP.md, README.md, DEPLOY.md
✅ **Prêt pour migration Supabase** : Architecture modulaire

---

## 🚀 Vous Êtes Prêt !

Suivez les étapes dans l'ordre :

1. **Configuration Google Cloud** (SETUP.md) → 20 min
2. **Test en local** → 5 min
3. **Déploiement** (DEPLOY_ADMIN.md) → 10 min
4. **Partage avec gérants** → 5 min

**Total : 40 minutes** pour avoir une app d'admin professionnelle en ligne ! 🎉

---

**Bon déploiement ! 🏡**
