# OneClick Frontend Mockup Design

## Goal
Build a frontend-only, mobile-first Apply Wizz OneClick prototype that demonstrates the complete candidate journey from signup through a successful job application. No backend, real browser automation, real authentication, OTP delivery, ATS integration, or scraping is included in this phase.

## Product Principle
Before Apply, OneClick removes uncertainty. After Apply, OneClick removes work.

The prototype should communicate that Apply Wizz receives a job opportunity, pre-inspects the employer application, calculates candidate fit and application readiness, asks only for missing or uncertain answers, checks whether the candidate is available for OTP, simulates application progress, handles OTP/human-verification states, and ends in a submitted application state.

## Existing Project Context
Repository: GOODBOYKITTU272/wizz-screen-forge
Existing stack: Vite, React 18, TypeScript, Tailwind CSS, shadcn/Radix UI, React Router, lucide-react.

We will keep this existing stack rather than migrate to Next.js. It is sufficient for a static interactive prototype and minimizes unnecessary changes.

## Brand Source of Truth
Use the uploaded Apply Wizz brand guidelines:
- Friendly, clear, supportive, professional, youthful tone.
- Primary colors: Jet Black #1E1E1E, Fluorescent Green #29FE29, Bright Blue #2C76FF.
- Secondary colors: Soft Gray #F5F5F5, Blue Tint #EFFBFF, Deep Gray #1A1A1A.
- Accent colors: Yellow #FFDE59, Coral Red #FF5C5C.
- Preferred dark/navy background: #0B1D33.
- Noto Sans for primary typography; Inter Medium or Space Grotesk for buttons/captions/small UI.
- Rounded buttons/cards/icons, generous white space, clean hierarchy, high contrast.

## Scope
### Included
1. Splash / welcome
2. Sign up and email verification mock
3. Career Passport onboarding
4. Resume upload/extraction mock
5. Initial home dashboard
6. Job match card
7. Job detail + match score explanation
8. Application readiness screen
9. Missing-answer flow
10. One-tap answer confirmation flow
11. Ready-to-apply summary
12. OTP availability check
13. Application progress simulation
14. OTP-needed state
15. OTP reminder/expiration state
16. Unexpected one-question interruption
17. Human verification handoff mock
18. Login-required mock
19. Application submitted state
20. Applications dashboard
21. Need Your Action hub
22. Career Passport / saved answers / documents / settings screens
23. Failure/retry state

### Excluded
- Real authentication
- Real email/OTP integrations
- Browserbase/Playwright or headless browser workers
- Real ATS automation
- Scraping
- Real application submission
- Database/backend
- Production security implementation
- Payments

## Architecture
The prototype will be a client-side state machine driven by mock data.

### Layers
- `src/pages/`: route-level screens
- `src/components/`: reusable cards, buttons, status pills, progress components, phone-shell elements
- `src/data/`: mock candidate, jobs, answers, application-state fixtures
- `src/context/` or existing contexts: demo-flow state
- `src/lib/`: helpers for transitions and score/status display
- `src/index.css` / Tailwind theme: Apply Wizz design tokens

No API calls are required for the happy path.

## Main Demo Flow
Candidate: Ramakrishna
Employer: Microsoft
Role: Software Engineer
Location: Redmond, WA
Compensation: $140K–$175K
Match: 93%
Application questions: 10
Known answers: 8
Missing answers: 2

Flow:
Welcome → Signup → Verify Email → Career Passport → Resume → Home → Microsoft Job → Readiness 8/10 → Apply → 2 Missing Answers → 10/10 Ready → OTP Availability → Application Progress → OTP Needed → Enter OTP → Progress → Submitted → Applications Dashboard.

## Secondary Branches
- Zero-interruption application: Google, 10/10 ready, no OTP, auto-completes after Apply.
- Human verification: NVIDIA, pauses and shows secure verification mock.
- Login needed: employer account setup mock before resuming.
- Failure: recoverable application failure with Retry and Complete Manually actions.

## Interaction Rules
- The first `Apply` tap authorizes the simulated application submission.
- Do not ask a generic final confirmation.
- Ask only missing answers.
- If an answer is likely known, show `Correct? Yes / Edit` rather than asking from scratch.
- Sensitive/legal answers are always represented as candidate-controlled choices.
- The prototype never implies CAPTCHA bypass.
- OTP countdowns are illustrative and clearly simulated.

## Navigation
Post-onboarding bottom navigation:
- Home
- Jobs
- Applications
- Profile

Home prioritizes:
1. Need Your Action
2. Recommended Applications
3. Recent Applications
4. Career Passport progress

## Visual Direction
- iOS-first mobile layout with a centered phone-sized canvas on desktop.
- White-dominant light mode, navy/deep-gray dark surfaces where useful.
- Bright Blue for primary interaction, Green for ready/success.
- Yellow for pending/waiting, Coral Red for failures/warnings.
- Minimal gradients, no glassmorphism-heavy styling.
- Lucide icons.
- Large, comfortable touch targets.
- One dominant CTA per screen.

## Demo Data
Candidate facts and application answers are local fixtures. Interactions update in-memory state only. Refresh may reset the demo unless localStorage persistence is simple to include.

## Error Handling
For the prototype, unsupported or unexpected routes should fall back to a branded 404/demo reset screen. Application branches have explicit paused, failed, and retry states.

## Testing
Before deployment:
- Run `npm run build`.
- Run `npm run lint` when feasible; fix errors introduced by this work.
- Manually verify the happy path and all main branches.
- Verify responsive layout at common iPhone widths and desktop preview.

## Deployment
Push implementation to `GOODBOYKITTU272/wizz-screen-forge` and deploy the frontend to the connected Vercel team. The Vite build output is `dist`.

## Success Criteria
A stakeholder can open one Vercel URL on phone or desktop and click through the full OneClick story without needing a backend. The prototype should clearly communicate the product's differentiator: the candidate reviews a ready application, taps Apply once, and is interrupted only when input or verification is genuinely needed.
