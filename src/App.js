import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';
import AppRoutes from './routes.js';
import Debug from './components/Debug.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Debug />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;