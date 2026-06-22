import type { Book, Reading } from '../types';

export const book: Book = {
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
  };

export const readings: Reading[] = [
  {
    id: 'remembering-dreams',
    title: 'Catching what the night sends',
    blurb: 'How to keep the door open before the dream fades.',
    cover: 'bedside-note',
    icon: 'bedside-note',
    epigraph: {
      text: 'The dream is a little hidden door in the innermost and most secret recesses of the soul.',
      attribution: 'C.G. Jung, CW 10, §304',
    },
    body: `A dream is brief hospitality. The door opens for a few minutes on waking, and then the daylight mind reasserts itself and the images dissolve. Most “I never remember my dreams” is really “I never caught them in time.”

So the practice begins the night before, with a small act of readiness: a notebook and pen within arm’s reach of the bed. You don’t have to use it. You’re just leaving the door propped, in case something comes through.

~ bedside-note | the door opens briefly, each morning

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
    cover: 'night-counterweight',
    icon: 'night-counterweight',
    epigraph: {
      text: 'Dreams are impartial, spontaneous products of the unconscious psyche… They are pure nature; they show us the unvarnished, natural truth.',
      attribution: 'C.G. Jung, CW 10, §317',
    },
    body: `Jung’s most useful idea about dreams is also his gentlest: a dream **compensates**. Where your waking attitude has leaned too far one way, the dream quietly tilts the other, to bring the whole person back toward balance. He defined it plainly — “balancing and comparing different points of view so as to produce an adjustment.” It’s the psyche self-correcting, the way the body sweats to cool itself.

This reframes the unsettling dream entirely. The one that frightens or embarrasses you isn’t punishing you; it’s handing back the part you left out.

~ night-counterweight | the night returns what the day left out

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
  }
];
