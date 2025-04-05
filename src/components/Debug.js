import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Debug = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Current location:', location);
  }, [location]);
  
  return null; // Este componente não renderiza nada
};

export default Debug;