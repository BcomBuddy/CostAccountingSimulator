import React from 'react';
import { BookOpen, Calculator, Users } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Full-width gradient header section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <h1 className="text-4xl font-bold text-white">
            Cost Accounting Simulator
          </h1>
          <p className="text-lg text-white mt-2 max-w-2xl">
            Master cost accounting concepts through interactive problem-solving
          </p>
        </div>
      </div>

      {/* Main content section */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">5 Modules</h3>
              <p className="text-gray-600">Complete syllabus coverage</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <Calculator className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive</h3>
              <p className="text-gray-600">Step-by-step calculations</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Student-Friendly</h3>
              <p className="text-gray-600">Easy to understand format</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border-l-4 border-blue-500 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Module I: Introduction</h3>
                <p className="text-gray-600">Cost concepts, classification, and cost sheet preparation</p>
              </div>
              <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Module II: Material</h3>
                <p className="text-gray-600">Inventory control, EOQ, and material pricing methods</p>
              </div>
              <div className="bg-white border-l-4 border-purple-500 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Module III: Labour and Overheads</h3>
                <p className="text-gray-600">Wage plans, overhead allocation and absorption</p>
              </div>
              <div className="bg-white border-l-4 border-orange-500 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Module IV: Unit, Job & Operating Costing</h3>
                <p className="text-gray-600">Cost sheets, tender costing, and job costing</p>
              </div>
              <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Module V: Contract and Process Costing</h3>
                <p className="text-gray-600">Contract accounts and process costing with losses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}