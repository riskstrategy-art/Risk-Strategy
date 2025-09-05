import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, RadialBarChart, RadialBar, PolarAngleAxis, Cell, Legend } from 'recharts';
import { ExecutiveResult, NfpResult, AssessmentType } from '../types';
import { getPersonalizedGuidance } from '../services/geminiService';
import { NFP_BENCHMARK_SCORES, EXECUTIVE_BENCHMARK_SCORES, EXECUTIVE_QUESTIONS } from '../constants';
import Spinner from './Spinner';

interface ResultsPageProps {
  result: ExecutiveResult | NfpResult;
  assessmentType: AssessmentType;
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

const renderExecutiveResult = (result: ExecutiveResult, chartData: { definedCategoryData: any[], optimizedCategoryData: any[] } | null) => {
    const style = LEVEL_STYLES[result.level] || LEVEL_STYLES.Unknown;
    const benchmarkColors = ['#3b82f6', '#9ca3af']; // Blue for "Your Score", Gray for "Benchmark"

    const definedBenchmarkOverallData = [
      { name: 'Your Score', score: result.totalScore },
      { name: 'Benchmark', score: EXECUTIVE_BENCHMARK_SCORES.defined_level.averageScore }
    ];
    const optimizedBenchmarkOverallData = [
      { name: 'Your Score', score: result.totalScore },
      { name: 'Benchmark', score: EXECUTIVE_BENCHMARK_SCORES.optimized_level.averageScore }
    ];

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

            <div className="mt-12 border-t pt-8 border-slate-200">
                <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">How You Compare (Overall Score)</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Defined Level Comparison */}
                    <div>
                        <h5 className="text-center font-semibold text-slate-600 mb-4">vs. Typical '{EXECUTIVE_BENCHMARK_SCORES.defined_level.level}' Level</h5>
                        <div className="h-24">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={definedBenchmarkOverallData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                                    <XAxis type="number" domain={[0, result.maxScore]} />
                                    <YAxis type="category" dataKey="name" width={80}/>
                                    <Tooltip />
                                    <Bar dataKey="score" barSize={20}>
                                        {definedBenchmarkOverallData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={benchmarkColors[index % benchmarkColors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Optimized Level Comparison */}
                     <div>
                        <h5 className="text-center font-semibold text-slate-600 mb-4">vs. Typical '{EXECUTIVE_BENCHMARK_SCORES.optimized_level.level}' Level</h5>
                        <div className="h-24">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={optimizedBenchmarkOverallData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                                    <XAxis type="number" domain={[0, result.maxScore]} />
                                    <YAxis type="category" dataKey="name" width={80}/>
                                    <Tooltip />
                                    <Bar dataKey="score" barSize={20}>
                                        {optimizedBenchmarkOverallData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={benchmarkColors[index % benchmarkColors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {chartData && (
                <div className="mt-12 border-t pt-8 border-slate-200">
                  <h4 className="text-2xl font-bold text-slate-800 mb-8 text-center">Category Performance vs. Benchmarks</h4>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-16">
                    <div>
                      <h5 className="text-center font-semibold text-slate-600 mb-4">vs. 'Defined' Level (%)</h5>
                      <ResponsiveContainer width="100%" height={450}>
                        <BarChart data={chartData.definedCategoryData} layout="vertical" margin={{ top: 20, right: 20, left: 150, bottom: 20 }}>
                          <XAxis type="number" domain={[0, 100]} unit="%" />
                          <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12, width: 140 }} interval={0} />
                          <Tooltip formatter={(value) => `${Math.round(value as number)}%`} />
                          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                          <Bar dataKey="Your Score" fill="#3b82f6" />
                          <Bar dataKey="Benchmark" fill="#9ca3af" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h5 className="text-center font-semibold text-slate-600 mb-4">vs. 'Optimized' Level (%)</h5>
                      <ResponsiveContainer width="100%" height={450}>
                        <BarChart data={chartData.optimizedCategoryData} layout="vertical" margin={{ top: 20, right: 20, left: 150, bottom: 20 }}>
                           <XAxis type="number" domain={[0, 100]} unit="%" />
                           <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12, width: 140 }} interval={0} />
                           <Tooltip formatter={(value) => `${Math.round(value as number)}%`} />
                           <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                           <Bar dataKey="Your Score" fill="#3b82f6" />
                           <Bar dataKey="Benchmark" fill="#9ca3af" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
            )}
        </div>
    );
};

const renderNfpResult = (result: NfpResult) => {
    const radialChartData = [{ name: 'Maturity', value: result.grandPercentage * 100, fill: '#3b82f6' }];
    const levelColorClass = NFP_LEVEL_COLORS[result.level] || NFP_LEVEL_COLORS.Unknown;
    
    const benchmarkColors = ['#3b82f6', '#9ca3af']; // Blue for "Your Score", Gray for "Benchmark"
    const definedBenchmarkData = [
      { name: 'Your Score', score: result.totalScore },
      { name: 'Benchmark', score: NFP_BENCHMARK_SCORES.defined_level.averageScore }
    ];
    const optimizedBenchmarkData = [
      { name: 'Your Score', score: result.totalScore },
      { name: 'Benchmark', score: NFP_BENCHMARK_SCORES.optimized_level.averageScore }
    ];

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
                            innerRadius="70%" 
                            outerRadius="100%" 
                            data={radialChartData} 
                            startAngle={90} 
                            endAngle={-270}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar background dataKey="value" cornerRadius={10} />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-5xl font-bold fill-current text-blue-600"
                            >
                                {`${Math.round(result.grandPercentage * 100)}%`}
                            </text>
                             <text
                                x="50%"
                                y="65%"
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
            <div className="mt-12">
                <h4 className="text-xl font-bold text-slate-700 mb-4">Your Score by Category (%)</h4>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.categoryResults.map(c => ({...c, percentage: Math.round(c.percentage * 100)}))} layout="vertical" margin={{ top: 5, right: 20, left: 120, bottom: 5 }}>
                            <XAxis type="number" domain={[0, 100]} unit="%" />
                            <YAxis type="category" dataKey="title" width={120} tick={{ fontSize: 10, width: 110 }} interval={0} />
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Bar dataKey="percentage" fill="#3b82f6" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-12 border-t pt-8 border-slate-200">
                <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">How You Compare (Overall Score)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h5 className="text-center font-semibold text-slate-600 mb-2">vs. Average for '{NFP_BENCHMARK_SCORES.defined_level.level}' Level</h5>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={definedBenchmarkData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                                    <XAxis type="number" domain={[0, result.totalPossibleElements]} />
                                    <YAxis type="category" dataKey="name" width={80}/>
                                    <Tooltip />
                                    <Bar dataKey="score" barSize={30}>
                                        {definedBenchmarkData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={benchmarkColors[index % benchmarkColors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-center font-semibold text-slate-600 mb-2">vs. Average for '{NFP_BENCHMARK_SCORES.optimized_level.level}' Level</h5>
                        <div className="h-40">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={optimizedBenchmarkData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                                    <XAxis type="number" domain={[0, result.totalPossibleElements]} />
                                    <YAxis type="category" dataKey="name" width={80}/>
                                    <Tooltip />
                                    <Bar dataKey="score" barSize={30}>
                                        {optimizedBenchmarkData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={benchmarkColors[index % benchmarkColors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function ResultsPage({ result, assessmentType, onRestart }: ResultsPageProps) {
    const [guidance, setGuidance] = useState('');
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [personalMessage, setPersonalMessage] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const executiveChartData = useMemo(() => {
        if (assessmentType !== 'executive' || !result) return null;

        const typedResult = result as ExecutiveResult;
        const maxScoresPerCategory = EXECUTIVE_QUESTIONS.reduce((acc, q) => {
            acc[q.category] = (acc[q.category] || 0) + 1;
            return acc;
        }, {} as { [category: string]: number });

        const definedCategoryData = Object.keys(maxScoresPerCategory).map(category => {
          const yourScore = typedResult.categoryScores[category] || 0;
          const benchmarkScore = EXECUTIVE_BENCHMARK_SCORES.defined_level.categoryScores[category as keyof typeof EXECUTIVE_BENCHMARK_SCORES.defined_level.categoryScores] || 0;
          const maxScore = maxScoresPerCategory[category] || 1;
          return {
            name: category,
            'Your Score': (yourScore / maxScore) * 100,
            'Benchmark': (benchmarkScore / maxScore) * 100,
          }
        });

        const optimizedCategoryData = Object.keys(maxScoresPerCategory).map(category => {
          const yourScore = typedResult.categoryScores[category] || 0;
          const benchmarkScore = EXECUTIVE_BENCHMARK_SCORES.optimized_level.categoryScores[category as keyof typeof EXECUTIVE_BENCHMARK_SCORES.optimized_level.categoryScores] || 0;
          const maxScore = maxScoresPerCategory[category] || 1;
          return {
            name: category,
            'Your Score': (yourScore / maxScore) * 100,
            'Benchmark': (benchmarkScore / maxScore) * 100,
          }
        });
        
        return { definedCategoryData, optimizedCategoryData };
    }, [result, assessmentType]);


    useEffect(() => {
        const fetchGuidance = async () => {
            setLoading(true);
            const aiGuidance = await getPersonalizedGuidance(result, assessmentType);
            setGuidance(aiGuidance);
            setLoading(false);
        };
        fetchGuidance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, assessmentType]);

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

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailLoading) return;

        const isEmailValid = validateEmail(email);
        setIsValidEmail(isEmailValid);

        if (!isEmailValid) {
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
        setIsValidEmail(true);
      }
    }

    const handleExportPdf = () => {
        window.print();
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-12 bg-white rounded-2xl shadow-xl border border-slate-200 print-container">
            <header className="text-center border-b pb-8 mb-8 border-slate-200 no-print">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Your Risk Maturity Results</h2>
            </header>
            
            <div className="mb-12">
              {assessmentType === 'executive' ? renderExecutiveResult(result as ExecutiveResult, executiveChartData) : renderNfpResult(result as NfpResult)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">AI-Powered Strategic Guidance</h3>
                    {loading ? (
                        <div className="flex items-center justify-center h-64"><Spinner /></div>
                    ) : (
                        <div className="whitespace-pre-wrap text-slate-700 text-sm leading-relaxed">{guidance}</div>
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
                                placeholder="your.email@organization.com"
                                required
                                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-shadow ${!isValidEmail ? 'border-red-500 focus:ring-red-300' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`}
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
    );
}