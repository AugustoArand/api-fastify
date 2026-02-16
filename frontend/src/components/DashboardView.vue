<template>
  <div class="dashboard-container">
    <!-- Header com logo e ações -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <v-img
            src="https://companieslogo.com/img/orig/HOG-3d48b7ae.png?t=1648268969"
            max-width="50"
            class="logo"
          />
          <div class="header-info">
            <h1 class="header-title">Harley Davidson</h1>
            <p class="header-subtitle">Bem-vindo, {{ user?.name }}!</p>
          </div>
        </div>
        <div class="header-actions">
          <v-btn
            color="primary"
            variant="flat"
            prepend-icon="mdi-view-grid"
            @click="openCatalog"
            class="action-btn"
          >
            Catálogo
          </v-btn>
          <v-btn
            color="error"
            variant="outlined"
            prepend-icon="mdi-logout"
            @click="handleLogout"
            class="action-btn"
          >
            Sair
          </v-btn>
        </div>
      </div>
    </header>

    <!-- Catálogo Modal -->
    <v-dialog v-model="showCatalog" max-width="1200" persistent>
      <CatalogModal :modelValue="showCatalog" @close="showCatalog = false" />
    </v-dialog>

    <!-- Dialog para Adicionar/Editar Moto -->
    <v-dialog v-model="showAddDialog" max-width="600">
      <v-card>
        <v-card-title class="bg-primary">
          <span class="text-h5">{{ editingMoto ? 'Editar Moto' : 'Nova Moto' }}</span>
        </v-card-title>
        
        <v-card-text class="pt-6">
          <v-form ref="motoForm">
            <v-text-field
              v-model="motoData.model"
              label="Modelo"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-motorbike"
              :rules="[v => !!v || 'Modelo é obrigatório']"
              class="mb-2"
            />
            
            <v-text-field
              v-model.number="motoData.year"
              label="Ano"
              type="number"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-calendar"
              :rules="[v => !!v || 'Ano é obrigatório']"
              class="mb-2"
            />
            
            <v-select
              v-model="motoData.engine_type_id"
              :items="engineTypes"
              item-title="name"
              item-value="id"
              label="Tipo de Motor"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-engine"
              :rules="[v => !!v || 'Tipo de motor é obrigatório']"
              class="mb-2"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <v-list-item-subtitle>{{ item.raw.description }}</v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-select>
            
            <v-text-field
              v-model="motoData.engine"
              label="Motor (detalhes adicionais)"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-information"
              hint="Ex: 1200cc, versão especial, etc."
              persistent-hint
              class="mb-2"
            />
            
            <v-text-field
              v-model="motoData.color"
              label="Cor"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-palette"
              :rules="[v => !!v || 'Cor é obrigatória']"
              class="mb-2"
            />
            
            <v-text-field
              v-model.number="motoData.price"
              label="Preço"
              type="number"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-currency-usd"
              :rules="[v => !!v || 'Preço é obrigatório']"
              class="mb-2"
            />
            
            <v-textarea
              v-model="motoData.description"
              label="Descrição (opcional)"
              variant="outlined"
              density="comfortable"
              rows="3"
              prepend-inner-icon="mdi-text"
            />
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="closeDialog"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            @click="saveMoto"
          >
            {{ editingMoto ? 'Atualizar' : 'Salvar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dashboard Content -->
    <div class="dashboard-content">
      <v-container fluid>
        <!-- Stats Cards -->
        <v-row class="mb-6">
          <v-col cols="12" md="3" v-for="stat in stats" :key="stat.title">
            <div class="stat-card">
              <div class="stat-icon" :style="{ background: stat.color }">
                <v-icon size="32" color="white">{{ stat.icon }}</v-icon>
              </div>
              <div class="stat-content">
                <p class="stat-value">{{ stat.value }}</p>
                <p class="stat-title">{{ stat.title }}</p>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <!-- Motos Cadastradas no Banco -->
          <v-col cols="12" lg="8">
            <div class="section-card">
              <div class="section-header">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <h2 class="section-title">
                    <v-icon class="mr-2">mdi-database</v-icon>
                    Motos Cadastradas no Banco
                  </h2>
                  <v-btn 
                    color="primary" 
                    size="small"
                    prepend-icon="mdi-plus"
                    @click="showAddDialog = true"
                  >
                    Nova Moto
                  </v-btn>
                </div>
              </div>
              <div class="section-content">
                <div v-if="loadingMotos" class="empty-state">
                  <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
                  <p class="mt-4">Carregando motos...</p>
                </div>
                <div v-else-if="databaseMotorcycles.length === 0" class="empty-state">
                  <v-icon size="64" color="grey-darken-1">mdi-database-off</v-icon>
                  <p class="mt-4">Nenhuma moto cadastrada ainda</p>
                  <v-btn color="primary" variant="outlined" @click="showAddDialog = true" class="mt-2">
                    Cadastrar Primeira Moto
                  </v-btn>
                </div>
                <div v-else>
                  <v-table theme="dark">
                    <thead>
                      <tr>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Categoria Motor</th>
                        <th>Motor</th>
                        <th>Cor</th>
                        <th>Preço</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="moto in databaseMotorcycles" :key="moto.id">
                        <td class="font-weight-bold">{{ moto.model }}</td>
                        <td>{{ moto.year }}</td>
                        <td>
                          <v-chip 
                            v-if="moto.engine_type_name" 
                            color="primary" 
                            size="small"
                            variant="outlined"
                          >
                            {{ moto.engine_type_name }}
                          </v-chip>
                          <span v-else class="text-grey">-</span>
                        </td>
                        <td>{{ moto.engine || '-' }}</td>
                        <td>{{ moto.color }}</td>
                        <td>R$ {{ formatPrice(moto.price) }}</td>
                        <td>
                          <v-btn 
                            icon="mdi-pencil" 
                            size="x-small" 
                            variant="text"
                            @click="editMoto(moto)"
                          ></v-btn>
                          <v-btn 
                            icon="mdi-delete" 
                            size="x-small" 
                            variant="text"
                            color="error"
                            @click="deleteMoto(moto.id)"
                          ></v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </div>
              </div>
            </div>

            <!-- Últimas Motos Consultadas do Catálogo -->
            <div class="section-card mt-4">
              <div class="section-header">
                <h2 class="section-title">
                  <v-icon class="mr-2">mdi-clock-outline</v-icon>
                  Últimas Motos Consultadas (Catálogo)
                </h2>
              </div>
              <div class="section-content">
                <div v-if="recentMotorcycles.length === 0" class="empty-state">
                  <v-icon size="64" color="grey-darken-1">mdi-motorbike</v-icon>
                  <p class="mt-4">Nenhuma moto consultada ainda</p>
                  <v-btn color="primary" variant="outlined" @click="openCatalog" class="mt-2">
                    Explorar Catálogo
                  </v-btn>
                </div>
                <div v-else class="motorcycles-grid">
                  <div 
                    v-for="moto in recentMotorcycles" 
                    :key="moto.model"
                    class="motorcycle-card"
                  >
                    <div class="moto-header">
                      <v-icon color="primary">mdi-motorbike</v-icon>
                      <span class="moto-year">{{ moto.year }}</span>
                    </div>
                    <h3 class="moto-model">{{ moto.model }}</h3>
                    <div class="moto-details">
                      <div class="detail-item">
                        <v-icon size="16">mdi-engine</v-icon>
                        <span>{{ moto.engine }}</span>
                      </div>
                      <div class="detail-item">
                        <v-icon size="16">mdi-palette</v-icon>
                        <span>{{ moto.color }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dashboard de Emplacamentos -->
            <div class="section-card mt-4">
              <div class="section-header">
                <h2 class="section-title">
                  <v-icon class="mr-2">mdi-chart-bar</v-icon>
                  Dashboard de Emplacamentos 2025
                </h2>
              </div>
              <div class="section-content">
                <v-row>
                  <v-col cols="12" md="6" v-for="chart in emplacamentos" :key="chart.category">
                    <div class="chart-card">
                      <h3 class="chart-title">{{ chart.category }}</h3>
                      <div class="chart-bars">
                        <div 
                          v-for="item in chart.data" 
                          :key="item.label"
                          class="chart-bar-item"
                        >
                          <div class="bar-label">{{ item.label }}</div>
                          <div class="bar-wrapper">
                            <div 
                              class="bar-fill" 
                              :style="{ 
                                width: item.percentage + '%',
                                background: item.color 
                              }"
                            >
                              <span class="bar-value">{{ item.value }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>

          <!-- Notícias da Empresa -->
          <v-col cols="12" lg="4">
            <div class="section-card">
              <div class="section-header">
                <h2 class="section-title">
                  <v-icon class="mr-2">mdi-newspaper-variant-outline</v-icon>
                  Notícias Harley Davidson
                </h2>
              </div>
              <div class="section-content">
                <div class="news-list">
                  <article 
                    v-for="news in noticias" 
                    :key="news.id"
                    class="news-item"
                  >
                    <div class="news-date">
                      <v-icon size="14">mdi-calendar</v-icon>
                      {{ news.date }}
                    </div>
                    <h3 class="news-title">{{ news.title }}</h3>
                    <p class="news-excerpt">{{ news.excerpt }}</p>
                    <div class="news-footer">
                      <span class="news-category" :style="{ background: news.categoryColor }">
                        {{ news.category }}
                      </span>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';
import { motorcyclesApi, engineTypesApi } from '../services/api';
import CatalogModal from './CatalogModal.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const showCatalog = ref(false);

// Motos do banco de dados
const databaseMotorcycles = ref([]);
const loadingMotos = ref(false);
const showAddDialog = ref(false);
const editingMoto = ref(null);
const motoForm = ref(null);

// Tipos de motor
const engineTypes = ref([]);

// Dados do formulário
const motoData = ref({
  model: '',
  year: new Date().getFullYear(),
  engine: '',
  engine_type_id: null,
  color: '',
  price: 0,
  description: ''
});

// Stats Cards
const stats = ref([
  {
    title: 'Modelos no Acervo',
    value: '60+',
    icon: 'mdi-motorbike',
    color: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)'
  },
  {
    title: 'Tipos de Motor',
    value: '12',
    icon: 'mdi-engine',
    color: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)'
  },
  {
    title: 'Motos Cadastradas',
    value: '0',
    icon: 'mdi-database',
    color: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)'
  },
  {
    title: 'Motos Consultadas',
    value: '0',
    icon: 'mdi-eye',
    color: 'linear-gradient(135deg, #7B1FA2 0%, #9C27B0 100%)'
  }
]);

// Últimas motos consultadas
const recentMotorcycles = ref([]);

// Notícias
const noticias = ref([
  {
    id: 1,
    date: '15 Fev 2026',
    title: 'Harley-Davidson Revela Nova Linha Elétrica LiveWire',
    excerpt: 'A icônica fabricante de motocicletas apresenta sua mais recente inovação em mobilidade elétrica com maior autonomia e desempenho.',
    category: 'Lançamento',
    categoryColor: '#FF6B00'
  },
  {
    id: 2,
    date: '10 Fev 2026',
    title: 'Programa Heritage Preservation: 120 Anos de História',
    excerpt: 'Iniciativa preserva motos clássicas e documenta a evolução tecnológica da marca desde 1903.',
    category: 'História',
    categoryColor: '#2196F3'
  },
  {
    id: 3,
    date: '05 Fev 2026',
    title: 'Expansão Global: Novas Concessionárias na América Latina',
    excerpt: 'Harley-Davidson anuncia investimentos em infraestrutura e abertura de 15 novas concessionárias na região.',
    category: 'Expansão',
    categoryColor: '#4CAF50'
  },
  {
    id: 4,
    date: '28 Jan 2026',
    title: 'Riding Academy: Novos Cursos de Pilotagem Avançada',
    excerpt: 'Programa de treinamento oferece cursos especializados para todos os níveis de experiência.',
    category: 'Treinamento',
    categoryColor: '#9C27B0'
  },
  {
    id: 5,
    date: '20 Jan 2026',
    title: 'Sustentabilidade: Meta de Carbono Neutro até 2030',
    excerpt: 'Compromisso ambiental estabelece metas ousadas para redução de emissões em toda a cadeia produtiva.',
    category: 'Sustentabilidade',
    categoryColor: '#388E3C'
  }
]);

// Dashboard de Emplacamentos
const emplacamentos = ref([
  {
    category: 'Modelos Mais Emplacados',
    data: [
      { label: 'Street Glide', value: '2.845', percentage: 100, color: '#FF6B00' },
      { label: 'Road King', value: '2.120', percentage: 74, color: '#FF8C00' },
      { label: 'Fat Boy', value: '1.890', percentage: 66, color: '#FFA726' },
      { label: 'Sportster S', value: '1.654', percentage: 58, color: '#FFB74D' }
    ]
  },
  {
    category: 'Emplacamentos por Região',
    data: [
      { label: 'Sudeste', value: '4.320', percentage: 100, color: '#2196F3' },
      { label: 'Sul', value: '2.890', percentage: 67, color: '#42A5F5' },
      { label: 'Nordeste', value: '1.560', percentage: 36, color: '#64B5F6' },
      { label: 'Centro-Oeste', value: '980', percentage: 23, color: '#90CAF9' }
    ]
  },
  {
    category: 'Tipos de Motor',
    data: [
      { label: 'Milwaukee-Eight', value: '3.450', percentage: 100, color: '#4CAF50' },
      { label: 'Revolution Max', value: '2.120', percentage: 61, color: '#66BB6A' },
      { label: 'Twin Cam', value: '1.340', percentage: 39, color: '#81C784' },
      { label: 'Evolution', value: '890', percentage: 26, color: '#A5D6A7' }
    ]
  },
  {
    category: 'Faixa de Preço',
    data: [
      { label: 'R$ 80-100k', value: '3.120', percentage: 100, color: '#9C27B0' },
      { label: 'R$ 60-80k', value: '2.890', percentage: 93, color: '#AB47BC' },
      { label: 'R$ 100-120k', value: '2.340', percentage: 75, color: '#BA68C8' },
      { label: 'Acima 120k', value: '1.450', percentage: 46, color: '#CE93D8' }
    ]
  }
]);

// Funções
const openCatalog = () => {
  showCatalog.value = true;
};

const handleLogout = () => {
  authStore.logout();
  location.reload();
};

// Carregar motos do banco de dados
const loadDatabaseMotorcycles = async () => {
  try {
    loadingMotos.value = true;
    const response = await motorcyclesApi.getAll();
    databaseMotorcycles.value = response.data;
    stats.value[2].value = databaseMotorcycles.value.length.toString();
  } catch (error) {
    console.error('Erro ao carregar motos:', error);
  } finally {
    loadingMotos.value = false;
  }
};

// Formatar preço
const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Resetar formulário
const resetForm = () => {
  motoData.value = {
    model: '',
    year: new Date().getFullYear(),
    engine: '',
    engine_type_id: null,
    color: '',
    price: 0,
    description: ''
  };
  editingMoto.value = null;
};

// Fechar dialog
const closeDialog = () => {
  showAddDialog.value = false;
  resetForm();
};

// Salvar moto
const saveMoto = async () => {
  try {
    if (editingMoto.value) {
      // Atualizar moto existente
      await motorcyclesApi.update(editingMoto.value.id, motoData.value);
    } else {
      // Criar nova moto
      await motorcyclesApi.create(motoData.value);
    }
    
    await loadDatabaseMotorcycles();
    closeDialog();
  } catch (error) {
    console.error('Erro ao salvar moto:', error);
    alert('Erro ao salvar moto: ' + (error.response?.data?.error || error.message));
  }
};

// Editar moto
const editMoto = (moto) => {
  editingMoto.value = moto;
  motoData.value = {
    model: moto.model,
    year: moto.year,
    engine: moto.engine,
    engine_type_id: moto.engine_type_id,
    color: moto.color,
    price: moto.price,
    description: moto.description || ''
  };
  showAddDialog.value = true;
};

// Deletar moto
const deleteMoto = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta moto?')) return;
  
  try {
    await motorcyclesApi.delete(id);
    await loadDatabaseMotorcycles();
  } catch (error) {
    console.error('Erro ao deletar moto:', error);
    alert('Erro ao deletar moto');
  }
};

// Carregar tipos de motor
const loadEngineTypes = async () => {
  try {
    const response = await engineTypesApi.getAll();
    engineTypes.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar tipos de motor:', error);
  }
};

// Carregar últimas motos consultadas
onMounted(async () => {
  const stored = localStorage.getItem('recentMotorcycles');
  if (stored) {
    recentMotorcycles.value = JSON.parse(stored);
    stats.value[3].value = recentMotorcycles.value.length.toString();
  }
  
  // Carregar dados
  await Promise.all([
    loadDatabaseMotorcycles(),
    loadEngineTypes()
  ]);
});
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
}

/* Header */
.dashboard-header {
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 107, 0, 0.2);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  border-radius: 8px;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.5px;
}

.header-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  text-transform: none;
  font-weight: 600;
}

/* Dashboard Content */
.dashboard-content {
  padding: 32px 0;
}

/* Stats Cards */
.stat-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 107, 0, 0.4);
  box-shadow: 0 8px 32px rgba(255, 107, 0, 0.2);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.stat-title {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-weight: 500;
}

/* Section Cards */
.section-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

.section-header {
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 107, 0, 0.05);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
}

.section-content {
  padding: 24px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: rgba(255, 255, 255, 0.6);
}

/* Motorcycles Grid */
.motorcycles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.motorcycle-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
}

.motorcycle-card:hover {
  border-color: rgba(255, 107, 0, 0.4);
  transform: translateY(-2px);
}

.moto-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.moto-year {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

.moto-model {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 12px 0;
}

.moto-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

/* News List */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.news-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.news-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  font-weight: 600;
}

.news-title {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.news-excerpt {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.news-footer {
  display: flex;
  align-items: center;
}

.news-category {
  font-size: 0.7rem;
  padding: 4px 12px;
  border-radius: 12px;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Chart Cards */
.chart-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
}

.chart-title {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 20px 0;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-bar-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bar-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.bar-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  height: 32px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 12px;
  transition: width 1s ease;
  position: relative;
}

.bar-value {
  font-size: 0.85rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Responsive */
@media (max-width: 960px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .header-left {
    flex-direction: column;
  }

  .motorcycles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
