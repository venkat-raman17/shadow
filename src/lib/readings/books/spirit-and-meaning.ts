import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'spirit-and-meaning',
    title: 'Spirit & meaning',
    subtitle: 'The numinous, meaning, and the trap of bypassing',
    blurb: 'Awe, the hunger for meaning, synchronicity, spiritual bypassing, and the symbolic life.',
    spine: 'sage',
    cover: 'radiance',
    chapters: ['the-numinous', 'the-religious-function', 'synchronicity', 'spiritual-bypassing', 'the-symbolic-life'],
    match: {
      qualities: ['longing', 'grief', 'loneliness'],
      flowIds: ['active_imagination', 'archetypal', 'tensions', 'after_meeting'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'the-numinous',
    title: 'The brush of the wholly other',
    blurb: 'Awe that arrives unbidden — and what Jung made of it.',
    cover: 'hush-of-awe',
    icon: 'hush-of-awe',
    epigraph: {
      text: 'The approach to the numinous is the real therapy.',
      attribution: 'C.G. Jung, Letters Vol. 1',
    },
    body: `There are moments that arrive larger than ordinary life — a hush of awe in a forest, at a birth, in grief, before a piece of music, inside a dream. The theologian Rudolf Otto coined a word for the quality in them: the **numinous**, from the Latin for divine power. He described it as a *mysterium tremendum et fascinans* — a mystery that makes you tremble and yet draws you in.

~ hush-of-awe | something larger brushing past

Jung borrowed the word to name the awe-struck, wholly-other texture of the deepest inner experiences. And he made a striking claim about it: that the real aim of his work was not just relieving symptoms but “the approach to the numinous,” which he called “the real therapy.” Touching something larger than the everyday self was, for him, itself a source of healing.

> The numinous happens to you. It arrives wholly outside conscious will — which is why it can’t be manufactured, only met.

There’s a quiet relief in that. You don’t have to engineer awe or chase peak experiences. You only have to stay open and notice when something larger brushes past — and to treat such moments with a little respect rather than explaining them away.

This isn’t about adopting a doctrine. It’s about recognising a texture of experience that most lives contain and most of us rush past: the moments that leave us briefly silent, and somehow rearranged.

[try] Think back to a moment that gave you a hush of awe — something larger than yourself, hard to put into words. You don’t need to explain it or repeat it. Just let yourself remember how it felt in the body.`,
  },
  {
    id: 'the-religious-function',
    title: 'The hunger for meaning',
    blurb: 'The psyche makes meaning the way the body makes hunger.',
    cover: 'altar-flame',
    icon: 'altar-flame',
    epigraph: {
      text: 'Among all my patients in the second half of life… there has not been one whose problem in the last resort was not that of finding a religious outlook on life.',
      attribution: 'C.G. Jung, Modern Man in Search of a Soul (CW 11, §509)',
    },
    body: `Working with people in the second half of life, Jung noticed something he found impossible to ignore: nearly every one of them, at root, was searching for a religious outlook on life — and many had fallen ill precisely because they had lost the kind of meaning that living traditions once gave their followers.

~ altar-flame | a small fire kept against the dark

From this he drew a careful, unconventional claim. He did not say any particular God exists. He said only that the psyche *naturally produces* religious imagery and longing — that the soul is, in his Latin phrase, *naturaliter religiosa*, religious by nature. He treated this as an observed fact about the mind, a **religious function**, not a creed to sign.

> The hunger for meaning may not be a personal failing or a sign to adopt a doctrine. It may simply be the psyche doing what it naturally does.

That reframe can be steadying. A restlessness, a flatness, a sense that life is “just” errands and achievements — Jung would read these less as something wrong with you and more as a normal appetite going unfed. The mind makes meaning the way the body makes hunger; ignore it long enough and it complains.

What feeds it is personal. For some it’s a tradition; for others, nature, art, service, love, or simply a felt sense of participating in something larger. The point isn’t which form. It’s that the appetite is real, and worth honouring rather than dismissing.

[try] Without reaching for any doctrine, notice where a sense of the sacred or the larger tends to find you — a place, a time of day, a kind of music, a kind of silence. Just name it to yourself, and let it count.`,
  },
  {
    id: 'synchronicity',
    title: 'Meaningful coincidence',
    blurb: 'When inner and outer line up — held lightly, not as fate.',
    cover: 'synchronicity',
    icon: 'synchronicity',
    body: `You think of an old friend and they call within the hour. A question you’ve been turning over is answered by a stranger’s passing remark. A symbol from last night’s dream turns up, absurdly, on the morning’s walk. Jung coined a word for these moments: **synchronicity** — a meaningful coincidence, where an inner state and an outer event line up in a way that feels significant, though neither caused the other.

~ synchronicity | two threads that meet without touching

He took the idea seriously enough to call it an “acausal connecting principle” and to correspond about it with the Nobel physicist Wolfgang Pauli. But — and this is the part most worth keeping — he framed it around *felt meaning*, never magic or prediction. The point was never that a coincidence controls events or foretells them. Only that it can carry meaning for the person living it.

> Synchronicity works best held lightly: not “what does this predict?” but “what in me does this quietly point toward?”

Held that way, it stays modest and personal. You’re not reading fate into every overlap or obeying signs. You’re letting an occasional meaningful coincidence deepen your attention to your own life — a nudge to notice, not a message to follow.

And there’s a gentle caution in it. The mind is a pattern-finder; it can manufacture significance, especially when anxious or longing for a sign. So the test isn’t “was this fated?” but “does paying attention here lead me somewhere truer?” If a coincidence opens a useful question, it’s done its quiet work, whatever its cause.

[try] If a coincidence catches your attention this week, hold it lightly and ask not “what does this predict?” but “what in me does this point toward?” Let it be a nudge to notice — nothing more.`,
  },
  {
    id: 'spiritual-bypassing',
    title: 'The shadow side of growth',
    blurb: 'When spirituality becomes a way to avoid the human.',
    cover: 'bypass-cloud',
    icon: 'bypass-cloud',
    epigraph: {
      text: 'Trying to rise above the raw and messy side of our humanness before we have fully faced and made peace with it.',
      attribution: 'John Welwood',
    },
    body: `The very tools meant to heal us can become hiding places. The psychologist and Buddhist teacher John Welwood named this in 1984 — first in his own community, and in himself: **spiritual bypassing**, using spiritual ideas and practices to sidestep unresolved emotional wounds and unfinished personal growth.

~ bypass-cloud | floating above the ground you haven’t walked

It wears gentle clothes. “Everything happens for a reason” over a grief that needs to be grieved. “Just let it go” instead of feeling the anger. Forgiveness rushed past the hurt. Meditation used to go numb rather than to meet what’s there. “Love and light” that has no room for need, rage, or fear. None of these are bad in themselves — they’re good things, reached for too early, as a way around rather than through.

> The honest question is gentle but direct: is this practice helping me feel my life, or helping me avoid it?

Welwood was careful to call bypassing an *occupational hazard* of the spiritual path, not a sign of being a bad person. Because spirituality really does involve rising above ordinary struggle, it quietly tempts everyone to skip the messy human part. The pull is built in.

This sits at the heart of shadow work, which insists on the opposite direction: down and through, not up and over. Real depth includes the raw and the unflattering — the parts “love and light” would rather not name. Welwood’s phrase for the alternative is plain: face and make peace with our humanness, *then* transcend — not instead of.

[try] Gently ask yourself: is there a comforting spiritual idea you reach for that might be helping you skip past a feeling that still needs to be felt? No need to fix it — just to see it honestly.`,
  },
  {
    id: 'the-symbolic-life',
    title: 'Living the symbolic life',
    blurb: 'Meaning is less something you find than something you live.',
    cover: 'seen-ordinary',
    icon: 'seen-ordinary',
    epigraph: {
      text: 'That gives peace, when people feel that they are living the symbolic life, that they are actors in the divine drama.',
      attribution: 'C.G. Jung, CW 18, §630',
    },
    body: `Late in his life, Jung gave a talk in which he worried that modern people were starving for something hard to name. He called it the **symbolic life** — living as though your days take part in something larger than errands and outcomes. Without it, he thought, people grow restless, empty, and prone to suffering; *we are badly in need of it*, he said.

~ seen-ordinary | the ordinary, seen as part of a larger story

This isn’t about grand belief. It’s closer to a way of seeing. A meal can be fuel, or it can be a small communion. A morning walk can be exercise, or a daily threshold crossed on purpose. Lighting a candle, marking an anniversary, keeping a ritual — these turn flat time into participation. The act is the same; the meaning is what you bring.

> Meaning is less something you find lying around, and more something you live into the ordinary.

It connects everything in this library. The dream met rather than decoded, the charge followed home, the small ritual that closes a chapter of grief — each is a way of treating your inner life as real and significant, an unfolding story you’re inside of rather than a problem to be managed.

Jung’s word for the felt result was *peace* — the quiet that comes from sensing you’re an actor in a larger drama, not a machine completing tasks. You don’t have to manufacture that. You only have to let some of your days be lived symbolically, with a little more attention to what they mean.

[try] Choose one small ritual you already have — a morning pause, lighting something, a walk, a goodnight — and for once let yourself feel it as participation in something larger, rather than another task to complete. Notice if anything settles.`,
  }
];
