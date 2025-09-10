import React from 'react';
import { ExecutiveResult, NfpResult, AssessmentType } from '../types';

interface PrintableSummaryProps {
  result: ExecutiveResult | NfpResult;
  assessmentType: AssessmentType;
  guidance: string;
}

const renderExecutiveBreakdown = (result: ExecutiveResult) => (
    <table className="w-full text-sm text-left">
        <thead className="bg-slate-100">
            <tr>
                <th className="p-2 font-semibold">Category</th>
                <th className="p-2 font-semibold text-right">Your Score</th>
                <th className="p-2 font-semibold text-right">Max Score</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(result.categoryScores).map(([category, score]) => (
                <tr key={category} className="border-b">
                    <td className="p-2">{category}</td>
                    <td className="p-2 text-right font-medium">{score}</td>
                     <td className="p-2 text-right text-slate-500">{result.categoryMaxScores[category] || 0}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const renderNfpBreakdown = (result: NfpResult) => (
    <table className="w-full text-sm text-left">
        <thead className="bg-slate-100">
            <tr>
                <th className="p-2 font-semibold">Category</th>
                <th className="p-2 font-semibold text-right">Your Score</th>
                <th className="p-2 font-semibold text-right">Max Score</th>
                <th className="p-2 font-semibold text-right">Percentage</th>
            </tr>
        </thead>
        <tbody>
            {result.categoryResults.map(category => (
                <tr key={category.categoryId} className="border-b">
                    <td className="p-2">{category.title}</td>
                    <td className="p-2 text-right font-medium">{category.rawScore}</td>
                    <td className="p-2 text-right text-slate-500">{category.totalElements}</td>
                    <td className="p-2 text-right font-medium">{Math.round(category.percentage * 100)}%</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const markdownToPrintableHtml = (markdown: string): string => {
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
            html += `<h3 class="text-base font-bold text-slate-800 mt-3 mb-1">${line.substring(4)}</h3>`;
        } else if (line.startsWith('* ')) {
            if (listType !== 'ul') {
                closeList();
                html += '<ul style="list-style-type: disc; padding-left: 20px;">';
                listType = 'ul';
            }
            html += `<li>${line.substring(2)}</li>`;
        } else if (/^\d+\.\s/.test(line)) {
            if (listType !== 'ol') {
                closeList();
                html += '<ol style="list-style-type: decimal; padding-left: 20px;">';
                listType = 'ol';
            }
            html += `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
        } else if (line.trim() !== '') {
            closeList();
            html += `<p style="margin-top: 4px;">${line}</p>`;
        } else {
            closeList();
        }
    }

    closeList();
    return html;
};


export default function PrintableSummary({ result, assessmentType, guidance }: PrintableSummaryProps) {
    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    const isExecutive = assessmentType === 'executive';
    const maxScore = isExecutive ? (result as ExecutiveResult).maxScore : (result as NfpResult).totalPossibleElements;

    return (
        <div className="p-8 bg-white text-slate-800">
            <header className="mb-8 border-b-2 border-slate-300 pb-4">
                <h1 className="text-3xl font-bold text-slate-900">Risk Maturity Snapshot</h1>
                <p className="text-lg text-slate-600">Confidential Assessment Summary</p>
                <p className="text-sm text-slate-500 mt-2">Generated on: {currentDate}</p>
            </header>

            <section className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Overall Assessment</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-semibold text-slate-600">Your Score</p>
                        <p className="text-3xl font-bold">
                            {result.totalScore}
                            <span className="text-xl text-slate-400"> / {maxScore}</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-600">Maturity Level</p>
                        <p className="text-3xl font-bold">{result.level}</p>
                    </div>
                </div>
                <div className="mt-4 bg-slate-50 p-4 rounded-md">
                    <p className="text-sm font-semibold text-slate-600 mb-1">Interpretation</p>
                    <p className="text-sm text-slate-700">{result.interpretation}</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Customized Strategic Guidance</h2>
                 <div className="text-slate-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: markdownToPrintableHtml(guidance) }}></div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Score Breakdown by Category</h2>
                {isExecutive ? renderExecutiveBreakdown(result as ExecutiveResult) : renderNfpBreakdown(result as NfpResult)}
            </section>
            
            <footer className="mt-12 pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
                This report was generated by the Risk Maturity Snapshot tool.
            </footer>
        </div>
    );
}