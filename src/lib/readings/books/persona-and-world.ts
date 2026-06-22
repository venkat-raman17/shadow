import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'persona-and-world',
    title: 'The persona & the world',
    subtitle: 'The mask at work, money, status, and the curated self',
    blurb: 'The mask at work, what money stirs, hollow status, the online self, and the imposter feeling.',
    spine: 'muted',
    cover: 'desk-mask',
    chapters: ['the-mask-at-work', 'money-and-the-shadow', 'status-and-success', 'the-digital-self', 'the-imposter-feeling'],
    match: {
      qualities: ['shame', 'envy', 'resentment', 'anxiety'],
      flowIds: ['persona', 'projection_recall', 'golden_shadow', '321'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'the-mask-at-work',
    title: 'The mask at work',
    blurb: 'When the role stops being something you wear and becomes who you think you are.',
    cover: 'held-mask',
    icon: 'held-mask',
    epigraph: {
      text: 'These identifications with a social role are a very fruitful source of neuroses.',
      attribution: 'C.G. Jung, CW 7, §307',
    },
    body: `A title is a kind of mask — useful, often necessary, the face you put on to do a job and meet the world. Jung had no quarrel with that. The **persona** is a sensible compromise between who you are and what the situation needs. The trouble starts only when you forget it’s a mask.

~ held-mask | the role is a face you put on, not the face you have

Jung’s word for the trouble is identification: when you stop wearing the role and start believing you *are* it — the title, the function, the rank. He called this “a very fruitful source of neuroses,” and noticed a hidden cost. The disowned parts don’t vanish; they leak out sideways as moods, compulsions, small vices — and often land on the people closest to you rather than on the polished self at the office.

> An office’s dignity, Jung noted, “rests solely on collective approval.” It was lent to you by many hands. You can set it down.

There’s a tell. When the role is threatened — a demotion, a retirement, a project that fails — the reaction is out of all proportion, because it isn’t the job that feels at risk; it’s the self. That disproportion is the signal that the mask has fused to the face.

The remedy isn’t to throw off the role. Jung never asked for that. It’s to remember it’s a mask: a held mask is a tool, a forgotten one is a cage.

[try] Finish this a few times, without editing: “Apart from what I do, I am…”. Notice how easy or hard it is to answer once the titles are set aside — and let whatever’s hard to reach be the interesting part.`,
  },
  {
    id: 'money-and-the-shadow',
    title: 'What money stirs',
    blurb: 'Money carries everything we won’t admit — worth, fear, power.',
    cover: 'coins',
    icon: 'coins',
    body: `Money is one of the most reliable carriers of the shadow, because so much we won’t say out loud gets quietly bundled into it: greed, the fear of not having enough, the hunger for power, and the secret equation of net worth with self-worth. Then we project the whole charged package outward — onto the rich, the poor, the spender, the miser, the sibling who earns more.

~ coins | the number is rarely about the number

That’s why money fights are so rarely about money. The flare of envy, shame, or panic around a figure is the shadow speaking. A bill, a salary, a price tag touches some place where worth, safety, or belonging got outsourced to a number — and the size of the feeling is the measure of how much got stored there.

> Money rarely upsets us about money. It upsets us about worth, safety, and power — wearing money’s clothes.

This is gentle, not accusatory. Everyone has a money shadow, because everyone grew up absorbing unspoken rules about it — what was shameful to want, what was dangerous to lack, what it meant about a person. Those rules went underground and kept running.

The work isn’t to feel nothing about money, or to pretend it doesn’t matter. It’s to notice the charge and trace it home: not “how do I get more / spend less,” but “what is this feeling actually about?”

[try] Recall the last time money stirred something — a pinch of envy, a flash of fear, a small flex of pride. Name the feeling under the number. Was it really about safety, worth, power, or belonging?`,
  },
  {
    id: 'status-and-success',
    title: 'Why the applause doesn’t land',
    blurb: 'Success aimed at the mask can’t reach the person behind it.',
    cover: 'ladder',
    icon: 'ladder',
    epigraph: {
      text: 'In the second half of life, the questions become: Who, apart from the roles you play, are you?',
      attribution: 'James Hollis',
    },
    body: `Here is a quiet puzzle many people meet: you reach the thing you were climbing toward — the promotion, the recognition, the number — and the satisfaction is strangely thin. More of it doesn’t help. Sometimes more of it makes the emptiness worse.

~ ladder | the climb that arrives, and somehow doesn’t

The reason is in Jung’s own definition of the persona: it is “that which in reality one is not.” Applause aimed at the mask can’t reach the person behind it. Praise the role, and the role glows; the self stays hungry, because it wasn’t fed. This is why status can leave you emptier the more you accumulate — you’re filling the wrong vessel.

James Hollis calls the version of us that gets fused to achievement the **role-self** — the provisional identity built to win approval, while the deeper question of who you actually are goes unanswered. His reframe is kinder than “you’re doing too much”: maybe you’ve become identical with a function, and the rest of you is quietly protesting for room to live.

> Success that feeds the mask starves the self. That’s not a flaw in you; it’s the wrong nourishment.

None of this means ambition is bad or achievement empty. It means achievement aimed at proving your worth will never quite prove it. The hunger eases not with more applause, but when some of your living is done for its own sake, where no one is keeping score.

[try] Bring to mind a success that mattered less than you expected. Ask gently: who was that for — the role, or me? And what is one small thing I’d do this week even if no one ever knew I did it?`,
  },
  {
    id: 'the-digital-self',
    title: 'The curated self',
    blurb: 'Comparing your inside to everyone else’s edited outside.',
    cover: 'screen-face',
    icon: 'screen-face',
    body: `A social feed is a persona you can edit infinitely — and that is exactly the old danger Jung named, sped up and handed to everyone. We post the highlights, not the Tuesdays. The self on the screen is a mask at scale, and every filter widens the gap between the appearing-self and the living one.

~ screen-face | the highlight reel is not the life

There’s a plain mechanism underneath the ache. The psychologist Leon Festinger showed that when there’s no objective yardstick for how we’re doing, we reach for other people as the measure. Comparison isn’t vanity; it’s how the mind tries to locate itself. The problem is the material: online, you compare your unedited inside to everyone else’s curated outside. Researchers find this *upward comparison* — measuring yourself against people who seem to be doing better — among the most consistent links between social media and feeling worse.

> You compare your behind-the-scenes to everyone else’s highlight reel, and then wonder why you come up short.

And the unlived remainder doesn’t disappear. Every hour spent performing a self is an hour not spent living one; the gap between the two becomes its own quiet shadow, waiting.

The point isn’t to renounce the feed. It’s to notice the comparison as it happens — to see it as the mind reaching for a yardstick, not delivering a verdict — and to keep some of your life off-stage, where it doesn’t have to be shown to count.

[try] Catch one comparison today — someone who seems further ahead. Notice it without obeying it. Then scroll your own feed as if it were a stranger’s, and name one ordinary, unposted part of your week that it left out.`,
  },
  {
    id: 'the-imposter-feeling',
    title: 'The imposter feeling',
    blurb: 'The fear of being found out may be the fear of your own gold.',
    cover: 'cracked-mask',
    icon: 'cracked-mask',
    epigraph: {
      text: 'People are as frightened of their capacity for nobility as of their darkest sides.',
      attribution: 'Robert A. Johnson, Owning Your Own Shadow',
    },
    body: `Almost everyone, somewhere, carries a quiet dread of being found out — the sense that the competence is a front, that any moment someone will see through it. We call it the imposter feeling, and we usually read it as proof of fraudulence.

Robert Johnson offers a startling reframe. Some of what feels like fraud is the **terror of the gold** — the vertigo of standing in real worth or ability you haven’t yet agreed to own. The fear, in that reading, isn’t measuring how little there is. It’s measuring how much there is to claim.

~ cracked-mask | the crack is where the real self shows through

This is the golden shadow turned inward. We can disown our gifts as firmly as our faults — and owning the gold, Johnson found, is often *more* frightening than owning the dark, because nobility makes a demand. If the competence is really yours, you have to live up to it. Far safer, the psyche reasons, to call it a fluke.

> The flinch when praise lands on something true is not always humility. Sometimes it’s the gold, refusing to be claimed.

None of this denies that we all have real gaps and beginnings; humility about what you don’t yet know is healthy. The imposter *feeling* is different — it discounts what you’ve genuinely earned. The tell is that flinch when a true compliment slides off the mask instead of landing.

[try] Catch a compliment you’d normally deflect. Instead of brushing it off, try receiving it for three slow breaths. Notice what the discomfort is made of — and whether some of it is the quiet fear of having to live up to something real.`,
  }
];
