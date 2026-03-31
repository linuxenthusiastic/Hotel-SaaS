class SimpleStrategy {
    get type()        { return 'Simple' }
    get capacity()    { return 1 }
    get description() { return 'Habitacion individual, una cama' }
    get basePrice()   { return 50 }
    }

    class DobleStrategy {
    get type()        { return 'Doble' }
    get capacity()    { return 2 }
    get description() { return 'Habitacion doble, dos camas individuales' }
    get basePrice()   { return 80 }
    }

    class DobleMatrimonialStrategy {
    get type()        { return 'Doble matrimonial' }
    get capacity()    { return 2 }
    get description() { return 'Habitacion doble, cama matrimonial' }
    get basePrice()   { return 90 }
}

    class SuiteStrategy {
    get type()        { return 'Suite' }
    get capacity()    { return 3 }
    get description() { return 'Suite de lujo, sala y dormitorio' }
    get basePrice()   { return 150 }
}

    const strategies = {
    'Simple':            new SimpleStrategy(),
    'Doble':             new DobleStrategy(),
    'Doble matrimonial': new DobleMatrimonialStrategy(),
    'Suite':             new SuiteStrategy(),
}

    export function getRoomStrategy(type) {
    const strategy = strategies[type]
    if (!strategy) {
        throw new Error(`Tipo no valido: ${type}. Opciones: ${Object.keys(strategies).join(', ')}`)
    }
    return strategy
}

export const roomTypes = Object.keys(strategies)