# 🎨 Guide des Styles CSS (`styles.css`)

Ce document sert de glossaire et de référence pour naviguer dans la feuille de styles principale du projet. Le fichier CSS suit une **architecture orientée composants**.

## 🏗️ Architecture du fichier

Le fichier est organisé en grandes sections logiques, délimitées par des en-têtes ASCII visibles.

1.  **📦 FONDATIONS (Lignes 50+)** : Variables, Reset, Styles de base.
2.  **🧩 COMPOSANTS PRIMAIRES (Lignes 90+)** : Briques élémentaires (Nav, Hero, Boutons).
3.  **🎨 COMPOSANTS D'AFFICHAGE (Lignes 240+)** : Cards, Grids, Forms, Footer.
4.  **🔧 COMPOSANTS COMPOSÉS (Lignes 370+)** : Sections spécifiques (About, Services, Contact, Skills...).
5.  **📱 RESPONSIVE (Lignes 1250+)** : Adaptations mobiles et tablettes.

---

## 🎨 Variables & Design System

Définies dans `:root`, ces variables contrôlent l'apparence globale du site.

| Variable | Couleur | Usage |
| :--- | :--- | :--- |
| `--primary` | `#2c3e50` (Bleu foncé) | En-têtes, textes principaux, navbar |
| `--secondary` | `#3498db` (Bleu clair) | Accents, boutons, liens actifs |
| `--accent` | `#e74c3c` (Rouge) | Call-to-action (CTA), alertes |
| `--light` | `#ecf0f1` (Gris clair) | Arrière-plans de sections, cartes |
| `--dark` | `#1a1a1a` (Noir) | Footer, contrastes forts |
| `--text` | `#333` (Gris foncé) | Corps de texte par défaut |

---

## 🧩 Composants Clés

### Navigation (`.navbar`)
*   Barre de menu "sticky" en haut de page.
*   **Classes** : `.nav-container`, `.nav-logo`, `.nav-menu`, `.nav-link`
*   **État actif** : `.nav-link.active` (géré par JS).

### Hero Sections
*   **Accueil** : `.hero` (Grand header avec gradient).
*   **Pages internes** : `.page-hero` (Version plus compacte).

### Cartes (`Cards`)
Plusieurs variantes de cartes sont utilisées à travers le site :
*   **Service Card** : `.service-card` (Simple, fond clair).
*   **Project Card** : `.project-card` (Avec image et catégorie).
*   **Feature Card** : `.bts-card`, `.monitoring-card` (Avec bordure colorée).
*   **Certif Card** : `.cert-card` (Style diplôme).

### Grilles (`Grids`)
Le site utilise CSS Grid pour la mise en page.
*   **Galerie** : `.gallery-grid` (Auto-fit, responsive).
*   **Services** : `.services-grid` (Colonnes fixes ou adaptatives).
*   **Chronologie** : `.two-columns-section` (Layout 2 colonnes spécifique).

---

## 🌟 Sections Spécifiques (Glossaire)

### Compétences (`.skills-section`)
*Refonte v2.2 (Glassmorphism)*
*   Conteneur principal : `.skills-section`
*   Catégories (Langages/Logiciels) : `.skills-category`
*   Barres de progression : `.skill-bar-container`, `.skill-bar-fill`
*   Grille logiciels : `.skill-list-grid`, `.software-item`
*   Compétences avancées : `.advanced-skill-card` (effet hover)

### Chronologie & Expérience
*   **Simple** : `.timeline`, `.timeline-item` (Formations).
*   **Détaillée** : `.exp-timeline`, `.exp-timeline-item` (Expériences Pro en `presentation.html`).
    *   Utilise `.exp-type-badge` pour le type de contrat (Alternance, Stage...).

### Veille Technologique (`.surveillance-domains`)
*   **Domaines** : `.domain-box` (Cartes colorées numérotées `.domain-1` à `.domain-5`).
*   **Architecture** : `.architecture-layer` (Schéma en couches applicatives).

### BTS SIO (`.bts-card`)
*   Styles spécifiques pour la présentation de la formation : `.intro-card`, `.program-card`.

---

## 📱 Responsive Design

Les media queries sont situées à la fin du fichier.

*   **Tablette (`max-width: 768px`)** :
    *   Les grilles passent souvent de plusieurs colonnes à 1 seule (`grid-template-columns: 1fr`).
    *   La police des titres est réduite.
*   **Mobile (`max-width: 480px`)** :
    *   Ajustements fins des marges et paddings (`padding: 60px 20px`).
    *   Menu de navigation compacté.

---

## 💡 Astuce pour modifier

Pour changer la couleur principale du site, modifiez simplement `--primary` et `--secondary` dans le bloc `:root` tout en haut du fichier. L'ensemble du site se mettra à jour automatiquement.
