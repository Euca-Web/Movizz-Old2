import { Collection } from "mongodb";
import MongoDBService from "../service/mongodb_service.js";

class contactRepository {
	private collection = "contact";

	public selectAll = async () => {
		const connection = new MongoDBService().connect();

		const collection = connection.collection(this.collection);
		console.log(collection);
		return collection.find().toArray();
	};
}
export default contactRepository;
