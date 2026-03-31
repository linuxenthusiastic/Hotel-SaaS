import { api } from '../../api/client.js'

export async function renderServices(container) {
  container.innerHTML = `
    <div class="card">
      <h2>Servicios del hotel</h2>
      <div style="display:flex;gap:8px;margin-bottom:1rem">
        <button class="primary" data-cat="">Todos</button>
        <button class="primary" data-cat="Interno">Internos</button>
        <button class="primary" data-cat="Externo">Externos</button>
      </div>
      <div id="s-list">Cargando...</div>
    </div>
  `

  async function load(category = '') {
    const list = document.getElementById('s-list')
    try {
      const data = category
        ? await api.get(`/hotel-services/${category}`)
        : await api.get('/hotel-services')

      if (data.length === 0) {
        list.innerHTML = '<p>No hay servicios disponibles.</p>'
        return
      }

      list.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Telefono</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(s => `
              <tr>
                <td>${s.name}</td>
                <td>${s.category}</td>
                <td>${s.phone || '-'}</td>
                <td>${s.description || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `
    } catch (error) {
      list.innerHTML = `<p class="error">${error.message}</p>`
    }
  }

  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => load(btn.dataset.cat))
  })

  load()
}