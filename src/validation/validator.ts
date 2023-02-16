import { NextFunction, Router, Request, Response } from 'express'
import { currenciesLists } from '../config/config'

export const validatorRouter = Router()

validatorRouter.use((req: Request, res: Response, next: NextFunction) => {
	if (!currencyValidate(req.body.from)) {
		res.status(400)
		return res.send('currency in body of request was incorrect')
	}
	if (!currencyValidate(req.body.to)) {
		res.status(400)
		return res.send('currency in body of request was incorrect')
	}
	if (req.body.date !== undefined) {
		if (!dateValidate(req.body.date)) {
			res.status(400)
			return res.send('date in body of requst was incorrect')
		}
	}
	next()
})

function currencyValidate(currency: string): boolean {
	if (currenciesLists.currenciesToConvert.includes(currency)) {
		return true
	} else {
		return false
	}
}

function dateValidate(date: string): boolean {
	if (date.split('-').length !== 3) {
		return false
	}

	date.split('-').forEach(element => {
		if (Number.isNaN(element as unknown as number / 100)) return false
	})

	// split string to year, month, day
	for (let index = 0; index <= date.split('-').length; index++) {
		switch (index) {
			case 0: // YEAR
				if (Number(date.split('-')[index] as unknown as number) >= 2008 && Number(date.split('-')[index] as unknown as number) <= 2023) {
					console.log(`Validation year is ok! Index: ${index} ELement: ${date.split('-')[index]}`)
					return true
				}
				return false
			case 1: // MONTH
				if (Number(date.split('-')[index] as unknown as number) >= 1 && Number(date.split('-')[index] as unknown as number) <= 12) {
					console.log(`Validation month is ok! Index: ${index} ELement: ${date.split('-')[index]}`)
					return true
				}
				return false
			case 2: // DAY
				if (Number(date.split('-')[index] as unknown as number) >= 1 && Number(date.split('-')[index] as unknown as number) <= 31) {
					console.log(`Validation day is ok! Index: ${index} ELement: ${date.split('-')[index]}`)
					return true
				}
				return false
			default:
				console.log('date default switch')
				return false
		}
	}
	return true
}