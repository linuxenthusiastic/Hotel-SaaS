import { getReservationState } from '../models/ReservationState.js'

const LATE_CHECKOUT_HORA_LIMITE = 12;
const LATE_CHECKOUT_CARGO       = 30;

class CheckoutService {
    constructor(CheckinRepository,ReservationRepository){
        this.CheckinRepository = CheckinRepository;
        this.ReservationRepository = ReservationRepository;
    }
    checkout(reservationId, notes = '') {
    const reservation = this.ReservationRepository.findById(reservationId)

    if(!reservation) throw new Error("No existe reservacion con este id");

    const state = getReservationState(reservation.status);
    state.checkout();

    const checkin = this.CheckinRepository.findByReservationId(reservationId)
    if(!checkin) throw new Error("No se encontro el checkin");

    const now = new Date();
    const isLate  = now.getHours() >= LATE_CHECKOUT_HORA_LIMITE
    const lateFee = isLate ? LATE_CHECKOUT_CARGO : 0

    this.CheckinRepository.saveCheckout(reservationId, isLate, lateFee, notes)
    return this.ReservationRepository.updateStatus(reservationId, 'CHECKED_OUT')
    }

}

export default CheckoutService;