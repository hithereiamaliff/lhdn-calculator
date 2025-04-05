import React from 'react';
import { TaxInput } from '../../types/tax';
import { reliefLimits } from '../../utils/taxCalculator';

interface TaxReliefsProps {
  input: TaxInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isExceedingLimit: (value: number, limit: number) => boolean;
  formatCurrency: (amount: number) => string;
}

const TaxReliefs: React.FC<TaxReliefsProps> = ({
  input,
  onChange,
  isExceedingLimit,
  formatCurrency,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Parents & Medical</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Parents Medical (Combined limit: RM{reliefLimits.parentsMedical.total.toLocaleString()})
            </label>
            <input
              type="number"
              name="parentsMedical"
              value={input.parentsMedical || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                isExceedingLimit(input.parentsMedical, reliefLimits.parentsMedical.total)
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {isExceedingLimit(input.parentsMedical, reliefLimits.parentsMedical.total) && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds maximum limit of {formatCurrency(reliefLimits.parentsMedical.total)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Parents Medical Examination (Max: RM{reliefLimits.parentsMedical.examination.toLocaleString()})
            </label>
            <input
              type="number"
              name="parentsExamination"
              value={input.parentsExamination || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                isExceedingLimit(input.parentsExamination, reliefLimits.parentsMedical.examination)
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {isExceedingLimit(input.parentsExamination, reliefLimits.parentsMedical.examination) && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds maximum limit of {formatCurrency(reliefLimits.parentsMedical.examination)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700">Medical & Support</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Basic Supporting Equipment (Max: RM{reliefLimits.basicSupporting.toLocaleString()})
            </label>
            <input
              type="number"
              name="basicSupporting"
              value={input.basicSupporting || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                isExceedingLimit(input.basicSupporting, reliefLimits.basicSupporting)
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {isExceedingLimit(input.basicSupporting, reliefLimits.basicSupporting) && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds maximum limit of {formatCurrency(reliefLimits.basicSupporting)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Medical Treatment (Combined limit: RM{reliefLimits.medicalTreatment.total.toLocaleString()})
            </label>
            <input
              type="number"
              name="medicalTreatment"
              value={input.medicalTreatment || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                isExceedingLimit(input.medicalTreatment, reliefLimits.medicalTreatment.total)
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {isExceedingLimit(input.medicalTreatment, reliefLimits.medicalTreatment.total) && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds maximum limit of {formatCurrency(reliefLimits.medicalTreatment.total)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Medical Checkup (Max: RM{reliefLimits.medicalCheckup.toLocaleString()})
            </label>
            <input
              type="number"
              name="medicalCheckup"
              value={input.medicalCheckup || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Vaccination Cost (Max: RM{reliefLimits.medicalTreatment.vaccination.toLocaleString()})
            </label>
            <input
              type="number"
              name="vaccinationCost"
              value={input.vaccinationCost || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                isExceedingLimit(input.vaccinationCost, reliefLimits.medicalTreatment.vaccination)
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {isExceedingLimit(input.vaccinationCost, reliefLimits.medicalTreatment.vaccination) && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds maximum limit of {formatCurrency(reliefLimits.medicalTreatment.vaccination)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Dental Treatment (Max: RM{reliefLimits.medicalTreatment.dental.toLocaleString()})
            </label>
            <input
              type="number"
              name="dentalTreatment"
              value={input.dentalTreatment || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                isExceedingLimit(input.dentalTreatment, reliefLimits.medicalTreatment.dental)
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {isExceedingLimit(input.dentalTreatment, reliefLimits.medicalTreatment.dental) && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds maximum limit of {formatCurrency(reliefLimits.medicalTreatment.dental)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mental Health (Max: RM{reliefLimits.mentalHealth.toLocaleString()})
            </label>
            <input
              type="number"
              name="mentalHealth"
              value={input.mentalHealth || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700">Education</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Education Fees (Combined limit: RM{reliefLimits.educationFees.total.toLocaleString()})
            </label>
            <input
              type="number"
              name="educationFees"
              value={input.educationFees || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                isExceedingLimit(input.educationFees, reliefLimits.educationFees.total)
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {isExceedingLimit(input.educationFees, reliefLimits.educationFees.total) && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds maximum limit of {formatCurrency(reliefLimits.educationFees.total)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Upskilling/Self-enhancement (Max: RM{reliefLimits.educationFees.upskilling.toLocaleString()})
            </label>
            <input
              type="number"
              name="upskilling"
              value={input.upskilling || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                isExceedingLimit(input.upskilling, reliefLimits.educationFees.upskilling)
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {isExceedingLimit(input.upskilling, reliefLimits.educationFees.upskilling) && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds maximum limit of {formatCurrency(reliefLimits.educationFees.upskilling)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Child Education (Max: RM{reliefLimits.childEducation.toLocaleString()})
            </label>
            <input
              type="number"
              name="childEducation"
              value={input.childEducation || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700">Lifestyle & Child Care</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Lifestyle (Max: RM{reliefLimits.lifestyle.toLocaleString()})
            </label>
            <input
              type="number"
              name="lifestyle"
              value={input.lifestyle || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Lifestyle Sports (Max: RM{reliefLimits.lifestyleSports.toLocaleString()})
            </label>
            <input
              type="number"
              name="lifestyleSports"
              value={input.lifestyleSports || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Child Care (Max: RM{reliefLimits.childCare.toLocaleString()})
            </label>
            <input
              type="number"
              name="childCare"
              value={input.childCare || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Breastfeeding Equipment (Max: RM{reliefLimits.breastfeedingEquipment.toLocaleString()})
            </label>
            <input
              type="number"
              name="breastfeedingEquipment"
              value={input.breastfeedingEquipment || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Child Disability Support (Max: RM{reliefLimits.childDisabilitySupport.toLocaleString()})
            </label>
            <input
              type="number"
              name="childDisabilitySupport"
              value={input.childDisabilitySupport || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700">Insurance & Others</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Life Insurance (Max: RM{reliefLimits.lifeInsurance.toLocaleString()})
            </label>
            <input
              type="number"
              name="lifeInsurance"
              value={input.lifeInsurance || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Education Insurance (Max: RM{reliefLimits.educationInsurance.toLocaleString()})
            </label>
            <input
              type="number"
              name="educationInsurance"
              value={input.educationInsurance || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Zakat
            </label>
            <input
              type="number"
              name="zakat"
              value={input.zakat || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Donations
            </label>
            <input
              type="number"
              name="donations"
              value={input.donations || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxReliefs;
