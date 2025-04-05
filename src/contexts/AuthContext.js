import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authService from '../services/authService.js';
import { createUser } from '../models/userModel.js';

// Criando o contexto de autenticação
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se o usuário está logado ao carregar o componente
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(createUser(userData));
        }
      } catch (err) {
        console.error('Erro ao verificar sessão:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Função de login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await authService.authenticate(email, password);
      const userObject = createUser(userData);
      setUser(userObject);
      return userObject;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função de registro
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = await authService.registerUser(userData);
      return createUser(newUser);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao fazer logout:', err);
    } finally {
      setLoading(false);
    }
  };

  // Verifica se o usuário tem um determinado papel
  const hasRole = (roleName) => {
    if (!user) return false;
    return user.hasPapel(roleName);
  };

  // Retorna o maior nível de acesso do usuário
  const getAccessLevel = () => {
    if (!user) return 0;
    return user.getNivelAcesso();
  };

  // Verifica se o usuário está autenticado
  const isAuthenticated = () => !!user;

  // Valores e funções que serão disponibilizados pelo contexto
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    hasRole,
    getAccessLevel,
    isAuthenticated,
    setUser  // Útil para atualizar o usuário depois de alterações de perfil
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;