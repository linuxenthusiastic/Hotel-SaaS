class RoomTypeRepository {
    constructor(db) {
    this.db = db
    }

    findAll() {
        return this.db.prepare(
        'SELECT * FROM room_types ORDER BY base_price ASC'
    ).all()
    }

    findByType(type) {
    return this.db.prepare(
        'SELECT * FROM room_types WHERE type = ?'
    ).get(type)
    }
}

export default RoomTypeRepository