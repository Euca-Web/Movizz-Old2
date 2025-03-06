import express, { type Response, type Request } from "express";
import HomePageController from "../controller/homepage_controller.js";

class HomePageRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new HomePageController().index);
		return this.routeur;
	};
}

export default HomePageRouter;
