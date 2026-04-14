class HotelServiceRepository {
    constructor(db){
        this.db = db
    }
    findAll(){
        const query = this.db.prepare(`
        SELECT * FROM hotel_services WHERE available = 1 ORDER BY category, name
            `)
        return query.all();
    }

    findByCategory(category) {
        const query = this.db.prepare(`
        SELECT * FROM hotel_services WHERE category = ? AND available  = 1
            `)

        return query.all(category);
    }
}

export default HotelServiceRepository;