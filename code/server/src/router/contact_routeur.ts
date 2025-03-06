import express, { type Response, type Request } from "express";
import contactController from "../controller/contact_controller.js";

class contactRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new contactController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:contact_id", new contactController().index);

		return this.routeur;
	};
}

export default contactRouter;
