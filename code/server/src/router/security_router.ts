import express, { type Response, type Request } from "express";
import securityController from "../controller/security_controller.js";

class securityRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.post("/register", new securityController().register);
		return this.routeur;
	};
}

export default securityRouter;
