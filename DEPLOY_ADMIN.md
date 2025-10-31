# 🚀 Guide de Déploiement - Admin Maison Fleurie

Guide rapide pour déployer l'application d'administration sur GitHub Pages.

## 📋 Prérequis

1. Configuration Google Cloud complétée (voir `admin/SETUP.md`)
2. Fichier `.env` configuré dans le dossier `admin/`
3. Emails autorisés ajoutés dans `admin/src/config.js`

## 🏗️ Étape 1 : Build l'application

```bash
cd admin
npm run build
```

Cela crée un dossier `dist/` avec l'application compilée.

## 📦 Étape 2 : Préparer le déploiement

### Option A : Déployer dans le dossier admin/dist (recommandé)

```bash
# Depuis la racine du projet menu-test
git add admin/dist -f  # -f car dist est normalement dans .gitignore
git commit -m "Deploy admin application"
git push origin claude/optimize-admin-web-app-011CUduv3DaXgGicBpbFpHae
```

### Option B : Copier dans un dossier séparé

```bash
# Depuis la racine du projet menu-test
mkdir -p admin-deployed
cp -r admin/dist/* admin-deployed/
git add admin-deployed/
git commit -m "Deploy admin application"
git push origin claude/optimize-admin-web-app-011CUduv3DaXgGicBpbFpHae
```

## ⚙️ Étape 3 : Configurer GitHub Pages

1. Allez sur votre repo GitHub
2. Cliquez sur **Settings**
3. Dans le menu à gauche, cliquez sur **Pages**
4. Sous "Source", sélectionnez **Deploy from a branch**
5. Sous "Branch" :
   - Sélectionnez votre branche : `claude/optimize-admin-web-app-011CUduv3DaXgGicBpbFpHae`
   - Sélectionnez le dossier : `/admin/dist` (ou `/admin-deployed`)
6. Cliquez sur **Save**

## ⏳ Étape 4 : Attendre le déploiement

GitHub Pages prend **2-5 minutes** pour déployer.

Vous pouvez suivre le déploiement dans l'onglet **Actions** de votre repo.

## 🌐 Étape 5 : Accéder à l'application

Une fois déployé, l'admin sera accessible sur :

```
https://YOUR-USERNAME.github.io/menu-test/admin/
```

Remplacez `YOUR-USERNAME` par votre nom d'utilisateur GitHub.

## ⚠️ Important : Mettre à jour OAuth

N'oubliez pas d'ajouter cette URL dans Google Cloud Console :

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. API et services → Identifiants
3. Cliquez sur votre OAuth 2.0 Client ID
4. Dans **"Origines JavaScript autorisées"**, ajoutez :
   ```
   https://YOUR-USERNAME.github.io
   ```
5. Dans **"URI de redirection autorisés"**, ajoutez :
   ```
   https://YOUR-USERNAME.github.io/menu-test/admin
   ```
6. Cliquez sur **Enregistrer**

## 🔄 Mises à jour futures

Pour mettre à jour l'admin :

```bash
cd admin
npm run build
git add dist/ -f
git commit -m "Update admin application"
git push
```

GitHub Pages redéploiera automatiquement.

## 📱 Installation sur mobile

Une fois déployé, partagez le lien avec vos gérants :

**Sur iPhone/iPad :**
1. Ouvrir Safari → URL de l'admin
2. Bouton Partager → "Sur l'écran d'accueil"

**Sur Android :**
1. Ouvrir Chrome → URL de l'admin
2. Menu (⋮) → "Ajouter à l'écran d'accueil"

## ✅ Vérification

Pour vérifier que tout fonctionne :

1. ✅ Ouvrez l'URL de l'admin
2. ✅ Vous devriez voir la page de connexion
3. ✅ Connectez-vous avec un email autorisé
4. ✅ Vous devriez voir le dashboard avec les produits

## 🐛 Dépannage

### L'admin n'est pas accessible
→ Attendez 5 minutes et videz le cache de votre navigateur (Ctrl+F5)

### Erreur 404
→ Vérifiez que le dossier sélectionné dans GitHub Pages est correct

### Erreur "Origin not allowed"
→ Ajoutez l'URL GitHub Pages dans les origines autorisées OAuth

### Les modifications ne s'affichent pas
→ Videz le cache (Ctrl+Shift+R) ou utilisez le mode incognito

---

## 🎉 C'est terminé !

Votre application d'administration est maintenant en ligne !

Partagez le lien avec vos gérants et ils pourront :
- Se connecter avec leur compte Google
- Gérer le menu en temps réel
- Installer l'app sur leur téléphone

**URL de l'admin** : `https://YOUR-USERNAME.github.io/menu-test/admin/`

Pour toute question, consultez `admin/SETUP.md` ou `admin/README.md`.
