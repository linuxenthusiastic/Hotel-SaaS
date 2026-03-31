
import { getRoomStrategy, roomTypes } from '../models/RoomStrategy.js'

class RoomService {
    constructor(RoomRepository){
        this.RoomRepository = RoomRepository;
    }
    availableRooms(checkInDate,checkOutDate){
        const rooms = this.RoomRepository.findAvailable(checkInDate,checkOutDate);

        if(!rooms || rooms.length === 0) {
            throw new Error(`No hay habitaciones disponibles en esas fechas`);
        }

        return rooms;
    }

    getAll(){
        return this.RoomRepository.findAll();
    }

    getRoomTypes(){
        return roomTypes;
    }

    applyStrategy(type) {
        const strategy = getRoomStrategy(type)
        return {
            type:        strategy.type,
            capacity:    strategy.capacity,
            description: strategy.description,
            basePrice:   strategy.basePrice,
        }
    }
}

export default RoomService;