import http from "node:http";
import express, {
	type Router,
	type Express,
	type Request,
	type Response,
} from "express";
import HomePageRouter from "../router/homepage_routeur.js";
import genderRouter from "../router/gender_routeur.js";
import NotFoundRouter from "../router/not_found_router.js";
import movieRouter from "../router/movies_routeur.js";
import userRouter from "../router/users_routeur.js";
import cors from "cors";
import commentsRouter from "../router/comment_routeur.js";
import favoriteRouter from "../router/favorites_routeur.js";
import securityRouter from "../router/security_router.js";
import roleRouter from "../router/role_routeur.js";
import usersRouter from "../router/users_routeur.js";

class Server {
	// instancier une application Express
	private app: Express = express();
	// définir un routeur pour Express
	private router: Router = express.Router();
	constructor() {
		// gérer les requêtes multi-origine: cors = Cross Origin Ressource Sharing
		this.app.use(cors());

		//accéder au contenu d'une requête HTTP -propriété body - au format JSON
		this.app.use(express.json());

		//Définir le dossier public
		this.app.use(express.static(process.env.ASSETS_DIR as string));

		// lier l'application Express au routeur
		this.app.use(this.router);
		// définir la liste des routeurs
		this.getRoutersList();
	}
	// liste des routeurs
	private getRoutersList = (): void => {
		// création de la route d'accueil en GET
		this.router.use("/", new HomePageRouter().getRoutes());
		this.router.use("/gender", new genderRouter().getRoutes());
		this.router.use("/movie", new movieRouter().getRoutes());
		this.router.use("/user", new usersRouter().getRoutes());	
		this.router.use("/comments", new commentsRouter().getRoutes());
		this.router.use("/favorite", new favoriteRouter().getRoutes());
		this.router.use("/role", new roleRouter().getRoutes());
		this.router.use("/", new securityRouter().getRoutes());

		// Routeur des routes inexistantes doit être OBLIGATOIREMENT en dernière position
		this.router.use("*", new NotFoundRouter().getRoutes());
	};
	// créer un serveur Node.js / Express
	public createServer = (): http.Server => {
		return http.createServer(this.app);
	};
}
export default Server;
