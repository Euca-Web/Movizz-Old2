import type { Request, Response } from "express";
import moviesRepository from "../repository/movies_repository.js";
import { resourceLimits } from "node:worker_threads";

class moviesController {
    public index = async (req: Request, res: Response) => {
        const result = await new moviesRepository().selectAll();
        if (result instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "error" : result,
                data: result
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: "Ok",
            data: result
        });
    };

    public one = async (req: Request, res: Response) => {
        const result = await new moviesRepository().selectOne(req.params);
        if (result instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "error" : result,
                data: result
            });
            return;
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
        const result = await new moviesRepository().insert(req.body);

            console.log(result);
            

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
            message: "Film créé",
            data: result
        });
    };

    public update = async (req: Request, res: Response) => {
        //Modifier un enregistrement
        //body = données envoyées par le client
        const result = await new moviesRepository().update(req.body);
        if (result instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "error" : result,
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: "Film modifié",
            data: result,
        });
    };
    
    public delete = async (req: Request, res: Response) => {
        //Supprimer un enregistrement
        //body = données envoyées par le client
        const result = await new moviesRepository().delete(req.body);
        if (result instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "error" : result,
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: "Film supprimé",
            data: result,
        });
    };
}

export default moviesController;
