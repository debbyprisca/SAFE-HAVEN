import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: Emergency Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Phone size={18} className="mr-2 text-blue-400" />
              Emergency Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="tel:0714667772" 
                  className="hover:text-white transition"
                >
                  National Domestic Violence Hotline: 0714667772
                </a>
              </li>
              <li>
                <a 
                  href="sms:0779999999" 
                  className="hover:text-white transition"
                >
                  Text "START" to 0779999999
                </a>
              </li>
              <li>
                <a 
                  href="tel:999 or 122" 
                  className="hover:text-white transition"
                >
                  Emergency: 999 or 122
                </a>
              </li>
            </ul>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Shield size={18} className="mr-2 text-blue-400" />
              Quick Access
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/safety-plan" className="hover:text-white transition">
                  Create a Safety Plan
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition">
                  Find Local Resources
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-white transition">
                  Report Anonymously
                </Link>
              </li>
              <li>
                <Link to="/live-support" className="hover:text-white transition">
                  Speak with an Advocate
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: About */}
          <div>
            <div className="flex items-center mb-4">
              <Heart size={20} className="text-blue-400 mr-2" />
              <h3 className="text-white font-semibold text-lg">Safe Haven</h3>
            </div>
            <p className="mb-4 text-sm">
              Safe Haven provides resources, support, and a safe space for those experiencing domestic violence. 
              Your safety and privacy are our top priorities.
            </p>
            <div className="text-xs text-gray-400 mt-4">
              <p>© 2025 Safe Haven. All rights reserved.</p>
              <p className="mt-1">
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>{' '}
                |{' '}
                <Link to="/terms" className="hover:text-white transition">
                  Terms of Use
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;