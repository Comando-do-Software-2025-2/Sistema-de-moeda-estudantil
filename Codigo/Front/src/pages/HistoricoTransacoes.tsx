import { useState, useEffect } from "react";
import { DynamicNavbar } from "@/components/DynamicNavbar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, History, ArrowUpRight, ArrowDownLeft, Coins } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  description: string;
  senderName?: string;
  receiverName?: string;
  createdAt: Date;
}

const HistoricoTransacoes = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [transactionsFiltradas, setTransactionsFiltradas] = useState<Transaction[]>([]);

  // Mock data - substituir pela chamada à API
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        type: "received",
        amount: 50,
        description: "Participação em projeto de pesquisa",
        senderName: "Prof. João Silva",
        createdAt: new Date(2024, 10, 1),
      },
      {
        id: "2",
        type: "received",
        amount: 30,
        description: "Atividade extra-curricular",
        senderName: "Prof. Maria Santos",
        createdAt: new Date(2024, 10, 3),
      },
      {
        id: "3",
        type: "sent",
        amount: 25,
        description: "Resgate: Desconto na Cantina",
        receiverName: "Restaurante Universitário",
        createdAt: new Date(2024, 10, 5),
      },
      {
        id: "4",
        type: "received",
        amount: 40,
        description: "Melhor nota da turma",
        senderName: "Prof. Carlos Oliveira",
        createdAt: new Date(2024, 10, 8),
      },
      {
        id: "5",
        type: "sent",
        amount: 15,
        description: "Resgate: Vale Livraria",
        receiverName: "Livraria Acadêmica",
        createdAt: new Date(2024, 10, 10),
      },
      {
        id: "6",
        type: "received",
        amount: 60,
        description: "Apresentação de trabalho no seminário",
        senderName: "Prof. Ana Paula",
        createdAt: new Date(2024, 10, 12),
      },
    ];

    setTransactions(mockTransactions);
    setTransactionsFiltradas(mockTransactions);
  }, []);

  // Filtrar transações baseado na pesquisa
  useEffect(() => {
    const filtradas = transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(pesquisa.toLowerCase()) ||
        transaction.senderName?.toLowerCase().includes(pesquisa.toLowerCase()) ||
        transaction.receiverName?.toLowerCase().includes(pesquisa.toLowerCase()) ||
        transaction.amount.toString().includes(pesquisa)
    );
    setTransactionsFiltradas(filtradas);
  }, [pesquisa, transactions]);

  // Calcular totais
  const totalRecebido = transactions
    .filter(t => t.type === 'received')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalEnviado = transactions
    .filter(t => t.type === 'sent')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const saldoTotal = totalRecebido - totalEnviado;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DynamicNavbar />
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/fundo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <History className="h-12 w-12 text-secondary animate-scale-in" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              Histórico de Transações
            </h1>
          </div>
          <p className="text-xl text-white/95 font-light drop-shadow-md">
            Acompanhe todas as suas movimentações de moedas
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8 animate-scale-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <ArrowDownLeft className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Recebido</p>
                <p className="text-3xl font-bold text-white">{totalRecebido}</p>
                <p className="text-white/60 text-xs">moedas</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <ArrowUpRight className="h-8 w-8 text-red-400" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Utilizado</p>
                <p className="text-3xl font-bold text-white">{totalEnviado}</p>
                <p className="text-white/60 text-xs">moedas</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Coins className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Saldo Atual</p>
                <p className="text-3xl font-bold text-white">{saldoTotal}</p>
                <p className="text-white/60 text-xs">moedas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto animate-scale-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Barra de Pesquisa */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Pesquisar por descrição, professor ou valor..."
                  className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>
            </div>

            {/* Contador de Resultados */}
            <div className="mb-4">
              <p className="text-white/80 text-sm">
                {transactionsFiltradas.length} transação(ões) encontrada(s)
                {pesquisa && ` para "${pesquisa}"`}
              </p>
            </div>

            {/* Tabela */}
            <div className="rounded-xl overflow-hidden border border-white/20">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/5 hover:bg-white/10 border-white/20">
                    <TableHead className="text-white font-semibold">Tipo</TableHead>
                    <TableHead className="text-white font-semibold">Descrição</TableHead>
                    <TableHead className="text-white font-semibold">Origem/Destino</TableHead>
                    <TableHead className="text-white font-semibold">Data</TableHead>
                    <TableHead className="text-white font-semibold text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionsFiltradas.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-white/70 py-8"
                      >
                        Nenhuma transação encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactionsFiltradas.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className="bg-white/5 hover:bg-white/10 border-white/10 transition-colors"
                      >
                        <TableCell className="text-white">
                          <div className="flex items-center gap-2">
                            {transaction.type === 'received' ? (
                              <>
                                <div className="p-2 rounded-lg bg-green-500/20">
                                  <ArrowDownLeft className="h-4 w-4 text-green-400" />
                                </div>
                                <span className="font-medium text-green-400">Recebido</span>
                              </>
                            ) : (
                              <>
                                <div className="p-2 rounded-lg bg-red-500/20">
                                  <ArrowUpRight className="h-4 w-4 text-red-400" />
                                </div>
                                <span className="font-medium text-red-400">Utilizado</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-white">
                          <p className="font-medium">{transaction.description}</p>
                        </TableCell>
                        <TableCell className="text-white/80">
                          {transaction.type === 'received' 
                            ? transaction.senderName 
                            : transaction.receiverName}
                        </TableCell>
                        <TableCell className="text-white/70 text-sm">
                          {format(transaction.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                          <br />
                          <span className="text-xs text-white/50">
                            {format(transaction.createdAt, "dd 'de' MMMM", { locale: ptBR })}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`text-lg font-bold ${
                            transaction.type === 'received' 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}>
                            {transaction.type === 'received' ? '+' : '-'}{transaction.amount}
                          </span>
                          <span className="text-white/60 text-sm ml-1">moedas</span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Rodapé com informações */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-between text-white/70 text-sm">
                <p>
                  Mostrando {transactionsFiltradas.length} de {transactions.length} transações
                </p>
                <p>
                  Última atualização: {format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricoTransacoes;
