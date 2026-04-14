class RoomRepository {
    constructor(db){
        this.db = db
    }
    
    findAll() {
        const query = this.db.prepare('SELECT * FROM rooms WHERE is_active = 1')
        return query.all()
    }

    findById(id){
        const query = this.db.prepare('SELECT * FROM rooms WHERE id = ? AND is_active = 1')
        return query.get(id)
    }

    findAvailable(checkInDate, checkOutDate, type = null) {
        const query = this.db.prepare(`
        SELECT * FROM rooms
        WHERE is_active = 1
        ${type ? 'AND type = @type' : ''}
        AND id NOT IN (
            SELECT room_id FROM reservations
            WHERE status NOT IN ('CANCELLED', 'CHECKED_OUT')
            AND check_in_date  < @checkOutDate
            AND check_out_date > @checkInDate
            )
        `)
        return query.all({ checkInDate, checkOutDate, type })
        }
}

export default RoomRepository;