# Documentation Technique - Portfolio Alves Fernandes

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Stack Technologique](#stack-technologique)
3. [Statistiques du Projet](#statistiques-du-projet)
4. [Architecture du projet](#architecture-du-projet)
5. [Squelette et structure](#squelette-et-structure)
6. [Fichiers et fonctionnement](#fichiers-et-fonctionnement)
7. [Installation et Déploiement](#installation-et-déploiement)

---

## Vue d'ensemble

Ce portfolio est un **site web statique multi-pages** créé avec des technologies web standards (HTML, CSS, JavaScript). Il présente les travaux, services et informations professionnelles d'Alves Fernandes.

**Type de projet :** Site statique (Static Website)
**Hébergement :** GitHub Pages (ou serveur HTTP)
**Responsive :** Oui (mobile, tablette, desktop)
**Version :** 2.2 (Janvier 2026)

---

## Stack Technologique

**Aucune dépendance externe !** Ce projet est **100% vanilla**.

### Langages
| Langage | Version | Rôle |
|---------|---------|------|
| **HTML5** | Living Standard | Structure sémantique (8 fichiers) |
| **CSS3** | Flexbox/Grid | Styles, Responsive, Variables (15 KB) |
| **JavaScript** | ES6+ | Navigation, Animations (Pas de framework) |

### Outils
- **Git/GitHub** : Versioning et hébergement.
- **GitHub Pages** : Déploiement automatique.
- **VS Code** : Éditeur recommandé.

### Pourquoi cette stack ?
- ✅ **Performance** : Chargement instantané, pas de bundle lourd.
- ✅ **Sécurité** : 0 dépendance npm = 0 vulnérabilité.
- ✅ **Maintenance** : Code standard, pérenne et facile à comprendre.
- ✅ **SEO** : Sémantique HTML5 native parfaite pour l'indexation.

---

## Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Pages HTML** | 8 (Accueil, Présentation, Projets, Portfolio, Veille, BTS, Services, Contact) |
| **Styles** | 1 fichier CSS (~370 lignes, 15 KB) |
| **Scripts** | 2 fichiers JS (~30 lignes) |
| **Images** | 12 captures PNG optimisées (~3-5 MB) |
| **Performance** | Lighthouse Score > 95 |
| **Compatibilité** | Tous navigateurs modernes (Chrome, Firefox, Safari, Edge) |

---

## Architecture du projet

### Structure des fichiers
```
Portefolio/
├── index.html                 # Page d'accueil
├── presentation.html          # Page présentation
├── projects.html              # Page projets
├── portfolio.html             # Page galerie portfolio
├── monitoring.html            # Page veille technologique
├── bts-sio.html              # Page BTS SIO
├── services.html             # Page services
├── contact.html              # Page contact
├── styles.css                # Feuille de styles CSS principale
├── nav.js                    # Script de navigation active
├── animations.js             # Script d'animations au scroll
├── viewer.html               # Utilitaire visualisation images
├── Photo/                    # Dossier assets images
└── Documentation/            # Dossier documentation (Ce dossier)
```

### Hiérarchie
L'architecture est plate (flat structure) pour les pages HTML, facilitant les liens relatifs. Le dossier `Documentation` contient les guides techniques détaillés.

👉 **Pour plus de détails, voir [ARCHITECTURE.md](./ARCHITECTURE.md)**

---

## Squelette et structure

### Structure HTML Type
Chaque page suit ce modèle sémantique :
```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Titre | Alves Fernandes</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar">...</nav>      <!-- Navigation Sticky -->
  <section class="page-hero">...</section> <!-- En-tête de page -->
  <main>...</main>                   <!-- Contenu Principal -->
  <footer class="footer">...</footer> <!-- Pied de page -->
  <script src="nav.js"></script>
</body>
</html>
```

### Design System (CSS)
Le design repose sur des **Variables CSS** pour une maintenance aisée :
- **Couleurs** : `--primary` (#2c3e50), `--secondary` (#3498db), `--accent` (#e74c3c).
- **Layout** : Utilisation intensive de **CSS Grid** et **Flexbox**.
- **Responsive** : 3 breakpoints majeurs (Mobile 480px, Tablette 768px, Desktop 1000px).

---

## Fichiers et fonctionnement

### Pages Clés
- **`index.html`** : Point d'entrée avec Hero section et aperçus.
- **`portfolio.html`** : Galerie d'images chargée dynamiquement via JS.
- **`contact.html`** : Contient le formulaire de contact (frontend only).
- **`presentation.html`** : Profil complet, timeline expérience et graphs de compétences.

### Scripts
- **`nav.js`** : Détecte automatiquement la page courante pour ajouter la classe `.active` au menu.
- **`animations.js`** : Utilise `IntersectionObserver` pour animer les éléments (ex: barres de compétences) lors du défilement.

---

## Administration

Le site dispose d'une interface d'administration légère permettant de gérer les projets dynamiquement via Firebase.

### Accès
1.  **URL directe** : Accédez à la page [`pages/admin-login.html`](../pages/admin-login.html).
2.  **Connexion** : Connectez-vous avec les identifiants administrateur (configurés dans Firebase Authentication).

### Fonctionnalités Admin
Une fois connecté, des options supplémentaires apparaissent sur le site :
-   **Gestion des Projets** : Boutons "Modifier" et "Supprimer" visibles sur chaque carte projet.
-   **Ajout de Projet** : Un bouton permet d'ajouter de nouveaux projets avec images.
-   **Déconnexion** : Un bouton "Déconnexion" apparaît en bas à droite.

### Configuration
L'authentification et la base de données reposent sur **Firebase**. La configuration se trouve dans `scripts/firebase-config.js`.

---

## Installation et Déploiement

### Quick Start (Local)
1. **Cloner** : `git clone https://github.com/spirit0621/Portefolio.git`
2. **Lancer** : `python3 -m http.server 8000` (ou tout serveur statique).
3. **Ouvrir** : `http://localhost:8000`

### Déploiement
Le site est hébergé sur **GitHub Pages**. Toute modification poussée sur la branche `main` est déployée automatiquement.

👉 **Guide complet : [INSTALLATION.md](./INSTALLATION.md)**
