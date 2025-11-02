import { Link } from 'react-router-dom';
import { footerConfig } from '../config/footerConfig';

const Footer = () => {
  const { sections, copyright } = footerConfig;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Fixed 4-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div className="flex flex-col items-center text-left pr-8">
            {sections.companyInfo.enabled ? (
              <>
                <img 
                  src={sections.companyInfo.logo}
                  alt="Kulana Development" 
                  className="h-40 w-auto mb-4"
                />
                <p className="font-sans text-small text-gray-300 leading-relaxed">
                  {sections.companyInfo.description}
                </p>
              </>
            ) : (
              <div className="h-40"></div> // Placeholder to maintain layout
            )}
          </div>

          {/* Column 2: Navigation */}
          <div>
            {sections.navigation.enabled && (
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
            {sections.social.enabled && (
              <>
                <h3 className="font-accent text-base font-semibold mb-4 text-white">
                  {sections.social.title}
                </h3>
                <div className="flex space-x-4">
                  <a href={sections.social.links.email} className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300">
                    <span className="text-lg">📧</span>
                  </a>
                  <a href={sections.social.links.linkedin} className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300">
                    <span className="text-lg">�</span>
                  </a>
                  <a href={sections.social.links.facebook} className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300">
                    <span className="text-lg">�</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Copyright */}
        {copyright.enabled && (
          <div className="border-t border-navy-light pt-8 text-center">
            <p className="font-sans text-small text-gray-400">
              &copy; {copyright.year} <span className="text-gold font-semibold">{copyright.text}</span>. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
