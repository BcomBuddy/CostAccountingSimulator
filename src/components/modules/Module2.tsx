import React, { useState } from 'react';

export default function Module2() {
  const [eoqData, setEoqData] = useState({
    annualDemand: '',
    orderingCost: '',
    carryingCost: '',
  });

  const [stockLevelsData, setStockLevelsData] = useState({
    maxConsumption: '',
    minConsumption: '',
    normalConsumption: '',
    maxLeadTime: '',
    minLeadTime: '',
    normalLeadTime: '',
    eoq: '',
  });

  const calculateEOQ = () => {
    const A = parseFloat(eoqData.annualDemand) || 0;
    const S = parseFloat(eoqData.orderingCost) || 0;
    const C = parseFloat(eoqData.carryingCost) || 0;
    
    if (A > 0 && S > 0 && C > 0) {
      return Math.sqrt((2 * A * S) / C);
    }
    return 0;
  };

  const calculateStockLevels = () => {
    const maxCons = parseFloat(stockLevelsData.maxConsumption) || 0;
    const minCons = parseFloat(stockLevelsData.minConsumption) || 0;
    const normalCons = parseFloat(stockLevelsData.normalConsumption) || 0;
    const maxLead = parseFloat(stockLevelsData.maxLeadTime) || 0;
    const minLead = parseFloat(stockLevelsData.minLeadTime) || 0;
    const normalLead = parseFloat(stockLevelsData.normalLeadTime) || 0;
    const eoq = parseFloat(stockLevelsData.eoq) || 0;

    const reorderLevel = maxCons * maxLead;
    const minLevel = (reorderLevel - (normalCons * normalLead));
    const maxLevel = reorderLevel + eoq - (minCons * minLead);
    const avgLevel = (minLevel + maxLevel) / 2;

    return { reorderLevel, minLevel, maxLevel, avgLevel };
  };

  const eoqResult = calculateEOQ();
  const stockLevels = calculateStockLevels();
  const hasEoqInputs = Object.values(eoqData).some(value => value !== '');
  const hasStockInputs = Object.values(stockLevelsData).some(value => value !== '');

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Module II: Material</h1>
        
        {/* Definitions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Definitions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Direct Material</h3>
              <p className="text-gray-600 mb-4">Materials that can be directly traced to the finished product.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">EOQ (Economic Order Quantity)</h3>
              <p className="text-gray-600 mb-4">Optimal order quantity that minimizes total inventory costs.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">ABC Analysis</h3>
              <p className="text-gray-600">Classification of inventory: A (high value), B (medium), C (low value).</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Stock Levels</h3>
              <p className="text-gray-600 mb-4">Minimum, Maximum, Reorder, and Average stock levels for control.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">FIFO Method</h3>
              <p className="text-gray-600 mb-4">First In, First Out - materials issued at earliest purchase price.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">LIFO Method</h3>
              <p className="text-gray-600">Last In, First Out - materials issued at latest purchase price.</p>
            </div>
          </div>
        </div>

        {/* Interactive Simulators */}
        <div className="space-y-8">
          {/* EOQ Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: EOQ Calculation</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter EOQ Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Demand (A)</label>
                    <input
                      type="number"
                      value={eoqData.annualDemand}
                      onChange={(e) => setEoqData({...eoqData, annualDemand: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter annual demand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordering Cost per Order (S)</label>
                    <input
                      type="number"
                      value={eoqData.orderingCost}
                      onChange={(e) => setEoqData({...eoqData, orderingCost: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter ordering cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carrying Cost per Unit (C)</label>
                    <input
                      type="number"
                      value={eoqData.carryingCost}
                      onChange={(e) => setEoqData({...eoqData, carryingCost: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter carrying cost"
                    />
                  </div>
                </div>
              </div>

              <div>
                {hasEoqInputs && eoqResult > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">EOQ Calculation</h4>
                    
                    <div className="bg-blue-100 p-3 rounded mb-3">
                      <p className="font-mono text-sm">Formula: EOQ = √(2AS / C)</p>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">
                      Substitution: EOQ = √(2 × {eoqData.annualDemand} × {eoqData.orderingCost} / {eoqData.carryingCost})
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-2">
                      Calculation: EOQ = √({2 * parseFloat(eoqData.annualDemand || '0') * parseFloat(eoqData.orderingCost || '0')} / {eoqData.carryingCost}) = √{(2 * parseFloat(eoqData.annualDemand || '0') * parseFloat(eoqData.orderingCost || '0')) / parseFloat(eoqData.carryingCost || '1')} = {eoqResult.toFixed(2)}
                    </p>
                    
                    <div className="bg-green-100 border border-green-300 rounded p-2">
                      <p className="font-semibold text-green-800">Final Answer: EOQ = {Math.round(eoqResult)} units</p>
                    </div>
                  </div>
                )}
                
                {!hasEoqInputs && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter EOQ data to see step-by-step calculations</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stock Levels Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: Stock Levels</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Stock Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Consumption per day</label>
                    <input
                      type="number"
                      value={stockLevelsData.maxConsumption}
                      onChange={(e) => setStockLevelsData({...stockLevelsData, maxConsumption: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter max consumption"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Consumption per day</label>
                    <input
                      type="number"
                      value={stockLevelsData.minConsumption}
                      onChange={(e) => setStockLevelsData({...stockLevelsData, minConsumption: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter min consumption"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Normal Consumption per day</label>
                    <input
                      type="number"
                      value={stockLevelsData.normalConsumption}
                      onChange={(e) => setStockLevelsData({...stockLevelsData, normalConsumption: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter normal consumption"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Lead Time (days)</label>
                    <input
                      type="number"
                      value={stockLevelsData.maxLeadTime}
                      onChange={(e) => setStockLevelsData({...stockLevelsData, maxLeadTime: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter max lead time"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Lead Time (days)</label>
                    <input
                      type="number"
                      value={stockLevelsData.minLeadTime}
                      onChange={(e) => setStockLevelsData({...stockLevelsData, minLeadTime: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter min lead time"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Normal Lead Time (days)</label>
                    <input
                      type="number"
                      value={stockLevelsData.normalLeadTime}
                      onChange={(e) => setStockLevelsData({...stockLevelsData, normalLeadTime: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter normal lead time"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">EOQ (units)</label>
                    <input
                      type="number"
                      value={stockLevelsData.eoq}
                      onChange={(e) => setStockLevelsData({...stockLevelsData, eoq: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter EOQ"
                    />
                  </div>
                </div>
              </div>

              <div>
                {hasStockInputs && (
                  <div className="space-y-6">
                    {/* Reorder Level */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Reorder Level</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Reorder Level = Maximum Consumption × Maximum Lead Time</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Reorder Level = {stockLevelsData.maxConsumption} × {stockLevelsData.maxLeadTime}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Reorder Level = {stockLevels.reorderLevel}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Reorder Level = {stockLevels.reorderLevel} units</p>
                      </div>
                    </div>

                    {/* Minimum Level */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Minimum Level</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Minimum Level = Reorder Level - (Normal Consumption × Normal Lead Time)</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Minimum Level = {stockLevels.reorderLevel} - ({stockLevelsData.normalConsumption} × {stockLevelsData.normalLeadTime})
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Minimum Level = {stockLevels.reorderLevel} - {parseFloat(stockLevelsData.normalConsumption || '0') * parseFloat(stockLevelsData.normalLeadTime || '0')} = {stockLevels.minLevel}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Minimum Level = {stockLevels.minLevel} units</p>
                      </div>
                    </div>

                    {/* Maximum Level */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Maximum Level</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Maximum Level = Reorder Level + EOQ - (Minimum Consumption × Minimum Lead Time)</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Maximum Level = {stockLevels.reorderLevel} + {stockLevelsData.eoq} - ({stockLevelsData.minConsumption} × {stockLevelsData.minLeadTime})
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Maximum Level = {stockLevels.reorderLevel} + {parseFloat(stockLevelsData.eoq || '0')} - {parseFloat(stockLevelsData.minConsumption || '0') * parseFloat(stockLevelsData.minLeadTime || '0')} = {stockLevels.maxLevel}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Maximum Level = {stockLevels.maxLevel} units</p>
                      </div>
                    </div>

                    {/* Average Level */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Average Level</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Average Level = (Minimum Level + Maximum Level) ÷ 2</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Average Level = ({stockLevels.minLevel} + {stockLevels.maxLevel}) ÷ 2
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Average Level = {stockLevels.minLevel + stockLevels.maxLevel} ÷ 2 = {stockLevels.avgLevel}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Average Level = {stockLevels.avgLevel} units</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!hasStockInputs && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter stock data to see step-by-step calculations</p>
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