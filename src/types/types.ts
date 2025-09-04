export interface CostSheetItem {
  id: string;
  description: string;
  amount: number;
  category: 'direct' | 'indirect';
  type: 'material' | 'labour' | 'expenses' | 'factory' | 'office' | 'selling';
}

export interface MaterialCalculation {
  quantity: number;
  unitCost: number;
  total: number;
}

export interface EOQData {
  annualDemand: number;
  orderingCost: number;
  carryingCost: number;
  eoq: number;
  totalCost: number;
}

export interface WageCalculation {
  timeRate: number;
  timeTaken: number;
  timeAllowed: number;
  basicWage: number;
  bonus: number;
  totalWage: number;
}

export interface ProcessData {
  input: number;
  normalLossPercent: number;
  costs: {
    material: number;
    labour: number;
    overhead: number;
  };
}

export interface PurchaseBatch {
  quantity: number;
  rate: number;
}

export interface Issue {
  quantity: number;
}