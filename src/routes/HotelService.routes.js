import { Router } from 'express'
import HotelServiceController from '../controllers/HotelServiceController.js'

const router = Router()

router.get('/',              (req, res) => HotelServiceController.getAll(req, res))
router.get('/:category',     (req, res) => HotelServiceController.getByCategory(req, res))

export default router