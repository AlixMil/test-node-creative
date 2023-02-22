import express from 'express';
import bodyParser from 'body-parser';
import { validatorRouter } from '../validation/validator';
import { securityRoute } from '../security/securityKey';
import IApp from './app.interface';
import PostgresPoolConnection from '../db';
import Routers from '../routes/Routers';

export class App implements IApp {
	private PORT
	protected app
	protected db
	private router
	constructor(PORT: number) {
		this.app = express()
		this.PORT = PORT
		if (PORT === undefined) throw Error('PORT is undefined')
		this.db = new PostgresPoolConnection()
		this.router = new Routers(this.db)
	}
	useRoutes() {
		this.router.init()
		this.app.use(securityRoute)
		this.app.use(validatorRouter)
		this.app.use(this.router.router)
	}

	async init() {
		this.app.listen(this.PORT)
		this.app.use(bodyParser.json())
	}

}