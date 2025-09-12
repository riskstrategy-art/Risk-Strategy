import React, { useState, useMemo, useEffect } from 'react';
import { EXECUTIVE_QUESTIONS, EXECUTIVE_SCORE_RANGES, OPERATING_COUNTRIES, PROFESSIONAL_BODIES, AREAS_OF_FOCUS, YEARS_OF_EXPERIENCE, INDUSTRY_SPECIFIC_INSIGHTS } from '../constants';
import { ExecutiveResult, ExecutiveUserRole, ExecutiveQuestion, OnboardingData } from '../types';
import ResultsPage from './ResultsPage';
import Spinner from './Spinner';
import { saveAssessmentProgress, loadAssessmentProgress, clearAssessmentProgress } from '../services/assessmentService';

interface ExecutiveAssessmentProps {
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

const PublicSectorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

const PrivateSectorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m-6.75-14.25h3.375m-3.375 3h3.375m-3.375 3h3.375m-3.375 3h3.375M12 5.25v13.5m3.75-13.5h3.375m-3.375 3h3.375m-3.375 3h3.375m-3.375 3h3.375" />
    </svg>
);

const TechIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const FinanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const IndustrialsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path></svg>;
const ConsumerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const AllSectorsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;

const RetailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l.383-1.437M7.5 14.25L5.106 5.165A2.25 2.25 0 002.869 3H2.25m9.75 11.25h.008v.008h-.008v-.008z" /></svg>;
const EnergyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
const HealthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
const ConstructionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.527-1.042.02-2.454-1.116-2.454H9.375a2.122 2.122 0 00-1.082.311l-2.496 3.03M11.42 15.17L9.375 18m2.045-2.83l2.496-3.03m0 0l-5.877-5.877a2.652 2.652 0 00-3.75 3.75L6.102 12.12a3.375 3.375 0 004.253.336L15.5 8.25m-5.877 5.877l-2.496 3.03" /></svg>;
const TelecomsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>;
const FintechIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 014.5 5.25h.75M6 18.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-.75A.75.75 0 008.25 18h-.75a.75.75 0 00-.75.75v.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 014.5 5.25h.75M6 18.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-.75A.75.75 0 008.25 18h-.75a.75.75 0 00-.75.75v.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v.01M12 12v.01M12 9v.01M12 6v.01M15 15v.01M15 12v.01M15 9v.01M15 6v.01M18 15v.01M18 12v.01M18 9v.01M18 6v.01M21 15v.01M21 12v.01M21 9v.01M21 6v.01" /></svg>;
const RealEstateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5-1.5-.5M5.25 7.5l3 1.5" /></svg>;
const ICTIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M11.02 7.022a2.25 2.25 0 012.96 0l1.038 1.038a.75.75 0 001.06-1.06l-1.038-1.038a4.125 4.125 0 00-5.834 0l-1.038 1.038a.75.75 0 101.06 1.06l1.038-1.038zM16.98 16.978a2.25 2.25 0 01-2.96 0l-1.038-1.038a.75.75 0 00-1.06 1.06l1.038 1.038a4.125 4.125 0 005.834 0l1.038-1.038a.75.75 0 00-1.06-1.06l-1.038 1.038z" /></svg>;
const OtherIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;


const CSuiteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const SeniorLeaderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const RiskOfficerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;
const ComplianceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AuditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M15.5 22a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2zM19.5 22a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2zM15.5 16a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2zM19.5 16a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2z"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5.5a.5.5 0 0 1 0 1H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h8a1 1 0 0 1 1 1v5.5a.5.5 0 0 1-1 0V3z"/><path d="M12 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm2 2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 .5.5z"/></svg>;


// --- Constants for Selection Steps ---

const SUB_SECTORS = [
    { name: 'Technology & Communications', icon: <TechIcon />, industries: ['ICT', 'Fintech', 'Telecoms'] },
    { name: 'Financial Services & Real Estate', icon: <FinanceIcon />, industries: ['Fintech', 'Real Estate'] },
    { name: 'Energy & Industrials', icon: <IndustrialsIcon />, industries: ['Energy', 'Construction'] },
    { name: 'Consumer & Health', icon: <ConsumerIcon />, industries: ['Retail', 'Health'] },
    { name: 'All Sectors', icon: <AllSectorsIcon />, industries: ['Retail', 'Energy', 'Health', 'Construction', 'Telecoms', 'Fintech', 'Real Estate', 'ICT', 'Other'] }
];

const INDUSTRIES = [
    { name: 'Retail', icon: <RetailIcon /> },
    { name: 'Energy', icon: <EnergyIcon /> },
    { name: 'Health', icon: <HealthIcon /> },
    { name: 'Construction', icon: <ConstructionIcon /> },
    { name: 'Telecoms', icon: <TelecomsIcon /> },
    { name: 'Fintech', icon: <FintechIcon /> },
    { name: 'Real Estate', icon: <RealEstateIcon /> },
    { name: 'ICT', icon: <ICTIcon /> },
    { name: 'Other', icon: <OtherIcon /> },
];

const ROLES = [
    { id: 'csuite', title: 'C-Suite / Board Member', description: 'Overall strategy and governance.', icon: <CSuiteIcon /> },
    { id: 'senior_leader', title: 'Senior Leader / Dept. Head', description: 'Executing strategy and managing units.', icon: <SeniorLeaderIcon /> },
    { id: 'chief_risk_officer', title: 'Chief Risk Officer', description: 'Overseeing the ERM framework.', icon: <RiskOfficerIcon /> },
    { id: 'head_of_compliance', title: 'Head of Compliance', description: 'Ensuring regulatory adherence.', icon: <ComplianceIcon /> },
    { id: 'internal_audit_director', title: 'Internal Audit Director', description: 'Providing assurance on controls.', icon: <AuditIcon /> }
];

// --- Reusable Components ---

const SelectionCard: React.FC<{ title: string; description?: string; onClick: () => void; icon: React.ReactElement; small?: boolean; }> = ({ title, description, onClick, icon, small = false }) => (
    <button
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-left w-full h-full flex flex-col items-start border border-slate-200 ${small ? 'p-4' : 'p-6'}`}
    >
      <div className={`bg-blue-600 text-white rounded-full mb-3 ${small ? 'p-2' : 'p-3'}`}>{icon}</div>
      <h3 className={`font-bold text-slate-800 ${small ? 'text-lg mb-1' : 'text-xl mb-2'}`}>{title}</h3>
      {description && <p className={`text-slate-600 flex-grow ${small ? 'text-xs' : 'text-sm'}`}>{description}</p>}
       {!small && (
        <div className="mt-4 text-blue-600 font-semibold flex items-center group">
          Select
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CheckIconWhite = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// --- Main Assessment Component ---

export default function ExecutiveAssessment({ onGoHome, subType }: ExecutiveAssessmentProps) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [selectionState, setSelectionState] = useState<{
    step: 'sector' | 'subSector' | 'industry' | 'role' | 'riskAppetite' | 'assessment';
    sector: 'public' | 'private' | null;
    subSector: string | null;
    industry: string | null;
    otherIndustryDescription: string;
    role: ExecutiveUserRole | null;
    riskAppetite: {
        statementStatus: string;
        influences: string;
    } | null;
  }>({
    step: subType === 'public' ? 'role' : 'sector',
    sector: subType === 'public' ? 'public' : null,
    subSector: null,
    industry: null,
    otherIndustryDescription: '',
    role: null,
    riskAppetite: null,
  });

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: boolean | null }>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaveConfirmed, setIsSaveConfirmed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [lastAnswered, setLastAnswered] = useState<{ id: number; answer: boolean } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadProgress = async () => {
        try {
            const savedProgress = await loadAssessmentProgress('executive');
            if (isMounted && savedProgress) {
                const { selectionState: savedState, answers: savedAnswers, currentCategoryIndex: savedIndex, onboardingData: savedOnboarding } = savedProgress;
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
            console.error("Failed to load Executive assessment progress:", error);
            clearAssessmentProgress('executive');
        } finally {
            if (isMounted) {
                setIsLoaded(true);
            }
        }
    };

    const timer = setTimeout(() => {
        loadProgress();
    }, 500);

    return () => {
        isMounted = false;
        clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Debounced save to avoid excessive writes/API calls
    const handler = setTimeout(() => {
        if (isLoaded && selectionState.step === 'assessment' && !showResults) {
            const progress = { selectionState, answers, currentCategoryIndex, onboardingData };
            saveAssessmentProgress('executive', progress);
        }
    }, 500);

    return () => {
        clearTimeout(handler);
    };
  }, [selectionState, answers, currentCategoryIndex, onboardingData, isLoaded, showResults]);
  
  const filteredQuestions = useMemo<ExecutiveQuestion[]>(() => {
    if (!selectionState.role || !onboardingData) return [];
    
    const cSuiteRoles: ExecutiveUserRole[] = ['csuite', 'chief_risk_officer', 'head_of_compliance', 'internal_audit_director'];
    const userCountry = onboardingData.country;

    const industryFilter = (question: ExecutiveQuestion): boolean => {
      const { sector, industry: selectedIndustry } = selectionState;
      if (sector === 'public') return !question.industry;
      
      if (sector === 'private') {
        if (!question.industry) return true; // General questions apply to all private sector
        if (!selectedIndustry) return false; // If industry not chosen yet, no industry questions apply
        
        if (Array.isArray(question.industry)) {
            return question.industry.includes(selectedIndustry);
        }
        return question.industry === selectedIndustry;
      }
      return !question.industry;
    };

    return EXECUTIVE_QUESTIONS.filter(question => {
      const countryIsApplicable = !question.country || question.country === userCountry;
      const roleIsApplicable = cSuiteRoles.includes(selectionState.role!) || question.role !== 'csuite';
      const industryIsApplicable = industryFilter(question);
      return roleIsApplicable && industryIsApplicable && countryIsApplicable;
    });
  }, [selectionState.role, selectionState.sector, selectionState.industry, onboardingData]);

  const categories = useMemo<string[]>(() => {
    if (!filteredQuestions) return [];
    return Array.from(new Set(filteredQuestions.map(q => q.category)));
  }, [filteredQuestions]);

  const categoryCompletionStatus = useMemo(() => {
    const status: { [category: string]: boolean } = {};
    categories.forEach(category => {
        const questionsInCategory = filteredQuestions.filter(q => q.category === category);
        status[category] = questionsInCategory.every(q => {
             const isVisible = !q.dependsOn || (answers[q.dependsOn.questionId] === q.dependsOn.requiredValue);
             const isAnswered = answers[q.id] !== null && answers[q.id] !== undefined;
             return isAnswered || !isVisible;
        });
    });
    return status;
  }, [categories, filteredQuestions, answers]);

  const currentCategory = categories[currentCategoryIndex];
  
  const currentCategoryQuestions = useMemo(() => {
    return filteredQuestions.filter(q => q.category === currentCategory);
  }, [currentCategory, filteredQuestions]);
  
  const handleAnswer = (questionId: number, answer: boolean) => {
    setLastAnswered({ id: questionId, answer });
    setTimeout(() => setLastAnswered(null), 1500);

    setAnswers(prev => {
        const newAnswers = {...prev, [questionId]: answer};
        
        // Find any questions that depend on this one and reset their answers if the condition is no longer met
        filteredQuestions.forEach(q => {
            if (q.dependsOn && q.dependsOn.questionId === questionId && answer !== q.dependsOn.requiredValue) {
                if (newAnswers[q.id] !== undefined) {
                    delete newAnswers[q.id];
                }
            }
        });

        return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      setShowResults(true);
      clearAssessmentProgress('executive');
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) setCurrentCategoryIndex(currentCategoryIndex - 1);
  };

  const handleManualSave = () => {
    if (isLoaded && selectionState.step === 'assessment' && !showResults) {
        const progress = { selectionState, answers, currentCategoryIndex, onboardingData };
        saveAssessmentProgress('executive', progress).then(() => {
            setIsSaveConfirmed(true);
            setTimeout(() => setIsSaveConfirmed(false), 2000);
        });
    }
  };
  
  const resetSelection = () => {
      clearAssessmentProgress('executive');
      setOnboardingData(null);
      setSelectionState({
        step: 'sector',
        sector: null, subSector: null, industry: null, otherIndustryDescription: '',
        role: null, riskAppetite: null
      });
      setAnswers({});
      setCurrentCategoryIndex(0);
      setShowResults(false);
  };

  const result = useMemo<ExecutiveResult | null>(() => {
    if (!showResults || filteredQuestions.length === 0) return null;
    
    const totalScore = Object.values(answers).filter(answer => answer === true).length;
    const maxScore = filteredQuestions.length;

    const categoryScores: { [category: string]: number } = {};
    const categoryMaxScores: { [category: string]: number } = {};
    categories.forEach(cat => {
        categoryScores[cat] = 0;
        categoryMaxScores[cat] = 0;
    });

    filteredQuestions.forEach(q => {
        categoryMaxScores[q.category] = (categoryMaxScores[q.category] || 0) + 1;
        if (answers[q.id] === true) categoryScores[q.category] = (categoryScores[q.category] || 0) + 1;
    });

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    const RANGES_PERCENT = {
      initial: { max: 30, level: 'Initial', interpretation: EXECUTIVE_SCORE_RANGES.initial.interpretation },
      managed: { max: 50, level: 'Managed', interpretation: EXECUTIVE_SCORE_RANGES.managed.interpretation },
      defined: { max: 70, level: 'Defined', interpretation: EXECUTIVE_SCORE_RANGES.defined.interpretation },
      quantitatively_managed: { max: 90, level: 'Quantitatively Managed', interpretation: EXECUTIVE_SCORE_RANGES.quantitatively_managed.interpretation },
      optimized: { max: 100, level: 'Optimized', interpretation: EXECUTIVE_SCORE_RANGES.optimized.interpretation }
    } as const;
    
    let calculatedLevel: ExecutiveResult['level'] = 'Unknown';
    let calculatedInterpretation = 'Could not determine maturity level.';

    if (percentage <= RANGES_PERCENT.initial.max) {
      calculatedLevel = RANGES_PERCENT.initial.level;
      calculatedInterpretation = RANGES_PERCENT.initial.interpretation;
    } else if (percentage <= RANGES_PERCENT.managed.max) {
      calculatedLevel = RANGES_PERCENT.managed.level;
      calculatedInterpretation = RANGES_PERCENT.managed.interpretation;
    } else if (percentage <= RANGES_PERCENT.defined.max) {
      calculatedLevel = RANGES_PERCENT.defined.level;
      calculatedInterpretation = RANGES_PERCENT.defined.interpretation;
    } else if (percentage <= RANGES_PERCENT.quantitatively_managed.max) {
      calculatedLevel = RANGES_PERCENT.quantitatively_managed.level;
      calculatedInterpretation = RANGES_PERCENT.quantitatively_managed.interpretation;
    } else {
      calculatedLevel = RANGES_PERCENT.optimized.level;
      calculatedInterpretation = RANGES_PERCENT.optimized.interpretation;
    }

    if (totalScore === 0 && Object.keys(answers).length >= maxScore) {
        calculatedLevel = 'Initial';
        calculatedInterpretation = EXECUTIVE_SCORE_RANGES.initial.interpretation;
    }
    
    return { totalScore, maxScore, level: calculatedLevel, interpretation: calculatedInterpretation, categoryScores, categoryMaxScores };
  }, [showResults, answers, filteredQuestions, categories]);

  const industryInsights = useMemo(() => {
    return selectionState.industry ? INDUSTRY_SPECIFIC_INSIGHTS[selectionState.industry] : null;
  }, [selectionState.industry]);

  if (!isLoaded) {
    return <div className="w-full max-w-4xl mx-auto p-4 md:p-8 flex justify-center items-center min-h-[400px]"><Spinner /></div>;
  }

  if (!onboardingData) {
      return <OnboardingDetails onSubmit={setOnboardingData} onGoHome={onGoHome} />;
  }

  // --- Multi-step Selection Renderer ---
  if (selectionState.step !== 'assessment') {
    const header = (title: string, subtitle: string) => (
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-3">{title}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    );

    const stepIndicator = (current: number, total: number) => (
        <h3 className="text-lg font-semibold text-slate-600">Step {current} of {total}</h3>
    );
    
    const totalSteps = selectionState.sector === 'public' ? 2 : 5;

    switch (selectionState.step) {
        case 'sector':
            return (
                <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        {stepIndicator(1, totalSteps)}
                        <button onClick={() => setOnboardingData(null)} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Details</button>
                    </div>
                    {header("Select Your Sector", "This helps us tailor the assessment to your organization's context.")}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SelectionCard title="Public Sector" description="For leaders in Southern African parastatals (State-Owned Enterprises), government departments, and other public entities." onClick={() => setSelectionState(prev => ({ ...prev, sector: 'public', step: 'role' }))} icon={<PublicSectorIcon />} />
                        <SelectionCard title="Private Sector" description="For leaders in commercial, for-profit organizations across various industries." onClick={() => setSelectionState(prev => ({ ...prev, sector: 'private', step: 'subSector' }))} icon={<PrivateSectorIcon />} />
                    </div>
                </div>
            );
        case 'subSector':
             return (
                <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        {stepIndicator(2, totalSteps)}
                        <button onClick={() => setSelectionState(prev => ({...prev, step: 'sector', sector: null}))} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back</button>
                    </div>
                    {header("Select Your Sub-Sector", "This helps us narrow down the most relevant industry questions.")}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {SUB_SECTORS.map(sub => (
                            <SelectionCard key={sub.name} title={sub.name} onClick={() => setSelectionState(prev => ({...prev, subSector: sub.name, step: 'industry'}))} icon={sub.icon} />
                        ))}
                    </div>
                </div>
            );
        case 'industry':
            const filteredIndustries = selectionState.subSector ? INDUSTRIES.filter(ind => {
                const sub = SUB_SECTORS.find(s => s.name === selectionState.subSector);
                return sub?.industries.includes(ind.name);
            }) : INDUSTRIES;

            if (selectionState.industry === 'Other') {
              return (
                <div className="w-full max-w-2xl mx-auto p-4 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                       {stepIndicator(3, totalSteps)}
                        <button onClick={() => setSelectionState(prev => ({...prev, industry: null}))} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back</button>
                    </div>
                    {header("Describe Your Industry", "Please provide a brief description of your organization's primary industry.")}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                        <textarea
                            value={selectionState.otherIndustryDescription}
                            onChange={(e) => setSelectionState(prev => ({ ...prev, otherIndustryDescription: e.target.value }))}
                            placeholder="e.g., 'Agricultural Technology' or 'Logistics and Freight'"
                            className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <button 
                            onClick={() => setSelectionState(prev => ({ ...prev, step: 'role' }))}
                            disabled={!selectionState.otherIndustryDescription.trim()}
                            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Continue
                        </button>
                    </div>
                </div>
              );
            }

            return (
                <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        {stepIndicator(3, totalSteps)}
                        <button onClick={() => setSelectionState(prev => ({...prev, step: 'subSector', subSector: null, industry: null}))} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back</button>
                    </div>
                    {header("Select Your Industry", "Choose the industry that best represents your organization.")}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredIndustries.map(ind => (
                            <SelectionCard key={ind.name} title={ind.name} onClick={() => {
                                const nextStep = ind.name === 'Other' ? 'industry' : 'role';
                                setSelectionState(prev => ({...prev, industry: ind.name, step: nextStep}));
                            }} icon={ind.icon} />
                        ))}
                    </div>
                </div>
            );
        case 'role':
            return (
                <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                         {stepIndicator(selectionState.sector === 'public' ? 1 : 4, totalSteps)}
                        <button onClick={() => setSelectionState(prev => ({...prev, step: prev.sector === 'public' ? 'sector' : 'industry', role: null}))} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back</button>
                    </div>
                    {header("Select Your Role", "This helps us tailor the questions to your responsibilities.")}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {ROLES.map(role => (
                            <div key={role.id} className={role.id === 'csuite' ? 'md:col-span-3' : ''}>
                                <SelectionCard small title={role.title} description={role.description} onClick={() => setSelectionState(prev => ({...prev, role: role.id as ExecutiveUserRole, step: 'riskAppetite'}))} icon={role.icon} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'riskAppetite':
            return <RiskAppetiteStep 
                onBack={() => setSelectionState(prev => ({...prev, step: 'role', riskAppetite: null}))}
                onSubmit={(data) => {
                    const q2Answer = data.statementStatus === 'approved';
                    const q142Answer = q2Answer && data.influences === 'systematically';
                    const q143Answer = data.statementStatus === 'developing';

                    setAnswers(prev => ({
                      ...prev,
                      2: q2Answer,
                      142: q142Answer,
                      143: q143Answer
                    }));
                    setSelectionState(prev => ({ ...prev, riskAppetite: data, step: 'assessment' }));
                }}
                stepNumber={selectionState.sector === 'public' ? 2 : 5}
                totalSteps={totalSteps}
              />;
    }
  }

  if (result) {
    return <ResultsPage result={result} assessmentType="executive" industry={selectionState.industry ?? undefined} country={onboardingData.country} onRestart={resetSelection} />;
  }
  
  if (!currentCategory) {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-700">Loading Assessment...</h2>
            <p className="text-slate-500">There may be no applicable questions for your selected role and industry.</p>
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
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600">Executive Assessment</h2>
             <div className="flex items-center gap-4">
                <button
                    onClick={handleManualSave}
                    disabled={isSaveConfirmed}
                    className={`py-2 px-4 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center min-w-[110px] ${
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
                    ) : 'Save Progress'}
                </button>
                <button onClick={resetSelection} className="text-sm text-slate-500 hover:text-slate-800">&larr; Change Selections</button>
            </div>
        </div>
        
        <div className="mb-8">
            <div className="flex justify-between items-end mb-1">
                <span className="text-base font-medium text-blue-700">Category {currentCategoryIndex + 1} of {categories.length}: {currentCategory}</span>
                <span className="text-sm font-medium text-blue-700">{Math.round(((currentCategoryIndex + 1) / categories.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${((currentCategoryIndex + 1) / categories.length) * 100}%`, transition: 'width 0.3s ease-in-out'}}></div>
            </div>
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
                                        ? 'bg-blue-600 text-white font-bold shadow-lg ring-2 ring-blue-400'
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
                {industryInsights && (
                    <div className="mt-8 pt-4 border-t border-slate-200">
                        <h4 className="font-bold text-slate-700 text-sm mb-2">Industry Context: {selectionState.industry}</h4>
                        <div className="space-y-3 text-xs text-slate-600">
                            <div>
                                <h5 className="font-semibold text-red-600 mb-1">Key Risks</h5>
                                <ul className="list-disc pl-4 space-y-1">
                                    {industryInsights.risks.slice(0, 2).map((risk, i) => <li key={i}>{risk}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold text-green-600 mb-1">Opportunities</h5>
                                <ul className="list-disc pl-4 space-y-1">
                                    {industryInsights.opportunities.slice(0, 2).map((opp, i) => <li key={i}>{opp}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            <main className="w-full md:w-2/3 lg:w-3/4">
                <div className="mb-8">
                    <h3 className="text-3xl font-semibold text-slate-800 mb-2">{currentCategory}</h3>
                    <p className="text-slate-600">Please answer the following questions based on your organization's current practices.</p>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4">
                    {currentCategoryQuestions.map(question => {
                        const isVisible = !question.dependsOn || (answers[question.dependsOn.questionId] === question.dependsOn.requiredValue);

                        if (!isVisible) {
                            return null;
                        }
                        
                        return (
                            <div 
                                key={question.id}
                                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-slate-50 border-2 border-slate-200 transition-colors ${question.dependsOn ? 'conditional-question-animation' : ''} ${lastAnswered?.id === question.id ? (lastAnswered.answer ? 'highlight-yes-animation' : 'highlight-no-animation') : ''}`}
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
                        );
                    })}
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                     <button
                        onClick={handleBack}
                        disabled={currentCategoryIndex === 0}
                        className="py-3 px-6 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        {currentCategoryIndex < categories.length - 1 ? 'Next Category' : 'View Results'}
                    </button>
                </div>
            </main>
        </div>
    </div>
  );
}

// --- New Risk Appetite Step Component ---
const RiskAppetiteStep: React.FC<{
  onBack: () => void;
  onSubmit: (data: any) => void;
  stepNumber: number;
  totalSteps: number;
}> = ({ onBack, onSubmit, stepNumber, totalSteps }) => {
    const [data, setData] = useState({ statementStatus: '', influences: '' });

    const isComplete = data.statementStatus && data.influences;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isComplete) {
            onSubmit(data);
        }
    };

    const RadioButton = ({ name, value, label, checked, onChange }: any) => (
        <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all h-full flex items-center ${checked ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
            <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="hidden" />
            <span className="font-semibold text-slate-700">{label}</span>
        </label>
    );

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-600">Step {stepNumber} of {totalSteps}</h3>
                <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800">&larr; Back</button>
            </div>
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Risk Appetite Statement</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">This helps us understand the maturity of your organization's formal approach to risk-taking.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-3">1. Does your organization have a formally documented and board-approved Risk Appetite Statement?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <RadioButton name="statementStatus" value="approved" label="Yes, approved" checked={data.statementStatus === 'approved'} onChange={(e: any) => setData(p => ({...p, statementStatus: e.target.value}))} />
                        <RadioButton name="statementStatus" value="developing" label="In development" checked={data.statementStatus === 'developing'} onChange={(e: any) => setData(p => ({...p, statementStatus: e.target.value}))} />
                        <RadioButton name="statementStatus" value="no" label="No" checked={data.statementStatus === 'no'} onChange={(e: any) => setData(p => ({...p, statementStatus: e.target.value}))} />
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-3">2. To what extent does the Risk Appetite Statement influence key business decisions?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <RadioButton name="influences" value="systematically" label="Systematically" checked={data.influences === 'systematically'} onChange={(e: any) => setData(p => ({...p, influences: e.target.value}))} />
                        <RadioButton name="influences" value="sometimes" label="Sometimes" checked={data.influences === 'sometimes'} onChange={(e: any) => setData(p => ({...p, influences: e.target.value}))} />
                        <RadioButton name="influences" value="rarely" label="Rarely" checked={data.influences === 'rarely'} onChange={(e: any) => setData(p => ({...p, influences: e.target.value}))} />
                        <RadioButton name="influences" value="never" label="Never" checked={data.influences === 'never'} onChange={(e: any) => setData(p => ({...p, influences: e.target.value}))} />
                    </div>
                </div>

                <div className="pt-4 space-y-3">
                    <button type="submit" disabled={!isComplete} className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Proceed to Assessment
                    </button>
                </div>
            </form>
        </div>
    );
};