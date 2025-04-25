import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md flex items-center transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;