import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, phone: string, password: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "rentify_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (email: string, _password: string) => {
    // Mock login - in real app this would call an API
    const mockUser: UserProfile = {
      name: "John Doe",
      email: email,
      phone: "+91 98765 43210",
      address: "123 Main Street, Mumbai, Maharashtra 400001",
      balance: 2500,
    };
    setUser(mockUser);
    setIsLoggedIn(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
  };

  const signup = (name: string, email: string, phone: string, _password: string) => {
    const newUser: UserProfile = {
      name,
      email,
      phone,
      address: "",
      balance: 0,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, updateProfile }}>
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
