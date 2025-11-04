import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserInfo } from '../../services/apiService';

const Dashboard = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const stats = [
    { label: 'Projects', value: '1', color: 'bg-blue-500' },
    { label: 'Team Members', value: '4', color: 'bg-green-500' },
    { label: 'FAQs', value: '10', color: 'bg-purple-500' },
    { label: 'Page Views', value: '---', color: 'bg-gold' },
  ];

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-2">
          Dashboard
        </h1>
        <p className="font-sans text-sm sm:text-base text-text-secondary">
          Welcome back, {userInfo?.username || 'Admin'}! 👋
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="font-sans text-xs sm:text-sm text-text-secondary mb-1">
                  {stat.label}
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg opacity-20`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-primary mb-3 sm:mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <a
            href="/admin/footer"
            className="flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-gold hover:bg-gray-50 transition-all duration-200"
          >
            <div className="bg-gold bg-opacity-10 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-accent font-semibold text-text-primary text-sm sm:text-base">Manage Footer</p>
              <p className="font-sans text-xs sm:text-sm text-text-secondary truncate">Edit footer sections</p>
            </div>
          </a>

          <a
            href="/admin/faq"
            className="flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-gold hover:bg-gray-50 transition-all duration-200"
          >
            <div className="bg-gold bg-opacity-10 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-accent font-semibold text-text-primary">Manage FAQ</p>
              <p className="font-sans text-sm text-text-secondary">Edit FAQ page settings</p>
            </div>
          </a>

          <a
            href="/admin/projects"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gold hover:bg-gray-50 transition-all duration-200"
          >
            <div className="bg-gold bg-opacity-10 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="font-accent font-semibold text-text-primary">Manage Projects</p>
              <p className="font-sans text-sm text-text-secondary">Add or edit projects</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-serif text-2xl font-bold text-text-primary mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center py-3 border-b border-gray-100">
            <div className="bg-gold bg-opacity-10 p-2 rounded-lg mr-4">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-sans text-sm text-text-primary">Admin panel created</p>
              <p className="font-sans text-xs text-text-secondary">Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
