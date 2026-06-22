import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'thresholds-change',
    title: 'Thresholds & change',
    subtitle: 'Endings, the in-between, and beginning again',
    blurb: 'The liminal in-between, rites of passage, endings, the fallow middle, and beginning again.',
    spine: 'warm',
    cover: 'archway',
    chapters: ['the-threshold', 'rites-of-passage', 'endings', 'the-in-between', 'beginning-again'],
    match: {
      qualities: ['grief', 'fear', 'longing', 'restlessness', 'loneliness'],
      flowIds: ['after_meeting', 'reclaim_ritual', 'tensions', 'unlived_expression'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'the-threshold',
    title: 'Betwixt and between',
    blurb: 'The disorientation of the in-between is the doorway doing its job.',
    cover: 'liminal-band',
    icon: 'liminal-band',
    body: `Every real change has a strange middle — a stretch where the old life is gone and the new one hasn’t formed. The anthropologist Victor Turner had a phrase for the people in it: *betwixt and between*. They’ve left one shore and not yet reached the next. He called this the **liminal** stage, from the Latin *limen*, threshold.

~ liminal-band | a doorway is a place you pass through, not live in

That word is a gift, because a threshold isn’t a place you live — it’s a place you move through. If you feel unmoored, unsure who you are right now, between identities, that’s not a malfunction. It’s the doorway doing its job. You are not failing at change; you are mid-crossing.

> If you feel betwixt and between, that’s not a sign something’s wrong. It’s the shape of transition itself.

Older cultures understood this and built containers for it — ceremonies, elders, a marked path — so no one had to make the crossing blind and alone. Much of the modern disorientation of change may simply be doing the threshold *without* a map. Naming the stage is a small way of rebuilding the container: *ah, I’m in the in-between. This is what it feels like. It is supposed to feel like this.*

Turner noticed something else, too: in the liminal stretch, stripped of the usual labels, people sometimes meet each other — and themselves — more honestly than when everything was certain. The undoing has its own strange openness.

[try] Without rushing to resolve anything, name where you are: still leaving something, deep in the in-between, or beginning to arrive somewhere new? You don’t have to move yourself along — just notice which doorway you’re standing in.`,
  },
  {
    id: 'rites-of-passage',
    title: 'The shape of a crossing',
    blurb: 'Separation, threshold, return — the old map of change.',
    cover: 'leave-cross-arrive',
    icon: 'leave-cross-arrive',
    body: `A century ago the folklorist Arnold van Gennep studied how cultures everywhere mark the big transitions — birth, coming of age, marriage, death — and found a recurring shape beneath the variety. Every **rite of passage**, he showed, has three parts: *separation* (leaving the old role), *transition* (the disorienting in-between), and *incorporation* (arriving, changed, into the new).

~ leave-cross-arrive | three stages: leave, cross, arrive

Notice the verb hidden in the phrase: to *pass through*. None of these traditions describe arriving instantly. They describe crossing — a process with a beginning, a hard middle, and an end. Which means the modern impatience with change (“why am I not over this yet?”) often misreads a normal stage as a personal failure.

> You are not failing at change. You are mid-crossing — and crossings take the time they take.

The same three-part shape fits the ordinary transitions of a life: a new job, a move, a breakup, a loss, becoming a parent, leaving a faith. There’s the leaving, the unsettled middle, and — eventually — the arrival. Knowing the shape doesn’t speed it up, but it can take the panic out of the middle.

What the old rites offered that we often lack is *witness* — others who knew you were crossing and marked it as real. You can rebuild a little of that for yourself: naming the passage, telling one trusted person, marking the threshold somehow, so the crossing doesn’t go unhonoured.

[try] Think of a change you’re in or just came through. Name its three parts: what you separated from, the in-between you passed (or are passing), and what you’re arriving as. Notice which stage you’re actually in — and that there is a far shore.`,
  },
  {
    id: 'endings',
    title: 'Why endings come first',
    blurb: 'A new beginning can’t land until the old thing is grieved.',
    cover: 'setting-sun',
    icon: 'setting-sun',
    epigraph: {
      text: 'First there is an ending, then a beginning, and important empty or fallow time in between.',
      attribution: 'William Bridges, Transitions',
    },
    body: `The consultant William Bridges drew a useful line between *change* and *transition*. Change is the external event — the move happens, the job ends, the relationship is over. **Transition** is the slow inner reorientation that follows, and it runs on its own, much slower clock. The event can be done in a day; the catching-up can take a season.

~ setting-sun | the day has to close before the next can open

And here is his surprising claim about order: every transition begins not with the new thing but with an *ending*. We tend to wait until the new beginning feels ready before we’ll let go of the old — but Bridges (and nature) suggest the letting-go has to come first, and the readiness follows it, not the other way around.

> A new beginning can’t truly land until the ending has been felt and grieved. Skip the goodbye and the next chapter sits on unstable ground.

This is why “just look forward” so often fails. The unfelt ending doesn’t disappear; it quietly destabilises whatever you try to build next. The grief of what’s over — even an ending you chose, even a good change — asks to be named before the new can take root.

So when something ends, it helps to let yourself say what, exactly, you’re losing: a role, a place, a version of yourself, a future you’d pictured. Endings ask to be named before they can be grieved, and grieved before the next thing can find solid ground.

[try] If something has ended, write the ending down before reaching for what’s next. What precisely are you letting go of — a role, a place, a self, an imagined future? Let it be named, even if you can’t yet feel the whole of it.`,
  },
  {
    id: 'the-in-between',
    title: 'The neutral zone',
    blurb: 'The fallow middle isn’t wasted time — it’s where things re-form.',
    cover: 'bridge',
    icon: 'bridge',
    body: `Between the ending and the new beginning is a stretch William Bridges called the **neutral zone**: an empty, fallow, disorienting middle where the old life is gone and the new one hasn’t formed. It’s the part everyone wants to skip, and the part that’s easiest to mistake for being broken or stuck.

~ bridge | the span between two shores

In a culture that prizes momentum, the neutral zone has a bad reputation. But *fallow* is an agricultural word, not a verdict. A field left fallow isn’t failing — it’s restoring what the next season will need. The empty middle of a transition is doing the same quiet work: dissolving the old shape so a new one can form, mostly out of sight.

> The in-between is not the absence of progress. It is the form progress takes when something real is reorganising.

Both Bridges and Turner insist this is where the actual transformation happens — not in the dramatic event, but in the unglamorous, unfixed middle. It can’t be rushed, and the attempts to rush it (filling every hour, forcing a decision, leaping into the next thing) usually just prolong it.

What the neutral zone asks for is unusual in a busy life: a tolerance for not-knowing. Permission to be between. Smaller commitments, more rest, fewer verdicts. It also tends to be quietly generative — many people find that insight and new direction arrive precisely in the fallow time, once they stop demanding answers.

[try] If you’re in an in-between, try treating it as fallow rather than wasted. For one day, lower the pressure to figure it all out. Ask: what would it be like to let this empty stretch rest and restore, instead of forcing it to resolve?`,
  },
  {
    id: 'beginning-again',
    title: 'Beginning again',
    blurb: 'New beginnings arrive quietly, after the ground has rested.',
    cover: 'sunrise',
    icon: 'sunrise',
    body: `Beginnings are quieter than we expect. We imagine transformation as a sunrise moment — a clear, dramatic start. More often, after the ending and the fallow middle, the new simply begins to grow: a returning interest, a little more energy, a tug toward something that wasn’t there before. You notice you’ve been moving forward only once you’re already underway.

~ sunrise | the new light comes up slowly

This is the third part of every crossing — *incorporation*, arriving changed into a new shape. And it can’t be forced into being any more than a seed can be pulled up to grow faster. It comes when the ending has been grieved and the neutral zone has done its restoring. Try to skip to it, and you build on unsettled ground; let it ripen, and it holds.

> You don’t arrive all at once. You begin again the way light returns — a little at a time, then suddenly it’s morning.

A new beginning rarely means the old is erased. You carry the crossing with you — the loss, the lessons of the fallow time, a slightly larger sense of what you can survive. That’s the boon of the journey, brought home. The you who arrives is not the you who set out, and the difference is the point.

So if you’re still in the dark of a transition, this is the quiet promise the old maps all make: there is a far shore. The crossing ends. The light comes back — and you with it, changed.

[try] Notice one small sign of a beginning, however faint — a flicker of interest, a return of appetite for something, an idea you’d set aside. You don’t have to act on it yet. Just let yourself register that the ground may be waking up.`,
  }
];
