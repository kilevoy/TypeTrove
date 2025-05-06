// Конфигурация
const CONFIG = {
    categories: [
        { id: 'all', name: 'All' },
        { id: 'wedding', name: 'Wedding & Event' },
        { id: 'logo', name: 'Logo & Branding' },
        // ... остальные категории
    ]
};

// Инициализация
async function init() {
    await loadPins();
    renderFilters();
    renderPins();
}

// Загрузка данных
async function loadPins() {
    const response = await fetch('./data/pins.json');
    window.pinsData = await response.json();
}

// Рендер фильтров
function renderFilters() {
    const container = document.getElementById('filterContainer');
    container.innerHTML = CONFIG.categories.map(cat => `
        <button class="filter-btn" 
                data-category="${cat.id}"
                ${cat.id === 'all' ? 'class="active"' : ''}>
            ${cat.name}
        </button>
    `).join('');
}

// Рендер пинов
function renderPins() {
    const grid = document.getElementById('pinGrid');
    grid.innerHTML = window.pinsData.pins
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(pin => `
            <div class="pin-card" data-category="${pin.category}">
                <img src="./assets/images/${pin.filename}" 
                     class="pin-image" 
                     alt="${pin.title}">
                <div class="pin-info">
                    <h3 class="pin-title">${pin.title}</h3>
                    <button class="download-btn">Download Free</button>
                </div>
            </div>
        `).join('');
}

// Фильтрация
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // ... логика фильтрации
    }
});

window.addEventListener('DOMContentLoaded', init);
