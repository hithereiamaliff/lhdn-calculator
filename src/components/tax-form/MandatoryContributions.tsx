type ChangeHandler = (e: { target: HTMLInputElement }) => void;
import { useTranslation } from 'react-i18next';
import { TaxInput } from '../../types/tax';
import { reliefLimits } from '../../utils/taxCalculator';

interface MandatoryContributionsProps {
  input: TaxInput;
  onChange: ChangeHandler;
  isExceedingLimit: (value: number | undefined | string, limit: number) => boolean;
  formatCurrency: (amount: number) => string;
  reliefLimits: typeof reliefLimits;
}

const validateInputValue = (value: string, limit: number): string => {
  if (value === '') return '';
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) return '0';
  return Math.min(numValue, limit).toString();
};

const createLimitedChangeHandler = (
  originalHandler: ChangeHandler,
  limit: number
): ChangeHandler => (e) => {
  const validatedValue = validateInputValue(e.target.value, limit);
  e.target.value = validatedValue;
  originalHandler(e);
};

const MandatoryContributions = ({
  input,
  onChange,
  isExceedingLimit,
  formatCurrency,
  reliefLimits
}: MandatoryContributionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{t('contributions.title')}</h3>
      <div className="rounded-lg bg-gray-50 p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            {t('contributions.epfMandatory')}
          </label>
          <input
            type="number"
            name="epfMandatoryContribution"
            value={input.epfMandatoryContribution || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.epf.mandatory)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.epfMandatoryContribution, reliefLimits.epf.mandatory) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.epf.mandatory) })}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            {t('contributions.epfVoluntary')}
          </label>
          <input
            type="number"
            name="epfVoluntaryContribution"
            value={input.epfVoluntaryContribution || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.epf.voluntary)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.epfVoluntaryContribution, reliefLimits.epf.voluntary) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.epf.voluntary) })}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            {t('contributions.socso')}
          </label>
          <input
            type="number"
            name="socsoContribution"
            value={input.socsoContribution || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.socso)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.socsoContribution, reliefLimits.socso) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.socso) })}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mt-6">{t('contributions.insurance')}</h3>
      <div className="rounded-lg bg-gray-50 p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            {t('contributions.lifeInsurance')}
          </label>
          <input
            type="number"
            name="lifeInsurance"
            value={input.lifeInsurance || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.epf.voluntary)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.lifeInsurance, reliefLimits.epf.voluntary) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('contributions.lifeInsuranceHelper', { amount: reliefLimits.epf.voluntary.toLocaleString() })}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            {t('contributions.educationInsurance')}
          </label>
          <input
            type="number"
            name="educationInsurance"
            value={input.educationInsurance || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.educationInsurance)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.educationInsurance, reliefLimits.educationInsurance) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.educationInsurance) })}</p>
        </div>
      </div>
    </div>
  );
};

export default MandatoryContributions;
