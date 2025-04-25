import React from 'react';
import { useSafety } from '../../contexts/SafetyContext';
import { LogOut } from 'lucide-react';

interface QuickExitButtonProps {
  className?: string;
}

const QuickExitButton: React.FC<QuickExitButtonProps> = ({ className = '' }) => {
  const { quickExit } = useSafety();

  return (
    <button
      onClick={quickExit}
      className={`bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md 
        flex items-center transition-colors duration-200 shadow-md ${className}`}
      aria-label="Quick exit"
    >
      <LogOut size={18} className="mr-1" />
      <span>Quick Exit</span>
    </button>
  );
};

export default QuickExitButton;