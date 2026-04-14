class CheckinController {
    constructor(CheckinService){
        this.CheckinService = CheckinService;
    }
checkin(req, res) {
    try {
    const result = this.CheckinService.checkin(Number(req.params.reservationId))
    res.json(result)
    } catch (error) {
    res.status(400).json({ error: error.message })
    }
}

}

export default CheckinController;