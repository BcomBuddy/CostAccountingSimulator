import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Module1 from './components/modules/Module1';
import Module2 from './components/modules/Module2';
import Module3 from './components/modules/Module3';
import Module4 from './components/modules/Module4';
import Module5 from './components/modules/Module5';
import { onAuthStateChanged } from './services/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentModule, setCurrentModule] = useState('home');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentModule('home');
  };

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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} onLogout={handleLogout} />
      <div className="ml-80">
        <main className="min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;