import db from '../config/database.js';

class RoomRepository {
    findAll() {
        const query = db.prepare('SELECT * FROM rooms WHERE is_active = 1')
        return query.all()
    }

    findById(){
        const query = db.prepare('SELECT * FROM rooms WHERE id = ? AND is_active = 1')
        return query.get(id)
    }

    findAvailable(checkInDate, checkOutDate) {
        const query = db.prepare(`
        SELECT * FROM rooms
        WHERE is_active = 1
        AND id NOT IN (
            SELECT room_id FROM reservations
            WHERE status NOT IN ('CANCELLED', 'CHECKED_OUT')
            AND check_in_date  < @checkOutDate
            AND check_out_date > @checkInDate
        )
        `)
        return query.all({ checkInDate, checkOutDate })
    }
}

export default new RoomRepository();