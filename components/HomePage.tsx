import React, { useState } from 'react';
import { AssessmentType } from '../types';

interface HomePageProps {
  onSelectAssessment: (type: AssessmentType, subType?: string) => void;
}

const ScreeningButton: React.FC<{ text: string; onClick: () => void; colorClasses: string; }> = ({ text, onClick, colorClasses }) => (
    <button
        onClick={onClick}
        className={`w-full md:w-3/4 lg:w-1/2 text-left p-4 my-2 border-2 border-slate-200 rounded-lg transition-all duration-200 ease-in-out group ${colorClasses}`}
    >
        <div className="flex items-center">
            <span className="flex-grow text-slate-700 font-medium text-lg">{text}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </div>
        </div>
    </button>
);

const IMAGE_GALLERY_SETS = [
  // Sunday (Day 0)
  {
    images: [
      { title: 'Industry', src: 'https://picsum.photos/seed/sundayInd/600/800' },
      { title: 'NFP & Associations', src: 'https://picsum.photos/seed/sundayNfp/600/800' },
      { title: 'Service Sector', src: 'https://picsum.photos/seed/sundaySvc/600/800' },
      { title: 'Public Sector', src: 'https://picsum.photos/seed/sundayPub/600/800' },
    ],
  },
  // Monday (Day 1)
  {
    images: [
      { title: 'Industry', src: 'https://picsum.photos/seed/mondayInd/600/800' },
      { title: 'NFP & Associations', src: 'https://picsum.photos/seed/mondayNfp/600/800' },
      { title: 'Service Sector', src: 'https://picsum.photos/seed/mondaySvc/600/800' },
      { title: 'Public Sector', src: 'https://picsum.photos/seed/mondayPub/600/800' },
    ],
  },
  // Tuesday (Day 2)
  {
    images: [
      { title: 'Industry', src: 'https://picsum.photos/seed/tuesdayInd/600/800' },
      { title: 'NFP & Associations', src: 'https://picsum.photos/seed/tuesdayNfp/600/800' },
      { title: 'Service Sector', src: 'https://picsum.photos/seed/tuesdaySvc/600/800' },
      { title: 'Public Sector', src: 'https://picsum.photos/seed/tuesdayPub/600/800' },
    ],
  },
  // Wednesday (Day 3)
  {
    images: [
      { title: 'Industry', src: 'https://picsum.photos/seed/wednesdayInd/600/800' },
      { title: 'NFP & Associations', src: 'https://picsum.photos/seed/wednesdayNfp/600/800' },
      { title: 'Service Sector', src: 'https://picsum.photos/seed/wednesdaySvc/600/800' },
      { title: 'Public Sector', src: 'https://picsum.photos/seed/wednesdayPub/600/800' },
    ],
  },
  // Thursday (Day 4)
  {
    images: [
      { title: 'Industry', src: 'https://picsum.photos/seed/thursdayInd/600/800' },
      { title: 'NFP & Associations', src: 'https://picsum.photos/seed/thursdayNfp/600/800' },
      { title: 'Service Sector', src: 'https://picsum.photos/seed/thursdaySvc/600/800' },
      { title: 'Public Sector', src: 'https://picsum.photos/seed/thursdayPub/600/800' },
    ],
  },
  // Friday (Day 5)
  {
    images: [
      { title: 'Industry', src: 'https://picsum.photos/seed/fridayInd/600/800' },
      { title: 'NFP & Associations', src: 'https://picsum.photos/seed/fridayNfp/600/800' },
      { title: 'Service Sector', src: 'https://picsum.photos/seed/fridaySvc/600/800' },
      { title: 'Public Sector', src: 'https://picsum.photos/seed/fridayPub/600/800' },
    ],
  },
  // Saturday (Day 6)
  {
    images: [
      { title: 'Industry', src: 'https://picsum.photos/seed/saturdayInd/600/800' },
      { title: 'NFP & Associations', src: 'https://picsum.photos/seed/saturdayNfp/600/800' },
      { title: 'Service Sector', src: 'https://picsum.photos/seed/saturdaySvc/600/800' },
      { title: 'Public Sector', src: 'https://picsum.photos/seed/saturdayPub/600/800' },
    ],
  },
];

const ImageGallery = () => {
    const dayIndex = new Date().getDay();
    const currentImages = IMAGE_GALLERY_SETS[dayIndex].images;

    // Duplicate images for a seamless, infinite scroll effect
    const imageTrack = [...currentImages, ...currentImages];

    return (
        <div className="w-full mt-16 overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="flex scrolling-track group-hover:[animation-play-state:paused]">
                {imageTrack.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-64 h-80 mx-4 rounded-xl shadow-lg relative overflow-hidden group/card">
                        <img src={image.src} alt={image.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover/card:scale-110" />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{image.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default function HomePage({ onSelectAssessment }: HomePageProps) {
  const [step, setStep] = useState<'start' | 'screening'>('start');

  return (
    <div className="w-full text-center py-8">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">Risk Maturity Snapshot</h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          An interactive tool to evaluate your organization's risk management effectiveness and receive customized strategic guidance.
        </p>
      </header>
      
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {step === 'start' && (
          <>
            <button
              onClick={() => setStep('screening')}
              className="py-4 px-10 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Begin Assessment
            </button>
            <ImageGallery />
          </>
        )}

        {step === 'screening' && (
          <div className="w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Which best describes your organization's primary focus?</h2>
            <div className="flex flex-col items-center">
                <ScreeningButton text="Commercial / For-Profit" onClick={() => onSelectAssessment('executive')} colorClasses="hover:border-blue-600 hover:bg-blue-50 text-blue-600" />
                <ScreeningButton text="Not-for-Profit / NGO" onClick={() => onSelectAssessment('nfp', 'ngo')} colorClasses="hover:border-teal-600 hover:bg-teal-50 text-teal-600" />
                <ScreeningButton text="Professional Association / Membership Body" onClick={() => onSelectAssessment('nfp', 'association')} colorClasses="hover:border-indigo-600 hover:bg-indigo-50 text-indigo-600" />
                <ScreeningButton text="Government / Public Sector" onClick={() => onSelectAssessment('executive', 'public')} colorClasses="hover:border-slate-600 hover:bg-slate-100 text-slate-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}