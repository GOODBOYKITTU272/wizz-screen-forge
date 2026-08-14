# OneClick 47-Screen Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, fully responsive, frontend-only OneClick prototype covering all 47 approved screens and the complete candidate journey from account creation through application submission, tracking, Career Passport management, security, connections and subscription value.

**Architecture:** Keep the existing Vite + React + TypeScript + Tailwind stack. Replace the earlier monolithic prototype with a small data-driven flow model, reusable UI primitives and one responsive screen renderer. All integrations and application execution are deterministic mock states so the entire story is clickable without a backend.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS, lucide-react.

## Global Constraints
- Mobile-first; no user journey may require a desktop.
- Full responsive support at 375, 430, 768, 1024 and 1440 px.
- Use Apply Wizz colors and rounded visual language from the approved design.
- Keep Match and Application Readiness visually and semantically separate.
- Final `Apply with OneClick` click is the authorization; do not add a redundant confirmation.
- Routine Gmail verification is simulated as invisible automation and timeline activity, not a routine OTP-entry screen.
- Sensitive/legal/demographic/ambiguous immigration answers are never auto-inferred.
- Human verification is simulated as a secure handoff, never as CAPTCHA bypass.
- Frontend mock only: no backend, real OAuth, Gmail reads, ATS automation, browser workers, payments or credential storage.

---

### Task 1: Flow model and validation

**Files:**
- Create: `src/oneclick/flow.ts`
- Create: `scripts/validate-oneclick-flow.mjs`

**Interfaces:**
- Produces: `ScreenId`, `ScreenDefinition`, `screens`, `screenOrder`, `nextScreen(id)`, `previousScreen(id)`.
- Validation script must assert exactly 47 unique screens, valid next/previous references and presence of all five journeys.

- [ ] **Step 1: Add the flow validation script first**

The script must fail unless `src/oneclick/flow.ts` contains all 47 screen IDs and each journey boundary.

- [ ] **Step 2: Run validation and confirm failure**

Run: `node scripts/validate-oneclick-flow.mjs`
Expected: non-zero exit because the flow file does not exist yet.

- [ ] **Step 3: Implement the typed flow model**

Define the 47 screen IDs in approved order and metadata for journey, title, eyebrow, description and state category.

- [ ] **Step 4: Run validation**

Run: `node scripts/validate-oneclick-flow.mjs`
Expected: exit 0 with `47 screens validated`.

- [ ] **Step 5: Commit**

Commit message: `feat: add OneClick 47-screen flow model`

---

### Task 2: Design primitives and shell

**Files:**
- Create: `src/oneclick/ui.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `BrandLogo`, `PrimaryButton`, `SecondaryButton`, `Pill`, `ProgressBar`, `Metric`, `PageShell`, `AppShell`, `BottomNav`, `DesktopRail`, `SectionCard`, `ChoiceCard`, `StatusRow`.

- [ ] **Step 1: Create reusable primitives with semantic buttons and 44px minimum targets**
- [ ] **Step 2: Add Apply Wizz CSS tokens and responsive helpers to `src/index.css`**
- [ ] **Step 3: Verify TypeScript build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit**

Commit message: `feat: add OneClick responsive design system`

---

### Task 3: Journey 1 and Journey 2 screens

**Files:**
- Create: `src/oneclick/OnboardingScreens.tsx`
- Create: `src/oneclick/AgentSetupScreens.tsx`

**Interfaces:**
- Consumes: `ScreenId` and UI primitives.
- Produces: `renderOnboardingScreen(id, ctx)` for screens 01–13 and `renderAgentSetupScreen(id, ctx)` for screens 14–21.

- [ ] **Step 1: Build account, Career Passport entry, resume upload/extraction/review, gap analysis, work authorization, preferences, reusable answers, sensitive-answer trust and Passport Ready screens**
- [ ] **Step 2: Build agent activation, private application browser, Gmail explanation, mock Google permission, email-connected, notifications and OneClick-ready screens**
- [ ] **Step 3: Ensure Resume Upload is the primary recommended Career Passport path while Import Professional Profile and Build From Scratch remain available**
- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 5: Commit**

Commit message: `feat: build OneClick onboarding and agent setup journeys`

---

### Task 4: Journey 3 and Journey 4 screens

**Files:**
- Create: `src/oneclick/ApplicationScreens.tsx`
- Create: `src/oneclick/InterruptionScreens.tsx`

**Interfaces:**
- Produces: screens 22–36 with callbacks for navigation and mock state updates.

- [ ] **Step 1: Build Home, Jobs, Job Detail, application inspection, missing answers, quick confirmation and Ready for OneClick**
- [ ] **Step 2: Build application-running timeline and simulate invisible automatic email verification**
- [ ] **Step 3: Build unknown question, sensitive decision, human verification, secure browser session, login-required and recoverable failure screens**
- [ ] **Step 4: Build submission success with automation-value metrics**
- [ ] **Step 5: Run flow validation and build**

Run: `node scripts/validate-oneclick-flow.mjs && npm run build`
Expected: both exit 0.

- [ ] **Step 6: Commit**

Commit message: `feat: build OneClick application execution journeys`

---

### Task 5: Journey 5 screens and final orchestration

**Files:**
- Create: `src/oneclick/AccountScreens.tsx`
- Replace: `src/OneClickPrototype.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- `OneClickPrototype` owns current screen, demo state and screen transitions.
- Journey 5 renders Applications, Timeline, Attention Center, Career Passport, Answer Memory, changed-answer protection, Documents, Connected Services, Security, Profile and Membership.

- [ ] **Step 1: Build screens 37–47**
- [ ] **Step 2: Wire all 47 screens into the prototype orchestrator**
- [ ] **Step 3: Add a developer-only screen navigator drawer so review can jump to any screen without breaking the normal flow**
- [ ] **Step 4: Verify back/next transitions and mobile nav destinations**
- [ ] **Step 5: Run validation and production build**

Run: `node scripts/validate-oneclick-flow.mjs && npm run build`
Expected: both exit 0.

- [ ] **Step 6: Commit**

Commit message: `feat: complete OneClick 47-screen responsive prototype`

---

### Task 6: Deployment and verification

**Files:**
- Verify: `vercel.json`
- Verify: `.github/workflows/oneclick-build.yml`

**Interfaces:**
- Git branch: `oneclick-mobile-mockup`
- Preview target: Vercel preview deployment.

- [ ] **Step 1: Confirm GitHub branch is ahead of main and not behind**
- [ ] **Step 2: Confirm GitHub Actions build on the final commit**
- [ ] **Step 3: Deploy a Vercel preview and capture the live URL**
- [ ] **Step 4: Fetch the live URL and verify it returns the OneClick prototype rather than the old placeholder**
- [ ] **Step 5: Report the live mobile URL and keep `main` unchanged until visual approval**
