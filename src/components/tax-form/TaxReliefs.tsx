import type { ChangeEvent } from 'react';
import { TaxInput } from '../../types/tax';
import { reliefLimits } from '../../utils/taxCalculator';

interface ExtendedReliefLimits {
  educationSavings: number;
  breastfeeding: number;
}

const extendedLimits: ExtendedReliefLimits = {
  educationSavings: 8000, // SSPN Education Savings
  breastfeeding: 1000, // Breastfeeding Equipment
};

const allReliefLimits = {
  ...reliefLimits,
  ...extendedLimits,
};

type TaxReliefsProps = {
  input: TaxInput;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  return (
    <div className="space-y-6">
      {/* Medical Expenses */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">Medical Expenses</h4>
        
        <div>
          <label htmlFor="medicalTreatment" className="block text-sm font-medium text-gray-700">
            Serious Diseases & Fertility Treatment (RM)
          </label>
          <input
            type="number"
            name="medicalTreatment"
            id="medicalTreatment"
            value={input.medicalTreatment || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.medicalTreatment.total)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.medicalTreatment, reliefLimits.medicalTreatment.total) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.medicalTreatment.total.toLocaleString()}</p>
        </div>

        <div>
          <label htmlFor="vaccinationCost" className="block text-sm font-medium text-gray-700">
            Vaccination Costs (RM)
          </label>
          <input
            type="number"
            name="vaccinationCost"
            id="vaccinationCost"
            value={input.vaccinationCost || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.medicalTreatment.vaccination)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.vaccinationCost, reliefLimits.medicalTreatment.vaccination) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.medicalTreatment.vaccination)}</p>
        </div>

        <div>
          <label htmlFor="dentalTreatment" className="block text-sm font-medium text-gray-700">
            Dental Treatment (RM)
          </label>
          <input
            type="number"
            name="dentalTreatment"
            id="dentalTreatment"
            value={input.dentalTreatment || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.medicalTreatment.dental)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.dentalTreatment, reliefLimits.medicalTreatment.dental) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.medicalTreatment.dental)}</p>
        </div>

        <div>
          <label htmlFor="medicalCheckup" className="block text-sm font-medium text-gray-700">
            Medical Check-up & COVID-19 Testing (RM)
          </label>
          <input
            type="number"
            name="medicalCheckup"
            id="medicalCheckup"
            value={input.medicalCheckup || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.medicalCheckup)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.medicalCheckup, reliefLimits.medicalCheckup) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.medicalCheckup.toLocaleString()}</p>
        </div>

        <div>
          <label htmlFor="mentalHealth" className="block text-sm font-medium text-gray-700">
            Mental Health Treatment (RM)
          </label>
          <input
            type="number"
            name="mentalHealth"
            id="mentalHealth"
            value={input.mentalHealth || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.mentalHealth)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.mentalHealth, reliefLimits.mentalHealth) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.medicalCheckup.toLocaleString()}</p>
        </div>

        <div>
          <label htmlFor="parentsMedical" className="block text-sm font-medium text-gray-700">
            Parents Medical Care (RM)
          </label>
          <input
            type="number"
            name="parentsMedical"
            id="parentsMedical"
            value={input.parentsMedical || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.parentsMedical.total)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.parentsMedical, reliefLimits.parentsMedical.total) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.parentsMedical.total)}</p>
        </div>

        <div>
          <label htmlFor="parentsExamination" className="block text-sm font-medium text-gray-700">
            Parents Medical Examination (RM)
          </label>
          <input
            type="number"
            name="parentsExamination"
            id="parentsExamination"
            value={input.parentsExamination || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.parentsMedical.examination)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.parentsExamination, reliefLimits.parentsMedical.examination) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.parentsMedical.examination)}</p>
        </div>
      </div>

      {/* Savings & Retirement */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">Savings & Retirement</h4>
        
        <div>
          <label htmlFor="sspnDeposit" className="block text-sm font-medium text-gray-700">
            SSPN Net Deposit (RM)
          </label>
          <input
            type="number"
            name="sspnDeposit"
            id="sspnDeposit"
            value={input.sspnDeposit || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.sspn)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.sspnDeposit, reliefLimits.sspn) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Net deposit (Deposit - Withdrawal) limited to {formatCurrency(reliefLimits.sspn)}</p>
        </div>

        <div>
          <label htmlFor="deferredAnnuityPrs" className="block text-sm font-medium text-gray-700">
            Deferred Annuity and Private Retirement Scheme (PRS) (RM)
          </label>
          <input
            type="number"
            name="deferredAnnuityPrs"
            id="deferredAnnuityPrs"
            value={input.deferredAnnuityPrs || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.deferredAnnuityPrs)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.deferredAnnuityPrs, reliefLimits.deferredAnnuityPrs) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.deferredAnnuityPrs)}</p>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">Lifestyle</h4>
        
        <div>
          <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700">
            Books, Computer, Internet, Self-Development (RM)
          </label>
          <input
            type="number"
            name="lifestyle"
            id="lifestyle"
            value={input.lifestyle || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.lifestyle)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.lifestyle, reliefLimits.lifestyle) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.lifestyle)}</p>
        </div>

        <div>
          <label htmlFor="lifestyleSports" className="block text-sm font-medium text-gray-700">
            Sports Equipment & Gym Membership (RM)
          </label>
          <input
            type="number"
            name="lifestyleSports"
            id="lifestyleSports"
            value={input.lifestyleSports || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.lifestyleSports)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.lifestyleSports, reliefLimits.lifestyleSports) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.lifestyleSports)}</p>
        </div>

        <div>
          <label htmlFor="evChargingFacilities" className="block text-sm font-medium text-gray-700">
            Electric Vehicle Charging Facilities (RM)
          </label>
          <input
            type="number"
            name="evChargingFacilities"
            id="evChargingFacilities"
            value={input.evChargingFacilities || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.evChargingFacilities)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.evChargingFacilities, reliefLimits.evChargingFacilities) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.evChargingFacilities)}</p>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4 border-b pb-4">
        <h4 className="text-md font-medium text-gray-700">Education</h4>
        
        <div>
          <label htmlFor="educationFees" className="block text-sm font-medium text-gray-700">
            Higher Education Fees (RM)
          </label>
          <input
            type="number"
            name="educationFees"
            id="educationFees"
            value={input.educationFees || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.educationFees.total)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.educationFees, reliefLimits.educationFees.total) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.educationFees.total)}</p>
        </div>

        <div>
          <label htmlFor="upskilling" className="block text-sm font-medium text-gray-700">
            Upskilling & Self-Enhancement Courses (RM)
          </label>
          <input
            type="number"
            name="upskilling"
            id="upskilling"
            value={input.upskilling || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.educationFees.upskilling)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.upskilling, reliefLimits.educationFees.upskilling) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.educationFees.upskilling)}</p>
        </div>

      </div>

      {/* Child Care */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Child Care</h4>
        
        <div>
          <label htmlFor="childCare" className="block text-sm font-medium text-gray-700">
            Child Care Fees (Children under 6) (RM)
          </label>
          <input
            type="number"
            name="childCare"
            id="childCare"
            value={input.childCare || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.childCare)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.childCare, reliefLimits.childCare) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.childCare)}</p>
        </div>

        <div>
          <label htmlFor="breastfeedingEquipment" className="block text-sm font-medium text-gray-700">
            Breastfeeding Equipment (Once per 2 years) (RM)
          </label>
          <input
            type="number"
            name="breastfeedingEquipment"
            id="breastfeedingEquipment"
            value={input.breastfeedingEquipment || ''}
            onChange={createLimitedChangeHandler(onChange, allReliefLimits.breastfeeding)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.breastfeedingEquipment, allReliefLimits.breastfeeding) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(allReliefLimits.breastfeeding)}</p>
        </div>

        <div>
          <label htmlFor="childDisabilitySupport" className="block text-sm font-medium text-gray-700">
            Child Disability Support & Rehabilitation (RM)
          </label>
          <input
            type="number"
            name="childDisabilitySupport"
            id="childDisabilitySupport"
            value={input.childDisabilitySupport || ''}
            onChange={createLimitedChangeHandler(onChange, reliefLimits.childDisabilitySupport)}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.childDisabilitySupport, reliefLimits.childDisabilitySupport) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to {formatCurrency(reliefLimits.childDisabilitySupport)}</p>
        </div>
      </div>
    </div>
  );
};

export default TaxReliefs;
