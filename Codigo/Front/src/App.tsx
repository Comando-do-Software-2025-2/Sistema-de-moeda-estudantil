import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CadastroUsuario from "./pages/CadastroUsuario";
import NotFound from "./pages/NotFound";
import CadastroAluno from "./pages/CadastroAluno";
import ListaUsuarios from "./pages/ListaUsuarios";
import EditarUsuario from "./pages/EditarUsuario";
import ListaEmpresas from "./pages/ListaEmpresas";
import EditarEmpresa from "./pages/EditarEmpresa";
import Transactions from "./pages/Transactions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path="/cadastro-aluno" element={<CadastroAluno />} />
          <Route path="/lista-usuarios" element={<ListaUsuarios />} />
          <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
          <Route path="/lista-empresas" element={<ListaEmpresas />} />
          <Route path="/editar-empresa/:id" element={<EditarEmpresa />} />
                <Route path="/transactions" element={<Transactions />} />

          {/* CATCH-ALL ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
