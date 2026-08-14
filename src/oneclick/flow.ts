export type Journey =
  | "career-passport"
  | "agent-setup"
  | "job-to-apply"
  | "execution"
  | "account-management";

export type ScreenId =
  | "s01" | "s02" | "s03" | "s04" | "s05" | "s06" | "s07" | "s08" | "s09" | "s10"
  | "s11" | "s12" | "s13" | "s14" | "s15" | "s16" | "s17" | "s18" | "s19" | "s20"
  | "s21" | "s22" | "s23" | "s24" | "s25" | "s26" | "s27" | "s28" | "s29" | "s30"
  | "s31" | "s32" | "s33" | "s34" | "s35" | "s36" | "s37" | "s38" | "s39" | "s40"
  | "s41" | "s42" | "s43" | "s44" | "s45" | "s46" | "s47";

export interface ScreenDefinition {
  id: ScreenId;
  journey: Journey;
  title: string;
  eyebrow: string;
  description: string;
}

export const screens: ScreenDefinition[] = [
  { id: "s01", journey: "career-passport", title: "Welcome", eyebrow: "YOUR CAREER PARTNER", description: "See the OneClick outcome before creating an account." },
  { id: "s02", journey: "career-passport", title: "Create Account", eyebrow: "ACCOUNT", description: "Create a secure Apply Wizz account." },
  { id: "s03", journey: "career-passport", title: "Verify Contact", eyebrow: "SECURITY", description: "Verify contact details for account security and urgent application alerts." },
  { id: "s04", journey: "career-passport", title: "Build Your Career Passport", eyebrow: "CAREER PASSPORT", description: "Choose resume upload, professional-profile import, or manual setup." },
  { id: "s05", journey: "career-passport", title: "Upload Resume", eyebrow: "CAREER PASSPORT", description: "Upload a PDF or DOCX to start the Career Passport." },
  { id: "s06", journey: "career-passport", title: "Building Your Career Passport", eyebrow: "AI EXTRACTION", description: "Show useful extraction work instead of a generic spinner." },
  { id: "s07", journey: "career-passport", title: "Review What We Found", eyebrow: "REVIEW", description: "Review and edit extracted professional information." },
  { id: "s08", journey: "career-passport", title: "We Need a Few More Things", eyebrow: "GAP ANALYSIS", description: "Explain which durable application facts are still missing." },
  { id: "s09", journey: "career-passport", title: "Work Authorization", eyebrow: "CAREER PASSPORT", description: "Collect work authorization and sponsorship answers without inference." },
  { id: "s10", journey: "career-passport", title: "Job Preferences", eyebrow: "CAREER PASSPORT", description: "Teach OneClick what kinds of opportunities are worth applying to." },
  { id: "s11", journey: "career-passport", title: "Teach OneClick Once", eyebrow: "ANSWER MEMORY", description: "Capture reusable application answers once." },
  { id: "s12", journey: "career-passport", title: "Some Answers Always Stay Yours", eyebrow: "TRUST", description: "Explain which sensitive decisions OneClick will never guess." },
  { id: "s13", journey: "career-passport", title: "Career Passport Ready", eyebrow: "CAREER PASSPORT", description: "Confirm the candidate identity is ready for agent activation." },

  { id: "s14", journey: "agent-setup", title: "Activate Your Application Agent", eyebrow: "ONECLICK AGENT", description: "Turn trusted candidate information into an autonomous application agent." },
  { id: "s15", journey: "agent-setup", title: "Your Application Browser", eyebrow: "PRIVATE BROWSER", description: "Explain the secure personal application-browser capability." },
  { id: "s16", journey: "agent-setup", title: "Browser Ready", eyebrow: "PRIVATE BROWSER", description: "Confirm the personal application browser is active." },
  { id: "s17", journey: "agent-setup", title: "Connect Job-Search Email", eyebrow: "EMAIL CONNECTION", description: "Explain why Gmail access helps handle verification and confirmations." },
  { id: "s18", journey: "agent-setup", title: "Google Permission", eyebrow: "GOOGLE", description: "Simulate redirect to Google-owned permission consent." },
  { id: "s19", journey: "agent-setup", title: "Email Connected", eyebrow: "EMAIL CONNECTION", description: "Confirm the job-search mailbox is connected." },
  { id: "s20", journey: "agent-setup", title: "Stay Reachable When OneClick Needs You", eyebrow: "NOTIFICATIONS", description: "Enable push notifications and an SMS fallback for real human-needed interruptions." },
  { id: "s21", journey: "agent-setup", title: "OneClick Is Ready", eyebrow: "ACTIVATED", description: "Mark the moment the personal application agent becomes usable." },

  { id: "s22", journey: "job-to-apply", title: "Home", eyebrow: "ONECLICK ACTIVE", description: "Prioritize what needs attention, then matches, in-progress work and recent submissions." },
  { id: "s23", journey: "job-to-apply", title: "Jobs", eyebrow: "JOB INTELLIGENCE", description: "Browse jobs with separate match and readiness scores." },
  { id: "s24", journey: "job-to-apply", title: "Job Detail", eyebrow: "MICROSOFT", description: "Explain job fit and application readiness separately." },
  { id: "s25", journey: "job-to-apply", title: "Checking the Application", eyebrow: "PREPARING", description: "Inspect the employer flow before asking for final authorization." },
  { id: "s26", journey: "job-to-apply", title: "Two Answers Needed", eyebrow: "2 ANSWERS", description: "Ask only the two application questions OneClick does not know." },
  { id: "s27", journey: "job-to-apply", title: "Quick Confirmation", eyebrow: "CONFIRM", description: "Confirm an uncertain known fact without forcing re-entry." },
  { id: "s28", journey: "job-to-apply", title: "Ready for OneClick", eyebrow: "10/10 READY", description: "Present final application authorization with no redundant follow-up confirmation." },

  { id: "s29", journey: "execution", title: "OneClick Is Applying", eyebrow: "APPLICATION IN PROGRESS", description: "Show calm execution progress and let the user leave the screen." },
  { id: "s30", journey: "execution", title: "OneClick Needs One Answer", eyebrow: "ACTION NEEDED", description: "Ask one genuinely unknown factual employer question." },
  { id: "s31", journey: "execution", title: "Your Decision Is Required", eyebrow: "SENSITIVE QUESTION", description: "Require explicit user choice for a sensitive employer question." },
  { id: "s32", journey: "execution", title: "Human Verification Needed", eyebrow: "HUMAN STEP", description: "Pause safely and request genuine human verification." },
  { id: "s33", journey: "execution", title: "Secure Application Session", eyebrow: "PRIVATE BROWSER", description: "Temporarily hand control of the candidate browser to the user." },
  { id: "s34", journey: "execution", title: "Login Needed", eyebrow: "SIGN IN", description: "Hand off employer login inside the secure browser session." },
  { id: "s35", journey: "execution", title: "Application Paused", eyebrow: "RECOVERY", description: "Explain recoverable failure in consumer language and offer appropriate next steps." },
  { id: "s36", journey: "execution", title: "Application Submitted", eyebrow: "SUBMITTED", description: "Celebrate submission and quantify the work OneClick completed." },

  { id: "s37", journey: "account-management", title: "Applications", eyebrow: "APPLICATIONS", description: "Browse all applications by meaningful status." },
  { id: "s38", journey: "account-management", title: "Application Timeline", eyebrow: "MICROSOFT", description: "Show exactly what OneClick did and when." },
  { id: "s39", journey: "account-management", title: "Needs Your Attention", eyebrow: "ATTENTION CENTER", description: "Aggregate every outstanding human-required interruption." },
  { id: "s40", journey: "account-management", title: "Career Passport", eyebrow: "CAREER PASSPORT", description: "Manage the candidate's durable professional identity." },
  { id: "s41", journey: "account-management", title: "Answer Memory", eyebrow: "ANSWER MEMORY", description: "Inspect reusable semantic answers and their usage." },
  { id: "s42", journey: "account-management", title: "This Answer Changed", eyebrow: "CHANGE PROTECTION", description: "Protect historical applications while updating future answers." },
  { id: "s43", journey: "account-management", title: "Documents", eyebrow: "DOCUMENTS", description: "Manage resumes, letters, transcripts and portfolios." },
  { id: "s44", journey: "account-management", title: "Connected Services", eyebrow: "CONNECTIONS", description: "Manage application browser, Gmail, phone and notifications." },
  { id: "s45", journey: "account-management", title: "Security", eyebrow: "SECURITY & PRIVACY", description: "Manage sessions, permissions, devices and personal data controls." },
  { id: "s46", journey: "account-management", title: "Profile", eyebrow: "PROFILE", description: "Access user information, passport, connections, subscription, support and privacy." },
  { id: "s47", journey: "account-management", title: "OneClick Membership", eyebrow: "MEMBERSHIP", description: "Demonstrate premium monthly value through work completed and time saved." },
];

export const screenOrder = screens.map((screen) => screen.id);

export function screenById(id: ScreenId) {
  return screens.find((screen) => screen.id === id)!;
}

export function nextScreen(id: ScreenId): ScreenId {
  const index = screenOrder.indexOf(id);
  return screenOrder[Math.min(index + 1, screenOrder.length - 1)];
}

export function previousScreen(id: ScreenId): ScreenId {
  const index = screenOrder.indexOf(id);
  return screenOrder[Math.max(index - 1, 0)];
}
