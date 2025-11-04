import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import ImageUploadField from '../components/ImageUploadField';

interface Project {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  status: string;
  size?: string;
  link?: string;
  // Detail fields
  detailDescription?: string;
  completionDate?: string;
  clientName?: string;
  imageGallery?: string[];
  specifications?: Array<{ key: string; value: string }>;
}

const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Project>({
    id: 0,
    name: '',
    location: '',
    image: '',
    description: '',
    status: 'In Progress',
    size: '',
    link: '',
    detailDescription: '',
    completionDate: '',
    clientName: '',
    imageGallery: [],
    specifications: [],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getConfig('projects');
      console.log('📦 Fetched projects response:', response);
      
      if (response.success && response.data?.value?.projects) {
        setProjects(response.data.value.projects);
        console.log('✅ Projects loaded:', response.data.value.projects.length);
      } else {
        console.warn('⚠️ No projects found in response');
        setProjects([]);
      }
    } catch (error) {
      console.error('❌ Error fetching projects:', error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Project, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageGallery: prev.imageGallery?.filter((_, i) => i !== index) || []
    }));
  };

  // Specifications management
  const handleAddSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...(prev.specifications || []), { key: '', value: '' }]
    }));
  };

  const handleUpdateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications?.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ) || []
    }));
  };

  const handleRemoveSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSaveProject = async () => {
    // Validation
    if (!formData.name || !formData.location || !formData.image || !formData.description) {
      setNotification({ type: 'error', message: 'Please fill in all required fields (Name, Location, Image, Description)' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Check if image is base64 (local preview) instead of server URL
    if (formData.image.startsWith('data:')) {
      setNotification({ type: 'error', message: 'Please wait for image upload to complete. If upload failed, try selecting the image again.' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      setSaving(true);
      let updatedProjects: Project[];

      if (isAddingNew) {
        // Add new project
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        const newProject = { ...formData, id: newId };
        updatedProjects = [...projects, newProject];
      } else if (editingProject) {
        // Update existing project
        updatedProjects = projects.map(p =>
          p.id === editingProject.id ? { ...formData, id: editingProject.id } : p
        );
      } else {
        return;
      }

      // Add 1.5 second delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await apiService.updateConfig('projects', { projects: updatedProjects });
      setProjects(updatedProjects);
      
      // Show success notification
      setNotification({ 
        type: 'success', 
        message: isAddingNew ? 'Project added successfully!' : 'Project updated successfully!' 
      });
      
      // Close form and clear notification after 3 seconds
      setTimeout(() => {
        handleCancelEdit();
        setNotification(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error saving project:', error);
      setNotification({ type: 'error', message: 'Failed to save project. Please try again.' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setDeleting(projectId);
      
      // Add 1 second delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedProjects = projects.filter(p => p.id !== projectId);
      await apiService.updateConfig('projects', { projects: updatedProjects });
      setProjects(updatedProjects);
      
      setNotification({ type: 'success', message: 'Project deleted successfully!' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error deleting project:', error);
      setNotification({ type: 'error', message: 'Failed to delete project. Please try again.' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setDeleting(null);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({ ...project });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProject(null);
    setFormData({
      id: 0,
      name: '',
      location: '',
      image: '',
      description: '',
      status: 'In Progress',
      size: '',
      link: '',
    });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setIsAddingNew(false);
    setFormData({
      id: 0,
      name: '',
      location: '',
      image: '',
      description: '',
      status: 'In Progress',
      size: '',
      link: '',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Notification Popup */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 max-w-md w-full transform transition-all duration-300 ease-in-out ${
          notification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className={`rounded-lg shadow-lg p-4 flex items-start gap-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-l-4 border-green-500' 
              : 'bg-red-50 border-l-4 border-red-500'
          }`}>
            {notification.type === 'success' ? (
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
                notification.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {notification.type === 'success' ? 'Success!' : 'Error!'}
              </p>
              <p className={`text-sm mt-1 ${
                notification.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className={`flex-shrink-0 ${
                notification.type === 'success' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Projects Management</h1>
            <p className="text-gray-600">Manage your development projects</p>
          </div>
          <button
            onClick={handleAddNew}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Project
          </button>
        </div>
      </div>

      {/* Edit/Add Form */}
      {(editingProject || isAddingNew) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isAddingNew ? 'Add New Project' : 'Edit Project'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project name"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter location"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Planning">Planning</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Size (Optional)
              </label>
              <input
                type="text"
                value={formData.size || ''}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 50,000 sq ft"
              />
            </div>

            {/* Project Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Link (Optional)
              </label>
              <input
                type="url"
                value={formData.link || ''}
                onChange={(e) => handleInputChange('link', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/project-details"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project description"
              />
            </div>

            {/* Detail Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description (Optional)
              </label>
              <textarea
                value={formData.detailDescription || ''}
                onChange={(e) => handleInputChange('detailDescription', e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter detailed project description (shown in modal)"
              />
            </div>

            {/* Completion Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Completion Date (Optional)
              </label>
              <input
                type="text"
                value={formData.completionDate || ''}
                onChange={(e) => handleInputChange('completionDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., December 2024"
              />
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Client Name (Optional)
              </label>
              <input
                type="text"
                value={formData.clientName || ''}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter client name"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <ImageUploadField
                label="Project Image *"
                value={formData.image}
                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                disabled={saving}
                description="Main project image. Recommended size: 800x600px."
              />
            </div>

            {/* Image Gallery Upload */}
            <div className="md:col-span-2 border-t pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image Gallery (Optional)
              </label>
              <p className="text-xs text-gray-500 mb-3">Upload additional images for the project detail modal</p>
              
              {/* Gallery Images Grid */}
              {formData.imageGallery && formData.imageGallery.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {formData.imageGallery.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        onClick={() => handleRemoveGalleryImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Gallery Image */}
              <ImageUploadField
                label="Add Gallery Image"
                value=""
                onChange={(url) => {
                  if (url) {
                    setFormData(prev => ({
                      ...prev,
                      imageGallery: [...(prev.imageGallery || []), url]
                    }));
                  }
                }}
                disabled={saving}
                description="Each image will be added to the gallery. Clear after adding to add another."
              />
            </div>

            {/* Specifications Editor */}
            <div className="md:col-span-2 border-t pt-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Project Specifications (Optional)
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Add technical details and features</p>
                </div>
                <button
                  onClick={handleAddSpecification}
                  type="button"
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Spec
                </button>
              </div>

              {/* Specifications List */}
              {formData.specifications && formData.specifications.length > 0 ? (
                <div className="space-y-3">
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) => handleUpdateSpecification(index, 'key', e.target.value)}
                          placeholder="Key (e.g., Total Floors)"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleUpdateSpecification(index, 'value', e.target.value)}
                          placeholder="Value (e.g., 12 floors)"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveSpecification(index)}
                        type="button"
                        className="flex-shrink-0 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">No specifications yet. Click "Add Spec" to add one.</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSaveProject}
              disabled={!formData.name || !formData.location || !formData.image || !formData.description || saving}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {saving ? 'Saving...' : 'Save Project'}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={saving}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
          {!formData.name || !formData.location || !formData.image || !formData.description ? (
            <p className="text-sm text-red-600 mt-2">* Please fill in all required fields</p>
          ) : null}
        </div>
      )}

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-800">All Projects ({projects.length})</h2>
        </div>

        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-500 text-lg">No projects yet. Click "Add New Project" to get started.</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {projects.map((project) => (
                <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-3">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 text-xs mb-3">
                        <span className={`px-2.5 py-1 rounded-full font-semibold ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'Coming Soon' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                          📍 {project.location}
                        </span>
                        {project.size && (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                            📐 {project.size}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="flex-1 text-blue-600 hover:text-blue-800 px-3 py-1.5 hover:bg-blue-50 rounded text-sm font-medium transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          disabled={deleting === project.id}
                          className="flex-1 text-red-600 hover:text-red-800 px-3 py-1.5 hover:bg-red-50 rounded text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          {deleting === project.id ? '⏳' : '🗑️'} Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{project.description}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{project.location}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'Coming Soon' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{project.size || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={deleting === project.id}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === project.id ? (
                              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsManagement;
