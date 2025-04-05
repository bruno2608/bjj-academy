import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <div style={{ 
      backgroundColor: '#1e3a8a', 
      padding: '16px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ 
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '20px' }}>🥋</div>
        </div>
        <h1 style={{ 
          margin: 0, 
          fontSize: '20px',
          fontWeight: 'bold' 
        }}>
          BJJ Academy
        </h1>
      </div>

      {user && (
        <button 
          onClick={logout}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <span style={{ marginRight: '8px' }}>Sair</span>
          <span>🚪</span>
        </button>
      )}
    </div>
  );
};

export default Header;