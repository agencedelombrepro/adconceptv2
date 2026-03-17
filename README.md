# AD Concept — Site web

## Déploiement en 3 étapes

### 1. Installer les dépendances
Ouvre le Terminal dans ce dossier :
```
npm install
```

### 2. Builder le site
```
npm run build
```
→ Un dossier `dist/` est créé.

### 3. Déposer sur Cloudflare Pages
1. Va sur https://pages.cloudflare.com
2. "Create a project" → **"Direct Upload"**
3. Donne un nom au projet (ex: `ad-concept`)
4. Glisse-dépose le dossier **`dist/`**
5. Clique "Deploy site"

✅ Le site est en ligne sur `ad-concept.pages.dev`

Pour brancher le domaine `adconceptdesign.fr` :
→ Cloudflare Pages → ton projet → "Custom domains"
