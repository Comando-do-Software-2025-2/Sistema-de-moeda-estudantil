import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("admin@puc.br");
  const [senha, setSenha] = useState("123456");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login({ email, senha });

    if (result) {
      toast({
        title: "Login realizado com sucesso! 🎉",
        description: `Bem-vindo, ${result.nome}!`,
      });

      // Redireciona baseado no tipo de usuário
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha inválidos",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md p-8 shadow-2xl bg-white/95 backdrop-blur-sm border-amber-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Sistema de Moedas</h1>
          </div>
          <p className="text-gray-600">Faça login para continuar</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Demo:</strong> Use as credenciais pré-preenchidas para testar
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
