import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import Notification from '../components/Notification';
import ImageUploadField from '../components/ImageUploadField';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQConfig {
  hero: {
    enabled: boolean;
    backgroundImage: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  categoryFilter: {
    enabled: boolean;
    showAllOption: boolean;
  };
  faqs: {
    enabled: boolean;
    showCategoryBadges: boolean;
  };
  faqItems: FAQItem[];
}

const FAQSettings = () => {
  const [config, setConfig] = useState<FAQConfig>({
    hero: {
      enabled: true,
      backgroundImage: '',
      title: 'FAQ',
      titleHighlight: 'FAQ',
      subtitle: '',
    },
    categoryFilter: {
      enabled: true,
      showAllOption: true,
    },
    faqs: {
      enabled: true,
      showCategoryBadges: true,
    },
    faqItems: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // FAQ Item editing
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [faqFormData, setFaqFormData] = useState({
    id: 0,
    question: '',
    answer: '',
    category: '',
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getConfig('faq');
      
      if (response.success && response.data?.value) {
        setConfig(response.data.value);
      } else {
        // If no config exists, keep default config
        console.log('No FAQ config found, using default config');
      }
    } catch (error) {
      console.error('Error fetching FAQ config:', error);
      setNotification({ type: 'error', message: 'Failed to load FAQ settings. Please run reset-faq-config.sql first.' });
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

      const response = await apiService.updateConfig('faq', config);
      
      if (response.success) {
        setNotification({ type: 'success', message: 'FAQ settings saved successfully!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(response.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving FAQ config:', error);
      setNotification({ type: 'error', message: 'Failed to save FAQ settings' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (section: string, field: string) => {
    setConfig(prev => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sectionData = prev[section as keyof FAQConfig] as any;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: !sectionData[field],
        },
      };
    });
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FAQConfig],
        [field]: value,
      },
    }));
  };

  // FAQ Item Management
  const handleAddNew = () => {
    setIsAddingNew(true);
    setFaqFormData({
      id: Date.now(),
      question: '',
      answer: '',
      category: '',
    });
  };

  const handleEditFAQ = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setFaqFormData({ ...faq });
  };

  const handleCancelEdit = () => {
    setEditingFAQ(null);
    setIsAddingNew(false);
    setFaqFormData({
      id: 0,
      question: '',
      answer: '',
      category: '',
    });
  };

  const handleFaqInputChange = (field: string, value: string) => {
    setFaqFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveFAQ = async () => {
    // Validation
    if (!faqFormData.question || !faqFormData.answer || !faqFormData.category) {
      setNotification({ type: 'error', message: 'Please fill in all FAQ fields (Question, Answer, Category)' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      setSaving(true);
      
      // Add delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      let updatedItems: FAQItem[];
      
      if (isAddingNew) {
        // Add new FAQ
        updatedItems = [...config.faqItems, faqFormData];
      } else {
        // Update existing FAQ
        updatedItems = config.faqItems.map(item => 
          item.id === faqFormData.id ? faqFormData : item
        );
      }

      const updatedConfig = { ...config, faqItems: updatedItems };
      const response = await apiService.updateConfig('faq', updatedConfig);
      
      if (response.success) {
        setConfig(updatedConfig);
        setNotification({ type: 'success', message: `FAQ ${isAddingNew ? 'added' : 'updated'} successfully!` });
        setTimeout(() => setNotification(null), 3000);
        handleCancelEdit();
      } else {
        throw new Error(response.message || 'Failed to save FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setNotification({ type: 'error', message: 'Failed to save FAQ' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      setSaving(true);
      
      // Add delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedItems = config.faqItems.filter(item => item.id !== id);
      const updatedConfig = { ...config, faqItems: updatedItems };
      
      const response = await apiService.updateConfig('faq', updatedConfig);
      
      if (response.success) {
        setConfig(updatedConfig);
        setNotification({ type: 'success', message: 'FAQ deleted successfully!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(response.message || 'Failed to delete FAQ');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setNotification({ type: 'error', message: 'Failed to delete FAQ' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading FAQ settings...</p>
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
        <h1 className="text-3xl font-bold text-gray-800">FAQ Settings</h1>
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
            <ImageUploadField
              label="Hero Background Image"
              value={config.hero.backgroundImage}
              onChange={(url) => handleInputChange('hero', 'backgroundImage', url)}
              disabled={saving}
              description="FAQ page hero background. Recommended size: 1920x1080px."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={config.hero.title}
                  onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="FAQ"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Highlighted Text
                </label>
                <input
                  type="text"
                  value={config.hero.titleHighlight}
                  onChange={(e) => handleInputChange('hero', 'titleHighlight', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="FAQ"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subtitle
              </label>
              <textarea
                value={config.hero.subtitle}
                onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Everything you need to know..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Category Filter</h2>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={config.categoryFilter.enabled}
                onChange={() => handleToggle('categoryFilter', 'enabled')}
                className="sr-only"
              />
              <div className={`block w-14 h-8 rounded-full ${config.categoryFilter.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${config.categoryFilter.enabled ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {config.categoryFilter.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>

        {config.categoryFilter.enabled && (
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.categoryFilter.showAllOption}
                onChange={() => handleToggle('categoryFilter', 'showAllOption')}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Show "All" option in filter
              </span>
            </label>
          </div>
        )}
      </div>

      {/* FAQ Display Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">FAQ Display</h2>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={config.faqs.enabled}
                onChange={() => handleToggle('faqs', 'enabled')}
                className="sr-only"
              />
              <div className={`block w-14 h-8 rounded-full ${config.faqs.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${config.faqs.enabled ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {config.faqs.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>

        {config.faqs.enabled && (
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.faqs.showCategoryBadges}
                onChange={() => handleToggle('faqs', 'showCategoryBadges')}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Show category badges on FAQ items
              </span>
            </label>
          </div>
        )}
      </div>

      {/* FAQ Items Management */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">FAQ Items ({config.faqItems.length})</h2>
          <button
            onClick={handleAddNew}
            disabled={isAddingNew || editingFAQ !== null}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            + Add New FAQ
          </button>
        </div>

        {/* Add/Edit Form */}
        {(isAddingNew || editingFAQ) && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {isAddingNew ? 'Add New FAQ' : 'Edit FAQ'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={faqFormData.question}
                  onChange={(e) => handleFaqInputChange('question', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What types of projects does Kulana Development handle?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={faqFormData.category}
                  onChange={(e) => handleFaqInputChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="General, Process, Services, Partnership, Quality..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  value={faqFormData.answer}
                  onChange={(e) => handleFaqInputChange('answer', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={6}
                  placeholder="Provide a detailed answer to the question..."
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleSaveFAQ}
                  disabled={!faqFormData.question || !faqFormData.answer || !faqFormData.category || saving}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {saving ? 'Saving...' : 'Save FAQ'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
              {!faqFormData.question || !faqFormData.answer || !faqFormData.category ? (
                <p className="text-sm text-red-600 mt-2">* Please fill in all required fields</p>
              ) : null}
            </div>
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-3">
          {config.faqItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 font-medium">No FAQ items yet</p>
              <p className="text-gray-400 text-sm">Click "Add New FAQ" to create your first FAQ</p>
            </div>
          ) : (
            config.faqItems.map((faq) => (
              <div key={faq.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {faq.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditFAQ(faq)}
                      disabled={isAddingNew || editingFAQ !== null}
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteFAQ(faq.id)}
                      disabled={saving}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQSettings;
