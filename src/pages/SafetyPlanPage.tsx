import React, { useState } from 'react';
import { Shield, AlertTriangle, Check, ArrowRight, Copy, Download } from 'lucide-react';

const SafetyPlanPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [safetyPlan, setSafetyPlan] = useState({
    warningSigns: '',
    safeLocations: '',
    emergencyContacts: '',
    supportPeople: '',
    escapeRoutes: '',
    essentialItems: '',
    childrenPlan: '',
    petsPlan: '',
    legalDocuments: '',
    technology: '',
  });
  const [copiedField, setCopiedField] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setSafetyPlan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCopyText = (field: string) => {
    const text = safetyPlan[field as keyof typeof safetyPlan];
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

  const nextSection = () => {
    window.scrollTo(0, 0);
    setActiveSection((prev) => Math.min(prev + 1, 5));
  };

  const prevSection = () => {
    window.scrollTo(0, 0);
    setActiveSection((prev) => Math.max(prev - 1, 1));
  };

  const downloadSafetyPlan = () => {
    const planText = Object.entries(safetyPlan)
      .map(([key, value]) => {
        const title = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
        
        return `${title}:\n${value || 'Not specified'}\n\n`;
      })
      .join('');

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_safety_plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Create Your Safety Plan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A safety plan is a personalized, practical plan that can help you avoid dangerous situations and know how to react if you're in danger.
        </p>
      </div>

      {/* Safety Warning */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md shadow-sm mb-8">
        <div className="flex">
          <AlertTriangle size={24} className="text-amber-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Important Safety Notice</h3>
            <p className="text-gray-700">
              If you're concerned about someone monitoring your device, consider using a different device or the "Quick Exit" button at any time. Your safety plan is not saved on our servers unless you choose to download it.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {[
              { id: 1, name: 'Personal Safety' },
              { id: 2, name: 'Support Network' },
              { id: 3, name: 'Emergency Plan' },
              { id: 4, name: 'Children & Pets' },
              { id: 5, name: 'Review Plan' },
            ].map((step) => (
              <li key={step.id} className={`relative ${step.id === 1 ? '' : 'pl-6'} flex-1`}>
                <div className="flex items-center">
                  <button
                    onClick={() => setActiveSection(step.id)}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      step.id < activeSection
                        ? 'bg-blue-600'
                        : step.id === activeSection
                        ? 'border-2 border-blue-600 bg-white'
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                  >
                    {step.id < activeSection ? (
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <span
                        className={`text-sm ${
                          step.id === activeSection ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {step.id}
                      </span>
                    )}
                  </button>
                  {step.id !== 5 && (
                    <div
                      className={`absolute top-4 right-0 h-0.5 w-full ${
                        step.id < activeSection ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-xs font-medium text-gray-500">{step.name}</span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Form Sections */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {activeSection === 1 && (
          <div className="p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="mr-2 text-blue-600" size={24} />
              Personal Safety Strategies
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="warningSigns">
                  Warning signs to be aware of
                </label>
                <textarea
                  id="warningSigns"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What behaviors or situations indicate increased danger?"
                  value={safetyPlan.warningSigns}
                  onChange={(e) => handleInputChange('warningSigns', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Increased aggression, threats, controlling behavior, substance use
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="safeLocations">
                  Safe locations you can go to
                </label>
                <textarea
                  id="safeLocations"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Where can you go if you need to leave quickly?"
                  value={safetyPlan.safeLocations}
                  onChange={(e) => handleInputChange('safeLocations', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Friend's house, family member, shelter, police station, public place
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="technology">
                  Technology safety considerations
                </label>
                <textarea
                  id="technology"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can you protect your digital privacy and safety?"
                  value={safetyPlan.technology}
                  onChange={(e) => handleInputChange('technology', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Using private browsing, changing passwords, checking for tracking apps
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={nextSection}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition-colors"
              >
                Continue <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {activeSection === 2 && (
          <div className="p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="mr-2 text-blue-600" size={24} />
              Support Network
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="emergencyContacts">
                  Emergency contacts
                </label>
                <textarea
                  id="emergencyContacts"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Who can you call in an emergency? Include names and phone numbers."
                  value={safetyPlan.emergencyContacts}
                  onChange={(e) => handleInputChange('emergencyContacts', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Include local police: 999 0r 122, National DV Hotline: 0714667772, and trusted friends/family
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="supportPeople">
                  Support people you trust
                </label>
                <textarea
                  id="supportPeople"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Who knows about your situation and can help?"
                  value={safetyPlan.supportPeople}
                  onChange={(e) => handleInputChange('supportPeople', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Friend who can keep a spare key, neighbor who can call police, colleague who knows the situation
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevSection}
                className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-md transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextSection}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition-colors"
              >
                Continue <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {activeSection === 3 && (
          <div className="p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="mr-2 text-blue-600" size={24} />
              Emergency Plan
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="escapeRoutes">
                  Escape routes and transportation plans
                </label>
                <textarea
                  id="escapeRoutes"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How will you leave in an emergency? What transportation will you use?"
                  value={safetyPlan.escapeRoutes}
                  onChange={(e) => handleInputChange('escapeRoutes', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Exit doors, windows, stairs, car keys hidden, taxi services, public transportation
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="essentialItems">
                  Essential items to take with you
                </label>
                <textarea
                  id="essentialItems"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What important items should you take if you need to leave quickly?"
                  value={safetyPlan.essentialItems}
                  onChange={(e) => handleInputChange('essentialItems', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: ID, birth certificate, passport, medications, money, phone, charger, clothes, children's items
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="legalDocuments">
                  Important legal documents
                </label>
                <textarea
                  id="legalDocuments"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What documents do you need to keep safe or copies of?"
                  value={safetyPlan.legalDocuments}
                  onChange={(e) => handleInputChange('legalDocuments', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Protective orders, custody papers, social security cards, insurance information, bank account details
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevSection}
                className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-md transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextSection}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition-colors"
              >
                Continue <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {activeSection === 4 && (
          <div className="p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="mr-2 text-blue-600" size={24} />
              Children and Pets Plans
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="childrenPlan">
                  Safety planning for children
                </label>
                <textarea
                  id="childrenPlan"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How will you ensure your children's safety? What should they know?"
                  value={safetyPlan.childrenPlan}
                  onChange={(e) => handleInputChange('childrenPlan', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Code words, how to call 999, where to go, what to take, who to trust, school safety plans
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="petsPlan">
                  Safety planning for pets
                </label>
                <textarea
                  id="petsPlan"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Do you have pets that need protection? How will you care for them?"
                  value={safetyPlan.petsPlan}
                  onChange={(e) => handleInputChange('petsPlan', e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Pet-friendly shelters, friends who can take pets, veterinary records, food and medication needs
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevSection}
                className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-md transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextSection}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition-colors"
              >
                Review Plan <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {activeSection === 5 && (
          <div className="p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="mr-2 text-blue-600" size={24} />
              Your Safety Plan
            </h2>

            <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-100">
              <div className="flex items-center mb-2">
                <AlertTriangle size={20} className="text-blue-600 mr-2" />
                <h3 className="font-medium text-gray-800">Privacy Notice</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Your safety plan is not stored on our servers. To save it, use the download button below. Consider storing it in a safe location that your abuser cannot access.
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(safetyPlan).map(([key, value]) => {
                if (!value) return null;
                
                const title = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase());
                
                return (
                  <div key={key} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">{title}</h3>
                      <button
                        onClick={() => handleCopyText(key)}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                        aria-label={`Copy ${title}`}
                      >
                        {copiedField === key ? (
                          <>
                            <Check size={16} className="mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{value}</p>
                  </div>
                );
              })}
              
              {Object.values(safetyPlan).every(value => !value) && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't added any information to your safety plan yet.</p>
                  <button
                    onClick={() => setActiveSection(1)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Go back to start creating your plan
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevSection}
                className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-md transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={downloadSafetyPlan}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition-colors"
                disabled={Object.values(safetyPlan).every(value => !value)}
              >
                <Download size={16} className="mr-2" />
                Download Safety Plan
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tips and Resources */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Safety Planning Tips</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>Keep your safety plan in a safe place that your abuser cannot access.</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>Review and update your safety plan regularly as your situation changes.</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>Share relevant parts of your plan with trusted people who can help.</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>Practice your escape plan if it's safe to do so.</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>Remember that your safety is the priority - trust your instincts.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SafetyPlanPage;