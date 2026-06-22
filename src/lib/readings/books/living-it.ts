import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'living-it',
    title: 'Integration & living it',
    subtitle: 'Carrying what you find into how you live',
    blurb: 'Carrying what you find into how you live — and when to bring someone in.',
    spine: 'warm',
    cover: 'ocean-horizon',
    chapters: ['integration', 'carrying-it-forward', 'working-with-a-therapist'],
    match: {
      qualities: ['longing', 'resentment'],
      flowIds: ['after_meeting', 'reclaim_ritual', 'expressive_writing', 'tensions', 'unlived_expression'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'integration',
    title: 'Integration is never finished',
    blurb: 'Not a cure or a finish line — an ongoing relationship.',
    cover: 'live-beside-sea',
    icon: 'live-beside-sea',
    epigraph: {
      text: 'We are never integrated. That fantasy is like wading into the Pacific and believing we could encompass the ocean.',
      attribution: 'James Hollis',
    },
    body: `It’s tempting to imagine shadow work as a project with an end: do enough of it, and one day you’re whole, sorted, done. That’s not how it goes.

The Jungian analyst James Hollis puts it plainly: there are always more dissociated parts of the psyche than consciousness could ever integrate. **Integration** isn’t elimination, and it isn’t mastery. It’s the slow establishment of a conscious relationship with what was unconscious — so it can be known and owned, instead of acting on you from the dark.

~ live-beside-sea | you don’t drink the sea — you learn to live beside it

What changes, over time, is small and real. You project a little less. There’s a pause before the old reaction. The energy that went into keeping a part exiled becomes available for living. Ambivalence gets easier to hold; people stop being all-good or all-bad.

Hollis adds a reframe worth keeping. Our deepest trouble, he says, is often not that we’re wicked but that we live lives that are “too small” — shrunk by fear and the wish to fit in. So integration isn’t only facing what’s dark; it’s reclaiming size, vitality, the things you talked yourself out of.

> You’re not climbing toward completion. You’re tending a relationship with yourself.

This is why the app has no streaks, no scores, no finish line. The work circles back, deepens, and asks to be met again. There is, as Jung put it, no straight line — only a slow walking-around the centre. You return when you return.

[try] Instead of asking “have I dealt with this yet?”, try asking “what is my relationship with this part like today?” The first question is a finish line. The second keeps the door open.`,
  },
  {
    id: 'carrying-it-forward',
    title: 'Carrying it into your week',
    blurb: 'Why an insight has to land somewhere to count.',
    cover: 'carry-bundle',
    icon: 'carry-bundle',
    body: `It’s possible to have a moving inner experience and change nothing. The session feels deep, something shifts on the page — and then the week resumes exactly as it was. Jung’s tradition has a name for the missing step, and it’s the one most often skipped: taking what you found and **living it**, in some small, concrete way.

An insight that stays in your head hasn’t fully arrived. It becomes real when it touches how you actually act — even slightly. Not a grand resolution; one small thing.

~ carry-bundle | one small thing, carried out of the room

The trick is to make it specific and modest enough to actually happen. Not “be more honest,” but “say the one thing I held back, to the one person, this week.” Not “rest more,” but “take Tuesday’s lunch away from the desk.” The smaller and clearer, the more likely it crosses from intention into life.

> The point of the encounter isn’t the encounter. It’s the slightly different way you live the next day.

And then let it be enough. You’re not building a streak or completing a programme; you’re closing one loop, gently. Some weeks the carried thing gets done and quietly changes something. Some weeks it doesn’t, and you carry it again, or let it go. Either is fine.

This is why returning matters. Days later, it can help to look back and ask, without grading yourself, how the small thing went — and what it taught you. That looking-back is where a private insight slowly becomes a way of living.

[try] Before you close a session, finish this sentence: “One small, concrete thing I’ll try this week is…” Make it specific enough that you’d know, by Friday, whether you did it. Then set it down and get on with your day.`,
  },
  {
    id: 'working-with-a-therapist',
    title: 'When to bring someone in',
    blurb: 'What this app can’t do, and who can.',
    cover: 'threshold',
    icon: 'threshold',
    epigraph: {
      text: 'The shadow is a moral problem that challenges the whole ego-personality, for no one can become conscious of the shadow without considerable moral effort.',
      attribution: 'C.G. Jung, Aion (CW 9ii, §14)',
    },
    body: `This is a space for reflection. It isn’t therapy, and it can’t be. Jung himself meant for shadow work to happen inside a relationship — he used the old alchemical image of the vas bene clausum, the “well-sealed vessel,” for the contained, trusting bond between two people inside which hard material can safely transform.

~ threshold | some doors are best walked through with someone beside you

He called the shadow “painstaking work extending over a long period,” and a “moral problem” demanding considerable effort. He didn’t mean it as a quick exercise done alone — he meant something held: someone who can reality-check, steady you when feeling floods in, and catch the subtle inflation that depth work can stir.

Some states genuinely call for a person, not an app: active crisis, fresh trauma still raw, dissociation that won’t settle, a history that needs real care.

> Reaching for help in those moments isn’t a failure of the work — it is the work, done wisely.

A good therapist or analyst isn’t a fallback for when this app “doesn’t work.” It’s the fuller form of the same thing — the container these practices can only gesture toward. There’s no medal for going it alone.

If you want to find someone, the Support screen has directories — including the International Association for Analytical Psychology (IAAP), which lists analysts trained in exactly this tradition.

[note] If you’re in danger or in real distress right now, please don’t use this app for it. Reach for a person — the Support screen has crisis lines and directories.`,
  }
];
