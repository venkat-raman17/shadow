import type { Book, Reading } from '../types';

export const book: Book = {
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
  };

export const readings: Reading[] = [
  {
    id: 'expressive-writing',
    title: 'Writing it out',
    blurb: 'Putting the upheaval into words, for no one’s eyes.',
    cover: "unstopped-pen",
    icon: "unstopped-pen",
    epigraph: {
      text: "Don’t worry about spelling, sentence structure, or grammar. The only rule is that once you begin writing, continue to do so until your time is up.",
      attribution: 'James Pennebaker (expressive-writing instructions)',
    },
    body: `One of the most studied self-help practices there is comes down to something plain: take an emotional upheaval and write about it — your deepest thoughts and feelings — continuously, for about fifteen or twenty minutes, across a few days. No audience, no editing. The psychologist James Pennebaker built decades of research on exactly this.

~ unstopped-pen | the pen keeps moving

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
    cover: "say-it-to-chair",
    icon: "say-it-to-chair",
    body: `Here’s a technique from Gestalt therapy, simple to describe and surprisingly powerful to do: put a person — or a part of yourself — in an imagined chair across from you, and actually speak to them. Out loud, in the present tense. Then, when you’re ready, switch chairs and answer back from the other side.

~ say-it-to-chair | the seat is empty, and somehow not

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
  }
];
