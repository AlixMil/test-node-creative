import { Pool } from 'pg';
import { App } from './app/app';
import PG from './db';
import { config } from 'dotenv';
config({ debug: true })


export const app = new App(Number(process.env.PORT), new PG() as unknown as Pool)
app.init()
app.useRoutes()