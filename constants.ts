import { ExecutiveQuestion, NfpCategory } from './types';

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
    averageScore: 9,
    categoryScores: {
      'Governance & Culture': 2,
      'Process & Framework': 1,
      'Reporting & Communication': 1,
      'Risk Response': 1,
      'Integration': 1,
      'Technology & Cybersecurity': 1,
      'Third-Party Risk': 0,
      'Talent & Culture': 1,
      'Regulatory & Geopolitical Risk': 0,
      'ESG & Reputational Risk': 1,
    }
  },
  optimized_level: {
    level: 'Optimized',
    averageScore: 14,
    categoryScores: {
      'Governance & Culture': 3,
      'Process & Framework': 2,
      'Reporting & Communication': 2,
      'Risk Response': 2,
      'Integration': 1,
      'Technology & Cybersecurity': 1,
      'Third-Party Risk': 1,
      'Talent & Culture': 1,
      'Regulatory & Geopolitical Risk': 1,
      'ESG & Reputational Risk': 1,
    }
  }
} as const;


export const NFP_DATA: NfpCategory[] = [
  {
    id: 'c1',
    title: 'Risk Culture and Leadership',
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
      { id: '1.12', text: "Both the board and senior management view ERM as an ongoing, evolving process vital for adapting to changing external and internal environments (e.g., donor landscape, humanitarian crises)." }
    ]
  },
  {
    id: 'c2',
    title: 'Risk Identification and Contextual Understanding',
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
    title: 'Risk Response and Partnership Management',
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
        { id: '5.12', text: "The organization has objectively assessed the effectiveness of risk response plans for other important risks outside the top tier." },
        { id: '5.13', text: "The organization has a formal mechanism to receive, investigate, and respond to feedback and complaints from beneficiaries and community members, treating this as a key risk indicator." },
        { id: '5.14', text: "Specific risk responses and controls are in place to address safeguarding risks (e.g., prevention of sexual exploitation, abuse, and harassment - PSEAH) for staff, partners, and beneficiaries." },
        { id: '5.15', text: "The organization has a clear process for managing risks related to complex donor grant compliance, including tracking and reporting on restricted funds and specific deliverables." },
        { id: '5.16', text: "There is a structured due diligence and capacity-building process for downstream partners (sub-grantees) to manage shared risks and ensure accountability." },
        { id: '5.17', text: "Risk responses address the protection of sensitive beneficiary and operational data, especially in high-risk contexts, aligning with data privacy principles (e.g., GDPR, or local equivalents)." }
    ]
  },
  {
    id: 'c6',
    title: 'Risk Reporting and Stakeholder Communication',
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
    elements: [
        { id: '8.1', text: "Senior management regards ERM as an ongoing process rather than just a project with a defined endpoint." },
        { id: '8.2', text: "Senior management actively seeks to understand and monitor emerging ERM best practices relevant to the NFP sector (e.g., in safeguarding, fraud prevention, partnership risk management)." },
        { id: '8.3', text: "Senior management and the board of directors have engaged in ERM-related training or other knowledge-enhancing activities to improve their oversight capabilities.", role: 'executive' },
        { id: '8.4', text: "Adequate human and financial resources have been dedicated to support the ERM function, recognizing it as an investment in program outcomes and organizational sustainability, not just an overhead.", role: 'executive' },
        { id: '8.5', text: "The organization periodically obtains an objective assessment of its ERM processes (e.g., through internal audit, external NFP-specific ERM expert evaluations, or peer reviews).", role: 'executive' },
        { id: '8.6', text: "The organization evaluates risk events that have occurred (e.g., fraud incidents, program disruptions, safeguarding failures) to better understand why the risk occurred and whether there were failures in the organization's ERM processes." },
        { id: '8.7', text: "The organization identifies and subsequently implements changes to improve its ERM processes based on learning and evolving needs." }
    ]
  },
  {
    id: 'c9',
    title: 'Professional Bodies/Associations',
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
  }
];

export const NFP_SCORE_RANGES = {
  initial: {
    min: 1, max: 17, level: 'Initial',
    interpretation: 'Risk management is ad-hoc, with little to no formal process. Basic reporting might exist, but activities are reactive and inconsistent across the organization.'
  },
  managed: {
    min: 18, max: 35, level: 'Managed',
    interpretation: 'The organization has assigned some resources and people to risk management. However, these efforts are not yet fully integrated into all mission-critical processes.'
  },
  defined: {
    min: 36, max: 53, level: 'Defined',
    interpretation: 'A formal ERM process is established and integrated across most organizational functions. Responsibilities are clear, risk criteria are defined, and stakeholder engagement is a consistent practice.'
  },
  quantitatively_managed: {
    min: 54, max: 71, level: 'Quantitatively Managed',
    interpretation: 'The organization uses metrics and data analysis to manage risk. Performance against risk objectives is measured, and reporting on ERM effectiveness is frequent and comprehensive.'
  },
  optimized: {
    min: 72, max: 88, level: 'Optimized',
    interpretation: 'ERM is a dynamic, integral part of continuous improvement and strategic decision-making. The organization proactively evaluates outcomes to refine its risk processes and enhance mission impact.'
  }
} as const;

export const NFP_BENCHMARK_SCORES = {
  defined_level: {
    level: 'Defined',
    averageScore: 45,
  },
  optimized_level: {
    level: 'Optimized',
    averageScore: 82,
  },
} as const;