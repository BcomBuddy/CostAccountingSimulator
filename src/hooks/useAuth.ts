import { useState, useEffect } from 'react';
import { SSOAuthService, UserData } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = SSOAuthService.validateTokenFromShell();
    
    if (userData) {
      setUser(userData);
      console.log('✅ SSO Login successful:', userData);
    } else {
      const storedUser = SSOAuthService.getUserData();
      if (storedUser) {
        setUser(storedUser);
      }
    }
    
    setLoading(false);
  }, []);

  const logout = () => {
    SSOAuthService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout
  };
};
