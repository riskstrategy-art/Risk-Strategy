import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, RadialBarChart, RadialBar, PolarAngleAxis, Legend } from 'recharts';
import { ExecutiveResult, NfpResult, AssessmentType } from '../types';
import { getCustomizedGuidance } from '../services/geminiService';
import { NFP_BENCHMARK_SCORES, EXECUTIVE_BENCHMARK_SCORES, EXECUTIVE_QUESTIONS, NFP_DATA, INDUSTRY_SPECIFIC_INSIGHTS } from '../constants';
import Spinner from './Spinner';
import PrintableSummary from './PrintableSummary';

interface ResultsPageProps {
  result: ExecutiveResult | NfpResult;
  assessmentType: AssessmentType;
  industry?: string;
  country?: string;
  onRestart: () => void;
}

// --- Icon Components for Executive Result Visual Indicator ---
const InitialIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
);
const ManagedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);
const DefinedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);
const QuantitativelyManagedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
const OptimizedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

type LevelStyle = {
  icon: React.ReactElement;
  border: string;
  bg: string;
  text: string;
};

const LEVEL_STYLES: Record<ExecutiveResult['level'], LevelStyle> = {
  Initial: { icon: <InitialIcon />, border: 'border-red-400', bg: 'bg-red-100', text: 'text-red-800' },
  Managed: { icon: <ManagedIcon />, border: 'border-orange-400', bg: 'bg-orange-100', text: 'text-orange-800' },
  Defined: { icon: <DefinedIcon />, border: 'border-yellow-400', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'Quantitatively Managed': { icon: <QuantitativelyManagedIcon />, border: 'border-blue-400', bg: 'bg-blue-100', text: 'text-blue-800' },
  Optimized: { icon: <OptimizedIcon />, border: 'border-green-400', bg: 'bg-green-100', text: 'text-green-800' },
  Unknown: { icon: <InitialIcon />, border: 'border-gray-400', bg: 'bg-gray-100', text: 'text-gray-800' }
};

const NFP_LEVEL_COLORS: Record<NfpResult['level'], string> = {
    Initial: 'bg-red-100 text-red-800',
    Managed: 'bg-orange-100 text-orange-800',
    Defined: 'bg-yellow-100 text-yellow-800',
    'Quantitatively Managed': 'bg-blue-100 text-blue-800',
    Optimized: 'bg-green-100 text-green-800',
    Unknown: 'bg-gray-100 text-gray-800'
};

const renderExecutiveResult = (result: ExecutiveResult, chartData: { definedCategoryData: any[], optimizedCategoryData: any[] } | null, benchmarkLevel: 'defined' | 'optimized', setBenchmarkLevel: (level: 'defined' | 'optimized') => void) => {
    const style = LEVEL_STYLES[result.level] || LEVEL_STYLES.Unknown;
    
    const categoryChartData = benchmarkLevel === 'defined' ? chartData?.definedCategoryData : chartData?.optimizedCategoryData;

    return (
        <div>
            <div className={`text-center p-6 rounded-xl border-2 ${style.border} bg-slate-50/50`}>
                <h3 className="text-2xl font-bold text-slate-700">Your Score</h3>
                <p className={`text-6xl md:text-7xl font-extrabold text-blue-600 my-2`}>{result.totalScore}<span className="text-2xl md:text-3xl font-medium text-slate-400">/{result.maxScore}</span></p>
                <div className={`flex items-center justify-center text-2xl font-bold py-1 px-4 rounded-full ${style.bg} ${style.text}`}>
                    {style.icon}
                    <span>{result.level}</span>
                </div>
                <p className="max-w-2xl mx-auto mt-4 text-slate-600">{result.interpretation}</p>
            </div>

            {chartData && (
                <div className="mt-12 border-t pt-8 border-slate-200">
                  <h4 className="text-2xl font-bold text-slate-800 mb-2 text-center">Category Performance vs. Benchmarks</h4>
                   <div className="flex justify-center mb-4">
                        <div className="bg-slate-200 p-1 rounded-full flex gap-1">
                            <button onClick={() => setBenchmarkLevel('defined')} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${benchmarkLevel === 'defined' ? 'bg-white text-blue-600 shadow' : 'text-slate-600'}`}>
                                vs. Defined
                            </button>
                            <button onClick={() => setBenchmarkLevel('optimized')} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${benchmarkLevel === 'optimized' ? 'bg-white text-blue-600 shadow' : 'text-slate-600'}`}>
                                vs. Optimized
                            </button>
                        </div>
                    </div>
                  <div>
                      <ResponsiveContainer width="100%" height={450}>
                         <BarChart data={categoryChartData} layout="vertical" margin={{ top: 20, right: 20, left: 160, bottom: 20 }}>
                          <XAxis type="number" domain={[0, 100]} unit="%" />
                          <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 12, width: 150 }} interval={0} />
                          <Tooltip formatter={(value) => `${Math.round(value as number)}%`} />
                          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                          <Bar dataKey="Overlap" stackId="a" fill="#67e8f9" name="Score Overlap"/>
                          <Bar dataKey="Your Advantage" stackId="a" fill="#06b6d4" name="Your Advantage"/>
                          <Bar dataKey="Benchmark Advantage" stackId="a" fill="#e2e8f0" name="Benchmark Advantage"/>
                        </BarChart>
                      </ResponsiveContainer>
                  </div>
                </div>
            )}
        </div>
    );
};

const renderNfpResult = (result: NfpResult, chartData: { definedCategoryData: any[], optimizedCategoryData: any[] } | null, benchmarkLevel: 'defined' | 'optimized', setBenchmarkLevel: (level: 'defined' | 'optimized') => void) => {
    const levelColorClass = NFP_LEVEL_COLORS[result.level] || NFP_LEVEL_COLORS.Unknown;
    
    const optimizedBenchmarkPercent = result.totalPossibleElements > 0 
      ? (NFP_BENCHMARK_SCORES.optimized_level.averageScore / NFP_DATA.reduce((sum, cat) => sum + cat.elements.length, 0)) * 100 
      : 0;

    const radialChartData = [
      { name: 'Optimized Benchmark', value: optimizedBenchmarkPercent, fill: '#e2e8f0' },
      { name: 'Your Score', value: result.grandPercentage * 100, fill: '#3b82f6' },
    ];
    
    const categoryChartData = benchmarkLevel === 'defined' ? chartData?.definedCategoryData : chartData?.optimizedCategoryData;

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-slate-700">Overall Score</h3>
                    <p className="text-6xl md:text-7xl font-extrabold text-blue-600 my-1">{result.totalScore}<span className="text-2xl md:text-3xl font-medium text-slate-400">/{result.totalPossibleElements}</span></p>
                    <p className={`text-2xl font-bold py-1 px-4 inline-block rounded-full ${levelColorClass}`}>
                        {result.level}
                    </p>
                    <p className="max-w-xl mt-4 text-slate-600">{result.interpretation}</p>
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart 
                            innerRadius="60%" 
                            outerRadius="100%" 
                            data={radialChartData} 
                            startAngle={90} 
                            endAngle={-270}
                            barSize={30}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={15} />
                            <Legend iconSize={10} width={180} height={40} layout="horizontal" verticalAlign="bottom" align="center" />
                            <Tooltip formatter={(value) => `${Math.round(value as number)}%`} />
                            <text
                                x="50%"
                                y="45%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-5xl font-bold fill-current text-blue-600"
                            >
                                {`${Math.round(result.grandPercentage * 100)}%`}
                            </text>
                             <text
                                x="50%"
                                y="62%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-lg font-medium fill-current text-slate-500"
                            >
                                Maturity
                            </text>
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {chartData && (
                <div className="mt-12 border-t pt-8 border-slate-200">
                  <h4 className="text-2xl font-bold text-slate-800 mb-2 text-center">Category Performance vs. Benchmarks</h4>
                   <div className="flex justify-center mb-4">
                        <div className="bg-slate-200 p-1 rounded-full flex gap-1">
                            <button onClick={() => setBenchmarkLevel('defined')} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${benchmarkLevel === 'defined' ? 'bg-white text-blue-600 shadow' : 'text-slate-600'}`}>
                                vs. Defined
                            </button>
                            <button onClick={() => setBenchmarkLevel('optimized')} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${benchmarkLevel === 'optimized' ? 'bg-white text-blue-600 shadow' : 'text-slate-600'}`}>
                                vs. Optimized
                            </button>
                        </div>
                    </div>
                  <div>
                      <ResponsiveContainer width="100%" height={450}>
                        <BarChart data={categoryChartData} layout="vertical" margin={{ top: 20, right: 20, left: 150, bottom: 20 }}>
                          <XAxis type="number" domain={[0, 100]} unit="%" />
                          <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 10, width: 140 }} interval={0} />
                          <Tooltip formatter={(value) => `${Math.round(value as number)}%`} />
                          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                          <Bar dataKey="Your Score" fill="#3b82f6" />
                          <Bar dataKey="Benchmark" fill="#9ca3af" />
                        </BarChart>
                      </ResponsiveContainer>
                  </div>
                </div>
            )}
        </div>
    );
};


export default function ResultsPage({ result, assessmentType, industry, country, onRestart }: ResultsPageProps) {
    const [guidance, setGuidance] = useState('');
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [personalMessage, setPersonalMessage] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [benchmarkLevel, setBenchmarkLevel] = useState<'defined' | 'optimized'>('defined');

    const executiveChartData = useMemo(() => {
        if (assessmentType !== 'executive' || !result) return null;

        const typedResult = result as ExecutiveResult;
        
        const allCategories = [...new Set(EXECUTIVE_QUESTIONS.map(q => q.category))];

        const generalQuestionsMaxScoresPerCategory = EXECUTIVE_QUESTIONS.filter(q => !q.industry).reduce((acc, question) => {
            acc[question.category] = (acc[question.category] || 0) + 1;
            return acc;
        }, {} as { [category: string]: number });
        
        const processBenchmarkData = (benchmarkLevel: 'defined_level' | 'optimized_level') => {
            const benchmarkScores = EXECUTIVE_BENCHMARK_SCORES[benchmarkLevel].categoryScores;
            
            return allCategories.map(category => {
              const yourScore = typedResult.categoryScores[category] || 0;
              const maxPossibleScoreForCat = typedResult.categoryMaxScores[category] || 0;
              const benchmarkScore = benchmarkScores[category as keyof typeof benchmarkScores] || 0;
              const benchmarkMaxScoreForCat = generalQuestionsMaxScoresPerCategory[category] || 1;

              const yourPercent = maxPossibleScoreForCat > 0 ? (yourScore / maxPossibleScoreForCat) * 100 : 0;
              const benchmarkPercent = benchmarkMaxScoreForCat > 0 ? (benchmarkScore / benchmarkMaxScoreForCat) * 100 : 0;
              
              const overlap = Math.min(yourPercent, benchmarkPercent);
              const yourAdvantage = Math.max(0, yourPercent - benchmarkPercent);
              const benchmarkAdvantage = Math.max(0, benchmarkPercent - yourPercent);

              return {
                name: category,
                'Overlap': overlap,
                'Your Advantage': yourAdvantage,
                'Benchmark Advantage': benchmarkAdvantage,
              }
            }).filter(d => typedResult.categoryMaxScores[d.name] > 0);
        }

        return { 
          definedCategoryData: processBenchmarkData('defined_level'), 
          optimizedCategoryData: processBenchmarkData('optimized_level')
        };
    }, [result, assessmentType]);

    const nfpChartData = useMemo(() => {
        if (assessmentType !== 'nfp' || !result) return null;

        const typedResult = result as NfpResult;

        const processBenchmarkData = (benchmarkLevel: 'defined_level' | 'optimized_level') => {
            const benchmarkScores = NFP_BENCHMARK_SCORES[benchmarkLevel].categoryScores;

            return typedResult.categoryResults.map(catResult => {
                const benchmarkScore = benchmarkScores[catResult.categoryId as keyof typeof benchmarkScores] || 0;
                const benchmarkMaxScore = NFP_DATA.find(c => c.id === catResult.categoryId)?.elements.length || 1;
                
                const yourPercent = catResult.percentage * 100;
                const benchmarkPercent = benchmarkMaxScore > 0 ? (benchmarkScore / benchmarkMaxScore) * 100 : 0;
                
                return {
                    name: catResult.title,
                    'Your Score': yourPercent,
                    'Benchmark': benchmarkPercent,
                };
            });
        };

        return { 
          definedCategoryData: processBenchmarkData('defined_level'), 
          optimizedCategoryData: processBenchmarkData('optimized_level')
        };
    }, [result, assessmentType]);


    useEffect(() => {
        const fetchGuidance = async () => {
            setLoading(true);
            const aiGuidance = await getCustomizedGuidance(result, assessmentType, country, industry);
            setGuidance(aiGuidance);
            setLoading(false);
        };
        fetchGuidance();
    }, [result, assessmentType, country, industry]);

    const submitEmailAPI = (email: string, message: string): Promise<{ success: boolean; message?: string }> => {
        console.log("Submitting email to backend:", { email, message });
        // This is a mock API call. In a real application, you would use fetch()
        // to send the data to your backend service.
        return new Promise(resolve => {
            setTimeout(() => {
                // Simulate a potential failure
                if (email.includes('fail')) {
                     resolve({ success: false, message: "This email address is blocked." });
                } else {
                    resolve({ success: true });
                }
            }, 1500); // Simulate 1.5s network delay
        });
    };
    
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const currentEmail = e.target.value;
      if (currentEmail && !validateEmail(currentEmail)) {
          setEmailError("Please enter a valid email address.");
      } else {
          setEmailError(null);
      }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailLoading) return;

        if (!email) {
            setEmailError("An email address is required to send the report.");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        
        setEmailError(null);
        setEmailLoading(true);
        try {
            const response = await submitEmailAPI(email, personalMessage);
            if (response.success) {
                setSubmitted(true);
            } else {
                setEmailError(response.message || "There was a problem submitting your email. Please try again.");
            }
        } catch (error) {
            console.error("Email submission failed:", error);
            setEmailError("An unexpected error occurred. Please try again.");
        } finally {
            setEmailLoading(false);
        }
    };
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if(emailError) {
        setEmailError(null);
      }
    }

    const handleExportPdf = () => {
        window.print();
    };

    const industryInsights = industry ? INDUSTRY_SPECIFIC_INSIGHTS[industry as keyof typeof INDUSTRY_SPECIFIC_INSIGHTS] : undefined;

    return (
        <>
            <div className="results-view w-full max-w-6xl mx-auto p-4 md:p-12 bg-white rounded-2xl shadow-xl border border-slate-200 print-container">
                <header className="text-center border-b pb-8 mb-8 border-slate-200 no-print">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Your Risk Maturity Results</h2>
                </header>
                
                <div className="mb-12">
                  {assessmentType === 'executive' ? renderExecutiveResult(result as ExecutiveResult, executiveChartData, benchmarkLevel, setBenchmarkLevel) : renderNfpResult(result as NfpResult, nfpChartData, benchmarkLevel, setBenchmarkLevel)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Narrative Risk Report</h3>
                        {loading ? (
                            <div className="flex items-center justify-center h-64"><Spinner /></div>
                        ) : (
                            <div className="whitespace-pre-wrap text-slate-700 text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{__html: guidance.replace(/### (.*)/g, '<h3 class="text-lg font-bold text-slate-800 mt-4 mb-2">$1</h3>').replace(/\* (.*)/g, '<li class="ml-4">$1</li>').replace(/(\d)\. (.*)/g, '<li class="ml-4">$1. $2</li>') }}></div>
                        )}
                    </div>
                     <div className="bg-blue-50 p-6 rounded-xl border-blue-200 no-print">
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">Get Your Full Report</h3>
                        <p className="text-blue-700 mb-6">Receive a detailed PDF of your results and strategic guidance.</p>
                        {submitted ? (
                            <div className="text-center bg-white p-6 rounded-lg">
                                <h4 className="text-xl font-bold text-green-600">Thank You!</h4>
                                <p className="text-slate-600">Your report is on its way to your inbox.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleEmailSubmit} noValidate>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    placeholder="your.email@organization.com"
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-shadow ${emailError ? 'border-red-500 focus:ring-red-300' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`}
                                />
                                {emailError && <p className="text-red-600 text-sm mt-2">{emailError}</p>}
                                <textarea
                                    value={personalMessage}
                                    onChange={(e) => setPersonalMessage(e.target.value)}
                                    placeholder="Add an optional personal message to include in the report..."
                                    className="w-full mt-3 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:outline-none transition-shadow focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                                <button 
                                    type="submit" 
                                    disabled={emailLoading} 
                                    className="w-full mt-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-75 disabled:cursor-wait flex items-center justify-center"
                                >
                                    {emailLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Email Me My Report'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {assessmentType === 'executive' && industryInsights && (
                    <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Strategic Considerations for the {industry} Industry</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Common Risks to Monitor
                                </h4>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                                    {industryInsights.risks.map((risk, i) => <li key={i}>{risk}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M11.983 1.904a1 1 0 00-1.966 0l-3 6A1 1 0 008 9h4a1 1 0 00.983-1.096l-3-6z" />
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v5a1 1 0 102 0V5z" clipRule="evenodd" />
                                    </svg>
                                    Strategic Opportunities
                                </h4>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                                    {industryInsights.opportunities.map((opp, i) => <li key={i}>{opp}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}


                <div className="mt-12 text-center flex flex-col sm:flex-row justify-center items-center gap-4 no-print">
                    <button 
                        onClick={handleExportPdf} 
                        className="py-3 px-8 bg-white text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-100 transition-colors border border-slate-300 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download as PDF
                    </button>
                    <button onClick={onRestart} className="py-3 px-8 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800 transition-colors">
                        Start New Assessment
                    </button>
                </div>
            </div>
            <div className="hidden printable-summary">
                {!loading && <PrintableSummary result={result} assessmentType={assessmentType} guidance={guidance} />}
            </div>
        </>
    );
}