import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.resolve(__dirname, '../../', process.env.DB_PATH || './database/hotel.db')

const db = new Database(dbPath)

db.pragma('foreign_keys = ON')

console.log(`Base de datos conectada: ${dbPath}`)

export default db