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
  {
    id: 'persona-and-the-mask',
    title: 'The mask and what it casts',
    blurb: 'The face you show the world, and the shadow it leaves behind.',
    body: `The persona is the face you wear in the world — the compromise between who you are and what the people around you expect. It isn’t a lie, and it isn’t something to get rid of. We all need a way to meet others.

But here’s the structural law Jung noticed: every quality the mask leaves out has to go somewhere. The brighter and more fixed the persona, the denser the shadow it casts. Someone who is “always kind” often carries unspoken anger. Someone who is “always strong” keeps their softness hidden, even from themselves.

The trouble starts when the mask becomes the whole self — when you don’t just wear the role, you believe you are it. Then it turns brittle. If the role ever falls away — a job, a relationship, a season of life — you’re left not quite knowing who’s underneath.

A gentle way in, especially if you don’t think you have a “dark side”: ask who people expect you to be, and what they don’t know. The gap between those two is where the shadow lives.`,
  },
  {
    id: 'personal-and-collective',
    title: 'Your shadow and the world’s',
    blurb: 'What you disown, and what a whole culture disowns.',
    body: `There are two shadows, and they’re connected. The personal shadow is yours alone — formed by your particular family, your history, the specific things you learned to hide. The collective shadow belongs to a group, a culture, an era: the values it disowns together, and then finds in someone else.

The collective shadow is what turns into scapegoating and enemy-making. A group projects what it can’t bear about itself onto an outsider, and feels righteous doing it. It’s the same mechanism as personal projection, scaled up.

Von Franz used a homely image: it’s like having a room with one door left open, and that’s where the darkness gets in. Know your own shadow — close your own doors — and you’re far less available to be swept into the collective version.

So the quiet, private work of meeting your own exiled parts isn’t only private. The more of your own shadow you can hold, the less of it you hand to the world to carry for you.`,
  },
  {
    id: 'anima-and-animus',
    title: 'The figure of the other within',
    blurb: 'The inner counterpart we carry — and project onto someone real.',
    body: `Alongside the shadow, Jung described an inner figure of the “other” — a counterpart to your conscious sense of yourself. He called it the anima or animus. You can hold the idea loosely: a part of you, shaped like what you’ve treated as not-yours, that carries qualities you’ve left to others to embody.

When that figure stays unconscious, it gets projected. Sometimes it arrives as fascination — a person who captivates you far beyond what you actually know about them, who seems to glow. Sometimes it speaks as an inner voice with borrowed authority, an internal critic or judge that sounds more certain than you feel.

The pull is real, but it isn’t finally about them. It’s an invitation to meet the part of yourself you’ve been content to admire — or be ruled by — from a distance.

One caution that matters: when you sit with this inner figure, don’t use the image of a real person you know. It collapses the symbol into the literal, and distorts both the inner work and the actual relationship.`,
  },
  {
    id: 'the-321-turn',
    title: 'Turning a reaction around',
    blurb: 'Bringing a charge back from “them” to “I.”',
    body: `There’s a simple, portable move for a strong reaction — Ken Wilber’s 3-2-1. The idea: shadow material tends to live in the third person (“it,” “they”) when it actually belongs in the first (“I”). The work is to walk it back.

First, face it. Describe the person who’s charging you — the one you can’t stand, or can’t stop admiring — fully, in the third person. He is. She is.

Then talk to it. Address them directly, as if they were here. You are. What do you want from me? What are you bringing?

Then be it. Write as them, in the first person. I am. Let yourself speak from inside the quality you’ve been reacting to.

That last shift — from describing a quality in someone else to owning it as your own — is the whole turn. It works for the dark (contempt, irritation) and the gold (envy, admiration) alike, and it only takes a few minutes, even right after the encounter that set it off.`,
  },
  {
    id: 'dreams-and-nightmares',
    title: 'Figures from dreams',
    blurb: 'Meeting what the night sends, without decoding it.',
    body: `Dreams don’t argue; they show. A shadow figure often turns up as a stranger of your own sex — someone you’d rather avoid, chase off, or run from. That avoidance is part of the message.

You don’t have to interpret a dream to work with it. Decoding can become its own way of keeping the image at arm’s length. Instead, you can meet the figure the way you’d meet any part: ask what it wants, let it answer in its own words.

A recurring nightmare can be met too. Not by forcing a happy ending, and not by pretending the fear isn’t real — but by gently giving the scene a new shape while you’re awake, changing your relationship to what keeps returning.

Let the image stay an image. Its meaning tends to arrive not by being solved, but by being met.`,
  },
  {
    id: 'meeting-shame',
    title: 'Meeting shame with compassion',
    blurb: 'Why shame needs kindness before it can be looked at.',
    body: `Guilt and shame feel similar but aren’t. Guilt says “I did something bad” — it’s about an action, and it can be faced and repaired. Shame says “I am bad” — it’s about your whole self, and it demands that you hide.

Because shame is about identity, looking straight at it with ordinary introspection often backfires: it just hands the inner critic a microphone. Shame needs something built first — a container. Before any naming, the ground has to be laid: you are not what shame says you are.

So the order matters. Compassion comes before disclosure. You speak to the part that carries the shame the way you’d speak to a frightened child who came to believe something untrue about themselves. You ask what it needs — usually something plain: safety, rest, to be believed.

Shame survives in silence. It loosens, a little at a time, when it’s finally met in the presence of kindness — even your own, on the page.`,
  },
  {
    id: 'grounding-and-when',
    title: 'Coming back to steady',
    blurb: 'When to step back from the depths — and how.',
    body: `Depth work only lands inside a certain range — activated, but still present. Too flooded and nothing integrates; too shut down and nothing’s even reachable. Grounding is how you come back to that range.

It isn’t avoidance. Stepping back to settle is part of the work, not a retreat from it — it’s how you build the capacity to stay present with hard things. Slowing the breath, scanning the body, riding out an urge, cold water or movement when the dial is very high: all of it brings you back through the body, into the present.

There’s one clear rule. If a practice starts to increase panic, dissociation, numbness you can’t come out of, or urges to harm yourself, that’s not a sign to push harder. It’s a sign to ground, and to reach for a person.

Steady yourself any time you want to. It isn’t a step you have to earn, and it’s always there.`,
  },
  {
    id: 'titration-and-the-window',
    title: 'A little at a time',
    blurb: 'The window of tolerance, and why slow is the safe way.',
    body: `Your nervous system can metabolize difficult material only within a window — activated enough to feel it, settled enough to stay present. Outside that window, in either direction, nothing gets digested.

The somatic tradition calls the way in titration: you touch the edge of something hard, then step back into safety, then maybe touch it again. Pendulation is the rhythm of it — swinging between the charge and the ground, on purpose. Each pass widens the window a little.

It’s why these practices put a breath after intensity, and why they’ll quietly offer to settle you when something spikes. Going slow isn’t timidity. It’s the actual mechanism by which hard things become bearable.

And a reminder worth keeping close: charge rising is not failure. Contact with something real can deepen before it eases.`,
  },
  {
    id: 'self-compassion',
    title: 'Turning toward yourself',
    blurb: 'Meeting your own pain the way you’d meet a friend’s.',
    body: `When something in you hurts, the reflex is often to criticize or to look away. Self-compassion is a third option, and Kristin Neff describes it in three movements.

Kindness instead of self-criticism: speaking to yourself the way you would to someone you love who was struggling. Common humanity instead of isolation: remembering that pain and failure are part of being a person — you are not uniquely broken, even though shame insists you are. And mindful awareness instead of being swallowed: noticing “I’m having the thought that I’m broken,” rather than collapsing into “I am broken.”

There’s one question that turns the whole thing: what do I need right now? It moves you from self-attack to self-support in a single step.

This isn’t softness for its own sake. Gentleness is the ground that healing actually happens on.`,
  },
  {
    id: 'working-with-a-therapist',
    title: 'When to bring someone in',
    blurb: 'What this app can’t do, and who can.',
    body: `This is a space for reflection. It isn’t therapy, and it can’t be. Jung himself meant for shadow work to happen inside a relationship — someone who can reality-check, hold you when feeling floods in, and catch the subtle inflation that depth work can stir up.

Some states genuinely call for a person, not an app: active crisis, fresh trauma still raw, dissociation that won’t settle, a history that needs real care. Reaching for help in those moments isn’t a failure of the work — it is the work, done wisely.

A good therapist or analyst isn’t a fallback for when this app “doesn’t work.” It’s the fuller form of the same thing — the container these practices can only gesture toward.

If you want to find someone, the Support tab has directories, including analysts trained in exactly this tradition.`,
  },
  {
    id: 'what-these-practices-are',
    title: 'What these practices are',
    blurb: 'How the app’s ways in fit together.',
    body: `The practices here aren’t a curriculum. They’re a few different doors into the same room, and you can use them in any order, as often or as rarely as you like.

## Notice what’s here
The lightest way in. You catch something while it’s warm — a reaction to a person, a sensation in the body, an admiration, a flash of shame — and just look at it. No story required.

## Sit with a figure
Slower work. You meet a part of yourself in a written back-and-forth: name it, let it speak, answer it. This is active imagination, and writing both voices is what makes it real.

## Carry one small thing
Insight that stays in your head hasn’t quite landed. Carrying turns something you found into one small, concrete thing to try in your actual week.

## Steady yourself, any time
Grounding is always available, never something you have to earn. When the charge is too high, the way back is through the body.

Drawing runs through all of it — image is the shadow’s first language. And there’s no streak, no finishing, no ladder. You return when you return.`,
  },
  {
    id: 'how-to-use-partwise',
    title: 'How to use Partwise well',
    blurb: 'A few quiet suggestions — no rules.',
    body: `There’s no right way to use this. But a few things tend to help.

## Come when something’s alive
You don’t need a reason or a schedule. The best moment is usually when something is already stirring — a reaction you can’t shake, a sensation, a person on your mind.

## Follow the charge
When a feeling is bigger than the moment seems to deserve, that disproportion is the thread. It almost always points somewhere worth going.

## Let drawing carry what words can’t
Some things don’t have words yet. A shape or a scribble is a real way of knowing — use it before you reach for language, or instead of it.

## Don’t try to finish
There’s nothing to complete here, no score, no “better.” Optional steps are genuinely optional. You can stop at any point, and you can always come back. You return when you return.`,
  },
  {
    id: 'your-privacy',
    title: 'What you write stays yours',
    blurb: 'Local, encrypted, no accounts, no AI.',
    body: `Everything you write in Partwise lives only on this device, encrypted at rest. There are no accounts, no servers, no cloud syncing it somewhere, and no AI reading it. None of it leaves your phone.

Even the search runs entirely on your device — it decrypts and scans in the moment, and never builds a copy of your words anywhere.

If you ever want a backup, you can export an encrypted file protected by a passphrase that only you hold, and restore it yourself later. Without that passphrase, the file is just noise.

This isn’t a feature bolted on the side. Honesty with yourself depends on knowing that no one is watching — so privacy here is the precondition for the whole thing, not an afterthought.`,
  },
  {
    id: 'what-partwise-isnt',
    title: 'What Partwise isn’t',
    blurb: 'Not therapy, not a fix, not a judge.',
    body: `It’s worth being clear about what this app is not.

It’s not therapy, and it can’t provide crisis support. If you’re in danger or in real distress, please reach for a person — the Support tab has crisis lines and directories.

It’s not a self-improvement program. There’s nothing here to optimize, no streak to keep, no score to raise, no version of you that’s “better.” The refusal of all that is deliberate.

And it never tells you what your shadow is. It only ever asks; you’re the one who answers. Whatever you discover is yours, not the app’s verdict on you.

The whole thing rests on one line: the app never says fix yourself. It says — meet the part of you that was exiled.`,
  },
];

export function getReading(id: string): Reading | undefined {
  return READINGS.find((r) => r.id === id);
}

// ─── Books ──────────────────────────────────────────────────────────────────
// The Read tab is a shelf of books; a book is a themed collection of chapters
// (reading ids). The shelf is curated to recent work (see rankBooks); evergreen
// books are always present.

export type BookSpine = 'sage' | 'warm' | 'muted' | 'clay';

export interface Book {
  id: string;
  title: string;
  blurb: string;
  /** Cover accent, resolved to a palette colour in the view. */
  spine: BookSpine;
  /** Reading ids, in reading order. */
  chapters: string[];
  /** Always on the shelf, regardless of recent work. */
  evergreen?: boolean;
  /** Signals that surface this book: quality families + flow-id fragments. */
  match?: { qualities?: string[]; flowIds?: string[] };
}

export const BOOKS: Book[] = [
  {
    id: 'foundations',
    title: 'What the shadow is',
    blurb: 'Where the shadow comes from, and the mask that casts it.',
    spine: 'sage',
    evergreen: true,
    chapters: ['what-the-shadow-is', 'persona-and-the-mask', 'personal-and-collective'],
  },
  {
    id: 'others',
    title: "Meeting what's in others",
    blurb: 'Strong reactions and admirations, read as messages about you.',
    spine: 'warm',
    chapters: ['projection', 'golden-shadow', 'anima-and-animus', 'the-321-turn'],
    match: {
      qualities: ['anger', 'envy', 'jealousy', 'resentment'],
      flowIds: ['projection_recall', 'golden_shadow', 'anima_projection', 'animus_projection', '321', 'persona'],
    },
  },
  {
    id: 'steady',
    title: 'The body & staying steady',
    blurb: 'Working at a pace your nervous system can hold.',
    spine: 'muted',
    chapters: ['grounding-and-when', 'titration-and-the-window'],
    match: {
      qualities: ['tightness', 'heaviness', 'numbness', 'restlessness', 'anxiety', 'fear'],
      flowIds: ['somatic', 'grounding', 'body_scan', 'urge_surf', 'tipp', 'rain', 'defusion', 'draw_whats_here'],
    },
  },
  {
    id: 'shame',
    title: 'Shame & self-compassion',
    blurb: 'Meeting the part that learned it was not enough.',
    spine: 'clay',
    chapters: ['meeting-shame', 'self-compassion'],
    match: { qualities: ['shame', 'guilt'], flowIds: ['facing_shame', 'self_compassion', 'rain'] },
  },
  {
    id: 'figures',
    title: 'Meeting your figures',
    blurb: 'Sitting with the parts and figures you carry.',
    spine: 'sage',
    chapters: ['active-imagination', 'dreams-and-nightmares'],
    match: {
      qualities: ['longing', 'grief'],
      flowIds: ['active_imagination', 'inner_child', 'dream_figure', 'archetypal', 'nightmare'],
    },
  },
  {
    id: 'living-it',
    title: 'Integration & living it',
    blurb: 'Carrying what you find into how you live — and when to bring someone in.',
    spine: 'warm',
    chapters: ['integration', 'working-with-a-therapist'],
    match: {
      qualities: ['longing', 'resentment'],
      flowIds: ['after_meeting', 'reclaim_ritual', 'expressive_writing', 'tensions', 'unlived_expression'],
    },
  },
  {
    id: 'using',
    title: 'Using Partwise',
    blurb: 'How the practices fit together, and how your privacy is held.',
    spine: 'muted',
    evergreen: true,
    chapters: ['what-these-practices-are', 'how-to-use-partwise', 'your-privacy', 'what-partwise-isnt'],
  },
];

export function getBook(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

export interface BookSignal {
  /** Normalized quality families the user has surfaced (already family-keyed). */
  qualityFamilies: string[];
  /** Flow ids the user has run. */
  flowIds: string[];
}

export interface ShelfBook {
  book: Book;
  /** A surfaced quality that surfaced this book, for a gentle reason line. */
  reason: string | null;
}

export interface Shelf {
  suggested: ShelfBook[];
  evergreen: Book[];
  rest: Book[];
}

/**
 * Curate the shelf from recent work — deterministic, offline, pure (no clock).
 * Non-evergreen books with any signal overlap surface under "for where you are
 * now"; evergreen books are always present; the remainder waits in "browse all".
 */
export function rankBooks(signal: BookSignal, max = 3): Shelf {
  const families = new Set(signal.qualityFamilies);
  const scoreOf = (b: Book): { score: number; reason: string | null } => {
    let score = 0;
    let reason: string | null = null;
    for (const q of b.match?.qualities ?? []) {
      if (families.has(q)) {
        score += 1;
        if (!reason) reason = q;
      }
    }
    for (const key of b.match?.flowIds ?? []) {
      if (signal.flowIds.some((f) => f.includes(key))) score += 1;
    }
    return { score, reason };
  };

  const evergreen = BOOKS.filter((b) => b.evergreen);
  const suggested = BOOKS.filter((b) => !b.evergreen)
    .map((b) => ({ b, ...scoreOf(b) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((s) => ({ book: s.b, reason: s.reason }));
  const suggestedIds = new Set(suggested.map((s) => s.book.id));
  const rest = BOOKS.filter((b) => !b.evergreen && !suggestedIds.has(b.id));
  return { suggested, evergreen, rest };
}
