import { Express } from 'express';

export default interface IApp {
	app: Express;
	PORT: string | undefined;
	init(): void;
	useRoutes(): void;
}