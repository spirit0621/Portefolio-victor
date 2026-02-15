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

Ce portfolio est un **site web statique multi-pages** moderne, hébergé sur **Firebase Hosting**. Il présente les travaux, services et informations professionnelles d'Alves Fernandes, avec une interface d'administration sécurisée.

**Type de projet :** Site statique (Static Website) avec composants dynamiques (Admin)
**Hébergement :** Firebase Hosting
**Responsive :** Oui (mobile, tablette, desktop)
**Version :** 3.0 (Février 2026) -> Migration Firebase complète

---

## Stack Technologique

Ce projet reste fidèle à l'approche **Vanilla JS** mais intègre désormais des services cloud puissants.

### Langages & Bibliothèques
| Techno | Usage |
|---------|------|
| **HTML5** | Structure sémantique (9+ fichiers) |
| **CSS3** | Flexbox/Grid, Variables, Animations |
| **JavaScript (ES6+)** | Logique client, Auth, Firestore |
| **AOS (Animate On Scroll)** | Animations d'apparition fluides |
| **FontAwesome** | Icônes vectorielles |

### Infrastructure (Firebase)
- **Hosting** : Hébergement global CDN, SSL automatique.
- **Authentication** : Sécurisation de l'espace Admin via Email/Password.
- **Firestore** : Base de données NoSQL pour la gestion dynamique des projets (CRUD).

---

## Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Pages HTML** | 9 (Accueil, Présentation, Projets, Portfolio, Veille, BTS, Services, Contact, Admin Login) |
| **Styles** | 1 fichier CSS principal + styles AOS |
| **Scripts** | Modules JS (Navigation, Auth, Admin, Animations) |
| **Images** | Galerie optimisée dans `assets/Photo/` |
| **Performance** : | Score Lighthouse > 95 |
| **SEO** : | Sitemap XML, Balises Meta, Rewrites d'URL propres |

---

## Architecture du projet

Le projet suit une architecture de **site statique enrichi**.

### Points Clés
- **Clean URLs** : Les URLs sont propres (ex: `/projets` au lieu de `projects.html`) grâce à la configuration Firebase.
- **Redirections** : Gestion des anciens liens et redirections 301 (ex: migration depuis l'ancien ID de projet).
- **Admin Sécurisé** : Route `/admin` protégée redirigeant vers la page de login si non authentifié.

### Structure Simplifiée
```
Portefolio/
├── pages/              # Toutes les pages HTML (admin-login, bts-sio, etc.)
├── styles/             # Styles CSS
├── scripts/            # Logique JS (modules)
├── assets/Photo/       # Images
├── firebase.json       # Configuration Hosting (Rewrites, Redirects)
├── .firebaserc         # Alias des projets Firebase
└── sitemap.xml         # Plan du site pour SEO
```

👉 **Pour plus de détails, voir [ARCHITECTURE.md](./ARCHITECTURE.md)**

---

## Squelette et structure

### Structure HTML Type
Chaque page inclut dynamiquement la navigation et le pied de page via JS pour faciliter la maintenance.

```html
<!doctype html>
<html lang="fr">
<head>
  <!-- Meta tags, CSS, FontAwesome, AOS -->
</head>
<body>
  <div id="header-placeholder"></div> <!-- Navbar injectée -->
  <main>
     <!-- Contenu page spécifique -->
  </main>
  <div id="footer-placeholder"></div> <!-- Footer injecté -->
  
  <script src="../scripts/nav.js"></script>
  <script>
    AOS.init(); // Initialisation animations
  </script>
</body>
</html>
```

### Design System
Utilisation de **Variables CSS** pour :
- Couleurs (`--primary`, `--secondary`, `--accent`)
- Espacements et typographies.
- Thème sombre/clair (préparé via variables).

---

## Fichiers et fonctionnement

### Scripts Principaux
- **`nav.js`** : Injection du Header/Footer et gestion de la classe `.active`.
- **`animations.js`** : Logique d'animation spécifique (barres de compétences).
- **`auth.js`** : Gestion de la connexion/déconnexion Firebase Auth.
- **`firebase-config.js`** : Initialisation de l'app Firebase.

### Pages Spéciales
- **`pages/admin-login.html`** : Portail de connexion administrateur.
- **`pages/contact.html`** : Formulaire fonctionnel via FormSubmit + EmailJS (historique).

---

## Installation et Déploiement

Le déploiement se fait via la **Firebase CLI**.

### Prérequis
- Node.js installé.
- CLI Firebase installée (`npm install -g firebase-tools`).

### Déploiement Rapide
```bash
# 1. Login
firebase login

# 2. Déployer
firebase deploy --only hosting
```

Le site est automatiquement redéployé à chaque push sur la branche `main` si une action GitHub est configurée (optionnel).

👉 **Guide complet : [INSTALLATION.md](./INSTALLATION.md)**
