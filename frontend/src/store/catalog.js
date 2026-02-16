import { defineStore } from 'pinia'
import { ref } from 'vue'
import { catalogApi } from '@/services/api'

export const useCatalogStore = defineStore('catalog', () => {
    const stats = ref(null)
    const engines = ref([])
    const motorcycles = ref([])
    const searchResults = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchStats = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await catalogApi.getStats()
            console.log('Stats API Response:', response.data)
            if (response.data && response.data.success) {
                stats.value = response.data.data
            } else if (response.data) {
                stats.value = response.data
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchEngines = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await catalogApi.getEngines()
            console.log('Engines API Response:', response.data)

            // A API retorna { success: true, count: N, data: [...] }
            if (response.data && response.data.success && response.data.data) {
                engines.value = response.data.data
                console.log('Engines set:', engines.value)
            } else if (Array.isArray(response.data)) {
                // Fallback se vier array direto
                engines.value = response.data
            }
        } catch (err) {
            console.error('Error fetching engines:', err)
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchMotorcyclesByEngine = async (engineType) => {
        loading.value = true
        error.value = null

        try {
            const response = await catalogApi.getMotorcyclesByEngine(engineType)
            if (response.data.success) {
                motorcycles.value = response.data.motorcycles
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const searchMotorcycles = async (query) => {
        loading.value = true
        error.value = null

        try {
            const response = await catalogApi.search(query)
            if (response.data.success) {
                searchResults.value = response.data.data
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchAllMotorcycles = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await catalogApi.getAll()
            if (response.data.success) {
                motorcycles.value = response.data.data
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        stats,
        engines,
        motorcycles,
        searchResults,
        loading,
        error,
        fetchStats,
        fetchEngines,
        fetchMotorcyclesByEngine,
        searchMotorcycles,
        fetchAllMotorcycles
    }
})
