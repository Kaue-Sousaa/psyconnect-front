import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Role = "ADMIN" | "PROFESSOR" | "USUARIO";

interface AuthContextData {
  role: Role | null;
  setRole: (role: Role) => void;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  role: null,
  setRole: () => {},
  token: null,
  setToken: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedRole) setRole(storedRole as Role);
      if (storedToken) setToken(storedToken);
    };
    loadAuthData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('usuario');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('role');
    
    setRole(null);
    setToken(null);
  };


  return (
    <AuthContext.Provider value={{ role, setRole, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
