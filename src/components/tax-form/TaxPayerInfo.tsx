import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [showMTDInfo, setShowMTDInfo] = useState(false);
  const hasAnyChildren = (input.numChildrenBelow18 || 0) > 0
    || (input.numChildrenAbove18Education || 0) > 0
    || (input.numChildrenAbove18HigherEducation || 0) > 0
    || (input.numDisabledChildren || 0) > 0
    || (input.numDisabledChildrenStudying || 0) > 0;
  const [showChildren, setShowChildren] = useState(hasAnyChildren);
  const autoSyncedChildrenVisibility = useRef(hasAnyChildren);

  // Auto-open when saved child values exist, and auto-hide only if that visibility
  // came from existing values rather than an explicit "Yes" choice by the user.
  useEffect(() => {
    if (hasAnyChildren) {
      autoSyncedChildrenVisibility.current = true;
      setShowChildren(true);
      return;
    }

    if (autoSyncedChildrenVisibility.current) {
      setShowChildren(false);
      autoSyncedChildrenVisibility.current = false;
    }
  }, [hasAnyChildren]);

  const handleNoChildren = () => {
    autoSyncedChildrenVisibility.current = false;
    setShowChildren(false);
    // Reset all children fields
    const childFields = ['numChildrenBelow18', 'numChildrenAbove18Education', 'numChildrenAbove18HigherEducation', 'numDisabledChildren', 'numDisabledChildrenStudying'];
    childFields.forEach(field => {
      onChange({ target: { name: field, value: '0', type: 'number' } });
    });
  };

  const handleShowChildren = () => {
    autoSyncedChildrenVisibility.current = false;
    setShowChildren(true);
  };

  // Only allow positive integers for children inputs
  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty while editing, or positive integers only.
    if (val === '' || /^[1-9]\d*$/.test(val)) {
      autoSyncedChildrenVisibility.current = false;
      onChange({ target: { name: e.target.name, value: val, type: 'number' } });
    }
  };

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
        <h3 className="text-lg font-semibold text-gray-700">{t('taxpayer.basicInfo')}</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              {t('taxpayer.annualIncome')}
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
              {t('taxpayer.assessmentType')}
            </label>
            <select
              name="assessmentType"
              value={input.assessmentType}
              onChange={handleAssessmentChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="single">{t('taxpayer.single')}</option>
              <option value="separate">{t('taxpayer.separate')}</option>
              <option value="joint">{t('taxpayer.joint')}</option>
            </select>
            {showChildThresholdNote && (
              <p className="mt-1 text-sm text-gray-500">
                {t('taxpayer.childThresholdNote')}
              </p>
            )}
          </div>
          {input.annualIncome > 0 && (
            <div className={`rounded-lg p-4 ${canSkipReliefSteps ? 'bg-green-50' : 'bg-blue-50'}`}>
              <p className={`text-sm ${canSkipReliefSteps ? 'text-green-800' : 'text-blue-800'}`}>
                {t('taxpayer.nonTaxableThreshold', { amount: nonTaxableThreshold.toLocaleString() })}
              </p>
              {canSkipReliefSteps && (
                <p className="mt-1 text-sm text-green-700">
                  {t('taxpayer.belowThreshold')}
                </p>
              )}
            </div>
          )}
          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-700">{t('taxpayer.childrenInfo')}</h4>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleShowChildren}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                  showChildren
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {t('taxpayer.hasChildrenYes')}
              </button>
              <button
                type="button"
                onClick={handleNoChildren}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                  !showChildren
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {t('taxpayer.hasChildrenNo')}
              </button>
            </div>
            {showChildren && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    {t('taxpayer.childrenBelow18')}
                  </label>
                  <input
                    type="number"
                    name="numChildrenBelow18"
                    value={input.numChildrenBelow18 || ''}
                    onChange={handleChildrenChange}
                    inputMode="numeric"
                    min="1"
                    step="1"
                    onKeyDown={(e) => { if (['e', 'E', '.', '-', '+'].includes(e.key)) e.preventDefault(); }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    {t('taxpayer.childrenAbove18PreU')}
                  </label>
                  <input
                    type="number"
                    name="numChildrenAbove18Education"
                    value={input.numChildrenAbove18Education || ''}
                    onChange={handleChildrenChange}
                    inputMode="numeric"
                    min="1"
                    step="1"
                    onKeyDown={(e) => { if (['e', 'E', '.', '-', '+'].includes(e.key)) e.preventDefault(); }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    {t('taxpayer.childrenAbove18Higher')}
                  </label>
                  <input
                    type="number"
                    name="numChildrenAbove18HigherEducation"
                    value={input.numChildrenAbove18HigherEducation || ''}
                    onChange={handleChildrenChange}
                    inputMode="numeric"
                    min="1"
                    step="1"
                    onKeyDown={(e) => { if (['e', 'E', '.', '-', '+'].includes(e.key)) e.preventDefault(); }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    {t('taxpayer.disabledChildren')}
                  </label>
                  <input
                    type="number"
                    name="numDisabledChildren"
                    value={input.numDisabledChildren || ''}
                    onChange={handleChildrenChange}
                    inputMode="numeric"
                    min="1"
                    step="1"
                    onKeyDown={(e) => { if (['e', 'E', '.', '-', '+'].includes(e.key)) e.preventDefault(); }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    {t('taxpayer.disabledChildrenStudying')}
                  </label>
                  <input
                    type="number"
                    name="numDisabledChildrenStudying"
                    value={input.numDisabledChildrenStudying || ''}
                    onChange={handleChildrenChange}
                    inputMode="numeric"
                    min="1"
                    step="1"
                    onKeyDown={(e) => { if (['e', 'E', '.', '-', '+'].includes(e.key)) e.preventDefault(); }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
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
              <span className="text-sm text-gray-600">{t('taxpayer.hasMTD')}</span>
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
              <span className="text-sm text-gray-600">{t('taxpayer.isDisabled')}</span>
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
                <span className="text-sm text-gray-600">{t('taxpayer.hasDisabledSpouse')}</span>
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-lg bg-blue-50 p-4">
        <h4 className="text-sm font-medium text-blue-800">{t('taxpayer.autoReliefs')}</h4>
        <ul className="mt-2 list-inside list-disc text-sm text-blue-700">
          <li>{t('taxpayer.individualRelief', { amount: reliefLimits.individual.toLocaleString() })}</li>
          {input.isDisabled && <li>{t('taxpayer.disabledRelief', { amount: reliefLimits.disabled.toLocaleString() })}</li>}
          {(input.assessmentType === 'separate' || input.assessmentType === 'joint') && (
            <li>
              {input.hasDisabledSpouse
                ? t('taxpayer.disabledSpouseRelief', { amount: reliefLimits.disabledSpouse.toLocaleString() })
                : t('taxpayer.spouseRelief', { amount: reliefLimits.spouse.toLocaleString() })}
            </li>
          )}
          {(input.numChildrenBelow18 || 0) > 0 && (
            <li>{t('taxpayer.childBelow18Relief', { count: input.numChildrenBelow18, amount: (input.numChildrenBelow18 * reliefLimits.childBelow18).toLocaleString() })}</li>
          )}
          {(input.numChildrenAbove18Education || 0) > 0 && (
            <li>{t('taxpayer.childAbove18PreURelief', { count: input.numChildrenAbove18Education, amount: (input.numChildrenAbove18Education * reliefLimits.childAbove18Education).toLocaleString() })}</li>
          )}
          {(input.numChildrenAbove18HigherEducation || 0) > 0 && (
            <li>{t('taxpayer.childAbove18HigherRelief', { count: input.numChildrenAbove18HigherEducation, amount: (input.numChildrenAbove18HigherEducation * reliefLimits.childEducation).toLocaleString() })}</li>
          )}
          {(input.numDisabledChildren || 0) > 0 && (
            <li>{t('taxpayer.disabledChildRelief', { count: input.numDisabledChildren, amount: (input.numDisabledChildren * reliefLimits.disabledChild).toLocaleString() })}</li>
          )}
          {(input.numDisabledChildrenStudying || 0) > 0 && (
            <li>{t('taxpayer.disabledChildStudyingRelief', { count: input.numDisabledChildrenStudying, amount: (input.numDisabledChildrenStudying * reliefLimits.disabledChildStudying).toLocaleString() })}</li>
          )}
        </ul>
      </div>
    </div>
    <MTDInfoModal isOpen={showMTDInfo} onClose={() => setShowMTDInfo(false)} />
    </>
  );
};

export default TaxPayerInfo;
