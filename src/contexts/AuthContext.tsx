import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  User,
  LoginRequest,
  RegisterRequest,
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  getCurrentUser,
  setTokens,
  setUser as setStoredUser,
  getStoredUser,
  getAccessToken,
  clearAuth,
} from "@/services/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Try to get stored user first
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }

      // Verify token with backend
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setStoredUser(currentUser);
    } catch (error) {
      console.error("Auth check failed:", error);
      clearAuth();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await loginApi(data);

      setTokens(response.access_token, response.refresh_token);
      setUser(response.user);
      setStoredUser(response.user);

      toast.success("Connexion réussie !", {
        description: `Bienvenue ${response.user.name}`,
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || "Email ou mot de passe incorrect";
      toast.error("Erreur de connexion", {
        description: message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response = await registerApi(data);

      setTokens(response.access_token, response.refresh_token);
      setUser(response.user);
      setStoredUser(response.user);

      toast.success("Compte créé avec succès !", {
        description: `Bienvenue ${response.user.name}`,
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Register error:", error);
      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors de l'inscription";
      toast.error("Erreur d'inscription", {
        description: message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      clearAuth();
      toast.info("Vous avez été déconnecté");
      navigate("/");
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
