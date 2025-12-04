import { useState } from 'react';
import { authService, LoginCredentials, AuthResponse } from '@/services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setError(null);
  };

  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();
  const token = authService.getToken();

  return {
    login,
    logout,
    isAuthenticated,
    user,
    token,
    loading,
    error,
  };
};
