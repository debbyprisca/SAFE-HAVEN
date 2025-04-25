import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSafety } from '../contexts/SafetyContext';
import { Heart, Menu, X, Home, FileText, LifeBuoy, ShieldCheck, MessageCircle, EyeOff } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleIncognitoMode, isIncognitoMode } = useSafety();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center space-x-2 font-semibold text-xl transition hover:text-blue-100"
            onClick={closeMenu}
          >
            <Heart className="text-white" size={24} />
            <span>Safe Haven</span>
          </Link>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 transition"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <NavLinks closeMenu={closeMenu} />
            
            <button
              onClick={toggleIncognitoMode}
              className={`flex items-center text-sm ${
                isIncognitoMode ? 'text-amber-300' : 'text-blue-100'
              } hover:text-white transition`}
              aria-label="Toggle incognito mode"
            >
              <EyeOff size={16} className="mr-1" />
              {isIncognitoMode ? 'Incognito On' : 'Browse Privately'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 py-2 space-y-3">
          <NavLinks closeMenu={closeMenu} isMobile />
          
          <div className="pt-2 border-t border-blue-500">
            <button
              onClick={toggleIncognitoMode}
              className="flex items-center py-2 px-4 w-full text-left text-sm text-blue-100 hover:text-white"
            >
              <EyeOff size={16} className="mr-2" />
              {isIncognitoMode ? 'Incognito Mode On' : 'Browse Privately'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinksProps {
  closeMenu: () => void;
  isMobile?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ closeMenu, isMobile = false }) => {
  const links = [
    { path: '/', label: 'Home', icon: <Home size={isMobile ? 18 : 16} className="mr-2" /> },
    { path: '/report', label: 'Report Abuse', icon: <FileText size={isMobile ? 18 : 16} className="mr-2" /> },
    { path: '/resources', label: 'Resources', icon: <LifeBuoy size={isMobile ? 18 : 16} className="mr-2" /> },
    { path: '/safety-plan', label: 'Safety Plan', icon: <ShieldCheck size={isMobile ? 18 : 16} className="mr-2" /> },
    { path: '/live-support', label: 'Live Support', icon: <MessageCircle size={isMobile ? 18 : 16} className="mr-2" /> },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`flex items-center ${
            isMobile
              ? 'py-2 px-4 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md'
              : 'text-blue-100 hover:text-white transition'
          }`}
          onClick={closeMenu}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default Navbar;