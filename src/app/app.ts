import express from 'express';
import bodyParser from 'body-parser';
import { getCurrency } from '../routes/getCurrency';
import { getCurrencyByDate } from '../routes/getCurrencyByDate';
import { validatorRouter } from '../validation/validator';
import { securityRoute } from '../security/securityKey';
import IApp from './app.interface';
import { Pool } from 'pg';

export class App implements IApp {
	PORT
	app
	postgres
	constructor(PORT: number, PG: Pool) {
		this.app = express()
		this.PORT = PORT
		if (PORT === undefined) {
			throw Error('PORT is undefined')
		}
		this.postgres = PG
	}
	useRoutes() {
		this.app.use(securityRoute)
		this.app.use(validatorRouter)
		this.app.use(getCurrency)
		this.app.use(getCurrencyByDate)
	}

	async init() {
		this.app.listen(this.PORT)
		this.app.use(bodyParser.json())
	}

	async query(sqlQuery: string) {
		this.postgres.query(sqlQuery)
	}

}