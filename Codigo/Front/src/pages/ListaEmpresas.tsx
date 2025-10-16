import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Edit, Trash2, Building2, Plus } from "lucide-react";

interface Empresa {
  id: number;
  nomeEmpresa: string;
  cnpj: string;
  descricao: string;
}

const ListaEmpresas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [empresasFiltradas, setEmpresasFiltradas] = useState<Empresa[]>([]);

  // Simulando dados - substitua pela chamada real à API
  useEffect(() => {
    const empresasSimuladas: Empresa[] = [
      {
        id: 1,
        nomeEmpresa: "Restaurante Universitário",
        cnpj: "12.345.678/0001-90",
        descricao: "Restaurante com diversos pratos e opções de alimentação saudável para estudantes."
      },
      {
        id: 2,
        nomeEmpresa: "Livraria Campus",
        cnpj: "23.456.789/0001-80",
        descricao: "Livraria especializada em livros acadêmicos e materiais escolares."
      },
      {
        id: 3,
        nomeEmpresa: "Academia Fit Student",
        cnpj: "34.567.890/0001-70",
        descricao: "Academia com planos especiais para estudantes universitários."
      },
      {
        id: 4,
        nomeEmpresa: "Café & Cia",
        cnpj: "45.678.901/0001-60",
        descricao: "Cafeteria com ambiente acolhedor e wi-fi gratuito."
      },
      {
        id: 5,
        nomeEmpresa: "Tech Store",
        cnpj: "56.789.012/0001-50",
        descricao: "Loja de tecnologia com descontos especiais para estudantes."
      },
    ];
    setEmpresas(empresasSimuladas);
    setEmpresasFiltradas(empresasSimuladas);
  }, []);

  // Filtrar empresas baseado na pesquisa
  useEffect(() => {
    const filtradas = empresas.filter(
      (empresa) =>
        empresa.nomeEmpresa.toLowerCase().includes(pesquisa.toLowerCase()) ||
        empresa.cnpj.replace(/[^\d]/g, "").includes(pesquisa.replace(/[^\d]/g, "")) ||
        empresa.descricao.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setEmpresasFiltradas(filtradas);
  }, [pesquisa, empresas]);

  const handleEditar = (id: number) => {
    navigate(`/editar-empresa/${id}`);
  };

  const handleExcluir = async (id: number) => {
    try {
      // Aqui você faria a chamada à API para excluir a empresa
      // await api.delete(`/empresas/${id}`);
      
      // Simulando a exclusão
      setEmpresas(empresas.filter((empresa) => empresa.id !== id));
      
      toast({
        title: "Empresa excluída!",
        description: "A empresa foi removida permanentemente do sistema.",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir empresa",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const formatarCNPJ = (cnpj: string): string => {
    const numeros = cnpj.replace(/[^\d]/g, "");
    return numeros
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const truncarTexto = (texto: string, limite: number = 60): string => {
    return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
  };

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
      <div className="relative z-10 px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-12 w-12 text-secondary animate-scale-in" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              Gerenciar Empresas
            </h1>
          </div>
          <p className="text-xl text-white/95 font-light drop-shadow-md">
            Visualize, edite e gerencie todas as empresas parceiras do sistema
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto animate-scale-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Barra de Pesquisa e Botão Novo */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Pesquisar por nome, CNPJ ou descrição..."
                  className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>
              <Button
                onClick={() => navigate("/cadastro-empresa")}
                className="h-12 bg-white/90 hover:bg-white text-black font-semibold"
              >
                <Plus className="mr-2 h-5 w-5" />
                Nova Empresa
              </Button>
            </div>

            {/* Contador de Resultados */}
            <div className="mb-4">
              <p className="text-white/80 text-sm">
                {empresasFiltradas.length} empresa(s) encontrada(s)
                {pesquisa && ` para "${pesquisa}"`}
              </p>
            </div>

            {/* Tabela */}
            <div className="rounded-xl overflow-hidden border border-white/20">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/5 hover:bg-white/10 border-white/20">
                    <TableHead className="text-white font-semibold">ID</TableHead>
                    <TableHead className="text-white font-semibold">Nome da Empresa</TableHead>
                    <TableHead className="text-white font-semibold">CNPJ</TableHead>
                    <TableHead className="text-white font-semibold">Descrição</TableHead>
                    <TableHead className="text-white font-semibold text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {empresasFiltradas.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-white/70 py-8"
                      >
                        Nenhuma empresa encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    empresasFiltradas.map((empresa) => (
                      <TableRow
                        key={empresa.id}
                        className="bg-white/5 hover:bg-white/10 border-white/10 transition-colors"
                      >
                        <TableCell className="text-white font-medium">
                          {empresa.id}
                        </TableCell>
                        <TableCell className="text-white font-semibold">
                          {empresa.nomeEmpresa}
                        </TableCell>
                        <TableCell className="text-white/90 font-mono text-sm">
                          {formatarCNPJ(empresa.cnpj)}
                        </TableCell>
                        <TableCell className="text-white/80 text-sm max-w-md">
                          <span title={empresa.descricao}>
                            {truncarTexto(empresa.descricao)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/50"
                              onClick={() => handleEditar(empresa.id)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/50"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Excluir
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-gray-900/95 border-white/20">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-white">
                                    Confirmar Exclusão
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-white/80">
                                    Tem certeza que deseja excluir a empresa{" "}
                                    <strong>{empresa.nomeEmpresa}</strong>? Esta ação não
                                    pode ser desfeita e removerá todos os dados associados.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleExcluir(empresa.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaEmpresas;
