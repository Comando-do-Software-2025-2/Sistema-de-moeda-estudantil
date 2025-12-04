import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { apiClient } from "@/services/apiClient";

const TesteEmail = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Estado para distribuir moedas
  const [distribuir, setDistribuir] = useState({
    alunoEmail: "kaiomayer2005@gmail.com",
    alunoNome: "João Silva",
    professorNome: "Prof. Maria",
    professorEmail: "kaiomayer2005@gmail.com",
    valor: 100,
    motivo: "Participação em aula",
  });

  // Estado para resgatar vantagem
  const [resgatar, setResgatar] = useState({
    alunoEmail: "kaiomayer2005@gmail.com",
    alunoNome: "João Silva",
    empresaNome: "Empresa Parceira XYZ",
    empresaEmail: "kaiomayer2005@gmail.com",
    vantagemTitulo: "Desconto de 20%",
    codigoCupom: `VAN${Date.now()}`,
    custoMoedas: 50,
  });

  // Enviar email de distribuição
  const handleDistribuirMoedas = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post("/api/emails/distribuir-moedas", distribuir);
      toast({
        title: "✅ Email enviado com sucesso!",
        description: `Emails enviados para ${distribuir.alunoEmail} e ${distribuir.professorEmail}`,
      });
      console.log("Resposta:", response);
    } catch (error) {
      toast({
        title: "❌ Erro ao enviar email",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  // Enviar email de resgate
  const handleResgatar = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post("/api/emails/resgatar-vantagem", resgatar);
      toast({
        title: "✅ Email de resgate enviado!",
        description: `Emails enviados para ${resgatar.alunoEmail} e ${resgatar.empresaEmail}`,
      });
      console.log("Resposta:", response);
    } catch (error) {
      toast({
        title: "❌ Erro ao enviar email",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="h-8 w-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-gray-900">Teste de Envio de Emails</h1>
          </div>
          <p className="text-lg text-gray-600">Teste os endpoints de email do sistema</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Distribuir Moedas */}
          <Card className="p-6 shadow-lg border-amber-200">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Distribuir Moedas</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email do Aluno
                </label>
                <Input
                  type="email"
                  value={distribuir.alunoEmail}
                  onChange={(e) =>
                    setDistribuir({ ...distribuir, alunoEmail: e.target.value })
                  }
                  placeholder="kaiomayer2005@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Aluno
                </label>
                <Input
                  value={distribuir.alunoNome}
                  onChange={(e) =>
                    setDistribuir({ ...distribuir, alunoNome: e.target.value })
                  }
                  placeholder="João Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email do Professor
                </label>
                <Input
                  type="email"
                  value={distribuir.professorEmail}
                  onChange={(e) =>
                    setDistribuir({ ...distribuir, professorEmail: e.target.value })
                  }
                  placeholder="kaiomayer2005@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Professor
                </label>
                <Input
                  value={distribuir.professorNome}
                  onChange={(e) =>
                    setDistribuir({ ...distribuir, professorNome: e.target.value })
                  }
                  placeholder="Prof. Maria"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor (moedas)
                </label>
                <Input
                  type="number"
                  value={distribuir.valor}
                  onChange={(e) =>
                    setDistribuir({
                      ...distribuir,
                      valor: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo
                </label>
                <Input
                  value={distribuir.motivo}
                  onChange={(e) =>
                    setDistribuir({ ...distribuir, motivo: e.target.value })
                  }
                  placeholder="Participação em aula"
                />
              </div>
            </div>

            <Button
              onClick={handleDistribuirMoedas}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? "Enviando..." : "Enviar Email"}
            </Button>
          </Card>

          {/* Card 2: Resgatar Vantagem */}
          <Card className="p-6 shadow-lg border-orange-200">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Resgatar Vantagem</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email do Aluno
                </label>
                <Input
                  type="email"
                  value={resgatar.alunoEmail}
                  onChange={(e) =>
                    setResgatar({ ...resgatar, alunoEmail: e.target.value })
                  }
                  placeholder="kaiomayer2005@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Aluno
                </label>
                <Input
                  value={resgatar.alunoNome}
                  onChange={(e) =>
                    setResgatar({ ...resgatar, alunoNome: e.target.value })
                  }
                  placeholder="João Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email da Empresa
                </label>
                <Input
                  type="email"
                  value={resgatar.empresaEmail}
                  onChange={(e) =>
                    setResgatar({ ...resgatar, empresaEmail: e.target.value })
                  }
                  placeholder="kaiomayer2005@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Empresa
                </label>
                <Input
                  value={resgatar.empresaNome}
                  onChange={(e) =>
                    setResgatar({ ...resgatar, empresaNome: e.target.value })
                  }
                  placeholder="Empresa Parceira XYZ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título da Vantagem
                </label>
                <Input
                  value={resgatar.vantagemTitulo}
                  onChange={(e) =>
                    setResgatar({ ...resgatar, vantagemTitulo: e.target.value })
                  }
                  placeholder="Desconto de 20%"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código do Cupom
                </label>
                <Input
                  value={resgatar.codigoCupom}
                  onChange={(e) =>
                    setResgatar({ ...resgatar, codigoCupom: e.target.value })
                  }
                  placeholder="VAN1732741200000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custo (moedas)
                </label>
                <Input
                  type="number"
                  value={resgatar.custoMoedas}
                  onChange={(e) =>
                    setResgatar({
                      ...resgatar,
                      custoMoedas: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="50"
                />
              </div>
            </div>

            <Button
              onClick={handleResgatar}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? "Enviando..." : "Enviar Email"}
            </Button>
          </Card>
        </div>

        {/* Info Box */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">ℹ️ Informações</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✉️ Os emails serão enviados via Gmail (SMTP configurado)</li>
            <li>📧 Verifique a caixa de entrada e spam do destinatário</li>
            <li>⏱️ Aguarde alguns segundos para os emails chegarem</li>
            <li>📝 Os templates são renderizados com Thymeleaf no backend</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default TesteEmail;
