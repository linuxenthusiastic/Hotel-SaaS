import CheckinRepository from '../repositories/CheckinRepository.js'
import ReservationRepository from '../repositories/ReservationRepository.js'

class CheckinService {
    checkin(reservationId){
        const reservation = ReservationRepository.findById(reservationId)

        if(!reservation){
            throw new Error("No existe reserva con este id");
        }

        if(reservation.status !== 'CONFIRMED'){
            throw new Error(`No se puede hacer check-in de una reserva en estado ${reservation.status}`)
        }

        const existing = CheckinRepository.findByReservationId(reservationId)
        if (existing) {
            throw new Error('Esta reserva ya tiene un check-in registrado')
        }

        CheckinRepository.saveCheckin(reservationId)
        return ReservationRepository.updateStatus(reservationId, 'CHECKED_IN')
    }
}

export default new CheckinService()
