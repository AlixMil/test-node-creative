import { Express, Router } from 'express';
import PostgresConnection from '../db/index'
import Routers from '../routes/Routers';

export default interface IApp {
	init(): void;
	useRoutes(): void;
}