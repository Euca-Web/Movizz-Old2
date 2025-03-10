# Movizz

## 📋 Présentation du projet

Movizz est une bibliothèque de films inspirée de Pathé Home et MyMovix. Cette plateforme permet aux utilisateurs de découvrir, noter et commenter des films.

Le site sera initialement disponible en français, avec une version anglophone prévue dans les 6 mois à venir.

### Fonctionnalités principales

- **Utilisateurs** : Consultation de films, ajout de commentaires et de notes
- **Administrateurs** : Gestion du catalogue de films, modération des commentaires, supervision de l'UX/UI

### Analyse concurrentielle

#### PathéHome
**Avantages** :
- Large choix de films récents et variés
- Interface fluide, catégories et genres bien organisés

**Inconvénients** :
- Nécessite un abonnement pour accéder à certaines fonctionnalités
- Offre limitée pour les films plus anciens

#### Allociné
**Avantages** :
- Informations détaillées sur les films, acteurs et critiques
- Très bonne gestion des avis utilisateurs et des classements

**Inconvénients** :
- Publicité envahissante sur certaines pages
- Le design peut sembler saturé pour certains utilisateurs

#### MyMovix
**Avantages** :
- Large bibliothèque de films, y compris des classiques
- Accès à plusieurs genres et nouveautés

**Inconvénients** :
- Interface parfois difficile à naviguer
- Risque de contenus non officiels, ce qui peut être préoccupant

## 🚀 Installation et configuration

### Prérequis

- [Node.js](https://nodejs.org/) (v23 ou supérieur)
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-dépôt>
   cd Movizz
   ```

2. **Configuration de l'environnement avec Docker**
   ```bash
   # Démarrer les services (MySQL, MongoDB, client, serveur)
   docker compose -f docker-compose.dev.yaml up -d
   ```

3. **Configuration du serveur (backend)**
   ```bash
   # Accéder au conteneur du serveur
   docker exec -it movizz-server-1 bash
   
   # Dans le conteneur
   cd /app
   npm install
   npm run dev
   ```

4. **Configuration du client (frontend)**
   ```bash
   # Accéder au conteneur du client
   docker exec -it movizz-client-1 bash
   
   # Dans le conteneur
   cd /app
   npm install
   npm run dev
   ```

## 🏗️ Architecture du projet

### Structure des dossiers

```
Movizz/
├── code/
│   ├── client/            # Frontend React + TypeScript + Vite
│   │   ├── src/           # Code source du client
│   │   └── ...
│   └── server/            # Backend Express + TypeScript
│       ├── src/           # Code source du serveur
│       │   ├── controller/  # Contrôleurs
│       │   ├── model/       # Modèles de données
│       │   ├── repository/  # Accès aux données
│       │   ├── router/      # Routeurs API
│       │   └── service/     # Services métier
│       ├── merise/        # Modèles de données (MCD, MLD)
│       ├── mongodb/       # Scripts MongoDB
│       └── mysql/         # Scripts MySQL
├── docker-compose.dev.yaml  # Configuration Docker pour le développement
├── mongodb-data/          # Données persistantes MongoDB
└── mysql-data/            # Données persistantes MySQL
```

### Technologies utilisées

#### Frontend
- React 18
- TypeScript
- Vite
- React Router

#### Backend
- Node.js
- Express
- TypeScript
- MySQL
- MongoDB

## 🔧 Utilisation

### Démarrage des services

```bash
# Démarrer tous les services
docker compose -f docker-compose.dev.yaml up -d

# Arrêter tous les services
docker compose -f docker-compose.dev.yaml down
```

### Accès aux applications

- **Frontend** : http://localhost:5173
- **API Backend** : http://localhost:3000
- **MySQL** : localhost:3306 (user: root, password: root)
- **MongoDB** : localhost:27017 (user: root, password: root)

## 🧪 Développement

### Scripts disponibles

#### Client (Frontend)
```bash
# Démarrer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Linter
npm run lint

# Prévisualiser la version de production
npm run preview
```

#### Serveur (Backend)
```bash
# Compiler le TypeScript
npm run compile

# Compiler en mode watch
npm run build

# Démarrer le serveur de développement
npm run dev

# Démarrer le serveur en production
npm run start
```

## 📝 Contribution

Pour contribuer au projet, veuillez suivre les étapes suivantes :

1. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nom-de-la-fonctionnalité`)
2. Commiter vos changements (`git commit -m 'Ajout de fonctionnalité X'`)
3. Pousser la branche (`git push origin feature/nom-de-la-fonctionnalité`)
4. Ouvrir une Pull Request

