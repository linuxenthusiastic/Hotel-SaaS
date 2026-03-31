class ReservationRepository {
    constructor(db){
        this.db = db
    }
    findAll() {
        const stmt = this.db.prepare(`
        SELECT r.*, 
                g.full_name as guest_name,
                ro.number   as room_number,
                ro.type     as room_type
        FROM reservations r
        JOIN guests g  ON r.guest_id = g.id
        JOIN rooms  ro ON r.room_id  = ro.id
        ORDER BY r.created_at DESC
        `)
        return stmt.all()
    }

    findById(id) {
        const stmt = this.db.prepare(`
        SELECT r.*,
                g.full_name as guest_name,
                ro.number   as room_number,
                ro.type     as room_type
        FROM reservations r
        JOIN guests g  ON r.guest_id = g.id
        JOIN rooms  ro ON r.room_id  = ro.id
        WHERE r.id = ?
        `)
        return stmt.get(id)
    }
    
    findActive() {
        const stmt = this.db.prepare(`
        SELECT r.*,
                g.full_name       as guest_name,
                g.document_number as guest_document,
                ro.number         as room_number,
                ro.type           as room_type
        FROM reservations r
        JOIN guests g  ON r.guest_id = g.id
        JOIN rooms  ro ON r.room_id  = ro.id
        WHERE r.status IN ('CONFIRMED', 'CHECKED_IN')
        ORDER BY r.check_in_date ASC
        `)
        return stmt.all()
    }
    
    save(reservation) {
        const stmt = this.db.prepare(`
        INSERT INTO reservations (guest_id, room_id, check_in_date, check_out_date, total_amount)
        VALUES (@guest_id, @room_id, @check_in_date, @check_out_date, @total_amount)
        `)
        const result = stmt.run(reservation)
        return this.findById(result.lastInsertRowid)
    }
    
    updateStatus(id, status, penaltyAmount = 0) {
        const stmt = this.db.prepare(`
        UPDATE reservations
        SET status = @status, penalty_amount = @penaltyAmount
        WHERE id = @id
        `)
        stmt.run({ id, status, penaltyAmount })
        return this.findById(id)
    }

    findByGuestId(guestId) {
        const stmt = this.db.prepare(`
        SELECT r.*,
                g.full_name as guest_name,
                ro.number   as room_number,
                ro.type     as room_type
        FROM reservations r
        JOIN guests g  ON r.guest_id = g.id
        JOIN rooms  ro ON r.room_id  = ro.id
        WHERE r.guest_id = ?
        AND r.status IN ('CONFIRMED', 'CHECKED_IN')
        ORDER BY r.check_in_date ASC
        `)
        return stmt.all(guestId)
    }
}

export default ReservationRepository;