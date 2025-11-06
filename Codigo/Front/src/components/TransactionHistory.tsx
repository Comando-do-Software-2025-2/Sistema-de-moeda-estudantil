import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

interface Transacao {
  id: number;
  tipoTransacao: string;
  professor: {
    id: number;
    usuario: {
      nome: string;
    };
  };
  aluno: {
    id: number;
    usuario: {
      nome: string;
    };
  };
  valorEmMoedas: number;
  motivo: string;
  dataTransacao: string;
}

export function TransactionHistory() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transacoes`);
        if (!response.ok) throw new Error('Erro ao buscar transações');
        
        const data = await response.json();
        setTransacoes(data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
        setError('Erro ao carregar transações');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransacoes();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Histórico de Transações</h2>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-white/60" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Histórico de Transações</h2>
        <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-500/30">
          <p className="text-red-300 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Histórico de Transações</h2>
      
      {transacoes.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 text-center">
          <p className="text-white/70">Nenhuma transação encontrada</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {transacoes.map((transacao) => (
            <div
              key={transacao.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <ArrowDownLeft className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      De: {transacao.professor.usuario.nome}
                    </p>
                    <p className="text-white/80 text-sm">
                      Para: {transacao.aluno.usuario.nome}
                    </p>
                    <p className="text-sm text-white/60 mt-1">{transacao.motivo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400 text-lg">
                    +{transacao.valorEmMoedas}
                  </p>
                  <p className="text-white/60 text-xs">moedas</p>
                  <p className="text-xs text-white/50 mt-1">
                    {format(new Date(transacao.dataTransacao), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}