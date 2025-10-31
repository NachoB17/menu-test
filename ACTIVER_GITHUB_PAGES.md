# 🚀 ACTIVER L'APPLICATION ADMIN SUR GITHUB PAGES

## ✅ Ce Qui Est Fait

✅ Application compilée
✅ Fichiers copiés dans `/docs/admin/`
✅ Clés Google Cloud configurées
✅ Email autorisé : `adresse.speciale.17@gmail.com`
✅ Code poussé sur GitHub

---

## 📝 Étapes à Faire (DANS VOTRE NAVIGATEUR)

### 1️⃣ Merger la Pull Request

1. Allez sur https://github.com/NachoB17/menu-test

2. Vous verrez un bandeau jaune :
   ```
   claude/deploy-admin-to-github-pages-011CUduv3DaXgGicBpbFpHae had recent pushes
   [Compare & pull request]
   ```

3. **Cliquez** sur `Compare & pull request`

4. **Cliquez** sur `Create pull request`

5. **Cliquez** sur `Merge pull request`

6. **Cliquez** sur `Confirm merge`

---

### 2️⃣ Activer GitHub Pages

1. Sur votre repo GitHub, cliquez sur **Settings** (en haut à droite)

2. Dans le menu de gauche, cliquez sur **Pages**

3. Sous "Source" :
   - Sélectionnez **Deploy from a branch**

4. Sous "Branch" :
   - Branche : Sélectionnez **main** (ou la branche que vous venez de merger)
   - Dossier : Sélectionnez **/docs**
   - Cliquez sur **Save**

5. Attendez **2-5 minutes**

6. Rafraîchissez la page → Vous verrez :
   ```
   Your site is live at https://NachoB17.github.io/menu-test/
   ```

---

### 3️⃣ Ajouter l'URL dans Google Cloud Console

**IMPORTANT** pour que la connexion Google fonctionne !

1. Allez sur https://console.cloud.google.com/

2. **API et services** → **Identifiants**

3. Cliquez sur votre OAuth Client ID

4. Dans **"Origines JavaScript autorisées"**, ajoutez :
   ```
   https://NachoB17.github.io
   ```

5. Dans **"URI de redirection autorisés"**, ajoutez :
   ```
   https://NachoB17.github.io/menu-test/admin
   ```

6. **Enregistrer**

---

### 4️⃣ Restreindre l'API Key (SÉCURITÉ)

1. Toujours sur Google Cloud Console

2. **API et services** → **Identifiants**

3. Cliquez sur votre **API Key**

4. Dans "Restrictions relatives aux sites web" :
   - Sélectionnez **Références HTTP (sites web)**
   - Ajoutez :
     ```
     https://NachoB17.github.io/menu-test/admin/*
     ```

5. **Enregistrer**

---

## 🌐 Votre Application Sera Accessible Sur :

```
https://NachoB17.github.io/menu-test/admin/
```

**Remplacez `NachoB17` par votre vrai nom d'utilisateur GitHub !**

---

## ✅ Comment Tester

1. Ouvrez le lien dans votre navigateur

2. Vous devriez voir la page de connexion 🏡

3. Cliquez sur "Se connecter avec Google"

4. Connectez-vous avec `adresse.speciale.17@gmail.com`

5. Vous arrivez sur le **Dashboard** avec tous vos produits ! 🎉

---

## 📱 Installer sur Téléphone

### iPhone / iPad :
1. Ouvrez Safari → URL de l'admin
2. Bouton **Partager** → "Sur l'écran d'accueil"
3. Donnez un nom : "Maison Fleurie Admin"
4. **Ajouter**

### Android :
1. Ouvrez Chrome → URL de l'admin
2. Menu (⋮) → "Ajouter à l'écran d'accueil"
3. Donnez un nom : "Maison Fleurie Admin"
4. **Ajouter**

---

## 🔗 Partager avec les Gérants

Une fois que tout fonctionne, donnez ce lien à vos gérants :

```
https://NachoB17.github.io/menu-test/admin/
```

Ils pourront :
- Se connecter avec leur compte Google autorisé
- Gérer tous les produits du menu
- L'installer sur leur téléphone

---

## ⚠️ Si Ça Ne Marche Pas

### "Cette page ne peut pas être affichée"
→ Attendez 5 minutes, GitHub Pages prend du temps à déployer

### "Erreur de connexion Google"
→ Vérifiez que vous avez ajouté l'URL dans OAuth (étape 3)

### "Configuration incomplète"
→ Ne devrait plus arriver, les clés sont dans le code maintenant

---

## 🎉 C'Est Tout !

Une fois les 4 étapes terminées, votre application admin sera **EN LIGNE** et accessible par n'importe qui avec un email autorisé !

**Prochaine étape :** Mergez la PR et activez GitHub Pages (étapes 1 et 2)
