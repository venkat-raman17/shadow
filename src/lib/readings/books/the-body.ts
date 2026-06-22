import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'the-body',
    title: 'The body',
    subtitle: 'Sensation, breath, and what the body remembers',
    blurb: 'The body as a second narrator, the breath, the nervous system, what it remembers, and letting go.',
    spine: 'sage',
    cover: 'listening-body',
    chapters: ['the-talking-body', 'the-breath', 'the-nervous-system', 'what-the-body-remembers', 'tension-and-release'],
    match: {
      qualities: ['tightness', 'heaviness', 'numbness', 'restlessness', 'anxiety'],
      flowIds: ['somatic', 'body_scan', 'grounding', 'draw_whats_here', 'urge_surf'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'the-talking-body',
    title: 'The body as a second narrator',
    blurb: 'It often knows before the mind, and is slower to lie.',
    cover: 'second-narrator',
    icon: 'second-narrator',
    epigraph: {
      text: 'What is split off, not felt, remains the same. When it is felt, it changes.',
      attribution: 'Eugene Gendlin',
    },
    body: `You have two narrators. One is the mind, with its reasons and stories. The other is the body — the tight throat, the dropped stomach, the flutter that arrives before any words. They don’t always agree, and shadow work often lives in the gap: in what the chest insists on even when the story says everything’s fine.

~ second-narrator | a knowing that arrives before words

This bodily knowing has a name. The philosopher Eugene Gendlin called it the **felt sense**: a vague, whole, pre-verbal sense of a situation — murky and meaningful at once. Not a thought, not quite an emotion. Working alongside Carl Rogers, Gendlin found that whether therapy actually helped often depended less on the technique than on whether a person could touch this felt edge of their concern, rather than only talking about it from the neck up.

> Feelings can be argued with. A clenched jaw is harder to talk out of. The body is often first to know, and last to lie.

The reason this matters for shadow work is that the body is where the disowned tends to show first. A reaction you’d deny in words announces itself in the shoulders. And Gendlin noticed something hopeful: what stays split off and unfelt stays the same — but what is genuinely felt begins to change. Turning toward the body isn’t indulgence; it’s where stuck things start to move.

You don’t interrogate the felt sense. You keep it company, the way you’d wait for a name on the tip of your tongue, until a word or image rises that makes it nod.

[try] Bring to mind something on your plate right now, then drop your attention from your head into the middle of your body. What’s the felt sense of “all of that” — not the words, the texture? Tight, heavy, jittery, hollow? Let it stay vague, and just keep it company.`,
  },
  {
    id: 'the-breath',
    title: 'The one lever you can reach',
    blurb: 'The breath is the doorway into the rest of the nervous system.',
    cover: 'lungs',
    icon: 'lungs',
    body: `Most of the body runs itself. The heart beats, the gut digests, the glands release — all without asking you. But there’s one autonomic function you can consciously take the wheel of: the **breath**. That makes it a doorway, the one place where conscious attention can reach in and influence the rest of the system.

~ lungs | the one rhythm you can steer

There’s a quiet mechanism behind why this works. On the in-breath, the heart speeds very slightly; on the out-breath, the calming influence of the vagus nerve returns and the heart slows. So a longer, slower *exhale* tends to nudge the body toward its “rest and restore” state. You don’t have to believe in anything; you can feel it — extend the out-breath and notice the shoulders drop a little on their own.

> You can’t order the body to calm down. But you can lengthen one out-breath, and let the calming be allowed rather than forced.

This is why “just relax” so rarely works, while a single slow exhale often does. The command is aimed at a part of you that doesn’t take orders; the breath speaks the body’s own language.

A caution worth keeping: breath work is a steadying tool, not a way to override real distress or to power through something that wants stopping. If slowing the breath increases panic rather than easing it, that’s a sign to stop and ground another way, not to push.

[try] Take one breath where the out-breath is a little longer than the in-breath. Don’t force calm — just notice whether anything in your shoulders or jaw lets go on its own. That small release is the body doing what it already knows how to do.`,
  },
  {
    id: 'the-nervous-system',
    title: 'Safety comes before insight',
    blurb: 'A body that reads “danger” can’t be reasoned into calm.',
    cover: 'nerve-branch',
    icon: 'nerve-branch',
    body: `Underneath thought, your body is always scanning — beneath awareness — for cues of safety or danger. Stephen Porges named this constant, automatic reading **neuroception**: a process, distinct from conscious perception, that registers whether a situation is safe, risky, or threatening, and shifts your state accordingly. Settled and connected; mobilised for fight-or-flight; or shut down and numb.

~ nerve-branch | the body decides safe or unsafe before you do

This is worth holding as a useful map, not settled doctrine — some of the specifics are still debated. But the practical takeaway is solid and freeing: **you cannot reason yourself into calm if your body has read “danger.”** A sense of safety usually has to come first, through the body — a slower breath, a softer voice, a kind face, steady ground — and the thinking mind follows.

It pairs with Dan Siegel’s **window of tolerance**: the band of arousal where you can feel something and still think clearly. Above the window is overwhelm (racing, panic); below it is shutdown (numb, far-away). Reflection only works inside the window — which is why grounding isn’t a detour from the work but the thing that makes the work possible.

> The most useful “work” is sometimes just helping the body feel a little safer — and letting that be enough for today.

This quietly overturns the self-improvement instinct to push harder. The body won’t show you its depths while it’s braced for threat. Safety isn’t the reward at the end; it’s the doorway at the start.

[try] Find one cue of safety in the room right now — a warm mug, the floor under your feet, the next slow breath. Let the body register it before you ask anything more of yourself.`,
  },
  {
    id: 'what-the-body-remembers',
    title: 'What the body remembers',
    blurb: 'Some things are held in tension and breath, not in words.',
    cover: 'body-imprint',
    icon: 'body-imprint',
    epigraph: {
      text: 'Physical self-awareness is the first step in releasing the tyranny of the past.',
      attribution: 'Bessel van der Kolk, The Body Keeps the Score',
    },
    body: `Bodies remember in a different language than words. A feeling the mind hasn’t named can be held in a clenched jaw, a held breath, curled shoulders, a stomach that drops on cue. The psychiatrist Bessel van der Kolk gathered this under a now-famous phrase: **the body keeps the score** — the imprint of overwhelming experience is carried not only as story, but in the body’s tension, guardedness, and readiness.

~ body-imprint | a feeling held in the shape of the body

Held lightly, this is a kind reframe. The reaction that seems to come from nowhere — the flinch, the freeze, the sudden flood — may not be irrational at all. It may be the body remembering something faithfully, in the only language it has.

> The body is often telling the truth about the past, even when the mind has moved on.

There are two honesties to keep close here. First, posture and feeling run in a loop: noticing how you’re holding yourself can surface what’s underneath, and gently changing the shape can shift the feeling a little. Second — and this matters most — *this is reflection, not treatment*. Noticing the body can open old material faster than expected.

[note] If turning toward the body brings up something that feels too big — flooding, panic, numbness you can’t come out of — that is information, not failure. Stop, feel your feet on the floor or cold water on your hands, and reach toward a real person. Deep trauma held in the body is worked with slowly, and usually with someone alongside you — not alone on a page. The Support screen has directories.`,
  },
  {
    id: 'tension-and-release',
    title: 'Holding and letting go',
    blurb: 'Tension you can feel is tension you can begin to loosen.',
    cover: 'knot',
    icon: 'knot',
    body: `Much of what we carry, we carry in the muscles. The body braces — against a hard conversation, a deadline, an old fear — and then forgets to unbrace. The holding becomes a posture, the posture becomes a baseline, and we stop noticing it’s there at all. A clenched jaw at rest. Shoulders living up near the ears. A belly that never quite softens.

~ knot | what is gripped can, in time, be loosened

The first move is simply to find it. Tension you can feel is tension you can begin to release; tension you’ve normalised just runs in the background, quietly draining you. A slow scan — jaw, throat, shoulders, chest, belly, hands — often turns up a knot you didn’t know you were keeping.

> You can’t loosen what you can’t feel. Noticing the grip is most of the letting-go.

And the body knows how to release, given the chance. Tightening a muscle deliberately and then letting it drop, a long exhale, a stretch, a shake, warmth — these don’t force relaxation so much as permit it. Often the feeling that was stored in the holding moves too: a held breath releases and unexpected tears or relief come with it. That’s normal; the body was carrying more than the muscle.

This is gentle, ordinary work — not a technique to master, just a returning. The body has been holding on; you’re letting it know it can set the weight down for a moment.

[try] Scan slowly from jaw to shoulders to belly to hands. Where are you holding? Pick one spot, tighten it a little more on an in-breath, then let it go completely on a long out-breath. Notice what, if anything, softens — and whether any feeling comes with the release.`,
  }
];
