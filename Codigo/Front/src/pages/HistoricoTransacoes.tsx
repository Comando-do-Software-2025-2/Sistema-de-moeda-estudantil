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

interface Aluno {
  id: number;
  usuario: {
    nome: string;
    email: string;
  };
  saldoMoedas: number;
}

const HistoricoTransacoes = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [transacoesFiltradas, setTransacoesFiltradas] = useState<Transacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alunoAtual, setAlunoAtual] = useState<Aluno | null>(null);

  // Buscar transações da API
  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        // Carregar aluno do localStorage ou sessionStorage
        let aluno = null;
        const alunoStored = localStorage.getItem("aluno");
        const alunoSession = sessionStorage.getItem("alunoLogado");
        
        if (alunoStored) {
          aluno = JSON.parse(alunoStored);
        } else if (alunoSession) {
          aluno = JSON.parse(alunoSession);
        } else {
          // Se não houver aluno armazenado, tentar buscar o primeiro
          const alunosRes = await fetch(`${API_BASE_URL}/alunos`);
          if (alunosRes.ok) {
            const alunos = await alunosRes.json();
            if (alunos.length > 0) {
              aluno = alunos[0];
              sessionStorage.setItem("alunoLogado", JSON.stringify(aluno));
            }
          }
        }
        
        if (aluno) {
          setAlunoAtual(aluno);
        }

        const response = await fetch(`${API_BASE_URL}/transacoes`);
        if (!response.ok) throw new Error('Erro ao buscar transações');
        
        const data = await response.json();
        setTransacoes(data);
        setTransacoesFiltradas(data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransacoes();
  }, []);

  // Filtrar transações baseado na pesquisa
  useEffect(() => {
    let filtradas = transacoes.filter(
      (transacao) =>
        transacao.motivo.toLowerCase().includes(pesquisa.toLowerCase()) ||
        transacao.professor.usuario.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        transacao.aluno.usuario.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        transacao.valorEmMoedas.toString().includes(pesquisa)
    );
    
    // Se há um aluno logado, filtrar apenas transações desse aluno
    if (alunoAtual) {
      filtradas = filtradas.filter(t => t.aluno.id === alunoAtual.id);
    }
    
    setTransacoesFiltradas(filtradas);
  }, [pesquisa, transacoes, alunoAtual]);

  // Usar saldo do aluno logado se disponível
  const saldoAtual = alunoAtual ? alunoAtual.saldoMoedas : 0;

  // Calcular totais (considerando apenas envios/recebimentos do aluno logado)
  let totalRecebido = 0;
  let totalEnviado = 0;
  
  if (alunoAtual) {
    totalRecebido = transacoesFiltradas
      .filter(t => (t.tipoTransacao === 'PROFESSOR_PARA_ALUNO' || t.tipoTransacao === 'ENVIO' || t.tipoTransacao === 'RECEBIMENTO') && t.aluno.id === alunoAtual.id)
      .reduce((sum, t) => sum + t.valorEmMoedas, 0);
    
    totalEnviado = transacoesFiltradas
      .filter(t => t.tipoTransacao === 'TROCA' && t.aluno.id === alunoAtual.id)
      .reduce((sum, t) => sum + t.valorEmMoedas, 0);
  } else {
    totalRecebido = transacoesFiltradas
      .filter(t => t.tipoTransacao === 'PROFESSOR_PARA_ALUNO' || t.tipoTransacao === 'ENVIO' || t.tipoTransacao === 'RECEBIMENTO')
      .reduce((sum, t) => sum + t.valorEmMoedas, 0);
  }

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
                <p className="text-3xl font-bold text-white">{saldoAtual}</p>
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
                {transacoesFiltradas.length} transação(ões) encontrada(s)
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
                    <TableHead className="text-white font-semibold">De → Para</TableHead>
                    <TableHead className="text-white font-semibold">Data</TableHead>
                    <TableHead className="text-white font-semibold text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-white/70 py-8">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-5 w-5 animate-spin border-2 border-white/30 border-t-white rounded-full" />
                          Carregando transações...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : transacoesFiltradas.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-white/70 py-8"
                      >
                        Nenhuma transação encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    transacoesFiltradas.map((transacao) => {
                      const isRecebimento = transacao.tipoTransacao === 'PROFESSOR_PARA_ALUNO' || transacao.tipoTransacao === 'ENVIO' || transacao.tipoTransacao === 'RECEBIMENTO';
                      const isTroca = transacao.tipoTransacao === 'TROCA';
                      
                      return (
                        <TableRow
                          key={transacao.id}
                          className="bg-white/5 hover:bg-white/10 border-white/10 transition-colors"
                        >
                          <TableCell className="text-white">
                            <div className="flex items-center gap-2">
                              {isRecebimento ? (
                                <>
                                  <div className="p-2 rounded-lg bg-green-500/20">
                                    <ArrowDownLeft className="h-4 w-4 text-green-400" />
                                  </div>
                                  <span className="font-medium text-green-400">Recebido</span>
                                </>
                              ) : isTroca ? (
                                <>
                                  <div className="p-2 rounded-lg bg-orange-500/20">
                                    <ArrowUpRight className="h-4 w-4 text-orange-400" />
                                  </div>
                                  <span className="font-medium text-orange-400">Troca</span>
                                </>
                              ) : (
                                <>
                                  <div className="p-2 rounded-lg bg-blue-500/20">
                                    <ArrowDownLeft className="h-4 w-4 text-blue-400" />
                                  </div>
                                  <span className="font-medium text-blue-400">Outro</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-white">
                            <p className="font-medium">{transacao.motivo}</p>
                          </TableCell>
                          <TableCell className="text-white/80">
                            <div className="flex flex-col gap-1">
                              <span className="text-sm">De: {transacao.professor?.usuario?.nome || 'Sistema'}</span>
                              <span className="text-sm">Para: {transacao.aluno.usuario.nome}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-white/70 text-sm">
                            {format(new Date(transacao.dataTransacao), "dd/MM/yyyy", { locale: ptBR })}
                            <br />
                            <span className="text-xs text-white/50">
                              {format(new Date(transacao.dataTransacao), "HH:mm", { locale: ptBR })}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={`text-lg font-bold ${isRecebimento ? 'text-green-400' : 'text-orange-400'}`}>
                              {isRecebimento ? '+' : '-'}{transacao.valorEmMoedas}
                            </span>
                            <span className="text-white/60 text-sm ml-1">moedas</span>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Rodapé com informações */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-between text-white/70 text-sm">
                <p>
                  Mostrando {transacoesFiltradas.length} de {transacoes.length} transações
                </p>
                <p>
                  Última atualização: {format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransacaoNotificadorAluno>
  );
};

export default HistoricoTransacoes;
