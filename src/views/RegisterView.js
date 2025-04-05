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
  const [passwordStrength, setPasswordStrength] = useState(0); // 0: Fraca, 1: Média, 2: Forte
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Função para formatar o telefone
  const formatPhone = (value) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica a máscara de telefone
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  // Função para validar força da senha
  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    // Verifica se tem pelo menos 6 caracteres
    if (password.length >= 6) strength += 1;
    
    // Verifica se tem pelo menos 8 caracteres
    if (password.length >= 8) strength += 1;
    
    // Verifica se tem letras maiúsculas e minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    
    // Verifica se tem números
    if (/[0-9]/.test(password)) strength += 1;
    
    // Verifica se tem caracteres especiais
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    // Classificação da força (0-1: fraca, 2-3: média, 4-5: forte)
    if (strength <= 1) return 0;
    if (strength <= 3) return 1;
    return 2;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      // Aplica a formatação para telefone
      setFormData(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }));
    } else if (name === 'password') {
      // Atualiza a força da senha
      setPasswordStrength(checkPasswordStrength(value));
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      // Comportamento normal para outros campos
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateEmail = (email) => {
    // Padrão de validação de email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    // Verifica se o telefone está no formato correto: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const validateStep1 = () => {
    if (!formData.nome.trim()) {
      setError('Por favor, informe seu nome completo');
      return false;
    }
    
    if (!formData.email.trim() || !validateEmail(formData.email)) {
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
    
    if (passwordStrength === 0) {
      setError('Sua senha é muito fraca. Adicione letras maiúsculas, números ou símbolos.');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.telefone || !validatePhone(formData.telefone)) {
      setError('Por favor, informe um telefone válido no formato (XX) XXXXX-XXXX');
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
    setError('');
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (step === 1) {
      // No passo 1, o botão Próximo deve chamar handleNextStep, não submeter o formulário
      handleNextStep();
      return;
    }
    
    // Validações do passo 2
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
        telefone: formData.telefone,
        data_nascimento: formData.dataNascimento || null,
        genero: formData.genero || null
      });
      
      // Redireciona para a página inicial após registro bem-sucedido
      navigate('/login', { state: { message: 'Cadastro realizado com sucesso! Faça o login para continuar.' } });
    } catch (err) {
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
        padding: '0 20px',
        overflowY: 'auto'
      }}>
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '500px',
          width: '100%',
          margin: '20px auto',
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
                
                <div style={{ marginBottom: '8px' }}>
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
                
                {/* Indicador de força da senha */}
                {formData.password && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ 
                      display: 'flex',
                      marginTop: '6px'
                    }}>
                      <div style={{ 
                        height: '4px',
                        flex: 1,
                        backgroundColor: passwordStrength >= 0 ? (
                          passwordStrength === 0 ? '#ef5350' : 
                          passwordStrength === 1 ? '#ffca28' : '#66bb6a'
                        ) : '#e0e0e0',
                        borderRadius: '2px',
                        marginRight: '4px'
                      }}></div>
                      <div style={{ 
                        height: '4px',
                        flex: 1,
                        backgroundColor: passwordStrength >= 1 ? (
                          passwordStrength === 1 ? '#ffca28' : '#66bb6a'
                        ) : '#e0e0e0',
                        borderRadius: '2px',
                        marginRight: '4px'
                      }}></div>
                      <div style={{ 
                        height: '4px',
                        flex: 1,
                        backgroundColor: passwordStrength >= 2 ? '#66bb6a' : '#e0e0e0',
                        borderRadius: '2px'
                      }}></div>
                    </div>
                    <div style={{ 
                      fontSize: '12px',
                      marginTop: '4px',
                      color: passwordStrength === 0 ? '#c62828' : 
                              passwordStrength === 1 ? '#f57f17' : '#2e7d32'
                    }}>
                      {passwordStrength === 0 ? 'Senha fraca' : 
                       passwordStrength === 1 ? 'Senha média' : 'Senha forte'}
                    </div>
                    <div style={{ 
                      fontSize: '12px',
                      marginTop: '2px',
                      color: '#666'
                    }}>
                      Use letras maiúsculas, minúsculas, números e símbolos para maior segurança.
                    </div>
                  </div>
                )}
                
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
                    Telefone *
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
                    required
                  />
                  <div style={{ 
                    fontSize: '12px',
                    marginTop: '4px',
                    color: '#666'
                  }}>
                    Digite apenas os números, incluindo o DDD.
                  </div>
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
                    max={new Date().toISOString().split('T')[0]} // Impede datas futuras
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{ 
                    fontSize: '12px',
                    marginTop: '4px',
                    color: '#666'
                  }}>
                    Usada para verificar requisitos de idade para as turmas.
                  </div>
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
            <a 
              href="/login" 
              style={{ 
                color: '#1e3a8a',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Faça login
            </a>
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