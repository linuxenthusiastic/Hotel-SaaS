import Guest from './Guest.js'

class GuestFactory {
    static create(data) {
        console.log('DATA QUE LLEGA A LA FACTORY:', data)
        Guest.validate(data)
        return new Guest(data)
}
}

export default GuestFactory