import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService, setAuthToken, setUserInfo, isAuthenticated } from '../../services/apiService';
import { useApp } from '../contexts/AppContext';
import { translations } from '../locales/translations';

const Login = () => {
  const { language } = useApp();
  const t = translations[language];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await apiService.login(username, password);
      
      if (response.success) {
        // Save token and user info
        setAuthToken(response.data.token);
        setUserInfo({
          user_id: response.data.user_id,
          username: response.data.username,
        });
        
        // Redirect to dashboard
        navigate('/admin');
      } else {
        setError(response.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy dark:bg-gray-900 flex items-center justify-center px-4 py-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <img 
            src="/KulanaDev Logo - center.png" 
            alt="Kulana Development" 
            className="h-12 sm:h-16 mx-auto mb-3 sm:mb-4"
          />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.login.title}
          </h1>
          <p className="font-sans text-sm sm:text-base text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Sign in to manage your website' : 'Đăng nhập để quản lý website'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block font-accent text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {t.login.username}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition text-sm sm:text-base"
              placeholder={language === 'en' ? 'Enter your username' : 'Nhập tên đăng nhập'}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-accent text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {t.login.password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition text-sm sm:text-base"
              placeholder={language === 'en' ? 'Enter your password' : 'Nhập mật khẩu'}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light text-white font-accent font-semibold py-2.5 sm:py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? t.login.loggingIn : t.login.loginButton}
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center">
          <a 
            href="/" 
            className="font-sans text-xs sm:text-sm text-gold hover:text-gold-light transition-colors"
          >
            ← {language === 'en' ? 'Back to Website' : 'Về trang chủ'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
