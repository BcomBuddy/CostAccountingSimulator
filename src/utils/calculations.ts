import { CostSheetItem, EOQData, WageCalculation, ProcessData, PurchaseBatch, Issue } from '../types/types';

// Cost Sheet Calculations
export const calculateCostSheet = (items: CostSheetItem[]) => {
  const directMaterial = items.filter(item => item.category === 'direct' && item.type === 'material').reduce((sum, item) => sum + item.amount, 0);
  const directLabour = items.filter(item => item.category === 'direct' && item.type === 'labour').reduce((sum, item) => sum + item.amount, 0);
  const directExpenses = items.filter(item => item.category === 'direct' && item.type === 'expenses').reduce((sum, item) => sum + item.amount, 0);
  
  const primeCost = directMaterial + directLabour + directExpenses;
  
  const factoryOverheads = items.filter(item => item.category === 'indirect' && item.type === 'factory').reduce((sum, item) => sum + item.amount, 0);
  const factoryCost = primeCost + factoryOverheads;
  
  const officeOverheads = items.filter(item => item.category === 'indirect' && item.type === 'office').reduce((sum, item) => sum + item.amount, 0);
  const costOfProduction = factoryCost + officeOverheads;
  
  const sellingOverheads = items.filter(item => item.category === 'indirect' && item.type === 'selling').reduce((sum, item) => sum + item.amount, 0);
  const totalCost = costOfProduction + sellingOverheads;
  
  return {
    directMaterial: Math.round(directMaterial * 100) / 100,
    directLabour: Math.round(directLabour * 100) / 100,
    directExpenses: Math.round(directExpenses * 100) / 100,
    primeCost: Math.round(primeCost * 100) / 100,
    factoryOverheads: Math.round(factoryOverheads * 100) / 100,
    factoryCost: Math.round(factoryCost * 100) / 100,
    officeOverheads: Math.round(officeOverheads * 100) / 100,
    costOfProduction: Math.round(costOfProduction * 100) / 100,
    sellingOverheads: Math.round(sellingOverheads * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100
  };
};

// EOQ Calculation
export const calculateEOQ = (annualDemand: number, orderingCost: number, carryingCost: number): EOQData => {
  const eoq = Math.sqrt((2 * annualDemand * orderingCost) / carryingCost);
  const numberOfOrders = annualDemand / eoq;
  const totalOrderingCost = numberOfOrders * orderingCost;
  const totalCarryingCost = (eoq / 2) * carryingCost;
  const totalCost = totalOrderingCost + totalCarryingCost;
  
  return {
    annualDemand,
    orderingCost,
    carryingCost,
    eoq: Math.round(eoq),
    totalCost: Math.round(totalCost * 100) / 100
  };
};

// FIFO Calculation
export const calculateFIFO = (purchases: PurchaseBatch[], issues: Issue[]) => {
  let stock = [...purchases];
  let transactions = [];
  let remainingStock = [];
  
  for (const issue of issues) {
    let remainingQty = issue.quantity;
    let issueValue = 0;
    let issueDetails = [];
    
    while (remainingQty > 0 && stock.length > 0) {
      const currentBatch = stock[0];
      
      if (currentBatch.quantity <= remainingQty) {
        const value = currentBatch.quantity * currentBatch.rate;
        issueValue += value;
        issueDetails.push({ quantity: currentBatch.quantity, rate: currentBatch.rate, value });
        remainingQty -= currentBatch.quantity;
        stock.shift();
      } else {
        const value = remainingQty * currentBatch.rate;
        issueValue += value;
        issueDetails.push({ quantity: remainingQty, rate: currentBatch.rate, value });
        currentBatch.quantity -= remainingQty;
        remainingQty = 0;
      }
    }
    
    transactions.push({ issueDetails, totalValue: Math.round(issueValue * 100) / 100 });
  }
  
  remainingStock = stock.map(batch => ({
    quantity: batch.quantity,
    rate: batch.rate,
    value: Math.round(batch.quantity * batch.rate * 100) / 100
  }));
  
  const remainingValue = remainingStock.reduce((sum, batch) => sum + batch.value, 0);
  
  return {
    transactions,
    remainingStock,
    remainingValue: Math.round(remainingValue * 100) / 100
  };
};

// Halsey Wage System
export const calculateHalseyWage = (timeRate: number, timeTaken: number, timeAllowed: number): WageCalculation => {
  const basicWage = timeRate * timeTaken;
  const timeSaved = Math.max(0, timeAllowed - timeTaken);
  const bonus = (timeSaved / 2) * timeRate;
  
  return {
    timeRate,
    timeTaken,
    timeAllowed,
    basicWage: Math.round(basicWage * 100) / 100,
    bonus: Math.round(bonus * 100) / 100,
    totalWage: Math.round((basicWage + bonus) * 100) / 100
  };
};

// Rowan Wage System
export const calculateRowanWage = (timeRate: number, timeTaken: number, timeAllowed: number): WageCalculation => {
  const basicWage = timeRate * timeTaken;
  const bonus = timeTaken < timeAllowed ? (timeRate * timeTaken * (timeAllowed - timeTaken)) / timeAllowed : 0;
  
  return {
    timeRate,
    timeTaken,
    timeAllowed,
    basicWage: Math.round(basicWage * 100) / 100,
    bonus: Math.round(bonus * 100) / 100,
    totalWage: Math.round((basicWage + bonus) * 100) / 100
  };
};

// Machine Hour Rate
export const calculateMachineHourRate = (totalOverheads: number, totalMachineHours: number) => {
  const rate = totalOverheads / totalMachineHours;
  return Math.round(rate * 100) / 100;
};

// Process Costing
export const calculateProcessCost = (data: ProcessData) => {
  const normalLoss = (data.input * data.normalLossPercent) / 100;
  const expectedOutput = data.input - normalLoss;
  const totalCost = data.costs.material + data.costs.labour + data.costs.overhead;
  const costPerUnit = expectedOutput > 0 ? totalCost / expectedOutput : 0;
  
  return {
    normalLoss: Math.round(normalLoss * 100) / 100,
    expectedOutput: Math.round(expectedOutput * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    costPerUnit: Math.round(costPerUnit * 100) / 100
  };
};

// Contract Costing - Profit Calculation
export const calculateContractProfit = (totalCost: number, workCertified: number, cashReceived: number) => {
  const profitOnWorkCertified = workCertified - totalCost;
  const profitToTransfer = profitOnWorkCertified > 0 ? 
    (profitOnWorkCertified * cashReceived) / workCertified : 0;
  
  return {
    profitOnWorkCertified: Math.round(profitOnWorkCertified * 100) / 100,
    profitToTransfer: Math.round(profitToTransfer * 100) / 100
  };
};