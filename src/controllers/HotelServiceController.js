import HotelServiceService from '../services/HotelServiceService.js'

class HotelServiceController {

getAll(req, res) {
    try {
    const services = HotelServiceService.getAll()
    res.json(services)
    } catch (error) {
    res.status(500).json({ error: error.message })
    }
}

getByCategory(req, res) {
    try {
    const services = HotelServiceService.getByCategory(req.params.category)
    res.json(services)
    } catch (error) {
    res.status(400).json({ error: error.message })
        }
    }
}

export default new HotelServiceController()