import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [config, setConfig] = useState<FAQConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQConfig();
  }, []);

  const fetchFAQConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getConfig('faq');
      
      if (response.success && response.data?.value) {
        setConfig(response.data.value);
      } else {
        setError('Failed to load FAQ configuration');
      }
    } catch (err) {
      console.error('Error fetching FAQ config:', err);
      setError('Error loading FAQ. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center py-20">
        <svg className="animate-spin h-12 w-12 text-gold mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-text-secondary font-sans">Loading FAQ...</p>
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
          <p className="text-red-700 font-sans text-lg mb-4">{error || 'Failed to load FAQ'}</p>
          <button
            onClick={fetchFAQConfig}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categories = config.categoryFilter.showAllOption 
    ? ['All', ...Array.from(new Set(config.faqItems.map(faq => faq.category)))]
    : Array.from(new Set(config.faqItems.map(faq => faq.category)));
  
  const filteredFAQs = selectedCategory === 'All' 
    ? config.faqItems 
    : config.faqItems.filter(faq => faq.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      {config.hero.enabled && (
        <section className="relative h-64 md:h-80 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={config.hero.backgroundImage}
              alt="FAQ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/70"></div>
          </div>
          
          {/* Title */}
          <div className="relative h-full flex items-center justify-center z-10 px-8">
            <div className="text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
                <span className="text-gold">{config.hero.titleHighlight}</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-gray-200 max-w-2xl">
                {config.hero.subtitle}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      {config.categoryFilter.enabled && (
        <section className="bg-ivory border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-8 py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-accent text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-white text-text-secondary hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        </section>
      )}

      {/* FAQ Section */}
      {config.faqs.enabled && (
        <section className="py-20 bg-ivory">
          <div className="max-w-5xl mx-auto px-8">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">No FAQs Available</h3>
                <p className="text-text-secondary font-sans">Check back soon for frequently asked questions.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-start hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1 pr-8">
                    {config.faqs.showCategoryBadges && (
                      <div className="inline-block mb-2">
                        <span className="text-xs font-accent font-semibold text-gold uppercase tracking-wider">
                          {faq.category}
                        </span>
                      </div>
                    )}
                    <h3 className="font-serif text-xl font-bold text-text-primary">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-gold transform transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-sans text-base text-text-secondary leading-relaxed-custom">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-text-primary mb-6">
            Still Have Questions?
          </h2>
          <p className="font-sans text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed-custom">
            Our team is here to help. Contact us for more information about our services and how we can bring your project to life with precision and excellence.
          </p>
          <button className="bg-gold text-white font-accent font-semibold px-8 py-3 rounded hover:bg-gold-light transition-colors duration-300 shadow-md hover:shadow-lg">
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
