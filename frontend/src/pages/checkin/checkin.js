import { api } from '../../api/client.js'

export async function renderCheckin(container) {
  container.innerHTML = `
    <div class="card">
      <h2>Registrar check-in</h2>
      <input type="text" id="ci-doc" placeholder="Documento del huesped" />
      <button class="primary" id="ci-search">Buscar reservas</button>
      <div id="ci-list" style="margin-top:1rem"></div>
      <p id="ci-msg"></p>
    </div>
  `

  document.getElementById('ci-search').addEventListener('click', async () => {
    const doc  = document.getElementById('ci-doc').value.trim()
    const list = document.getElementById('ci-list')
    const msg  = document.getElementById('ci-msg')
    msg.textContent = ''

    if (!doc) {
      msg.className   = 'error'
      msg.textContent = 'Ingresa un numero de documento'
      return
    }

    if (!/^\d+$/.test(doc)) {
      msg.className   = 'error'
      msg.textContent = 'El documento solo puede contener numeros'
      return
    }

    try {
      const guest        = await api.get(`/guests/doc/${doc}`)
      const reservations = await api.get(`/reservations/guest/${guest.id}`)
      const confirmadas  = reservations.filter(r => r.status === 'CONFIRMED')

      if (confirmadas.length === 0) {
        list.innerHTML = '<p>No hay reservas confirmadas para este huesped.</p>'
        return
      }

      list.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Huesped</th>
              <th>Habitacion</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Total</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            ${confirmadas.map(r => `
              <tr>
                <td>${r.guest_name}</td>
                <td>${r.room_number} - ${r.room_type}</td>
                <td>${r.check_in_date}</td>
                <td>${r.check_out_date}</td>
                <td>$${r.total_amount}</td>
                <td>
                  <button class="success" data-id="${r.id}">Hacer check-in</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `

      list.querySelectorAll('[data-id]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id
          btn.disabled    = true
          btn.textContent = 'Procesando...'
          try {
            await api.patch(`/checkin/${id}`)
            msg.className   = 'success-msg'
            msg.textContent = 'Check-in registrado correctamente'
            btn.closest('tr').remove()
          } catch (error) {
            msg.className   = 'error'
            msg.textContent = error.message
            btn.disabled    = false
            btn.textContent = 'Hacer check-in'
          }
        })
      })

    } catch (error) {
      list.innerHTML  = ''
      msg.className   = 'error'
      msg.textContent = error.message
    }
  })
}