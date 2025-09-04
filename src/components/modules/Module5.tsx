import React, { useState } from 'react';

export default function Module5() {
  const [contractData, setContractData] = useState({
    contractPrice: '',
    workCertified: '',
    workUncertified: '',
    materialOnSite: '',
    cashReceived: '',
    totalCost: '',
  });

  const [processData, setProcessData] = useState({
    inputUnits: '',
    inputCost: '',
    processingCost: '',
    normalLossPercent: '',
    actualOutput: '',
    scrapValue: '',
  });

  const calculateContractProfit = () => {
    const contractPrice = parseFloat(contractData.contractPrice) || 0;
    const workCertified = parseFloat(contractData.workCertified) || 0;
    const workUncertified = parseFloat(contractData.workUncertified) || 0;
    const materialOnSite = parseFloat(contractData.materialOnSite) || 0;
    const cashReceived = parseFloat(contractData.cashReceived) || 0;
    const totalCost = parseFloat(contractData.totalCost) || 0;

    const totalWorkDone = workCertified + workUncertified + materialOnSite;
    const notionalProfit = totalWorkDone - totalCost;
    const workCertifiedRatio = workCertified / contractPrice;
    const cashRatio = cashReceived / workCertified;
    
    // Profit calculation using 2/3 rule
    const profitToTake = notionalProfit * (2/3) * workCertifiedRatio * cashRatio;

    return {
      totalWorkDone,
      notionalProfit,
      workCertifiedRatio,
      cashRatio,
      profitToTake,
    };
  };

  const calculateProcessCost = () => {
    const inputUnits = parseFloat(processData.inputUnits) || 0;
    const inputCost = parseFloat(processData.inputCost) || 0;
    const processingCost = parseFloat(processData.processingCost) || 0;
    const normalLossPercent = parseFloat(processData.normalLossPercent) || 0;
    const actualOutput = parseFloat(processData.actualOutput) || 0;
    const scrapValue = parseFloat(processData.scrapValue) || 0;

    const normalLossUnits = (inputUnits * normalLossPercent) / 100;
    const expectedOutput = inputUnits - normalLossUnits;
    const totalCost = inputCost + processingCost;
    const normalLossValue = normalLossUnits * scrapValue;
    const netCost = totalCost - normalLossValue;
    const costPerUnit = expectedOutput > 0 ? netCost / expectedOutput : 0;
    
    // Abnormal loss/gain calculation
    const abnormalLossGain = expectedOutput - actualOutput;
    const isAbnormalLoss = abnormalLossGain > 0;
    const abnormalValue = Math.abs(abnormalLossGain) * costPerUnit;

    return {
      normalLossUnits,
      expectedOutput,
      totalCost,
      normalLossValue,
      netCost,
      costPerUnit,
      abnormalLossGain,
      isAbnormalLoss,
      abnormalValue,
    };
  };

  const contractResults = calculateContractProfit();
  const processResults = calculateProcessCost();
  const hasContractInputs = Object.values(contractData).some(value => value !== '');
  const hasProcessInputs = Object.values(processData).some(value => value !== '');

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Module V: Contract and Process Costing</h1>
        
        {/* Definitions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Definitions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Contract Costing</h3>
              <p className="text-gray-600 mb-4">Costing method for large construction projects or contracts.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Work Certified</h3>
              <p className="text-gray-600 mb-4">Portion of contract work completed and certified by architect.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Notional Profit</h3>
              <p className="text-gray-600">Profit calculated before applying prudence principle for incomplete contracts.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Process Costing</h3>
              <p className="text-gray-600 mb-4">Costing for continuous production through distinct processes.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Normal Loss</h3>
              <p className="text-gray-600 mb-4">Expected loss inherent in the production process.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Abnormal Loss/Gain</h3>
              <p className="text-gray-600">Unexpected loss or gain beyond normal process expectations.</p>
            </div>
          </div>
        </div>

        {/* Interactive Simulators */}
        <div className="space-y-8">
          {/* Contract Costing */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: Contract Costing</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Contract Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract Price (₹)</label>
                    <input
                      type="number"
                      value={contractData.contractPrice}
                      onChange={(e) => setContractData({...contractData, contractPrice: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter contract price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Certified (₹)</label>
                    <input
                      type="number"
                      value={contractData.workCertified}
                      onChange={(e) => setContractData({...contractData, workCertified: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter work certified"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Uncertified (₹)</label>
                    <input
                      type="number"
                      value={contractData.workUncertified}
                      onChange={(e) => setContractData({...contractData, workUncertified: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter work uncertified"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material on Site (₹)</label>
                    <input
                      type="number"
                      value={contractData.materialOnSite}
                      onChange={(e) => setContractData({...contractData, materialOnSite: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter material on site"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cash Received (₹)</label>
                    <input
                      type="number"
                      value={contractData.cashReceived}
                      onChange={(e) => setContractData({...contractData, cashReceived: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter cash received"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Cost Incurred (₹)</label>
                    <input
                      type="number"
                      value={contractData.totalCost}
                      onChange={(e) => setContractData({...contractData, totalCost: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter total cost"
                    />
                  </div>
                </div>
              </div>

              <div>
                {hasContractInputs && (
                  <div className="space-y-6">
                    {/* Notional Profit */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Notional Profit</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Notional Profit = Total Work Done - Total Cost</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Total Work Done = {contractData.workCertified} + {contractData.workUncertified} + {contractData.materialOnSite} = ₹{contractResults.totalWorkDone}
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Notional Profit = {contractResults.totalWorkDone} - {contractData.totalCost}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Notional Profit = ₹{contractResults.notionalProfit}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Notional Profit = ₹{contractResults.notionalProfit.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Profit to be Taken */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Profit to be Taken (2/3 Rule)</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Profit = Notional Profit × (2/3) × (Work Certified ÷ Contract Price) × (Cash Received ÷ Work Certified)</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Work Certified Ratio = {contractData.workCertified} ÷ {contractData.contractPrice} = {contractResults.workCertifiedRatio.toFixed(3)}
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        Cash Ratio = {contractData.cashReceived} ÷ {contractData.workCertified} = {contractResults.cashRatio.toFixed(3)}
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Profit = {contractResults.notionalProfit} × (2/3) × {contractResults.workCertifiedRatio.toFixed(3)} × {contractResults.cashRatio.toFixed(3)}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Profit = ₹{contractResults.profitToTake.toFixed(2)}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Profit to be Taken = ₹{contractResults.profitToTake.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!hasContractInputs && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter contract data to see step-by-step calculations</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Process Costing */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: Process Costing</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Process Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Input Units</label>
                    <input
                      type="number"
                      value={processData.inputUnits}
                      onChange={(e) => setProcessData({...processData, inputUnits: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter input units"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Input Cost (₹)</label>
                    <input
                      type="number"
                      value={processData.inputCost}
                      onChange={(e) => setProcessData({...processData, inputCost: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter input cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Processing Cost (₹)</label>
                    <input
                      type="number"
                      value={processData.processingCost}
                      onChange={(e) => setProcessData({...processData, processingCost: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter processing cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Normal Loss (%)</label>
                    <input
                      type="number"
                      value={processData.normalLossPercent}
                      onChange={(e) => setProcessData({...processData, normalLossPercent: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter normal loss %"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Actual Output (units)</label>
                    <input
                      type="number"
                      value={processData.actualOutput}
                      onChange={(e) => setProcessData({...processData, actualOutput: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter actual output"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scrap Value per Unit (₹)</label>
                    <input
                      type="number"
                      value={processData.scrapValue}
                      onChange={(e) => setProcessData({...processData, scrapValue: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter scrap value"
                    />
                  </div>
                </div>
              </div>

              <div>
                {hasProcessInputs && (
                  <div className="space-y-6">
                    {/* Normal Loss Calculation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Normal Loss Calculation</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Normal Loss = (Input Units × Normal Loss %) ÷ 100</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Normal Loss = ({processData.inputUnits} × {processData.normalLossPercent}) ÷ 100
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Normal Loss = {processResults.normalLossUnits} units
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Normal Loss = {processResults.normalLossUnits} units</p>
                      </div>
                    </div>

                    {/* Expected Output */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Expected Output</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Expected Output = Input Units - Normal Loss</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Expected Output = {processData.inputUnits} - {processResults.normalLossUnits}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Expected Output = {processResults.expectedOutput} units
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Expected Output = {processResults.expectedOutput} units</p>
                      </div>
                    </div>

                    {/* Cost Per Unit */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Cost Per Unit</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Cost Per Unit = (Total Cost - Normal Loss Value) ÷ Expected Output</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Total Cost = {processData.inputCost} + {processData.processingCost} = ₹{processResults.totalCost}
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        Normal Loss Value = {processResults.normalLossUnits} × {processData.scrapValue} = ₹{processResults.normalLossValue}
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Cost Per Unit = ({processResults.totalCost} - {processResults.normalLossValue}) ÷ {processResults.expectedOutput}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Cost Per Unit = ₹{processResults.netCost} ÷ {processResults.expectedOutput} = ₹{processResults.costPerUnit.toFixed(2)}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Cost Per Unit = ₹{processResults.costPerUnit.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Abnormal Loss/Gain */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Abnormal Loss/Gain</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Abnormal Loss/Gain = Expected Output - Actual Output</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Abnormal Loss/Gain = {processResults.expectedOutput} - {processData.actualOutput}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: {processResults.isAbnormalLoss ? 'Abnormal Loss' : 'Abnormal Gain'} = {Math.abs(processResults.abnormalLossGain)} units
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Value = {Math.abs(processResults.abnormalLossGain)} × ₹{processResults.costPerUnit.toFixed(2)} = ₹{processResults.abnormalValue.toFixed(2)}
                      </p>
                      <div className={`border rounded p-2 ${processResults.isAbnormalLoss ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300'}`}>
                        <p className={`font-semibold ${processResults.isAbnormalLoss ? 'text-red-800' : 'text-green-800'}`}>
                          Final Answer: {processResults.isAbnormalLoss ? 'Abnormal Loss' : 'Abnormal Gain'} = {Math.abs(processResults.abnormalLossGain)} units (₹{processResults.abnormalValue.toFixed(2)})
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!hasProcessInputs && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter process data to see step-by-step calculations</p>
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