import CheckinRepository from '../repositories/CheckinRepository.js'
import ReservationRepository from '../repositories/ReservationRepository.js'

const LATE_CHECKOUT_HORA_LIMITE = 12;
const LATE_CHECKOUT_CARGO       = 30;

class CheckoutService {
    
    checkout(reservationId, notes = '') {
    const reservation = ReservationRepository.findById(reservationId)

    if (!reservation) {
        throw new Error('Reserva no encontrada')
    }

    if (reservation.status !== 'CHECKED_IN') {
        throw new Error(`No se puede hacer check-out de una reserva en estado ${reservation.status}`)
    }

    const checkin = CheckinRepository.findByReservationId(reservationId)
    if (!checkin) {
        throw new Error('No se encontró registro de check-in para esta reserva')
    }

    const now           = new Date()
    const isLate        = now.getHours() >= LATE_CHECKOUT_HORA_LIMITE
    const lateFee       = isLate ? LATE_CHECKOUT_CARGO : 0

    CheckinRepository.saveCheckout(reservationId, isLate, lateFee, notes)
    return ReservationRepository.updateStatus(reservationId, 'CHECKED_OUT')
}

}

export default new CheckoutService()