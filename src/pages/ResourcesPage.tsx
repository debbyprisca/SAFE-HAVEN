import React, { useState } from 'react';
import { Phone, Home, GraduationCap, HeartHandshake, ShieldAlert, Scale, Search, MapPin } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Sample resource data - in a real app, this would come from an API
  const resources = [
   {
      id: 1,
      name: 'Uganda Womens Network/UWONET',
      description: 'provides free legal aid, psychosocial and temporary accommodation for women and children facing violence in their homes and communities.',
      category: 'shelter',
      location: 'Bbuye-Kigowa Ntinda',
      contactPhone: '+256 414 286 589 or +256 759 330 000',
      contactText: 'Text START to 88788',
      website: 'https://www.uwonet.or.ug',
      hours: 'Mon-Fri 9am-5pm',
    },
    {
      id: 2,
      name: 'OKOA REFUGE',
      description: 'Okoa Refuge’s Gender-Based Violence shelters are working to eradicate human trafficking and gender-based violence in our lifetime',
      category: 'shelter',
      location: 'nationwide',
      contactPhone: '(904) 580-OKOA(6562)',
      website: 'https://www.okoarefuge.org',
      hours:  'Mon-Fri 9am-5pm',
    },
    {
      id: 3,
      name: 'Justice Centres Uganda/JCU',
      description: 'Free legal assistance for qualifying low-income individuals.',
      category: 'legal',
      location: 'nationwide',
      contactPhone: '0414 256 526',
      website: 'https://justicecentres.go.ug',
      hours:  'Mon-Fri 9am-5pm',
    },
    {
      id: 4,
      name: 'FIDA Uganda',
      description: 'Provides legal aid services through a strategic network of offices reaching into 20 districts across the country.',
      category: 'legal',
      location: 'nationwide',
      contactPhone: '+256 800 111 511',
      website: 'https://fidauganda.or.ug',
      hours: 'Mon-Fri 9am-5pm',
    },
    {
      id: 5,
      name: 'Womens Peace and Humaritarian Fund',
      description: 'WPHF mobilizes and channels flexible and quality funding and capacity support to women peacebuilders, humanitarians and human rights defenders working at the forefront of Women Peace Security and Humanitarian Action (WPS-HA) issues across the globe.',
      category: 'support',
      location: 'nationwide',
      contactPhone: 'Varies by location',
      website: 'https://wphfund.org',
      hours: 'Varies by location',
    },
    {
      id: 6,
      name: 'Uganda NONE in three',
      description: 'None in Three was delivered in Uganda by Makerere University, Kampala. Our research focus is child marriage, and the associated gender-based violence surrounding early marriage, including sexual coercion and abuse.',
      category: 'education',
      location: 'kampala',
      contactPhone: '+256 414 534 114',
      website: 'https://www.noneinthree.org/',
      hours: 'Mon-Fri 8am-5pm',
    },
    
    {
      id: 7,
      name: 'Center for Domestic Violence Prevention (CEDOVIP)',
      description: 'CEDOVIP focuses on mobilising communities to prevent and respond to violence against women and girls; strengthening prevention and response to violence against women and girls by civil society organisations, government, local institutions, and institutions of learning; and advocacy for better implementation of existing laws and policies, as well as for passage of new, more effective laws and policies.',
      category: 'support',
      location: 'nationwide',
      website: 'https://www.womankind.org.uk/',
      hours: 'Mon-Fri 8:30am-5:30pm ET',
    },
  ];

  // Filter resources based on search query and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLocation = !selectedLocation || resource.location === selectedLocation || resource.location === 'nationwide';
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Get unique locations for the filter
  const locations = Array.from(new Set(resources.map(r => r.location)));

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Support Resources</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Connect with organizations and services that can provide support, safety, and guidance during difficult times.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:w-2/3">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="shelter">Shelters</option>
                <option value="legal">Legal Aid</option>
                <option value="support">Support Services</option>
                <option value="education">Educational Resources</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
    
        <CategoryButton 
          icon={<Home size={20} />}
          label="Shelters"
          isActive={selectedCategory === 'shelter'}
          onClick={() => setSelectedCategory(selectedCategory === 'shelter' ? 'all' : 'shelter')}
        />
        <CategoryButton 
          icon={<Scale size={20} />}
          label="Legal Aid"
          isActive={selectedCategory === 'legal'}
          onClick={() => setSelectedCategory(selectedCategory === 'legal' ? 'all' : 'legal')}
        />
        <CategoryButton 
          icon={<HeartHandshake size={20} />}
          label="Support"
          isActive={selectedCategory === 'support'}
          onClick={() => setSelectedCategory(selectedCategory === 'support' ? 'all' : 'support')}
        />
        <CategoryButton 
          icon={<GraduationCap size={20} />}
          label="Education"
          isActive={selectedCategory === 'education'}
          onClick={() => setSelectedCategory(selectedCategory === 'education' ? 'all' : 'education')}
        />
      </div>

      {/* Emergency Resources Callout */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm mb-8">
        <div className="flex">
          <ShieldAlert size={24} className="text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">In immediate danger?</h3>
            <p className="text-gray-600">Call <a href="tel:999" className="font-bold text-red-600 hover:underline">999</a> or the National Domestic Violence Hotline: <a href="tel:0714667772" className="font-bold text-red-600 hover:underline">0714667772</a></p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No resources found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLocation('');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Help Finding Resources */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Need Help Finding Resources?</h2>
        <p className="text-gray-700 mb-4">
          If you're not sure which resources are right for your situation, our trained advocates can help guide you to the appropriate support services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/live-support" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex justify-center items-center transition-colors"
          >
            <HeartHandshake size={20} className="mr-2" />
            Chat with an Advocate
          </a>
          <a 
            href="tel:18007997233" 
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium flex justify-center items-center transition-colors"
          >
            <Phone size={20} className="mr-2" />
            Call the Hotline
          </a>
        </div>
      </div>
    </div>
  );
};

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-md transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
      }`}
    >
      <div className={`mb-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

interface ResourceCardProps {
  resource: {
    id: number;
    name: string;
    description: string;
    category: string;
    location: string;
    contactPhone?: string;
    contactText?: string;
    website?: string;
    hours: string;
  };
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hotline':
        return <Phone size={18} />;
      case 'shelter':
        return <Home size={18} />;
      case 'legal':
        return <Scale size={18} />;
      case 'support':
        return <HeartHandshake size={18} />;
      case 'education':
        return <GraduationCap size={18} />;
      default:
        return <HeartHandshake size={18} />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'hotline':
        return 'Hotline';
      case 'shelter':
        return 'Shelter';
      case 'legal':
        return 'Legal Aid';
      case 'support':
        return 'Support Services';
      case 'education':
        return 'Educational Resources';
      default:
        return category;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
            {getCategoryIcon(resource.category)}
          </div>
          <div className="text-sm font-medium text-blue-600">
            {getCategoryLabel(resource.category)}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.name}</h3>
        <p className="text-gray-600 mb-4">{resource.description}</p>
        
        <div className="space-y-3 mb-4">
          {resource.location && (
            <div className="flex items-start">
              <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
              <span className="text-gray-700">{resource.location}</span>
            </div>
          )}
          
          {resource.contactPhone && (
            <div className="flex items-start">
              <Phone size={18} className="text-gray-500 mr-2 mt-0.5" />
              <a 
                href={`tel:${resource.contactPhone.replace(/\D/g, '')}`} 
                className="text-blue-600 hover:underline"
              >
                {resource.contactPhone}
              </a>
            </div>
          )}
          
          {resource.contactText && (
            <div className="flex items-start">
              <span className="text-gray-500 mr-2">SMS:</span>
              <span className="text-gray-700">{resource.contactText}</span>
            </div>
          )}
          
          <div className="flex items-start">
            <span className="text-gray-500 mr-2">Hours:</span>
            <span className="text-gray-700">{resource.hours}</span>
          </div>
        </div>
        
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors mt-4"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;