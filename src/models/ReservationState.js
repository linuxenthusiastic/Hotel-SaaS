class ConfirmedState {
    get name() { return 'CONFIRMED' }

    checkin()  { return 'CHECKED_IN' }
    
    cancel()   { return 'CANCELLED' }

    checkout() {
        throw new Error('No se puede hacer check-out de una reserva CONFIRMED')
    }
}

class CancelledState{
    get name() { return 'CANCELLED' }

    checkin() {
    throw new Error('Esta reserva fue cancelada')
    }

    checkout() {
    throw new Error('Esta reserva fue cancelada')
    }

    cancel() {
    throw new Error('Esta reserva ya está cancelada')
    }
}

class CheckedInState  {
    get name() { return 'CHECKED_IN' }

    checkout() { return 'CHECKED_OUT' }

    checkin() {
    throw new Error('Esta reserva ya tiene check-in registrado')
    }

    cancel() {
    throw new Error('No se puede cancelar una reserva con check-in activo')
    }
}

class CheckedOutState  {
    get name() { return 'CHECKED_OUT' }

    checkin() {
    throw new Error('Esta reserva ya fue completada')
    }

    checkout() {
    throw new Error('Esta reserva ya fue completada')
    }

    cancel() {
    throw new Error('Esta reserva ya fue completada')
    }
}

const states = {
    'CONFIRMED':   new ConfirmedState(),
    'CHECKED_IN':  new CheckedInState(),
    'CHECKED_OUT': new CheckedOutState(),
    'CANCELLED':   new CancelledState(),
}

export function getReservationState(status) {
    const state = states[status]
    if (!state) {
    throw new Error(`Estado no válido: ${status}`)
    }
    return state
}