import type users from "../model/users.js";
import MySqlService from "../service/mysql_service.js";

class usersRepository {
	private table = "users";
// async = asynchronne = exécute de tâches en parallèle/async crée une promesse
// la fonction renvoie un objet unknown lorsqu'une erreur est renvoyée 
	public selectAll = async (): Promise<users[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            SELECT
                ${this.table}.*
            FROM  
                ${process.env.MYSQL_DATABASE}.${this.table}
        `;

		try {
			const [results]= await connection.execute(sql);
			return results;
		} catch (error) {
			return error;
		}
	};

	// récupérer un enregistrement par sa clé primaire
	// Partial permet de définir des propriétés optionnelles 
	public selectOne = async (data: Partial<users>): Promise<users[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            SELECT
                ${this.table}.*
            FROM  
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.user_id = :user_id
        `;
		// exécuter la commande
		// try/catch : permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérée 
		try {
			// récupérer les résultats de la requête 
			// result représente le prmeier indice du array renvoyé 
			// requêtes prépareées avec des variables de requêtes SQL permettent d'éviter les injections SQL
			// data permet de définir une valeur aux variables de requêtes SQL
			const [results]= await connection.execute(sql, data);

			// récupérer le premier resultat 
			// shift permet de récupérer le premier indice d'un array
			const result = (results as users[]).shift();
			// si la requête a réussie 
			return result;
		} catch (error) {
			return error;
		}
	};

	//sélectionner un enregistrement par un champ spécifique (email)
	public selectOneByEmail = async (email:string): Promise<users | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
			SELECT
				${this.table}.*
			FROM  
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.email = :email
		`;

		try {
			const [results]= await connection.execute(sql, {
				email: email
			});

			// récupérer le premier resultat 
			// shift permet de récupérer le premier indice d'un array
			const result = (results as users[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	}
}

export default usersRepository;
