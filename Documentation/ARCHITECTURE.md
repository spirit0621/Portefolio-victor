# Architecture Détaillée - Portfolio

## Table des matières

1. [Architecture Globale](#architecture-globale)
2. [Structure des Fichiers](#structure-des-fichiers)
3. [Design System & CSS](#design-system--css)
4. [Guide des Pages](#guide-des-pages)
5. [JavaScript & Interactivité](#javascript--interactivité)
6. [Flux de Données & Firebase](#flux-de-données--firebase)

---

## Architecture Globale

### Diagramme de flux (Firebase Hosting)

```text
[Client / Navigateur]  <-- HTTPS / CDN -->  [Firebase Hosting]
       │
       ▼
   [HTML5 Core]
       ├── [CSS3 Styling] (styles.css + AOS + FontAwesome)
       │      ├── Variables (:root)
       │      ├── Responsive Grid
       │      └── Animations
       │
       └── [JavaScript] (nav.js, animations.js, auth.js)
              ├── DOM Manipulation
              ├── Intersection Observer (AOS)
              └── Firebase SDK (Auth, Firestore)
```

### Concepts Clés

- **Hébergement CDN** : Firebase Hosting distribue le contenu statique globalement pour une latence minimale.
- **Single Page Feel** : Bien que multi-pages, l'utilisation de `cleanUrls` et de rewrites donne une impression d'application fluide.
- **Sécurité** : L'accès à l'administration est verrouillé par Firebase Authentication.

---

## Structure des Fichiers

```text
Portefolio/
├── 📄 **pages/** (Le contenu HTML)
│   ├── `index.html` : L'accueil principal.
│   ├── `presentation.html` : Profil complet.
│   ├── `projects.html` : Galerie de projets avec filtres.
│   ├── `bts-sio.html` : Section diplôme BTS SIO.
│   ├── `monitoring.html` : Veille technologique.
│   ├── `contact.html` : Formulaire de contact.
│   └── `admin-login.html` : Portail de connexion admin.
│
├── 🎨 **styles/** (Le design)
│   └── `styles.css` : Feuille de style principale.
│
├── 🔧 **scripts/** (La logique)
│   ├── `nav.js` : Injection dynamique Navbar/Footer.
│   ├── `animations.js` : Logique d'animation spécifique.
│   ├── `auth.js` : Gestion de l'authentification Firebase.
│   └── `firebase-config.js` : Iniitialisation Firebase.
│
├── ⚙️ **Configuration Racine**
│   ├── `firebase.json` : Règles de rewrites, redirects, headers.
│   ├── `.firebaserc` : Alias des projets Firebase.
│   ├── `sitemap.xml` : Plan du site pour SEO.
│   └── `index.html` : Redirection racine vers pages/index.html.
│
└── 🖼️ **assets/Photo/** (Médias)
    └── Images optimisées pour le web.
```

---

## Design System & CSS

Le fichier `styles.css` est le cœur visuel du projet.

### Bibliothèques Externes (Intégrées via CDN)
- **FontAwesome** : Icônes (v6.4.0).
- **AOS (Animate On Scroll)** : Animations d'apparition au défilement.

### Variables Globales
```css
:root {
  --primary: #2c3e50;
  --secondary: #3498db;
  --accent: #e74c3c;
  --light: #ecf0f1;
  --dark: #1a1a1a;
}
```

---

## Guide des Pages

### Routage (Firebase Rewrites)
Le fichier `firebase.json` gère les "belles URLs".
- `/projets` -> `pages/projects.html`
- `/admin` -> `pages/admin-login.html`
- `/login` -> `pages/admin-login.html`
- `/bts-sio` -> `pages/bts-sio.html`

### Pages Admin
- **`admin-login.html`** : Formulaire de connexion simple. Utilise `auth.js` pour communiquer avec Firebase Auth.
- **Tableau de bord** : Une fois connecté, l'utilisateur voit apparaître les boutons d'édition (CRUD) sur les pages (Projets, Veille).

---

## JavaScript & Interactivité

Le projet utilise **ES6 Modules** pour une meilleure organisation.

### `nav.js`
Injecte le header et le footer dans des placeholders (`#header-placeholder`, `#footer-placeholder`) pour éviter la duplication de code HTML.

### `auth.js`
Gère l'état de connexion :
- `onAuthStateChanged` : Surveille si l'utilisateur est connecté.
- Modifie le DOM pour afficher/masquer les boutons "Admin", "Logout", "Edit".

---

## Flux de Données & Firebase

1.  **Hébergement** : Tout le contenu est servi par Firebase Hosting.
2.  **Authentification** : `auth.js` contacte Firebase Auth lors du login.
3.  **Base de Données (Projets dynamiques)** : Les scripts chargent les données depuis Firestore (si activé) pour afficher les projets et la veille technologique, permettant une mise à jour sans redéploiement du code.
