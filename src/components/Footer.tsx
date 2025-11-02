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
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 group"
                      title="Email"
                    >
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </a>
                  )}
                  {sections.social.platforms.linkedin?.enabled && sections.social.platforms.linkedin.username && (
                    <a 
                      href={`https://linkedin.com/company/${sections.social.platforms.linkedin.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 group"
                      title="LinkedIn"
                    >
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {sections.social.platforms.facebook?.enabled && sections.social.platforms.facebook.username && (
                    <a 
                      href={`https://facebook.com/${sections.social.platforms.facebook.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 group"
                      title="Facebook"
                    >
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {sections.social.platforms.twitter?.enabled && sections.social.platforms.twitter.username && (
                    <a 
                      href={`https://twitter.com/${sections.social.platforms.twitter.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 group"
                      title="Twitter/X"
                    >
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                  {sections.social.platforms.instagram?.enabled && sections.social.platforms.instagram.username && (
                    <a 
                      href={`https://instagram.com/${sections.social.platforms.instagram.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 group"
                      title="Instagram"
                    >
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {sections.social.platforms.youtube?.enabled && sections.social.platforms.youtube.username && (
                    <a 
                      href={`https://youtube.com/@${sections.social.platforms.youtube.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gold/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 group"
                      title="YouTube"
                    >
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
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
