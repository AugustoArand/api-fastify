<template>
  <v-dialog v-model="localDialog" max-width="500" persistent class="modern-dialog">
    <v-card class="modern-auth-card">
      <!-- Header -->
      <div class="auth-header">
        <div class="auth-icon-wrapper">
          <v-icon color="primary" size="32">mdi-account-plus</v-icon>
        </div>
        <h2 class="auth-title">Criar Conta</h2>
        <p class="auth-subtitle">Junte-se ao Acervo Harley-Davidson</p>
      </div>

      <!-- Form -->
      <v-card-text class="auth-form-content">
        <v-form ref="form" v-model="valid" @submit.prevent="handleRegister">
          <div class="form-group">
            <label class="form-label">
              <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-account</v-icon>
              Nome completo
            </label>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              required
              variant="outlined"
              density="comfortable"
              placeholder="Seu nome"
              class="modern-input"
              hide-details="auto"
            />
          </div>

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

          <div class="form-row">
            <div class="form-group form-group-half">
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
                placeholder="••••••"
                class="modern-input"
                hide-details="auto"
              />
            </div>

            <div class="form-group form-group-half">
              <label class="form-label">
                <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-lock-check</v-icon>
                Confirmar
              </label>
              <v-text-field
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                :rules="confirmPasswordRules"
                required
                variant="outlined"
                density="comfortable"
                placeholder="••••••"
                class="modern-input"
                hide-details="auto"
              />
            </div>
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
            @click="handleRegister"
            :loading="loading"
            :disabled="!valid"
          >
            <v-icon left>mdi-account-plus</v-icon>
            Criar Conta
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
          @click="$emit('switch-to-login')"
        >
          <v-icon left>mdi-login</v-icon>
          Já tenho conta
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
import { ref, computed } from 'vue';
import { useAuthStore } from '../store/auth';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'switch-to-login']);

const authStore = useAuthStore();

const localDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const form = ref(null);
const valid = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const error = ref(null);
const success = ref(null);

const nameRules = [
  v => !!v || 'Nome é obrigatório',
  v => v.length >= 3 || 'Nome deve ter pelo menos 3 caracteres'
];

const emailRules = [
  v => !!v || 'Email é obrigatório',
  v => /.+@.+\..+/.test(v) || 'Email deve ser válido'
];

const passwordRules = [
  v => !!v || 'Senha é obrigatória',
  v => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres'
];

const confirmPasswordRules = [
  v => !!v || 'Confirmação de senha é obrigatória',
  v => v === password.value || 'As senhas não coincidem'
];

const handleRegister = async () => {
  if (!form.value.validate()) return;

  loading.value = true;
  error.value = null;
  success.value = null;

  try {
    await authStore.register(name.value, email.value, password.value);
    success.value = 'Conta criada com sucesso!';
    
    setTimeout(() => {
      closeDialog();
    }, 1000);
  } catch (err) {
    error.value = err.message || 'Erro ao criar conta';
  } finally {
    loading.value = false;
  }
};

const closeDialog = () => {
  localDialog.value = false;
  name.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
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
  background: var(--hd-surface) !important;
  border: 1px solid var(--hd-line-strong) !important;
  border-radius: var(--hd-radius-lg) !important;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5) !important;
}

/* Header */
.auth-header {
  padding: 40px 32px 32px;
  text-align: center;
  background: linear-gradient(180deg, rgba(232, 93, 4, 0.06) 0%, transparent 100%);
  border-bottom: 1px solid var(--hd-line);
}

.auth-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(232, 93, 4, 0.1);
  border: 1px solid rgba(232, 93, 4, 0.3);
  border-radius: 14px;
  margin-bottom: 20px;
}

.auth-title {
  font-family: var(--hd-font-display);
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--hd-paper);
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.auth-subtitle {
  font-size: 0.95rem;
  color: var(--hd-ink-muted);
  margin: 0;
  font-weight: 400;
}

/* Form Content */
.auth-form-content {
  padding: 32px !important;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 16px;
  width: 100%;
}

.form-group-half {
  flex: 1;
  min-width: 0;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--hd-ink-muted);
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}

.modern-input :deep(.v-field) {
  background: rgba(245, 241, 234, 0.03) !important;
  border: 1px solid var(--hd-line);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.modern-input :deep(.v-field:hover) {
  background: rgba(245, 241, 234, 0.05) !important;
  border-color: rgba(232, 93, 4, 0.3);
}

.modern-input :deep(.v-field--focused) {
  background: rgba(245, 241, 234, 0.05) !important;
  border-color: var(--hd-orange) !important;
  box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.12);
}

.modern-input :deep(.v-field__input) {
  color: var(--hd-paper);
  font-size: 1rem;
  padding: 12px 16px;
  min-height: 48px;
}

.modern-input :deep(.v-field__input::placeholder) {
  color: var(--hd-ink-faint);
}

.modern-input :deep(.v-field__outline) {
  display: none;
}

/* Alert */
.modern-alert {
  border-radius: 10px !important;
  border: 1px solid currentColor;
}

/* Submit Button */
.auth-submit-btn {
  height: 52px !important;
  border-radius: 10px !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
  background: var(--hd-orange) !important;
  box-shadow: 0 4px 20px rgba(232, 93, 4, 0.4) !important;
  transition: all 0.3s ease !important;
}

.auth-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(232, 93, 4, 0.55) !important;
}

.auth-submit-btn:active {
  transform: translateY(0);
}

/* Footer */
.auth-footer {
  padding: 24px 32px 32px;
  border-top: 1px solid var(--hd-line);
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
  background: var(--hd-line);
}

.auth-divider::before {
  left: 0;
}

.auth-divider::after {
  right: 0;
}

.auth-divider span {
  font-size: 0.85rem;
  color: var(--hd-ink-faint);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.auth-switch-btn {
  height: 48px !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border: 1px solid rgba(232, 93, 4, 0.3) !important;
  transition: all 0.3s ease !important;
}

.auth-switch-btn:hover {
  background: rgba(232, 93, 4, 0.1) !important;
  border-color: rgba(232, 93, 4, 0.6) !important;
  transform: translateY(-2px);
}

.auth-cancel-btn {
  height: 40px !important;
  text-transform: none !important;
  color: var(--hd-ink-faint) !important;
  font-weight: 500 !important;
}

.auth-cancel-btn:hover {
  color: var(--hd-ink-muted) !important;
  background: rgba(245, 241, 234, 0.05) !important;
}

/* Responsive */
@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-group-half {
    margin-bottom: 20px;
  }

  .auth-header {
    padding: 32px 24px 24px;
  }

  .auth-form-content {
    padding: 24px !important;
  }

  .auth-footer {
    padding: 20px 24px 24px;
  }
}
</style>
