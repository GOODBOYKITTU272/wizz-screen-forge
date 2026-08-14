# OneClick Responsive Frontend Mockup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, fully responsive, frontend-only Apply Wizz / OneClick prototype that lets a viewer click from signup through Career Passport setup, job readiness, simulated application, OTP/human-intervention branches, submission, and post-application tracking.

**Architecture:** Reuse the existing Vite + React + TypeScript + Tailwind/Radix stack. Keep the prototype entirely client-side with deterministic mock data and a small UI state model. Implement reusable responsive components, route-level screens, and simulated state transitions so the product story is clear on mobile, tablet, and desktop.

**Tech Stack:** Vite, React 18, TypeScript, React Router, Tailwind CSS, Radix/shadcn-style primitives, lucide-react, input-otp.

## Global Constraints

- Frontend-only mockup; no backend, real authentication, scraping, ATS integration, browser automation, Gmail access, CAPTCHA bypass, payments, or analytics infrastructure.
- Mobile-first, fully responsive at 375, 430, 768, 1024, and 1440 px.
- Brand colors: `#1E1E1E`, `#29FE29`, `#2C76FF`, `#F5F5F5`, `#EFFBFF`, `#1A1A1A`, `#FFDE59`, `#FF5C5C`, `#0B1D33`.
- Primary typography: Noto Sans; small UI accents may use Inter/Space Grotesk.
- Minimum interactive target 44x44 px; status must never rely on color alone.
- Product rule: before Apply, remove uncertainty; after Apply, remove work.
- The first Apply action authorizes simulated submission for that job; do not add redundant generic confirmation dialogs.
- Ask only missing, uncertain, sensitive, OTP, login, or human-verification inputs after Apply.
- Keep `main` untouched; implement on `oneclick-mobile-mockup` and deploy as a Vercel preview.

---

## File Structure

- `src/App.tsx` — top-level router and route registration.
- `src/index.css` — brand tokens, typography, base responsive styles.
- `src/types/product.ts` — candidate, job, application, answer, and status types.
- `src/data/mockData.ts` — deterministic Ramakrishna/Microsoft/Google/NVIDIA/Amazon demo data.
- `src/contexts/DemoContext.tsx` — in-memory prototype state and transitions.
- `src/components/layout/AppShell.tsx` — responsive signed-in shell.
- `src/components/layout/MobileBottomNav.tsx` — mobile navigation.
- `src/components/layout/DesktopSidebar.tsx` — tablet/desktop navigation.
- `src/components/brand/BrandLogo.tsx` — reusable Apply Wizz wordmark/mark treatment using text/CSS placeholder until official logo asset is added.
- `src/components/ui/PrimaryButton.tsx` — branded primary CTA.
- `src/components/ui/StatusPill.tsx` — accessible application state label.
- `src/components/ui/ProgressBar.tsx` — reusable progress/readiness bar.
- `src/components/ui/MatchScoreRing.tsx` — responsive score visualization.
- `src/components/jobs/JobCard.tsx` — recommended job card.
- `src/components/applications/ApplicationCard.tsx` — application summary card.
- `src/components/applications/ApplicationTimeline.tsx` — progress/submission timeline.
- `src/components/applications/ActionRequiredCard.tsx` — OTP/question/human-action card.
- `src/components/forms/QuestionCard.tsx` — one-question interaction block.
- `src/components/forms/OTPCodeInput.tsx` — six-digit mock OTP input.
- `src/pages/auth/WelcomePage.tsx` — welcome/login choice.
- `src/pages/auth/CreateAccountPage.tsx` — mock account creation.
- `src/pages/auth/VerifyEmailPage.tsx` — mock email verification.
- `src/pages/onboarding/PassportIntroPage.tsx` — Career Passport intro.
- `src/pages/onboarding/PassportWizardPage.tsx` — step-based basic info/education/experience/work authorization/preferences/common answers flow.
- `src/pages/onboarding/ResumePage.tsx` — resume upload/extraction confirmation simulation.
- `src/pages/onboarding/PassportReadyPage.tsx` — onboarding completion.
- `src/pages/HomePage.tsx` — action-first dashboard.
- `src/pages/JobsPage.tsx` — recommended jobs list.
- `src/pages/JobDetailPage.tsx` — match explanation and readiness entry.
- `src/pages/ApplicationReadinessPage.tsx` — 8/10 readiness and Apply action.
- `src/pages/MissingAnswersPage.tsx` — only two missing answers.
- `src/pages/AnswerConfirmationPage.tsx` — one-tap confirmation of uncertain known fact.
- `src/pages/ReadySummaryPage.tsx` — 10/10 ready summary.
- `src/pages/OTPAvailabilityPage.tsx` — ask if user is available for verification.
- `src/pages/ApplicationProgressPage.tsx` — simulated application progress and branch selection.
- `src/pages/OTPPage.tsx` — mock verification code state, reminder, expiration/retry.
- `src/pages/NewQuestionPage.tsx` — unexpected question branch.
- `src/pages/HumanVerificationPage.tsx` — simulated secure handoff branch.
- `src/pages/LoginRequiredPage.tsx` — simulated ATS login/setup branch.
- `src/pages/SubmittedPage.tsx` — success state.
- `src/pages/ApplicationsPage.tsx` — status-filtered applications list.
- `src/pages/NeedActionPage.tsx` — urgent action hub.
- `src/pages/ApplicationDetailPage.tsx` — application timeline/detail.
- `src/pages/ProfilePage.tsx` — passport, answer memory, documents, security/settings sections.
- `src/pages/NotFound.tsx` — keep/fix fallback route.

---

### Task 1: Brand foundation, types, mock data, and demo state

**Files:**
- Modify: `src/index.css`
- Create: `src/types/product.ts`
- Create: `src/data/mockData.ts`
- Create: `src/contexts/DemoContext.tsx`

**Interfaces:**
- Produces: `ApplicationStatus`, `Candidate`, `Job`, `Application`, `SavedAnswer`, `DemoContextValue`, `useDemo()`.
- Consumes: React context APIs only.

- [ ] Define typed application statuses exactly: `ready | running | waiting_for_otp | one_answer_needed | human_verification | login_needed | completed | failed | paused`.
- [ ] Define Ramakrishna candidate data, Microsoft primary job, Google/NVIDIA/Amazon secondary jobs, saved answers, and initial application records.
- [ ] Implement `DemoContext` state for onboarding completion, answer memory, current application status, missing answers, OTP state, and helper transitions such as `authorizeApplication`, `saveMissingAnswers`, `setApplicationStatus`, and `resetDemo`.
- [ ] Add CSS variables for all Apply Wizz brand colors, global Noto Sans fallback stack, page background, readable typography, focus rings, and 44px minimum controls.
- [ ] Run `npm run build` and `npm run lint`.
- [ ] Commit with message `feat: add OneClick demo state and brand foundation`.

### Task 2: Responsive shell and shared UI primitives

**Files:**
- Create: `src/components/layout/AppShell.tsx`
- Create: `src/components/layout/MobileBottomNav.tsx`
- Create: `src/components/layout/DesktopSidebar.tsx`
- Create: `src/components/brand/BrandLogo.tsx`
- Create: `src/components/ui/PrimaryButton.tsx`
- Create: `src/components/ui/StatusPill.tsx`
- Create: `src/components/ui/ProgressBar.tsx`
- Create: `src/components/ui/MatchScoreRing.tsx`

**Interfaces:**
- Consumes: `ApplicationStatus` from `src/types/product.ts`.
- Produces: reusable layout and display components used by all pages.

- [ ] Implement mobile bottom nav for Home, Jobs, Applications, Profile; switch to a compact left sidebar at `lg` breakpoint.
- [ ] Implement max-width responsive content shell with single-column mobile, 1–2 column tablet, and constrained desktop layouts.
- [ ] Implement accessible branded buttons, status pills with icon + label, progress bar, and score ring.
- [ ] Ensure components remain readable at 375px and do not over-stretch at 1440px.
- [ ] Run build/lint and commit `feat: add responsive OneClick shell and UI primitives`.

### Task 3: Authentication and onboarding flow

**Files:**
- Create: `src/pages/auth/WelcomePage.tsx`
- Create: `src/pages/auth/CreateAccountPage.tsx`
- Create: `src/pages/auth/VerifyEmailPage.tsx`
- Create: `src/pages/onboarding/PassportIntroPage.tsx`
- Create: `src/pages/onboarding/PassportWizardPage.tsx`
- Create: `src/pages/onboarding/ResumePage.tsx`
- Create: `src/pages/onboarding/PassportReadyPage.tsx`

**Interfaces:**
- Consumes: `useDemo()` for candidate name/profile completion.
- Produces: navigation into signed-in demo.

- [ ] Build Welcome screen with Apply Wizz branding and Get Started / existing account actions.
- [ ] Build mock account creation and verification screens with responsive fields and clear trust copy.
- [ ] Build a seven-step Career Passport wizard covering basic info, education, experience, work authorization, job preferences, common answers, and review.
- [ ] Build resume upload simulation, extracted-detail confirmation, and Passport Ready state.
- [ ] Keep large forms progressive and mobile-friendly; use two-column fields only where tablet/desktop improves readability.
- [ ] Run build/lint and commit `feat: add OneClick signup and Career Passport flow`.

### Task 4: Signed-in Home, Jobs, and explainable job detail

**Files:**
- Create: `src/components/jobs/JobCard.tsx`
- Create: `src/components/applications/ApplicationCard.tsx`
- Create: `src/components/applications/ActionRequiredCard.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/JobsPage.tsx`
- Create: `src/pages/JobDetailPage.tsx`

**Interfaces:**
- Consumes: `jobs`, `applications`, `candidate` from `useDemo()`.
- Produces: navigation into Microsoft readiness flow.

- [ ] Build Home priority order: Need Your Action, Recommended Applications, Recent Applications, Career Passport progress.
- [ ] Build Jobs list with Microsoft, Google, NVIDIA, Amazon demo cards and distinct state metadata.
- [ ] Build Microsoft job detail with role/company/location/compensation, 93% match ring, and explainable skills/experience/education/location/work-authorization breakdown.
- [ ] Add desktop two-column detail layout while preserving single-column mobile reading order.
- [ ] Run build/lint and commit `feat: add OneClick home jobs and match details`.

### Task 5: Application readiness and missing-answer flow

**Files:**
- Create: `src/components/forms/QuestionCard.tsx`
- Create: `src/pages/ApplicationReadinessPage.tsx`
- Create: `src/pages/MissingAnswersPage.tsx`
- Create: `src/pages/AnswerConfirmationPage.tsx`
- Create: `src/pages/ReadySummaryPage.tsx`

**Interfaces:**
- Consumes: Microsoft job plus `authorizeApplication()` and `saveMissingAnswers()` from `useDemo()`.
- Produces: application authorized state and 10/10 readiness.

- [ ] Show Match 93% separately from Readiness 8/10.
- [ ] Show 8 ready answers, 2 missing, resume/profile ready, verification possibility, and Apply CTA.
- [ ] Make Apply authorize the application and route directly to only the two missing questions.
- [ ] Ask relocation and earliest-start-date only; save reusable answers to demo memory.
- [ ] Add one-tap uncertain-answer confirmation example using `Age: 28 — correct? Yes / Edit` without storing age as the canonical permanent identity field.
- [ ] Show Ready Summary at 10/10 with no redundant final-submit confirmation.
- [ ] Run build/lint and commit `feat: add readiness and missing answer flow`.

### Task 6: OTP availability, progress, and interruption branches

**Files:**
- Create: `src/components/forms/OTPCodeInput.tsx`
- Create: `src/components/applications/ApplicationTimeline.tsx`
- Create: `src/pages/OTPAvailabilityPage.tsx`
- Create: `src/pages/ApplicationProgressPage.tsx`
- Create: `src/pages/OTPPage.tsx`
- Create: `src/pages/NewQuestionPage.tsx`
- Create: `src/pages/HumanVerificationPage.tsx`
- Create: `src/pages/LoginRequiredPage.tsx`

**Interfaces:**
- Consumes: `applicationStatus`, `setApplicationStatus`, `otpCode` state from `useDemo()`.
- Produces: simulated transitions to `waiting_for_otp`, `one_answer_needed`, `human_verification`, `login_needed`, and back to `running`.

- [ ] Build OTP availability check with `Yes, I'm Available` and `Apply Later`.
- [ ] Build calm progress timeline: opening, profile, resume, questions, review, submit; candidate can leave screen.
- [ ] Add demo controls/links for branch testing without exposing technical implementation jargon to the end user.
- [ ] Build OTP screen with six-digit input, masked destination, resend, reminder, expired/retry state; accept demo code `483291`.
- [ ] Build unexpected-question screen and resume flow after answer.
- [ ] Build human-verification page with a simulated secure interactive panel; do not imply bypassing CAPTCHA.
- [ ] Build login-needed flow with simulated existing-account/create-account setup and resume.
- [ ] Run build/lint and commit `feat: add application progress and intervention states`.

### Task 7: Submission, application tracking, and profile memory

**Files:**
- Create: `src/pages/SubmittedPage.tsx`
- Create: `src/pages/ApplicationsPage.tsx`
- Create: `src/pages/NeedActionPage.tsx`
- Create: `src/pages/ApplicationDetailPage.tsx`
- Create: `src/pages/ProfilePage.tsx`

**Interfaces:**
- Consumes: demo jobs/applications/saved answers.
- Produces: complete post-submit product story.

- [ ] Build success page with Microsoft role metadata, timestamp, match score, candidate actions, and navigation back to dashboard.
- [ ] Build Applications page with All/In Progress/Applied/Interviews/Offers/Rejected tabs and accessible status labels.
- [ ] Build Need Your Action hub ordered by urgency for NVIDIA OTP/human verification and Amazon one-answer example states.
- [ ] Build application detail timeline from received -> inspected -> approved -> answers -> verification -> submitted.
- [ ] Build Profile page sections for Career Passport completion, answer memory, documents, security, notification/settings mock controls.
- [ ] Allow editing/deleting mock saved answers and warn when changing high-impact reusable values.
- [ ] Run build/lint and commit `feat: add application tracking and candidate memory screens`.

### Task 8: Routing, polish, empty/error states, and accessibility pass

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css` if still used, otherwise remove obsolete styles safely.
- Modify: `src/pages/NotFound.tsx` if needed.
- Touch: all new pages/components for polish fixes discovered in verification.

**Interfaces:**
- Consumes: all page/component modules.
- Produces: complete clickable end-to-end prototype.

- [ ] Register all routes for onboarding, signed-in shell, job/app flow, interruption branches, and profile/tracking pages.
- [ ] Add sensible fallback navigation and demo reset link.
- [ ] Add empty states, recoverable failure state, skeleton/loading treatment, and focus-visible styles.
- [ ] Verify every status uses text + icon, not color alone.
- [ ] Verify all primary controls meet 44x44 px touch target.
- [ ] Verify responsive layouts manually at 375, 430, 768, 1024, 1440 px.
- [ ] Run `npm run build` and `npm run lint`; document any pre-existing warnings in the commit message/body if unavoidable.
- [ ] Commit `feat: complete responsive OneClick prototype flow`.

### Task 9: Vercel preview deployment and handoff

**Files:**
- Modify: deployment configuration only if the existing Vite project needs it for client-side routing on Vercel.

**Interfaces:**
- Consumes: completed `oneclick-mobile-mockup` branch.
- Produces: Vercel preview URL for user review.

- [ ] Inspect current Vercel projects/team and create or connect a preview project for `GOODBOYKITTU272/wizz-screen-forge` if needed.
- [ ] Configure Vite build command `npm run build` and output directory `dist`.
- [ ] Add SPA rewrite to `index.html` only if Vercel routing requires it.
- [ ] Deploy branch preview without modifying production/main.
- [ ] Open/verify the preview URL at representative desktop/mobile widths where tooling permits.
- [ ] Report the GitHub branch, latest commit, and Vercel preview URL to the user.
