import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

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

const ManagementTeam = () => {
  const [config, setConfig] = useState<TeamConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamConfig();
  }, []);

  const fetchTeamConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getConfig('team');
      
      if (response.success && response.data?.value) {
        setConfig(response.data.value);
      } else {
        setError('Failed to load team configuration');
      }
    } catch (err) {
      console.error('Error fetching team config:', err);
      setError('Error loading team. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-screen bg-ivory">
        <svg className="animate-spin h-12 w-12 text-gold mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-text-secondary font-sans">Loading team...</p>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="pt-20 bg-ivory min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700 font-sans text-lg mb-4">{error || 'Failed to load team'}</p>
          <button
            onClick={fetchTeamConfig}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      {config.hero.enabled && (
        <section className="relative h-64 md:h-80 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={config.hero.backgroundImage}
              alt="Management Team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/70"></div>
          </div>
          
          {/* Title */}
          <div className="relative h-full flex items-center justify-center z-10">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">
              {config.hero.title} <span className="text-gold">{config.hero.titleHighlight}</span>
            </h1>
          </div>
        </section>
      )}

      {/* Team Members Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-8">
          {config.members.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">No Team Members Yet</h3>
              <p className="text-text-secondary font-sans">Team profiles will appear here once added.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {config.members.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image and Name Row */}
                <div className="flex items-start gap-6 mb-6">
                  {/* Circular Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover flex-shrink-0"
                  />
                  
                  {/* Name and Title */}
                  <div className="flex-1 pt-4">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-text-primary mb-2">
                      {member.name}
                    </h3>
                    <p className="font-sans text-lg text-text-secondary">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="font-sans text-sm text-text-secondary leading-relaxed">
                  {member.bio.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
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

export default ManagementTeam;
