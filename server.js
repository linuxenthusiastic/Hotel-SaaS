import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import guestRoutes       from './src/routes/Guest.routes.js'
import reservationRoutes from './src/routes/Reservation.routes.js'
import checkinRoutes     from './src/routes/Checkin.routes.js'
import checkoutRoutes    from './src/routes/Checkout.routes.js'
import hotelServiceRoutes from './src/routes/HotelService.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/guests',         guestRoutes)
app.use('/api/reservations',   reservationRoutes)
app.use('/api/checkin',        checkinRoutes)
app.use('/api/checkout',       checkoutRoutes)
app.use('/api/hotel-services', hotelServiceRoutes)

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor corriendo' })
})

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})