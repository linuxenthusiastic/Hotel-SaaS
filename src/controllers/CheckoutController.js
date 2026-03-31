class CheckoutController {
    constructor(CheckoutService){
        this.CheckoutService = CheckoutService;
    }
    checkout(req, res) {
        try {
            const notes = req.body?.notes || ''
            const result = this.CheckoutService.checkout(Number(req.params.reservationId), notes)
            res.json(result)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default CheckoutController;