import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Sectors', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/management-team' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`bg-navy fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-lg py-2' : 'shadow-md py-0'
    }`}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/src/assets/images/KulanaDev Logo - left.png" 
              alt="Kulana Development" 
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-sans text-white transition-all duration-300 hover:text-gold hover:scale-105 ${
                  isActive(item.path) ? 'text-gold' : ''
                }`}
              >
                {item.name}
                <span className={`absolute bottom-[-6px] left-0 h-0.5 bg-gold transition-all duration-300 ${
                  isActive(item.path) ? 'w-full' : 'w-0'
                }`}></span>
              </Link>
            ))}
            
            {/* Partner Button - inline with menu */}
            <button className="bg-gold text-white font-accent font-semibold px-6 py-2.5 rounded transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:scale-105 ml-2">
              Partner
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-navy-light">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 text-lg font-sans transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-gold bg-navy-dark'
                    : 'text-white hover:text-gold hover:bg-navy-dark'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-3">
              <button className="w-full bg-gold text-white font-accent font-semibold px-6 py-2.5 rounded">
                Partner
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
