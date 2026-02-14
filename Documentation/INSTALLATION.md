# Guide d'installation et déploiement

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation locale](#installation-locale)
3. [GitHub Pages deployment](#github-pages-deployment)
4. [Workflow de développement](#workflow-de-développement)
5. [Structure correcte pour déploiement](#structure-correcte-pour-déploiement)
6. [Chemins relatifs](#chemins-relatifs)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance procédures](#maintenance-procédures)
9. [Performance et optimisation](#performance-et-optimisation)
10. [Bonnes pratiques Git](#bonnes-pratiques-git)
11. [Checklist pré-deployment](#checklist-pré-deployment)

---

## Prérequis

### Système
- Windows 10+, macOS 10.14+, ou Linux (Ubuntu 18.04+)
- 100 MB d'espace disque
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)

### Logiciels requis

| Logiciel | Version | Pourquoi |
|----------|---------|---------|
| Git | 2.30+ | Cloner et gérer le repo |
| Python | 3.7+ | Serveur local (optionnel) |
| Node.js | 14+ | Alternative serveur (optionnel) |
| Code Editor | (n'importe quel) | Éditer les fichiers |

---

## Installation locale

### Étape 1 : Cloner le repository

```bash
# Ouvrir terminal/cmd

# Naviguer vers dossier de travail
cd ~/Documents
# ou
cd C:\Users\YourName\Documents

# Cloner le repo
git clone https://github.com/spirit0621/Portefolio.git

# Entrer dans le dossier
cd Portefolio
```

### Étape 2 : Lancer un serveur local

#### Option A : Python (recommandé)

```bash
# Python 3
python3 -m http.server 8000

# Ou Python 2 (ancien)
python -m SimpleHTTPServer 8000
```

**Résultat :**
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

#### Option B : Node.js

```bash
# Installer http-server globalement
npm install -g http-server

# Lancer le serveur
http-server -p 8000
```

#### Option C : Visual Studio Code

1. Installer extension "Live Server"
2. Clique droit sur `index.html`
3. "Open with Live Server"

### Étape 3 : Accéder au site

```
http://localhost:8000
```

Le site s'ouvre automatiquement dans votre navigateur.

### Étape 4 : Modification et test

```bash
# 1. Ouvrir code dans éditeur (VSCode)
code .

# 2. Modifier fichiers (HTML, CSS, JS)
# Les changements sont visibles au F5 (refresh page)

# 3. Pas de compilation nécessaire !
# Le serveur sert les fichiers directement
```

---

## Déploiement GitHub Pages

### Étape 1 : Vérifier les prérequis

```bash
# Vérifier Git installé
git --version

# Vérifier accès au repo
git remote -v
# Doit afficher :
# origin  https://github.com/spirit0621/Portefolio.git (fetch)
# origin  https://github.com/spirit0621/Portefolio.git (push)
```

### Étape 2 : Configuration GitHub Pages

1. Aller sur **GitHub** → **spirit0621/Portefolio**
2. Cliquer sur **Settings** (engrenage)
3. Scroll vers le bas, section **Pages**
4. **Source** → Sélectionner :
   - Branch: `main`
   - Folder: `/ (root)`
5. Cliquer **Save**

### Étape 3 : Déploiement automatique

```bash
# Ajouter modifications (si aucune)
git add -A

# Committer
git commit -m "Mises à jour du portfolio"

# Pousser vers GitHub
git push origin main
```

**GitHub Pages détecte** la mise à jour et redéploie automatiquement.

### Étape 4 : Accéder au site déployé

Attendre ~1-2 minutes, puis accéder à :

```
https://spirit0621.github.io/Portefolio/
```

Le site est maintenant public !

---

## Workflow de développement

### Développement local

```
1. Modifier fichier (ex: styles.css)
   ↓
2. Refresh navigateur (F5)
   ↓
3. Voir changement immédiatement
   ↓
4. Satisfait ? → Committer et pusher
```

### Git workflow complet

```bash
# 1. Créer nouvelle branche (optionnel)
git checkout -b feature/new-feature

# 2. Modifier fichiers
# ... éditer dans l'éditeur ...

# 3. Vérifier changements
git status
git diff          # Voir les différences

# 4. Ajouter modifications
git add .         # Tous les fichiers
# ou
git add fichier.html

# 5. Committer
git commit -m "Description claire du changement"

# 6. Pousser
git push origin main
# ou
git push origin feature/new-feature

# 7. (Optionnel) Pull Request sur GitHub
```

### Exemple complet

```bash
# Aller au dossier
cd ~/Documents/Portefolio

# Modifier presentation.html

# Voir changements
git status
# On branch main
# Changes not staged for commit:
#   modified:   presentation.html

# Ajouter
git add presentation.html

# Committer
git commit -m "Mise à jour présentation - ajouter compétences"

# Pousser
git push origin main

# Vérifié sur GitHub et GitHub Pages après ~2 min
```

---

## Structure correcte pour déploiement

### ✅ Correct

```
Portefolio/ (root)
├── index.html
├── styles.css
├── nav.js
├── Photo/
│   └── images.png
└── .git/
```

**GitHub Pages trouvera `index.html` automatiquement**

### ❌ Incorrect

```
Portefolio/
├── docs/
│   ├── index.html    ❌ GitHub Pages ne le trouvera pas
│   └── styles.css
└── Photo/
```

**Doit configurer "docs" dans Settings → Pages**

### Chemins relatifs

```html
<!-- ✅ Correct (chemin relatif) -->
<link rel="stylesheet" href="styles.css">
<script src="nav.js"></script>
<img src="Photo/image.png" alt="Photo">

<!-- ❌ Incorrect (chemin absolu) -->
<link rel="stylesheet" href="/home/user/styles.css">
<script src="/workspaces/Portefolio/nav.js"></script>
```

---

## Troubleshooting

### Le serveur local ne démarre pas

```bash
# Vérifier Python
python3 --version

# Port 8000 déjà utilisé ?
# Utiliser autre port
python3 -m http.server 9000

# Puis accéder à
http://localhost:9000
```

### Les images ne s'affichent pas

```bash
# Vérifier structure
ls Photo/
# Doit afficher les 12 images

# Vérifier chemins dans HTML
# Photo/Capture d'écran ...png (casse correcte)

# Récharger page (Ctrl+Shift+R force refresh)
```

### GitHub Pages ne met pas à jour

```bash
# Vérifier que push est réussi
git push origin main
# Doit afficher "To https://github.com/..."

# Vérifier Settings → Pages (branch main)

# Attendre 1-2 minutes (parfois plus)

# Vérifier email de GitHub pour erreurs
```

### Les fichiers CSS/JS ne s'appliquent pas

```html
<!-- Vérifier l'import en haut de page -->
<link rel="stylesheet" href="styles.css">
<script src="nav.js"></script>

<!-- Force refresh du cache -->
Ctrl+Shift+R (Chrome/Firefox)
Cmd+Shift+R (Mac)
Ctrl+F5 (Edge)

<!-- Ou vider le cache -->
Settings → Clear browsing data → Cached images/files
```

### Erreurs console (F12)

```javascript
// Erreur: Cannot find element
// → HTML a une typo dans l'ID

// Erreur: Unexpected token
// → JavaScript a une typo (syntaxe)

// CORS error
// → Serveur local non actif
// Solution: Relancer python3 -m http.server 8000

// 404 not found
// → Chemin fichier incorrect
// Vérifier chemins relatifs
```

---

## Maintenance

### Ajouter une page

```bash
# 1. Créer fichier
touch new-page.html

# 2. Éditer contenu

# 3. Ajouter à git
git add new-page.html

# 4. Committer
git commit -m "Ajouter nouvelle page"

# 5. Pousser
git push origin main
```

### Ajouter une image

```bash
# 1. Ajouter image dans Photo/
cp ~/Downloads/screenshot.png ./Photo/

# 2. Ajouter à git
git add Photo/screenshot.png

# 3. Committer
git commit -m "Ajouter image screenshot"

# 4. Pousser
git push origin main

# 5. Référencer dans HTML
<img src="Photo/screenshot.png" alt="Screenshot">
```

### Mettre à jour styles

```bash
# 1. Éditer styles.css

# 2. Test local avec F5

# 3. Satisfait ?
git add styles.css
git commit -m "Mise à jour styles - [description]"
git push origin main
```

---

## Performance et optimisation

### Avant deployment

```bash
# 1. Tester locally
python3 -m http.server 8000

# 2. Ouvrir http://localhost:8000

# 3. Tester toutes les pages
# Cliquer sur chaque lien de navigation

# 4. Vérifier images
# Tout doit s'afficher correctement

# 5. Vérifier formulaires
# Tester si soumission fonctionne

# 6. Lighthouse audit (Chrome DevTools)
# F12 → Lighthouse → Generate report
# Score doit être > 90
```

### Optimisations possibles

```bash
# Minifier CSS (optionnel)
npm install -g cssnano-cli
cssnano styles.css > styles.min.css

# Compresser images (optionnel)
npm install -g imagemin-cli imagemin-pngquant
imagemin Photo/*.png --plugin=pngquant --out-dir=Photo

# Résultat : site 20-30% plus rapide
```

---

## Bonnes pratiques

### Commits effectifs

```bash
# ✅ Bon
git commit -m "Ajouter section services avec 3 cartes"

# ❌ Mauvais
git commit -m "Updates"
git commit -m "Fix bug"
git commit -m "stuff"
```

### Format commits

```
# Format recommandé
<type>: <description courte>

Types courants:
- feat: Nouvelle fonctionnalité
- fix: Correctif bug
- docs: Documentation
- style: Formatage code
- refactor: Restructuration
- perf: Performance

# Exemple
git commit -m "feat: Ajouter page portfolio avec galerie"
```

### Branchement

```bash
# Créer branche pour features
git checkout -b feature/add-blog

# Développer et tester

# Pousser
git push origin feature/add-blog

# Fusionner avec main (via GitHub PR)
# Puis push sur main
```

---

## Checklist pre-deployment

- [ ] Tous les fichiers locaux modifiés
- [ ] `git status` ne montre aucun changement
- [ ] `git push origin main` réussi
- [ ] GitHub Settings → Pages correctement configuré
- [ ] Site accessible sur `github.io/Portefolio/`
- [ ] Navigation fonctionne
- [ ] Images affichées
- [ ] Formulaires testés
- [ ] Lighthouse > 90

---

## Support et ressources

### Documentations utiles

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org/)
- [HTML5 Spec](https://html.spec.whatwg.org/)
- [CSS3 Guide](https://www.w3schools.com/css/)

### Communautés

- Stack Overflow
- GitHub Discussions
- Dev.to
- CSS-Tricks

---

**Version:** 2.0
**Last updated:** 15 janvier 2026
**Support:** spirit0621@github.com
