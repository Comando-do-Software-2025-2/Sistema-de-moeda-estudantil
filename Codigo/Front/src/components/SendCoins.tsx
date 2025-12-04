import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { Coins, Send, User, Wallet } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Função para enviar notificação de distribuição
async function enviarNotificacaoDistribuicao(emailPayload: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/emails/distribuir-moedas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alunoEmail: emailPayload.alunoEmail,
        alunoNome: emailPayload.alunoNome,
        professorNome: emailPayload.professorNome,
        professorEmail: emailPayload.professorEmail,
        valor: emailPayload.valor,
        motivo: emailPayload.motivo
      }),
    });

    if (!response.ok) {
      console.error('Erro ao enviar emails:', await response.text());
    }
  } catch (error) {
    console.error('Erro ao enviar emails de notificação:', error);
    // Não falhar a transação se os emails falharem
  }
}

interface Aluno {
  id: number;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
  saldoMoedas: number;
}

interface Professor {
  id: number;
  usuario: {
    id: number;
    nome: string;
  };
  saldoMoedas: number;
}

export function SendCoins() {
  const { toast } = useToast();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [professorLogado, setProfessorLogado] = useState<Professor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    alunoId: '',
    valor: '',
    motivo: ''
  });

  // Buscar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar alunos
        const alunosResponse = await fetch(`${API_BASE_URL}/alunos`, {
          credentials: 'include',
        });
        if (!alunosResponse.ok) throw new Error('Erro ao buscar alunos');
        const alunosData = await alunosResponse.json();
        setAlunos(alunosData);

        // Buscar professor do usuário logado
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (!user.id) throw new Error('Usuário não identificado');

        const professorResponse = await fetch(`${API_BASE_URL}/professores/usuario/${user.id}`, {
          credentials: 'include',
        });
        
        if (!professorResponse.ok) {
          throw new Error('Erro ao buscar professor do usuário logado');
        }
        
        const professor = await professorResponse.json();
        setProfessorLogado(professor);
        setProfessores([professor]);
        sessionStorage.setItem('professorLogado', JSON.stringify(professor));
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        
        // Carregar dados padrão em caso de erro
        setAlunos([{
          id: 1,
          usuario: { id: 1, nome: 'Aluno Padrão', email: 'aluno@example.com' },
          saldoMoedas: 0
        }]);
        
        const professorPadrao = {
          id: 1,
          usuario: { id: 1, nome: 'Professor Padrão' },
          saldoMoedas: 1000
        };
        
        setProfessores([professorPadrao]);
        setProfessorLogado(professorPadrao);
        sessionStorage.setItem('professorLogado', JSON.stringify(professorPadrao));
        
        toast({
          title: "Modo de demonstração",
          description: "Usando dados padrão para demonstração.",
          variant: "default",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se professor está logado
    if (!professorLogado) {
      toast({
        title: "Professor não identificado",
        description: "Não foi possível identificar o professor logado.",
        variant: "destructive",
      });
      return;
    }

    // Validações
    if (!formData.alunoId || !formData.valor || !formData.motivo) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const valor = parseFloat(formData.valor);
    if (valor <= 0) {
      toast({
        title: "Valor inválido",
        description: "O valor deve ser maior que zero.",
        variant: "destructive",
      });
      return;
    }

    // Verificar se professor tem saldo suficiente
    if (valor > professorLogado.saldoMoedas) {
      toast({
        title: "Saldo insuficiente",
        description: `Você possui apenas ${professorLogado.saldoMoedas} moedas disponíveis.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Encontrar dados do aluno
      const alunoSelecionado = alunos.find(a => a.id === parseInt(formData.alunoId));
      if (!alunoSelecionado) {
        throw new Error('Aluno não encontrado');
      }

      // 1. Enviar transação
      const payload = {
        professor_id: professorLogado.id,
        aluno_id: parseInt(formData.alunoId),
        valor: parseFloat(formData.valor),
        motivo: formData.motivo
      };

      console.log('Enviando payload:', payload);

      const response = await fetch(`${API_BASE_URL}/transacoes`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response status:', response.status);
        console.error('Response body:', errorText);
        throw new Error(`Erro ${response.status}: ${errorText || 'Erro ao enviar moedas'}`);
      }

      let transacao;
      try {
        transacao = await response.json();
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta:', parseError);
        transacao = { id: Date.now() };
      }

      // 2. Enviar emails (agora com Thymeleaf templates)
      const emailPayload = {
        alunoEmail: alunoSelecionado.usuario.email,
        alunoNome: alunoSelecionado.usuario.nome,
        professorNome: professorLogado.usuario.nome,
        professorEmail: "kaiomayer2005@gmail.com",
        valor: valor,
        motivo: formData.motivo
      };

      await enviarNotificacaoDistribuicao(emailPayload);
      
      // 3. Atualizar saldo do professor localmente
      const professorAtualizado = {
        ...professorLogado,
        saldoMoedas: professorLogado.saldoMoedas - valor
      };
      setProfessorLogado(professorAtualizado);
      sessionStorage.setItem('professorLogado', JSON.stringify(professorAtualizado));

      // 4. Disparar evento customizado para atualizar histórico
      window.dispatchEvent(new CustomEvent('transacaoRealizada', {
        detail: {
          id: transacao?.id || Date.now(),
          tipoTransacao: 'PROFESSOR_PARA_ALUNO',
          professor: {
            id: professorLogado.id,
            usuario: {
              nome: professorLogado.usuario.nome,
            },
          },
          aluno: {
            id: alunoSelecionado.id,
            usuario: {
              nome: alunoSelecionado.usuario.nome,
            },
          },
          valorEmMoedas: valor,
          motivo: formData.motivo,
          dataTransacao: new Date().toISOString(),
        }
      }));
      
      toast({
        title: "Moedas enviadas com sucesso!",
        description: `${valor} moedas foram enviadas para ${alunoSelecionado.usuario.nome}. E-mails de notificação foram enviados!`,
      });
      
      // Limpar formulário
      setFormData({
        alunoId: '',
        valor: '',
        motivo: ''
      });
      
    } catch (error) {
      console.error('Erro ao enviar moedas:', error);
      console.error('Stack trace:', error instanceof Error ? error.stack : 'N/A');
      
      let mensagem = "Tente novamente mais tarde.";
      if (error instanceof Error) {
        mensagem = error.message;
      } else if (typeof error === 'string') {
        mensagem = error;
      }
      
      toast({
        title: "Erro ao enviar moedas",
        description: mensagem,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin border-4 border-white/30 border-t-white rounded-full" />
      </div>
    );
  }

  if (!professorLogado) {
    return (
      <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
        <p className="text-red-300 text-center">
          Professor não identificado. Por favor, faça login novamente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Card do Professor Logado */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Professor Logado</p>
              <p className="text-white font-semibold text-lg">{professorLogado.usuario.nome}</p>
              <p className="text-white/50 text-xs">ID: {professorLogado.id}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Saldo disponível</p>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-amber-300" />
              <p className="text-amber-300 font-bold text-lg">{professorLogado.saldoMoedas}</p>
              <span className="text-white/60 text-sm">moedas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aluno */}
      <div className="space-y-2">
        <Label className="text-white flex items-center gap-2">
          <User className="h-4 w-4" />
          Selecione o Aluno
        </Label>
        <Select
          value={formData.alunoId}
          onValueChange={(value) => setFormData({ ...formData, alunoId: value })}
        >
          <SelectTrigger className="bg-white/30 backdrop-blur-sm border-white/40 text-white">
            <SelectValue placeholder="Selecione um aluno" />
          </SelectTrigger>
          <SelectContent>
            {alunos.map(aluno => (
              <SelectItem key={aluno.id} value={aluno.id.toString()}>
                {aluno.usuario.nome} ({aluno.usuario.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Valor */}
      <div className="space-y-2">
        <Label className="text-white flex items-center gap-2">
          <Coins className="h-4 w-4" />
          Quantidade de Moedas
        </Label>
        <Input
          type="number"
          min="1"
          step="0.01"
          placeholder="Ex: 50"
          value={formData.valor}
          onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
          className="bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/60"
          required
        />
      </div>

      {/* Motivo */}
      <div className="space-y-2">
        <Label className="text-white">Descrição / Motivo</Label>
        <Textarea
          value={formData.motivo}
          onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
          placeholder="Descreva o motivo do envio das moedas..."
          className="bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/60 min-h-[80px] resize-none"
          required
        />
      </div>

      {/* Botão Submit */}
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin border-2 border-black/30 border-t-black rounded-full" />
            Enviando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Enviar Moedas
          </span>
        )}
      </Button>
    </form>
  );
}