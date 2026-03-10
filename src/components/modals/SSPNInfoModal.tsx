import { useTranslation } from 'react-i18next';

interface SSPNInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SSPNInfoModal = ({ isOpen, onClose }: SSPNInfoModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{t('modals.sspn.title')}</h3>
          <button
            onClick={onClose}
            className="ml-4 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 text-sm text-gray-600">
          <p>{t('modals.sspn.body')}</p>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="font-medium text-blue-800">{t('modals.sspn.formula')}</p>
            <p className="mt-1 text-blue-700">{t('modals.sspn.formulaDesc')}</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-gray-700">{t('modals.sspn.exampleTitle')}</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>{t('modals.sspn.example1')}</li>
              <li>{t('modals.sspn.example2')}</li>
              <li>{t('modals.sspn.example3')}</li>
            </ul>
          </div>
          <p className="text-xs font-medium text-gray-500">{t('modals.sspn.note')}</p>
        </div>
      </div>
    </div>
  );
};

export default SSPNInfoModal;
