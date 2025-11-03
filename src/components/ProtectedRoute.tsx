import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

interface PageSettings {
  home: boolean;
  team: boolean;
  projects: boolean;
  faq: boolean;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  pageKey: keyof PageSettings;
}

const ProtectedRoute = ({ children, pageKey }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isPageEnabled, setIsPageEnabled] = useState(true);

  useEffect(() => {
    const checkPageStatus = async () => {
      try {
        const response = await apiService.getConfig('page_settings');
        if (response.data?.value) {
          const settings: PageSettings = response.data.value;
          setIsPageEnabled(settings[pageKey]);
        }
      } catch (error) {
        console.error('Error fetching page settings:', error);
        // On error, allow access
        setIsPageEnabled(true);
      } finally {
        setLoading(false);
      }
    };

    checkPageStatus();
  }, [pageKey]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gold"></div>
      </div>
    );
  }

  if (!isPageEnabled) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
