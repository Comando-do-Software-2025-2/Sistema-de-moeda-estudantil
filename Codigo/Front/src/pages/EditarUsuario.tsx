import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, UserCircle, ArrowLeft, Save } from "lucide-react";

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
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Senha deve ter no mínimo 8 caracteres",
    })
    .refine((val) => !val || /[A-Z]/.test(val), {
      message: "Senha deve conter pelo menos uma letra maiúscula",
    })
    .refine((val) => !val || /[a-z]/.test(val), {
      message: "Senha deve conter pelo menos uma letra minúscula",
    })
    .refine((val) => !val || /[0-9]/.test(val), {
      message: "Senha deve conter pelo menos um número",
    }),
  confirmarSenha: z.string().optional(),
  tipoUsuario: z.enum(["Aluno", "Professor", "Empresa", "Administrador"], {
    required_error: "Selecione o tipo de usuário",
  }),
}).refine(
  (data) => {
    if (data.senha || data.confirmarSenha) {
      return data.senha === data.confirmarSenha;
    }
    return true;
  },
  {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  }
);

type UsuarioFormData = z.infer<typeof usuarioSchema>;

const EditarUsuario = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
  });

  // Carregar dados do usuário
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        // Aqui você faria a chamada à API para buscar o usuário
        // const response = await api.get(`/usuarios/${id}`);
        
        // Simulando dados
        const usuarioSimulado = {
          id: Number(id),
          nome: "João Silva",
          email: "joao@email.com",
          tipoUsuario: "Aluno",
        };

        setValue("nome", usuarioSimulado.nome);
        setValue("email", usuarioSimulado.email);
        setValue("tipoUsuario", usuarioSimulado.tipoUsuario as any);
        setTipoUsuario(usuarioSimulado.tipoUsuario);
        
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Erro ao carregar usuário",
          description: "Não foi possível carregar os dados do usuário.",
          variant: "destructive",
        });
        navigate("/lista-usuarios");
      }
    };

    carregarUsuario();
  }, [id, setValue, toast, navigate]);

  const onSubmit = async (data: UsuarioFormData) => {
    setIsSubmitting(true);
    
    try {
      // Aqui você implementaria a lógica de atualização no backend
      // Se não houver senha, não envie os campos de senha
      const dadosParaEnviar = {
        nome: data.nome,
        email: data.email,
        tipoUsuario: data.tipoUsuario,
        ...(data.senha && { senha: data.senha }),
      };
      
      console.log("Dados para atualização:", dadosParaEnviar);
      
      // Simulando uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Usuário atualizado!",
        description: `Dados de ${data.nome} foram atualizados com sucesso.`,
      });
      
      navigate("/lista-usuarios");
    } catch (error) {
      toast({
        title: "Erro ao atualizar usuário",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="h-12 w-12 text-secondary animate-scale-in" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              Editar Usuário
            </h1>
          </div>
          <p className="text-xl text-white/95 font-light drop-shadow-md">
            Atualize os dados do usuário
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-2xl animate-scale-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Atualizar Dados
                </h2>
                <p className="text-white/80">
                  ID do Usuário: {id}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/lista-usuarios")}
                className="bg-white/20 text-white border-white/40 hover:bg-white/30"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-base text-white">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                  <Input
                    id="nome"
                    placeholder="Digite o nome completo"
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
                    placeholder="email@exemplo.com"
                    className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-300 animate-fade-in">{errors.email.message}</p>
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

              <div className="pt-6 border-t border-white/20">
                <p className="text-white/80 text-sm mb-4">
                  Deixe os campos de senha em branco caso não deseje alterá-la
                </p>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="senha" className="text-base text-white">
                      Nova Senha (opcional)
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                      <Input
                        id="senha"
                        type="password"
                        placeholder="Digite a nova senha"
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
                      Confirmar Nova Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                      <Input
                        id="confirmarSenha"
                        type="password"
                        placeholder="Confirme a nova senha"
                        className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
                        {...register("confirmarSenha")}
                      />
                    </div>
                    {errors.confirmarSenha && (
                      <p className="text-sm text-red-300 animate-fade-in">{errors.confirmarSenha.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 h-14 text-base font-semibold bg-white/90 hover:bg-white text-black"
                  disabled={isSubmitting}
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/lista-usuarios")}
                  className="h-14 bg-white/20 text-white border-white/40 hover:bg-white/30"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
