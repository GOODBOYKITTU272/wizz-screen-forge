# OneClick Responsive Frontend Mockup — Design Spec

## Goal
Build a frontend-only, end-to-end Apply Wizz / OneClick product mockup that demonstrates the candidate experience from account creation through application submission and tracking. The mockup must be fully responsive across mobile, tablet, laptop, and desktop, while remaining mobile-first.

## Scope
This phase is UI/UX only. It does not implement job scraping, real browser automation, OTP delivery, account creation on ATS systems, a backend, or production authentication. All interactions use deterministic mock data and simulated application states.

## Existing Stack
Reuse the current Vite + React + TypeScript + Tailwind + Radix/shadcn-style component stack already present in `wizz-screen-forge`.

## Brand System
Follow the uploaded Apply Wizz brand guidelines:
- Primary text: Jet Black `#1E1E1E`
- Primary success/action accent: Fluorescent Green `#29FE29`
- Primary interactive blue: Bright Blue `#2C76FF`
- Supporting surfaces: Soft Gray `#F5F5F5`, Blue Tint `#EFFBFF`, Deep Gray `#1A1A1A`
- Attention: Yellow `#FFDE59`
- Error: Coral Red `#FF5C5C`
- Preferred dark surface: Navy `#0B1D33`
- Primary typeface: Noto Sans
- Small UI/accent typography: Inter/Space Grotesk when appropriate
- Rounded buttons/cards/icons, generous whitespace, clear hierarchy, high contrast

## Product Principle
Before Apply, OneClick removes uncertainty. After Apply, OneClick removes work.

## Information Architecture
Primary signed-in navigation:
1. Home
2. Jobs
3. Applications
4. Profile

On mobile, use bottom navigation. On larger screens, convert to a compact left rail/sidebar while preserving the same destinations.

## Core End-to-End Demo Flow
1. Splash / Welcome
2. Create Account
3. Verify Email
4. Career Passport Intro
5. Basic Information
6. Education
7. Experience
8. Work Authorization
9. Job Preferences
10. Common Application Answers
11. Career Passport Review
12. Resume Upload
13. Resume Extraction Review
14. Passport Ready
15. Home Dashboard
16. New Job / Strong Match
17. Job Details + Match Explanation
18. Application Readiness
19. Candidate taps Apply
20. Ask only missing answers
21. Confirm uncertain existing answer when needed
22. Ready-to-Apply Summary
23. OTP Availability Check
24. Application Progress
25. Branch: OTP Required
26. Branch: One New Question
27. Branch: Human Verification
28. Branch: Login Required
29. Submitted Success
30. Applications Dashboard
31. Need Your Action Hub
32. Application Detail Timeline
33. Career Passport / Answer Memory / Documents / Security / Settings

## Demo Candidate and Job
Candidate: Ramakrishna
Job: Microsoft — Software Engineer
Location: Redmond, WA
Compensation: $140K–$175K
Match: 93%
Application questions: 10
Known answers: 8
Missing answers: 2
Missing questions:
- Are you willing to relocate to Seattle, WA?
- What is your earliest available start date?
Readiness after response: 10/10
OTP example: 483291

Secondary demo job states:
- Google SWE: 95% match, 10/10 ready, no interruption
- NVIDIA ML Engineer: 92% match, human verification required
- Amazon SDE Intern: one answer needed

## Responsive Behavior
### Mobile (< 640px)
- Single-column layouts
- Bottom navigation
- Full-width cards
- Sticky primary CTA where helpful
- Bottom sheets for quick answers
- Large touch targets

### Tablet (640–1023px)
- Wider content container
- 1–2 column card grids
- Bottom nav or compact rail depending on width
- Forms may use two columns where readability improves

### Desktop (>= 1024px)
- Left navigation rail/sidebar
- Centered max-width shell
- Two-column detail layouts for job/application pages
- Dashboard cards in grids
- Never stretch mobile cards edge-to-edge

## Core UI Components
- AppShell
- MobileBottomNav / DesktopSidebar
- BrandLogo / BrandMark placeholder
- PrimaryButton / SecondaryButton
- StatusPill
- ProgressBar
- MatchScoreRing
- ReadinessCard
- JobCard
- ApplicationCard
- QuestionCard
- OTPInput
- ApplicationTimeline
- MetricCard
- EmptyState
- ActionRequiredCard
- FormField / Select / DateField
- ResumeUploadCard
- SecureSessionCard

## Mock State Model
Use a small in-memory state machine and local mock data.

Application statuses:
- ready
- running
- waiting_for_otp
- one_answer_needed
- human_verification
- login_needed
- completed
- failed
- paused

The UI must allow navigating through these states without any backend.

## Interaction Rules
- The Apply button on the readiness screen represents authorization to submit that specific application.
- Do not add repetitive generic confirmation dialogs.
- After Apply, ask only for genuinely missing, uncertain, sensitive, OTP, login, or human-verification input.
- Reusable answers are stored in mock candidate memory and reused in later demo screens.
- Sensitive demographic/legal answers are never auto-inferred.
- OTP countdown/reminders are simulated only; do not pretend to know real expiration windows.

## Key Screens
### Home
Prioritize:
1. Need Your Action
2. Recommended Applications
3. Recent Applications
4. Career Passport progress

### Job Details
Show role, company, location, compensation, 93% match score, and an explainable breakdown.

### Application Readiness
Show match and readiness separately:
- Match: 93%
- Readiness: 8/10
- 8 answers ready
- 2 answers missing
- Resume ready
- Profile ready
- Verification may be required

### Missing Answers
Ask only the two missing questions. After save, readiness becomes 10/10.

### OTP Availability
Ask whether the candidate is available for verification before proceeding.

### Application Progress
Show a calm step timeline and tell the candidate they can leave the screen.

### OTP
Six-digit entry, masked destination, submit code, resend affordance, simulated reminder state.

### Submitted
Success state with company/job metadata, timestamp, match score, and navigation back to the application dashboard.

## Accessibility
- High contrast and readable type
- Status is never communicated by color alone
- Minimum 44x44 touch targets
- Semantic labels and logical focus order
- Responsive text sizing

## Error Handling in Mockup
Represent recoverable states clearly:
- OTP expired -> request new code
- Missing answer -> ask and continue
- Human verification -> open a simulated secure interaction panel
- Login needed -> simulated one-time setup
- Application failure -> Try Again / Complete Manually

## Testing Expectations
For the frontend mockup:
- `npm run build` must pass
- `npm run lint` should pass or have only pre-existing warnings explicitly documented
- Core route/state transitions should be manually verified
- Responsive layouts should be checked at representative widths: 375, 430, 768, 1024, 1440 px

## Deployment
Deploy the feature branch as a Vercel preview first. Do not replace production/main until the user approves the mockup.

## Out of Scope
- Real job scraping
- Real ATS integration
- Real headless browser or Playwright worker
- Real Gmail/OTP access
- CAPTCHA bypass
- Real authentication/backend database
- Payments
- Analytics infrastructure

## Success Criteria
A viewer can open the Vercel URL and click through the full story from signup to successful application submission on any common device size, with a polished Apply Wizz-branded experience that makes the OneClick product concept immediately understandable.