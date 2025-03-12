console.log('ça marche le S tié un bon');

import Server from "./core/server.js";
// Démarrer le serv
const server: Server = new Server();
// process.env permet d'accéder aux variables d'environnement
server.createServer().listen(process.env.PORT);
// Ordre : Model/Repo/Controller/Router
