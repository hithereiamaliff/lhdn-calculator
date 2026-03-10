import { TaxBracket, TaxInput, TaxResult } from '../types/tax';

// 2025 Tax Brackets (rates unchanged from 2024)
// Using half-open intervals: min is exclusive lower bound, max is inclusive upper bound
// This ensures bracketRange = max - min gives the correct bracket width
export const taxBrackets: TaxBracket[] = [
  { min: 0, max: 5000, rate: 0, fixedAmount: 0 },
  { min: 5000, max: 20000, rate: 1, fixedAmount: 0 },
  { min: 20000, max: 35000, rate: 3, fixedAmount: 150 },
  { min: 35000, max: 50000, rate: 6, fixedAmount: 600 },
  { min: 50000, max: 70000, rate: 11, fixedAmount: 1500 },
  { min: 70000, max: 100000, rate: 19, fixedAmount: 3700 },
  { min: 100000, max: 400000, rate: 25, fixedAmount: 9400 },
  { min: 400000, max: 600000, rate: 26, fixedAmount: 84400 },
  { min: 600000, max: 2000000, rate: 28, fixedAmount: 136400 },
  { min: 2000000, max: null, rate: 30, fixedAmount: 528400 }
];

// 2025 Relief Limits
export const reliefLimits = {
  // Automatic reliefs
  individual: 9000,
  spouse: 4000,
  disabled: 7000, // YA 2025: up from 6,000
  disabledSpouse: 6000, // YA 2025: up from 5,000
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
  // Item #7: Medical checkup, COVID-19 testing, mental health, self-health monitoring,
  // and disease detection tests share ONE combined RM1,000 limit
  medicalCheckupAndMental: 1000,
  // Education
  educationFees: {
    total: 7000, // Combined limit for all education fees
    upskilling: 2000 // Sub-limit for upskilling/self-enhancement courses
  },
  childEducation: 8000, // Child 18+ in diploma / degree / higher education
  // Lifestyle
  lifestyle: 2500,
  lifestyleSports: 1000,
  // Child Care
  childCare: 3000,
  breastfeedingEquipment: 1000,
  childDisabilitySupport: 6000, // YA 2025: up from 4,000
  // EPF & Insurance (Item #17: combined RM7,000)
  epf: {
    mandatory: 4000, // Item 17(i): Mandatory contributions or basic voluntary contributions
    voluntary: 3000 // Item 17(ii): Life insurance OR additional voluntary EPF (shared sub-limit)
  },
  educationInsurance: 4000, // YA 2025: up from 3,000 (Item #19: Education and medical insurance)
  socso: 350,
  deferredAnnuityPrs: 3000, // Deferred Annuity and Private Retirement Scheme
  // Children
  childBelow18: 2000,
  childAbove18Education: 2000,
  disabledChild: 8000, // YA 2025: up from 6,000
  disabledChildStudying: 8000,
  // Others
  sspn: 8000, // Skim Simpanan Pendidikan Nasional
  evChargingFacilities: 2500, // Electric Vehicle Charging Facilities & Domestic Food Waste Composting Machine
  // NEW in YA 2025: Housing loan interest for first home (Item #22)
  housingLoanInterest: {
    tier1: 7000, // House price ≤ RM500,000
    tier2: 5000  // House price RM500,001 - RM750,000
  }
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

const getNumChildrenForThreshold = (
  input: Pick<TaxInput, 'numChildrenBelow18' | 'numChildrenAbove18Education' | 'numChildrenAbove18HigherEducation'>
) => input.numChildrenBelow18 + input.numChildrenAbove18Education + input.numChildrenAbove18HigherEducation;

export const getNonTaxableThreshold = (
  input: Pick<TaxInput, 'assessmentType' | 'numChildrenBelow18' | 'numChildrenAbove18Education' | 'numChildrenAbove18HigherEducation'>
) => {
  let nonTaxableThreshold = THRESHOLDS.single;
  const numChildren = getNumChildrenForThreshold(input);

  if (input.assessmentType !== 'single') {
    const thresholds = THRESHOLDS[input.assessmentType];

    if (numChildren >= 2) {
      nonTaxableThreshold = thresholds.twoChildren;
    } else if (numChildren === 1) {
      nonTaxableThreshold = thresholds.oneChild;
    } else {
      nonTaxableThreshold = thresholds.noChild;
    }
  }

  return nonTaxableThreshold;
};

export const calculateTax = (input: TaxInput): TaxResult => {
  // Calculate non-taxable threshold based on assessment type
  const nonTaxableThreshold = getNonTaxableThreshold(input);
  const numChildren = getNumChildrenForThreshold(input);

  // Check if income exceeds threshold
  const exceedsThreshold = input.annualIncome > nonTaxableThreshold;

  // Calculate automatic reliefs
  const isMarriedAssessment = input.assessmentType === 'separate' || input.assessmentType === 'joint';
  const automaticReliefs = reliefLimits.individual + // RM9,000 basic individual relief
    (isMarriedAssessment ? (input.hasDisabledSpouse ? reliefLimits.disabledSpouse : reliefLimits.spouse) : 0) + // RM6,000 for disabled spouse or RM4,000 for regular spouse relief
    (input.numChildrenBelow18 * reliefLimits.childBelow18) + // RM2,000 per child under 18
    (input.numChildrenAbove18Education * reliefLimits.childAbove18Education) + // RM2,000 per child above 18 in pre-university education
    (input.numChildrenAbove18HigherEducation * reliefLimits.childEducation) + // RM8,000 per child above 18 in diploma / degree / higher education
    (input.isDisabled ? reliefLimits.disabled : 0) + // Additional relief if individual is disabled
    (input.numDisabledChildren * reliefLimits.disabledChild) + // Additional relief for disabled children
    (input.numDisabledChildrenStudying * reliefLimits.disabledChildStudying); // Additional relief for disabled children studying

  // Apply relief limits

  // Item #17(i): EPF mandatory capped at RM4,000
  const epfMandatory = Math.min(input.epfMandatoryContribution || 0, reliefLimits.epf.mandatory);
  // Item #17(ii): Life insurance + voluntary EPF share a combined RM3,000 sub-limit
  const epfVoluntary = Math.min(input.epfVoluntaryContribution || 0, reliefLimits.epf.voluntary);
  const remainingForLifeInsurance = Math.max(0, reliefLimits.epf.voluntary - epfVoluntary);
  const lifeInsurance = Math.min(input.lifeInsurance || 0, remainingForLifeInsurance);

  // Item #7: Medical checkup + mental health share a combined RM1,000 limit
  const combinedCheckupMental = Math.min(
    (input.medicalCheckup || 0) + (input.mentalHealth || 0),
    reliefLimits.medicalCheckupAndMental
  );

  // Item #6: Medical treatment + vaccination (sub-limit RM1,000) + dental (sub-limit RM1,000), combined RM10,000
  const limitedVaccination = Math.min(input.vaccinationCost || 0, reliefLimits.medicalTreatment.vaccination);
  const limitedDental = Math.min(input.dentalTreatment || 0, reliefLimits.medicalTreatment.dental);
  const combinedMedicalTreatment = Math.min(
    (input.medicalTreatment || 0) + limitedVaccination + limitedDental,
    reliefLimits.medicalTreatment.total
  );

  // Item #2: Parents medical + examination (sub-limit RM1,000), combined RM8,000
  const limitedParentsExam = Math.min(input.parentsExamination || 0, reliefLimits.parentsMedical.examination);
  const combinedParentsMedical = Math.min(
    (input.parentsMedical || 0) + limitedParentsExam,
    reliefLimits.parentsMedical.total
  );

  // Item #5: Education fees + upskilling (sub-limit RM2,000), combined RM7,000
  const limitedUpskilling = Math.min(input.upskilling || 0, reliefLimits.educationFees.upskilling);
  const combinedEducationFees = Math.min(
    (input.educationFees || 0) + limitedUpskilling,
    reliefLimits.educationFees.total
  );

  // Item #22: Housing loan interest (YA 2025)
  const housingLoanLimit = input.housingLoanTier === 'tier1' ? reliefLimits.housingLoanInterest.tier1
    : input.housingLoanTier === 'tier2' ? reliefLimits.housingLoanInterest.tier2
    : 0;
  const limitedHousingLoan = Math.min(input.housingLoanInterest || 0, housingLoanLimit);
  // Donations to approved institutions / organisations are capped at 10% of aggregate income.
  // This calculator uses annual employment income as the aggregate-income proxy.
  const donationDeduction = Math.min(input.donations || 0, input.annualIncome * 0.1);

  // Calculate total relief including automatic reliefs
  const totalRelief =
    automaticReliefs +
    epfMandatory +
    epfVoluntary +
    lifeInsurance +
    Math.min(input.socsoContribution || 0, reliefLimits.socso) +
    combinedParentsMedical +
    Math.min(input.basicSupporting || 0, reliefLimits.basicSupporting) +
    combinedMedicalTreatment +
    combinedCheckupMental +
    combinedEducationFees +
    Math.min(input.lifestyle || 0, reliefLimits.lifestyle) +
    Math.min(input.lifestyleSports || 0, reliefLimits.lifestyleSports) +
    Math.min(input.childCare || 0, reliefLimits.childCare) +
    Math.min(input.breastfeedingEquipment || 0, reliefLimits.breastfeedingEquipment) +
    Math.min(input.childDisabilitySupport || 0, reliefLimits.childDisabilitySupport) +
    Math.min(input.educationInsurance || 0, reliefLimits.educationInsurance) +
    Math.min(input.deferredAnnuityPrs || 0, reliefLimits.deferredAnnuityPrs) +
    Math.min(input.sspnDeposit || 0, reliefLimits.sspn) +
    Math.min(input.evChargingFacilities || 0, reliefLimits.evChargingFacilities) +
    limitedHousingLoan;

  // Calculate chargeable income after deductions and reliefs.
  const taxableIncome = Math.max(0, input.annualIncome - donationDeduction - totalRelief);

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
    const bracketRange = bracketMax - bracket.min;
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
  const taxAfterPersonalRebates = Math.max(0, totalTax - individualRebate - spouseRebate);
  const zakatRebate = Math.min(input.zakat || 0, taxAfterPersonalRebates);
  const finalTax = Math.max(0, taxAfterPersonalRebates - zakatRebate);

  // If income is below threshold, return zero tax
  if (!exceedsThreshold) {
    return {
      totalIncome: input.annualIncome,
      totalRelief: 0,
      donationDeduction: 0,
      taxableIncome: 0,
      taxPayable: 0,
      totalTax: 0,
      eligibleForTax: false,
      individualRebate: 0,
      spouseRebate: 0,
      zakatRebate: 0,
      effectiveRate: 0,
      nonTaxableThreshold,
      assessmentType: input.assessmentType,
      numChildren,
      taxBracketBreakdown: []
    };
  }

  return {
    totalIncome: input.annualIncome,
    totalRelief,
    donationDeduction,
    taxableIncome,
    taxPayable: finalTax,
    totalTax,
    eligibleForTax: exceedsThreshold && input.hasMTD,
    individualRebate,
    spouseRebate,
    zakatRebate,
    effectiveRate: (finalTax / input.annualIncome) * 100,
    nonTaxableThreshold,
    assessmentType: input.assessmentType,
    numChildren,
    taxBracketBreakdown: breakdown
  };
};
