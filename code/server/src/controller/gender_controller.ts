import type { Request, Response } from "express";
import genderRepository from "../repository/gender_repository.js";

class genderController {
	public index = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const result = await new genderRepository().selectAll();
		// Si la requête SQL renvoie une erreur
		if(result instanceof Error){
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "error" : result,
				data: result
			});
			// bloquer la suite
			return
		}

		res.status(200).json({
			status: 200,
			message: "Ok",
			data: result
		});
	};
	public one = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		// req.params permet de récupérer les variables de route
		const result = await new genderRepository().selectOne(req.params);
		// Si la requête SQL renvoie une erreur
		if(result instanceof Error){
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "error" : result,
				data: result
			});
			// bloquer la suite
			return
		}

		res.status(200).json({
			status: 200,
			message: "Ok",
			data: result
		});
	};
}
export default genderController;
