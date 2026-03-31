import { GuestAPI }                    from '../../api/GuestAPI.js'
import { PaginationMixin, FilterMixin } from '../../utils/mixin.js'

const PAGE_SIZE = 5

export async function renderGuests(container) {
    container.innerHTML = `
    <div class="card">
        <h2>Registrar huésped</h2>
        <input type="text"  id="g-name"  placeholder="Nombre completo" />
        <input type="text"  id="g-doc"   placeholder="Número de documento" />
        <input type="email" id="g-email" placeholder="Email (opcional)" />
        <input type="text"  id="g-phone" placeholder="Teléfono (opcional)" />
        <button class="primary" id="g-save">Registrar</button>
        <p id="g-msg"></p>
    </div>

    <div class="card">
        <h2>Huéspedes registrados</h2>
        <input type="text" id="g-search" placeholder="Buscar por número de documento..." />
        <div id="g-list">Cargando...</div>
        <div class="pagination" id="g-pagination"></div>
    </div>
    `

    let allGuests   = []
    let currentPage = 1
    let filtered    = []

    async function loadAll() {
    try {
        allGuests = await GuestAPI.getAll()
        filtered  = allGuests
        render()
    } catch (error) {
        document.getElementById('g-list').innerHTML = `<p class="error">${error.message}</p>`
    }
    }

    function render() {
    const list       = document.getElementById('g-list')
    const pagination = document.getElementById('g-pagination')
    const total      = PaginationMixin.totalPages(filtered, PAGE_SIZE)

    if (currentPage > total) currentPage = 1

    const page = PaginationMixin.paginate(filtered, currentPage, PAGE_SIZE)
    const start = (currentPage - 1) * PAGE_SIZE

    if (filtered.length === 0) {
        list.innerHTML   = '<p>No se encontraron huéspedes.</p>'
        pagination.innerHTML = ''
        return
    }

    list.innerHTML = `
        <table>
        <thead>
            <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Teléfono</th>
            </tr>
        </thead>
        <tbody>
            ${page.map(g => `
            <tr>
                <td>${g.full_name}</td>
                <td>${g.document_number}</td>
                <td>${g.email || '—'}</td>
                <td>${g.phone || '—'}</td>
            </tr>
            `).join('')}
        </tbody>
        </table>
        <p class="counter">
        Mostrando ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} de ${filtered.length} huéspedes
        </p>
    `

    PaginationMixin.renderPagination(pagination, currentPage, total, (page) => {
        currentPage = page
        render()
    })
    }

    document.getElementById('g-search').addEventListener('input', (e) => {
    filtered    = FilterMixin.filterByDocument(allGuests, e.target.value.trim())
    currentPage = 1
    render()
    })

    document.getElementById('g-save').addEventListener('click', async () => {
    const msg   = document.getElementById('g-msg')
    const btn   = document.getElementById('g-save')
    const name  = document.getElementById('g-name').value.trim()
    const doc   = document.getElementById('g-doc').value.trim()
    const email = document.getElementById('g-email').value.trim()
    const phone = document.getElementById('g-phone').value.trim()

    if (!name) {
        msg.className = 'error'; msg.textContent = 'El nombre es obligatorio'; return
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name)) {
        msg.className = 'error'; msg.textContent = 'El nombre solo puede contener letras'; return
    }
    if (!doc) {
        msg.className = 'error'; msg.textContent = 'El documento es obligatorio'; return
    }
    if (!/^\d+$/.test(doc)) {
        msg.className = 'error'; msg.textContent = 'El documento solo puede contener números'; return
    }
    if (phone && !/^\d+$/.test(phone)) {
        msg.className = 'error'; msg.textContent = 'El teléfono solo puede contener números'; return
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.className = 'error'; msg.textContent = 'El email no tiene formato válido'; return
    }

    btn.disabled    = true
    btn.textContent = 'Registrando...'

    try {
        await GuestAPI.create({ full_name: name, document_number: doc, email, phone })
        msg.className   = 'success-msg'
        msg.textContent = 'Huésped registrado correctamente'
        document.getElementById('g-name').value  = ''
        document.getElementById('g-doc').value   = ''
        document.getElementById('g-email').value = ''
        document.getElementById('g-phone').value = ''
        await loadAll()
    } catch (error) {
        msg.className   = 'error'
        msg.textContent = error.message
    } finally {
        btn.disabled    = false
        btn.textContent = 'Registrar'
    }
    })

    loadAll()
}