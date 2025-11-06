import { useNavigate } from "react-router-dom";
import { GraduationCap, Sparkles, Shield, UserCircle, Building2, BookOpen } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const HomeAccess = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleAccessClick = (role: UserRole, route: string) => {
    setUserRole(role);
    navigate(route);
  };

  const accessOptions = [
    {
      title: "Administrador",
      description: "Gerencie o sistema e todos os usuários",
      icon: <Shield className="h-8 w-8" />,
      gradient: "from-blue-400/25 to-blue-200/10",
      route: "/lista-usuarios",
      role: "admin" as UserRole,
      color: "blue",
    },
    {
      title: "Aluno",
      description: "Acesse seu perfil e saldo de moedas",
      icon: <UserCircle className="h-8 w-8" />,
      gradient: "from-green-400/25 to-green-200/10",
      route: "/vantagens",
      role: "aluno" as UserRole,
      color: "green",
    },
    {
      title: "Empresa",
      description: "Gerencie vantagens e parceria",
      icon: <Building2 className="h-8 w-8" />,
      gradient: "from-amber-400/25 to-amber-200/10",
      route: "/cadastro-vantagem",
      role: "empresa" as UserRole,
      color: "amber",
    },
    {
      title: "Professor",
      description: "Envie moedas e acompanhe alunos",
      icon: <BookOpen className="h-8 w-8" />,
      gradient: "from-purple-400/25 to-purple-200/10",
      route: "/cadastro-aluno",
      role: "professor" as UserRole,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
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
            <p className="text-xl md:text-2xl text-white/95 font-light drop-shadow-md">Selecione o tipo de acesso</p>
          </div>
          <p className="text-base text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Escolha seu perfil para acessar o sistema com as funcionalidades específicas
          </p>
        </div>

        {/* Access Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full animate-scale-in">
          {accessOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAccessClick(option.role, option.route)}
              className={`group relative overflow-hidden rounded-2xl p-8 border border-white/20 transform transition-all duration-350 will-change-transform
                bg-gradient-to-br ${option.gradient} backdrop-blur-md hover:shadow-2xl hover:-translate-y-3 hover:scale-105 text-left`}
              style={{ animationDelay: `${index * 100}ms`, animationName: "fadeUp", animationDuration: "420ms", animationFillMode: "both" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/10 ring-1 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <div className="text-white">{option.icon}</div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {option.title}
                  </h2>
                  <p className="text-sm text-white/80 leading-relaxed">{option.description}</p>

                  <div className="mt-4 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white/90 text-sm font-medium">Acessar →</span>
                  </div>
                </div>
              </div>

              {/* playful accent shape */}
              <div className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/4 blur-sm opacity-30 transform rotate-45 group-hover:opacity-40 transition-all duration-500" />
            </button>
          ))}
        </div>

        {/* Info Text */}
        <div className="mt-12 text-center animate-fade-in-up">
          <p className="text-white/70 text-sm">
            Não possui uma conta? Entre em contato com a administração da instituição
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeAccess;
