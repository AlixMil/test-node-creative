import { Pool, Client, PoolClient } from 'pg';
import { config } from 'dotenv';
import { Connection } from 'pg';
config()

export default class PostgresPoolConnection {
	// private pool: Pool
	// private connection: Connection
	pool: Pool
	constructor() {

	}

	async init() {
		this.pool = new Pool({
			user: process.env.USER,
			host: process.env.HOST,
			database: process.env.DATABASE,
			password: process.env.PASSWORD,
			port: Number(process.env.DB_PORT),
			max: 100,
		})
	}

	async query(sql: string) {
		this.pool.connect((err, client, release) => {
			if (err) {
				return console.error(err.stack)
			}
			client.query(sql, (err, result) => {
				release()
				if (err) {
					return console.error(err.stack)
				}
				console.log(result.rows)
			})
		})
	}

}