import { DynamicNavbar } from "@/components/DynamicNavbar";
import { SendCoins } from "@/components/SendCoins";
import { TransactionHistory } from "@/components/TransactionHistory";
import { Coins, PiggyBank, Sparkles, TrendingUp, History } from "lucide-react";

export default function Transactions() {
  const infoCards = [
    {
      title: "Saldo Disponível",
      description: "Suas moedas disponíveis para envio",
      icon: <Coins className="h-6 w-6" />,
      gradient: "from-amber-400/25 to-amber-200/10",
    },
    {
      title: "Envios Realizados",
      description: "Total de transações concluídas",
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: "from-green-400/25 to-green-200/10",
    },
    {
      title: "Histórico Completo",
      description: "Acompanhe todas as movimentações",
      icon: <History className="h-6 w-6" />,
      gradient: "from-blue-400/25 to-blue-200/10",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DynamicNavbar />
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/fundo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PiggyBank className="h-12 w-12 text-secondary animate-scale-in" />
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                Gerenciamento de Moedas
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-secondary-glow" />
              <p className="text-xl md:text-2xl text-white/95 font-light drop-shadow-md">
                Transações e Histórico
              </p>
            </div>
            <p className="text-base text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Envie moedas para alunos e acompanhe seu histórico de transações em tempo real
            </p>
          </header>

          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 animate-scale-in">
            {/* Formulário de envio */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-2 mb-6">
                <Coins className="h-6 w-6 text-amber-400" />
                <h2 className="text-2xl font-semibold text-white">Enviar Moedas</h2>
              </div>
              <SendCoins />
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                  <Coins className="h-4 w-4" />
                  <p className="text-center">
                    As moedas serão creditadas imediatamente ao aluno
                  </p>
                </div>
              </div>
            </div>

            {/* Histórico de transações */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
              <TransactionHistory />
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {infoCards.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl p-6 border border-white/10 transform transition-all duration-350 will-change-transform
                  bg-gradient-to-br ${item.gradient} backdrop-blur-sm hover:shadow-2xl hover:-translate-y-3 hover:scale-105`}
                style={{ animationDelay: `${index * 100}ms`, animationName: "fadeUp", animationDuration: "420ms", animationFillMode: "both" }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 ring-1 ring-white/6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <div className="text-white">{item.icon}</div>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* playful accent shape */}
                <div className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/4 blur-sm opacity-30 transform rotate-45 group-hover:opacity-40 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}