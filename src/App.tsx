import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Module1 from './components/modules/Module1';
import Module2 from './components/modules/Module2';
import Module3 from './components/modules/Module3';
import Module4 from './components/modules/Module4';
import Module5 from './components/modules/Module5';
import { ProtectedRoute } from './components/ProtectedRoute';
import { onAuthStateChanged } from './services/authService';
import { useAuth } from './hooks/useAuth';
import { SSOAuthService } from './services/authService';

function App() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [currentModule, setCurrentModule] = useState('home');
  const [firebaseAuth, setFirebaseAuth] = useState(false);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setFirebaseAuth(!!user);
      setFirebaseLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setFirebaseAuth(true);
  };

  const handleLogout = () => {
    setFirebaseAuth(false);
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
  if (loading || firebaseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // SSO Authentication - Show user info and app content
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gray-800 text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Welcome, {user.name}!</h1>
              <p className="text-sm text-gray-300">{user.email}</p>
              <p className="text-sm text-gray-300">Role: {user.role} | Year: {user.yearOfStudy}</p>
            </div>
            <button 
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </header>
        
        <div className="flex">
          <Sidebar 
            currentModule={currentModule} 
            onModuleChange={setCurrentModule} 
            onLogout={logout} 
          />
          <div className="ml-80">
            <main className="min-h-screen">
              <ProtectedRoute>
                {renderContent()}
              </ProtectedRoute>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Firebase Authentication - Show login page if not authenticated
  if (!firebaseAuth) {
    return <Login onLogin={handleLogin} />;
  }

  // Firebase authenticated user
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