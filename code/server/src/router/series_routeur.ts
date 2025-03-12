import express, { type Response, type Request } from "express";
import seriesController from "../controller/series_controller.js";

class seriesRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new seriesController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:series_id", new seriesController().one)
		//Créer un enregistrement
		this.routeur.post("/", new seriesController().insert);
		//Modifier un enregistrement
		this.routeur.put("/", new seriesController().update);
		//Supprimer un enregistrement
		this.routeur.delete("/", new seriesController().delete);
		
		return this.routeur;
	};
}

export default seriesRouter;
