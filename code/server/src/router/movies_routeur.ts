import express, { type Response, type Request } from "express";
import moviesController from "../controller/movies_controller.js";

class moviesRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new moviesController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:movie_id", new moviesController().one);
		//Créer un enregistrement
		this.routeur.post("/", new moviesController().insert);
		//Modifier un enregistrement
		this.routeur.put("/", new moviesController().update);
		//Supprimer un enregistrement
		this.routeur.delete("/", new moviesController().delete);
		
		return this.routeur;
	};
}

export default moviesRouter;
