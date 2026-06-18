/**
 * A small bundled reading room — short, plain-language pieces on the ideas the
 * practices draw from. Static content, shipped in the app: no network, no AI.
 * Voice matches the flows: warm, unhurried, second person, never clinical.
 * Paragraphs are separated by a blank line and rendered in the serif body.
 */

export interface Reading {
  id: string;
  title: string;
  /** One-line teaser for the list. */
  blurb: string;
  /** ~2 min read. Paragraphs separated by "\n\n". */
  body: string;
}

export const READINGS: Reading[] = [
  {
    id: 'what-the-shadow-is',
    title: 'What the shadow is',
    blurb: 'The parts of you that didn’t fit — dark and golden alike.',
    body: `The shadow is a simple idea with a long reach: it’s the parts of yourself you’ve refused to acknowledge. Jung called it, plainly, “the thing a person has no wish to be.”

It forms early. As a child, you learn — from family, school, the people around you — what’s welcome and what isn’t. Whatever gets labelled too much, too loud, not allowed, or not safe gets pushed out of sight. It doesn’t disappear. It waits.

Here’s the part people miss: the shadow isn’t only the difficult stuff — the anger, the envy, the wanting. It also holds good things that didn’t fit. Ambition in a family that prized humility. Softness in a household that prized toughness. Creativity that no one had room for. The shadow is both a cellar and a treasure chest.

This app isn’t here to help you fix what’s wrong with you. There’s nothing to fix. It’s here to help you meet the parts that were exiled — and slowly, to let them back in.`,
  },
  {
    id: 'projection',
    title: 'Why others get under your skin',
    blurb: 'A strong reaction to someone is often a message about you.',
    body: `Sometimes a person sparks a reaction in you that’s way out of proportion — a flash of contempt, irritation, or fascination that’s bigger than the moment deserves. That disproportion is the signal worth noticing.

Jung’s word for it is projection: a quality you’ve disowned in yourself gets “found” in someone else, and you react to them as if it were entirely theirs. They might genuinely carry some of it. But the excess — the jump from real to unbearable — tends to be yours.

So the useful question isn’t “are they bad?” It’s “why is my reaction this strong?” The intensity is a thread. Follow it, and it often leads back to something in you: a trait you’re not allowed to have, a need you won’t admit, a part you sent away.

This is why the people who irritate us most can teach us the most. Not because we should excuse them — but because our reaction points, quietly, at home.`,
  },
  {
    id: 'golden-shadow',
    title: 'The gold you can’t see',
    blurb: 'What you admire in others may be your own, unlived.',
    body: `Not everything in the shadow is dark. Some of it is luminous — and oddly, that can be harder to own.

Robert Johnson called this the golden shadow: the good qualities you’ve disowned, projected outward as admiration, envy, or that ache of looking up to someone. When you’re drawn to a person to the point of longing — “I wish I could be like that” — you’re often looking at a capacity that’s already in you, just unlived.

You can’t recognise in someone else what you have no seed of yourself. The boldness you envy, the ease you idolise, the voice you wish you had — these are clues, not verdicts on your smallness.

Owning the gold can be scarier than owning the dark. It asks something of you. If that creativity is really yours, you have to do something with it. But the alternative — leaving it projected on others forever — is its own quiet grief.`,
  },
  {
    id: 'active-imagination',
    title: 'Talking with what you’ve exiled',
    blurb: 'How writing a two-way dialogue becomes real inner work.',
    body: `Active imagination is Jung’s method for meeting a part of yourself directly. You take a charged image — a figure from a dream, a feeling with a shape, an inner critic — and you let it speak. Then you answer. Both voices, written down.

The writing matters. Putting it on the page gives the encounter a kind of physical existence; it stops the mind from later waving it away as “just imagination.”

There’s one test for whether it’s working: are you surprised? If the figure says exactly what you’d have written anyway, you’re steering. Genuine contact produces answers that feel like they come from somewhere not-quite-you. That’s the point — you’re no longer talking about the part, you’re talking with it.

And the last step, the one most people skip: let it change something. An insight that stays only in the imagination hasn’t landed. To meet a part honestly is to take what it tells you into how you actually live — even in one small way.`,
  },
  {
    id: 'integration',
    title: 'Integration is never finished',
    blurb: 'Not a cure or a finish line — an ongoing relationship.',
    body: `It’s tempting to imagine shadow work as a project with an end: do enough of it, and one day you’re whole, sorted, done. That’s not how it goes.

James Hollis put it bluntly: you’ll never integrate the shadow, any more than you’d integrate the whole ocean. Integration isn’t elimination, and it isn’t mastery. It’s the slow establishment of a conscious relationship with what was unconscious — so it can be known and owned, instead of acting on you from the dark.

What changes, over time, is small and real. You project a little less. There’s a pause before the old reaction. The energy that went into keeping a part exiled becomes available for living. Ambivalence gets easier to hold; people stop being all-good or all-bad.

This is why the app has no streaks, no scores, no finish line. You’re not climbing toward completion. You’re tending a relationship with yourself — one that deepens, circles back, and asks to be met again. You return when you return.`,
  },
];

export function getReading(id: string): Reading | undefined {
  return READINGS.find((r) => r.id === id);
}
