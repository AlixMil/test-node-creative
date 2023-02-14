import express from 'express';
import bodyParser from 'body-parser';
import { getCurrency } from '../routes/getCurrency';
import { getCurrencyByDate } from '../routes/getCurrencyByDate';
import IApp from './app.interface';

export class App implements IApp {
	PORT: IApp["PORT"]
	app: IApp["app"]
	constructor(PORT: IApp['PORT']) {
		this.app = express()
		this.PORT = PORT
		if (PORT === undefined) {
			throw Error('PORT is undefined')
		}
	}
	useRoutes() {
		this.app.use(getCurrency)
		this.app.use(getCurrencyByDate)
	}

	async init() {
		this.app.listen(this.PORT, () => {
			console.log('Hello world')
		})
		this.app.use(bodyParser.json())
	}


}