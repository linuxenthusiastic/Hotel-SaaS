import { api } from './client.js'

export const GuestAPI = {
    getAll:        ()     => api.get('/guests'),
    getByDocument: (doc)  => api.get(`/guests/doc/${doc}`),
    create:        (data) => api.post('/guests', data),
}