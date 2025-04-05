import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
type InputChangeEvent = { target: HTMLInputElement | HTMLSelectElement };

// Import the actual components and utilities
import { TaxInput, TaxResult, initialState as initialTaxState } from '../types/tax'; 
import { calculateTax, reliefLimits } from '../utils/taxCalculator'; 
import { formatCurrency } from '../utils/formatter'; 
import TaxPayerInfo from './tax-form/TaxPayerInfo';
import Disclaimer from './tax-form/Disclaimer';
import MandatoryContributions from './tax-form/MandatoryContributions';
import TaxReliefs from './tax-form/TaxReliefs';
import TaxSummary from './tax-form/TaxSummary';

const isExceedingLimit = (value: number | undefined | string, limit: number) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return (numericValue || 0) > limit;
};

function TaxForm() { 
  const [input, setInput] = useState<TaxInput>(initialTaxState); 
  const [result, setResult] = useState<TaxResult | null>(null); 
  const [currentStep, setCurrentStep] = useState(1); 
  const [errors, setErrors] = useState<Partial<Record<keyof TaxInput, string>>>({});
  const [isCalculating, setIsCalculating] = useState(false); 

  const handleInputChange = (e: InputChangeEvent) => { 
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

  const calculateTaxWithAnimation = async () => {
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const taxResult = calculateTax(input);
    setResult(taxResult);
    setIsCalculating(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setInput(initialTaxState);
    setResult(null);
    setCurrentStep(1);
    setErrors({});
    setIsCalculating(false);
    scrollToTop();
  };

  const nextStep = () => {
    const nextStepNumber = Math.min(currentStep + 1, 4);
    setCurrentStep(nextStepNumber);
    scrollToTop();
    if (nextStepNumber === 4) {
      calculateTaxWithAnimation();
    }
  };

  const prevStep = () => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 1));
    scrollToTop();
  };



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Disclaimer />
            <TaxPayerInfo input={input} onChange={handleInputChange} errors={errors} isExceedingLimit={isExceedingLimit} formatCurrency={formatCurrency} />
          </>
        ); 
      case 2:
        return <MandatoryContributions input={input} onChange={handleInputChange} isExceedingLimit={isExceedingLimit} formatCurrency={formatCurrency} reliefLimits={reliefLimits} />; 
      case 3: 
        return <TaxReliefs input={input} onChange={handleInputChange} isExceedingLimit={isExceedingLimit} formatCurrency={formatCurrency} />; 
      case 4:
        if (isCalculating) {
          return (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Calculating your tax...</p>
            </div>
          );
        }
        return (
          <>
            <TaxSummary result={result} formatCurrency={formatCurrency} />
            {result && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
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
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Start New Calculation
                  </button>
                </div>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6 mb-12">
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
          ) : null}
        </div>
      </form>

      {/* Source reference and credits */}
      <div className="text-center text-sm text-gray-500 border-t pt-8 space-y-4">
        <div>
          <span>Tax information from: </span>
          <a
            href="https://www.hasil.gov.my/en/individual/introduction-individual-income-tax/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            LHDN Official Website
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
        <div>
          Made with <span className="text-red-500">❤️</span> by{' '}
          <a
            href="https://mynameisaliff.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Aliff
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaxForm;
