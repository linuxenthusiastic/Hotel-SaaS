import HotelServiceRepository from '../repositories/HotelServiceRepository.js'

class HotelServiceService {

getAll() {
    return HotelServiceRepository.findAll()
}

getByCategory(category) {
    if (!category) {
    throw new Error('La categoría es obligatoria')
    }
    return HotelServiceRepository.findByCategory(category)
    }
}

export default new HotelServiceService()