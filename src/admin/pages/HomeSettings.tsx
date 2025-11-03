import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import Notification from '../components/Notification';

interface ContentSection {
  id: string;
  enabled: boolean;
  title: string;
  description: string;
  image: string;
  imagePosition: 'left' | 'right';
  backgroundColor: 'white' | 'ivory';
}

interface HomeConfig {
  hero: {
    enabled: boolean;
    backgroundImage: string;
    title: string;
    showSeparator: boolean;
  };
  introduction: {
    enabled: boolean;
    text: string;
  };
  sections: ContentSection[];
}

const HomeSettings = () => {
  const [config, setConfig] = useState<HomeConfig>({
    hero: {
      enabled: true,
      backgroundImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
      title: 'Trusted Development, Built to Last',
      showSeparator: true,
    },
    introduction: {
      enabled: true,
      text: 'With decades of combined experience, Kulana Development partners with investors, builders, and architects to transform concepts into high-performing assets. From feasibility and design to construction and delivery, we manage each stage with precision, integrity, and a commitment to long-term value.',
    },
    sections: [
      {
        id: 'what-we-deliver',
        enabled: true,
        title: 'What We Deliver',
        description: 'From Feasibility to Turnkey Delivery, we manage entitlements, design coordination, procurement, and site execution—one accountable team focused on outcomes that endure and schedule health checks keep your project on time, on spec, and built to last.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        imagePosition: 'left',
        backgroundColor: 'white',
      },
      {
        id: 'how-we-build',
        enabled: true,
        title: 'How We Build - The Kulana Way',
        description: 'Results You Can Measure — Milestone gates, cost tracking, and schedule health checks keep your project on time, on spec, and built to last.',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
        imagePosition: 'right',
        backgroundColor: 'ivory',
      },
      {
        id: 'culture',
        enabled: true,
        title: 'A Culture Built to Last',
        description: 'Lessons learned feed every new project—so each delivery is stronger than the last. We put people first—safety, respect, and accountability—that\'s how quality, schedule, and budget follow.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
        imagePosition: 'left',
        backgroundColor: 'white',
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getConfig('home');
      
      if (response.success && response.data?.value) {
        setConfig(response.data.value);
      } else {
        console.log('No home config found, using default config');
      }
    } catch (error) {
      console.error('Error fetching home config:', error);
      setNotification({ type: 'error', message: 'Failed to load home settings. Using default configuration.' });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Add delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await apiService.updateConfig('home', config);
      
      if (response.success) {
        setNotification({ type: 'success', message: 'Home settings saved successfully!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(response.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving home config:', error);
      setNotification({ type: 'error', message: 'Failed to save home settings' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (section: 'hero' | 'introduction', field: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field as keyof typeof prev[typeof section]],
      },
    }));
  };

  const handleInputChange = (section: 'hero' | 'introduction', field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSectionToggle = (index: number, field: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, [field]: !section[field as keyof ContentSection] } : section
      ),
    }));
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading home settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Home Page Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Hero Section Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Hero Section</h2>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={config.hero.enabled}
                onChange={() => handleToggle('hero', 'enabled')}
                className="sr-only"
              />
              <div className={`block w-14 h-8 rounded-full ${config.hero.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${config.hero.enabled ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {config.hero.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>

        {config.hero.enabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Background Image URL
              </label>
              <input
                type="url"
                value={config.hero.backgroundImage}
                onChange={(e) => handleInputChange('hero', 'backgroundImage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/hero-image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Main Title
              </label>
              <input
                type="text"
                value={config.hero.title}
                onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Trusted Development, Built to Last"
              />
            </div>

            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.hero.showSeparator}
                  onChange={() => handleToggle('hero', 'showSeparator')}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Show gold separator bar below title
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Introduction Section Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Introduction / About Section</h2>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={config.introduction.enabled}
                onChange={() => handleToggle('introduction', 'enabled')}
                className="sr-only"
              />
              <div className={`block w-14 h-8 rounded-full ${config.introduction.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${config.introduction.enabled ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {config.introduction.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>

        {config.introduction.enabled && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Introduction Text
            </label>
            <textarea
              value={config.introduction.text}
              onChange={(e) => handleInputChange('introduction', 'text', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={5}
              placeholder="With decades of combined experience..."
            />
          </div>
        )}
      </div>

      {/* Content Sections */}
      {config.sections.map((section, index) => (
        <div key={section.id} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Section: {section.title}</h2>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={section.enabled}
                  onChange={() => handleSectionToggle(index, 'enabled')}
                  className="sr-only"
                />
                <div className={`block w-14 h-8 rounded-full ${section.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${section.enabled ? 'transform translate-x-6' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {section.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>

          {section.enabled && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What We Deliver"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={section.description}
                  onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Section description..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={section.image}
                  onChange={(e) => handleSectionChange(index, 'image', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/section-image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image Position
                  </label>
                  <select
                    value={section.imagePosition}
                    onChange={(e) => handleSectionChange(index, 'imagePosition', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Background Color
                  </label>
                  <select
                    value={section.backgroundColor}
                    onChange={(e) => handleSectionChange(index, 'backgroundColor', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="white">White</option>
                    <option value="ivory">Ivory</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeSettings;
