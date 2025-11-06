import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { Coins, Send, User, Wallet } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

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
        const alunosResponse = await fetch(`${API_BASE_URL}/alunos`);
        if (!alunosResponse.ok) throw new Error('Erro ao buscar alunos');
        const alunosData = await alunosResponse.json();
        setAlunos(alunosData);

        // Buscar professores para simular login
        const professoresResponse = await fetch(`${API_BASE_URL}/professores`);
        if (!professoresResponse.ok) throw new Error('Erro ao buscar professor');
        const professoresData = await professoresResponse.json();
        setProfessores(professoresData);
        
        // Define o primeiro professor como padrão
        if (professoresData.length > 0) {
          setProfessorLogado(professoresData[0]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as informações necessárias.",
          variant: "destructive",
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
      const payload = {
        professor_id: professorLogado.id,
        aluno_id: parseInt(formData.alunoId),
        valor: valor,
        motivo: formData.motivo
      };

      const response = await fetch(`${API_BASE_URL}/transacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao enviar moedas');
      }

      const transacao = await response.json();
      
      toast({
        title: "Moedas enviadas com sucesso!",
        description: `${valor} moedas foram enviadas para o aluno.`,
      });
      
      // Limpar formulário
      setFormData({
        alunoId: '',
        valor: '',
        motivo: ''
      });

      // Atualizar saldo do professor
      setProfessorLogado({
        ...professorLogado,
        saldoMoedas: professorLogado.saldoMoedas - valor
      });

      // Recarregar página após 1.5 segundos para atualizar histórico
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao enviar moedas:', error);
      toast({
        title: "Erro ao enviar moedas",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
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
      
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-lg p-3 border border-orange-500/30">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-orange-300 text-xs font-semibold flex items-center gap-2">
          </Label>
          <span className="text-orange-400/60 text-[10px] uppercase tracking-wide">
            Remover em produção
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-sm whitespace-nowrap">Simular login como:</span>
          <Select
            value={professorLogado?.id.toString() || ''}
            onValueChange={(value) => {
              const prof = professores.find(p => p.id.toString() === value);
              if (prof) setProfessorLogado(prof);
            }}
          >
            <SelectTrigger className="bg-orange-500/20 border-orange-500/40 text-white text-sm h-9">
              <SelectValue placeholder="Escolha um professor" />
            </SelectTrigger>
            <SelectContent>
              {professores.map(professor => (
                <SelectItem key={professor.id} value={professor.id.toString()}>
                  #{professor.id} - {professor.usuario.nome} ({professor.saldoMoedas} moedas)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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