import type { ConnectionItem, Job, MemoryAnswer, TimelineEvent } from "./types";

export const jobs: Job[] = [
  { id: "ms", company: "Microsoft", role: "Software Engineer", location: "Redmond, WA", salary: "$140K–$175K", match: 93, readiness: 80, tag: "2 answers needed", state: "NEEDS_INFORMATION" },
  { id: "gg", company: "Google", role: "Software Engineer", location: "Mountain View, CA", salary: "$155K–$190K", match: 95, readiness: 100, tag: "Ready for OneClick", state: "READY_TO_SUBMIT" },
  { id: "nv", company: "NVIDIA", role: "ML Engineer", location: "Santa Clara, CA", salary: "$150K–$205K", match: 92, readiness: 90, tag: "Human verification", state: "NEEDS_HUMAN_VERIFICATION" },
  { id: "am", company: "Amazon", role: "SDE Intern", location: "Seattle, WA", salary: "$48–$62/hr", match: 88, readiness: 90, tag: "1 new answer", state: "NEEDS_INFORMATION" }
];

export const timeline: TimelineEvent[] = [
  { time: "11:36 PM", title: "Application approved", detail: "You authorized OneClick for Microsoft — Software Engineer.", done: true },
  { time: "11:37 PM", title: "Employer application opened", detail: "Private application browser started the employer flow.", done: true },
  { time: "11:38 PM", title: "Career Passport added", detail: "Verified profile details were reused.", done: true },
  { time: "11:39 PM", title: "Resume uploaded", detail: "Software Engineering Resume.pdf", done: true },
  { time: "11:40 PM", title: "10 questions completed", detail: "8 reused answers + 2 answers you confirmed.", done: true },
  { time: "11:41 PM", title: "Email verification completed", detail: "Verification was handled automatically from your connected job-search email.", done: true },
  { time: "11:42 PM", title: "Application submitted", detail: "Confirmation captured and application moved to Submitted.", done: true }
];

export const memoryAnswers: MemoryAnswer[] = [
  { label: "Relocation", value: "Yes", used: 8, source: "Career Passport", lastConfirmed: "Aug 14, 2026" },
  { label: "Earliest Start Date", value: "June 15, 2027", used: 5, source: "Microsoft application", lastConfirmed: "Aug 14, 2026" },
  { label: "Requires Sponsorship", value: "Yes", used: 11, source: "Work Authorization", lastConfirmed: "Aug 14, 2026" },
  { label: "Desired Compensation", value: "$140K+", used: 3, source: "Job Preferences", lastConfirmed: "Aug 14, 2026" }
];

export const connections: ConnectionItem[] = [
  { label: "Application Browser", status: "Active", detail: "Private browser session ready for approved applications.", tone: "green" },
  { label: "Job-Search Gmail", status: "Connected", detail: "r••••••@gmail.com · read-only verification access.", tone: "green" },
  { label: "Phone", status: "Verified", detail: "+1 ••• ••• 0142", tone: "blue" },
  { label: "Push Notifications", status: "Active", detail: "High-priority application actions and outcomes.", tone: "blue" }
];

export const passportSections = [
  ["Personal Information", "Complete", "Ramakrishna Chanda · Dallas, TX"],
  ["Education", "Complete", "MS Computer Science · May 2027"],
  ["Experience", "Complete", "Software Engineer Intern · Acme Labs"],
  ["Skills", "Complete", "React · Python · AWS · Machine Learning"],
  ["Work Authorization", "Complete", "Authorized · Sponsorship required"],
  ["Job Preferences", "Complete", "SWE / ML · Remote or Hybrid"],
  ["Application Answers", "Complete", "18 reusable answers"],
  ["Documents", "Complete", "Software Engineering Resume.pdf"]
] as const;

export const screenTitles: Record<string, string> = {
  welcome: "Welcome",
  signup: "Create account",
  verify: "Verify contact",
  "passport-entry": "Career Passport",
  "resume-upload": "Upload resume",
  "resume-analysis": "Building Passport",
  "review-extracted": "Review what we found",
  "gap-analysis": "Complete your Passport",
  "work-auth": "Work authorization",
  preferences: "Job preferences",
  "answer-memory-setup": "Reusable answers",
  "sensitive-policy": "Sensitive answers",
  "passport-ready": "Passport ready",
  "activate-agent": "Activate OneClick",
  "browser-setup": "Application Browser",
  "browser-ready": "Browser ready",
  "gmail-connect": "Connect email",
  "google-handoff": "Google permission",
  "email-connected": "Email connected",
  notifications: "Notifications",
  "oneclick-ready": "OneClick ready",
  home: "Home",
  jobs: "Jobs",
  "job-detail": "Job detail",
  inspection: "Preparing application",
  "missing-answers": "Answers needed",
  "quick-confirm": "Quick confirmation",
  "ready-apply": "Ready for OneClick",
  running: "Applying",
  "auto-verification": "Verification activity",
  "unknown-question": "OneClick needs one answer",
  "sensitive-decision": "Your decision is required",
  "human-verification": "Human verification",
  "secure-session": "Secure application session",
  "login-needed": "Login needed",
  paused: "Application paused",
  submitted: "Application submitted",
  applications: "Applications",
  "application-detail": "Application timeline",
  attention: "Needs your attention",
  "career-passport": "Career Passport",
  "answer-memory": "Answer Memory",
  "answer-changed": "Answer changed",
  documents: "Documents",
  connections: "Connected Services",
  security: "Security",
  profile: "Profile",
  membership: "OneClick Membership"
};
