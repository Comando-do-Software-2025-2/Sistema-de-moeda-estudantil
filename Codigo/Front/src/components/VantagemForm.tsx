import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Gift, Coins, Image as ImageIcon, FileText } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const vantagemSchema = z.object({
  titulo: z.string().min(3, "Título deve ter no mínimo 3 caracteres").max(100, "Título muito longo"),
  descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres").max(500, "Descrição muito longa"),
  custoMoedas: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Custo deve ser um número positivo"),
  foto: z.string().url("URL da foto inválida").optional().or(z.literal("")),
});

type VantagemFormData = z.infer<typeof vantagemSchema>;

export function VantagemForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<VantagemFormData>({
    resolver: zodResolver(vantagemSchema),
  });

  const fotoUrl = watch("foto");

  // Atualizar preview quando URL mudar
  useState(() => {
    if (fotoUrl && fotoUrl.startsWith("http")) {
      setPreviewImage(fotoUrl);
    }
  });

  const onSubmit = async (data: VantagemFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        titulo: data.titulo,
        descricao: data.descricao,
        custoMoedas: parseFloat(data.custoMoedas),
        foto: data.foto || null,
      };

      console.log("Enviando vantagem:", payload);

      const response = await fetch(`${API_BASE_URL}/vantagens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro ao cadastrar vantagem");
      }

      toast({
        title: "Vantagem cadastrada!",
        description: "A vantagem foi cadastrada com sucesso no sistema.",
      });
      reset();
      setPreviewImage("");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Erro ao cadastrar vantagem",
        description: error instanceof Error ? error.message : "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url && url.startsWith("http")) {
      setPreviewImage(url);
    } else {
      setPreviewImage("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl">
      {/* Título */}
      <div className="space-y-2">
        <Label className="text-white flex items-center gap-2">
          <Gift className="h-4 w-4" />
          Título da Vantagem
        </Label>
        <Input
          placeholder="Ex: Desconto de 20% em restaurante"
          className="bg-white/30 text-white placeholder:text-white/60 border-white/20"
          {...register("titulo")}
        />
        {errors.titulo && (
          <p className="text-red-300 text-sm flex items-center gap-1">
            <span className="text-red-400">⚠</span> {errors.titulo.message}
          </p>
        )}
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <Label className="text-white flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Descrição
        </Label>
        <Textarea
          placeholder="Descreva os detalhes da vantagem..."
          className="bg-white/30 text-white placeholder:text-white/60 border-white/20 min-h-[120px] resize-none"
          {...register("descricao")}
        />
        {errors.descricao && (
          <p className="text-red-300 text-sm flex items-center gap-1">
            <span className="text-red-400">⚠</span> {errors.descricao.message}
          </p>
        )}
      </div>

      {/* Custo em Moedas */}
      <div className="space-y-2">
        <Label className="text-white flex items-center gap-2">
          <Coins className="h-4 w-4" />
          Custo em Moedas
        </Label>
        <div className="relative">
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 50"
            className="bg-white/30 text-white placeholder:text-white/60 border-white/20 pl-10"
            {...register("custoMoedas")}
          />
          <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-300" />
        </div>
        {errors.custoMoedas && (
          <p className="text-red-300 text-sm flex items-center gap-1">
            <span className="text-red-400">⚠</span> {errors.custoMoedas.message}
          </p>
        )}
      </div>

      {/* URL da Foto */}
      <div className="space-y-2">
        <Label className="text-white flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          URL da Foto (opcional)
        </Label>
        <Input
          type="url"
          placeholder="https://exemplo.com/imagem.jpg"
          className="bg-white/30 text-white placeholder:text-white/60 border-white/20"
          {...register("foto")}
          onChange={handleImageUrlChange}
        />
        {errors.foto && (
          <p className="text-red-300 text-sm flex items-center gap-1">
            <span className="text-red-400">⚠</span> {errors.foto.message}
          </p>
        )}

        {/* Preview da Imagem */}
        {previewImage && (
          <div className="mt-4 rounded-lg overflow-hidden border-2 border-white/20">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-48 object-cover"
              onError={() => setPreviewImage("")}
            />
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-amber-400/20 rounded-lg p-4 border border-amber-400/30">
        <div className="flex items-start gap-3">
          <Gift className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white/90 text-sm font-medium mb-1">
              Sobre o cadastro de vantagens
            </p>
            <p className="text-white/70 text-xs leading-relaxed">
              As vantagens cadastradas estarão disponíveis para resgate pelos alunos. 
              Certifique-se de definir um custo justo em moedas e fornecer uma descrição clara.
            </p>
          </div>
        </div>
      </div>

      {/* Botão Submit */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin border-2 border-black/30 border-t-black rounded-full" />
            Cadastrando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Cadastrar Vantagem
          </span>
        )}
      </Button>
    </form>
  );
}
