import GuestService from '../services/GuestService.js';

class GuestController {
    getAll(req,res){
        try {
            const guests = GuestService.findAll();
            res.json(guests);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    getById(req, res) {
        try {
        const guest = GuestService.findById(Number(req.params.id))
        res.json(guest)
        } catch (error) {
        res.status(404).json({ error: error.message })
        }
    }
    
    create(req, res) {
        try {
        const guest = GuestService.create(req.body)
        res.status(201).json(guest)
        } catch (error) {
        res.status(400).json({ error: error.message })
        }
    }

    getByDocument(req,res){
        try{
            const guest = GuestService.findByDocument(req.params.document)
            res.json(guest)
        } catch(error) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default new GuestController();