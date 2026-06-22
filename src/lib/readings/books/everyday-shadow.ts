import type { Book, Reading } from '../types';

export const book: Book = {
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
  };

export const readings: Reading[] = [
  {
    id: 'the-projection-inventory',
    title: 'Listing who you can’t stand',
    blurb: 'The traits that enrage you are a map of your own shadow.',
    cover: 'allergy-list',
    icon: 'allergy-list',
    epigraph: {
      text: 'Everything that irritates us about others can lead us to an understanding of ourselves.',
      attribution: 'C.G. Jung, Memories, Dreams, Reflections',
    },
    body: `Here’s a practice you can do with a pen and a few honest minutes — drawn from William Miller’s account of finding the shadow in daily life. Make a **projection inventory**: list the traits you genuinely can’t stand in other people. The arrogant, the needy, the smug, the loud, the weak — whatever your particular allergies are.

Then read the list a second way. Not as a description of other people, but as a quiet map of you.

~ allergy-list | the charge points back toward its source

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
  }
];
