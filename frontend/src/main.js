import './styles/main.css'
import { renderGuests }       from './pages/guests/guests.js'
import { renderReservations } from './pages/reservations/reservations.js'
import { renderCheckin }      from './pages/checkin/checkin.js'
import { renderCheckout }     from './pages/checkout/checkout.js'
import { renderServices }     from './pages/services/services.js'
import './styles/components.css'

const pages = {
  guests:       renderGuests,
  reservations: renderReservations,
  checkin:      renderCheckin,
  checkout:     renderCheckout,
  services:     renderServices,
}

function navigate(page) {
  document.querySelectorAll('nav button').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page)
  })
  pages[page](document.getElementById('content'))
}

document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.page))
})

navigate('guests')