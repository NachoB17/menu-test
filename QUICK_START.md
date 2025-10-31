# 🚀 Démarrage Rapide - Admin Maison Fleurie

## ✅ Configuration Actuelle

Votre application est configurée avec :
- ✅ **OAuth Client ID** : `63527306931-njs2urcb2bvgipb47kl60emjj5fmnchj.apps.googleusercontent.com`
- ✅ **API Key** : Configurée dans `.env`
- ✅ **Email autorisé** : `adresse.speciale.17@gmail.com`
- ✅ **Google Sheet ID** : `1lgd-rGS2kLCn0yPtGMc7RyMDue-YERmKOjNT3QKgJ3Y`

---

## 🧪 Tester en Local (sur votre PC)

### 1️⃣ Prérequis

Vérifiez que Node.js est installé :
```bash
node --version
# Doit afficher v18.x ou v20.x
```

Si pas installé : [Télécharger Node.js](https://nodejs.org)

### 2️⃣ Installer les dépendances

```bash
cd admin
npm install
```

⏱️ Patientez 1-2 minutes...

### 3️⃣ Lancer l'application

```bash
npm run dev
```

Vous verrez :
```
➜  Local:   http://localhost:5173/
```

### 4️⃣ Ouvrir dans le navigateur

Ouvrez **Google Chrome** et allez sur :
```
http://localhost:5173
```

---

## 🎯 Ce Que Vous Devriez Voir

### Écran de Connexion
- 🏡 Logo Maison Fleurie
- Bouton "Se connecter avec Google"

### Après Connexion
- 📊 Dashboard avec stats
- 🍸 Onglets : Cocktails, Vins, Bières...
- 📋 Liste de tous vos produits

---

## ⚠️ Si Vous Avez une Erreur "Origin not allowed"

Il faut ajouter `localhost` dans Google Cloud Console :

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. **API et services** → **Identifiants**
3. Cliquez sur votre OAuth Client ID
4. Dans **"Origines JavaScript autorisées"**, ajoutez :
   ```
   http://localhost:5173
   ```
5. **Enregistrer**

---

## 🛑 Arrêter le serveur

Dans le terminal :
```bash
Ctrl + C
```

---

## 🌐 Déployer en Ligne (Après Test Local)

Une fois que tout fonctionne en local :

### 1. Build l'application
```bash
cd admin
npm run build
```

### 2. Suivre le guide de déploiement
Consultez le fichier `DEPLOY_ADMIN.md` pour déployer sur GitHub Pages.

---

## 📞 Besoin d'Aide ?

### Erreur npm ?
→ Installez Node.js : https://nodejs.org

### Erreur de connexion Google ?
→ Vérifiez que `localhost:5173` est dans les origines OAuth

### Impossible de charger les produits ?
→ Vérifiez vos droits sur le Google Sheet

### Autre problème ?
→ Consultez `admin/SETUP.md` ou `ADMIN_APP_GUIDE.md`

---

## 📝 Commandes Utiles

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview

# Vérifier les erreurs
npm run lint
```

---

## 🎉 Prochaines Étapes

1. ✅ Configuration terminée
2. ⏳ Tester en local (vous êtes ici)
3. ⏳ Déployer en ligne
4. ⏳ Partager avec les gérants

---

**Lancez `npm run dev` et dites-moi ce que vous voyez ! 🚀**
