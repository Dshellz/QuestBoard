#  QuestBoard
Une application React pour gérer des quêtes quotidiennes avec Firebase et une barre de progression. À chaque quête validée, l'utilisateur gagne 10 points.

##  Fonctionnalités

- Ajouter et supprimer des quêtes
- Cocher les quêtes comme accomplies
- Gagner 10 points par quête validée
- Suivi en temps réel via Firebase (Realtime Database)
- Barre de progression animée (objectif : 70 points)

---

##  Installation

1. **Cloner le projet**

``git clone https://github.com/ton-utilisateur/QuestBoard.git``
``cd QuestBoard``

2. **Installer les dépendances** 
``npm install``

3. **Lancer le serveur**
``npm run dev``

**(en cas d'erreur au lancement) ->** `npm install @vitejs/plugin-react --save-dev`

## Configurer Firebase

1. **Crée un projet Firebase RTDB** 
2. **Copier les infos de configuration (`apiKey`, `authDomain`, etc)**
3. **Créer un fichier `firebase.ts` dans `src/` et ajouter la configuration :**
`// src/firebase.ts`
`import { initializeApp } from "firebase/app";`
`import { getDatabase } from "firebase/database";`

`const firebaseConfig = {`
  `apiKey: "API_KEY",`
  `authDomain: "AUTH_DOMAIN",`
  `databaseURL: "DATABASE_URL",`
  `projectId: "PROJECT_ID",`
  `storageBucket: "STORAGE_BUCKET",`
  `messagingSenderId: "MESSAGING_SENDER_ID",`
  `appId: "APP_ID"`
`};`

`const app = initializeApp(firebaseConfig);`
`export const db = getDatabase(app);`

#dshellz
