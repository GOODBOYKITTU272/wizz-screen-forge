# OneClick Communication Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the current OneClick frontend prototype with persistent Back navigation and state, Push/SMS/Telegram communication setup, Telegram connect/connected/quick-answer/sensitive-alert review screens, while preserving the existing application journey.

**Architecture:** Keep the existing React/Vite prototype and screen-renderer pattern. Add communication-state to `OneClickApp`, pass it through `ScreenCtx`, extend the screen registry with focused communication screens, and update the setup/attention screens to route through the new states. No backend, Telegram API, SMS provider, or production phone automation is added.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS, lucide-react.

## Global Constraints

- Branch: `oneclick-mobile-mockup`; do not modify `main`.
- Mobile-first; all tap targets >= 44px.
- Back actions visible on onboarding/setup screens and must preserve mock state.
- Telegram is optional and may answer normal factual questions with Yes / No / I'm unsure.
- Sensitive questions use Telegram only as an alert and route to secure in-app review.
- `ShawnPana/phone-harness` is QA/development only, not customer architecture.
- No live Telegram Bot API, SMS, push service, backend, CAPTCHA bypass, or production phone automation.

---

### Task 1: Extend the screen registry and shared prototype state

**Files:**
- Modify: `src/oneclick/flow.ts`
- Modify: `src/oneclick/OnboardingScreens.tsx`
- Modify: `src/oneclick/OneClickApp.tsx`
- Modify: `scripts/validate-oneclick-flow.mjs`

**Interfaces:**
- Produces `PrototypeState` with `resumeUploaded`, `extractionComplete`, `gmailConnected`, `telegramConnected`, `pushEnabled`, `smsEnabled`, `telegramAnswer`.
- Extends `ScreenCtx` with `state` and `setState(patch)`.
- Adds communication screen IDs/titles to the registry while preserving linear next/back order.

- [ ] Add new communication screen IDs for Connect Telegram, Telegram Connected, Telegram Quick Answer, Telegram Sensitive Alert.
- [ ] Add `PrototypeState` in `OneClickApp` and pass it through `ScreenCtx`.
- [ ] Update `ScreenCtx` typing and navigation helpers without breaking existing renderers.
- [ ] Update the validator to assert the new expected screen count and all IDs are unique.
- [ ] Run `node scripts/validate-oneclick-flow.mjs` and confirm PASS.
- [ ] Commit with `feat: add communication flow state and screens`.

### Task 2: Fix onboarding Back navigation and preserve progress

**Files:**
- Modify: `src/oneclick/OnboardingScreens.tsx`
- Modify: `src/oneclick/ui.tsx` if a reusable compact Back header control is needed.

**Interfaces:**
- Back from extraction returns to resume upload while retaining `resumeUploaded=true` and `extractionComplete=true`.
- Resume upload screen reflects already-uploaded state when revisited.

- [ ] Add visible Back action to extraction and every onboarding/setup page that currently lacks one.
- [ ] On resume upload CTA, set `resumeUploaded=true` before moving forward.
- [ ] On extraction completion/review, set `extractionComplete=true`.
- [ ] When revisiting resume upload after Back, show the selected resume and a `Continue with this resume` action instead of forcing re-upload.
- [ ] Verify manually: `s05 -> s06 -> Back -> s05 -> forward` retains resume state.
- [ ] Commit with `fix: preserve onboarding progress on back navigation`.

### Task 3: Replace notification-only setup with communication channels

**Files:**
- Modify: `src/oneclick/AgentSetupScreens.tsx`

**Interfaces:**
- `How OneClick can reach you` screen manages Push, SMS fallback, and Telegram state.
- Telegram card routes to Connect Telegram.

- [ ] Rename/reframe the current notification setup to `How OneClick can reach you`.
- [ ] Add Push card with recommended/default-on state.
- [ ] Add SMS fallback card with default-on mock state.
- [ ] Add Telegram card showing `Not connected` or `Connected` from state.
- [ ] Add a concise Attention Router explanation showing in-app, push, Telegram direct action, and SMS fallback.
- [ ] Commit with `feat: add communication channel setup`.

### Task 4: Build Telegram connect and connected screens

**Files:**
- Modify: `src/oneclick/AgentSetupScreens.tsx`

**Interfaces:**
- Connect Telegram CTA moves through a visual pairing state.
- Successful pairing sets `telegramConnected=true`.

- [ ] Build a phone-width Telegram connect screen explaining one-time pairing in consumer language.
- [ ] Add `Open Telegram` mock action and pairing illustration/status.
- [ ] Build connected state showing masked Telegram identity and allowed application-related actions.
- [ ] Add Disconnect mock control that sets `telegramConnected=false`.
- [ ] Keep Telegram optional and clearly labeled as such.
- [ ] Commit with `feat: add Telegram connection flow`.

### Task 5: Build Telegram quick-answer and sensitive-alert previews

**Files:**
- Modify: `src/oneclick/ExecutionScreens.tsx`
- Modify: `src/oneclick/ManagementScreens.tsx` if Attention Center links are updated.

**Interfaces:**
- Normal factual question supports `Yes`, `No`, `I'm unsure` and updates `telegramAnswer`.
- Sensitive alert exposes only `Review securely`, routing to existing sensitive-question screen.

- [ ] Build realistic Telegram-style message preview for Amazon SDE Intern factual question.
- [ ] Add three >=44px quick-action buttons.
- [ ] After selecting `No`, show `Answered: No — OneClick resumed your Amazon application.` and persist `telegramAnswer='No'`.
- [ ] Build sensitive Telegram alert: `Your decision is required` + `Review securely`.
- [ ] Route `Review securely` to the existing in-app sensitive question screen.
- [ ] Add entry points from Attention Center / execution preview so both Telegram screens are discoverable naturally.
- [ ] Commit with `feat: add Telegram answer and secure review previews`.

### Task 6: Update connected-services transparency

**Files:**
- Modify: `src/oneclick/ManagementScreens.tsx`

**Interfaces:**
- Connected Services reflects Gmail, Telegram, Push, SMS, Application Browser using shared state.

- [ ] Add Telegram to Connected Services with current state and allowed actions.
- [ ] Show Push and SMS states from shared state rather than fixed copy.
- [ ] Keep Gmail and Application Browser status visible.
- [ ] Add copy clarifying sensitive decisions stay inside OneClick.
- [ ] Commit with `feat: surface communication connections in settings`.

### Task 7: Update preview navigator and review build

**Files:**
- Modify: `src/oneclick/OneClickApp.tsx`
- Modify: `preview/index.html`

**Interfaces:**
- Prototype Navigator lists all new communication screens.
- Mobile review build mirrors the new communication journey and Back behavior.

- [ ] Ensure navigator groups and labels include new communication screens.
- [ ] Update the static mobile review preview with Back controls and Telegram communication screens.
- [ ] Verify Previous/Next/All Screens controls still work.
- [ ] Commit with `feat: refresh mobile review flow`.

### Task 8: CI verification and deployment

**Files:**
- Modify: `.github/workflows/oneclick-build.yml` only if screen-count validation command needs adjustment.

**Interfaces:**
- CI validates the new screen registry and completes Vite build.
- Vercel receives a fresh preview deployment.

- [ ] Run/trigger `node scripts/validate-oneclick-flow.mjs` through GitHub Actions.
- [ ] Run/trigger `npm run build` through GitHub Actions.
- [ ] Confirm both steps conclude `success` for the final commit.
- [ ] Deploy the updated preview to Vercel project `applywizz-oneclick-mockup` targeting preview.
- [ ] Return the exact `*.vercel.app` URL and deployment ID for mobile review.
