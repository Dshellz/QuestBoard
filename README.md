# QuestBoard 🔅

Une application React pour gérer des quêtes quotidiennes avec Firebase et une barre de progression. À chaque quête validée, l'utilisateur gagne 10 points.

![Vidéo de présentation](QuestBoard/src/assets/presentation.gif)

## Fonctionnalités

- Ajouter et supprimer des quêtes
- Cocher les quêtes comme accomplies
- Gagner 10 points par quête validée
- Suivi en temps réel via Firebase (Realtime Database)
- Barre de progression animée (objectif : 70 points quotidien)

---

## Installation ⚙

1. **Cloner le projet**

`git clone https://github.com/ton-utilisateur/QuestBoard.git`
`cd QuestBoard`

2. **Installer les dépendances**
   `npm install`

3. **Lancer le serveur**
   `npm run dev`

**(en cas d'erreur au lancement) ->** `npm install @vitejs/plugin-react --save-dev`

## Configurer Firebase 📡

1. **Crée un projet Firebase RTDB**
2. **Copier les infos de configuration (`apiKey`, `authDomain`, etc)**
3. **Ouvrer le fichier `firebase.ts` dans `src/` et ajouter les infos de configuration :**

**dshellz**
