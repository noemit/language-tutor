import { Concept } from "@/types";

export const CONCEPTS: Concept[] = [
  {
    id: "past-tense-sick",
    title: "Past Tense Deep Dive",
    subtitle: "Being sick & getting better",
    category: "Grammar",
    content: [
      "Spanish has two main past tenses — the preterite and the imperfect — and they are not interchangeable. English mostly gets by with one simple past, so this can feel tricky at first.",
      "Use the PRETERITE when you are talking about a completed action with a clear beginning and end. 'Estuve enfermo toda la semana pasada' means you were sick, and now that week is over and done with.",
      "Use the IMPERFECT when you are setting a scene, describing an ongoing state, or talking about something habitual. 'Estaba enfermo cuando llamaste' paints a picture: you were in the middle of being sick when the phone rang.",
      "The PAST PERFECT (pluscuamperfecto) is for 'the past of the past.' When you want to say you had already been sick before something else happened, use 'había estado enfermo.' It creates a timeline: first you were sick, then something else occurred.",
      "A useful trick: if you can add the words 'used to' or 'was ...ing' in English, you probably want the imperfect. If you can add 'once' or 'suddenly,' you probably want the preterite.",
    ],
    examples: [
      {
        spanish: "Estuve enfermo toda la semana pasada.",
        english: "I was sick all of last week. (completed)",
        explanation: "Preterite — the week is over, the sickness is a finished event.",
      },
      {
        spanish: "Estaba enfermo cuando llamaste.",
        english: "I was sick when you called. (ongoing background)",
        explanation: "Imperfect — describes the state you were in when another action interrupted it.",
      },
      {
        spanish: "Había estado enfermo, pero ya me sentía mejor.",
        english: "I had been sick, but I was already feeling better.",
        explanation: "Past perfect — being sick happened before the moment of 'feeling better.'",
      },
      {
        spanish: "Me enfermé el lunes y no mejoré hasta el viernes.",
        english: "I got sick on Monday and didn't get better until Friday.",
        explanation: "Preterite for both — two completed changes of state.",
      },
    ],
    tips: [
      "Preterite = action, imperfect = description.",
      "Time expressions like 'ayer' or 'la semana pasada' often trigger the preterite.",
      "'Cuando' clauses usually pair an imperfect background with a preterite interruption.",
    ],
  },
  {
    id: "spain-colloquialisms",
    title: "Colloquialisms from Spain",
    subtitle: "The words that grease conversation",
    category: "Vocabulary",
    content: [
      "Peninsular Spanish is packed with tiny words that keep conversations flowing. They don't carry much literal meaning, but without them you can sound like a textbook.",
      "'Vale' is the Swiss Army knife of Spanish fillers. It means okay, sure, right, got it, or let's go depending on intonation. You will hear it dozens of times per conversation.",
      "'Tío' and 'tía' literally mean uncle and aunt, but in Spain they mean dude, guy, or girl. '¿Qué pasa, tío?' is the equivalent of 'What's up, man?' It is informal but not rude.",
      "'Venga' started as 'come on,' but Spaniards use it to hurry things up, express disbelief, agree, or even say goodbye. Context and tone do all the heavy lifting.",
      "'Oye' and 'mira' are attention-getters. 'Oye' is softer, like 'hey.' 'Mira' is more direct, like 'look.' Both are friendlier than they sound in English.",
      "'Hombre' is not about gender here. It softens disagreement or expresses surprise. '¡Hombre, claro!' means 'Well, of course!' 'Hombre, no sé' means 'Well, I don't know about that.'",
      "'Pues' is hesitation filler, like 'well' or 'so' in English. It buys you thinking time and makes you sound more natural.",
    ],
    examples: [
      {
        spanish: "—¿Vienes a la fiesta? —Vale, vale, allí estaré.",
        english: "—Are you coming to the party? —Okay, okay, I'll be there.",
        explanation: "Vale as agreement.",
      },
      {
        spanish: "Oye, tío, ¿has visto eso?",
        english: "Hey, dude, did you see that?",
        explanation: "Oye + tío = casual, friendly attention.",
      },
      {
        spanish: "Mira, no es tan fácil.",
        english: "Look, it's not that easy.",
        explanation: "Mira softens a contradiction.",
      },
      {
        spanish: "—¿Lo has terminado? —Venga, casi.",
        english: "—Have you finished? —Come on, almost.",
        explanation: "Venga here expresses 'give me a break' or self-encouragement.",
      },
      {
        spanish: "Hombre, no me digas eso.",
        english: "Come on, don't tell me that.",
        explanation: "Hombre conveys surprise or mild protest.",
      },
      {
        spanish: "Pues... la verdad es que no lo sé.",
        english: "Well... the truth is I don't know.",
        explanation: "Pues buys thinking time before an honest answer.",
      },
    ],
    tips: [
      "Don't overthink these — they are emotional seasoning, not grammar.",
      "'Vale' is safer than 'bueno' when you want to sound like a local.",
      "Watch the intonation on 'venga' — it can be encouraging, dismissive, or exhausted.",
    ],
  },
  {
    id: "asking-questions",
    title: "Asking Smart Questions",
    subtitle: "Subordinate clauses & indirect speech",
    category: "Grammar",
    content: [
      "In English we can say 'I don't know what you want' without thinking twice. In Spanish, that same sentence requires a subordinate clause, and the word order changes subtly.",
      "When a question is embedded inside another sentence — 'I wonder,' 'I don't know,' 'Can you tell me' — it is no longer a question grammatically. It becomes a statement that contains a question word. Spanish keeps the subject-verb order of a statement, not a question.",
      "'Lo que' means 'what' in the sense of 'the thing that.' It is incredibly common and worth getting comfortable with. 'No entiendo lo que dices' = 'I don't understand what you're saying.'",
      "'Cuál' vs 'qué' is a classic headache. Use 'qué' when the answer is a definition or open-ended. Use 'cuál' when you are choosing from a known set. But in embedded questions, 'cuál' often disappears in favor of 'qué' for simplicity.",
      "'Aunque' means even though or although. It can take the indicative (facts) or the subjunctive (hypotheticals). 'Aunque llueve, salgo' (it is raining and I am going) vs 'Aunque llueva, saldré' (even if it rains, I will go).",
    ],
    examples: [
      {
        spanish: "No sé qué quieres.",
        english: "I don't know what you want.",
        explanation: "Embedded question keeps statement word order: qué + quieres (not ¿qué quieres?).",
      },
      {
        spanish: "Dime cuándo puedes venir.",
        english: "Tell me when you can come.",
        explanation: "Indirect question — no question marks, no inversion.",
      },
      {
        spanish: "No entiendo lo que dices.",
        english: "I don't understand what you're saying.",
        explanation: "'Lo que' = the thing that. It wraps the whole idea into a noun.",
      },
      {
        spanish: "Me preguntó si había comido.",
        english: "He asked me if I had eaten.",
        explanation: "Indirect yes/no questions use 'si' (if), not 'sí' (yes).",
      },
      {
        spanish: "Aunque está cansado, sigue trabajando.",
        english: "Even though he's tired, he keeps working.",
        explanation: "Indicative after aunque = the tiredness is a known fact.",
      },
    ],
    tips: [
      "Embedded questions never have question marks in Spanish.",
      "If you can replace 'what' with 'the thing that,' use 'lo que.'",
      "'Si' in the middle of a sentence usually means 'if,' not 'yes.'",
    ],
  },
  {
    id: "subjunctive-mood",
    title: "The Subjunctive Mood",
    subtitle: "When reality gets fuzzy",
    category: "Grammar",
    content: [
      "English barely uses the subjunctive anymore — 'If I were you' is one of the last holdouts. Spanish uses it constantly, and mastering it is the difference between sounding functional and sounding fluent.",
      "The subjunctive is not a tense; it is a mood. It expresses uncertainty, desire, emotion, doubt, or unreality. If the thing you are talking about is not a concrete fact, the subjunctive is probably involved.",
      "English speakers often default to the indicative because it feels safer. Resist that urge. 'Espero que estés bien' uses the subjunctive because your well-being is a hope, not a confirmed fact. 'Espero que estás bien' sounds wrong to a native ear.",
      "The WEIRDO acronym covers most triggers: Wishes, Emotions, Impersonal expressions, Recommendations, Doubt/Denial, and Ojalá. If your sentence starts with one of these, check whether the subordinate clause needs the subjunctive.",
      "'Ojalá' is a beautiful word borrowed from Arabic (insha'Allah). It means 'I hope so' or 'God willing.' It always triggers the subjunctive. 'Ojalá venga' = 'I hope he comes.' 'Ojalá hubiera venido' = 'I wish he had come.'",
      "The subjunctive also appears in hypothetical 'if' clauses. 'Si fuera rico, viajaría' = 'If I were rich, I would travel.' Notice 'fuera' instead of 'era.' That shift is the subjunctive doing its job.",
    ],
    examples: [
      {
        spanish: "Espero que estés bien.",
        english: "I hope you're well.",
        explanation: "Subjunctive after espero — your well-being is a wish, not a fact.",
      },
      {
        spanish: "Dudo que venga.",
        english: "I doubt he'll come.",
        explanation: "Doubt triggers subjunctive. You are not stating his arrival as fact.",
      },
      {
        spanish: "Es importante que descanses.",
        english: "It's important that you rest.",
        explanation: "Impersonal expression + recommendation = subjunctive.",
      },
      {
        spanish: "Ojalá hubiera sabido antes.",
        english: "I wish I had known earlier.",
        explanation: "Ojalá + past perfect subjunctive for impossible wishes.",
      },
      {
        spanish: "Si fuera rico, viajaría por el mundo.",
        english: "If I were rich, I would travel the world.",
        explanation: "Hypothetical 'if' uses imperfect subjunctive in the condition clause.",
      },
      {
        spanish: "Me alegra que hayas venido.",
        english: "I'm glad you came.",
        explanation: "Emotion (me alegra) triggers subjunctive in the subordinate clause.",
      },
    ],
    tips: [
      "Don't panic about conjugation tables — learn the triggers first, the forms second.",
      "If you can say 'it's a fact that...' before the clause, use indicative. If not, use subjunctive.",
      "The imperfect subjunctive (-ra / -se forms) is used for hypotheticals and politeness.",
    ],
  },
  {
    id: "ser-vs-estar",
    title: "Ser vs. Estar",
    subtitle: "To be or... to be",
    category: "Grammar",
    content: [
      "You already know the basics: ser is for inherent qualities, estar is for states and locations. But after seven years in Spain, the nuance is what matters. Native speakers violate the 'rules' all the time, and you need to know when.",
      "The classic distinction: ser is identity (what something IS), estar is condition (how something IS right now). 'Soy alto' is a fact about me. 'Estoy cansado' is a temporary state. But then 'está muerto' breaks the rule — death is permanent, yet we use estar. Why? Because estar can also mark the result of a process.",
      "'Ser' with adjectives creates a character judgment. 'Eres inteligente' is a compliment about who you are. 'Estás inteligente' means you seem unusually sharp today — it is almost teasing. The same adjective switches meaning based on the verb.",
      "Location is always estar, except for events. 'La fiesta es en mi casa' — the party is an event, so it 'is' somewhere. 'Estoy en casa' — I am physically present. This distinction trips up even advanced speakers.",
      "With food, ser describes type and estar describes readiness. 'La paella es valenciana' vs 'La paella está buena.' But 'está hecha' (it is done) uses estar because it is the result of cooking.",
    ],
    examples: [
      {
        spanish: "Soy alto y delgado.",
        english: "I am tall and thin.",
        explanation: "Ser — physical description as identity.",
      },
      {
        spanish: "Estoy cansado hoy.",
        english: "I'm tired today.",
        explanation: "Estar — temporary condition.",
      },
      {
        spanish: "Mi abuelo está muerto.",
        english: "My grandfather is dead.",
        explanation: "Estar — result of a process (life → death).",
      },
      {
        spanish: "Eres guapo. / Estás guapo hoy.",
        english: "You're handsome. / You're looking handsome today.",
        explanation: "Ser = inherent trait. Estar = notable today, almost flirtatious.",
      },
      {
        spanish: "La fiesta es en mi casa. Estoy en mi casa.",
        english: "The party is at my house. I am at my house.",
        explanation: "Events 'are' (ser) somewhere. People 'are' (estar) somewhere.",
      },
      {
        spanish: "Esta tortilla está buenísima.",
        english: "This omelette is delicious.",
        explanation: "Estar — taste as a current, experienced quality.",
      },
    ],
    tips: [
      "When in doubt, ask: is this a fact about identity (ser) or a state/location/result (estar)?",
      "'Estar + adjective' can imply the opposite of normal: 'estás raro' = you're acting weird.",
      "Death, marriage, and destruction all use estar — they are results of processes.",
    ],
  },
  {
    id: "se-impersonal",
    title: "The 'Se' Impersonal & Passive",
    subtitle: "Who did it? Doesn't matter.",
    category: "Grammar",
    content: [
      "If you have lived in Spain for seven years, you have heard 'se habla español' and 'se vende' a thousand times. But do you actually use 'se' yourself? Most intermediate speakers avoid it and sound clunky as a result.",
      "The impersonal 'se' is for general statements where the subject is irrelevant. 'Se come bien aquí' means 'the food is good here' or 'one eats well here.' It is warmer and more natural than 'la comida es buena aquí.'",
      "The passive 'se' describes accidents or events where something happened to something. 'Se me cayó el vaso' means the glass fell — and I was involved, but I am not taking full blame. It is the perfect construction for minor mishaps.",
      "The tricky part: 'se' constructions often require the verb to agree with the object, not a person. 'Se cayeron los vasos' — plural verb because plural glasses. 'Se cayó el vaso' — singular verb. The 'se' is doing grammatical work here.",
      "'Cómo se dice' is a phrase you should internalize. It is how natives ask for a word. 'Cómo se dice 'awkward' en español?' Not 'qué es awkward' — that asks for a definition. 'Cómo se dice' asks for the translation.",
    ],
    examples: [
      {
        spanish: "Se come muy bien en ese restaurante.",
        english: "The food is great at that restaurant.",
        explanation: "Impersonal se — general statement about the experience.",
      },
      {
        spanish: "Se me olvidó tu nombre.",
        english: "I forgot your name.",
        explanation: "Passive se with indirect object — the forgetting 'happened to me.'",
      },
      {
        spanish: "Se rompió la ventana.",
        english: "The window broke.",
        explanation: "Passive se — no one is blamed, the event just happened.",
      },
      {
        spanish: "Se venden libros de segunda mano.",
        english: "Second-hand books for sale.",
        explanation: "Impersonal se + plural verb agreeing with plural object (libros).",
      },
      {
        spanish: "¿Cómo se dice 'overwhelming' en español?",
        english: "How do you say 'overwhelming' in Spanish?",
        explanation: "The standard way to ask for a translation.",
      },
      {
        spanish: "Se me acabó la paciencia.",
        english: "I ran out of patience.",
        explanation: "Passive se + indirect object — patience left me, I didn't actively lose it.",
      },
    ],
    tips: [
      "Use 'se me + verb' to deflect blame for small accidents.",
      "'Se + verb' + plural noun = plural verb. 'Se venden casas' not 'se vende casas.'",
      "When you don't know who did something, 'se' is your friend.",
    ],
  },
  {
    id: "object-pronouns",
    title: "Object Pronouns",
    subtitle: "Me lo, te lo, se lo, díselo",
    category: "Grammar",
    content: [
      "Spanish sentences often sound like puzzles because objects get attached to verbs as tiny pronouns. 'Me lo dijo' packs three pieces of information into three syllables: to me, it, he/she said. English needs six words.",
      "The indirect object (me, te, le, nos, os, les) always comes before the direct object (lo, la, los, las). 'Me lo dijo' = he said it to me. 'Te la envío' = I am sending it to you. The order is fixed.",
      "When both objects start with L (le + lo, les + las, etc.), the indirect object changes to 'se.' 'Se lo di' = I gave it to him/her/them. This is not optional — 'le lo di' is wrong. It is purely a phonetic rule to avoid the awkward L-L cluster.",
      "In commands, pronouns attach to the verb. 'Dímelo' = tell me it. 'Explícame por qué' = explain to me why. The accent mark appears because the stress shifts when you add the suffix. 'Dime' has no accent; 'dímelo' does.",
      "With infinitives and gerunds, you have a choice: attach the pronouns to the end or place them before the conjugated verb. 'Voy a decírtelo' and 'Te lo voy a decir' are both correct, but the first sounds more decisive, the second more conversational.",
    ],
    examples: [
      {
        spanish: "Me lo dijo ayer.",
        english: "He told me (it) yesterday.",
        explanation: "Indirect (me) + direct (lo) before the verb.",
      },
      {
        spanish: "Se lo di a María.",
        english: "I gave it to María.",
        explanation: "Le becomes se before lo: se lo, not le lo.",
      },
      {
        spanish: "Dímelo ya.",
        english: "Tell me already.",
        explanation: "Imperative + pronouns attached. Di + me + lo = dímelo.",
      },
      {
        spanish: "Te lo voy a explicar.",
        english: "I'm going to explain it to you.",
        explanation: "Pronouns before the conjugated verb — conversational and natural.",
      },
      {
        spanish: "Explícame por qué no viniste.",
        english: "Explain to me why you didn't come.",
        explanation: "Imperative + indirect object attached. The accent marks the stress shift.",
      },
      {
        spanish: "No me lo esperaba.",
        english: "I wasn't expecting it.",
        explanation: "Reflexive use with esperar — 'I didn't expect it of myself.'",
      },
    ],
    tips: [
      "Practice 'se lo' until it is automatic — it is the most common double-pronoun combo.",
      "In commands, always attach. 'Dime' not 'me di.'",
      "With ir a + infinitive, both positions work, but before the verb sounds more relaxed.",
    ],
  },
  {
    id: "reflexive-verbs",
    title: "Reflexive Verbs That Aren't Reflexive",
    subtitle: "The secret to sounding native",
    category: "Grammar",
    content: [
      "Spanish uses reflexive pronouns (me, te, se, nos, os) for way more than just 'I wash myself.' Many verbs completely change meaning when they get a reflexive pronoun. 'Ir' means to go. 'Irse' means to leave. 'Quedar' means to stay. 'Quedarse' means to remain or keep.",
      "Some reflexive verbs express involuntary actions. 'Se me olvidó' (I forgot) literally means 'it forgot itself on me.' 'Se me cayó' (I dropped it) means 'it fell itself on me.' These constructions are incredibly common in casual speech and make you sound much more natural.",
      "'Me da igual' means 'I don't care' in a casual, friendly way. 'Da igual' alone means 'it doesn't matter.' The 'me' makes it personal without being aggressive. It is the difference between 'whatever' and 'I don't mind.'",
      "'Me pasa que...' is how you start a personal story. 'Me pasa que no duermo bien' = 'The thing is, I don't sleep well.' It frames the statement as something happening to you, which softens it.",
      "'Volver(se)' is another shapeshifter. 'Volver' means to return. 'Volverse' means to become (suddenly). 'Se volvió loco' = he went crazy. The reflexive marks a sudden, often unexpected change.",
    ],
    examples: [
      {
        spanish: "Me voy a casa.",
        english: "I'm leaving for home.",
        explanation: "Irse = to leave / go away. Ir = to go (toward somewhere).",
      },
      {
        spanish: "Se me olvidó el paraguas.",
        english: "I forgot my umbrella.",
        explanation: "Involuntary reflexive — the umbrella 'forgot itself' on me.",
      },
      {
        spanish: "Me da igual.",
        english: "I don't mind / whatever.",
        explanation: "Casual, friendly indifference. Softer than 'no me importa.'",
      },
      {
        spanish: "Me pasa que no entiendo nada.",
        english: "The thing is, I don't understand anything.",
        explanation: "Me pasa = it happens to me that. A natural way to introduce a problem.",
      },
      {
        spanish: "Se volvió muy caro todo.",
        english: "Everything suddenly became very expensive.",
        explanation: "Volverse = to become (sudden change).",
      },
      {
        spanish: "No me lo creo.",
        english: "I can't believe it.",
        explanation: "Creerse = to believe / accept as true. The reflexive adds personal involvement.",
      },
    ],
    tips: [
      "When a verb + se changes meaning, treat it as a completely different verb.",
      "'Se me + verb' constructions are your best friend for sounding humble and natural.",
      "Watch out for 'quedar' vs 'quedarse' — the difference between location and choice.",
    ],
  },
  {
    id: "future-conditional",
    title: "Future & Conditional Without 'Voy a'",
    subtitle: "Moving beyond the present-tense crutch",
    category: "Grammar",
    content: [
      "After seven years, 'voy a + infinitive' is probably your default for everything future. It is not wrong, but it makes you sound like you are always in the immediate future, never planning or imagining.",
      "The simple future (hablaré, vendrás, será) is for predictions, promises, and distant plans. 'Llegaré tarde' = I will be late. 'No lo haré' = I won't do it. It carries a sense of certainty or commitment.",
      "The conditional (hablaría, vendrías, sería) is for hypotheticals, politeness, and reported future from the past. 'Me gustaría' = I would like. 'Dijo que vendría' = he said he would come. It is the 'would' and 'could' of Spanish.",
      "For politeness, the conditional is essential. '¿Podrías ayudarme?' is softer than '¿Puedes ayudarme?' 'Querría' is more refined than 'quiero.' In shops and restaurants, this register makes a difference.",
      "The future and conditional are formed from the infinitive, so they are actually easier to conjugate than many other tenses. Hablar → hablaré / hablaría. Comer → comeré / comería. Vivir → viviré / viviría. The endings are consistent.",
    ],
    examples: [
      {
        spanish: "Llegaré sobre las ocho.",
        english: "I'll arrive around eight.",
        explanation: "Simple future — a straightforward prediction or plan.",
      },
      {
        spanish: "Me gustaría una cerveza, por favor.",
        english: "I'd like a beer, please.",
        explanation: "Conditional for politeness — the standard way to order in Spain.",
      },
      {
        spanish: "Dijo que vendría, pero no vino.",
        english: "He said he would come, but he didn't.",
        explanation: "Conditional for reported future in the past.",
      },
      {
        spanish: "¿Podrías repetirlo?",
        english: "Could you repeat that?",
        explanation: "Conditional softens the request significantly.",
      },
      {
        spanish: "Sería mejor ir andando.",
        english: "It would be better to walk.",
        explanation: "Conditional for suggestion / hypothetical better option.",
      },
      {
        spanish: "No lo haré, lo siento.",
        english: "I won't do it, sorry.",
        explanation: "Simple future for firm refusal.",
      },
    ],
    tips: [
      "Replace 'voy a' with the simple future when talking about tomorrow or later.",
      "Use the conditional in every restaurant, shop, and formal request.",
      "Future and conditional endings: -é/-ás/-á/-emos/-éis/-án vs -ía/-ías/-ía/-íamos/-íais/-ían.",
    ],
  },
  {
    id: "gerund-vs-infinitive",
    title: "Gerund vs. Infinitive",
    subtitle: "Which verb form follows which verb?",
    category: "Grammar",
    content: [
      "English uses the -ing form for almost everything. Spanish is pickier. Some verbs want the gerund (-ando/-iendo), some want the infinitive, and some change meaning depending on which you choose. Learning the patterns saves you from constant self-correction.",
      "Verbs of continuation and observation take the gerund. 'Sigo pensando' = I keep thinking. 'Estoy comiendo' = I am eating. 'Viene lloviendo' = it is coming down raining. The gerund describes an action in progress.",
      "Most other verbs take the infinitive. 'Quiero comer' not 'quiero comiendo.' 'Necesito dormir' not 'necesito durmiendo.' 'Decidí ir' not 'decidí yendo.' When in doubt, the infinitive is the safer default.",
      "Some verbs change meaning. 'Dejar de fumar' = to quit smoking. 'Dejar fumando' is not a thing. 'Seguir fumando' = to keep smoking. 'Seguir a fumar' is wrong. The preposition (or lack of one) is the signal.",
      "'Acabar de' + infinitive means to have just done something. 'Acabo de llegar' = I just arrived. This is a very common construction for recent actions, and it uses the infinitive, not the gerund.",
    ],
    examples: [
      {
        spanish: "Sigo pensando en lo que dijiste.",
        english: "I keep thinking about what you said.",
        explanation: "Seguir takes the gerund — continuation of an action.",
      },
      {
        spanish: "Quiero aprender a cocinar.",
        english: "I want to learn to cook.",
        explanation: "Querer takes the infinitive. Aprender takes 'a + infinitive.'",
      },
      {
        spanish: "Acabo de llegar.",
        english: "I just arrived.",
        explanation: "Acabar de + infinitive = to have just done something.",
      },
      {
        spanish: "Estoy leyendo un libro muy bueno.",
        english: "I'm reading a very good book.",
        explanation: "Estar + gerund = action in progress right now.",
      },
      {
        spanish: "Dejé de fumar el año pasado.",
        english: "I quit smoking last year.",
        explanation: "Dejar de + infinitive = to stop / quit doing something.",
      },
      {
        spanish: "Nos pusimos a hablar de política.",
        english: "We started talking about politics.",
        explanation: "Ponerse a + infinitive = to start doing something (suddenly).",
      },
    ],
    tips: [
      "Estar and seguir take the gerund. Most other verbs take the infinitive.",
      "'Acabar de' is your go-to for 'I just...'",
      "If a verb needs a preposition before the next verb, it almost always takes the infinitive.",
    ],
  },
  {
    id: "fillers",
    title: "Filler Words & Buying Thinking Time",
    subtitle: "Sounding natural while your brain catches up",
    category: "Conversation",
    content: [
      "You know more Spanish than you can produce in real time. The gap between comprehension and expression is the hardest part of living in a country without formal study. Fillers bridge that gap.",
      "'Bueno' is the universal pause. It can start a sentence, end one, express hesitation, or signal a change of topic. 'Bueno, pues...' is the Spanish equivalent of 'well, so...' and you can use it whenever you need a second to think.",
      "'A ver' means 'let's see' or 'let me think.' It is softer than 'mira' and works when you are processing information. 'A ver, ¿qué me estás diciendo?' = 'Wait, what are you telling me?' It buys you time without sounding lost.",
      "'Es que...' is the explanation starter. 'Es que no me apetece' = 'The thing is, I don't feel like it.' It softens refusals and makes your reasoning sound less confrontational. Spaniards use this constantly.",
      "'O sea' is the clarification marker. It means 'in other words' or 'I mean.' When you realize your sentence is getting convoluted, 'o sea' lets you rephrase. It is the spoken equivalent of deleting and retyping.",
      "'Total' and 'total que' wrap up a story. 'Total, que no fuimos' = 'So basically, we didn't go.' It signals the conclusion of a long explanation. 'Total que' is especially common in storytelling.",
    ],
    examples: [
      {
        spanish: "Bueno, pues... la verdad es que no lo sé.",
        english: "Well, so... the truth is I don't know.",
        explanation: "Bueno + pues buys maximum thinking time.",
      },
      {
        spanish: "A ver, repítemelo.",
        english: "Wait, say that again.",
        explanation: "A ver signals you need a moment to process.",
      },
      {
        spanish: "Es que tengo mucho trabajo.",
        english: "The thing is, I have a lot of work.",
        explanation: "Es que softens an excuse or explanation.",
      },
      {
        spanish: "No me gusta, o sea, no es por ti.",
        english: "I don't like it, I mean, it's not because of you.",
        explanation: "O sea introduces a clarification or rephrasing.",
      },
      {
        spanish: "Total, que al final no salimos.",
        english: "So basically, in the end we didn't go out.",
        explanation: "Total que = wrapping up a story with the conclusion.",
      },
      {
        spanish: "Vamos, que no tiene sentido.",
        english: "Come on, it doesn't make sense.",
        explanation: "Vamos softens a blunt statement into a shared conclusion.",
      },
    ],
    tips: [
      "Use two fillers together for maximum thinking time: 'bueno, pues' or 'a ver, es que.'",
      "'Es que' is your best friend for refusing invitations without sounding rude.",
      "Don't overuse 'o sea' — it can make you sound uncertain if every sentence has one.",
    ],
  },
  {
    id: "storytelling-connectors",
    title: "Storytelling Connectors",
    subtitle: "Stringing events together fluidly",
    category: "Conversation",
    content: [
      "Spanish speakers love long, winding stories. The connectors are what keep the listener oriented. Without them, your anecdotes feel like a list of facts. With them, you sound like a natural.",
      "'Entonces' is the workhorse. It means 'so' or 'then' and moves the narrative forward. 'Entonces, llegamos al bar' = 'So then, we got to the bar.' It is neutral and can be used almost anywhere.",
      "'Resulta que' introduces a twist. It is like 'it turns out that' or 'as it happens.' 'Resulta que conocía a mi jefe' = 'Turns out he knew my boss.' It signals that new information is about to change the story.",
      "'De repente' and 'de pronto' mean suddenly. They create drama. 'De repente, se apagaron las luces' = 'Suddenly, the lights went out.' Use them sparingly — too many 'suddenlies' and you sound like a soap opera.",
      "'Al final' and 'al cabo de' frame the conclusion. 'Al final, nos fuimos a casa' = 'In the end, we went home.' 'Al cabo de una hora' = 'After an hour.' These help the listener track time.",
      "'En fin' and 'total que' signal you are wrapping up. 'En fin, no pasó nada' = 'Anyway, nothing happened.' They are the verbal equivalent of 'long story short.'",
    ],
    examples: [
      {
        spanish: "Entonces, decidimos ir a cenar.",
        english: "So then, we decided to go for dinner.",
        explanation: "Entonces moves the story to the next event.",
      },
      {
        spanish: "Resulta que ya había estado allí.",
        english: "Turns out she had already been there.",
        explanation: "Resulta que introduces a surprising piece of information.",
      },
      {
        spanish: "De repente, empezó a llover.",
        english: "Suddenly, it started raining.",
        explanation: "De repente creates a dramatic shift in the narrative.",
      },
      {
        spanish: "Al final, nos quedamos en casa.",
        english: "In the end, we stayed home.",
        explanation: "Al final signals the outcome or resolution.",
      },
      {
        spanish: "En fin, no era para tanto.",
        english: "Anyway, it wasn't that big a deal.",
        explanation: "En fin dismisses the drama and closes the story.",
      },
      {
        spanish: "Total que perdimos el tren.",
        english: "So basically, we missed the train.",
        explanation: "Total que = here's the punchline after a long story.",
      },
    ],
    tips: [
      "Start stories with 'pues nada' or 'a ver' to grab attention.",
      "Use 'resulta que' before the most interesting part of your story.",
      "End with 'en fin' or 'total que' so people know you are done.",
    ],
  },
  {
    id: "softening-uncertainty",
    title: "Softening & Expressing Uncertainty",
    subtitle: "Not sounding like a robot or too blunt",
    category: "Conversation",
    content: [
      "Romanian and English both have ways to hedge and soften. Spanish does too, but the patterns are different. If you translate directly from English, you can sound either too forceful or weirdly apologetic.",
      "'A lo mejor' and 'igual' both mean 'maybe,' but 'igual' is more casual and very common in Spain. 'Igual viene' = 'Maybe he'll come.' 'A lo mejor llueve' = 'Maybe it will rain.' Use 'igual' with friends, 'a lo mejor' when you want to sound thoughtful.",
      "'Supongo' and 'me imagino' soften statements of belief. 'Supongo que sí' = 'I suppose so.' 'Me imagino que está ocupado' = 'I imagine he's busy.' They are less committal than 'creo que' and therefore politer.",
      "'Tendré que' implies obligation without complaining. 'Tendré que madrugar' = 'I'll have to get up early.' It is factual and resigned. Compare with 'tengo que madrugar' — the present tense sounds more immediate and potentially annoyed.",
      "'No sé si...' introduces doubt gently. 'No sé si me expliqué bien' = 'I'm not sure if I explained myself well.' It invites the other person to help you without admitting total incompetence.",
      "'Quizá' and 'tal vez' are the formal maybes. They almost always trigger the subjunctive. 'Quizá venga' = 'Perhaps he will come.' In spoken Spanish, 'igual' has largely replaced these in casual conversation.",
    ],
    examples: [
      {
        spanish: "Igual nos vemos mañana.",
        english: "Maybe we'll see each other tomorrow.",
        explanation: "Igual = casual maybe. Very common in peninsular Spanish.",
      },
      {
        spanish: "Supongo que tiene razón.",
        english: "I suppose he's right.",
        explanation: "Supongo softens agreement without full commitment.",
      },
      {
        spanish: "Tendré que pensarlo.",
        english: "I'll have to think about it.",
        explanation: "Future tense of tener que = distant, resigned obligation.",
      },
      {
        spanish: "No sé si me entiendes.",
        english: "I'm not sure if you understand me.",
        explanation: "No sé si = gentle doubt, invites clarification.",
      },
      {
        spanish: "Quizá vaya al cine.",
        english: "Perhaps I'll go to the cinema.",
        explanation: "Quizá + subjunctive = formal, tentative possibility.",
      },
      {
        spanish: "Me imagino que está en reuniones.",
        english: "I imagine he's in meetings.",
        explanation: "Me imagino = softer than creo, good for making excuses.",
      },
    ],
    tips: [
      "Use 'igual' with friends, 'a lo mejor' with colleagues, 'quizá' in writing.",
      "'Supongo que' is perfect when you agree but want to sound thoughtful.",
      "Future tense (tendré, deberé) makes obligations sound less confrontational.",
    ],
  },
  {
    id: "reacting-emotionally",
    title: "Reacting Emotionally",
    subtitle: "The social rhythm of conversation",
    category: "Conversation",
    content: [
      "Conversations in Spain are fast and emotionally expressive. If you only respond with 'sí' and 'no,' you sound detached. The right reaction word keeps the energy going and signals that you are engaged.",
      "'¿En serio?' and 'no me digas' are the universal surprise reactions. They don't actually demand an answer — they just show you are listening. 'No me digas' literally means 'don't tell me,' but it functions like 'you're kidding.'",
      "'Qué fuerte' expresses shock or disbelief. It can be positive or negative depending on tone. 'Qué fuerte, tío' = 'That's wild, man.' Use it for anything surprising, from gossip to bad news.",
      "'Qué pena' is sympathy. 'Qué pena que no pudiste venir' = 'What a shame you couldn't come.' It is warmer than 'lo siento' because it focuses on the situation, not your own feelings.",
      "'Anda ya' is playful disbelief. 'Anda ya, no es verdad' = 'Come on, that's not true.' It is friendly and teasing. The tone matters — it can also be dismissive if you say it flatly.",
      "'Flipas' and 'flipa' are very colloquial. 'Flipas' = you're tripping / you won't believe this. 'Me flipa' = I love it. These are young and casual — use them with friends, not at the bank.",
    ],
    examples: [
      {
        spanish: "—Se ha ido a vivir a Bali. —¿En serio?",
        english: "—He moved to Bali. —Seriously?",
        explanation: "¿En serio? = standard surprise reaction.",
      },
      {
        spanish: "No me digas que te has comprado un coche.",
        english: "Don't tell me you bought a car.",
        explanation: "No me digas = playful shock, not a real command.",
      },
      {
        spanish: "Qué fuerte, no lo sabía.",
        english: "That's wild, I didn't know.",
        explanation: "Qué fuerte = strong emotional reaction to surprising news.",
      },
      {
        spanish: "Qué pena, me habría encantado ir.",
        english: "What a shame, I would have loved to go.",
        explanation: "Qué pena = warm sympathy, more personal than 'lo siento.'",
      },
      {
        spanish: "—Gané la lotería. —Anda ya.",
        english: "—I won the lottery. —Come on.",
        explanation: "Anda ya = playful disbelief. Context makes it friendly.",
      },
      {
        spanish: "Me flipa este sitio.",
        english: "I love this place.",
        explanation: "Me flipa = enthusiastic approval. Very casual.",
      },
    ],
    tips: [
      "Match the energy level of the person telling the story.",
      "'Qué fuerte' is your safest all-purpose reaction to surprising news.",
      "Save 'flipas' and 'me flipa' for people under 40 or very relaxed settings.",
    ],
  },
  {
    id: "interrupting-floor",
    title: "Interrupting & Holding the Floor",
    subtitle: "Asserting yourself in fast group conversations",
    category: "Conversation",
    content: [
      "Spanish group conversations can feel like a free-for-all. Everyone talks over everyone, and if you wait for a perfect pause, you will never speak. You need tools to jump in gracefully and hold attention once you have it.",
      "'Es que...' is the interruption opener. It signals 'I have something relevant to add.' 'Es que yo estuve allí también' = 'The thing is, I was there too.' It justifies your interruption by framing it as a clarification.",
      "'A ver si me explico' means 'let me see if I can explain this.' It holds the floor while you gather your thoughts. It tells people: I am about to say something complicated, so give me a second.",
      "'Lo que pasa es que...' is the extended version of 'es que.' It buys more time and signals a longer explanation. 'Lo que pasa es que no me enteré hasta ayer' = 'The thing is, I didn't find out until yesterday.'",
      "'Perdona que te interrumpa' is the polite interruption. But in practice, Spaniards often just say 'oye' or 'mira' and jump in. The politeness is in the tone, not the words.",
      "Once you have the floor, 'o sea' and 'es decir' help you rephrase if you feel yourself losing the thread. They are verbal handholds that keep people with you while you figure out what you mean.",
    ],
    examples: [
      {
        spanish: "Es que yo lo vi con mis propios ojos.",
        english: "The thing is, I saw it with my own eyes.",
        explanation: "Es que = I have relevant information, let me add it.",
      },
      {
        spanish: "A ver si me explico.",
        english: "Let me see if I can explain this.",
        explanation: "Holds the floor while you organize a complex thought.",
      },
      {
        spanish: "Lo que pasa es que no me dijeron nada.",
        english: "The thing is, they didn't tell me anything.",
        explanation: "Lo que pasa es que = longer setup for an excuse or explanation.",
      },
      {
        spanish: "Perdona que te interrumpa, pero es importante.",
        english: "Sorry to interrupt, but it's important.",
        explanation: "Formal interruption. With friends, just say 'oye.'",
      },
      {
        spanish: "No es por eso, o sea, quiero decir que...",
        english: "It's not because of that, I mean, what I'm saying is...",
        explanation: "O sea + quiero decir = repairing a misunderstood point.",
      },
      {
        spanish: "Mira, te cuento lo que pasó.",
        english: "Look, let me tell you what happened.",
        explanation: "Mira grabs attention and signals a story is coming.",
      },
    ],
    tips: [
      "Don't wait for silence — it won't come. Use 'es que' and jump in.",
      "'A ver si me explico' is your lifeline when a sentence is getting away from you.",
      "In groups of Spaniards, interrupting is normal. Not interrupting is being left out.",
    ],
  },
  {
    id: "daily-verbs",
    title: "Verbs for Daily Life",
    subtitle: "Beyond hacer / tener / estar",
    category: "Vocabulary",
    content: [
      "You can survive with a small verb set, but you can't flourish. Spanish has dozens of verbs that capture daily experiences more precisely than the big three. Learning them makes your Spanish feel lived-in rather than textbook.",
      "'Caer bien / mal' means to like or dislike a person on first impression. 'Me cae bien tu amigo' = 'I like your friend.' It is about vibe, not deep friendship. 'Me cae mal' is stronger than 'no me gusta' — it implies something off about the person.",
      "'Dar por hecho' means to take something for granted. 'Doy por hecho que vienes' = 'I'm assuming you're coming.' It is useful for managing expectations without sounding demanding.",
      "'Echar de menos' is to miss someone or something. 'Te echo de menos' = 'I miss you.' It is more emotional than 'extrañar' and much more common in Spain.",
      "'Hacer falta' means to be needed or necessary. 'Haces falta aquí' = 'You're needed here.' It is warmer than 'se necesita' because it is personal. 'Me hace falta un café' = 'I need a coffee' (in my soul).",
      "'Tener ganas de' means to feel like doing something. 'Tengo ganas de salir' = 'I feel like going out.' It expresses desire without commitment. 'No tengo ganas' is the perfect soft refusal.",
      "'Venír al caso' means to be relevant. 'Eso no viene al caso' = 'That's not relevant.' It is how you politely redirect a conversation without saying 'shut up.'",
    ],
    examples: [
      {
        spanish: "Me cae muy bien tu hermana.",
        english: "I really like your sister.",
        explanation: "Caer bien = first-impression likability, not deep friendship.",
      },
      {
        spanish: "Doy por hecho que sabes la dirección.",
        english: "I'm assuming you know the address.",
        explanation: "Dar por hecho = to take for granted / assume.",
      },
      {
        spanish: "Te echo de menos.",
        english: "I miss you.",
        explanation: "Echar de menos = the standard way to say 'I miss you' in Spain.",
      },
      {
        spanish: "Me hace falta unas vacaciones.",
        english: "I need a vacation.",
        explanation: "Hacer falta = to be needed. Personal and emotional.",
      },
      {
        spanish: "No tengo ganas de cocinar.",
        english: "I don't feel like cooking.",
        explanation: "Tener ganas de = to feel like. Perfect for low-energy refusals.",
      },
      {
        spanish: "Eso no viene al caso.",
        english: "That's not relevant.",
        explanation: "Venír al caso = to be relevant / pertinent.",
      },
    ],
    tips: [
      "Replace 'necesito' with 'me hace falta' for emotional needs.",
      "Use 'tener ganas de' instead of 'querer' when you want to sound low-pressure.",
      "'Caer bien' is safer than 'me gusta' when talking about people you just met.",
    ],
  },
  {
    id: "false-friends",
    title: "False Friends & Cognate Traps",
    subtitle: "Where Romanian intuition betrays you",
    category: "Vocabulary",
    content: [
      "Romanian gives you a huge head start — thousands of words look identical. But the ones that look the same and mean something different are the most dangerous. They create false confidence and embarrassing moments.",
      "'Actualmente' does not mean actually. It means currently, nowadays. 'Actualmente vivo en Madrid' = 'I currently live in Madrid.' For 'actually,' use 'en realidad' or 'de hecho.'",
      "'Constipado' does not mean constipated. It means to have a cold. 'Estoy constipado' = 'I have a cold.' For the other condition, use 'estreñido.' This one is famously awkward if you get it wrong.",
      "'Realizar' does not mean to realize. It means to carry out or accomplish. 'Realicé un estudio' = 'I carried out a study.' For 'I realized,' use 'me di cuenta de' or 'caí en la cuenta.'",
      "'Asistir' usually means to attend, not to assist. 'Asisto a muchos conciertos' = 'I attend many concerts.' For 'to assist/help,' use 'ayudar.'",
      "'Advertir' means to warn, not to advertise. 'Te advierto que...' = 'I warn you that...' For advertising, use 'publicitar' or 'hacer publicidad.'",
      "'Pretender' means to try or attempt, not to pretend. 'Pretendo aprender' = 'I intend to learn.' For pretending, use 'fingir.'",
      "'Embarazada' does not mean embarrassed. It means pregnant. 'Estoy embarazada' = 'I'm pregnant.' For embarrassed, use 'avergonzada' or 'me da vergüenza.'",
    ],
    examples: [
      {
        spanish: "Actualmente trabajo desde casa.",
        english: "I currently work from home.",
        explanation: "Actualmente = currently, not actually.",
      },
      {
        spanish: "Estoy constipado, no puedo salir.",
        english: "I have a cold, I can't go out.",
        explanation: "Constipado = having a cold. Not what you think.",
      },
      {
        spanish: "Me di cuenta de que estaba equivocado.",
        english: "I realized I was wrong.",
        explanation: "Realize = darse cuenta de. Realizar = to carry out.",
      },
      {
        spanish: "Asisto a clases de yoga los martes.",
        english: "I attend yoga classes on Tuesdays.",
        explanation: "Asistir = to attend (an event/class). Ayudar = to assist.",
      },
      {
        spanish: "Te advierto que va a llover.",
        english: "I warn you that it's going to rain.",
        explanation: "Advertir = to warn. Publicitar = to advertise.",
      },
      {
        spanish: "Fingí que no la había visto.",
        english: "I pretended I hadn't seen her.",
        explanation: "Pretend = fingir. Pretender = to intend / try.",
      },
    ],
    tips: [
      "When a word looks identical to Romanian, pause and check if the meaning shifted.",
      "'Embarazada' is the most famous false friend — never confuse it.",
      "Keep a personal list of the false friends that trick you most often.",
    ],
  },
  {
    id: "small-talk",
    title: "Small Talk & Social Rituals",
    subtitle: "Scripts for neighbors, colleagues, shopkeepers",
    category: "Conversation",
    content: [
      "After seven years, you know the words. But do you know the scripts? Spanish social interactions follow patterns, and deviating from them marks you as foreign even if your grammar is perfect.",
      "'¿Qué tal?' is not a real question. The answer is almost always 'bien, ¿y tú?' even if your dog just died. It is a greeting, not an inquiry. Save real answers for people you are actually close to.",
      "'¿Cómo lo llevas?' means 'how are you handling it?' It is deeper than '¿qué tal?' and shows actual interest. Use it when someone is going through something — a new job, a move, a renovation.",
      "'No te preocupes' is the universal soother. It means 'don't worry' but is used for everything: apologies, thanks, minor inconveniences. It is the Spanish equivalent of 'no worries' or 'de nada.'",
      "'Oye, una cosa' signals a topic shift. It means 'hey, one thing' and prepares the listener for a request or a new subject. It softens the transition.",
      "'Cuídate' is how you say goodbye to someone who is unwell, stressed, or going through something. It means 'take care' and carries genuine warmth. 'Hasta luego' is for casual goodbyes; 'cuídate' is for people you care about.",
    ],
    examples: [
      {
        spanish: "—¿Qué tal? —Bien, bien, ¿y tú?",
        english: "—How's it going? —Good, good, and you?",
        explanation: "¿Qué tal? is a greeting, not a real question.",
      },
      {
        spanish: "¿Cómo lo llevas con el nuevo piso?",
        english: "How are you handling the new flat?",
        explanation: "¿Cómo lo llevas? = genuine interest in someone's situation.",
      },
      {
        spanish: "—Perdona el retraso. —No te preocupes.",
        english: "—Sorry I'm late. —Don't worry.",
        explanation: "No te preocupes = the all-purpose Spanish soother.",
      },
      {
        spanish: "Oye, una cosa, ¿me puedes ayudar?",
        english: "Hey, one thing, can you help me?",
        explanation: "Oye una cosa = soft topic shift before a request.",
      },
      {
        spanish: "Cuídate mucho.",
        english: "Take good care.",
        explanation: "Cuídate = warm goodbye for someone going through something.",
      },
      {
        spanish: "Nos vemos, que vaya bien.",
        english: "See you, hope it goes well.",
        explanation: "Que vaya bien = standard friendly send-off.",
      },
    ],
    tips: [
      "Never give an honest answer to '¿qué tal?' unless you know the person well.",
      "'No te preocupes' replaces 'de nada,' 'no problem,' and 'it's okay' all at once.",
      "End phone calls with 'que vaya bien' or 'cuídate' — 'adiós' sounds too final.",
    ],
  },
  {
    id: "evaluative-language",
    title: "Evaluative Language",
    subtitle: "Describing things vividly",
    category: "Vocabulary",
    content: [
      "If you only ever say 'está bien' and 'me gusta,' you sound flat. Spanish has rich evaluative vocabulary for expressing opinions with color and personality.",
      "'Es de lo más...' is a superlative frame. 'Es de lo más divertido' = 'It's the most fun thing ever.' It sounds more natural than 'es muy divertido' because it frames the quality as extreme without being repetitive.",
      "'No tiene desperdicio' means something is worth experiencing in full. A meal, a film, a story — if nothing should be skipped, 'no tiene desperdicio.' It is high praise.",
      "'Da igual' means 'it doesn't matter' in a relaxed, generous way. 'Da igual, tú elige' = 'It doesn't matter, you choose.' It is softer than 'no importa' because it implies you genuinely don't mind.",
      "'Mola' and 'es una pasada' are enthusiastic approval. 'Esa película mola' = 'That film is cool.' 'El concierto fue una pasada' = 'The concert was amazing.' These are casual and youthful.",
      "'Qué rollo' is the opposite — boredom or annoyance. 'Qué rollo de película' = 'What a boring film.' It can also mean 'what a hassle.' Context makes it clear.",
      "'No está mal' is understated praise. It means 'not bad' but functions like 'pretty good.' Spaniards often understate to sound cool. '¿Cómo estuvo la cena?' 'No estuvo mal.' = It was actually great.",
    ],
    examples: [
      {
        spanish: "Este sitio es de lo más acogedor.",
        english: "This place is the coziest ever.",
        explanation: "Es de lo más + adjective = extreme, natural-sounding praise.",
      },
      {
        spanish: "Esa serie no tiene desperdicio.",
        english: "That show is worth every minute.",
        explanation: "No tiene desperdicio = nothing should be skipped, highest praise.",
      },
      {
        spanish: "Da igual, tú decides.",
        english: "It doesn't matter, you decide.",
        explanation: "Da igual = relaxed indifference, generous and easygoing.",
      },
      {
        spanish: "Me mola mucho tu camiseta.",
        english: "I really like your t-shirt.",
        explanation: "Molar = to be cool. Casual, friendly approval.",
      },
      {
        spanish: "El viaje fue una pasada.",
        english: "The trip was incredible.",
        explanation: "Una pasada = amazing, over-the-top great.",
      },
      {
        spanish: "Qué rollo, llevo media hora esperando.",
        english: "What a hassle, I've been waiting half an hour.",
        explanation: "Qué rollo = complaint about boredom or annoyance.",
      },
    ],
    tips: [
      "Use 'no está mal' to praise something without sounding overly excited.",
      "'Mola' and 'pasada' are for friends; 'no tiene desperdicio' works anywhere.",
      "'Da igual' is warmer than 'no importa' — use it when you genuinely don't mind.",
    ],
  },
  {
    id: "formal-informal",
    title: "Formal vs. Informal Register",
    subtitle: "Knowing when to shift gears",
    category: "Conversation",
    content: [
      "After seven years, you are probably solid on tú vs. usted. But register shifts happen in subtle ways beyond just the pronoun. Knowing when to soften, elevate, or casualize your speech is what separates a resident from a visitor.",
      "At work, 'podrías' is safer than 'puedes' with colleagues you don't know well. The conditional adds a layer of hypothetical politeness. '¿Podrías enviarme el archivo?' sounds like a request; '¿Puedes enviarme el archivo?' can sound like a command.",
      "With bureaucracy — banks, government offices, landlords — use full sentences and avoid contractions. 'Querría solicitar...' not 'quiero.' 'Me gustaría saber...' not 'dime.' The extra formality signals respect and patience.",
      "With shopkeepers and waiters, a middle register works best. 'Me pones un café, por favor' is friendly but not too casual. 'Querría un café' is overly formal for a neighborhood bar. 'Dame un café' is too brusque unless you are a regular.",
      "Email tone matters. Starting with 'Estimado/a' is formal. 'Hola' is neutral. 'Buenas' is too casual for work. Ending with 'Un saludo' is safe; 'Un abrazo' is for people you know; 'Atentamente' is very formal.",
      "The pronoun 'le' instead of 'te' marks respect. 'Le importa si abro la ventana?' = 'Would you mind if I open the window?' Using 'le' with strangers and 'te' with friends is the standard rule, but in practice, Spain is getting more casual. When in doubt, start formal and let the other person invite you to use tú.",
    ],
    examples: [
      {
        spanish: "¿Podría reservar una mesa para dos?",
        english: "Could I reserve a table for two?",
        explanation: "Conditional + usted = polite phone call to a restaurant.",
      },
      {
        spanish: "Me pones un cortado, por favor.",
        english: "Can I get a cortado, please?",
        explanation: "Middle register — friendly but respectful at a bar.",
      },
      {
        spanish: "Querría solicitar información sobre...",
        english: "I would like to request information about...",
        explanation: "Formal opening for bureaucracy or business emails.",
      },
      {
        spanish: "¿Te importa si fumo aquí?",
        english: "Do you mind if I smoke here?",
        explanation: "Te = informal. With a stranger, use 'le importa.'",
      },
      {
        spanish: "Estimado señor López, un saludo.",
        english: "Dear Mr. López, best regards.",
        explanation: "Formal email bookends for professional communication.",
      },
      {
        spanish: "No pasa nada, tú tranquilo.",
        english: "No worries, take it easy.",
        explanation: "Casual reassurance among friends. Too informal for work.",
      },
    ],
    tips: [
      "Start formal and let the other person offer 'tuteo' (using tú).",
      "In emails, 'un saludo' is the safest closing until you know the person.",
      "Conditional verbs (podría, querría) are your shield in formal situations.",
    ],
  },
  {
    id: "paraphrasing-repair",
    title: "Paraphrasing & Repair",
    subtitle: "Getting out of trouble when you don't know the word",
    category: "Conversation",
    content: [
      "Even natives forget words. The difference is that natives have repair strategies — automatic ways to talk around a gap without breaking the flow. After seven years, you need these tools in your pocket.",
      "'Cómo se dice...' is the honest approach. 'Cómo se dice 'awkward' en español?' It signals you are actively learning, which most people find endearing. Don't be embarrassed — use it.",
      "'No sé cómo explicarlo, pero es como...' lets you describe instead of naming. 'Es como cuando...' (it's like when...) is incredibly powerful. You can communicate almost anything through analogy.",
      "'Es decir' and 'o sea' are repair markers. When you realize your sentence is unclear, 'es decir' lets you rephrase. 'Quiero ir, es decir, si tú también quieres' = 'I want to go, I mean, if you want to too.'",
      "'Lo que pasa es que...' is the excuse frame. When you can't find the right word, blame the complexity of the situation. 'Lo que pasa es que es difícil de explicar' = 'The thing is, it's hard to explain.' It buys you time and sympathy.",
      "Pointing and gesturing is not cheating. 'Eso de ahí' (that thing over there) + a gesture is a valid communicative strategy. Spaniards do it too.",
    ],
    examples: [
      {
        spanish: "¿Cómo se dice 'overwhelming' en español?",
        english: "How do you say 'overwhelming' in Spanish?",
        explanation: "The standard, honest way to ask for a word.",
      },
      {
        spanish: "No sé cómo explicarlo, pero es como...",
        english: "I don't know how to explain it, but it's like...",
        explanation: "Analogy is your best friend when a word fails you.",
      },
      {
        spanish: "Es decir, no es obligatorio.",
        english: "I mean, it's not obligatory.",
        explanation: "Es decir = clarification or rephrasing of your own point.",
      },
      {
        spanish: "Lo que pasa es que no me acuerdo.",
        english: "The thing is, I can't remember.",
        explanation: "Lo que pasa es que = blame the situation, not yourself.",
      },
      {
        spanish: "Pásame eso de ahí, por favor.",
        english: "Pass me that thing over there, please.",
        explanation: "'Eso de ahí' + gesture = totally acceptable communication.",
      },
      {
        spanish: "O sea, ¿tú crees que no va a venir?",
        english: "So, you think he's not going to come?",
        explanation: "O sea = checking your understanding of someone else's point.",
      },
    ],
    tips: [
      "Ask '¿cómo se dice?' without shame — it shows you are engaged.",
      "'Es como cuando...' can describe almost anything through analogy.",
      "Gestures are not a crutch — they are a legitimate part of Spanish communication.",
    ],
  },
];
