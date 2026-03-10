import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { TaxInput } from '../../types/tax';
import { reliefLimits } from '../../utils/taxCalculator';

type TaxReliefsProps = {
  input: TaxInput;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isExceedingLimit: (value: number | undefined | string, limit: number) => boolean;
  formatCurrency: (amount: number) => string;
};

const validateInputValue = (value: string, limit: number): string => {
  if (value === '') return '';
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) return '0';
  const limitedValue = Math.min(numValue, limit);
  // Preserve the exact decimal places from the input
  const decimalPlaces = value.includes('.') ? value.split('.')[1].length : 0;
  return limitedValue.toFixed(decimalPlaces);
};

const createLimitedChangeHandler = (
  originalHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  limit: number
) => (e: ChangeEvent<HTMLInputElement>) => {
  const validatedValue = validateInputValue(e.target.value, limit);
  e.target.value = validatedValue;
  originalHandler(e);
};

const TaxReliefs = ({
  input,
  onChange,
  isExceedingLimit,
  formatCurrency,
}: TaxReliefsProps) => {
  const { t } = useTranslation();
  const housingLoanLimit = input.housingLoanTier === 'tier1' ? reliefLimits.housingLoanInterest.tier1
    : input.housingLoanTier === 'tier2' ? reliefLimits.housingLoanInterest.tier2
    : 0;

  return (
    <div className="space-y-6">
      {/* Medical Expenses */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">{t('reliefs.medicalExpenses')}</h4>

        <div>
          <label htmlFor="medicalTreatment" className="block text-sm font-medium text-gray-700">
            {t('reliefs.seriousDiseases')}
          </label>
          <input
            type="number"
            name="medicalTreatment"
            id="medicalTreatment"
            value={input.medicalTreatment || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.medicalTreatment.total)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.medicalTreatment, reliefLimits.medicalTreatment.total) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.seriousDiseasesHelper', { amount: formatCurrency(reliefLimits.medicalTreatment.total) })}</p>
        </div>

        <div>
          <label htmlFor="vaccinationCost" className="block text-sm font-medium text-gray-700">
            {t('reliefs.vaccination')}
          </label>
          <input
            type="number"
            name="vaccinationCost"
            id="vaccinationCost"
            value={input.vaccinationCost || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.medicalTreatment.vaccination)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.vaccinationCost, reliefLimits.medicalTreatment.vaccination) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.vaccinationHelper', { amount: formatCurrency(reliefLimits.medicalTreatment.vaccination) })}</p>
        </div>

        <div>
          <label htmlFor="dentalTreatment" className="block text-sm font-medium text-gray-700">
            {t('reliefs.dental')}
          </label>
          <input
            type="number"
            name="dentalTreatment"
            id="dentalTreatment"
            value={input.dentalTreatment || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.medicalTreatment.dental)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.dentalTreatment, reliefLimits.medicalTreatment.dental) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.dentalHelper', { amount: formatCurrency(reliefLimits.medicalTreatment.dental) })}</p>
        </div>

        <div>
          <label htmlFor="medicalCheckup" className="block text-sm font-medium text-gray-700">
            {t('reliefs.medicalCheckup')}
          </label>
          <input
            type="number"
            name="medicalCheckup"
            id="medicalCheckup"
            value={input.medicalCheckup || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.medicalCheckupAndMental)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit((input.medicalCheckup || 0) + (input.mentalHealth || 0), reliefLimits.medicalCheckupAndMental) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.medicalCheckupHelper', { amount: formatCurrency(reliefLimits.medicalCheckupAndMental) })}</p>
        </div>

        <div>
          <label htmlFor="mentalHealth" className="block text-sm font-medium text-gray-700">
            {t('reliefs.mentalHealth')}
          </label>
          <input
            type="number"
            name="mentalHealth"
            id="mentalHealth"
            value={input.mentalHealth || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.medicalCheckupAndMental)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit((input.medicalCheckup || 0) + (input.mentalHealth || 0), reliefLimits.medicalCheckupAndMental) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.mentalHealthHelper', { amount: formatCurrency(reliefLimits.medicalCheckupAndMental) })}</p>
        </div>

        <div>
          <label htmlFor="basicSupporting" className="block text-sm font-medium text-gray-700">
            {t('reliefs.basicSupporting')}
          </label>
          <input
            type="number"
            name="basicSupporting"
            id="basicSupporting"
            value={input.basicSupporting || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.basicSupporting)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.basicSupporting, reliefLimits.basicSupporting) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.basicSupporting) })}</p>
        </div>

        <div>
          <label htmlFor="parentsMedical" className="block text-sm font-medium text-gray-700">
            {t('reliefs.parentsMedical')}
          </label>
          <input
            type="number"
            name="parentsMedical"
            id="parentsMedical"
            value={input.parentsMedical || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.parentsMedical.total)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.parentsMedical, reliefLimits.parentsMedical.total) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.parentsMedicalHelper', { amount: formatCurrency(reliefLimits.parentsMedical.total) })}</p>
        </div>

        <div>
          <label htmlFor="parentsExamination" className="block text-sm font-medium text-gray-700">
            {t('reliefs.parentsExamination')}
          </label>
          <input
            type="number"
            name="parentsExamination"
            id="parentsExamination"
            value={input.parentsExamination || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.parentsMedical.examination)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.parentsExamination, reliefLimits.parentsMedical.examination) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.parentsExaminationHelper', { amount: formatCurrency(reliefLimits.parentsMedical.examination) })}</p>
        </div>
      </div>

      {/* Savings & Retirement */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">{t('reliefs.savingsRetirement')}</h4>

        <div>
          <label htmlFor="sspnDeposit" className="block text-sm font-medium text-gray-700">
            {t('reliefs.sspn')}
          </label>
          <input
            type="number"
            name="sspnDeposit"
            id="sspnDeposit"
            value={input.sspnDeposit || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.sspn)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.sspnDeposit, reliefLimits.sspn) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.sspnHelper', { amount: formatCurrency(reliefLimits.sspn) })}</p>
        </div>

        <div>
          <label htmlFor="deferredAnnuityPrs" className="block text-sm font-medium text-gray-700">
            {t('reliefs.deferredAnnuity')}
          </label>
          <input
            type="number"
            name="deferredAnnuityPrs"
            id="deferredAnnuityPrs"
            value={input.deferredAnnuityPrs || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.deferredAnnuityPrs)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.deferredAnnuityPrs, reliefLimits.deferredAnnuityPrs) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.deferredAnnuityPrs) })}</p>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">{t('reliefs.lifestyle')}</h4>

        <div>
          <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700">
            {t('reliefs.lifestyleBooks')}
          </label>
          <input
            type="number"
            name="lifestyle"
            id="lifestyle"
            value={input.lifestyle || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.lifestyle)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.lifestyle, reliefLimits.lifestyle) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.lifestyle) })}</p>
        </div>

        <div>
          <label htmlFor="lifestyleSports" className="block text-sm font-medium text-gray-700">
            {t('reliefs.lifestyleSports')}
          </label>
          <input
            type="number"
            name="lifestyleSports"
            id="lifestyleSports"
            value={input.lifestyleSports || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.lifestyleSports)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.lifestyleSports, reliefLimits.lifestyleSports) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.lifestyleSports) })}</p>
        </div>

        <div>
          <label htmlFor="evChargingFacilities" className="block text-sm font-medium text-gray-700">
            {t('reliefs.evCharging')}
          </label>
          <input
            type="number"
            name="evChargingFacilities"
            id="evChargingFacilities"
            value={input.evChargingFacilities || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.evChargingFacilities)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.evChargingFacilities, reliefLimits.evChargingFacilities) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.evChargingFacilities) })}</p>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">{t('reliefs.education')}</h4>

        <div>
          <label htmlFor="educationFees" className="block text-sm font-medium text-gray-700">
            {t('reliefs.educationFees')}
          </label>
          <input
            type="number"
            name="educationFees"
            id="educationFees"
            value={input.educationFees || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.educationFees.total)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.educationFees, reliefLimits.educationFees.total) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.educationFeesHelper', { amount: formatCurrency(reliefLimits.educationFees.total) })}</p>
        </div>

        <div>
          <label htmlFor="upskilling" className="block text-sm font-medium text-gray-700">
            {t('reliefs.upskilling')}
          </label>
          <input
            type="number"
            name="upskilling"
            id="upskilling"
            value={input.upskilling || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.educationFees.upskilling)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.upskilling, reliefLimits.educationFees.upskilling) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.upskillingHelper', { amount: formatCurrency(reliefLimits.educationFees.upskilling) })}</p>
        </div>
      </div>

      {/* Child Care */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">{t('reliefs.childCare')}</h4>

        <div>
          <label htmlFor="childCare" className="block text-sm font-medium text-gray-700">
            {t('reliefs.childCareFees')}
          </label>
          <input
            type="number"
            name="childCare"
            id="childCare"
            value={input.childCare || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.childCare)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.childCare, reliefLimits.childCare) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.childCare) })}</p>
        </div>

        <div>
          <label htmlFor="breastfeedingEquipment" className="block text-sm font-medium text-gray-700">
            {t('reliefs.breastfeeding')}
          </label>
          <input
            type="number"
            name="breastfeedingEquipment"
            id="breastfeedingEquipment"
            value={input.breastfeedingEquipment || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.breastfeedingEquipment)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.breastfeedingEquipment, reliefLimits.breastfeedingEquipment) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.breastfeedingEquipment) })}</p>
        </div>

        <div>
          <label htmlFor="childDisabilitySupport" className="block text-sm font-medium text-gray-700">
            {t('reliefs.childDisability')}
          </label>
          <input
            type="number"
            name="childDisabilitySupport"
            id="childDisabilitySupport"
            value={input.childDisabilitySupport || ''}
            onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, reliefLimits.childDisabilitySupport)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.childDisabilitySupport, reliefLimits.childDisabilitySupport) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(reliefLimits.childDisabilitySupport) })}</p>
        </div>
      </div>

      {/* Housing Loan Interest (NEW YA 2025) */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">{t('reliefs.housingLoan')}</h4>
        <p className="text-sm text-gray-500">{t('reliefs.housingLoanNote')}</p>

        <div>
          <label htmlFor="housingLoanTier" className="block text-sm font-medium text-gray-700">
            {t('reliefs.housePriceTier')}
          </label>
          <select
            name="housingLoanTier"
            id="housingLoanTier"
            value={input.housingLoanTier}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="none">{t('reliefs.tierNone')}</option>
            <option value="tier1">{t('reliefs.tier1')}</option>
            <option value="tier2">{t('reliefs.tier2')}</option>
          </select>
        </div>

        {input.housingLoanTier !== 'none' && (
          <div>
            <label htmlFor="housingLoanInterest" className="block text-sm font-medium text-gray-700">
              {t('reliefs.housingLoanInterest')}
            </label>
            <input
              type="number"
              name="housingLoanInterest"
              id="housingLoanInterest"
              value={input.housingLoanInterest || ''}
              onChange={createLimitedChangeHandler(onChange as (e: ChangeEvent<HTMLInputElement>) => void, housingLoanLimit)}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.housingLoanInterest, housingLoanLimit) ? 'border-red-300' : 'border-gray-300'}`}
            />
            <p className="mt-1 text-sm text-gray-500">{t('common.limitedTo', { amount: formatCurrency(housingLoanLimit) })}</p>
          </div>
        )}
      </div>

      {/* Zakat & Donations */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">{t('reliefs.zakatDonations')}</h4>

        <div>
          <label htmlFor="zakat" className="block text-sm font-medium text-gray-700">
            {t('reliefs.zakat')}
          </label>
          <input
            type="number"
            name="zakat"
            id="zakat"
            value={input.zakat || ''}
            onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.zakatHelper')}</p>
        </div>

        <div>
          <label htmlFor="donations" className="block text-sm font-medium text-gray-700">
            {t('reliefs.donations')}
          </label>
          <input
            type="number"
            name="donations"
            id="donations"
            value={input.donations || ''}
            onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">{t('reliefs.donationsHelper')}</p>
        </div>
      </div>
    </div>
  );
};

export default TaxReliefs;
