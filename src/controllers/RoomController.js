import RoomService from '../services/RoomService.js';

class RoomController {
    availableRooms(req,res){
        try{
            const {checkIn , checkOut} = req.query;
            if(!checkIn || !checkOut){
                return res.status(400).json({ error: 'Las fechas son obligatorias' }) 
            }
            const rooms = RoomService.availableRooms(checkIn,checkOut)
            res.json(rooms)
        } catch(error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default new RoomController();