import type { Request, Response } from "express";
import securityRepository from "../repository/security_repository.js";
import { log } from "node:console";
import  argon2  from "argon2";

class securityController {
	public register = async (req: Request, res: Response) => {
		//hasher le mot de passe
		await argon2.hash(req.body.password_hash);

		// récuperer tous les enregistrements
		const results = await new securityRepository().register({
			...req.body,
			password_hash: await argon2.hash(req.body.password_hash)
		});

		// console.log(req.body);

		// Si la requête SQL renvoie une erreur
		if(results instanceof Error){
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "error" : results,
			});
			// bloquer la suite
			return
		}

		res.status(201).json({
			status: 201,
			message: "User Created",
			data: results
		});
		return;
	};
}
export default securityController;
