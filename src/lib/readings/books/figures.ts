import type { Book, Reading } from '../types';

export const book: Book = {
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
  };

export const readings: Reading[] = [
  {
    id: 'active-imagination',
    title: 'Talking with what you’ve exiled',
    blurb: 'How writing a two-way dialogue becomes real inner work.',
    cover: 'two-voices-page',
    icon: 'two-voices-page',
    epigraph: {
      text: 'Take the unconscious in one of its handiest forms… Give it your special attention, concentrate on it, and observe its alterations objectively.',
      attribution: 'C.G. Jung, Mysterium Coniunctionis (CW 14, §749)',
    },
    body: `**Active imagination** is Jung’s method for meeting a part of yourself directly. You take a charged image — a figure from a dream, a feeling with a shape, an inner critic — and you let it speak. Then you answer. Both voices, written down. He developed it during his own “confrontation with the unconscious” after 1913, first in plain notebooks, later worked up into the painted Red Book.

It isn’t daydreaming, where the mind drifts or scripts a wish. Here the ego stays present: it questions, it answers, it holds its ground. The two-layer rhythm Jung himself used is worth borrowing — first the raw exchange caught live, then, days later, a slower re-reading that adds meaning.

~ two-voices-page | two voices on the page — yours, and the one you’ve exiled

The writing matters. Putting it on the page gives the encounter a kind of physical existence; it stops the mind from later waving it away as “just imagination.”

There’s one test for whether it’s working: are you surprised? If the figure says exactly what you’d have written anyway, you’re steering.

> Genuine contact produces answers that feel like they come from somewhere not-quite-you.

That’s the point — you’re no longer talking about the part, you’re talking with it. Robert Johnson, distilling the method into four steps, named the two most people skip: bring your own values into the room (you’re allowed to disagree with an inner figure), and let it change something afterward. An insight that stays only in the imagination hasn’t landed.

[try] Pick one figure who turned up recently — in a dream, a strong mood, a person you can’t stop reacting to — and write “Hello. Who are you?” at the top of a page. Then write whatever answer arrives, even if it feels made up. Keep the pen moving.`,
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
    id: 'dreams-and-nightmares',
    title: 'Figures from dreams',
    blurb: 'Meeting what the night sends, without decoding it.',
    cover: 'night-edit',
    icon: 'night-edit',
    epigraph: {
      text: 'To me, dreams are a part of nature, which harbours no intention to deceive, but expresses something as best it can.',
      attribution: 'C.G. Jung, Memories, Dreams, Reflections',
    },
    body: `Dreams don’t argue; they show. Jung didn’t see the dream as a disguise hiding a forbidden wish, but as the psyche showing its situation as plainly as it can. Its obscurity, he thought, is mostly our own lack of understanding, not the dream’s attempt to hide.

A shadow figure often turns up as a stranger of your own sex — someone you’d rather avoid, chase off, or run from. That urge to look away is itself part of the message. The figure isn’t usually a villain to defeat; it’s a disowned part of you, carrying something you’ve over-corrected against.

~ night-edit | the night shows you what daylight edited out

You don’t have to interpret a dream to work with it. Decoding can become its own way of keeping the image at arm’s length. Instead, you can meet the figure the way you’d meet any part: ask what it wants, let it answer in its own words.

> Let the image stay an image. Its meaning tends to arrive not by being solved, but by being met.

A recurring nightmare can be met too — and here there’s a second, gentler tool. The leading non-drug approach to chronic nightmares, Imagery Rehearsal, is strikingly simple and done fully awake: recall the dream, change it any way you wish, and rehearse the new version in your imagination a little each day. You need not revisit the worst moment. Change an earlier scene, add an ally, open a door that wasn’t there. The point is authorship, not correctness — a felt sense that the ending is no longer the only one available to you.

[note] If a dream is a meaningful shadow encounter, it often wants to be met and stayed with. If it’s a punishing, repetitive trauma-nightmare, it often wants to be re-shaped so sleep feels safe again. Honouring that difference is its own kind of care.`,
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
  }
];
