import db from '../config/database.js';

class HotelServiceRepository {
    findAll(){
        const query = db.prepare(`
        SELECT * FROM hotel_services WHERE available = 1 ORDER BY category, name
            `)
        return query.all();
    }

    findByCategory(category) {
        const query = db.prepare(`
        SELECT * FROM hotel_services WHERE category = ? AND available  = 1
            `)

        return query.all(category);
    }
}

export default new HotelServiceRepository();