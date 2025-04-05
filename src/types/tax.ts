export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  fixedAmount: number;
}

export type AssessmentType = 'single' | 'separate' | 'joint';

export interface TaxInput {
  annualIncome: number;
  epfContribution: number;
  socsoContribution: number;
  hasMTD: boolean;
  isMarried: boolean;
  assessmentType: AssessmentType;
  // Personal
  isDisabled: boolean;
  hasDisabledSpouse: boolean;
  // Parents
  parentsMedical: number;
  parentsExamination: number;
  // Medical & Support
  basicSupporting: number;
  medicalTreatment: number;
  medicalCheckup: number;
  vaccinationCost: number;
  dentalTreatment: number;
  mentalHealth: number;
  // Education
  educationFees: number;
  upskilling: number;
  childEducation: number;
  // Lifestyle
  lifestyle: number;
  lifestyleSports: number;
  // Child Care
  childCare: number;
  breastfeedingEquipment: number;
  childDisabilitySupport: number;
  // Insurance
  lifeInsurance: number;
  educationInsurance: number;
  // Children
  numChildrenBelow18: number;
  numChildrenAbove18Education: number;
  numDisabledChildren: number;
  numDisabledChildrenStudying: number;
  // Others
  zakat: number;
  donations: number;
}

export interface TaxResult {
  totalIncome: number;
  totalRelief: number;
  taxableIncome: number;
  taxPayable: number;
  totalTax: number;
  eligibleForTax: boolean;
  individualRebate: number;
  spouseRebate: number;
  effectiveRate: number;
  nonTaxableThreshold: number;
  taxBracketBreakdown: {
    bracket: TaxBracket;
    amount: number;
    tax: number;
  }[];
}