import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

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

const Home = () => {
  const [config, setConfig] = useState<HomeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomeConfig();
  }, []);

  const fetchHomeConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getConfig('home');
      
      if (response.success && response.data?.value) {
        setConfig(response.data.value);
      } else {
        setError('Failed to load home configuration');
      }
    } catch (err) {
      console.error('Error fetching home config:', err);
      setError('Error loading page. Please try again later.');
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
        <p className="text-text-secondary font-sans">Loading...</p>
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
          <p className="text-red-700 font-sans text-lg mb-4">{error || 'Failed to load page'}</p>
          <button
            onClick={fetchHomeConfig}
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
      {/* Hero Section */}
      {config.hero.enabled && (
        <section className="relative h-[90vh] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={config.hero.backgroundImage}
              alt="Building with Purpose"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/60 to-navy/50"></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center z-10">
            <div className="max-w-5xl mx-auto px-4">
              <h1 className="font-serif text-6xl md:text-7xl lg:text-hero font-bold text-white mb-8 leading-tight animate-fade-in">
                {config.hero.title}
              </h1>
              
              {/* Separator Bar */}
              {config.hero.showSeparator && (
                <div className="w-32 h-1 bg-gold mx-auto"></div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* About / Introduction */}
      {config.introduction.enabled && (
        <section className="py-24 bg-ivory">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <p className="font-serif text-body text-text-primary leading-relaxed-custom">
              {config.introduction.text}
            </p>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {config.sections.filter(s => s.enabled).map((section) => (
        <section 
          key={section.id} 
          id={section.id}
          className={`py-20 ${section.backgroundColor === 'ivory' ? 'bg-ivory' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Image */}
              <div className={`${section.imagePosition === 'right' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}`}>
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Text */}
              <div className={`${section.imagePosition === 'right' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}`}>
                <h2 className="font-serif text-4xl font-bold text-text-primary mb-6">
                  {section.title}
                </h2>
                <p className="font-sans text-base text-text-secondary leading-relaxed-custom">
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
