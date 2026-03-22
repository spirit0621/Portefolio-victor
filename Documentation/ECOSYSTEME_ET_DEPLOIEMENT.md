# Écosystème et Déploiement : Github, Firebase et Google Search

Ce document a pour but de vous expliquer simplement le rôle de chaque outil que vous utilisez dans la création et la publication de votre portfolio, ainsi que les liens qui existent entre eux.

---

## 1. Que sont ces outils et à quoi servent-ils ?

### 🐙 **GitHub** : "Le coffre-fort et le chef de projet de votre code"
C'est une plateforme en ligne (basée sur le système `Git`) qui permet de stocker votre code source. 
* **À quoi ça sert ?** Il sauvegarde l'historique de toutes vos modifications. Si vous vous trompez ou si votre ordinateur casse, votre code est sauvé.
* **Le plus :** Il permet le travail en équipe et offre une "vitrine" de votre code aux recruteurs, montrant comment vous programmez.

### 🔥 **Firebase (Hosting)** : "Le serveur qui rend votre site public"
C'est un ensemble de services fournis par Google pour aider les développeurs. Vous utilisez spécifiquement **Firebase Hosting**.
* **À quoi ça sert ?** C'est un hébergeur web. Il prend vos fichiers (HTML, CSS, JS) et les stocke sur des serveurs reliés à Internet 24h/24. 
* **Le plus :** Il vous fournit une URL (ex: `https://votre-portfolio.web.app`) gratuite, sécurisée (HTTPS) et très rapide.

### 🔍 **Google Search (et Search Console)** : "L'annuaire d'Internet"
Google Search est le moteur de recherche. La **Google Search Console** est l'outil destiné aux créateurs de sites pour dialoguer avec ce moteur.
* **À quoi ça sert ?** La Search Console vous permet de dire à Google : *"Eh, mon site existe à telle adresse, venez le visiter pour le proposer dans vos résultats !"*.
* **Le plus :** Elle signale les erreurs (les pages introuvables, les problèmes d'affichage sur mobile) pour vous aider à améliorer le "référencement" de votre site (SEO).

---

## 2. La relation entre ces 3 outils

Ces trois outils interviennent à trois étapes temporelles différentes du cycle de vie de votre site :

1. **La création (L'usine) -> GITHUB**
   Vous écrivez le code sur votre ordinateur (`Visual Studio Code`). Dès que vous finissez une grosse étape, vous synchronisez ce code sur **GitHub**. 
2. **Le déploiement (Le kiosque) -> FIREBASE**
   Lorsque que le site est prêt à être vu par tout le monde, vous demandez à l'ordinateur de le transférer sur **Firebase** (avec la commande `firebase deploy`). Firebase rend le site physique accessible par quiconque connaît le lien.
3. **La visibilité (Le panneau publicitaire) -> GOOGLE SEARCH**
   Votre site est en ligne sur Firebase, mais personne ne le connaît. Vous utilisez **Google Search Console** pour vérifier que les "robots de Google" peuvent atterrir sur la page mise en ligne par Firebase, vérifier qu'elle est fiable, et enfin l'afficher aux internautes qui font une recherche Google.

*(Note : Il est même possible de lier directement GitHub à Firebase via un outil appelé "GitHub Actions". Cela automatise les choses : dès qu'on envoie le code sur GitHub, GitHub l'envoie automatiquement à Firebase pour mettre le site à jour, sans que vous n'ayez à faire un `firebase deploy`).*

---

## 3. Comment affiche-t-on le site sur internet concrètement ?

Pour qu'un site web apparaisse sur internet, voici les étapes techniques réelles, très simplifiées :

### A. Le développement (Localement)
* Vous possédez un dossier contenant du HTML, CSS, JavaScript et des images.
* Si le dossier est juste sur votre PC, sa vraie adresse est `C:\Users\...\Portefolio`. Or personne n'a accès à votre disque dur.

### B. L'hébergement (Hosting)
* On loue ou l'on utilise gratuitement un **Serveur** (un gros ordinateur chez Google, OVH, Amazon, etc. qui ne s'éteint jamais).
* Avec Firebase, quand on tape la commande `firebase deploy` dans le terminal, celui-ci va zipper vos fichiers et les envoyer par Internet directement sur le serveur Firebase. 

### C. La définition de l'URL (Le nom de domaine)
* Une fois les fichiers reçus, Firebase crée une configuration. Il relie ces fichiers à un "nom de domaine gratuit" qu'il vous attribue : `https://victor-alves-fernandes-portfolio.web.app/`.
* Le rôle du navigateur (Chrome, Safari, Edge) de vos utilisateurs sera de taper cette URL, ce qui va envoyer une requête HTTP au serveur Firebase.
* Le serveur Firebase répond : "OK, voici le fichier `index.html`", et l'affiche sur l'ordinateur du visiteur.

### D. La dernière étape : Apparaitre dans la recherche 
Maintenant que le site possède une URL publique, on passe par l'outil Google Search Console pour indexer cette adresse, afin de ne plus dépendre de ceux qui écrivent l'URL parfaite, mais aussi d'attirer ceux qui tapent simplement vos nom/prénom dans la barre de recherche.
