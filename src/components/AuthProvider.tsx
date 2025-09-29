import { createContext } from 'react';
import { useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthResponse, AuthFormData } from '../types/shared';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthFormData) => Promise<void>;
  signup: (data: AuthFormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        const wallet = localStorage.getItem('wallet');
        const username = localStorage.getItem('username');
        const bio = localStorage.getItem('bio');
        const authTimestamp = localStorage.getItem('authTimestamp');

        if (token && userId && email && wallet && authTimestamp) {
          const userData: User = {
            id: userId,
            email: email,
            wallet: wallet,
            profile: {
              id: '',
              userId: userId,
              username: username || '',
              bio: bio || undefined
            },
            createdAt: new Date().toISOString()
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const userData: AuthResponse = await response.json();
      
      // Store auth data in localStorage
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData.user.id);
      localStorage.setItem('email', userData.user.email);
      localStorage.setItem('wallet', userData.user.wallet);
      
      if (userData.user.profile) {
        localStorage.setItem('username', userData.user.profile.username);
        if (userData.user.profile.bio) {
          localStorage.setItem('bio', userData.user.profile.bio);
        }
      }
      
      localStorage.setItem('authTimestamp', Date.now().toString());
      
      setUser(userData.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const userData: AuthResponse = await response.json();
      
      // Store auth data in localStorage
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData.user.id);
      localStorage.setItem('email', userData.user.email);
      localStorage.setItem('wallet', userData.user.wallet);
      
      if (userData.user.profile) {
        localStorage.setItem('username', userData.user.profile.username);
        if (userData.user.profile.bio) {
          localStorage.setItem('bio', userData.user.profile.bio);
        }
      }
      
      localStorage.setItem('authTimestamp', Date.now().toString());
      
      setUser(userData.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
