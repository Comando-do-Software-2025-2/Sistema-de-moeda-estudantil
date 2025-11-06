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
  Gift,
  Menu,
  LogOut,
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
  {
    title: "Cadastrar Vantagem",
    href: "/cadastro-vantagem",
    icon: <Gift className="h-5 w-5" />,
    color: "bg-pink-300/90",
  },
];

export function NavbarEmpresa() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
                <span className="hidden md:inline">Empresa Parceira</span>
                <span className="md:hidden">EMP</span>
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
                    Empresa Parceira
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
