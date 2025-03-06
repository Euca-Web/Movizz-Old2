import mysql, { type PoolConnection } from "mysql2/promise";

class MySqlService {
	private static connection: PoolConnection;

	public connect = async () => {
		if (!MySqlService.connection) {
			MySqlService.connection = await mysql
				.createPool({
					host: process.env.MYSQL_HOST,
					user: process.env.MYSQL_USER,
					password: process.env.MYSQL_PASSWORD,
					database: process.env.MYSQL_DATABASE,
					namedPlaceholders: true,
				})
				.getConnection();
		}
		return MySqlService.connection;
	};
}

export default MySqlService;
