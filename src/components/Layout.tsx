import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import QuickExitButton from './safety/QuickExitButton';
import { useSafety } from '../contexts/SafetyContext';
import { AlertTriangle } from 'lucide-react';

const Layout: React.FC = () => {
  const { isIncognitoMode } = useSafety();
  
  useEffect(() => {
    document.title = "Safe Haven | Resources"; // Non-descriptive title for privacy
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {isIncognitoMode && (
        <div className="bg-amber-100 py-2 px-4 text-amber-800 flex items-center justify-center text-sm">
          <AlertTriangle size={16} className="mr-2" />
          <span>Incognito mode is active. Your browsing on this site is not being saved to history.</span>
        </div>
      )}
      
      <Navbar />

      <QuickExitButton className="fixed top-4 right-4 z-50" />
      
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;