import type users from "../model/users.js";
import MySqlService from "../service/mysql_service.js";

class usersRepository {
	private table = "users";
// async = asynchronne = exécute de tâches en parallèle/async crée une promesse
// la fonction renvoie un objet unknown lorsqu'une erreur est renvoyée 
	public register = async (data:Partial<users>): Promise<users[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            INSERT INTO
				${process.env.MYSQL_DATABASE}.${this.table}
			VALUES
			(
				NULL,
				:username,
				:email,
				:password_hash,
				1
			)
        `;

		try {
			const [results]= await connection.execute(sql, data);
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default usersRepository;
