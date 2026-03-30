import { Router } from 'express'
import RoomController from '../controllers/RoomController.js'

const router = Router()

router.get('/available',(req, res) => RoomController.availableRooms(req, res))

export default router