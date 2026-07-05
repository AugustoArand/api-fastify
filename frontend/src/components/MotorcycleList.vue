<template>
  <v-card class="elevation-8" color="surface" style="border: 1px solid rgba(232, 93, 4, 0.3)">
    <v-card-title class="text-h5 text-center text-primary">
      Motos Cadastradas
    </v-card-title>

    <v-card-text>
      <!-- Loading State -->
      <div v-if="loading" class="text-center pa-8">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        />
        <p class="text-grey mt-4">Carregando...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="motorcycles.length === 0" class="text-center pa-8">
        <v-icon icon="mdi-motorbike" size="64" color="grey" />
        <h3 class="text-h6 mt-4">Nenhuma moto cadastrada ainda</h3>
        <p class="text-grey">Use o formulário ao lado para cadastrar sua primeira Harley Davidson!</p>
      </div>

      <!-- Motorcycles List -->
      <div v-else class="motorcycles-container">
        <v-card
          v-for="motorcycle in motorcycles"
          :key="motorcycle._id"
          class="mb-4 elevation-2 motorcycle-card"
          hover
        >
          <v-card-text>
            <!-- Header -->
            <v-row align="center" class="mb-3">
              <v-col>
                <h3 class="text-h6 text-primary font-weight-bold">
                  {{ motorcycle.model }}
                </h3>
              </v-col>
              <v-col cols="auto">
                <v-chip color="primary" label>
                  {{ motorcycle.year }}
                </v-chip>
              </v-col>
            </v-row>

            <!-- Details -->
            <v-row dense class="mb-2">
              <v-col cols="6">
                <div class="text-caption text-grey">Cor:</div>
                <div class="font-weight-medium">{{ motorcycle.color }}</div>
              </v-col>
              <v-col cols="6">
                <div class="text-caption text-grey">Motor:</div>
                <div class="font-weight-medium">{{ motorcycle.engine }}</div>
              </v-col>
            </v-row>

            <!-- Description -->
            <v-alert
              v-if="motorcycle.description"
              type="info"
              variant="tonal"
              density="compact"
              class="mb-3"
            >
              {{ motorcycle.description }}
            </v-alert>

            <!-- Price -->
            <div class="text-h5 text-success font-weight-bold mb-3">
              R$ {{ formatPrice(motorcycle.price) }}
            </div>

            <!-- Actions -->
            <v-row dense>
              <v-col>
                <v-btn
                  color="info"
                  variant="outlined"
                  block
                  prepend-icon="mdi-pencil"
                  @click="editMotorcycle(motorcycle)"
                >
                  Editar
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  color="error"
                  variant="outlined"
                  block
                  prepend-icon="mdi-delete"
                  @click="confirmDelete(motorcycle)"
                >
                  Excluir
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6">
          Confirmar Exclusão
        </v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir a moto <strong>{{ motorcycleToDelete?.model }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey"
            variant="text"
            @click="deleteDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="handleDelete"
            :loading="deleting"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMotorcycleStore } from '@/store/motorcycles'
import { storeToRefs } from 'pinia'

const motorcycleStore = useMotorcycleStore()
const { motorcycles, loading } = storeToRefs(motorcycleStore)

const deleteDialog = ref(false)
const motorcycleToDelete = ref(null)
const deleting = ref(false)
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

onMounted(async () => {
  await motorcycleStore.fetchMotorcycles()
})

const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const editMotorcycle = (motorcycle) => {
  motorcycleStore.setEditingMotorcycle(motorcycle)
  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const confirmDelete = (motorcycle) => {
  motorcycleToDelete.value = motorcycle
  deleteDialog.value = true
}

const handleDelete = async () => {
  deleting.value = true
  try {
    await motorcycleStore.deleteMotorcycle(motorcycleToDelete.value._id)
    showSnackbar('Moto excluída com sucesso!', 'success')
    deleteDialog.value = false
    motorcycleToDelete.value = null
  } catch (error) {
    showSnackbar(error.message || 'Erro ao excluir moto', 'error')
  } finally {
    deleting.value = false
  }
}

const showSnackbar = (message, color) => {
  snackbar.value = {
    show: true,
    message,
    color
  }
}
</script>

<style scoped>
.motorcycles-container {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;
}

.motorcycle-card {
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.motorcycle-card:hover {
  transform: translateX(5px);
}
</style>
