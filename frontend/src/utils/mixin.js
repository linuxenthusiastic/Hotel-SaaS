export const PaginationMixin = {
    paginate(array, page, size) {
        const start = (page - 1) * size
        return array.slice(start, start + size)
    },
    totalPages(array, size) {
        return Math.ceil(array.length / size)
    },
    renderPagination(container, currentPage, totalPages, onPageChange) {
        container.innerHTML = ''
        for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button')
        btn.textContent = i
        btn.className   = i === currentPage ? 'active' : ''
        btn.addEventListener('click', () => onPageChange(i))
        container.appendChild(btn)
        }
    }
    }

    export const FilterMixin = {
    filterByDocument(array, query) {
        return array.filter(item =>
        item.document_number.includes(query)
        )
    },
    filterByName(array, query) {
        return array.filter(item =>
        item.full_name.toLowerCase().includes(query.toLowerCase())
        )
    }
}