import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'student';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (role: 'admin' | 'student') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = (role: 'admin' | 'student'): Promise<void> => {
    setLoading(true);
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({
          id: Math.random().toString(36).substr(2, 9),
          name: role === 'admin' ? 'Admin User' : 'Student User',
          role,
        });
        setLoading(false);
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
