# Architecture Détaillée - Portfolio

## Table des matières
1. [Architecture Globale](#architecture-globale)
2. [Structure des Fichiers](#structure-des-fichiers)
3. [Design System & CSS](#design-system--css)
4. [Guide des Pages](#guide-des-pages)
5. [JavaScript & Interactivité](#javascript--interactivité)
6. [Flux de Données](#flux-de-données)

---

## Architecture Globale

### Diagramme de flux
```
[Client / Navigateur]  <-- HTTP GET -->  [GitHub Pages / Serveur]
       │
       ▼
   [HTML5 Core]
       ├── [CSS3 Styling] (styles.css)
       │      ├── Variables (:root)
       │      ├── Responsive Grid
       │      └── Animations
       │
       └── [JavaScript] (nav.js, animations.js)
              ├── DOM Manipulation
              └── Intersection Observer
```

### Concepts Clés
- **Architecture Orientée Composants** : Bien que statique, le CSS est pensé comme une bibliothèque de composants (Cards, Hero, Nav) réutilisables.
- **Mobile First** : Styles de base pour mobile, enrichis pour tablette et desktop via `@media`.
- **Zero-Build** : Pas de compilation, les fichiers sont servis tels quels pour une performance maximale.

---

## Structure des Fichiers

```
Portefolio/
├── 📄 **pages/** (Le contenu)
│   ├── `index.html` : L'accueil principal avec le Hero Header.
│   ├── `presentation.html` : Profil complet, CV, skills.
│   ├── `projects.html` : Galerie de projets avec filtres.
│   ├── `bts-sio.html` : Page dédiée au diplôme et options.
│   ├── `monitoring.html` : Section veille technologique.
│   └── `contact.html` : Formulaire de contact.
│
├── 🎨 **styles/** (Le design)
│   └── `styles.css` : La feuille de style unique (Single Source of Truth).
│       Contient : Variables CSS, Grid System, Composants, Media Queries.
│
├── 🔧 **scripts/** (La logique)
│   ├── `nav.js` :
│   │   - Injecte dynamiquement la Navbar et le Footer sur chaque page.
│   │   - Gère la classe `.active` pour montrer la page en cours.
│   ├── `animations.js` : Gère les effets d'apparition au scroll (Barres de progression, etc.).
│   ├── `auth.js` : Gestion de l'authentification Firebase (Connexion Admin).
│   ├── `firebase-config.js` : Configuration SDK Firebase.
│   └── `projects-manager-v2.js` : CRUD des projets (Ajout/Modif/Suppr) via Firestore.
│
├── 📄 **index.html** (Racine)
│   └── Sert uniquement de redirection automatique vers `./pages/index.html`.
│
├── 📝 **Documentation/**
│   ├── `README.md` : Point d'entrée de la doc (Vue d'ensemble, Stack, Quick Start).
│   ├── `ARCHITECTURE.md` : Ce fichier (Structure technique détaillée).
│   └── `INSTALLATION.md` : Guide de déploiement et setup local.
│
└── 🖼️ **Fichiers du site/** (Assets)
    └── Images, Logos, Certifications optimisées pour le web.
```

---

## Design System & CSS

Le fichier `styles.css` est le cœur visuel du projet. Il est organisé en sections logiques.

### 1. Variables Globales (:root)
Couleurs et paramètres modifiables depuis un seul endroit.
```css
:root {
  --primary: #2c3e50;      /* Bleu foncé (En-têtes) */
  --secondary: #3498db;    /* Bleu clair (Boutons, Liens) */
  --accent: #e74c3c;       /* Rouge (Alertes, CTA forts) */
  --light: #ecf0f1;        /* Fonds clairs */
  --dark: #1a1a1a;         /* Textes, Footer */
}
```

### 2. Typologie des Composants
| Type | Classes Clés | Description |
|------|--------------|-------------|
| **Fondations** | `body`, `.container` | Reset, typographie de base et conteneur centré. |
| **Navigation** | `.navbar`, `.nav-link` | Barre sticky responsive. |
| **Hero** | `.hero`, `.page-hero` | En-têtes de pages avec gradients. |
| **Cards** | `.service-card`, `.project-card` | Composants modulaires pour afficher du contenu. |
| **Grids** | `.gallery-grid`, `.services-grid` | Mises en page CSS Grid auto-adaptatives. |

### 3. Responsive Breakpoints
- **< 480px (Mobile)** : Colonne unique, paddings réduits.
- **< 768px (Tablette)** : Grilles simplifiées (1-2 colonnes).
- **> 1000px (Desktop)** : Mise en page complète.

---

## Guide des Pages

### Focus : Page Présentation (`presentation.html`)
Cette page illustre l'utilisation de composants complexes.

#### Structure
1.  **En-tête (`.page-hero`)** : Titre et sous-titre.
2.  **Profil (`.profile-section`)** : Bio, photo et téléchargement CV (`.doc-card`).
3.  **Chronologie (`.two-columns-section`)** :
    *   **Formations** (`.timeline`) : Liste verticale simple.
    *   **Expériences** (`.exp-timeline`) : Timeline détaillée avec badges (`.exp-type-badge`).
4.  **Compétences (`.skills-section`)** :
    *   Barres de progression animées (`.skill-bar-fill`).
    *   Grille d'icônes logiciels (`.skill-list-grid`).
    *   Design "Glassmorphism" (fonds semi-transparents).

### Autres Pages Clés
- **Projets (`projects.html`)** : Grille de `.project-card` avec effets de survol (zoom image).
- **Portfolio (`portfolio.html`)** : Galerie masonry chargée dynamiquement via JS.
- **Veille (`monitoring.html`)** : Cartes colorées pour les domaines de veille technologique.

---

## JavaScript & Interactivité

Le projet utilise **Vanilla JS** (sans framework) pour garantir légèreté et performance.

### `nav.js` (Navigation)
- **Rôle** : Surligner la page active dans le menu.
- **Logique** : Compare `window.location.pathname` avec les `href` des liens du menu. Ajoute la classe `.active`.

### `animations.js` (Effets)
- **API** : Utilise `IntersectionObserver`.
- **Rôle** : Déclenche les animations quand l'élément entre dans la vue.
- **Exemple** : Les barres de compétences démarrent à largeur 0% et s'animent vers leur valeur réelle au scroll.

---

## Flux de Données

1.  **Chargement Initial** : Le navigateur charge HTML + CSS. Le rendu est bloquant jusqu'au chargement du CSS pour éviter le FOUC (Flash of Unstyled Content).
2.  **Exécution JS** : `nav.js` s'exécute au `DOMContentLoaded`.
3.  **Interaction** :
    *   **Clic Menu** : Navigation standard (nouvelle requête page).
    *   **Scroll** : `animations.js` observe le DOM et manipule les classes CSS/styles inline.
    *   **Formulaire** : Soumission standard HTML (ou via script si backend ajouté).
