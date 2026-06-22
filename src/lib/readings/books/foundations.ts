import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'foundations',
    title: 'What the shadow is',
    subtitle: 'Where it comes from, and the mask that casts it',
    blurb: 'Where the shadow comes from, and the mask that casts it.',
    spine: 'sage',
    cover: 'figure-and-shadow',
    evergreen: true,
    chapters: ['what-the-shadow-is', 'persona-and-the-mask', 'personal-and-collective'],
  };

export const readings: Reading[] = [
  {
    id: 'what-the-shadow-is',
    title: 'What the shadow is',
    blurb: 'The parts of you that didn’t fit — dark and golden alike.',
    cover: "shadow-cast",
    icon: "shadow-cast",
    epigraph: {
      text: "Everyone carries a shadow, and the less it is embodied in the individual’s conscious life, the blacker and denser it is.",
      attribution: 'C.G. Jung, Psychology and Religion (CW 11, §131)',
    },
    body: `The shadow is a simple idea with a long reach: it’s the parts of yourself you’ve refused to acknowledge. Jung named it not by its content but by your relationship to it — **the shadow** is, in his plainest phrase, “the thing a person has no wish to be.”

That refusal is the whole definition. The shadow isn’t a fixed list of bad traits; it’s whatever you can’t picture yourself being. For a gentle person it may hold a healthy anger. For a tireless one, the wish to rest. It is always personal to you.

It forms early, and mostly without villains. As a child you absorb — from family, school, the people around you — what’s welcome and what isn’t. “Good girls don’t get angry.” “Big boys don’t cry.” Whatever gets labelled too much, too loud, not allowed gets pressed out of sight. The poet Robert Bly pictured it as a long bag we drag behind us, stuffing in everything the grown-ups frowned on — and then spending the rest of life trying to get it back out.

~ shadow-cast | what we won’t own doesn’t leave — it walks behind us

Here’s the part people miss: the shadow isn’t only the difficult stuff. Jung was emphatic that it holds “a number of good qualities, such as normal instincts, appropriate reactions, realistic insights, creative impulses.” Ambition in a family that prized humility. Softness in a household that prized toughness. Creativity no one had room for.

> The shadow is both a cellar and a treasure chest.

And it grows in the dark. The less of it you live consciously, the denser and more charged it becomes — which is why a disowned trait so often feels monstrous, while the same trait, owned and lived, stays in proportion.

This app isn’t here to help you fix what’s wrong with you. There’s nothing to fix. It’s here to help you meet the parts that were exiled — and slowly, to let them back in.

[try] Listen this week for the sentence “I’m not the kind of person who…”. Whatever fills that blank is often a corner of the shadow — worth turning toward with curiosity rather than agreement.`,
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
  }
];
