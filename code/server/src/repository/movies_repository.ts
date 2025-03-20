import type gender from "../model/gender.js";
import type movies from "../model/movies.js";
import MySqlService from "../service/mysql_service.js";
import genderRepository from "./gender_repository.js";

class moviesRepository {
	private table = "movies";

	// async = asynchronne = exécute de tâches en parallèle/async crée une promesse
	// la fonction renvoie un objet unknown lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<movies[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            SELECT
                ${this.table}.*,
				GROUP_CONCAT(gender.gender_id) AS gender_ids
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.movie_gender
			ON
				movie_gender.movie_id = ${this.table}.movie_id
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.gender
			ON	
				movie_gender.gender_id = gender.gender_id
			GROUP BY
				${this.table}.movie_id
			;
        `;

		try {
			const [results] = await connection.execute(sql);

			for (let i = 0; i < (results as movies[]).length; i++) {
				const result = (results as movies[])[i];

				result.genders = (await new genderRepository().selectInList(
					result.gender_ids,
				)) as gender[];
			}

			return results;
		} catch (error) {
			return error;
		}
	};

	// récupérer un enregistrement par sa clé primaire
	// Partial permet de définir des propriétés optionnelles
	public selectOne = async (
		data: Partial<movies>,
	): Promise<movies[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            SELECT
                ${this.table}.*
            FROM  
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.movie_id = :movie_id
        `;
		// exécuter la commande
		// try/catch : permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérée
		try {
			// récupérer les résultats de la requête
			// result représente le prmeier indice du array renvoyé
			// requêtes prépareées avec des variables de requêtes SQL permettent d'éviter les injections SQL
			// data permet de définir une valeur aux variables de requêtes SQL
			const [results] = await connection.execute(sql, data);

			// récupérer le premier resultat
			// shift permet de récupérer le premier indice d'un array
			const result = (results as movies[]).shift();
			// si la requête a réussie
			return result;
		} catch (error) {
			return error;
		}
	};

	//Créer un enregistrement
	public insert = async (
		data: Partial<movies>,
	): Promise<movies[] | unknown> => {
		//connexion au serveur SQL
		const connection = await new MySqlService().connect();

		let sql = `
			INSERT INTO 
				${process.env.MYSQL_DATABASE}.${this.table}
			VALUE
				(
				NULL,
				1,
				:title,
				:summary,
				:release_date,
				:duration,
				:poster_url,
				:trailer_url,
				:director
				)
			;
        `;

		// exécuter la commande
		// try/catch : permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérée
		try {
			//crée une transaction SQL
			connection.beginTransaction();
			//execute la premiere requête
			await connection.execute(sql, data);
			// console.log('cocoucoucou');

			//crée une variable SQL stockant le dernier id inséré
			sql = `
				SET @id = LAST_INSERT_ID();
				`;

			// //execute la seconde requête
			await connection.execute(sql, data);

			//execute la seconde requête
			//1,2,3 >> (@id, 1), (@id, 2), (@id, 3)
			//split permet de diviser une string en un array
			//map permet de créer un array en fonction d'une fonction
			//join permet de joindre les éléments d'un array en une string
			const values = data.gender_ids
				?.split(",")
				.map((id) => `(@id, ${id})`)
				.join(",");

			// console.log(values);

			sql = `
				INSERT INTO
					${process.env.MYSQL_DATABASE}.movie_gender
				VALUES
					${values}
				;
				`;

			// récupérer les résultats de la requête
			// result représente le prmeier indice du array renvoyé
			// requêtes prépareées avec des variables de requêtes SQL permettent d'éviter les injections SQL
			// data permet de définir une valeur aux variables de requêtes SQL
			// //execute la troisième requête
			const [results] = await connection.execute(sql, data);
			//valider la transaction lorsque l'ensemble des requêtes d'une transaction ont réussie
			connection.commit();

			// si la requête a réussie
			return results;
		} catch (error) {
			//si une erreur est renvoyée, annule la transaction
			connection.rollback();
			//renvoie l'erreur
			return error;
		}
	};

	//Modifier un enregistrement
	public update = async (
		data: Partial<movies>,
	): Promise<movies[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		let sql = `
			UPDATE
				${process.env.MYSQL_DATABASE}.${this.table}
			SET
				${this.table}.gender_id = 1,
				${this.table}.title = :title,
				${this.table}.summary = :summary,
				${this.table}.release_date = :release_date,
				${this.table}.duration = :duration,
				${this.table}.poster_url = :poster_url,
				${this.table}.trailer_url = :trailer_url,
				${this.table}.director = :director
			WHERE
				${this.table}.movie_id = :movie_id
			;
        `;
		// exécuter la commande
		// try/catch : permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérée
		try {
			//crée une transaction SQL
			connection.beginTransaction();
			//execute la premiere requête
			await connection.execute(sql, data);

			//crée une variable SQL stockant le dernier id inséré
			sql = `
				DELETE FROM ${process.env.MYSQL_DATABASE}.movie_gender
				WHERE movie_gender.movie_id = :movie_id
				;
				`;

			//execute la seconde requête
			await connection.execute(sql, data);

			//execute la seconde requête
			//1,2,3 >> (@id, 1), (@id, 2), (@id, 3)
			//split permet de diviser une string en un array
			//map permet de créer un array en fonction d'une fonction
			//join permet de joindre les éléments d'un array en une string
			const values = data.gender_ids
				?.split(",")
				.map((id) => `(:movie_id, ${id})`)
				.join(",");

			// console.log(values);

			sql = `
				INSERT INTO
					${process.env.MYSQL_DATABASE}.movie_gender
				VALUES
					${values}
				;
				`;

			// récupérer les résultats de la requête
			// result représente le prmeier indice du array renvoyé
			// requêtes prépareées avec des variables de requêtes SQL permettent d'éviter les injections SQL
			// data permet de définir une valeur aux variables de requêtes SQL
			const [results] = await connection.execute(sql, data);
			//valider la transaction lorsque l'ensemble des requêtes d'une transaction ont réussie
			connection.commit();

			// si la requête a réussie
			return results;
		} catch (error) {
			//si une erreur est renvoyée, annule la transaction
			connection.rollback();
			//renvoie l'erreur
			return error;
		}
	};

	//supprimer un enregistrement
	public delete = async (
		//supprimer un enregistrement
		//data = données envoyées par le client
		data: Partial<movies>,
	): Promise<movies[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
			DELETE FROM
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.movie_id = :movie_id
			;
        `;
		// exécuter la commande
		// try/catch : permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérée
		try {
			//crée une transaction SQL
			connection.beginTransaction();
			//execute la première requête pour supprimer les relations
			await connection.execute(sql, data);

			// //requête pour supprimer le film
			// sql = `
			// 	DELETE FROM
			// 		${process.env.MYSQL_DATABASE}.${this.table}
			// 	WHERE
			// 		${this.table}.movie_id = :movie_id
			// 	;
			// `;

			//execute la seconde requête
			const [results] = await connection.execute(sql, data);
			//valider la transaction
			connection.commit();

			// si la requête a réussie
			return results;
		} catch (error) {
			//si une erreur est renvoyée, annule la transaction
			connection.rollback();
			//renvoie l'erreur
			return error;
		}
	};
}

export default moviesRepository;
