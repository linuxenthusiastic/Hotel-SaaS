import { Router } from 'express'
import { roomController} from '../config/container.js'

const router = Router()
router.get('/types',     (req, res) => roomController.getRoomTypes(req, res))
router.get('/strategy',  (req, res) => roomController.applyStrategy(req, res))
router.get('/available', (req, res) => roomController.availableRooms(req, res))
router.get('/',          (req, res) => roomController.getAll(req, res))
export default router;