import type { Request, Response } from "express";
import securityRepository from "../repository/security_repository.js";
import { log } from "node:console";
import argon2 from "argon2";
import users_repository from "../repository/users_repository.js";
import type users from "../model/users.js";
import SimpleCrypto from "simple-crypto-js";
import jwt from "jsonwebtoken";

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
			res.status(403).json({
				status: 403,
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
			res.status(403).json({
				status: 403,
				message:
					process.env.NODE_ENV === "prod" ? "Error" : "Password Incorrect",
			});
			return;
		}

		//crypter le mot de passe et générer une partie aleatoire
		const randomKey = SimpleCrypto.default.generateRandom();
		// console.log(randomKey);
		//clé de décryptage contenant la partie aléatoire et la partie fixe
		const key = `${process.env.KEY}${randomKey}`;
		// console.log(key);
		const crypto = new SimpleCrypto.default(key);
		//crypter le mot de passe
		const encryptedPassword = crypto.encrypt(req.body.password_hash);
		// console.log(encryptedPassword);

		res.json({
			status: 200,
			message: "User connected",
			data: {...user as users, password_hash: encryptedPassword, key: randomKey},
		});
		return;
	};

	public auth = async (req: Request, res: Response) => {
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
			res.status(403).json({
				status: 403,
				message: process.env.NODE_ENV === "prod" ? "Error" : "User not found",
			});
			return;
		}

		//récupérer l'utilisateur
		const user = await new users_repository().selectOne(
			results,
		);

		//recrée la clé de décryptage en récupérant la partie aléatoire et la partie fixe
		const key = `${process.env.KEY}${req.body.key}`;
		// console.log(key);
		//décrypter le mot de passe
		const crypto = new SimpleCrypto.default(key);
		let decryptedPassword: string;
		try {
			decryptedPassword = crypto.decrypt(req.body.password_hash) as string;
			// console.log(decryptedPassword);
		}catch (error) {
				res.status(401).json({
					status: 401,
					message: process.env.NODE_ENV === "prod" ? "Error" : "User unauthorized",
				});
				return;
			}
		// console.log(decryptedPassword);


		//vérifier le mot de passe
		// console.log(user);
		
		// console.log((user as users).password_hash, req.body.password_hash);
		const isPasswordValid = await argon2.verify(
			(user as users).password_hash,
			decryptedPassword,
			
		);
		// console.log(isPasswordValid);
		if (!isPasswordValid) {
			res.status(401).json({
				status: 401,
				message:
					process.env.NODE_ENV === "prod" ? "Error" : "Unauthorized",
			});
			return;
		}

		//générer le JSON Web Token
		//en prod le token expire au bout de 30s
		//en dev le token expire au bout de 10h
		const token = jwt.sign({ user: req.body }, process.env.JWT as string, {
			expiresIn: process.env.NODE_ENV === "prod" ? 30 : 60*60*10,
		});
		//  console.log(token);

		res.json({
			status: 200,
			message: "User authenticated",
			// on renvoie le token
			// on ne renvoie pas le mot de passe
			// on ne renvoie pas la clé
			// on ne renvoie pas l'email
			// on ne renvoie pas le username
			data: {token: token,

			},
		});
		return;
	};
}

export default securityController;
