import type { Book, Reading } from '../types';

export const book: Book = {
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
  };

export const readings: Reading[] = [
  {
    id: 'the-family-shadow',
    title: 'What the family didn’t say',
    blurb: 'The atmosphere you grew up breathing, and still carry.',
    cover: 'inherited-weather',
    icon: 'inherited-weather',
    epigraph: {
      text: 'The things which have the most powerful effect upon children do not come from the conscious state of the parents but from their unconscious background.',
      attribution: 'C.G. Jung, CW 17',
    },
    body: `Every family has a shadow — the things it couldn’t look at, the feelings that weren’t allowed, the subjects that made the room go quiet. You absorbed it before you had words, the way you absorbed a first language: not from what was said, but from the atmosphere underneath.

Jung put it precisely: what shapes a child most is not the parents’ conscious intentions but their unconscious background — the held breath, the avoided topic, the unspoken tension. A child reads the weather of a home far more deeply than any spoken rule.

~ inherited-weather | what one generation can’t hold, the next tends to carry

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
    cover: 'handed-dream',
    icon: 'handed-dream',
    epigraph: {
      text: 'Nothing exerts a stronger psychic effect upon the human environment, and especially upon children, than the life which the parents have not lived.',
      attribution: 'C.G. Jung, “Paracelsus” (CW 15, §4)',
    },
    body: `Of all Jung’s observations about families, this is the most haunting — and the most freeing once you see it. The single strongest influence on a child, he thought, is not what the parents did or said, but **the life they did not let themselves live**: their set-aside dreams, abandoned gifts, quietly buried longings.

Those unlived lives don’t simply evaporate. Jung said they get passed on “in substitute form” — the child may unconsciously take up the very dream a parent abandoned, and live it out as if it were their own.

~ handed-dream | one life casts a shadow into the next

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
  }
];
