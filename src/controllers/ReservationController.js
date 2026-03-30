import ReservationService from '../services/ReservationService.js'

class ReservationController {

  getAll(req, res) {
    try {
      const reservations = ReservationService.getAll()
      res.json(reservations)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getActive(req, res) {
    try {
      const reservations = ReservationService.getActive()
      res.json(reservations)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getById(req, res) {
    try {
      const reservation = ReservationService.getById(Number(req.params.id))
      res.json(reservation)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }

  create(req, res) {
    try {
      const reservation = ReservationService.create(req.body)
      res.status(201).json(reservation)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  cancel(req, res) {
    try {
      const reservation = ReservationService.cancel(Number(req.params.id))
      res.json(reservation)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

}

export default new ReservationController()