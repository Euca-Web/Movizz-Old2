import type { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import moviesRepository from "../repository/movies_repository.js";
import type movies from "../model/movies.js";

class moviesPosterMiddleware {
	public process = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		// console.log(req.files);
		// console.log(req.body);

		// {
		//     fieldname: "poster_url",
		//     originalname: "image.jpg",
		//     encoding: "7bit",
		//     mimetype: "image/jpeg",
		//     destination: "./public/img",
		//     filename: "image.jpg",
		//     path: "./public/img/image.jpg",
		//     size: 1024
		// }

		//récupérer le fichier transferer
		const file = (req.files as Express.Multer.File[])[0];

        //récupérer le fichier par son id
        const poster: movies | unknown = await new moviesRepository().selectOne(req.body);


        //si un fichier à été sélectionner
        if (file) {
            //ajouter l'extension du fichier
			const filename = `${file.filename}.${file.mimetype.split("/")[1]}`;

			//renomer le fichier transferé
			await fs.rename(file.path, `${file.destination}/${filename}`);

			//ajouter l'extension du fichier au corps de la requête
			req.body[file.fieldname] = filename;

            //récupérer la méthode HTTP
            //si une modification est effectuée, supprimer l'ancien fichier
            if (req.method === "PUT"){
                await fs.rm(`${file.destination}/${(poster as movies).poster_url}`);
            }
        }
        else {
            //PUT >récupérer le nom de l'ancienne image et l'affeter à la propriété gérant le fichier
            if (req.method === "PUT") {
                req.body.poster_url = (poster as movies).poster_url;
            }
            //DELETE >supprimer l'ancien fichier
            // if (req.method === "DELETE") {
            //     await fs.rm(
            //         `${process.env.ASSETS_DIR}/img/${(poster as movies).poster_url}`);
            // }
        }

		// passer au middleware suivant
		next();
	};
}

export default moviesPosterMiddleware;
