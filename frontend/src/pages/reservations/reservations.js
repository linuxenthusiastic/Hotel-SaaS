import { api } from '../../api/client.js'

const PAGE_SIZE = 5

export async function renderReservations(container) {
  container.innerHTML = `
    <div class="card">
      <h2>Nueva reserva</h2>
      <input type="text" id="r-doc" placeholder="Documento del huesped" />
      <button class="primary" id="r-search-guest" style="margin-bottom:10px">Buscar huesped</button>
      <p id="r-guest-info" style="font-size:13px;margin-bottom:10px"></p>
      <input type="hidden" id="r-guest-id" />

      <select id="r-type">
        <option value="">Seleccionar tipo de habitacion...</option>
      </select>

      <div id="r-type-info" style="
        display:none;
        background:#f0fff4;
        border:1px solid #9ae6b4;
        border-radius:8px;
        padding:12px;
        margin-bottom:10px;
        font-size:13px;
        color:#276749;
      "></div>

      <input type="date" id="r-checkin" />
      <input type="date" id="r-checkout" />

      <select id="r-room">
        <option value="">Selecciona tipo y fechas primero...</option>
      </select>

      <button class="primary" id="r-save">Crear reserva</button>
      <p id="r-msg"></p>
    </div>

    <div class="card">
      <h2>Reservas activas</h2>
      <input type="text" id="r-search" placeholder="Buscar por documento del huesped..." />
      <div id="r-list">Cargando...</div>
      <div class="pagination" id="r-pagination"></div>
    </div>
  `

  let allReservations = []
  let currentPage     = 1
  let filtered        = []

  const today = new Date().toISOString().split('T')[0]
  document.getElementById('r-checkin').min  = today
  document.getElementById('r-checkout').min = today

  // Carga los tipos de habitacion desde el Strategy
  async function loadTypes() {
    try {
      const types  = await api.get('/rooms/types')
      const select = document.getElementById('r-type')
      types.forEach(t => {
        const opt = document.createElement('option')
        opt.value       = t
        opt.textContent = t
        select.appendChild(opt)
      })
    } catch (error) {
      console.error('Error cargando tipos:', error.message)
    }
  }

  // Cuando el recepcionista elige un tipo muestra las caracteristicas
  document.getElementById('r-type').addEventListener('change', async (e) => {
    const type     = e.target.value
    const infoBox  = document.getElementById('r-type-info')
    const select   = document.getElementById('r-room')

    if (!type) {
      infoBox.style.display = 'none'
      select.innerHTML = '<option value="">Selecciona tipo y fechas primero...</option>'
      return
    }

    try {
      const info = await api.get(`/rooms/strategy?type=${type}`)
      infoBox.style.display = 'block'
      infoBox.innerHTML = `
        <strong>${info.type}</strong> —
        Capacidad: ${info.capacity} persona(s) |
        ${info.description} |
        Precio base: $${info.basePrice}/noche
      `
    } catch (error) {
      infoBox.style.display = 'none'
    }

    loadRooms()
  })

  async function loadRooms() {
    const checkIn  = document.getElementById('r-checkin').value
    const checkOut = document.getElementById('r-checkout').value
    const type     = document.getElementById('r-type').value
    const select   = document.getElementById('r-room')

    if (!checkIn || !checkOut || !type) return

    select.innerHTML = '<option value="">Cargando habitaciones...</option>'

    try {
      const rooms = await api.get(`/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}&type=${type}`)
      select.innerHTML = '<option value="">Seleccionar habitacion...</option>'
      rooms.forEach(r => {
        const opt = document.createElement('option')
        opt.value       = r.id
        opt.textContent = `Hab. ${r.number} - ${r.type} - $${r.price_per_night}/noche`
        select.appendChild(opt)
      })
    } catch {
      select.innerHTML = '<option value="">No hay habitaciones disponibles</option>'
    }
  }

  document.getElementById('r-checkin').addEventListener('change', loadRooms)
  document.getElementById('r-checkout').addEventListener('change', loadRooms)

  document.getElementById('r-search-guest').addEventListener('click', async () => {
    const doc  = document.getElementById('r-doc').value.trim()
    const info = document.getElementById('r-guest-info')

    if (!doc) {
      info.className   = 'error'
      info.textContent = 'Ingresa un numero de documento'
      return
    }

    try {
      const guest = await api.get(`/guests/doc/${doc}`)
      document.getElementById('r-guest-id').value = guest.id
      info.className   = 'success-msg'
      info.textContent = `Huesped encontrado: ${guest.full_name}`
    } catch {
      info.className   = 'error'
      info.textContent = 'Huesped no encontrado - registralo primero en Huespedes'
      document.getElementById('r-guest-id').value = ''
    }
  })

  document.getElementById('r-save').addEventListener('click', async () => {
    const msg     = document.getElementById('r-msg')
    const btn     = document.getElementById('r-save')
    const guestId = document.getElementById('r-guest-id').value
    const roomId  = document.getElementById('r-room').value
    const checkIn = document.getElementById('r-checkin').value
    const checkOut = document.getElementById('r-checkout').value
    const type    = document.getElementById('r-type').value

    if (!guestId) {
      msg.className = 'error'; msg.textContent = 'Busca un huesped primero'; return
    }
    if (!type) {
      msg.className = 'error'; msg.textContent = 'Selecciona un tipo de habitacion'; return
    }
    if (!checkIn || !checkOut) {
      msg.className = 'error'; msg.textContent = 'Las fechas son obligatorias'; return
    }
    if (!roomId) {
      msg.className = 'error'; msg.textContent = 'Selecciona una habitacion'; return
    }

    btn.disabled    = true
    btn.textContent = 'Creando...'

    try {
      await api.post('/reservations', {
        guest_id:       Number(guestId),
        room_id:        Number(roomId),
        check_in_date:  checkIn,
        check_out_date: checkOut,
      })
      msg.className   = 'success-msg'
      msg.textContent = 'Reserva creada correctamente'
      document.getElementById('r-doc').value             = ''
      document.getElementById('r-guest-id').value        = ''
      document.getElementById('r-guest-info').textContent = ''
      document.getElementById('r-type').selectedIndex   = 0
      document.getElementById('r-type-info').style.display = 'none'
      document.getElementById('r-room').innerHTML        = '<option value="">Selecciona tipo y fechas primero...</option>'
      document.getElementById('r-checkin').value         = ''
      document.getElementById('r-checkout').value        = ''
      await loadAll()
    } catch (error) {
      msg.className   = 'error'
      msg.textContent = error.message
    } finally {
      btn.disabled    = false
      btn.textContent = 'Crear reserva'
    }
  })

  async function loadAll() {
    try {
      allReservations = await api.get('/reservations/active')
      filtered        = allReservations
      render()
    } catch (error) {
      document.getElementById('r-list').innerHTML = `<p class="error">${error.message}</p>`
    }
  }

  function render() {
    const list       = document.getElementById('r-list')
    const pagination = document.getElementById('r-pagination')
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

    if (currentPage > totalPages) currentPage = 1

    const start = (currentPage - 1) * PAGE_SIZE
    const page  = filtered.slice(start, start + PAGE_SIZE)

    if (filtered.length === 0) {
      list.innerHTML       = '<p>No hay reservas activas.</p>'
      pagination.innerHTML = ''
      return
    }

    list.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Huesped</th>
            <th>Habitacion</th>
            <th>Tipo</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          ${page.map(r => `
            <tr>
              <td>${r.guest_name}</td>
              <td>${r.room_number}</td>
              <td>${r.room_type}</td>
              <td>${r.check_in_date}</td>
              <td>${r.check_out_date}</td>
              <td>$${r.total_amount}</td>
              <td><span class="badge ${r.status.toLowerCase()}">${r.status}</span></td>
              <td>
                ${r.status === 'CONFIRMED' ? `
                  <button class="danger" data-cancel="${r.id}">Cancelar</button>
                ` : '-'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="counter">
        Mostrando ${start + 1}-${Math.min(start + PAGE_SIZE, filtered.length)} de ${filtered.length} reservas
      </p>
    `

    list.querySelectorAll('[data-cancel]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.cancel
        if (!confirm('Cancelar esta reserva? Se aplicara mora del 10%')) return
        try {
          await api.patch(`/reservations/${id}/cancel`)
          await loadAll()
        } catch (error) {
          alert(error.message)
        }
      })
    })

    pagination.innerHTML = ''
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button')
      btn.textContent = i
      btn.className   = i === currentPage ? 'active' : ''
      btn.addEventListener('click', () => { currentPage = i; render() })
      pagination.appendChild(btn)
    }
  }

  document.getElementById('r-search').addEventListener('input', (e) => {
    filtered    = allReservations.filter(r =>
      r.guest_document.includes(e.target.value.trim())
    )
    currentPage = 1
    render()
  })

  loadTypes()
  loadAll()
}