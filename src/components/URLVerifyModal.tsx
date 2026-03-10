import { Trans, useTranslation } from 'react-i18next';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface URLVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  siteName?: string;
  ownerNote?: string;
}

export function URLVerifyModal({ isOpen, onClose, targetUrl, siteName, ownerNote }: URLVerifyModalProps) {
  const { t } = useTranslation();
  const resolvedSiteName = siteName ?? t('modals.urlVerify.externalSite');

  if (!isOpen) return null;

  const handleOpenLink = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-xl w-full max-w-md overflow-hidden border border-gray-200 shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label={t('modals.urlVerify.close')}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t('modals.urlVerify.title')}</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  <Trans
                    i18nKey="modals.urlVerify.aboutToVisit"
                    values={{ siteName: resolvedSiteName }}
                    components={{ strong: <strong className="font-semibold text-gray-900" /> }}
                  />
                </p>
                {targetUrl.includes('techmavie.digital') && (
                  <p className="text-gray-500 text-xs">
                    {t('modals.urlVerify.ownedByAliff')}
                  </p>
                )}
                {targetUrl.includes('hasil.gov.my') && (
                  <p className="text-gray-500 text-xs">
                    {t('modals.urlVerify.lhdnOfficial')}
                  </p>
                )}

                {ownerNote && (
                  <p className="text-gray-500 text-xs italic">
                    {ownerNote}
                  </p>
                )}

                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-white text-xs mb-1">{t('modals.urlVerify.verifyUrl')}</p>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-300 flex-shrink-0" />
                    <code className="text-blue-300 text-sm break-all">{targetUrl}</code>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm border border-gray-200"
                  >
                    {t('modals.urlVerify.cancel')}
                  </button>
                  <button
                    onClick={handleOpenLink}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm inline-flex items-center justify-center gap-2"
                  >
                    {t('modals.urlVerify.goNow')}
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default URLVerifyModal;
