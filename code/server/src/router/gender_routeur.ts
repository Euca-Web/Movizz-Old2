import express, { type Response, type Request } from "express";
import genderController from "../controller/gender_controller.js";

class genderRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new genderController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:gender_id", new genderController().one)
		
		return this.routeur;
	};
}

export default genderRouter;
