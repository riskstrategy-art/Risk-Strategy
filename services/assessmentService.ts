import { AssessmentType, ExecutiveResult, NfpResult } from '../types';

// The base URL for your Firebase Cloud Functions
const BASE_FUNCTION_URL = 'https://us-central1-risk-maturity-snapshot.cloudfunctions.net';

// --- Progress Persistence Service ---
// This service abstracts the data storage. Currently, it uses localStorage,
// which makes the app work offline and without a backend.
// To switch to a Firebase backend, you can replace the localStorage logic
// inside these functions with `fetch` calls to your Cloud Functions, as shown in the commented-out examples.

const getStorageKey = (assessmentType: AssessmentType) => `${assessmentType}AssessmentProgress`;

export const saveAssessmentProgress = async (assessmentType: AssessmentType, progress: any): Promise<{ success: boolean }> => {
    /*
    try {
        localStorage.setItem(getStorageKey(assessmentType), JSON.stringify(progress));
        return { success: true };
    } catch (error) {
        console.error("Failed to save progress to localStorage:", error);
        return { success: false };
    }
    */
    
    // FIREBASE IMPLEMENTATION EXAMPLE:
    const functionUrl = `${BASE_FUNCTION_URL}/saveProgress`;
    try {
        // You would need a way to identify the user, e.g., via Firebase Auth
        const userId = "some_user_id"; 
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { userId, assessmentType, progress } }),
        });
        return { success: response.ok };
    } catch (error) {
        console.error('Error saving progress to Firebase:', error);
        return { success: false };
    }
};

export const loadAssessmentProgress = async (assessmentType: AssessmentType): Promise<any | null> => {
    /*
     try {
        const savedProgress = localStorage.getItem(getStorageKey(assessmentType));
        return savedProgress ? JSON.parse(savedProgress) : null;
    } catch (error) {
        console.error("Failed to load progress from localStorage:", error);
        return null;
    }
    */
    
    // FIREBASE IMPLEMENTATION EXAMPLE:
    const userId = "some_user_id";
    const functionUrl = `${BASE_FUNCTION_URL}/loadProgress?userId=${userId}&assessmentType=${assessmentType}`;
    try {
        const response = await fetch(functionUrl);
        if (response.ok) {
            const data = await response.json();
            return data.result.progress; // Assuming the function returns { result: { progress: ... } }
        }
        return null;
    } catch (error) {
        console.error('Error loading progress from Firebase:', error);
        return null;
    }
};

export const clearAssessmentProgress = (assessmentType: AssessmentType): void => {
    localStorage.removeItem(getStorageKey(assessmentType));
    // You might also want to call a function to clear it from the backend.
};


// --- Email Service ---
// This uses a real fetch call to a placeholder Firebase Function URL.

export const sendReportByEmail = async (email: string, message: string, resultData: ExecutiveResult | NfpResult, type: AssessmentType, guidanceData: string): Promise<{ success: boolean; message?: string }> => {
    const functionUrl = `${BASE_FUNCTION_URL}/sendEmailReport`;

    try {
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    email,
                    personalMessage: message,
                    result: resultData,
                    assessmentType: type,
                    guidance: guidanceData
                }
            }),
        });

        if (response.ok) {
            return { success: true, message: 'Report sent successfully!' };
        } else {
            const errorData = await response.json();
            const errorMessage = errorData?.error?.message || "An error occurred while sending the report.";
            return { success: false, message: errorMessage };
        }
    } catch (error) {
        console.error("Error calling Firebase function:", error);
        return { success: false, message: "Could not connect to the server. Please check your internet connection." };
    }
};
