import { Router } from 'express'
import { guestController } from '../config/container.js'
const router = Router();


router.get('/',                 (req, res) => guestController.getAll(req, res))
router.get('/doc/:document',    (req, res) => guestController.getByDocument(req, res))
router.get('/:id',              (req, res) => guestController.getById(req, res))
router.post('/',                (req, res) => guestController.create(req, res))

export default router;