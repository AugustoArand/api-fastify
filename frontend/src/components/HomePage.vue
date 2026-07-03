<template>
  <v-container fluid class="home-container fill-height">
    <!-- Header -->
    <header class="minimal-header">
      <div class="header-content">
        <div class="header-left">
          <div class="header-logo">
            <v-icon color="primary" size="26">mdi-motorbike</v-icon>
          </div>
          <div class="header-text">
            <div class="header-title hd-display">Harley-Davidson</div>
            <div class="header-subtitle">Acervo Histórico</div>
          </div>
        </div>

        <div class="header-right">
          <v-btn
            variant="text"
            class="hd-btn header-btn"
            @click="showLogin = true"
          >
            <v-icon left size="20">mdi-login</v-icon>
            Entrar
          </v-btn>

          <v-btn
            color="primary"
            class="hd-btn hd-btn-primary header-btn-primary"
            elevation="0"
            @click="showRegister = true"
          >
            <v-icon left size="20">mdi-account-plus</v-icon>
            Criar Conta
          </v-btn>
        </div>
      </div>
    </header>

    <v-row justify="center" align="center" class="fill-height content-wrapper">
      <v-col cols="12" lg="11" xl="10">
        <!-- Hero -->
        <div class="hero-section text-center mb-12 fade-in">
          <div class="hd-eyebrow justify-center mb-5">Catálogo Técnico &middot; 2000&ndash;2024</div>

          <h1 class="hero-title hd-display mb-4">
            Acervo Histórico Harley-Davidson
          </h1>

          <p class="hero-subtitle mb-0">
            A história das lendárias motocicletas, ficha técnica por ficha técnica
          </p>
        </div>

        <!-- Main Content Card -->
        <div class="hd-panel main-card mb-8 fade-in">
          <v-row no-gutters>
            <v-col cols="12" md="6" class="content-side pa-8">
              <div class="hd-eyebrow mb-4">Sobre o Acervo</div>

              <h2 class="content-title hd-display mb-5">
                25 Anos de Evolução
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

              <div class="features-grid">
                <div class="feature-item hd-card pa-4" v-for="(feature, index) in features" :key="index">
                  <div class="feature-icon-wrapper">
                    <v-icon :color="feature.color" size="26">{{ feature.icon }}</v-icon>
                  </div>
                  <div class="feature-content">
                    <div class="feature-number hd-mono-number">{{ feature.number }}</div>
                    <div class="feature-label">{{ feature.label }}</div>
                  </div>
                </div>
              </div>
            </v-col>

            <v-col cols="12" md="6" class="action-side">
              <div class="image-wrapper">
                <v-img
                  src="/images/background02.jpg"
                  height="320"
                  class="hero-image"
                  cover
                  gradient="to bottom, rgba(0,0,0,.05) 0%, rgba(10,10,11,.55) 100%"
                >
                  <div class="image-overlay">
                    <v-chip color="primary" size="large" class="hd-btn">
                      <v-icon left>mdi-image-multiple</v-icon>
                      60+ Modelos
                    </v-chip>
                  </div>
                </v-img>
              </div>

              <div class="action-content pa-8">
                <div class="access-alert hd-bracket mb-6">
                  <div class="alert-icon">
                    <v-icon color="primary" size="28">mdi-shield-lock</v-icon>
                  </div>
                  <div class="alert-content">
                    <div class="alert-title hd-display">Acesso Exclusivo</div>
                    <div class="alert-text">
                      Crie uma conta para explorar todas as fichas técnicas
                      e ter acesso completo ao catálogo histórico.
                    </div>
                  </div>
                </div>

                <div class="action-buttons">
                  <v-btn
                    size="x-large"
                    color="primary"
                    block
                    elevation="0"
                    @click="showRegister = true"
                    class="hd-btn hd-btn-primary action-btn mb-3"
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
                    class="hd-btn action-btn secondary-btn"
                  >
                    <v-icon left size="large">mdi-login</v-icon>
                    <span class="btn-text">Já tenho conta</span>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Stats -->
        <v-row class="stats-row fade-in">
          <v-col cols="12" sm="4" v-for="(stat, index) in stats" :key="index">
            <div class="stat-card hd-card" :style="{ animationDelay: `${index * 0.1}s` }">
              <v-icon :color="stat.color" size="34" class="mb-4">{{ stat.icon }}</v-icon>
              <div class="stat-number hd-display">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
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
  { icon: 'mdi-engine', color: '#E85D04', number: '12', label: 'Tipos de Motores' },
  { icon: 'mdi-motorcycle', color: '#C9A227', number: '60+', label: 'Modelos Históricos' },
  { icon: 'mdi-file-document', color: '#4CAF50', number: '100%', label: 'Fichas Completas' },
  { icon: 'mdi-image-multiple', color: '#4A9EFF', number: 'HD', label: 'Fotos de Qualidade' }
];

const stats = [
  { icon: 'mdi-calendar-range', color: '#E85D04', number: '25', label: 'Anos de História' },
  { icon: 'mdi-engine-outline', color: '#C9A227', number: '12', label: 'Tipos de Motores' },
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
/* Header */
.minimal-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 32px;
  background: rgba(10, 10, 11, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--hd-line);
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
  width: 44px;
  height: 44px;
  background: rgba(232, 93, 4, 0.1);
  border: 1px solid rgba(232, 93, 4, 0.25);
  border-radius: 10px;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-title {
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  line-height: 1;
}

.header-subtitle {
  font-size: 0.7rem;
  color: var(--hd-ink-faint);
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-btn,
.header-btn-primary {
  height: 42px !important;
  padding: 0 20px !important;
}

@media (max-width: 600px) {
  .minimal-header {
    padding: 12px 16px;
  }

  .header-text {
    display: none;
  }

  .header-btn span,
  .header-btn-primary span {
    display: none;
  }

  .header-btn,
  .header-btn-primary {
    min-width: 42px !important;
    padding: 0 12px !important;
  }
}

/* Container */
.home-container {
  min-height: 100vh;
  background: var(--hd-black);
  padding: 100px 20px 40px 20px;
}

.content-wrapper {
  position: relative;
  z-index: 1;
}

/* Hero */
.hero-title {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.15;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--hd-ink-muted);
  font-weight: 300;
}

/* Main card */
.main-card {
  overflow: hidden;
}

.content-side {
  border-right: 1px solid var(--hd-line);
}

@media (max-width: 960px) {
  .content-side {
    border-right: none;
    border-bottom: 1px solid var(--hd-line);
  }
}

.content-title {
  font-size: 1.9rem;
  color: var(--hd-paper);
  line-height: 1.25;
}

.content-text {
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--hd-ink-muted);
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 28px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.feature-number {
  font-size: 1.3rem;
  color: var(--hd-paper);
  line-height: 1;
}

.feature-label {
  font-size: 0.82rem;
  color: var(--hd-ink-muted);
  margin-top: 4px;
}

/* Action side */
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

.access-alert {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(232, 93, 4, 0.06);
  border-color: rgba(232, 93, 4, 0.2);
}

.alert-title {
  font-size: 1.05rem;
  color: var(--hd-orange-strong);
  margin-bottom: 6px;
}

.alert-text {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--hd-ink-muted);
}

.action-buttons {
  display: flex;
  flex-direction: column;
}

.action-btn {
  height: 58px !important;
}

.btn-text {
  font-size: 1.05rem;
}

.secondary-btn {
  border: 1px solid rgba(232, 93, 4, 0.4) !important;
  background: transparent !important;
}

.secondary-btn:hover {
  background: rgba(232, 93, 4, 0.08) !important;
}

/* Stats */
.stats-row {
  margin-top: 40px;
}

.stat-card {
  padding: 28px 22px;
  text-align: center;
}

.stat-number {
  font-size: 2.6rem;
  color: var(--hd-orange-strong);
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--hd-ink-muted);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 960px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .home-container {
    padding: 90px 12px 32px 12px;
  }

  .action-btn {
    height: 54px !important;
  }
}
</style>
