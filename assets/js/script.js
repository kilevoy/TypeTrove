const CATEGORIES = [
    'all', 'wedding', 'logo', 'cricut', 
    'holiday', 'retro', 'modern', 'calligraphy'
];

async function init() {
    await loadData();
    renderFilters();
    renderPins();
    setupEventListeners();
}

async function loadData() {
    const response = await fetch('../data/pins.json');
    window.pinsData = await response.json();
}

function renderFilters() {
    const container = document.getElementById('filtersContainer');
    container.innerHTML = CATEGORIES.map(cat => `
        <button class="filter-btn" 
                data-category="${cat}"
                ${cat === 'all' ? 'class="active"' : ''}>
            ${cat.replace(/^\w/, c => c.toUpperCase())}
        </button>
    `).join('');
}

function renderPins() {
    const grid = document.getElementById('pinGrid');
    grid.innerHTML = window.pinsData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(pin => `
            <div class="pin-card" data-category="${pin.category}">
                <img src="assets/images/${pin.filename}" 
                     class="pin-image" 
                     alt="${pin.title}">
                <div class="pin-info">
                    <h3 class="pin-title">${pin.title}</h3>
                    <button class="download-btn">Download Free</button>
                </div>
            </div>
        `).join('');
}

function setupEventListeners() {
    document.addEventListener('click', handleFilterClick);
}

function handleFilterClick(e) {
    if (e.target.classList.contains('filter-btn')) {
        const category = e.target.dataset.category;
        filterPins(category);
        updateActiveButton(e.target);
    }
}

// Полная реализация функций фильтрации

window.addEventListener('DOMContentLoaded', init);
