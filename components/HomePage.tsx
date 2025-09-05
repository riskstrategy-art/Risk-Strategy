import React, { useState } from 'react';
import { AssessmentType } from '../types';

interface HomePageProps {
  onSelectAssessment: (type: AssessmentType) => void;
}

const ScreeningButton: React.FC<{ text: string; onClick: () => void; }> = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="w-full md:w-3/4 lg:w-1/2 text-left p-4 my-2 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 ease-in-out group"
    >
        <div className="flex items-center">
            <span className="flex-grow text-slate-700 font-medium text-lg">{text}</span>
            <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </div>
        </div>
    </button>
);

export default function HomePage({ onSelectAssessment }: HomePageProps) {
  const [step, setStep] = useState<'start' | 'screening'>('start');

  return (
    <div className="w-full text-center py-8">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">Risk Maturity Snapshot</h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          An interactive tool to evaluate your organization's risk management effectiveness and receive AI-powered strategic guidance.
        </p>
      </header>
      
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[250px]">
        {step === 'start' && (
          <button
            onClick={() => setStep('screening')}
            className="py-4 px-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
          >
            Begin Assessment
          </button>
        )}

        {step === 'screening' && (
          <div className="w-full text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Which best describes your organization's primary focus?</h2>
            <div className="flex flex-col items-center">
                <ScreeningButton text="Commercial / For-Profit" onClick={() => onSelectAssessment('executive')} />
                <ScreeningButton text="Not-for-Profit / NGO" onClick={() => onSelectAssessment('nfp')} />
                <ScreeningButton text="Professional Association / Membership Body" onClick={() => onSelectAssessment('nfp')} />
                <ScreeningButton text="Government / Public Sector" onClick={() => onSelectAssessment('nfp')} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}