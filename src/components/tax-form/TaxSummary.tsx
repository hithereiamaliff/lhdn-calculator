import { TaxResult } from '../../types/tax';

interface TaxSummaryProps {
  result: TaxResult | null;
  formatCurrency: (amount: number) => string;
}

const TaxSummary = ({ result, formatCurrency }: TaxSummaryProps) => {
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
          {(result.individualRebate > 0 || result.spouseRebate > 0) && (
            <div className="flex justify-between text-green-600">
              <span>Tax Rebate</span>
              <span>-{formatCurrency(result.individualRebate + result.spouseRebate)}</span>
            </div>
          )}
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
            Note: You won't be taxed if your annual employment income is {formatCurrency(result.nonTaxableThreshold)} and below.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxSummary;
