import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'feelings-one-by-one',
    title: 'Feelings, one by one',
    subtitle: 'Envy, contempt, boredom, and the vulnerability of joy',
    blurb: 'Envy as a compass, jealousy and the third, contempt, boredom, and the difficulty of letting good in.',
    spine: 'warm',
    cover: 'covet-eye',
    chapters: ['envy', 'jealousy', 'contempt', 'boredom', 'the-positive-shadow'],
    match: {
      qualities: ['envy', 'jealousy', 'resentment', 'anger', 'restlessness'],
      flowIds: ['projection_recall', '321', 'golden_shadow', 'in_the_moment'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'envy',
    title: 'Envy as a compass',
    blurb: 'The sting that quietly names what you haven’t let yourself want.',
    cover: 'eye-caught',
    icon: 'eye-caught',
    epigraph: {
      text: 'The angry feeling that another person possesses and enjoys something desirable — the envious impulse being to take it away or to spoil it.',
      attribution: 'Melanie Klein',
    },
    body: `Envy is one of the feelings we’re most ashamed to admit, which is exactly why it’s worth turning toward. The psychoanalyst Melanie Klein described it plainly: the angry sense that someone else has something good, paired with the urge to take it or spoil it. That spoiling impulse is envy’s quiet signature — wanting to diminish the very thing we secretly want.

~ eye-caught | the eye that can’t look away

But envy is also unusually informative. The specific thing you envy is a clue — it names a value or a capacity you care about and haven’t given yourself permission to pursue. Read this way, **envy** is a compass, not a character flaw. The sting is data.

This is the **golden shadow** again: what you envy in someone is often a quality already in you, set down long ago because it was once unwelcome or unsafe. The person who galls you with their ease, their boldness, their freedom, may simply be holding your own unlived part up to the light.

> Envy doesn’t point at what you lack. It points at what you’ve exiled.

Klein paired envy with its antidote: gratitude. Where envy wants to spoil the good thing, gratitude lets you take it in. You don’t defeat envy by scolding yourself for it; you metabolise it by following its arrow — “what does this tell me I want?” — and then, where you can, letting the good in rather than souring it.

[try] Next time envy flares, finish this quietly: “What I envy in them is ___, and the part of me that wants that is ___.” You don’t have to act on it. Just let the wanting become visible to you.`,
  },
  {
    id: 'jealousy',
    title: 'Jealousy and the third',
    blurb: 'The fear of losing what you have — and what it’s guarding.',
    cover: 'triangle-three',
    icon: 'triangle-three',
    epigraph: {
      text: 'Envy occurs when we lack a desired attribute enjoyed by another. Jealousy occurs when something we already possess is threatened by a third person.',
      attribution: 'Richard H. Smith, PhD',
    },
    body: `We use the words interchangeably, but envy and jealousy are different feelings with different shapes. Envy is a two-person matter: you lack something another has. **Jealousy** is a three-person matter: you fear losing something you already have — usually a bond — to a rival. One is about wanting; the other is about losing.

~ triangle-three | the fear of a third at the door

That shape matters, because it tells you what jealousy is really guarding: attachment. Underneath the suspicion and the watchfulness is something tender — how much the bond means, and how frightened you are of losing it. The jealousy is loud; the love and the fear beneath it are the actual message.

> Jealousy is fear wearing armour. The armour is the part that lashes out; the fear is the part that needs hearing.

It pays to ask whether the fear is tracking something real or something old. Sometimes jealousy is accurate information about a relationship. Just as often it’s an old wound — an early loss, a betrayal, a belief that you’re replaceable — projected onto a present person who hasn’t actually done anything. The intensity is the tell: when the reaction outruns the evidence, the surplus is usually yours, arriving from somewhere earlier.

Neither extreme serves you — not blind trust that ignores real signals, not corrosive suspicion that punishes someone for a phantom. Between them is the harder, truer move: to feel the fear, name what it’s protecting, and ask it where it actually comes from.

[try] When jealousy rises, ask it two questions in turn: “What am I afraid of losing?” and “Is this fear about now, or about something older?” Let the answers sit side by side before you decide anything.`,
  },
  {
    id: 'contempt',
    title: 'Looking down',
    blurb: 'Scorn for another often guards a wound in ourselves.',
    cover: 'downturned-face',
    icon: 'downturned-face',
    epigraph: {
      text: 'Contempt, simply put, says, “I’m better than you. And you are lesser than me.”',
      attribution: 'The Gottman Institute',
    },
    body: `Of all the difficult feelings, **contempt** is the one that most convinces us it’s justified. It feels like clear sight — seeing exactly how foolish, lazy, or beneath us someone is. That certainty is what makes it worth examining.

The relationship researcher John Gottman found contempt to be the single strongest predictor of a relationship ending — more corrosive even than frequent conflict. It’s criticism’s harsher cousin: criticism attacks a behaviour (“you left the dishes”), contempt attacks the person from above (“how could you be so lazy”). The eye-roll, the mockery, the sarcasm — all of it says, *I am higher than you*.

~ downturned-face | the look that places itself above

Here’s the turn. Looking down on someone is often a way of not looking at ourselves. Following Adler, a felt sense of inferiority can flip into a show of superiority — we stand taller by making another smaller. So the trait you most witheringly despise is worth a second look: scorn runs hottest around a tender or disowned spot in us.

> Contempt is a height we climb to avoid a depth we’d rather not feel.

Gottman’s antidote isn’t willpower; it’s warmth — deliberately rebuilding fondness, noticing what you appreciate rather than only what grates. And inwardly, the move is to translate the contempt back into the plain feeling it’s armouring: not “they’re pathetic,” but “I feel hurt,” “I feel small,” “I feel afraid I’m like that too.”

[try] When you catch a flicker of contempt — an eye-roll forming, a cutting line ready — pause and translate it into a plainer sentence underneath: “I feel ___.” Just notice what’s actually there beneath the height.`,
  },
  {
    id: 'boredom',
    title: 'The desire for desires',
    blurb: 'Boredom isn’t emptiness — it’s a signal pointing somewhere.',
    cover: 'stopped-clock',
    icon: 'stopped-clock',
    epigraph: {
      text: 'The aversive experience of wanting, but being unable, to engage in satisfying activity.',
      attribution: 'John D. Eastwood et al.',
    },
    body: `We treat **boredom** as nothing — a flat, empty gap to be filled with the nearest screen. But researchers describe it as something more active and more useful: the uncomfortable experience of *wanting* to engage and being unable to find anything worth engaging in. The bored mind isn’t unmotivated. It’s restlessly, frustratedly motivated, with nowhere to put the charge.

~ stopped-clock | not empty — restless

This is why boredom and rest are opposites, not cousins. Rest is a settling-in, a contentment. Boredom is an agitation — the body and mind saying *not this, not here*. If an empty afternoon leaves you soothed, that’s rest; if it leaves you itchy and reaching for distraction, that’s boredom, and it wants the opposite of soothing.

> Tolstoy called boredom “the desire for desires” — wanting to want something. Read kindly, it’s a flag that what’s in front of you has stopped mattering.

And distraction rarely cures it, because boredom is less about your circumstances than about attention — the mind can’t find anything worthy to land on, then fixates on its own restlessness. What tends to dissolve it isn’t more stimulation but more *meaning*: something that genuinely asks for you.

So a bored hour can be quietly honest. Before reaching to numb it, you can let it ask its question: is this restlessness pointing at too little challenge, too little meaning, or simply the wrong thing for right now?

[try] The next time you feel bored, resist the reflex to scroll for sixty seconds. Instead ask: “What is this restlessness actually asking for — meaning, challenge, or rest?” Let the question sit, even unanswered.`,
  },
  {
    id: 'the-positive-shadow',
    title: 'When good is hard to let in',
    blurb: 'Joy is the most vulnerable feeling — and the hardest to receive.',
    cover: 'gift',
    icon: 'gift',
    epigraph: {
      text: 'Joy is the most vulnerable emotion we experience.',
      attribution: 'Brené Brown',
    },
    body: `Not all of what we exile is dark. For many people, the hardest thing to let in isn’t pain but **good** — praise, love, ease, joy. We brace for hardship and meet it with grace, then flinch when something tender arrives. That difficulty receiving is its own kind of shadow: the positive one.

~ gift | the good thing, waiting to be taken in

Brené Brown’s research found that joy is the most vulnerable emotion we feel. The moment something becomes precious, we sense how much there is to lose — and that tenderness can make happiness feel almost dangerous. So we do something she named **foreboding joy**: in a beautiful moment, we rehearse the catastrophe. We picture the crash, the diagnosis, the loss — trying to beat vulnerability to the punch.

> Dress-rehearsing tragedy doesn’t soften the future. It just quietly robs you of the joy that’s here now.

It makes a sad kind of sense, especially if good things once didn’t last, or came with a catch. Bracing became a way to stay safe. But the bracing is paid for in the present, for protection that never actually arrives — the blow, when it comes, hurts just as much, and you’ve missed the good in the meantime.

Brown’s antidote isn’t forced positivity; it’s gratitude as a deliberate practice — naming what’s good *while it’s here*, which is what lets you actually inhabit it. Learning to receive is a real skill, and for some of us a braver one than enduring.

[try] In your next clearly good moment, watch for the mind starting to rehearse how it could go wrong. When it does, gently name it — “foreboding joy” — and return your attention to the good thing that is, in fact, still here. Let yourself feel it for one whole breath.`,
  }
];
