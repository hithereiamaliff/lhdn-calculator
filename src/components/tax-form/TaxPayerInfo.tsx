import React, { useState } from 'react';
import MTDInfoModal from '../modals/MTDInfoModal';
import { TaxInput } from '../../types/tax';
import { reliefLimits } from '../../utils/taxCalculator';

interface TaxPayerInfoProps {
  input: TaxInput;
  nonTaxableThreshold: number;
  canSkipReliefSteps: boolean;
  onChange: (e: { target: { name: string; value: string; type: string; checked?: boolean } }) => void;
}

const TaxPayerInfo = ({ input, nonTaxableThreshold, canSkipReliefSteps, onChange }: TaxPayerInfoProps) => {
  const [showMTDInfo, setShowMTDInfo] = useState(false);
  const handleAssessmentChange = (e: { target: { value: string } }) => {
    const newAssessmentType = e.target.value;
    
    // Set isMarried based on assessment type
    onChange({
      target: {
        name: 'isMarried',
        value: String(newAssessmentType !== 'single'),
        type: 'checkbox',
        checked: newAssessmentType !== 'single'
      }
    });

    // Reset spouse-only fields when switching to single assessment
    if (newAssessmentType === 'single') {
      onChange({
        target: {
          name: 'hasDisabledSpouse',
          value: 'false',
          type: 'checkbox',
          checked: false
        }
      });
    }
    
    // Update assessment type
    onChange({
      target: {
        name: 'assessmentType',
        value: newAssessmentType,
        type: 'select'
      }
    });
  };

  const showChildThresholdNote = input.assessmentType === 'separate' || input.assessmentType === 'joint';

  return (
    <>
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
              Type of Assessment
            </label>
            <select
              name="assessmentType"
              value={input.assessmentType}
              onChange={handleAssessmentChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="single">Individual Assessment</option>
              <option value="separate">Separate Assessment (Taksiran Berasingan)</option>
              <option value="joint">Joint Assessment (Taksiran Bersama)</option>
            </select>
            {showChildThresholdNote && (
              <p className="mt-1 text-sm text-gray-500">
                Different tax thresholds apply based on number of children
              </p>
            )}
          </div>
          {input.annualIncome > 0 && (
            <div className={`rounded-lg p-4 ${canSkipReliefSteps ? 'bg-green-50' : 'bg-blue-50'}`}>
              <p className={`text-sm ${canSkipReliefSteps ? 'text-green-800' : 'text-blue-800'}`}>
                Non-taxable threshold for this assessment: RM{nonTaxableThreshold.toLocaleString()}
              </p>
              {canSkipReliefSteps && (
                <p className="mt-1 text-sm text-green-700">
                  Your current income is at or below this threshold, so you can skip the remaining relief pages and go straight to the result.
                </p>
              )}
            </div>
          )}
          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-700">Children Information</h4>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Number of Children Below 18
              </label>
              <input
                type="number"
                name="numChildrenBelow18"
                value={input.numChildrenBelow18 || ''}
                onChange={onChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Number of Children 18+ in Pre-U / A-Level / Certificate / Matriculation
              </label>
              <input
                type="number"
                name="numChildrenAbove18Education"
                value={input.numChildrenAbove18Education || ''}
                onChange={onChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">RM{reliefLimits.childAbove18Education.toLocaleString()} relief per eligible child</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Number of Children 18+ in Diploma / Degree / Higher Education
              </label>
              <input
                type="number"
                name="numChildrenAbove18HigherEducation"
                value={input.numChildrenAbove18HigherEducation || ''}
                onChange={onChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">RM{reliefLimits.childEducation.toLocaleString()} relief per eligible child</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Number of Disabled Children
              </label>
              <input
                type="number"
                name="numDisabledChildren"
                value={input.numDisabledChildren || ''}
                onChange={onChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">Additional RM{reliefLimits.disabledChild.toLocaleString()} relief per disabled child</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Number of Disabled Children (18+ in Education)
              </label>
              <input
                type="number"
                name="numDisabledChildrenStudying"
                value={input.numDisabledChildrenStudying || ''}
                onChange={onChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">Additional RM{reliefLimits.disabledChildStudying.toLocaleString()} relief per disabled child studying (diploma or above)</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasMTD"
                checked={input.hasMTD}
                onChange={(e) => {
                  onChange(e);
                  setShowMTDInfo(true);
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Has Monthly Tax Deduction (PCB/MTD)</span>
              <button
                type="button"
                onClick={() => setShowMTDInfo(true)}
                className="ml-1 text-blue-500 hover:text-blue-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
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
          {(input.assessmentType === 'separate' || input.assessmentType === 'joint') && (
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
          <li>Individual Relief: RM{reliefLimits.individual.toLocaleString()}</li>
          {input.isDisabled && <li>Disabled Individual Relief: RM{reliefLimits.disabled.toLocaleString()}</li>}
          {(input.assessmentType === 'separate' || input.assessmentType === 'joint') && (
            <li>
              {input.hasDisabledSpouse
                ? `Disabled Spouse Relief: RM${reliefLimits.disabledSpouse.toLocaleString()}`
                : `Spouse Relief: RM${reliefLimits.spouse.toLocaleString()}`}
            </li>
          )}
        </ul>
      </div>
    </div>
    <MTDInfoModal isOpen={showMTDInfo} onClose={() => setShowMTDInfo(false)} />
    </>
  );
};

export default TaxPayerInfo;
