import { Router } from 'express'
import { roomController} from '../config/container.js'

const router = Router()

router.get('/available',(req, res) => roomController.availableRooms(req, res))

export default router;