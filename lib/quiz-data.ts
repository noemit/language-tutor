import { QuizVersion } from "@/types";

export const QUIZZES: Record<string, QuizVersion[]> = {
  "past-tense-sick": [
    {
      version: 1,
      questions: [
        { question: "Which tense describes an ongoing state when another action interrupts it?", options: ["Preterite", "Imperfect", "Present Perfect", "Future"], correctIndex: 1, explanation: "The imperfect sets the scene / describes ongoing states. 'Estaba enfermo cuando llamaste.'" },
        { question: "'Estuve enfermo toda la semana' uses which tense?", options: ["Imperfect", "Preterite", "Conditional", "Subjunctive"], correctIndex: 1, explanation: "Preterite — the sickness is a completed event with a clear end." },
        { question: "When do you use the past perfect (pluscuamperfecto)?", options: ["For habits in the past", "For the past of the past", "For ongoing descriptions", "For future plans"], correctIndex: 1, explanation: "Past perfect = 'the past of the past.' 'Había estado enfermo antes de...'" },
        { question: "If you can add 'used to' in English, which Spanish tense do you likely need?", options: ["Preterite", "Imperfect", "Future", "Present"], correctIndex: 1, explanation: "'Used to' maps to the imperfect — habitual or ongoing past actions." },
        { question: "'Me enfermé el lunes' uses preterite because...", options: ["It's a habit", "It's a change of state", "It's an ongoing condition", "It's hypothetical"], correctIndex: 1, explanation: "Enfermarse is a change of state — preterite marks the moment it happened." },
        { question: "Which time expression typically triggers the preterite?", options: ["Siempre", "A veces", "Ayer", "Mientras"], correctIndex: 2, explanation: "'Ayer' is a specific completed time — preterite territory." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'Estaba enfermo cuando llamaste' — why imperfect?", options: ["It's completed", "It's the background scene", "It's a sudden change", "It's hypothetical"], correctIndex: 1, explanation: "Imperfect paints the background: you were in the middle of being sick." },
        { question: "Which sentence uses the preterite?", options: ["Estaba cansado", "Estuve cansado", "He estado cansado", "Estaría cansado"], correctIndex: 1, explanation: "'Estuve' is preterite — a completed state of being tired." },
        { question: "The pluscuamperfecto is formed with...", options: ["había + past participle", "había + imperfect", "he + past participle", "iba + infinitive"], correctIndex: 1, explanation: "'Había estado' — había in imperfect + past participle = pluscuamperfecto." },
        { question: "'Cuando era niño, ______ enfermo a menudo.'", options: ["estuve", "estaba", "había estado", "estuviera"], correctIndex: 1, explanation: "'Cuando era niño' = habitual past → imperfect 'estaba'." },
        { question: "Preterite vs imperfect: 'suddenly' suggests...", options: ["Imperfect", "Preterite", "Subjunctive", "Conditional"], correctIndex: 1, explanation: "'Suddenly' signals a completed, punctual action → preterite." },
        { question: "'Había comido antes de salir' describes...", options: ["A simultaneous action", "An action before another past action", "A future plan", "A habitual routine"], correctIndex: 1, explanation: "Past perfect = eating happened before leaving." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "Which tense would you use for 'I was sick every winter as a child'?", options: ["Preterite", "Imperfect", "Present Perfect", "Past Perfect"], correctIndex: 1, explanation: "Habitual past actions use the imperfect." },
        { question: "'Ayer ______ en la cama todo el día.'", options: ["estaba", "estuve", "he estado", "estuviera"], correctIndex: 1, explanation: "'Ayer' + completed time = preterite 'estuve'." },
        { question: "The imperfect is used for all EXCEPT...", options: ["Ongoing descriptions", "Habitual actions", "Completed events", "Background settings"], correctIndex: 2, explanation: "Completed events use the preterite, not imperfect." },
        { question: "Translate: 'I had already gotten better when you called.'", options: ["Ya mejoré cuando llamaste", "Ya mejoraba cuando llamaste", "Ya había mejorado cuando llamaste", "Ya hubiera mejorado cuando llamaste"], correctIndex: 2, explanation: "'Had already gotten better' = past perfect 'había mejorado'." },
        { question: "Which pair usually appears together in 'cuando' clauses?", options: ["Preterite + Preterite", "Imperfect + Preterite", "Future + Conditional", "Present + Subjunctive"], correctIndex: 1, explanation: "Imperfect background + preterite interruption is the classic pattern." },
        { question: "'Mientras ______, sonó el teléfono.'", options: ["dormí", "dormía", "había dormido", "durmiera"], correctIndex: 1, explanation: "'Mientras' = ongoing background action → imperfect 'dormía'." },
      ],
    },
  ],
  "spain-colloquialisms": [
    {
      version: 1,
      questions: [
        { question: "What does 'vale' most commonly mean?", options: ["Expensive", "Okay / sure", "Valley", "Goodbye"], correctIndex: 1, explanation: "'Vale' is the Swiss Army knife of agreement — okay, sure, got it." },
        { question: "In Spain, 'tío' in casual speech means...", options: ["Uncle", "Dude / guy", "Old man", "Boss"], correctIndex: 1, explanation: "'Tío' and 'tía' mean dude/guy/girl in informal peninsular Spanish." },
        { question: "'Venga' can mean all EXCEPT...", options: ["Come on", "Okay let's go", "Express disbelief", "Thank you"], correctIndex: 3, explanation: "'Venga' never means thank you. It means come on, hurry up, agree, or even goodbye." },
        { question: "Which is softer: 'oye' or 'mira'?", options: ["Oye", "Mira", "They are equal", "Depends on volume"], correctIndex: 0, explanation: "'Oye' is softer, like 'hey.' 'Mira' is more direct, like 'look.'" },
        { question: "'Hombre, claro!' expresses...", options: ["Gender agreement", "Surprise + agreement", "Anger", "Confusion"], correctIndex: 1, explanation: "'Hombre' softens and adds emotion — here it's surprise + agreement." },
        { question: "'Pues... la verdad es que no lo sé' uses 'pues' as...", options: ["A causal connector", "A thinking-time filler", "A formal greeting", "A negative marker"], correctIndex: 1, explanation: "'Pues' buys thinking time, like 'well' or 'so' in English." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'¿Qué pasa, tío?' is equivalent to...", options: ["What's wrong, uncle?", "What's up, man?", "What happens, dude?", "What's the problem, boss?"], correctIndex: 1, explanation: "'¿Qué pasa, tío?' = 'What's up, man?' — casual greeting." },
        { question: "Which filler is safest instead of 'bueno' when agreeing?", options: ["Malo", "Vale", "Quizá", "Nunca"], correctIndex: 1, explanation: "'Vale' is the standard, neutral agreement word in Spain." },
        { question: "'Mira, no es tan fácil' uses 'mira' to...", options: ["Get attention", "Soften a contradiction", "Both", "Neither"], correctIndex: 2, explanation: "'Mira' gets attention AND softens the contradiction that follows." },
        { question: "'Hombre, no me digas eso' conveys...", options: ["Literal gender reference", "Surprise or mild protest", "Formal disagreement", "Romantic interest"], correctIndex: 1, explanation: "'Hombre' here softens the surprise/protest — 'come on, don't tell me that.'" },
        { question: "Which phrase means 'come on' and can signal goodbye?", options: ["Vale", "Venga", "Oye", "Pues"], correctIndex: 1, explanation: "'Venga' is incredibly versatile — come on, hurry up, agree, or even 'okay, bye.'" },
        { question: "'Pues nada' is typically used to...", options: ["Start a story", "End a conversation", "Express anger", "Ask a question"], correctIndex: 1, explanation: "'Pues nada' often wraps things up — 'well, anyway...'" },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "Which word is NOT a typical Spanish filler?", options: ["Pues", "Vale", "Ojalá", "O sea"], correctIndex: 2, explanation: "'Ojalá' expresses hope/wish — it's not a filler like the others." },
        { question: "'Tía, ¿has visto eso?' — 'tía' refers to...", options: ["A family member", "A female friend casually", "An elderly woman", "A boss"], correctIndex: 1, explanation: "'Tía' = girl / woman / dude in casual peninsular Spanish." },
        { question: "The intonation of 'venga' can express...", options: ["Only encouragement", "Only exhaustion", "Encouragement, dismissal, or exhaustion", "Only agreement"], correctIndex: 2, explanation: "'Venga' shifts meaning completely based on tone — context is everything." },
        { question: "'Oye, una cosa...' signals...", options: ["A greeting", "A topic shift or request", "An apology", "A farewell"], correctIndex: 1, explanation: "'Oye, una cosa' softens a transition to a new topic or request." },
        { question: "Which is the most emotionally neutral agreement?", options: ["¡Hombre, claro!", "Vale", "Anda ya", "Qué fuerte"], correctIndex: 1, explanation: "'Vale' is neutral agreement. The others carry more emotion." },
        { question: "'Pues' functions similarly to which English word?", options: ["Because", "Well / so", "Never", "Exactly"], correctIndex: 1, explanation: "'Pues' = 'well' or 'so' — a hesitation filler that buys thinking time." },
      ],
    },
  ],
  "asking-questions": [
    {
      version: 1,
      questions: [
        { question: "In embedded questions, Spanish keeps...", options: ["Question word order", "Statement word order", "Subjunctive mood", "Future tense"], correctIndex: 1, explanation: "Embedded questions keep statement word order: 'No sé qué quieres' not 'No sé qué quieres tú.'" },
        { question: "'Lo que' means...", options: ["What time", "The thing that", "Which one", "Why"], correctIndex: 1, explanation: "'Lo que' = 'the thing that.' 'No entiendo lo que dices.'" },
        { question: "For indirect yes/no questions, use...", options: ["Sí", "Si", "Que", "Lo"], correctIndex: 1, explanation: "'Si' (without accent) means 'if' in indirect questions. 'Me preguntó si había comido.'" },
        { question: "'Dime cuándo puedes venir' uses...", options: ["Direct question word order", "Statement word order", "Subjunctive", "Future tense"], correctIndex: 1, explanation: "Indirect question = statement order, no question marks." },
        { question: "Which is correct for 'I don't understand what you're saying'?", options: ["No entiendo qué dices", "No entiendo lo que dices", "No entiendo cuál dices", "No entiendo cómo dices"], correctIndex: 1, explanation: "'Lo que dices' = the thing that you're saying." },
        { question: "'Aunque llueve, salgo' — which mood?", options: ["Subjunctive", "Indicative", "Conditional", "Imperative"], correctIndex: 1, explanation: "Indicative after 'aunque' = known fact (it IS raining)." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "Embedded questions in Spanish NEVER have...", options: ["A verb", "Question marks", "A subject", "An object"], correctIndex: 1, explanation: "Embedded questions are statements containing question words — no ¿? needed." },
        { question: "'Me preguntó si había comido' — 'si' here means...", options: ["Yes", "If / whether", "That", "So"], correctIndex: 1, explanation: "In indirect yes/no questions, 'si' means 'if' or 'whether.'" },
        { question: "Replace 'what' with 'the thing that' — which Spanish word fits?", options: ["Qué", "Cuál", "Lo que", "Como"], correctIndex: 2, explanation: "If you can substitute 'the thing that,' use 'lo que.'" },
        { question: "'Aunque llueva, saldré' uses subjunctive because...", options: ["It's a known fact", "It's hypothetical", "It's a command", "It's past tense"], correctIndex: 1, explanation: "'Aunque llueva' = even if it rains (hypothetical) → subjunctive." },
        { question: "Which sentence is an embedded question?", options: ["¿Dónde vives?", "No sé dónde vives", "¡Dime dónde vives!", "Vives donde quieras"], correctIndex: 1, explanation: "'No sé dónde vives' = statement containing a question word." },
        { question: "'Cuál' vs 'qué': 'qué' is for...", options: ["Choosing from a known set", "Definitions and open answers", "People", "Places only"], correctIndex: 1, explanation: "'Qué' = definitions / open-ended. 'Cuál' = choosing from known options." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Dime cuándo puedes venir' — no question marks because...", options: ["It's rude", "It's a command", "It's an embedded question", "It's in the future"], correctIndex: 2, explanation: "Embedded questions are grammatically statements — no question marks." },
        { question: "'No entiendo lo que ______.'", options: ["dices", "digas", "dirás", "dirías"], correctIndex: 0, explanation: "Indicative — we're talking about what you ARE saying, a fact." },
        { question: "Indirect speech for 'Are you coming?' becomes...", options: ["Me preguntó si venías", "Me preguntó ¿venías?", "Me preguntó que venías", "Me preguntó por qué venías"], correctIndex: 0, explanation: "'Si' + statement order = indirect yes/no question." },
        { question: "'Lo que pasa es que...' uses 'lo que' as...", options: ["A direct question", "A noun phrase", "A time expression", "A location marker"], correctIndex: 1, explanation: "'Lo que pasa' = the thing that happens — 'lo que' nominalizes the clause." },
        { question: "When does 'aunque' take the subjunctive?", options: ["Always", "Never", "When hypothetical", "Only in the past"], correctIndex: 2, explanation: "'Aunque' + indicative = fact. 'Aunque' + subjunctive = hypothetical." },
        { question: "Which is an indirect question?", options: ["¿Qué hora es?", "No sé qué hora es", "¡Dime qué hora es!", "Es hora de qué"], correctIndex: 1, explanation: "'No sé qué hora es' = statement containing a question word." },
      ],
    },
  ],
  "subjunctive-mood": [
    {
      version: 1,
      questions: [
        { question: "The subjunctive is a...", options: ["Tense", "Mood", "Person", "Number"], correctIndex: 1, explanation: "Subjunctive is a mood, not a tense. It expresses uncertainty, desire, emotion, doubt." },
        { question: "'Espero que estés bien' uses subjunctive because...", options: ["It's a fact", "It's a hope / wish", "It's a command", "It's past tense"], correctIndex: 1, explanation: "'Espero' = hope. Your well-being is wished for, not confirmed → subjunctive." },
        { question: "WEIRDO stands for...", options: ["Wishes, Emotions, Impersonal expressions, Recommendations, Doubt/Denial, Ojalá", "Words, Expressions, Indicative, Reflexive, Direct, Object", "When, Events, Imperfect, Real, Direct, Opinions", "None of the above"], correctIndex: 0, explanation: "WEIRDO = Wishes, Emotions, Impersonal expressions, Recommendations, Doubt/Denial, Ojalá." },
        { question: "'Ojalá' always triggers...", options: ["Indicative", "Subjunctive", "Conditional", "Imperative"], correctIndex: 1, explanation: "'Ojalá' expresses hope/wish → always subjunctive." },
        { question: "'Si fuera rico, viajaría' — 'fuera' is...", options: ["Preterite indicative", "Imperfect subjunctive", "Present subjunctive", "Future"], correctIndex: 1, explanation: "Hypothetical 'if' clauses use imperfect subjunctive: 'si fuera.'" },
        { question: "Which triggers the subjunctive?", options: ["Es verdad que", "Dudo que", "Sé que", "Es obvio que"], correctIndex: 1, explanation: "'Dudo' = doubt → subjunctive. The others state facts → indicative." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'Me alegra que hayas venido' — subjunctive triggered by...", options: ["Time expression", "Emotion", "Location", "Command"], correctIndex: 1, explanation: "'Me alegra' = emotion → subjunctive in the subordinate clause." },
        { question: "'Espero que estás bien' is...", options: ["Correct", "Wrong — should be subjunctive", "Too formal", "Future tense"], correctIndex: 1, explanation: "'Espero que' requires subjunctive: 'estés' not 'estás.'" },
        { question: "The imperfect subjunctive (-ra form) is used for...", options: ["Current facts", "Hypotheticals and politeness", "Completed actions", "Locations"], correctIndex: 1, explanation: "-ra/-se forms = hypotheticals ('si fuera') and polite requests." },
        { question: "'Ojalá hubiera sabido' uses...", options: ["Present subjunctive", "Past perfect subjunctive", "Imperfect indicative", "Future"], correctIndex: 1, explanation: "'Hubiera sabido' = past perfect subjunctive for impossible past wishes." },
        { question: "'Es importante que descanses' — which WEIRDO letter?", options: ["W", "E", "I", "R"], correctIndex: 2, explanation: "'Es importante que' = impersonal expression → I in WEIRDO." },
        { question: "Which sentence does NOT use subjunctive?", options: ["Quiero que vengas", "Dudo que sea cierto", "Sé que es cierto", "Espero que llueva"], correctIndex: 2, explanation: "'Sé que es cierto' = stated fact → indicative, not subjunctive." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "If you can say 'it's a fact that...' before the clause, use...", options: ["Subjunctive", "Indicative", "Conditional", "Imperative"], correctIndex: 1, explanation: "Facts take indicative. Uncertainty/doubt/wish takes subjunctive." },
        { question: "'Dudo que venga' means...", options: ["I know he'll come", "I doubt he'll come", "I want him to come", "I hope he comes"], correctIndex: 1, explanation: "'Dudo' = doubt → subjunctive. 'I doubt he'll come.'" },
        { question: "'Si ______ rico, viajaría.'", options: ["soy", "fuera", "era", "sea"], correctIndex: 1, explanation: "Hypothetical 'if' = imperfect subjunctive 'fuera.'" },
        { question: "'Ojalá' comes from which language originally?", options: ["Latin", "Arabic", "Greek", "Basque"], correctIndex: 1, explanation: "'Ojalá' comes from Arabic 'insha'Allah' (God willing)." },
        { question: "Which is a recommendation that triggers subjunctive?", options: ["Es verdad que", "Te recomiendo que", "Sé que", "Es cierto que"], correctIndex: 1, explanation: "'Te recomiendo que' = recommendation → subjunctive." },
        { question: "'Espero que estés bien' — which verb form is 'estés'?", options: ["Present indicative", "Present subjunctive", "Imperfect subjunctive", "Future"], correctIndex: 1, explanation: "'Estés' = present subjunctive of estar." },
      ],
    },
  ],
  "ser-vs-estar": [
    {
      version: 1,
      questions: [
        { question: "'Soy alto' uses ser because height is...", options: ["Temporary", "Inherent / identity", "A location", "An event"], correctIndex: 1, explanation: "Ser = inherent qualities and identity. Height is part of who you are." },
        { question: "'Estoy cansado' uses estar because...", options: ["It's permanent", "It's a temporary state", "It's an event", "It's a definition"], correctIndex: 1, explanation: "Estar = temporary states and conditions. Tiredness comes and goes." },
        { question: "Why is 'está muerto' estar and not ser?", options: ["Death is temporary", "It's the result of a process", "It's an event location", "It's a mistake"], correctIndex: 1, explanation: "Estar marks results of processes: life → death, marriage, destruction." },
        { question: "'Eres guapo' vs 'estás guapo hoy' — the second implies...", options: ["Permanent ugliness", "You look unusually good today", "You're always handsome", "You were handsome"], correctIndex: 1, explanation: "Estar + adjective can mean 'unusually so today' — almost teasing/flirtatious." },
        { question: "Events use...", options: ["Estar", "Ser", "Both", "Neither"], correctIndex: 1, explanation: "Events 'are' somewhere: 'La fiesta es en mi casa.' People 'están' somewhere." },
        { question: "'La paella está buena' uses estar because taste is...", options: ["Permanent", "An experienced quality", "An event", "A definition"], correctIndex: 1, explanation: "Estar = the current, experienced quality of the food." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "Ser is for...", options: ["Locations", "Temporary states", "Identity and inherent qualities", "Results of processes"], correctIndex: 2, explanation: "Ser = what something IS (identity, definition, inherent traits)." },
        { question: "Estar is for all EXCEPT...", options: ["Locations", "Temporary conditions", "Identity", "Results of processes"], correctIndex: 2, explanation: "Identity uses ser, not estar." },
        { question: "'Mi abuelo está muerto' — esta uses estar because...", options: ["Death is reversible", "Death is the result of a process", "It's a location", "It's an event"], correctIndex: 1, explanation: "Estar marks results: life → death, raw → cooked, single → married." },
        { question: "Which uses ser?", options: ["Estoy en Madrid", "Soy de Madrid", "Estoy cansado", "Estoy casado"], correctIndex: 1, explanation: "'Soy de Madrid' = origin/identity → ser." },
        { question: "'Estás raro' means...", options: ["You are a weird person", "You're acting weird today", "You look weird permanently", "You were weird"], correctIndex: 1, explanation: "Estar + adjective = unusual for you: 'you're acting weird (today).'" },
        { question: "Food type uses...", options: ["Ser", "Estar", "Both", "Neither"], correctIndex: 0, explanation: "'La paella es valenciana' = type/origin → ser. 'Está buena' = current taste → estar." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "When you describe someone's personality, use...", options: ["Ser", "Estar", "Both", "Neither"], correctIndex: 0, explanation: "Personality = inherent quality → ser. 'Eres muy amable.'" },
        { question: "'Estoy enfermo' uses estar because...", options: ["Illness is permanent", "Illness is a temporary condition", "It's a location", "It's an event"], correctIndex: 1, explanation: "Being sick is temporary → estar. But 'está muerto' breaks the 'temporary' rule." },
        { question: "Marriage uses estar because...", options: ["It's temporary", "It's the result of a process", "It's an event", "It's a mistake"], correctIndex: 1, explanation: "'Estoy casado' = result of the process of getting married → estar." },
        { question: "'La fiesta es en mi casa' — why ser?", options: ["Parties are people", "Events 'are' somewhere", "It's permanent", "It's a definition"], correctIndex: 1, explanation: "Events use ser for location. People use estar for location." },
        { question: "'Esta tortilla está buenísima' — esta refers to the tortilla, está refers to...", options: ["The tortilla's identity", "The current taste experience", "The cooking process", "The chef"], correctIndex: 1, explanation: "'Está buenísima' = current experienced quality → estar." },
        { question: "Ser vs estar: ask yourself...", options: ["Is it expensive?", "Is it a fact about identity or a state/result?", "Is it fast?", "Is it new?"], correctIndex: 1, explanation: "Identity/fact → ser. State/location/result → estar." },
      ],
    },
  ],
  "se-impersonal": [
    {
      version: 1,
      questions: [
        { question: "'Se habla español' uses se for...", options: ["A reflexive action", "An impersonal general statement", "A passive voice", "A command"], correctIndex: 1, explanation: "Impersonal se = general statements where the subject doesn't matter." },
        { question: "'Se me cayó el vaso' means...", options: ["I dropped the glass on purpose", "The glass fell (on me)", "I threw the glass", "The glass is mine"], correctIndex: 1, explanation: "Passive se + indirect object = minor accident, deflecting blame." },
        { question: "In 'se' constructions, the verb agrees with...", options: ["The person", "The object", "Always singular", "Always plural"], correctIndex: 1, explanation: "'Se cayeron los vasos' — plural verb because plural object." },
        { question: "'Cómo se dice' is used to...", options: ["Ask for a definition", "Ask how to say something", "Give a command", "Say goodbye"], correctIndex: 1, explanation: "'Cómo se dice X en español?' = 'How do you say X in Spanish?'" },
        { question: "'Se venden libros' — why plural verb?", options: ["Because of the people", "Because 'libros' is plural", "Because it's a command", "Because it's reflexive"], correctIndex: 1, explanation: "The verb agrees with the object: libros (plural) → venden (plural)." },
        { question: "'Se me acabó la paciencia' uses se to...", options: ["Show anger", "Show the patience left me", "Ask for patience", "Give patience"], correctIndex: 1, explanation: "'Se me acabó' = it ran out on me — passive + indirect object." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "Impersonal se is for statements where...", options: ["The subject is specific", "The subject is irrelevant", "The verb is reflexive", "The object is missing"], correctIndex: 1, explanation: "Impersonal se = 'one does X' or 'X is done' — no specific subject." },
        { question: "'Se come bien aquí' means...", options: ["One eats well here", "He eats well here", "I eat well here", "They eat well here"], correctIndex: 0, explanation: "Impersonal se = general statement about the experience." },
        { question: "'Se rompió la ventana' uses se because...", options: ["Someone broke it deliberately", "No one is blamed", "It's a command", "It's reflexive"], correctIndex: 1, explanation: "Passive se = the event happened, no specific agent is blamed." },
        { question: "Which is a correct use of impersonal se?", options: ["Se vende casa", "Se venden casas", "Both", "Neither"], correctIndex: 2, explanation: "Both work — singular verb for singular object, plural for plural." },
        { question: "'Se me olvidó' literally means...", options: ["I forgot", "It forgot itself on me", "I remembered", "It remembered me"], correctIndex: 1, explanation: "'Se me olvidó' = it forgot itself on me — the classic involuntary construction." },
        { question: "For asking translations, natives say...", options: ["Qué es 'apple'", "Cómo se dice 'apple'", "Dónde está 'apple'", "Por qué 'apple'"], correctIndex: 1, explanation: "'Cómo se dice X?' = standard way to ask for a translation." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "The se in 'se me cayó' is...", options: ["Reflexive", "Passive / involuntary", "Impersonal", "Reciprocal"], correctIndex: 1, explanation: "Passive se + indirect object = involuntary action happening to me." },
        { question: "'Se vende casa' — singular verb because...", options: ["Se is singular", "Casa is singular", "It's a rule", "It's an exception"], correctIndex: 1, explanation: "Verb agrees with object: casa (singular) → vende (singular)." },
        { question: "Which uses impersonal se?", options: ["Me lavo las manos", "Se dice que va a llover", "Te ves bien", "Nos vamos"], correctIndex: 1, explanation: "'Se dice' = impersonal 'they say / one says.'" },
        { question: "'Se me olvidó el paraguas' expresses...", options: ["Deliberate forgetting", "Involuntary forgetting", "Anger", "Request"], correctIndex: 1, explanation: "Se me + verb = involuntary, deflects blame." },
        { question: "Passive se is used when...", options: ["You know who did it", "You don't know / don't care who did it", "It's a command", "It's reflexive"], correctIndex: 1, explanation: "Passive se = agent is unknown, unimportant, or being hidden." },
        { question: "'¿Cómo se dice 'hello' en español?' expects the answer...", options: ["A definition", "A translation", "A location", "A reason"], correctIndex: 1, explanation: "'Cómo se dice' asks for the equivalent word/phrase." },
      ],
    },
  ],
  "object-pronouns": [
    {
      version: 1,
      questions: [
        { question: "In 'me lo dijo', the order is...", options: ["Direct then indirect", "Indirect then direct", "Either order works", "It depends on the verb"], correctIndex: 1, explanation: "Indirect (me) always comes before direct (lo)." },
        { question: "'Le lo di' is wrong because...", options: ["It's rude", "Le changes to se before lo", "The order is reversed", "It's too formal"], correctIndex: 1, explanation: "L-L combination is avoided: le + lo → se lo." },
        { question: "'Dímelo' is formed by...", options: ["Di + me + lo", "Me + di + lo", "Lo + di + me", "Di + lo + me"], correctIndex: 0, explanation: "Imperative + pronouns attach: di + me + lo = dímelo (with accent)." },
        { question: "With infinitives, pronouns can...", options: ["Only attach to the end", "Only go before the conjugated verb", "Go before the verb OR attach to the infinitive", "Never be used"], correctIndex: 2, explanation: "'Te lo voy a decir' or 'Voy a decírtelo' — both are correct." },
        { question: "'Explícame' has an accent because...", options: ["It's a question", "The stress shifts when adding the pronoun", "It's formal", "It's subjunctive"], correctIndex: 1, explanation: "'Explica' → 'explícame' — stress shifts to the antepenultimate syllable." },
        { question: "'Se lo di a María' means...", options: ["I gave María to him", "I gave it to María", "María gave it to me", "I gave it to him/her"], correctIndex: 1, explanation: "Se lo = le (to her) + lo (it) → I gave it to María." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "The indirect object pronoun for 'to them' is...", options: ["Lo", "Les", "Los", "Se"], correctIndex: 1, explanation: "Les = to them (indirect). Los = them (direct)." },
        { question: "When le/les meets lo/la/los/las, le/les becomes...", options: ["Te", "Me", "Se", "Lo"], correctIndex: 2, explanation: "Phonetic rule: le/les + lo/la... → se lo, se la, se los, se las." },
        { question: "'Dime' has no accent but 'dímelo' does because...", options: ["It's a different verb", "Adding pronouns shifts the stress", "It's more formal", "It's a question"], correctIndex: 1, explanation: "'Di' is one syllable. 'Dí-me-lo' = stress on dí, which is now the antepenult." },
        { question: "'Te lo voy a enviar' — where are the pronouns?", options: ["Attached to enviar", "Before the conjugated verb", "After voy", "Separated"], correctIndex: 1, explanation: "Before the conjugated verb 'voy' — conversational and natural." },
        { question: "'Pásame eso' — what kind of command is this?", options: ["With no pronoun", "With indirect object", "With direct object", "Reflexive"], correctIndex: 1, explanation: "'Pásame' = pasa + me (indirect object) → pass TO me." },
        { question: "Which is correct?", options: ["Le lo di", "Se lo di", "Lo se di", "Di se lo"], correctIndex: 1, explanation: "'Se lo di' — le becomes se before lo." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Me lo dijo ayer' — 'me' is...", options: ["Direct object", "Indirect object", "Reflexive", "Subject"], correctIndex: 1, explanation: "Me = to me (indirect). Lo = it (direct)." },
        { question: "In commands, pronouns...", options: ["Go before the verb", "Attach to the verb", "Are dropped", "Come after a preposition"], correctIndex: 1, explanation: "Commands attach: dímelo, explícame, cuéntame." },
        { question: "'Te lo voy a decir' vs 'Voy a decírtelo' — the difference is...", options: ["Grammar", "Tone: first more conversational, second more decisive", "Meaning", "Formality"], correctIndex: 1, explanation: "Both correct. Before verb = conversational. Attached = more decisive/compact." },
        { question: "'Se lo di' could mean 'I gave it to...'", options: ["Him only", "Her only", "Them only", "Him, her, or them"], correctIndex: 3, explanation: "Se is ambiguous — it replaces le and les. Context tells you who." },
        { question: "The accent in 'cuéntame' appears because...", options: ["It's a question", "Stress shifts to antepenultimate syllable", "It's formal", "It's past tense"], correctIndex: 1, explanation: "'Cuenta' → 'cuén-ta-me' — stress on cuén (antepenult) → accent needed." },
        { question: "Which double-object combo is most common?", options: ["Me la", "Te lo", "Se lo", "Nos los"], correctIndex: 2, explanation: "'Se lo' (le + lo) is by far the most frequent double-object combination." },
      ],
    },
  ],
  "reflexive-verbs": [
    {
      version: 1,
      questions: [
        { question: "'Ir' vs 'irse' — irse means...", options: ["To go toward", "To leave / go away", "To arrive", "To return"], correctIndex: 1, explanation: "Ir = to go. Irse = to leave / go away." },
        { question: "'Se me olvidó' literally means...", options: ["I forgot on purpose", "It forgot itself on me", "I remembered", "Someone forgot me"], correctIndex: 1, explanation: "Involuntary reflexive — the forgetting 'happened to me.'" },
        { question: "'Me da igual' means...", options: ["I hate it", "I don't care (casual)", "It's important", "It's equal"], correctIndex: 1, explanation: "'Me da igual' = casual, friendly indifference. Softer than 'no me importa.'" },
        { question: "'Me pasa que...' is used to...", options: ["End a conversation", "Start a personal story", "Ask a question", "Give a command"], correctIndex: 1, explanation: "'Me pasa que' = 'the thing is...' — frames a personal experience." },
        { question: "'Volver' vs 'volverse' — volverse means...", options: ["To return", "To become (suddenly)", "To visit again", "To remember"], correctIndex: 1, explanation: "Volverse = sudden change: 'se volvió loco' = he went crazy." },
        { question: "'No me lo creo' uses reflexive to show...", options: ["Anger", "Personal involvement / disbelief", "Happiness", "Confusion"], correctIndex: 1, explanation: "'Creerse' = to believe/accept. The reflexive adds personal stake." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "Reflexive verbs that change meaning should be treated as...", options: ["The same verb", "Completely different verbs", "Synonyms", "Formal versions"], correctIndex: 1, explanation: "Ir and irse have different meanings — learn them separately." },
        { question: "'Se me cayó el vaso' expresses...", options: ["Deliberate action", "Involuntary accident", "Anger", "Request"], correctIndex: 1, explanation: "'Se me + verb' = involuntary, deflects blame." },
        { question: "'Me da igual' is softer than...", options: ["Me importa", "No me importa", "Me gusta", "Me encanta"], correctIndex: 1, explanation: "'Me da igual' < 'no me importa' in intensity — casual indifference." },
        { question: "'Me pasa que no duermo bien' means...", options: ["I pass by without sleeping", "The thing is, I don't sleep well", "I sleep well", "I pass the night well"], correctIndex: 1, explanation: "'Me pasa que' = 'the thing is / what's happening is.'" },
        { question: "'Se volvió muy caro todo' describes...", options: ["A slow change", "A sudden change", "A planned change", "No change"], correctIndex: 1, explanation: "Volverse = sudden, often unexpected change." },
        { question: "Which is an involuntary reflexive construction?", options: ["Me lavo", "Se me olvidó", "Me voy", "Me llamo"], correctIndex: 1, explanation: "'Se me olvidó' = involuntary — the thing 'forgot itself on me.'" },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Quedar' vs 'quedarse' — quedarse means...", options: ["To be located", "To remain / stay (by choice)", "To meet", "To fit"], correctIndex: 1, explanation: "'Quedarse' = to stay/remain. 'Quedar' = to be located / to meet." },
        { question: "'Se me acabó la paciencia' means...", options: ["I finished my patience on purpose", "My patience ran out on me", "I found patience", "Someone took my patience"], correctIndex: 1, explanation: "'Se me acabó' = it ran out on me — involuntary." },
        { question: "'Me voy a casa' uses irse because...", options: ["I'm going toward home", "I'm leaving for home", "I'm arriving home", "I'm at home"], correctIndex: 1, explanation: "Irse = to leave / go away. 'Me voy' = I'm leaving." },
        { question: "'Creer' vs 'creerse' — creerse adds...", options: ["Formality", "Personal involvement", "Past tense", "Future meaning"], correctIndex: 1, explanation: "'Creerse' = to believe/accept as true — reflexive adds personal stake." },
        { question: "Which is NOT an involuntary reflexive?", options: ["Se me olvidó", "Se me cayó", "Se me acabó", "Me lavo"], correctIndex: 3, explanation: "'Me lavo' = deliberate reflexive (I wash myself). The others are involuntary." },
        { question: "'Me pasa que...' introduces...", options: ["A question", "A personal problem or story", "A command", "A greeting"], correctIndex: 1, explanation: "'Me pasa que' = 'what's happening is / the thing is' — personal narrative." },
      ],
    },
  ],
  "future-conditional": [
    {
      version: 1,
      questions: [
        { question: "The simple future is used for...", options: ["Only tomorrow", "Predictions, promises, distant plans", "Politeness", "Hypotheticals"], correctIndex: 1, explanation: "Simple future = predictions, promises, plans. 'Llegaré tarde.'" },
        { question: "The conditional is used for...", options: ["Completed actions", "Hypotheticals and politeness", "Commands", "Present habits"], correctIndex: 1, explanation: "Conditional = would/could. 'Me gustaría' = I would like." },
        { question: "'¿Podrías ayudarme?' is softer than...", options: ["¿Puedes ayudarme?", "¿Me ayudas?", "Ayúdame", "All of the above"], correctIndex: 3, explanation: "Conditional makes any request politer than present tense or imperative." },
        { question: "Future and conditional are formed from...", options: ["The stem", "The infinitive", "The past participle", "The gerund"], correctIndex: 1, explanation: "Hablar → hablaré / hablaría. Comer → comeré / comería. Easy!" },
        { question: "'Dijo que vendría' uses conditional because...", options: ["It's a promise", "It's reported future from the past", "It's hypothetical", "It's polite"], correctIndex: 1, explanation: "He said (past) he would come (future from that past point) → conditional." },
        { question: "'Sería mejor ir andando' is...", options: ["A promise", "A suggestion / hypothetical", "A command", "A fact"], correctIndex: 1, explanation: "'Sería mejor' = it would be better → conditional suggestion." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'Voy a comer' vs 'Comeré' — the second is...", options: ["More immediate", "More distant / formal", "Rude", "Past tense"], correctIndex: 1, explanation: "Simple future sounds more planned or distant than 'voy a.'" },
        { question: "'Me gustaría una cerveza' is the standard way to...", options: ["Demand a beer", "Politely order a beer", "Refuse a beer", "Ask about beer"], correctIndex: 1, explanation: "Conditional = polite request. 'Me gustaría' is the magic ordering phrase." },
        { question: "The conditional ending for 'yo' is...", options: ["-é", "-ía", "-aré", "-eré"], correctIndex: 1, explanation: "Conditional endings: -ía, -ías, -ía, -íamos, -íais, -ían." },
        { question: "'Querría' is more _____ than 'quiero.'", options: ["Aggressive", "Polite / refined", "Casual", "Fast"], correctIndex: 1, explanation: "Conditional softens requests. 'Querría' = I would want < I want." },
        { question: "Which uses the simple future?", options: ["Me gustaría ir", "Iré mañana", "Iría si pudiera", "Voy a ir mañana"], correctIndex: 1, explanation: "'Iré mañana' = simple future. 'Iría' = conditional. 'Voy a ir' = periphrastic future." },
        { question: "'No lo haré' expresses...", options: ["Politeness", "A firm refusal", "A question", "A suggestion"], correctIndex: 1, explanation: "Simple future for firm refusal: 'I will not do it.'" },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "For politeness in shops, use...", options: ["Present tense", "Imperative", "Conditional", "Preterite"], correctIndex: 2, explanation: "Conditional = the polite register for requests in any service setting." },
        { question: "'¿Podría reservar una mesa?' uses conditional to...", options: ["Show anger", "Soften the request", "Show urgency", "Show past tense"], correctIndex: 1, explanation: "'Podría' = could (conditional) — much softer than 'puede' (can)." },
        { question: "The future ending for 'nosotros' is...", options: ["-emos", "-emos (future) / -íamos (conditional)", "-áis", "-án"], correctIndex: 1, explanation: "Future: -emos. Conditional: -íamos. Both attach to the infinitive." },
        { question: "'Dijo que vendría' = he said he ______ come.", options: ["Will", "Would", "Can", "Did"], correctIndex: 1, explanation: "Reported future in the past → conditional 'would' in English too." },
        { question: "Which is hypothetical?", options: ["Llegaré a las ocho", "Llegaría si no lloviera", "Llegué a las ocho", "Voy a llegar a las ocho"], correctIndex: 1, explanation: "'Llegaría si...' = conditional + if = hypothetical." },
        { question: "Replace 'voy a' with simple future when talking about...", options: ["Right now", "Today", "Tomorrow or later", "Yesterday"], correctIndex: 2, explanation: "Simple future sounds more natural for distant plans. 'Voy a' is for immediate future." },
      ],
    },
  ],
  "gerund-vs-infinitive": [
    {
      version: 1,
      questions: [
        { question: "Verbs of continuation take...", options: ["Infinitive", "Gerund", "Subjunctive", "Indicative"], correctIndex: 1, explanation: "'Sigo pensando' — seguir takes gerund." },
        { question: "Most verbs take...", options: ["Gerund", "Infinitive", "Either", "Neither"], correctIndex: 1, explanation: "'Quiero comer' — most verbs want the infinitive." },
        { question: "'Acabar de' + infinitive means...", options: ["To finish doing", "To have just done", "To start doing", "To stop doing"], correctIndex: 1, explanation: "'Acabo de llegar' = I have just arrived." },
        { question: "'Estoy comiendo' uses gerund because...", options: ["It's a command", "It's action in progress", "It's a habit", "It's past tense"], correctIndex: 1, explanation: "Estar + gerund = action in progress right now." },
        { question: "'Dejé de fumar' means...", options: ["I stopped smoking", "I started smoking", "I continued smoking", "I like smoking"], correctIndex: 0, explanation: "'Dejar de + infinitive' = to stop / quit doing something." },
        { question: "Which takes the gerund?", options: ["Querer", "Necesitar", "Seguir", "Decidir"], correctIndex: 2, explanation: "Seguir takes gerund ('sigo pensando'). The others take infinitive." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'Voy a decírtelo' — pronouns attach to...", options: ["The conjugated verb", "The infinitive", "Either", "Neither"], correctIndex: 1, explanation: "'Decírtelo' = decir + te + lo attached to the infinitive." },
        { question: "'Acabo de comer' means...", options: ["I finished eating", "I have just eaten", "I will eat", "I stopped eating"], correctIndex: 1, explanation: "'Acabar de + infinitive' = to have just done." },
        { question: "'Nos pusimos a hablar' means...", options: ["We stopped talking", "We started talking (suddenly)", "We continued talking", "We refused to talk"], correctIndex: 1, explanation: "'Ponerse a + infinitive' = to start doing something suddenly." },
        { question: "Estar takes the...", options: ["Infinitive", "Gerund", "Subjunctive", "Past participle"], correctIndex: 1, explanation: "'Estoy comiendo' — estar + gerund = progressive action." },
        { question: "'Terminé de leer' uses...", options: ["Gerund", "Infinitive", "Subjunctive", "Indicative"], correctIndex: 1, explanation: "'Terminar de + infinitive' = to finish doing." },
        { question: "Which verb changes meaning with de + infinitive?", options: ["Seguir", "Dejar", "Estar", "Querer"], correctIndex: 1, explanation: "'Dejar de' = stop. 'Dejar' alone = to leave/let." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Sigo pensando en ti' — pensando is...", options: ["Infinitive", "Gerund", "Past participle", "Subjunctive"], correctIndex: 1, explanation: "-ando/-iendo = gerund. 'Sigo pensando' = I keep thinking." },
        { question: "If a verb needs a preposition before the next verb, it usually takes...", options: ["Gerund", "Infinitive", "Subjunctive", "Indicative"], correctIndex: 1, explanation: "Preposition + infinitive is the standard pattern: 'antes de salir.'" },
        { question: "'Me puse a llover' is...", options: ["Correct", "Wrong — llover doesn't work with ponerse a", "Rude", "Formal"], correctIndex: 1, explanation: "'Ponerse a' is for deliberate actions. Rain isn't deliberate." },
        { question: "'Quiero aprender a cocinar' — aprender takes...", options: ["Direct infinitive", "'a' + infinitive", "Gerund", "Subjunctive"], correctIndex: 1, explanation: "'Aprender a + infinitive' = to learn to do something." },
        { question: "Which takes the gerund?", options: ["Estar", "Seguir", "Continuar", "All of the above"], correctIndex: 3, explanation: "Estar, seguir, continuar, andar all take gerund for ongoing actions." },
        { question: "'Dejé de fumar el año pasado' means...", options: ["I started smoking", "I quit smoking", "I continued smoking", "I forgot smoking"], correctIndex: 1, explanation: "'Dejar de + infinitive' = to quit / stop doing." },
      ],
    },
  ],
  "fillers": [
    {
      version: 1,
      questions: [
        { question: "'Bueno, pues...' functions as...", options: ["A command", "A thinking-time filler", "A question", "An answer"], correctIndex: 1, explanation: "'Bueno, pues' = maximum thinking time, like 'well, so...'" },
        { question: "'A ver' means...", options: ["To see", "Let's see / let me think", "Goodbye", "Hello"], correctIndex: 1, explanation: "'A ver' = 'let's see' — soft, processing-time filler." },
        { question: "'Es que...' is used to...", options: ["End a conversation", "Soften refusals and explanations", "Ask a question", "Express anger"], correctIndex: 1, explanation: "'Es que' = 'the thing is' — frames excuses and explanations." },
        { question: "'O sea' is like saying...", options: ["Yes", "I mean / in other words", "No", "Maybe"], correctIndex: 1, explanation: "'O sea' = clarification marker: 'I mean...' 'in other words...'" },
        { question: "'Total que' signals...", options: ["A beginning", "A conclusion / punchline", "A question", "Anger"], correctIndex: 1, explanation: "'Total que' = 'so basically' — wraps up a long story." },
        { question: "Which filler buys the MOST thinking time?", options: ["Vale", "Bueno, pues", "Sí", "No"], correctIndex: 1, explanation: "Two fillers stacked = maximum time to think before speaking." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'Es que no me apetece' softens...", options: ["An agreement", "A refusal", "A greeting", "A command"], correctIndex: 1, explanation: "'Es que' makes 'I don't feel like it' sound less blunt." },
        { question: "'O sea' helps you...", options: ["Start a fight", "Rephrase something confusing", "End a call", "Order food"], correctIndex: 1, explanation: "'O sea' = 'I mean' — lets you rephrase when you've lost your thread." },
        { question: "'A ver, repítemelo' uses 'a ver' to...", options: ["See something", "Buy time to process", "Say goodbye", "Express anger"], correctIndex: 1, explanation: "'A ver' = 'wait' / 'let me process this' — before asking for repetition." },
        { question: "'Vamos, que no tiene sentido' uses 'vamos' to...", options: ["Invite someone", "Soften a blunt statement", "Start a trip", "Say hello"], correctIndex: 1, explanation: "'Vamos' softens 'it doesn't make sense' into a shared conclusion." },
        { question: "'Pues nada' typically...", options: ["Starts a story", "Ends a conversation", "Asks a question", "Shows excitement"], correctIndex: 1, explanation: "'Pues nada' = 'well, anyway' — conversational wrap-up." },
        { question: "Using two fillers together (like 'bueno, pues')...", options: ["Is wrong", "Doubles your thinking time", "Sounds angry", "Is only for children"], correctIndex: 1, explanation: "Stacking fillers is totally natural and buys you more time." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Es que tengo mucho trabajo' = 'the thing is...' This softens...", options: ["An invitation", "An excuse", "A compliment", "A goodbye"], correctIndex: 1, explanation: "'Es que' frames excuses so they don't sound like rejections." },
        { question: "'No sé, o sea...' the speaker is...", options: ["Angry", "Confused and rephrasing", "Excited", "Hungry"], correctIndex: 1, explanation: "'O sea' after hesitation = trying to clarify what they mean." },
        { question: "'Total, que no fuimos' = ...", options: ["We went", "So basically, we didn't go", "We are going", "We will go"], correctIndex: 1, explanation: "'Total que' = the punchline after a long explanation." },
        { question: "Which is best for refusing an invitation politely?", options: ["No", "Es que no puedo", "¡Nunca!", "Olvídalo"], correctIndex: 1, explanation: "'Es que no puedo' = 'the thing is I can't' — much softer." },
        { question: "'A ver si me explico' means...", options: ["Let me see if I can explain", "I see you", "Explain yourself", "I don't see"], correctIndex: 0, explanation: "'A ver si...' = 'let's see if...' — holds the floor while thinking." },
        { question: "'Bueno' can be used to...", options: ["Start a sentence", "End a sentence", "Change topic", "All of the above"], correctIndex: 3, explanation: "'Bueno' is the ultimate Swiss Army knife — start, end, pause, transition." },
      ],
    },
  ],
  "storytelling-connectors": [
    {
      version: 1,
      questions: [
        { question: "'Entonces' moves the narrative...", options: ["Backward", "Forward", "Sideways", "Nowhere"], correctIndex: 1, explanation: "'Entonces' = 'so then' — moves story to the next event." },
        { question: "'Resulta que' introduces...", options: ["A conclusion", "A twist or new information", "A greeting", "An apology"], correctIndex: 1, explanation: "'Resulta que' = 'turns out that' — the interesting revelation." },
        { question: "'De repente' creates...", options: ["Boredom", "Drama / surprise", "Sleepiness", "Happiness"], correctIndex: 1, explanation: "'De repente' = suddenly — use sparingly for dramatic effect." },
        { question: "'Al final' signals...", options: ["The beginning", "The conclusion", "A question", "An interruption"], correctIndex: 1, explanation: "'Al final' = 'in the end' — the outcome or resolution." },
        { question: "'En fin' means...", options: ["In the end", "Anyway / long story short", "In fine detail", "In trouble"], correctIndex: 1, explanation: "'En fin' = wrapping up, dismissing drama, 'anyway.'" },
        { question: "Which connector wraps up a story?", options: ["Entonces", "Total que", "Resulta que", "De repente"], correctIndex: 1, explanation: "'Total que' = 'so basically' — the punchline after the build-up." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'De repente, se apagaron las luces' — 'de repente' means...", options: ["Repeatedly", "Suddenly", "Slowly", "Carefully"], correctIndex: 1, explanation: "'De repente' = suddenly — creates a dramatic shift." },
        { question: "'Resulta que conocía a mi jefe' — this is...", options: ["The setup", "The twist", "The conclusion", "The greeting"], correctIndex: 1, explanation: "'Resulta que' = the surprising revelation in the story." },
        { question: "'Al cabo de una hora' means...", options: ["Before an hour", "After an hour", "During an hour", "Instead of an hour"], correctIndex: 1, explanation: "'Al cabo de' = after (a period of time)." },
        { question: "'Pues nada, que no pasó nada' uses 'pues nada' to...", options: ["Build tension", "Dismiss the drama", "Ask a question", "Express anger"], correctIndex: 1, explanation: "'Pues nada' + 'que no pasó nada' = anticlimax, dismissing the buildup." },
        { question: "Which signals the most interesting part of a story?", options: ["Entonces", "Resulta que", "Al final", "En fin"], correctIndex: 1, explanation: "'Resulta que' = the twist — save it for the good part." },
        { question: "'Total que perdimos el tren' is the...", options: ["Beginning", "Middle", "Punchline", "Question"], correctIndex: 2, explanation: "'Total que' = the conclusion after all the context." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "Start a story with...", options: ["En fin", "Pues nada / a ver", "Total que", "Al final"], correctIndex: 1, explanation: "'Pues nada' or 'a ver' grab attention at the start." },
        { question: "'De pronto' is a synonym for...", options: ["Slowly", "Suddenly", "Finally", "Carefully"], correctIndex: 1, explanation: "'De pronto' = 'de repente' = suddenly." },
        { question: "'Al final, nos quedamos en casa' = ...", options: ["At the end of the street", "In the end, we stayed home", "Finally, we left", "We arrived home"], correctIndex: 1, explanation: "'Al final' = in the end / eventually — the outcome." },
        { question: "'En fin, no era para tanto' dismisses...", options: ["The beginning", "The drama", "The greeting", "The question"], correctIndex: 1, explanation: "'En fin' + downplaying = 'anyway, it wasn't that serious.'" },
        { question: "Which is best for time tracking in a story?", options: ["Resulta que", "Al cabo de", "O sea", "Es que"], correctIndex: 1, explanation: "'Al cabo de' = after X time — helps listeners track elapsed time." },
        { question: "'Entonces, decidimos ir a cenar' moves the story...", options: ["To the past", "To the next event", "To a side topic", "To the end"], correctIndex: 1, explanation: "'Entonces' = 'so then' — the narrative engine." },
      ],
    },
  ],
  "softening-uncertainty": [
    {
      version: 1,
      questions: [
        { question: "'Igual viene' means...", options: ["He is equal", "Maybe he'll come", "He is coming for sure", "He is the same"], correctIndex: 1, explanation: "'Igual' = casual maybe. Very common in peninsular Spanish." },
        { question: "'A lo mejor llueve' = ...", options: ["It will definitely rain", "Maybe it will rain", "It used to rain", "It rains always"], correctIndex: 1, explanation: "'A lo mejor' = maybe / perhaps." },
        { question: "'Supongo que sí' is less committal than...", options: ["No sé", "Creo que sí", "Quizá", "Ojalá"], correctIndex: 1, explanation: "'Supongo' = I suppose — softer than 'creo que' (I believe)." },
        { question: "'Tendré que madrugar' implies...", options: ["Excitement", "Resigned obligation", "Happiness", "Refusal"], correctIndex: 1, explanation: "Future tense of obligation = factual and resigned." },
        { question: "'No sé si me expliqué bien'...", options: ["States a fact", "Gently invites help", "Shows anger", "Ends conversation"], correctIndex: 1, explanation: "'No sé si...' = soft doubt that invites the other person in." },
        { question: "'Quizá' and 'tal vez' usually trigger...", options: ["Indicative", "Subjunctive", "Imperative", "Conditional"], correctIndex: 1, explanation: "'Quizá venga' — uncertainty triggers subjunctive." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "Which 'maybe' is most casual in Spain?", options: ["Quizá", "Tal vez", "Igual", "A lo mejor"], correctIndex: 2, explanation: "'Igual' is the young, casual 'maybe' in peninsular Spanish." },
        { question: "'Me imagino que está ocupado' = ...", options: ["I know he's busy", "I imagine he's busy", "I want him to be busy", "I made him busy"], correctIndex: 1, explanation: "'Me imagino' = I imagine / suppose — softens the statement." },
        { question: "'Tendré que pensarlo' uses future to make the obligation sound...", options: ["More urgent", "More distant / less confrontational", "More angry", "More immediate"], correctIndex: 1, explanation: "Future tense softens: 'I'll have to think about it' vs 'I have to think about it.'" },
        { question: "Which is most formal?", options: ["Igual", "A lo mejor", "Quizá", "Tal vez"], correctIndex: 3, explanation: "'Tal vez' is slightly more formal/literary than the others." },
        { question: "'Supongo que tiene razón' shows...", options: ["Strong agreement", "Thoughtful agreement", "Disagreement", "Anger"], correctIndex: 1, explanation: "'Supongo' = thoughtful, considered agreement — not full commitment." },
        { question: "'No sé si...' is useful when...", options: ["You're certain", "You want to soften uncertainty", "You're angry", "You're giving orders"], correctIndex: 1, explanation: "'No sé si...' = gentle doubt that opens space for conversation." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Igual nos vemos mañana' — 'igual' means...", options: ["Equal", "Maybe", "Surely", "Never"], correctIndex: 1, explanation: "'Igual' = maybe. The most casual possibility marker in Spain." },
        { question: "'A lo mejor' is best used with...", options: ["Strangers", "Friends and colleagues", "Only children", "Only bosses"], correctIndex: 1, explanation: "'A lo mejor' is thoughtful and works in most contexts." },
        { question: "'Tendré que' is softer than 'tengo que' because...", options: ["It's more urgent", "It distances the obligation in time", "It's rude", "It's past tense"], correctIndex: 1, explanation: "Future tense pushes the obligation into the future — less immediate pressure." },
        { question: "Which expresses the least commitment?", options: ["Creo que sí", "Supongo que sí", "Sé que sí", "Estoy seguro"], correctIndex: 1, explanation: "'Supongo' = I suppose — the softest agreement of the options." },
        { question: "'Quizá vaya al cine' uses subjunctive because...", options: ["It's a fact", "It's uncertain", "It's a command", "It's past tense"], correctIndex: 1, explanation: "'Quizá' introduces uncertainty → subjunctive." },
        { question: "'No sé si me entiendes' invites...", options: ["An argument", "Clarification", "Silence", "Laughter"], correctIndex: 1, explanation: "'No sé si...' gently asks the other person to confirm or help." },
      ],
    },
  ],
  "reacting-emotionally": [
    {
      version: 1,
      questions: [
        { question: "'¿En serio?' expresses...", options: ["Boredom", "Surprise", "Anger", "Sleepiness"], correctIndex: 1, explanation: "'¿En serio?' = 'Seriously?' — standard surprise reaction." },
        { question: "'No me digas' literally means...", options: ["Don't tell me", "Tell me more", "I know", "I agree"], correctIndex: 0, explanation: "Literally 'don't tell me,' but functionally = 'you're kidding!'" },
        { question: "'Qué fuerte' can be...", options: ["Only positive", "Only negative", "Positive or negative", "Only neutral"], correctIndex: 2, explanation: "'Qué fuerte' = shock — tone tells you if it's good or bad shock." },
        { question: "'Qué pena' expresses...", options: ["Anger", "Sympathy", "Happiness", "Surprise"], correctIndex: 1, explanation: "'Qué pena' = 'what a shame' — warm sympathy." },
        { question: "'Anda ya' is...", options: ["Always rude", "Playful disbelief", "A greeting", "A farewell"], correctIndex: 1, explanation: "'Anda ya' = playful 'come on' / 'no way' — tone makes it friendly." },
        { question: "'Me flipa este sitio' is...", options: ["Formal", "Very casual enthusiasm", "Angry", "Sad"], correctIndex: 1, explanation: "'Me flipa' = I love it. Very young and casual." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "Which reaction shows you're listening and engaged?", options: ["Silence", "¿En serio?", "Adiós", "No sé"], correctIndex: 1, explanation: "'¿En serio?' keeps the conversation energy going." },
        { question: "'No me digas que te has comprado un coche' = ...", options: ["A command", "Playful shock", "A question", "An insult"], correctIndex: 1, explanation: "'No me digas' = 'don't tell me' = playful disbelief." },
        { question: "'Qué fuerte, no lo sabía' = ...", options: ["I knew it", "That's wild, I didn't know", "I don't care", "I'm angry"], correctIndex: 1, explanation: "'Qué fuerte' = strong reaction to surprising news." },
        { question: "'Qué pena, me habría encantado ir' = ...", options: ["I'm glad I didn't go", "What a shame, I would have loved to go", "I hate going", "I'm angry"], correctIndex: 1, explanation: "'Qué pena' + conditional = warm regret about missing something." },
        { question: "'Anda ya' with flat tone sounds...", options: ["Playful", "Dismissive", "Excited", "Romantic"], correctIndex: 1, explanation: "Tone matters! Flat 'anda ya' = dismissive. Playful tone = teasing." },
        { question: "Save 'me flipa' for...", options: ["Job interviews", "Banks", "Friends", "Funerals"], correctIndex: 2, explanation: "'Me flipa' is very casual — friends and relaxed settings only." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "Match the energy of the storyteller by...", options: ["Staying silent", "Using reaction words", "Changing topic", "Leaving"], correctIndex: 1, explanation: "'¿En serio?', 'qué fuerte', 'no me digas' — keep the rhythm alive." },
        { question: "'Qué fuerte' is your safest reaction to...", options: ["Boring news", "Surprising news", "Good morning", "A request"], correctIndex: 1, explanation: "'Qué fuerte' works for any surprising news — good, bad, or weird." },
        { question: "'Qué pena' focuses on...", options: ["Your own feelings", "The situation (warmer)", "Anger", "Excitement"], correctIndex: 1, explanation: "'Qué pena' is warmer than 'lo siento' because it focuses on the situation." },
        { question: "'No me digas' functions like English...", options: ["'Don't speak'", "'You're kidding!'", "'Tell me more'", "'Go away'"], correctIndex: 1, explanation: "'No me digas' = 'you're kidding!' — not a literal command." },
        { question: "'Me flipa' means...", options: ["I hate it", "I love it", "I'm confused", "I'm tired"], correctIndex: 1, explanation: "'Me flipa' = enthusiastic approval. Very informal." },
        { question: "Which is too casual for a bank?", options: ["Qué pena", "Me flipa", "Qué fuerte", "No me digas"], correctIndex: 1, explanation: "'Me flipa' is youthful slang — never in formal settings." },
      ],
    },
  ],
  "interrupting-floor": [
    {
      version: 1,
      questions: [
        { question: "'Es que...' signals...", options: ["An apology", "Relevant information to add", "A goodbye", "A question"], correctIndex: 1, explanation: "'Es que' = 'the thing is' — I have something relevant to contribute." },
        { question: "'A ver si me explico' means...", options: ["I explain perfectly", "Let me see if I can explain this", "Explain yourself", "I don't explain"], correctIndex: 1, explanation: "Holds the floor while you gather a complex thought." },
        { question: "'Lo que pasa es que...' buys...", options: ["No time", "More time than 'es que'", "Anger", "Silence"], correctIndex: 1, explanation: "'Lo que pasa es que' = longer frame = more thinking time." },
        { question: "In practice, Spaniards interrupt with...", options: ["Long apologies", "'Oye' or 'mira'", "Silence", "Written notes"], correctIndex: 1, explanation: "'Oye' or 'mira' + jump in. Politeness is in tone, not words." },
        { question: "'O sea' and 'es decir' help you...", options: ["Start a fight", "Rephrase when losing the thread", "End a call", "Order food"], correctIndex: 1, explanation: "These are repair markers — verbal handholds." },
        { question: "In groups of Spaniards, interrupting is...", options: ["Rude", "Normal and expected", "Illegal", "Only for elders"], correctIndex: 1, explanation: "Not interrupting = being left out. Jump in with 'es que.'" },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'Es que yo lo vi con mis propios ojos' justifies...", options: ["An apology", "An interruption", "A farewell", "A question"], correctIndex: 1, explanation: "'Es que' = my interruption is justified by this relevant fact." },
        { question: "'A ver si me explico' asks listeners to...", options: ["Explain for you", "Give you time to organize your thought", "Leave", "Repeat themselves"], correctIndex: 1, explanation: "'A ver si me explico' = hold on, let me try to put this clearly." },
        { question: "'Lo que pasa es que no me dijeron nada' = ...", options: ["A short excuse", "A longer setup for an explanation", "A greeting", "A compliment"], correctIndex: 1, explanation: "'Lo que pasa es que' = the extended excuse frame." },
        { question: "With friends, you can interrupt with...", options: ["Perdona que te interrumpa", "Oye", "Both", "Neither"], correctIndex: 2, explanation: "Formal = full apology. Friends = just 'oye' and jump in." },
        { question: "'No es por eso, o sea, quiero decir que...' is...", options: ["A strong statement", "Repairing a misunderstood point", "A greeting", "An order"], correctIndex: 1, explanation: "'O sea' + 'quiero decir' = repairing after being misunderstood." },
        { question: "'Mira, te cuento lo que pasó' grabs...", options: ["Money", "Attention", "Food", "A taxi"], correctIndex: 1, explanation: "'Mira' + 'te cuento' = I'm taking the floor to tell a story." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "Don't wait for silence in Spanish conversations because...", options: ["It's rude", "It won't come", "It's boring", "It's formal"], correctIndex: 1, explanation: "Silence is rare. Use 'es que' and jump in." },
        { question: "'A ver si me explico' is your lifeline when...", options: ["You're happy", "A sentence is getting away from you", "You're eating", "You're leaving"], correctIndex: 1, explanation: "When you feel yourself losing the thread, 'a ver si me explico' buys time." },
        { question: "'Lo que pasa es que' frames...", options: ["A greeting", "An excuse or longer explanation", "A farewell", "A compliment"], correctIndex: 1, explanation: "The extended 'the thing is' — more time, more context." },
        { question: "Interrupting is normal in Spain. Not interrupting means...", options: ["You're polite", "You're being left out", "You're angry", "You're asleep"], correctIndex: 1, explanation: "If you don't jump in, the conversation moves on without you." },
        { question: "'O sea' after being interrupted helps you...", options: ["Start a fight", "Get back on track", "Leave", "Apologize"], correctIndex: 1, explanation: "'O sea' = 'I mean' — refocus after being interrupted or misunderstood." },
        { question: "Which is the most direct attention-grabber?", options: ["Bueno", "Mira", "Pues", "Total"], correctIndex: 1, explanation: "'Mira' = 'look' — the most direct way to grab the floor." },
      ],
    },
  ],
  "daily-verbs": [
    {
      version: 1,
      questions: [
        { question: "'Me cae bien tu amigo' means...", options: ["I deeply love your friend", "I like your friend (first impression)", "Your friend fell on me", "Your friend is good"], correctIndex: 1, explanation: "'Caer bien' = first-impression likability, not deep love." },
        { question: "'Doy por hecho que vienes' = ...", options: ["I know you're coming", "I'm assuming you're coming", "I don't want you to come", "I forgot you're coming"], correctIndex: 1, explanation: "'Dar por hecho' = to take for granted / assume." },
        { question: "'Te echo de menos' is...", options: ["I throw you less", "I miss you", "I see you less", "I forget you"], correctIndex: 1, explanation: "'Echar de menos' = to miss (Spain's standard phrase)." },
        { question: "'Me hace falta un café' = ...", options: ["I have a coffee", "I need a coffee (emotionally)", "I make a coffee", "I miss a coffee"], correctIndex: 1, explanation: "'Hacer falta' = to be needed. Personal and emotional." },
        { question: "'Tengo ganas de salir' = ...", options: ["I have to go out", "I feel like going out", "I'm going out", "I refuse to go out"], correctIndex: 1, explanation: "'Tener ganas de' = to feel like doing something." },
        { question: "'Eso no viene al caso' means...", options: ["That's not relevant", "That's very important", "That's funny", "That's expensive"], correctIndex: 0, explanation: "'Venir al caso' = to be relevant / pertinent." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'Caer bien' is safer than 'me gusta' when talking about...", options: ["Food", "People you just met", "Places", "Movies"], correctIndex: 1, explanation: "'Me cae bien' = likable vibe. 'Me gusta' about people can sound romantic." },
        { question: "'Doy por hecho' assumes something is...", options: ["False", "Already established / taken for granted", "Impossible", "Funny"], correctIndex: 1, explanation: "'Dar por hecho' = to treat as already true / assumed." },
        { question: "'Echar de menos' is more common in Spain than...", options: ["Odiar", "Extrañar", "Querer", "Amar"], correctIndex: 1, explanation: "In Spain, 'echar de menos' is standard. 'Extrañar' is more Latin American." },
        { question: "Replace 'necesito' with 'me hace falta' for...", options: ["Physical needs", "Emotional needs", "Commands", "Questions"], correctIndex: 1, explanation: "'Me hace falta' = personal, emotional need. 'Necesito' = factual need." },
        { question: "'No tengo ganas de cocinar' is a...", options: ["Strong refusal", "Soft refusal", "Command", "Question"], correctIndex: 1, explanation: "'No tengo ganas' = 'I don't feel like it' — the perfect soft no." },
        { question: "'Viene al caso' means...", options: ["It arrives", "It's relevant", "It's late", "It's funny"], correctIndex: 1, explanation: "'Venir al caso' = to be relevant to the matter at hand." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Me cae mal' is stronger than...", options: ["Me cae bien", "No me gusta", "Me encanta", "Me da igual"], correctIndex: 1, explanation: "'Me cae mal' = something is off about the person. Stronger than 'no me gusta.'" },
        { question: "'Doy por hecho que sabes' could offend if...", options: ["They do know", "They don't know and feel left out", "They're happy", "They're sleeping"], correctIndex: 1, explanation: "Assuming knowledge can exclude people who weren't informed." },
        { question: "'Te echo de menos' = 'I miss you.' In Spain, this is...", options: ["Too formal", "The standard phrase", "Rude", "Only for romance"], correctIndex: 1, explanation: "'Echar de menos' = standard in Spain for any kind of missing." },
        { question: "'Me hace falta unas vacaciones' = I need a vacation...", options: ["Factually", "In my soul", "For my boss", "For my car"], correctIndex: 1, explanation: "'Hacer falta' = emotional, personal necessity." },
        { question: "'Tengo ganas de...' expresses...", options: ["Obligation", "Desire without commitment", "Anger", "Confusion"], correctIndex: 1, explanation: "'Tener ganas de' = desire, not obligation. Low-pressure." },
        { question: "'Eso no viene al caso' politely...", options: ["Agrees", "Redirects the conversation", "Ends the conversation", "Starts a fight"], correctIndex: 1, explanation: "'No viene al caso' = 'that's not relevant' — polite redirection." },
      ],
    },
  ],
  "false-friends": [
    {
      version: 1,
      questions: [
        { question: "'Actualmente' means...", options: ["Actually", "Currently", "Actually not", "Actually yes"], correctIndex: 1, explanation: "'Actualmente' = currently / nowadays. For 'actually,' use 'en realidad.'" },
        { question: "'Estoy constipado' means...", options: ["I'm constipated", "I have a cold", "I'm embarrassed", "I'm tired"], correctIndex: 1, explanation: "'Constipado' = having a cold. The other = 'estreñido.'" },
        { question: "'Realizar' means...", options: ["To realize", "To carry out / accomplish", "To dream", "To remember"], correctIndex: 1, explanation: "'Realizar' = to carry out. 'To realize' = 'darse cuenta de.'" },
        { question: "'Asistir' usually means...", options: ["To assist / help", "To attend", "To ignore", "To leave"], correctIndex: 1, explanation: "'Asistir' = to attend. 'To assist/help' = 'ayudar.'" },
        { question: "'Advertir' means...", options: ["To advertise", "To warn", "To see", "To hear"], correctIndex: 1, explanation: "'Advertir' = to warn. 'To advertise' = 'publicitar.'" },
        { question: "'Pretender' means...", options: ["To pretend", "To try / intend", "To act", "To fake"], correctIndex: 1, explanation: "'Pretender' = to try / attempt. 'To pretend' = 'fingir.'" },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'En realidad' means...", options: ["Currently", "Actually", "In reality (location)", "In real estate"], correctIndex: 1, explanation: "'En realidad' = actually. 'Actualmente' = currently." },
        { question: "For 'I have a cold,' say...", options: ["Estoy estreñido", "Estoy constipado", "Estoy avergonzado", "Estoy embarazado"], correctIndex: 1, explanation: "'Estoy constipado' = I have a cold." },
        { question: "'Me di cuenta de que...' = ...", options: ["I accomplished that...", "I realized that...", "I pretended that...", "I warned that..."], correctIndex: 1, explanation: "'Darse cuenta de' = to realize. 'Realizar' = to carry out." },
        { question: "'Asisto a muchos conciertos' = ...", options: ["I help many concerts", "I attend many concerts", "I ignore many concerts", "I leave many concerts"], correctIndex: 1, explanation: "'Asistir' = to attend (an event)." },
        { question: "'Te advierto que...' = ...", options: ["I advertise that...", "I warn you that...", "I see that...", "I hear that..."], correctIndex: 1, explanation: "'Advertir' = to warn." },
        { question: "'Fingí que no la vi' = ...", options: ["I tried not to see her", "I pretended I didn't see her", "I intended not to see her", "I warned her"], correctIndex: 1, explanation: "'Fingir' = to pretend. 'Pretender' = to intend / try." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Actualmente trabajo desde casa' = ...", options: ["Actually I work from home", "I currently work from home", "I really work from home", "I pretend to work from home"], correctIndex: 1, explanation: "'Actualmente' = currently. 'En realidad' = actually." },
        { question: "The most famous false friend is...", options: ["Actualmente", "Constipado", "Embarazada", "Realizar"], correctIndex: 2, explanation: "'Embarazada' = pregnant. The most dangerous false friend for English speakers." },
        { question: "'Realicé un estudio' = ...", options: ["I realized a study", "I carried out a study", "I pretended a study", "I warned a study"], correctIndex: 1, explanation: "'Realizar' = to carry out / accomplish." },
        { question: "'Asistir a clase' = ...", options: ["To help class", "To attend class", "To teach class", "To miss class"], correctIndex: 1, explanation: "'Asistir a' = to attend. 'Ayudar en' = to help with." },
        { question: "'Quiero pretender el examen' is...", options: ["Correct", "Wrong — pretender doesn't mean to attempt an exam", "Formal", "Rude"], correctIndex: 1, explanation: "'Pretender' = to intend / try generally, not 'to attempt a test.' Use 'intentar' or 'presentarse a.'" },
        { question: "When a word looks identical to Romanian, you should...", options: ["Assume it means the same", "Pause and check if the meaning shifted", "Never use it", "Always use it"], correctIndex: 1, explanation: "Romanian-Spanish cognates are helpful but treacherous. Always verify." },
      ],
    },
  ],
  "small-talk": [
    {
      version: 1,
      questions: [
        { question: "'¿Qué tal?' expects the answer...", options: ["A detailed life update", "'Bien, ¿y tú?'", "A complaint", "Silence"], correctIndex: 1, explanation: "'¿Qué tal?' is a greeting, not a real question. 'Bien, ¿y tú?' is the script." },
        { question: "'¿Cómo lo llevas?' shows...", options: ["No interest", "Actual interest in someone's situation", "Anger", "Confusion"], correctIndex: 1, explanation: "'¿Cómo lo llevas?' = 'how are you handling it?' — deeper than '¿qué tal?'" },
        { question: "'No te preocupes' replaces...", options: ["Hello", "'No worries,' 'it's okay,' 'don't mention it'", "Goodbye", "Please"], correctIndex: 1, explanation: "The universal Spanish soother — covers apologies, thanks, and minor problems." },
        { question: "'Oye, una cosa' signals...", options: ["A goodbye", "A topic shift or request", "A compliment", "An apology"], correctIndex: 1, explanation: "'Oye, una cosa' = 'hey, one thing' — softens a transition." },
        { question: "'Cuídate' is for...", options: ["Casual goodbyes", "People you care about who are going through something", "Strangers", "Phone sales"], correctIndex: 1, explanation: "'Cuídate' = 'take care' — warm, personal goodbye." },
        { question: "End phone calls with...", options: ["Adiós", "Que vaya bien / cuídate", "Hola", "Perdón"], correctIndex: 1, explanation: "'Adiós' sounds too final. 'Que vaya bien' or 'cuídate' is warmer." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "The answer to '¿qué tal?' should be...", options: ["Honest", "Short and positive", "A long story", "A complaint"], correctIndex: 1, explanation: "'¿Qué tal?' is a greeting ritual. Save real answers for real friends." },
        { question: "'¿Cómo lo llevas con el nuevo piso?' asks about...", options: ["The flat's size", "How you're handling the new flat", "The flat's price", "The flat's location"], correctIndex: 1, explanation: "'¿Cómo lo llevas?' = 'how are you handling it?' — process-oriented." },
        { question: "'No te preocupes' after an apology means...", options: ["You should worry", "No worries / it's fine", "I'm angry", "Leave me alone"], correctIndex: 1, explanation: "'No te preocupes' = the all-purpose 'it's okay.'" },
        { question: "'Oye, una cosa, ¿me puedes ayudar?' uses 'oye una cosa' to...", options: ["Shout", "Soften the request", "End the conversation", "Express anger"], correctIndex: 1, explanation: "'Oye una cosa' prepares the listener for a shift to a request." },
        { question: "'Cuídate mucho' is warmer than...", options: ["Hola", "Hasta luego", "Adiós", "Buenos días"], correctIndex: 2, explanation: "'Adiós' is too final. 'Cuídate' is warm and caring." },
        { question: "'Nos vemos, que vaya bien' means...", options: ["We see each other, I hope it goes well", "We don't see each other", "We see each other badly", "We see money"], correctIndex: 0, explanation: "'Que vaya bien' = standard friendly send-off." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "Never give an honest answer to '¿qué tal?' unless...", options: ["It's Monday", "You know the person well", "You're angry", "You're eating"], correctIndex: 1, explanation: "With strangers/acquaintances, '¿qué tal?' is ritual. With friends, it can be real." },
        { question: "'No te preocupes' can replace all EXCEPT...", options: ["De nada", "No problem", "I'm sorry", "It's okay"], correctIndex: 2, explanation: "'No te preocupes' = 'no worries' / 'it's okay' / 'you're welcome.' Not 'I'm sorry.'" },
        { question: "'Oye una cosa' is used before...", options: ["A farewell", "A request or topic change", "A meal", "A sleep"], correctIndex: 1, explanation: "'Oye una cosa' = 'hey, one thing' — the soft transition." },
        { question: "'Cuídate' after someone says they're sick means...", options: ["Go away", "Take care (warm)", "See a doctor", "I'm sick too"], correctIndex: 1, explanation: "'Cuídate' = warm, personal 'take care' — more than just 'bye.'" },
        { question: "End phone calls with...", options: ["Adiós", "Que vaya bien", "Hola", "Silencio"], correctIndex: 1, explanation: "'Que vaya bien' or 'cuídate' — 'adiós' sounds like you never want to speak again." },
        { question: "'¿Qué tal?' at the office expects...", options: ["A project update", "'Bien, ¿y tú?'", "Your resignation", "Lunch plans"], correctIndex: 1, explanation: "Even at work, '¿qué tal?' is a greeting ritual. Answer briefly." },
      ],
    },
  ],
  "evaluative-language": [
    {
      version: 1,
      questions: [
        { question: "'Es de lo más divertido' means...", options: ["It's somewhat fun", "It's the most fun thing ever", "It's not fun", "It's boring"], correctIndex: 1, explanation: "'Es de lo más + adjective' = extreme, natural-sounding praise." },
        { question: "'No tiene desperdicio' means...", options: ["It's worthless", "It's worth experiencing in full", "It's partially good", "It's expensive"], correctIndex: 1, explanation: "'No tiene desperdicio' = nothing should be skipped. Highest praise." },
        { question: "'Da igual' is...", options: ["Aggressive", "Relaxed indifference", "Angry", "Formal"], correctIndex: 1, explanation: "'Da igual' = relaxed, generous 'it doesn't matter.'" },
        { question: "'Mola' is...", options: ["Formal", "Casual / cool", "Angry", "Sad"], correctIndex: 1, explanation: "'Molar' = to be cool. Very casual and youthful." },
        { question: "'Fue una pasada' means...", options: ["It was terrible", "It was incredible", "It was boring", "It was expensive"], correctIndex: 1, explanation: "'Una pasada' = amazing, over-the-top great." },
        { question: "'No está mal' actually means...", options: ["It's bad", "It's pretty good (understated)", "It's terrible", "It's perfect"], correctIndex: 1, explanation: "'No está mal' = understated praise. Cool, not overly excited." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'Es de lo más acogedor' praises...", options: ["Speed", "Coziness", "Price", "Size"], correctIndex: 1, explanation: "'Acogedor' = cozy/welcoming. 'Es de lo más' = extreme praise." },
        { question: "'Esa serie no tiene desperdicio' = ...", options: ["Skip some episodes", "Watch every minute", "It's bad", "It's short"], correctIndex: 1, explanation: "'No tiene desperdicio' = every part is worth it." },
        { question: "'Da igual, tú elige' shows...", options: ["Anger", "Genuine flexibility", "Boredom", "Confusion"], correctIndex: 1, explanation: "'Da igual' = 'I genuinely don't mind' — generous and easygoing." },
        { question: "'Me mola mucho tu camiseta' is...", options: ["Formal", "Casual friendly approval", "Rude", "Confused"], correctIndex: 1, explanation: "'Molar' = casual 'to be cool.' Friends only." },
        { question: "'Qué rollo' expresses...", options: ["Excitement", "Boredom or annoyance", "Happiness", "Surprise"], correctIndex: 1, explanation: "'Qué rollo' = 'what a hassle' / 'how boring.'" },
        { question: "'No está mal' is used to...", options: ["Criticize harshly", "Praise without sounding too excited", "Express anger", "Show confusion"], correctIndex: 1, explanation: "Understated praise = sounding cool and discerning." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "'Es de lo más + adjective' frames praise as...", options: ["Boring", "Extreme and natural-sounding", "Rude", "Formal"], correctIndex: 1, explanation: "'Es de lo más divertido' = more natural than 'es muy muy divertido.'" },
        { question: "'No tiene desperdicio' is best for...", options: ["A bad meal", "A great experience worth every minute", "A short trip", "An expensive item"], correctIndex: 1, explanation: "Highest praise: nothing should be skipped or missed." },
        { question: "'Da igual' is warmer than...", options: ["Me encanta", "No importa", "Me mola", "Qué pasada"], correctIndex: 1, explanation: "'Da igual' = generous indifference. 'No importa' can sound colder." },
        { question: "'Mola' and 'pasada' are for...", options: ["Job interviews", "Friends", "Banks", "Doctors"], correctIndex: 1, explanation: "Very casual — friends and relaxed settings only." },
        { question: "'Qué rollo, llevo media hora esperando' = ...", options: ["I'm excited", "I'm annoyed / bored", "I'm happy", "I'm surprised"], correctIndex: 1, explanation: "'Qué rollo' = complaint about annoyance or boredom." },
        { question: "Use 'no está mal' when you want to sound...", options: ["Overly excited", "Cool and understated", "Angry", "Confused"], correctIndex: 1, explanation: "Spaniards often understate to sound discerning. 'No está mal' = actually great." },
      ],
    },
  ],
  "formal-informal": [
    {
      version: 1,
      questions: [
        { question: "At work, 'podrías' is safer than 'puedes' because...", options: ["It's more direct", "It adds politeness", "It's faster", "It's louder"], correctIndex: 1, explanation: "Conditional = hypothetical politeness. '¿Podrías...?' = softer request." },
        { question: "With bureaucracy, use...", options: ["Slang", "Full sentences and conditionals", "One-word answers", "Gestures only"], correctIndex: 1, explanation: "'Querría solicitar...' — extra formality signals respect and patience." },
        { question: "With a neighborhood barista, say...", options: ["Querría un café", "Me pones un café, por favor", "Dame un café", "Café, ya"], correctIndex: 1, explanation: "'Me pones' = middle register — friendly but respectful." },
        { question: "Email opening: 'Estimado/a' is...", options: ["Casual", "Formal", "Rude", "Funny"], correctIndex: 1, explanation: "'Estimado/a' = formal email opening." },
        { question: "'Le importa' uses 'le' instead of 'te' to show...", options: ["Friendship", "Respect", "Anger", "Confusion"], correctIndex: 1, explanation: "'Le' = usted form. More respectful than 'te' with strangers." },
        { question: "Start formal, then let the other person offer...", options: ["Money", "Tuteo (using tú)", "Food", "A job"], correctIndex: 1, explanation: "Start with usted. If they say 'puedes tutearme,' switch to tú." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "'¿Podría reservar una mesa?' is...", options: ["Rude", "Polite phone call", "Too casual", "A command"], correctIndex: 1, explanation: "Conditional + usted = polite formal request." },
        { question: "'Me pones un cortado, por favor' is...", options: ["Too formal", "Middle register — perfect for a bar", "Too rude", "Only for fancy restaurants"], correctIndex: 1, explanation: "'Me pones' = friendly but respectful middle ground." },
        { question: "'Querría solicitar información' is for...", options: ["Friends", "Bureaucracy / business", "Children", "Pets"], correctIndex: 1, explanation: "'Querría solicitar' = formal opening for official requests." },
        { question: "Email closing: 'Un saludo' is...", options: ["Too formal", "Safe and neutral", "Too casual", "Rude"], correctIndex: 1, explanation: "'Un saludo' = safest email closing until you know the person." },
        { question: "'¿Te importa si fumo aquí?' uses 'te' because...", options: ["It's formal", "It's informal", "It's angry", "It's a command"], correctIndex: 1, explanation: "'Te' = tú = informal. With a stranger, use 'le importa.'" },
        { question: "'No pasa nada, tú tranquilo' is...", options: ["Formal", "Casual reassurance among friends", "Rude", "Business appropriate"], correctIndex: 1, explanation: "'Tú tranquilo' = very casual. Too informal for work." },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "Start formal and let the other person offer...", options: ["Tú", "Usted", "Money", "Food"], correctIndex: 0, explanation: "Start with usted. If they invite 'tuteo,' then switch." },
        { question: "In emails, 'un saludo' is safer than...", options: ["Hola", "Un abrazo", "Gracias", "Por favor"], correctIndex: 1, explanation: "'Un abrazo' = for people you know. 'Un saludo' = neutral and safe." },
        { question: "Conditional verbs are your shield in...", options: ["Casual conversations", "Formal situations", "Sleep", "Sports"], correctIndex: 1, explanation: "'Podría,' 'querría,' 'me gustaría' = polite armor for formal contexts." },
        { question: "'Le' vs 'te': 'le' shows...", options: ["Friendship", "Respect / distance", "Anger", "Speed"], correctIndex: 1, explanation: "'Le' = usted = respect and social distance." },
        { question: "Which is too casual for work?", options: ["Un saludo", "No pasa nada, tú tranquilo", "Estimado señor", "Querría solicitar"], correctIndex: 1, explanation: "'Tú tranquilo' = very casual. Never in professional contexts." },
        { question: "The safest approach with strangers is...", options: ["Immediate tú", "Start with usted, wait for invitation to tú", "Ignore them", "Shout"], correctIndex: 1, explanation: "Begin formal. Let them invite you to be casual." },
      ],
    },
  ],
  "paraphrasing-repair": [
    {
      version: 1,
      questions: [
        { question: "'¿Cómo se dice...?' is...", options: ["Embarrassing", "Endearing and useful", "Rude", "Unnecessary"], correctIndex: 1, explanation: "Natives respect someone who asks. It shows active engagement." },
        { question: "'No sé cómo explicarlo, pero es como...' uses...", options: ["A dictionary", "Analogy", "A translator", "Silence"], correctIndex: 1, explanation: "Analogy = describing through comparison when the exact word fails." },
        { question: "'Es decir' lets you...", options: ["Start a fight", "Rephrase your own point", "End a call", "Order food"], correctIndex: 1, explanation: "'Es decir' = 'that is to say' — repair your own unclear statement." },
        { question: "'Lo que pasa es que...' frames...", options: ["A compliment", "An excuse that buys time", "A command", "A greeting"], correctIndex: 1, explanation: "'Lo que pasa es que' = blame the situation, not yourself." },
        { question: "'Eso de ahí' + gesture is...", options: ["Cheating", "Valid communication", "Rude", "Only for children"], correctIndex: 1, explanation: "Pointing + 'eso de ahí' is completely valid. Spaniards do it too." },
        { question: "'O sea' after a pause helps you...", options: ["Confuse people", "Check your understanding", "End the conversation", "Start eating"], correctIndex: 1, explanation: "'O sea, ¿tú crees que...?' = 'so, you think that...?' — checking understanding." },
      ],
    },
    {
      version: 2,
      questions: [
        { question: "Asking '¿cómo se dice?' shows...", options: ["Ignorance", "Active learning", "Rudeness", "Boredom"], correctIndex: 1, explanation: "Most people find it endearing — you're trying, not giving up." },
        { question: "'Es como cuando...' can describe...", options: ["Nothing", "Almost anything through analogy", "Only food", "Only people"], correctIndex: 1, explanation: "Analogy is your superpower when words fail." },
        { question: "'Es decir, no es obligatorio' = ...", options: ["It is obligatory", "I mean, it's not obligatory", "It's always obligatory", "I don't know"], correctIndex: 1, explanation: "'Es decir' = 'I mean' — clarification of your own point." },
        { question: "'Lo que pasa es que no me acuerdo' = ...", options: ["I remember perfectly", "The thing is, I can't remember", "I don't care", "I'm angry"], correctIndex: 1, explanation: "'Lo que pasa es que' = blame the complexity, not your memory." },
        { question: "'Pásame eso de ahí, por favor' uses...", options: ["A precise name", "Gesture + vague reference", "Silence", "A command"], correctIndex: 1, explanation: "'Eso de ahí' + pointing = totally natural when you don't know the word." },
        { question: "'O sea' after someone speaks helps you...", options: ["Interrupt rudely", "Confirm you understood", "Change topic", "Leave"], correctIndex: 1, explanation: "'O sea, ¿quieres decir que...?' = 'so, you mean that...?'" },
      ],
    },
    {
      version: 3,
      questions: [
        { question: "Ask '¿cómo se dice?' without shame because...", options: ["It's rude", "It shows engagement", "It's illegal", "It's boring"], correctIndex: 1, explanation: "People respect learners who ask. It shows you care about getting it right." },
        { question: "'Es como cuando...' is your best friend for...", options: ["Ordering food", "Describing anything through analogy", "Saying hello", "Ending calls"], correctIndex: 1, explanation: "When you don't know a word, describe it through comparison." },
        { question: "'Es decir' is the spoken equivalent of...", options: ["Shouting", "Deleting and retyping", "Sleeping", "Eating"], correctIndex: 1, explanation: "'Es decir' = 'I mean' — you get a second chance to say it clearly." },
        { question: "'Lo que pasa es que...' buys...", options: ["No time", "Time and sympathy", "Anger", "Money"], correctIndex: 1, explanation: "Blaming the situation gets you time and understanding from the listener." },
        { question: "Gestures in Spanish communication are...", options: ["A crutch to avoid", "A legitimate part of the language", "Only for tourists", "Rude"], correctIndex: 1, explanation: "Spaniards gesture constantly. 'Eso de ahí' + point is completely natural." },
        { question: "'O sea, ¿tú crees que no va a venir?' checks...", options: ["Your own statement", "Your understanding of someone else's point", "The weather", "The time"], correctIndex: 1, explanation: "'O sea' + question = confirming you understood correctly." },
      ],
    },
  ],
};
