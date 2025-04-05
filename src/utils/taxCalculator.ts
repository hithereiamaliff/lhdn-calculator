import { TaxBracket, TaxInput, TaxResult } from '../types/tax';

// 2024 Tax Brackets
export const taxBrackets: TaxBracket[] = [
  { min: 0, max: 5000, rate: 0, fixedAmount: 0 },
  { min: 5001, max: 20000, rate: 1, fixedAmount: 0 },
  { min: 20001, max: 35000, rate: 3, fixedAmount: 150 },
  { min: 35001, max: 50000, rate: 6, fixedAmount: 600 },
  { min: 50001, max: 70000, rate: 11, fixedAmount: 1500 },
  { min: 70001, max: 100000, rate: 19, fixedAmount: 3700 },
  { min: 100001, max: 400000, rate: 25, fixedAmount: 9400 },
  { min: 400001, max: 600000, rate: 26, fixedAmount: 84400 },
  { min: 600001, max: 2000000, rate: 28, fixedAmount: 136400 },
  { min: 2000001, max: null, rate: 30, fixedAmount: 528400 }
];

// 2024 Relief Limits
export const reliefLimits = {
  // Automatic reliefs
  individual: 9000,
  spouse: 4000,
  disabled: 6000,
  disabledSpouse: 5000,
  // Parents
  parentsMedical: {
    total: 8000, // Combined limit for all parents' medical expenses
    examination: 1000 // Sub-limit for complete medical examination
  },
  // Medical & Support
  basicSupporting: 6000,
  medicalTreatment: {
    total: 10000, // Combined limit for all medical expenses
    vaccination: 1000, // Sub-limit for vaccination
    dental: 1000 // Sub-limit for dental
  },
  medicalCheckup: 1000,
  mentalHealth: 1000,
  // Education
  educationFees: {
    total: 7000, // Combined limit for all education fees
    upskilling: 2000 // Sub-limit for upskilling/self-enhancement courses
  },
  childEducation: 8000,
  // Lifestyle
  lifestyle: 2500,
  lifestyleSports: 1000,
  // Child Care
  childCare: 3000,
  breastfeedingEquipment: 1000,
  childDisabilitySupport: 4000,
  // Insurance
  lifeInsurance: 7000,
  educationInsurance: 3000,
  socso: 350,
  // Children
  childBelow18: 2000,
  childAbove18Education: 2000,
  disabledChild: 6000,
  disabledChildStudying: 8000
};

// Non-taxable income thresholds
const THRESHOLDS = {
  single: 37333, // Single/Widower/Divorcee/Spouse with no income
  separate: {
    noChild: 37333,
    oneChild: 39333,
    twoChildren: 41333
  },
  joint: {
    noChild: 48000,
    oneChild: 50000,
    twoChildren: 52000
  }
};

const REBATE_INCOME_THRESHOLD = 35000;
const INDIVIDUAL_REBATE = 400;
const SPOUSE_REBATE = 400;

export const calculateTax = (input: TaxInput): TaxResult => {
  // Calculate non-taxable threshold based on assessment type
  let nonTaxableThreshold = THRESHOLDS.single;
  
  if (input.isMarried) {
    const childCount = input.numChildrenBelow18 + input.numChildrenAbove18Education;
    const thresholds = THRESHOLDS[input.assessmentType === 'joint' ? 'joint' : 'separate'];
    
    if (childCount >= 2) {
      nonTaxableThreshold = thresholds.twoChildren;
    } else if (childCount === 1) {
      nonTaxableThreshold = thresholds.oneChild;
    } else {
      nonTaxableThreshold = thresholds.noChild;
    }
  }

  // Check MTD and income threshold eligibility
  const eligibleForTax = input.annualIncome > nonTaxableThreshold && input.hasMTD;

  // Calculate automatic reliefs
  const automaticReliefs = reliefLimits.individual + 
    (input.isDisabled ? reliefLimits.disabled : 0) +
    (input.hasDisabledSpouse ? reliefLimits.disabledSpouse : 0) +
    (input.isMarried ? reliefLimits.spouse : 0) +
    (input.numChildrenBelow18 * reliefLimits.childBelow18) +
    (input.numChildrenAbove18Education * reliefLimits.childAbove18Education) +
    (input.numDisabledChildren * reliefLimits.disabledChild) +
    (input.numDisabledChildrenStudying * reliefLimits.disabledChildStudying);
  // Apply relief limits
  const limitedInput = {
    ...input,
    // Apply parents' medical relief limits
    parentsExamination: Math.min(input.parentsExamination || 0, reliefLimits.parentsMedical.examination),
    parentsMedical: Math.min(
      (input.parentsMedical || 0) + Math.min(input.parentsExamination || 0, reliefLimits.parentsMedical.examination),
      reliefLimits.parentsMedical.total
    ),
    basicSupporting: Math.min(input.basicSupporting, reliefLimits.basicSupporting),
    medicalCheckup: Math.min(input.medicalCheckup, reliefLimits.medicalCheckup),
    mentalHealth: Math.min(input.mentalHealth, reliefLimits.mentalHealth),
    // Apply sub-limits first
    vaccinationCost: Math.min(input.vaccinationCost, reliefLimits.medicalTreatment.vaccination),
    dentalTreatment: Math.min(input.dentalTreatment, reliefLimits.medicalTreatment.dental),
    // Then apply combined limit for medical treatment
    medicalTreatment: Math.min(
      input.medicalTreatment + 
      Math.min(input.vaccinationCost, reliefLimits.medicalTreatment.vaccination) + 
      Math.min(input.dentalTreatment, reliefLimits.medicalTreatment.dental),
      reliefLimits.medicalTreatment.total
    ),
    // Apply education fees limits
    upskilling: Math.min(input.upskilling || 0, reliefLimits.educationFees.upskilling),
    educationFees: Math.min(
      (input.educationFees || 0) + Math.min(input.upskilling || 0, reliefLimits.educationFees.upskilling),
      reliefLimits.educationFees.total
    ),
    childEducation: Math.min(input.childEducation, reliefLimits.childEducation),
    lifestyle: Math.min(input.lifestyle, reliefLimits.lifestyle),
    lifestyleSports: Math.min(input.lifestyleSports, reliefLimits.lifestyleSports),
    childCare: Math.min(input.childCare, reliefLimits.childCare),
    breastfeedingEquipment: Math.min(input.breastfeedingEquipment, reliefLimits.breastfeedingEquipment),
    childDisabilitySupport: Math.min(input.childDisabilitySupport, reliefLimits.childDisabilitySupport),
    lifeInsurance: Math.min(input.lifeInsurance, reliefLimits.lifeInsurance),
    educationInsurance: Math.min(input.educationInsurance, reliefLimits.educationInsurance),
    socsoContribution: Math.min(input.socsoContribution, reliefLimits.socso)
  };

  // Calculate total relief including automatic reliefs
  const totalRelief = 
    automaticReliefs +
    limitedInput.epfContribution +
    limitedInput.socsoContribution +
    limitedInput.parentsMedical +
    limitedInput.basicSupporting +
    limitedInput.medicalTreatment +
    limitedInput.medicalCheckup +
    limitedInput.vaccinationCost +
    limitedInput.dentalTreatment +
    limitedInput.mentalHealth +
    limitedInput.educationFees +
    limitedInput.childEducation +
    limitedInput.lifestyle +
    limitedInput.lifestyleSports +
    limitedInput.childCare +
    limitedInput.breastfeedingEquipment +
    limitedInput.childDisabilitySupport +
    limitedInput.lifeInsurance +
    limitedInput.educationInsurance +
    limitedInput.zakat +
    limitedInput.donations;

  // Calculate taxable income
  const taxableIncome = Math.max(0, input.annualIncome - totalRelief);

  // Calculate rebates
  const individualRebate = taxableIncome <= REBATE_INCOME_THRESHOLD ? INDIVIDUAL_REBATE : 0;
  const spouseRebate = input.isMarried && taxableIncome <= REBATE_INCOME_THRESHOLD ? SPOUSE_REBATE : 0;

  // Initialize tax calculation
  let remainingIncome = taxableIncome;
  let totalTax = 0;
  const breakdown = [];

  // Calculate tax progressively through brackets
  for (let i = 0; i < taxBrackets.length; i++) {
    const bracket = taxBrackets[i];
    const nextBracket = taxBrackets[i + 1];

    if (remainingIncome <= 0) break;

    const bracketMax = bracket.max ?? Infinity;
    const bracketRange = bracketMax - bracket.min + 1;
    const bracketAmount = Math.min(remainingIncome, bracketRange);

    if (bracketAmount <= 0) continue;

    const bracketTax = (bracketAmount * bracket.rate) / 100;
    totalTax += bracketTax;
    remainingIncome -= bracketAmount;

    breakdown.push({
      bracket,
      amount: bracketAmount,
      tax: bracketTax
    });

    if (!nextBracket) break;
  }

  // Apply rebates
  totalTax = Math.max(0, totalTax - individualRebate - spouseRebate);

  return {
    totalIncome: input.annualIncome,
    totalRelief,
    taxableIncome,
    taxPayable: totalTax,
    totalTax,
    eligibleForTax,
    individualRebate,
    spouseRebate,
    effectiveRate: totalTax > 0 ? (totalTax / taxableIncome) * 100 : 0,
    nonTaxableThreshold,
    taxBracketBreakdown: breakdown
  };
};