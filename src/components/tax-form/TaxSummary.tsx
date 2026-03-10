import { useTranslation } from 'react-i18next';
import { TaxResult } from '../../types/tax';

interface TaxSummaryProps {
  result: TaxResult | null;
  formatCurrency: (amount: number) => string;
}

const TaxSummary = ({ result, formatCurrency }: TaxSummaryProps) => {
  const { t } = useTranslation();

  if (!result) return null;

  const getThresholdMessage = () => {
    const { assessmentType, numChildren } = result;

    if (!assessmentType || assessmentType === 'single') {
      return t('summary.threshold.single', { amount: formatCurrency(result.nonTaxableThreshold) });
    }

    const assessmentText = assessmentType === 'joint'
      ? t('taxpayer.joint')
      : t('taxpayer.separate');

    if (numChildren === 0) {
      return t('summary.threshold.withChildren_zero', { assessment: assessmentText, amount: formatCurrency(result.nonTaxableThreshold) });
    } else if (numChildren === 1) {
      return t('summary.threshold.withChildren_one', { assessment: assessmentText, amount: formatCurrency(result.nonTaxableThreshold) });
    } else {
      return t('summary.threshold.withChildren_other', { assessment: assessmentText, amount: formatCurrency(result.nonTaxableThreshold) });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{t('summary.title')}</h3>
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('summary.totalIncome')}</span>
            <span className="font-medium">{formatCurrency(result.totalIncome)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('summary.totalRelief')}</span>
            <span className="font-medium">{formatCurrency(result.totalRelief)}</span>
          </div>
          {result.donationDeduction > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">{t('summary.donationDeduction')}</span>
              <span className="font-medium">{formatCurrency(result.donationDeduction)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">{t('summary.chargeableIncome')}</span>
            <span className="font-medium">{formatCurrency(result.taxableIncome)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('summary.taxBeforeRebates')}</span>
            <span className="font-medium">{formatCurrency(result.totalTax)}</span>
          </div>
          {(result.individualRebate > 0 || result.spouseRebate > 0 || result.zakatRebate > 0) && (
            <div className="flex justify-between text-green-600">
              <span>{t('summary.totalRebates')}</span>
              <span>-{formatCurrency(result.individualRebate + result.spouseRebate + result.zakatRebate)}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">{t('summary.taxPayable')}</span>
              <span className="font-semibold text-blue-600">{formatCurrency(result.taxPayable)}</span>
            </div>
          </div>
        </div>
      </div>
      {result.nonTaxableThreshold > 0 && (
        <div className="rounded-lg bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            {getThresholdMessage()}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxSummary;
