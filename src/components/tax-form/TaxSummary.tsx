import React from 'react';
import { TaxResult } from '../../types/tax';

interface TaxSummaryProps {
  result: TaxResult | null;
  formatCurrency: (amount: number) => string;
}

const TaxSummary: React.FC<TaxSummaryProps> = ({ result, formatCurrency }) => {
  if (!result) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Tax Summary</h3>
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Income</span>
            <span className="font-medium">{formatCurrency(result.totalIncome)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Relief</span>
            <span className="font-medium">{formatCurrency(result.totalRelief)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxable Income</span>
            <span className="font-medium">{formatCurrency(result.taxableIncome)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Total Tax</span>
              <span className="font-semibold text-blue-600">{formatCurrency(result.totalTax)}</span>
            </div>
          </div>
        </div>
      </div>
      {result.nonTaxableThreshold > 0 && (
        <div className="rounded-lg bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            Note: The first {formatCurrency(result.nonTaxableThreshold)} of your income is not taxable based on your assessment type and status.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxSummary;
