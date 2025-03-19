import express, { type Response, type Request } from "express";
import usersController from "../controller/users_controller.js";

class roleRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new usersController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:role_id", new usersController().one)
		
		return this.routeur;
	};
}

export default roleRouter;
