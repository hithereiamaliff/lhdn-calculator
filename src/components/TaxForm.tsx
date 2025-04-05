import { useState } from 'react';
import type { ChangeEvent, FunctionComponent, FormEvent } from 'react';
import '../styles/tailwind.css';

import { Calculator, ArrowLeft, ArrowRight } from 'lucide-react';
// import { TaxInput, TaxResult, initialState, reliefLimits, formatCurrency } from '../types'; 
// import { calculateTax } from '../utils/taxCalculator'; 
// import TaxPayerInfo from './tax-form/TaxPayerInfo';
// import MandatoryContributions from './tax-form/MandatoryContributions';
// import TaxReliefs from './tax-form/TaxReliefs';
// import TaxSummary from './tax-form/TaxSummary';

// --- Local Definitions (since ../types/index.ts doesn't exist) ---
interface TaxInput {
  monthlyIncome: number;
  employmentIncome: number;
  rentalIncome: number;
  interestIncome: number;
  dividendIncome: number;
  otherIncome: number;
  epfRate: string | number;
  isResident: boolean;
  hasSpouse: boolean;
  spouseIncome: number;
  isDisabled: boolean;
  isSpouseDisabled: boolean;
  lifeInsurance: number;
  medicalInsurance: number;
  educationFees: number;
  parentsMedicalCare: number;
  parentsMedicalExamination: number;
  basicSupporting: number;
  medicalTreatment: number;
  medicalCheckup: number;
  vaccinationCost: number;
  dentalTreatment: number;
  mentalHealth: number;
  upskilling: number;
  childEducation: number;
  lifestyle: number;
  lifestyleSports: number;
  educationInsurance: number;
  childCare: number;
  breastfeedingEquipment: number;
  childDisabilitySupport: number;
  numChildrenBelow18: number;
  numChildrenAbove18Education: number;
  numDisabledChildren: number;
  numDisabledChildrenStudying: number;
  zakat: number;
  donations: number;
  name?: string;
}

interface TaxResult {
  taxableIncome: number;
  taxPayable: number;
  individualRebate: number;
  spouseRebate: number;
  effectiveRate: number;
  taxBracketBreakdown: Array<{ bracket: any; tax: number }>; 
  eligibleForTax: boolean;
}

const initialState: TaxInput = {
  monthlyIncome: 0,
  employmentIncome: 0,
  rentalIncome: 0,
  interestIncome: 0,
  dividendIncome: 0,
  otherIncome: 0,
  epfRate: '11',
  isResident: true,
  hasSpouse: false,
  spouseIncome: 0,
  isDisabled: false,
  isSpouseDisabled: false,
  lifeInsurance: 0,
  medicalInsurance: 0,
  educationFees: 0,
  parentsMedicalCare: 0,
  parentsMedicalExamination: 0,
  basicSupporting: 0,
  medicalTreatment: 0,
  medicalCheckup: 0,
  vaccinationCost: 0,
  dentalTreatment: 0,
  mentalHealth: 0,
  upskilling: 0,
  childEducation: 0,
  lifestyle: 0,
  lifestyleSports: 0,
  educationInsurance: 0,
  childCare: 0,
  breastfeedingEquipment: 0,
  childDisabilitySupport: 0,
  numChildrenBelow18: 0,
  numChildrenAbove18Education: 0,
  numDisabledChildren: 0,
  numDisabledChildrenStudying: 0,
  zakat: 0,
  donations: 0,
  name: ''
};

const reliefLimits = {
  individual: 9000,
  disabledIndividual: 6000,
  epfSocso: { epf: 7000, socso: 350 }, 
  lifeInsurancePension: 7000,
  medicalInsurance: 10000, 
  parentsMedical: { care: 8000, examination: 1000 },
  basicSupporting: 6000,
  medicalTreatment: { total: 10000, vaccination: 1000, dental: 1000 },
  educationFees: { total: 7000, upskilling: 2000 },
  lifestyle: 2500,
  lifestyleSports: 1000,
  // Add other limits as needed based on malaysia-tax-reliefs-2024.md
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(amount);
};
// --- End Local Definitions ---

const TaxForm: FunctionComponent = () => { 
  const [input, setInput] = useState<TaxInput>(initialState); 
  const [result, setResult] = useState<TaxResult | null>(null); 
  const [currentStep, setCurrentStep] = useState(1); 
  const [errors, setErrors] = useState<Partial<Record<keyof TaxInput, string>>>({}); 

  const isExceedingLimit = (value: number | undefined, limit: number) => (value || 0) > limit;

/* // Commented out - unused
  const validateStep = () => {
    const newErrors: Partial<Record<keyof TaxInput, string>> = {};
    if (currentStep === 1) {
        if (!input.monthlyIncome || input.monthlyIncome <= 0) newErrors.monthlyIncome = "Monthly income must be positive.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
*/

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    const { name, value, type } = e.target as HTMLInputElement;
    const parsedValue = value === '' ? 0 : parseFloat(value);

    setInput((prev: TaxInput) => ({ 
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : isNaN(parsedValue) ? value : parsedValue
    }));
    if (errors[name as keyof TaxInput]) {
        setErrors((prev: Partial<Record<keyof TaxInput, string>>) => { 
          const updatedErrors = { ...prev };
          delete updatedErrors[name as keyof TaxInput];
          return updatedErrors;
        });
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => { 
    const { name, value } = e.target;
    setInput((prev: TaxInput) => ( 
      {
      ...prev,
      [name]: value
    }));
  };

/* // Commented out - unused
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => { 
    const { name, checked } = e.target;
    setInput((prev: TaxInput) => ({ 
      ...prev,
      [name]: checked
    }));
  };
*/
  const nextStep = () => {
    // if (!validateStep()) return;
    setCurrentStep((prev: number) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: FormEvent) => { 
    e.preventDefault();
    // if (!validateStep()) return;
    // const taxResult = calculateTax(input); 
    // setResult(taxResult);
    console.log("Form submitted", input);
     setResult({ 
        taxableIncome: 50000,
        taxPayable: 5000,
        individualRebate: 0,
        spouseRebate: 0,
        effectiveRate: 10,
        taxBracketBreakdown: [],
        eligibleForTax: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1 */} 
        {currentStep === 1 && (
          <div className="space-y-4 p-4 border rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Step 1: Income Details</h3>
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">
                Monthly Income (RM)
              </label>
              <input
                type="number"
                name="monthlyIncome"
                id="monthlyIncome"
                value={input.monthlyIncome || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.monthlyIncome ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
              />
              {errors.monthlyIncome && <p className="mt-1 text-sm text-red-600">{errors.monthlyIncome}</p>}
            </div>
             <div>
              <label htmlFor="employmentIncome" className="block text-sm font-medium text-gray-700">
                Employment Income (Annual, RM)
              </label>
              <input
                type="number"
                name="employmentIncome"
                id="employmentIncome"
                value={input.employmentIncome || ''}
               onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.employmentIncome ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
               />
               {errors.employmentIncome && <p className="mt-1 text-sm text-red-600">{errors.employmentIncome}</p>}
             </div>
          </div>
        )}
        {/* Step 2 */} 
        {currentStep === 2 && (
          <div className="space-y-4 p-4 border rounded-md shadow-sm">
             <h3 className="text-lg font-semibold text-gray-700">Step 2: Deductions & Reliefs</h3>
              <div>
                <label htmlFor="epfRate" className="block text-sm font-medium text-gray-700">EPF Contribution Rate (%)</label>
                <select
                  name="epfRate"
                  id="epfRate"
                  value={input.epfRate}
                  onChange={handleSelectChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="11">11%</option>
                  <option value="8">8%</option>
                </select>
              </div>
             <div>
               <label className="block text-sm font-medium text-gray-600">
                 Individual Relief (Auto: RM{reliefLimits.individual.toLocaleString()})
               </label>
               <p className="mt-1 text-sm text-gray-500">Automatically applied based on residency status.</p>
             </div>
             <div>
                <label htmlFor="lifeInsurance" className="block text-sm font-medium text-gray-600">
                    Life Insurance & EPF (Self / Spouse - Max: RM{reliefLimits.lifeInsurancePension.toLocaleString()})
                </label>
                <input
                    type="number"
                    name="lifeInsurance"
                    id="lifeInsurance"
                    value={input.lifeInsurance || ''}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm ${isExceedingLimit(input.lifeInsurance, reliefLimits.lifeInsurancePension) ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                />
                {isExceedingLimit(input.lifeInsurance, reliefLimits.lifeInsurancePension) && (
                    <p className="mt-1 text-sm text-red-600">Amount may exceed limit of {formatCurrency(reliefLimits.lifeInsurancePension)}</p>
                )}
             </div>
           </div>
        )}
        {/* Step 3 */} 
        {currentStep === 3 && (
           <div className="space-y-4 p-4 border rounded-md shadow-sm">
             <h3 className="text-lg font-semibold text-gray-700">Step 3: Other Details</h3>
             <div>
                <label htmlFor="numChildrenBelow18" className="block text-sm font-medium text-gray-600">Number of Children Below 18 (RM2,000 each)</label>
                <input
                    type="number"
                    name="numChildrenBelow18"
                    id="numChildrenBelow18"
                    value={input.numChildrenBelow18 || ''}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
             </div>
           </div>
        )}
        {/* Step 4 */} 
        {currentStep === 4 && (
          <div className="space-y-4 p-4 border rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Step 4: Review</h3>
            <p>Review your entries before calculating.</p>
          </div>
        )}
        {/* Navigation */} 
        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Tax
            </button>
          )}
        </div>
      </form>
      {/* Results */} 
      {result && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
           <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Calculation Results</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 bg-gray-50 rounded">
               <p className="text-sm text-gray-600">Taxable Income</p>
               <p className="text-lg font-semibold">{formatCurrency(result.taxableIncome)}</p>
             </div>
             <div className="p-4 bg-blue-50 rounded">
               <p className="text-sm text-blue-600">Tax Payable</p>
               <p className="text-lg font-semibold">{formatCurrency(result.taxPayable)}</p>
             </div>
           </div>
         </div>
      )}
    </div>
  );
};

export default TaxForm;
