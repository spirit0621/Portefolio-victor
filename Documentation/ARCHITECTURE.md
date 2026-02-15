# Architecture Détaillée - Portfolio

## Table des matières

1. [Architecture Globale](#architecture-globale)
2. [Structure des Fichiers](#structure-des-fichiers)
3. [Stack Technique & Firebase](#stack-technique--firebase)
4. [Design System & CSS](#design-system--css)
5. [Logique Applicative (JavaScript)](#logique-applicative-javascript)
6. [Modèle de Données (Firestore)](#modèle-de-données-firestore)
7. [Workflow de Déploiement](#workflow-de-déploiement)

---

## Architecture Globale

Le projet est une **Single Page Application (SPA) hybride**.
- **Frontend** : HTML5, CSS3, Vanilla JS.
- **Backend (Serverless)** : Google Firebase.

### Diagramme de flux

```text
[Visiteur]                [Admin / Moi]
    │                          │
    ▼                          ▼
[Firebase Hosting] <---- [Firebase CLI] (Déploiement)
    │
    ├── [HTML/CSS] (Structure & Design)
    │
    └── [JavaScript Client]
           ├── [Auth] <---> [Firebase Authentication] (Sécurisation)
           │
           └── [Data] <---> [Cloud Firestore] (Base de données NoSQL)
                                   │
                           [Collection: Projects]
```

---

## Structure des Fichiers

```text
Portefolio/
├── 📄 **pages/** (Vues)
│   ├── `index.html` : Accueil.
│   ├── `projects.html` : Galerie dynamique (CRUD).
│   ├── `presentation.html` : CV et parcours.
│   ├── `contact.html` : Formulaire.
│   └── `admin-login.html` : Interface de connexion.
│
├── 🎨 **styles/** (Design)
│   └── `styles.css` : Feuille de style unique (Grid, Flexbox, Variables).
│
├── 🔧 **scripts/** (Logique)
│   ├── `firebase-config.js` : Initialisation SDK Firebase (v12.9.0).
│   ├── `auth.js` : Gestion connexion/déconnexion et état utilisateur.
│   ├── `projects-manager-v2.js` : Cœur de la gestion de projets (Affichage + Admin).
│   ├── `nav.js` : Injection dynamique du menu et footer.
│   └── `animations.js` : Effets visuels (AOS, barres de compétences).
│
└── ⚙️ **Config**
    ├── `firebase.json` : Configuration Hosting (règles, ignorés).
    └── `.firebaserc` : Alias du projet (portefolio-a0995).
```

---

## Stack Technique & Firebase

Le projet repose entièrement sur l'écosystème **Firebase** (Google Cloud) pour sa robustesse et sa gratuité (Spark Plan).

| Service | Usage dans le projet |
| :--- | :--- |
| **Hosting** | Hébergement statique rapide (CDN global), SSL inclus automatiquement. |
| **Authentication** | Gestion des utilisateurs (Email/Password). Sécurise l'accès aux fonctions d'admin. |
| **Firestore** | Base de données NoSQL temps réel. Stocke les projets (Titre, Image, Desc...). |

---

## Design System & CSS

L'interface est conçue "From Scratch" (sans Bootstrap) pour une performance maximale et un design unique.

### Points Clés
- **CSS Grid** : Utilisé pour la galerie de projets (`projects-grid`) afin de gérer l'alignement responsive (1 à 3 colonnes).
- **Flexbox** : Utilisé pour les mises en page internes (cartes, navbar).
- **Variables CSS** : Gestion centralisée des couleurs et espacements.
- **Responsive** :
  - Mobile (< 768px) : Menu burger, colonnes empilées.
  - Desktop (> 1024px) : Mises en page complexes, sidebars.

---

## Logique Applicative (JavaScript)

### `projects-manager-v2.js`
C'est le script le plus complexe. Il gère deux états :
1.  **Mode Visiteur** :
    - Récupère les projets depuis Firestore (`getDocs`).
    - Génère le HTML des cartes (`createProjectCard`).
    - Injecte les cartes dans la grille.
2.  **Mode Admin** (si connecté) :
    - Affiche les boutons "Modifier" et "Supprimer" sur chaque carte.
    - Affiche le bouton "Ajouter un projet".
    - Gère la modale de formulaire (Création/Édition).
    - Gère l'upload d'image (conversion en Base64 pour stockage direct).

### `auth.js`
- Surveille l'état de l'authentification (`onAuthStateChanged`).
- Si connecté : Affiche le bouton "Déconnexion" et active le mode admin des scripts.
- Si déconnecté : Redirige vers le login si on essaie d'accéder à l'admin.

---

## Modèle de Données (Firestore)

Les données sont stockées dans une collection nommée **`projects`**.

### Schéma d'un document "Project" :

| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | String | ID unique généré par Firestore. |
| `title` | String | Titre du projet. |
| `category` | String | Ex: "Web | 2024". Sert aussi au tri. |
| `description`| String | Texte court de présentation. |
| `image` | Base64 | Image encodée en chaîne de caractères (stockage direct). |
| `link` | String | URL vers le site ou le GitHub. |

---

## Workflow de Déploiement

Le site utilise le **Firebase CLI** pour les mises à jour.

1.  **Développement** : Test local via `python -m http.server` ou `firebase emulators:start`.
2.  **Build** : Aucune étape de build nécessaire (Code natif).
3.  **Déploiement** :
    ```bash
    firebase deploy
    ```
    Cette commande :
    - Upload les fichiers du dossier `public` (configuré comme `.` racine).
    - Met à jour les règles de sécurité Firestore (si modifiées).
    - Vide le cache du CDN pour que les changements soient immédiats.
