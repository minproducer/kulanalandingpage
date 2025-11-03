import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import Notification from '../components/Notification';

interface PageConfig {
  home: boolean;
  team: boolean;
  projects: boolean;
  faq: boolean;
}

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

const PageSettings = () => {
  const [config, setConfig] = useState<PageConfig>({
    home: true,
    team: true,
    projects: true,
    faq: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getConfig('page_settings');
      if (response.data?.value) {
        setConfig(response.data.value);
      }
    } catch (error) {
      console.error('Error fetching page settings:', error);
      showNotification('Failed to load page settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  const handleToggle = (page: keyof PageConfig) => {
    setConfig((prev) => ({
      ...prev,
      [page]: !prev[page],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await apiService.updateConfig('page_settings', config);
      
      setTimeout(() => {
        setSaving(false);
        showNotification('Page settings saved successfully!', 'success');
      }, 1500);
    } catch (error) {
      console.error('Error saving page settings:', error);
      setSaving(false);
      showNotification('Failed to save page settings', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-text-primary mb-2">
          Page Visibility Settings
        </h1>
        <p className="text-text-secondary">
          Control which pages are visible on your website. Disabled pages will be hidden from navigation and inaccessible.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
        <div className="space-y-6">
          {/* Home Page Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-text-primary mb-1">Home Page</h3>
              <p className="text-sm text-text-secondary">
                Main landing page with hero section and content
              </p>
            </div>
            <button
              onClick={() => handleToggle('home')}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ${
                config.home ? 'bg-gold' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                  config.home ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Team Page Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-text-primary mb-1">Management Team Page</h3>
              <p className="text-sm text-text-secondary">
                Team member profiles and information
              </p>
            </div>
            <button
              onClick={() => handleToggle('team')}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ${
                config.team ? 'bg-gold' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                  config.team ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Projects Page Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-text-primary mb-1">Projects Page</h3>
              <p className="text-sm text-text-secondary">
                Portfolio of completed and ongoing projects
              </p>
            </div>
            <button
              onClick={() => handleToggle('projects')}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ${
                config.projects ? 'bg-gold' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                  config.projects ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* FAQ Page Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-text-primary mb-1">FAQ Page</h3>
              <p className="text-sm text-text-secondary">
                Frequently asked questions and answers
              </p>
            </div>
            <button
              onClick={() => handleToggle('faq')}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ${
                config.faq ? 'bg-gold' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                  config.faq ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Warning Message */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex">
            <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-yellow-800 mb-1">Important Note</p>
              <p className="text-sm text-yellow-700">
                Disabling a page will hide it from the navigation menu and quick links. Users trying to access the page directly will see a 404 error.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-gold text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageSettings;
