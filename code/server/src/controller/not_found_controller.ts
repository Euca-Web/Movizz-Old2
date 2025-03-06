import type {Request, Response} from "express";

class NotFoundController {
	public index = (req: Request, res: Response) =>{

		res.status(404).json({
			status: 404,
			message: "Not Found",
		});
	
	};
}

export default NotFoundController;
