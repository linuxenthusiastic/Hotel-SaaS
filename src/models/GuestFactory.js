import Guest from './Guest.js'

class GuestFactory {
    static create(data) {
        Guest.validate(data)
        return new Guest(data)
    }
}

export default GuestFactory