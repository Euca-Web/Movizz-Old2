import express, { type Response, type Request } from "express";
import commentsController from "../controller/comments_controller.js";

class commentsRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new commentsController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:comment_id", new commentsController().one)
		
		return this.routeur;
	};
}

export default commentsRouter;
