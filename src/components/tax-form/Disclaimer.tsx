import { useState, useEffect } from 'react';
import Modal from '../Modal';

function Disclaimer() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    if (hasSeenDisclaimer) {
      setIsOpen(false);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenDisclaimer', 'true');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Important Disclaimer</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            This tax calculator is an unofficial tool and is not affiliated with, endorsed by, or connected to Lembaga Hasil Dalam Negeri (LHDN) 
            or Inland Revenue Board of Malaysia. It is developed independently based on publicly available tax information.
          </p>
          <p>
            While we strive to maintain accuracy, this calculator should be used for estimation purposes only. For official tax matters and 
            accurate calculations, please:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Consult a qualified tax professional</li>
            <li>Refer to official LHDN/IRB guidelines</li>
            <li>Use official LHDN/IRB e-Filing system</li>
          </ul>
        </div>
        <button
          onClick={handleClose}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          I Understand
        </button>
      </div>
    </Modal>
  );
}

export default Disclaimer;
