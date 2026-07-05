import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

    const isAuthenticated = computed(() => !!token.value);

    // Configurar token no header do axios
    const setAuthToken = (newToken) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            token.value = newToken;
        } else {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            token.value = null;
        }
    };

    // Inicializar token ao carregar
    if (token.value) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    }

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/api/auth/register', {
                name,
                email,
                password
            });

            const { user: userData, token: userToken } = response.data;

            user.value = userData;
            setAuthToken(userToken);
            localStorage.setItem('user', JSON.stringify(userData));

            return userData;
        } catch (error) {
            const message = error.response?.data?.error || 'Erro ao registrar';
            throw new Error(message);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', {
                email,
                password
            });

            const { user: userData, token: userToken } = response.data;

            user.value = userData;
            setAuthToken(userToken);
            localStorage.setItem('user', JSON.stringify(userData));

            return userData;
        } catch (error) {
            const message = error.response?.data?.error || 'Erro ao fazer login';
            throw new Error(message);
        }
    };

    const updateProfile = async (data) => {
        try {
            const response = await api.put('/api/auth/me', data);
            const { user: userData, token: userToken } = response.data;

            user.value = userData;
            if (userToken) setAuthToken(userToken);
            localStorage.setItem('user', JSON.stringify(userData));

            return userData;
        } catch (error) {
            const message = error.response?.data?.error || 'Erro ao atualizar perfil';
            throw new Error(message);
        }
    };

    const logout = () => {
        user.value = null;
        setAuthToken(null);
        localStorage.removeItem('user');
    };

    const checkAuth = async () => {
        if (!token.value) return false;

        try {
            const response = await api.get('/api/auth/me');
            user.value = response.data.user;
            return true;
        } catch (error) {
            logout();
            return false;
        }
    };

    return {
        token,
        user,
        isAuthenticated,
        register,
        login,
        updateProfile,
        logout,
        checkAuth
    };
});
