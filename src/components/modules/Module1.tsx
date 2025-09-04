import React, { useState } from 'react';

export default function Module1() {
  const [costSheetData, setCostSheetData] = useState({
    rawMaterials: '',
    directLabour: '',
    directExpenses: '',
    factoryOverheads: '',
    adminOverheads: '',
    sellingOverheads: '',
    unitsProduced: '',
  });

  const calculateCostSheet = () => {
    const data = {
      rawMaterials: parseFloat(costSheetData.rawMaterials) || 0,
      directLabour: parseFloat(costSheetData.directLabour) || 0,
      directExpenses: parseFloat(costSheetData.directExpenses) || 0,
      factoryOverheads: parseFloat(costSheetData.factoryOverheads) || 0,
      adminOverheads: parseFloat(costSheetData.adminOverheads) || 0,
      sellingOverheads: parseFloat(costSheetData.sellingOverheads) || 0,
      unitsProduced: parseFloat(costSheetData.unitsProduced) || 0,
    };

    const primeCost = data.rawMaterials + data.directLabour + data.directExpenses;
    const factoryCost = primeCost + data.factoryOverheads;
    const costOfProduction = factoryCost + data.adminOverheads;
    const totalCost = costOfProduction + data.sellingOverheads;
    const costPerUnit = data.unitsProduced > 0 ? totalCost / data.unitsProduced : 0;

    return { ...data, primeCost, factoryCost, costOfProduction, totalCost, costPerUnit };
  };

  const results = calculateCostSheet();
  const hasInputs = Object.values(costSheetData).some(value => value !== '');

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Module I: Introduction</h1>
        
        {/* Definitions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Definitions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Cost Accounting</h3>
              <p className="text-gray-600 mb-4">A systematic process of recording, measuring, and reporting product costs.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Cost Classification</h3>
              <p className="text-gray-600 mb-4">Grouping costs by nature: Direct/Indirect, Fixed/Variable, Product/Period costs.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Cost Sheet</h3>
              <p className="text-gray-600 mb-4">A statement showing detailed cost breakdown from raw materials to final cost.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Prime Cost</h3>
              <p className="text-gray-600">Direct Materials + Direct Labour + Direct Expenses</p>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: Cost Sheet Preparation</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Cost Data</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Raw Materials (₹)</label>
                  <input
                    type="number"
                    value={costSheetData.rawMaterials}
                    onChange={(e) => setCostSheetData({...costSheetData, rawMaterials: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Direct Labour (₹)</label>
                  <input
                    type="number"
                    value={costSheetData.directLabour}
                    onChange={(e) => setCostSheetData({...costSheetData, directLabour: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Direct Expenses (₹)</label>
                  <input
                    type="number"
                    value={costSheetData.directExpenses}
                    onChange={(e) => setCostSheetData({...costSheetData, directExpenses: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Factory Overheads (₹)</label>
                  <input
                    type="number"
                    value={costSheetData.factoryOverheads}
                    onChange={(e) => setCostSheetData({...costSheetData, factoryOverheads: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Administrative Overheads (₹)</label>
                  <input
                    type="number"
                    value={costSheetData.adminOverheads}
                    onChange={(e) => setCostSheetData({...costSheetData, adminOverheads: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling & Distribution Overheads (₹)</label>
                  <input
                    type="number"
                    value={costSheetData.sellingOverheads}
                    onChange={(e) => setCostSheetData({...costSheetData, sellingOverheads: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units Produced</label>
                  <input
                    type="number"
                    value={costSheetData.unitsProduced}
                    onChange={(e) => setCostSheetData({...costSheetData, unitsProduced: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter units"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Solution</h3>
              
              {hasInputs && (
                <div className="space-y-6">
                  {/* Prime Cost Calculation */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Step 1: Prime Cost</h4>
                    <div className="bg-blue-100 p-3 rounded mb-2">
                      <p className="font-mono text-sm">Formula: Prime Cost = Raw Materials + Direct Labour + Direct Expenses</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      Substitution: Prime Cost = {results.rawMaterials} + {results.directLabour} + {results.directExpenses}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      Calculation: Prime Cost = {results.primeCost}
                    </p>
                    <div className="bg-green-100 border border-green-300 rounded p-2">
                      <p className="font-semibold text-green-800">Final Answer: Prime Cost = ₹{results.primeCost.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Factory Cost Calculation */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Step 2: Factory Cost</h4>
                    <div className="bg-blue-100 p-3 rounded mb-2">
                      <p className="font-mono text-sm">Formula: Factory Cost = Prime Cost + Factory Overheads</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      Substitution: Factory Cost = {results.primeCost} + {results.factoryOverheads}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      Calculation: Factory Cost = {results.factoryCost}
                    </p>
                    <div className="bg-green-100 border border-green-300 rounded p-2">
                      <p className="font-semibold text-green-800">Final Answer: Factory Cost = ₹{results.factoryCost.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Cost of Production */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Step 3: Cost of Production</h4>
                    <div className="bg-blue-100 p-3 rounded mb-2">
                      <p className="font-mono text-sm">Formula: Cost of Production = Factory Cost + Administrative Overheads</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      Substitution: Cost of Production = {results.factoryCost} + {results.adminOverheads}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      Calculation: Cost of Production = {results.costOfProduction}
                    </p>
                    <div className="bg-green-100 border border-green-300 rounded p-2">
                      <p className="font-semibold text-green-800">Final Answer: Cost of Production = ₹{results.costOfProduction.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Step 4: Total Cost</h4>
                    <div className="bg-blue-100 p-3 rounded mb-2">
                      <p className="font-mono text-sm">Formula: Total Cost = Cost of Production + Selling & Distribution Overheads</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      Substitution: Total Cost = {results.costOfProduction} + {results.sellingOverheads}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      Calculation: Total Cost = {results.totalCost}
                    </p>
                    <div className="bg-green-100 border border-green-300 rounded p-2">
                      <p className="font-semibold text-green-800">Final Answer: Total Cost = ₹{results.totalCost.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Cost Per Unit */}
                  {results.unitsProduced > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Step 5: Cost Per Unit</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Cost Per Unit = Total Cost ÷ Units Produced</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Cost Per Unit = {results.totalCost} ÷ {results.unitsProduced}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Cost Per Unit = {results.costPerUnit.toFixed(2)}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Cost Per Unit = ₹{results.costPerUnit.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {!hasInputs && (
                <div className="text-center py-8 text-gray-500">
                  <p>Enter cost data above to see step-by-step cost sheet calculations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}