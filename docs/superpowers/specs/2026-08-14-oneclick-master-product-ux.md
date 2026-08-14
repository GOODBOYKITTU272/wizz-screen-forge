# OneClick Master Product UX Specification

## Product promise

**Before Apply, OneClick removes uncertainty. After Apply, OneClick removes work.**

OneClick is a premium B2C personal job application operating system. The user builds a reusable Career Passport once, activates a private application agent, approves an application once, and OneClick handles repetitive execution while interrupting only for unknown facts, sensitive decisions, login, or genuine human verification.

## Permanent design principles

1. One-time setup over repeated data entry.
2. Remember trusted answers and explain when they are reused.
3. Minimize candidate interruptions after application authorization.
4. Make automation transparent through timelines, statuses, and value metrics.
5. Never guess sensitive, legal, immigration, demographic, criminal-history, disability, veteran-status, conflict-of-interest, or attestation answers.
6. Mobile-first: no desktop dependency, browser extension dependency, or “continue on laptop” dead end.
7. Match Score and Application Readiness are separate concepts.
8. The final **Apply with OneClick** tap is the authorization; do not add a redundant confirmation.

## Primary product areas

- Career Passport
- Job Intelligence
- OneClick Agent
- Attention Center
- Applications
- Profile & Connections

Signed-in desktop navigation: Home, Jobs, Applications, Career Passport, Profile.

Mobile navigation: Home, Jobs, Applications, Profile. Career Passport remains reachable from Home and Profile.

## Candidate mental model

- My Career Passport knows who I am.
- OneClick checks whether it knows enough to apply.
- I approve the job once.
- The agent handles everything else unless it genuinely needs me.

## Master journeys

### Journey 1 — Identity and Career Passport
Welcome → Create Account → Verify Contact → Career Passport Entry → Upload Resume / Import Professional Profile / Build Manually → Resume Analysis → Review Extracted Data → Gap Analysis → Work Authorization → Job Preferences → Reusable Answer Memory → Sensitive Question Policy → Career Passport Ready.

### Journey 2 — Activate OneClick
Activate Agent → Private Application Browser → Browser Ready → Connect Job-Search Gmail → Google Permission Handoff → Email Connected → Notifications → OneClick Ready.

### Journey 3 — Inspect and authorize an application
Home → Jobs → Job Detail → Pre-Application Inspection → Missing Answers → Quick Confirmation when needed → Ready for OneClick → Apply with OneClick.

### Journey 4 — Execute with minimal interruption
Application Running → automatic email verification when available → New Unknown Question → Sensitive Decision → Human Verification → Secure Application Session → Employer Login → Paused/Failure handling → Submitted.

### Journey 5 — Manage outcomes and trust
Applications → Application Timeline → Attention Center → Career Passport → Answer Memory → Changed Answer Protection → Documents → Connected Services → Security → Profile → Membership Value.

## Application state machine

- READY — Ready for OneClick
- INSPECTING — Preparing application
- NEEDS_INFORMATION — Answer needed
- READY_TO_SUBMIT — 10/10 Ready
- RUNNING — OneClick is applying
- NEEDS_OTP — usually resolved automatically when Gmail is connected
- NEEDS_LOGIN — sign-in required
- NEEDS_HUMAN_VERIFICATION — human verification required
- NEEDS_SENSITIVE_DECISION — candidate decision required
- PAUSED — application paused
- FAILED — could not finish
- SUBMITTED — application submitted

No UI state may contradict this model.

## Employer question decision hierarchy

1. Trusted known answer → reuse automatically.
2. Partially uncertain known answer → one-tap confirmation.
3. Unknown non-sensitive answer → ask candidate once and optionally remember.
4. Sensitive answer → always candidate decision.
5. Genuine human-only verification → hand off to secure application session.
6. Everything else → automate.

## Notification philosophy

High priority: human verification, login expired, sensitive/new question, failure requiring user action.

Medium priority: application submitted, interview invitation, status update.

Low-priority automation activity stays inside the app. Do not spam the candidate for every automated field.

## Premium value proof

Success and membership surfaces should quantify work completed: applications submitted, questions answered automatically, resume uploads, verification steps handled, interruptions avoided, and estimated time saved.

## Prototype constraints for this implementation

- Frontend-only responsive mockup.
- No real authentication, Gmail OAuth, scraping, cloud browser, OTP extraction, CAPTCHA bypass, backend storage, payment processing, or employer-site automation.
- Buttons and state transitions simulate the final product behavior with in-memory React state.
- Brand colors: #1E1E1E, #29FE29, #2C76FF, #F5F5F5, #EFFBFF, #1A1A1A, #FFDE59, #FF5C5C, #0B1D33.
- Noto Sans-style typography and rounded, premium consumer UI.
- Responsive validation targets: 375, 430, 768, 1024, 1440 pixels.
