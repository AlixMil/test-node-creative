import { Router } from 'express';
import { Request, Response } from 'express';
import axios from 'axios'
import { config } from '../config/config';


export const getCurrency = Router()

getCurrency.post('/getCurrency', (req: Request, res: Response) => {
	// https://api.getgeoapi.com/v2/currency/convert?api_key=${proccess.env.API_KEY}&from=EUR&to=GBP&amount=1&format=json
	req.body.from
	req.body.to
	// Need add validation!!!
	axios({ url: `https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.API_KEY}&from=${req.body.from}&to=${req.body.to}&amount=1&format=json` })
		.then(val => {
			res.json(val.data)
		})
})
