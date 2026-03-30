import { Router } from 'express'
import ReservationController from '../controllers/ReservationController.js'

const router = Router()

router.get('/guest/:guest_id',  (req, res) => ReservationController.findByGuestId(req, res))
router.get('/',           (req, res) => ReservationController.getAll(req, res))
router.get('/active',     (req, res) => ReservationController.getActive(req, res))
router.get('/:id',        (req, res) => ReservationController.getById(req, res))
router.post('/',          (req, res) => ReservationController.create(req, res))
router.patch('/:id/cancel', (req, res) => ReservationController.cancel(req, res))
router.get('/available', (req, res) => RoomController.availableRooms(req, res))


export default router