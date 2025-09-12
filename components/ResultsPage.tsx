import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, RadialBarChart, RadialBar, PolarAngleAxis, Legend } from 'recharts';
import { ExecutiveResult, NfpResult, AssessmentType } from '../types';
import { getCustomizedGuidance } from '../services/geminiService';
import { sendReportByEmail } from '../services/assessmentService';
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

const markdownToHtml = (markdown: string): string => {
    if (!markdown) return '';
    const lines = markdown.split('\n');
    let html = '';
    let listType: 'ul' | 'ol' | null = null;

    const closeList = () => {
        if (listType) {
            html += listType === 'ul' ? '</ul>' : '</ol>';
            listType = null;
        }
    };

    for (const line of lines) {
        if (line.startsWith('### ')) {
            closeList();
            html += `<h3 class="text-lg font-bold text-slate-800 mt-4 mb-2">${line.substring(4)}</h3>`;
        } else if (line.startsWith('* ')) {
            if (listType !== 'ul') {
                closeList();
                html += '<ul class="list-disc pl-5 space-y-1">';
                listType = 'ul';
            }
            html += `<li>${line.substring(2)}</li>`;
        } else if (/^\d+\.\s/.test(line)) {
            if (listType !== 'ol') {
                closeList();
                html += '<ol class="list-decimal pl-5 space-y-1">';
                listType = 'ol';
            }
            html += `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
        } else if (line.trim() !== '') {
            closeList();
            html += `<p class="mt-2">${line}</p>`;
        } else {
            closeList();
        }
    }

    closeList();
    return html;
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

const renderNfpResult = (result: NfpResult, chartData: any[] | null, benchmarkLevel: 'defined' | 'optimized', setBenchmarkLevel: (level: 'defined' | 'optimized') => void) => {
    const levelColorClass = NFP_LEVEL_COLORS[result.level] || NFP_LEVEL_COLORS.Unknown;
    
    const benchmarkData = NFP_BENCHMARK_SCORES[benchmarkLevel === 'defined' ? 'defined_level' : 'optimized_level'];
    
    // Use the total number of elements across all original NFP categories for a consistent benchmark denominator
    const totalPossibleElementsInAllCategories = NFP_DATA.reduce((sum, cat) => sum + cat.elements.length, 0);
    const benchmarkPercent = totalPossibleElementsInAllCategories > 0
      ? (benchmarkData.averageScore / totalPossibleElementsInAllCategories) * 100
      : 0;

    const radialChartData = [
      { name: `${benchmarkLevel.charAt(0).toUpperCase() + benchmarkLevel.slice(1)} Benchmark`, value: benchmarkPercent, fill: '#e2e8f0' },
      { name: 'Your Score', value: result.grandPercentage * 100, fill: '#3b82f6' },
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
                        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 20, left: 150, bottom: 20 }}>
                          <XAxis type="number" domain={[0, 100]} unit="%" />
                          <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 10, width: 140 }} interval={0} />
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

    const nfpBenchmarkChartData = useMemo(() => {
        if (assessmentType !== 'nfp' || !result) return null;

        const typedResult = result as NfpResult;
        const benchmarkData = NFP_BENCHMARK_SCORES[benchmarkLevel === 'defined' ? 'defined_level' : 'optimized_level'];

        return typedResult.categoryResults.map(catResult => {
            const benchmarkScore = benchmarkData.categoryScores[catResult.categoryId as keyof typeof benchmarkData.categoryScores] || 0;
            const benchmarkMaxScore = NFP_DATA.find(c => c.id === catResult.categoryId)?.elements.length || 1;
            
            const yourPercent = catResult.percentage * 100;
            const benchmarkPercent = benchmarkMaxScore > 0 ? (benchmarkScore / benchmarkMaxScore) * 100 : 0;
            
            const overlap = Math.min(yourPercent, benchmarkPercent);
            const yourAdvantage = Math.max(0, yourPercent - benchmarkPercent);
            const benchmarkAdvantage = Math.max(0, benchmarkPercent - yourPercent);

            return {
                name: catResult.title,
                'Overlap': overlap,
                'Your Advantage': yourAdvantage,
                'Benchmark Advantage': benchmarkAdvantage,
            };
        });
    }, [result, assessmentType, benchmarkLevel]);


    useEffect(() => {
        const fetchGuidance = async () => {
            setLoading(true);
            const aiGuidance = await getCustomizedGuidance(result, assessmentType, country, industry);
            setGuidance(aiGuidance);
            setLoading(false);
        };
        fetchGuidance();
    }, [result, assessmentType, country, industry]);
    
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
            const response = await sendReportByEmail(email, personalMessage, result, assessmentType, guidance);
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
        if (emailError) {
            setEmailError(null);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">Your Risk Maturity Report</h1>
                    <p className="text-lg text-slate-600">Here's a detailed breakdown of your assessment results and strategic recommendations.</p>
                </div>
                <button onClick={onRestart} className="py-2 px-6 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-300 transition-colors flex-shrink-0">
                    Start New Assessment
                </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                {assessmentType === 'executive' 
                    ? renderExecutiveResult(result as ExecutiveResult, executiveChartData, benchmarkLevel, setBenchmarkLevel) 
                    : renderNfpResult(result as NfpResult, nfpBenchmarkChartData, benchmarkLevel, setBenchmarkLevel)
                }
            </div>

            {industry && INDUSTRY_SPECIFIC_INSIGHTS[industry] && (
                <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Industry-Specific Considerations for {industry}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-lg text-red-600 mb-2">Key Risks</h4>
                            <ul className="list-disc pl-5 space-y-1 text-slate-700">
                                {INDUSTRY_SPECIFIC_INSIGHTS[industry].risks.map((risk, i) => <li key={i}>{risk}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-green-600 mb-2">Strategic Opportunities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-slate-700">
                                {INDUSTRY_SPECIFIC_INSIGHTS[industry].opportunities.map((opp, i) => <li key={i}>{opp}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">AI-Powered Strategic Guidance</h3>
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <Spinner />
                        <p className="mt-4 text-slate-600">Generating your customized report...</p>
                    </div>
                ) : (
                    <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(guidance) }}></div>
                )}
            </div>
            
            <div className="mt-8 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Get a Copy of Your Report</h3>
                        <p className="text-slate-600 mb-4">Enter your email address to receive a detailed PDF summary of your results and recommendations.</p>
                        
                        {submitted ? (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                                <p className="font-bold">Report Sent!</p>
                                <p>Please check your inbox (and spam folder) for the report.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleEmailSubmit} noValidate>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={handleEmailBlur}
                                        placeholder="you@company.com"
                                        className={`w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 ${emailError ? 'border-red-500 ring-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`}
                                    />
                                    {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="personalMessage" className="block text-sm font-medium text-slate-700 mb-1">Personal Message (Optional)</label>
                                    <textarea
                                        id="personalMessage"
                                        value={personalMessage}
                                        onChange={(e) => setPersonalMessage(e.target.value)}
                                        placeholder="Add a note to the report..."
                                        rows={2}
                                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={emailLoading}
                                    className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center"
                                >
                                    {emailLoading ? <Spinner /> : 'Email Me The Report'}
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 h-96 overflow-y-auto">
                            <PrintableSummary result={result} assessmentType={assessmentType} guidance={guidance} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}