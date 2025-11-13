import { useEffect, useMemo, useState } from "react";
import { DynamicNavbar } from "@/components/DynamicNavbar";
import { Gift, Sparkles, Coins, Building2, Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type VantagemApi = {
  id: number;
  titulo: string;
  descricao?: string;
  custoEmMoedas?: number; // backend model
  custoMoedas?: number;   // possible alternative from DTO/form
  empresaNome?: string;   // if backend provides
  foto?: string | null;   // optional
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const Vantagens = () => {
  const { toast } = useToast();
  const [vantagens, setVantagens] = useState<VantagemApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [resgatando, setResgatando] = useState<number | null>(null);
  const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/vantagens`);
        if (!res.ok) throw new Error("Falha ao carregar vantagens");
        const data = await res.json();
        if (Array.isArray(data)) {
          setVantagens(data);
        } else {
          setVantagens([]);
        }

        // Carregar usuário atual do localStorage (ou contexto)
        const usuario = localStorage.getItem("usuario");
        if (usuario) {
          setUsuarioAtual(JSON.parse(usuario));
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vantagens;
    return vantagens.filter((v) =>
      [v.titulo, v.descricao, v.empresaNome]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q))
    );
  }, [query, vantagens]);

  const handleResgate = async (vantagem: VantagemApi) => {
    if (!usuarioAtual) {
      toast({
        title: "Usuário não identificado",
        description: "Por favor, faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    setResgatando(vantagem.id);

    try {
      // Gerar código único para o resgate
      const codigoResgate = `VAN${Date.now()}`;

      // Enviar para backend
      const response = await fetch(`${API_BASE_URL}/api/emails/resgatar-vantagem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alunoEmail: usuarioAtual.email,
          alunoNome: usuarioAtual.nome,
          empresaNome: vantagem.empresaNome || "Empresa Parceira",
          empresaEmail: "contato@empresa.com",
          vantagemTitulo: vantagem.titulo,
          codigoCupom: codigoResgate,
          custoMoedas: vantagem.custoEmMoedas ?? vantagem.custoMoedas ?? 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao resgatar vantagem");
      }

      const result = await response.json();

      toast({
        title: "Vantagem resgatada com sucesso!",
        description: `Código: ${codigoResgate}\nEmail enviado para ${usuarioAtual.email}`,
      });
    } catch (error) {
      console.error("Erro no resgate:", error);
      toast({
        title: "Erro ao resgatar",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setResgatando(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DynamicNavbar />

      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/fundo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-amber-900/10 to-black/30" />
      </div>

      {/* Content */}
  <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12 pt-24 w-full bg-gradient-to-br from-amber-50/5 to-black/60">
        {/* Header */}
  <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="h-12 w-12 text-amber-300 animate-scale-in drop-shadow-xl" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              Vantagens Disponíveis
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-amber-200 animate-pulse" />
            <p className="text-xl md:text-2xl text-white/95 font-light drop-shadow-md">
              Benefícios para você resgatar com suas moedas
            </p>
          </div>
          <p className="text-base text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Explore as vantagens cadastradas pelas empresas parceiras e planeje seus resgates
          </p>
        </div>

        {/* Search and Count */}
  <div className="w-full max-w-5xl mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por título, descrição ou empresa"
                className="bg-white/30 text-white placeholder:text-white/70 border-white/20 pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
            </div>
            <Badge className="bg-amber-400/20 text-amber-100 border-amber-400/30 shadow-md">
              {filtered.length} {filtered.length === 1 ? "vantagem" : "vantagens"}
            </Badge>
          </div>
        </div>

        {/* State handling */}
        {loading && (
          <div className="text-amber-200/90 animate-pulse text-lg font-semibold">Carregando vantagens...</div>
        )}
        {error && !loading && (
          <div className="text-red-200 bg-red-500/20 border border-red-400/30 rounded-lg px-4 py-3 font-semibold shadow-lg">
            {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-white/80 font-semibold">Nenhuma vantagem encontrada.</div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-6 w-full max-w-6xl md:grid-cols-2 lg:grid-cols-3 animate-scale-in">
            {filtered.map((v) => {
              const custo = v.custoEmMoedas ?? v.custoMoedas ?? 0;
              return (
                <div
                  key={v.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Image/Header */}
                  <div className="h-40 w-full overflow-hidden bg-gradient-to-br from-amber-400/25 to-amber-200/10 flex items-center justify-center relative">
                    {v.foto && v.foto.trim() !== "" ? (
                      <img
                        src={v.foto}
                        alt={v.titulo}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <Gift className="h-10 w-10 text-amber-300" />
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition-opacity" />
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-white text-xl font-semibold mb-1 truncate" title={v.titulo}>
                      {v.titulo}
                    </h3>
                    {v.empresaNome && (
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                        <Building2 className="h-4 w-4" />
                        <span>{v.empresaNome}</span>
                      </div>
                    )}
                    {v.descricao && (
                      <p className="text-white/80 text-sm line-clamp-3 mb-4">{v.descricao}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-amber-200">
                        <Coins className="h-5 w-5" />
                        <span className="font-medium">{custo}</span>
                        <span className="text-amber-200/80">moedas</span>
                      </div>

                      {/* placeholder action (resgate no futuro) */}
                      <span className="text-xs text-white/70 bg-white/10 border border-white/10 rounded-md px-2 py-1">
                        Disponível
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vantagens;
