import { Router } from 'express'
import CheckinController from '../controllers/CheckinController.js'

const router = Router()

router.patch('/:reservationId', (req, res) => CheckinController.checkin(req, res))

export default router