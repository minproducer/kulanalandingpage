import { Link } from 'react-router-dom';
import { footerConfig } from '../config/footerConfig';

const Footer = () => {
  const { sections, copyright } = footerConfig;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className={`grid grid-cols-1 gap-12 mb-12 ${
          sections.contact.enabled && sections.social.enabled ? 'md:grid-cols-4' :
          sections.contact.enabled || sections.social.enabled ? 'md:grid-cols-3' :
          'md:grid-cols-2'
        }`}>
          {/* Company Info */}
          {sections.companyInfo.enabled && (
            <div className="flex flex-col items-center text-left pr-8">
              <img 
                src={sections.companyInfo.logo}
                alt="Kulana Development" 
                className="h-40 w-auto mb-4"
              />
              <p className="font-sans text-small text-gray-300 leading-relaxed">
                {sections.companyInfo.description}
              </p>
            </div>
          )}

          {/* Navigation */}
          {sections.navigation.enabled && (
            <div>
            <ul className="space-y-3 font-sans text-lg">
              <li>
                <Link to="/" className="relative inline-block text-gray-300 hover:text-gold transition-colors group">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="relative inline-block text-gray-300 hover:text-gold transition-colors group">
                  Projects
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/management-team" className="relative inline-block text-gray-300 hover:text-gold transition-colors group">
                  Management Team
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="relative inline-block text-gray-300 hover:text-gold transition-colors group">
                  FAQ
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
          )}

          {/* Contact - Controlled by config */}
          {sections.contact.enabled && (
            <div>
              <h3 className="font-accent text-base font-semibold mb-4 text-white">Contact</h3>
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
            </div>
          )}

          {/* Social Links - Controlled by config */}
          {sections.social.enabled && (
            <div>
              <h3 className="font-accent text-base font-semibold mb-4 text-white">Follow Us</h3>
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
            </div>
          )}
        </div>

        <div className="border-t border-navy-light pt-8 text-center">
          <p className="font-sans text-small text-gray-400">
            &copy; {copyright.year} <span className="text-gold font-semibold">{copyright.text}</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
