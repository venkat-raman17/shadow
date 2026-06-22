import type { Book, Reading } from '../types';

export const book: Book = {
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
  };

export const readings: Reading[] = [
  {
    id: 'the-midlife-passage',
    title: 'When the first-half map runs out',
    blurb: 'The turn from building outward to turning inward.',
    cover: 'sun-arc-turn',
    icon: 'sun-arc-turn',
    epigraph: {
      text: 'We cannot live the afternoon of life according to the programme of life’s morning; for what was great in the morning will be little at evening.',
      attribution: 'C.G. Jung, “The Stages of Life” (CW 8, §784)',
    },
    body: `Jung pictured a life as the sun crossing the sky. In the morning it climbs, pouring its light outward, widening its reach. At noon it stands at its height. And in the afternoon it begins to draw its rays back in — turning, slowly, from spreading light to illuminating itself.

The first half of life is mostly that morning climb: building an identity, a place in the world, a career, a family — answering the questions the world puts to you. *What will you be? Who will you belong to?* And for a while, the climbing is the right work.

~ sun-arc-turn | at the top of the arc, the light begins to turn inward

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
    cover: 'vocation-pull',
    icon: 'vocation-pull',
    epigraph: {
      text: 'Why is the life we are living too small for the soul’s desire?',
      attribution: 'James Hollis',
    },
    body: `The Jungian analyst James Hollis frames the deep question of the second half of life with disarming simplicity: *why is the life we are living too small for what the soul wants?*

“Too small” is a kinder diagnosis than “something is wrong with you.” It reframes a restlessness many people feel not as a defect but as a sign you’ve outgrown a shape that once fit. The discomfort is information, not failure.

~ vocation-pull | a quiet pull, asking to be followed

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
  }
];
