import { Router } from 'express'
import { hotelServiceController } from '../config/container.js'

const router = Router()

router.get('/',              (req, res) => hotelServiceController.getAll(req, res))
router.get('/:category',     (req, res) => hotelServiceController.getByCategory(req, res))

export default router;