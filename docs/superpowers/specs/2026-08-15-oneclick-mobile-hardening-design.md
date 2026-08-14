# OneClick Mobile Hardening — Design Spec

## Product Rule
Mobile is the primary OneClick product. Desktop is the responsive companion.

If a OneClick task cannot be completed comfortably with one hand on a phone, the screen is not finished.

## Goal
Harden the complete OneClick prototype so every journey is designed, navigable, readable, and operable first on mobile, while remaining responsive on tablet and desktop.

## Scope
Applies to the complete current prototype, including the original 47-screen product flow plus the communication-layer screens added for Telegram and secure attention routing.

## Breakpoints and Review Widths
Every screen must be checked at:
- 375 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1440 px

Mobile behavior is authoritative. Desktop adaptations must not introduce features or interactions that are unavailable on mobile.

## Global Mobile Shell

### Header
- Consistent Apply Wizz identity.
- Back action visible on onboarding/setup screens where the user can move backward.
- Back never silently discards entered or extracted state.
- Header height and tap targets support one-handed use.

### Bottom Navigation
Signed-in mobile navigation uses:
- Home
- Jobs
- Applications
- Profile

Career Passport remains reachable through Profile for this prototype, with room to become first-class navigation later.

### Primary Actions
- Primary CTA sits near the bottom of the mobile viewport when practical.
- Long screens use a sticky action area where this improves task completion.
- Safe-area padding must protect the iPhone home indicator.
- Primary CTA and Back must remain distinct and easy to tap.

### Tap Targets
All interactive controls are at least 44x44 px.

### Typography
- No desktop-scale headings that dominate a phone viewport.
- Headings wrap naturally without clipping.
- Body text remains readable without zooming.
- Secondary metadata must not become tiny to fit desktop density.

### Layout
- No horizontal scrolling.
- Desktop grids collapse into vertical mobile stacks.
- Tables become cards/lists where needed.
- Cards use mobile-appropriate padding and radius.
- Important content must not depend on hover.

### Forms and Keyboard
- Inputs remain visible above the software keyboard.
- Focused fields must not be covered by sticky CTAs.
- Forms are broken into digestible sections rather than one long enterprise-style form.
- Choice controls are large enough to tap accurately.

### Modals and Sheets
- Desktop dialogs adapt to full-screen sheets or bottom sheets on phones where appropriate.
- Critical actions must never be trapped in a tiny centered modal on mobile.

## Journey Hardening

### Journey 1 — Account + Career Passport
Screens 01–13.

Requirements:
- Welcome value proposition fits within mobile viewport without losing CTA visibility.
- Account creation provider buttons stack vertically.
- Resume source choice cards are full-width and thumb-friendly.
- Resume upload works as a large mobile picker target.
- Extraction screen exposes Back and preserves uploaded/extracted state.
- Review sections become stacked editable cards.
- Gap analysis clearly separates completed and missing facts.
- Work authorization choices never require horizontally cramped controls.
- Preferences and answer-memory screens use stacked fields/choices.
- Career Passport Ready screen communicates progress without dense dashboards.

### Journey 2 — OneClick Agent Setup + Communications
Screens 14–21 plus Telegram/communications screens.

Requirements:
- Application Browser setup is explainable and operable from phone.
- Gmail connection and Google handoff are mobile-first.
- Communications clearly show Push, SMS fallback, and Telegram.
- Telegram connect, connected, factual quick-answer, and sensitive-alert previews are phone-width experiences.
- Sensitive questions always route back to secure OneClick.
- OneClick Ready screen has a strong single primary CTA and clear readiness checklist.

### Journey 3 — Job → Ready → Apply
Screens 22–28.

Requirements:
- Home prioritizes Needs Your Attention before recommendations.
- Job cards stack cleanly and show Match and Readiness separately.
- Job Detail avoids two-column compression on mobile.
- Pre-inspection progress is readable without requiring desktop width.
- Missing questions appear one at a time or in a short vertical sequence.
- Final authorization makes Apply with OneClick the dominant action.
- No redundant confirmation after authorization.

### Journey 4 — Execution + Human Interruptions
Screens 29–36.

Requirements:
- Running application timeline is calm and readable on a phone.
- User can safely leave the screen while the application continues.
- Normal factual interruptions support fast mobile answering.
- Sensitive questions use a distinct visual treatment.
- Human verification and employer login launch a phone-usable secure browser handoff.
- No instruction should require a laptop.
- Failure recovery uses clear mobile actions.
- Submission success quantifies OneClick work completed.

### Journey 5 — Applications + Management
Screens 37–47.

Requirements:
- Application filters become horizontally scrollable pills or a compact mobile selector, not a compressed desktop tab bar.
- Application timeline is a vertical activity feed.
- Attention Center sorts urgent human-required tasks first.
- Career Passport management uses stacked sections.
- Answer Memory exposes current answer, usage count, source, and edit action without tables.
- Documents use mobile cards.
- Connected Services and Security use large setting rows.
- Membership screen emphasizes monthly value metrics in stacked cards.

## Prototype Review Navigator
The current floating Review screens control must become mobile-friendly.

On phone:
- Opens as a bottom sheet or full-screen sheet.
- Journey groups are clearly separated.
- Screen targets are at least 44 px high.
- Current screen is obvious.
- Closing the navigator returns to the same screen/state.

On desktop:
- Existing modal-style review navigator may remain if responsive and readable.

## Persistent State
Mobile navigation must preserve relevant mock state, including:
- resume uploaded
- extraction completed
- Career Passport answers
- Gmail connected
- Telegram connected
- push enabled
- SMS enabled
- Telegram factual answer
- application progress/interruption state

Back navigation must never unexpectedly reset these values.

## Error and Edge Cases
Every critical journey must have a mobile-safe treatment for:
- loading
- empty state
- validation error
- connection skipped
- disconnected service
- session expired
- employer site failure
- human verification required
- login required
- unknown factual question
- sensitive decision required

## Accessibility
- Minimum 44x44 px tap targets.
- Visible focus states.
- Sufficient contrast.
- Controls have accessible names.
- Important meaning is not communicated by color alone.
- Text remains usable at browser zoom and larger system text where practical.

## Non-Goals
- No native iOS/Android rewrite in this pass.
- No live Telegram Bot API.
- No live SMS provider.
- No real push provider.
- No production cloud-browser backend.
- No phone-harness production dependency.
- No merge to main without explicit user approval.

## QA Strategy
A screen is only complete when it passes:
1. mobile layout
2. mobile interaction
3. state transition
4. Back behavior
5. loading/error handling where relevant
6. desktop/tablet adaptation

End-to-end mobile flows to verify:
- Resume → Extraction → Review → Passport Ready
- Browser → Gmail → Communications → Telegram → Agent Ready
- Job → Inspect → Missing Answers → 10/10 Ready → Apply
- Running → factual answer / sensitive question / login / human verification → resume
- Applications → Attention Center → Career Passport → Connections → Security → Membership

## Acceptance Criteria
1. All current OneClick screens render without horizontal overflow at 375 px.
2. All primary interactive controls meet 44x44 px minimum targets.
3. Every onboarding/setup screen with a previous state has a visible Back action.
4. Back preserves mock state rather than restarting the journey.
5. No flow requires desktop-only behavior.
6. Job Match and Application Readiness remain distinct and readable on phone.
7. Telegram communication screens are optimized for phone width.
8. Secure browser/human verification handoff is understandable on mobile.
9. Review navigator is usable on phone.
10. Vite production build succeeds.
11. CI validation succeeds.
12. Changes remain on `oneclick-mobile-mockup` until explicit approval to merge.
