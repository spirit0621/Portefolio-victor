# Documentation Technique - Portfolio Alves Fernandes

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du projet](#architecture-du-projet)
3. [Langage et technologies](#langage-et-technologies)
4. [Squelette et structure](#squelette-et-structure)
5. [Fichiers et fonctionnement](#fichiers-et-fonctionnement)
6. [Guide d'installation et déploiement](#guide-dinstallation-et-déploiement)

---

## Vue d'ensemble

Ce portfolio est un **site web statique multi-pages** créé avec des technologies web standards (HTML, CSS, JavaScript). Il présente les travaux, services et informations professionnelles d'Alves Fernandes.

**Type de projet :** Site statique (Static Website)
**Hébergement :** GitHub Pages (ou serveur HTTP)
**Responsive :** Oui (mobile, tablette, desktop)

---

## Architecture du projet

### Structure générale

```
Portefolio/
├── index.html                 # Page d'accueil
├── presentation.html          # Page présentation
├── projects.html              # Page projets
├── portfolio.html             # Page galerie portfolio
├── monitoring.html            # Page veille technologique
├── bts-sio.html              # Page BTS SIO
├── about.html                # Page à propos (ancien)
├── services.html             # Page services
├── contact.html              # Page contact
├── styles.css                # Feuille de styles CSS
├── nav.js                    # Script JavaScript pour navigation
├── animations.js             # Script JavaScript pour animations
├── viewer.html               # Visualiseur de photos
├── Photo/                    # Dossier images
│   └── Capture d'écran *.png # Images portfolio
├── Documentation/            # Dossier documentation
│   ├── README.md            # Ce fichier
│   └── ARCHITECTURE.md      # Détails architecture
└── README.md                # README principal
```

### Hiérarchie des pages

```
Accueil (index.html)
├── Présentation (presentation.html)
├── Projets (projects.html)
├── Portfolio (portfolio.html)
├── Veille Technologique (monitoring.html)
├── BTS SIO (bts-sio.html)
├── Services (services.html)
└── Contact (contact.html)
```

---

## Langage et technologies

### Langages utilisés

| Langage | Utilisation | Version |
|---------|------------|---------|
| **HTML5** | Structure et balisage | HTML5 (standard) |
| **CSS3** | Styles et mise en page | CSS3 avec variables CSS |
| **JavaScript** | Interactivité et navigation | ES6+ |

### Technologies et outils

- **Git/GitHub** - Contrôle de version et hébergement
- **GitHub Pages** - Déploiement et hosting
- **HTTP Server** - Serveur local de développement (Python ou similaire)
- **Visual Studio Code** - Éditeur de code

### Packages et dépendances

**Aucune dépendance externe !**

Ce projet est **100% vanilla** :
- ✅ Pas de framework (React, Vue, Angular)
- ✅ Pas de bibliothèque CSS (Bootstrap, Tailwind)
- ✅ Pas de transpileur (Webpack, Babel)
- ✅ CSS vanilla avec variables CSS (CSS Custom Properties)
- ✅ JavaScript pur (pas de jQuery, etc.)

**Avantages :**
- Chargement très rapide
- Pas de compilation nécessaire
- Pas de dépendances externes
- Facile à maintenir et comprendre
- Excellent pour SEO

---

## Squelette et structure

### 1. Structure HTML de base

Chaque page suit ce squelette HTML5 :

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Page Title | Alves Fernandes</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Navigation -->
  <nav class="navbar"><!-- Contenu --></nav>
  
  <!-- Page Header -->
  <section class="page-hero"><!-- Titre section --></section>
  
  <!-- Main Content -->
  <section class="main-section"><!-- Contenu principal --></section>
  
  <!-- Footer -->
  <footer class="footer"><!-- Pied de page --></footer>
  
  <script src="nav.js"></script>
</body>
</html>
```

### 2. Système de design

**Palette de couleurs CSS (variables racine) :**

```css
:root {
  --primary: #2c3e50;      /* Bleu-gris foncé */
  --secondary: #3498db;    /* Bleu clair */
  --accent: #e74c3c;       /* Rouge accent */
  --light: #ecf0f1;        /* Gris très clair */
  --dark: #1a1a1a;         /* Noir presque pur */
  --text: #333;            /* Texte foncé */
  --border: #ddd;          /* Bordures */
}
```

**Typographie :**
- Famille : Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Taille base : 1rem (16px)
- Line-height : 1.6
- Responsive : Adapté via media queries

### 3. Système de grid CSS

**Layout principal :**
- Container max-width: 1000px
- Padding: 20px (responsive)
- Margin: auto (centré)

**Grilles :**
```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

---

## Fichiers et fonctionnement

### index.html - Page d'accueil

**Rôle :** Point d'entrée principal
**Contenu :**
- Hero section avec appel à l'action
- Section preview avec liens rapides
- Navigation complète

**Fonctionnalités :**
- Affichage responsive
- Boutons CTA (Call To Action)
- Navigation sticky

### presentation.html - Présentation

**Rôle :** Présentation professionnelle
**Contenu :**
- Biographie et mission
- Domaines d'expertise (liste)
- Sidebar avec valeurs et parcours

**Éléments clés :**
- Grid layout (2 colonnes)
- Cartes sidebar
- Listes stylisées

### projects.html - Projets

**Rôle :** Galerie de projets avec descriptions
**Contenu :**
- 6+ cartes de projets
- Image, titre, catégorie, description
- Lien vers détail projet

**Fonctionnalités :**
- Hover effects sur cartes
- Images responsive
- Catégorisation (Production, Design, etc.)

### portfolio.html - Portfolio

**Rôle :** Galerie complète des travaux
**Contenu :**
- Grille d'images depuis dossier Photo/
- Système de filtrage par catégorie

**JavaScript :**
```javascript
const photos = [...];
const gallery = document.getElementById('gallery');

photos.forEach(name => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  const img = document.createElement('img');
  img.src = encodeURI('Photo/' + name);
  item.appendChild(img);
  gallery.appendChild(item);
});
```

### monitoring.html - Veille technologique

**Rôle :** Documentation de la veille technologique
**Contenu :**
- 6 domaines de veille (Production, Design, Web, IA, Réseaux, Durabilité)
- Listes de technologies suivies
- Section ressources

**Sections :**
- Monitoring cards (grid layout)
- Resources grid (4 colonnes)
- Dernière mise à jour

### bts-sio.html - BTS SIO

**Rôle :** Information sur la formation BTS
**Contenu :**
- Description BTS SIO
- Objectifs, matières, débouchés
- Ressources utiles
- CTA contact

**Éléments :**
- Intro card gradient
- Grid de 6 cartes info
- Ressources avec liens externes
- Call to action section

### services.html - Services

**Rôle :** Présentation des services
**Contenu :**
- 3 services principaux (Vidéo, Design, Contenu)
- Section tarification
- 3 niveaux de forfaits

**Éléments :**
- Service cards large avec icônes
- Pricing cards (featured)
- Listes détaillées

### contact.html - Contact

**Rôle :** Formulaire et infos de contact
**Contenu :**
- Informations (email, tel, réseaux)
- Formulaire de contact
- Intégration simple

**Formulaire :**
```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Merci pour votre message !');
  this.reset();
});
```

### styles.css - Feuille de styles

**Taille :** ~18KB
**Organisation :**
1. Variables CSS (:root)
2. Reset global (*, body)
3. Utilities (.container, etc.)
4. Composants (navbar, hero, cards)
5. Pages spécifiques
6. Media queries (responsive)

**Breakpoints :**
- Desktop : 1000px+ (par défaut)
- Tablet : 768px
- Mobile : 480px

**Techniques CSS :**
- CSS Grid pour layouts
- Flexbox pour alignement
- CSS Variables pour thématisation
- Transitions et animations
- Box shadow pour profondeur
- Border radius pour angles arrondis

### nav.js - JavaScript navigation

**Rôle :** Déterminer la page active dans la navigation
**Code :**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
```

**Fonctionnement :**
1. Détecte l'URL actuelle
2. Compare avec href des liens
3. Ajoute classe `active` au lien courant
4. Visuellement le lien est surligné

### Photo/ - Dossier images

**Contenu :**
- 12 captures d'écran (Capture d'écran 2026-01-14 *.png)
- Format PNG
- Utilisées dans portfolio.html et projects.html

**Optimisation :**
- Nom des fichiers encodé avec `encodeURI()` pour caractères spéciaux
- Images responsive (100% width, object-fit)

---

## Fonctionnement détaillé

### 1. Flux de navigation

```
Utilisateur clique sur lien
    ↓
Navigation vers page (ex: presentation.html)
    ↓
Page charge (HTML, CSS chargés)
    ↓
nav.js s'exécute (DOMContentLoaded)
    ↓
Détecte page actuelle
    ↓
Ajoute classe .active au lien
    ↓
Visuellement lien surligné (CSS)
```

### 2. Responsive Design

**Mobile First Approach :**
```css
/* Par défaut : mobile */
.nav-menu { gap: 0.5rem; font-size: 0.8rem; }

/* Tablets */
@media (max-width: 768px) {
  .nav-menu { gap: 1rem; font-size: 0.9rem; }
}

/* Desktop */
@media (min-width: 769px) {
  .nav-menu { gap: 2rem; font-size: 1rem; }
}
```

### 3. Système de couleurs

Toutes les couleurs utilisent les variables CSS :
```css
.button {
  background: var(--accent);      /* Rouge #e74c3c */
  color: var(--light);            /* Gris clair */
}

.button:hover {
  background: #c0392b;            /* Rouge plus foncé */
}
```

### 4. Effets et animations

```css
/* Transitions fluides */
.nav-link {
  transition: color 0.3s ease;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: var(--secondary);
  border-bottom: 2px solid var(--secondary);
}

/* Transforms (léger) */
.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
```

---

## Guide d'installation et déploiement

### Installation locale

**Prérequis :**
- Git
- Navigateur web moderne
- (Optionnel) Python ou Node.js pour serveur local

**Étapes :**

```bash
# 1. Cloner le repo
git clone https://github.com/spirit0621/Portefolio.git
cd Portefolio

# 2. Lancer un serveur local
python3 -m http.server 8000

# 3. Ouvrir dans le navigateur
# http://localhost:8000

# 4. Modifier les fichiers (pas de compilation nécessaire)
# Les changements sont visibles au refresh du navigateur
```

### Déploiement GitHub Pages

**Setup :**

1. Aller dans Settings du repo GitHub
2. Aller dans Pages
3. Sélectionner branch `main` et dossier `/ (root)`
4. Sauvegarder
5. Le site est accessible à : `https://spirit0621.github.io/Portefolio`

**Déploiement automatique :**
```bash
git push origin main
# GitHub Pages se met à jour automatiquement
```

### Structure pour déploiement

- ✅ `index.html` à la racine
- ✅ Tous les assets dans le dépôt
- ✅ Chemins relatifs (Photo/, styles.css, nav.js)
- ✅ Pas de build step nécessaire

---

## Maintenance et extension

### Ajouter une nouvelle page

```html
<!-- 1. Créer nouveau fichier: new-page.html -->
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nouveau | Alves Fernandes</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar"><!-- Copier nav d'une autre page --></nav>
  <section class="page-hero"><h1>Titre</h1></section>
  <section class="main-section"><!-- Contenu --></section>
  <footer class="footer">...</footer>
  <script src="nav.js"></script>
</body>
</html>
```

```html
<!-- 2. Ajouter lien dans toutes les navigations -->
<li><a href="new-page.html" class="nav-link">Nouveau</a></li>
```

### Ajouter des images

```bash
# 1. Ajouter images dans Photo/
cp image.png Photo/

# 2. Référencer dans HTML
<img src="Photo/image.png" alt="Description">
```

### Personnaliser couleurs

```css
/* Modifier :root dans styles.css */
:root {
  --primary: #YOUR_COLOR;
  --secondary: #YOUR_COLOR;
  /* Tous les éléments se mettent à jour automatiquement */
}
```

---

## Performance et SEO

### Optimisations appliquées

✅ **Langage statique** → Chargement très rapide
✅ **Pas de dépendances** → Pas de délai de chargement
✅ **Images optimisées** → Responsive et objet-fit
✅ **CSS minifié concept** → Efficient
✅ **Mobile responsive** → Bon score mobile
✅ **Sémantique HTML5** → Bon SEO

### Score Lighthouse (estimé)

- Performance : 95+
- Accessibilité : 90+
- Best Practices : 95+
- SEO : 100

---

## Troubleshooting

### Les images ne s'affichent pas

**Solution :** Vérifier les chemins
```
✓ Photo/Capture d'écran....png (chemin correct)
✗ photos/Capture d'écran....png (casse différente)
✗ Photo\Capture d'écran....png (backslash Windows)
```

### La navigation n'est pas mise à jour

**Solution :** Vérifier nav.js et que DOMContentLoaded s'exécute
```javascript
console.log('Current page:', window.location.pathname);
```

### Les styles ne s'appliquent pas

**Solution :** Vérifier l'import CSS et le cache
```html
<link rel="stylesheet" href="styles.css">
<!-- Ctrl+Shift+R pour forcer refresh -->
```

---

## Améliorations futures possibles

1. **Backend optionnel** - Ajouter formulaire email (Node.js/PHP)
2. **CMS** - Ajouter Headless CMS (Strapi, Contentful)
3. **Analytics** - Ajouter Google Analytics
4. **PWA** - Transformer en Progressive Web App
5. **Blog** - Ajouter section blog statique
6. **Search** - Ajouter recherche côté client

---

## Résumé technique

| Aspect | Détail |
|--------|--------|
| **Type** | Site statique multi-pages |
| **Langage** | HTML5, CSS3, JavaScript ES6+ |
| **Frameworks** | Aucun (vanilla) |
| **Packages** | Aucune dépendance externe |
| **Taille** | ~50KB (assets mineurs) |
| **Responsive** | Oui (480px, 768px, 1000px) |
| **Hébergement** | GitHub Pages / Serveur HTTP |
| **Déploiement** | Git push (automatique) |
| **Navigateurs** | Tous les modernes (IE11 non supporté) |
| **Performance** | Excellent (>90 Lighthouse) |
| **Maintenabilité** | Facile (code simple et bien structuré) |

---

**Dernière mise à jour :** 25 janvier 2026
**Version :** 2.2 (Ajout animations et design premium)
**Auteur :** Alves Fernandes
