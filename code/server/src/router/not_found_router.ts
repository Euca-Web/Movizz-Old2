import express, { type Response, type Request } from "express";
import NotFoundController from "../controller/not_found_controller.js";

class NotFoundRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new NotFoundController().index);
		return this.routeur;
	};
}

export default NotFoundRouter;
