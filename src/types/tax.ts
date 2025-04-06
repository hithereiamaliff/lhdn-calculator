export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  fixedAmount: number;
}

export type AssessmentType = 'single' | 'separate' | 'joint';

export interface TaxInput {
  annualIncome: number;
  epfMandatoryContribution: number;
  epfVoluntaryContribution: number;
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
  // New reliefs
  deferredAnnuityPrs: number;
  sspnDeposit: number; // Net deposit amount (total deposit minus withdrawal)
  evChargingFacilities: number;
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
  assessmentType: AssessmentType;
  numChildren: number;
  taxBracketBreakdown: {
    bracket: TaxBracket;
    amount: number;
    tax: number;
  }[];
}

// Initial state definition
export const initialState: TaxInput = {
  annualIncome: 0,
  epfMandatoryContribution: 0,
  epfVoluntaryContribution: 0,
  socsoContribution: 0,
  hasMTD: false,
  isMarried: false,
  assessmentType: 'single',
  isDisabled: false,
  hasDisabledSpouse: false,
  parentsMedical: 0,
  parentsExamination: 0,
  basicSupporting: 0,
  medicalTreatment: 0,
  medicalCheckup: 0,
  vaccinationCost: 0,
  dentalTreatment: 0,
  mentalHealth: 0,
  educationFees: 0,
  upskilling: 0,
  childEducation: 0,
  lifestyle: 0,
  lifestyleSports: 0,
  childCare: 0,
  breastfeedingEquipment: 0,
  childDisabilitySupport: 0,
  deferredAnnuityPrs: 0,
  sspnDeposit: 0,
  evChargingFacilities: 0,
  lifeInsurance: 0,
  educationInsurance: 0,
  numChildrenBelow18: 0,
  numChildrenAbove18Education: 0,
  numDisabledChildren: 0,
  numDisabledChildrenStudying: 0,
  zakat: 0,
  donations: 0,
};