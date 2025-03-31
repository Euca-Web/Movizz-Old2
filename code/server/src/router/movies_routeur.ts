import express, { type Response, type Request } from "express";
import moviesController from "../controller/movies_controller.js";
import multer from "multer";
import moviesPosterMiddleware from "../middleware/movies_poster_middleware.js";
import AuthMiddleware from "../middleware/authorization_middleware.js";

class moviesRouter {
	private routeur = express.Router();
	private upload = multer({ dest: `${process.env.ASSETS_DIR}/img` });

	public getRoutes = () => {
		this.routeur.get("/", new moviesController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:movie_id", new moviesController().one);
		//Créer un enregistrement
		this.routeur.post(
			"/",
			new AuthMiddleware().check(["2"]),
			this.upload.any(),
			new moviesPosterMiddleware().process,
			new moviesController().insert,
		);
		//Modifier un enregistrement
		this.routeur.put(
			"/",
			this.upload.any(),
			new moviesPosterMiddleware().process,
			new moviesController().update,
		);
		//Supprimer un enregistrement
		this.routeur.delete(
			"/",
			this.upload.any(),
			new moviesPosterMiddleware().process,
			new moviesController().delete,
		);

		return this.routeur;
	};
}

export default moviesRouter;
