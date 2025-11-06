import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "professor" | "empresa" | "aluno" | null;

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    // Recupera do localStorage se existir
    const saved = localStorage.getItem("userRole");
    return (saved as UserRole) || null;
  });

  const handleSetUserRole = (role: UserRole) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ userRole, setUserRole: handleSetUserRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
