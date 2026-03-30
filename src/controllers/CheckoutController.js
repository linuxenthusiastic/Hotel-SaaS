import CheckoutService from '../services/CheckoutService.js'

class CheckoutController {
    checkout(req, res) {
        try {
            const notes = req.body?.notes || ''
            const result = CheckoutService.checkout(Number(req.params.reservationId), notes)
            res.json(result)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default new CheckoutController()