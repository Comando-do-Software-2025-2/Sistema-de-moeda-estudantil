import { Transaction } from '@/types/transaction';
import { mockTransactions } from '@/services/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export function TransactionHistory() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Histórico de Transações</h2>
      
      <div className="space-y-2">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {transaction.type === 'sent' ? (
                  <ArrowUpRight className="text-red-400" />
                ) : (
                  <ArrowDownLeft className="text-green-400" />
                )}
                <div>
                  <p className="text-white font-medium">
                    {transaction.type === 'sent' 
                      ? `Enviado para ${transaction.receiverName}`
                      : `Recebido de ${transaction.senderName}`
                    }
                  </p>
                  <p className="text-sm text-white/70">{transaction.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'sent' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {transaction.type === 'sent' ? '-' : '+'}{transaction.amount} moedas
                </p>
                <p className="text-xs text-white/50">
                  {format(transaction.createdAt, "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}