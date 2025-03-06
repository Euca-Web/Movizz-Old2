import express, { type Response, type Request } from "express";
import favoriteController from "../controller/favorites_controller.js";

class favoriteRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new favoriteController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:favorite_id", new favoriteController().one)
		
		return this.routeur;
	};
}

export default favoriteRouter;
