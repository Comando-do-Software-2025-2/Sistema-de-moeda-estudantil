const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Cliente HTTP genérico com suporte a autenticação JWT
 */
export const apiClient = {
  /**
   * Faz uma requisição HTTP com token JWT automaticamente
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const token = localStorage.getItem('authToken');
    const headers = new Headers(options.headers);

    // Adiciona token se disponível
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // Garante Content-Type correto
    if (!headers.has('Content-Type') && options.body) {
      headers.set('Content-Type', 'application/json');
    }

    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

    return fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });
  },

  /**
   * GET com autenticação
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.request(endpoint, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * POST com autenticação
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * PUT com autenticação
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * DELETE com autenticação
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.request(endpoint, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  },
};
