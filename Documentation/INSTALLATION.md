# Guide d'Installation et Déploiement

## Table des matières
1. [Prérequis](#prérequis)
2. [Installation Locale](#installation-locale)
3. [Déploiement Firebase](#déploiement-firebase)
4. [Workflow de Développement](#workflow-de-développement)
5. [Dépannage (Troubleshooting)](#dépannage-troubleshooting)

---

## Prérequis

- **Node.js** (v16 ou supérieur) : Nécessaire pour les outils Firebase.
- **Git** : Pour cloner le projet.
- **Compte Google** : Pour accéder à la console Firebase.
- **Éditeur** : VS Code recommandé.

---

## Installation Locale

### 1. Cloner le projet
```bash
git clone https://github.com/spirit0621/Portefolio.git
cd Portefolio
```

### 2. Installer la CLI Firebase
Ouvrez un terminal et installez les outils en global :
```bash
npm install -g firebase-tools
```

### 3. Connexion
Connectez l'outil à votre compte Google :
```bash
firebase login
```
*(Une fenêtre de navigateur s'ouvrira pour autoriser l'accès)*

### 4. Lancer le serveur de développement
Pour tester le site (y compris les rewrites et clean URLs) :
```bash
firebase serve
```
Le site sera accessible sur `http://localhost:5000`.

---

## Déploiement Firebase

Le site est hébergé sur **Firebase Hosting**.

### Commande de déploiement
Pour mettre en ligne vos modifications sur la production :
```bash
firebase deploy --only hosting
```

Cette commande va :
1.  Uploader les fichiers modifiés.
2.  Mettre à jour la configuration (rewrites, redirects).
3.  Vider le cache CDN.

L'URL de production est : `https://victor-alves-fernandes-portfolio.web.app`

---

## Workflow de Développement

1.  **Code** : Modifiez vos fichiers HTML/CSS/JS.
2.  **Test** : Vérifiez le rendu avec `firebase serve`.
3.  **Commit** : Sauvegardez vos changements avec Git (`git add .`, `git commit`).
4.  **Deploy** : Mettez en ligne avec `firebase deploy`.

---

## Dépannage (Troubleshooting)

### Erreur "Command not found: firebase"
- **Cause** : Node.js ou firebase-tools mal installé.
- **Solution** : Vérifiez l'installation de Node (`node -v`) et réinstallez la CLI.

### Erreur 404 sur une page (/admin, /bts-sio)
- **Cause** : Configuration `firebase.json` incorrecte ou non déployée.
- **Solution** : Vérifiez que les "rewrites" pointent vers le bon fichier dans `pages/`. Relancez `firebase deploy`.

### Problème de droits (Permission Denied)
- **Cause** : Vous n'êtes pas connecté au bon compte.
- **Solution** : Lancez `firebase logout` puis `firebase login`.

### Modifications non visibles
- **Cause** : Cache navigateur.
- **Solution** : Testez en navigation privée ou forcez le rafraîchissement (`Ctrl + Shift + R`).
