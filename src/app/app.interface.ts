import { Express } from 'express';
import { Pool } from 'pg';

export default interface IApp {
	app: Express;
	PORT: number;
	init(): void;
	useRoutes(): void;
	postgres: Pool
}