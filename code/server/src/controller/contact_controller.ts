import type { Request, Response } from "express";
import contactRepository from "../repository/contact_repository.js";

class contactController {
	// récuperer tous les documents
	public index = async (req: Request, res: Response) => {
		const results = await new contactRepository().selectAll();
		res.status(200).json({
			status: 200,
			message: "Ok",
			data: results,
		});
	};
}
export default contactController;
