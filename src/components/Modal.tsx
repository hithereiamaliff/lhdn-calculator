import * as React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Delay setting isAnimating to true to ensure initial state is visible
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto transition-all duration-300 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out ${isAnimating ? 'opacity-40' : 'opacity-0'}`} 
          onClick={onClose}
        />
        
        {/* Modal */}
        <div 
          className={`relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl transform transition-all duration-300 ease-out ${isAnimating ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-8 scale-95 opacity-0'}`}
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
