import { defineStore } from 'pinia'
import { ref } from 'vue'
import { motorcyclesApi } from '@/services/api'

export const useMotorcycleStore = defineStore('motorcycles', () => {
    const motorcycles = ref([])
    const loading = ref(false)
    const error = ref(null)
    const editingMotorcycle = ref(null)

    const fetchMotorcycles = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await motorcyclesApi.getAll()
            motorcycles.value = response.data
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const getMotorcycleById = async (id) => {
        loading.value = true
        error.value = null

        try {
            const response = await motorcyclesApi.getById(id)
            return response.data
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const createMotorcycle = async (data) => {
        loading.value = true
        error.value = null

        try {
            const response = await motorcyclesApi.create(data)
            motorcycles.value.unshift(response.data)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.error || err.message
            throw new Error(error.value)
        } finally {
            loading.value = false
        }
    }

    const updateMotorcycle = async (id, data) => {
        loading.value = true
        error.value = null

        try {
            const response = await motorcyclesApi.update(id, data)
            const index = motorcycles.value.findIndex(m => m._id === id)

            if (index !== -1) {
                motorcycles.value[index] = response.data
            }

            editingMotorcycle.value = null
            return response.data
        } catch (err) {
            error.value = err.response?.data?.error || err.message
            throw new Error(error.value)
        } finally {
            loading.value = false
        }
    }

    const deleteMotorcycle = async (id) => {
        loading.value = true
        error.value = null

        try {
            await motorcyclesApi.delete(id)
            motorcycles.value = motorcycles.value.filter(m => m._id !== id)
        } catch (err) {
            error.value = err.response?.data?.error || err.message
            throw new Error(error.value)
        } finally {
            loading.value = false
        }
    }

    const setEditingMotorcycle = (motorcycle) => {
        editingMotorcycle.value = { ...motorcycle }
    }

    const clearEditing = () => {
        editingMotorcycle.value = null
    }

    return {
        motorcycles,
        loading,
        error,
        editingMotorcycle,
        fetchMotorcycles,
        getMotorcycleById,
        createMotorcycle,
        updateMotorcycle,
        deleteMotorcycle,
        setEditingMotorcycle,
        clearEditing
    }
})
