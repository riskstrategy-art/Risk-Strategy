import React, { useState } from 'react';
import { OnboardingData } from '../types';
import { OPERATING_COUNTRIES, PROFESSIONAL_BODIES, AREAS_OF_FOCUS, YEARS_OF_EXPERIENCE } from '../constants';

interface OnboardingDetailsProps {
    onSubmit: (data: OnboardingData) => void;
    onGoHome: () => void;
}

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

export default function OnboardingDetails({ onSubmit, onGoHome }: OnboardingDetailsProps) {
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
        // Basic validation
        if (Object.values(formData).some(val => val === '')) {
            alert('Please fill out all fields to continue.');
            return;
        }
        onSubmit(formData);
    };

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
}