// Estado da aplicação
let editingId = null;

// Carregar motos ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadMotorcycles();
    setupFormHandler();
    setupCancelButton();
    setupCatalogModal();
});

// Configurar handler do formulário
function setupFormHandler() {
    const form = document.getElementById('motorcycle-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            model: document.getElementById('model').value,
            year: parseInt(document.getElementById('year').value),
            color: document.getElementById('color').value,
            engine: document.getElementById('engine').value,
            price: parseFloat(document.getElementById('price').value),
            description: document.getElementById('description').value.trim() || undefined
        };
        
        try {
            if (editingId) {
                await updateMotorcycle(editingId, formData);
            } else {
                await createMotorcycle(formData);
            }
            form.reset();
            editingId = null;
            updateFormUI();
            loadMotorcycles();
        } catch (error) {
            alert('Erro ao salvar moto: ' + error.message);
        }
    });
}

// Configurar botão de cancelar
function setupCancelButton() {
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        document.getElementById('motorcycle-form').reset();
        editingId = null;
        updateFormUI();
    });
}

// Atualizar UI do formulário
function updateFormUI() {
    const submitBtn = document.querySelector('.btn-primary');
    const cancelBtn = document.getElementById('cancel-btn');
    const formTitle = document.querySelector('.form-section h2');
    
    if (editingId) {
        submitBtn.textContent = 'Atualizar';
        cancelBtn.style.display = 'block';
        formTitle.textContent = 'Editar Moto';
    } else {
        submitBtn.textContent = 'Cadastrar';
        cancelBtn.style.display = 'none';
        formTitle.textContent = 'Cadastrar Nova Moto';
    }
}

// Criar nova moto
async function createMotorcycle(data) {
    const response = await fetch('/api/motorcycles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao criar moto');
    }
    
    return response.json();
}

// Carregar todas as motos
async function loadMotorcycles() {
    const listContainer = document.getElementById('motorcycles-list');
    listContainer.innerHTML = '<div class="loading">Carregando...</div>';
    
    try {
        const response = await fetch('/api/motorcycles');
        const motorcycles = await response.json();
        
        if (motorcycles.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <p>🏍️ Nenhuma moto cadastrada ainda</p>
                    <small>Use o formulário ao lado para cadastrar sua primeira Harley Davidson!</small>
                </div>
            `;
            return;
        }
        
        listContainer.innerHTML = motorcycles.map(motorcycle => createMotorcycleCard(motorcycle)).join('');
    } catch (error) {
        listContainer.innerHTML = `
            <div class="error-message">
                Erro ao carregar motos: ${error.message}
            </div>
        `;
    }
}

// Criar card de moto
function createMotorcycleCard(motorcycle) {
    return `
        <div class="motorcycle-card">
            <div class="motorcycle-header">
                <div class="motorcycle-title">${motorcycle.model}</div>
                <div class="motorcycle-year">${motorcycle.year}</div>
            </div>
            
            <div class="motorcycle-details">
                <div class="detail-item">
                    <span class="detail-label">Cor:</span>
                    <span>${motorcycle.color}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Motor:</span>
                    <span>${motorcycle.engine}</span>
                </div>
            </div>
            
            ${motorcycle.description ? `
                <div class="motorcycle-description">
                    ${motorcycle.description}
                </div>
            ` : ''}
            
            <div class="motorcycle-price">
                R$ ${parseFloat(motorcycle.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            
            <div class="motorcycle-actions">
                <button class="btn-edit" onclick="editMotorcycle(${motorcycle.id})">✏️ Editar</button>
                <button class="btn-delete" onclick="deleteMotorcycle(${motorcycle.id})">🗑️ Excluir</button>
            </div>
        </div>
    `;
}

// Editar moto
async function editMotorcycle(id) {
    try {
        const response = await fetch(`/api/motorcycles/${id}`);
        const motorcycle = await response.json();
        
        document.getElementById('model').value = motorcycle.model;
        document.getElementById('year').value = motorcycle.year;
        document.getElementById('color').value = motorcycle.color;
        document.getElementById('engine').value = motorcycle.engine;
        document.getElementById('price').value = motorcycle.price;
        document.getElementById('description').value = motorcycle.description || '';
        
        editingId = id;
        updateFormUI();
        
        // Scroll para o formulário
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        alert('Erro ao carregar moto: ' + error.message);
    }
}

// Atualizar moto
async function updateMotorcycle(id, data) {
    const response = await fetch(`/api/motorcycles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar moto');
    }
    
    return response.json();
}

// Deletar moto
async function deleteMotorcycle(id) {
    if (!confirm('Tem certeza que deseja excluir esta moto?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/motorcycles/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao excluir moto');
        }
        
        loadMotorcycles();
    } catch (error) {
        alert('Erro ao excluir moto: ' + error.message);
    }
}

// ========================================
// Catalog Modal Functions
// ========================================

let selectedEngine = null;
let catalogData = null;

// Configurar modal de catálogo
function setupCatalogModal() {
    const catalogBtn = document.getElementById('catalog-btn');
    const closeBtn = document.getElementById('close-catalog-btn');
    const modal = document.getElementById('catalog-modal');
    const searchBtn = document.getElementById('catalog-search-btn');
    const searchInput = document.getElementById('catalog-search-input');
    
    // Abrir modal
    catalogBtn.addEventListener('click', async () => {
        modal.classList.add('active');
        await loadCatalogStats();
        await loadEngineTypes();
    });
    
    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        selectedEngine = null;
    });
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            selectedEngine = null;
        }
    });
    
    // Buscar no catálogo
    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            await searchCatalog(query);
        }
    });
    
    // Buscar ao pressionar Enter
    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                await searchCatalog(query);
            }
        }
    });
}

// Carregar estatísticas do catálogo
async function loadCatalogStats() {
    const statsContainer = document.getElementById('catalog-stats');
    
    try {
        const response = await fetch('/api/catalog/stats');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error('Erro ao carregar estatísticas');
        }
        
        const stats = result.data;
        const categoriesHTML = Object.entries(stats.categories)
            .map(([cat, count]) => `
                <div class="stat-item">
                    <span class="stat-value">${count}</span>
                    <span class="stat-label">${cat}</span>
                </div>
            `).join('');
        
        statsContainer.innerHTML = `
            <h3>📊 Estatísticas do Catálogo</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-value">${stats.totalEngineTypes}</span>
                    <span class="stat-label">Tipos de Motor</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${stats.totalMotorcycles}</span>
                    <span class="stat-label">Motos no Catálogo</span>
                </div>
                ${categoriesHTML}
            </div>
        `;
    } catch (error) {
        statsContainer.innerHTML = `<div class="error-message">Erro ao carregar estatísticas</div>`;
    }
}

// Carregar tipos de motores
async function loadEngineTypes() {
    const enginesContainer = document.getElementById('catalog-engines');
    enginesContainer.innerHTML = '<div class="loading">Carregando motores...</div>';
    
    try {
        const response = await fetch('/api/catalog/engines');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error('Erro ao carregar motores');
        }
        
        const engines = result.data;
        
        enginesContainer.innerHTML = `
            <h3>🔧 Selecione o Tipo de Motor</h3>
            <div class="engines-grid">
                ${engines.map(engine => `
                    <button class="engine-btn" data-engine="${engine.name}">
                        <span class="engine-name">${engine.name}</span>
                        <span class="engine-count">${engine.count} moto${engine.count > 1 ? 's' : ''}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Adicionar event listeners
        document.querySelectorAll('.engine-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                document.querySelectorAll('.engine-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedEngine = btn.dataset.engine;
                await loadMotorcyclesByEngine(selectedEngine);
            });
        });
        
    } catch (error) {
        enginesContainer.innerHTML = `<div class="error-message">Erro ao carregar motores</div>`;
    }
}

// Carregar motos por tipo de motor
async function loadMotorcyclesByEngine(engineType) {
    const motorcyclesContainer = document.getElementById('catalog-motorcycles');
    motorcyclesContainer.innerHTML = '<div class="loading">Carregando motos...</div>';
    
    try {
        const response = await fetch(`/api/catalog/engine/${encodeURIComponent(engineType)}`);
        const result = await response.json();
        
        if (!result.success) {
            throw new Error('Erro ao carregar motos');
        }
        
        const motorcycles = result.motorcycles;
        
        motorcyclesContainer.innerHTML = `
            <h3>🏍️ ${engineType} (${motorcycles.length} modelo${motorcycles.length > 1 ? 's' : ''})</h3>
            <div class="motorcycles-grid">
                ${motorcycles.map(moto => renderCatalogCard(moto)).join('')}
            </div>
        `;
        
        // Scroll suave para as motos
        motorcyclesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        motorcyclesContainer.innerHTML = `<div class="error-message">Erro ao carregar motos</div>`;
    }
}

// Buscar no catálogo
async function searchCatalog(query) {
    const motorcyclesContainer = document.getElementById('catalog-motorcycles');
    motorcyclesContainer.innerHTML = '<div class="loading">Buscando...</div>';
    
    // Limpar seleção de motor
    document.querySelectorAll('.engine-btn').forEach(b => b.classList.remove('active'));
    selectedEngine = null;
    
    try {
        const response = await fetch(`/api/catalog/search?q=${encodeURIComponent(query)}`);
        const result = await response.json();
        
        if (!result.success) {
            throw new Error('Erro ao buscar motos');
        }
        
        const motorcycles = result.data;
        
        if (motorcycles.length === 0) {
            motorcyclesContainer.innerHTML = `
                <div class="empty-state">
                    <p>🔍 Nenhuma moto encontrada</p>
                    <small>Tente buscar por outro termo</small>
                </div>
            `;
            return;
        }
        
        motorcyclesContainer.innerHTML = `
            <h3>🔍 Resultados da busca "${query}" (${motorcycles.length} encontrada${motorcycles.length > 1 ? 's' : ''})</h3>
            <div class="motorcycles-grid">
                ${motorcycles.map(moto => renderCatalogCard(moto)).join('')}
            </div>
        `;
        
        motorcyclesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        motorcyclesContainer.innerHTML = `<div class="error-message">Erro ao buscar motos</div>`;
    }
}

// Renderizar card de moto do catálogo
function renderCatalogCard(moto) {
    return `
        <div class="catalog-card">
            <img src="${moto.image}" alt="${moto.model}" onerror="this.src='https://via.placeholder.com/400x200/333/ff6b00?text=Harley-Davidson'">
            <h4>${moto.model}</h4>
            <div class="catalog-card-detail">
                <strong>Ano:</strong>
                <span>${moto.year}</span>
            </div>
            <div class="catalog-card-detail">
                <strong>Motor:</strong>
                <span>${moto.engine}</span>
            </div>
            ${moto.displacement ? `
                <div class="catalog-card-detail">
                    <strong>Cilindrada:</strong>
                    <span>${moto.displacement}</span>
                </div>
            ` : ''}
            ${moto.power ? `
                <div class="catalog-card-detail">
                    <strong>Potência:</strong>
                    <span>${moto.power}</span>
                </div>
            ` : ''}
            ${moto.torque ? `
                <div class="catalog-card-detail">
                    <strong>Torque:</strong>
                    <span>${moto.torque}</span>
                </div>
            ` : ''}
            <div class="price">R$ ${moto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            ${moto.description ? `<div class="description">${moto.description}</div>` : ''}
            <span class="category">${moto.category}</span>
        </div>
    `;
}
