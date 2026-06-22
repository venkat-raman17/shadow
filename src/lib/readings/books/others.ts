import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'others',
    title: "Meeting what's in others",
    subtitle: 'Reactions and admirations, read as messages about you',
    blurb: 'Strong reactions and admirations, read as messages about you.',
    spine: 'warm',
    cover: 'mirror',
    chapters: ['projection', 'golden-shadow', 'anima-and-animus', 'the-321-turn'],
    match: {
      qualities: ['anger', 'envy', 'jealousy', 'resentment'],
      flowIds: ['projection_recall', 'golden_shadow', 'anima_projection', 'animus_projection', '321', 'persona'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'projection',
    title: 'Why others get under your skin',
    blurb: 'A strong reaction to someone is often a message about you.',
    cover: "face-maddens",
    icon: "face-maddens",
    epigraph: {
      text: "Projections change the world into the replica of one’s own unknown face.",
      attribution: 'C.G. Jung, Aion (CW 9ii, §17)',
    },
    body: `Sometimes a person sparks a reaction in you that’s way out of proportion — a flash of contempt, irritation, or fascination that’s bigger than the moment deserves. That disproportion is the signal worth noticing.

Jung’s word for it is **projection**: a quality you’ve disowned in yourself gets “found” in someone else, and you react to them as if it were entirely theirs. He defined it precisely — “the expulsion of a subjective content into an object” — and he was clear it isn’t something you decide to do. It’s the mind’s natural default. Catching one is a small act of waking up.

They might genuinely carry some of it. Jung’s image for this is the hook: “even the worst projection is at least hung on a hook, perhaps a very small one, but still a hook offered by the other person.” The hook is real but tiny. The heavy coat you hang on it — the story, the certainty, the heat — is what you brought into the room.

~ face-maddens | the face that maddens us is often carrying something of ours

So the useful question isn’t “are they bad?” It’s “why is my reaction this strong?” The size of the gap between the trigger and the feeling is roughly the size of what belongs to you.

> The thing that irritates me here is a quality I also carry — or fear, or won’t allow myself.

There are two more tells. A projection flattens: the other person stops being a mixed, contradictory human and becomes a single trait — “he’s just arrogant,” “she’s so fake.” And it’s sticky: you keep replaying the encounter, sometimes about someone you barely know.

This is why the people who irritate us most can teach us the most. Not because we should excuse them — but because our reaction points, quietly, at home.

[try] Next time a reaction runs hot, name the small true thing they actually did (the hook). Then notice everything else you added (the coat). Seeing the seam between them is most of the work.`,
  },
  {
    id: 'golden-shadow',
    title: 'The gold you can’t see',
    blurb: 'What you admire in others may be your own, unlived.',
    cover: 'mandorla',
    icon: 'mandorla',
    epigraph: {
      text: 'To draw the skeletons out of the closet is relatively easy, but to own the gold in the shadow is terrifying.',
      attribution: 'Robert A. Johnson, Owning Your Own Shadow',
    },
    body: `Not everything in the shadow is dark. Some of it is luminous — and oddly, that can be harder to own.

The Jungian analyst Robert Johnson called this the **golden shadow**: the good qualities you’ve disowned, projected outward as admiration, envy, or that ache of looking up to someone. “Curiously,” he wrote, “people resist the noble aspects of their shadow more strenuously than they hide the dark sides.”

His reason is exact. Admitting you’re a bum costs you nothing but comfort. Admitting you have “a profound nobility of character” obligates you to live up to it — and that’s the part we flee. When you’re drawn to a person to the point of longing — “I wish I could be like that” — you’re often looking at a capacity already in you, just unlived.

~ mandorla | where your light and dark overlap, something begins

You can’t recognise in someone else what you have no seed of yourself. The boldness you envy, the ease you idolise, the voice you wish you had — these are clues, not verdicts on your smallness. Envy, read this way, is a compass rather than a sin.

Johnson had a quiet warning, too, from his collaborator Marie-Louise von Franz: a creative gift left unlived doesn’t simply lie quiet. The dammed-up energy turns toxic — surfacing as restlessness, irritability, or an “exaggerated dynamism” attached to the wrong thing. The gold left buried doesn’t keep; it sours.

> The place where light and dark begin to touch is where miracles arise.

Owning the gold can be scarier than owning the dark. It asks something of you. But the alternative — leaving it projected on others forever — is its own quiet grief.

[try] Bring to mind someone you admire almost helplessly, and the single quality that draws you. Sit with the possibility that it’s a seed already in you. What would owning even one percent of it look like today?`,
  },
  {
    id: 'anima-and-animus',
    title: 'The figure of the other within',
    blurb: 'The inner counterpart we carry — and project onto someone real.',
    cover: 'inner-figure',
    icon: 'inner-figure',
    epigraph: {
      text: 'Romantic love always consists in the projection of the soul-image.',
      attribution: 'Robert A. Johnson, We: Understanding the Psychology of Romantic Love',
    },
    body: `Alongside the shadow, Jung described an inner figure of the “other” — a counterpart to your conscious sense of yourself. He called it the **anima** or **animus** and tied it, in his time, to gender. You can hold the idea more loosely, and most analysts now do: every person carries this contrasexual counterpart, a part shaped like what you’ve treated as not-yours, carrying qualities you’ve left to others to embody.

Think of it less as a literal “opposite-sex soul” and more as a face the psyche wears. The same inner figure can show up as a crush, a dream stranger, an admired mentor, or a relentless inner voice. The costume changes; the material is yours.

When that figure stays unconscious, it gets projected. Sometimes it arrives as fascination — a person who captivates you far beyond what you actually know about them, who seems to glow. Jung thought falling in love was the commonest form: an inner image steps out and seems to land on a real person, who suddenly looks fated and more-than-human.

~ inner-figure | a part of you, carried just out of sight

Sometimes it speaks instead as an inner voice with borrowed authority — what Jung described, on the animus side, as “opinions” that lay claim to absolute truth. An inner critic whose verdicts feel beyond question, until you ask where they came from.

> The pull is real, but it isn’t finally about them.

It’s an invitation to meet the part of yourself you’ve been content to admire — or be ruled by — from a distance. And when the projection wears off and the actual person shows through, that’s not the end of love; it’s where a real relationship can begin.

[note] When you sit with this inner figure, don’t use the image of a real person you know. It collapses the symbol into the literal, and distorts both the inner work and the actual relationship. Let it be its own character.`,
  },
  {
    id: 'the-321-turn',
    title: 'Turning a reaction around',
    blurb: 'Bringing a charge back from “them” to “I.”',
    cover: 'turning-arrow',
    icon: 'turning-arrow',
    epigraph: {
      text: 'The aspect can be positive or negative. We can disown both lower and higher aspects of ourselves.',
      attribution: 'Diane Musho Hamilton, on the 3-2-1 Shadow Process (Integral Life)',
    },
    body: `There’s a simple, portable move for a strong reaction — the **3-2-1 process**, from Ken Wilber and colleagues’ Integral Life Practice. The idea: shadow material tends to live in the third person (“it,” “they”) when it actually belongs in the first (“I”). The numbers are just grammatical persons, and the work is to walk the charge back home.

First, **face it**. Describe the person who’s charging you — the one you can’t stand, or can’t stop admiring — fully, in the third person. He is. She is. Keep them at arm’s length, an object you can look at.

Then **talk to it**. Address them directly, as if they were here. You are. What do you want from me? What are you bringing? Let them answer back.

~ turning-arrow | the charge curves back from “them” to “I”

Then **be it**. Write as them, in the first person. I am. Let yourself speak from inside the quality you’ve been reacting to.

That last shift — from describing a quality in someone else to owning it as your own — is the whole turn. It’s the step people skip, and the one that does the work; the discomfort of saying “I am” is the sign it’s landing.

> The thing you can only talk about, never as, is exactly the thing you’ve exiled.

It works for the dark (contempt, irritation) and the gold (envy, admiration) alike, and it only takes a minute, even right after the encounter that set it off. Run silently, it tends to drain the charge faster than venting does.

[try] After a conversation that left a sting, before you reach for your phone, run the three turns in your head — they / you / I. See whether the heat drops by even ten percent.`,
  }
];
