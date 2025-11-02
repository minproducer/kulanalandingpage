import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

interface Project {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  status: string;
  size?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getConfig('projects');
      
      if (response.success && response.data?.value?.projects) {
        setProjects(response.data.value.projects);
      } else {
        setError('Failed to load projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Error loading projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
            alt="Our Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>
        
        {/* Title */}
        <div className="relative h-full flex items-center justify-center z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">
            <span className="text-gold">Our</span> Projects
          </h1>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <svg className="animate-spin h-12 w-12 text-gold mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-text-secondary font-sans">Loading projects...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-sans text-lg mb-4">{error}</p>
              <button
                onClick={fetchProjects}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">No Projects Yet</h3>
              <p className="text-text-secondary font-sans">Check back soon for exciting new developments!</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">
                    {project.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-text-secondary text-sm">
                    <p className="font-sans flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {project.location}
                    </p>
                    {project.size && (
                      <p className="font-sans">
                        • {project.size}
                      </p>
                    )}
                  </div>
                  
                  <button className="w-full bg-navy text-white font-accent font-semibold px-6 py-3 rounded hover:bg-navy-light transition-colors duration-300">
                    View Project
                  </button>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
