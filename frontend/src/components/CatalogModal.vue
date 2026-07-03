<template>
  <v-card color="background">
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="text-h5 font-weight-bold">
        <v-icon icon="mdi-engine" class="mr-2" />
        Catálogo Harley-Davidson por Tipo de Motor
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon="mdi-close"
        @click="$emit('close')"
      />
    </v-toolbar>

      <v-card-text class="pa-6" style="overflow-y: auto; max-height: calc(100vh - 64px);">
        <!-- Search Bar -->
        <v-card class="mb-6 elevation-4" color="surface">
          <v-card-text class="pa-4">
            <v-text-field
              v-model="searchQuery"
              label="Buscar modelo, motor, categoria..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              color="primary"
              hide-details
              @keyup.enter="handleSearch"
            >
              <template #append>
                <v-btn
                  color="primary"
                  @click="handleSearch"
                  class="ml-2"
                >
                  Buscar
                </v-btn>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>

        <!-- Statistics -->
        <v-card class="mb-6 elevation-4" color="surface" v-if="stats">
          <v-card-title class="text-h6 py-4">
            <v-icon icon="mdi-chart-bar" class="mr-2" />
            Estatísticas do Catálogo
          </v-card-title>
          <v-card-text class="pb-4">
            <v-row dense>
              <v-col cols="6" sm="4" md="2">
                <v-sheet color="primary" rounded class="pa-3 text-center">
                  <div class="text-h5 font-weight-bold">{{ stats.totalEngineTypes }}</div>
                  <div class="text-caption mt-1">Tipos de Motor</div>
                </v-sheet>
              </v-col>
              <v-col cols="6" sm="4" md="2">
                <v-sheet color="secondary" rounded class="pa-3 text-center">
                  <div class="text-h5 font-weight-bold">{{ stats.totalMotorcycles }}</div>
                  <div class="text-caption mt-1">Motos no Catálogo</div>
                </v-sheet>
              </v-col>
              <v-col 
                v-for="(count, category) in stats.categories" 
                :key="category"
                cols="6" sm="4" md="2"
              >
                <v-sheet color="accent" rounded class="pa-3 text-center">
                  <div class="text-h5 font-weight-bold">{{ count }}</div>
                  <div class="text-caption mt-1">{{ category }}</div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Engine Types -->
        <v-card class="mb-6 elevation-4" color="surface" v-if="!searchMode">
          <v-card-title class="text-h6 py-4">
            <v-icon icon="mdi-engine" class="mr-2" />
            Selecione o Tipo de Motor
          </v-card-title>
          <v-card-text class="pb-4">
            <!-- Loading State -->
            <div v-if="!storeEngines || storeEngines.length === 0" class="text-center py-8">
              <v-progress-circular indeterminate color="primary" />
              <p class="text-grey mt-4">Carregando tipos de motor...</p>
            </div>
            
            <!-- Engine Buttons -->
            <v-row v-else>
              <v-col
                v-for="engine in storeEngines"
                :key="engine.name"
                cols="12" sm="6" md="4" lg="3"
              >
                <v-btn
                  block
                  size="large"
                  variant="outlined"
                  @click="selectEngine(engine.name)"
                  class="text-none pa-4 engine-btn"
                  :class="{ 'engine-btn-selected': selectedEngine === engine.name }"
                  style="height: auto !important; white-space: normal;"
                >
                  <div style="width: 100%; text-align: left;">
                    <div class="font-weight-bold mb-1">{{ engine.name }}</div>
                    <div class="text-caption">{{ engine.count }} moto{{ engine.count > 1 ? 's' : '' }}</div>
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Motorcycles List -->
        <v-card v-if="motorcycles.length > 0" class="mb-6 elevation-4" color="surface">
          <v-card-title class="text-h6 py-4">
            <v-icon icon="mdi-motorbike" class="mr-2" />
            {{ searchMode ? `Resultados da busca "${searchQuery}"` : selectedEngine }}
            ({{ motorcycles.length }} modelo{{ motorcycles.length > 1 ? 's' : '' }})
          </v-card-title>
          <v-card-text class="pb-4">
            <v-row dense>
              <v-col
                v-for="moto in motorcycles"
                :key="moto.model"
                cols="12" sm="6" md="4" lg="3"
              >
                <v-card class="elevation-2" hover>
                  <v-img
                    :src="moto.image"
                    height="200"
                    cover
                    class="text-white"
                  >
                    <template #error>
                      <v-img
                        src="/images/fat-boy-softail-2001.jpg"
                        height="200"
                        class="bg-surface"
                      />
                    </template>
                  </v-img>
                  
                  <v-card-title class="text-h6">
                    {{ moto.model }}
                  </v-card-title>
                  
                  <v-card-text>
                    <v-list density="compact" bg-color="transparent">
                      <v-list-item>
                        <template #prepend>
                          <v-icon icon="mdi-calendar" color="primary" />
                        </template>
                        <v-list-item-title>Ano: {{ moto.year }}</v-list-item-title>
                      </v-list-item>
                      
                      <v-list-item>
                        <template #prepend>
                          <v-icon icon="mdi-engine" color="primary" />
                        </template>
                        <v-list-item-title>{{ moto.engine }}</v-list-item-title>
                      </v-list-item>
                      
                      <v-list-item v-if="moto.displacement">
                        <template #prepend>
                          <v-icon icon="mdi-speedometer" color="primary" />
                        </template>
                        <v-list-item-title>{{ moto.displacement }}</v-list-item-title>
                      </v-list-item>
                      
                      <v-list-item v-if="moto.power">
                        <template #prepend>
                          <v-icon icon="mdi-flash" color="primary" />
                        </template>
                        <v-list-item-title>{{ moto.power }}</v-list-item-title>
                      </v-list-item>
                      
                      <v-list-item v-if="moto.torque">
                        <template #prepend>
                          <v-icon icon="mdi-gauge" color="primary" />
                        </template>
                        <v-list-item-title>{{ moto.torque }}</v-list-item-title>
                      </v-list-item>
                      
                      <v-list-item v-if="moto.category">
                        <template #prepend>
                          <v-icon icon="mdi-tag" color="primary" />
                        </template>
                        <v-list-item-title>{{ moto.category }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Empty State -->
        <v-card v-if="searchMode && motorcycles.length === 0" class="mb-6 elevation-4" color="surface">
          <v-card-text class="text-center pa-12">
            <v-icon icon="mdi-magnify" size="64" color="grey" />
            <h3 class="text-h6 mt-4">Nenhuma moto encontrada</h3>
            <p class="text-grey">Tente buscar por outro termo</p>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCatalogStore } from '@/store/catalog'
import { storeToRefs } from 'pinia'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'close'])

const catalogStore = useCatalogStore()
const searchQuery = ref('')
const selectedEngine = ref(null)
const searchMode = ref(false)

const { stats, engines: storeEngines, motorcycles: storeMotorcycles } = storeToRefs(catalogStore)

const motorcycles = ref([])

const loadData = async () => {
  try {
    console.log('Loading catalog data...')
    await catalogStore.fetchStats()
    await catalogStore.fetchEngines()
    console.log('Data loaded successfully')
    console.log('Stats:', catalogStore.stats)
    console.log('Engines from store:', catalogStore.engines)
    console.log('storeEngines ref:', storeEngines.value)
  } catch (error) {
    console.error('Error loading catalog data:', error)
  }
}

// Função para salvar motos recentemente consultadas
const saveRecentMotorcycles = (motos) => {
  if (!motos || motos.length === 0) return
  
  // Pegar até 6 motos aleatórias
  const sample = motos.slice(0, 6).map(moto => ({
    model: moto.model,
    year: moto.year,
    engine: moto.engine,
    color: moto.color
  }))
  
  localStorage.setItem('recentMotorcycles', JSON.stringify(sample))
}

const selectEngine = async (engineName) => {
  selectedEngine.value = engineName
  searchMode.value = false
  await catalogStore.fetchMotorcyclesByEngine(engineName)
  motorcycles.value = catalogStore.motorcycles
  
  // Salvar motos consultadas
  saveRecentMotorcycles(motorcycles.value)
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  searchMode.value = true
  selectedEngine.value = null
  await catalogStore.searchMotorcycles(searchQuery.value)
  motorcycles.value = catalogStore.searchResults
}

// Carregar dados quando o modal abrir
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    loadData()
    motorcycles.value = []
    selectedEngine.value = null
    searchMode.value = false
    searchQuery.value = ''
  }
})

// Carregar dados na montagem se o modal já estiver aberto
onMounted(() => {
  if (props.modelValue) {
    loadData()
  }
})
</script>

<style scoped>
.engine-btn {
  transition: all 0.25s ease;
  border: 1px solid var(--hd-line-strong) !important;
  background-color: rgba(245, 241, 234, 0.03) !important;
  color: var(--hd-paper) !important;
}

.engine-btn:hover {
  border-color: var(--hd-orange) !important;
  background-color: rgba(232, 93, 4, 0.12) !important;
  transform: translateY(-2px);
}

.engine-btn-selected {
  border: 2px solid var(--hd-orange) !important;
  background-color: rgba(232, 93, 4, 0.18) !important;
}

.engine-btn-selected:hover {
  background-color: rgba(232, 93, 4, 0.22) !important;
}
</style>
