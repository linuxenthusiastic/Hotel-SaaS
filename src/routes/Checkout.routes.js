import { Router } from 'express'
import {checkoutController} from '../config/container.js'

const router = Router()

router.patch('/:reservationId', (req, res) => checkoutController.checkout(req, res))

export default router;