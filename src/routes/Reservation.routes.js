import { Router } from 'express'
import { reservationController } from '../config/container.js'


const router = Router()

router.get('/guest/:guest_id',  (req, res) => reservationController.findByGuestId(req, res))
router.get('/',           (req, res) => reservationController.getAll(req, res))
router.get('/active',     (req, res) => reservationController.getActive(req, res))
router.get('/:id',        (req, res) => reservationController.getById(req, res))
router.post('/',          (req, res) => reservationController.create(req, res))
router.patch('/:id/cancel', (req, res) => reservationController.cancel(req, res))


export default router;