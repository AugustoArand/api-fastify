import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Motorcycles API
export const motorcyclesApi = {
    getAll: () => api.get('/api/motorcycles'),
    getById: (id) => api.get(`/api/motorcycles/${id}`),
    create: (data) => api.post('/api/motorcycles', data),
    update: (id, data) => api.put(`/api/motorcycles/${id}`, data),
    delete: (id) => api.delete(`/api/motorcycles/${id}`)
}

// Catalog API
export const catalogApi = {
    getStats: () => api.get('/api/catalog/stats'),
    getEngines: () => api.get('/api/catalog/engines'),
    getMotorcyclesByEngine: (engineType) => api.get(`/api/catalog/engine/${encodeURIComponent(engineType)}`),
    search: (query) => api.get('/api/catalog/search', { params: { q: query } }),
    getAll: () => api.get('/api/catalog/all')
}

// Engine Types API
export const engineTypesApi = {
    getAll: () => api.get('/api/engine-types'),
    getById: (id) => api.get(`/api/engine-types/${id}`),
    getMotorcycles: (id) => api.get(`/api/engine-types/${id}/motorcycles`)
}

// Auth API
export const authApi = {
    getMe: () => api.get('/api/auth/me'),
    updateMe: (data) => api.put('/api/auth/me', data)
}

export default api
