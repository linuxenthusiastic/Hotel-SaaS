import './styles/main.css'
import { renderGuests } from './pages/guests.js'
import { renderReservations } from './pages/reservations.js'
import { renderCheckin } from './pages/checkin.js'
import { renderCheckout } from './pages/checkout.js'
import { renderServices } from './pages/services.js'

const app = document.getElementById('app')

app.innerHTML = `
  <nav>
    <span>Hotel</span>
    <button class="active" data-page="guests">Huéspedes</button>
    <button data-page="reservations">Reservas</button>
    <button data-page="checkin">Check-in</button>
    <button data-page="checkout">Check-out</button>
    <button data-page="services">Servicios</button>
  </nav>
  <div id="content"></div>
`

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