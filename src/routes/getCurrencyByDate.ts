import { Router } from 'express';
import { Request, Response } from 'express';
import axios from 'axios';
import PG from '../db';
import { config } from 'dotenv';
import { DateInFormat } from '../date/date';
config()

export const getCurrencyByDate = Router()

getCurrencyByDate.post('/getCurrencyByDate', (req: Request, res: Response) => {
	// date format - YYYY-MM-DD 2018-10-12
	axios({
		url:
			`https://api.getgeoapi.com/v2/currency/historical/${req.body.date}?api_key=${process.env.THIRD_APP_API_KEY}&from=${req.body.from}&to=${req.body.to}&amount=1&format=json`
	})
		.then(async val => {
			const date = new Date()
			const pg = new PG()
			await pg.query(
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
	// NEED ADD LOGGING OF SUCCESS REQUEST TO DB (POSTGRESQL)
})