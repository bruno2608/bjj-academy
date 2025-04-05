import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Usando o hook de autenticação
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (!email.trim()) {
      setError('Por favor, informe seu e-mail');
      return;
    }
    
    if (!password) {
      setError('Por favor, informe sua senha');
      return;
    }
    
    // Iniciar processo de login
    setIsLoading(true);
    
    try {
      // Tenta fazer login usando o contexto de autenticação
      await login(email, password);
      
      // Redireciona para a página inicial após login bem-sucedido
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#f0f0f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Cabeçalho */}
      <div style={{ 
        backgroundColor: '#1e3a8a', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '28px' }}>🥋</div>
        </div>
        <div>
          <h1 style={{ 
            color: '#fff', 
            margin: 0, 
            fontSize: '24px',
            fontWeight: 'bold' 
          }}>
            BJJ Academy
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            margin: '4px 0 0 0',
            fontSize: '14px'
          }}>
            Sua evolução no Jiu-Jitsu
          </p>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px'
      }}>
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
          margin: '0 auto',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: '20px',
            margin: '0 0 24px 0'
          }}>
            Acesse sua conta
          </h2>
          
          {error && (
            <div style={{ 
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label 
                htmlFor="password" 
                style={{ 
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    marginRight: '8px'
                  }}
                />
                <label 
                  htmlFor="remember" 
                  style={{ 
                    fontSize: '14px'
                  }}
                >
                  Lembrar-me
                </label>
              </div>
              
              <a 
                href="#" 
                style={{ 
                  color: '#1e3a8a',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                Esqueci minha senha
              </a>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#1e3a8a',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isLoading ? 'default' : 'pointer',
                opacity: isLoading ? 0.8 : 1
              }}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <div style={{ 
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            Não tem uma conta?{' '}
            <a 
              href="/register" 
              style={{ 
                color: '#1e3a8a',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Cadastre-se
            </a>
          </div>
        </div>
        
        <div style={{ 
          margin: '24px auto 0',
          maxWidth: '400px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => {
              setEmail('admin@bjjacademy.com');
              setPassword('123456');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e8f0fe',
              color: '#1e3a8a',
              border: '1px solid #c9d8f4',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '8px' }}>🔑</span>
            Preencher credenciais (Demonstração)
          </button>
        </div>
      </div>
      
      {/* Rodapé */}
      <div style={{ 
        padding: '16px',
        textAlign: 'center',
        color: '#666',
        fontSize: '12px'
      }}>
        BJJ Academy © 2025 • Todos os direitos reservados
        <div style={{ marginTop: '4px' }}>
          <a 
            href="#" 
            style={{ 
              color: '#666',
              textDecoration: 'none',
              margin: '0 8px'
            }}
          >
            Termos de Uso
          </a>
          •
          <a 
            href="#" 
            style={{ 
              color: '#666',
              textDecoration: 'none',
              margin: '0 8px'
            }}
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginView;