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
];
