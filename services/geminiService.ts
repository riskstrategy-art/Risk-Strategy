import { GoogleGenAI } from "@google/genai";
import { ExecutiveResult, NfpResult, AssessmentType } from '../types';

let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

const generateExecutivePrompt = (result: ExecutiveResult): string => {
  if (result.level === 'Optimized') {
    return `
      You are a world-class risk management consultant providing advice to a C-suite executive.
      Their organization's risk maturity level has been assessed as "Optimized" with a high score of ${result.totalScore} out of ${result.maxScore}.
      This indicates they view risk management as a core part of organizational improvement and strategic advantage.

      Based on this strong position, provide a concise, actionable "Personalized Learning Path" focused on maintaining and enhancing this leadership position.

      Structure your response as follows:
      1.  **Start with a brief, congratulatory summary** of their current advanced position.
      2.  **Provide 3-5 concrete, strategic steps** to push the boundaries of excellence. Focus on topics like leveraging risk for competitive advantage, advanced scenario planning (e.g., black swans), fostering a culture of continuous improvement, and staying ahead of emerging and systemic risks (e.g., AI, climate).
      3.  **End with a forward-looking concluding remark** about shaping the future of their industry.

      Keep the tone professional, strategic, and empowering. The output should be plain text.
    `;
  }

  return `
    You are a world-class risk management consultant providing advice to a C-suite executive.
    Their organization's risk maturity level has been assessed as "${result.level}" with a score of ${result.totalScore} out of ${result.maxScore}.
    The interpretation of this level is: "${result.interpretation}".

    Based on this, provide a concise, actionable "Personalized Learning Path" for this executive.
    The goal is to help them guide their organization towards the next level of maturity.

    Structure your response as follows:
    1.  **Start with a brief, encouraging summary** of their current position.
    2.  **Provide 3-5 concrete, strategic steps** they should champion. For each step, use a clear heading and provide a short explanation of why it's important and what it entails.
    3.  **End with a forward-looking concluding remark.**

    Keep the tone professional, strategic, and empowering. Avoid overly technical jargon. The output should be plain text.
  `;
};

const generateNfpPrompt = (result: NfpResult): string => {
  const categorySummary = result.categoryResults.map(c => `- ${c.title}: ${c.rawScore}/${c.totalElements} (${Math.round(c.percentage * 100)}%)`).join('\n');

  if (result.level === 'Optimized') {
     return `
      You are a world-class risk management consultant specializing in the Not-for-Profit (NFP) and NGO sectors.
      You are providing advice to a leader in an NFP organization that has achieved an "Optimized" maturity level with a high score of ${result.totalScore} out of ${result.totalPossibleElements}.
      This indicates their ERM is a dynamic, integral part of continuous improvement and strategic decision-making.

      Here is the breakdown of their scores by category:
      ${categorySummary}

      Based on this strong position, provide tailored strategic guidance focused on maintaining leadership and fostering innovation.

      Structure your response as follows:
      1.  **Start with a brief, congratulatory summary** of their advanced ERM capabilities.
      2.  **Provide 3-4 concrete, strategic steps** for how they can leverage their robust ERM for greater mission impact. Focus on themes like: using risk data for innovative program design, building sector-leading resilience, mentoring other NFPs, and influencing donor and policy conversations with their risk insights.
      3.  **End with a forward-looking concluding remark** about their role as a leader and standard-setter in the NFP community.

      Keep the tone professional, supportive, and strategic. The output should be plain text.
    `;
  }

  const weakestCategories = [...result.categoryResults]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);

  return `
    You are a world-class risk management consultant specializing in the Not-for-Profit (NFP) and NGO sectors.
    You are providing advice to a leader in an NFP organization.
    Their organization's risk maturity has been assessed as "${result.level}" with an overall score of ${result.totalScore} out of ${result.totalPossibleElements}.
    The interpretation of this level is: "${result.interpretation}".

    Here is the breakdown of their scores by category:
    ${categorySummary}

    Based on this detailed assessment, provide tailored strategic guidance. Your advice must be practical and acknowledge the unique context of NFPs (e.g., mission focus, donor relations, resource constraints).

    Structure your response as follows:
    1.  **Start with a brief, encouraging summary** of their current position, acknowledging their commitment to improving ERM.
    2.  **Identify the 2-3 weakest areas** based on the provided scores (${weakestCategories.map(c => c.title).join(', ')}).
    3.  **For each weak area, provide concrete, actionable steps for improvement.** Frame these steps within the NFP context. Use clear headings for each area.
    4.  **End with a forward-looking concluding remark** that links robust ERM to enhanced mission fulfillment and stakeholder trust.

    Keep the tone professional, supportive, and strategic. The output should be plain text.
  `;
};

export const getPersonalizedGuidance = async (
  result: ExecutiveResult | NfpResult,
  type: AssessmentType
): Promise<string> => {
  if (!ai) {
    // Return a more user-friendly message for the UI
    return Promise.resolve("AI guidance is currently unavailable. The API key may not be configured correctly. Please check the setup.");
  }

  const prompt = type === 'executive' 
    ? generateExecutivePrompt(result as ExecutiveResult)
    : generateNfpPrompt(result as NfpResult);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini guidance:", error);
    // Provide a more specific error message if possible, or a generic one
    if (error instanceof Error && error.message.includes('API key not valid')) {
       return "There was an issue with the API key. AI guidance cannot be generated.";
    }
    return "There was an error generating personalized guidance. Please try again later.";
  }
};