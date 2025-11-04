import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      title="Toggle Language"
    >
      <span className="text-lg">🌐</span>
      <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
        {i18n.language === 'en' ? 'EN' : 'VI'}
      </span>
    </button>
  );
};
