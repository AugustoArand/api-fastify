// Estado da aplicação
let editingId = null;

// Carregar motos ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadMotorcycles();
    setupFormHandler();
    setupCancelButton();
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
