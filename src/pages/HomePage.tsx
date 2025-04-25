import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, FileText, HeartHandshake, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-12 md:px-12 md:py-16 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            You are not alone. Help is available.
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
            Safe Haven provides confidential support, resources, and reporting options for those experiencing domestic violence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/live-support"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium flex items-center justify-center transition-all shadow-md"
            >
              <HeartHandshake size={20} className="mr-2" />
              Talk to Someone Now
            </Link>
            <Link
              to="/resources"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors shadow-md"
            >
              <Shield size={20} className="mr-2" />
              Find Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
        <div className="flex items-center">
          <Phone size={24} className="text-red-500 mr-3" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">In immediate danger?</h2>
            <p className="text-gray-600">Call <a href="tel:999 or 122" className="font-bold text-red-600 hover:underline">999 or 122</a> or the National Domestic Violence Hotline: <a href="tel:0714667772" className="font-bold text-red-600 hover:underline">0714667772</a></p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          title="Report Anonymously"
          description="File a confidential report that can be shared with the appropriate authorities based on your preferences."
          icon={<FileText className="h-8 w-8 text-blue-500" />}
          link="/report"
        />
        <ServiceCard
          title="Create a Safety Plan"
          description="Develop a personalized plan to increase your safety whether you're staying, planning to leave, or have left an abusive relationship."
          icon={<Shield className="h-8 w-8 text-blue-500" />}
          link="/safety-plan"
        />
        <ServiceCard
          title="Find Support"
          description="Connect with advocates, shelters, legal services, and other resources in your area."
          icon={<HeartHandshake className="h-8 w-8 text-blue-500" />}
          link="/resources"
        />
      </section>

      {/* Safety Note */}
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Safety & Privacy</h2>
        <p className="text-gray-700 mb-4">
          If you're concerned about your browsing history being monitored, you can:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Use the "Quick Exit" button in the top right to leave this site immediately</li>
          <li>Enable "Browse Privately" mode using the button in the navigation bar</li>
          <li>Press the ESC key at any time for an immediate exit</li>
          <li>Use an incognito/private browsing window</li>
        </ul>
        <p className="text-gray-700">
          For more detailed safety information, visit our{' '}
          <Link to="/safety-plan" className="text-blue-600 hover:underline">
            Digital Safety Guide
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link }) => {
  return (
    <Link
      to={link}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow group"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
        Learn more <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default HomePage;