import React, { useState } from 'react';

export default function Module4() {
  const [unitCostData, setUnitCostData] = useState({
    rawMaterials: '',
    directLabour: '',
    directExpenses: '',
    factoryOverheads: '',
    adminOverheads: '',
    sellingOverheads: '',
    unitsProduced: '',
    profit: '',
  });

  const [jobCostData, setJobCostData] = useState({
    materials: '',
    labour: '',
    directExpenses: '',
    overheads: '',
    profit: '',
  });

  const calculateUnitCost = () => {
    const data = {
      rawMaterials: parseFloat(unitCostData.rawMaterials) || 0,
      directLabour: parseFloat(unitCostData.directLabour) || 0,
      directExpenses: parseFloat(unitCostData.directExpenses) || 0,
      factoryOverheads: parseFloat(unitCostData.factoryOverheads) || 0,
      adminOverheads: parseFloat(unitCostData.adminOverheads) || 0,
      sellingOverheads: parseFloat(unitCostData.sellingOverheads) || 0,
      unitsProduced: parseFloat(unitCostData.unitsProduced) || 0,
      profit: parseFloat(unitCostData.profit) || 0,
    };

    const totalCost = data.rawMaterials + data.directLabour + data.directExpenses + 
                     data.factoryOverheads + data.adminOverheads + data.sellingOverheads;
    const costPerUnit = data.unitsProduced > 0 ? totalCost / data.unitsProduced : 0;
    const profitPerUnit = data.unitsProduced > 0 ? data.profit / data.unitsProduced : 0;
    const sellingPrice = costPerUnit + profitPerUnit;

    return { ...data, totalCost, costPerUnit, profitPerUnit, sellingPrice };
  };

  const calculateJobCost = () => {
    const materials = parseFloat(jobCostData.materials) || 0;
    const labour = parseFloat(jobCostData.labour) || 0;
    const directExpenses = parseFloat(jobCostData.directExpenses) || 0;
    const overheads = parseFloat(jobCostData.overheads) || 0;
    const profit = parseFloat(jobCostData.profit) || 0;

    const primeCost = materials + labour + directExpenses;
    const totalCost = primeCost + overheads;
    const quotedPrice = totalCost + profit;

    return { materials, labour, directExpenses, overheads, profit, primeCost, totalCost, quotedPrice };
  };

  const unitResults = calculateUnitCost();
  const jobResults = calculateJobCost();
  const hasUnitInputs = Object.values(unitCostData).some(value => value !== '');
  const hasJobInputs = Object.values(jobCostData).some(value => value !== '');

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Module IV: Unit, Job & Operating Costing</h1>
        
        {/* Definitions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Definitions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Unit Costing</h3>
              <p className="text-gray-600 mb-4">Costing method for identical units produced continuously.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Job Costing</h3>
              <p className="text-gray-600 mb-4">Costing method for specific jobs or orders with distinct requirements.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Tender Costing</h3>
              <p className="text-gray-600">Cost estimation for bidding purposes including desired profit margin.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Batch Costing</h3>
              <p className="text-gray-600 mb-4">Costing for production in batches or lots of identical products.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Operating Costing</h3>
              <p className="text-gray-600 mb-4">Costing for service industries like transport, hospitals, hotels.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Cost Sheet</h3>
              <p className="text-gray-600">Statement showing cost per unit and total cost breakdown.</p>
            </div>
          </div>
        </div>

        {/* Interactive Simulators */}
        <div className="space-y-8">
          {/* Unit Cost Sheet */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: Unit Cost Sheet</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Unit Cost Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Raw Materials (₹)</label>
                    <input
                      type="number"
                      value={unitCostData.rawMaterials}
                      onChange={(e) => setUnitCostData({...unitCostData, rawMaterials: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter raw materials cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Direct Labour (₹)</label>
                    <input
                      type="number"
                      value={unitCostData.directLabour}
                      onChange={(e) => setUnitCostData({...unitCostData, directLabour: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter direct labour cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Factory Overheads (₹)</label>
                    <input
                      type="number"
                      value={unitCostData.factoryOverheads}
                      onChange={(e) => setUnitCostData({...unitCostData, factoryOverheads: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter factory overheads"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Administrative Overheads (₹)</label>
                    <input
                      type="number"
                      value={unitCostData.adminOverheads}
                      onChange={(e) => setUnitCostData({...unitCostData, adminOverheads: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter admin overheads"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selling Overheads (₹)</label>
                    <input
                      type="number"
                      value={unitCostData.sellingOverheads}
                      onChange={(e) => setUnitCostData({...unitCostData, sellingOverheads: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter selling overheads"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Units Produced</label>
                    <input
                      type="number"
                      value={unitCostData.unitsProduced}
                      onChange={(e) => setUnitCostData({...unitCostData, unitsProduced: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter units produced"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Desired Profit (₹)</label>
                    <input
                      type="number"
                      value={unitCostData.profit}
                      onChange={(e) => setUnitCostData({...unitCostData, profit: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter desired profit"
                    />
                  </div>
                </div>
              </div>

              <div>
                {hasUnitInputs && (
                  <div className="space-y-6">
                    {/* Total Cost */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Total Cost Calculation</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Total Cost = Materials + Labour + All Overheads</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Total Cost = {unitResults.rawMaterials} + {unitResults.directLabour} + {unitResults.factoryOverheads} + {unitResults.adminOverheads} + {unitResults.sellingOverheads}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Total Cost = ₹{unitResults.totalCost}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Total Cost = ₹{unitResults.totalCost.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Cost Per Unit */}
                    {unitResults.unitsProduced > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Cost Per Unit</h4>
                        <div className="bg-blue-100 p-3 rounded mb-2">
                          <p className="font-mono text-sm">Formula: Cost Per Unit = Total Cost ÷ Units Produced</p>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          Substitution: Cost Per Unit = {unitResults.totalCost} ÷ {unitResults.unitsProduced}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          Calculation: Cost Per Unit = ₹{unitResults.costPerUnit.toFixed(2)}
                        </p>
                        <div className="bg-green-100 border border-green-300 rounded p-2">
                          <p className="font-semibold text-green-800">Final Answer: Cost Per Unit = ₹{unitResults.costPerUnit.toFixed(2)}</p>
                        </div>
                      </div>
                    )}

                    {/* Selling Price */}
                    {unitResults.unitsProduced > 0 && unitResults.profit > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Selling Price Per Unit</h4>
                        <div className="bg-blue-100 p-3 rounded mb-2">
                          <p className="font-mono text-sm">Formula: Selling Price = Cost Per Unit + Profit Per Unit</p>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          Substitution: Selling Price = {unitResults.costPerUnit.toFixed(2)} + {unitResults.profitPerUnit.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          Calculation: Selling Price = ₹{unitResults.sellingPrice.toFixed(2)}
                        </p>
                        <div className="bg-green-100 border border-green-300 rounded p-2">
                          <p className="font-semibold text-green-800">Final Answer: Selling Price = ₹{unitResults.sellingPrice.toFixed(2)} per unit</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {!hasUnitInputs && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter unit cost data to see step-by-step calculations</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Costing */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: Job Costing</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Job Cost Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Materials (₹)</label>
                    <input
                      type="number"
                      value={jobCostData.materials}
                      onChange={(e) => setJobCostData({...jobCostData, materials: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter materials cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Labour (₹)</label>
                    <input
                      type="number"
                      value={jobCostData.labour}
                      onChange={(e) => setJobCostData({...jobCostData, labour: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter labour cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Direct Expenses (₹)</label>
                    <input
                      type="number"
                      value={jobCostData.directExpenses}
                      onChange={(e) => setJobCostData({...jobCostData, directExpenses: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter direct expenses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overheads (₹)</label>
                    <input
                      type="number"
                      value={jobCostData.overheads}
                      onChange={(e) => setJobCostData({...jobCostData, overheads: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter overheads"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Desired Profit (₹)</label>
                    <input
                      type="number"
                      value={jobCostData.profit}
                      onChange={(e) => setJobCostData({...jobCostData, profit: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter desired profit"
                    />
                  </div>
                </div>
              </div>

              <div>
                {hasJobInputs && (
                  <div className="space-y-6">
                    {/* Prime Cost */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Prime Cost</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Prime Cost = Materials + Labour + Direct Expenses</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Prime Cost = {jobResults.materials} + {jobResults.labour} + {jobResults.directExpenses}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Prime Cost = ₹{jobResults.primeCost}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Prime Cost = ₹{jobResults.primeCost.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Total Cost */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Total Cost</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Total Cost = Prime Cost + Overheads</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Total Cost = {jobResults.primeCost} + {jobResults.overheads}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Total Cost = ₹{jobResults.totalCost}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Total Cost = ₹{jobResults.totalCost.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Quoted Price */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Quoted Price</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Quoted Price = Total Cost + Profit</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Quoted Price = {jobResults.totalCost} + {jobResults.profit}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Quoted Price = ₹{jobResults.quotedPrice}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Quoted Price = ₹{jobResults.quotedPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!hasJobInputs && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter job cost data to see step-by-step calculations</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}