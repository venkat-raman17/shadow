# Retention & usage in Partwise

A short research note on how to help people *keep using* Partwise without
betraying what it is. Partwise is a private, on-device space for slow inner work
(Jungian / IFS). Its promises are load-bearing: **nothing leaves the device, no
accounts, no AI, no analytics, and — explicitly — no streaks, no finishing, no
nagging.** Any retention work has to live inside those promises, or it isn't
Partwise anymore.

This note surveys how comparable apps drive retention, sorts those mechanisms
into "fits our ethos" vs. "rejects our ethos," and records the local-only
approach we actually shipped.

---

## The tension

The standard mobile-retention playbook is, almost entirely, off-limits here:

- It assumes a **server** that sees behavior (DAU/WAU, funnels, cohorts).
  Partwise has no backend and stores everything encrypted on-device.
- It leans on **habit loops and pressure** (streaks, badges, "you're on a
  7-day roll!", loss-aversion push). Partwise's whole stance is "you return when
  you return." A streak counter would actively contradict the product.
- It optimizes for **time-in-app and frequency**. For a contemplative tool,
  more sessions is not the goal — the *right* session at the right moment is.

So the useful question isn't "how do we maximize engagement," it's: **when
someone does open Partwise, how do we make it effortless to continue the inner
work they'd already started — and gentle to come back after a gap?**

---

## What comparable apps do, and whether it fits

| Mechanism | Seen in | Fits Partwise? | Why |
|---|---|---|---|
| Streaks / "don't break the chain" | Duolingo, Finch, Headspace | **No** | Directly contradicts "no streaks, no finishing." Manufactures guilt. |
| Badges / achievements / levels | Finch, Habitica | **No** | Gamifies an inner process that shouldn't be scored. |
| Variable-reward / surprise loops | Most social, some wellness | **No** | Engineered compulsion; antithetical to slow, intentional work. |
| Social proof ("12k people meditated today") | Calm, Headspace | **No** | There is no social layer, and there shouldn't be. Also implies a server. |
| Behavioral analytics to target nudges | ~everyone | **No** | Breaks "nothing leaves the device." Not negotiable. |
| Aggressive re-engagement push ("We miss you!") | Many | **No** | Absence-shaming. The opposite of an open door. |
| **Gentle daily reminder, opt-in, no pressure** | Stoic, Day One | **Yes** | Already shipped (`src/lib/notifications.ts`): off by default, invitational copy, never references absence. |
| **Resurfacing past entries** ("On this day", "you wrote…") | Day One, Stoic | **Yes** | Pull-only, reflective, deepens the journal rather than gamifying it. Already present. |
| **Continuity / "pick up where you left off"** | Notion, Bear, good editors | **Yes** | Lowers the cost of continuing real work. The single biggest lever we have. |
| **Progressive disclosure** (reveal depth as you go) | Onboarding-heavy apps | **Yes** | Already the spine (Notice → Sit → Carry → Ground); keeps a newcomer from drowning. |
| **Local, private insights** (your own patterns over time) | How We Feel, Day One | **Yes, carefully** | Fine while it stays on-device and stays *descriptive* ("what keeps surfacing"), never a *score*. Already present as surfacing patterns. |
| **Titration after a gap** (ease back in, don't pile on) | (rare; therapeutic principle) | **Yes** | Matches the app's clinical instincts ("settle before depth"). Newly added. |

The pattern: everything that treats the user as a metric to be maximized is out;
everything that treats them as a person resuming meaningful work is in.

---

## Principles we adopted

1. **Continuity over frequency.** Help people *continue*, don't push them to
   *return more often*. A returning user should land on a thread to pick back
   up, not a blank prompt.
2. **Pull, never push (beyond the opt-in reminder).** Re-engagement surfaces
   load when the user opens the app; nothing chases them.
3. **Titrate by gap, never guilt.** After a long absence, lead with
   low-friction re-entry (settle, a short noticing). Never show "you've been
   away N days" or any day-count.
4. **Descriptive, never a score.** Local awareness can color *tone*; it must
   never become a number the user is measured against.
5. **Always dismissible, never persistent.** Every nudge can be waved away and
   doesn't nag.
6. **On-device, full stop.** No new data leaves the device. The only thing we
   newly remember is a single "last opened" timestamp, in the existing
   encrypted secure store.

---

## What we shipped against this note

- **One "pick back up" card on Home** (`src/app/(tabs)/index.tsx`). It chooses a
  single most-relevant next step along the Notice → Sit → Carry loop from
  signals the app already had — an open experiment ready to reflect on, a part
  to return to, a recurring quality to sit with, or a past reflection to revisit
  — and shows it as one calm, dismissible card *above* the threshold. This
  consolidates nudges that were previously scattered between Home and
  Reflections.
- **Gap titration** (`src/lib/usage.ts`, `useDaysSinceLastVisit`). We remember
  only the last-opened timestamp, locally. After a long gap (≥14 days) the
  pick-back-up card becomes an "ease back in" invitation (settle, then start
  wherever you are) instead of deeper work; a moderate gap (≥7 days) adds a soft
  "Welcome back — no need to catch up." No counts are ever shown.
- **One coherent depth spine.** Notice → Sit → Carry → Ground is now defined
  once (`DEPTHS` in `src/lib/practices.ts`) and shared by the Practices browser
  and Home, and the "which flow comes next" decision lives in one router
  (`suggestFlow` in `src/lib/threshold.ts`) instead of being split across
  screens. Easier to reason about, and the place future retention logic plugs
  into.

We deliberately did **not** add streak counters, badges, absence-shaming push,
analytics, or any server. Those would raise short-term engagement metrics and
quietly dismantle the reasons someone would trust Partwise with this kind of
material.

---

## Future-safe backlog (all on-device, all gentle)

- **"On this day"–style resurfacing** by date proximity, not just age, for users
  with a long history.
- **A private, descriptive year-in-review / patterns view** the user opens
  deliberately — emotion-quality weather over time — framed as a mirror, never a
  report card. (Builds on `getSurfacingPatterns`.)
- **Smarter reminder timing** derived locally from when the user actually tends
  to open the app, still opt-in, still fixed gentle copy. (Note: the current
  `DAILY` notification trigger repeats fixed content, so true per-day copy
  rotation would require rescheduling — low value, skipped for now.)
- **A soft "close the loop" nudge** when a Sit session has produced no Carry
  experiment after a while — surfaced in-app, dismissible.
- **Re-onboarding for returners** after a very long gap: a one-screen, skippable
  reminder of how the three depths work, instead of assuming they remember.

If a future idea needs a server, a streak, a badge, or any data leaving the
device to work, that's the signal it doesn't belong in Partwise.
