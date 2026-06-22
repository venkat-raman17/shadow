import type { Book, Reading } from '../types';

export const book: Book = {
    id: 'belonging-loneliness',
    title: 'Belonging & loneliness',
    subtitle: 'The need to belong, and the gift of solitude',
    blurb: 'The need to belong, the pull of the crowd, loneliness, solitude, and the courage to differ.',
    spine: 'clay',
    cover: 'circle-of-figures',
    chapters: ['the-need-to-belong', 'the-herd', 'loneliness', 'solitude', 'the-courage-to-differ'],
    match: {
      qualities: ['loneliness', 'shame', 'longing', 'sadness'],
      flowIds: ['projection_recall', 'persona', 'self_compassion', 'active_imagination'],
    },
  };

export const readings: Reading[] = [
  {
    id: 'the-need-to-belong',
    title: 'The need to belong',
    blurb: 'Connection isn’t a luxury — it’s a basic human need.',
    cover: 'ring-of-care',
    icon: 'ring-of-care',
    body: `The pull to belong isn’t weakness or neediness. Psychologists treat it as a basic human need — in a landmark 1995 paper, Roy Baumeister and Mark Leary argued that the drive to form and keep close, caring bonds is as fundamental, in its way, as hunger. We are made for it.

~ ring-of-care | held in a ring of others

Their research turned up a precise detail worth knowing: the need is met by *two* things together — fairly regular, friendly contact *and* a sense of a stable bond where someone genuinely cares about your welfare. One without the other leaves a quiet ache. Plenty of contact with no real care (a busy life of acquaintances) falls short; deep care from someone you almost never reach falls short too. Both halves matter.

> Belonging isn’t about being around people. It’s about being among people who care, often enough to feel it.

This explains a lot of modern loneliness, which can coexist with a full calendar. You can be constantly in contact and still under-fed, because the contact is wide and thin. Naming what’s actually missing — closeness, not company — points you toward the real remedy.

And there’s no shame in the need. A culture that prizes self-sufficiency can make wanting connection feel like a failing. It isn’t. The hunger for belonging is the same instinct that kept our ancestors alive; honouring it is simply being human.

[try] Ask yourself, gently: do I have enough warm contact, and enough of a sense that someone cares about my welfare? If one feels thin, name one small step toward it — a message sent, a plan made, a truth shared with someone safe.`,
  },
  {
    id: 'the-herd',
    title: 'Rising out of the crowd',
    blurb: 'Belonging can quietly become disappearing into the group.',
    cover: 'flock',
    icon: 'flock',
    epigraph: {
      text: 'What is it, in the end, that induces a man to go his own way and to rise out of unconscious identity with the mass?',
      attribution: 'C.G. Jung, CW 17, §299',
    },
    body: `The need to belong has a shadow side, and Jung named it: **mass-mindedness**. In a crowd or a movement, the single person can be “swallowed up” and effaced — thinking and feeling on loan from the group rather than from within. Belonging shades, almost imperceptibly, into disappearing.

~ flock | one shape, repeated — and one that lifts

Jung saw self-knowledge as the counterweight that keeps a person from dissolving into the mass. Becoming yourself — individuation — involves, in his words, rising “out of unconscious identity with the mass”: gently stepping out of the fog of doing-as-everyone-does, and beginning to hear your own inner voice underneath the chorus.

> Conformity is rarely a dramatic surrender. It’s mostly small and automatic — laughing along, going quiet, choosing the safe answer nine times out of ten.

That’s the honest scale of it. We picture conformity as obvious cowardice, but it lives in the tiny moments: the opinion swallowed, the nod that wasn’t felt, the view borrowed from the feed before we’d found our own. Individuation isn’t grand rebellion either — it’s the occasional, deliberate choice to let your own answer show, in a small moment, when the crowd would have answered for you.

This has a modern face. Feeds and group chats hand us ready-made opinions and reactions before we’ve found our own. A few unplugged minutes to ask *what do I actually think?* becomes almost a radical act — and a quietly necessary one.

[try] Recall one recent moment when you went along with the room — laughed, nodded, stayed quiet — and your own answer was something else. You don’t have to change anything. Just notice where your real view lives.`,
  },
  {
    id: 'loneliness',
    title: 'The unspeakable thing',
    blurb: 'Loneliness is less about numbers than about being unheard.',
    cover: 'lone-figure',
    icon: 'lone-figure',
    epigraph: {
      text: 'Loneliness does not come from having no people about one, but from being unable to communicate the things that seem important to oneself.',
      attribution: 'C.G. Jung, Memories, Dreams, Reflections',
    },
    body: `Jung gave loneliness a definition that reorganises the whole problem. It does not come, he said, from having no one around — it comes from *being unable to say the things that matter most to you*, or from holding views others find hard to accept. By that measure, being understood matters more than being surrounded.

~ lone-figure | alone in a crowd is still alone

This is why you can feel utterly alone in a full room. Loneliness tracks the *quality* of connection, not the headcount — the gap between how connected you actually are and how connected you feel. A crowd of acquaintances can register, inwardly, as isolation, while one person who truly hears you can dissolve it.

> Loneliness eases not when more people arrive, but when one person finally hears the thing you couldn’t say.

That reframe turns a lonely stretch from a verdict (“something is wrong with me”) into a search — for the right listener, even one. It also distinguishes loneliness, which is painful and unchosen, from solitude, which is chosen and can be restful. The same empty afternoon is one or the other depending on whether it was wanted.

So the first move is to name which is here. If it’s loneliness, the remedy is connection — and specifically, being heard about something true. If no person feels safe enough yet, even writing the unspeakable thing down, as if to someone who could receive it, can begin to loosen the ache. Loneliness, like shame, lives partly in what cannot be said.

[try] When the ache arrives, name it: alone, or lonely? If lonely, ask gently — is there one person to whom I could say the true thing today? Even imagining being heard by someone who would understand can loosen it a little.`,
  },
  {
    id: 'solitude',
    title: 'The gift of being alone',
    blurb: 'Chosen aloneness is where you return to yourself.',
    cover: 'solitude-tree',
    icon: 'solitude-tree',
    epigraph: {
      text: 'The capacity to be alone… becomes linked with self-discovery and self-realization.',
      attribution: 'Anthony Storr, Solitude',
    },
    body: `If loneliness is the ache of connection you want and lack, **solitude** is its opposite: time alone you have chosen, where you can rest, reflect, and return to yourself. The British psychiatrist Anthony Storr argued that the capacity to be alone is itself a mark of emotional maturity and inner security — a strength, not a symptom to be cured.

~ solitude-tree | alone, and rooted

This runs against a common assumption that constant connection is the only sign of health. Storr noticed something the busy life obscures: people’s most significant moments of insight — the new understanding, the creative leap — arrive chiefly when they are alone. Solitude isn’t just recovery from people; it’s a workshop where understanding quietly forms.

> Solitude is not the absence of others. It’s the presence of yourself.

There’s a tender origin to this capacity. The analyst Donald Winnicott traced the ability to be comfortably alone back to having once felt safe in good company — being peacefully alone *in the presence of* someone who cared. The capacity to enjoy your own company grows from having been securely accompanied. Which means solitude and belonging aren’t enemies; one makes the other possible.

And solitude tends to deepen relationships rather than compete with them. Time spent knowing your own mind means you arrive in company with something real to share, instead of borrowing a self from whoever is in the room. People who can be alone often connect more honestly.

[try] If a chosen hour alone starts to feel like it needs justifying, let it stand on its own. Rest, wander, do nothing useful. Notice any urge to fill it — and let the urge pass. See what arrives in the quiet you weren’t making room for.`,
  },
  {
    id: 'the-courage-to-differ',
    title: 'The courage to differ',
    blurb: 'Becoming yourself sometimes costs a flicker of belonging.',
    cover: 'one-apart',
    icon: 'one-apart',
    epigraph: {
      text: 'Only the man who can consciously assent to the power of the inner voice becomes a personality.',
      attribution: 'C.G. Jung, CW 17, §308',
    },
    body: `Belonging and becoming yourself can look, for a moment, like opposites. To stand by your own view, your own path, your own no, sometimes costs a flicker of belonging — a slightly cooler room, a raised eyebrow, the warmth withdrawn. Jung saw this as the toll on the road to becoming a person: individuation asks you, now and then, to differ.

~ one-apart | one who steps a little out of the row

He framed it almost as a calling — “vocation,” from the Latin for *to be called*: an inner factor that destines a person to “emancipate himself from the herd.” Not out of arrogance or contrariness, but because some inner voice insists on a truth the crowd would have you set aside. To consciously assent to that voice, he said, is what turns a person from a copy into a self.

> Knowing the cost in advance makes it easier to pay on purpose — rather than being ambushed by the discomfort and retreating.

But this isn’t a call to lonely rebellion, and that’s the part worth holding. Belonging and individuation are two halves of one whole, not a choice between them. You need a secure-enough belonging before you can risk standing slightly apart; and standing apart, knowing your own mind, is what lets you belong *as yourself* rather than as an echo. The goal isn’t to leave the circle — it’s to be genuinely in it without disappearing into it.

So the courage to differ is usually small and specific: one honest sentence, one declined invitation, one view voiced when silence would have been easier. Each is a quiet act of becoming.

[try] Bring to mind one place where you’ve been going along to belong. Ask: what would it cost — really — to let my own answer show, just once, in a small way? And is that cost smaller than the cost of disappearing?`,
  }
];
