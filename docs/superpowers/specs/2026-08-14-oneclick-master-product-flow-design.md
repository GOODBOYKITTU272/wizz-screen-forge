# OneClick Master Product Flow Design

## Product Promise
Before Apply, OneClick removes uncertainty. After Apply, OneClick removes work.

OneClick is a premium B2C personal job application operating system. The user establishes a trusted career identity once, approves an application once, and the agent owns the repetitive execution unless human judgment, sensitive information, authentication, or genuine human verification is required.

## Permanent Product Principles
1. One-time setup: collect durable candidate identity once and reuse it.
2. Remembered answers: every reusable confirmed answer becomes Career Passport memory.
3. Minimal interruption: never ask for information the system already knows with sufficient confidence.
4. Transparent automation: show what OneClick did, why it paused, and what value it created.
5. User control over sensitive decisions: never infer sensitive, legal, demographic, immigration-ambiguous, or attestation answers.
6. Mobile-first autonomy: the candidate must not need a laptop to complete the intended journey.

## Product Areas
- Career Passport: reusable professional identity, documents, preferences, work authorization, application answer memory.
- Job Intelligence: job fit and application readiness as separate concepts.
- OneClick Agent: inspects and executes approved applications.
- Attention Center: only human-required interruptions.
- Applications: status, timeline, outcomes and automation audit trail.
- Profile & Connections: application browser, Gmail, notifications, security, privacy and subscription value.

## Navigation
Mobile primary nav: Home, Jobs, Applications, Profile.
Desktop nav: Home, Jobs, Applications, Career Passport, Profile.
Career Passport remains reachable from Profile on mobile and may become a first-class destination later.

## Mental Model
- My Career Passport knows who I am.
- OneClick checks whether it knows enough to apply.
- I approve the job once.
- The agent handles everything else unless it genuinely needs me.

## Screen Inventory
### Journey 1 — Account and Career Passport
01 Welcome
02 Create Account
03 Verify Contact
04 Build Your Career Passport
05 Upload Resume
06 Building Your Career Passport
07 Review What We Found
08 We Need a Few More Things
09 Work Authorization
10 Job Preferences
11 Teach OneClick Once
12 Some Answers Always Stay Yours
13 Career Passport Ready

### Journey 2 — Agent Setup
14 Activate Your Application Agent
15 Your Application Browser
16 Browser Ready
17 Connect Job-Search Email
18 Google Permission
19 Email Connected
20 Stay Reachable When OneClick Needs You
21 OneClick Is Ready

### Journey 3 — Job to Authorization
22 Home
23 Jobs
24 Job Detail
25 Checking the Application
26 Two Answers Needed
27 Quick Confirmation
28 Ready for OneClick

### Journey 4 — Execution and Interruptions
29 OneClick Is Applying
30 OneClick Needs One Answer
31 Your Decision Is Required
32 Human Verification Needed
33 Secure Application Session
34 Login Needed
35 Application Paused
36 Application Submitted

Automatic email verification is modeled as an invisible execution event and application timeline event rather than a routine user-facing OTP-entry screen.

### Journey 5 — Post-Apply and Account Management
37 Applications
38 Application Timeline
39 Needs Your Attention
40 Career Passport
41 Answer Memory
42 This Answer Changed
43 Documents
44 Connected Services
45 Security
46 Profile
47 OneClick Membership

## Key Screen Rules
### Welcome
Sell outcome, not technology. Show a proof card with a role, match, readiness and Apply with OneClick CTA.

### Create Account
Google and Apple are primary identity providers; email and phone remain available. Google sign-in must not imply Gmail read permission.

### Career Passport Entry
Primary: Upload Resume (recommended). Secondary: Import Professional Profile. Fallback: Build From Scratch. All paths converge into review + gap analysis.

### Resume Extraction
Show work being completed rather than a generic spinner. Extracted data must always be reviewable and editable before becoming trusted Career Passport data.

### Gap Analysis
Explain what is missing and why. Ask only for missing durable information such as work authorization, sponsorship, relocation, preferred locations, start date and compensation preference.

### Sensitive Answers
Never infer or silently reuse when explicit user judgment is required. The user is interrupted only when the employer asks the relevant question.

### Agent Setup
Career Passport = information. OneClick Agent = action. Agent setup consists of Application Browser, job-search Gmail permission and notifications.

### Application Browser
Customer term: private application browser / personal application browser. Do not expose Playwright, Chromium or headless-browser terminology in UI.

### Gmail
Explain the purpose before Google OAuth. In the product model Gmail may be used to detect relevant application verification and confirmation messages. Sign-in and mailbox permission are separate consent events.

### Home
The first question is “What requires my attention?” not “What jobs are available?” Prioritize attention, strong matches, in-progress applications and recent submissions.

### Match vs Readiness
Match measures fit for the role. Readiness measures whether OneClick has enough trusted information and connections to complete the employer flow. Never merge the two numbers.

### Inspection Before Apply
OneClick inspects application questions, required documents, login needs and likely verification before presenting final authorization.

### Final Authorization
The Ready for OneClick screen is the only final authorization step. Tapping Apply with OneClick authorizes completion and submission of that specific application. Do not add a redundant confirmation dialog after the tap.

### Execution
The user can leave the screen. Show a calm progress timeline. Routine verification should remain invisible if completed automatically.

### Interruptions
Unknown factual question -> ask once, optionally remember.
Uncertain known answer -> one-tap confirmation.
Sensitive/legal question -> explicit user decision.
Human verification -> secure browser handoff; do not bypass.
Employer login -> secure browser handoff.
Failure -> clear consumer-language explanation and recovery options.

### Submission Success
Prove premium value by showing what OneClick completed, including number of questions, document uploads, verification events and interruptions avoided.

### Applications and Timeline
Every application should provide a transparent event history of what OneClick did and when.

### Answer Memory
Show reusable semantic answer, current value, last confirmation and usage count. Editing a previously-used answer only changes future applications.

### Membership
Demonstrate monthly value: applications completed, questions answered automatically, verification steps handled, interruptions, and estimated time saved.

## Application State Machine
READY -> INSPECTING -> NEEDS_INFORMATION -> READY_TO_SUBMIT -> RUNNING -> SUBMITTED

RUNNING may branch to:
- NEEDS_OTP (normally auto-resolved when permitted)
- NEEDS_LOGIN
- NEEDS_HUMAN_VERIFICATION
- NEEDS_SENSITIVE_DECISION
- PAUSED
- FAILED

The UI must not invent application statuses outside this model.

## Employer Question Decision Hierarchy
1. Trusted known answer -> use it.
2. Partially uncertain answer -> one-tap confirmation.
3. Unknown factual answer -> ask and optionally remember.
4. Sensitive/legal/demographic/ambiguous immigration/attestation -> candidate decision.
5. Genuine human-only step -> secure handoff.
6. Everything else -> automate.

## Responsive Behavior
### Mobile
Single-column primary flow, sticky primary actions where helpful, bottom navigation, large touch targets, bottom sheets for quick responses, no desktop-only completion steps.

### Tablet
Wider content shell, selective two-column form/card layouts, adaptive navigation.

### Desktop
Left rail, centered max-width content, two-column detail views, multi-card dashboards, no stretched phone layouts.

## Visual System
Apply Wizz brand: Jet Black #1E1E1E, Fluorescent Green #29FE29, Bright Blue #2C76FF, Soft Gray #F5F5F5, Blue Tint #EFFBFF, Deep Gray #1A1A1A, Yellow #FFDE59, Coral Red #FF5C5C, dark navy #0B1D33. Use generous whitespace, rounded cards and buttons, high contrast and clear hierarchy.

## Prototype Scope
This implementation is frontend-only. It uses deterministic mock data and simulated transitions for resume parsing, OAuth, application browser activation, Gmail connection, job inspection, automatic verification, application execution, interruptions and submission. It does not implement real ATS automation, real Gmail access, real OAuth, real browser workers, CAPTCHA bypass, backend databases or payments.

## Success Criteria
A user can open the preview on a mobile phone and navigate the entire product story end to end, understand what OneClick knows, what it automates, why it interrupts, what they authorized, and what premium value was created.