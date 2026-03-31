class RoomController {
    constructor(RoomService){
        this.RoomService = RoomService;
    }
    availableRooms(req,res){
        try{
            const {checkIn , checkOut} = req.query;
            if(!checkIn || !checkOut){
                return res.status(400).json({ error: 'Las fechas son obligatorias' }) 
            }
            const rooms = this.RoomService.availableRooms(checkIn,checkOut)
            res.json(rooms)
        } catch(error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default RoomController;