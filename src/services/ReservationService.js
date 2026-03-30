import ReservationRepository from '../repositories/ReservationRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import GuestRepository from '../repositories/GuestRepository.js'

const MORA_PORCENTAJE = 0.10;

class ReservationService {
    getAll() {
    return ReservationRepository.findAll()
    }
    getActive() {
    return ReservationRepository.findActive()
    }   

    getById(id) {
    const reservation = ReservationRepository.findById(id)
    if (!reservation) {
        throw new Error(`Reserva con id ${id} no encontrada`)
    }
    return reservation
    }

    create(data) {
    const guest = GuestRepository.findById(data.guest_id)
    if (!guest) {
        throw new Error('El huésped no existe')
    }

    const room = RoomRepository.findById(data.room_id)
    if (!room) {
        throw new Error('La habitación no existe o no está activa')
    }

    if (data.check_in_date >= data.check_out_date) {
        throw new Error('La fecha de salida debe ser posterior a la fecha de entrada')
    }

    const available = RoomRepository.findAvailable(data.check_in_date, data.check_out_date)
    const isAvailable = available.some(r => r.id === data.room_id)
    if (!isAvailable) {
        throw new Error('La habitación no está disponible en esas fechas')
    }

    const checkIn  = new Date(data.check_in_date)
    const checkOut = new Date(data.check_out_date)
    const nights   = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    const total    = nights * room.price_per_night

    return ReservationRepository.save({
        ...data,
        total_amount: total
    })
    }

    cancel(id) {
    const reservation = this.getById(id)

    if (reservation.status !== 'CONFIRMED') {
        throw new Error(`No se puede cancelar una reserva en estado ${reservation.status}`)
    }

    const penalty = reservation.total_amount * MORA_PORCENTAJE

    return ReservationRepository.updateStatus(id, 'CANCELLED', penalty)
    }

    findByGuestId(guestId){
        const reservation = ReservationRepository.findByGuestId(guestId);
        if(!reservation || reservation.length === 0) {
            throw new Error(`Reserva relacionada a ${guestId} no encontrada`);
        }
        return reservation;
    }

    availableRooms(checkInDate,checkOutDate){
        const rooms = RoomRepository.findAvailable(checkInDate,checkOutDate);

        if(!rooms || rooms.length === 0) {
            throw new Error(`No hay habitaciones disponibles en esas fechas`);
        }

        return rooms;
    }
}

export default new ReservationService()