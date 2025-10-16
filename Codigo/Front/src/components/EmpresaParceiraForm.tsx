import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Building2, FileText, Hash } from "lucide-react";

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

export function EmpresaParceiraForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  const onSubmit = async (data: EmpresaFormData) => {
    setIsSubmitting(true);
    
    try {
      // Aqui você implementaria a lógica de salvamento no backend
      console.log("Dados do formulário:", data);
      
      // Simulando uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Empresa ${data.nomeEmpresa} cadastrada no sistema.`,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Erro ao cadastrar empresa",
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
        <Label htmlFor="nomeEmpresa" className="text-base text-white">
          Nome da Empresa
        </Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id="nomeEmpresa"
            placeholder="Ex: Restaurante Universitário"
            className="pl-10 h-12 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
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
            className="pl-10 h-12 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
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
            placeholder="Descreva os produtos e serviços oferecidos pela sua empresa..."
            className="pl-10 min-h-[120px] bg-white/20 backdrop-blur-sm border-white/30 resize-none text-white placeholder:text-white/60"
            {...register("descricao")}
          />
        </div>
        {errors.descricao && (
          <p className="text-sm text-red-300 animate-fade-in">{errors.descricao.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        variant="hero" 
        size="lg" 
        className="w-full h-14 text-base font-semibold bg-white/90 hover:bg-white text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar Empresa Parceira"}
      </Button>
    </form>
  );
}
