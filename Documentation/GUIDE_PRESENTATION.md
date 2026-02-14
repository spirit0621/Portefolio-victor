# 📖 Guide de la page Présentation (`presentation.html`)

Ce document sert de glossaire et de guide pour comprendre la structure et le code de la page **Présentation**.

## 📑 Structure générale

La page est divisée en plusieurs grandes sections, toutes encapsulées dans `.presentation-content`.

### 1. En-tête de page (`.page-hero`)
*   **Description** : Bandeau supérieur avec le titre principal.
*   **Contenu** : Titre "PRÉSENTATION" et sous-titre.
*   **Classes clés** : `page-hero`

### 2. Profil (`.profile-section`)
*   **Description** : Introduction personnelle, biographie courte et formation actuelle.
*   **Contenu** :
    *   Nom, titre professionel, bio.
    *   **Formation actuelle** (`.profile-education`) : Encadré mis en avant.
    *   **Documents** (`.documents-section`) : Cartes pour télécharger le CV et le tableau de réalisations.
*   **Classes clés** : `profile-section`, `profile-intro`, `doc-card`

### 3. Chronologie (`.two-columns-section`)
Cette section utilise une grille à deux colonnes pour afficher côte à côte les formations et les expériences.

#### A. Formations (`.timeline-section`)
*   **Description** : Liste chronologique des diplômes.
*   **Structure** : Utilise une timeline verticale simple.
*   **Classes clés** : `timeline-section`, `timeline`, `timeline-item`

#### B. Expériences (`.experience-section`)
*   **Description** : Parcours professionnel détaillé.
*   **Structure** : Timeline plus élaborée avec badges (Alternant, Stage, CDD...).
*   **Classes clés** : `experience-section`, `exp-timeline`, `exp-type-badge`

### 4. Certifications (`.certifications-section`)
*   **Description** : Grille de cartes affichant les certifications et diplômes clés.
*   **Classes clés** : `certifications-section`, `certifications-grid`, `cert-card`

### 5. Compétences (`.skills-section`)
*   **Description** : Section majeure présentant les compétences techniques.
*   **Refonte récente (v2.2)** : Design "Glassmorphism" et animations.

#### A. Langages (`.skills-category`)
*   **Affichage** : Liste verticale avec barres de progression.
*   **Fonctionnement** : L'attribut `data-width="X%"` est lu par `animations.js` pour animer la barre au défilement.
*   **Classes clés** : `skill-list`, `skill-item`, `skill-bar-fill`

#### B. Logiciels (`.skill-list-grid`)
*   **Affichage** : Grille d'icônes pour les outils (VMware, VS Code, etc.).
*   **Classes clés** : `skill-list-grid`, `software-item`

#### C. Domaines de Spécialisation (`.advanced-skills`)
*   **Affichage** : Cartes détaillées pour les compétences avancées (RPA, IA, DevOps).
*   **Classes clés** : `advanced-skills`, `advanced-skill-card`, `skill-badge`

---

## 🎨 Classes CSS principales

| Section | Classe CSS | Rôle |
| :--- | :--- | :--- |
| **Global** | `.presentation-content` | Conteneur principal de la page |
| **Grid** | `.two-columns-section` | Grille 2 colonnes (Formations/Expériences) |
| **Timeline** | `.timeline-item` | Un bloc formation (style simple) |
| **Timeline** | `.exp-timeline-item` | Un bloc expérience (style détaillé) |
| **Skills** | `.skills-category` | Conteneur style "verre" pour les compétences |
| **Skills** | `.skill-bar-fill` | Barre animée (width: 0 -> data-width) |
| **Docs** | `.doc-card` | Carte de téléchargement de document |

## ⚡ Scripts associés

*   **`scripts/nav.js`** : Gère la classe `.active` sur le menu de navigation.
*   **`scripts/animations.js`** : Gère l'animation des barres de compétences et l'apparition des éléments au défilement.

## 🖼️ Icônes

*   **Devicon** : Utilisé pour les logos de langages (HTML, Python, Java...).
*   **Images locales** : Utilisées pour les logiciels (`../Fichiers du site/...`).
