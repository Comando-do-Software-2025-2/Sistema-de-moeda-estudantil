import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

interface Transacao {
  id: number;
  tipoTransacao: string;
  professor: {
    usuario: {
      nome: string;
    };
  };
  aluno: {
    usuario: {
      nome: string;
    };
  };
  valorEmMoedas: number;
  motivo: string;
  dataTransacao: string;
}

/**
 * Hook para monitorar novas transações e notificar o aluno
 * @param alunoId ID do aluno logado
 * @param intervaloMs Intervalo de polling em ms (default: 5000)
 * @param ativar Se deve ativar o monitoramento (default: true)
 */
export function useTransacaoNotificacao(
  alunoId: number | null | undefined,
  intervaloMs: number = 5000,
  ativar: boolean = true
) {
  const ultimasTransacoesRef = useRef<number[]>([]);

  useEffect(() => {
    if (!ativar || !alunoId) return;

    const monitorarTransacoes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transacoes/aluno/${alunoId}`, {
          credentials: 'include',
        });
        if (!response.ok) return;

        const transacoes: Transacao[] = await response.json();
        
        // Filtrar apenas transações de recebimento
        const transacoesRecebimento = transacoes.filter(
          t => t.tipoTransacao === 'PROFESSOR_PARA_ALUNO' || 
               t.tipoTransacao === 'ENVIO' || 
               t.tipoTransacao === 'RECEBIMENTO'
        );

        // Encontrar transações novas (não notificadas ainda)
        const novasTransacoes = transacoesRecebimento.filter(
          t => !ultimasTransacoesRef.current.includes(t.id)
        );

        // Notificar para cada nova transação
        novasTransacoes.forEach(transacao => {
          toast.success('🎉 Você recebeu moedas!', {
            description: `${transacao.valorEmMoedas} moedas de ${transacao.professor.usuario.nome}\n"${transacao.motivo}"`,
            duration: 6000,
            action: {
              label: 'Ver histórico',
              onClick: () => window.location.href = '/historico-transacoes',
            },
          });

          // Reproduzir som (opcional)
          reproduzirSom();
        });

        // Atualizar lista de IDs já notificados
        ultimasTransacoesRef.current = transacoesRecebimento.map(t => t.id);
      } catch (error) {
        console.error('Erro ao monitorar transações:', error);
      }
    };

    // Executar imediatamente na primeira vez
    monitorarTransacoes();

    // Depois, executar periodicamente
    const interval = setInterval(monitorarTransacoes, intervaloMs);

    return () => clearInterval(interval);
  }, [alunoId, intervaloMs, ativar]);
}

/**
 * Reproduz um som de notificação
 */
function reproduzirSom() {
  try {
    // Som simples usando Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800; // Frequência em Hz
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.warn('Não foi possível reproduzir som:', error);
  }
}
