import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface SafetyContextType {
  quickExit: () => void;
  clearHistory: () => void;
  toggleIncognitoMode: () => void;
  isIncognitoMode: boolean;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};

interface SafetyProviderProps {
  children: ReactNode;
}

export const SafetyProvider: React.FC<SafetyProviderProps> = ({ children }) => {
  const [isIncognitoMode, setIsIncognitoMode] = useState(false);
  const navigate = useNavigate();

  // Setup keyboard shortcut for quick exit
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key for quick exit
      if (event.key === 'Escape') {
        quickExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const quickExit = () => {
    // Navigate to a safe page first (which will redirect to a neutral site)
    navigate('/exit');
    
    // Attempt to clear browser history (limited by browser security)
    clearHistory();
  };

  const clearHistory = () => {
    try {
      // This has limitations based on browser security, but it's a start
      window.history.pushState(null, '', window.location.href);
      window.history.go(-window.history.length);
    } catch (error) {
      console.error('Could not clear history');
    }
  };

  const toggleIncognitoMode = () => {
    setIsIncognitoMode(!isIncognitoMode);
  };

  return (
    <SafetyContext.Provider
      value={{
        quickExit,
        clearHistory,
        toggleIncognitoMode,
        isIncognitoMode,
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
};