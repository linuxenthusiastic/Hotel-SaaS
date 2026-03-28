import db from '../config/database.js';

class HotelServiceRepository {
    findAll(){
        const QueryDB = db.prepare(`
        SELECT * FROM hotel_services WHERE available = 1 ORDER BY category, name
            `)
        return QueryDB.all();
    }

    findByCategory() {
        const QueryDB = db.prepare(`
        SELECT * FROM hotel_services WHERE category = ? AND avaliable = 1
            `)

        return QueryDB.all();
    }
}

export default new HotelServiceRepository();