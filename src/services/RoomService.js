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
}

export default RoomService;