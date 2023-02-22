import { Router } from 'express'
import PostgresConnection from '../db'
import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { DateInFormat } from '../date/date'
import { config } from 'dotenv'
config()

export default class Routers {
	router: Router
	database: PostgresConnection
	constructor(db: PostgresConnection) {
		this.router = Router();
		this.database = db;
		this.database.init();
	}

	init() {
		this.router.post('/getCurrency', (req: Request, res: Response) => {
			console.log('hello world')
			axios({
				url:
					`https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.THIRD_APP_API_KEY}&from=${req.body.from}&to=${req.body.to}&amount=1&format=json`,
				timeout: 8000
			})
				.then(async val => {
					const date = new Date()
					console.log('Inside getCurrencyTHen')

					await this.database.query(
						`INSERT INTO currency_log VALUES ('${DateInFormat()}', '${req.body.from}', '${req.body.to}', '-');`)
						.then(() => {
							res.json(val.data)
						})
						.catch(reason => {
							console.log('Issue with DB')
							res.status(408)
							res.send(reason)
						})
				}, err => {
					console.log('Error in Axios')
					res.status(404)
					res.send(err)
				})
		})

		this.router.post('/getCurrencyByDate', (req: Request, res: Response) => {
			// date format - YYYY-MM-DD 2018-10-12
			axios({
				url:
					`https://api.getgeoapi.com/v2/currency/historical/${req.body.date}?api_key=${process.env.THIRD_APP_API_KEY}&from=${req.body.from}&to=${req.body.to}&amount=1&format=json`
			})
				.then(async val => {
					const date = new Date()
					await this.database.query(
						`INSERT INTO currency_log VALUES ('${DateInFormat()}', '${req.body.from}', '${req.body.to}', 'by date');`)
						.then(() => {
							res.json(val.data)
						})
						.catch(reason => {
							res.status(408)
							res.send(reason)
						})
				}, err => {
					res.status(404)
					res.send(err)
				})
		})

	}
}