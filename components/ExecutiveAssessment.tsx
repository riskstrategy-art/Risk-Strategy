import React, { useState, useMemo, useEffect } from 'react';
import { EXECUTIVE_QUESTIONS, EXECUTIVE_SCORE_RANGES } from '../constants';
import { ExecutiveResult, ExecutiveUserRole, ExecutiveQuestion } from '../types';
import ResultsPage from './ResultsPage';
import Spinner from './Spinner';

interface ExecutiveAssessmentProps {
  onGoHome: () => void;
}

const EXECUTIVE_STORAGE_KEY = 'executiveAssessmentProgress';

// --- Role Selection Components ---

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

const CSuiteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const SeniorLeaderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const RoleSelection = ({ onSelectRole, onGoHome }: { onSelectRole: (role: ExecutiveUserRole) => void, onGoHome: () => void }) => (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex justify-end mb-6">
         <button onClick={onGoHome} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Home</button>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Select Your Role</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">This helps us tailor the questions to your responsibilities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RoleSelectionCard 
            title="C-Suite / Board Member"
            description="For CEOs, CFOs, board members, and others responsible for overall organizational strategy and governance."
            onClick={() => onSelectRole('csuite')}
            icon={<CSuiteIcon />}
        />
        <RoleSelectionCard 
            title="Senior Leader / Department Head"
            description="For VPs, Directors, and other leaders responsible for executing strategy and managing key business units or functions."
            onClick={() => onSelectRole('senior_leader')}
            icon={<SeniorLeaderIcon />}
        />
      </div>
    </div>
);

// --- Icon for completion status in sidebar ---
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// --- Main Assessment Component ---

export default function ExecutiveAssessment({ onGoHome }: ExecutiveAssessmentProps) {
  const [userRole, setUserRole] = useState<ExecutiveUserRole | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: boolean | null }>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaveConfirmed, setIsSaveConfirmed] = useState(false);

  useEffect(() => {
    // Using a short timeout to ensure loading spinner is visible for a better UX
    const timer = setTimeout(() => {
      try {
        const savedProgress = localStorage.getItem(EXECUTIVE_STORAGE_KEY);
        if (savedProgress) {
          const { userRole: savedRole, answers: savedAnswers, currentCategoryIndex: savedIndex } = JSON.parse(savedProgress);
          if (savedRole && savedAnswers && typeof savedIndex === 'number') {
            setUserRole(savedRole);
            setAnswers(savedAnswers);
            setCurrentCategoryIndex(savedIndex);
          }
        }
      } catch (error) {
        console.error("Failed to load Executive assessment progress:", error);
        localStorage.removeItem(EXECUTIVE_STORAGE_KEY);
      } finally {
        setIsLoaded(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const saveProgress = () => {
    if (isLoaded && userRole && !showResults) {
      try {
        const progress = { userRole, answers, currentCategoryIndex };
        localStorage.setItem(EXECUTIVE_STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save Executive assessment progress:", error);
      }
    }
  };

  useEffect(() => {
    saveProgress();
  }, [userRole, answers, currentCategoryIndex, isLoaded, showResults]);
  
  const filteredQuestions = useMemo<ExecutiveQuestion[]>(() => {
    if (!userRole) return [];
    if (userRole === 'csuite') {
      return EXECUTIVE_QUESTIONS;
    }
    // For senior leaders, filter out questions specifically for the C-suite.
    return EXECUTIVE_QUESTIONS.filter(q => !(q.role === 'csuite'));
  }, [userRole]);

  const categories = useMemo<string[]>(() => {
    if (!filteredQuestions) return [];
    const uniqueCategories = new Set(filteredQuestions.map(q => q.category));
    return Array.from(uniqueCategories);
  }, [filteredQuestions]);

  const categoryCompletionStatus = useMemo(() => {
    const status: { [category: string]: boolean } = {};
    categories.forEach(category => {
        const questionsInCategory = filteredQuestions.filter(q => q.category === category);
        if (questionsInCategory.length === 0) {
            status[category] = true; // No questions means complete
            return;
        }
        const allAnswered = questionsInCategory.every(q => answers[q.id] !== null && answers[q.id] !== undefined);
        status[category] = allAnswered;
    });
    return status;
  }, [categories, filteredQuestions, answers]);

  const currentCategory = categories[currentCategoryIndex];
  
  const currentCategoryQuestions = useMemo(() => {
    return filteredQuestions.filter(q => q.category === currentCategory);
  }, [currentCategory, filteredQuestions]);

  const handleSelectRole = (role: ExecutiveUserRole) => {
    setUserRole(role);
    setAnswers({});
    setCurrentCategoryIndex(0);
  };
  
  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
  };

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      setShowResults(true);
      localStorage.removeItem(EXECUTIVE_STORAGE_KEY);
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const handleGoHomeAndClear = () => {
    localStorage.removeItem(EXECUTIVE_STORAGE_KEY);
    onGoHome();
  };

  const handleManualSave = () => {
    saveProgress();
    setIsSaveConfirmed(true);
    setTimeout(() => setIsSaveConfirmed(false), 2000);
  };

  const result = useMemo<ExecutiveResult | null>(() => {
    if (!showResults || filteredQuestions.length === 0) return null;
    
    const totalScore = Object.values(answers).filter(answer => answer === true).length;
    const maxScore = filteredQuestions.length;

    const categoryScores: { [category: string]: number } = {};
    categories.forEach(cat => { categoryScores[cat] = 0; });

    filteredQuestions.forEach(q => {
        if (answers[q.id] === true) {
            categoryScores[q.category] = (categoryScores[q.category] || 0) + 1;
        }
    });

    for (const key in EXECUTIVE_SCORE_RANGES) {
      const range = EXECUTIVE_SCORE_RANGES[key as keyof typeof EXECUTIVE_SCORE_RANGES];
      if (totalScore >= range.min && totalScore <= range.max) {
        return { totalScore, maxScore, ...range, categoryScores };
      }
    }
    
    return {
      totalScore,
      maxScore,
      level: 'Unknown',
      interpretation: 'Could not determine maturity level.',
      categoryScores
    };
  }, [showResults, answers, filteredQuestions, categories]);

  if (!isLoaded) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8 flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (!userRole) {
    return <RoleSelection onSelectRole={handleSelectRole} onGoHome={handleGoHomeAndClear} />;
  }

  if (result) {
    return <ResultsPage result={result} assessmentType="executive" onRestart={handleGoHomeAndClear} />;
  }
  
  if (!currentCategory) {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-700">Loading Assessment...</h2>
            <p className="text-slate-500">There may be no applicable questions for your selected role.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">Executive Assessment</h2>
            <button onClick={handleGoHomeAndClear} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Home</button>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 lg:w-1/4 md:pr-8 md:border-r md:border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Categories</h3>
                <nav>
                    <ul className="space-y-2">
                        {categories.map((category, index) => (
                            <li key={category}>
                                <button
                                    onClick={() => setCurrentCategoryIndex(index)}
                                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors flex justify-between items-center ${
                                      index === currentCategoryIndex
                                        ? 'bg-blue-600 text-white font-semibold shadow'
                                        : `text-slate-600 hover:bg-slate-100 ${categoryCompletionStatus[category] ? 'font-medium' : ''}`
                                    }`}
                                >
                                    <span>{category}</span>
                                    {categoryCompletionStatus[category] && index !== currentCategoryIndex && <CheckIcon />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="w-full md:w-2/3 lg:w-3/4">
                <div className="mb-6">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-blue-700">Category {currentCategoryIndex + 1} of {categories.length}</span>
                        <span className="text-sm font-medium text-blue-700">{Math.round(((currentCategoryIndex + 1) / categories.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${((currentCategoryIndex + 1) / categories.length) * 100}%`, transition: 'width 0.3s ease-in-out'}}></div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-3xl font-semibold text-slate-800 mb-2">{currentCategory}</h3>
                    <p className="text-slate-600">Please answer the following questions based on your organization's current practices.</p>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4">
                    {currentCategoryQuestions.map(question => (
                        <div 
                            key={question.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-slate-50 border-2 border-slate-200"
                        >
                            <p className="flex-grow text-slate-700 mr-4 mb-3 sm:mb-0">{question.question}</p>
                            <div className="flex-shrink-0 flex items-center gap-2 self-end sm:self-center">
                              <button
                                onClick={() => handleAnswer(question.id, true)}
                                className={`px-5 py-2 text-sm font-semibold rounded-md border-2 transition-colors ${answers[question.id] === true ? 'bg-green-600 text-white border-green-700' : 'bg-white text-green-800 border-slate-300 hover:bg-green-50'}`}
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => handleAnswer(question.id, false)}
                                className={`px-5 py-2 text-sm font-semibold rounded-md border-2 transition-colors ${answers[question.id] === false ? 'bg-red-600 text-white border-red-700' : 'bg-white text-red-800 border-slate-300 hover:bg-red-50'}`}
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
                            {currentCategoryIndex < categories.length - 1 ? 'Next Category' : 'View Results'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}