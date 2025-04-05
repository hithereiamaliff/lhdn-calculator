import React, { useState, ChangeEvent, FormEvent, FC } from 'react';
import { Calculator, ArrowLeft, ArrowRight } from 'lucide-react';

// Import the actual components and utilities
import { TaxInput, TaxResult, initialState as initialTaxState } from '../types/tax'; 
import { calculateTax, reliefLimits } from '../utils/taxCalculator'; 
import { formatCurrency } from '../utils/formatter'; 
import TaxPayerInfo from './tax-form/TaxPayerInfo';
import MandatoryContributions from './tax-form/MandatoryContributions';
import TaxReliefs from './tax-form/TaxReliefs';
import TaxSummary from './tax-form/TaxSummary';

const isExceedingLimit = (value: number | undefined | string, limit: number) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return (numericValue || 0) > limit;
};

const TaxForm: FC = () => { 
  const [input, setInput] = useState<TaxInput>(initialTaxState); 
  const [result, setResult] = useState<TaxResult | null>(null); 
  const [currentStep, setCurrentStep] = useState<number>(1); 
  const [errors, setErrors] = useState<Partial<Record<keyof TaxInput, string>>>({}); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    const target = e.target as HTMLInputElement; // Assert target as HTMLInputElement for type safety
    const { name, value, type, checked } = target;
    const parsedValue = value === '' ? 0 : parseFloat(value);

    setInput((prev: TaxInput) => ({ 
      ...prev,
      [name]: type === 'checkbox' ? checked : isNaN(parsedValue) ? value : parsedValue
    }));
    if (errors[name as keyof TaxInput]) {
        setErrors((prev: Partial<Record<keyof TaxInput, string>>) => { 
          const updatedErrors = { ...prev };
          delete updatedErrors[name as keyof TaxInput];
          return updatedErrors;
        });
    }
  };

  const nextStep = () => {
    setCurrentStep((prev: number) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const taxResult = calculateTax(input); 
    setResult(taxResult);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TaxPayerInfo input={input} onChange={handleInputChange} errors={errors} isExceedingLimit={isExceedingLimit} formatCurrency={formatCurrency} />; 
      case 2:
        return <MandatoryContributions input={input} onChange={handleInputChange} errors={errors} isExceedingLimit={isExceedingLimit} formatCurrency={formatCurrency} reliefLimits={reliefLimits} />; 
      case 3: 
        return <TaxReliefs input={input} onChange={handleInputChange} isExceedingLimit={isExceedingLimit} formatCurrency={formatCurrency} />; 
      case 4: 
        return <TaxSummary result={result} formatCurrency={formatCurrency} />; 
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStep()}
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
