import { Router } from 'express';
import GuestController from '../controllers/GuestController.js';

const router = Router();

router.get('/',                 (req, res) => GuestController.getAll(req, res))
router.get('/doc/:document',    (req, res) => GuestController.getByDocument(req, res))
router.get('/:id',              (req, res) => GuestController.getById(req, res))
router.post('/',                (req, res) => GuestController.create(req, res))

export default router