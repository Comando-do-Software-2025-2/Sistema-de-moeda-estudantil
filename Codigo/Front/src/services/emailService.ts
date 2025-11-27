const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Obtém o token JWT do localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

/**
 * DTO para notificação de distribuição de moedas
 */
export interface MoedasRecebidaDTO {
  alunoEmail: string;
  alunoNome: string;
  professorNome: string;
  professorEmail: string;
  valor: number;
  motivo: string;
}

/**
 * DTO para notificação de resgate de vantagem
 */
export interface CupomResgateDTO {
  alunoEmail: string;
  alunoNome: string;
  empresaNome: string;
  empresaEmail: string;
  vantagemTitulo: string;
  codigoCupom: string;
  custoMoedas: number;
}

/**
 * Resposta padrão de e-mail
 */
export interface EmailResponse {
  sucesso: boolean;
  mensagem: string;
  alunoNotificado?: string;
  professorNotificado?: string;
  codigoResgate?: string;
  empresaNotificada?: string;
}

/**
 * Serviço para envio de e-mails via backend
 */
export const emailService = {
  /**
   * Envia e-mail de distribuição de moedas para aluno e professor
   * @param dados Dados da distribuição (aluno, professor, valor, motivo)
   * @returns Promise com resposta do servidor
   */
  async distribuirMoedas(dados: MoedasRecebidaDTO): Promise<EmailResponse> {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/emails/distribuir-moedas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar e-mail: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao distribuir moedas via e-mail:', error);
      throw error;
    }
  },

  /**
   * Envia e-mail de resgate de vantagem para aluno e empresa
   * @param dados Dados do resgate (aluno, empresa, vantagem, código)
   * @returns Promise com resposta do servidor
   */
  async resgatarVantagem(dados: CupomResgateDTO): Promise<EmailResponse> {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/emails/resgatar-vantagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar e-mail: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao resgatar vantagem via e-mail:', error);
      throw error;
    }
  },
};
