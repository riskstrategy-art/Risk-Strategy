import React, { useState, useMemo, useEffect } from 'react';
import { NFP_DATA, NFP_SCORE_RANGES, OPERATING_COUNTRIES, PROFESSIONAL_BODIES, AREAS_OF_FOCUS, YEARS_OF_EXPERIENCE } from '../constants';
import { NfpAnswers, NfpResult, NfpCategoryResult, NfpUserRole, OnboardingData } from '../types';
import ResultsPage from './ResultsPage';
import Spinner from './Spinner';

const NFP_STORAGE_KEY = 'nfpAssessmentProgress';

interface NfpAssessmentProps {
  onGoHome: () => void;
  subType?: string;
}

// --- Onboarding Sub-Component ---
const OnboardingDetails: React.FC<{ onSubmit: (data: OnboardingData) => void; onGoHome: () => void; }> = ({ onSubmit, onGoHome }) => {
    const [formData, setFormData] = useState<OnboardingData>({
        country: '',
        profession: '',
        areaOfFocus: '',
        yearsOfExperience: ''
    });

    const handleChange = (field: keyof OnboardingData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(formData).some(val => val === '')) {
            alert('Please fill out all fields to continue.');
            return;
        }
        onSubmit(formData);
    };
    
    const SelectInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]; required?: boolean; }> = ({ label, value, onChange, options, required }) => (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="" disabled>Select an option</option>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    );

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
            <div className="flex justify-end mb-6">
                <button onClick={onGoHome} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Home</button>
            </div>
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Tell Us About Yourself</h2>
                <p className="text-lg text-slate-600">This information helps us contextualize risk maturity across different professional landscapes.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                <SelectInput label="Country of Operation" value={formData.country} onChange={handleChange('country')} options={OPERATING_COUNTRIES} required />
                <SelectInput label="Certified Skill / Profession" value={formData.profession} onChange={handleChange('profession')} options={PROFESSIONAL_BODIES} required />
                <SelectInput label="Primary Area of Focus" value={formData.areaOfFocus} onChange={handleChange('areaOfFocus')} options={AREAS_OF_FOCUS} required />
                <SelectInput label="Years of Experience in this Area" value={formData.yearsOfExperience} onChange={handleChange('yearsOfExperience')} options={YEARS_OF_EXPERIENCE} required />

                <div className="pt-4">
                    <button type="submit" className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                        Continue to Assessment
                    </button>
                </div>
            </form>
        </div>
    );
};


// --- Icons for Onboarding ---

const NgoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const AssociationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.28a4.5 4.5 0 00-1.88-2.284M18 18.72A7.929 7.929 0 0112 21a7.929 7.929 0 01-6-2.28m12-10.72h.008v.008h-.008V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75a3 3 0 013-3h9a3 3 0 013 3v3a3 3 0 01-3 3h-9a3 3 0 01-3-3v-3z" />
    </svg>
);

const ProgrammingNgoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.13 15.13C3.957 16.388 5.765 18 8.25 18c2.485 0 4.293-1.612 5.12-2.87M15.87 15.13c.827 1.258 2.635 2.87 5.12 2.87 2.485 0 4.293-1.612 5.12-2.87" />
    </svg>
);

const GrantMakingNgoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const HybridNgoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const ExecutiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ManagerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ProgramManagerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v2a1 1 0 001 1h4a1 1 0 001-1v-2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0V5a2 2 0 012-2h2a2 2 0 012 2v12m-6 0h6" /></svg>;
const FinanceOfficerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m0 0a2 2 0 100 4 2 2 0 000-4z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5A6.5 6.5 0 1012 5.5a6.5 6.5 0 000 13z" /></svg>;
const PartnershipCoordinatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /><path d="M19 12h2a1 1 0 011 1v4a1 1 0 01-1 1h-2" /><path d="M5 12H3a1 1 0 00-1 1v4a1 1 0 001 1h2" /></svg>;


const CheckIconWhite = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const SelectionCard: React.FC<{ title: React.ReactNode; description: string; onClick: () => void; icon: React.ReactElement; small?: boolean; }> = ({ title, description, onClick, icon, small = false }) => (
    <button
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-left w-full h-full flex flex-col items-start border border-slate-200 ${small ? 'p-4' : 'p-8'}`}
    >
      <div className={`bg-blue-600 text-white rounded-full mb-3 ${small ? 'p-2' : 'p-3'}`}>{icon}</div>
      <div className={`font-bold text-slate-800 ${small ? 'text-lg mb-1' : 'text-2xl mb-2'}`}>{title}</div>
      <p className={`text-slate-600 flex-grow ${small ? 'text-xs' : ''}`}>{description}</p>
      {!small && (
        <div className="mt-6 text-blue-600 font-semibold flex items-center group">
          Select
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
);

const TooltipIcon: React.FC<{ text: string }> = ({ text }) => (
    <div className="relative flex items-center group ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {text}
        </div>
    </div>
);

const ROLES: { id: NfpUserRole; title: string; description: string; icon: JSX.Element; level: 'executive' | 'manager' }[] = [
    { id: 'executive', title: 'Executive / Board Member', description: 'Oversees organizational strategy and governance.', icon: <ExecutiveIcon />, level: 'executive'},
    { id: 'manager', title: 'Manager / Staff', description: 'Handles day-to-day operations and team leadership.', icon: <ManagerIcon />, level: 'manager' },
    { id: 'program_manager', title: 'Program Manager', description: 'Manages specific projects and their outcomes.', icon: <ProgramManagerIcon />, level: 'manager' },
    { id: 'finance_officer', title: 'Finance Officer', description: 'Responsible for financial management and reporting.', icon: <FinanceOfficerIcon />, level: 'manager' },
    { id: 'partnership_coordinator', title: 'Partnership Coordinator', description: 'Manages relationships with partner organizations.', icon: <PartnershipCoordinatorIcon />, level: 'manager' }
];

export default function NfpAssessment({ onGoHome, subType }: NfpAssessmentProps) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  const getInitialStep = (): 'orgType' | 'ngoType' | 'role' => {
    if (subType === 'ngo') return 'ngoType';
    if (subType === 'association') return 'role';
    return 'orgType';
  };

  const [selectionState, setSelectionState] = useState<{
    step: 'orgType' | 'ngoType' | 'role';
    orgType: 'ngo' | 'association' | null;
    ngoType: 'programming' | 'grant-making' | 'hybrid' | null;
    role: 'executive' | 'manager' | null;
  }>({
    step: getInitialStep(),
    orgType: subType === 'ngo' ? 'ngo' : subType === 'association' ? 'association' : null,
    ngoType: null,
    role: null,
  });

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<NfpAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaveConfirmed, setIsSaveConfirmed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
        try {
            const savedProgress = localStorage.getItem(NFP_STORAGE_KEY);
            if (savedProgress) {
                const { selectionState: savedState, answers: savedAnswers, currentCategoryIndex: savedIndex, onboardingData: savedOnboarding } = JSON.parse(savedProgress);
                if (savedState && savedState.role && savedAnswers && typeof savedIndex === 'number' && savedOnboarding) {
                    setSelectionState(savedState);
                    setAnswers(savedAnswers);
                    setCurrentCategoryIndex(savedIndex);
                    setOnboardingData(savedOnboarding);
                    setToastMessage('Your progress has been restored!');
                    setTimeout(() => setToastMessage(''), 2000);
                }
            }
        } catch (error) {
            console.error("Failed to load NFP assessment progress:", error);
            localStorage.removeItem(NFP_STORAGE_KEY);
        } finally {
            setIsLoaded(true);
        }
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  
  const saveProgress = () => {
    if (isLoaded && selectionState.role && !showResults) {
      try {
        const progress = { selectionState, answers, currentCategoryIndex, onboardingData };
        localStorage.setItem(NFP_STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save NFP assessment progress:", error);
      }
    }
  };

  useEffect(() => {
    saveProgress();
  }, [selectionState, answers, currentCategoryIndex, showResults, isLoaded, onboardingData]);

  const filteredNfpData = useMemo(() => {
    if (!selectionState.role || !onboardingData) return [];

    const userCountry = onboardingData.country;
    
    let baseData = NFP_DATA.filter(c => !c.country || c.country === userCountry);
    
    if (selectionState.orgType === 'ngo') {
        baseData = baseData.filter(c => c.id !== 'c9');
    } else if (selectionState.orgType === 'association') {
        baseData = baseData.filter(c => c.id !== 'c10');
    }

    if (selectionState.role === 'executive') {
        return baseData;
    }
    return baseData.map(category => ({
        ...category,
        elements: category.elements.filter(element => element.role !== 'executive')
    })).filter(category => category.elements.length > 0);
  }, [selectionState.role, selectionState.orgType, onboardingData]);

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

  const handleManualSave = () => {
    saveProgress();
    setIsSaveConfirmed(true);
    setTimeout(() => setIsSaveConfirmed(false), 2000);
  };

  const resetSelection = () => {
      localStorage.removeItem(NFP_STORAGE_KEY);
      setOnboardingData(null);
      setSelectionState({
        step: 'orgType',
        orgType: null,
        ngoType: null,
        role: null,
      });
      setAnswers({});
      setCurrentCategoryIndex(0);
      setShowResults(false);
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

  if (!onboardingData) {
      return <OnboardingDetails onSubmit={setOnboardingData} onGoHome={onGoHome} />;
  }

  // --- Multi-step Selection Renderer ---
  if (!selectionState.role) {
    const header = (title: string, subtitle: string) => (
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-3">{title}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    );

    switch (selectionState.step) {
        case 'orgType':
            return (
                <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
                    <div className="flex justify-end mb-6">
                        <button onClick={() => setOnboardingData(null)} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Details</button>
                    </div>
                    {header("Select Your Organization Type", "This helps us tailor the assessment to your specific context.")}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SelectionCard 
                            title="NGO (Humanitarian Interventions)"
                            description="For non-governmental organizations focused on delivering programs, aid, and services, often in a humanitarian context."
                            onClick={() => setSelectionState(prev => ({...prev, orgType: 'ngo', step: 'ngoType'}))}
                            icon={<NgoIcon />}
                        />
                        <SelectionCard 
                            title="Professional Bodies & Associations"
                            description="For member-based organizations, professional associations, and other bodies focused on industry standards and community."
                            onClick={() => setSelectionState(prev => ({...prev, orgType: 'association', step: 'role'}))}
                            icon={<AssociationIcon />}
                        />
                    </div>
                </div>
            );
        case 'ngoType':
            return (
                <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-slate-600">Step 2 of 3</h3>
                        <button onClick={() => setSelectionState(prev => ({...prev, step: 'orgType', orgType: null, ngoType: null}))} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back</button>
                    </div>
                    {header("What is your NGO's primary model?", "This helps clarify your operational focus.")}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SelectionCard 
                            title="Programming NGO"
                            description="Your organization directly implements projects and delivers services to beneficiaries (e.g., running schools, health clinics)."
                            onClick={() => setSelectionState(prev => ({...prev, ngoType: 'programming', step: 'role'}))}
                            icon={<ProgrammingNgoIcon />}
                        />
                        <SelectionCard 
                            title="Grant-making NGO"
                            description="Your organization's primary function is to provide funding and grants to other implementing partners and organizations."
                            onClick={() => setSelectionState(prev => ({...prev, ngoType: 'grant-making', step: 'role'}))}
                            icon={<GrantMakingNgoIcon />}
                        />
                        <div className="md:col-span-2">
                            <SelectionCard 
                                title="Hybrid NGO"
                                description="Your organization both directly implements projects and provides funding to other partner organizations."
                                onClick={() => setSelectionState(prev => ({...prev, ngoType: 'hybrid', step: 'role'}))}
                                icon={<HybridNgoIcon />}
                            />
                        </div>
                    </div>
                </div>
            );
        case 'role':
             return (
                <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-slate-600">{selectionState.orgType === 'ngo' ? 'Step 3 of 3' : 'Step 2 of 2'}</h3>
                        <button onClick={() => setSelectionState(prev => ({...prev, step: prev.orgType === 'ngo' ? 'ngoType' : 'orgType', role: null}))} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back</button>
                    </div>
                    {header("Select Your Role", "To tailor the assessment, please tell us which role best describes your position in the organization.")}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {ROLES.map(role => (
                            <div key={role.id} className={role.level === 'executive' && role.id === 'executive' ? 'md:col-span-3' : ''}>
                                <SelectionCard 
                                    small
                                    title={
                                      <div className="flex items-center">
                                        {role.title}
                                        {role.id === 'executive' && <TooltipIcon text="Sees all questions, including those related to strategy, governance, and board-level oversight." />}
                                        {role.id === 'manager' && <TooltipIcon text="Sees questions focused on operational and team-level risk management, with strategic questions hidden." />}
                                      </div>
                                    }
                                    description={role.description}
                                    onClick={() => setSelectionState(prev => ({...prev, role: role.level as 'executive' | 'manager'}))}
                                    icon={role.icon}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            );
    }
  }

  if (result) {
    return <ResultsPage result={result} assessmentType="nfp" country={onboardingData.country} onRestart={resetSelection} />;
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
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-slate-200 relative">
        {toastMessage && (
            <div className="save-toast-animation absolute top-4 right-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg text-sm font-semibold">
                {toastMessage}
            </div>
        )}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">NFP & NGO Assessment</h2>
            <button onClick={resetSelection} className="text-sm text-slate-500 hover:text-slate-800">&larr; Change Selection</button>
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
                    {currentCategory.description && (
                        <p className="text-slate-600 text-base mb-4">{currentCategory.description}</p>
                    )}
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4">
                    {currentCategory.elements.map(element => (
                        <div 
                            key={element.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-slate-50 border-2 border-slate-200"
                        >
                            <p className="flex-grow text-slate-700 mr-4 mb-3 sm:mb-0">{element.text}</p>
                            <div className="flex-shrink-0 flex items-center gap-2 self-end sm:self-center">
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
                            className={`py-3 px-5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center min-w-[120px] ${
                                isSaveConfirmed
                                ? 'bg-green-600 text-white save-confirmed-animation'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {isSaveConfirmed ? (
                                <span className="flex items-center">
                                    <CheckIconWhite />
                                    <span className="ml-2">Saved!</span>
                                </span>
                            ) : 'Save Progress' }
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