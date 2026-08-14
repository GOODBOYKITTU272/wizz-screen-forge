export type ScreenId =
  | "welcome" | "signup" | "verify" | "passport-entry" | "resume-upload" | "resume-analysis"
  | "review-extracted" | "gap-analysis" | "work-auth" | "preferences" | "answer-memory-setup"
  | "sensitive-policy" | "passport-ready" | "activate-agent" | "browser-setup" | "browser-ready"
  | "gmail-connect" | "google-handoff" | "email-connected" | "notifications" | "oneclick-ready"
  | "home" | "jobs" | "job-detail" | "inspection" | "missing-answers" | "quick-confirm"
  | "ready-apply" | "running" | "auto-verification" | "unknown-question" | "sensitive-decision"
  | "human-verification" | "secure-session" | "login-needed" | "paused" | "submitted"
  | "applications" | "application-detail" | "attention" | "career-passport" | "answer-memory"
  | "answer-changed" | "documents" | "connections" | "security" | "profile" | "membership";

export type ApplicationState =
  | "READY" | "INSPECTING" | "NEEDS_INFORMATION" | "READY_TO_SUBMIT" | "RUNNING"
  | "NEEDS_OTP" | "NEEDS_LOGIN" | "NEEDS_HUMAN_VERIFICATION" | "NEEDS_SENSITIVE_DECISION"
  | "PAUSED" | "FAILED" | "SUBMITTED";

export type Job = {
  id: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  match: number;
  readiness: number;
  tag: string;
  state: ApplicationState;
};

export type TimelineEvent = {
  time: string;
  title: string;
  detail?: string;
  done?: boolean;
};

export type MemoryAnswer = {
  label: string;
  value: string;
  used: number;
  source: string;
  lastConfirmed: string;
};

export type ConnectionItem = {
  label: string;
  status: string;
  detail: string;
  tone: "green" | "blue" | "yellow" | "gray";
};

export const SCREEN_ORDER: ScreenId[] = [
  "welcome","signup","verify","passport-entry","resume-upload","resume-analysis","review-extracted",
  "gap-analysis","work-auth","preferences","answer-memory-setup","sensitive-policy","passport-ready",
  "activate-agent","browser-setup","browser-ready","gmail-connect","google-handoff","email-connected",
  "notifications","oneclick-ready","home","jobs","job-detail","inspection","missing-answers","quick-confirm",
  "ready-apply","running","auto-verification","unknown-question","sensitive-decision","human-verification",
  "secure-session","login-needed","paused","submitted","applications","application-detail","attention",
  "career-passport","answer-memory","answer-changed","documents","connections","security","profile","membership"
];
