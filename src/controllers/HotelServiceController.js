class HotelServiceController {
    constructor(HotelServiceService){
        this.HotelServiceService = HotelServiceService;
    }
    getAll(req, res) {
        try {
        console.log(res);
        const services = this.HotelServiceService.getAll()
        res.json(services)
        } catch (error) {
        res.status(500).json({ error: error.message })
        }
    }

    getByCategory(req, res) {
        try {
        const services = this.HotelServiceService.getByCategory(req.params.category)
        res.json(services)
        } catch (error) {
        res.status(400).json({ error: error.message })
            }
        }
}

export default HotelServiceController;