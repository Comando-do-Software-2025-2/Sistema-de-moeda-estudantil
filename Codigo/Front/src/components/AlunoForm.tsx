import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Hash, MapPin, Building2, BookOpen, Search, User } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Tipos retornados pelo backend
interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: string;
}

interface Instituicao {
  id: number;
  nome: string;
}

const validarCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
};

const alunoSchema = z.object({
  cpf: z.string().min(11, "CPF inválido").refine(validarCPF, "CPF inválido"),
  ra: z.string().min(5, "RA inválido").max(20),
  instituicaoId: z.string().min(1, "Selecione uma instituição"),
  endereco: z.string().min(6, "Endereço muito curto"),
  curso: z.string().min(3, "Curso inválido"),
});

type AlunoFormData = z.infer<typeof alunoSchema>;

export function AlunoForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instituicaoId, setInstituicaoId] = useState("");
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
  });

  // 🔹 Buscar instituições do backend
  useEffect(() => {
    const fetchInstituicoes = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/instituicoes`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error("Erro ao buscar instituições");
        const data = await res.json();
        setInstituicoes(data);
      } catch {
        toast({
          title: "Erro ao carregar instituições",
          description: "Não foi possível obter as instituições.",
          variant: "destructive",
        });
      }
    };
    fetchInstituicoes();
  }, []);

  // 🔹 Buscar usuários reais
  const buscarUsuarios = async (termo: string) => {
    if (termo.length < 3) {
      setUsuarios([]);
      setShowResults(false);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`${API_BASE_URL}/usuarios?search=${termo}&tipo=Aluno`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      const data = await res.json();
      setUsuarios(data);
      setShowResults(true);
    } catch {
      toast({
        title: "Erro ao buscar usuários",
        description: "Verifique a conexão com o servidor.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const selecionarUsuario = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setSearchTerm(usuario.nome);
    setShowResults(false);
  };

  // 🔹 Submeter aluno para o backend
  const onSubmit = async (data: AlunoFormData) => {
    if (!usuarioSelecionado) {
      toast({
        title: "Usuário não selecionado",
        description: "Por favor, selecione um usuário antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        usuario_id: usuarioSelecionado.id,
        instituicao_id: Number(data.instituicaoId) ,
        rg: data.ra,
        endereco: data.endereco,
        curso: data.curso,
        cpf: data.cpf.replace(/[^\d]/g, ""),
        saldoMoedas: 0.0,
      };

      console.log(payload);

      const response = await fetch(`${API_BASE_URL}/alunos`, {
        credentials: 'include',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Cadastro concluído!",
        description: "Aluno cadastrado com sucesso.",
      });
      reset();
      setUsuarioSelecionado(null);
      setSearchTerm("");
      setInstituicaoId("");
    } catch {
      toast({
        title: "Erro ao cadastrar aluno",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatarCPF = (valor: string): string =>
    valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl">
      {/* 🔍 Buscar Usuário */}
      <div className="space-y-2">
        <Label className="text-white">Buscar Usuário</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            placeholder="Digite o nome do usuário"
            className="pl-10 bg-white/30 text-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              buscarUsuarios(e.target.value);
            }}
            disabled={!!usuarioSelecionado}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin border-2 border-white/50 border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        {showResults && usuarios.length > 0 && (
          <div className="bg-white/90 rounded-lg border border-white/30 max-h-56 overflow-y-auto">
            {usuarios.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => selecionarUsuario(u)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                <p className="font-medium text-gray-900">{u.nome}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
              </button>
            ))}
          </div>
        )}

        {usuarioSelecionado && (
          <div className="bg-green-500/20 p-3 rounded-lg border border-green-400/30 text-white flex justify-between">
            <div>
              <p className="font-semibold">{usuarioSelecionado.nome}</p>
              <p className="text-sm text-white/70">{usuarioSelecionado.email}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setUsuarioSelecionado(null);
                setSearchTerm("");
              }}
              className="text-white/70 hover:text-white"
            >
              Trocar
            </Button>
          </div>
        )}
      </div>

      {/* Campos */}
      <div>
        <Label className="text-white">CPF</Label>
        <Input
          placeholder="000.000.000-00"
          className="bg-white/30 text-white"
          {...register("cpf")}
          onChange={(e) => (e.target.value = formatarCPF(e.target.value))}
        />
        {errors.cpf && <p className="text-red-300">{errors.cpf.message}</p>}
      </div>

      <div>
        <Label className="text-white">RA</Label>
        <Input placeholder="2024001234" className="bg-white/30 text-white" {...register("ra")} />
        {errors.ra && <p className="text-red-300">{errors.ra.message}</p>}
      </div>

      <div>
        <Label className="text-white">Instituição</Label>
        <Select
          value={instituicaoId}
          onValueChange={(value) => {
            setInstituicaoId(value);
            setValue("instituicaoId", value);
          }}
        >
          <SelectTrigger className="bg-white/30 text-white">
            <SelectValue placeholder="Selecione a instituição" />
          </SelectTrigger>
          <SelectContent>
            {instituicoes.map((inst) => (
              <SelectItem key={inst.id} value={inst.id.toString()}>
                {inst.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.instituicaoId && <p className="text-red-300">{errors.instituicaoId.message}</p>}
      </div>

      <div>
        <Label className="text-white">Curso</Label>
        <Input placeholder="Engenharia de Software" className="bg-white/30 text-white" {...register("curso")} />
        {errors.curso && <p className="text-red-300">{errors.curso.message}</p>}
      </div>

      <div>
        <Label className="text-white">Endereço</Label>
        <Input placeholder="Rua, número, bairro" className="bg-white/30 text-white" {...register("endereco")} />
        {errors.endereco && <p className="text-red-300">{errors.endereco.message}</p>}
      </div>

      <div className="bg-white/20 rounded-lg p-3 border border-white/30">
        <BookOpen className="inline h-4 w-4 mr-1" /> Saldo inicial: 0 moedas
      </div>

      <Button type="submit" className="w-full bg-white text-black font-semibold" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar Aluno"}
      </Button>
    </form>
  );
}
