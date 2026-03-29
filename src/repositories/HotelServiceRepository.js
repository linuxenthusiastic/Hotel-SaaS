import db from '../config/database.js';

class HotelServiceRepository {
    findAll(){
        const query = db.prepare(`
        SELECT * FROM hotel_services WHERE available = 1 ORDER BY category, name
            `)
        return query.all();
    }

    findByCategory() {
        const query = db.prepare(`
        SELECT * FROM hotel_services WHERE category = ? AND avaliable = 1
            `)

        return query.all();
    }
}

export default new HotelServiceRepository();