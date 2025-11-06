import { useAuth } from "@/contexts/AuthContext";
import { NavbarAdmin } from "./NavbarAdmin";
import { NavbarProfessor } from "./NavbarProfessor";
import { NavbarEmpresa } from "./NavbarEmpresa";
import { NavbarAluno } from "./NavbarAluno";

export function DynamicNavbar() {
  const { userRole } = useAuth();

  if (!userRole) {
    return null;
  }

  switch (userRole) {
    case "admin":
      return <NavbarAdmin />;
    case "professor":
      return <NavbarProfessor />;
    case "empresa":
      return <NavbarEmpresa />;
    case "aluno":
      return <NavbarAluno />;
    default:
      return null;
  }
}
