import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserInfo } from '../../services/apiService';
import { useApp } from '../contexts/AppContext';
import { translations } from '../locales/translations';

const Dashboard = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const { language } = useApp();
  const t = translations[language];

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const stats = [
    { label: t.dashboard.totalProjects, value: '1', color: 'bg-blue-500' },
    { label: t.dashboard.teamMembers, value: '4', color: 'bg-green-500' },
    { label: 'FAQs', value: '10', color: 'bg-purple-500' },
    { label: t.dashboard.activePages, value: '5', color: 'bg-gold' },
  ];

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t.dashboard.title}
        </h1>
        <p className="font-sans text-sm sm:text-base text-gray-700 dark:text-gray-300">
          {t.dashboard.welcome}, {userInfo?.username || 'Admin'}! 👋
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg opacity-20`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {t.dashboard.quickActions}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <a
            href="/admin/home"
            className="flex items-center p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <div className="bg-gold bg-opacity-10 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-accent font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{t.dashboard.manageHome}</p>
              <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{t.home.heroSection}</p>
            </div>
          </a>

          <a
            href="/admin/projects"
            className="flex items-center p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <div className="bg-gold bg-opacity-10 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-accent font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{t.dashboard.manageProjects}</p>
              <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{t.projects.addNew}</p>
            </div>
          </a>

          <a
            href="/admin/team"
            className="flex items-center p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <div className="bg-gold bg-opacity-10 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-accent font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{t.dashboard.manageTeam}</p>
              <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{t.team.addMember}</p>
            </div>
          </a>

          <a
            href="/admin/faq"
            className="flex items-center p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <div className="bg-gold bg-opacity-10 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-accent font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{t.dashboard.manageFAQ}</p>
              <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{t.faq.addQuestion}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
