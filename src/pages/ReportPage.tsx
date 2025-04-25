import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react';

const ReportPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showIdentityOptions, setShowIdentityOptions] = useState(false);
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDescription: '',
    incidentDate: '',
    incidentLocation: '',
    shareWithPolice: false,
    shareWithServices: false,
    contactBack: false,
    contactMethod: 'email',
    contactDetails: '',
    additionalInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the report to a secure database
    console.log('Report submitted:', formData);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Anonymous Reporting</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Share your experience safely and confidentially. You control what information is shared and with whom.
        </p>
      </div>

      {!submitted ? (
        <>
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    1
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className={`font-semibold ${step === 1 ? 'text-blue-600' : 'text-gray-700'}`}>
                    Incident Details
                  </h2>
                </div>
              </div>
              <div className="h-0.5 bg-gray-200 mb-4">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: step >= 2 ? '100%' : '0%' }}
                ></div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className={`font-semibold ${step === 2 ? 'text-blue-600' : 'text-gray-700'}`}>
                    Information Sharing
                  </h2>
                </div>
              </div>
              <div className="h-0.5 bg-gray-200 mb-4">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: step >= 3 ? '100%' : '0%' }}
                ></div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    3
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className={`font-semibold ${step === 3 ? 'text-blue-600' : 'text-gray-700'}`}>
                    Review & Submit
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4">Incident Information</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="incidentType">
                    Type of Incident*
                  </label>
                  <select 
                    id="incidentType" 
                    name="incidentType" 
                    value={formData.incidentType}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select type...</option>
                    <option value="physical">Physical Abuse</option>
                    <option value="emotional">Emotional/Verbal Abuse</option>
                    <option value="sexual">Sexual Abuse</option>
                    <option value="financial">Financial Abuse</option>
                    <option value="stalking">Stalking/Harassment</option>
                    <option value="digital">Digital/Cyber Abuse</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="incidentDescription">
                    Description of Incident*
                  </label>
                  <textarea 
                    id="incidentDescription" 
                    name="incidentDescription" 
                    value={formData.incidentDescription}
                    onChange={handleChange}
                    required
                    rows={5} 
                    placeholder="Please describe what happened..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="incidentDate">
                      Date of Incident
                    </label>
                    <input 
                      type="date" 
                      id="incidentDate" 
                      name="incidentDate" 
                      value={formData.incidentDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="incidentLocation">
                      Location (Optional)
                    </label>
                    <input 
                      type="text" 
                      id="incidentLocation" 
                      name="incidentLocation" 
                      value={formData.incidentLocation}
                      onChange={handleChange}
                      placeholder="City, State, or Address"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4">Information Sharing Preferences</h2>
                
                <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                  <div className="flex items-center mb-2">
                    <Shield size={20} className="text-blue-600 mr-2" />
                    <h3 className="font-medium text-gray-800">Your Privacy Controls</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You control how your information is shared. All reports are encrypted and stored securely.
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Identity Protection</h3>
                    <button
                      type="button"
                      onClick={() => setShowIdentityOptions(!showIdentityOptions)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      {showIdentityOptions ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                      {showIdentityOptions ? "Hide Options" : "Show Options"}
                    </button>
                  </div>
                  
                  {showIdentityOptions ? (
                    <div className="bg-gray-50 p-4 rounded-md space-y-4 animate-fadeIn">
                      <p className="text-sm text-gray-600">
                        You can choose to share your contact information for follow-up support, or remain completely anonymous.
                      </p>
                      
                      <div className="mb-4">
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            name="contactBack"
                            checked={formData.contactBack}
                            onChange={handleCheckboxChange}
                            className="mt-1 mr-2"
                          />
                          <span className="text-gray-700">
                            I would like to be contacted about this report (optional)
                          </span>
                        </label>
                      </div>
                      
                      {formData.contactBack && (
                        <div className="space-y-4 pl-6">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">
                              Preferred contact method
                            </label>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="contactMethod"
                                  value="email"
                                  checked={formData.contactMethod === 'email'}
                                  onChange={handleChange}
                                  className="mr-2"
                                />
                                <span className="text-gray-700">Email</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="contactMethod"
                                  value="phone"
                                  checked={formData.contactMethod === 'phone'}
                                  onChange={handleChange}
                                  className="mr-2"
                                />
                                <span className="text-gray-700">Phone</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="contactMethod"
                                  value="text"
                                  checked={formData.contactMethod === 'text'}
                                  onChange={handleChange}
                                  className="mr-2"
                                />
                                <span className="text-gray-700">Text Message</span>
                              </label>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="contactDetails">
                              Contact details
                            </label>
                            <input
                              type="text"
                              id="contactDetails"
                              name="contactDetails"
                              value={formData.contactDetails}
                              onChange={handleChange}
                              placeholder={
                                formData.contactMethod === 'email'
                                  ? 'Your email address'
                                  : 'Your phone number'
                              }
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Click "Show Options" to set your identity preferences.
                    </p>
                  )}
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Share this report with:</h3>
                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="shareWithPolice"
                        checked={formData.shareWithPolice}
                        onChange={handleCheckboxChange}
                        className="mt-1 mr-2"
                      />
                      <div>
                        <span className="text-gray-700 font-medium">Law Enforcement</span>
                        <p className="text-sm text-gray-500">
                          This information may be shared with appropriate police departments.
                        </p>
                      </div>
                    </label>
                    
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="shareWithServices"
                        checked={formData.shareWithServices}
                        onChange={handleCheckboxChange}
                        className="mt-1 mr-2"
                      />
                      <div>
                        <span className="text-gray-700 font-medium">Support Services</span>
                        <p className="text-sm text-gray-500">
                          This information may be shared with domestic violence advocates and support organizations.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="additionalInfo">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Is there anything else you'd like to share?"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-md transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Review Report
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4">Review Your Report</h2>
                
                <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                  <div className="flex items-center mb-2">
                    <AlertTriangle size={20} className="text-amber-600 mr-2" />
                    <h3 className="font-medium text-gray-800">Before You Submit</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Please review your report details carefully. Once submitted, you'll receive a confirmation with a report number for your records.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Incident Type</h3>
                    <p className="text-gray-800">{formData.incidentType || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                    <p className="text-gray-800 whitespace-pre-line">{formData.incidentDescription || 'Not provided'}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                      <p className="text-gray-800">{formData.incidentDate || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                      <p className="text-gray-800">{formData.incidentLocation || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Sharing Preferences</h3>
                    <ul className="list-disc list-inside text-gray-800">
                      {formData.shareWithPolice && <li>Share with law enforcement</li>}
                      {formData.shareWithServices && <li>Share with support services</li>}
                      {!formData.shareWithPolice && !formData.shareWithServices && (
                        <li>Not sharing with any services (anonymous report only)</li>
                      )}
                    </ul>
                  </div>
                  
                  {formData.contactBack && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h3>
                      <p className="text-gray-800">
                        {formData.contactMethod}: {formData.contactDetails}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-gray-600 hover:text-gray-800 px-6 py-2 rounded-md transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </form>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center transition-all duration-300">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={32} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Thank you for sharing your experience. Your report has been received and will be handled with the highest level of confidentiality.
          </p>
          <div className="mb-8 bg-blue-50 p-4 rounded-md border border-blue-100 max-w-md mx-auto">
            <p className="text-gray-700 font-medium">Your Report Reference Number</p>
            <p className="text-xl font-bold text-blue-600 mt-1">DV-{Math.floor(100000 + Math.random() * 900000)}</p>
            <p className="text-sm text-gray-500 mt-2">
              Please save this number for your records.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Return to Home
            </a>
            <a
              href="/resources"
              className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Find Support Resources
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPage;