import { api } from '../../api/client.js'

export async function renderCheckout(container) {
  container.innerHTML = `
    <div class="card">
      <h2>Registrar check-out</h2>
      <input type="text" id="co-doc" placeholder="Documento del huesped" />
      <button class="primary" id="co-search">Buscar reservas</button>
      <div id="co-list" style="margin-top:1rem"></div>
      <p id="co-msg"></p>
    </div>
  `

  document.getElementById('co-search').addEventListener('click', async () => {
    const doc  = document.getElementById('co-doc').value.trim()
    const list = document.getElementById('co-list')
    const msg  = document.getElementById('co-msg')
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
      const activas      = reservations.filter(r => r.status === 'CHECKED_IN')

      if (activas.length === 0) {
        list.innerHTML = '<p>No hay reservas con check-in activo para este huesped.</p>'
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
              <th>Notas</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            ${activas.map(r => `
              <tr data-id="${r.id}">
                <td>${r.guest_name}</td>
                <td>${r.room_number} - ${r.room_type}</td>
                <td>${r.check_in_date}</td>
                <td>${r.check_out_date}</td>
                <td>$${r.total_amount}</td>
                <td>
                  <input
                    type="text"
                    class="co-notes"
                    placeholder="Notas opcionales"
                    style="margin:0;width:150px"
                  />
                </td>
                <td>
                  <button class="success co-btn" data-id="${r.id}">Hacer check-out</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `

      list.querySelectorAll('.co-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id    = btn.dataset.id
          const row   = list.querySelector(`tr[data-id="${id}"]`)
          const notes = row.querySelector('.co-notes').value.trim()

          btn.disabled    = true
          btn.textContent = 'Procesando...'

          try {
            await api.patch(`/checkout/${id}`, { notes })
            msg.className   = 'success-msg'
            msg.textContent = 'Check-out registrado correctamente'
            row.remove()
          } catch (error) {
            msg.className   = 'error'
            msg.textContent = error.message
            btn.disabled    = false
            btn.textContent = 'Hacer check-out'
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