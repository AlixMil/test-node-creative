import { NextFunction, Router, Request, Response } from 'express';

export const securityRoute = Router()

securityRoute.use((req: Request, res: Response, next: NextFunction) => {
	if (!req.get('api_key') || req.get('api_key') !== process.env.API_KEY) {
		res.status(403)
		return res.send('ACCESS DENIED!')
	}
	next()
})