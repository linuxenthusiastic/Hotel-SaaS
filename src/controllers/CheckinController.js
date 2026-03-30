import CheckinService from '../services/CheckinService.js'

class CheckinController {

checkin(req, res) {
    try {
    const result = CheckinService.checkin(Number(req.params.reservationId))
    res.json(result)
    } catch (error) {
    res.status(400).json({ error: error.message })
    }
}

}

export default new CheckinController()