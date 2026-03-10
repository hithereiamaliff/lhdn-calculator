import { useTranslation } from 'react-i18next';
import { Calculator } from 'lucide-react';
import TaxForm from './components/TaxForm';

function App() {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (lang: 'en' | 'ms') => {
    localStorage.setItem('lhdn-language', lang);
    localStorage.setItem('lhdn-lang-chosen', 'true');
    void i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                {t('app.title')}
              </h1>
            </div>
            <div className="flex rounded-full bg-gray-200 p-0.5">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  i18n.language === 'en' ? 'bg-white shadow text-blue-600 font-medium' : 'text-gray-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('ms')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  i18n.language === 'ms' ? 'bg-white shadow text-blue-600 font-medium' : 'text-gray-600'
                }`}
              >
                BM
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            {t('app.subtitle')}
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <TaxForm />
      </main>
    </div>
  );
}

export default App;
