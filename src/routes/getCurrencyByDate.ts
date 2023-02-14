import { Router } from 'express';
import { Request, Response } from 'express';
import axios from 'axios';


export const getCurrencyByDate = Router()

getCurrencyByDate.get('/getCurrencyByDate', (req: Request, res: Response) => {


	// https://api.getgeoapi.com/v2/currency/historical/2018-10-12?api_key=${proccess.env.API_KEY}&from=EUR&to=GBP&amount=1&format=json
})