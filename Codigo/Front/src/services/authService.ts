const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  nome: string;
  tipo: string;
}

/**
 * Serviço de autenticação - gerencia login e tokens JWT
 */
export const authService = {
  /**
   * Realiza login e retorna token JWT
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Email ou senha inválidos');
      }

      const data = await response.json();
      
      // Salva token no localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('usuario', JSON.stringify({
        id: data.id,
        nome: data.nome,
        tipo: data.tipo,
      }));

      return data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  /**
   * Recupera o token armazenado
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  /**
   * Recupera dados do usuário armazenados
   */
  getUser() {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Remove token e dados do usuário (logout)
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    localStorage.removeItem('aluno');
    sessionStorage.removeItem('alunoLogado');
  },

  /**
   * Verifica se usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
