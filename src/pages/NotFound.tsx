import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="font-serif text-9xl md:text-[12rem] font-bold text-navy leading-none">
            404
          </h1>
          <div className="w-32 h-1 bg-gold mx-auto mt-4"></div>
        </div>

        {/* Message */}
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="font-sans text-lg text-text-secondary mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-navy text-white font-accent font-semibold px-8 py-3 rounded hover:bg-navy-light transition-colors duration-300"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gold text-white font-accent font-semibold px-8 py-3 rounded hover:bg-gold-light transition-colors duration-300"
          >
            Go Home
          </button>
        </div>

        {/* Decorative Icon */}
        <div className="mt-12">
          <svg className="w-32 h-32 text-navy/20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
