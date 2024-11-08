import React, { createContext, ReactNode, useEffect, useState } from 'react';

// Type for User Data
interface User {
  id: string;
  username: string;
}

// Type for UserContext
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  message: {
    type: 'success' | 'error';
    text: string;
  } | null;
  resetMessage: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (values: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => Promise<boolean>;
  logout: () => void;
}

// Initial Context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<UserContextType['message']>(null);

  const authTokenKey = 'authToken';

  // Verify Token and Fetch User Info
  const verifyToken = async () => {
    setLoading(true); // Démarre le chargement
    const token = localStorage.getItem(authTokenKey);
    if (token) {
      try {
        const response = await fetch('http://localhost:3000/auth/verify', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser({ id: data.id, username: data.username });
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        handleLogout();
      }
    }
    setLoading(false); // Arrête le chargement une fois terminé
  };

  useEffect(() => {
    console.log('UserProvider mounted');
    verifyToken();
  }, []);

  // Login Method
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('userContext/login : Login success', data);
        localStorage.setItem(authTokenKey, data.token);
        setUser({ id: data.user.id, username: data.user.username });
        setMessage({ type: 'success', text: 'Connexion réussie!' });
        return true;
      } else {
        console.log('userContext/login : Login failed');
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Une erreur s\'est produite lors de la connexion.' });
        return false;
      }
    } catch (error) {
      console.log('userContext/login : Login error:', error);
      console.error('Login error:', error);
      setMessage({ type: 'error', text: 'Une erreur s\'est produite lors de la connexion.' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register Method
  const register = async (values: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(authTokenKey, data.token);
        setUser({ id: data.user.id, username: data.user.username });
        setMessage({ type: 'success', text: 'Inscription réussie!' });
        return true;
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Une erreur s\'est produite lors de l\'inscription.' });
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', text: 'Une erreur s\'est produite lors de l\'inscription.' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout Method
  const logout = () => {
    handleLogout();
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem(authTokenKey);
    setUser(null);
    setMessage({ type: 'success', text: 'Déconnexion réussie!' });
  };

  // Reset Message
  const resetMessage = () => {
    setMessage(null);
  };

  // Context Values
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    message,
    resetMessage,
    login,
    register,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

