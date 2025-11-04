import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import Notification from '../components/Notification';
import ImageUploadField from '../components/ImageUploadField';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
}

interface TeamConfig {
  hero: {
    enabled: boolean;
    backgroundImage: string;
    title: string;
    titleHighlight: string;
  };
  members: TeamMember[];
}

const TeamSettings = () => {
  const [config, setConfig] = useState<TeamConfig>({
    hero: {
      enabled: true,
      backgroundImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80',
      title: 'Management Team',
      titleHighlight: 'Team',
    },
    members: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Team member editing
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [memberFormData, setMemberFormData] = useState<TeamMember>({
    id: 0,
    name: '',
    title: '',
    bio: '',
    image: '',
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getConfig('team');
      
      if (response.success && response.data?.value) {
        setConfig(response.data.value);
      } else {
        console.log('No team config found, using default config');
      }
    } catch (error) {
      console.error('Error fetching team config:', error);
      setNotification({ type: 'error', message: 'Failed to load team settings. Using default configuration.' });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await apiService.updateConfig('team', config);
      
      if (response.success) {
        setNotification({ type: 'success', message: 'Team settings saved successfully!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(response.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving team config:', error);
      setNotification({ type: 'error', message: 'Failed to save team settings' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (field: string) => {
    setConfig(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: !prev.hero[field as keyof typeof prev.hero],
      },
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  // Team Member Management
  const handleAddNew = () => {
    setIsAddingNew(true);
    setMemberFormData({
      id: Date.now(),
      name: '',
      title: '',
      bio: '',
      image: '',
    });
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setMemberFormData({ ...member });
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    setIsAddingNew(false);
    setMemberFormData({
      id: 0,
      name: '',
      title: '',
      bio: '',
      image: '',
    });
  };

  const handleMemberInputChange = (field: string, value: string) => {
    setMemberFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveMember = async () => {
    // Validation
    if (!memberFormData.name || !memberFormData.title || !memberFormData.bio || !memberFormData.image) {
      setNotification({ type: 'error', message: 'Please fill in all fields (Name, Title, Bio, Image)' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (memberFormData.image.startsWith('data:')) {
      setNotification({ type: 'error', message: 'Please wait for image upload to complete. If upload failed, try selecting the image again.' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      setSaving(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      let updatedMembers: TeamMember[];
      
      if (isAddingNew) {
        updatedMembers = [...config.members, memberFormData];
      } else {
        updatedMembers = config.members.map(member => 
          member.id === memberFormData.id ? memberFormData : member
        );
      }

      const updatedConfig = { ...config, members: updatedMembers };
      const response = await apiService.updateConfig('team', updatedConfig);
      
      if (response.success) {
        setConfig(updatedConfig);
        setNotification({ type: 'success', message: `Team member ${isAddingNew ? 'added' : 'updated'} successfully!` });
        setTimeout(() => setNotification(null), 3000);
        handleCancelEdit();
      } else {
        throw new Error(response.message || 'Failed to save team member');
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      setNotification({ type: 'error', message: 'Failed to save team member' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      setSaving(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedMembers = config.members.filter(member => member.id !== id);
      const updatedConfig = { ...config, members: updatedMembers };
      
      const response = await apiService.updateConfig('team', updatedConfig);
      
      if (response.success) {
        setConfig(updatedConfig);
        setNotification({ type: 'success', message: 'Team member deleted successfully!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(response.message || 'Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setNotification({ type: 'error', message: 'Failed to delete team member' });
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
          <p className="text-gray-600">Loading team settings...</p>
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
        <h1 className="text-3xl font-bold text-gray-800">Management Team Settings</h1>
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
                onChange={() => handleToggle('enabled')}
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
                onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/hero-image.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (First Part)
                </label>
                <input
                  type="text"
                  value={config.hero.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Management"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Highlighted Text (Gold)
                </label>
                <input
                  type="text"
                  value={config.hero.titleHighlight}
                  onChange={(e) => handleInputChange('titleHighlight', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Team"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Team Members Management */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Team Members ({config.members.length})</h2>
          <button
            onClick={handleAddNew}
            disabled={isAddingNew || editingMember !== null}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            + Add New Member
          </button>
        </div>

        {/* Add/Edit Form */}
        {(isAddingNew || editingMember) && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {isAddingNew ? 'Add New Team Member' : 'Edit Team Member'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={memberFormData.name}
                    onChange={(e) => handleMemberInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Lana Petrovich"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={memberFormData.title}
                    onChange={(e) => handleMemberInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="CEO"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio *
                </label>
                <textarea
                  value={memberFormData.bio}
                  onChange={(e) => handleMemberInputChange('bio', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={8}
                  placeholder="Professional biography... Use double line breaks to separate paragraphs."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Profile Image * (Circular display)
                </label>
                <div className="flex items-start gap-4">
                  {memberFormData.image && (
                    <div className="relative">
                      <img
                        src={memberFormData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-full border-2 border-gray-200"
                      />
                      <button
                        onClick={() => setMemberFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <div className="flex-1">
                    <ImageUploadField
                      label="Member Photo"
                      value={memberFormData.image}
                      onChange={(url) => setMemberFormData(prev => ({ ...prev, image: url }))}
                      disabled={saving}
                      description="Recommended size: 300x300px for square avatars."
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleSaveMember}
                  disabled={!memberFormData.name || !memberFormData.title || !memberFormData.bio || !memberFormData.image || saving}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {saving ? 'Saving...' : 'Save Member'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
              {!memberFormData.name || !memberFormData.title || !memberFormData.bio || !memberFormData.image ? (
                <p className="text-sm text-red-600 mt-2">* Please fill in all required fields</p>
              ) : null}
            </div>
          </div>
        )}

        {/* Team Members List */}
        <div className="space-y-3">
          {config.members.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-gray-500 font-medium">No team members yet</p>
              <p className="text-gray-400 text-sm">Click "Add New Member" to create your first team member profile</p>
            </div>
          ) : (
            config.members.map((member) => (
              <div key={member.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg">{member.name}</h4>
                      <p className="text-sm text-blue-600 mb-2">{member.title}</p>
                      <p className="text-sm text-gray-600 line-clamp-3">{member.bio}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditMember(member)}
                      disabled={isAddingNew || editingMember !== null}
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
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

export default TeamSettings;
