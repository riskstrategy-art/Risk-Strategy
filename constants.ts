import { ExecutiveQuestion, NfpCategory } from './types';

// Onboarding Constants
export const OPERATING_COUNTRIES = [
    'Angola', 'Australia', 'Botswana', 'Canada', 'Comoros', 'Democratic Republic of Congo', 'Eswatini', 'Lesotho', 'Madagascar', 'Malawi', 'Mauritius', 'Mozambique', 'Namibia', 'New Zealand', 'Seychelles', 'South Africa', 'Tanzania', 'United Kingdom', 'United States', 'Zambia', 'Zimbabwe', 'Multi-national', 'Other'
];

export const PROFESSIONAL_BODIES = [
    'Not Applicable',
    'Association of Chartered Certified Accountants (ACCA)',
    'Chartered Governance Institute of Southern Africa (CGISA)',
    'Engineering Council of South Africa (ECSA)',
    'Financial Planning Institute of Southern Africa (FPI)',
    'Health Professions Council of South Africa (HPCSA)',
    'Institute of Directors in Southern Africa (IoDSA)',
    'Institute of Internal Auditors (IIA)',
    'Institute of Risk Management South Africa (IRMSA)',
    'Legal Practice Council (LPC)',
    'Marketing Association of South Africa (MASA)',
    'South African Council for the Architectural Profession (SACAP)',
    'South African Council for the Project and Construction Management Professions (SACPCMP)',
    'South African Geomatics Council (SAGC)',
    'South African Institute of Chartered Accountants (SAICA)',
    'South African Institute of Civil Engineering (SAICE)',
    'The Actuarial Society of South Africa (ASSA)',
    'Other',
];

export const AREAS_OF_FOCUS = [
    'Executive Leadership & Strategy',
    'Finance & Accounting',
    'Operations & Supply Chain',
    'Human Resources & Talent Management',
    'Information Technology & Cybersecurity',
    'Legal, Risk & Compliance',
    'Sales, Marketing & Business Development',
    'Programme/Project Management',
    'Other',
];

export const YEARS_OF_EXPERIENCE = [
    '0-2 years',
    '3-5 years',
    '6-10 years',
    '11-15 years',
    '16-20 years',
    '20+ years',
];


export const EXECUTIVE_QUESTIONS: ExecutiveQuestion[] = [
  {
    id: 1,
    category: 'Governance & Culture',
    question: "Is 'risk' a dedicated agenda item in your board meetings, or integrated into every strategic discussion?",
    role: 'csuite',
  },
  {
    id: 2,
    category: 'Governance & Culture',
    question: 'Does your organization have a formally documented and board-approved Risk Appetite Statement that guides strategic decisions?',
    role: 'csuite',
  },
  {
    id: 3,
    category: 'Process & Framework',
    question: 'When evaluating a major new project or investment, is a formal risk assessment integrated into the business case and challenged by leadership?',
  },
  {
    id: 4,
    category: 'Process & Framework',
    question: 'Does your organization have a continuous, formal process for environmental scanning and scenario planning to identify emerging risks?',
  },
  {
    id: 5,
    category: 'Reporting & Communication',
    question: 'Do you receive dynamic risk reports that link key risks to strategic objectives and key performance indicators?',
  },
   {
    id: 6,
    category: 'Reporting & Communication',
    question: 'Is there an integrated, open communication culture for risk, with clear feedback loops across the organization?',
  },
  {
    id: 7,
    category: 'Risk Response',
    question: 'When a significant risk is identified, are clear ownership and actively tracked mitigation plans standard practice?',
  },
  {
    id: 8,
    category: 'Risk Response',
    question: "Are risk management activities and controls tested continuously through monitoring and scenario analysis?",
  },
  {
    id: 9,
    category: 'Integration',
    question: 'Are risk and opportunity assessments a fundamental input to the strategy-setting process?',
    role: 'csuite',
  },
  {
    id: 10,
    category: 'Integration',
    question: "Are clear, objective risk-related metrics part of performance evaluations for key roles?",
  },
  {
    id: 11,
    category: 'Technology & Cybersecurity',
    question: "Is cybersecurity a standing board agenda item, with board members possessing relevant expertise?",
    role: 'csuite',
  },
  {
    id: 12,
    category: 'Third-Party Risk',
    question: "Does the organization have an integrated third-party risk management framework with continuous monitoring?",
  },
  {
    id: 13,
    category: 'Talent & Culture',
    question: "Is attracting and retaining key talent treated as a core strategic priority, with a proactive approach overseen by the board?",
    role: 'csuite',
  },
  {
    id: 14,
    category: 'Regulatory & Geopolitical Risk',
    question: "Does the organization use sophisticated monitoring and scenario analysis to anticipate regulatory or geopolitical shifts?",
  },
  {
    id: 15,
    category: 'ESG & Reputational Risk',
    question: "Is ESG fully integrated into your long-term strategy, capital allocation, and risk management framework?",
    role: 'csuite',
  },
  {
    id: 16,
    category: 'Industry Specific',
    question: "Does your retail organization have a clear strategy to manage the competitive disadvantage arising from being compelled to accept local currency at the official rate in a predominantly USD supply chain?",
    industry: 'Retail'
  },
  {
    id: 17,
    category: 'Industry Specific',
    question: "Does your strategic planning account for price volatility and geopolitical risks through sophisticated hedging and energy source diversification strategies?",
    industry: 'Energy',
    role: 'csuite'
  },
  {
    id: 18,
    category: 'Industry Specific',
    question: "Do you have a robust framework for managing risks associated with patient data privacy (e.g., POPIA), clinical trial integrity, and regulatory compliance for new treatments?",
    industry: 'Health'
  },
  {
    id: 19,
    category: 'Industry Specific',
    question: "Does your standard construction contract clearly define risk allocation for unforeseen ground conditions and changes in law?",
    industry: 'Construction'
  },
  {
    id: 20,
    category: 'Industry Specific',
    question: "Is your network infrastructure resilience and cybersecurity for critical services (e.g., 5G) a board-level priority with continuous investment and testing?",
    industry: 'Telecoms',
    role: 'csuite'
  },
  {
    id: 21,
    category: 'Industry Specific',
    question: "As an 'accountable institution' under the FIC Act, does your organization conduct and document comprehensive Customer Due Diligence (CDD) and ongoing sanction screening?",
    industry: 'Fintech'
  },
  {
    id: 22,
    category: 'Industry Specific',
    question: "Do you mandate the use of local property lawyers for comprehensive due diligence, including title verification, for all real estate acquisitions?",
    industry: 'Real Estate',
    role: 'csuite'
  },
  {
    id: 23,
    category: 'Industry Specific',
    question: "Does your third-party risk management program specifically address the security posture and potential vulnerabilities of your critical software vendors and cloud service providers?",
    industry: 'ICT'
  },
  {
    id: 24,
    category: 'Industry Specific',
    question: "Are all your business transactions processed through ZIMRA-linked point-of-sale (POS) machines and bank accounts? (Applicable in Zimbabwe)",
    industry: 'Retail'
  },
  {
    id: 25,
    category: 'Industry Specific',
    question: "Are physical and cyber-security risks to critical infrastructure (e.g., power grids, pipelines) regularly assessed and tested against sophisticated threat actor scenarios?",
    industry: 'Energy',
    role: 'csuite'
  },
  {
    id: 26,
    category: 'Industry Specific',
    question: "Is there a proactive risk management process for your supply chain to ensure the integrity and availability of critical medical supplies and pharmaceuticals?",
    industry: 'Health'
  },
  {
    id: 27,
    category: 'Industry Specific',
    question: "Does your organization have a formal health and safety committee and ensure all workers are registered under relevant national compensation schemes?",
    industry: 'Construction'
  },
  {
    id: 28,
    category: 'Industry Specific',
    question: "Does your organization actively monitor and model risks associated with changing data sovereignty laws and regulatory requirements for cross-border data flows?",
    industry: 'Telecoms'
  },
  {
    id: 29,
    category: 'Industry Specific',
    question: "Is your Anti-Money Laundering (AML) and Counter-Financing of Terrorism (CFT) compliance program regularly audited and updated to address emerging financial crime typologies?",
    industry: 'Fintech'
  },
  {
    id: 30,
    category: 'Industry Specific',
    question: "Are all property purchase contracts formally drafted to include all agreed-upon terms, and is the transfer of ownership professionally managed through local authorities?",
    industry: 'Real Estate'
  },
  {
    id: 31,
    category: 'Industry Specific',
    question: "Is there a strategic risk framework in place to manage the lifecycle of intellectual property (IP), from creation and protection to to potential infringement risks?",
    industry: 'ICT',
    role: 'csuite'
  },
  {
    id: 32,
    category: 'Scenario Planning and Future-Proofing',
    question: "Does your organization conduct regular, rigorous scenario planning exercises that model the impact of high-impact, low-probability events (e.g., pandemics, geopolitical crises, sudden market shifts)?",
    role: 'csuite',
  },
  {
    id: 33,
    category: 'Scenario Planning and Future-Proofing',
    question: "Is there a formal process to assess and integrate the strategic risks and opportunities presented by emerging technologies like AI into your business model?",
  },
  {
    id: 34,
    category: 'Scenario Planning and Future-Proofing',
    question: "Has the board formally reviewed and approved a strategy to address long-term climate-related risks and opportunities (e.g., physical asset risk, transition risk, regulatory changes)?",
    role: 'csuite',
  },
  {
    id: 35,
    category: 'Industry Specific',
    question: 'Has the board established formal oversight of supply chain ethics, including risks related to labor practices and environmental impact, to ensure responsible sourcing?',
    industry: 'Retail',
    role: 'csuite'
  },
  {
    id: 36,
    category: 'Industry Specific',
    question: 'Does your risk framework include a formal process for managing "social license to operate" by actively monitoring and engaging with community stakeholders?',
    industry: 'Energy'
  },
  {
    id: 37,
    category: 'Industry Specific',
    question: 'Is the principle of equitable access to your products/services a formal consideration in your strategic risk and opportunity assessments?',
    industry: 'Health',
    role: 'csuite'
  },
  {
    id: 38,
    category: 'Industry Specific',
    question: 'Does your project approval process include a lifecycle risk assessment covering the long-term environmental and social impacts of completed structures?',
    industry: 'Construction'
  },
  {
    id: 39,
    category: 'Industry Specific',
    question: 'Does your long-term strategy formally address the risks and opportunities associated with bridging the digital divide in the communities you serve?',
    industry: 'Telecoms',
    role: 'csuite'
  },
  {
    id: 40,
    category: 'Industry Specific',
    question: 'Is there a formal ethics committee or review process to assess the risks of algorithmic bias and ensure transparency in automated financial decision-making?',
    industry: 'Fintech'
  },
  {
    id: 41,
    category: 'Industry Specific',
    question: 'When planning new developments, is a formal social impact assessment conducted to manage risks related to community displacement, affordability, and local economic effects?',
    industry: 'Real Estate'
  },
  {
    id: 42,
    category: 'Industry Specific',
    question: 'Does your product development lifecycle include a formal ethical risk assessment to manage the societal impact of new technologies like AI and big data analytics?',
    industry: 'ICT',
    role: 'csuite'
  },
  {
    id: 43,
    category: 'Governance & Culture',
    question: "Does the board's charter explicitly define its responsibility for overseeing the organization's ethical culture and risk management effectiveness?",
    role: 'csuite'
  },
  {
    id: 44,
    category: 'Process & Framework',
    question: 'Are front-line managers equipped with and held accountable for risk management tools and training relevant to their operational areas?'
  },
  {
    id: 45,
    category: 'Reporting & Communication',
    question: "Does your organization have a formal 'no-blame' process for reporting and analyzing operational failures or near-misses to foster continuous learning?"
  },
  {
    id: 46,
    category: 'Data Protection & Whistleblowing',
    question: 'Has your organization appointed an Information Officer and officially registered them with the Information Regulator, as required by POPIA?',
    country: 'South Africa'
  },
  {
    id: 47,
    category: 'Data Protection & Whistleblowing',
    question: 'Does your organization have a formal, tested process for notifying the Information Regulator and affected data subjects of a data breach?',
    role: 'csuite',
    country: 'South Africa'
  },
  {
    id: 48,
    category: 'Data Protection & Whistleblowing',
    question: 'Is explicit consent obtained from individuals before their personal information is used for direct marketing purposes, in line with POPIA?',
    country: 'South Africa'
  },
  {
    id: 49,
    category: 'Data Protection & Whistleblowing',
    question: 'Is there a formal process to ensure any cross-border data transfer complies with the stringent requirements of POPIA?',
    country: 'South Africa'
  },
  {
    id: 50,
    category: 'Governance & Culture',
    question: 'Does your organization have a formal, communicated whistleblowing policy that ensures protection from "occupational detriment" as defined by the Protected Disclosures Act?',
    role: 'csuite',
    country: 'South Africa'
  },
  {
    id: 51,
    category: 'Governance & Culture',
    question: 'Has the board implemented and tested "appropriate measures" (e.g., based on ISO 37001) to demonstrate it is actively working to prevent corrupt activities, as required by PRECCA?',
    role: 'csuite',
    country: 'South Africa'
  },
  {
    id: 52,
    category: 'Governance & Culture',
    question: "Does your top-level leadership actively champion a 'tone from the top' that promotes ethical behavior and compliance beyond a 'checklist' approach?",
    role: 'csuite'
  },
  {
    id: 53,
    category: 'Data Protection & Whistleblowing',
    question: "Has your organization notified the Data Protection Commission of all data processing activities as required by Lesotho's Data Protection Act, 2013?",
    country: 'Lesotho'
  },
  {
    id: 54,
    category: 'Data Protection & Whistleblowing',
    question: "Is there a formal, tested plan to notify the Data Protection Commission and affected data subjects of a data breach, as required in Lesotho?",
    country: 'Lesotho',
    role: 'csuite'
  },
  {
    id: 55,
    category: 'Data Protection & Whistleblowing',
    question: "Are your organization's data practices fully compliant with UK GDPR, including having a documented lawful basis for all data processing activities?",
    country: 'United Kingdom'
  },
  {
    id: 56,
    category: 'Data Protection & Whistleblowing',
    question: "Does your organization have a formal whistleblowing policy that reflects the strengthened protections under New Zealand's Protected Disclosures Act 2022?",
    country: 'New Zealand',
    role: 'csuite'
  },
  {
    id: 57,
    category: 'Data Protection & Whistleblowing',
    question: "Are your organization's data handling practices aligned with the 13 Information Privacy Principles of New Zealand's Privacy Act 2020?",
    country: 'New Zealand'
  },
  {
    id: 58,
    category: 'Data Protection & Whistleblowing',
    question: "Given the complex patchwork of US state privacy laws (e.g., CCPA, VCDPA), does your organization have a formal, regularly updated process to ensure compliance across all states in which you operate?",
    country: 'United States',
    role: 'csuite'
  },
  {
    id: 59,
    category: 'Data Protection & Whistleblowing',
    question: "Does your organization implement specific data security measures, such as encryption, that align with stringent state requirements like the New York SHIELD Act or Massachusetts data security law?",
    country: 'United States'
  },
  {
    id: 60,
    category: 'Data Protection & Whistleblowing',
    question: "Does your organization have a tested incident response plan that ensures timely notification to affected individuals and regulators in all 50 states in the event of a data breach?",
    country: 'United States',
    role: 'csuite'
  },
  {
    id: 61,
    category: 'Data Protection & Whistleblowing',
    question: "Are your electronic marketing practices audited to ensure strict compliance with consent requirements under both the federal CAN-SPAM Act and state-specific telemarketing laws?",
    country: 'United States'
  },
  {
    id: 62,
    category: 'Data Protection & Whistleblowing',
    question: "Is your organization's privacy framework being proactively updated to align with the enhanced requirements of provincial laws like Quebec's Law 25 and the forthcoming federal Bill C-27 (Digital Charter Implementation Act)?",
    country: 'Canada',
    role: 'csuite'
  },
  {
    id: 63,
    category: 'Data Protection & Whistleblowing',
    question: "Does your organization have a robust, audited process for managing consent under Canada's Anti-Spam Legislation (CASL) for all commercial electronic messages?",
    country: 'Canada'
  },
  {
    id: 64,
    category: 'Governance & Culture',
    question: "Does your organization have a formal, communicated whistleblowing policy that explicitly prohibits retaliation and ensures confidentiality, in line with the protections under Canada's Competition Act?",
    country: 'Canada',
    role: 'csuite'
  },
  {
    id: 65,
    category: 'Data Protection & Whistleblowing',
    question: "Does your organization's privacy management framework fully align with the Australian Privacy Principles (APPs), and has it been reviewed in light of the increased penalties under the Privacy Act?",
    country: 'Australia',
    role: 'csuite'
  },
  {
    id: 66,
    category: 'Data Protection & Whistleblowing',
    question: "Has your organization tested its process for assessing a suspected data breach within the mandatory 30-day timeframe and notifying the Office of the Australian Information Commissioner (OAIC) and affected individuals as required?",
    country: 'Australia',
    role: 'csuite'
  },
  {
    id: 67,
    category: 'Governance & Culture',
    question: "Does your organization's whistleblower policy, as required by the Corporations Act, provide clear and accessible pathways for disclosure and robust protections against detriment for all employees and officers?",
    country: 'Australia',
    role: 'csuite'
  }
];

export const EXECUTIVE_SCORE_RANGES = {
  initial: {
    min: 0, max: 4, level: 'Initial',
    interpretation: 'Risk management is informal and reactive. Key practices are not yet established.'
  },
  managed: {
    min: 5, max: 7, level: 'Managed',
    interpretation: 'Some foundational risk management practices are in place, but they are not consistently applied or integrated.'
  },
  defined: {
    min: 8, max: 10, level: 'Defined',
    interpretation: 'A formal risk management process is established, with clear responsibilities and consistent application in most areas.'
  },
  quantitatively_managed: {
    min: 11, max: 13, level: 'Quantitatively Managed',
    interpretation: 'Risk management is data-driven, with performance measures and frequent reporting in place to manage risks effectively.'
  },
  optimized: {
    min: 14, max: 15, level: 'Optimized',
    interpretation: 'Risk management is a core, proactive part of strategic decision-making and continuous organizational improvement.'
  }
} as const;

export const EXECUTIVE_BENCHMARK_SCORES = {
  defined_level: {
    level: 'Defined',
    averageScore: 12,
    categoryScores: {
      'Governance & Culture': 3,
      'Process & Framework': 2,
      'Reporting & Communication': 2,
      'Risk Response': 1,
      'Integration': 1,
      'Technology & Cybersecurity': 1,
      'Third-Party Risk': 0,
      'Talent & Culture': 1,
      'Regulatory & Geopolitical Risk': 0,
      'ESG & Reputational Risk': 1,
      'Scenario Planning and Future-Proofing': 0,
      'Data Protection & Whistleblowing': 0,
    }
  },
  optimized_level: {
    level: 'Optimized',
    averageScore: 19,
    categoryScores: {
      'Governance & Culture': 3,
      'Process & Framework': 3,
      'Reporting & Communication': 3,
      'Risk Response': 2,
      'Integration': 2,
      'Technology & Cybersecurity': 1,
      'Talent & Culture': 1,
      'Regulatory & Geopolitical Risk': 1,
      'ESG & Reputational Risk': 1,
      'Third-Party Risk': 1,
      'Scenario Planning and Future-Proofing': 2,
      'Data Protection & Whistleblowing': 1,
    }
  }
} as const;


export const NFP_DATA: NfpCategory[] = [
  {
    id: 'c1',
    title: 'Risk Culture and Leadership',
    description: 'This section assesses how risk is governed and perceived from the top down, focusing on board and leadership engagement.',
    elements: [
      { id: '1.1', text: "Senior leadership and the board have a clear understanding of ERM objectives relative to traditional siloed risk management approaches (e.g., separate financial, security, or compliance risk management)." },
      { id: '1.2', text: "The Executive Director/CEO actively embraces and provides adequate endorsement of an enterprise-wide approach to risk oversight that seeks a top-down, holistic view of major risk exposures for mission achievement.", role: 'executive' },
      { id: '1.3', text: "The board of directors is actively supportive of management's efforts to implement an enterprise-wide approach to risk oversight, recognizing their fiduciary responsibilities extend to risk management.", role: 'executive' },
      { id: '1.4', text: "Senior management views ERM efforts to obtain an enterprise perspective on risks as an important strategic tool for achieving the organization's mission and ensuring long-term sustainability.", role: 'executive' },
      { id: '1.5', text: "The organization has explicitly assigned enterprise-wide risk management authority and responsibility to a senior executive or senior management committee (e.g., identified an internal 'risk champion' or 'risk management leader').", role: 'executive' },
      { id: '1.6', text: "The senior executive with explicit responsibilities for enterprise-wide risk management leadership is a direct report of the Executive Director/CEO (or, a senior executive risk committee is used, and its chair reports to the CEO).", role: 'executive' },
      { id: '1.7', text: "Enterprise-wide risk management principles and guidelines, including those related to fraud, corruption, and safeguarding, have been identified, defined, and formally communicated to all departments and, where appropriate, to partners." },
      { id: '1.8', text: "Senior management possesses effective risk management capabilities and competencies, including an understanding of risks in challenging operational environments." },
      { id: '1.9', text: "Senior management's performance is linked to and dependent upon critical risk management metrics and adherence to ethical values.", role: 'executive' },
      { id: '1.10', text: "Senior management has formally presented an overview to the board about the organization's processes representing its ERM approach, demonstrating its commitment to accountability and transparency.", role: 'executive' },
      { id: '1.11', text: "The board of directors sets aside dedicated agenda time at its meetings to discuss the most significant risks facing the organization, including cross-cutting and emerging risks.", role: 'executive' },
      { id: '1.12', text: "Both the board and senior management view ERM as an ongoing, evolving process vital for adapting to changing external and internal environments (e.g., donor landscape, humanitarian crises)." },
    ]
  },
  {
    id: 'c2',
    title: 'Risk Identification and Contextual Understanding',
    description: 'This section evaluates the processes for identifying risks from all sources—internal, external, and emerging—to build a comprehensive risk inventory.',
    elements: [
      { id: '2.1', text: "The organization has defined and widely communicated to staff, management, and the board what it means by the term “risk” within the NFP context (e.g., encompassing programmatic, reputational, and ethical risks, not just financial)." },
      { id: '2.2', text: "Risks are described in terms of events that would affect the achievement of mission goals, rather than simply a failure to meet goals (i.e., risks can have both positive aspects, like opportunities from uncertainty, and negative aspects to the organization)." },
      { id: '2.3', text: "The organization engages in explicit (e.g., identifiable, defined, formal) efforts to identify its important risks across all functions (e.g., finance, operations, governance, programs, human resources, IT, security, partnerships, safeguarding) at least annually." },
      { id: '2.4', text: "The organization has identified a broad range of risks that may arise both internally and externally, including those it can control or prevent (e.g., fraud, SHEA, capacity gaps) and those over which it has no control (e.g., political unrest, natural disasters, donor policy changes, bank de-risking)." },
      { id: '2.5', text: "The organization engages in identifiable processes to regularly scan the external environment (e.g., political, economic, social, technological, legal, environmental – PESTLE analysis) to identify unknown but potentially emerging risks relevant to its operations." },
      { id: '2.6', text: "Senior management has a documented process to accumulate information about risks identified across the organization to create an aggregate inventory of enterprise-wide risks (e.g., a risk register)." },
      { id: '2.7', text: "Senior management links risks identified by the ERM process directly to the organization's strategic goals and core value drivers to evaluate their impact on mission success and long-term sustainability.", role: 'executive' },
      { id: '2.8', text: "Each member of the senior management team has provided input into the risk identification process, including insights from field operations and country programs." },
      { id: '2.9', text: "Each member of the board of directors has provided input into the risk identification process, contributing diverse perspectives and validating major threats.", role: 'executive' },
      { id: '2.10', text: "Employees below the senior management level (e.g., program staff, country teams) have provided input into the risk identification process, leveraging their on-the-ground knowledge and concerns." }
    ]
  },
  {
    id: 'c3',
    title: 'Risk Assessment and Prioritization (NFP-Specific)',
    description: "This section focuses on how identified risks are analyzed and prioritized, using consistent criteria to determine their significance to the organization's mission.",
    elements: [
        { id: '3.1', text: "The organization defines the time period over which risks should be assessed (e.g., the next 1-3 years for operational, 5-10 years for strategic trends) to ensure consistency in management's evaluations." },
        { id: '3.2', text: "The organization strives to assess inherent risk (i.e., the level of the risk before taking into account the organization's activities to manage the risk), particularly in new program areas or partnerships." },
        { id: '3.3', text: "The organization assesses both the likelihood of a risk event occurring and the potential impact of the event to the organization, encompassing financial, operational, reputational, legal, and ethical consequences." },
        { id: '3.4', text: "Guidelines or metric scales (e.g., 5-point scales with clear descriptions) have been defined and provided to help individuals consistently assess both likelihood and impact across the organization, including for programmatic fraud risks." },
        { id: '3.5', text: "The organization considers an integrated score that incorporates both the likelihood and impact assessments to create a risk rating that helps prioritize its most significant risk exposures." },
        { id: '3.6', text: "The organization's ERM processes encourage management and the board to consider any low probability but catastrophic events (i.e., “black swan” or “tail” events), such as global pandemics, major conflicts, or significant donor policy shifts." },
        { id: '3.7', text: "The organization considers other NFP-specific dimensions in addition to likelihood and impact, such as speed of onset/velocity of a risk, persistence, or program criticality (e.g., urgency, life-saving potential of the affected program) when assessing risks." },
        { id: '3.8', text: "Each member of the senior management team has provided their independent assessments of each identified risk." },
        { id: '3.9', text: "The senior management team (or other similar group with an enterprise view of the organization, like a Risk Council) has met formally to review the results of the independent assessments and to discuss significant differences in individual risk assessments.", role: 'executive' },
        { id: '3.10', text: "The senior management team has reached a consensus on the most significant (e.g., 8–12 critical enterprise-wide risks) facing the organization.", role: 'executive' },
        { id: '3.11', text: "The board of directors has concurred with the assessment of the top risks completed by management, demonstrating their engagement in risk oversight.", role: 'executive' },
        { id: '3.12', text: "Senior management analyzes its portfolio of risks to determine whether any risks are interrelated or whether a single event may have cascading impacts across programs or regions." },
        { id: '3.13', text: "The ERM process encourages monitoring on a regular basis (more than once a year) any events substantially impacting the assessments of likelihood and impact." }
    ]
  },
  {
    id: 'c4',
    title: 'Articulation of Risk Appetite and Strategic Tolerance',
    description: "This section examines the organization's process for defining and communicating the acceptable level of risk it is willing to take to achieve its objectives.",
    elements: [
        { id: '4.1', text: "The board and management have engaged in discussions to articulate the organization's overall appetite for risk-taking, considering its mission, values, and the environments it operates in.", role: 'executive' },
        { id: '4.2', text: "The board of directors has formally concurred with the organization's risk appetite statement.", role: 'executive' },
        { id: '4.3', text: "The organization has separately defined its risk appetite for different types of NFP-specific risks (e.g., different appetites for programmatic risk in high-conflict zones versus financial risk, or for integrity risks like fraud and SHEA).", role: 'executive' },
        { id: '4.4', text: "The organization has expressed in writing its overall appetite for risk-taking, even if it is a general guide rather than a strict quantitative measure.", role: 'executive' },
        { id: '4.5', text: "The organization has used at least some quantitative or qualitative measures and boundaries (e.g., acceptable financial loss, number of language speakers in a new country, level of security risk tolerated for staff/partners) in defining its risk appetite.", role: 'executive' }
    ]
  },
  {
    id: 'c5',
    title: 'Risk Response and Control Activities',
    description: 'This section reviews the strategies and controls put in place to manage priority risks.',
    elements: [
        { id: '5.1', text: "The organization has identified clear “risk owners” with responsibility for each of its most significant enterprise-wide risks.", role: 'executive' },
        { id: '5.2', text: "The organization has identified a risk owner for other important risks outside the top tier that management believes are important to monitor." },
        { id: '5.3', text: "The organization has documented the existing response(s) (e.g., accepting, avoiding, sharing, reducing) to its most significant risks, including preventive and detective controls for fraud, corruption, and SHEA." },
        { id: '5.4', text: "The organization has documented the risk responses for other identified risks outside the top tier." },
        { id: '5.5', text: "The organization has evaluated whether existing responses are sufficient to manage risks to be within its defined risk appetite, particularly for risks related to programmatic outcomes and donor trust." },
        { id: '5.6', text: "The organization has developed and is actively implementing plans to address those risks where the current response is insufficient, including strengthening capacities of implementing partners where relevant." },
        { id: '5.7', text: "The organization has separately evaluated the potential cost of the risk response relative to the benefit provided, aiming to optimize risk mitigation strategies such as insurance or direct capacity building for partners." },
        { id: '5.8', text: "The organization re-evaluates its risk responses at least annually, adapting to changes in the operating environment and lessons learned." },
        { id: '5.9', text: "The organization's ERM process helps identify potential overlaps or duplications in risk responses across the enterprise, including those shared with partners, to improve efficiency and avoid “compliance overwhelm”." },
        { id: '5.10', text: "The organization conducts tabletop drills or other exercises to test whether responses to its most significant risks (e.g., security incidents, data breaches, partner fraud) are working as intended." },
        { id: '5.11', text: "The organization has objectively assessed the effectiveness of risk response plans for its most significant risks, including those related to partner performance and accountability." },
        { id: '5.12', text: "The organization has objectively assessed the effectiveness of risk response plans for other important risks outside the top tier." }
    ]
  },
  {
    id: 'c6',
    title: 'Risk Reporting and Stakeholder Communication',
    description: 'This section assesses how risk information is monitored and communicated to key stakeholders, including the board, management, and donors.',
    elements: [
        { id: '6.1', text: "The organization has developed and monitors critical “lagging” risk indicators (KRIs) that show when risk events have occurred or are escalating (e.g., number of fraud cases, project delays, staff turnover rates)." },
        { id: '6.2', text: "The organization has developed and monitors critical “leading” risk indicators (KRIs) that provide early warning that a risk event is more likely to occur in the future (e.g., changes in funding landscape, shifts in local authority policies, early signs of partner capacity strain)." },
        { id: '6.3', text: "Senior management regularly reviews a “dashboard” or other report that provides the status of critical risks and/or risk response plans, offering a real-time view of the evolving risk landscape." },
        { id: '6.4', text: "The board regularly receives and reviews a “dashboard” or other report that provides the status of critical risks and/or risk response plans, tailored to their oversight responsibilities.", role: 'executive' },
        { id: '6.5', text: "Senior management has identified thresholds or “trigger points” whereby risk metrics indicate that an emerging risk warrants greater management and/or board attention, prompting timely action.", role: 'executive' },
        { id: '6.6', text: "Output from the organization's ERM processes about significant risk exposures informs risk disclosures to critical external stakeholders (e.g., donors, regulatory bodies), reinforcing trust and demonstrating accountability.", role: 'executive' }
    ]
  },
  {
    id: 'c7',
    title: 'Integration with Strategic Planning and Mission Fulfillment',
    description: 'This section evaluates how risk management is integrated into the strategic planning and decision-making processes to ensure goals are realistic and resilient.',
    elements: [
        { id: '7.1', text: "The organization has a formal strategic planning process that clearly articulates its mission, vision, and core value drivers." },
        { id: '7.2', text: "The strategic plan is updated at least annually, allowing for adaptation to evolving risks and opportunities." },
        { id: '7.3', text: "The organization's existing risk profile (i.e., output from ERM processes) is an important input for the strategic planning process, ensuring strategic decisions are risk-informed.", role: 'executive' },
        { id: '7.4', text: "Senior management links the top risk exposures to strategic objectives to determine which objectives face the greatest number of risks and to determine which risks impact the greatest number of objectives.", role: 'executive' },
        { id: '7.5', text: "When evaluating a range of strategic options (e.g., expanding into new regions, new program types, new funding models), consideration is given to the potential impact of each option on the organization's existing enterprise-wide risk profile.", role: 'executive' },
        { id: '7.6', text: "The senior executive with explicit responsibility for enterprise-wide risk management leadership is actively engaged in the strategic planning process.", role: 'executive' },
        { id: '7.7', text: "The organization's ERM processes encourage the consideration of opportunities where the organization can take informed risks to generate incremental impact or expand its reach." },
        { id: '7.8', text: "The organization's risk appetite statement guides the goal-setting process (e.g., if the organization has a low appetite for operating in highly insecure areas, it will set programmatic goals accordingly).", role: 'executive' },
        { id: '7.9', text: "Risk-adjusted return/impact expectations are considered for each program, region, or service line.", role: 'executive' },
        { id: '7.10', text: "The organization's strategic plan has been communicated to all staff and, where appropriate, to partners, so that they can understand how their actions can create or prevent risks to the achievement of strategic objectives and mission fulfillment." }
    ]
  },
  {
    id: 'c8',
    title: 'Assessment of ERM Effectiveness and Continuous Improvement',
    description: 'This section focuses on the processes for reviewing and improving the risk management framework itself, ensuring it remains effective and evolves with the organization.',
    elements: [
        { id: '8.1', text: "Senior management regards ERM as an ongoing process rather than just a project with a defined endpoint." },
        { id: '8.2', text: "Senior management actively seeks to understand and monitor emerging ERM best practices relevant to the NFP sector (e.g., in safeguarding, fraud prevention, partnership risk management)." },
        { id: '8.3', text: "Senior management and the board of directors have engaged in ERM-related training or other knowledge-enhancing activities to improve their oversight capabilities.", role: 'executive' },
        { id: '8.4', text: "Adequate human and financial resources have been dedicated to support the ERM function, recognizing it as an investment in program outcomes and organizational sustainability, not just an overhead.", role: 'executive' },
        { id: '8.5', text: "The organization periodically obtains an objective assessment of its ERM processes (e.g., through internal audit, external NFP-specific ERM expert evaluations, or peer reviews).", role: 'executive' },
        { id: '8.6', text: "The organization evaluates risk events that have occurred (e.g., fraud incidents, program disruptions, safeguarding failures) to better understand why the risk occurred and whether there were failures in the organization's ERM processes." },
        { id: '8.7', text: "The organization identifies and subsequently implements changes to improve its ERM processes based on learning and evolving needs." },
        { id: '8.8', text: "Does the organization transparently communicate key risk areas and management strategies to major donors and stakeholders to build trust and demonstrate accountability?", role: 'executive' }
    ]
  },
  {
    id: 'c9',
    title: 'Professional Bodies/Associations',
    description: 'This section assesses risks unique to member-based organizations, focusing on reputation, professional standards, member data, and financial sustainability.',
    elements: [
        { id: '9.1', text: "The organization's risk management framework explicitly addresses risks related to maintaining professional standards, certification integrity, and member conduct." },
        { id: '9.2', text: "There is a formal process to identify and manage risks to the organization's reputation and brand among its members, employers, and the public." },
        { id: '9.3', text: "The organization considers risks associated with the relevance and currency of its qualifications and continuing professional development (CPD) programs in a changing market." },
        { id: '9.4', text: "Risk management processes are in place to address potential conflicts of interest within governance bodies, committees, and staff who may be practicing members.", role: 'executive' },
        { id: '9.5', text: "The organization assesses risks related to data privacy and security of its member database, which contains significant personal and professional information." },
        { id: '9.6', text: "There is a process to monitor and respond to regulatory changes that could impact the profession, its members, or the organization's status as a professional body." },
        { id: '9.7', text: "The organization manages financial risks related to membership revenue volatility, conference/event profitability, and investment of reserves.", role: 'executive' },
        { id: '9.8', text: "A crisis management and communication plan is in place to address events that could damage the profession's or organization's credibility (e.g., major member misconduct, exam integrity breaches).", role: 'executive' }
    ]
  },
  {
    id: 'c10',
    title: 'Thematic Risk Management',
    description: 'This section assesses how the organization manages key thematic risks that are critical in the NFP sector, such as safeguarding, donor compliance, and partner accountability.',
    elements: [
        { id: '10.1', text: "The organization has a formal mechanism to receive, investigate, and respond to feedback and complaints from beneficiaries and community members, treating this as a key risk indicator." },
        { id: '10.2', text: "Specific risk responses and controls are in place to address safeguarding risks (e.g., prevention of sexual exploitation, abuse, and harassment - PSEAH) for staff, partners, and beneficiaries." },
        { id: '10.3', text: "The organization has a clear process for managing risks related to complex donor grant compliance, including tracking and reporting on restricted funds and specific deliverables." },
        { id: '10.4', text: "There is a structured due diligence and capacity-building process for downstream partners (sub-grantees) to manage shared risks and ensure accountability." },
        { id: '10.5', text: "Does your organization's data protection policy align with POPIA, specifically regarding consent for processing beneficiary and donor information, and direct marketing for fundraising?", role: 'executive' },
        { id: '10.6', text: "Are field staff and implementing partners actively trained and empowered to identify and report risks from the ground up, with a clear feedback mechanism to leadership?" }
    ]
  },
  {
    id: 'c11',
    title: 'NPO Act Compliance (South Africa)',
    country: 'South Africa',
    description: 'This section assesses compliance with the key requirements of the Nonprofit Organisations Act 71 of 1997, focusing on registration, governance, and reporting.',
    elements: [
        { id: '11.1', text: "Does your organization's founding document (e.g., constitution) fully comply with the requirements outlined in Section 12 of the NPO Act?", role: 'executive' },
        { id: '11.2', text: "Does your organization have a reliable process to ensure annual reports (narrative, financial, and accounting officer's reports) are submitted to the NPO Directorate within 9 months of your financial year-end?", role: 'executive' },
        { id: '11.3', text: "Is there a formal procedure to report any changes to your constitution, physical address, or office bearers to the Directorate within one month of the change?", role: 'executive' },
        { id: '11.4', text: "If your NPO operates or makes donations internationally, have you completed the compulsory registration as required by the GLA Act?", role: 'executive' },
        { id: '11.5', text: "Does your organization maintain up-to-date, prescribed information about its governing structures as required by the NPO Act?" },
        { id: '11.6', text: "Is your organization aware of the consequences of non-compliance, including de-registration and the criminal offense of misrepresenting registration status?", role: 'executive'}
    ]
  },
  {
    id: 'c12',
    title: 'Regulatory Framework (Lesotho)',
    country: 'Lesotho',
    description: 'Assesses governance and data protection within Lesotho\'s unique regulatory environment.',
    elements: [
      { id: '12.1', text: "Has your board established its own formal governance and accountability standards in the absence of a comprehensive national NGO policy?", role: 'executive' },
      { id: '12.2', text: "Do you have an established process for reporting on activities and impact to beneficiaries, ensuring downward accountability beyond donor requirements?" },
      { id: '12.3', text: "Has your organization notified the Data Protection Commission of your data processing activities as per the Data Protection Act, 2013?", role: 'executive' },
      { id: '12.4', text: "Is there a formal plan to notify the Commission and data subjects in the event of a data breach?" }
    ]
  },
  {
    id: 'c13',
    title: 'Charity Framework (UK)',
    country: 'United Kingdom',
    description: 'Assesses compliance with the key requirements of the Charity Commission for England and Wales and UK data protection laws.',
    elements: [
      { id: '13.1', text: "Is your organization registered with the Charity Commission (if required) and are annual returns submitted on time?", role: 'executive' },
      { id: '13.2', text: "Do your trustees regularly review and document how your activities meet the 'public benefit' requirement?", role: 'executive' },
      { id: '13.3', text: "Are your fundraising activities fully compliant with the Code of Fundraising Practice?" },
      { id: '13.4', text: "Are your data practices, especially concerning donor and beneficiary information, fully compliant with UK GDPR?" }
    ]
  },
  {
    id: 'c14',
    title: 'Accountability Framework (New Zealand)',
    country: 'New Zealand',
    description: 'Assesses "speak up" culture and data privacy practices as emphasized by New Zealand law.',
    elements: [
      { id: '14.1', text: "Does your organization have a formal whistleblowing policy that reflects the strengthened protections under the Protected Disclosures Act 2022?", role: 'executive' },
      { id: '14.2', text: "Does top-level leadership actively promote a 'speak up' culture and provide visible support for whistleblowers?" },
      { id: '14.3', text: "Are your data handling practices aligned with the 13 Information Privacy Principles of the Privacy Act 2020?" }
    ]
  }
];

export const NFP_SCORE_RANGES = {
  initial: {
    min: 1, max: 20, level: 'Initial',
    interpretation: 'Risk management is ad-hoc, with little to no formal process. Basic reporting might exist, but activities are reactive and inconsistent across the organization.'
  },
  managed: {
    min: 21, max: 40, level: 'Managed',
    interpretation: 'The organization has assigned some resources and people to risk management. However, these efforts are not yet fully integrated into all mission-critical processes.'
  },
  defined: {
    min: 41, max: 59, level: 'Defined',
    interpretation: 'A formal ERM process is established and integrated across most organizational functions. Responsibilities are clear, risk criteria are defined, and stakeholder engagement is a consistent practice.'
  },
  quantitatively_managed: {
    min: 60, max: 79, level: 'Quantitatively Managed',
    interpretation: 'The organization uses metrics and data analysis to manage risk. Performance against risk objectives is measured, and reporting on ERM effectiveness is frequent and comprehensive.'
  },
  optimized: {
    min: 80, max: 99, level: 'Optimized',
    interpretation: 'ERM is a dynamic, integral part of continuous improvement and strategic decision-making. The organization proactively evaluates outcomes to refine its risk processes and enhance mission impact.'
  }
} as const;

export const NFP_BENCHMARK_SCORES = {
  defined_level: {
    level: 'Defined',
    averageScore: 52,
    categoryScores: {
      c1: 7, c2: 5, c3: 6, c4: 2, c5: 6, c6: 3, c7: 5, c8: 5, c9: 6, c10: 3, c11: 4
    }
  },
  optimized_level: {
    level: 'Optimized',
    averageScore: 92,
    categoryScores: {
      c1: 12, c2: 10, c3: 12, c4: 5, c5: 11, c6: 6, c7: 9, c8: 8, c9: 7, c10: 5, c11: 7
    }
  },
} as const;

export const INDUSTRY_SPECIFIC_INSIGHTS: Record<string, {risks: string[], opportunities: string[]}> = {
    'Retail': {
        risks: [
            'Intense competition and margin pressure from e-commerce giants.',
            'Supply chain disruptions impacting inventory and delivery times.',
            'Cybersecurity threats targeting customer data and payment systems.',
            'Shifting consumer preferences towards sustainability and ethical sourcing.'
        ],
        opportunities: [
            'Leveraging data analytics for personalized marketing and customer experiences.',
            'Developing a seamless omnichannel strategy that integrates online and physical stores.',
            'Investing in last-mile delivery solutions to enhance customer convenience.',
            'Adopting AI for dynamic pricing, demand forecasting, and inventory optimization.'
        ]
    },
    'Energy': {
        risks: [
            'Commodity price volatility and geopolitical instability affecting supply.',
            'Increasing regulatory pressure related to carbon emissions and climate change.',
            'Physical risks to infrastructure from extreme weather events.',
            'Cyberattacks targeting critical infrastructure (e.g., power grids, pipelines).'
        ],
        opportunities: [
            'Transitioning to renewable energy sources (solar, wind) and green hydrogen.',
            'Investing in grid modernization and smart grid technologies for efficiency.',
            'Developing carbon capture, utilization, and storage (CCUS) technologies.',
            'Exploring new business models around decentralized energy and battery storage.'
        ]
    },
    'Health': {
        risks: [
            'Stringent regulatory compliance (e.g., data privacy like POPIA, new drug approvals).',
            'Rising operational costs and pressure on healthcare funding.',
            'Cybersecurity threats targeting sensitive patient records (EHR/EMR).',
            'Talent shortages, particularly for specialized medical staff.'
        ],
        opportunities: [
            'Adopting telehealth and remote patient monitoring to expand access to care.',
            'Utilizing AI and machine learning for diagnostics, treatment personalization, and drug discovery.',
            'Focusing on preventative care and wellness programs.',
            'Improving interoperability of health data to create a more connected care ecosystem.'
        ]
    },
    'Construction': {
        risks: [
            'Skilled labor shortages and rising material costs impacting project budgets and timelines.',
            'Complex project management and risks of delays and cost overruns.',
            'Workplace health and safety incidents and regulatory compliance.',
            'Economic cycles and their impact on demand for new projects.'
        ],
        opportunities: [
            'Adopting new technologies like Building Information Modeling (BIM) and drones for efficiency.',
            'Focusing on sustainable and green building practices (e.g., LEED certification).',
            'Exploring modular and prefabricated construction methods to speed up delivery.',
            'Investing in project risk management software to better predict and mitigate issues.'
        ]
    },
    'Telecoms': {
        risks: [
            'High capital expenditure required for infrastructure upgrades (e.g., 5G).',
            'Intense market competition and pressure on average revenue per user (ARPU).',
            'Evolving cybersecurity threats against network infrastructure.',
            'Regulatory changes related to data sovereignty, privacy, and net neutrality.'
        ],
        opportunities: [
            'Expanding 5G services to enable new applications like IoT and autonomous vehicles.',
            'Offering value-added services such as cloud computing, streaming, and cybersecurity.',
            'Investing in fiber optic infrastructure to meet growing data demands.',
            'Partnering with other industries to create new connected solutions (e.g., smart cities).'
        ]
    },
    'Fintech': {
        risks: [
            'Navigating a complex and rapidly evolving regulatory landscape (e.g., FIC Act, POPIA).',
            'Sophisticated cybersecurity threats targeting financial data and transactions.',
            'Building and maintaining customer trust in a purely digital environment.',
            'Competition from both established financial institutions and other startups.'
        ],
        opportunities: [
            'Leveraging AI for credit scoring, fraud detection, and personalized financial advice.',
            'Expanding into underserved markets through mobile-first financial products.',
            'Utilizing blockchain technology for secure and transparent transactions.',
            'Partnering with traditional banks to offer innovative white-label solutions.'
        ]
    },
    'Real Estate': {
        risks: [
            'Interest rate fluctuations impacting financing costs and property valuations.',
            'Economic downturns affecting demand for commercial and residential properties.',
            'Physical risks from climate change (e.g., flooding, wildfires) to property assets.',
            'Changing work patterns (e.g., remote work) impacting demand for office space.'
        ],
        opportunities: [
            'Developing sustainable and energy-efficient buildings to attract tenants and investors.',
            'Investing in "proptech" to improve property management and tenant experience.',
            'Repurposing underutilized commercial properties for new uses (e.g., residential, logistics).',
            'Focusing on growing sectors like logistics/warehousing and data centers.'
        ]
    },
    'ICT': {
        risks: [
            'Rapid technological obsolescence requiring continuous innovation.',
            'Global talent shortages for specialized skills (e.g., AI, cybersecurity).',
            'Managing risks associated with third-party software and cloud service providers.',
            'Navigating complex data privacy regulations across different jurisdictions (e.g., POPIA).'
        ],
        opportunities: [
            'Leading digital transformation projects for clients in other industries.',
            'Developing solutions in high-growth areas like AI, IoT, and cloud computing.',
            'Providing cybersecurity services to address the growing threat landscape.',
            'Creating platform-based business models to foster an ecosystem of users and developers.'
        ]
    }
};