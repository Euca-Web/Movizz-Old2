import type { Request, Response } from "express";
import GenderRepository from "../repository/gender_repository.js";

class HomePageController {
	public index = async (req: Request, res: Response) => {
		const result = await new GenderRepository().selectAll();
		console.log(result);

		res.status(200).json({
			status: 200,
			message: "Welcome to Movizz API",
		});
	};
}
export default HomePageController;
