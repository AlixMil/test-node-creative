import { Pool } from 'pg';
import { config } from 'dotenv';
config({ debug: true })

export default class PG {
	private pool: Pool
	constructor() {
		this.pool = new Pool({
			user: process.env.USER,
			host: process.env.HOST,
			database: process.env.DATABASE,
			password: process.env.PASSWORD,
			port: Number(process.env.DB_PORT),
		})
	}

	async query(sql: string) {
		this.pool.query(sql)
	}

}