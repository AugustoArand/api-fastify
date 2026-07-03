<template>
  <div class="welcome-overlay">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <div class="welcome-content fade-in">
            <div class="mark">
              <v-icon color="primary" size="30">mdi-motorbike</v-icon>
            </div>

            <div class="hd-eyebrow justify-center mb-6">Acervo Técnico &middot; Desde 1903</div>

            <h1 class="hd-title hd-display mb-4">Harley-Davidson</h1>

            <p class="hd-subtitle mb-8">
              Catálogo histórico das motocicletas mais icônicas já produzidas
            </p>

            <div class="tagline-box hd-bracket my-2 mb-10">
              <p class="tagline-text">Estilo de Vida Sobre Duas Rodas</p>
            </div>

            <div class="d-flex justify-center">
              <v-btn
                size="x-large"
                color="primary"
                variant="elevated"
                class="hd-btn hd-btn-primary start-button px-12 py-7 d-flex align-center justify-center"
                @click="$emit('start')"
              >
                <span class="button-text">Iniciar</span>
                <v-icon class="button-icon ml-3" icon="mdi-arrow-right" size="24" />
              </v-btn>
            </div>

            <p class="access-hint mt-5">Clique para acessar o sistema</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
defineEmits(['start'])
</script>

<style scoped>
.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(180deg, rgba(10, 10, 11, 0.55) 0%, rgba(10, 10, 11, 0.88) 65%, #0a0a0b 100%),
    url('/images/background04.jpg') center 30%/cover no-repeat;
  z-index: 9999;
}

.welcome-content {
  max-width: 640px;
  margin: 0 auto;
}

.mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border: 1px solid var(--hd-line-strong);
  border-radius: 50%;
  background: rgba(232, 93, 4, 0.08);
  margin-bottom: 28px;
}

.hd-eyebrow {
  display: flex;
}

.hd-title {
  font-size: clamp(2.4rem, 7vw, 4.2rem);
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1.05;
}

.hd-subtitle {
  font-size: 1.15rem;
  color: var(--hd-ink-muted);
  font-weight: 300;
}

.tagline-box {
  padding: 18px 32px;
  display: inline-block;
}

.tagline-text {
  font-family: var(--hd-font-display);
  font-size: 1.1rem;
  font-weight: 400;
  font-style: italic;
  color: var(--hd-brass);
  letter-spacing: 0.5px;
}

.start-button {
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 1.05rem;
}

.button-icon {
  transition: transform 0.3s ease;
}

.start-button:hover .button-icon {
  transform: translateX(6px);
}

.access-hint {
  font-size: 0.8rem;
  color: var(--hd-ink-faint);
}

@media (max-width: 600px) {
  .tagline-box {
    padding: 16px 24px;
  }
}
</style>
