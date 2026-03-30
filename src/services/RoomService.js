import RoomRepository from "../repositories/RoomRepository.js";

class RoomService {
    availableRooms(checkInDate,checkOutDate){
        const rooms = RoomRepository.findAvailable(checkInDate,checkOutDate);

        if(!rooms || rooms.length === 0) {
            throw new Error(`No hay habitaciones disponibles en esas fechas`);
        }

        return rooms;
    }
}

export default new RoomService();