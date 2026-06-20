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

[note] Those signs mean: stop the inner work, ground, and reach toward an actual person. A reflective app is not therapy and is not built for crisis. The Support screen has crisis lines.`,
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

If you want to find someone, the Support screen has directories — including the International Association for Analytical Psychology (IAAP), which lists analysts trained in exactly this tradition.

[note] If you’re in danger or in real distress right now, please don’t use this app for it. Reach for a person — the Support screen has crisis lines and directories.`,
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

[note] If you notice panic that won’t settle, dissociation or feeling unreal, numbness you can’t come out of, or any urge to harm yourself — stop, ground, and reach toward an actual person. This app is not therapy and is not built for crisis. The Support screen has crisis lines and directories. Reaching out is the wise move, not the weak one.

[try] While you’re calm, make a tiny “reach list” — one or two people you could text or call, plus your local crisis line. Naming them now makes them reachable when you’re not.`,
  },
  {
    id: 'finding-your-way-around',
    title: 'Finding your way around',
    blurb: 'A short tour of the four rooms and what each is for.',
    cover: 'compass',
    icon: 'compass',
    body: `Partwise is small on purpose. There’s no dashboard to manage and nothing to keep up with — just four rooms you can wander into when you want. Here’s what each is for.

## Home
The threshold. It asks, gently, what’s here right now, and offers a few ways in — catch something while it’s warm, draw it, or step into one of the deeper practices. If you’ve done some work before, it may quietly offer to pick something back up. Nothing here is a task.

## Practice
The library of ways in, arranged by depth — notice, sit with a figure, carry something forward, steady yourself. Some of the deeper practices open up once you’ve done a little of the lighter work — not as a reward, but because they make more sense once there’s something to bring to them.

~ compass | four rooms, no map required

## Notebook
Two things live here, side by side. Its first page is your **inner world** — a slow mirror of the parts you’ve met, the things you meant to carry into your week, and the qualities that keep surfacing; when something has been sitting a while, it gently invites you back. Turn the page and you’re in the entries themselves: everything you’ve noticed, words and drawings alike, to leaf back through. It’s a record to revisit, not a feed to scroll. If you like, you can set a separate PIN that gates just the Notebook, so the most personal pages sit behind one more door.

## Library
Where you are now — the ideas behind the practices, in short pieces you can take off the shelf when you’re curious.

There’s also a **Support** screen, reached from Settings, with crisis lines and directories for finding a therapist or analyst. It’s there if you ever need a person rather than a page.

[note] None of these rooms keeps score. There are no streaks, no completion bars, no “X of Y.” That absence is deliberate — you can’t fall behind on something that isn’t a ladder.`,
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
When a quality keeps surfacing, that’s an invitation to sit with the part underneath it — slower, in writing. Your Notebook’s inner-world page will often notice the pattern and offer the door.

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

Days later, your Notebook’s inner-world page might gently ask how that small intention went — and that, too, is part of it.

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

You can also set a separate PIN on the Notebook, so even on an unlocked phone the most personal pages — your reflections and drawings — stay behind one more door.

If you ever want a backup, Settings has **Back up everything**: it gathers your reflections, drawings, and settings into a single encrypted file, sealed with a passphrase that only you hold. You keep the file wherever you like; without the passphrase it’s just noise. There’s also a **Back up & delete**, for when you want to clear this device but keep the file safe. To bring a backup back, you restore it from the welcome screen the next time you set up the app.

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

It’s not therapy, and it can’t provide crisis support. If you’re in danger or in real distress, please reach for a person — the Support screen has crisis lines and directories.

It’s not a self-improvement program. There’s nothing here to optimize, no streak to keep, no score to raise, no version of you that’s “better.” The refusal of all that is deliberate.

And it never tells you what your shadow is. It only ever asks; you’re the one who answers. Whatever you discover is yours, not the app’s verdict on you.

> The whole thing rests on one line: the app never says fix yourself. It says — meet the part of you that was exiled.`,
  },
  {
    id: 'the-inner-child',
    title: 'Meeting your younger self',
    blurb: 'The part that learned, early, how to be safe.',
    cover: 'inner-child',
    icon: 'inner-child',
    body: `Somewhere in you is a younger self — the child who learned, early and without choosing, what it took to stay safe and loved here. The bargains it struck (be good, be quiet, be useful, don’t need too much) kept it afloat. They also quietly run a lot of your grown-up life.

This is **the inner child** — not a cute idea but a real and tender part, still carrying feelings that were too big to hold back then. When something today knocks you flat out of proportion, it’s often this part that got touched.

~ inner-child | the one who learned the rules before you could question them

You don’t meet it by analysing it. You meet it the way you’d crouch down to a real frightened child: slowly, warmly, on its level. Ask how old it feels. Ask what it was afraid of, and what it needed and didn’t get. Then — this is the part that heals — offer some of that now, from the steadier adult you’ve become.

> You can’t go back and give the child a different childhood. You can become the steady one it never had.

The aim isn’t to blame the people who raised you, or to stay small. It’s to stop exiling the part that hurts, and to let it finally be met.

[note] If this stirs up more than feels manageable — old fear, flooding, numbness you can’t come out of — that’s a sign to steady yourself, and if it stays high, to reach for a person. Some of this is gently, slowly done with someone alongside you.`,
  },
  {
    id: 'the-archetypal-encounter',
    title: 'Sitting with what already knows',
    blurb: 'Meeting the steadier, deeper figure inside.',
    cover: 'standing-stones',
    icon: 'standing-stones',
    epigraph: {
      text: 'The wise old man appears in dreams in the guise of a magician, doctor, priest, teacher, grandfather, or any person possessing authority.',
      attribution: 'C.G. Jung, CW 9i, §398',
    },
    body: `Not every figure you meet inside is wounded or unruly. Sometimes there’s a steadier one — a presence that seems to know more than your daily mind does, and speaks with a calm that isn’t anxious to be right. Jung called this kind of figure the **wise old man** or wise old woman: the archetype of meaning, the inner sense that there’s something coherent inside the chaos of a life.

Hold it loosely and inclusively. It needn’t be old, or male, or anything like a guru. It might arrive as a grandmother, a quiet teacher, an animal, a steady inner voice — a costume the deeper psyche wears.

~ standing-stones | a presence that seems to have been there a long time

You sit with it the way you’d sit with any figure: you ask, and you let it answer in words that surprise you. “What do you want me to see? What have I been refusing to know?” The test is the same — if it only tells you what you already think, you’re talking to yourself in robes.

> Genuine guidance feels like it comes from somewhere a little wiser than the worried part of you.

There’s one caution here that matters more than anywhere. When a figure feels luminous, it’s tempting to *become* it — to walk away certain you’re specially wise or chosen. Jung had a blunt word for that: inflation. The figure is to be related to, never owned. You leave a little steadier, not a little grander.

[try] Bring a real question — one you don’t have the answer to — and write it at the top of a page as if to someone who has known you a long time. Then write the reply that comes, even if it surprises you.`,
  },
  {
    id: 'the-inner-critic',
    title: 'The voice that runs you down',
    blurb: 'Whose voice is it, really — and what is it guarding?',
    cover: 'jagged-voice',
    icon: 'jagged-voice',
    epigraph: {
      text: 'That of which we are not aware owns us.',
      attribution: 'James Hollis',
    },
    body: `Most of us carry a voice that narrates our failings — sharp, certain, tireless. It calls itself realism, or standards, or just the truth. It is none of those. The **inner critic** is a learned voice, an echo of the ones that once judged us, now playing on the inside where it never has to stop.

Notice how certain it sounds. Jung described this quality of borrowed, absolute conviction — opinions that “lay claim to absolute truth.” That certainty is the tell. A real assessment has some doubt in it; the critic never does.

~ jagged-voice | it speaks in someone else’s accent, with total certainty

Two moves loosen its grip. First, listen for whose voice it actually is — the cadence, the favourite phrases. Often it belongs to a parent, a teacher, a coach. Hearing it as a recording, rather than the truth, is the moment it stops being you.

Second — the surprising one — don’t fight it. A critic met with attack only gets louder. Ask instead what it’s afraid would happen if it went quiet. Underneath the harshness is almost always a frightened protector, sure that without its lash you’ll be rejected, exposed, or idle. It is trying, clumsily and cruelly, to keep you safe.

> The critic isn’t your enemy. It’s a guard that never got the message that the danger has passed.

You don’t have to obey it, and you don’t have to silence it. You can thank it for trying, and gently take back the wheel.

[try] Write the critic’s next harsh line down, word for word. Underneath, ask it: “What are you afraid would happen if you stopped?” Let it answer. Curiosity tends to soften what combat hardens.`,
  },
  {
    id: 'guilt-and-repair',
    title: 'Guilt, and the way back',
    blurb: 'The one feeling that can actually be mended.',
    cover: 'scales',
    icon: 'scales',
    epigraph: {
      text: 'Shame is a focus on self, guilt is a focus on behavior. Shame is “I am bad.” Guilt is “I did something bad.”',
      attribution: 'Brené Brown, Daring Greatly',
    },
    body: `Of all the difficult feelings, **guilt** is the one with a door out. Where shame says “I am bad” and leaves you nowhere to go, guilt says “I did something I don’t feel right about” — and that is workable, because an action can be faced, owned, and often repaired.

Brené Brown’s research found that guilt, unlike shame, tends to move us toward our values rather than into hiding. It’s uncomfortable on purpose: a signal that something you did crossed a line you actually care about. Read that way, guilt is less a verdict than a compass.

~ scales | a deed can be weighed, and set right

The trap is letting guilt curdle into shame — “I did a bad thing” quietly becoming “therefore I am a bad person.” When that happens, repair stalls, because you can’t make amends from inside a collapse. So the work is to keep guilt the right size: about the deed, not the whole self.

Then comes the part that completes it. Real guilt asks for repair, not punishment — an honest acknowledgement, an amend where one is possible, a change in how you’ll act next time.

> Endless self-punishment isn’t repair. It’s just shame wearing guilt’s clothes.

And some repair is owed to yourself. To have done wrong and to face it squarely — without excusing it or drowning in it — is what self-forgiveness actually is.

[try] Bring to mind something you feel guilty about. Name the specific action in one plain sentence — just the deed, not a verdict on you. Then ask: is an amend possible here, and what would I do differently next time? Let the answer be a step, not a sentence.`,
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
    id: 'the-self',
    title: 'The centre you circle',
    blurb: 'The whole of you — not the “I” you take yourself to be.',
    cover: 'mandala',
    icon: 'mandala',
    epigraph: {
      text: 'The self is not only the centre, but also the whole circumference which embraces both conscious and unconscious.',
      attribution: 'C.G. Jung, CW 12, §44',
    },
    body: `There’s the “I” you usually mean when you say your name — the centre of your waking attention, the part that plans and worries and decides. Jung called that the ego. And then there’s something larger: the **Self**, the whole of you, conscious and unconscious together, with an ordering centre of its own. The ego is the lit room. The Self is the whole house, most of it in the dark.

The Self isn’t something you build or achieve. It’s already there, quietly working to make you whole — to bring the exiled parts back into relationship rather than leaving them scattered.

~ mandala | a circle reaching for its centre

Jung noticed a striking thing: when people were in inner disorder, they would spontaneously draw circles — symmetrical, centred figures he called mandalas — without being taught to. Children do it, doodlers do it, people in crisis do it. He read it as the psyche reaching, on its own, for a centre to gather around.

> Some part of you is always, quietly, trying to re-order itself toward wholeness.

Two cautions keep this honest. The Self is not a prize you reach and keep — it’s a centre you circle, lose, and find again. And it is not the ego made grand: mistaking yourself for the Self (“I am whole, I am wise”) is inflation, the small room believing it is the whole house. The real work is humbler — letting the lit room make a little more room for the dark.

[try] Take a blank page and draw a circle. Let whatever wants to fill it arrive — shapes, a centre, colour, nothing in particular. Don’t plan it. It’s the oldest doodle there is, and it asks only a few quiet minutes.`,
  },
  {
    id: 'the-wise-old-one',
    title: 'The figure who carries meaning',
    blurb: 'The inner sage — and the charlatan who imitates it.',
    cover: 'lantern',
    icon: 'lantern',
    body: `When a life feels like chaos, the psyche sometimes sends a figure who seems to hold the meaning that’s missing — a teacher, a healer, a grandparent, a steady voice in a dream. Jung called this archetype the **wise old man**, with the wise old woman or crone as its equally old counterpart. It personifies spirit and meaning: the sense, against the evidence of a hard week, that something coherent runs underneath.

Hold it inclusively. The figure isn’t about being old or male; it’s a pattern of guidance that can wear any face. You meet it inwardly — and you also meet it, projected, in the mentors and teachers you look up to.

~ lantern | a light carried by someone who has walked the dark

That projection is where the danger lives. The same archetype that guides can be counterfeited. When you hand all your inner authority to a guru, a leader, a charismatic voice, you’ve projected the wise old one and stopped consulting your own. And when you start to feel you *are* the sage — that you alone see clearly — that’s the charlatan from the inside: inflation wearing wisdom’s robes.

> Real wisdom tends to make you more humble, not more certain. The counterfeit makes you grander.

The healthy relationship is consultation, not possession. You can turn to the wise figure inside — and to wise people outside — for counsel, while keeping the authority for your own life in your own hands.

[try] Bring to mind someone whose wisdom you deeply admire. Ask gently: which quality I see in them might be a capacity I’ve left them to hold for me? What would it mean to carry a little of it myself?`,
  },
  {
    id: 'the-trickster',
    title: 'The part that upends things',
    blurb: 'The unruly figure who trips you — and teaches you.',
    cover: 'trickster-mask',
    icon: 'trickster-mask',
    epigraph: {
      text: 'The trickster is a collective shadow figure, a summation of all the inferior traits of character in individuals.',
      attribution: 'C.G. Jung, On the Psychology of the Trickster Figure (CW 9i)',
    },
    body: `Every mythology has one: the fool, the joker, the shape-shifter who breaks the rules, plays pranks, and keeps falling into his own traps. Jung called this the **trickster** — and he placed it close to the shadow, “a summation of all the inferior traits of character” we’d rather not own: the greedy, unruly, half-tamed underside of the personality.

You know the trickster from the inside. It’s the part that blurts the wrong thing at the solemn moment, sabotages the plan you were so sure about, “accidentally” does what you swore you wouldn’t. It overreaches and trips. It is, frankly, embarrassing.

~ trickster-mask | one eye laughing, one eye looking away

But Jung treated it with a strange tenderness, and that’s the useful move. The trickster isn’t evil; it’s undeveloped — a faithful, almost lovable picture of the part of us that hasn’t grown up yet. Shaming it only drives it underground, where it does its tripping unseen. Befriending it works better.

> The thing in you that sabotages and clowns isn’t your enemy. It’s the unowned part asking, badly, to be let in.

And the trickster has a gift: it punctures inflation. The moment you become too certain, too righteous, too sure you’re the wise one, the trickster arranges the banana peel. Its mischief is the psyche’s way of keeping you human.

[try] Recall a recent “slip” — something you blurted, fumbled, or did against your own intentions. Instead of cringing, ask it plainly: what were you trying to say or do that I wouldn’t let through the front door?`,
  },
  {
    id: 'the-hero',
    title: 'The journey and its trap',
    blurb: 'Setting out, being changed, and bringing something back.',
    cover: 'road-mountain',
    icon: 'road-mountain',
    epigraph: {
      text: 'A hero ventures forth from the world of common day into a region of supernatural wonder… and comes back with the power to bestow boons on his fellow man.',
      attribution: 'Joseph Campbell, The Hero with a Thousand Faces',
    },
    body: `The oldest story we tell is the journey: someone leaves the familiar, crosses into the unknown, is tested and changed, and returns carrying something for the people back home. Joseph Campbell gathered countless myths into this one shape — departure, initiation, return — and called it the **hero’s journey**.

Shadow work has the same arc. You leave the daylight version of yourself, go down into what you’d rather not meet, are changed by the encounter, and come back able to live a little differently. Even the reluctance fits: the “refusal of the call,” Campbell’s most human stage, is the “not yet, not me” that almost always comes before a real threshold. The hesitation isn’t failure; it’s part of the story.

~ road-mountain | the way up runs through the unknown

But the hero archetype has a trap worth naming. The point was never conquest. Campbell’s hero returns to *bestow boons* — the journey is completed by what you bring back, not by the victory itself.

> Going down into yourself isn’t about defeating the shadow. It’s about returning with something the rest of your life can use.

Mistake the journey for a battle to win, and you get the inflated hero: forever slaying dragons, never coming home, secretly addicted to the fight. The deeper courage is in the return — in carrying the hard-won thing back into an ordinary Tuesday.

[try] Think of a hard passage you’ve already come through. Name one thing you brought back from it — a knowing, a softness, a strength. That’s the boon. Notice whether you’ve let yourself actually use it.`,
  },
  {
    id: 'the-great-mother',
    title: 'The two faces of care',
    blurb: 'The force that nourishes — and the one that engulfs.',
    cover: 'vessel-cup',
    icon: 'vessel-cup',
    body: `One of the oldest patterns in the psyche is the great caring force — the one that feeds, shelters, holds, and gives life. Jung’s colleague Erich Neumann mapped it as the **Great Mother**, and his crucial insight was that it has two faces, not one. There is the nourishing mother who holds and sustains; and there is the devouring mother who smothers, clings, and won’t let what she loves grow up and away.

They aren’t two different forces — a good one and a bad one. They’re two motions of the same care: holding close, and letting go. Care that never releases slowly becomes the version that engulfs.

~ vessel-cup | the same vessel can hold, or trap

This lives in everyone, of any gender, and far beyond literal parenting. You can mother a project, an idea, a friendship, a version of yourself. The pattern shows up wherever you nurture something — and the question it always asks is the same: am I holding this so it can grow, or so tightly it can’t breathe?

> Love that only holds on, and never makes room, slowly turns into the thing it feared.

It runs the other way too. You can be on the receiving end — held so warmly you were never quite allowed to leave, cared for in a way that quietly kept you small. Naming that isn’t ingratitude; it’s how you find the door.

The aim isn’t to harden against care. It’s to let the two faces become one wise motion: to nourish, and then, when it’s time, to open the hand.

[try] Bring to mind something you tend with real care — a person, a project, a part of yourself. Ask gently: is my care making room for it to grow, or keeping it close where I can manage it? Only one of those needs loosening today.`,
  },
  {
    id: 'remembering-dreams',
    title: 'Catching what the night sends',
    blurb: 'How to keep the door open before the dream fades.',
    cover: 'moon-stars',
    icon: 'moon-stars',
    epigraph: {
      text: 'The dream is a little hidden door in the innermost and most secret recesses of the soul.',
      attribution: 'C.G. Jung, CW 10, §304',
    },
    body: `A dream is brief hospitality. The door opens for a few minutes on waking, and then the daylight mind reasserts itself and the images dissolve. Most “I never remember my dreams” is really “I never caught them in time.”

So the practice begins the night before, with a small act of readiness: a notebook and pen within arm’s reach of the bed. You don’t have to use it. You’re just leaving the door propped, in case something comes through.

~ moon-stars | the door opens briefly, each morning

When you wake, write before you do anything else — before the phone, before standing, before the day floods in. A fragment is enough: one image, one feeling, one scrap of scene. Don’t reach for the whole story or worry whether it “makes sense.” Catching even a corner keeps the thread.

> Dreams fade not because they’re shallow, but because waking is loud. Write quietly, quickly, first.

And resist the urge to decode it on the spot. You’re collecting, not solving. The meaning, if it comes, tends to arrive later — by being kept and revisited, not cracked open immediately. Jung kept plain notebooks of his own dreams for years before he understood them.

It also helps to drop the expectation of vivid, technicolour narratives. A mood on waking, a single odd object, a place you can’t name — these are dreams too, and they carry just as much.

[try] Tonight, set a notebook where you’ll see it first thing. Tomorrow, before anything else, write one line — even just “a feeling of…”. Do this for a few mornings and notice whether more starts arriving. The door tends to open wider once it knows it’s welcome.`,
  },
  {
    id: 'dreams-as-compensation',
    title: 'What the dream is balancing',
    blurb: 'The dream as the psyche quietly righting itself.',
    cover: 'scales',
    icon: 'scales',
    epigraph: {
      text: 'Dreams are impartial, spontaneous products of the unconscious psyche… They are pure nature; they show us the unvarnished, natural truth.',
      attribution: 'C.G. Jung, CW 10, §317',
    },
    body: `Jung’s most useful idea about dreams is also his gentlest: a dream **compensates**. Where your waking attitude has leaned too far one way, the dream quietly tilts the other, to bring the whole person back toward balance. He defined it plainly — “balancing and comparing different points of view so as to produce an adjustment.” It’s the psyche self-correcting, the way the body sweats to cool itself.

This reframes the unsettling dream entirely. The one that frightens or embarrasses you isn’t punishing you; it’s handing back the part you left out.

~ scales | the night returns what the day left out

A few examples of the tilt: the person who is relentlessly capable dreams of falling or being helpless — the softness daylight won’t allow. The one who thinks little of themselves dreams of a hidden room, an unexpected gift, a wide house they didn’t know they owned. The endlessly nice person dreams of doing something shocking. In each, the dream supplies the missing half.

> A dream that feels one-sided or strange is often pointing, kindly, at where you’ve been leaning too hard.

Jung also insisted the dream is “pure nature” — honest, unedited, with no wish to deceive. It isn’t a riddle wrapped to trick you; it’s a candid self-portrait of where you actually are. The obscurity is mostly ours — we simply haven’t learned to read it yet.

So the question to bring a dream isn’t “what does this secretly mean?” but “where in waking life might I be over-corrected in the opposite direction?” Held that way, the dream becomes a quiet advisor.

[try] Recall a recent dream that felt strange or unwelcome. Without decoding it, ask: if this were balancing me, what one-sidedness in my waking life might it be tilting against? Let the answer stay a gentle hunch.`,
  },
  {
    id: 'the-symbol',
    title: 'Why the psyche speaks in images',
    blurb: 'A living symbol can’t be looked up in a book.',
    cover: 'key',
    icon: 'key',
    epigraph: {
      text: 'A word or an image is symbolic when it implies something more than its obvious and immediate meaning.',
      attribution: 'C.G. Jung, Man and His Symbols',
    },
    body: `The unconscious doesn’t argue in sentences; it shows pictures. To work with it, it helps to understand what Jung meant by a **symbol** — and how it differs from a mere sign.

A sign is shorthand for something you already know: a logo, a road marking, a skull on a bottle. The meaning is fixed and closed. A symbol is different. It is “the best possible description of a relatively unknown fact” — it points toward something that can’t yet be said plainly, something still becoming known.

~ key | it opens toward something not yet named

This is why dream dictionaries get it wrong. “Water means the unconscious”; “a snake means this”; “a house means that.” Jung resisted all of it. The moment you pin a symbol to one tidy translation, it stops being a symbol and becomes a sign — and, in his words, it dies.

> A symbol is alive only so long as it is pregnant with meaning. Solve it completely and you’ve killed it.

So the mystery isn’t a problem to get past; it’s the point. A living image keeps offering more than any single reading can hold — which means there’s no “right answer” to a dream or a drawing that you can get wrong. A quietly freeing thought.

The way to keep a symbol alive is to stay curious about it: to hold the image and let it keep speaking, rather than rushing to close it. Meet the snake, the locked door, the tide as if for the first time, with the question still open.

[try] Take one image — from a dream, a daydream, a drawing — that you’ve always “known the meaning of.” For a few minutes, treat it as unknown again, as if you’d never met it. Notice what new thing it might be pointing toward.`,
  },
  {
    id: 'the-alchemical-metaphor',
    title: 'Turning lead to gold, inwardly',
    blurb: 'The old alchemists were watching their own souls change.',
    cover: 'alembic',
    icon: 'alembic',
    epigraph: {
      text: 'One does not become enlightened by imagining figures of light, but by making the darkness conscious.',
      attribution: 'C.G. Jung, CW 13, §335',
    },
    body: `Jung spent the last thirty years of his life studying alchemy — and concluded that the alchemists, bent over their flasks, were not really turning lead into gold. Without knowing it, they were watching their own inner life move and change, and reading that movement in the bubbling, blackening, and brightening of the matter in front of them.

Because the change was happening inside them but felt like a property of the substance, Jung called it projection. The lab was a mirror. Which means the alchemists were doing shadow work, centuries early, without the words for it.

~ alembic | the flask was always a mirror

That makes the old, strange language a surprisingly kind map for inner change. The whole process was called the **opus** — “the work” — and its shortest motto was *solve et coagula*: dissolve, then reform. First something rigid has to come apart (meeting the shadow); then the freed pieces gather into a new, sturdier shape (taking it back in). Neither half works alone — dissolving with nothing to reform leaves you scattered; hardening without first dissolving just sets the old shape in stone.

> The gold was never literal. The “philosophers’ stone” stood for a whole self — not a flawless one, a complete one.

And the work needed a vessel: a sealed glass container, the *vas*, kept closed so nothing leaked out or got in. Jung took this seriously. Real change needs a protected space — a journal no one reads, an hour no one interrupts, a feeling you don’t pour out to everyone. What is held can transform; what is constantly exposed cannot.

[try] Borrow the motto. On one page, write what feels like it’s dissolving or no longer holds (*solve*); on another, what’s quietly trying to take new shape (*coagula*). Leave both unfinished — the point is to feel the two motions, not to conclude.`,
  },
  {
    id: 'nigredo',
    title: 'The dark night',
    blurb: 'Why the blackening comes first — and isn’t the end.',
    cover: 'eclipse',
    icon: 'eclipse',
    epigraph: {
      text: 'No tree, it is said, can grow to heaven unless its roots reach down to hell.',
      attribution: 'C.G. Jung, Aion (CW 9ii, §78)',
    },
    body: `In the alchemists’ map, the work begins in the dark. The first stage was the **nigredo** — the blackening: a dissolving, a decay, a loss of the old order. Psychologically it lines up with the seasons we all dread: depression, confusion, grief, the meeting with the shadow. And the alchemists’ unsettling claim was that this darkness is not a detour from the work. It is the opening of it.

That reframe matters when you’re in one. A low, formless season can feel like failure — like you’ve lost the gold. The nigredo says the opposite: this coming-apart is the gold beginning to be made.

~ eclipse | the light isn’t gone — it’s gathering in the dark

It helps to know what comes after — not to rush it, but to remember it exists. The blackening can give way to the *albedo*, a whitening: a washing-clean, a slow return of clarity, the unconscious becoming conscious. And later still the *rubedo*, a reddening: warmth and aliveness restored, a self that can act again, whole, the dark parts included.

> The darkness is where the gold is made, not a sign you’ve lost it.

Two honesties keep this safe. First, the colours aren’t a ladder you climb once; people cycle through blackening and brightening many times across a life, and returning to the dark is the work turning over, not regression. Second — and this matters most — a metaphor is not a treatment.

[note] If the dark stretches into something that won’t lift, flattens everything, or brings thoughts of harming yourself, that’s not a nigredo to wait out alone. That’s the moment to reach for a person — the Support screen has crisis lines. Meaning-making is for afterward; safety comes first.`,
  },
  {
    id: 'the-projection-inventory',
    title: 'Listing who you can’t stand',
    blurb: 'The traits that enrage you are a map of your own shadow.',
    cover: 'magnifier',
    icon: 'magnifier',
    epigraph: {
      text: 'Everything that irritates us about others can lead us to an understanding of ourselves.',
      attribution: 'C.G. Jung, Memories, Dreams, Reflections',
    },
    body: `Here’s a practice you can do with a pen and a few honest minutes — drawn from William Miller’s account of finding the shadow in daily life. Make a **projection inventory**: list the traits you genuinely can’t stand in other people. The arrogant, the needy, the smug, the loud, the weak — whatever your particular allergies are.

Then read the list a second way. Not as a description of other people, but as a quiet map of you.

~ magnifier | the charge points back toward its source

The key isn’t the trait itself but the *charge*. A mild “that’s a bit much” is just a preference. The tell is the disproportion — the trait that makes you bristle far past what the actual person warrants, the one you could complain about for an hour. The more excessive and irrational the reaction, the more reliably it points at something of your own you’ve refused to own.

> The size of your reaction is roughly the size of what belongs to you.

This doesn’t mean the other person is innocent, or that every irritation is a projection. Some people really are difficult. It means the *excess* — the heat beyond what the moment deserves — is yours to look at. Sometimes it’s a trait you won’t allow in yourself (the “selfishness” of having needs); sometimes it’s the very thing you most fear becoming.

Owning it doesn’t make you bad. It gives you your energy back — the charge you’d been spending on other people returns to you, available to live.

[try] Name three traits you genuinely can’t stand in others. For each, without judging yourself, ask gently: where might a smaller, unowned version of this live in me — or what am I afraid it would mean if it did?`,
  },
  {
    id: 'what-makes-you-laugh',
    title: 'What makes you laugh',
    blurb: 'A joke is a keyhole onto what you won’t let yourself do.',
    cover: 'two-masks',
    icon: 'two-masks',
    body: `Of all the doors into the shadow, this is the most enjoyable: pay attention to what makes you laugh. Not polite laughter — the helpless kind, the joke that lands too well, the target you can’t resist mocking. We tend to laugh hardest at the very impulses we won’t let ourselves act on.

~ two-masks | comedy and its quieter twin

It makes sense once you see it. A joke gives a forbidden thing a brief, safe pass — the aggression, the appetite, the vanity, the rule-breaking you keep firmly off your own menu. For a second you get to enjoy it at arm’s length, in someone else, and then set it back down. The laughter is the release of a pressure you usually hold shut.

> The thing you find funniest is often guarding a door you’ve kept closed on yourself.

The same goes for what you love to mock. The traits you ridicule in others — the try-hard, the show-off, the over-sincere — are frequently the ones you’ve worked hardest to suppress in yourself. Contempt and comedy run on the same fuel.

None of this means your sense of humour is a problem, or that you should analyse the fun out of everything. It means your laughter is honest in a way your self-image often isn’t. It knows what you want before you admit it.

[try] For a day, notice what makes you laugh hardest, and what you can’t resist mocking. The next time it happens, pause for a beat and wonder: what impulse of my own is this giving a safe place to breathe?`,
  },
  {
    id: 'feedback-you-resist',
    title: 'The feedback you resist',
    blurb: 'Others see the part of you that you can’t.',
    cover: 'ear',
    icon: 'ear',
    body: `The shadow is, by definition, what you can’t see in yourself. Which leads to an uncomfortable but useful fact: other people often see it first. The gap between how you experience yourself and how you actually land on the people closest to you is a fairly accurate portrait of your shadow.

~ ear | the part of you that lives in the gap

You can’t reason your way across that gap from the inside — that’s what makes it a blind spot. But you can, now and then, ask. Not a vague “any feedback?”, but a real, brave question to someone who knows you well and wishes you well: how do you experience me when I’m most myself? What do I do that I might not notice?

The catch is the flinch. The feedback that matters is usually the feedback you want to argue with. When a description makes you defensive — “that’s not fair, that’s not me” — pause there. The heat of the resistance is often the sound of something true getting close.

> The note you most want to dismiss is frequently the one with your name on it.

This isn’t about collapsing into everyone else’s opinion of you, or treating every criticism as gospel. People project too; not all feedback fits. It’s about holding the surprising note long enough to check it against your life, instead of swatting it away on reflex.

[try] Ask one person you trust a single honest question — “how do you experience me when I’m at my most me?” — and just listen, without defending. Notice which part of their answer you most want to argue with, and sit with that part a little longer.`,
  },
  {
    id: 'anger-as-information',
    title: 'Anger as information',
    blurb: 'The signal a crossed line sends — read it before you act it.',
    cover: 'flame-boundary',
    icon: 'flame-boundary',
    epigraph: {
      text: 'It is the aggression, not the anger, that is normally the problem.',
      attribution: 'Gregg Henriques, PhD',
    },
    body: `Anger has a bad reputation it only half deserves. It’s worth separating two things that usually get lumped together: **anger**, which is a feeling, and **aggression**, which is a behaviour. You can feel furious and do nothing at all — so whatever harm there is lives in the action, not the emotion.

That distinction frees the feeling to be useful. Anger is the body’s alarm that something isn’t right. It tends to fire when a boundary has been crossed, a value stepped on, or a need ignored. Read as a signal rather than a command, it points you straight at what actually matters to you.

~ flame-boundary | the heat that guards a line

For people who learned early that anger was dangerous or forbidden, this is its own piece of shadow work. The anger didn’t disappear; it went underground — leaking out sideways as sulking, sarcasm, exhaustion, or a resentment that never quite resolves. Owning the clean signal is healthier than enacting the disguised version.

> Anger isn’t the problem to be eliminated. It’s information — about a line that got crossed.

The freedom is in the gap between feeling and doing. The feeling is allowed, even valuable; what you do next is where the choice lives. You can let anger inform you before it directs you — using its heat to stand up for something rather than to strike out.

[try] Next time anger arrives, before doing anything with it, ask it one question: “What line just got crossed, or what do I care about here?” Let it tell you what it’s guarding before you decide what to do.`,
  },
  {
    id: 'the-family-shadow',
    title: 'What the family didn’t say',
    blurb: 'The atmosphere you grew up breathing, and still carry.',
    cover: 'lineage',
    icon: 'lineage',
    epigraph: {
      text: 'The things which have the most powerful effect upon children do not come from the conscious state of the parents but from their unconscious background.',
      attribution: 'C.G. Jung, CW 17',
    },
    body: `Every family has a shadow — the things it couldn’t look at, the feelings that weren’t allowed, the subjects that made the room go quiet. You absorbed it before you had words, the way you absorbed a first language: not from what was said, but from the atmosphere underneath.

Jung put it precisely: what shapes a child most is not the parents’ conscious intentions but their unconscious background — the held breath, the avoided topic, the unspoken tension. A child reads the weather of a home far more deeply than any spoken rule.

~ lineage | what one generation can’t hold, the next tends to carry

So a family quietly hands out roles. The strong one who never falls apart. The easy one who makes no trouble. The bright one who carries everyone’s hopes. The lightning rod who holds the blame. These roles are survival shapes — they earned you a place — and they often keep running long after you’ve left home.

> The loudest messages in a childhood are usually the ones nobody said out loud.

There’s a particular freedom in seeing this clearly: the role you were handed is not the whole of who you are, and you didn’t choose it. Naming it — “I was the one who…” — is the first loosening. From there you can keep the parts that still fit and set down the ones that don’t.

This isn’t an invitation to blame. The people who raised you were shaped by their own families’ silences — a long line of ordinary people doing their best with what they’d been given. Seeing the inheritance clearly is what lets you decide, consciously, what to pass on.

[try] Name, in a single phrase, the role you seemed to play in your family growing up. Ask gently: which parts of it still feel like home, and which might I be ready to set down?`,
  },
  {
    id: 'the-unlived-life-of-the-parents',
    title: 'A dream you were handed',
    blurb: 'The longing a parent set aside can become yours to carry.',
    cover: 'two-shadows',
    icon: 'two-shadows',
    epigraph: {
      text: 'Nothing exerts a stronger psychic effect upon the human environment, and especially upon children, than the life which the parents have not lived.',
      attribution: 'C.G. Jung, “Paracelsus” (CW 15, §4)',
    },
    body: `Of all Jung’s observations about families, this is the most haunting — and the most freeing once you see it. The single strongest influence on a child, he thought, is not what the parents did or said, but **the life they did not let themselves live**: their set-aside dreams, abandoned gifts, quietly buried longings.

Those unlived lives don’t simply evaporate. Jung said they get passed on “in substitute form” — the child may unconsciously take up the very dream a parent abandoned, and live it out as if it were their own.

~ two-shadows | one life casts a shadow into the next

You can sometimes feel it: a pull that runs strangely urgent, a goal that carries more weight than it should, a path you’re sure is yours that, looked at honestly, has the shape of someone else’s missed turn. The musician’s child who must succeed where the parent stopped. The ambition that belongs, really, to a mother who never got her chance.

> Some of what presses for expression in you was never yours to begin with.

“Unlived” is not the same as “failed.” A parent who set aside their art, their travels, their tenderness for what felt like good reasons can still transmit the weight of the setting-aside. It’s the ache, not the failure, that gets handed down.

Seeing this lets you do something quietly radical: sort what’s genuinely yours from what you’ve been carrying for someone else. You can choose to live a longing freely, or set it gently down as not yours to bear. And the idea cuts forward too — the more of your own life you actually live, the less of it the next generation has to carry unknowingly for you.

[try] Sit with one question: what did a parent of yours long for but never let themselves have? Then ask of an urgent pull in your own life: is this fully mine — or am I living it on someone else’s behalf? Let the questions stay open.`,
  },
  {
    id: 'the-shadow-in-relationships',
    title: 'Who you become with them',
    blurb: 'Love lights up the shadow — and hangs it on the beloved.',
    cover: 'linked-rings',
    icon: 'linked-rings',
    epigraph: {
      text: 'Since this image is unconscious, it is always unconsciously projected upon the person of the beloved, and is one of the chief reasons for passionate attraction or aversion.',
      attribution: 'C.G. Jung, “Marriage as a Psychological Relationship” (CW 17)',
    },
    body: `Close relationships are where the shadow gets loudest — which is exactly why they’re such good teachers. The people we love most reliably trigger us, draw out parts of us we didn’t know were there, and become the screen onto which we project what we carry unconsciously.

Jung noticed that we each hold an inner image of “the other,” largely inherited and unconscious, and that we project it onto a real person — which is part of why a near-stranger can feel instantly fated, beloved, or maddening. The intensity is real; but a good deal of it belongs to us, not to them.

~ linked-rings | two people, and the images they cast on each other

This is why the early dazzle of falling in love so often gives way to disappointment. The glow was partly our own projection, and the actual person — ordinary, separate, themselves — eventually shows through. Jung didn’t see that as the death of love but as its real beginning: now you can meet who is actually there.

> The trait that most maddens you in someone you love is often a piece of yourself you’ve handed them to carry.

That reframe turns recurring friction into information. The same complaint, in relationship after relationship, is rarely just bad luck with people; it’s a pattern with one common factor — you. The partner who “always” does the maddening thing is worth asking about twice: what of mine is lit up here?

None of this excuses genuine harm, or means every grievance is a projection. It means the charged ones are worth turning around — taking the heat home and asking what it shows you about yourself.

[try] Bring to mind a trait in someone close that reliably gets under your skin. With curiosity rather than accusation, ask: does this touch something I keep at arm’s length in myself — a thing I won’t allow, or a thing I fear?`,
  },
  {
    id: 'repair-and-rupture',
    title: 'Rupture and repair',
    blurb: 'Closeness survives not by never breaking, but by mending.',
    cover: 'kintsugi',
    icon: 'kintsugi',
    body: `No relationship stays unbroken. We misunderstand each other, snap when we’re tired, withdraw, miss the moment, project. The quiet finding of relationship research is that closeness doesn’t depend on avoiding these ruptures — it depends on **repair**. The bond is kept alive not by never breaking, but by turning back toward each other afterward.

~ kintsugi | the seam, mended, can hold gold

This is good news, because perfection was never available. The pressure to never hurt anyone, never get it wrong, never have a shadow moment is its own trap — it makes rupture feel catastrophic instead of ordinary. When you know repair is possible, a rupture becomes survivable: a thing to mend, not a verdict on the whole relationship.

Repair is usually smaller and plainer than we fear. Naming it honestly (“I was sharp with you; that wasn’t about you”), owning your part without a speech, turning back toward the person. It rarely requires getting to the bottom of who was right.

> A relationship isn’t the absence of cracks. It’s two people willing to turn back toward each other.

There’s a Japanese craft, *kintsugi*, that mends broken pottery with gold along the seams — the break becomes part of the bowl’s beauty rather than something hidden. Repaired ruptures can work the same way: the moment of turning-back, done with care, often leaves a bond stronger and more trusted than if it had never broken.

And some of this is repair with yourself — turning back toward a part of you that you snapped at or abandoned, with the same willingness to mend.

[try] Think of a small, unrepaired rupture with someone who matters. Name your part of it in one honest sentence — no speech, no defence. Then consider one plain way to turn back toward them, this week.`,
  },
  {
    id: 'the-midlife-passage',
    title: 'When the first-half map runs out',
    blurb: 'The turn from building outward to turning inward.',
    cover: 'noon-sun',
    icon: 'noon-sun',
    epigraph: {
      text: 'We cannot live the afternoon of life according to the programme of life’s morning; for what was great in the morning will be little at evening.',
      attribution: 'C.G. Jung, “The Stages of Life” (CW 8, §784)',
    },
    body: `Jung pictured a life as the sun crossing the sky. In the morning it climbs, pouring its light outward, widening its reach. At noon it stands at its height. And in the afternoon it begins to draw its rays back in — turning, slowly, from spreading light to illuminating itself.

The first half of life is mostly that morning climb: building an identity, a place in the world, a career, a family — answering the questions the world puts to you. *What will you be? Who will you belong to?* And for a while, the climbing is the right work.

~ noon-sun | at the top of the arc, the light begins to turn inward

Then, for many people, something shifts. The old goals are met, or met and found hollow; a quiet restlessness sets in; the map that got you here stops matching the territory. Jung’s warning was blunt: the values that built the morning will quietly fail you in the afternoon. Trying to live the second half by the first half’s rulebook is what leaves people stuck or empty even when life “looks” successful.

> What was true at twenty can become a lie at fifty — not because you were wrong then, but because a truth can outlive its season.

This isn’t the cartoon “midlife crisis,” and it isn’t tied to a birthday. It’s a change of direction that can come whenever the old shape no longer fits — a turn from achievement toward meaning, from adding more toward, often, putting some things down.

And it isn’t decline. Jung insisted the afternoon is not a sad appendage to a brighter morning; a long life would make no sense for our species unless its later stretch carried a purpose of its own. The sun doesn’t fail at noon. It changes its job.

[try] Picture your life as the sun’s arc — climbing, at noon, or beginning the turn. No right answer; just notice what time of day your life feels like. Then name one belief that was deeply true at twenty, and ask, gently, whether it still is.`,
  },
  {
    id: 'meaning-and-vocation',
    title: 'What wants to live through you',
    blurb: 'Vocation isn’t a job — it’s what your life keeps calling you toward.',
    cover: 'compass',
    icon: 'compass',
    epigraph: {
      text: 'Why is the life we are living too small for the soul’s desire?',
      attribution: 'James Hollis',
    },
    body: `The Jungian analyst James Hollis frames the deep question of the second half of life with disarming simplicity: *why is the life we are living too small for what the soul wants?*

“Too small” is a kinder diagnosis than “something is wrong with you.” It reframes a restlessness many people feel not as a defect but as a sign you’ve outgrown a shape that once fit. The discomfort is information, not failure.

~ compass | a quiet pull, asking to be followed

Hollis draws a useful line between a job and a **vocation**. The word comes from the Latin *vocatus* — “to be called.” A job is what you do for money; a vocation is what your life seems to be summoning you toward. And it isn’t only a career: a calling can come through a craft, a relationship, a grief, a cause, a quiet sense of “this, not that.”

> A vocation isn’t mainly about what you do. It’s about what keeps calling, even when you’re too busy to listen.

This connects straight to the golden shadow. The capacities you most admire or envy in others are often clues to what’s calling in you — unlived gifts pressing for daylight. What you can’t stop being drawn to is worth taking seriously as a summons, not just a daydream.

None of this requires upending your life. Following a calling can start absurdly small — an evening given to the thing, a first clumsy attempt, a “yes” to a pull you’ve been postponing. The point is to stop treating the call as noise.

[try] Sit with the word “calling” — not “career,” calling. What has been quietly tugging at you, even in small ways, that you keep putting off until there’s time? Name one, and one small way you could answer it this week.`,
  },
  {
    id: 'mortality',
    title: 'Death as a counsellor',
    blurb: 'Remembering the end clarifies what actually matters.',
    cover: 'hourglass',
    icon: 'hourglass',
    epigraph: {
      text: 'To be mindful of our fragile fate each day, in a non-morbid acknowledgment, helps us remember what is important in our life and what is not.',
      attribution: 'James Hollis',
    },
    body: `It sounds grim and turns out to be the opposite. Quietly remembering that life is finite is one of the most reliable ways to sort what actually matters from what only seemed to. In this tradition, mortality is less an executioner than a counsellor.

~ hourglass | the plain fact that clarifies

The point isn’t to dwell on death, brood, or frighten yourself. It’s a brief, non-morbid acknowledgement — the plain fact that the day is finite — held just long enough to let it burn off the trivial. Against that backdrop, the grudge you were rehearsing, the small status worry, the thing you were performing for people who aren’t watching — much of it quietly falls away. What still feels important when you remember the end is usually the real thing.

> Held lightly, the fact of an ending is a sieve: it lets the small stuff fall through and keeps what matters.

This is why so many people, after a brush with loss, describe a strange clarity — suddenly knowing what they’d been wasting their life avoiding or chasing. You don’t have to wait for a crisis to borrow that vision; you can call it up on purpose, gently, as a way of re-sorting.

It also quietly presses the question of the unlived life. If the time is genuinely limited, the dreams you keep deferring “until there’s time” start to look less like luxuries and more like the actual point.

[note] If thinking about death brings not clarity but dread, intrusive fear, or a pull toward not being here, set this one down — it isn’t the practice for you right now, and that’s completely okay. If those thoughts press, please reach for a person; the Support screen has crisis lines.

[try] As a gentle thought experiment, let the day be finite — without dread, just plainly. From there, ask: what on today’s list still matters, and what falls away on its own?`,
  },
  {
    id: 'the-unlived-life',
    title: 'The road not taken, still in you',
    blurb: 'The selves you set aside don’t disappear — they press.',
    cover: 'forked-road',
    icon: 'forked-road',
    body: `Every life is built partly by subtraction. To become this, you set aside that; to take one road, you left others. Most of that is necessary and fine. But the selves and gifts you set down don’t simply vanish. In Jung’s tradition they go quiet underground and keep pressing for expression — what’s called the **unlived life**.

~ forked-road | the path you didn’t take is still in you

You feel it as a vague ache that something is missing, a restlessness good circumstances don’t explain, a flicker of grief watching someone live the thing you talked yourself out of. Marie-Louise von Franz noticed something sharper: a creative gift never lived out becomes “a floating charge of energy” that, with no proper object, lands on the wrong target — souring small things, dramatizing molehills, leaking out as irritability. The cure for that is rarely more self-control; it’s giving the energy its true home.

> Unused, the gift doesn’t keep quiet. It turns, and presses, and complains through you.

A creative block, in this light, is often less a lack of ideas than a meeting with the shadow — fear, the inner critic, a life lived too far from your truth. The block isn’t sabotage; it’s a summons inward, pointing at what wants attention.

And the reclaiming can be small. It doesn’t require quitting your job to paint. A single afternoon of doing the loved thing badly, with no audience and no purpose, already returns some of that displaced charge to its right place. Jung saw real newness coming not from the grinding intellect but from the play instinct — making for its own sake, because you love it.

[try] Recall a path you set down — a craft, an instrument, a way of being playful you used to love. Write a few lines to it, as if to an old friend, asking what it would still like from you now.`,
  },
  {
    id: 'grief-and-letting-go',
    title: 'Grief, and setting down',
    blurb: 'Letting go isn’t forgetting — it’s unclenching the hand.',
    cover: 'bare-tree',
    icon: 'bare-tree',
    epigraph: {
      text: 'The pain of grief is just as much a part of life as the joy of love; it is, perhaps, the price we pay for love, the cost of commitment.',
      attribution: 'Colin Murray Parkes',
    },
    body: `Grief is not a malfunction. It’s the natural counterpart of love and attachment — what happens when a bond that gave us meaning is broken. To grieve is evidence of having loved. The depth of the ache tends to mirror the depth of the bond; in a quiet way, the pain is a measure of how much something mattered.

~ bare-tree | the branch is bare, but the tree is not dead

It also widens further than we usually allow. You can grieve what you never had, or never could: a parent who was present but never warm, a future that didn’t arrive, a version of yourself a circumstance took away. And there’s grief the world doesn’t make room for — an ended friendship, a quiet estrangement, a loss no one sends a card for. Naming such a loss, and letting it count, is itself a kind of relief.

Grief tends to move in waves, not tidy stages — fine one moment, undone the next when a song or a smell arrives. That out-of-nowhere wave isn’t a setback; it’s love, arriving again with nowhere to land.

> Letting go is rarely forgetting. It’s unclenching the hand — releasing the grip of what can’t be changed, while keeping the love.

So “letting go” doesn’t mean severing the bond or being “over it.” It often means setting down a weight you’ve carried, while the connection itself quietly continues in a changed form. Ritual helps here — a small, deliberate act gives a diffuse ache a shape: a candle lit, words said aloud, a letter written and not sent. The relief comes from the giving of words, not from being answered.

[note] Grief and depression can feel alike but differ — grief moves and still lets you connect; depression tends to flatten everything and erode self-worth. This is gentle orientation, not diagnosis. If your grief feels frozen, unrelenting, or unsafe, please reach toward someone you trust; the Support screen has directories.

[try] Write the letter you won’t send — to a person, a younger self, or the loss itself. Say everything, unedited, with no one to answer. When you’re done, keep it, tuck it away, or release it. The relief is in the saying.`,
  },
  {
    id: 'expressive-writing',
    title: 'Writing it out',
    blurb: 'Putting the upheaval into words, for no one’s eyes.',
    cover: 'quill-two-voices',
    icon: 'quill-two-voices',
    epigraph: {
      text: 'Don’t worry about spelling, sentence structure, or grammar. The only rule is that once you begin writing, continue to do so until your time is up.',
      attribution: 'James Pennebaker (expressive-writing instructions)',
    },
    body: `One of the most studied self-help practices there is comes down to something plain: take an emotional upheaval and write about it — your deepest thoughts and feelings — continuously, for about fifteen or twenty minutes, across a few days. No audience, no editing. The psychologist James Pennebaker built decades of research on exactly this.

~ quill-two-voices | the pen keeps moving

The rules are freeing. Spelling and grammar don’t matter. You don’t have to be a “writer.” The only instruction is to keep the pen moving until the time is up — and to do the one thing that seems to make the difference: link what happened to how you felt about it. Not just the events, and not only raw venting, but the bridge between them.

> The relief seems to come not from spilling the feeling, but from making it into a story — finding words for what was wordless.

A few honesties, because this app would rather be accurate than oversell. The benefits in the research are real but modest, not magic. Some people feel sadder right after writing; that dip is usually short-lived. And writing about the very rawest trauma can be too much, too soon — you’re allowed to circle the edge of a hard thing rather than dive into its centre.

Its privacy is the point. Because no one will read it, you can be more honest than you’d dare to be anywhere else — and you can throw the page away afterward, if that’s what lets you say the true thing.

[try] Set a timer for fifteen minutes and write, without stopping or fixing anything, about one thing sitting heavy in you. Let yourself say why it mattered, not only what happened. When the timer ends, keep the page or discard it — whichever lets you be honest.`,
  },
  {
    id: 'the-empty-chair',
    title: 'Speaking to the empty chair',
    blurb: 'Say it to the person — or the part — who isn’t there.',
    cover: 'empty-chair',
    icon: 'empty-chair',
    body: `Here’s a technique from Gestalt therapy, simple to describe and surprisingly powerful to do: put a person — or a part of yourself — in an imagined chair across from you, and actually speak to them. Out loud, in the present tense. Then, when you’re ready, switch chairs and answer back from the other side.

~ empty-chair | the seat is empty, and somehow not

The shift that makes it work is small but real: you stop talking *about* and start talking *to*. “My father never listened” becomes “Dad, you never listened to me” — said to him, in the room. Something lands differently when it’s addressed rather than described. The unfinished words finally get spoken.

Then you take the other chair. You become the father, the critic, the frightened part, and you let it reply — not the reply you’d script, but the one that actually comes. People are often startled by what the other chair says.

> The thing inside you that you’d most like to silence usually has something to say. Give it a seat and it tends to soften.

This works for inner splits too. A classic one is the demanding inner voice (“you should, you must”) against the part that digs in and resists (“I can’t, not yet”). Letting both speak honestly, instead of letting one bully the other, often loosens a stuck place that arguing never could.

You don’t need a literal second chair. On the page, two voices — yours and theirs, taking turns — do the same work. What matters is that each gets to speak as itself.

[try] Bring to mind the person or part you most need to say something to. Write one true line *to* them, not about them. Then write the reply that comes from their side — even if it surprises you.`,
  },
  {
    id: 'rain',
    title: 'RAIN: meeting a hard feeling',
    blurb: 'Recognize, allow, investigate, nurture.',
    cover: 'rain-cloud',
    icon: 'rain-cloud',
    body: `When a difficult feeling arrives, the reflex is to fight it, fix it, or flee. **RAIN** — a four-step practice taught widely by Tara Brach — offers a different move: to turn toward the feeling, gently, in four small steps.

~ rain-cloud | not the storm itself, but how you meet it

**Recognize** what’s happening. Just name it: “this is fear,” “this is shame,” “anger is here.” Naming alone begins to create a little space between you and the feeling.

**Allow** it to be there, as it is. Not approving, not indulging — just letting it exist without immediately trying to make it leave. The paradox is that what you allow tends to settle, while what you fight digs in.

**Investigate** with interest and care. Where does it live in the body? What does it want, or fear? How old does it feel? Curiosity, not interrogation — you’re getting to know it, not cross-examining it.

**Nurture** — offer the feeling, and the part of you that holds it, some kindness. What does it most need to hear right now? Often something plain: *it’s okay, I’m here, you’re not alone.*

> What you can be with, you can hold. What you turn toward stops having to shout.

The fourth step is the one that completes it — and where this differs from older versions of RAIN, which ended in “non-identification.” Brach moved the heart of it to active kindness. The loosening she calls “after the RAIN” — the sense that you are the warm awareness holding the feeling, not the feeling itself — tends to arrive on its own once you’ve nurtured rather than forced it.

[try] Next time a hard feeling shows up, walk it slowly: name it, let it be there, get curious where it lives in your body, then offer it the words you’d give a frightened friend.`,
  },
  {
    id: 'focusing',
    title: 'The felt sense',
    blurb: 'Letting the body say what it knows before words.',
    cover: 'felt-sense',
    icon: 'felt-sense',
    epigraph: {
      text: 'A felt sense is something you do not at first recognize — it is vague and murky. It feels meaningful, but not known.',
      attribution: 'Eugene Gendlin, Focusing',
    },
    body: `Sometimes you know something before you can say it. There’s a vague, whole sense in the chest or the gut about a situation — not yet a thought, not yet a word, but unmistakably *meaningful*. The philosopher Eugene Gendlin called this the **felt sense**, and built a gentle practice, Focusing, around learning to listen to it.

~ felt-sense | a knowing that lives below words

The move is unusual: you don’t reach for an answer with your head. You turn your attention to the body — to that murky, not-yet-worded feeling — and you wait. You keep it company, without rushing it, until a word, a phrase, or an image rises up from it on its own. Gendlin called that a “handle” — the first word that begins to fit.

Then you check the word against the body. You try it on. When a word truly matches the felt sense, there’s often a small physical release — a loosening, a breath, a quiet “yes, that’s it.” The body, not the analysing mind, is what confirms.

> You don’t figure out the felt sense. You wait with it until it tells you its name.

This is a different skill from thinking, and it can feel strange at first — most of us are trained to reason our way to answers. But the body holds a kind of knowing that words can outrun. Slowing down to ask it is often how a stuck, over-thought problem finally moves.

[try] Close your eyes and ask, gently, “how am I, really, about this?” — then don’t answer from your head. Notice the vague, whole feeling somewhere in your chest or stomach. Stay with it until a single word or image floats up that makes it nod, “yes, that’s it.”`,
  },
  {
    id: 'parts-work',
    title: 'Treating yourself as many',
    blurb: 'No bad parts — only protectors with hard jobs.',
    cover: 'constellation',
    icon: 'constellation',
    epigraph: {
      text: 'There are no “bad” parts; the goal is not to eliminate parts but to help them find their non-extreme roles.',
      attribution: 'IFS Institute',
    },
    body: `It often helps to treat yourself not as one solid “I” but as a community of **parts** — the worried one, the harsh one, the one who numbs out, the one who longs. We say it casually (“part of me wants to, part of me doesn’t”), and taking it a little more seriously turns out to be useful.

~ constellation | many parts, one sky

The most freeing idea here, from Richard Schwartz’s Internal Family Systems, is that there are no bad parts. Even the part that sabotages, criticises, or numbs is trying, in its clumsy way, to protect you — usually from some old pain it’s standing guard over. Which means the move that works is the opposite of the obvious one: not to defeat the unwanted part, but to get curious about what it fears would happen if it stopped.

> Attack a protector and it digs in. Understand it, and it tends to relax.

This rhymes closely with Jung — the shadow holds gold, not just garbage; the disowned part is hurt, not evil. But it’s worth being honest about a difference, so you can hold the idea loosely rather than as doctrine. IFS speaks of a calm, compassionate **Self** you can drop into now, in the present, to be with your parts. Jung’s Self is something larger and slower — the whole psyche’s centre, a lifelong horizon you move toward, never simply switch on.

So borrow the parts language poetically, the way this app does throughout: inner voices, figures, the one who watches. You don’t need the formal taxonomy. What carries over is the stance — meeting each part as a misunderstood protector rather than an enemy to be silenced.

[try] Bring to mind a part of you that you wish would just stop — the critic, the worrier, the one who runs. Instead of fighting it, ask it one question: “What are you afraid would happen if you didn’t do your job?” Then listen.`,
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
    chapters: ['meeting-shame', 'self-compassion', 'the-inner-critic', 'guilt-and-repair'],
    match: { qualities: ['shame', 'guilt'], flowIds: ['facing_shame', 'self_compassion', 'rain'] },
  },
  {
    id: 'figures',
    title: 'Meeting your figures',
    subtitle: 'Sitting with the parts and figures you carry',
    blurb: 'Sitting with the parts and figures you carry.',
    spine: 'sage',
    cover: 'quill-two-voices',
    chapters: ['active-imagination', 'the-inner-child', 'dreams-and-nightmares', 'the-archetypal-encounter'],
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
    chapters: ['integration', 'carrying-it-forward', 'working-with-a-therapist'],
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
      qualities: ['longing', 'grief', 'loneliness'],
      flowIds: ['active_imagination', 'archetypal', 'after_meeting', 'tensions', 'expressive_writing', 'unlived_expression'],
    },
  },
  {
    id: 'inner-cast',
    title: 'The inner cast',
    subtitle: 'The figures the psyche plays',
    blurb: 'The recurring figures inside: the Self, the wise one, the trickster, the hero, the great mother.',
    spine: 'sage',
    cover: 'mandala',
    chapters: ['the-self', 'the-wise-old-one', 'the-trickster', 'the-hero', 'the-great-mother'],
    match: {
      qualities: ['longing', 'loneliness', 'grief'],
      flowIds: ['archetypal', 'active_imagination', 'dream_figure', 'inner_child'],
    },
  },
  {
    id: 'dreams-alchemy',
    title: 'Dreams & alchemy',
    subtitle: 'The night, the symbol, and the work of turning',
    blurb: 'What the night sends, why the psyche speaks in symbols, and the alchemy of inner change.',
    spine: 'warm',
    cover: 'moon-stars',
    chapters: ['remembering-dreams', 'dreams-as-compensation', 'the-symbol', 'the-alchemical-metaphor', 'nigredo'],
    match: {
      qualities: ['fear', 'grief', 'longing', 'numbness'],
      flowIds: ['dream_figure', 'nightmare', 'active_imagination', 'draw_whats_here'],
    },
  },
  {
    id: 'everyday-shadow',
    title: 'Everyday shadow',
    subtitle: 'Spotting it in daily life',
    blurb: 'The projection inventory, what you laugh at, the feedback you resist, and anger as a signal.',
    spine: 'muted',
    cover: 'magnifier',
    chapters: ['the-projection-inventory', 'what-makes-you-laugh', 'feedback-you-resist', 'anger-as-information'],
    match: {
      qualities: ['anger', 'envy', 'jealousy', 'resentment'],
      flowIds: ['projection_recall', '321', 'persona', 'in_the_moment'],
    },
  },
  {
    id: 'family-relationships',
    title: 'Family & relationships',
    subtitle: 'What we inherit, and who we become together',
    blurb: 'The family shadow, the unlived life of the parents, projection in love, and the work of repair.',
    spine: 'clay',
    cover: 'lineage',
    chapters: ['the-family-shadow', 'the-unlived-life-of-the-parents', 'the-shadow-in-relationships', 'repair-and-rupture'],
    match: {
      qualities: ['resentment', 'shame', 'guilt', 'grief', 'anger'],
      flowIds: ['inner_child', 'self_compassion', 'facing_shame', 'reclaim_ritual'],
    },
  },
  {
    id: 'second-half',
    title: 'The second half of life',
    subtitle: 'Meaning, calling, and what time clarifies',
    blurb: 'The midlife turn, vocation, mortality as counsellor, the unlived life, and grief.',
    spine: 'warm',
    cover: 'noon-sun',
    chapters: ['the-midlife-passage', 'meaning-and-vocation', 'mortality', 'the-unlived-life', 'grief-and-letting-go'],
    match: {
      qualities: ['longing', 'grief', 'restlessness', 'loneliness', 'numbness'],
      flowIds: ['tensions', 'unlived_expression', 'after_meeting', 'expressive_writing'],
    },
  },
  {
    id: 'ways-of-working',
    title: 'Ways of working',
    subtitle: 'Practices for a pen and a quiet hour',
    blurb: 'Expressive writing, the empty chair, RAIN, focusing, and working with your parts.',
    spine: 'muted',
    cover: 'empty-chair',
    chapters: ['expressive-writing', 'the-empty-chair', 'rain', 'focusing', 'parts-work'],
    match: {
      qualities: ['anxiety', 'numbness', 'heaviness', 'restlessness', 'fear'],
      flowIds: ['expressive_writing', 'rain', 'defusion', 'body_scan', 'active_imagination'],
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
