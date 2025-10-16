
import { AlunoForm } from "@/components/AlunoForm";
import { Navbar } from "@/components/Navbar";
import { GraduationCap, Sparkles, Coins, Gift, BarChart2, Star } from "lucide-react";

const CadastroAluno = () => {
  const infoCards = [
    {
      title: "Ganhe Moedas",
      description:
        "Acumule moedas através de bom desempenho, participação e reconhecimento dos professores",
      icon: <Coins className="h-6 w-6" />,
      gradient: "from-amber-400/25 to-amber-200/10",
    },
    {
      title: "Troque por Vantagens",
      description:
        "Use suas moedas para resgatar benefícios exclusivos nas empresas parceiras",
      icon: <Gift className="h-6 w-6" />,
      gradient: "from-pink-400/25 to-violet-300/8",
    },
    {
      title: "Acompanhe seu Saldo",
      description:
        "Veja em tempo real quantas moedas você possui e seu histórico de transações",
      icon: <BarChart2 className="h-6 w-6" />,
      gradient: "from-sky-400/20 to-emerald-200/8",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/fundo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-12 w-12 text-secondary animate-scale-in" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              Sistema de Moeda Estudantil
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-secondary-glow" />
            <p className="text-xl md:text-2xl text-white/95 font-light drop-shadow-md">Cadastro de Aluno</p>
          </div>
          <p className="text-base text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Complete seu cadastro de aluno e comece a acumular moedas pelo seu desempenho acadêmico
          </p>
        </div>

        {/* Form Card - Glass Effect */}
        <div className="w-full max-w-2xl animate-scale-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Dados Acadêmicos</h2>
              <p className="text-white/80">Preencha suas informações acadêmicas para completar o cadastro</p>
            </div>

            <AlunoForm />

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                <Coins className="h-4 w-4" />
                <p className="text-center">
                  Suas moedas serão acumuladas conforme seu desempenho e participação nas atividades
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 w-full">
          {infoCards.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl p-6 border border-white/10 transform transition-all duration-350 will-change-transform
                bg-gradient-to-br ${item.gradient} backdrop-blur-sm hover:shadow-2xl hover:-translate-y-3 hover:scale-105`}
              style={{ animationDelay: `${index * 100}ms`, animationName: "fadeUp", animationDuration: "420ms", animationFillMode: "both" }}
              aria-hidden={false}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 ring-1 ring-white/6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <div className="text-white">{item.icon}</div>
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                    {item.title}
                    <span className="inline-flex items-center justify-center text-xs px-2 py-0.5 bg-white/6 rounded-full text-white/90">Novo</span>
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>

                  <div className="mt-4 flex items-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="px-3 py-1 rounded-lg bg-white/6 text-white text-sm hover:bg-white/10 transition">
                      Saiba mais
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-amber-400/10 text-amber-300 text-sm hover:bg-amber-400/20 transition">
                      Resgatar
                    </button>
                  </div>
                </div>
              </div>

              {/* playful accent shape */}
              <div className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/4 blur-sm opacity-30 transform rotate-45 group-hover:opacity-40 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CadastroAluno;
