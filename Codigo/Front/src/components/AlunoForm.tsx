import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Hash, MapPin, Building2, BookOpen, Search, User } from "lucide-react";

// Tipo para representar um usuário
interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: string;
}

// Validação de CPF brasileiro
const validarCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

const alunoSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF inválido")
    .max(14, "CPF inválido")
    .refine(validarCPF, "CPF inválido")
    .transform((val) => val.replace(/[^\d]/g, "")),
  ra: z
    .string()
    .min(5, "RA deve ter no mínimo 5 caracteres")
    .max(20, "RA deve ter no máximo 20 caracteres")
    .trim(),
  instituicaoId: z.string({
    required_error: "Selecione uma instituição",
  }).min(1, "Selecione uma instituição"),
  endereco: z
    .string()
    .min(6, "Endereço deve ter no mínimo 6 caracteres")
    .max(200, "Endereço deve ter no máximo 200 caracteres")
    .trim(),
  curso: z
    .string()
    .min(3, "Nome do curso deve ter no mínimo 3 caracteres")
    .max(100, "Nome do curso deve ter no máximo 100 caracteres")
    .trim(),
});

type AlunoFormData = z.infer<typeof alunoSchema>;

interface AlunoFormProps {
  usuarioId?: number;
}

export function AlunoForm({ usuarioId }: AlunoFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instituicaoId, setInstituicaoId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
  });

  const formatarCPF = (valor: string): string => {
    const numeros = valor.replace(/[^\d]/g, "");
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatarRA = (valor: string): string => {
    // RA aceita números e letras, mantém apenas alfanuméricos
    return valor.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 20);
  };

  const buscarUsuarios = async (termo: string) => {
    if (termo.length < 3) {
      setUsuarios([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      // Aqui você faria a chamada real para a API
      // const response = await fetch(`/api/usuarios?search=${termo}&tipo=Aluno`);
      // const data = await response.json();
      
      // Simulação de dados para exemplo
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const usuariosMock: Usuario[] = [
        { id: 1, nome: "João da Silva", email: "joao@email.com", tipoUsuario: "Aluno" },
        { id: 2, nome: "Maria Santos", email: "maria@email.com", tipoUsuario: "Aluno" },
        { id: 3, nome: "Pedro Oliveira", email: "pedro@email.com", tipoUsuario: "Aluno" },
      ].filter(
        (u) =>
          u.nome.toLowerCase().includes(termo.toLowerCase()) &&
          u.tipoUsuario === "Aluno"
      );

      setUsuarios(usuariosMock);
      setShowResults(true);
    } catch (error) {
      toast({
        title: "Erro ao buscar usuários",
        description: "Tente novamente mais tarde.",
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

  const onSubmit = async (data: AlunoFormData) => {
    if (!usuarioSelecionado) {
      toast({
        title: "Usuário não selecionado",
        description: "Por favor, selecione um usuário cadastrado antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Aqui você implementaria a lógica de salvamento no backend
      const alunoData = {
        ...data,
        usuarioId: usuarioSelecionado.id,
        saldoMoedas: 0.00, // Saldo inicial
      };
      
      console.log("Dados do aluno:", alunoData);
      
      // Simulando uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Seus dados de aluno foram cadastrados no sistema.",
      });
      
      reset();
      setInstituicaoId("");
      setUsuarioSelecionado(null);
      setSearchTerm("");
      setUsuarios([]);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar aluno",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl">
      {/* Campo de Pesquisa de Usuário */}
      <div className="space-y-2">
        <Label htmlFor="searchUsuario" className="text-base text-white">
          Buscar Usuário Cadastrado
        </Label>
        <p className="text-sm text-white/70 mb-2">
          Para cadastrar um aluno, primeiro selecione o usuário já cadastrado no sistema
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="searchUsuario"
            placeholder="Digite o nome do usuário"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              buscarUsuarios(e.target.value);
            }}
            disabled={!!usuarioSelecionado}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-white/60 border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        {/* Resultados da Pesquisa */}
        {showResults && usuarios.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-white/40 max-h-60 overflow-y-auto">
            {usuarios.map((usuario) => (
              <button
                key={usuario.id}
                type="button"
                onClick={() => selecionarUsuario(usuario)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{usuario.nome}</p>
                    <p className="text-sm text-gray-600">{usuario.email}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {showResults && usuarios.length === 0 && (
          <p className="text-sm text-white/70 bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
            Nenhum usuário encontrado. Certifique-se de que o usuário está cadastrado no sistema.
          </p>
        )}

        {/* Usuário Selecionado */}
        {usuarioSelecionado && (
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-400/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <User className="h-5 w-5" />
                <div>
                  <p className="font-medium">{usuarioSelecionado.nome}</p>
                  <p className="text-sm text-white/70">{usuarioSelecionado.email}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setUsuarioSelecionado(null);
                  setSearchTerm("");
                  setUsuarios([]);
                }}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                Trocar
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf" className="text-base text-white">
          CPF
        </Label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("cpf")}
            onChange={(e) => {
              e.target.value = formatarCPF(e.target.value);
            }}
          />
        </div>
        {errors.cpf && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.cpf.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ra" className="text-base text-white">
          RA (Registro Acadêmico)
        </Label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="ra"
            placeholder="Ex: 2024001234"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("ra")}
            onChange={(e) => {
              e.target.value = formatarRA(e.target.value);
            }}
          />
        </div>
        {errors.ra && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.ra.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="instituicaoId" className="text-base text-white">
          Instituição de Ensino
        </Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60 z-10" />
          <Select
            value={instituicaoId}
            onValueChange={(value) => {
              setInstituicaoId(value);
              setValue("instituicaoId", value);
            }}
          >
            <SelectTrigger className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white">
              <SelectValue placeholder="Selecione sua instituição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">PUC Minas</SelectItem>
              <SelectItem value="2">FGV</SelectItem>
              <SelectItem value="3">UFMG</SelectItem>
              <SelectItem value="4">USP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {errors.instituicaoId && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.instituicaoId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="curso" className="text-base text-white">
          Curso
        </Label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="curso"
            placeholder="Ex: Engenharia de Software"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("curso")}
          />
        </div>
        {errors.curso && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.curso.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="endereco" className="text-base text-white">
          Endereço Completo
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="endereco"
            placeholder="Rua, número, bairro, cidade - Estado"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("endereco")}
          />
        </div>
        {errors.endereco && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.endereco.message}</p>
        )}
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
        <div className="flex items-center gap-2 text-white/90">
          <BookOpen className="h-5 w-5" />
          <div>
            <p className="text-sm font-medium">Saldo Inicial de Moedas</p>
            <p className="text-xs text-white/70">Você começará com 0 moedas. Participe das atividades para acumular!</p>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        variant="hero" 
        size="lg" 
        className="w-full h-14 text-base font-semibold bg-white/90 hover:bg-white text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Completar Cadastro de Aluno"}
      </Button>
    </form>
  );
}
