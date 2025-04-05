import React from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import { User } from '../models/userModel.js';

const HomeView = () => {
  const { user } = useAuth();
  const userData = user instanceof User ? user : new User(user || {});

  // Dados simulados para o dashboard
  const statsData = {
    progressoPercent: 65,
    ultimaAula: '1 dia atrás',
    totalAulas: 86,
    presencaMensal: '85%',
    ultimasAulas: [
      { data: '03/04/2025', tipo: 'Fundamentos', status: 'Presente' },
      { data: '01/04/2025', tipo: 'Avançada', status: 'Presente' },
      { data: '29/03/2025', tipo: 'Treino Livre', status: 'Ausente' }
    ]
  };

  return (
    <div style={{
      backgroundColor: '#f0f0f5',
      padding: '16px',
      height: '100%',
      overflowY: 'auto'
    }}>
      {/* Cabeçalho com info do usuário */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#1e3a8a',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          marginRight: '16px'
        }}>
          {userData?.nome?.charAt(0) || 'U'}
        </div>
        <div>
          <h2 style={{
            margin: '0',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            {userData?.nome || 'Usuário'}
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '4px'
          }}>
            <div style={{
              backgroundColor: userData.getCorFaixa(),
              color: userData.faixa === 'Branca' ? '#333' : 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
              marginRight: '8px',
              border: userData.faixa === 'Branca' ? '1px solid #ddd' : 'none'
            }}>
              Faixa {userData.faixa}
            </div>
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#666'
            }}>
              {userData.grau} graus
            </div>
          </div>
        </div>
      </div>

      {/* Card de progresso */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          Progresso para próxima graduação
        </h3>
        
        <div style={{
          height: '12px',
          backgroundColor: '#e0e0e0',
          borderRadius: '6px',
          marginBottom: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${statsData.progressoPercent}%`,
            backgroundColor: '#4CAF50',
            borderRadius: '6px'
          }}></div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#666'
        }}>
          <span>Progresso: {statsData.progressoPercent}%</span>
          <span>Próxima graduação: {userData.grau + 1}° grau</span>
        </div>
      </div>
      
      {/* Estatísticas rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {/* Card última aula */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            color: '#666'
          }}>
            Última aula
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            {statsData.ultimaAula}
          </div>
        </div>
        
        {/* Card total de aulas */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            color: '#666'
          }}>
            Total de aulas
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            {statsData.totalAulas}
          </div>
        </div>
        
        {/* Card presença mensal */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            color: '#666'
          }}>
            Presença mensal
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            {statsData.presencaMensal}
          </div>
        </div>
      </div>
      
      {/* Informações pessoais */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          Informações pessoais
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          <div>
            <div style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '4px'
            }}>
              Telefone
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '500'
            }}>
              {userData?.telefone || '(--) ------.----'}
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '4px'
            }}>
              E-mail
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '500'
            }}>
              {userData?.email || 'email@exemplo.com'}
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '4px'
            }}>
              Peso
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '500'
            }}>
              {userData?.peso || '--.- kg'}
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '4px'
            }}>
              Altura
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '500'
            }}>
              {userData?.altura || '--.- m'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Últimas aulas */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          Últimas aulas
        </h3>
        
        {statsData.ultimasAulas.map((aula, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: index < statsData.ultimasAulas.length - 1 ? '1px solid #eee' : 'none'
          }}>
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '4px'
              }}>
                {aula.tipo}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#666'
              }}>
                {aula.data}
              </div>
            </div>
            
            <div style={{
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: aula.status === 'Presente' ? '#e8f5e9' : '#ffebee',
              color: aula.status === 'Presente' ? '#4CAF50' : '#F44336'
            }}>
              {aula.status}
            </div>
          </div>
        ))}
        
        <button style={{
          width: '100%',
          padding: '12px',
          marginTop: '16px',
          backgroundColor: '#f5f5f5',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#666',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          Ver todas as aulas
        </button>
      </div>
      
      {/* Próxima aula */}
      <div style={{
        backgroundColor: '#1e3a8a',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '16px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{
            fontSize: '14px',
            opacity: 0.8,
            marginBottom: '4px'
          }}>
            Próxima aula
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            {userData?.proximaAula || 'Nenhuma aula agendada'}
          </div>
        </div>
        
        <button style={{
          backgroundColor: '#fff',
          color: '#1e3a8a',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 16px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Check-in
        </button>
      </div>
    </div>
  );
};

export default HomeView;