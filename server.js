import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import hotelServiceRoutes from './src/routes/HotelService.routes.js'
import guestRoutes from './src/routes/Guest.routes.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/hotel-services', hotelServiceRoutes)
app.use('/api/guests',         guestRoutes)

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor corriendo' })
})

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})