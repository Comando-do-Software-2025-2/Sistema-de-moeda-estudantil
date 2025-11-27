import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  emailService,
  MoedasRecebidaDTO,
  CupomResgateDTO,
  EmailResponse,
} from '@/services/emailService';

interface UseEmailState {
  loading: boolean;
  error: string | null;
}

/**
 * Hook para gerenciar envio de e-mails
 */
export const useEmail = () => {
  const { toast } = useToast();
  const [state, setState] = useState<UseEmailState>({
    loading: false,
    error: null,
  });

  /**
   * Envia e-mail de distribuição de moedas
   */
  const enviarNotificacaoDistribuicao = async (
    dados: MoedasRecebidaDTO
  ): Promise<EmailResponse | null> => {
    setState({ loading: true, error: null });

    try {
      const resultado = await emailService.distribuirMoedas(dados);

      if (resultado.sucesso) {
        toast({
          title: '✓ E-mails enviados',
          description: `Notificações enviadas para ${resultado.alunoNotificado} e ${resultado.professorNotificado}`,
          variant: 'default',
        });
      } else {
        throw new Error(resultado.mensagem);
      }

      setState({ loading: false, error: null });
      return resultado;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar e-mails';
      setState({ loading: false, error: errorMessage });

      toast({
        title: '✗ Erro ao enviar e-mails',
        description: errorMessage,
        variant: 'destructive',
      });

      return null;
    }
  };

  /**
   * Envia e-mail de resgate de vantagem
   */
  const enviarNotificacaoResgate = async (
    dados: CupomResgateDTO
  ): Promise<EmailResponse | null> => {
    setState({ loading: true, error: null });

    try {
      const resultado = await emailService.resgatarVantagem(dados);

      if (resultado.sucesso) {
        toast({
          title: '✓ E-mails de resgate enviados',
          description: `Código de resgate: ${resultado.codigoResgate}\nNotificações enviadas para ${resultado.alunoNotificado} e ${resultado.empresaNotificada}`,
          variant: 'default',
        });
      } else {
        throw new Error(resultado.mensagem);
      }

      setState({ loading: false, error: null });
      return resultado;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar e-mails';
      setState({ loading: false, error: errorMessage });

      toast({
        title: '✗ Erro ao enviar e-mails de resgate',
        description: errorMessage,
        variant: 'destructive',
      });

      return null;
    }
  };

  return {
    loading: state.loading,
    error: state.error,
    enviarNotificacaoDistribuicao,
    enviarNotificacaoResgate,
  };
};
