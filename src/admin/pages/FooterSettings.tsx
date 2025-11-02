import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService, isAuthenticated } from '../../services/apiService';

interface FooterConfig {
  sections: {
    companyInfo: { enabled: boolean };
    navigation: { enabled: boolean };
    contact: { enabled: boolean };
    social: { enabled: boolean };
  };
  copyright: { enabled: boolean };
}

const FooterSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<FooterConfig | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    fetchConfig();
  }, [navigate]);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await apiService.getConfig('footer');
      
      if (response.success) {
        setConfig(response.data.value);
      } else {
        setMessage({ type: 'error', text: 'Failed to load config' });
      }
    } catch (error) {
      console.error('Error fetching config:', error);
      setMessage({ type: 'error', text: 'Error loading configuration' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (section: keyof FooterConfig['sections'] | 'copyright') => {
    if (!config) return;

    const newConfig = { ...config };
    
    if (section === 'copyright') {
      newConfig.copyright.enabled = !newConfig.copyright.enabled;
    } else {
      newConfig.sections[section].enabled = !newConfig.sections[section].enabled;
    }
    
    setConfig(newConfig);
  };

  const handleSave = async () => {
    if (!config) return;

    try {
      setSaving(true);
      setMessage(null);
      
      const response = await apiService.updateConfig('footer', config);
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Footer settings saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage({ type: 'error', text: 'Error saving configuration' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="font-sans text-text-secondary">Loading configuration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">Failed to load configuration</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-text-primary mb-2">
          Footer Settings
        </h1>
        <p className="font-sans text-text-secondary">
          Manage footer sections visibility and content
        </p>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Footer Sections */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="font-serif text-2xl font-bold text-text-primary mb-6">
          Footer Sections
        </h2>

        <div className="space-y-4">
          {/* Company Info */}
          <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gold transition-colors">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary">Company Info</p>
                <p className="font-sans text-sm text-text-secondary">Logo and description</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={config.sections.companyInfo.enabled}
                onChange={() => handleToggle('companyInfo')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gold transition-colors">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary">Navigation</p>
                <p className="font-sans text-sm text-text-secondary">Quick links menu</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={config.sections.navigation.enabled}
                onChange={() => handleToggle('navigation')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gold transition-colors">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary">Contact</p>
                <p className="font-sans text-sm text-text-secondary">Email, phone, location</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={config.sections.contact.enabled}
                onChange={() => handleToggle('contact')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          {/* Social */}
          <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gold transition-colors">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary">Social Media</p>
                <p className="font-sans text-sm text-text-secondary">Social media links</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={config.sections.social.enabled}
                onChange={() => handleToggle('social')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gold transition-colors">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary">Copyright</p>
                <p className="font-sans text-sm text-text-secondary">Copyright notice</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={config.copyright.enabled}
                onChange={() => handleToggle('copyright')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="font-serif text-2xl font-bold text-text-primary mb-4">
          Preview
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
          <p className="font-sans text-sm text-text-secondary text-center">
            Preview will be visible on the public website after saving
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="font-sans">
              <span className="font-semibold">Enabled sections:</span>{' '}
              {[
                config.sections.companyInfo.enabled && 'Company Info',
                config.sections.navigation.enabled && 'Navigation',
                config.sections.contact.enabled && 'Contact',
                config.sections.social.enabled && 'Social',
                config.copyright.enabled && 'Copyright'
              ].filter(Boolean).join(', ') || 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-6 py-3 text-sm font-accent font-medium text-gold hover:text-gold-light transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview on Website
        </a>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold hover:bg-gold-light text-white font-accent font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default FooterSettings;
