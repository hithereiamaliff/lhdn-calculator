import * as React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-200 ${isOpen ? 'opacity-40' : 'opacity-0'}`} 
          onClick={onClose}
        />
        
        {/* Modal */}
        <div 
          className={`relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl transition-all duration-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
