import { App } from './app/app';
import { config } from 'dotenv';
config()

export const app = new App(process.env.PORT)
app.init()
app.useRoutes()