<template>
  <v-card class="elevation-8" color="surface" style="border: 1px solid rgba(255, 107, 0, 0.3)">
    <v-card-title class="text-h5 text-center text-primary">
      {{ isEditing ? 'Editar Moto' : 'Cadastrar Nova Moto' }}
    </v-card-title>

    <v-card-text>
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="form.model"
          label="Modelo"
          :rules="[rules.required]"
          variant="outlined"
          color="primary"
          class="mb-2"
        />

        <v-text-field
          v-model.number="form.year"
          label="Ano"
          type="number"
          :rules="[rules.required, rules.year]"
          variant="outlined"
          color="primary"
          class="mb-2"
        />

        <v-text-field
          v-model="form.color"
          label="Cor"
          :rules="[rules.required]"
          variant="outlined"
          color="primary"
          class="mb-2"
        />

        <v-text-field
          v-model="form.engine"
          label="Motor"
          placeholder="ex: Milwaukee-Eight 107"
          :rules="[rules.required]"
          variant="outlined"
          color="primary"
          class="mb-2"
        />

        <v-text-field
          v-model.number="form.price"
          label="Preço (R$)"
          type="number"
          step="0.01"
          :rules="[rules.required, rules.price]"
          variant="outlined"
          color="primary"
          class="mb-2"
        />

        <v-textarea
          v-model="form.description"
          label="Descrição"
          rows="3"
          variant="outlined"
          color="primary"
          class="mb-2"
        />

        <v-row>
          <v-col>
            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="loading"
            >
              {{ isEditing ? 'Atualizar' : 'Cadastrar' }}
            </v-btn>
          </v-col>
          <v-col v-if="isEditing">
            <v-btn
              color="grey"
              size="large"
              block
              @click="handleCancel"
            >
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMotorcycleStore } from '@/store/motorcycles'
import { storeToRefs } from 'pinia'

const motorcycleStore = useMotorcycleStore()
const { editingMotorcycle } = storeToRefs(motorcycleStore)

const formRef = ref(null)
const loading = ref(false)
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const form = ref({
  model: '',
  year: new Date().getFullYear(),
  color: '',
  engine: '',
  price: 0,
  description: ''
})

const isEditing = ref(false)

const rules = {
  required: value => !!value || 'Campo obrigatório',
  year: value => {
    if (!value) return 'Campo obrigatório'
    if (value < 1903) return 'Ano deve ser maior ou igual a 1903'
    if (value > 2026) return 'Ano deve ser menor ou igual a 2026'
    return true
  },
  price: value => {
    if (!value && value !== 0) return 'Campo obrigatório'
    if (value < 0) return 'Preço deve ser maior ou igual a 0'
    return true
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  
  if (!valid) return

  loading.value = true

  try {
    if (isEditing.value) {
      await motorcycleStore.updateMotorcycle(editingMotorcycle.value.id, form.value)
      showSnackbar('Moto atualizada com sucesso!', 'success')
    } else {
      await motorcycleStore.createMotorcycle(form.value)
      showSnackbar('Moto cadastrada com sucesso!', 'success')
    }
    
    resetForm()
    await motorcycleStore.fetchMotorcycles()
  } catch (error) {
    showSnackbar(error.message || 'Erro ao salvar moto', 'error')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  resetForm()
}

const resetForm = () => {
  form.value = {
    model: '',
    year: new Date().getFullYear(),
    color: '',
    engine: '',
    price: 0,
    description: ''
  }
  isEditing.value = false
  motorcycleStore.clearEditing()
  formRef.value?.resetValidation()
}

const showSnackbar = (message, color) => {
  snackbar.value = {
    show: true,
    message,
    color
  }
}

// Watch for editing changes
watch(editingMotorcycle, (newVal) => {
  if (newVal) {
    isEditing.value = true
    form.value = { ...newVal }
  } else {
    isEditing.value = false
  }
})
</script>
