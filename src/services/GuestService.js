import GuestRepository from '../repositories/GuestRepository.js'
import GuestFactory from '../models/GuestFactory.js';
class GuestService {
    findAll(){
        return GuestRepository.findAll();
    }

    findById(id){
        const guest =  GuestRepository.findById(id);

        if(!guest){
            throw new Error(`Huesped con id: ${id} no ha sido encontrado`);
        }

        return guest;
    }

    create(data){
        const guest = GuestFactory.create(data);

        if(GuestRepository.findByDocument(guest.document_number)){
            throw new Error(`Ya existe un huésped con el documento ${guest.document_number}`)
        }

        return GuestRepository.save(guest);
    }
}

export default new GuestService();
