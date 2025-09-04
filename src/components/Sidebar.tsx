import React from 'react';
import { Home, BookOpen, Package, Users, Building, Factory } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const modules = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'module1', name: 'Module I: Introduction', icon: BookOpen },
    { id: 'module2', name: 'Module II: Material', icon: Package },
    { id: 'module3', name: 'Module III: Labour & Overheads', icon: Users },
    { id: 'module4', name: 'Module IV: Unit, Job & Operating Costing', icon: Building },
    { id: 'module5', name: 'Module V: Contract & Process Costing', icon: Factory },
  ];

  return (
    <div className="w-80 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Cost Accounting Simulator</h1>
        <p className="text-sm text-gray-600 mt-1">3rd Year – 5th Semester</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleChange(module.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeModule === module.id
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{module.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}