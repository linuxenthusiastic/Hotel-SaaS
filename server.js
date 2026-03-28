import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor corriendo' })
})

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})