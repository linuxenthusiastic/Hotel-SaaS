class GuestRepository {
    constructor(db){
        this.db = db
    }
findAll() {
    const query = this.db.prepare('SELECT * FROM guests ORDER BY created_at DESC')
    return query.all()
}

findById(id) {
    const query = this.db.prepare('SELECT * FROM guests WHERE id = ?')
    return query.get(id)
}

findByDocument(document) {
    const query = this.db.prepare('SELECT * FROM guests WHERE document_number = ?')
    return query.get(document)
}

save(guest) {
    const query = this.db.prepare(`
    INSERT INTO guests (full_name, document_number, email, phone)
    VALUES (@full_name, @document_number, @email, @phone)
    `)
    const result = query.run({
    full_name:       guest.full_name,
    document_number: guest.document_number,
    email:           guest.email,
    phone:           guest.phone
    })
    return this.findById(result.lastInsertRowid)
}

}

export default GuestRepository