import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import HomeAccess from "./pages/HomeAccess";
import CadastroUsuario from "./pages/CadastroUsuario";
import NotFound from "./pages/NotFound";
import CadastroAluno from "./pages/CadastroAluno";
import ListaUsuarios from "./pages/ListaUsuarios";
import EditarUsuario from "./pages/EditarUsuario";
import ListaEmpresas from "./pages/ListaEmpresas";
import EditarEmpresa from "./pages/EditarEmpresa";
import Transactions from "./pages/Transactions";
import CadastroVantagem from "./pages/CadastroVantagem";
import HistoricoTransacoes from "./pages/HistoricoTransacoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeAccess />} />
            
            {/* Rotas do Admin */}
            <Route
              path="/cadastro-empresa"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cadastro-usuario"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CadastroUsuario />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lista-usuarios"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ListaUsuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editar-usuario/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditarUsuario />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lista-empresas"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ListaEmpresas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editar-empresa/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditarEmpresa />
                </ProtectedRoute>
              }
            />

            {/* Rotas do Professor */}
            <Route
              path="/cadastro-aluno"
              element={
                <ProtectedRoute allowedRoles={["professor"]}>
                  <CadastroAluno />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute allowedRoles={["professor"]}>
                  <Transactions />
                </ProtectedRoute>
              }
            />

            {/* Rotas da Empresa */}
            <Route
              path="/cadastro-vantagem"
              element={
                <ProtectedRoute allowedRoles={["empresa"]}>
                  <CadastroVantagem />
                </ProtectedRoute>
              }
            />

            {/* Rotas do Aluno */}
            <Route
              path="/historico-transacoes"
              element={
                <ProtectedRoute allowedRoles={["aluno"]}>
                  <HistoricoTransacoes />
                </ProtectedRoute>
              }
            />

            {/* CATCH-ALL ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
