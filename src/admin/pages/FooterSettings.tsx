import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService, isAuthenticated } from '../../services/apiService';

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      setMessage(null);

      // Use XMLHttpRequest for progress tracking
      const formData = new FormData();
      formData.append('image', file);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });

      // Handle completion
      const uploadPromise = new Promise<{ success: boolean; data?: { url: string }; message?: string }>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const result = JSON.parse(xhr.responseText);
              resolve(result);
            } catch {
              reject(new Error('Failed to parse response'));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload cancelled'));
        });
      });

      xhr.open('POST', 'http://localhost/kulana-api/endpoints/upload-image-no-auth.php');
      xhr.send(formData);

      const response = await uploadPromise;

      if (response.success && response.data) {
        setUploadProgress(100);

        // Update config with new logo URL
        const newConfig = JSON.parse(JSON.stringify(config));
        newConfig.sections.companyInfo.logoUrl = response.data.url;
        setConfig(newConfig);

        // Auto-save to database
        const saveResponse = await apiService.updateConfig('footer', newConfig);
        
        if (saveResponse.success) {
          setMessage({ type: 'success', text: 'Logo uploaded and saved successfully!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'Logo uploaded but failed to save' });
        }
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to upload image' });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error uploading image';
      setMessage({ type: 'error', text: errorMessage });
      setUploadProgress(0);
    } finally {
      setUploading(false);
      // Reset progress after a short delay
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleRemoveLogo = async () => {
    if (!config) return;

    try {
      setSaving(true);
      setMessage(null);

      // Update config to remove logo
      const newConfig = JSON.parse(JSON.stringify(config));
      newConfig.sections.companyInfo.logoUrl = '';
      setConfig(newConfig);

      // Auto-save to database
      const saveResponse = await apiService.updateConfig('footer', newConfig);
      
      if (saveResponse.success) {
        setMessage({ type: 'success', text: 'Logo removed successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to remove logo' });
      }
    } catch (error) {
      console.error('Error removing logo:', error);
      setMessage({ type: 'error', text: 'Error removing logo' });
    } finally {
      setSaving(false);
    }
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
      <div className="space-y-6">
        {/* Company Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary text-lg">Company Info</p>
                <p className="font-sans text-sm text-text-secondary">Logo and company description</p>
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
                  <span className="font-accent text-sm font-semibold text-text-primary">Company Logo</span>
                  <div className="mt-2">
                    {config.sections.companyInfo.logoUrl && (
                      <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                        <img 
                          src={config.sections.companyInfo.logoUrl} 
                          alt="Company Logo" 
                          className="h-16 object-contain"
                        />
                      </div>
                    )}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <label className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="hidden"
                            id="logo-upload"
                          />
                          <label 
                            htmlFor="logo-upload"
                            className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-accent font-medium text-text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {uploading ? 'Uploading...' : 'Upload Logo'}
                          </label>
                        </label>
                        {config.sections.companyInfo.logoUrl && (
                          <button
                            onClick={handleRemoveLogo}
                            disabled={saving || uploading}
                            className="px-4 py-2 text-sm font-accent font-medium text-red-600 hover:text-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {saving ? 'Removing...' : 'Remove'}
                          </button>
                        )}
                      </div>
                      
                      {/* Upload Progress Bar */}
                      {uploading && (
                        <div className="w-full">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gold">Uploading logo...</span>
                            <span className="text-xs font-medium text-gold">{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gold h-2 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xs text-text-secondary">
                        PNG, JPG, GIF, WebP or SVG. Max 5MB.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Description */}
              <label className="block">
                <span className="font-accent text-sm font-semibold text-text-primary">Description</span>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary text-lg">Navigation</p>
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
          
          {config.sections.navigation.enabled && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-accent text-sm font-semibold text-text-primary mb-2">
                Note: Navigation links are managed in the code. You can only toggle visibility here.
              </p>
              <p className="text-xs text-text-secondary">
                Current links: Home, Projects, Management Team, FAQ
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary text-lg">Contact</p>
                <p className="font-sans text-sm text-text-secondary">Email, phone, and location</p>
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
                <span className="font-accent text-sm font-semibold text-text-primary">Title</span>
                <input
                  type="text"
                  value={config.sections.contact.title || ''}
                  onChange={(e) => handleTextChange('contact', 'title', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Contact"
                />
              </label>
              <label className="block">
                <span className="font-accent text-sm font-semibold text-text-primary">Email</span>
                <input
                  type="email"
                  value={config.sections.contact.email || ''}
                  onChange={(e) => handleTextChange('contact', 'email', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="info@example.com"
                />
              </label>
              <label className="block">
                <span className="font-accent text-sm font-semibold text-text-primary">Phone</span>
                <input
                  type="tel"
                  value={config.sections.contact.phone || ''}
                  onChange={(e) => handleTextChange('contact', 'phone', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="(555) 123-4567"
                />
              </label>
              <label className="block">
                <span className="font-accent text-sm font-semibold text-text-primary">Location</span>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary text-lg">Social Media</p>
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
          
          {config.sections.social.enabled && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
              <label className="block">
                <span className="font-accent text-sm font-semibold text-text-primary">Title</span>
                <input
                  type="text"
                  value={config.sections.social.title || ''}
                  onChange={(e) => handleTextChange('social', 'title', e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Follow Us"
                />
              </label>

              <div className="space-y-4">
                <p className="font-accent text-sm font-semibold text-text-primary">Social Media Platforms</p>
                
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
                    <label className="block text-sm font-medium text-text-primary mb-1">📧 Email</label>
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
                    <label className="block text-sm font-medium text-text-primary mb-1">💼 LinkedIn</label>
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
                    <label className="block text-sm font-medium text-text-primary mb-1">📘 Facebook</label>
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
                    <label className="block text-sm font-medium text-text-primary mb-1">🐦 Twitter/X</label>
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
                    <label className="block text-sm font-medium text-text-primary mb-1">📷 Instagram</label>
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
                    <label className="block text-sm font-medium text-text-primary mb-1">📺 YouTube</label>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-accent font-semibold text-text-primary text-lg">Copyright</p>
                <p className="font-sans text-sm text-text-secondary">Copyright notice text</p>
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
                <span className="font-accent text-sm font-semibold text-text-primary">Year</span>
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
                <span className="font-accent text-sm font-semibold text-text-primary">Copyright Text</span>
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
