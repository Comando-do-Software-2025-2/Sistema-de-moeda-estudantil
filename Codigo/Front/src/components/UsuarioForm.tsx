import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, UserCircle } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const usuarioSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres")
      .trim(),
    email: z
      .string()
      .email("E-mail inválido")
      .min(5, "E-mail deve ter no mínimo 5 caracteres")
      .max(100, "E-mail deve ter no máximo 100 caracteres")
      .trim()
      .toLowerCase(),
    senha: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .max(50, "Senha deve ter no máximo 50 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter ao menos um número"),
    confirmarSenha: z.string(),
    tipoUsuario: z
      .string({ required_error: "Selecione o tipo de usuário" })
      .transform((val) => val.toUpperCase())
      .refine(
        (val) =>
          ["ALUNO", "PROFESSOR", "EMPRESA", "ADMINISTRADOR"].includes(val),
        {
          message: "Selecione um tipo de usuário válido",
        }
      ),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
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

  const onSubmit = async (data: UsuarioFormData) => {
    setIsSubmitting(true);

    try {
      const payload = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        tipoUsuario: data.tipoUsuario,
      };

      console.log(payload);

      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        credentials: 'include',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Usuário ${data.nome} foi cadastrado no sistema.`,
      });

      reset();
      setTipoUsuario("");
    } catch (error) {
      toast({
        title: "Erro ao cadastrar usuário",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-2xl"
    >
      {/* Nome */}
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
          <p className="text-sm text-red-300 animate-fade-in">
            {errors.nome.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base text-white">
          E-mail
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-300 animate-fade-in">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Tipo de Usuário */}
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
              setValue("tipoUsuario", value.toUpperCase() as any);
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
          <p className="text-sm text-red-300 animate-fade-in">
            {errors.tipoUsuario.message}
          </p>
        )}
      </div>

      {/* Senha */}
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
          <p className="text-sm text-red-300 animate-fade-in">
            {errors.senha.message}
          </p>
        )}
      </div>

      {/* Confirmar Senha */}
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
          <p className="text-sm text-red-300 animate-fade-in">
            {errors.confirmarSenha.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-14 text-base font-semibold bg-white/90 hover:bg-white text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar Usuário"}
      </Button>
    </form>
  );
}
