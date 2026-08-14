# OneClick Communication Layer — Design Spec

## Goal
Extend the existing OneClick 47-screen prototype so the product behaves like a premium personal application agent rather than a disconnected screen gallery.

## Approved Product Direction
Telegram is a first-class optional attention channel alongside Apply Wizz push notifications and SMS fallback.

OneClick may send normal factual questions to Telegram using quick actions such as Yes / No / I'm unsure. Sensitive questions never expose the full response decision in Telegram; they always deep-link the candidate back into the secure OneClick experience.

## Product Rule
Before Apply, OneClick removes uncertainty. After Apply, OneClick removes work.

## Scope

### 1. Persistent onboarding navigation
All onboarding / setup screens after the first choice screen expose a consistent Back action.

Back navigation must preserve user progress. Going back from resume extraction must not force the candidate to upload the resume again.

### 2. Communication setup
The existing notification setup becomes a broader "How OneClick can reach you" step.

Channels:
- Apply Wizz Push — recommended, enabled by default in the mock
- SMS fallback — optional fallback
- Telegram — optional direct-response channel

### 3. Telegram connection screen
Add a dedicated Telegram connection state with:
- Telegram icon / identity
- Explanation of what OneClick can send
- Connect Telegram CTA
- One-time pairing explanation
- Mock "Open Telegram" step
- Mock successful connected state

Connection copy must make clear that Telegram is optional and used only for application-related attention requests and outcomes.

### 4. Telegram answer interaction
Add a visual mobile screen showing a realistic Telegram-style OneClick bot message:

Apply Wizz needs one answer
Amazon — SDE Intern
Are you currently bound by a non-compete agreement?

Buttons:
- Yes
- No
- I'm unsure

After selection, the mock message updates to:
"Answered: No — OneClick resumed your Amazon application."

This is a visual product simulation only; no Telegram bot or backend is implemented in this frontend phase.

### 5. Sensitive-question routing
Sensitive questions use Telegram only as an alert:

"Your decision is required"
Microsoft has asked a sensitive application question.
[Review securely]

The CTA returns the user to the existing in-app sensitive-question screen.

### 6. Attention Router mental model
The prototype should visually communicate that an application interruption can route to:
- in-app card if the user is active
- push notification
- Telegram direct action for normal factual questions
- SMS fallback for urgent no-response cases

Normal automation remains invisible when it succeeds.

### 7. phone-harness role
`ShawnPana/phone-harness` is a development / QA aid only.

It is not part of the customer architecture. It can later be used to test the mobile review flow on a real iPhone through macOS iPhone Mirroring.

## UX Additions

### Screen: How OneClick can reach you
Replace the existing notification-only framing with three connection cards and a concise explanation that OneClick only interrupts for meaningful events.

### Screen: Connect Telegram
Show pairing flow and permissions in consumer language.

### Screen: Telegram connected
Show account connected and what types of actions are allowed.

### Screen: Telegram quick answer preview
Show a realistic mobile messaging conversation with Yes / No / I'm unsure quick actions and a resumed-application confirmation state.

### Screen: Telegram sensitive alert preview
Show "Review securely" instead of exposing sensitive answer buttons.

## Navigation
The normal end-to-end journey remains linear, but the prototype navigator must allow direct review of the new communication screens.

## State Preservation
Mock state should preserve:
- resume uploaded
- extraction completed
- Gmail connected
- Telegram connected
- push enabled
- SMS enabled
- prior factual answer selection

## Error / Edge States
Telegram connection mock may show:
- not connected
- connecting
- connected
- disconnected

The frontend does not simulate real bot authentication failures in this phase.

## Mobile-first requirements
- All controls >= 44px tap target
- No desktop-only dependency
- Telegram interaction presented at phone width
- Back actions visible and reachable on every onboarding/setup screen

## Non-goals
- No live Telegram Bot API integration yet
- No live SMS provider integration yet
- No real push notification service yet
- No real phone-harness automation in production
- No backend changes
- No CAPTCHA bypass or automated human-verification solving

## Acceptance Criteria
1. User can navigate backward from resume extraction without losing progress.
2. Communication setup clearly shows Push, SMS and Telegram.
3. Telegram connection and connected states are visible in the prototype.
4. A normal factual question can be previewed as Yes/No from a Telegram-style screen.
5. A sensitive question routes back to OneClick via Review securely.
6. Existing application journey remains intact.
7. Production build succeeds.
8. Changes remain on `oneclick-mobile-mockup`; `main` stays untouched until explicit approval.
