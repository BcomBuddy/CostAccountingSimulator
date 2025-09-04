import React, { useState } from 'react';

export default function Module3() {
  const [wageData, setWageData] = useState({
    standardTime: '',
    actualTime: '',
    hourlyRate: '',
    standardOutput: '',
    actualOutput: '',
    pieceRate: '',
  });

  const [overheadData, setOverheadData] = useState({
    totalOverheads: '',
    totalMachineHours: '',
    totalLabourHours: '',
    jobMachineHours: '',
    jobLabourHours: '',
  });

  const calculateWages = () => {
    const stdTime = parseFloat(wageData.standardTime) || 0;
    const actTime = parseFloat(wageData.actualTime) || 0;
    const rate = parseFloat(wageData.hourlyRate) || 0;
    const stdOutput = parseFloat(wageData.standardOutput) || 0;
    const actOutput = parseFloat(wageData.actualOutput) || 0;
    const pieceRate = parseFloat(wageData.pieceRate) || 0;

    // Halsey Plan (50% sharing)
    const timeWages = actTime * rate;
    const timeSaved = Math.max(0, stdTime - actTime);
    const bonus = (timeSaved * rate) / 2;
    const halseyTotal = timeWages + bonus;

    // Rowan Plan
    const rowanBonus = (timeSaved / stdTime) * timeWages;
    const rowanTotal = timeWages + rowanBonus;

    // Piece Rate
    const pieceRateTotal = actOutput * pieceRate;

    return {
      timeWages,
      timeSaved,
      halseyBonus: bonus,
      halseyTotal,
      rowanBonus,
      rowanTotal,
      pieceRateTotal,
    };
  };

  const calculateOverheads = () => {
    const totalOH = parseFloat(overheadData.totalOverheads) || 0;
    const totalMH = parseFloat(overheadData.totalMachineHours) || 0;
    const totalLH = parseFloat(overheadData.totalLabourHours) || 0;
    const jobMH = parseFloat(overheadData.jobMachineHours) || 0;
    const jobLH = parseFloat(overheadData.jobLabourHours) || 0;

    const machineHourRate = totalMH > 0 ? totalOH / totalMH : 0;
    const labourHourRate = totalLH > 0 ? totalOH / totalLH : 0;
    const machineHourAbsorption = machineHourRate * jobMH;
    const labourHourAbsorption = labourHourRate * jobLH;

    return {
      machineHourRate,
      labourHourRate,
      machineHourAbsorption,
      labourHourAbsorption,
    };
  };

  const wageResults = calculateWages();
  const overheadResults = calculateOverheads();
  const hasWageInputs = Object.values(wageData).some(value => value !== '');
  const hasOverheadInputs = Object.values(overheadData).some(value => value !== '');

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Module III: Labour and Overheads</h1>
        
        {/* Definitions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Definitions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Direct Labour</h3>
              <p className="text-gray-600 mb-4">Labour cost directly traceable to specific products or jobs.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Halsey Plan</h3>
              <p className="text-gray-600 mb-4">Incentive plan where worker gets 50% of time saved as bonus.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Rowan Plan</h3>
              <p className="text-gray-600">Bonus = (Time Saved ÷ Standard Time) × Time Wages</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Overheads</h3>
              <p className="text-gray-600 mb-4">Indirect costs that cannot be directly traced to products.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Machine Hour Rate</h3>
              <p className="text-gray-600 mb-4">Overhead absorption rate based on machine hours used.</p>
              
              <h3 className="font-semibold text-gray-800 mb-2">Labour Hour Rate</h3>
              <p className="text-gray-600">Overhead absorption rate based on labour hours worked.</p>
            </div>
          </div>
        </div>

        {/* Interactive Simulators */}
        <div className="space-y-8">
          {/* Wage Calculation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: Wage Calculation</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Wage Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Standard Time (hours)</label>
                    <input
                      type="number"
                      value={wageData.standardTime}
                      onChange={(e) => setWageData({...wageData, standardTime: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter standard time"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Actual Time (hours)</label>
                    <input
                      type="number"
                      value={wageData.actualTime}
                      onChange={(e) => setWageData({...wageData, actualTime: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter actual time"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (₹)</label>
                    <input
                      type="number"
                      value={wageData.hourlyRate}
                      onChange={(e) => setWageData({...wageData, hourlyRate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter hourly rate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Actual Output (units)</label>
                    <input
                      type="number"
                      value={wageData.actualOutput}
                      onChange={(e) => setWageData({...wageData, actualOutput: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter actual output"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Piece Rate (₹ per unit)</label>
                    <input
                      type="number"
                      value={wageData.pieceRate}
                      onChange={(e) => setWageData({...wageData, pieceRate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter piece rate"
                    />
                  </div>
                </div>
              </div>

              <div>
                {hasWageInputs && (
                  <div className="space-y-6">
                    {/* Halsey Plan */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">Halsey Plan Calculation</h4>
                      
                      <div className="mb-3">
                        <div className="bg-blue-100 p-3 rounded mb-2">
                          <p className="font-mono text-sm">Formula: Time Wages = Actual Time × Hourly Rate</p>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          Substitution: Time Wages = {wageData.actualTime} × {wageData.hourlyRate}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          Calculation: Time Wages = ₹{wageResults.timeWages}
                        </p>
                      </div>

                      <div className="mb-3">
                        <div className="bg-blue-100 p-3 rounded mb-2">
                          <p className="font-mono text-sm">Formula: Bonus = (Time Saved × Hourly Rate) ÷ 2</p>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          Substitution: Bonus = ({wageResults.timeSaved} × {wageData.hourlyRate}) ÷ 2
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          Calculation: Bonus = ₹{wageResults.halseyBonus}
                        </p>
                      </div>

                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Total Wages (Halsey) = ₹{wageResults.halseyTotal}</p>
                      </div>
                    </div>

                    {/* Rowan Plan */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">Rowan Plan Calculation</h4>
                      
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Bonus = (Time Saved ÷ Standard Time) × Time Wages</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Bonus = ({wageResults.timeSaved} ÷ {wageData.standardTime}) × {wageResults.timeWages}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Bonus = {wageResults.timeSaved / parseFloat(wageData.standardTime || '1')} × {wageResults.timeWages} = ₹{wageResults.rowanBonus.toFixed(2)}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Total Wages (Rowan) = ₹{wageResults.rowanTotal.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Piece Rate */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">Piece Rate Calculation</h4>
                      
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Total Wages = Actual Output × Piece Rate</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Total Wages = {wageData.actualOutput} × {wageData.pieceRate}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Total Wages = ₹{wageResults.pieceRateTotal}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Total Wages (Piece Rate) = ₹{wageResults.pieceRateTotal}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!hasWageInputs && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter wage data to see step-by-step calculations</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Overhead Absorption */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Simulator: Overhead Absorption</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Overhead Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Overheads (₹)</label>
                    <input
                      type="number"
                      value={overheadData.totalOverheads}
                      onChange={(e) => setOverheadData({...overheadData, totalOverheads: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter total overheads"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Machine Hours</label>
                    <input
                      type="number"
                      value={overheadData.totalMachineHours}
                      onChange={(e) => setOverheadData({...overheadData, totalMachineHours: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter total machine hours"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Labour Hours</label>
                    <input
                      type="number"
                      value={overheadData.totalLabourHours}
                      onChange={(e) => setOverheadData({...overheadData, totalLabourHours: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter total labour hours"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Machine Hours</label>
                    <input
                      type="number"
                      value={overheadData.jobMachineHours}
                      onChange={(e) => setOverheadData({...overheadData, jobMachineHours: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter job machine hours"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Labour Hours</label>
                    <input
                      type="number"
                      value={overheadData.jobLabourHours}
                      onChange={(e) => setOverheadData({...overheadData, jobLabourHours: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter job labour hours"
                    />
                  </div>
                </div>
              </div>

              <div>
                {hasOverheadInputs && (
                  <div className="space-y-6">
                    {/* Machine Hour Rate */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Machine Hour Rate</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Machine Hour Rate = Total Overheads ÷ Total Machine Hours</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Machine Hour Rate = {overheadData.totalOverheads} ÷ {overheadData.totalMachineHours}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Machine Hour Rate = ₹{overheadResults.machineHourRate.toFixed(2)} per hour
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Machine Hour Rate = ₹{overheadResults.machineHourRate.toFixed(2)} per hour</p>
                      </div>
                    </div>

                    {/* Labour Hour Rate */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Labour Hour Rate</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Labour Hour Rate = Total Overheads ÷ Total Labour Hours</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Substitution: Labour Hour Rate = {overheadData.totalOverheads} ÷ {overheadData.totalLabourHours}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Calculation: Labour Hour Rate = ₹{overheadResults.labourHourRate.toFixed(2)} per hour
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Labour Hour Rate = ₹{overheadResults.labourHourRate.toFixed(2)} per hour</p>
                      </div>
                    </div>

                    {/* Overhead Absorption */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Overhead Absorption for Job</h4>
                      <div className="bg-blue-100 p-3 rounded mb-2">
                        <p className="font-mono text-sm">Formula: Absorbed Overhead = Rate × Job Hours</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Machine Hour Method: {overheadResults.machineHourRate.toFixed(2)} × {overheadData.jobMachineHours} = ₹{overheadResults.machineHourAbsorption.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        Labour Hour Method: {overheadResults.labourHourRate.toFixed(2)} × {overheadData.jobLabourHours} = ₹{overheadResults.labourHourAbsorption.toFixed(2)}
                      </p>
                      <div className="bg-green-100 border border-green-300 rounded p-2">
                        <p className="font-semibold text-green-800">Final Answer: Overhead Absorbed = ₹{overheadResults.machineHourAbsorption.toFixed(2)} (Machine Hour) / ₹{overheadResults.labourHourAbsorption.toFixed(2)} (Labour Hour)</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!hasOverheadInputs && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter overhead data to see step-by-step calculations</p>
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