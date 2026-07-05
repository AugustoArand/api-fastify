<template>
  <v-dialog v-model="localDialog" max-width="520" persistent class="modern-dialog">
    <v-card class="modern-auth-card">
      <!-- Header -->
      <div class="auth-header">
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          class="close-btn"
          @click="closeDialog"
        />
        <div class="auth-icon-wrapper">
          <v-icon color="primary" size="32">mdi-account-circle</v-icon>
        </div>
        <h2 class="auth-title">Minha Conta</h2>
        <p class="auth-subtitle">Gerencie seus dados pessoais</p>
      </div>

      <!-- Content -->
      <v-card-text class="auth-form-content">
        <div v-if="loading" class="loading-state">
          <v-progress-circular indeterminate color="primary" size="40" />
        </div>

        <template v-else>
          <!-- View Mode -->
          <div v-if="!editing">
            <div class="info-row">
              <div class="info-label">
                <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-account</v-icon>
                Nome
              </div>
              <div class="info-value">{{ profile.name }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">
                <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-email</v-icon>
                Email
              </div>
              <div class="info-value">{{ profile.email }}</div>
            </div>

            <div class="info-row" v-if="profile.created_at">
              <div class="info-label">
                <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-calendar</v-icon>
                Membro desde
              </div>
              <div class="info-value">{{ formatDate(profile.created_at) }}</div>
            </div>

            <v-btn
              block
              size="large"
              color="primary"
              class="auth-submit-btn mt-6"
              @click="startEditing"
            >
              <v-icon left>mdi-pencil</v-icon>
              Editar Perfil
            </v-btn>
          </div>

          <!-- Edit Mode -->
          <v-form v-else ref="form" v-model="valid" @submit.prevent="handleSave">
            <div class="form-group">
              <label class="form-label">
                <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-account</v-icon>
                Nome completo
              </label>
              <v-text-field
                v-model="editData.name"
                :rules="nameRules"
                required
                variant="outlined"
                density="comfortable"
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
                v-model="editData.email"
                type="email"
                :rules="emailRules"
                required
                variant="outlined"
                density="comfortable"
                class="modern-input"
                hide-details="auto"
              />
            </div>

            <div class="password-toggle" @click="changingPassword = !changingPassword">
              <v-icon size="18">{{ changingPassword ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              Alterar senha
            </div>

            <template v-if="changingPassword">
              <div class="form-group">
                <label class="form-label">
                  <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-lock</v-icon>
                  Senha atual
                </label>
                <v-text-field
                  v-model="editData.currentPassword"
                  :type="showCurrent ? 'text' : 'password'"
                  :append-inner-icon="showCurrent ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showCurrent = !showCurrent"
                  :rules="currentPasswordRules"
                  variant="outlined"
                  density="comfortable"
                  class="modern-input"
                  hide-details="auto"
                />
              </div>

              <div class="form-row">
                <div class="form-group form-group-half">
                  <label class="form-label">
                    <v-icon size="18" color="rgba(255,255,255,0.6)">mdi-lock-plus</v-icon>
                    Nova senha
                  </label>
                  <v-text-field
                    v-model="editData.newPassword"
                    :type="showNew ? 'text' : 'password'"
                    :append-inner-icon="showNew ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showNew = !showNew"
                    :rules="newPasswordRules"
                    variant="outlined"
                    density="comfortable"
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
                    v-model="editData.confirmPassword"
                    :type="showConfirm ? 'text' : 'password'"
                    :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showConfirm = !showConfirm"
                    :rules="confirmPasswordRules"
                    variant="outlined"
                    density="comfortable"
                    class="modern-input"
                    hide-details="auto"
                  />
                </div>
              </div>
            </template>

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

            <v-btn
              block
              size="large"
              color="primary"
              class="auth-submit-btn mt-6"
              @click="handleSave"
              :loading="saving"
              :disabled="!valid"
            >
              <v-icon left>mdi-content-save</v-icon>
              Salvar Alterações
            </v-btn>

            <v-btn
              block
              variant="text"
              class="auth-cancel-btn mt-3"
              @click="cancelEditing"
              :disabled="saving"
            >
              Cancelar
            </v-btn>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '../store/auth';
import { authApi } from '../services/api';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const authStore = useAuthStore();

const localDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const form = ref(null);
const valid = ref(false);
const loading = ref(false);
const editing = ref(false);
const changingPassword = ref(false);
const saving = ref(false);
const error = ref(null);
const success = ref(null);

const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const profile = ref({ name: '', email: '', created_at: null });
const editData = ref({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const nameRules = [
  v => !!v || 'Nome é obrigatório',
  v => v.length >= 3 || 'Nome deve ter pelo menos 3 caracteres'
];

const emailRules = [
  v => !!v || 'Email é obrigatório',
  v => /.+@.+\..+/.test(v) || 'Email deve ser válido'
];

const currentPasswordRules = computed(() => changingPassword.value
  ? [v => !!v || 'Senha atual é obrigatória']
  : []);

const newPasswordRules = computed(() => changingPassword.value
  ? [
      v => !!v || 'Nova senha é obrigatória',
      v => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres'
    ]
  : []);

const confirmPasswordRules = computed(() => changingPassword.value
  ? [
      v => !!v || 'Confirmação de senha é obrigatória',
      v => v === editData.value.newPassword || 'As senhas não coincidem'
    ]
  : []);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const loadProfile = async () => {
  loading.value = true;
  editing.value = false;
  error.value = null;

  try {
    const response = await authApi.getMe();
    profile.value = response.data.user;
  } catch (err) {
    error.value = 'Erro ao carregar dados da conta';
  } finally {
    loading.value = false;
  }
};

const startEditing = () => {
  editData.value = {
    name: profile.value.name,
    email: profile.value.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  changingPassword.value = false;
  error.value = null;
  success.value = null;
  editing.value = true;
};

const cancelEditing = () => {
  editing.value = false;
  changingPassword.value = false;
  error.value = null;
  success.value = null;
};

const handleSave = async () => {
  const isValid = await form.value.validate();
  if (!isValid.valid) return;

  saving.value = true;
  error.value = null;
  success.value = null;

  try {
    const payload = {
      name: editData.value.name,
      email: editData.value.email
    };

    if (changingPassword.value) {
      payload.currentPassword = editData.value.currentPassword;
      payload.newPassword = editData.value.newPassword;
    }

    const updatedUser = await authStore.updateProfile(payload);
    profile.value = updatedUser;
    success.value = 'Perfil atualizado com sucesso!';

    setTimeout(() => {
      editing.value = false;
      changingPassword.value = false;
      success.value = null;
    }, 1200);
  } catch (err) {
    error.value = err.message || 'Erro ao atualizar perfil';
  } finally {
    saving.value = false;
  }
};

const closeDialog = () => {
  localDialog.value = false;
  editing.value = false;
  changingPassword.value = false;
  error.value = null;
  success.value = null;
};

watch(() => props.modelValue, (value) => {
  if (value) loadProfile();
});
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
  position: relative;
  padding: 40px 32px 32px;
  text-align: center;
  background: linear-gradient(180deg, rgba(232, 93, 4, 0.06) 0%, transparent 100%);
  border-bottom: 1px solid var(--hd-line);
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  color: var(--hd-ink-muted) !important;
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

/* Content */
.auth-form-content {
  padding: 32px !important;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 32px 0;
}

/* View Mode */
.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--hd-line);
}

.info-row:first-child {
  padding-top: 0;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--hd-ink-muted);
}

.info-value {
  font-size: 0.95rem;
  color: var(--hd-paper);
  font-weight: 500;
  text-align: right;
}

/* Form */
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

.password-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--hd-orange-strong);
  cursor: pointer;
  margin-bottom: 20px;
  width: fit-content;
}

.password-toggle:hover {
  color: var(--hd-orange);
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
}
</style>
