import { GoogleGenAI } from "@google/genai";
import { ExecutiveResult, NfpResult, AssessmentType } from '../types';

let ai: GoogleGenAI | null = null;
// FIX: Use process.env.API_KEY for the API key as per guidelines.
if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

const getCountryContext = (country?: string): string => {
    switch (country) {
        case 'South Africa':
            return `Your advice should be particularly mindful of South Africa's key regulations, including the Protection of Personal Information Act (POPIA), the Protected Disclosures Act, and the Financial Intelligence Centre Act (FIC Act), which emphasize data privacy, whistleblower protection, and anti-money laundering controls.`;
        case 'Lesotho':
            return `Your advice should be mindful of Lesotho's regulatory environment, particularly the Data Protection Act, 2013 regarding data privacy, and the under-regulated nature of the NGO sector, which places a high emphasis on strong internal governance and accountability beyond donor requirements.`;
        case 'United Kingdom':
            return `Your advice should be mindful of the United Kingdom's regulatory environment, particularly UK GDPR for data protection and, for charities, the stringent accountability and reporting standards set by the Charity Commission for England and Wales.`;
        case 'New Zealand':
            return `Your advice should be mindful of New Zealand's regulatory environment, which emphasizes creating a strong internal "speak up" culture under the Protected Disclosures Act 2022 and adhering to the data privacy principles of the Privacy Act 2020.`;
        case 'United States':
            return `Your advice should be mindful of the United States' complex regulatory patchwork, which includes sector-specific federal laws and numerous state-level comprehensive privacy laws (like CCPA). Emphasize the importance of a unified compliance strategy to manage varying requirements for data security, breach notification, and consumer rights across states.`;
        case 'Canada':
            return `Your advice should be mindful of Canada's privacy laws, including the federal PIPEDA and stricter provincial acts like Quebec's Law 25. Key considerations include consent management under CASL, mandatory breach reporting, and robust whistleblower protections as outlined in the Competition Act.`;
        case 'Australia':
            return `Your advice should be mindful of Australia's regulatory framework, particularly the Privacy Act and its Australian Privacy Principles (APPs). Key areas of focus include mandatory data breach notification to the OAIC, and ensuring the corporate whistleblower policy is effective and compliant with the Corporations Act.`;
        case 'Zimbabwe':
            return `Your advice should be mindful of Zimbabwe's Data Protection Act, 2021 (DPA). Key considerations include mandatory registration with the regulator (POTRAZ), strict requirements for data breach notifications, processes for handling data subject rights (access, erasure), and the need for a Data Protection Officer (DPO) for certain entities.`;
        case 'Angola':
            return `Your advice should be mindful of Angola's Law no. 22/11 on the Protection of Personal Data. Key considerations include mandatory registration with the Data Protection Agency (APD), strict rules for cross-border data transfers, and obtaining explicit consent for data processing.`;
        case 'Botswana':
            return `Your advice should be mindful of Botswana's Data Protection Act, 2018. Key considerations include mandatory registration with the Information and Data Protection Commission, the appointment of a Data Protection Officer (DPO), and adhering to defined procedures for data breach notifications.`;
        case 'Mauritius':
            return `Your advice should be mindful of the Mauritius Data Protection Act 2017, which is closely aligned with GDPR. Emphasize the need for a Data Protection Officer (DPO), conducting Data Protection Impact Assessments (DPIAs) for high-risk activities, and strict 72-hour data breach notification rules.`;
        case 'Mozambique':
            return `Your advice should be mindful of Mozambique's data protection landscape. While a comprehensive single law is emerging, focus on core principles from its Constitution and Electronic Transactions Law, such as the necessity of explicit consent for data processing and implementing robust security measures.`;
        case 'Tanzania':
            return `Your advice should be mindful of Tanzania's Personal Data Protection Act, 2022. Key considerations include the mandatory registration of data controllers and processors with the Personal Data Protection Commission and adherence to rules on cross-border data transfers.`;
        case 'Zambia':
            return `Your advice should be mindful of Zambia's Data Protection Act No. 3 of 2021. Key considerations include the mandatory registration of all controllers and processors with the Data Protection Commissioner's office and the appointment of a Data Protection Officer.`;
        default:
            return `Your advice should emphasize general best practices in governance, as the specific country context is not provided.`;
    }
};


const generateExecutivePrompt = (result: ExecutiveResult, country?: string, industry?: string): string => {
  const categorySummary = Object.entries(result.categoryScores)
    .map(([category, score]) => `- **${category}**: ${score}/${result.categoryMaxScores[category]}`)
    .join('\n');

  return `
    You are a world-class risk management consultant generating a narrative risk report for a C-suite executive.
    Their organization operates in **${country || 'an unspecified country'}** within the **${industry || 'an unspecified industry'}**.

    Their assessment results are as follows:
    - **Overall Score**: ${result.totalScore} out of ${result.maxScore}
    - **Maturity Level**: "${result.level}"
    - **Interpretation**: ${result.interpretation}
    - **Category Breakdown**:
    ${categorySummary}

    ${getCountryContext(country)}

    Generate a concise, professional, and actionable executive summary in Markdown format. The tone should be strategic and empowering.

    Structure the report with the following sections using Markdown headings:

    ### Executive Summary
    (A brief, high-level paragraph summarizing the organization's current risk maturity posture, mentioning the level and what it implies.)

    ### Key Strengths
    (A bulleted list of 2-3 areas where the organization is performing well, based on the higher-scoring categories. Be specific.)

    ### Areas for Improvement
    (A bulleted list of 2-3 of the most critical areas needing attention, based on the lower-scoring categories. Be specific.)

    ### Strategic Recommendations
    (A numbered list of 3-4 concrete, high-impact recommendations to help them advance to the next level of maturity. Link these recommendations back to the identified areas for improvement.)
  `;
};

const generateNfpPrompt = (result: NfpResult, country?: string): string => {
  const categorySummary = result.categoryResults
    .map(c => `- **${c.title}**: ${c.rawScore}/${c.totalElements} (${Math.round(c.percentage * 100)}%)`)
    .join('\n');

  return `
    You are a world-class risk management consultant specializing in the Not-for-Profit (NFP) and NGO sectors. You are generating a narrative risk report for an NFP leader.
    Their organization operates in **${country || 'an unspecified country'}**.

    Their assessment results are as follows:
    - **Overall Score**: ${result.totalScore} out of ${result.totalPossibleElements} (${Math.round(result.grandPercentage * 100)}%)
    - **Maturity Level**: "${result.level}"
    - **Interpretation**: ${result.interpretation}
    - **Category Breakdown**:
    ${categorySummary}

    ${getCountryContext(country)}

    Generate a concise, professional, and actionable executive summary in Markdown format, tailored to the NFP context (mission-focus, donor trust, resource constraints). The tone should be supportive and strategic.

    Structure the report with the following sections using Markdown headings:

    ### Executive Summary
    (A brief, high-level paragraph summarizing the organization's current risk maturity posture, mentioning the level and what it implies for mission fulfillment and stakeholder trust.)

    ### Key Strengths
    (A bulleted list of 2-3 areas where the organization demonstrates strong practices, based on the higher-scoring categories.)

    ### Areas for Improvement
    (A bulleted list of 2-3 of the most critical areas needing attention to enhance resilience and effectiveness, based on the lower-scoring categories.)

    ### Strategic Recommendations
    (A numbered list of 3-4 concrete, practical recommendations to help them improve. Frame these within the NFP context, focusing on actions that strengthen governance and program delivery.)
  `;
};


export const getCustomizedGuidance = async (
  result: ExecutiveResult | NfpResult,
  type: AssessmentType,
  country?: string,
  industry?: string
): Promise<string> => {
  if (!ai) {
    return Promise.resolve("Customized guidance is currently unavailable. The API key may not be configured correctly. Please check the setup.");
  }

  const prompt = type === 'executive' 
    ? generateExecutivePrompt(result as ExecutiveResult, country, industry)
    : generateNfpPrompt(result as NfpResult, country);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini guidance:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       return "There was an issue with the API key. Customized guidance cannot be generated.";
    }
    return "There was an error generating customized guidance. Please try again later.";
  }
};
