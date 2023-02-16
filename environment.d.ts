declare global {
	namespace NodeJS {
		interface ProcessEnv {
			THIRD_APP_API_KEY: string
			API_KEY: string
			PORT: number
			USER: string
			HOST: string
			DATABASE: string
			PASSWORD: string
			DB_PORT: number
		}
	}
}

export { }