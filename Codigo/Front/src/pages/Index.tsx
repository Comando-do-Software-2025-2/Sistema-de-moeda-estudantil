import { EmpresaParceiraForm } from "@/components/EmpresaParceiraForm";
import { Navbar } from "@/components/Navbar";
import { Coins, Sparkles } from "lucide-react";

const Index = () => {
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
          <source
            src="/fundo.mp4 "
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coins className="h-12 w-12 text-secondary animate-scale-in" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              Sistema de Moeda Estudantil
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-secondary-glow" />
            <p className="text-xl md:text-2xl text-white/95 font-light drop-shadow-md">
              Cadastro de Empresas Parceiras
            </p>
          </div>
          <p className="text-base text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Seja uma empresa parceira e ofereça vantagens exclusivas aos estudantes que acumulam moedas por seu desempenho acadêmico
          </p>
        </div>

        {/* Form Card - Glass Effect */}
        <div className="w-full max-w-2xl animate-scale-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Complete seu cadastro
              </h2>
              <p className="text-white/80">
                Preencha os dados da sua empresa para começar a oferecer vantagens aos estudantes
              </p>
            </div>
            
            <EmpresaParceiraForm />
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-white/70 text-center">
                Ao se cadastrar, você concorda com nossos termos de uso e política de privacidade
              </p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 animate-fade-in">
          {[
            {
              title: "Visibilidade",
              description: "Sua empresa será vista por milhares de estudantes engajados",
            },
            {
              title: "Impacto Social",
              description: "Contribua para a educação e reconheça o mérito estudantil",
            },
            {
              title: "Marketing",
              description: "Fortaleça sua marca junto ao público universitário",
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

export default Index;
