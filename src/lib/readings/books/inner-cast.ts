import type { Book, Reading } from '../types';

export const book: Book = {
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
  };

export const readings: Reading[] = [
  {
    id: 'the-self',
    title: 'The centre you circle',
    blurb: 'The whole of you — not the “I” you take yourself to be.',
    cover: 'whole-house',
    icon: 'whole-house',
    epigraph: {
      text: 'The self is not only the centre, but also the whole circumference which embraces both conscious and unconscious.',
      attribution: 'C.G. Jung, CW 12, §44',
    },
    body: `There’s the “I” you usually mean when you say your name — the centre of your waking attention, the part that plans and worries and decides. Jung called that the ego. And then there’s something larger: the **Self**, the whole of you, conscious and unconscious together, with an ordering centre of its own. The ego is the lit room. The Self is the whole house, most of it in the dark.

The Self isn’t something you build or achieve. It’s already there, quietly working to make you whole — to bring the exiled parts back into relationship rather than leaving them scattered.

~ whole-house | the lit room, inside the whole house

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
  }
];
