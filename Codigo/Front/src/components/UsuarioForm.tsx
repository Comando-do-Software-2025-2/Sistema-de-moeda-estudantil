import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Hash, UserCircle } from "lucide-react";

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

const usuarioSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim(),
  email: z
    .string()
    .email("Email inválido")
    .min(5, "Email deve ter no mínimo 5 caracteres")
    .max(100, "Email deve ter no máximo 100 caracteres")
    .trim()
    .toLowerCase(),
  senha: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(50, "Senha deve ter no máximo 50 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
  confirmarSenha: z.string(),
  cpf: z
    .string()
    .min(11, "CPF inválido")
    .max(14, "CPF inválido")
    .refine(validarCPF, "CPF inválido")
    .transform((val) => val.replace(/[^\d]/g, "")),
  tipoUsuario: z.enum(["Aluno", "Professor", "Empresa", "Administrador"], {
    required_error: "Selecione o tipo de usuário",
  }),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

type UsuarioFormData = z.infer<typeof usuarioSchema>;

export function UsuarioForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
  });

  const formatarCPF = (valor: string): string => {
    const numeros = valor.replace(/[^\d]/g, "");
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const onSubmit = async (data: UsuarioFormData) => {
    setIsSubmitting(true);
    
    try {
      // Aqui você implementaria a lógica de salvamento no backend
      console.log("Dados do formulário:", data);
      
      // Simulando uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Usuário ${data.nome} cadastrado no sistema.`,
      });
      
      reset();
      setTipoUsuario("");
    } catch (error) {
      toast({
        title: "Erro ao cadastrar usuário",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="nome" className="text-base text-white">
          Nome Completo
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="nome"
            placeholder="Digite seu nome completo"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("nome")}
          />
        </div>
        {errors.nome && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.nome.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-base text-white">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.email.message}</p>
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
        <Label htmlFor="tipoUsuario" className="text-base text-white">
          Tipo de Usuário
        </Label>
        <div className="relative">
          <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60 z-10" />
          <Select
            value={tipoUsuario}
            onValueChange={(value) => {
              setTipoUsuario(value);
              setValue("tipoUsuario", value as any);
            }}
          >
            <SelectTrigger className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white">
              <SelectValue placeholder="Selecione o tipo de usuário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aluno">Aluno</SelectItem>
              <SelectItem value="Professor">Professor</SelectItem>
              <SelectItem value="Empresa">Empresa</SelectItem>
              <SelectItem value="Administrador">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {errors.tipoUsuario && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.tipoUsuario.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha" className="text-base text-white">
          Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("senha")}
          />
        </div>
        {errors.senha && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.senha.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha" className="text-base text-white">
          Confirmar Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="confirmarSenha"
            type="password"
            placeholder="Confirme sua senha"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("confirmarSenha")}
          />
        </div>
        {errors.confirmarSenha && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.confirmarSenha.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        variant="hero" 
        size="lg" 
        className="w-full h-14 text-base font-semibold bg-white/90 hover:bg-white text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar Usuário"}
      </Button>
    </form>
  );
}
