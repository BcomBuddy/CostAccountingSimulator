import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Module1 from './components/modules/Module1';
import Module2 from './components/modules/Module2';
import Module3 from './components/modules/Module3';
import Module4 from './components/modules/Module4';
import Module5 from './components/modules/Module5';

function App() {
  const [currentModule, setCurrentModule] = useState('home');

  const renderContent = () => {
    switch (currentModule) {
      case 'home':
        return <Home />;
      case 'module1':
        return <Module1 />;
      case 'module2':
        return <Module2 />;
      case 'module3':
        return <Module3 />;
      case 'module4':
        return <Module4 />;
      case 'module5':
        return <Module5 />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} />
      <div className="ml-80">
        <main className="min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;