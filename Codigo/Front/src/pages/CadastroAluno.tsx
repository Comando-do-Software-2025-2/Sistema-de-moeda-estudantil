import { AlunoForm } from "@/components/AlunoForm";
import { GraduationCap, Sparkles, Coins } from "lucide-react";

const CadastroAluno = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/fundo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
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
            <p className="text-xl md:text-2xl text-white/95 font-light drop-shadow-md">
              Cadastro de Aluno
            </p>
          </div>
          <p className="text-base text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Complete seu cadastro de aluno e comece a acumular moedas pelo seu desempenho acadêmico
          </p>
        </div>

        {/* Form Card - Glass Effect */}
        <div className="w-full max-w-2xl animate-scale-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Dados Acadêmicos
              </h2>
              <p className="text-white/80">
                Preencha suas informações acadêmicas para completar o cadastro
              </p>
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
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 animate-fade-in">
          {[
            {
              title: "Ganhe Moedas",
              description: "Acumule moedas através de bom desempenho, participação e reconhecimento dos professores",
            },
            {
              title: "Troque por Vantagens",
              description: "Use suas moedas para resgatar benefícios exclusivos nas empresas parceiras",
            },
            {
              title: "Acompanhe seu Saldo",
              description: "Veja em tempo real quantas moedas você possui e seu histórico de transações",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CadastroAluno;
