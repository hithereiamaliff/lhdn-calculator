import React from 'react';
import { Calculator } from 'lucide-react';
import TaxForm from './components/TaxForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              LHDN Tax Calculator
            </h1>
          </div>
          <p className="mt-2 text-gray-600">
            Calculate your Malaysian personal income tax easily
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <TaxForm />
      </main>
    </div>
  );
}

export default App;
