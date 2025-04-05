import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.js';

// Páginas/Views
import LoginView from './views/LoginView.js';
import RegisterView from './views/RegisterView.js';
import HomeView from './views/HomeView.js';

// Placeholders para páginas que ainda não foram implementadas
const PresencaView = () => <div style={{ padding: 20 }}>Tela de Presença em desenvolvimento</div>;
const CheckinView = () => <div style={{ padding: 20 }}>Tela de Check-in em desenvolvimento</div>;
const EvolucaoView = () => <div style={{ padding: 20 }}>Tela de Evolução em desenvolvimento</div>;

// Componentes de layout principal para rotas autenticadas
import Header from './components/layout/Header.js';
import Navigation from './components/layout/Navigation.js';

// Componente de layout para rotas protegidas
const ProtectedLayout = ({ children }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor: '#f0f0f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Header />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
      <Navigation />
    </div>
  );
};

// Componente para rota protegida que verifica autenticação
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Se ainda estiver carregando, mostra um indicador
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Carregando...
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // Se estiver autenticado, renderiza o conteúdo
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

// Configuração de rotas da aplicação
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota raiz redireciona para login se não estiver autenticado */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      
      {/* Rotas protegidas que requerem autenticação */}
      <Route path="/home" element={
        <ProtectedRoute>
          <HomeView />
        </ProtectedRoute>
      } />
      
      <Route path="/presenca" element={
        <ProtectedRoute>
          <PresencaView />
        </ProtectedRoute>
      } />
      
      <Route path="/checkin" element={
        <ProtectedRoute>
          <CheckinView />
        </ProtectedRoute>
      } />
      
      <Route path="/evolucao" element={
        <ProtectedRoute>
          <EvolucaoView />
        </ProtectedRoute>
      } />
      
      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;