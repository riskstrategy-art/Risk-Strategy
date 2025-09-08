
import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import ExecutiveAssessment from './components/ExecutiveAssessment';
import NfpAssessment from './components/NfpAssessment';
import { AssessmentType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<{ type: AssessmentType | 'home'; subType?: string }>({ type: 'home' });

  const handleSelectAssessment = useCallback((type: AssessmentType, subType?: string) => {
    setCurrentPage({ type, subType });
  }, []);

  const handleGoHome = useCallback(() => {
    setCurrentPage({ type: 'home' });
  }, []);

  const renderPage = () => {
    switch (currentPage.type) {
      case 'executive':
        return <ExecutiveAssessment onGoHome={handleGoHome} subType={currentPage.subType} />;
      case 'nfp':
        return <NfpAssessment onGoHome={handleGoHome} subType={currentPage.subType} />;
      case 'home':
      default:
        return <HomePage onSelectAssessment={handleSelectAssessment} />;
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="w-full max-w-7xl mx-auto">
        {renderPage()}
      </div>
    </main>
  );
}
