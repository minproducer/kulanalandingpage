import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { footerConfig as defaultFooterConfig } from '../config/footerConfig';
import { apiService } from '../services/apiService';

interface FooterConfig {
  sections: {
    companyInfo: {
      enabled: boolean;
      logoUrl?: string;
      description?: string;
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

const Footer = () => {
  const [config, setConfig] = useState<FooterConfig>(defaultFooterConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await apiService.getConfig('footer');
      
      if (response.success && response.data.value) {
        // Merge API config with default config to ensure all fields exist
        setConfig({
          ...defaultFooterConfig,
          ...response.data.value,
          sections: {
            ...defaultFooterConfig.sections,
            ...response.data.value.sections,
          },
        });
      }
    } catch (error) {
      console.error('Error fetching footer config:', error);
      // Use default config on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <footer className="bg-navy text-white py-10"></footer>;
  }

  const { sections, copyright } = config;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Fixed 4-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div className="flex flex-col items-center text-left pr-8">
            {sections.companyInfo.enabled ? (
              <>
                {sections.companyInfo.logoUrl && (
                  <img 
                    src={sections.companyInfo.logoUrl}
                    alt="Kulana Development" 
                    className="h-40 w-auto mb-4 object-contain"
                  />
                )}
                {sections.companyInfo.description && (
                  <p className="font-sans text-small text-gray-300 leading-relaxed">
                    {sections.companyInfo.description}
                  </p>
                )}
              </>
            ) : (
              <div className="h-40"></div> // Placeholder to maintain layout
            )}
          </div>

          {/* Column 2: Navigation */}
          <div>
            {sections.navigation.enabled && sections.navigation.links && (
              <>
                {sections.navigation.title && (
                  <h3 className="font-accent text-base font-semibold mb-4 text-white">
                    {sections.navigation.title}
                  </h3>
                )}
                <ul className="space-y-3 font-sans text-lg">
                  {sections.navigation.links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="relative inline-block text-gray-300 hover:text-gold transition-colors group">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Column 3: Contact */}
          <div>
            {sections.contact.enabled && (
              <>
                <h3 className="font-accent text-base font-semibold mb-4 text-white">
                  {sections.contact.title}
                </h3>
                <div className="space-y-2 font-sans text-small">
                  <p className="text-gray-300">
                    {sections.contact.email}
                  </p>
                  <p className="text-gray-300">
                    {sections.contact.phone}
                  </p>
                  <p className="text-gray-300">
                    {sections.contact.location}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Column 4: Social Links */}
          <div>
            {sections.social.enabled && sections.social.platforms && (
              <>
                {sections.social.title && (
                  <h3 className="font-accent text-base font-semibold mb-4 text-white">
                    {sections.social.title}
                  </h3>
                )}
                <div className="flex flex-wrap gap-3">
                  {sections.social.platforms.email?.enabled && sections.social.platforms.email.value && (
                    <a 
                      href={`mailto:${sections.social.platforms.email.value}`} 
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300"
                      title="Email"
                    >
                      <span className="text-lg">📧</span>
                    </a>
                  )}
                  {sections.social.platforms.linkedin?.enabled && sections.social.platforms.linkedin.username && (
                    <a 
                      href={`https://linkedin.com/company/${sections.social.platforms.linkedin.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300"
                      title="LinkedIn"
                    >
                      <span className="text-lg">�</span>
                    </a>
                  )}
                  {sections.social.platforms.facebook?.enabled && sections.social.platforms.facebook.username && (
                    <a 
                      href={`https://facebook.com/${sections.social.platforms.facebook.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300"
                      title="Facebook"
                    >
                      <span className="text-lg">📘</span>
                    </a>
                  )}
                  {sections.social.platforms.twitter?.enabled && sections.social.platforms.twitter.username && (
                    <a 
                      href={`https://twitter.com/${sections.social.platforms.twitter.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300"
                      title="Twitter/X"
                    >
                      <span className="text-lg">🐦</span>
                    </a>
                  )}
                  {sections.social.platforms.instagram?.enabled && sections.social.platforms.instagram.username && (
                    <a 
                      href={`https://instagram.com/${sections.social.platforms.instagram.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300"
                      title="Instagram"
                    >
                      <span className="text-lg">📷</span>
                    </a>
                  )}
                  {sections.social.platforms.youtube?.enabled && sections.social.platforms.youtube.username && (
                    <a 
                      href={`https://youtube.com/@${sections.social.platforms.youtube.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300"
                      title="YouTube"
                    >
                      <span className="text-lg">📺</span>
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Copyright */}
        {copyright.enabled && (
          <div className="border-t border-navy-light pt-8 text-center">
            <p className="font-sans text-small text-gray-400">
              &copy; {copyright.year || new Date().getFullYear()} <span className="text-gold font-semibold">{copyright.text}</span>. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
