class ReservationController {
    constructor(ReservationService){
        this.ReservationService = ReservationService;
    }
    getAll(req, res) {
    try {
        const reservations = this.ReservationService.getAll()
        res.json(reservations)
    } catch (error) {
        res.status(500).json({ error: error.message })
        }
    }

    getActive(req, res) {
        try {
            const reservations = this.ReservationService.getActive()
            res.json(reservations)
    } catch (error) {
        res.status(500).json({ error: error.message })
        }
    }

    getById(req, res) {
    try {
        const reservation = this.ReservationService.getById(Number(req.params.id))
        res.json(reservation)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
    }

    create(req, res) {
    try {
        const reservation = this.ReservationService.create(req.body)
        res.status(201).json(reservation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    }

    cancel(req, res) {
    try {
        const reservation = this.ReservationService.cancel(Number(req.params.id))
        res.json(reservation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    }

    findByGuestId(req,res){
        try {
            const reservation = this.ReservationService.findByGuestId(Number(req.params.guest_id))
            res.json(reservation)
        } catch(error){
            res.status(400).json({error: error.message});
        }
    }

    availableRooms(req,res){
        try{
            const {checkIn , checkOut} = req.query;
            if(!checkIn && checkOut){
                return res.status(400).json({ error: 'Las fechas son obligatorias' }) 
            }
            const rooms = this.RoomService.availableRooms(checkIn,checkOut)
            res.json(rooms)
        } catch(error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default ReservationController;