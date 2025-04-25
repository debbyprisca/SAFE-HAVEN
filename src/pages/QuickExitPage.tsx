import React, { useEffect } from 'react';

const QuickExitPage: React.FC = () => {
  useEffect(() => {
    // Redirect to a neutral website
    setTimeout(() => {
      window.location.href = 'https://weather.gov';
    }, 100);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-gray-700">Redirecting...</p>
      </div>
    </div>
  );
};

export default QuickExitPage;