import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Define as rotas de navegação
  const navItems = [
    { name: 'Home', path: '/home', icon: '🏠' },
    { name: 'Presença', path: '/presenca', icon: '📊' },
    { name: 'Check-in', path: '/checkin', icon: '✅' },
    { name: 'Evolução', path: '/evolucao', icon: '🏆' }
  ];

  return (
    <div style={{ 
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '12px 0',
      borderTop: '1px solid #eee'
    }}>
      {navItems.map((item) => (
        <button 
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            color: currentPath === item.path ? '#1e3a8a' : '#666',
            fontSize: '12px',
            cursor: 'pointer',
            flex: 1
          }}
        >
          <div style={{
            fontSize: '20px',
            marginBottom: '4px'
          }}>
            {item.icon}
          </div>
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;