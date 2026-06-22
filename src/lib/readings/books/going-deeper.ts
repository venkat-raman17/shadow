import type { Book, Reading } from '../types';

export const book: Book = {
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
  };

export const readings: Reading[] = [
  {
    id: 'individuation',
    title: 'Becoming who you are',
    blurb: 'The long arc shadow work belongs to — coming to selfhood.',
    cover: 'slow-circling',
    icon: 'slow-circling',
    epigraph: {
      text: 'There is no linear evolution; there is only a circumambulation of the self.',
      attribution: 'C.G. Jung, Memories, Dreams, Reflections',
    },
    body: `Shadow work isn’t a stand-alone task. It’s one movement inside a longer arc Jung called **individuation** — “coming to selfhood,” becoming the particular, whole person you already are by reclaiming the parts that were left out. Not becoming special, or separate, or improved. Becoming undivided.

It helps to hold two centres apart. There’s the **ego** — the centre of waking consciousness, the “I” you usually take yourself to be, the lit room. And there’s the **Self** — the organizing centre of the whole psyche, conscious and unconscious together, the house around the room in the dark. Individuation isn’t the ego building something new. It’s the ego coming into right relationship with a larger centre that was there all along.

~ slow-circling | not a straight climb — a slow circling of the centre

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
    cover: 'splinter-psyche',
    icon: 'splinter-psyche',
    epigraph: {
      text: 'Everyone knows nowadays that people “have complexes.” What is not so well known… is that complexes can have us.',
      attribution: 'C.G. Jung, A Review of the Complex Theory (CW 8, §200)',
    },
    body: `Sometimes you’re not quite yourself. A small remark lands and suddenly you’re flooded, certain, ten years old — and only later, cooler, do you wonder who that was. Jung had a precise word for it: a **complex**.

A complex is a “feeling-toned” cluster of images and memories grouped around a charged core. He described it as behaving “like an animated foreign body in the sphere of consciousness,” and called complexes “splinter psyches” — small partial personalities that split off after shock or repeated wounding. Everyone has them; they aren’t a flaw. The everyday signs are familiar: the wrong word slips out, you blank on a name mid-introduction, your throat tightens at the quietest moment.

~ splinter-psyche | a complex doesn’t ask permission — it grabs the wheel

The useful thing is that a complex is often felt in the body before it’s understood — the flush of heat, the clenched jaw, the reaction out of all proportion. That disproportion is the same signal that points to projection, and it’s the doorway here too.

> The work isn’t to never be taken over. It’s to notice, a little sooner each time, that you have been.

There’s a related law worth knowing, because it explains a lot of sudden reversals. Jung borrowed from Heraclitus the word **enantiodromia** — “a running toward the opposite”: a thing pushed to its extreme tends to convert into its opposite. The relentlessly nice person who erupts. The crusader who becomes what they fought. A virtue practised one-sidedly quietly recruits its own shadow, and the only real brake is consciousness — an attitude that can hold both sides is far less likely to be flipped without warning.

[try] When a reaction feels far bigger than the moment deserves, pause and ask gently: “Who in me just took over?” Naming it as a part — not as the whole of you — loosens its grip a little.`,
  }
];
