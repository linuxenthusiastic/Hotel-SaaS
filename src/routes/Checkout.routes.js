import { Router } from 'express'
import CheckoutController from '../controllers/CheckoutController.js'

const router = Router()

router.patch('/:reservationId', (req, res) => CheckoutController.checkout(req, res))

export default router