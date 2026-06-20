/**
 * A small bundled reading room — short, plain-language pieces on the ideas the
 * practices draw from. Static content, shipped in the app: no network, no AI.
 * Voice matches the flows: warm, unhurried, second person, never clinical.
 *
 * Body markup — a tiny line-prefix grammar over blocks split by a blank line.
 * Each block is classified by its leading token (unknown tokens fall through to
 * a plain paragraph, so a typo degrades gracefully):
 *   plain text        → serif body paragraph
 *   "## "             → subheading
 *   "> "              → pull-quote (large serif, accent rule)
 *   "~ key | caption" → inline illustration (key ∈ IllustrationKey; caption optional)
 *   "[try] "          → a gentle "Try this" callout
 *   "[note] "         → a "Notice this" / safety callout
 * Inline, within any paragraph/quote/callout: a leading "**term** — …" renders
 * the term in the accent colour (a quiet key-term highlight).
 *
 * Quotes are deliberately conservative: every attributed line here was checked
 * against a source. Famous-but-apocryphal lines (e.g. "until you make the
 * unconscious conscious… you will call it fate") are intentionally avoided.
 */

import type { IllustrationKey } from '@/components/illustrations';
export type { IllustrationKey };

export interface Reading {
  id: string;
  title: string;
  /** One-line teaser for the list. */
  blurb: string;
  /** Running text in the body grammar above; paragraphs split by "\n\n". */
  body: string;
  /** Header illustration on the reading page. */
  cover?: IllustrationKey;
  /** Small motif shown beside the chapter in a book's table of contents. */
  icon?: IllustrationKey;
  /** A short epigraph shown under the header, with who said it. */
  epigraph?: { text: string; attribution?: string };
  /** Override the computed read-time label (e.g. "~2 min"). */
  readTime?: string;
}

export const READINGS: Reading[] = [
  {
    id: 'what-the-shadow-is',
    title: 'What the shadow is',
    blurb: 'The parts of you that didn’t fit — dark and golden alike.',
    cover: 'figure-and-shadow',
    icon: 'figure-and-shadow',
    epigraph: {
      text: 'Everyone carries a shadow, and the less it is embodied in the individual’s conscious life, the blacker and denser it is.',
      attribution: 'C.G. Jung, Psychology and Religion (CW 11, §131)',
    },
    body: `The shadow is a simple idea with a long reach: it’s the parts of yourself you’ve refused to acknowledge. Jung named it not by its content but by your relationship to it — **the shadow** is, in his plainest phrase, “the thing a person has no wish to be.”

That refusal is the whole definition. The shadow isn’t a fixed list of bad traits; it’s whatever you can’t picture yourself being. For a gentle person it may hold a healthy anger. For a tireless one, the wish to rest. It is always personal to you.

It forms early, and mostly without villains. As a child you absorb — from family, school, the people around you — what’s welcome and what isn’t. “Good girls don’t get angry.” “Big boys don’t cry.” Whatever gets labelled too much, too loud, not allowed gets pressed out of sight. The poet Robert Bly pictured it as a long bag we drag behind us, stuffing in everything the grown-ups frowned on — and then spending the rest of life trying to get it back out.

~ figure-and-shadow | what we won’t own doesn’t leave — it walks behind us

Here’s the part people miss: the shadow isn’t only the difficult stuff. Jung was emphatic that it holds “a number of good qualities, such as normal instincts, appropriate reactions, realistic insights, creative impulses.” Ambition in a family that prized humility. Softness in a household that prized toughness. Creativity no one had room for.

> The shadow is both a cellar and a treasure chest.

And it grows in the dark. The less of it you live consciously, the denser and more charged it becomes — which is why a disowned trait so often feels monstrous, while the same trait, owned and lived, stays in proportion.

This app isn’t here to help you fix what’s wrong with you. There’s nothing to fix. It’s here to help you meet the parts that were exiled — and slowly, to let them back in.

[try] Listen this week for the sentence “I’m not the kind of person who…”. Whatever fills that blank is often a corner of the shadow — worth turning toward with curiosity rather than agreement.`,
  },
  {
    id: 'projection',
    title: 'Why others get under your skin',
    blurb: 'A strong reaction to someone is often a message about you.',
    cover: 'mirror',
    icon: 'mirror',
    epigraph: {
      text: 'Projections change the world into the replica of one’s own unknown face.',
      attribution: 'C.G. Jung, Aion (CW 9ii, §17)',
    },
    body: `Sometimes a person sparks a reaction in you that’s way out of proportion — a flash of contempt, irritation, or fascination that’s bigger than the moment deserves. That disproportion is the signal worth noticing.

Jung’s word for it is **projection**: a quality you’ve disowned in yourself gets “found” in someone else, and you react to them as if it were entirely theirs. He defined it precisely — “the expulsion of a subjective content into an object” — and he was clear it isn’t something you decide to do. It’s the mind’s natural default. Catching one is a small act of waking up.

They might genuinely carry some of it. Jung’s image for this is the hook: “even the worst projection is at least hung on a hook, perhaps a very small one, but still a hook offered by the other person.” The hook is real but tiny. The heavy coat you hang on it — the story, the certainty, the heat — is what you brought into the room.

~ mirror | the face that maddens us is often carrying something of ours

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
    id: 'active-imagination',
    title: 'Talking with what you’ve exiled',
    blurb: 'How writing a two-way dialogue becomes real inner work.',
    cover: 'quill-two-voices',
    icon: 'quill-two-voices',
    epigraph: {
      text: 'Take the unconscious in one of its handiest forms… Give it your special attention, concentrate on it, and observe its alterations objectively.',
      attribution: 'C.G. Jung, Mysterium Coniunctionis (CW 14, §749)',
    },
    body: `**Active imagination** is Jung’s method for meeting a part of yourself directly. You take a charged image — a figure from a dream, a feeling with a shape, an inner critic — and you let it speak. Then you answer. Both voices, written down. He developed it during his own “confrontation with the unconscious” after 1913, first in plain notebooks, later worked up into the painted Red Book.

It isn’t daydreaming, where the mind drifts or scripts a wish. Here the ego stays present: it questions, it answers, it holds its ground. The two-layer rhythm Jung himself used is worth borrowing — first the raw exchange caught live, then, days later, a slower re-reading that adds meaning.

~ quill-two-voices | two voices on the page — yours, and the one you’ve exiled

The writing matters. Putting it on the page gives the encounter a kind of physical existence; it stops the mind from later waving it away as “just imagination.”

There’s one test for whether it’s working: are you surprised? If the figure says exactly what you’d have written anyway, you’re steering.

> Genuine contact produces answers that feel like they come from somewhere not-quite-you.

That’s the point — you’re no longer talking about the part, you’re talking with it. Robert Johnson, distilling the method into four steps, named the two most people skip: bring your own values into the room (you’re allowed to disagree with an inner figure), and let it change something afterward. An insight that stays only in the imagination hasn’t landed.

[try] Pick one figure who turned up recently — in a dream, a strong mood, a person you can’t stop reacting to — and write “Hello. Who are you?” at the top of a page. Then write whatever answer arrives, even if it feels made up. Keep the pen moving.`,
  },
  {
    id: 'integration',
    title: 'Integration is never finished',
    blurb: 'Not a cure or a finish line — an ongoing relationship.',
    cover: 'ocean-horizon',
    icon: 'ocean-horizon',
    epigraph: {
      text: 'We are never integrated. That fantasy is like wading into the Pacific and believing we could encompass the ocean.',
      attribution: 'James Hollis',
    },
    body: `It’s tempting to imagine shadow work as a project with an end: do enough of it, and one day you’re whole, sorted, done. That’s not how it goes.

The Jungian analyst James Hollis puts it plainly: there are always more dissociated parts of the psyche than consciousness could ever integrate. **Integration** isn’t elimination, and it isn’t mastery. It’s the slow establishment of a conscious relationship with what was unconscious — so it can be known and owned, instead of acting on you from the dark.

~ ocean-horizon | you don’t drink the sea — you learn to live beside it

What changes, over time, is small and real. You project a little less. There’s a pause before the old reaction. The energy that went into keeping a part exiled becomes available for living. Ambivalence gets easier to hold; people stop being all-good or all-bad.

Hollis adds a reframe worth keeping. Our deepest trouble, he says, is often not that we’re wicked but that we live lives that are “too small” — shrunk by fear and the wish to fit in. So integration isn’t only facing what’s dark; it’s reclaiming size, vitality, the things you talked yourself out of.

> You’re not climbing toward completion. You’re tending a relationship with yourself.

This is why the app has no streaks, no scores, no finish line. The work circles back, deepens, and asks to be met again. There is, as Jung put it, no straight line — only a slow walking-around the centre. You return when you return.

[try] Instead of asking “have I dealt with this yet?”, try asking “what is my relationship with this part like today?” The first question is a finish line. The second keeps the door open.`,
  },
  {
    id: 'persona-and-the-mask',
    title: 'The mask and what it casts',
    blurb: 'The face you show the world, and the shadow it leaves behind.',
    cover: 'mask',
    icon: 'mask',
    epigraph: {
      text: 'One could say, with a little exaggeration, that the persona is that which in reality one is not, but which oneself as well as others think one is.',
      attribution: 'C.G. Jung, “Concerning Rebirth” (CW 9i, §221)',
    },
    body: `The **persona** is the face you wear in the world — the compromise between who you are and what the people around you expect. The word is literally a mask: it comes from the ones actors wore in Roman theatre. It isn’t a lie, and it isn’t something to get rid of. We all need a way to meet others.

But here’s the structural law Jung noticed: every quality the mask leaves out has to go somewhere. Persona and shadow are the front and back of one self — like a lamp and the shadow it throws. Turn the public light up brighter, and the shadow behind only sharpens.

~ mask | the brighter the mask, the denser the shadow it casts

Someone who is “always kind” often carries unspoken anger. Someone who is “always strong” keeps their softness hidden, even from themselves. You can’t shrink the shadow by polishing the mask; that only makes it bigger.

The trouble starts when the mask becomes the whole self — when you don’t just wear the role, you believe you are it. Jung warned that “a man cannot get rid of himself in favour of an artificial personality without punishment.” The structure turns brittle.

> If the role ever falls away — a job, a relationship, a season of life — you’re left not quite knowing who’s underneath.

That bare, exposed feeling is uncomfortable, but it’s also an opening. The collapse of an over-built mask is often where becoming more whole begins.

A gentle way in, especially if you don’t think you have a “dark side”: ask who people expect you to be, and what they don’t know. The gap between those two is where the shadow lives.

[try] Bring to mind the version of yourself you show in one setting — at work, with family, online. Ask quietly: what does this version never let itself be? That “never” is a doorway, not a verdict.`,
  },
  {
    id: 'personal-and-collective',
    title: 'Your shadow and the world’s',
    blurb: 'What you disown, and what a whole culture disowns.',
    cover: 'two-shadows',
    icon: 'two-shadows',
    epigraph: {
      text: 'It’s like if you have your room, and there is one door not shut, and there the devil can come in. And if you know your personal shadow, you can shut all the doors.',
      attribution: 'Marie-Louise von Franz, Matter of Heart (1986)',
    },
    body: `There are two shadows, and they’re connected. The **personal shadow** is yours alone — formed by your particular family, your history, the specific things you learned to hide. The **collective shadow** belongs to a group, a culture, an era: the values it disowns together, and then finds in someone else.

They run on the same machinery — projection — just at different scale. The micro-irritation at a neighbour and the macro-fury at a “them” are the same gesture, magnified. A group preserves a flattering self-image by exporting everything ugly onto an out-group, who then seems to deserve the hostility. That’s scapegoating: one person’s projection, performed by a crowd.

~ two-shadows | one figure, two shadows — the private and the shared

Von Franz noticed something precise about how ordinary people get swept in. The shadow, she said, is far more “infectious” than the conscious mind. Alone, you stay decent; but once “the others” start doing primitive things, you begin to fear that if you don’t join in, you’ll be considered a fool. The doorway is social embarrassment, not malice.

Her image is a house with one door left unguarded — and that’s where the darkness gets in. Know your own shadow, and you’re far less available to be swept along.

> The more of your own shadow you can hold, the less of it you hand to the world to carry for you.

None of this makes you passive in the face of real harm. It makes your opposition cleaner: you can resist a genuine wrong without needing the other side to be subhuman, because you’re no longer using them to store your own darkness.

[try] When you catch yourself thinking of a group as simply “them,” pause for one breath and ask: would I feel this strongly if no one were watching? The honest answer tells you whether you’re acting from conviction or from the fear of looking foolish.`,
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
  },
  {
    id: 'dreams-and-nightmares',
    title: 'Figures from dreams',
    blurb: 'Meeting what the night sends, without decoding it.',
    cover: 'moon-stars',
    icon: 'moon-stars',
    epigraph: {
      text: 'To me, dreams are a part of nature, which harbours no intention to deceive, but expresses something as best it can.',
      attribution: 'C.G. Jung, Memories, Dreams, Reflections',
    },
    body: `Dreams don’t argue; they show. Jung didn’t see the dream as a disguise hiding a forbidden wish, but as the psyche showing its situation as plainly as it can. Its obscurity, he thought, is mostly our own lack of understanding, not the dream’s attempt to hide.

A shadow figure often turns up as a stranger of your own sex — someone you’d rather avoid, chase off, or run from. That urge to look away is itself part of the message. The figure isn’t usually a villain to defeat; it’s a disowned part of you, carrying something you’ve over-corrected against.

~ moon-stars | the night shows you what daylight edited out

You don’t have to interpret a dream to work with it. Decoding can become its own way of keeping the image at arm’s length. Instead, you can meet the figure the way you’d meet any part: ask what it wants, let it answer in its own words.

> Let the image stay an image. Its meaning tends to arrive not by being solved, but by being met.

A recurring nightmare can be met too — and here there’s a second, gentler tool. The leading non-drug approach to chronic nightmares, Imagery Rehearsal, is strikingly simple and done fully awake: recall the dream, change it any way you wish, and rehearse the new version in your imagination a little each day. You need not revisit the worst moment. Change an earlier scene, add an ally, open a door that wasn’t there. The point is authorship, not correctness — a felt sense that the ending is no longer the only one available to you.

[note] If a dream is a meaningful shadow encounter, it often wants to be met and stayed with. If it’s a punishing, repetitive trauma-nightmare, it often wants to be re-shaped so sleep feels safe again. Honouring that difference is its own kind of care.`,
  },
  {
    id: 'meeting-shame',
    title: 'Meeting shame with compassion',
    blurb: 'Why shame needs kindness before it can be looked at.',
    cover: 'seed',
    icon: 'seed',
    epigraph: {
      text: 'Shame cannot survive being spoken. It cannot survive empathy.',
      attribution: 'Brené Brown',
    },
    body: `Guilt and shame feel similar but aren’t. **Guilt** says “I did something bad” — it’s about an action, and it can be faced and repaired. **Shame** says “I am bad” — it’s about your whole self, and it demands that you hide. Guilt can motivate change; shame, as the trauma educator Tim Fletcher’s work puts it, tends to paralyse.

Because shame is about identity, looking straight at it with ordinary introspection often backfires: it just hands the inner critic a microphone. Turning toward a shamed part while you’re still braced is like shining a spotlight on someone already cringing — it reads as more exposure, the very thing shame dreads.

~ seed | met with warmth first, a tender part can begin to grow

So the order matters. Shame needs something built first — a container. Brené Brown found that shame needs three things to grow: secrecy, silence, and judgment. The antidote is their opposite — being met, even by yourself on the page, with kindness.

> Compassion comes before disclosure.

You speak to the part that carries the shame the way you’d speak to a frightened child who came to believe something untrue about themselves. And you can listen for whose voice the shame even speaks in — often it has a borrowed accent, a parent or teacher, which is the moment it stops sounding like the truth and starts sounding like a recording.

Then you ask what it needs — usually something plain: safety, rest, to be believed.

Shame survives in silence. It loosens, a little at a time, when it’s finally met in the presence of kindness — even your own.

[try] When a harsh thought lands, notice the verb. Is it “I did something bad,” or “I am bad”? You don’t have to fix it — just seeing which one it is can loosen its grip.`,
  },
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

[note] Those signs mean: stop the inner work, ground, and reach toward an actual person. A reflective app is not therapy and is not built for crisis. The Support tab has crisis lines.`,
  },
  {
    id: 'titration-and-the-window',
    title: 'A little at a time',
    blurb: 'The window of tolerance, and why slow is the safe way.',
    cover: 'pendulum',
    icon: 'pendulum',
    body: `Your nervous system can metabolize difficult material only within a band — awake and feeling, yet still able to think and stay present. The psychiatrist Dan Siegel named this band the **window of tolerance**. Above it is hyperarousal (racing, panicky, can’t-settle); below it is hypoarousal (numb, foggy, far-away). In both, the integrating part of the brain goes offline, so pushing harder there doesn’t deepen the work — it overwhelms.

~ pendulum | swing to the edge, swing back to safety — that’s the work

The somatic teacher Peter Levine called the way in **titration**: you touch the edge of something hard — a drop at a time — then step back into safety, then maybe touch it again. Pendulation is the rhythm of it: swinging on purpose between a little activation and a felt sense of ground. Each pass teaches the body that discomfort rises and also passes, and the window slowly widens.

It’s why these practices put a breath after intensity, and why they’ll quietly offer to settle you when something spikes. Touching ten percent of a hard feeling and coming back teaches your system more than flooding it with a hundred.

> Going slow isn’t timidity. It’s the actual mechanism by which hard things become bearable.

The window isn’t a fixed size, either. On a slept-well, unhurried day it’s wide; tired, hungry, lonely, or already stirred up, it narrows. Checking “how wide is my window right now?” before opening anything heavy is itself a skill.

And one reminder worth keeping close: charge rising is not failure. Contact with something real can deepen before it eases.

[try] Bring to mind a mildly uncomfortable feeling and notice where it lives in the body for one slow breath. Then move your attention to something neutral or pleasant. Swing back and forth a few times — and stop while it still feels manageable.`,
  },
  {
    id: 'self-compassion',
    title: 'Turning toward yourself',
    blurb: 'Meeting your own pain the way you’d meet a friend’s.',
    cover: 'hand-on-heart',
    icon: 'hand-on-heart',
    epigraph: {
      text: 'This is a moment of suffering. Suffering is a part of life. May I be kind to myself.',
      attribution: 'Kristin Neff, the Self-Compassion Break',
    },
    body: `When something in you hurts, the reflex is often to criticize or to look away. **Self-compassion** is a third option, and the researcher Kristin Neff describes it in three movements.

Kindness instead of self-criticism: speaking to yourself the way you would to someone you love who was struggling. Common humanity instead of isolation: remembering that pain and failure are part of being a person — you are not uniquely broken, even though shame insists you are. And mindful awareness instead of being swallowed: noticing “I’m having the thought that I’m broken,” rather than collapsing into “I am broken.”

~ hand-on-heart | warmth first, words later

It isn’t the same as self-esteem. Self-esteem needs you to be above average and falls apart when you fail; self-compassion shows up precisely when you’ve failed — no evaluation required. That’s exactly why it fits this work, where the whole premise is meeting the parts you don’t like.

There’s one question that turns the whole thing: what do I need right now? Neff calls it the quintessential self-compassion question — it moves you from self-attack to self-support in a single step.

> Gentleness isn’t softness for its own sake. It’s the ground that healing actually happens on.

Sometimes the body can receive what words can’t yet. A hand resting where a feeling lives, for a few breaths, signals safety to the nervous system and makes the kind words easier to take in.

[try] Find the sentence in your own mouth: “This is hard right now. Other people feel this too. May I be a little gentle with myself.” The exact words matter less than the turn toward kindness.`,
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

If you want to find someone, the Support tab has directories — including the International Association for Analytical Psychology (IAAP), which lists analysts trained in exactly this tradition.

[note] If you’re in danger or in real distress right now, please don’t use this app for it. Reach for a person — the Support tab has crisis lines and directories.`,
  },
  {
    id: 'individuation',
    title: 'Becoming who you are',
    blurb: 'The long arc shadow work belongs to — coming to selfhood.',
    cover: 'compass',
    icon: 'compass',
    epigraph: {
      text: 'There is no linear evolution; there is only a circumambulation of the self.',
      attribution: 'C.G. Jung, Memories, Dreams, Reflections',
    },
    body: `Shadow work isn’t a stand-alone task. It’s one movement inside a longer arc Jung called **individuation** — “coming to selfhood,” becoming the particular, whole person you already are by reclaiming the parts that were left out. Not becoming special, or separate, or improved. Becoming undivided.

It helps to hold two centres apart. There’s the **ego** — the centre of waking consciousness, the “I” you usually take yourself to be, the lit room. And there’s the **Self** — the organizing centre of the whole psyche, conscious and unconscious together, the house around the room in the dark. Individuation isn’t the ego building something new. It’s the ego coming into right relationship with a larger centre that was there all along.

~ compass | not a straight climb — a slow circling of the centre

That’s why progress here rarely looks like levelling up. Jung’s image was a circumambulation — a walking-around the centre rather than a march toward it. You return to the same wound from a slightly different angle, again and again, and each pass is not failure but the shape of the path.

> You don’t arrive at yourself. You keep arriving.

Hollis offers a companion thought: the danger isn’t mainly that we’re bad, but that we live lives that are “too small,” shrunk by fear and the wish to fit in. So individuation is as much about reclaiming unlived size — courage, desire, a creative life you talked yourself out of — as it is about facing what’s dark.

[try] Let the “I” you usually call yourself be a lit room, and the whole psyche the house around it. For a moment, let the centre of gravity rest somewhere larger than the lit room. That small felt shift is the ego making space for the Self.`,
  },
  {
    id: 'the-transcendent-function',
    title: 'Holding two things at once',
    blurb: 'When you can bear the tension of opposites, a third thing appears.',
    cover: 'two-circles-meeting',
    icon: 'two-circles-meeting',
    body: `Some of the most important inner work happens when you stop trying to resolve a conflict too quickly. Jung gave the awkward, beautiful name **the transcendent function** to what happens when the conscious and the unconscious are brought together rather than one suppressing the other.

The recipe is to hold the tension. Don’t pick a side; don’t let one opposite win. Stay or go. Speak or keep quiet. Forgive or hold the line. When the ego can bear the pull of two genuine opposites without collapsing the conflict, something arrives that neither side could have reasoned its way to — Jung called it the “third that is not logically given.”

~ two-circles-meeting | hold both, and a third thing rises between them

You’ve felt it. A stuck either/or that gnawed for weeks, and then — after you genuinely sat with both, instead of forcing a verdict — a wholly different option appeared that wasn’t on the original menu. The new option is the symbol the psyche made out of the held tension.

> The third isn’t a compromise between the two. It’s something new, born of refusing to flee the discomfort.

This is the quiet engine under a lot of the practices here: the breath that lets you stay with a charge a moment longer, the dialogue that lets a disowned part finish its sentence, the choice not to settle the contradiction by amputating one half of yourself. Holding the tension is uncomfortable on purpose. It’s also where the genuinely new tends to come from.

[try] Next time you face a stubborn either/or, try not deciding for one full day. Hold both options as equally real, and notice what — if anything — drifts in once you stop forcing a verdict.`,
  },
  {
    id: 'complexes',
    title: 'When something takes over',
    blurb: 'The charged knots that grab the wheel — and why one-sidedness flips.',
    cover: 'turning-arrow',
    icon: 'turning-arrow',
    epigraph: {
      text: 'Everyone knows nowadays that people “have complexes.” What is not so well known… is that complexes can have us.',
      attribution: 'C.G. Jung, A Review of the Complex Theory (CW 8, §200)',
    },
    body: `Sometimes you’re not quite yourself. A small remark lands and suddenly you’re flooded, certain, ten years old — and only later, cooler, do you wonder who that was. Jung had a precise word for it: a **complex**.

A complex is a “feeling-toned” cluster of images and memories grouped around a charged core. He described it as behaving “like an animated foreign body in the sphere of consciousness,” and called complexes “splinter psyches” — small partial personalities that split off after shock or repeated wounding. Everyone has them; they aren’t a flaw. The everyday signs are familiar: the wrong word slips out, you blank on a name mid-introduction, your throat tightens at the quietest moment.

~ turning-arrow | a complex doesn’t ask permission — it grabs the wheel

The useful thing is that a complex is often felt in the body before it’s understood — the flush of heat, the clenched jaw, the reaction out of all proportion. That disproportion is the same signal that points to projection, and it’s the doorway here too.

> The work isn’t to never be taken over. It’s to notice, a little sooner each time, that you have been.

There’s a related law worth knowing, because it explains a lot of sudden reversals. Jung borrowed from Heraclitus the word **enantiodromia** — “a running toward the opposite”: a thing pushed to its extreme tends to convert into its opposite. The relentlessly nice person who erupts. The crusader who becomes what they fought. A virtue practised one-sidedly quietly recruits its own shadow, and the only real brake is consciousness — an attitude that can hold both sides is far less likely to be flipped without warning.

[try] When a reaction feels far bigger than the moment deserves, pause and ask gently: “Who in me just took over?” Naming it as a part — not as the whole of you — loosens its grip a little.`,
  },
  {
    id: 'when-something-spikes',
    title: 'When something spikes',
    blurb: 'A plain path back when the charge gets too high.',
    cover: 'roots-mountain',
    icon: 'pendulum',
    body: `Sometimes the dial jumps. A practice, a memory, or just a hard day pushes you past the edge of what you can stay present with. This is a short map for those moments — not more depth, but a way back.

## First, name where you are
Are you revved up — racing heart, panic, can’t-settle (above the window)? Or shut down — numb, foggy, far-away (below it)? Or activated but still here? Only the last one is workable. The other two are a signal to ground, not to push. Numbness can masquerade as calm; real steadiness usually comes with some warmth or the ability to feel your own breath.

~ roots-mountain | when the weather is loud, come back to the ground

## Then, come back through the body
Look slowly around and name five things you can see, four you can hear, two you can touch. Feel your feet. Slow the out-breath until it’s longer than the in-breath. If the dial is very high, cold water on the face or hands, or a burst of movement, can turn it down fast. Return to your anchor — the steady place, person, or memory you keep for this.

> Coming back is not quitting the work. It is the work — the half of the rhythm that makes the other half survivable.

## Know the stop-signs
Some states are past what reflection can hold.

[note] If you notice panic that won’t settle, dissociation or feeling unreal, numbness you can’t come out of, or any urge to harm yourself — stop, ground, and reach toward an actual person. This app is not therapy and is not built for crisis. The Support tab has crisis lines and directories. Reaching out is the wise move, not the weak one.

[try] While you’re calm, make a tiny “reach list” — one or two people you could text or call, plus your local crisis line. Naming them now makes them reachable when you’re not.`,
  },
  {
    id: 'finding-your-way-around',
    title: 'Finding your way around',
    blurb: 'A short tour of the five tabs and what each is for.',
    cover: 'compass',
    icon: 'compass',
    body: `Partwise is small on purpose. There’s no dashboard to manage and nothing to keep up with — just a few rooms you can wander into when you want. Here’s what each is for.

## Home
The threshold. It asks, gently, what’s here right now, and offers a few ways in — catch something while it’s warm, draw it, or step into one of the deeper practices. If you’ve done some work before, it may quietly offer to pick something back up. Nothing here is a task.

## Practice
The library of ways in, arranged by depth. Notice, sit with a figure, carry something forward, steady yourself. Some of the deeper practices open up once you’ve done a little of the lighter work — not as a reward, but because they make more sense once there’s something to bring to them.

## Notebook
Everything you’ve noticed, kept as pages you can turn back through — words and drawings alike. It’s a record to revisit, not a feed to scroll. Patterns tend to show themselves here over time, without anyone counting.

## Reflections
The slower mirror. Parts you’ve met, things you meant to carry into your week, and the qualities that keep surfacing. When something has been sitting a while, this is where it gently invites you back.

~ compass | a few rooms, no map required

## Library
Where you are now — the ideas behind the practices, in short pieces you can take off the shelf when you’re curious.

There’s also a **Support** screen, reachable from settings, with crisis lines and directories for finding a therapist or analyst. It’s there if you ever need a person rather than a page.

[note] None of these tabs keeps score. There are no streaks, no completion bars, no “X of Y.” That absence is deliberate — you can’t fall behind on something that isn’t a ladder.`,
  },
  {
    id: 'what-these-practices-are',
    title: 'What these practices are',
    blurb: 'How the app’s ways in fit together.',
    cover: 'open-book-lamp',
    icon: 'open-book-lamp',
    body: `The practices here aren’t a curriculum. They’re a few different doors into the same room, and you can use them in any order, as often or as rarely as you like.

## Notice what’s here
The lightest way in. You catch something while it’s warm — a reaction to a person, a sensation in the body, an admiration, a flash of shame — and just look at it. No story required. This is where projection-spotting and the small turns like 3-2-1 live.

## Sit with a figure
Slower work. You meet a part of yourself in a written back-and-forth: name it, let it speak, answer it. This is active imagination, and writing both voices is what makes it real.

## Carry one small thing
Insight that stays in your head hasn’t quite landed. Carrying turns something you found into one small, concrete thing to try in your actual week — the step Jung’s tradition is most likely to skip.

## Steady yourself, any time
Grounding is always available, never something you have to earn. When the charge is too high, the way back is through the body.

~ open-book-lamp | a few doors into the same room

Drawing runs through all of it — image is the shadow’s first language, and a shape can carry what words can’t reach yet.

> There’s no streak, no finishing, no ladder. You return when you return.`,
  },
  {
    id: 'how-to-use-partwise',
    title: 'How to use Partwise well',
    blurb: 'A few quiet suggestions — no rules.',
    cover: 'open-book-lamp',
    icon: 'open-book-lamp',
    body: `There’s no right way to use this. But a few things tend to help.

## Come when something’s alive
You don’t need a reason or a schedule. The best moment is usually when something is already stirring — a reaction you can’t shake, a sensation, a person on your mind.

## Follow the charge
When a feeling is bigger than the moment seems to deserve, that disproportion is the thread. It almost always points somewhere worth going — toward the dark (irritation, contempt) or the gold (envy, admiration) alike.

## Let drawing carry what words can’t
Some things don’t have words yet. A shape or a scribble is a real way of knowing — use it before you reach for language, or instead of it.

~ open-book-lamp | small, unhurried, and entirely yours

## Go a little at a time
Touching ten percent of a hard feeling and stepping back teaches your system more than flooding it. Slow isn’t timid here; it’s the method.

## Don’t try to finish
There’s nothing to complete, no score, no “better.” Optional steps are genuinely optional. You can stop at any point, and you can always come back.

> You return when you return.`,
  },
  {
    id: 'ways-through',
    title: 'Ways through',
    blurb: 'A few worked paths through the practices, for common moments.',
    cover: 'turning-arrow',
    icon: 'turning-arrow',
    body: `The practices link up. You rarely need to plan a route — but it can help to see how one door tends to open onto the next. Here are a few common paths. None is required; each is just a worn trail you can follow or leave.

## Someone got under your skin
Start by noticing the reaction while it’s warm. Then walk the charge home with the 3-2-1 turn — face it, talk to it, be it. If something real surfaces about you, carry one small thing of it into your week. The point isn’t to excuse them; it’s to take your own coat back off their hook.

## Something — or someone — dazzles you
Admiration that aches is worth following. Notice the quality that draws you, and consider it a seed already in you. Sitting with the figure can show you what you’ve been admiring from a distance. This is the golden shadow, and it asks to be lived, not just envied.

~ turning-arrow | one door tends to open onto the next

## A shame spiral
Here the order is reversed: steady first. Ground until you’re back inside the window, then meet the shame gently — compassion before any looking — and turn toward yourself the way you would toward a frightened friend. Looking head-on before you’re steady tends to feed the critic.

## You keep circling the same thing
When a quality keeps surfacing, that’s an invitation to sit with the part underneath it — slower, in writing. Reflections will often notice the pattern and offer the door.

## When the dial spikes
Stop the depth work. Come back through the body, return to your anchor, and if the stop-signs show, reach for a person.

> No path is a staircase. You can enter anywhere, stop anywhere, and come back whenever you return.`,
  },
  {
    id: 'a-walk-through-a-session',
    title: 'A walk through a session',
    blurb: 'One ordinary example, start to finish.',
    cover: 'threshold',
    icon: 'threshold',
    body: `It can help to see what “a session” actually looks like — not as a template, but as one ordinary example. Yours will be different.

## Something happens
A colleague takes credit for your idea in a meeting. You say nothing, but you’re still chewing on it on the walk home. The feeling is bigger than the moment — that’s the thread.

## You catch it while it’s warm
At home you open Home and answer the quiet question of what’s here. You notice the reaction: a hot, narrow contempt. You don’t make a case; you just look at it.

~ threshold | a small, complete crossing — and then back to your evening

## You follow it inward
The contempt is out of proportion, so you try the 3-2-1 turn. Describing them is easy. Speaking as them — “I take what I want; I’m afraid that if I wait politely I’ll be overlooked” — lands with a small jolt. There it is: a wanting you don’t let yourself have.

## You carry one small thing
Nothing dramatic. Just one concrete intention for the week: to say the next idea out loud, in the room, with your name on it. You write it down so it isn’t only a thought.

## You close
No score, no streak, nothing to complete. You set the phone down and make dinner.

> A session can be five minutes. The work isn’t the length; it’s the turn.

Days later, Reflections might gently ask how that small intention went — and that, too, is part of it.

[note] Some sessions don’t resolve, and some stir up more than they settle. If a session leaves you flooded rather than steadier, that’s the moment to ground, and — if the charge stays high — to reach for a person.`,
  },
  {
    id: 'your-privacy',
    title: 'What you write stays yours',
    blurb: 'Local, encrypted, no accounts, no AI.',
    cover: 'closed-door',
    icon: 'closed-door',
    body: `Everything you write in Partwise lives only on this device, encrypted at rest. There are no accounts, no servers, no cloud syncing it somewhere, and no AI reading it. None of it leaves your phone.

~ closed-door | your own room, with the door shut

Even the search runs entirely on your device — it decrypts and scans in the moment, and never builds a copy of your words anywhere.

If you ever want a backup, you can export an encrypted file protected by a passphrase that only you hold, and restore it yourself later. Without that passphrase, the file is just noise.

This isn’t a feature bolted on the side.

> Honesty with yourself depends on knowing that no one is watching — so privacy here is the precondition for the whole thing, not an afterthought.`,
  },
  {
    id: 'what-partwise-isnt',
    title: 'What Partwise isn’t',
    blurb: 'Not therapy, not a fix, not a judge.',
    cover: 'open-book-lamp',
    icon: 'open-book-lamp',
    body: `It’s worth being clear about what this app is not.

It’s not therapy, and it can’t provide crisis support. If you’re in danger or in real distress, please reach for a person — the Support tab has crisis lines and directories.

It’s not a self-improvement program. There’s nothing here to optimize, no streak to keep, no score to raise, no version of you that’s “better.” The refusal of all that is deliberate.

And it never tells you what your shadow is. It only ever asks; you’re the one who answers. Whatever you discover is yours, not the app’s verdict on you.

> The whole thing rests on one line: the app never says fix yourself. It says — meet the part of you that was exiled.`,
  },
];

export function getReading(id: string): Reading | undefined {
  return READINGS.find((r) => r.id === id);
}

// ─── Body rendering ───────────────────────────────────────────────────────────
// A reading's body is parsed once into typed blocks the reader renders dumbly.

export type Block =
  | { kind: 'subhead'; text: string }
  | { kind: 'para'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'figure'; name: IllustrationKey; caption?: string }
  | { kind: 'callout'; variant: 'try' | 'note'; text: string };

/** Split a body into blocks by the leading-token grammar documented up top. */
export function parseBody(body: string): Block[] {
  return body
    .split('\n\n')
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((b): Block => {
      if (b.startsWith('## ')) return { kind: 'subhead', text: b.slice(3).trim() };
      if (b.startsWith('> ')) return { kind: 'quote', text: b.slice(2).trim() };
      if (b.startsWith('[try] ')) return { kind: 'callout', variant: 'try', text: b.slice(6).trim() };
      if (b.startsWith('[note] ')) return { kind: 'callout', variant: 'note', text: b.slice(7).trim() };
      if (b.startsWith('~ ')) {
        const [name, ...rest] = b.slice(2).split('|');
        return { kind: 'figure', name: name.trim() as IllustrationKey, caption: rest.join('|').trim() || undefined };
      }
      return { kind: 'para', text: b };
    });
}

/** A quiet read-time estimate (~200 wpm), used as descriptive info — never a score. */
export function readTimeOf(r: Reading): string {
  if (r.readTime) return r.readTime;
  const words = r.body.split(/\s+/).filter(Boolean).length;
  return `~${Math.max(1, Math.round(words / 200))} min`;
}

// ─── Books ──────────────────────────────────────────────────────────────────
// The Library tab is a shelf of books; a book is a themed collection of chapters
// (reading ids). The shelf is curated to recent work (see rankBooks); evergreen
// books are always present.

export type BookSpine = 'sage' | 'warm' | 'muted' | 'clay';

export interface Book {
  id: string;
  title: string;
  /** A real-book subtitle for the cover, distinct from the list blurb. */
  subtitle?: string;
  blurb: string;
  /** Cover accent, resolved to a palette colour in the view. */
  spine: BookSpine;
  /** The cover illustration motif. */
  cover: IllustrationKey;
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
    subtitle: 'Where it comes from, and the mask that casts it',
    blurb: 'Where the shadow comes from, and the mask that casts it.',
    spine: 'sage',
    cover: 'figure-and-shadow',
    evergreen: true,
    chapters: ['what-the-shadow-is', 'persona-and-the-mask', 'personal-and-collective'],
  },
  {
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
  },
  {
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
  },
  {
    id: 'shame',
    title: 'Shame & self-compassion',
    subtitle: 'Meeting the part that learned it was not enough',
    blurb: 'Meeting the part that learned it was not enough.',
    spine: 'clay',
    cover: 'hand-on-heart',
    chapters: ['meeting-shame', 'self-compassion'],
    match: { qualities: ['shame', 'guilt'], flowIds: ['facing_shame', 'self_compassion', 'rain'] },
  },
  {
    id: 'figures',
    title: 'Meeting your figures',
    subtitle: 'Sitting with the parts and figures you carry',
    blurb: 'Sitting with the parts and figures you carry.',
    spine: 'sage',
    cover: 'quill-two-voices',
    chapters: ['active-imagination', 'dreams-and-nightmares'],
    match: {
      qualities: ['longing', 'grief'],
      flowIds: ['active_imagination', 'inner_child', 'dream_figure', 'archetypal', 'nightmare'],
    },
  },
  {
    id: 'living-it',
    title: 'Integration & living it',
    subtitle: 'Carrying what you find into how you live',
    blurb: 'Carrying what you find into how you live — and when to bring someone in.',
    spine: 'warm',
    cover: 'ocean-horizon',
    chapters: ['integration', 'working-with-a-therapist'],
    match: {
      qualities: ['longing', 'resentment'],
      flowIds: ['after_meeting', 'reclaim_ritual', 'expressive_writing', 'tensions', 'unlived_expression'],
    },
  },
  {
    id: 'going-deeper',
    title: 'Going deeper',
    subtitle: 'The longer arc the practices belong to',
    blurb: 'Individuation, holding the tension of opposites, and what takes us over.',
    spine: 'sage',
    cover: 'compass',
    chapters: ['individuation', 'the-transcendent-function', 'complexes'],
    match: {
      qualities: ['longing', 'grief', 'confusion', 'emptiness'],
      flowIds: ['active_imagination', 'archetypal', 'after_meeting', 'tensions', 'expressive_writing', 'unlived_expression'],
    },
  },
  {
    id: 'using',
    title: 'Using Partwise',
    subtitle: 'How the practices fit, and how your privacy is held',
    blurb: 'Finding your way around, the workflows, and how your privacy is held.',
    spine: 'muted',
    cover: 'open-book-lamp',
    evergreen: true,
    chapters: [
      'finding-your-way-around',
      'what-these-practices-are',
      'how-to-use-partwise',
      'ways-through',
      'a-walk-through-a-session',
      'your-privacy',
      'what-partwise-isnt',
    ],
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
 * now"; evergreen books are always present; the remainder sits on the shelf.
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
