import 'dotenv/config'

export const PORT = Number(process.env.PORT) || 3000;
export const DB_URL = process.env.DB_URL;