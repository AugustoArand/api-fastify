<template>
  <div class="welcome-overlay">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <div class="welcome-content">
            <!-- Logo -->
            <v-img
              :src="logoUrl"
              max-width="150"
              class="mx-auto mb-6 harley-logo animate-float"
            />

            <!-- Title -->
            <h1 class="text-h2 font-weight-black mb-4 text-primary animate-glow">
              Harley-Davidson
            </h1>

            <!-- Subtitle -->
            <p class="text-h5 text-grey-lighten-1 mb-8 font-weight-light">
              Sistema de Gerenciamento de Motos
            </p>

            <!-- Tagline -->
            <div class="tagline-box my-6 mb-8">
              <p class="text-h6 font-italic mb-0">
                Estilo de Vida Sobre Duas Rodas
              </p>
            </div>

            <!-- Start Button -->
            <div class="d-flex justify-center">
              <v-btn
                size="x-large"
                color="primary"
                variant="elevated"
                class="start-button px-16 py-8 text-h5 font-weight-bold d-flex align-center justify-center"
                rounded="pill"
                @click="$emit('start')"
              >
                <span class="button-text">Iniciar</span>
                <v-icon class="button-icon ml-3" icon="mdi-arrow-right" size="32" />
              </v-btn>
            </div>
            
            <p class="text-caption text-grey-lighten-1 mt-4">
              Clique para acessar o sistema
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Harley-Davidson_logo.svg/1200px-Harley-Davidson_logo.svg.png'

defineEmits(['start'])
</script>

<style scoped>
.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
    url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600') center/cover no-repeat;
  z-index: 9999;
  backdrop-filter: blur(3px);
}

.welcome-content {
  animation: fadeInUp 1s ease-out;
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

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.animate-glow {
  text-shadow: 0 0 30px rgba(255, 107, 0, 0.6);
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 30px rgba(255, 107, 0, 0.6); }
  50% { text-shadow: 0 0 50px rgba(255, 107, 0, 1); }
}

.tagline-box {
  border-top: 2px solid rgba(255, 107, 0, 0.5);
  border-bottom: 2px solid rgba(255, 107, 0, 0.5);
  padding: 20px;
  display: block;
  margin: 0 auto;
  max-width: 600px;
}

/* Botão Start aprimorado */
.start-button {
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 40px rgba(255, 107, 0, 0.5) !important;
  animation: buttonPulse 2.5s ease-in-out infinite;
  transition: all 0.3s ease;
}

.start-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.start-button:hover::before {
  width: 300px;
  height: 300px;
}

.start-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 60px rgba(255, 107, 0, 0.8) !important;
  animation: none;
}

.start-button:active {
  transform: translateY(-2px) scale(1.02);
}

.button-text {
  position: relative;
  z-index: 1;
}

.button-icon {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.start-button:hover .button-icon {
  transform: translateX(8px);
}

@keyframes buttonPulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 10px 40px rgba(255, 107, 0, 0.5);
  }
  50% { 
    transform: scale(1.03);
    box-shadow: 0 15px 50px rgba(255, 107, 0, 0.7);
  }
}
</style>
