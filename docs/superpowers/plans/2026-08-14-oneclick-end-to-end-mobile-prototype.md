# OneClick End-to-End Mobile Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, frontend-only, end-to-end OneClick prototype that covers all five approved user journeys and can be reviewed from a mobile Vercel preview.

**Architecture:** Keep `src/App.tsx` as the entry point and move the new experience into a focused `src/oneclick/` module. A single state-machine shell controls navigation between screens while reusable mobile-first components render cards, status rows, actions, timelines, inputs, and bottom navigation. Mock candidate, job, application, memory, connection, and membership data live in a separate data module.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, lucide-react.

## Global Constraints

- Work only on `oneclick-mobile-mockup`; do not merge to `main`.
- Frontend-only mockup: no real auth, OAuth, Gmail access, OTP extraction, browser automation, CAPTCHA bypass, backend, payments, or scraping.
- Mobile-first and fully responsive at 375, 430, 768, 1024, and 1440 px.
- Preserve the OneClick promise: “Before Apply, OneClick removes uncertainty. After Apply, OneClick removes work.”
- Match score and application readiness must remain distinct.
- Never imply that sensitive/legal answers are inferred automatically.
- The `Apply with OneClick` tap is the final authorization; no redundant confirmation modal.
- Brand palette must use Apply Wizz black, green, blue, gray, tint, yellow, coral, and navy values from the approved spec.

---

### Task 1: Create product model and mock data

**Files:**
- Create: `src/oneclick/types.ts`
- Create: `src/oneclick/data.ts`

**Interfaces:**
- Produces: `ScreenId`, `ApplicationState`, `Job`, `TimelineEvent`, `MemoryAnswer`, `ConnectionItem`, `SCREEN_ORDER`, `jobs`, `timeline`, `memoryAnswers`, `connections`.

- [ ] Define the complete screen/state unions covering identity, agent setup, apply execution, attention, application management, passport, connections, security, profile, and membership.
- [ ] Add Microsoft, Google, NVIDIA, and Amazon mock jobs with separate `match` and `readiness` values.
- [ ] Add application timeline events that visibly prove automated work.
- [ ] Add reusable answer-memory and connection data.
- [ ] Commit.

### Task 2: Build reusable OneClick UI primitives

**Files:**
- Create: `src/oneclick/ui.tsx`

**Interfaces:**
- Consumes: product types from `types.ts`.
- Produces: `Logo`, `Button`, `Pill`, `Card`, `Field`, `Choice`, `ProgressBar`, `TopBar`, `AppShell`, `StatusRow`, `Timeline`, `ScreenHeader`, `Metric`.

- [ ] Implement 44px+ touch targets and rounded mobile-first surfaces.
- [ ] Implement desktop sidebar plus mobile bottom navigation.
- [ ] Implement reusable status and timeline visual language.
- [ ] Commit.

### Task 3: Build Journey 1 — account and Career Passport

**Files:**
- Create: `src/oneclick/screens/OnboardingScreens.tsx`

**Interfaces:**
- Consumes: `ScreenId`, shared UI components.
- Produces screen components for Welcome, Create Account, Verify Contact, Career Passport Entry, Resume Upload, Resume Analysis, Extracted Data Review, Gap Analysis, Work Authorization, Job Preferences, Reusable Answers, Sensitive Question Policy, Passport Ready.

- [ ] Implement resume-first entry with Professional Profile import and manual fallback.
- [ ] Implement visible extraction progress and extracted-data review.
- [ ] Implement gap-analysis value moment.
- [ ] Implement immigration trust copy and reusable-answer education.
- [ ] Commit.

### Task 4: Build Journey 2 — activate OneClick

**Files:**
- Create: `src/oneclick/screens/AgentSetupScreens.tsx`

**Interfaces:**
- Produces screens for Activate Agent, Private Browser, Browser Ready, Gmail Connection, Google Handoff, Email Connected, Notification Setup, OneClick Ready.

- [ ] Show Career Passport, browser, and email as distinct capabilities.
- [ ] Explain Gmail access in consumer language and clearly show what is not allowed.
- [ ] Show push as primary notification channel and SMS as fallback.
- [ ] End with a strong “Application Agent Ready” activation moment.
- [ ] Commit.

### Task 5: Build Journey 3 — job inspection and authorization

**Files:**
- Create: `src/oneclick/screens/JobScreens.tsx`

**Interfaces:**
- Consumes: `jobs` and shared UI.
- Produces Home, Jobs, Job Detail, Application Inspection, Missing Answers, Quick Confirmation, Ready for OneClick.

- [ ] Make Home attention-first rather than feed-first.
- [ ] Keep match and readiness visually distinct.
- [ ] Show inspection before application authorization.
- [ ] Ask only missing information and optionally remember it.
- [ ] Make `Apply with OneClick` the final authorization action.
- [ ] Commit.

### Task 6: Build Journey 4 — execution and interruptions

**Files:**
- Create: `src/oneclick/screens/ExecutionScreens.tsx`

**Interfaces:**
- Produces Running, Automatic Verification Activity, Unknown Question, Sensitive Decision, Human Verification, Secure Application Session, Employer Login, Application Paused, Submitted.

- [ ] Make normal automation calm and backgroundable.
- [ ] Represent automatic Gmail verification as timeline activity, not a manual OTP form.
- [ ] Give sensitive questions a separate trust treatment.
- [ ] Provide a secure-browser handoff mock for login and human verification.
- [ ] Quantify completed work on submission success.
- [ ] Commit.

### Task 7: Build Journey 5 — management, memory, trust, value

**Files:**
- Create: `src/oneclick/screens/ManagementScreens.tsx`

**Interfaces:**
- Produces Applications, Application Detail, Attention Center, Career Passport, Answer Memory, Changed Answer Protection, Documents, Connected Services, Security, Profile, Membership.

- [ ] Implement useful application status tabs and timeline.
- [ ] Make Attention Center action-oriented with estimated effort.
- [ ] Show how answer memory is reused and where it came from.
- [ ] Show future-only behavior for changed answers.
- [ ] Show connections, privacy, security, and monthly value metrics.
- [ ] Commit.

### Task 8: Wire the complete state-machine prototype

**Files:**
- Create: `src/oneclick/OneClickApp.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes all journey screen modules.
- Produces one navigable prototype with forward/back transitions and signed-in navigation.

- [ ] Define the screen routing table and next/back behavior.
- [ ] Allow Home, Jobs, Applications, Career Passport, and Profile navigation after activation.
- [ ] Add a small prototype screen picker in Profile for fast design review of every screen.
- [ ] Update `src/App.tsx` to render `OneClickApp`.
- [ ] Commit.

### Task 9: Verify build and deployment readiness

**Files:**
- Verify: `package.json`, `vercel.json`, `.github/workflows/oneclick-build.yml`

- [ ] Confirm `vercel.json` builds Vite and outputs `dist`.
- [ ] Trigger GitHub build via branch push.
- [ ] Check the branch is ahead of `main` and not behind.
- [ ] Inspect GitHub Actions build status/logs.
- [ ] Inspect Vercel project/deployment through connector if the project is exposed; otherwise report that limitation and use the exact Git-triggered preview URL only when verifiable.
