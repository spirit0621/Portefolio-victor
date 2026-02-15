# Guide d'Installation et Déploiement

## Table des matières
1. [Prérequis](#prérequis)
2. [Installation Locale](#installation-locale)
3. [Déploiement GitHub Pages](#déploiement-github-pages)
4. [Workflow de Développement](#workflow-de-développement)
5. [Dépannage (Troubleshooting)](#dépannage-troubleshooting)

---

## Prérequis

- **Système** : Windows, macOS ou Linux.
- **Outils** :
    - [Git](https://git-scm.com/) (pour le versioning).
    - [Python](https://www.python.org/) (recommandé pour le serveur local) OU Node.js.
    - Un éditeur de code (ex: VS Code).
- **Compte** : GitHub (pour l'hébergement).

---

## Installation Locale

### 1. Cloner le projet
Ouvrez votre terminal et exécutez :
```bash
git clone https://github.com/spirit0621/Portefolio.git
cd Portefolio
```

### 2. Lancer le serveur
Pour tester le site localement, il faut un serveur HTTP (pour que les chemins relatifs et JS fonctionnent correctement).

**Option A (Python 3 - Recommandé)**
```bash
python -m http.server 8000
```

**Option B (Node.js)**
```bash
npx http-server -p 8000
```

### 3. Accéder au site
Ouvrez votre navigateur à l'adresse : `http://localhost:8000`

---

## Déploiement GitHub Pages

Le site est configuré pour se déployer automatiquement via GitHub Pages.

### Configuration Initiale
1.  Allez sur votre dépôt GitHub > **Settings**.
2.  Section **Pages** (menu gauche).
3.  **Source** : `Deploy from a branch`.
4.  **Branch** : `main` / dossier `/ (root)`.
5.  Cliquez sur **Save**.

### Mise à jour du site
Chaque `git push` sur la branche `main` déclenche un redéploiement.
```bash
git add .
git commit -m "Description de vos changements"
git push origin main
```
*Le site sera mis à jour en 1 à 2 minutes.*

---

## Workflow de Développement

1.  **Modification** : Éditez vos fichiers HTML/CSS localement.
2.  **Test** : Rafraîchissez `http://localhost:8000` pour voir les changements.
3.  **Validation** : Vérifiez que la navigation et les images fonctionnent.
4.  **Déploiement** : Poussez vos changements sur GitHub.

---

## Dépannage (Troubleshooting)

### Images ne s'affichent pas
- **Cause** : Chemin incorrect ou sensibilité à la casse (Case Sensitivity).
- **Solution** : Vérifiez que le nom du fichier dans le HTML correspond *exactement* au nom du fichier dans le dossier `Photo/` (extensions incluses .png/.jpg).
- **Astuce** : Évitez les espaces et accents dans les noms de fichiers images.

### Styles CSS non appliqués
- **Cause** : Cache du navigateur.
- **Solution** : Forcez le rafraîchissement avec `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac).

### Navigation inactive (pas de surlignage)
- **Cause** : Script `nav.js` non chargé ou chemin URL différent.
- **Solution** : Vérifiez la console (F12) pour les erreurs JS. Assurez-vous d'être sur la page correspondante au lien `href`.

### Erreur 404 sur GitHub Pages
- **Cause** : Délai de déploiement ou chemin incorrect.
- **Solution** : Attendez quelques minutes après le push. Vérifiez que `index.html` est bien à la racine du dépôt.
