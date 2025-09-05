import React, { useState, useMemo, useEffect } from 'react';
import { NFP_DATA, NFP_SCORE_RANGES } from '../constants';
import { NfpAnswers, NfpResult, NfpCategoryResult, NfpUserRole } from '../types';
import ResultsPage from './ResultsPage';
import Spinner from './Spinner';

const NFP_STORAGE_KEY = 'nfpAssessmentProgress';

interface NfpAssessmentProps {
  onGoHome: () => void;
}

const RoleSelectionCard: React.FC<{ title: string; description: string; onClick: () => void; icon: React.ReactElement; }> = ({ title, description, onClick, icon }) => (
    <button
      onClick={onClick}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 text-left w-full h-full flex flex-col items-start border border-slate-200"
    >
      <div className="bg-blue-600 text-white rounded-full p-3 mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 flex-grow">{description}</p>
      <div className="mt-6 text-blue-600 font-semibold flex items-center group">
        Select this role
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </button>
);

const ExecutiveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const ManagerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const RoleSelection = ({ onSelectRole, onGoHome }: { onSelectRole: (role: NfpUserRole) => void, onGoHome: () => void }) => (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex justify-end mb-6">
         <button onClick={onGoHome} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Home</button>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Select Your Role</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">To tailor the assessment, please tell us which role best describes your position in the organization.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RoleSelectionCard 
            title="Executive / Board Member"
            description="You are a CEO, Executive Director, board member, or part of the senior leadership team with responsibility for organizational strategy and governance."
            onClick={() => onSelectRole('executive')}
            icon={<ExecutiveIcon />}
        />
        <RoleSelectionCard 
            title="Manager / Staff"
            description="You are a program manager, department head, or team member involved in the day-to-day operations and implementation of your organization's mission."
            onClick={() => onSelectRole('manager')}
            icon={<ManagerIcon />}
        />
      </div>
    </div>
);

export default function NfpAssessment({ onGoHome }: NfpAssessmentProps) {
  const [userRole, setUserRole] = useState<NfpUserRole | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<NfpAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaveConfirmed, setIsSaveConfirmed] = useState(false);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(NFP_STORAGE_KEY);
      if (savedProgress) {
        const { userRole: savedRole, answers: savedAnswers, currentCategoryIndex: savedIndex } = JSON.parse(savedProgress);
        if (savedRole && savedAnswers && typeof savedIndex === 'number') {
          setUserRole(savedRole);
          setAnswers(savedAnswers);
          setCurrentCategoryIndex(savedIndex);
        }
      }
    } catch (error) {
      console.error("Failed to load NFP assessment progress:", error);
      localStorage.removeItem(NFP_STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);
  
  const saveProgress = () => {
    if (isLoaded && userRole && !showResults) {
      try {
        const progress = { userRole, answers, currentCategoryIndex };
        localStorage.setItem(NFP_STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save NFP assessment progress:", error);
      }
    }
  };

  useEffect(() => {
    saveProgress();
  }, [userRole, answers, currentCategoryIndex, showResults, isLoaded]);

  const filteredNfpData = useMemo(() => {
    if (!userRole) return [];
    if (userRole === 'executive') {
        return NFP_DATA;
    }
    // For managers, filter out elements that are specifically for executives.
    return NFP_DATA.map(category => ({
        ...category,
        elements: category.elements.filter(element => element.role !== 'executive')
    })).filter(category => category.elements.length > 0);
  }, [userRole]);

  const currentCategory = filteredNfpData[currentCategoryIndex];

  const handleNfpAnswer = (elementId: string, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [elementId]: answer }));
  };

  const handleNext = () => {
    if (currentCategoryIndex < filteredNfpData.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      setShowResults(true);
      localStorage.removeItem(NFP_STORAGE_KEY);
    }
  };
  
  const handleBack = () => {
      if (currentCategoryIndex > 0) {
          setCurrentCategoryIndex(currentCategoryIndex - 1);
      }
  }

  const handleGoHomeAndClear = () => {
    localStorage.removeItem(NFP_STORAGE_KEY);
    onGoHome();
  };

  const handleManualSave = () => {
    saveProgress();
    setIsSaveConfirmed(true);
    setTimeout(() => setIsSaveConfirmed(false), 2000);
  };

  const result = useMemo<NfpResult | null>(() => {
    if (!showResults) return null;
    
    const categoryResults: NfpCategoryResult[] = filteredNfpData.map(category => {
      const totalElements = category.elements.length;
      const rawScore = category.elements.reduce((sum, element) => sum + (answers[element.id] ? 1 : 0), 0);
      const percentage = totalElements > 0 ? rawScore / totalElements : 0;
      return {
        categoryId: category.id,
        title: category.title,
        rawScore,
        totalElements: totalElements,
        percentage
      };
    });

    const totalScore = categoryResults.reduce((sum, res) => sum + res.rawScore, 0);
    const totalPossibleElements = filteredNfpData.reduce((sum, category) => sum + category.elements.length, 0);
    const grandPercentage = totalPossibleElements > 0 ? totalScore / totalPossibleElements : 0;

    let level: NfpResult['level'] = 'Unknown';
    let interpretation = 'Could not determine maturity level.';

    for (const key in NFP_SCORE_RANGES) {
        const range = NFP_SCORE_RANGES[key as keyof typeof NFP_SCORE_RANGES];
        if (totalScore >= range.min && totalScore <= range.max) {
            level = range.level;
            interpretation = range.interpretation;
            break;
        }
    }

    return { categoryResults, totalScore, totalPossibleElements, grandPercentage, level, interpretation };

  }, [showResults, answers, filteredNfpData]);

  if (!isLoaded) {
    return (
        <div className="w-full flex justify-center items-center min-h-[400px]">
            <Spinner />
        </div>
    );
  }

  if (!userRole) {
    return <RoleSelection onSelectRole={setUserRole} onGoHome={handleGoHomeAndClear} />;
  }

  if (result) {
    return <ResultsPage result={result} assessmentType="nfp" onRestart={handleGoHomeAndClear} />;
  }

  if (!currentCategory) {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-700">Loading Assessment...</h2>
            <p className="text-slate-500">There may be no applicable questions for your selected role.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">NFP & NGO Assessment</h2>
            <button onClick={handleGoHomeAndClear} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Home</button>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 lg:w-1/4 md:pr-8 md:border-r md:border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Categories</h3>
                <nav>
                    <ul className="space-y-2">
                        {filteredNfpData.map((category, index) => (
                            <li key={category.id}>
                                <button
                                    onClick={() => setCurrentCategoryIndex(index)}
                                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                                      index === currentCategoryIndex
                                        ? 'bg-blue-600 text-white font-semibold shadow'
                                        : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {category.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="w-full md:w-2/3 lg:w-3/4">
                <div className="mb-6">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-blue-700">Category {currentCategoryIndex + 1} of {filteredNfpData.length}</span>
                        <span className="text-sm font-medium text-blue-700">{Math.round(((currentCategoryIndex + 1) / filteredNfpData.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${((currentCategoryIndex + 1) / filteredNfpData.length) * 100}%`, transition: 'width 0.3s ease-in-out'}}></div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-3xl font-semibold text-slate-800 mb-2">{currentCategory.title}</h3>
                    <p className="text-slate-600">For each statement, please indicate if the element is currently present in your organization's ERM practice.</p>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4">
                    {currentCategory.elements.map(element => (
                        <div 
                            key={element.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border-2 border-slate-200"
                        >
                            <p className="flex-grow text-slate-700 mr-4">{element.text}</p>
                            <div className="flex-shrink-0 flex items-center gap-2">
                              <button
                                onClick={() => handleNfpAnswer(element.id, true)}
                                className={`px-4 py-2 text-sm font-semibold rounded-md border-2 transition-colors ${answers[element.id] === true ? 'bg-green-600 text-white border-green-700' : 'bg-white text-green-800 border-slate-300 hover:bg-green-50'}`}
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => handleNfpAnswer(element.id, false)}
                                className={`px-4 py-2 text-sm font-semibold rounded-md border-2 transition-colors ${answers[element.id] === false ? 'bg-red-600 text-white border-red-700' : 'bg-white text-red-800 border-slate-300 hover:bg-red-50'}`}
                              >
                                No
                              </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                     <button
                        onClick={handleBack}
                        disabled={currentCategoryIndex === 0}
                        className="py-3 px-6 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleManualSave}
                            disabled={isSaveConfirmed}
                            className={`py-2 px-4 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center min-w-[120px] ${
                                isSaveConfirmed
                                ? 'bg-green-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            } disabled:cursor-not-allowed disabled:opacity-100`}
                        >
                            {isSaveConfirmed ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Saved!
                                </>
                            ) : (
                                'Save Progress'
                            )}
                        </button>
                        <button
                            onClick={handleNext}
                            className="py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                        >
                            {currentCategoryIndex < filteredNfpData.length - 1 ? 'Next Category' : 'View Results'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}