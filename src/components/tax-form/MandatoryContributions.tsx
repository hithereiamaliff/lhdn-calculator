import React from 'react';
import { TaxInput } from '../../types/tax';
import { reliefLimits } from '../../utils/taxCalculator';

interface MandatoryContributionsProps {
  input: TaxInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MandatoryContributions: React.FC<MandatoryContributionsProps> = ({ input, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Mandatory Contributions</h3>
      <div className="rounded-lg bg-gray-50 p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            EPF Contribution
          </label>
          <input
            type="number"
            name="epfContribution"
            value={input.epfContribution || ''}
            onChange={onChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            SOCSO Contribution (Max: RM{reliefLimits.socso.toLocaleString()})
          </label>
          <input
            type="number"
            name="socsoContribution"
            value={input.socsoContribution || ''}
            onChange={onChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default MandatoryContributions;
