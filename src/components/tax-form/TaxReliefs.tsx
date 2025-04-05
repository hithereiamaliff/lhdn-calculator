import React, { ChangeEvent } from 'react';
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
};

const TaxReliefs: FC<TaxReliefsProps> = ({
  input,
  onChange,
  isExceedingLimit,
}) => {
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
            onChange={onChange}
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.vaccinationCost, reliefLimits.medicalTreatment.vaccination) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.medicalTreatment.vaccination.toLocaleString()}</p>
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.dentalTreatment, reliefLimits.medicalTreatment.dental) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.medicalTreatment.dental.toLocaleString()}</p>
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
            onChange={onChange}
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.mentalHealth, reliefLimits.medicalCheckup) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.medicalCheckup.toLocaleString()}</p>
        </div>

        <div>
          <label htmlFor="parentsMedicalCare" className="block text-sm font-medium text-gray-700">
            Parents Medical Care (RM)
          </label>
          <input
            type="number"
            name="parentsMedicalCare"
            id="parentsMedicalCare"
            value={input.parentsMedicalCare || ''}
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.parentsMedicalCare, reliefLimits.parentsMedical.total) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.parentsMedical.total.toLocaleString()}</p>
        </div>

        <div>
          <label htmlFor="parentsMedicalExamination" className="block text-sm font-medium text-gray-700">
            Parents Medical Examination (RM)
          </label>
          <input
            type="number"
            name="parentsMedicalExamination"
            id="parentsMedicalExamination"
            value={input.parentsMedicalExamination || ''}
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.parentsMedicalExamination, reliefLimits.parentsMedical.examination) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.parentsMedical.examination.toLocaleString()}</p>
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.lifestyle, reliefLimits.lifestyle) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.lifestyle.toLocaleString()}</p>
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.lifestyleSports, reliefLimits.lifestyleSports) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.lifestyleSports.toLocaleString()}</p>
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.educationFees, reliefLimits.educationFees.total) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.educationFees.total.toLocaleString()}</p>
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.upskilling, reliefLimits.educationFees.upskilling) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.educationFees.upskilling.toLocaleString()}</p>
        </div>

        <div>
          <label htmlFor="educationSavings" className="block text-sm font-medium text-gray-700">
            SSPN Education Savings (Net Deposit) (RM)
          </label>
          <input
            type="number"
            name="educationSavings"
            id="educationSavings"
            value={input.educationSavings || ''}
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.educationSavings, allReliefLimits.educationSavings) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{allReliefLimits.educationSavings.toLocaleString()}</p>
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.childCare, reliefLimits.childCare) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.childCare.toLocaleString()}</p>
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.breastfeedingEquipment, allReliefLimits.breastfeeding) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{allReliefLimits.breastfeeding.toLocaleString()}</p>
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
            onChange={onChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isExceedingLimit(input.childDisabilitySupport, reliefLimits.childDisabilitySupport) ? 'border-red-300' : 'border-gray-300'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Limited to RM{reliefLimits.childDisabilitySupport.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TaxReliefs;
