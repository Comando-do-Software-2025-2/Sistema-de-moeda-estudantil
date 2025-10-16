import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Building2, Hash, FileText, ArrowLeft, Save } from "lucide-react";

// Validação de CNPJ brasileiro
const validarCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]/g, "");

  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
};

const empresaSchema = z.object({
  nomeEmpresa: z
    .string()
    .min(3, "Nome da empresa deve ter no mínimo 3 caracteres")
    .max(100, "Nome da empresa deve ter no máximo 100 caracteres")
    .trim(),
  cnpj: z
    .string()
    .min(14, "CNPJ inválido")
    .max(18, "CNPJ inválido")
    .refine(validarCNPJ, "CNPJ inválido")
    .transform((val) => val.replace(/[^\d]/g, "")),
  descricao: z
    .string()
    .min(10, "Descrição deve ter no mínimo 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .trim(),
});

type EmpresaFormData = z.infer<typeof empresaSchema>;

const EditarEmpresa = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema),
  });

  const formatarCNPJ = (valor: string): string => {
    const numeros = valor.replace(/[^\d]/g, "");
    return numeros
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  // Carregar dados da empresa
  useEffect(() => {
    const carregarEmpresa = async () => {
      try {
        // Aqui você faria a chamada à API para buscar a empresa
        // const response = await api.get(`/empresas/${id}`);
        
        // Simulando dados
        const empresaSimulada = {
          id: Number(id),
          nomeEmpresa: "Restaurante Universitário",
          cnpj: "12.345.678/0001-90",
          descricao: "Restaurante com diversos pratos e opções de alimentação saudável para estudantes.",
        };

        setValue("nomeEmpresa", empresaSimulada.nomeEmpresa);
        setValue("cnpj", empresaSimulada.cnpj);
        setValue("descricao", empresaSimulada.descricao);
        
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Erro ao carregar empresa",
          description: "Não foi possível carregar os dados da empresa.",
          variant: "destructive",
        });
        navigate("/lista-empresas");
      }
    };

    carregarEmpresa();
  }, [id, setValue, toast, navigate]);

  const onSubmit = async (data: EmpresaFormData) => {
    setIsSubmitting(true);
    
    try {
      // Aqui você implementaria a lógica de atualização no backend
      console.log("Dados para atualização:", data);
      
      // Simulando uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Empresa atualizada!",
        description: `Dados de ${data.nomeEmpresa} foram atualizados com sucesso.`,
      });
      
      navigate("/lista-empresas");
    } catch (error) {
      toast({
        title: "Erro ao atualizar empresa",
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
            <Building2 className="h-12 w-12 text-secondary animate-scale-in" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              Editar Empresa
            </h1>
          </div>
          <p className="text-xl text-white/95 font-light drop-shadow-md">
            Atualize os dados da empresa parceira
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
                  ID da Empresa: {id}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/lista-empresas")}
                className="bg-white/20 text-white border-white/40 hover:bg-white/30"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nomeEmpresa" className="text-base text-white">
                  Nome da Empresa
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                  <Input
                    id="nomeEmpresa"
                    placeholder="Ex: Restaurante Universitário"
                    className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
                    {...register("nomeEmpresa")}
                  />
                </div>
                {errors.nomeEmpresa && (
                  <p className="text-sm text-red-300 animate-fade-in">{errors.nomeEmpresa.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-base text-white">
                  CNPJ
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0000-00"
                    className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70 font-mono"
                    {...register("cnpj")}
                    onChange={(e) => {
                      e.target.value = formatarCNPJ(e.target.value);
                    }}
                  />
                </div>
                {errors.cnpj && (
                  <p className="text-sm text-red-300 animate-fade-in">{errors.cnpj.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-base text-white">
                  Descrição
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <Textarea
                    id="descricao"
                    placeholder="Descreva os produtos e serviços oferecidos pela empresa..."
                    className="pl-10 min-h-[150px] bg-white/30 backdrop-blur-sm border-white/40 resize-none text-white placeholder:text-white/70"
                    {...register("descricao")}
                  />
                </div>
                {errors.descricao && (
                  <p className="text-sm text-red-300 animate-fade-in">{errors.descricao.message}</p>
                )}
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
                  onClick={() => navigate("/lista-empresas")}
                  className="h-14 bg-white/20 text-white border-white/40 hover:bg-white/30"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-white/70 text-center">
                Certifique-se de que todos os dados estão corretos antes de salvar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarEmpresa;
