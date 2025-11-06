import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DynamicNavbar } from "@/components/DynamicNavbar";
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
import { Search, Edit, Trash2, Users, UserPlus } from "lucide-react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: string;
}const ListaUsuarios = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);

  // Buscar todos os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:8080/usuarios");
        if (!response.ok) {
          throw new Error("Falha ao buscar usuários");
        }
        const data: Usuario[] = await response.json();
        setUsuarios(data);
        setUsuariosFiltrados(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast({
          title: "Erro ao carregar usuários",
          description: "Não foi possível carregar a lista de usuários. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrar usuários baseado na pesquisa
  useEffect(() => {
    const filtrados = usuarios.filter(
      (usuario) =>
        usuario.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        usuario.email.toLowerCase().includes(pesquisa.toLowerCase()) ||
        usuario.tipoUsuario.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setUsuariosFiltrados(filtrados);
  }, [pesquisa, usuarios]);

  const handleEditar = (id: number) => {
    navigate(`/editar-usuario/${id}`);
  };

  const handleExcluir = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text().catch(() => null);
        throw new Error(text || "Falha ao excluir usuário");
      }

      // Atualiza estado local removendo o usuário excluído
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
      setUsuariosFiltrados((prev) => prev.filter((usuario) => usuario.id !== id));

      toast({
        title: "Usuário excluído!",
        description: "O usuário foi removido permanentemente do sistema.",
      });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        title: "Erro ao excluir usuário",
        description: (error as Error)?.message?.includes("CORS")
          ? "Erro de CORS ao conectar com o backend. Verifique se o servidor permite conexões desta origem."
          : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const getTipoUsuarioColor = (tipo: string) => {
    const colors: Record<string, string> = {
      Aluno: "bg-blue-500/20 text-blue-300 border-blue-500/50",
      Professor: "bg-green-500/20 text-green-300 border-green-500/50",
      Empresa: "bg-purple-500/20 text-purple-300 border-purple-500/50",
      Administrador: "bg-orange-500/20 text-orange-300 border-orange-500/50",
    };
    return colors[tipo] || "bg-gray-500/20 text-gray-300 border-gray-500/50";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DynamicNavbar />
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
            <Users className="h-12 w-12 text-secondary animate-scale-in" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              Gerenciar Usuários
            </h1>
          </div>
          <p className="text-xl text-white/95 font-light drop-shadow-md">
            Visualize, edite e gerencie todos os usuários do sistema
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
                  placeholder="Pesquisar por nome, email ou tipo..."
                  className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/40 text-white placeholder:text-white/70"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>
              <Button
                onClick={() => navigate("/cadastro-usuario")}
                className="h-12 bg-white/90 hover:bg-white text-black font-semibold"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Novo Usuário
              </Button>
            </div>

            {/* Contador de Resultados */}
            <div className="mb-4">
              <p className="text-white/80 text-sm">
                {usuariosFiltrados.length} usuário(s) encontrado(s)
                {pesquisa && ` para "${pesquisa}"`}
              </p>
            </div>

            {/* Tabela */}
            <div className="rounded-xl overflow-hidden border border-white/20">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/5 hover:bg-white/10 border-white/20">
                    <TableHead className="text-white font-semibold">ID</TableHead>
                    <TableHead className="text-white font-semibold">Nome</TableHead>
                    <TableHead className="text-white font-semibold">Email</TableHead>
                    <TableHead className="text-white font-semibold">Tipo</TableHead>
                    <TableHead className="text-white font-semibold text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosFiltrados.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-white/70 py-8"
                      >
                        Nenhum usuário encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    usuariosFiltrados.map((usuario) => (
                      <TableRow
                        key={usuario.id}
                        className="bg-white/5 hover:bg-white/10 border-white/10 transition-colors"
                      >
                        <TableCell className="text-white font-medium">
                          {usuario.id}
                        </TableCell>
                        <TableCell className="text-white">{usuario.nome}</TableCell>
                        <TableCell className="text-white/90">{usuario.email}</TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getTipoUsuarioColor(
                              usuario.tipoUsuario
                            )}`}
                          >
                            {usuario.tipoUsuario}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/50"
                              onClick={() => handleEditar(usuario.id)}
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
                                    Tem certeza que deseja excluir o usuário{" "}
                                    <strong>{usuario.nome}</strong>? Esta ação não pode
                                    ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleExcluir(usuario.id)}
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

export default ListaUsuarios;
