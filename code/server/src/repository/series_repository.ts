import type series from "../model/series.js";
import MySqlService from "../service/mysql_service.js";

class seriesRepository {
	private table = "series";
// async = asynchronne = exécute de tâches en parallèle/async crée une promesse
// la fonction renvoie un objet unknown lorsqu'une erreur est renvoyée 
	public selectAll = async (): Promise<series[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            SELECT
                ${this.table}.*,
				GROUP_CONCAT(gender.gender_id) AS gender_ids
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.series_gender
			ON
				series_gender.series_id = ${this.table}.series_id
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.gender
			ON	
				series_gender.gender_id = gender.gender_id
			GROUP BY
				${this.table}.series_id
			;
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
	public selectOne = async (data: Partial<series>): Promise<series[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            SELECT
                ${this.table}.*
            FROM  
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}_id = :series_id
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
			const result = (results as series[]).shift();
			// si la requête a réussie 
			return results;
		} catch (error) {
			return error;
		}
	};

	//Créer un enregistrement
	public insert = async (
		data: Partial<series>,
	): Promise<series[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
			INSERT INTO 
				${process.env.MYSQL_DATABASE}.${this.table}
			VALUE
				(
				:series_id,
				:gender_id,
				:title,
				:description,
				:release_date,
				:poster_url,
				)
			;
        `;
		// exécuter la commande
		// try/catch : permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérée
		try {
			// récupérer les résultats de la requête
			// result représente le prmeier indice du array renvoyé
			// requêtes prépareées avec des variables de requêtes SQL permettent d'éviter les injections SQL
			// data permet de définir une valeur aux variables de requêtes SQL
			const [results] = await connection.execute(sql, data);
			// si la requête a réussie
			return results;
		} catch (error) {
			return error;
		}
	};

	//Modifier un enregistrement
	public update = async (
		data: Partial<series>,
	): Promise<series[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
			UPDATE
				${process.env.MYSQL_DATABASE}.${this.table}
			SET
				${this.table}.gender_id = :gender_id,
				${this.table}.title = :title,
				${this.table}.description = :description,
				${this.table}.release_date = :release_date,
				${this.table}.poster_url = :poster_url
			WHERE
				${this.table}.series_id = :series_id
			;
        `;
		// exécuter la commande
		// try/catch : permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérée
		try {
			// récupérer les résultats de la requête
			// result représente le prmeier indice du array renvoyé
			// requêtes prépareées avec des variables de requêtes SQL permettent d'éviter les injections SQL
			// data permet de définir une valeur aux variables de requêtes SQL
			const [results] = await connection.execute(sql, data);
			// si la requête a réussie
			return results;
		} catch (error) {
			return error;
		}
	};

	//supprimer un enregistrement
	public delete = async (
		//supprimer un enregistrement
		//data = données envoyées par le client
		data: Partial<series>,
	): Promise<series[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
			DELETE FROM
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.series_id = :series_id
			;
        `;
		// exécuter la commande
		// try/catch : permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérée
		try {
			// récupérer les résultats de la requête
			// result représente le prmeier indice du array renvoyé
			// requêtes prépareées avec des variables de requêtes SQL permettent d'éviter les injections SQL
			// data permet de définir une valeur aux variables de requêtes SQL
			const [results] = await connection.execute(sql, data);
			// si la requête a réussie
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default seriesRepository;
