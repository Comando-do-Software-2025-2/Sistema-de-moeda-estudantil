import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Menu,
  LogOut,
  Coins,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
];

export function NavbarAluno() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Saldo simulado - futuramente virá da API
  const balance = 150;

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
              <div className="font-extrabold text-white text-lg flex-shrink-0">
                <span className="hidden md:inline">Área do Aluno</span>
                <span className="md:hidden">ALUNO</span>
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
                  </Button>
                </Link>
              ))}

              {/* Saldo de moedas */}
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full ml-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-amber-400/90">
                    <Coins className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-white font-bold">
                    {balance} <span className="text-xs font-medium text-white/80">Moedas</span>
                  </div>
                </div>
                <Sparkles className="h-4 w-4 text-amber-200" />
              </div>
              
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/95 hover:bg-red-500/20 hover:text-white transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-semibold">Sair</span>
              </Button>
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
                    Área do Aluno
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
                          isActive(item.href) ? "bg-white/20 text-secondary" : ""
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
                  <div className="flex items-center justify-between text-white mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-amber-400">
                        <Coins className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold">{balance} Moedas</div>
                        <div className="text-xs text-white/80">Seu saldo atual</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-red-500/20 transition-all rounded-lg"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="font-semibold">Sair</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
