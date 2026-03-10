import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';

function Disclaimer() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(true);
  // Show language selector if user hasn't explicitly chosen a language before
  const [showLangSelect, setShowLangSelect] = React.useState(
    () => !localStorage.getItem('lhdn-lang-chosen')
  );

  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem('lhdn-language', lang);
    localStorage.setItem('lhdn-lang-chosen', 'true');
    void i18n.changeLanguage(lang);
    setShowLangSelect(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={showLangSelect ? () => {} : handleClose}>
      {showLangSelect ? (
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Select Language / Pilih Bahasa</h2>
          <p className="text-gray-600">Choose your preferred language to continue.</p>
          <p className="text-gray-500 text-sm">Pilih bahasa pilihan anda untuk meneruskan.</p>
          <div className="flex gap-4 justify-center pt-2">
            <button
              onClick={() => handleLanguageSelect('en')}
              className="flex-1 max-w-[180px] px-6 py-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center"
            >
              <span className="block text-lg font-semibold text-gray-900">English</span>
              <span className="block text-sm text-gray-500 mt-1">EN</span>
            </button>
            <button
              onClick={() => handleLanguageSelect('ms')}
              className="flex-1 max-w-[180px] px-6 py-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center"
            >
              <span className="block text-lg font-semibold text-gray-900">Bahasa Melayu</span>
              <span className="block text-sm text-gray-500 mt-1">BM</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('disclaimer.title')}</h2>
          <div className="space-y-4 text-gray-600">
            <p>{t('disclaimer.body1')}</p>
            <p>{t('disclaimer.body2')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('disclaimer.item1')}</li>
              <li>{t('disclaimer.item2')}</li>
              <li>{t('disclaimer.item3')}</li>
            </ul>
          </div>
          <button
            onClick={handleClose}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {t('disclaimer.button')}
          </button>
        </div>
      )}
    </Modal>
  );
}

export default Disclaimer;
