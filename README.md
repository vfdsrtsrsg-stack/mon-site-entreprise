# TRENDUSA — Guide de mise en ligne

Ce site est un **fichier HTML unique** (`index.html`), sans backend ni installation.
Ça veut dire que tu peux le mettre en ligne gratuitement en quelques minutes.

## Option 1 — Netlify (la plus simple, glisser-déposer)
1. Va sur https://app.netlify.com/drop
2. Glisse le fichier `index.html` (ou le dossier qui le contient) dans la zone
3. Netlify te donne un lien du type `nom-au-hasard.netlify.app`
4. Dans "Site settings" tu peux renommer le sous-domaine ou brancher ton propre nom de domaine

## Option 2 — Vercel
1. Crée un compte sur https://vercel.com
2. "Add New Project" → "Upload" (ou connecte un repo GitHub contenant ce fichier)
3. Vercel déploie automatiquement, tu obtiens un lien `nom.vercel.app`

## Option 3 — GitHub Pages (gratuit, lié à GitHub)
1. Crée un repo GitHub, mets `index.html` à la racine
2. Dans les paramètres du repo → "Pages" → source = branche `main`, dossier `/root`
3. Ton site sera visible sur `https://ton-compte.github.io/nom-du-repo`

## Nom de domaine personnalisé
Une fois déployé sur Netlify ou Vercel, tu peux acheter un nom de domaine (Namecheap, OVH, Google Domains…) et le pointer vers ton site depuis les réglages "Domain" de la plateforme choisie. C'est expliqué pas à pas dans leur interface.

---

## ⚠️ Point important avant de vendre "pour de vrai"

Ce prototype stocke le panier et les commandes dans le **localStorage du navigateur** (`trendusa_cart`, `trendusa_orders`). Concrètement :

- Chaque visiteur a son panier **uniquement sur son propre appareil** — c'est normal et très bien pour un panier.
- Mais la page "Commandes" (admin) ne voit **que les commandes passées depuis ce même navigateur**. Si un client commande depuis son téléphone, toi tu ne verras rien sur ton ordinateur.
- Il n'y a **aucun paiement réel** : le bouton "Passer la commande" enregistre juste les infos localement, aucune carte bancaire n'est débitée.

Pour transformer ça en vraie boutique en ligne (commandes visibles par toi, paiement réel), il faudrait ajouter :
- Un vrai système de paiement (ex. Stripe Checkout)
- Une base de données ou un backend pour centraliser les commandes (ex. Supabase, Firebase, Airtable)
- Éventuellement une plateforme e-commerce toute faite (Shopify, WooCommerce) si tu veux aller plus vite

Dis-moi si tu veux que je t'aide à brancher un vrai paiement ou une vraie base de données — je peux le faire.

## Fichiers
- `index.html` — le site complet (design, boutique, panier, admin)
