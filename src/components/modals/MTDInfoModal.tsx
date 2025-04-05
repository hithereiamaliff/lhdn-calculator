import React from 'react';

interface MTDInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MTDInfoModal = ({ isOpen, onClose }: MTDInfoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Tax Deduction (PCB/MTD)</h3>
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
          <p className="font-medium text-blue-600">
            Important: Selecting this option does not affect your tax calculation in this calculator.
          </p>
          <p>
            Monthly Tax Deduction (MTD/PCB) is relevant for your actual tax filing with LHDN:
          </p>
          <ul className="ml-4 list-disc space-y-2">
            <li>Since 2014, if you have MTD and meet certain criteria, you can choose not to file a tax return</li>
            <li>In this case, your MTD will be considered your final tax</li>
            <li>However, if you want to claim additional reliefs, you must submit a tax return</li>
            <li>Late submissions may incur penalties</li>
            <li>LHDN can still raise additional assessments upon receiving your return</li>
          </ul>
          <p className="mt-4 text-xs font-medium text-gray-500">
            This calculator only estimates your total tax liability based on income and reliefs. Your actual tax payment will depend on your MTD amounts and LHDN's assessment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MTDInfoModal;
