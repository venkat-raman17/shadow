import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'steady',
    title: 'The body & staying steady',
    subtitle: 'Working at a pace your body can hold',
    blurb: 'Working at a pace your nervous system can hold.',
    spine: 'muted',
    cover: 'pendulum',
    chapters: ['grounding-and-when', 'titration-and-the-window', 'when-something-spikes'],
    match: {
      qualities: ['tightness', 'heaviness', 'numbness', 'restlessness', 'anxiety', 'fear'],
      flowIds: ['somatic', 'grounding', 'body_scan', 'urge_surf', 'tipp', 'rain', 'defusion', 'draw_whats_here'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'grounding-and-when',
    title: 'Coming back to steady',
    blurb: 'When to step back from the depths — and how.',
    cover: 'roots-mountain',
    icon: 'roots-mountain',
    body: `Depth work only lands inside a certain range — activated, but still present. Too flooded and nothing integrates; too shut down and nothing’s even reachable. **Grounding** is how you come back to that range.

It isn’t avoidance. In the somatic tradition, returning to the breath, the feet, the room, or a steady image is part of the method, not a retreat from it — it’s how you build the capacity to stay present with hard things.

~ roots-mountain | steadiness isn’t the absence of weather — it’s having roots

Slowing the breath, scanning the body, riding out an urge, cold water or movement when the dial is very high: all of it brings you back through the body, into the present. It helps to find your anchor first — a place, person, animal, or memory that lets your shoulders drop even a little — before you go anywhere near a charge. The anchor is what makes touching the edge survivable. It isn’t cheating; it’s the ground you stand on.

> Steadying yourself isn’t a step you have to earn. It’s always there.

There’s one clear rule. If a practice starts to increase panic, dissociation, numbness you can’t come out of, or urges to harm yourself, that’s not a sign to push harder.

[note] Those signs mean: stop the inner work, ground, and reach toward an actual person. A reflective app is not therapy and is not built for crisis. The Support screen has crisis lines.`,
  },
  {
    id: 'titration-and-the-window',
    title: 'A little at a time',
    blurb: 'The window of tolerance, and why slow is the safe way.',
    cover: 'little-at-a-time',
    icon: 'little-at-a-time',
    body: `Your nervous system can metabolize difficult material only within a band — awake and feeling, yet still able to think and stay present. The psychiatrist Dan Siegel named this band the **window of tolerance**. Above it is hyperarousal (racing, panicky, can’t-settle); below it is hypoarousal (numb, foggy, far-away). In both, the integrating part of the brain goes offline, so pushing harder there doesn’t deepen the work — it overwhelms.

~ little-at-a-time | swing to the edge, swing back to safety — that’s the work

The somatic teacher Peter Levine called the way in **titration**: you touch the edge of something hard — a drop at a time — then step back into safety, then maybe touch it again. Pendulation is the rhythm of it: swinging on purpose between a little activation and a felt sense of ground. Each pass teaches the body that discomfort rises and also passes, and the window slowly widens.

It’s why these practices put a breath after intensity, and why they’ll quietly offer to settle you when something spikes. Touching ten percent of a hard feeling and coming back teaches your system more than flooding it with a hundred.

> Going slow isn’t timidity. It’s the actual mechanism by which hard things become bearable.

The window isn’t a fixed size, either. On a slept-well, unhurried day it’s wide; tired, hungry, lonely, or already stirred up, it narrows. Checking “how wide is my window right now?” before opening anything heavy is itself a skill.

And one reminder worth keeping close: charge rising is not failure. Contact with something real can deepen before it eases.

[try] Bring to mind a mildly uncomfortable feeling and notice where it lives in the body for one slow breath. Then move your attention to something neutral or pleasant. Swing back and forth a few times — and stop while it still feels manageable.`,
  },
  {
    id: 'when-something-spikes',
    title: 'When something spikes',
    blurb: 'A plain path back when the charge gets too high.',
    cover: 'dial-drop',
    icon: 'dial-drop',
    body: `Sometimes the dial jumps. A practice, a memory, or just a hard day pushes you past the edge of what you can stay present with. This is a short map for those moments — not more depth, but a way back.

## First, name where you are
Are you revved up — racing heart, panic, can’t-settle (above the window)? Or shut down — numb, foggy, far-away (below it)? Or activated but still here? Only the last one is workable. The other two are a signal to ground, not to push. Numbness can masquerade as calm; real steadiness usually comes with some warmth or the ability to feel your own breath.

~ dial-drop | when the weather is loud, come back to the ground

## Then, come back through the body
Look slowly around and name five things you can see, four you can hear, two you can touch. Feel your feet. Slow the out-breath until it’s longer than the in-breath. If the dial is very high, cold water on the face or hands, or a burst of movement, can turn it down fast. Return to your anchor — the steady place, person, or memory you keep for this.

> Coming back is not quitting the work. It is the work — the half of the rhythm that makes the other half survivable.

## Know the stop-signs
Some states are past what reflection can hold.

[note] If you notice panic that won’t settle, dissociation or feeling unreal, numbness you can’t come out of, or any urge to harm yourself — stop, ground, and reach toward an actual person. This app is not therapy and is not built for crisis. The Support screen has crisis lines and directories. Reaching out is the wise move, not the weak one.

[try] While you’re calm, make a tiny “reach list” — one or two people you could text or call, plus your local crisis line. Naming them now makes them reachable when you’re not.`,
  }
];
