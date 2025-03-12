import type { Request, Response } from "express";
import seriesRepository from "../repository/series_repository.js";

class seriesController {
	public index = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const result = await new seriesRepository().selectAll();
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
		const result = await new seriesRepository().selectOne(req.params);
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
    public insert = async (req: Request, res: Response) => {
        //Créer un enregistrement
        //body = données envoyées par le client
        const result = await new seriesRepository().insert(req.body);
        if (result instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "error" : result,
                data: result
            });
            return;
        }

        res.status(201).json({
            status: 201,
            message: "Série créée",
            data: result
        });
    };
    public update = async (req: Request, res: Response) => {
        //Modifier un enregistrement
        //body = données envoyées par le client
        const result = await new seriesRepository().update(req.body);
        if (result instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "error" : result,
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: "Série modifiée",
            data: result,
        });
    };
    public delete = async (req: Request, res: Response) => {
        //Supprimer un enregistrement
        //body = données envoyées par le client
        const result = await new seriesRepository().delete(req.body);
        if (result instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "error" : result,
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: "Série supprimée",
            data: result,
        });
    };
}
export default seriesController;
