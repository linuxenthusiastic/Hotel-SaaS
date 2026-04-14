class RoomTypeStrategy {
    constructor(roomType) {
        this.roomType = roomType
    }

    get type()        { return this.roomType.type }
    get capacity()    { return this.roomType.capacity }
    get description() { return this.roomType.description }
    get basePrice()   { return this.roomType.base_price }

    calculatePrice(nights) {
      return nights * this.basePrice
    }

    validate() {
        if (!this.roomType) {
        throw new Error('Tipo de habitacion no valido')
        }
        return true
    }

    toJSON() {
        return {
        type:        this.type,
        capacity:    this.capacity,
        description: this.description,
        basePrice:   this.basePrice,
        }
    }
    }

    export function getRoomStrategy(roomType) {
    if (!roomType) {
        throw new Error('Tipo de habitacion no encontrado')
    }
    return new RoomTypeStrategy(roomType)
    }