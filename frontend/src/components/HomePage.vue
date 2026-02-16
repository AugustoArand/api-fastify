<template>
  <v-container fluid class="home-container fill-height">
    <!-- Minimalist Header -->
    <header class="minimal-header">
      <div class="header-content">
        <div class="header-left">
          <div class="header-logo">
            <v-icon color="primary" size="32">mdi-motorbike</v-icon>
          </div>
          <div class="header-text">
            <div class="header-title">Harley-Davidson</div>
            <div class="header-subtitle">Acervo Histórico</div>
          </div>
        </div>
        
        <div class="header-right">
          <v-btn
            variant="text"
            color="white"
            class="header-btn"
            @click="showLogin = true"
          >
            <v-icon left size="20">mdi-login</v-icon>
            Entrar
          </v-btn>
          
          <v-btn
            color="primary"
            class="header-btn-primary"
            elevation="0"
            @click="showRegister = true"
          >
            <v-icon left size="20">mdi-account-plus</v-icon>
            Criar Conta
          </v-btn>
        </div>
      </div>
    </header>

    <!-- Animated Background Elements -->
    <div class="background-elements">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <v-row justify="center" align="center" class="fill-height content-wrapper">
      <v-col cols="12" lg="11" xl="10">
        <!-- Hero Section -->
        <div class="hero-section text-center mb-12 fade-in">
          <div class="logo-wrapper mb-6">
            <div class="logo-glow"></div>
            <v-icon class="hero-icon" size="80" color="primary">mdi-motorbike</v-icon>
          </div>
          
          <h1 class="hero-title mb-4">
            Acervo Histórico Harley-Davidson
          </h1>
          
          <p class="hero-subtitle mb-2">
            A história das lendárias motocicletas
          </p>
          
          <div class="hero-badge">
            <v-chip color="primary" size="large" class="px-6">
              <v-icon left>mdi-calendar-range</v-icon>
              2000 - 2024
            </v-chip>
          </div>
        </div>

        <!-- Main Content Card -->
        <v-card class="glass-card main-card mb-8 fade-in-delay">
          <v-card-text class="pa-0">
            <v-row no-gutters>
              <!-- Left Column - Content -->
              <v-col cols="12" md="6" class="content-side pa-8">
                <div class="section-badge mb-4">
                  <v-chip color="primary" size="small" variant="flat">
                    <v-icon left size="small">mdi-information</v-icon>
                    Sobre o Acervo
                  </v-chip>
                </div>

                <h2 class="content-title mb-5">
                  Explore 25 Anos de Evolução
                </h2>
                
                <p class="content-text mb-4">
                  Um catálogo técnico completo das motocicletas mais icônicas 
                  produzidas pela Harley-Davidson entre 2000 e 2024.
                </p>
                
                <p class="content-text mb-6">
                  Do clássico <strong>Twin Cam 88</strong> ao moderno 
                  <strong>Milwaukee-Eight 117</strong>, passando pelo revolucionário 
                  <strong>V-Rod</strong> e o inovador <strong>Revolution Max</strong>.
                </p>

                <!-- Features Grid -->
                <div class="features-grid">
                  <div class="feature-item" v-for="(feature, index) in features" :key="index">
                    <div class="feature-icon-wrapper">
                      <v-icon :color="feature.color" size="28">{{ feature.icon }}</v-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-number">{{ feature.number }}</div>
                      <div class="feature-label">{{ feature.label }}</div>
                    </div>
                  </div>
                </div>
              </v-col>

              <!-- Right Column - Image & Actions -->
              <v-col cols="12" md="6" class="action-side">
                <div class="image-wrapper">
                  <v-img
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80"
                    height="350"
                    class="hero-image"
                    cover
                    gradient="to bottom, rgba(0,0,0,.0) 0%, rgba(0,0,0,.3) 100%"
                  >
                    <div class="image-overlay">
                      <v-chip color="rgba(255, 107, 0, 0.9)" size="large">
                        <v-icon left>mdi-image-multiple</v-icon>
                        60+ Modelos
                      </v-chip>
                    </div>
                  </v-img>
                </div>
                
                <div class="action-content pa-8">
                  <!-- Info Alert -->
                  <div class="access-alert mb-6">
                    <div class="alert-icon">
                      <v-icon color="primary" size="32">mdi-shield-lock</v-icon>
                    </div>
                    <div class="alert-content">
                      <div class="alert-title">Acesso Exclusivo</div>
                      <div class="alert-text">
                        Crie uma conta para explorar todas as fichas técnicas 
                        e ter acesso completo ao catálogo histórico.
                      </div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="action-buttons">
                    <v-btn
                      size="x-large"
                      color="primary"
                      block
                      elevation="0"
                      @click="showRegister = true"
                      class="action-btn primary-btn mb-3"
                    >
                      <v-icon left size="large">mdi-account-plus</v-icon>
                      <span class="btn-text">Criar Conta</span>
                      <v-icon right size="small">mdi-arrow-right</v-icon>
                    </v-btn>

                    <v-btn
                      size="x-large"
                      variant="outlined"
                      color="primary"
                      block
                      @click="showLogin = true"
                      class="action-btn secondary-btn"
                    >
                      <v-icon left size="large">mdi-login</v-icon>
                      <span class="btn-text">Já tenho conta</span>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Stats Cards -->
        <v-row class="stats-row fade-in-delay-2">
          <v-col cols="12" sm="4" v-for="(stat, index) in stats" :key="index">
            <div class="stat-card" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="stat-icon-wrapper">
                <div class="stat-icon-bg"></div>
                <v-icon :color="stat.color" size="42">{{ stat.icon }}</v-icon>
              </div>
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-progress"></div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Dialogs -->
    <LoginDialog v-model="showLogin" @switch-to-register="switchToRegister" />
    <RegisterDialog v-model="showRegister" @switch-to-login="switchToLogin" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import LoginDialog from './LoginDialog.vue';
import RegisterDialog from './RegisterDialog.vue';

const showLogin = ref(false);
const showRegister = ref(false);

const features = [
  { icon: 'mdi-engine', color: 'primary', number: '12', label: 'Tipos de Motores' },
  { icon: 'mdi-motorcycle', color: '#FF9800', number: '60+', label: 'Modelos Históricos' },
  { icon: 'mdi-file-document', color: '#4CAF50', number: '100%', label: 'Fichas Completas' },
  { icon: 'mdi-image-multiple', color: '#2196F3', number: 'HD', label: 'Fotos de Qualidade' }
];

const stats = [
  { icon: 'mdi-calendar-range', color: 'primary', number: '25', label: 'Anos de História' },
  { icon: 'mdi-engine-outline', color: '#FF9800', number: '12', label: 'Tipos de Motores' },
  { icon: 'mdi-motorcycle', color: '#4CAF50', number: '60+', label: 'Modelos Catalogados' }
];

const switchToRegister = () => {
  showLogin.value = false;
  showRegister.value = true;
};

const switchToLogin = () => {
  showRegister.value = false;
  showLogin.value = true;
};
</script>

<style scoped>
/* Minimal Header */
.minimal-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 32px;
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  animation: slideDown 0.6s ease forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.header-logo:hover {
  background: rgba(255, 107, 0, 0.15);
  border-color: rgba(255, 107, 0, 0.4);
  transform: scale(1.05);
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
  line-height: 1;
}

.header-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-btn {
  text-transform: none !important;
  letter-spacing: 0.3px;
  font-weight: 500 !important;
  padding: 0 20px !important;
  height: 42px !important;
  border-radius: 10px !important;
  transition: all 0.3s ease !important;
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.header-btn-primary {
  text-transform: none !important;
  letter-spacing: 0.3px;
  font-weight: 600 !important;
  padding: 0 24px !important;
  height: 42px !important;
  border-radius: 10px !important;
  background: linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%) !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 12px rgba(255, 107, 0, 0.3) !important;
}

.header-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.5) !important;
}

/* Responsive Header */
@media (max-width: 600px) {
  .minimal-header {
    padding: 12px 16px;
  }

  .header-text {
    display: none;
  }

  .header-logo {
    width: 40px;
    height: 40px;
  }

  .header-btn span {
    display: none;
  }

  .header-btn,
  .header-btn-primary {
    min-width: 42px !important;
    padding: 0 12px !important;
  }
}

/* Container Principal */
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  padding: 100px 20px 40px 20px; /* Aumentado padding-top para compensar o header */
  position: relative;
  overflow: hidden;
}

/* Background Animated Elements */
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, transparent 70%);
  animation: float 20s infinite ease-in-out;
}

.circle-1 {
  width: 500px;
  height: 500px;
  top: -250px;
  right: -250px;
  animation-delay: 0s;
}

.circle-2 {
  width: 400px;
  height: 400px;
  bottom: -200px;
  left: -200px;
  animation-delay: 7s;
}

.circle-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(50px, -50px) scale(1.1);
    opacity: 0.3;
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
}

/* Hero Section */
.hero-section {
  position: relative;
}

.logo-wrapper {
  position: relative;
  display: inline-block;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.3) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
}

.hero-icon {
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 20px rgba(255, 107, 0, 0.5));
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #FF6B00 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  letter-spacing: 0.5px;
}

.hero-badge {
  margin-top: 24px;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px !important;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 107, 0, 0.1) inset !important;
}

.main-card {
  transition: all 0.3s ease;
}

.main-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 107, 0, 0.2) inset !important;
}

/* Content Side */
.content-side {
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

@media (max-width: 960px) {
  .content-side {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
}

.section-badge {
  margin-bottom: 16px;
}

.content-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 24px;
}

.content-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 32px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 107, 0, 0.1);
  border-color: rgba(255, 107, 0, 0.3);
  transform: translateX(4px);
}

.feature-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
}

.feature-number {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}

.feature-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
}

/* Action Side */
.action-side {
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.hero-image {
  border-radius: 0 !important;
  transition: transform 0.5s ease;
}

.main-card:hover .hero-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.action-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Access Alert */
.access-alert {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 107, 0, 0.08);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.access-alert:hover {
  background: rgba(255, 107, 0, 0.12);
  border-color: rgba(255, 107, 0, 0.3);
}

.alert-icon {
  flex-shrink: 0;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #FF6B00;
  margin-bottom: 6px;
}

.alert-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
}

.action-btn {
  position: relative;
  font-weight: 600 !important;
  letter-spacing: 0.5px;
  text-transform: none !important;
  border-radius: 12px !important;
  height: 60px !important;
  overflow: hidden;
  transition: all 0.3s ease !important;
}

.btn-text {
  font-size: 1.1rem;
}

.primary-btn {
  background: linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%) !important;
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.4) !important;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(255, 107, 0, 0.6) !important;
}

.primary-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.primary-btn:hover::before {
  left: 100%;
}

.secondary-btn {
  border: 2px solid rgba(255, 107, 0, 0.5) !important;
  background: rgba(255, 255, 255, 0.02) !important;
}

.secondary-btn:hover {
  background: rgba(255, 107, 0, 0.1) !important;
  border-color: rgba(255, 107, 0, 0.8) !important;
  transform: translateY(-2px);
}

/* Stats Row */
.stats-row {
  margin-top: 48px;
}

.stat-card {
  position: relative;
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.stat-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 107, 0, 0.3);
  box-shadow: 0 12px 40px rgba(255, 107, 0, 0.2);
}

.stat-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.stat-icon-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #FF6B00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.stat-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #FF6B00, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .stat-progress {
  opacity: 1;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Animations */
.fade-in {
  animation: fadeIn 0.8s ease forwards;
}

.fade-in-delay {
  animation: fadeIn 0.8s ease 0.2s forwards;
  opacity: 0;
}

.fade-in-delay-2 {
  animation: fadeIn 0.8s ease 0.4s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .content-title {
    font-size: 1.6rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}

@media (max-width: 600px) {
  .home-container {
    padding: 20px 12px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .action-btn {
    height: 56px !important;
  }

  .btn-text {
    font-size: 1rem;
  }
}
</style>
