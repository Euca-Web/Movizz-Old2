import type { Request, Response } from "express";
import securityRepository from "../repository/security_repository.js";
import { log } from "node:console";
import argon2 from "argon2";
import users_repository from "../repository/users_repository.js";
import type users from "../model/users.js";

class securityController {
	public register = async (req: Request, res: Response) => {
		//hasher le mot de passe
		await argon2.hash(req.body.password_hash);

		// récuperer tous les enregistrements
		const results = await new securityRepository().register({
			...req.body,
			password_hash: await argon2.hash(req.body.password_hash),
		});

		// console.log(req.body);

		// Si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "error" : results,
			});
			// bloquer la suite
			return;
		}

		res.status(201).json({
			status: 201,
			message: "User Created",
			data: results,
		});
		return;
	};

	public login = async (req: Request, res: Response) => {
		const results = await new users_repository().selectOneByEmail(
			req.body.email,
		);

		// console.log(results);
		// Si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "error" : results,
			});
			// bloquer la suite
			return;
		}

		//si l'utilisateur n'existe pas
		if (!results) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : "User not found",
			});
			return;
		}

		//récupérer l'utilisateur
		const user = await new users_repository().selectOne(
			results,
		);


		//vérifier le mot de passe
		// console.log(user);
		
		// console.log((user as users).password_hash, req.body.password_hash);
		const isPasswordValid = await argon2.verify(
			(user as users).password_hash,
			req.body.password_hash,
		);

		

		if (!isPasswordValid) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "prod" ? "Error" : "Password Incorrect",
			});
			return;
		}

		res.status(201).json({
			status: 201,
			message: "User connected",
			data: results,
		});
		return;
	};
}

export default securityController;
