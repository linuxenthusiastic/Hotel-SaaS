import db from '../config/database.js'

class CheckinRepository {

  findByReservationId(reservationId) {
    const stmt = db.prepare(`
      SELECT * FROM checkin_checkout WHERE reservation_id = ?
    `)
    return stmt.get(reservationId)
  }

  saveCheckin(reservationId) {
    const stmt = db.prepare(`
      INSERT INTO checkin_checkout (reservation_id, actual_checkin)
      VALUES (@reservationId, CURRENT_TIMESTAMP)
    `)
    const result = stmt.run({ reservationId })
    return this.findByReservationId(reservationId)
  }

  saveCheckout(reservationId, lateCheckout, lateFee, notes) {
    const stmt = db.prepare(`
      UPDATE checkin_checkout
      SET actual_checkout = CURRENT_TIMESTAMP,
          late_checkout   = @lateCheckout,
          late_fee        = @lateFee,
          notes           = @notes
      WHERE reservation_id = @reservationId
    `)
    stmt.run({ reservationId, lateCheckout: lateCheckout ? 1 : 0, lateFee, notes })
    return this.findByReservationId(reservationId)
  }

}

export default new CheckinRepository()