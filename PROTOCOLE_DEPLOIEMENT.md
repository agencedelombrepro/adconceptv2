# Protocole de déploiement — AD Concept
**Version 1.0 — Mars 2026**
Stack : React + Vite · Hébergement : Cloudflare Pages · Domaine : adconceptdesign.fr

---

## Sommaire
1. [Avant de déployer — Checklist SEO](#1-avant-de-déployer--checklist-seo)
2. [Déployer sur Cloudflare Pages via GitHub](#2-déployer-sur-cloudflare-pages-via-github)
3. [Brancher un domaine sur Cloudflare Pages](#3-brancher-un-domaine-sur-cloudflare-pages)
4. [Vérifications post-déploiement](#4-vérifications-post-déploiement)
5. [Soumettre le sitemap à Google](#5-soumettre-le-sitemap-à-google)
6. [Résolution des problèmes courants](#6-résolution-des-problèmes-courants)

---

## 1. Avant de déployer — Checklist SEO

Avant chaque mise en production, vérifier que ces 3 fichiers existent dans le dossier `public/`.

### 1.1 — `public/sitemap.xml`

Ce fichier liste toutes les URLs du site pour que Google puisse les indexer.
À mettre à jour à chaque fois qu'une nouvelle page est ajoutée.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.adconceptdesign.fr/</loc>
    <lastmod>2026-03-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... toutes les autres pages ... -->
</urlset>
```

**Règles :**
- Toujours utiliser `https://www.adconceptdesign.fr` (avec www)
- Mettre à jour la date `<lastmod>` à chaque modification significative
- Ne pas inclure les pages légales (mentions légales, cookies, confidentialité)
- Priorité : 1.0 = accueil · 0.9 = pages principales · 0.8 = pages villes · 0.6 = articles blog

---

### 1.2 — `public/robots.txt`

Ce fichier indique aux moteurs de recherche ce qu'ils peuvent ou ne peuvent pas indexer.

```
User-agent: *
Allow: /
Disallow: /mentions-legales
Disallow: /politique-confidentialite
Disallow: /politique-cookies

Sitemap: https://www.adconceptdesign.fr/sitemap.xml
```

**Ne jamais modifier** la ligne `Sitemap:` sans changer le domaine dans `sitemap.xml` aussi.

---

### 1.3 — `public/_redirects` ⚠️ CRITIQUE

Ce fichier est spécifique à Cloudflare Pages. Il gère les redirections du site React (SPA).

```
/sitemap.xml /sitemap.xml 200
/robots.txt /robots.txt 200
/* /index.html 200
```

**Pourquoi c'est critique :**
Sans les deux premières lignes, Cloudflare sert `index.html` (la page React) pour TOUTES les URLs — y compris `/sitemap.xml`. Google reçoit alors du HTML au lieu du XML → erreur dans Search Console → pages non indexées.

**Règle absolue :** Les exceptions pour les fichiers statiques doivent TOUJOURS être placées AVANT la ligne `/* /index.html 200`.

---

## 2. Déployer sur Cloudflare Pages via GitHub

Le déploiement est automatique : chaque `git push` sur la branche `main` déclenche un nouveau build.

### Étapes

```bash
# 1. Dans le terminal, depuis le dossier du projet
cd /chemin/vers/ad-concept-deploy

# 2. Vérifier les fichiers modifiés
git status

# 3. Builder le projet (génère le dossier dist/)
npm run build

# 4. Ajouter les fichiers au commit
git add dist/ public/

# 5. Créer le commit
git commit -m "description des modifications"

# 6. Pousser sur GitHub → déclenche le déploiement automatique
git push origin main
```

### Vérifier que le déploiement a réussi

1. Aller sur [dash.cloudflare.com](https://dash.cloudflare.com)
2. Cliquer sur **Pages** → sélectionner le projet AD Concept
3. Onglet **Deployments**
4. Le dernier déploiement doit afficher le statut **"Success"** ✅
5. Si le statut est **"Failed"** → cliquer dessus pour voir l'erreur dans les logs

---

## 3. Brancher un domaine sur Cloudflare Pages

⚠️ Cette étape est à faire UNE SEULE FOIS lors de la mise en ligne initiale, ou à chaque changement de domaine.

### Règle fondamentale

Il faut TOUJOURS ajouter les DEUX versions du domaine :
- `www.adconceptdesign.fr` (avec www)
- `adconceptdesign.fr` (sans www — l'apex domain)

Sans l'apex domain, les visiteurs qui tapent `adconceptdesign.fr` sans www arrivent sur la page de l'ancien hébergeur.

### Étapes détaillées

**Dans Cloudflare Pages :**

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → ton projet
2. Onglet **Custom domains** → **Set up a custom domain**
3. Entrer `www.adconceptdesign.fr` → **Continue** → **Activate domain**
4. Répéter : **Set up a custom domain** → entrer `adconceptdesign.fr` → **Continue** → **Activate domain**
5. Cloudflare configure automatiquement les enregistrements DNS
6. Attendre que les deux domaines passent au statut **"Active"** (quelques minutes à 1h)

**Vérification DNS dans Cloudflare :**

1. [dash.cloudflare.com](https://dash.cloudflare.com) → sélectionner le domaine → **DNS** → **Records**
2. Vérifier la présence de :
   - Un enregistrement `CNAME` pour `www` → pointant vers Cloudflare Pages
   - Un enregistrement `CNAME` ou `A` pour `@` (apex) → pointant vers Cloudflare Pages
3. Les deux enregistrements doivent avoir le nuage orange 🟠 (proxied = activé)

---

## 4. Vérifications post-déploiement

Après chaque déploiement, effectuer ces tests dans cet ordre :

### Test 1 — Navigation privée (obligatoire)

Ouvrir une fenêtre de navigation privée (⌘ + Maj + N sur Mac) pour tester sans cache.

| URL à tester | Résultat attendu |
|---|---|
| `https://adconceptdesign.fr` | Page d'accueil AD Concept |
| `https://www.adconceptdesign.fr` | Page d'accueil AD Concept |
| `https://www.adconceptdesign.fr/sitemap.xml` | Fichier XML lisible |
| `https://www.adconceptdesign.fr/robots.txt` | Fichier texte lisible |
| `https://www.adconceptdesign.fr/realisations` | Page réalisations (pas d'erreur 404) |

### Test 2 — Vérifier la redirection www

`adconceptdesign.fr` doit rediriger automatiquement vers `www.adconceptdesign.fr` (ou les deux doivent afficher le site). Si l'un des deux affiche une page OVH → retourner à l'étape 3.

### Test 3 — Vitesse de chargement (optionnel mais recommandé)

Tester sur [PageSpeed Insights](https://pagespeed.web.dev/) avec l'URL `https://www.adconceptdesign.fr`

---

## 5. Soumettre le sitemap à Google

À faire lors de la mise en ligne initiale, et à chaque fois que des pages importantes sont ajoutées.

### Première soumission

1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Sélectionner la propriété `adconceptdesign.fr`
3. Menu gauche → **Indexation** → **Sitemaps**
4. Dans le champ "Ajouter un sitemap" : entrer `sitemap.xml`
5. Cliquer **Envoyer**
6. Le statut doit passer à **"Réussite"** (parfois quelques minutes)

### Soumettre à nouveau après modifications

1. Search Console → **Sitemaps**
2. Cliquer sur le sitemap existant → **Renvoyer**

### Délais d'indexation Google

- Google lit le sitemap : quelques heures à 48h
- Les pages apparaissent dans les résultats : 1 à 4 semaines
- Ne pas renvoyer le sitemap plusieurs fois par jour — une fois suffit

---

## 6. Résolution des problèmes courants

### ❌ "Impossible de lire le sitemap" — Erreur HTTP 525

**Cause :** Problème SSL entre Cloudflare et le serveur d'origine.
**Solution :** Cloudflare → **SSL/TLS** → Mode de chiffrement → passer en **"Flexible"**

---

### ❌ "Le sitemap est un fichier HTML"

**Cause :** Le fichier `_redirects` n'a pas les exceptions pour les fichiers statiques.
**Solution :** Vérifier que `public/_redirects` contient bien :
```
/sitemap.xml /sitemap.xml 200
/robots.txt /robots.txt 200
/* /index.html 200
```
Puis rebuilder (`npm run build`) et repusher sur GitHub.

---

### ❌ La page d'accueil affiche "Site en construction OVH"

**Cause :** L'apex domain (`adconceptdesign.fr` sans www) n'est pas configuré dans Cloudflare Pages.
**Solution :** Cloudflare Pages → Custom Domains → ajouter `adconceptdesign.fr`

---

### ❌ Les routes React affichent une erreur 404 en accès direct

**Cause :** Le `_redirects` est absent ou mal configuré.
**Solution :** Vérifier la présence de `/* /index.html 200` dans `public/_redirects`

---

### ❌ Le déploiement échoue (Failed)

**Solution :**
1. Cloudflare Pages → Deployments → cliquer sur le déploiement échoué
2. Lire les logs pour identifier l'erreur
3. Erreurs courantes : dépendance manquante, erreur TypeScript, variable d'environnement manquante

---

## Contacts et accès

| Outil | URL |
|---|---|
| Cloudflare Dashboard | dash.cloudflare.com |
| GitHub du projet | github.com/[repo] |
| Google Search Console | search.google.com/search-console |
| OVH (registrar uniquement) | ovhcloud.com |

---

*Document maintenu par l'équipe AD Concept — à mettre à jour à chaque changement d'infrastructure.*
