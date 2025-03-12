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

### Architecture MVC et fonctionnement des composants

Le projet Movizz suit une architecture MVC (Modèle-Vue-Contrôleur) adaptée avec une séparation claire des responsabilités :

#### 1. **Model (Modèle)**
Les modèles définissent la structure des données manipulées par l'application.

```typescript
// Exemple de modèle (movies.ts)
type movies = {
    movie_id: number;
    title: string;
    release_year: Date;
    duration: string;
    summary: string;
    poster: string;
    teaser: string;
    gender_ids: string;
    genders: gender[];
};
```

- **Rôle** : Définir les types et interfaces TypeScript qui représentent les entités métier
- **Fonctionnement** : Chaque modèle correspond à une table de la base de données ou à une entité métier
- **Avantages** : Typage fort grâce à TypeScript, facilitant la détection d'erreurs à la compilation

#### 2. **Repository**
Les repositories encapsulent la logique d'accès aux données et les opérations CRUD.

```typescript
// Exemple de repository (extrait de movies_repository.ts)
public selectAll = async (): Promise<movies[] | unknown> => {
    const connection = await new MySqlService().connect();
    const sql = `SELECT ... FROM ${this.table} ...`;
    
    try {
        const [results] = await connection.execute(sql);
        // Traitement des résultats...
        return results;
    } catch (error) {
        return error;
    }
};
```

- **Rôle** : Gérer toutes les interactions avec la base de données
- **Fonctionnement** : 
  - Établit la connexion à la base de données
  - Exécute les requêtes SQL
  - Transforme les résultats en objets métier typés
  - Gère les relations entre les entités (ex: films et genres)
- **Méthodes principales** : 
  - `selectAll()` : Récupère tous les enregistrements
  - `selectOne()` : Récupère un enregistrement par son ID
  - `insert()` : Crée un nouvel enregistrement
  - `update()` : Met à jour un enregistrement existant
  - `delete()` : Supprime un enregistrement

#### 3. **Controller (Contrôleur)**
Les contrôleurs gèrent les requêtes HTTP et orchestrent les interactions entre les repositories et les réponses.

```typescript
// Exemple de contrôleur (extrait de movies_controller.ts)
public index = async (req: Request, res: Response) => {
    const result = await new moviesRepository().selectAll();
    if (result instanceof Error) {
        res.status(400).json({
            status: 400,
            message: process.env.NODE_ENV === "prod" ? "error" : result,
            data: result
        });
        return;
    }

    res.status(200).json({
        status: 200,
        message: "Ok",
        data: result
    });
};
```

- **Rôle** : Traiter les requêtes HTTP et renvoyer les réponses appropriées
- **Fonctionnement** :
  - Reçoit les requêtes HTTP via les routes
  - Extrait et valide les données de la requête
  - Appelle les méthodes appropriées du repository
  - Formate et renvoie la réponse au client
- **Méthodes principales** :
  - `index()` : Liste tous les éléments
  - `one()` : Récupère un élément spécifique
  - `insert()` : Crée un nouvel élément
  - `update()` : Met à jour un élément existant
  - `delete()` : Supprime un élément

#### 4. **Router**
Les routeurs définissent les points d'entrée de l'API et associent les URL aux méthodes des contrôleurs.

```typescript
// Exemple de routeur (extrait de movies_routeur.ts)
public getRoutes = () => {
    this.routeur.get("/", new moviesController().index);
    this.routeur.get("/:movie_id", new moviesController().one);
    this.routeur.post("/", new moviesController().insert);
    this.routeur.put("/", new moviesController().update);
    
    return this.routeur;
};
```

- **Rôle** : Définir les routes de l'API et les associer aux méthodes des contrôleurs
- **Fonctionnement** :
  - Crée un routeur Express
  - Définit les endpoints HTTP (GET, POST, PUT, DELETE)
  - Associe chaque endpoint à une méthode du contrôleur correspondant
  - Peut inclure des middlewares pour l'authentification, la validation, etc.
- **Méthodes HTTP** :
  - `GET /` : Liste tous les éléments (index)
  - `GET /:id` : Récupère un élément spécifique (one)
  - `POST /` : Crée un nouvel élément (insert)
  - `PUT /` : Met à jour un élément existant (update)
  - `DELETE /:id` : Supprime un élément (delete)

### Flux de données dans l'application

1. **Requête HTTP** → Le client envoie une requête à un endpoint de l'API
2. **Router** → Reçoit la requête et la dirige vers la méthode appropriée du contrôleur
3. **Controller** → Traite la requête et appelle la méthode appropriée du repository
4. **Repository** → Exécute les opérations de base de données et renvoie les résultats
5. **Controller** → Formate les résultats et renvoie la réponse HTTP au client

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
- MySQL (données structurées)
- MongoDB (données non structurées)

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

### Endpoints API principaux

- **GET /movies** : Liste tous les films
- **GET /movies/:id** : Récupère les détails d'un film spécifique
- **POST /movies** : Ajoute un nouveau film
- **PUT /movies** : Met à jour un film existant
- **GET /series** : Liste toutes les séries
- **GET /series/:id** : Récupère les détails d'une série spécifique

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

### Bonnes pratiques de développement

1. **Typage fort** : Utiliser TypeScript pour définir des interfaces claires pour tous les modèles
2. **Architecture modulaire** : Respecter la séparation des responsabilités (MVC)
3. **Gestion des erreurs** : Implémenter une gestion cohérente des erreurs dans les repositories et controllers
4. **Variables d'environnement** : Utiliser les fichiers `.env` pour configurer l'application selon l'environnement

## 📝 Contribution

Pour contribuer au projet, veuillez suivre les étapes suivantes :

1. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nom-de-la-fonctionnalité`)
2. Commiter vos changements (`git commit -m 'Ajout de fonctionnalité X'`)
3. Pousser la branche (`git push origin feature/nom-de-la-fonctionnalité`)
4. Ouvrir une Pull Request

