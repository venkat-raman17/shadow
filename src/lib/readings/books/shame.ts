import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'shame',
    title: 'Shame & self-compassion',
    subtitle: 'Meeting the part that learned it was not enough',
    blurb: 'Meeting the part that learned it was not enough.',
    spine: 'clay',
    cover: 'hand-on-heart',
    chapters: ['meeting-shame', 'self-compassion', 'the-inner-critic', 'guilt-and-repair'],
    match: { qualities: ['shame', 'guilt'], flowIds: ['facing_shame', 'self_compassion', 'rain'] },
  };

export const readings: Reading[] = [
  {
    id: 'meeting-shame',
    title: 'Meeting shame with compassion',
    blurb: 'Why shame needs kindness before it can be looked at.',
    cover: 'seed',
    icon: 'seed',
    epigraph: {
      text: 'Shame cannot survive being spoken. It cannot survive empathy.',
      attribution: 'Brené Brown',
    },
    body: `Guilt and shame feel similar but aren’t. **Guilt** says “I did something bad” — it’s about an action, and it can be faced and repaired. **Shame** says “I am bad” — it’s about your whole self, and it demands that you hide. Guilt can motivate change; shame, as the trauma educator Tim Fletcher’s work puts it, tends to paralyse.

Because shame is about identity, looking straight at it with ordinary introspection often backfires: it just hands the inner critic a microphone. Turning toward a shamed part while you’re still braced is like shining a spotlight on someone already cringing — it reads as more exposure, the very thing shame dreads.

~ seed | met with warmth first, a tender part can begin to grow

So the order matters. Shame needs something built first — a container. Brené Brown found that shame needs three things to grow: secrecy, silence, and judgment. The antidote is their opposite — being met, even by yourself on the page, with kindness.

> Compassion comes before disclosure.

You speak to the part that carries the shame the way you’d speak to a frightened child who came to believe something untrue about themselves. And you can listen for whose voice the shame even speaks in — often it has a borrowed accent, a parent or teacher, which is the moment it stops sounding like the truth and starts sounding like a recording.

Then you ask what it needs — usually something plain: safety, rest, to be believed.

Shame survives in silence. It loosens, a little at a time, when it’s finally met in the presence of kindness — even your own.

[try] When a harsh thought lands, notice the verb. Is it “I did something bad,” or “I am bad”? You don’t have to fix it — just seeing which one it is can loosen its grip.`,
  },
  {
    id: 'self-compassion',
    title: 'Turning toward yourself',
    blurb: 'Meeting your own pain the way you’d meet a friend’s.',
    cover: 'warmth-first',
    icon: 'warmth-first',
    epigraph: {
      text: 'This is a moment of suffering. Suffering is a part of life. May I be kind to myself.',
      attribution: 'Kristin Neff, the Self-Compassion Break',
    },
    body: `When something in you hurts, the reflex is often to criticize or to look away. **Self-compassion** is a third option, and the researcher Kristin Neff describes it in three movements.

Kindness instead of self-criticism: speaking to yourself the way you would to someone you love who was struggling. Common humanity instead of isolation: remembering that pain and failure are part of being a person — you are not uniquely broken, even though shame insists you are. And mindful awareness instead of being swallowed: noticing “I’m having the thought that I’m broken,” rather than collapsing into “I am broken.”

~ warmth-first | warmth first, words later

It isn’t the same as self-esteem. Self-esteem needs you to be above average and falls apart when you fail; self-compassion shows up precisely when you’ve failed — no evaluation required. That’s exactly why it fits this work, where the whole premise is meeting the parts you don’t like.

There’s one question that turns the whole thing: what do I need right now? Neff calls it the quintessential self-compassion question — it moves you from self-attack to self-support in a single step.

> Gentleness isn’t softness for its own sake. It’s the ground that healing actually happens on.

Sometimes the body can receive what words can’t yet. A hand resting where a feeling lives, for a few breaths, signals safety to the nervous system and makes the kind words easier to take in.

[try] Find the sentence in your own mouth: “This is hard right now. Other people feel this too. May I be a little gentle with myself.” The exact words matter less than the turn toward kindness.`,
  },
  {
    id: 'the-inner-critic',
    title: 'The voice that runs you down',
    blurb: 'Whose voice is it, really — and what is it guarding?',
    cover: 'jagged-voice',
    icon: 'jagged-voice',
    epigraph: {
      text: 'That of which we are not aware owns us.',
      attribution: 'James Hollis',
    },
    body: `Most of us carry a voice that narrates our failings — sharp, certain, tireless. It calls itself realism, or standards, or just the truth. It is none of those. The **inner critic** is a learned voice, an echo of the ones that once judged us, now playing on the inside where it never has to stop.

Notice how certain it sounds. Jung described this quality of borrowed, absolute conviction — opinions that “lay claim to absolute truth.” That certainty is the tell. A real assessment has some doubt in it; the critic never does.

~ jagged-voice | it speaks in someone else’s accent, with total certainty

Two moves loosen its grip. First, listen for whose voice it actually is — the cadence, the favourite phrases. Often it belongs to a parent, a teacher, a coach. Hearing it as a recording, rather than the truth, is the moment it stops being you.

Second — the surprising one — don’t fight it. A critic met with attack only gets louder. Ask instead what it’s afraid would happen if it went quiet. Underneath the harshness is almost always a frightened protector, sure that without its lash you’ll be rejected, exposed, or idle. It is trying, clumsily and cruelly, to keep you safe.

> The critic isn’t your enemy. It’s a guard that never got the message that the danger has passed.

You don’t have to obey it, and you don’t have to silence it. You can thank it for trying, and gently take back the wheel.

[try] Write the critic’s next harsh line down, word for word. Underneath, ask it: “What are you afraid would happen if you stopped?” Let it answer. Curiosity tends to soften what combat hardens.`,
  },
  {
    id: 'guilt-and-repair',
    title: 'Guilt, and the way back',
    blurb: 'The one feeling that can actually be mended.',
    cover: 'scales',
    icon: 'scales',
    epigraph: {
      text: 'Shame is a focus on self, guilt is a focus on behavior. Shame is “I am bad.” Guilt is “I did something bad.”',
      attribution: 'Brené Brown, Daring Greatly',
    },
    body: `Of all the difficult feelings, **guilt** is the one with a door out. Where shame says “I am bad” and leaves you nowhere to go, guilt says “I did something I don’t feel right about” — and that is workable, because an action can be faced, owned, and often repaired.

Brené Brown’s research found that guilt, unlike shame, tends to move us toward our values rather than into hiding. It’s uncomfortable on purpose: a signal that something you did crossed a line you actually care about. Read that way, guilt is less a verdict than a compass.

~ scales | a deed can be weighed, and set right

The trap is letting guilt curdle into shame — “I did a bad thing” quietly becoming “therefore I am a bad person.” When that happens, repair stalls, because you can’t make amends from inside a collapse. So the work is to keep guilt the right size: about the deed, not the whole self.

Then comes the part that completes it. Real guilt asks for repair, not punishment — an honest acknowledgement, an amend where one is possible, a change in how you’ll act next time.

> Endless self-punishment isn’t repair. It’s just shame wearing guilt’s clothes.

And some repair is owed to yourself. To have done wrong and to face it squarely — without excusing it or drowning in it — is what self-forgiveness actually is.

[try] Bring to mind something you feel guilty about. Name the specific action in one plain sentence — just the deed, not a verdict on you. Then ask: is an amend possible here, and what would I do differently next time? Let the answer be a step, not a sentence.`,
  }
];
