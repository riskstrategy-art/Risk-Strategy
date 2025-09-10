import { ReactElement } from 'react';

// General
export type AssessmentType = 'executive' | 'nfp';
export type NfpUserRole = 'npo_director' | 'board_member' | 'operations_manager' | 'program_manager' | 'finance_manager';

// Onboarding
export interface OnboardingData {
  country: string;
  profession: string;
  areaOfFocus: string;
  yearsOfExperience: string;
}

// For Executive Assessment
export type ExecutiveUserRole = 'csuite' | 'senior_leader' | 'chief_risk_officer' | 'head_of_compliance' | 'internal_audit_director';

export interface ExecutiveQuestion {
  id: number;
  category: string;
  question: string;
  role?: 'csuite';
  industry?: string | string[];
  country?: string;
  dependsOn?: {
    questionId: number;
    requiredValue: boolean; // e.g., show this question if questionId is true
  };
}

export interface ExecutiveAnswer {
  questionId: number;
  answer: boolean; // true for Yes, false for No
}

export interface ExecutiveResult {
  totalScore: number;
  maxScore: number;
  level: 'Initial' | 'Managed' | 'Defined' | 'Quantitatively Managed' | 'Optimized' | 'Unknown';
  interpretation: string;
  categoryScores: { [category: string]: number };
  categoryMaxScores: { [category: string]: number };
}

// For NFP Assessment
export interface NfpElement {
  id: string;
  text: string;
  role?: 'executive';
  dependsOn?: {
    elementId: string;
    requiredValue: boolean; // e.g., show this element if elementId is true
  };
}

export interface NfpCategory {
  id: string;
  title: string;
  description?: string;
  elements: NfpElement[];
  country?: string;
}

export interface NfpAnswers {
  [elementId: string]: boolean; // true if present (Yes), false if absent (No)
}

export interface NfpCategoryResult {
  categoryId: string;
  title: string;
  rawScore: number;
  totalElements: number;
  percentage: number;
}

export interface NfpResult {
  categoryResults: NfpCategoryResult[];
  totalScore: number;
  totalPossibleElements: number;
  grandPercentage: number;
  level: 'Initial' | 'Managed' | 'Defined' | 'Quantitatively Managed' | 'Optimized' | 'Unknown';
  interpretation: string;
}