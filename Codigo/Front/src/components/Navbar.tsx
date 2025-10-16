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
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Início",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Cadastrar Usuário",
    href: "/cadastro-usuario",
    icon: <UserPlus className="h-4 w-4" />,
  },
  {
    title: "Cadastrar Aluno",
    href: "/cadastro-aluno",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    title: "Gerenciar Usuários",
    href: "/lista-usuarios",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Gerenciar Empresas",
    href: "/lista-empresas",
    icon: <Building2 className="h-4 w-4" />,
  },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
          >
            <Coins className="h-8 w-8 text-secondary" />
            <span className="font-bold text-xl hidden md:inline">
              Sistema de Moeda Estudantil
            </span>
            <span className="font-bold text-xl md:hidden">SME</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  className={`text-white hover:text-secondary hover:bg-white/10 transition-all ${
                    isActive(item.href)
                      ? "bg-white/20 text-secondary"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-secondary hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gray-900/95 border-white/20 backdrop-blur-xl"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Coins className="h-6 w-6 text-secondary" />
                  Menu de Navegação
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-white hover:text-secondary hover:bg-white/10 transition-all ${
                        isActive(item.href)
                          ? "bg-white/20 text-secondary"
                          : ""
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
