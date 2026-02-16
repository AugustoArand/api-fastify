<template>
  <v-app>
    <WelcomeScreen 
      v-if="showWelcome" 
      @start="handleStart" 
    />
    
    <HomePage 
      v-else-if="showHome && !isAuthenticated"
    />
    
    <DashboardView 
      v-else-if="isAuthenticated"
    />
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './store/auth'
import WelcomeScreen from './components/WelcomeScreen.vue'
import HomePage from './components/HomePage.vue'
import DashboardView from './components/DashboardView.vue'

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const showWelcome = ref(true)
const showHome = ref(false)

const handleStart = () => {
  showWelcome.value = false
  
  // Se já está autenticado, vai direto para o dashboard
  if (isAuthenticated.value) {
    showHome.value = false
  } else {
    showHome.value = true
  }
}

// Verificar autenticação ao montar
onMounted(async () => {
  if (isAuthenticated.value) {
    await authStore.checkAuth()
  }
})
</script>
