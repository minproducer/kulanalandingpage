import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="flex flex-col items-center text-center">
            <img 
              src="/KulanaDev Logo - center.png" 
              alt="Kulana Development" 
              className="h-40 w-auto mb-4"
            />
            <p className="font-sans text-small text-gray-300 leading-relaxed">
              Transforming concepts into high-performing assets with precision, integrity, and commitment to long-term value.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <ul className="space-y-2 font-sans text-normal">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-gold transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/management-team" className="text-gray-300 hover:text-gold transition-colors">
                  Management Team
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-accent text-base font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-2 font-sans text-small">
              <p className="text-gray-300">
                info@kulanadevelopment.com
              </p>
              <p className="text-gray-300">
                (555) 123-4567
              </p>
              <p className="text-gray-300">
                Texas & Southeast
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-accent text-base font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300">
                <span className="text-lg">📧</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300">
                <span className="text-lg">�</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gold/20 hover:bg-gold rounded flex items-center justify-center transition-all duration-300">
                <span className="text-lg">�</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-light pt-8 text-center">
          <p className="font-sans text-small text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-gold font-semibold">Kulana Development</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
