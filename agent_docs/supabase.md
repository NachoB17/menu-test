# Supabase — menu-test

## Projet
ID : yctaoyxlfzmlzkwwjeti
Usage : stockage des données du menu (items, prix, descriptions, catégories)

## Tables principales
[ À compléter au premier /start — demander à Claude de lire le code
et documenter les tables utilisées ]

## Comment modifier les données menu
Les données ne sont PAS en dur dans le HTML.
Toute modification de contenu (prix, description, ajout item) = Supabase directement
ou via le code qui écrit dans Supabase.

## RLS
Lecture publique sur les tables menu.
Écriture via service role uniquement.

## Variables d'environnement
Les clés Supabase sont dans le code JS de index.html (clé publique anon = ok).
Ne jamais committer la service role key.
