import React from 'react';
import { TaxInput, AssessmentType } from '../../types/tax';

interface TaxPayerInfoProps {
  input: TaxInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const TaxPayerInfo: React.FC<TaxPayerInfoProps> = ({ input, onChange }) => {
  const handleAssessmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Annual Income
            </label>
            <input
              type="number"
              name="annualIncome"
              value={input.annualIncome || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Assessment Type
            </label>
            <select
              name="assessmentType"
              value={input.assessmentType}
              onChange={handleAssessmentChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="single">Single Assessment</option>
              <option value="separate">Separate Assessment</option>
              <option value="joint">Joint Assessment</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasMTD"
                checked={input.hasMTD}
                onChange={onChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Has Monthly Tax Deduction (PCB/MTD)</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isMarried"
                checked={input.isMarried}
                onChange={onChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Married</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isDisabled"
                checked={input.isDisabled}
                onChange={onChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Disabled Individual</span>
            </label>
          </div>
          {input.isMarried && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="hasDisabledSpouse"
                  checked={input.hasDisabledSpouse}
                  onChange={onChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Disabled Spouse</span>
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-lg bg-blue-50 p-4">
        <h4 className="text-sm font-medium text-blue-800">Automatic Reliefs Applied:</h4>
        <ul className="mt-2 list-inside list-disc text-sm text-blue-700">
          <li>Individual Relief: RM9,000</li>
          {input.isDisabled && <li>Disabled Individual Relief: RM6,000</li>}
          {input.isMarried && (
            <>
              <li>Spouse Relief: RM4,000</li>
              {input.hasDisabledSpouse && <li>Disabled Spouse Relief: RM5,000</li>}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaxPayerInfo;
