<template>
  <v-dialog v-model="localDialog" max-width="480" persistent class="modern-dialog">
    <v-card class="modern-auth-card">
      <!-- Header -->
      <div class="auth-header">
        <div class="auth-icon-wrapper">
          <v-icon color="primary" size="32">mdi-login</v-icon>
        </div>
        <h2 class="auth-title">Entrar</h2>
        <p class="auth-subtitle">Acesse sua conta do Acervo Harley-Davidson</p>
      </div>

      <!-- Form -->
      <v-card-text class="auth-form-content">
        <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">
              <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-email</v-icon>
              Email
            </label>
            <v-text-field
              v-model="email"
              type="email"
              :rules="emailRules"
              required
              variant="outlined"
              density="comfortable"
              placeholder="seu@email.com"
              class="modern-input"
              hide-details="auto"
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-lock</v-icon>
              Senha
            </label>
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              :rules="passwordRules"
              required
              variant="outlined"
              density="comfortable"
              placeholder="••••••••"
              class="modern-input"
              hide-details="auto"
            />
          </div>

          <!-- Alerts -->
          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            density="compact"
            closable
            class="modern-alert mt-4"
            @click:close="error = null"
          >
            {{ error }}
          </v-alert>

          <v-alert
            v-if="success"
            type="success"
            variant="tonal"
            density="compact"
            class="modern-alert mt-4"
          >
            {{ success }}
          </v-alert>

          <!-- Submit Button -->
          <v-btn
            block
            size="large"
            color="primary"
            class="auth-submit-btn mt-6"
            @click="handleLogin"
            :loading="loading"
            :disabled="!valid"
          >
            <v-icon left>mdi-login</v-icon>
            Entrar
          </v-btn>
        </v-form>
      </v-card-text>

      <!-- Footer -->
      <div class="auth-footer">
        <div class="auth-divider">
          <span>ou</span>
        </div>
        
        <v-btn
          block
          variant="outlined"
          color="primary"
          class="auth-switch-btn"
          @click="$emit('switch-to-register')"
        >
          <v-icon left>mdi-account-plus</v-icon>
          Criar nova conta
        </v-btn>

        <v-btn
          block
          variant="text"
          class="auth-cancel-btn mt-3"
          @click="closeDialog"
          :disabled="loading"
        >
          Cancelar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useAuthStore } from '../store/auth';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'switch-to-register']);

const authStore = useAuthStore();

const localDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const form = ref(null);
const valid = ref(false);
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const error = ref(null);
const success = ref(null);

const emailRules = [
  v => !!v || 'Email é obrigatório',
  v => /.+@.+\..+/.test(v) || 'Email deve ser válido'
];

const passwordRules = [
  v => !!v || 'Senha é obrigatória',
  v => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres'
];

const handleLogin = async () => {
  if (!form.value.validate()) return;

  loading.value = true;
  error.value = null;
  success.value = null;

  try {
    await authStore.login(email.value, password.value);
    success.value = 'Login realizado com sucesso!';
    
    setTimeout(() => {
      closeDialog();
    }, 1000);
  } catch (err) {
    error.value = err.message || 'Erro ao fazer login';
  } finally {
    loading.value = false;
  }
};

const closeDialog = () => {
  localDialog.value = false;
  email.value = '';
  password.value = '';
  error.value = null;
  success.value = null;
  if (form.value) {
    form.value.reset();
  }
};
</script>

<style scoped>
.modern-dialog :deep(.v-overlay__content) {
  animation: fadeInScale 0.3s ease;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modern-auth-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%) !important;
  border: 1px solid rgba(255, 107, 0, 0.2) !important;
  border-radius: 20px !important;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5) !important;
}

/* Header */
.auth-header {
  padding: 40px 32px 32px;
  text-align: center;
  background: linear-gradient(180deg, rgba(255, 107, 0, 0.05) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.auth-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 107, 0, 0.1);
  border: 2px solid rgba(255, 107, 0, 0.3);
  border-radius: 16px;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 10px rgba(255, 107, 0, 0);
  }
}

.auth-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.auth-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-weight: 400;
}

/* Form Content */
.auth-form-content {
  padding: 32px !important;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}

.modern-input :deep(.v-field) {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.modern-input :deep(.v-field:hover) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 107, 0, 0.3);
}

.modern-input :deep(.v-field--focused) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: #FF6B00 !important;
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
}

.modern-input :deep(.v-field__input) {
  color: #ffffff;
  font-size: 1rem;
  padding: 12px 16px;
  min-height: 48px;
}

.modern-input :deep(.v-field__input::placeholder) {
  color: rgba(255, 255, 255, 0.3);
}

.modern-input :deep(.v-field__outline) {
  display: none;
}

/* Alert */
.modern-alert {
  border-radius: 12px !important;
  border: 1px solid currentColor;
}

/* Submit Button */
.auth-submit-btn {
  height: 52px !important;
  border-radius: 12px !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%) !important;
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.4) !important;
  transition: all 0.3s ease !important;
}

.auth-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(255, 107, 0, 0.6) !important;
}

.auth-submit-btn:active {
  transform: translateY(0);
}

/* Footer */
.auth-footer {
  padding: 24px 32px 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.auth-divider {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(50% - 30px);
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.auth-divider::before {
  left: 0;
}

.auth-divider::after {
  right: 0;
}

.auth-divider span {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.auth-switch-btn {
  height: 48px !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border: 2px solid rgba(255, 107, 0, 0.3) !important;
  transition: all 0.3s ease !important;
}

.auth-switch-btn:hover {
  background: rgba(255, 107, 0, 0.1) !important;
  border-color: rgba(255, 107, 0, 0.6) !important;
  transform: translateY(-2px);
}

.auth-cancel-btn {
  height: 40px !important;
  text-transform: none !important;
  color: rgba(255, 255, 255, 0.5) !important;
  font-weight: 500 !important;
}

.auth-cancel-btn:hover {
  color: rgba(255, 255, 255, 0.8) !important;
  background: rgba(255, 255, 255, 0.05) !important;
}
</style>
