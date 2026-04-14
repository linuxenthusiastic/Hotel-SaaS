import db from './database.js'

import GuestRepository       from '../repositories/GuestRepository.js'
import RoomRepository        from '../repositories/RoomRepository.js'
import ReservationRepository from '../repositories/ReservationRepository.js'
import CheckinRepository     from '../repositories/CheckinRepository.js'
import HotelServiceRepository from '../repositories/HotelServiceRepository.js'

import GuestService       from '../services/GuestService.js'
import RoomService        from '../services/RoomService.js'
import ReservationService from '../services/ReservationService.js'
import CheckinService     from '../services/CheckinService.js'
import CheckoutService    from '../services/CheckoutService.js'
import HotelServiceService from '../services/HotelServiceService.js'

import GuestController       from '../controllers/GuestController.js'
import RoomController        from '../controllers/RoomController.js'
import ReservationController from '../controllers/ReservationController.js'
import CheckinController     from '../controllers/CheckinController.js'
import CheckoutController    from '../controllers/CheckoutController.js'
import HotelServiceController from '../controllers/HotelServiceController.js'

const guestRepo       = new GuestRepository(db)
const roomRepo        = new RoomRepository(db)
const reservationRepo = new ReservationRepository(db)
const checkinRepo     = new CheckinRepository(db)
const hotelServiceRepo = new HotelServiceRepository(db)

const guestService       = new GuestService(guestRepo)
const roomService        = new RoomService(roomRepo)
const reservationService = new ReservationService(reservationRepo, roomRepo, guestRepo)
const checkinService     = new CheckinService(checkinRepo, reservationRepo)
const checkoutService    = new CheckoutService(checkinRepo, reservationRepo)
const hotelServiceService = new HotelServiceService(hotelServiceRepo)

export const guestController       = new GuestController(guestService)
export const roomController        = new RoomController(roomService)
export const reservationController = new ReservationController(reservationService)
export const checkinController     = new CheckinController(checkinService)
export const checkoutController    = new CheckoutController(checkoutService)
export const hotelServiceController = new HotelServiceController(hotelServiceService)