class Guest {
    constructor({ full_name, document_number, email, phone }) {
    this.full_name       = full_name
    this.document_number = document_number
    this.email           = email || null
    this.phone           = phone || null
    }

    static validate(data) {
    if (!data.full_name || data.full_name.trim() === '') {
        throw new Error('El nombre es obligatorio')
    }
    if (!data.document_number || data.document_number.trim() === '') {
        throw new Error('El número de documento es obligatorio')
    }
    }
}

export default Guest