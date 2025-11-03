import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  code?: number;
  title?: string;
  message?: string;
}

const ErrorPage = ({ 
  code = 500, 
  title = 'Internal Server Error',
  message = 'Something went wrong on our end. Please try again later.'
}: ErrorPageProps) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (code) {
      case 403:
        return (
          <svg className="w-32 h-32 text-red-500/20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 503:
        return (
          <svg className="w-32 h-32 text-orange-500/20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-32 h-32 text-red-500/20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
    }
  };

  const getColor = () => {
    switch (code) {
      case 403:
        return 'text-red-600';
      case 503:
        return 'text-orange-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className={`font-serif text-9xl md:text-[12rem] font-bold ${getColor()} leading-none`}>
            {code}
          </h1>
          <div className="w-32 h-1 bg-gold mx-auto mt-4"></div>
        </div>

        {/* Message */}
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
          {title}
        </h2>
        <p className="font-sans text-lg text-text-secondary mb-8 max-w-md mx-auto">
          {message}
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
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

// Pre-defined error pages
export const Error403 = () => (
  <ErrorPage 
    code={403} 
    title="Access Forbidden" 
    message="You don't have permission to access this resource. Please contact the administrator if you believe this is a mistake."
  />
);

export const Error500 = () => (
  <ErrorPage 
    code={500} 
    title="Internal Server Error" 
    message="Something went wrong on our end. Our team has been notified and we're working to fix it."
  />
);

export const Error502 = () => (
  <ErrorPage 
    code={502} 
    title="Bad Gateway" 
    message="We're having trouble connecting to our servers. Please try again in a few moments."
  />
);

export const Error503 = () => (
  <ErrorPage 
    code={503} 
    title="Service Unavailable" 
    message="We're currently performing maintenance. We'll be back online shortly. Thank you for your patience."
  />
);

export default ErrorPage;
