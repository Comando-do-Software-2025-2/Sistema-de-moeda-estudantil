// ...existing code...
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  Users,
  Building2,
  GraduationCap,
  Menu,
  Coins,
  UserPlus,
  Sparkles,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  color?: string;
}

const navItems: NavItem[] = [
  {
    title: "Início",
    href: "/",
    icon: <Home className="h-5 w-5" />,
    color: "bg-yellow-300/90",
  },
  {
    title: "Cadastrar Usuário",
    href: "/cadastro-usuario",
    icon: <UserPlus className="h-5 w-5" />,
    color: "bg-pink-300/90",
  },
  {
    title: "Cadastrar Aluno",
    href: "/cadastro-aluno",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "bg-violet-300/90",
  },
  {
    title: "Gerenciar Usuários",
    href: "/lista-usuarios",
    icon: <Users className="h-5 w-5" />,
    color: "bg-green-300/90",
  },
  {
    title: "Gerenciar Empresas",
    href: "/lista-empresas",
    icon: <Building2 className="h-5 w-5" />,
    color: "bg-sky-300/90",
  },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Simples exemplo de saldo (substituir pela fonte real)
  const balance = 42;

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="backdrop-blur-lg bg-gradient-to-r from-amber-50/20 via-emerald-50/10 to-sky-50/10 border border-white/10 rounded-2xl shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-16 py-2">
            {/* Logo */}
<Link
  to="/"
  className="flex items-center gap-3 select-none no-underline min-w-0"
  aria-label="Sistema de Moeda Estudantil - Início"
>
  <div className="flex items-center justify-center rounded-full p-2 bg-gradient-to-br from-amber-400 to-yellow-300 shadow-lg flex-shrink-0">
    <Coins className="h-7 w-7 text-white drop-shadow-sm" />
  </div>

  <div className="hidden md:flex flex-col leading-tight">
    <span className="font-extrabold text-white">
      Moeda Estudantil
    </span>
  </div>

  <div className="md:hidden font-extrabold text-white text-lg flex-shrink-0">
    SME
  </div>
</Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all transform hover:-translate-y-0.5
                      ${isActive(item.href)
                        ? "bg-amber-300/20 ring-amber-300/20 text-slate-900 shadow-sm"
                        : "text-white/95 hover:bg-amber-500/10 hover:text-white hover:shadow-sm active:bg-amber-500/15"
                    }`}
                  >
                    <span
                      className={`p-1 rounded-md ${item.color} inline-flex items-center justify-center`}
                    >
                      {item.icon}
                    </span>
                    <span className="ml-2 font-semibold text-white/95">
                      {item.title}
                    </span>
                    {isActive(item.href) && (
                      <span className="ml-2 text-xs bg-amber-200/30 text-slate-800 px-2 py-0.5 rounded-full">
                        Ativo
                      </span>
                    )}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Right: balance + menu */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-yellow-300/90">
                    <Coins className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-white font-bold">
                    {balance} <span className="text-xs font-medium text-white/80">Moedas</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center text-sm text-white/80">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-200" />
                  Conquistas
                </div>
              </div>

              {/* Mobile Menu */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-secondary hover:bg-white/10"
                    aria-label="Abrir menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="bg-gradient-to-b from-slate-900/95 to-slate-800/95 border-white/20 backdrop-blur-xl rounded-l-2xl p-6"
                >
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 rounded-md bg-amber-300">
                        <Coins className="h-5 w-5 text-white" />
                      </div>
                      Menu divertido
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-4 mt-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-white hover:text-secondary hover:bg-white/10 transition-all rounded-lg ${
                            isActive(item.href)
                              ? "bg-white/20 text-secondary"
                              : ""
                          }`}
                        >
                          <span className={`p-2 rounded-md mr-3 ${item.color}`}>
                            {item.icon}
                          </span>
                          <span className="font-semibold">{item.title}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-yellow-300">
                          <Coins className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-bold">{balance} Moedas</div>
                          <div className="text-xs text-white/80">Ganhe ao ajudar!</div>
                        </div>
                      </div>
                      <Link to="/perfil" onClick={() => setOpen(false)}>
                        <Button variant="ghost" className="text-white/90">Perfil</Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
// ...existing code...