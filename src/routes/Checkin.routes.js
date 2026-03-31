import { Router } from 'express'
import {checkinController} from '../config/container.js'

const router = Router()

router.patch('/:reservationId', (req, res) => checkinController.checkin(req, res))

export default router