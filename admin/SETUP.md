# 🚀 Guide de Configuration - Admin Maison Fleurie

Ce guide vous explique **pas à pas** comment configurer l'application d'administration.

## 📋 Prérequis

- Un compte Google
- Accès au Google Sheet du menu (ID: `1lgd-rGS2kLCn0yPtGMc7RyMDue-YERmKOjNT3QKgJ3Y`)
- Droits d'éditeur sur le Google Sheet

---

## 🔧 Étape 1 : Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Cliquez sur **"Sélectionner un projet"** en haut
3. Cliquez sur **"Nouveau projet"**
4. Donnez un nom : `Maison Fleurie Admin`
5. Cliquez sur **"Créer"**

---

## 📚 Étape 2 : Activer l'API Google Sheets

1. Dans la barre de recherche, tapez **"Google Sheets API"**
2. Cliquez sur **"Google Sheets API"**
3. Cliquez sur **"Activer"**
4. Attendez quelques secondes

---

## 🔐 Étape 3 : Créer un OAuth 2.0 Client ID

1. Dans le menu à gauche, cliquez sur **"API et services"** → **"Identifiants"**
2. Cliquez sur **"Créer des identifiants"** → **"ID client OAuth"**
3. Si demandé, configurez l'écran de consentement OAuth :
   - Type d'utilisateur : **Externe**
   - Nom de l'application : `Maison Fleurie Admin`
   - Email d'assistance utilisateur : votre email
   - Domaine autorisé : laissez vide pour l'instant
   - Cliquez sur **"Enregistrer et continuer"**
   - Portées : cliquez sur **"Ajouter ou supprimer des portées"**
     - Cochez : `../auth/spreadsheets` (Google Sheets API)
     - Cliquez sur **"Mettre à jour"**
   - Cliquez sur **"Enregistrer et continuer"**
   - Utilisateurs de test : ajoutez les emails de vos gérants
   - Cliquez sur **"Enregistrer et continuer"**

4. Retournez dans **"Identifiants"**
5. Cliquez sur **"Créer des identifiants"** → **"ID client OAuth"**
6. Type d'application : **"Application Web"**
7. Nom : `Admin Maison Fleurie Web`
8. **Origines JavaScript autorisées** : ajoutez
   - `http://localhost:5173` (pour développement local)
   - `https://YOUR-USERNAME.github.io` (remplacez YOUR-USERNAME par votre username GitHub)

9. **URI de redirection autorisés** : ajoutez
   - `http://localhost:5173`
   - `https://YOUR-USERNAME.github.io/menu-test/admin`

10. Cliquez sur **"Créer"**
11. **COPIEZ** l'ID client (format: `XXXXXX.apps.googleusercontent.com`)

---

## 🔑 Étape 4 : Créer une API Key

1. Dans **"Identifiants"**, cliquez sur **"Créer des identifiants"** → **"Clé API"**
2. Une clé API est créée
3. **COPIEZ** la clé (format: `AIzaSyXXXXXXXX`)
4. Cliquez sur **"Restreindre la clé"**
5. Dans "Restrictions de l'API" :
   - Sélectionnez **"Restreindre la clé"**
   - Cochez **"Google Sheets API"**
6. Dans "Restrictions relatives aux sites web" :
   - Sélectionnez **"Références HTTP (sites web)"**
   - Ajoutez :
     - `https://YOUR-USERNAME.github.io/menu-test/admin/*`
     - `http://localhost:5173/*`
7. Cliquez sur **"Enregistrer"**

---

## ⚙️ Étape 5 : Configurer l'application

### 5.1 Créer le fichier .env

Dans le dossier `/admin`, créez un fichier `.env` :

```bash
cp .env.example .env
```

Éditez `.env` et ajoutez vos valeurs :

```env
VITE_GOOGLE_CLIENT_ID=VOTRE_CLIENT_ID.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=VOTRE_API_KEY
```

### 5.2 Ajouter les emails autorisés

Ouvrez `src/config.js` et ajoutez les emails des gérants :

```javascript
AUTHORIZED_EMAILS: [
  'gerant1@example.com',
  'gerant2@example.com',
  'gerant3@example.com',
  // ... jusqu'à 10 emails
],
```

---

## 🧪 Étape 6 : Tester en local

```bash
cd admin
npm install
npm run dev
```

Ouvrez http://localhost:5173 dans votre navigateur.

Vous devriez voir la page de connexion. Testez avec un email autorisé.

---

## 🚀 Étape 7 : Déployer sur GitHub Pages

### 7.1 Build l'application

```bash
npm run build
```

Cela crée un dossier `dist/` avec l'application compilée.

### 7.2 Copier les fichiers build

```bash
# Depuis la racine du projet menu-test
mkdir -p admin-dist
cp -r admin/dist/* admin-dist/
```

### 7.3 Commit et push

```bash
git add .
git commit -m "Déploiement de l'application admin"
git push
```

### 7.4 Configurer GitHub Pages

1. Allez sur votre repo GitHub
2. **Settings** → **Pages**
3. Source : **Deploy from a branch**
4. Branch : Sélectionnez votre branche et `/admin-dist` comme dossier
5. Cliquez sur **Save**

Attendez quelques minutes, votre admin sera accessible sur :
`https://YOUR-USERNAME.github.io/menu-test/admin/`

---

## 📱 Étape 8 : Installer sur mobile (PWA)

### Sur iPhone/iPad :

1. Ouvrez Safari et allez sur l'URL de l'admin
2. Appuyez sur le bouton **Partager** (carré avec flèche vers le haut)
3. Faites défiler et appuyez sur **"Sur l'écran d'accueil"**
4. Nommez-la "MF Admin"
5. Appuyez sur **"Ajouter"**

### Sur Android :

1. Ouvrez Chrome et allez sur l'URL de l'admin
2. Appuyez sur le menu (trois points en haut à droite)
3. Appuyez sur **"Ajouter à l'écran d'accueil"**
4. Nommez-la "MF Admin"
5. Appuyez sur **"Ajouter"**

---

## 🔒 Sécurité

✅ **Ce qui est sécurisé :**
- Seuls les emails dans `AUTHORIZED_EMAILS` peuvent se connecter
- OAuth Google gère l'authentification
- API Key restreinte par domaine
- Permissions Google Sheets vérifiées

⚠️ **Important :**
- Ne commitez JAMAIS le fichier `.env` dans Git
- Gardez vos clés secrètes
- Révoquez les clés si elles sont compromises
- Limitez les emails autorisés au strict nécessaire

---

## 🐛 Dépannage

### Erreur "Configuration incomplète"
→ Vérifiez que `.env` existe et contient les bonnes valeurs

### Erreur "Accès refusé" après connexion
→ Ajoutez votre email dans `src/config.js` → `AUTHORIZED_EMAILS`

### Erreur "API not enabled"
→ Vérifiez que Google Sheets API est bien activée dans Google Cloud Console

### Erreur "Origin not allowed"
→ Ajoutez votre domaine dans les "Origines JavaScript autorisées" de l'OAuth Client

### Erreur lors de la sauvegarde
→ Vérifiez que vous avez les droits d'éditeur sur le Google Sheet

---

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
1. La console du navigateur (F12) pour les erreurs
2. Que toutes les étapes ont été suivies
3. Que les URLs sont correctes (pas de typo)

---

## ✨ C'est prêt !

Vous pouvez maintenant :
- ✅ Vous connecter avec Google
- ✅ Voir tous les produits du menu
- ✅ Ajouter/modifier/supprimer des produits
- ✅ Gérer les tags des vins
- ✅ Utiliser l'app sur mobile comme une app native

Bon travail ! 🎉
