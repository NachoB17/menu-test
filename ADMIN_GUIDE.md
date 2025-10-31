# 🏡 Admin Maison Fleurie - Guide Simple

## 🌐 Accéder à l'Admin

**URL :** https://nachob17.github.io/menu-test/admin-web/

---

## 🔐 Se Connecter

### **Erreur 403 : Access Denied ?**

Si vous voyez "Accès bloqué", vous devez ajouter votre email comme testeur :

1. Allez sur https://console.cloud.google.com/
2. Sélectionnez votre projet
3. Menu → **API et services** → **Écran de consentement OAuth**
4. Section **"Utilisateurs de test"**
5. Cliquez sur **"+ AJOUTER DES UTILISATEURS"**
6. Ajoutez : `adresse.speciale.17@gmail.com`
7. **Enregistrer**

✅ Maintenant vous pouvez vous connecter !

---

## 📱 Utiliser l'Admin

### **Ajouter un Produit**
1. Cliquez sur **"Nouveau produit"**
2. Sélectionnez l'onglet et la section
3. Remplissez nom, description, prix
4. Pour les vins : sélectionnez les tags
5. **Enregistrer**

### **Modifier un Produit**
1. Cliquez sur le produit
2. Modifiez les champs
3. **Enregistrer**

### **Supprimer un Produit**
1. Cliquez sur le bouton rouge **"Supprimer"**
2. Confirmez

### **Masquer un Produit**
1. Modifiez le produit
2. Changez **"Actif"** à **NON**
3. Le produit reste dans le Google Sheet mais n'apparaît plus sur le menu public

---

## 🔧 Configuration

**Email autorisé :** `adresse.speciale.17@gmail.com`

**Google Sheet ID :** `1lgd-rGS2kLCn0yPtGMc7RyMDue-YERmKOjNT3QKgJ3Y`

Pour ajouter d'autres gérants, modifiez `admin/src/config.js` ligne 23.

---

## 📂 Structure du Repo

```
menu-test/
├── admin/           → Code source React (pour développer)
├── admin-web/       → App compilée (déployée en ligne)
├── index.html       → Menu public
└── ADMIN_GUIDE.md   → Ce fichier
```

---

## 🐛 Problèmes Courants

### "Page blanche"
→ Videz le cache : **Ctrl + Shift + R**

### "Erreur 403"
→ Ajoutez votre email dans Google Cloud (voir ci-dessus)

### "Impossible de modifier"
→ Vérifiez vos droits "Éditeur" sur le Google Sheet

---

## 📞 Support

Pour modifier l'application, éditez le code dans `/admin/`, puis :

```bash
cd admin
npm run build
cp -r dist/* ../admin-web/
git add . && git commit -m "Update admin"
git push
```

---

**🎉 Bon travail avec l'admin !**
