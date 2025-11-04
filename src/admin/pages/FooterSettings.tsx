import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService, isAuthenticated } from '../../services/apiService';
import ImageUploadField from '../components/ImageUploadField';
import { useApp } from '../contexts/useApp';
import { translations } from '../locales/translations';

interface FooterConfig {
  sections: {
    companyInfo: {
      enabled: boolean;
      description?: string;
      logoUrl?: string;
    };
    navigation: {
      enabled: boolean;
      title?: string;
      links?: Array<{ name: string; path: string }>;
    };
    contact: {
      enabled: boolean;
      title?: string;
      email?: string;
      phone?: string;
      location?: string;
    };
    social: {
      enabled: boolean;
      title?: string;
      platforms?: {
        email?: { enabled: boolean; value: string };
        linkedin?: { enabled: boolean; username: string };
        facebook?: { enabled: boolean; username: string };
        twitter?: { enabled: boolean; username: string };
        instagram?: { enabled: boolean; username: string };
        youtube?: { enabled: boolean; username: string };
      };
    };
  };
  copyright: {
    enabled: boolean;
    text?: string;
    year?: number;
  };
}

const FooterSettings = () => {
  const { language } = useApp();
  const t = translations[language];
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

  const handleTextChange = (section: string, field: string, value: string | number) => {
    if (!config) return;

    setConfig(prev => {
      if (!prev) return prev;
      const newConfig = JSON.parse(JSON.stringify(prev));
      
      if (section === 'copyright') {
        newConfig.copyright[field] = value;
      } else if (section in newConfig.sections) {
        if (!newConfig.sections[section as keyof typeof newConfig.sections][field as never]) {
          newConfig.sections[section as keyof typeof newConfig.sections][field as never] = value as never;
        } else {
          newConfig.sections[section as keyof typeof newConfig.sections][field as never] = value as never;
        }
      }
      
      return newConfig;
    });
  };

  const handleSave = async () => {
    if (!config) return;

    try {
      setSaving(true);
      setMessage(null);
      
      // Add 1.5 second delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await apiService.updateConfig('footer', config);
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Footer settings saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to save settings' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage({ type: 'error', text: 'Error saving configuration' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="font-sans text-gray-700 dark:text-gray-300">Loading configuration...</p>
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
    <div className="relative">
      {/* Notification Popup */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 max-w-md w-full transform transition-all duration-300 ease-in-out ${
          message ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className={`rounded-lg shadow-lg p-4 flex items-start gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border-l-4 border-green-500' 
              : 'bg-red-50 border-l-4 border-red-500'
          }`}>
            {message.type === 'success' ? (
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <div className="flex-1">
              <p className={`font-semibold ${
                message.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {message.type === 'success' ? 'Success!' : 'Error!'}
              </p>
              <p className={`text-sm mt-1 ${
                message.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {message.text}
              </p>
            </div>
            <button
              onClick={() => setMessage(null)}
              className={`flex-shrink-0 ${
                message.type === 'success' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t.footer.title}
        </h1>
        <p className="font-sans text-gray-700 dark:text-gray-300">
          {language === 'en' ? 'Manage footer sections visibility and content' : 'Quản lý các phần footer'}
        </p>
      </div>

      {/* Footer Sections */}
      <div className="space-y-6">
        {/* Company Info Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-gray-900 dark:text-white text-lg">Company Info</p>
                <p className="font-sans text-sm text-gray-700 dark:text-gray-300">Logo and company description</p>
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
          
          {config.sections.companyInfo.enabled && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
              {/* Logo Upload */}
              <div>
                <label className="block mb-2">
                  <ImageUploadField
                    label="Company Logo"
                    value={config.sections.companyInfo.logoUrl || ''}
                    onChange={(url) => {
                      const newConfig = {
                        ...config,
                        sections: {
                          ...config.sections,
                          companyInfo: {
                            ...config.sections.companyInfo,
                            logoUrl: url
                          }
                        }
                      };
                      setConfig(newConfig);
                    }}
                    disabled={saving}
                    description="Recommended size: 200x80px. Supports PNG, JPG, SVG."
                  />
                </label>
              </div>

              {/* Description */}
              <label className="block">
                <span className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Description</span>
                <textarea
                  value={config.sections.companyInfo.description || ''}
                  onChange={(e) => handleTextChange('companyInfo', 'description', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition resize-none"
                  rows={3}
                  placeholder="Enter company description..."
                />
              </label>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-gray-900 dark:text-white text-lg">Navigation</p>
                <p className="font-sans text-sm text-gray-700 dark:text-gray-300">Quick links menu</p>
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
          
          {config.sections.navigation.enabled && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-accent text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Note: Navigation links are managed in the code. You can only toggle visibility here.
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Current links: Home, Projects, Management Team, FAQ
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-gray-900 dark:text-white text-lg">Contact</p>
                <p className="font-sans text-sm text-gray-700 dark:text-gray-300">Email, phone, and location</p>
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
          
          {config.sections.contact.enabled && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <label className="block">
                <span className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Title</span>
                <input
                  type="text"
                  value={config.sections.contact.title || ''}
                  onChange={(e) => handleTextChange('contact', 'title', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Contact"
                />
              </label>
              <label className="block">
                <span className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Email</span>
                <input
                  type="email"
                  value={config.sections.contact.email || ''}
                  onChange={(e) => handleTextChange('contact', 'email', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="info@example.com"
                />
              </label>
              <label className="block">
                <span className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Phone</span>
                <input
                  type="tel"
                  value={config.sections.contact.phone || ''}
                  onChange={(e) => handleTextChange('contact', 'phone', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="(555) 123-4567"
                />
              </label>
              <label className="block">
                <span className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Location</span>
                <input
                  type="text"
                  value={config.sections.contact.location || ''}
                  onChange={(e) => handleTextChange('contact', 'location', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Texas & Southeast"
                />
              </label>
            </div>
          )}
        </div>

        {/* Social Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-gray-900 dark:text-white text-lg">Social Media</p>
                <p className="font-sans text-sm text-gray-700 dark:text-gray-300">Social media links</p>
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
          
          {config.sections.social.enabled && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
              <label className="block">
                <span className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Title</span>
                <input
                  type="text"
                  value={config.sections.social.title || ''}
                  onChange={(e) => handleTextChange('social', 'title', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Follow Us"
                />
              </label>

              <div className="space-y-4">
                <p className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Social Media Platforms</p>
                
                {/* Email */}
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={config.sections.social.platforms?.email?.enabled || false}
                    onChange={(e) => {
                      const newConfig = JSON.parse(JSON.stringify(config));
                      if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                      if (!newConfig.sections.social.platforms.email) newConfig.sections.social.platforms.email = { enabled: false, value: '' };
                      newConfig.sections.social.platforms.email.enabled = e.target.checked;
                      setConfig(newConfig);
                    }}
                    className="mt-1 w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">📧 Email</label>
                    <input
                      type="email"
                      value={config.sections.social.platforms?.email?.value || ''}
                      onChange={(e) => {
                        const newConfig = JSON.parse(JSON.stringify(config));
                        if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                        if (!newConfig.sections.social.platforms.email) newConfig.sections.social.platforms.email = { enabled: true, value: '' };
                        newConfig.sections.social.platforms.email.value = e.target.value;
                        setConfig(newConfig);
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                      placeholder="info@example.com"
                      disabled={!config.sections.social.platforms?.email?.enabled}
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={config.sections.social.platforms?.linkedin?.enabled || false}
                    onChange={(e) => {
                      const newConfig = JSON.parse(JSON.stringify(config));
                      if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                      if (!newConfig.sections.social.platforms.linkedin) newConfig.sections.social.platforms.linkedin = { enabled: false, username: '' };
                      newConfig.sections.social.platforms.linkedin.enabled = e.target.checked;
                      setConfig(newConfig);
                    }}
                    className="mt-1 w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">💼 LinkedIn</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">linkedin.com/company/</span>
                      <input
                        type="text"
                        value={config.sections.social.platforms?.linkedin?.username || ''}
                        onChange={(e) => {
                          const newConfig = JSON.parse(JSON.stringify(config));
                          if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                          if (!newConfig.sections.social.platforms.linkedin) newConfig.sections.social.platforms.linkedin = { enabled: true, username: '' };
                          newConfig.sections.social.platforms.linkedin.username = e.target.value;
                          setConfig(newConfig);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                        placeholder="yourcompany"
                        disabled={!config.sections.social.platforms?.linkedin?.enabled}
                      />
                    </div>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={config.sections.social.platforms?.facebook?.enabled || false}
                    onChange={(e) => {
                      const newConfig = JSON.parse(JSON.stringify(config));
                      if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                      if (!newConfig.sections.social.platforms.facebook) newConfig.sections.social.platforms.facebook = { enabled: false, username: '' };
                      newConfig.sections.social.platforms.facebook.enabled = e.target.checked;
                      setConfig(newConfig);
                    }}
                    className="mt-1 w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">📘 Facebook</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">facebook.com/</span>
                      <input
                        type="text"
                        value={config.sections.social.platforms?.facebook?.username || ''}
                        onChange={(e) => {
                          const newConfig = JSON.parse(JSON.stringify(config));
                          if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                          if (!newConfig.sections.social.platforms.facebook) newConfig.sections.social.platforms.facebook = { enabled: true, username: '' };
                          newConfig.sections.social.platforms.facebook.username = e.target.value;
                          setConfig(newConfig);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                        placeholder="yourpage"
                        disabled={!config.sections.social.platforms?.facebook?.enabled}
                      />
                    </div>
                  </div>
                </div>

                {/* Twitter/X */}
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={config.sections.social.platforms?.twitter?.enabled || false}
                    onChange={(e) => {
                      const newConfig = JSON.parse(JSON.stringify(config));
                      if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                      if (!newConfig.sections.social.platforms.twitter) newConfig.sections.social.platforms.twitter = { enabled: false, username: '' };
                      newConfig.sections.social.platforms.twitter.enabled = e.target.checked;
                      setConfig(newConfig);
                    }}
                    className="mt-1 w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">🐦 Twitter/X</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">twitter.com/</span>
                      <input
                        type="text"
                        value={config.sections.social.platforms?.twitter?.username || ''}
                        onChange={(e) => {
                          const newConfig = JSON.parse(JSON.stringify(config));
                          if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                          if (!newConfig.sections.social.platforms.twitter) newConfig.sections.social.platforms.twitter = { enabled: true, username: '' };
                          newConfig.sections.social.platforms.twitter.username = e.target.value;
                          setConfig(newConfig);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                        placeholder="yourhandle"
                        disabled={!config.sections.social.platforms?.twitter?.enabled}
                      />
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={config.sections.social.platforms?.instagram?.enabled || false}
                    onChange={(e) => {
                      const newConfig = JSON.parse(JSON.stringify(config));
                      if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                      if (!newConfig.sections.social.platforms.instagram) newConfig.sections.social.platforms.instagram = { enabled: false, username: '' };
                      newConfig.sections.social.platforms.instagram.enabled = e.target.checked;
                      setConfig(newConfig);
                    }}
                    className="mt-1 w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">📷 Instagram</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">instagram.com/</span>
                      <input
                        type="text"
                        value={config.sections.social.platforms?.instagram?.username || ''}
                        onChange={(e) => {
                          const newConfig = JSON.parse(JSON.stringify(config));
                          if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                          if (!newConfig.sections.social.platforms.instagram) newConfig.sections.social.platforms.instagram = { enabled: true, username: '' };
                          newConfig.sections.social.platforms.instagram.username = e.target.value;
                          setConfig(newConfig);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                        placeholder="youraccount"
                        disabled={!config.sections.social.platforms?.instagram?.enabled}
                      />
                    </div>
                  </div>
                </div>

                {/* YouTube */}
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={config.sections.social.platforms?.youtube?.enabled || false}
                    onChange={(e) => {
                      const newConfig = JSON.parse(JSON.stringify(config));
                      if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                      if (!newConfig.sections.social.platforms.youtube) newConfig.sections.social.platforms.youtube = { enabled: false, username: '' };
                      newConfig.sections.social.platforms.youtube.enabled = e.target.checked;
                      setConfig(newConfig);
                    }}
                    className="mt-1 w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">📺 YouTube</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">youtube.com/@</span>
                      <input
                        type="text"
                        value={config.sections.social.platforms?.youtube?.username || ''}
                        onChange={(e) => {
                          const newConfig = JSON.parse(JSON.stringify(config));
                          if (!newConfig.sections.social.platforms) newConfig.sections.social.platforms = {};
                          if (!newConfig.sections.social.platforms.youtube) newConfig.sections.social.platforms.youtube = { enabled: true, username: '' };
                          newConfig.sections.social.platforms.youtube.username = e.target.value;
                          setConfig(newConfig);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                        placeholder="yourchannel"
                        disabled={!config.sections.social.platforms?.youtube?.enabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Copyright Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-gray-900 dark:text-white text-lg">Copyright</p>
                <p className="font-sans text-sm text-gray-700 dark:text-gray-300">Copyright notice text</p>
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
          
          {config.copyright.enabled && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <label className="block">
                <span className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Year</span>
                <input
                  type="number"
                  value={config.copyright.year || new Date().getFullYear()}
                  onChange={(e) => handleTextChange('copyright', 'year', parseInt(e.target.value))}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="2025"
                  min="2000"
                  max="2099"
                />
              </label>
              <label className="block">
                <span className="font-accent text-sm font-semibold text-gray-900 dark:text-white">Copyright Text</span>
                <input
                  type="text"
                  value={config.copyright.text || ''}
                  onChange={(e) => handleTextChange('copyright', 'text', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Kulana Development"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between mt-8">
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
          className="bg-gold hover:bg-gold-light text-white font-accent font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {saving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FooterSettings;


