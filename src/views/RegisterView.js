import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

const RegisterView = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefone: '',
    dataNascimento: '',
    genero: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Dados básicos, 2: Dados complementares
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.nome.trim()) {
      setError('Por favor, informe seu nome completo');
      return false;
    }
    
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Por favor, informe um e-mail válido');
      return false;
    }
    
    if (!formData.password) {
      setError('Por favor, informe uma senha');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setError('');
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleNavigateToLogin = () => {
    console.log('Navegando para /login');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (step === 1) {
      handleNextStep();
      return;
    }
    
    // Validações adicionais do passo 2 (opcionais)
    
    setIsLoading(true);
    
    try {
      console.log("Enviando dados de registro:", {
        nome: formData.nome,
        email: formData.email,
        password: formData.password
      });
      
      const result = await register({
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
        telefone: formData.telefone,
        data_nascimento: formData.dataNascimento || null,
        genero: formData.genero || null
      });
      
      console.log("Resultado do registro:", result);
      
      // Redireciona para a página de login após registro bem-sucedido
      navigate('/login', { 
        state: { 
          message: 'Cadastro realizado com sucesso! Faça o login para continuar.' 
        } 
      });
    } catch (err) {
      console.error("Erro no envio do formulário:", err);
      setError(err.message || 'Erro ao registrar usuário');
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
          maxWidth: '500px',
          width: '100%',
          margin: '0 auto',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: '20px',
            margin: '0 0 24px 0'
          }}>
            {step === 1 ? 'Crie sua conta' : 'Complete seu cadastro'}
          </h2>
          
          {/* Indicador de progresso */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{ 
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#1e3a8a',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <div style={{ 
                height: '2px', 
                width: '40px', 
                backgroundColor: step === 2 ? '#1e3a8a' : '#ddd'
              }}></div>
              <div style={{ 
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: step === 2 ? '#1e3a8a' : '#ddd',
                color: step === 2 ? '#fff' : '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                2
              </div>
            </div>
          </div>
          
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
            {step === 1 ? (
              <>
                {/* Etapa 1: Dados de acesso */}
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="nome" 
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Nome completo *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
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
                    htmlFor="email" 
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    Senha *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo de 6 caracteres"
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
                    htmlFor="confirmPassword" 
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Confirme a senha *
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Digite a senha novamente"
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
              </>
            ) : (
              <>
                {/* Etapa 2: Dados pessoais */}
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="telefone" 
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
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
                    htmlFor="dataNascimento" 
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Data de nascimento
                  </label>
                  <input
                    id="dataNascimento"
                    name="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={handleChange}
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
                    htmlFor="genero" 
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Gênero
                  </label>
                  <select
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Prefiro não informar">Prefiro não informar</option>
                  </select>
                </div>
              </>
            )}
            
            <div style={{ 
              display: 'flex',
              justifyContent: step === 1 ? 'center' : 'space-between',
              marginTop: '24px'
            }}>
              {step === 2 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  style={{
                    padding: '14px 24px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Voltar
                </button>
              )}
              
              <button
                type={step === 2 ? 'submit' : 'button'}
                onClick={step === 1 ? handleNextStep : undefined}
                disabled={isLoading}
                style={{
                  padding: '14px 24px',
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
                {isLoading 
                  ? 'Processando...' 
                  : step === 1 
                    ? 'Próximo' 
                    : 'Cadastrar'}
              </button>
            </div>
          </form>
          
          <div style={{ 
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            Já tem uma conta?{' '}
            <span 
              onClick={() => {
                console.log('Navegando de volta para /login');
                setTimeout(() => {
                  navigate('/login', { replace: true });
                }, 100);
              }}
              style={{ 
                color: '#1e3a8a',
                textDecoration: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Faça login
            </span>
          </div>
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

export default RegisterView;