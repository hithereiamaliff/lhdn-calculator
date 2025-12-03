import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface URLVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  siteName?: string;
  ownerNote?: string;
}

export function URLVerifyModal({ isOpen, onClose, targetUrl, siteName = 'external site', ownerNote }: URLVerifyModalProps) {
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
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Verify External Link</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  You are about to visit <span className="font-semibold text-gray-900">{siteName}</span>.
                </p>
                {targetUrl.includes('techmavie.digital') && (
                  <p className="text-gray-500 text-xs">
                    This site is owned and maintained by Aliff.
                  </p>
                )}
                {targetUrl.includes('hasil.gov.my') && (
                  <p className="text-gray-500 text-xs">
                    This is the official LHDN website by the Malaysian government.
                  </p>
                )}
                
                {ownerNote && (
                  <p className="text-gray-500 text-xs italic">
                    {ownerNote}
                  </p>
                )}
                
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-white text-xs mb-1">Please verify the URL before proceeding:</p>
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
                    Cancel
                  </button>
                  <button
                    onClick={handleOpenLink}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm inline-flex items-center justify-center gap-2"
                  >
                    Go Now
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
