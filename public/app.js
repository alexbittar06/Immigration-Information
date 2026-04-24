const LANG_KEY = "iih_lang";
const THEME_KEY = "iih_theme";

const THEME_IDS = [
  "usa",
  "mexico",
  "colombia",
  "venezuela",
  "philippines",
  "dominican",
  "brazil",
  "international"
];

const stateAbbreviations = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY"
};

const legalResourcesByState = Object.fromEntries(
  Object.entries(stateAbbreviations).map(([state, abbr]) => [
    state,
    `https://www.immigrationadvocates.org/nonprofit/legaldirectory/search?state=${abbr}`
  ])
);

function guideLink(labelKey, href) {
  return { labelKey, href };
}

function guideLeaf(text, links) {
  return { result: { text, links: links || [] } };
}

/** Bilingual practice items (educational; confirm current USCIS materials before your test). */
const CIVICS_QUESTIONS = [
  {
    q: {
      en: "What is the supreme law of the land?",
      es: "¿Cuál es la ley suprema de la nación?"
    },
    choices: [
      { en: "The Constitution", es: "La Constitución" },
      { en: "The Declaration of Independence", es: "La Declaración de Independencia" },
      { en: "Federal regulations only", es: "Solo los reglamentos federales" },
      { en: "State constitutions", es: "Las constituciones estatales" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What does the Constitution do?",
      es: "¿Qué hace la Constitución?"
    },
    choices: [
      { en: "Sets up the government and protects basic rights", es: "Establece el gobierno y protege derechos básicos" },
      { en: "Declares war only", es: "Solo declara la guerra" },
      { en: "Chooses the president each year", es: "Elige al presidente cada año" },
      { en: "Issues driver licenses", es: "Emite licencias de conducir" }
    ],
    correct: 0
  },
  {
    q: {
      en: "The idea of self-government is in the first three words of the Constitution. What are these words?",
      es: "La idea de autogobierno está en las primeras tres palabras de la Constitución. ¿Cuáles son?"
    },
    choices: [
      { en: "We the People", es: "We the People (Nosotros el Pueblo)" },
      { en: "We the States", es: "We the States" },
      { en: "We the Citizens", es: "We the Citizens" },
      { en: "We the Congress", es: "We the Congress" }
    ],
    correct: 0
  },
  {
    q: {
      en: "How many amendments does the Constitution have?",
      es: "¿Cuántas enmiendas tiene la Constitución?"
    },
    choices: [
      { en: "Twenty-seven (27)", es: "Veintisiete (27)" },
      { en: "Ten (10)", es: "Diez (10)" },
      { en: "Fifty (50)", es: "Cincuenta (50)" },
      { en: "Thirteen (13)", es: "Trece (13)" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What are the two parts of the U.S. Congress?",
      es: "¿Cuáles son las dos partes del Congreso de EE. UU.?"
    },
    choices: [
      { en: "The Senate and House of Representatives", es: "El Senado y la Cámara de Representantes" },
      { en: "The courts and the president", es: "Los tribunales y el presidente" },
      { en: "The Cabinet and the military", es: "El Gabinete y las fuerzas armadas" },
      { en: "The states and territories", es: "Los estados y los territorios" }
    ],
    correct: 0
  },
  {
    q: {
      en: "Who vetoes bills?",
      es: "¿Quién veta los proyectos de ley?"
    },
    choices: [
      { en: "The President", es: "El Presidente" },
      { en: "The Speaker of the House", es: "El presidente de la Cámara" },
      { en: "The Chief Justice", es: "El presidente del Tribunal Supremo" },
      { en: "The Vice President alone", es: "Solo el Vicepresidente" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What stops one branch of government from becoming too powerful?",
      es: "¿Qué impide que una rama del gobierno se vuelva demasiado poderosa?"
    },
    choices: [
      { en: "Checks and balances / separation of powers", es: "Controles y equilibrios / separación de poderes" },
      { en: "The Bill of Rights only", es: "Solo la Carta de Derechos" },
      { en: "Federal holidays", es: "Los días festivos federales" },
      { en: "The national anthem", es: "El himno nacional" }
    ],
    correct: 0
  },
  {
    q: {
      en: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
      es: "Bajo la Constitución, algunos poderes pertenecen al gobierno federal. ¿Cuál es un poder federal?"
    },
    choices: [
      { en: "To print money", es: "Imprimir dinero" },
      { en: "To provide schooling and education", es: "Proveer escuelas y educación (principalmente estatal/local)" },
      { en: "To issue driver licenses", es: "Emitir licencias de conducir" },
      { en: "To conduct local elections", es: "Dirigir elecciones locales" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What are the two major political parties in the United States?",
      es: "¿Cuáles son los dos principales partidos políticos en EE. UU.?"
    },
    choices: [
      { en: "Democratic and Republican", es: "Demócrata y Republicano" },
      { en: "Federalist and Whig", es: "Federalista y Whig" },
      { en: "Liberal and Conservative only", es: "Solo liberal y conservador" },
      { en: "House and Senate", es: "Cámara y Senado" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What is the economic system in the United States?",
      es: "¿Cuál es el sistema económico en EE. UU.?"
    },
    choices: [
      { en: "Capitalist economy / market economy", es: "Economía capitalista / economía de mercado" },
      { en: "A closed command economy", es: "Una economía cerrada de mando" },
      { en: "A barter-only system", es: "Un sistema solo de trueque" },
      { en: "A government-planned economy only", es: "Solo una economía planificada por el gobierno" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What is the capital of the United States?",
      es: "¿Cuál es la capital de EE. UU.?"
    },
    choices: [
      { en: "Washington, D.C.", es: "Washington, D.C." },
      { en: "New York City", es: "Nueva York" },
      { en: "Philadelphia", es: "Filadelfia" },
      { en: "Boston", es: "Boston" }
    ],
    correct: 0
  },
  {
    q: {
      en: "Name one U.S. territory.",
      es: "Nombre un territorio de EE. UU."
    },
    choices: [
      { en: "Puerto Rico", es: "Puerto Rico" },
      { en: "Hawaii (state)", es: "Hawái (estado)" },
      { en: "Texas (territory today)", es: "Texas (territorio hoy)" },
      { en: "Canada", es: "Canadá" }
    ],
    correct: 0
  },
  {
    q: {
      en: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
      es: "Los Federalist Papers apoyaron la Constitución. Nombre a uno de los autores."
    },
    choices: [
      { en: "James Madison", es: "James Madison" },
      { en: "Thomas Jefferson (not a Federalist Paper author)", es: "Thomas Jefferson (no fue autor de los Federalist)" },
      { en: "George Washington (not a Federalist Paper author)", es: "George Washington (no fue autor de los Federalist)" },
      { en: "Benjamin Franklin (not a Federalist Paper author)", es: "Benjamin Franklin (no fue autor de los Federalist)" }
    ],
    correct: 0
  },
  {
    q: {
      en: "When was the Constitution written?",
      es: "¿Cuándo se escribió la Constitución?"
    },
    choices: [
      { en: "1787", es: "1787" },
      { en: "1776", es: "1776" },
      { en: "1812", es: "1812" },
      { en: "1865", es: "1865" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What are two rights in the Declaration of Independence?",
      es: "¿Cuáles son dos derechos en la Declaración de Independencia?"
    },
    choices: [
      { en: "Life and liberty", es: "Vida y libertad" },
      { en: "Voting and driving", es: "Votar y conducir" },
      { en: "Free college and healthcare", es: "Universidad gratuita y salud" },
      { en: "Taxes and jury duty", es: "Impuestos y servicio de jurado" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What is one right or freedom from the First Amendment?",
      es: "¿Cuál es un derecho o libertad de la Primera Enmienda?"
    },
    choices: [
      { en: "Speech", es: "Libertad de expresión" },
      { en: "Bear arms", es: "Portar armas" },
      { en: "Vote in federal elections", es: "Votar en elecciones federales" },
      { en: "A free house", es: "Una casa gratis" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What is the \"rule of law\"?",
      es: "¿Qué es el «estado de derecho» (rule of law)?"
    },
    choices: [
      { en: "Everyone must follow the law / leaders obey the law", es: "Todos deben obedecer la ley / los líderes también" },
      { en: "Only citizens must follow laws", es: "Solo los ciudadanos deben obedecer" },
      { en: "Laws apply only in Washington, D.C.", es: "Las leyes solo aplican en Washington, D.C." },
      { en: "Judges are above the law", es: "Los jueces están por encima de la ley" }
    ],
    correct: 0
  },
  {
    q: {
      en: "Who is in charge of the executive branch?",
      es: "¿Quién está a cargo de la rama ejecutiva?"
    },
    choices: [
      { en: "The President", es: "El Presidente" },
      { en: "The Speaker of the House", es: "El presidente de la Cámara" },
      { en: "The Chief Justice", es: "El presidente del Tribunal Supremo" },
      { en: "The Senate Majority Leader", es: "El líder de la mayoría del Senado" }
    ],
    correct: 0
  },
  {
    q: {
      en: "What do we call the first ten amendments to the Constitution?",
      es: "¿Cómo se llaman las primeras diez enmiendas a la Constitución?"
    },
    choices: [
      { en: "The Bill of Rights", es: "La Carta de Derechos (Bill of Rights)" },
      { en: "The Federalist Papers", es: "Los Federalist Papers" },
      { en: "The Articles of Confederation", es: "Los Artículos de Confederación" },
      { en: "The Emancipation Proclamation", es: "La Proclamación de Emancipación" }
    ],
    correct: 0
  },
  {
    q: {
      en: "Who makes federal laws?",
      es: "¿Quién hace las leyes federales?"
    },
    choices: [
      { en: "Congress", es: "El Congreso" },
      { en: "The President alone", es: "Solo el Presidente" },
      { en: "The Supreme Court alone", es: "Solo el Tribunal Supremo" },
      { en: "The states only", es: "Solo los estados" }
    ],
    correct: 0
  },
  {
    q: {
      en: "Who does a U.S. Senator represent?",
      es: "¿A quién representa un senador de EE. UU.?"
    },
    choices: [
      { en: "All people of the state", es: "A todas las personas del estado" },
      { en: "Only U.S. citizens in the state", es: "Solo a ciudadanos estadounidenses del estado" },
      { en: "Only the governor", es: "Solo al gobernador" },
      { en: "Only federal employees", es: "Solo a empleados federales" }
    ],
    correct: 0
  },
  {
    q: {
      en: "When do we celebrate Independence Day?",
      es: "¿Cuándo celebramos el Día de la Independencia?"
    },
    choices: [
      { en: "July 4", es: "El 4 de julio" },
      { en: "January 1", es: "El 1 de enero" },
      { en: "September 17", es: "El 17 de septiembre" },
      { en: "November 11", es: "El 11 de noviembre" }
    ],
    correct: 0
  }
];

const CIVICS_QUIZ_LEN = 10;
let civicsQuizState = null;
let civicsQuizElements = null;

function qText(obj) {
  return obj[currentLang] || obj.en;
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mountCivicsQuiz() {
  const root = document.getElementById("civicsQuizRoot");
  if (!root) return;
  civicsQuizElements = {
    root,
    intro: document.getElementById("civicsIntro"),
    startBtn: document.getElementById("civicsStartBtn"),
    area: document.getElementById("civicsQuizArea"),
    progress: document.getElementById("civicsProgress"),
    question: document.getElementById("civicsQuestion"),
    choices: document.getElementById("civicsChoices"),
    feedback: document.getElementById("civicsFeedback"),
    nextBtn: document.getElementById("civicsNextBtn"),
    results: document.getElementById("civicsResults"),
    scoreLine: document.getElementById("civicsScoreLine"),
    retryBtn: document.getElementById("civicsRetryBtn"),
    official: document.getElementById("civicsOfficialLink")
  };
  const els = civicsQuizElements;
  els.startBtn.addEventListener("click", startCivicsQuiz);
  els.nextBtn.addEventListener("click", advanceCivicsQuiz);
  els.retryBtn.addEventListener("click", () => {
    els.results.hidden = true;
    els.retryBtn.hidden = true;
    startCivicsQuiz();
  });
  if (els.official) {
    els.official.href = "https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test";
    els.official.target = "_blank";
    els.official.rel = "noopener noreferrer";
  }
  els.retryBtn.hidden = true;
}

function startCivicsQuiz() {
  const els = civicsQuizElements;
  if (!els) return;
  const deck = shuffleArray(CIVICS_QUESTIONS).slice(0, CIVICS_QUIZ_LEN);
  civicsQuizState = {
    deck,
    index: 0,
    score: 0,
    answered: false
  };
  els.intro.hidden = true;
  els.startBtn.hidden = true;
  els.results.hidden = true;
  els.retryBtn.hidden = true;
  els.area.hidden = false;
  els.feedback.textContent = "";
  els.feedback.className = "civics-feedback";
  els.nextBtn.hidden = true;
  renderCivicsQuestion();
}

function renderCivicsQuestion() {
  const els = civicsQuizElements;
  const st = civicsQuizState;
  if (!els || !st) return;
  const item = st.deck[st.index];
  const n = st.index + 1;
  els.progress.textContent = t("quizProgress").replace("{{n}}", String(n)).replace("{{total}}", String(st.deck.length));
  els.question.textContent = qText(item.q);
  els.choices.innerHTML = "";
  item.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "civics-choice-btn";
    btn.textContent = qText(choice);
    btn.addEventListener("click", () => onCivicsAnswer(idx));
    els.choices.appendChild(btn);
  });
  st.answered = false;
  els.feedback.textContent = "";
  els.feedback.className = "civics-feedback";
  els.nextBtn.hidden = true;
}

function onCivicsAnswer(choiceIndex) {
  const els = civicsQuizElements;
  const st = civicsQuizState;
  if (!els || !st || st.answered) return;
  st.answered = true;
  const item = st.deck[st.index];
  const correct = choiceIndex === item.correct;
  if (correct) st.score += 1;
  els.feedback.textContent = correct ? t("quizCorrect") : t("quizIncorrect");
  els.feedback.className = `civics-feedback ${correct ? "is-correct" : "is-wrong"}`;
  Array.from(els.choices.children).forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === item.correct) btn.classList.add("is-correct-choice");
    else if (idx === choiceIndex && !correct) btn.classList.add("is-wrong-choice");
  });
  const atEnd = st.index >= st.deck.length - 1;
  els.nextBtn.textContent = atEnd ? t("quizSeeResults") : t("quizNext");
  els.nextBtn.hidden = false;
}

function advanceCivicsQuiz() {
  const els = civicsQuizElements;
  const st = civicsQuizState;
  if (!els || !st) return;
  if (st.index >= st.deck.length - 1) {
    els.area.hidden = true;
    els.results.hidden = false;
    els.retryBtn.hidden = false;
    els.scoreLine.textContent = t("quizFinalScore")
      .replace("{{score}}", String(st.score))
      .replace("{{total}}", String(st.deck.length));
    return;
  }
  st.index += 1;
  st.answered = false;
  renderCivicsQuestion();
}

function refreshCivicsQuizLanguage() {
  const els = civicsQuizElements;
  if (!els || !civicsQuizState) return;
  if (els.area.hidden === false && civicsQuizState.deck.length) {
    renderCivicsQuestion();
    if (civicsQuizState.answered) {
      const item = civicsQuizState.deck[civicsQuizState.index];
      const wasCorrect = els.feedback.classList.contains("is-correct");
      els.feedback.textContent = wasCorrect ? t("quizCorrect") : t("quizIncorrect");
    }
  }
  const st = civicsQuizState;
  if (st && els.nextBtn.hidden === false) {
    const atEnd = st.index >= st.deck.length - 1;
    els.nextBtn.textContent = atEnd ? t("quizSeeResults") : t("quizNext");
  }
  if (!els.results.hidden && st) {
    els.scoreLine.textContent = t("quizFinalScore")
      .replace("{{score}}", String(st.score))
      .replace("{{total}}", String(st.deck.length));
  }
}

const STRINGS = {
  en: {
    themeLabel: "Flag colors",
    langLabel: "Language",
    navHome: "Home",
    navRights: "Know your rights",
    navDetained: "If detained",
    navLegal: "Legal help by state",
    navGuide: "Situation guide",
    navQuiz: "Citizenship practice quiz",
    heroTitle: "Immigration Information Hub",
    heroWelcomeLead:
      "Welcome. Use the menu or tiles below to explore rights, detention basics, legal help by state, and a simple guided path.",
    disclaimer: "This website is educational information, not legal advice.",
    welcomePageTitle: "Welcome — Immigration Information Hub",
    welcomeIntroTitle: "About this website",
    welcomeP1:
      "This hub brings together plain-language, educational information about common immigration-related topics. It can help you orient yourself, remember key rights, and find nonprofit legal directories by U.S. state.",
    welcomeP2:
      "Nothing here replaces advice from a qualified attorney or accredited representative. Laws and procedures change; for urgent or personal questions, contact trusted legal help.",
    welcomeP3:
      "Use the navigation bar or the tiles on this page to open each topic in its own section. You can switch language (English / Español) and color theme anytime from the top bar.",
    welcomeHowTitle: "What you can do here",
    welcomeHowLead:
      "Skim Know Your Rights, read detention response reminders, look up legal nonprofits for your state, or use the guided tool for general next-step ideas.",
    welcomeTilesHeading: "Browse sections",
    welcomeTileRights: "Short reminders about silence, documents, interpreters, and safe record-keeping.",
    welcomeTileDetained: "General steps to consider if you or someone you know may be detained.",
    welcomeTileLegal: "Jump to a state-specific nonprofit immigration legal directory (opens in a new tab).",
    welcomeTileGuide: "Click through a few questions for educational pointers tailored to broad situations.",
    rightsPageTitle: "Know Your Rights — Immigration Information Hub",
    rightsHeroLead:
      "Practical reminders about silence, documents, interpreters, and keeping copies of important records.",
    detainedPageTitle: "If Detained — Immigration Information Hub",
    detainedHeroLead:
      "General steps to consider if you or someone you know may be detained. This is educational, not a playbook for a specific case.",
    legalPageTitle: "Legal Help By State — Immigration Information Hub",
    legalHeroLead:
      "Pick your U.S. state to open nonprofit immigration legal services listings for that state (external directory).",
    guidePageTitle: "Guided Situation Guide — Immigration Information Hub",
    guideHeroLead:
      "Answer a few questions to see general educational next steps. This is not a substitute for individualized legal advice.",
    quizPageTitle: "Citizenship Test Practice — Immigration Information Hub",
    quizHeroLead:
      "Practice multiple-choice civics questions similar in style to the U.S. naturalization interview. Not affiliated with USCIS; always study the official materials.",
    quizTitle: "U.S. citizenship civics practice",
    quizIntro:
      "You will get 10 questions drawn at random from a small practice bank. This is for learning only—USCIS updates tests and acceptable answers; use the official study links below before your interview.",
    quizStart: "Start 10-question quiz",
    quizProgress: "Question {{n}} of {{total}}",
    quizNext: "Next question",
    quizSeeResults: "See results",
    quizCorrect: "Correct.",
    quizIncorrect: "Not quite—the correct answer is highlighted in green.",
    quizFinalScore: "You scored {{score}} out of {{total}}.",
    quizTryAgain: "Try another round",
    quizOfficialLink: "USCIS — official civics test study materials (opens in new tab)",
    quizDisclaimer:
      "USCIS may change questions, answers, and passing rules. This quiz is not an official government tool.",
    welcomeTileQuiz: "Practice civics questions in English or Spanish for the naturalization interview.",
    rightsTitle: "Know Your Rights",
    rights1: "You can remain silent and ask for a lawyer.",
    rights2: "Do not sign documents you do not understand.",
    rights3: "You can ask for an interpreter in your preferred language.",
    rights4: "Keep copies of immigration paperwork and emergency contacts in a safe place.",
    rightsOverviewP1:
      "In the United States, many people have protections when they interact with police or immigration agents. What you say and sign can affect a future case, so some people choose to stay quiet and get legal advice before answering questions.",
    rightsOverviewP2:
      "The notes on this page are general education only. Rules can depend on location, agency, and your situation. For urgent or personal questions, contact a qualified attorney or accredited representative.",
    rightsPillarsLead: "Core reminders",
    rightsSituationsHeading: "Situations — click to read more",
    rightsSituationsSub:
      "Pick the situation that fits what you are thinking about. These panels summarize common educational tips; they do not cover every possibility.",
    rightsSitIceTitle: "Immigration (ICE) at your home or door",
    rightsSitIceP1:
      "You often do not have to open the door unless officers show a judicial warrant signed by a judge, or you choose to speak with them. Many advocates suggest asking which agency they are from and, through the door or a window, asking to see any paperwork held up to the glass—without handing over originals.",
    rightsSitIceP2:
      "You can remain silent, decline to answer questions about immigration status or travel, and say you want to speak with a lawyer before signing or agreeing to anything.",
    rightsSitIceP3:
      "Have a plan: know who to call, where copies of documents are, and who will care for children if you are away. Keep emergency numbers where trusted people can find them.",
    rightsSitTrafficTitle: "Pulled over while driving",
    rightsSitTrafficP1:
      "If law enforcement signals you to stop, pull over safely when you can, turn off the engine, and keep your hands visible. Many states require you to provide license, registration, and proof of insurance.",
    rightsSitTrafficP2:
      "Beyond required documents, you may choose to remain silent about other topics. You can say you wish to speak with an attorney before answering questions about immigration. Avoid sudden moves toward a glove compartment—communicate calmly.",
    rightsSitTrafficP3:
      "Passengers may ask whether they are free to leave. Outcomes depend on state law and the facts; treat this page as orientation, not advice for a specific stop.",
    rightsSitWorkTitle: "ICE or police at your workplace",
    rightsSitWorkP1:
      "Workplace enforcement visits happen in some industries. You can often choose not to answer questions about immigration status and can ask for an interpreter.",
    rightsSitWorkP2:
      "Avoid signing papers you do not understand. If it is safe, note names, badges, and what was said for your lawyer later. Coworkers can sometimes help by remembering details and contacting family.",
    rightsSitPublicTitle: "Stopped on the street or in a public place",
    rightsSitPublicP1:
      "Ask if you are free to go. If you are not detained, some people calmly leave. If you are detained, you may remain silent beyond identifying yourself when your state or situation requires it.",
    rightsSitPublicP2:
      "You can ask why you are being stopped and request a lawyer before answering questions about nationality or immigration. You may not have to consent to a search of your phone or belongings in many circumstances, though officers may still act under other rules—this is general education only.",
    rightsSitAirportTitle: "Airports, ports, or near the border",
    rightsSitAirportP1:
      "Border officials may have broader questioning authority at inspection points than in many interior locations, but you may still ask for an interpreter and avoid signing forms you do not understand.",
    rightsSitAirportP2:
      "If you travel internationally as a Lawful Permanent Resident, carry your green card and understand that long absences from the U.S. can raise issues. Plan with an immigration attorney before significant travel.",
    rightsResourcesHeading: "Where to read more (opens in new tab)",
    rightsResourcesIntro:
      "Nonprofit and government pages below go deeper than this site. We link for education only; we do not control their wording, language options, or updates.",
    rightsLinkAcluIceDoor: "ACLU — if ICE agents are at your door",
    rightsLinkAcluImmigrants: "ACLU — immigrants' rights (overview)",
    rightsLinkAcluPolice: "ACLU — stopped by police",
    rightsLinkIlrcRed: "ILRC — red cards and printable know-your-rights tools",
    rightsLinkNilcWorkers: "NILC — workers' rights and workplace enforcement",
    rightsLinkNilcKyr: "NILC — community know-your-rights materials",
    rightsLinkNijc: "National Immigrant Justice Center — know your rights",
    rightsLinkImmDef: "Immigrant Defense Project — know your rights library",
    detainedTitle: "What To Do If Detained",
    detained1: "Stay calm and state that you want to speak with a lawyer.",
    detained2: "Memorize and call a trusted emergency contact.",
    detained3: "Ask where you are being taken and your A-Number if available.",
    detained4: "Contact a legal aid organization immediately.",
    detainedOverviewP1:
      "If someone may be taken into custody, families often feel rushed and afraid. A few steady steps—staying as calm as you can, asking for a lawyer, and reaching trusted people quickly—can make it easier to respond.",
    detainedOverviewP2:
      "The numbered list below is general. Detention locations and procedures change; use nonprofit legal directories and your state's resources for details.",
    detainedPillarsLead: "First steps to remember",
    detainedSituationsHeading: "If this happens — read first steps",
    detainedSituationsSub: "Open the situation that is closest to yours.",
    detainedSitIceTitle: "ICE is at the door or inside the home",
    detainedSitIceP1:
      "If possible, a trusted adult should call your emergency contact or lawyer line right away. Children should not be left alone without a safety plan agreed in advance.",
    detainedSitIceP2:
      "Later, write down anything you safely remember: time, what was said, vehicle numbers. Do not sign forms until you understand them with help from counsel.",
    detainedSitTrafficTitle: "Someone is stopped while driving",
    detainedSitTrafficP1:
      "If a loved one calls from a traffic stop, remind them to stay calm and not to run. Keep the line open if it is safe so you can note the location.",
    detainedSitTrafficP2:
      "After the stop, write down officer or agency names if known and contact legal help about next steps, including possible holds or transfers.",
    detainedSitWorkTitle: "There is a raid or enforcement action at work",
    detainedSitWorkP1:
      "Family or coworkers may hear about a raid before official confirmation. National or local nonprofit hotlines sometimes help locate people in immigration custody.",
    detainedSitWorkP2:
      "Gather documents the detained person might need for bond or screening only as an attorney advises—ask what copies are appropriate to share.",
    detainedSitPublicTitle: "Detained away from home (transit, store, sidewalk)",
    detainedSitPublicP1:
      "Ask where the person was taken as soon as it is safe to ask officers or jail staff. Have an A-Number if you know it.",
    detainedSitPublicP2:
      "Start calling your state's legal directory and any immigration nonprofit you trust. Ask how loved ones can add money for phone accounts if that applies.",
    detainedSitCustodyTitle: "Already in custody (jail or immigration hold)",
    detainedSitCustodyP1:
      "Say clearly that you want to speak with a lawyer before answering questions about your case. Memorize a phone number if phones are restricted.",
    detainedSitCustodyP2:
      "Ask where you are, your alien registration number if assigned, and facility rules for calls. Follow safety instructions while still protecting your legal rights with counsel.",
    detainedSitCustodyP3:
      "Legal aid organizations can sometimes help family navigate the system or connect you with representation.",
    detainedResourcesHeading: "Tools and deeper guides (opens in new tab)",
    detainedResourcesIntro:
      "Use these links to try to locate someone in custody, read nonprofit explainers, find nonprofit attorneys, or understand immigration court. Educational use only; verify details with counsel.",
    detainedLinkIceLocator: "ICE — online detainee locator (U.S. government)",
    detainedLinkNilcDetention: "NILC — detention and enforcement (overview)",
    detainedLinkIlrcDetention: "ILRC — immigration detention (resources hub)",
    legalTitle: "Find Legal Help By State",
    stateLabel: "Select your state:",
    statePlaceholder: "Choose a state",
    stateHint: "Links open in a new tab on the Immigration Advocates legal directory.",
    stateLinkIdle: "Select a state first",
    stateLinkOpen: "Open {{state}} legal resources",
    guideTitle: "Interactive Situation Guide",
    guideLead: "Choose your situation to get next-step information.",
    resetBtn: "Reset guide",
    footerNote: "Add local nonprofit contacts and emergency hotline numbers for your community.",
    selectedLabel: "Selected:",
    nextDetained: "Next: If detained →",
    nextLegal: "Next: Legal help by state →",
    nextGuide: "Next: Guided situation guide →",
    backHome: "← Back to home",
    guideResourcesHeading: "Helpful official resources (new tab)",
    guideLink_sevp: "Study in the States — international student hub (DHS)",
    guideLink_uscis_students: "USCIS — students and employment overview",
    guideLink_uscis_opt: "USCIS — Optional Practical Training (OPT) for F-1 students",
    guideLink_uscis_m1: "USCIS — vocational (M-1) students",
    guideLink_state_j1: "U.S. Department of State — J-1 exchange visitor program",
    guideLink_uscis_j1: "USCIS — exchange visitors (J categories)",
    guideLink_uscis_h1b: "USCIS — H-1B specialty occupation overview",
    guideLink_uscis_h1b_portability: "USCIS — changing employers or jobs (H-1B portability)",
    guideLink_dol_h1b: "U.S. Department of Labor — H-1B labor program",
    guideLink_uscis_tn: "USCIS — TN professionals (USMCA)",
    guideLink_uscis_l1: "USCIS — L-1 intracompany transferee overview",
    guideLink_uscis_o1: "USCIS — O-1 individuals with extraordinary ability",
    guideLink_dol_h2: "U.S. Department of Labor — temporary labor certification (H-2A/H-2B)",
    guideLink_uscis_ead: "USCIS — employment authorization (Form I-765)",
    guideLink_advocates_dir: "Immigration Advocates Network — nonprofit legal directory",
    guideLink_visa_bulletin: "U.S. Department of State — Visa Bulletin (priority dates)",
    guideLink_nvc: "U.S. Department of State — National Visa Center (immigrant visas)",
    guideLink_immigrant_visa: "U.S. Department of State — family-based immigrant visas",
    guideLink_uscis_family: "USCIS — family of U.S. citizens (petitions and paths)",
    guideLink_uscis_adjustment: "USCIS — adjustment of status (green card while in the U.S.)",
    guideLink_uscis_asylum: "USCIS — asylum overview",
    guideLink_eoir: "Executive Office for Immigration Review — immigration court (EOIR)",
    guideLink_b_visa: "U.S. Department of State — visitor visas (B-1/B-2)",
    guideLink_esta: "U.S. Customs and Border Protection — ESTA (Visa Waiver Program)",
    guideLink_cbp_travel: "CBP — preparing to enter the United States",
    guideLink_uscis_daca: "USCIS — Deferred Action for Childhood Arrivals (DACA)",
    guideLink_nilc_daca: "NILC — DACA and immigrant youth resources",
    guideLink_uscis_green_card_after: "USCIS — international travel and maintaining LPR status",
    guideLink_uscis_replace_gc: "USCIS — replace or renew a green card",
    guideLink_uscis_naturalize: "USCIS — citizenship through naturalization",
    guideLink_uscis_civics: "USCIS — naturalization test and study materials",
    guideLink_uscis_tvisa: "USCIS — T nonimmigrant status (trafficking victims)",
    guideLink_uscis_uvisa: "USCIS — U nonimmigrant status (certain crime victims)",
    themeLabels: {
      usa: "United States",
      mexico: "Mexico",
      colombia: "Colombia",
      venezuela: "Venezuela",
      philippines: "Philippines",
      dominican: "Dominican Republic",
      brazil: "Brazil",
      international: "International (multi)"
    }
  },
  es: {
    themeLabel: "Colores de banderas",
    langLabel: "Idioma",
    navHome: "Inicio",
    navRights: "Conozca sus derechos",
    navDetained: "Si lo detienen",
    navLegal: "Ayuda legal por estado",
    navGuide: "Guía guiada",
    navQuiz: "Práctica del examen de ciudadanía",
    heroTitle: "Centro de información sobre inmigración",
    heroWelcomeLead:
      "Bienvenido. Use el menú o los recuadros de abajo para explorar derechos, qué hacer ante una posible detención, ayuda legal por estado y una guía sencilla.",
    disclaimer: "Este sitio es información educativa, no asesoría legal.",
    welcomePageTitle: "Bienvenida — Centro de información sobre inmigración",
    welcomeIntroTitle: "Sobre este sitio",
    welcomeP1:
      "Este centro reúne información educativa en lenguaje sencillo sobre temas comunes de inmigración. Puede ayudarle a orientarse, recordar derechos básicos y encontrar directorios de organizaciones sin fines de lucro por estado en EE. UU.",
    welcomeP2:
      "Nada de esto sustituye la opinión de un abogado calificado o representante acreditado. Las leyes cambian; para asuntos urgentes o personales, busque ayuda legal de confianza.",
    welcomeP3:
      "Use la barra de navegación o los recuadros de esta página para abrir cada tema en su propia sección. Puede cambiar el idioma (inglés / español) y el tema de color cuando quiera desde la parte superior.",
    welcomeHowTitle: "Qué puede hacer aquí",
    welcomeHowLead:
      "Revise Conozca sus derechos, lea recordatorios si hay detención, busque organizaciones legales por estado o use la guía interactiva para ideas generales de próximos pasos.",
    welcomeTilesHeading: "Explorar secciones",
    welcomeTileRights:
      "Recordatorios breves sobre silencio, documentos, intérpretes y guardar copias de registros importantes.",
    welcomeTileDetained: "Pasos generales si usted o alguien cercano pudiera ser detenido.",
    welcomeTileLegal:
      "Vaya a un directorio de servicios legales sin fines de lucro por estado (se abre en una nueva pestaña).",
    welcomeTileGuide:
      "Responda algunas preguntas para ver orientación educativa según situaciones generales.",
    rightsPageTitle: "Conozca sus derechos — Centro de información sobre inmigración",
    rightsHeroLead:
      "Recordatorios prácticos sobre silencio, documentos, intérpretes y conservar copias de documentos importantes.",
    detainedPageTitle: "Si lo detienen — Centro de información sobre inmigración",
    detainedHeroLead:
      "Pasos generales si usted o alguien cercano pudiera ser detenido. Es material educativo, no un plan para un caso concreto.",
    legalPageTitle: "Ayuda legal por estado — Centro de información sobre inmigración",
    legalHeroLead:
      "Elija su estado en EE. UU. para abrir listados de servicios legales sin fines de lucro (directorio externo).",
    guidePageTitle: "Guía interactiva — Centro de información sobre inmigración",
    guideHeroLead:
      "Responda algunas preguntas para ver pasos educativos generales. No sustituye asesoría legal personalizada.",
    quizPageTitle: "Práctica del examen de ciudadanía — Centro de información sobre inmigración",
    quizHeroLead:
      "Practique preguntas tipo opción múltiple parecidas a la entrevista de naturalización de EE. UU. No está afiliado a USCIS; estudie siempre los materiales oficiales.",
    quizTitle: "Práctica de educación cívica para la ciudadanía",
    quizIntro:
      "Recibirá 10 preguntas al azar de un banco pequeño de práctica. Es solo para aprender—USCIS actualiza exámenes y respuestas aceptables; use los enlaces oficiales antes de su entrevista.",
    quizStart: "Comenzar cuestionario de 10 preguntas",
    quizProgress: "Pregunta {{n}} de {{total}}",
    quizNext: "Siguiente pregunta",
    quizSeeResults: "Ver resultados",
    quizCorrect: "Correcto.",
    quizIncorrect: "No es la correcta—la respuesta correcta aparece resaltada en verde.",
    quizFinalScore: "Obtuvo {{score}} de {{total}}.",
    quizTryAgain: "Intentar otra ronda",
    quizOfficialLink: "USCIS — materiales oficiales de estudio (nueva pestaña)",
    quizDisclaimer:
      "USCIS puede cambiar preguntas, respuestas y reglas de aprobación. Este cuestionario no es una herramienta oficial del gobierno.",
    welcomeTileQuiz: "Practique preguntas de educación cívica en inglés o español para la entrevista de naturalización.",
    rightsTitle: "Conozca sus derechos",
    rights1: "Puede guardar silencio y pedir un abogado.",
    rights2: "No firme documentos que no entienda.",
    rights3: "Puede pedir un intérprete en el idioma de su preferencia.",
    rights4: "Guarde copias de documentos migratorios y contactos de emergencia en un lugar seguro.",
    rightsOverviewP1:
      "En Estados Unidos, muchas personas tienen protecciones al interactuar con la policía o agentes de inmigración. Lo que diga o firme puede afectar un caso futuro, por eso algunas personas prefieren guardar silencio y buscar asesoría legal antes de responder preguntas.",
    rightsOverviewP2:
      "Las notas de esta página son solo educación general. Las reglas pueden depender del lugar, la agencia y su situación. Para asuntos urgentes o personales, consulte a un abogado calificado o representante acreditado.",
    rightsPillarsLead: "Recordatorios centrales",
    rightsSituationsHeading: "Situaciones — haga clic para leer más",
    rightsSituationsSub:
      "Elija la situación que más se parezca a su preocupación. Estos paneles resumen consejos educativos comunes; no cubren todas las posibilidades.",
    rightsSitIceTitle: "Inmigración (ICE) en su casa o en la puerta",
    rightsSitIceP1:
      "A menudo no tiene que abrir la puerta salvo que los oficiales muestren una orden judicial firmada por un juez, o usted decida hablar con ellos. Muchas organizaciones sugieren preguntar de qué agencia son y, por la puerta o una ventana, pedir ver el papel cerca del cristal—sin entregar originales.",
    rightsSitIceP2:
      "Puede guardar silencio, negarse a responder sobre estatus migratorio o viajes, y decir que desea hablar con un abogado antes de firmar o aceptar algo.",
    rightsSitIceP3:
      "Tenga un plan: sepa a quién llamar, dónde están las copias de documentos y quién cuidará a los niños si usted no está. Guarde números de emergencia donde personas de confianza los encuentren.",
    rightsSitTrafficTitle: "Lo paran mientras conduce",
    rightsSitTrafficP1:
      "Si la policía le indica que se detenga, párese con seguridad cuando pueda, apague el motor y mantenga las manos visibles. En muchos estados debe mostrar licencia, registro y seguro del vehículo.",
    rightsSitTrafficP2:
      "Más allá de los documentos exigidos, puede elegir guardar silencio sobre otros temas. Puede decir que desea hablar con un abogado antes de responder sobre inmigración. Evite movimientos bruscos hacia la guantera—comuníquese con calma.",
    rightsSitTrafficP3:
      "Los pasajeros pueden preguntar si son libres de irse. El resultado depende de la ley estatal y los hechos; use esta página como orientación, no como consejo para una parada concreta.",
    rightsSitWorkTitle: "ICE o policía en su lugar de trabajo",
    rightsSitWorkP1:
      "En algunos sectores ocurren visitas de autoridades al trabajo. A menudo puede elegir no responder sobre estatus migratorio y puede pedir un intérprete.",
    rightsSitWorkP2:
      "No firme papeles que no entienda. Si es seguro, anote nombres, placas y lo dicho para su abogado después. Compañeros a veces ayudan recordando detalles y avisando a la familia.",
    rightsSitPublicTitle: "Parado en la calle o en un lugar público",
    rightsSitPublicP1:
      "Pregunte si es libre de irse. Si no está detenido, algunas personas se retiran con calma. Si está detenido, puede guardar silencio más allá de identificarse cuando la ley o la situación lo exija.",
    rightsSitPublicP2:
      "Puede preguntar por qué lo detienen y pedir un abogado antes de responder sobre nacionalidad o inmigración. En muchas circunstancias no tiene que consentir a revisar su teléfono o pertenencias, aunque los oficiales puedan actuar bajo otras reglas—esto es solo educación general.",
    rightsSitAirportTitle: "Aeropuertos, puertos o cerca de la frontera",
    rightsSitAirportP1:
      "Los oficiales de frontera pueden tener más autoridad para preguntar en puntos de inspección que en muchos lugares del interior, pero aún puede pedir intérprete y evitar firmar formularios que no entienda.",
    rightsSitAirportP2:
      "Si viaja al extranjero como residente permanente legal, lleve su tarjeta de residencia y sepa que ausencias largas de EE. UU. pueden generar problemas. Planifique con un abogado de inmigración antes de viajes importantes.",
    rightsResourcesHeading: "Dónde leer más (se abre en nueva pestaña)",
    rightsResourcesIntro:
      "Las páginas sin fines de lucro y del gobierno que siguen profundizan más que este sitio. Los enlaces son solo educativos; no controlamos su redacción, idiomas disponibles ni actualizaciones.",
    rightsLinkAcluIceDoor: "ACLU — si agentes de ICE están en su puerta",
    rightsLinkAcluImmigrants: "ACLU — derechos de inmigrantes (visión general)",
    rightsLinkAcluPolice: "ACLU — si la policía lo detiene",
    rightsLinkIlrcRed: "ILRC — tarjetas rojas e impresos «conozca sus derechos»",
    rightsLinkNilcWorkers: "NILC — derechos laborales y fiscalización en el trabajo",
    rightsLinkNilcKyr: "NILC — materiales comunitarios «conozca sus derechos»",
    rightsLinkNijc: "National Immigrant Justice Center — conozca sus derechos",
    rightsLinkImmDef: "Immigrant Defense Project — biblioteca «conozca sus derechos»",
    detainedTitle: "Qué hacer si lo detienen",
    detained1: "Mantenga la calma y diga que desea hablar con un abogado.",
    detained2: "Memorice y llame a un contacto de emergencia de confianza.",
    detained3: "Pregunte a dónde lo llevan y su número A, si lo tiene.",
    detained4: "Contacte de inmediato a una organización de ayuda legal.",
    detainedOverviewP1:
      "Si alguien podría ser puesto en custodia, las familias suelen sentirse apuradas y con miedo. Algunos pasos firmes—mantener la calma en lo posible, pedir un abogado y avisar pronto a personas de confianza—pueden facilitar la respuesta.",
    detainedOverviewP2:
      "La lista numerada de abajo es general. Los lugares y procedimientos de detención cambian; use directorios legales sin fines de lucro y los recursos de su estado para detalles.",
    detainedPillarsLead: "Primeros pasos a recordar",
    detainedSituationsHeading: "Si ocurre esto — lea primeros pasos",
    detainedSituationsSub: "Abra la situación que más se acerque a la suya.",
    detainedSitIceTitle: "ICE está en la puerta o dentro del hogar",
    detainedSitIceP1:
      "Si es posible, un adulto de confianza debe llamar de inmediato al contacto de emergencia o a la línea del abogado. Los niños no deben quedarse solos sin un plan de seguridad acordado antes.",
    detainedSitIceP2:
      "Después, escriba con seguridad lo que recuerde: hora, lo dicho, números de vehículos. No firme formularios hasta entenderlos con ayuda de un abogado.",
    detainedSitTrafficTitle: "Detienen a alguien mientras conduce",
    detainedSitTrafficP1:
      "Si un familiar llama desde una parada de tránsito, recuérdele mantener la calma y no huir. Mantenga la llamada si es seguro para anotar el lugar.",
    detainedSitTrafficP2:
      "Después de la parada, anote nombres de oficiales o agencias si los sabe y busque ayuda legal sobre los siguientes pasos, incluidas posibles retenciones o traslados.",
    detainedSitWorkTitle: "Redada o acción de autoridades en el trabajo",
    detainedSitWorkP1:
      "Familiares o compañeros pueden enterarse de una redada antes de confirmación oficial. Líneas de ayuda nacionales o locales a veces ayudan a localizar a personas en custodia migratoria.",
    detainedSitWorkP2:
      "Reúna documentos que la persona detenida pudiera necesitar para fianza o revisión solo como indique un abogado—pregunte qué copias conviene compartir.",
    detainedSitPublicTitle: "Detención fuera de casa (transporte, tienda, acera)",
    detainedSitPublicP1:
      "Pregunte a dónde llevaron a la persona en cuanto sea seguro preguntar a oficiales o personal del centro. Tenga el número A si lo conoce.",
    detainedSitPublicP2:
      "Comience a llamar al directorio legal de su estado y a cualquier organización de inmigración de confianza. Pregunte cómo los familiares pueden depositar dinero para llamadas si aplica.",
    detainedSitCustodyTitle: "Ya en custodia (cárcel o retención migratoria)",
    detainedSitCustodyP1:
      "Diga claramente que desea hablar con un abogado antes de responder sobre su caso. Memorice un número de teléfono si hay restricciones.",
    detainedSitCustodyP2:
      "Pregunte dónde está, su número de registro de extranjero si le asignaron uno, y las reglas del centro para llamadas. Siga instrucciones de seguridad mientras protege sus derechos legales con un abogado.",
    detainedSitCustodyP3:
      "Las organizaciones de ayuda legal a veces ayudan a la familia a orientarse o a conectarlo con representación.",
    detainedResourcesHeading: "Herramientas y guías detalladas (nueva pestaña)",
    detainedResourcesIntro:
      "Use estos enlaces para intentar localizar a alguien en custodia, leer explicaciones de organizaciones sin fines de lucro, buscar abogados sin fines de lucro o entender el tribunal de inmigración. Solo educación; confirme detalles con un abogado.",
    detainedLinkIceLocator: "ICE — localizador en línea de personas detenidas (gobierno de EE. UU.)",
    detainedLinkNilcDetention: "NILC — detención y fiscalización (visión general)",
    detainedLinkIlrcDetention: "ILRC — detención migratoria (centro de recursos)",
    legalTitle: "Ayuda legal por estado",
    stateLabel: "Seleccione su estado:",
    statePlaceholder: "Elija un estado",
    stateHint:
      "Los enlaces se abren en una nueva pestaña en el directorio legal de Immigration Advocates.",
    stateLinkIdle: "Primero seleccione un estado",
    stateLinkOpen: "Abrir recursos legales de {{state}}",
    guideTitle: "Guía interactiva por situación",
    guideLead: "Elija su situación para ver información sobre próximos pasos.",
    resetBtn: "Reiniciar guía",
    footerNote:
      "Agregue contactos locales de organizaciones sin fines de lucro y números de emergencia para su comunidad.",
    selectedLabel: "Seleccionó:",
    nextDetained: "Siguiente: Si lo detienen →",
    nextLegal: "Siguiente: Ayuda legal por estado →",
    nextGuide: "Siguiente: Guía guiada →",
    backHome: "← Volver al inicio",
    guideResourcesHeading: "Recursos oficiales útiles (nueva pestaña)",
    guideLink_sevp: "Study in the States — centro para estudiantes internacionales (DHS)",
    guideLink_uscis_students: "USCIS — estudiantes y empleo (visión general)",
    guideLink_uscis_opt: "USCIS — Práctica Opcional (OPT) para estudiantes F-1",
    guideLink_uscis_m1: "USCIS — estudiantes vocacionales (M-1)",
    guideLink_state_j1: "Departamento de Estado — programa de visitantes J-1",
    guideLink_uscis_j1: "USCIS — visitantes de intercambio (categorías J)",
    guideLink_uscis_h1b: "USCIS — ocupaciones especializadas H-1B (visión general)",
    guideLink_uscis_h1b_portability: "USCIS — cambiar de empleador o empleo (portabilidad H-1B)",
    guideLink_dol_h1b: "Departamento del Trabajo — programa laboral H-1B",
    guideLink_uscis_tn: "USCIS — profesionales TN (T-MEC / USMCA)",
    guideLink_uscis_l1: "USCIS — transferidos dentro de la empresa (L-1)",
    guideLink_uscis_o1: "USCIS — personas con habilidad extraordinaria (O-1)",
    guideLink_dol_h2: "Departamento del Trabajo — certificación laboral temporal (H-2A/H-2B)",
    guideLink_uscis_ead: "USCIS — autorización de empleo (Formulario I-765)",
    guideLink_advocates_dir: "Immigration Advocates Network — directorio legal sin fines de lucro",
    guideLink_visa_bulletin: "Departamento de Estado — Boletín de Visas (fechas de prioridad)",
    guideLink_nvc: "Departamento de Estado — Centro Nacional de Visas (visas de inmigrante)",
    guideLink_immigrant_visa: "Departamento de Estado — visas de inmigrante por motivos familiares",
    guideLink_uscis_family: "USCIS — familia de ciudadanos estadounidenses (peticiones y vías)",
    guideLink_uscis_adjustment: "USCIS — ajuste de estatus (tarjeta verde dentro de EE. UU.)",
    guideLink_uscis_asylum: "USCIS — asilo (visión general)",
    guideLink_eoir: "Oficina Ejecutiva de Revisión de Inmigración — tribunales de inmigración (EOIR)",
    guideLink_b_visa: "Departamento de Estado — visas de visitante (B-1/B-2)",
    guideLink_esta: "CBP — ESTA (Programa de exención de visa)",
    guideLink_cbp_travel: "CBP — preparación para ingresar a Estados Unidos",
    guideLink_uscis_daca: "USCIS — Acción Diferida para los Llegados en la Infancia (DACA)",
    guideLink_nilc_daca: "NILC — DACA y recursos para jóvenes inmigrantes",
    guideLink_uscis_green_card_after: "USCIS — viajes internacionales y mantener el estatus de residente",
    guideLink_uscis_replace_gc: "USCIS — reemplazar o renovar la tarjeta de residencia",
    guideLink_uscis_naturalize: "USCIS — ciudadanía por naturalización",
    guideLink_uscis_civics: "USCIS — examen de ciudadanía y materiales de estudio",
    guideLink_uscis_tvisa: "USCIS — estatus T no inmigrante (víctimas de trata)",
    guideLink_uscis_uvisa: "USCIS — estatus U no inmigrante (ciertas víctimas de delitos)",
    themeLabels: {
      usa: "Estados Unidos",
      mexico: "México",
      colombia: "Colombia",
      venezuela: "Venezuela",
      philippines: "Filipinas",
      dominican: "República Dominicana",
      brazil: "Brasil",
      international: "Internacional (varios)"
    }
  }
};

const journeyTreeEn = {
  label: "Which category best fits your situation?",
  options: [
    {
      label: "Immigrant (student, worker, or other status)",
      next: {
        label: "What is your current profile?",
        options: [
          {
            label: "Student or exchange visitor",
            next: {
              label: "Which status or program is closest?",
              options: [
                {
                  label: "F-1 academic student",
                  next: {
                    label: "What is your main question right now?",
                    options: [
                      {
                        label: "Travel, visa renewal, or re-entry",
                        ...guideLeaf(
                          "Travel can affect your SEVIS record and I-20 signatures. Always coordinate with your designated school official (DSO) before international trips or visa appointments.",
                          [
                            guideLink("guideLink_sevp", "https://studyinthestates.dhs.gov/"),
                            guideLink("guideLink_uscis_students", "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      },
                      {
                        label: "CPT, OPT, internships, or on-campus work",
                        ...guideLeaf(
                          "Work authorization rules for students are strict. Your DSO and USCIS materials explain what counts as authorized training or employment.",
                          [
                            guideLink("guideLink_uscis_opt", "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students"),
                            guideLink("guideLink_uscis_students", "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors"),
                            guideLink("guideLink_sevp", "https://studyinthestates.dhs.gov/"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      },
                      {
                        label: "School transfer, reduced course load, or I-20 issues",
                        ...guideLeaf(
                          "Changes to school, program, or enrollment usually require an updated I-20 and timely reporting in SEVIS. Missteps can affect status.",
                          [
                            guideLink("guideLink_sevp", "https://studyinthestates.dhs.gov/"),
                            guideLink("guideLink_uscis_students", "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      },
                      {
                        label: "Something else or I am not sure",
                        ...guideLeaf(
                          "If you are unsure how a life change affects F-1 status, speak with your DSO first, then consider nonprofit legal screening for complex questions.",
                          [
                            guideLink("guideLink_sevp", "https://studyinthestates.dhs.gov/"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      }
                    ]
                  }
                },
                {
                  label: "J-1 exchange visitor",
                  next: {
                    label: "Does the two-year home-country physical presence rule apply to you?",
                    options: [
                      {
                        label: "Yes, or I was told it might",
                        ...guideLeaf(
                          "The two-year rule can limit changes of status or some green-card paths until it is waived or fulfilled. Requirements are fact-specific—get individualized advice.",
                          [
                            guideLink("guideLink_state_j1", "https://j1visa.state.gov/basics/frequently-asked-questions/"),
                            guideLink("guideLink_uscis_j1", "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/exchange-visitors"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      },
                      {
                        label: "No / not applicable",
                        ...guideLeaf(
                          "Still confirm with your program sponsor. Maintain health insurance and program rules noted on your DS-2019.",
                          [
                            guideLink("guideLink_state_j1", "https://j1visa.state.gov/"),
                            guideLink("guideLink_uscis_j1", "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/exchange-visitors"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      },
                      {
                        label: "I do not know",
                        ...guideLeaf(
                          "Ask your J-1 sponsor which category you are in and whether any skills list or government funding triggers the two-year rule.",
                          [
                            guideLink("guideLink_state_j1", "https://j1visa.state.gov/basics/frequently-asked-questions/"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      }
                    ]
                  }
                },
                {
                  label: "M-1 vocational student",
                  ...guideLeaf(
                    "M-1 programs are tightly tied to vocational training limits. Practical training rules differ from F-1—confirm every change with your school.",
                    [
                      guideLink("guideLink_uscis_m1", "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/vocational-students-m-1"),
                      guideLink("guideLink_sevp", "https://studyinthestates.dhs.gov/"),
                      guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                    ]
                  )
                }
              ]
            }
          },
          {
            label: "Worker or pending work authorization",
            next: {
              label: "Which situation is closest?",
              options: [
                {
                  label: "H-1B specialty occupation",
                  next: {
                    label: "What stage are you in?",
                    options: [
                      {
                        label: "First-time petition, lottery, or cap issues",
                        ...guideLeaf(
                          "H-1B has annual caps and strict employer requirements. Keep copies of LCA postings, approval notices, and pay records.",
                          [
                            guideLink("guideLink_uscis_h1b", "https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations/h-1b-program"),
                            guideLink("guideLink_dol_h1b", "https://www.dol.gov/agencies/eta/foreign-labor/programs/h-1b"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      },
                      {
                        label: "Changing employers or job location",
                        ...guideLeaf(
                          "Portability rules may allow you to start new employment after a filing is made, but timelines and notices matter—do not assume it is automatic.",
                          [
                            guideLink("guideLink_uscis_h1b_portability", "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations/portability-h-1b"),
                            guideLink("guideLink_uscis_h1b", "https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations/h-1b-program"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      },
                      {
                        label: "Layoff, termination, or grace period worries",
                        ...guideLeaf(
                          "A job loss can affect status quickly. Nonprofit attorneys can explain grace periods, change of employer filings, or other options for your facts.",
                          [
                            guideLink("guideLink_uscis_h1b", "https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations/h-1b-program"),
                            guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                          ]
                        )
                      }
                    ]
                  }
                },
                {
                  label: "TN, L-1, O-1, or similar professional visa",
                  ...guideLeaf(
                    "Each category has different employer proof, renewals, and travel risks. Compare USCIS overviews and speak with counsel before major changes.",
                    [
                      guideLink("guideLink_uscis_tn", "https://www.uscis.gov/working-in-the-united-states/temporary-workers/tn-nafta-professionals"),
                      guideLink("guideLink_uscis_l1", "https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1-nonimmigrant-intracompany-transferee/l-1a-intracompany-transferee-executive-or-manager"),
                      guideLink("guideLink_uscis_o1", "https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement"),
                      guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                    ]
                  )
                },
                {
                  label: "Seasonal agricultural or non-ag (H-2A / H-2B) or similar",
                  ...guideLeaf(
                    "Temporary labor programs depend on certified job orders and recruiters. Keep contracts, pay stubs, and housing agreements. Report labor violations to trusted advocates.",
                    [
                      guideLink("guideLink_dol_h2", "https://www.dol.gov/agencies/eta/foreign-labor/programs"),
                      guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                    ]
                  )
                },
                {
                  label: "Pending green card and need a work permit (EAD)",
                  ...guideLeaf(
                    "Some adjustment or humanitarian categories allow an Employment Authorization Document while a case is pending. Filing windows and travel rules vary.",
                    [
                      guideLink("guideLink_uscis_ead", "https://www.uscis.gov/i-765"),
                      guideLink("guideLink_uscis_adjustment", "https://www.uscis.gov/green-card/green-card-processes-and-procedures/adjustment-of-status"),
                      guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
                    ]
                  )
                },
                {
                  label: "Other work situation",
                  ...guideLeaf(
                    "If none of the above fits, a nonprofit legal consult can map your category and next filings.",
                      [guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")]
                  )
                }
              ]
            }
          },
          {
            label: "None of these — other immigrant question",
            ...guideLeaf(
              "Immigration categories range from humanitarian parole to investor visas. A short consult with a nonprofit attorney can prevent costly mistakes.",
              [guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")]
            )
          }
        ]
      }
    },
    {
      label: "Family-based green card process",
      next: {
        label: "Where is your case today?",
        options: [
          {
            label: "Petition filed; relative is still abroad",
            ...guideLeaf(
              "Most family-based paths abroad go through the National Visa Center after USCIS approves a petition. Priority dates move monthly—track the Visa Bulletin.",
              [
                guideLink("guideLink_visa_bulletin", "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"),
                guideLink("guideLink_nvc", "https://travel.state.gov/content/travel/en/us-visas/immigrate/nvc.html"),
                guideLink("guideLink_immigrant_visa", "https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/immigrant-visa-for-a-family-member-of-a-us-citizen.html"),
                guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
              ]
            )
          },
          {
            label: "Consular interview coming up",
            ...guideLeaf(
              "Gather civil documents early, review medical exam instructions, and understand public-charge and inadmissibility topics with counsel if anything is unclear.",
              [
                guideLink("guideLink_immigrant_visa", "https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/immigrant-visa-for-a-family-member-of-a-us-citizen.html"),
                guideLink("guideLink_nvc", "https://travel.state.gov/content/travel/en/us-visas/immigrate/nvc.html"),
                guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
              ]
            )
          },
          {
            label: "Living in the U.S. and adjusting status (I-485 path)",
            ...guideLeaf(
              "Adjustment bundles many forms and evidence topics—travel, work authorization, and interviews. Legal help is strongly recommended for complex histories.",
              [
                guideLink("guideLink_uscis_adjustment", "https://www.uscis.gov/green-card/green-card-processes-and-procedures/adjustment-of-status"),
                guideLink("guideLink_uscis_family", "https://www.uscis.gov/family/green-cards-family-members-of-us-citizens"),
                guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
              ]
            )
          },
          {
            label: "Still researching first steps",
            ...guideLeaf(
              "Start with who qualifies as an immediate relative vs. a family-preference category, then learn how petitions and priority dates work.",
              [
                guideLink("guideLink_uscis_family", "https://www.uscis.gov/family/green-cards-family-members-of-us-citizens"),
                guideLink("guideLink_visa_bulletin", "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"),
                guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
              ]
            )
          }
        ]
      }
    },
    {
      label: "Asylum or other humanitarian protection",
      next: {
        label: "What applies most?",
        options: [
          {
            label: "Learning how U.S. asylum works",
            ...guideLeaf(
              "Asylum law is complex and time-sensitive. USCIS publishes a high-level overview; individualized strategy belongs with qualified counsel.",
              [
                guideLink("guideLink_uscis_asylum", "https://www.uscis.gov/humanitarian/refugees-and-asylum/asylum"),
                guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
              ]
            )
          },
          {
            label: "I filed and have immigration court dates",
            ...guideLeaf(
              "Court deadlines are strict. Keep a hearing calendar, share updates with your attorney, and know how to verify your case online through EOIR.",
              [
                guideLink("guideLink_eoir", "https://www.justice.gov/eoir/eimmigration-court-hearing-information"),
                guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
              ]
            )
          },
          {
            label: "Afraid to return to my country (not sure what to file)",
            ...guideLeaf(
              "Safety planning and legal screening should happen together. Reach out to a nonprofit immigration legal services provider as soon as you can.",
              [
                guideLink("guideLink_uscis_asylum", "https://www.uscis.gov/humanitarian/refugees-and-asylum/asylum"),
                guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
              ]
            )
          }
        ]
      }
    },
    {
      label: "Visitor, tourism, or short business trip (B visa / ESTA)",
      next: {
        label: "What best describes your trip?",
        options: [
          {
            label: "Tourism or visiting friends/family",
            ...guideLeaf(
              "Carry honest, consistent documents about the purpose and length of your visit. Officers decide admissibility at the border or consulate.",
            [
              guideLink("guideLink_b_visa", "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"),
              guideLink("guideLink_esta", "https://www.cbp.gov/travel/international-visitors/esta"),
              guideLink("guideLink_cbp_travel", "https://www.cbp.gov/travel"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          },
          {
            label: "Short business meetings (not local employment)",
            ...guideLeaf(
              "B-1 permits certain business activities but not performing local labor for hire. If you are unsure, read DOS guidance and ask counsel.",
            [
              guideLink("guideLink_b_visa", "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          },
          {
            label: "Worried about denial or questioning at entry",
            ...guideLeaf(
              "CBP publishes traveler tips. If you have prior removals, overstays, or criminal history, get legal advice before traveling.",
            [
              guideLink("guideLink_cbp_travel", "https://www.cbp.gov/travel"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          }
        ]
      }
    },
    {
      label: "DACA or childhood arrivals",
      next: {
        label: "What do you need?",
        options: [
          {
            label: "Renew DACA and work authorization",
            ...guideLeaf(
              "Follow USCIS instructions for renewals carefully. Policies change—verify current filing forms, fees, and timelines on the official DACA page.",
            [
              guideLink("guideLink_uscis_daca", "https://www.uscis.gov/DACA"),
              guideLink("guideLink_nilc_daca", "https://www.nilc.org/issues/daca/"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          },
          {
            label: "First-time eligibility or policy questions",
            ...guideLeaf(
              "Community organizations track litigation and policy updates. Pair community resources with legal screening when possible.",
            [
              guideLink("guideLink_nilc_daca", "https://www.nilc.org/issues/daca/"),
              guideLink("guideLink_uscis_daca", "https://www.uscis.gov/DACA"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          }
        ]
      }
    },
    {
      label: "Lawful permanent resident (green card holder)",
      next: {
        label: "What topic fits best?",
        options: [
          {
            label: "Long international travel or re-entry worries",
            ...guideLeaf(
              "Extended trips can raise abandonment questions. Understand passport, card, and re-entry permit rules before you leave.",
            [
              guideLink("guideLink_uscis_green_card_after", "https://www.uscis.gov/green-card/after-we-grant-your-green-card/international-travel-permanent-residents"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          },
          {
            label: "Renew or replace my physical green card",
            ...guideLeaf(
              "Use USCIS instructions for renewal/replacement. Keep copies of filings and evidence of lawful status while you wait.",
            [
              guideLink("guideLink_uscis_replace_gc", "https://www.uscis.gov/green-card/how-to-renew-or-replace-my-green-card"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          },
          {
            label: "Interested in applying for U.S. citizenship",
            ...guideLeaf(
              "Naturalization has residence, good moral character, testing, and travel requirements. Start with USCIS eligibility materials.",
            [
              guideLink("guideLink_uscis_naturalize", "https://www.uscis.gov/citizenship/learn-about-citizenship/becoming-a-us-citizen-through-naturalization"),
              guideLink("guideLink_uscis_civics", "https://www.uscis.gov/citizenship/find-study-materials-and-resources/test-update"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          }
        ]
      }
    },
    {
      label: "Applying for U.S. citizenship (naturalization)",
      ...guideLeaf(
        "Review eligibility, filing addresses, biometrics, and interview expectations. Community legal programs often host workshops and clinics.",
        [
          guideLink("guideLink_uscis_naturalize", "https://www.uscis.gov/citizenship/learn-about-citizenship/becoming-a-us-citizen-through-naturalization"),
          guideLink("guideLink_uscis_civics", "https://www.uscis.gov/citizenship/find-study-materials-and-resources/test-update"),
          guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
        ]
      )
    },
    {
      label: "Victim of trafficking or certain serious crimes (T or U visa)",
      next: {
        label: "Which pathway sounds closer?",
        options: [
          {
            label: "Human trafficking concerns (possible T visa)",
            ...guideLeaf(
              "T visas have cooperation and reporting requirements. Safety planning is urgent—contact experienced advocates and attorneys.",
            [
              guideLink("guideLink_uscis_tvisa", "https://www.uscis.gov/humanitarian/victims-of-human-trafficking-and-other-crimes/t-nonimmigrant-status-t-visa"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          },
          {
            label: "Crime victim helping law enforcement (possible U visa)",
            ...guideLeaf(
              "U visas require a qualifying certification from certain officials. Timelines are long—legal help improves completeness of evidence.",
            [
              guideLink("guideLink_uscis_uvisa", "https://www.uscis.gov/humanitarian/victims-of-human-trafficking-and-other-crimes/u-nonimmigrant-status-u-visa"),
              guideLink("guideLink_advocates_dir", "https://www.immigrationadvocates.org/nonprofit/legaldirectory/")
            ]
          )
          }
        ]
      }
    }
  ]
};

const GUIDE_LABEL_ES = {
  "Which category best fits your situation?": "¿Qué categoría describe mejor su situación?",
  "Immigrant (student, worker, or other status)": "Inmigrante (estudiante, trabajador u otro estatus)",
  "What is your current profile?": "¿Cuál es su perfil actual?",
  "Student or exchange visitor": "Estudiante o visitante de intercambio",
  "Which status or program is closest?": "¿Qué estatus o programa se acerca más?",
  "F-1 academic student": "Estudiante académico F-1",
  "What is your main question right now?": "¿Cuál es su pregunta principal ahora?",
  "Travel, visa renewal, or re-entry": "Viaje, renovación de visa o reingreso",
  "CPT, OPT, internships, or on-campus work": "CPT, OPT, pasantías o empleo en el campus",
  "School transfer, reduced course load, or I-20 issues": "Cambio de escuela, carga reducida o temas del I-20",
  "Something else or I am not sure": "Otra cosa o no estoy seguro/a",
  "J-1 exchange visitor": "Visitante de intercambio J-1",
  "Does the two-year home-country physical presence rule apply to you?":
    "¿Le aplica la regla de residencia física de dos años en el país de origen?",
  "Yes, or I was told it might": "Sí, o me dijeron que podría",
  "No / not applicable": "No / no aplica",
  "I do not know": "No lo sé",
  "M-1 vocational student": "Estudiante vocacional M-1",
  "Worker or pending work authorization": "Trabajador o permiso de trabajo pendiente",
  "Which situation is closest?": "¿Qué situación se parece más?",
  "H-1B specialty occupation": "Ocupación especializada H-1B",
  "What stage are you in?": "¿En qué etapa está?",
  "First-time petition, lottery, or cap issues": "Primera petición, lotería o temas del cupo",
  "Changing employers or job location": "Cambio de empleador o lugar de trabajo",
  "Layoff, termination, or grace period worries": "Despido, terminación o periodo de gracia",
  "TN, L-1, O-1, or similar professional visa": "TN, L-1, O-1 u otra visa profesional similar",
  "Seasonal agricultural or non-ag (H-2A / H-2B) or similar":
    "Trabajo de temporada agrícola o no agrícola (H-2A/H-2B) o similar",
  "Pending green card and need a work permit (EAD)": "Residencia en trámite y necesita permiso de trabajo (EAD)",
  "Other work situation": "Otra situación laboral",
  "None of these — other immigrant question": "Ninguna de estas — otra consulta migratoria",
  "Family-based green card process": "Proceso de residencia por motivos familiares",
  "Where is your case today?": "¿En qué etapa está su caso hoy?",
  "Petition filed; relative is still abroad": "Petición presentada; el familiar sigue en el extranjero",
  "Consular interview coming up": "Próxima entrevista consular",
  "Living in the U.S. and adjusting status (I-485 path)":
    "Vive en EE. UU. y ajuste de estatus (ruta I-485)",
  "Still researching first steps": "Todavía investigando los primeros pasos",
  "Asylum or other humanitarian protection": "Asilo u otra protección humanitaria",
  "What applies most?": "¿Qué describe mejor su situación?",
  "Learning how U.S. asylum works": "Entender cómo funciona el asilo en EE. UU.",
  "I filed and have immigration court dates": "Ya presenté y tengo fechas en tribunal de inmigración",
  "Afraid to return to my country (not sure what to file)":
    "Temor a regresar a mi país (no sé qué tramitar)",
  "Visitor, tourism, or short business trip (B visa / ESTA)":
    "Visitante, turismo o viaje de negocios corto (visa B / ESTA)",
  "What best describes your trip?": "¿Qué describe mejor su viaje?",
  "Tourism or visiting friends/family": "Turismo o visitar familia o amistades",
  "Short business meetings (not local employment)": "Reuniones breves de negocios (no empleo local)",
  "Worried about denial or questioning at entry":
    "Preocupación por negación o interrogatorio al ingresar",
  "DACA or childhood arrivals": "DACA o llegada en la infancia",
  "What do you need?": "¿Qué necesita?",
  "Renew DACA and work authorization": "Renovar DACA y autorización de trabajo",
  "First-time eligibility or policy questions": "Elegibilidad por primera vez o preguntas de política",
  "Lawful permanent resident (green card holder)": "Residente permanente legal (tarjeta verde)",
  "What topic fits best?": "¿Qué tema encaja mejor?",
  "Long international travel or re-entry worries": "Viajes internacionales largos o temas de reingreso",
  "Renew or replace my physical green card": "Renovar o reemplazar mi tarjeta verde física",
  "Interested in applying for U.S. citizenship": "Interés en solicitar la ciudadanía estadounidense",
  "Applying for U.S. citizenship (naturalization)": "Solicitud de ciudadanía (naturalización)",
  "Victim of trafficking or certain serious crimes (T or U visa)":
    "Víctima de trata o delitos graves (visa T o U)",
  "Which pathway sounds closer?": "¿Qué vía se asemeja más?",
  "Human trafficking concerns (possible T visa)": "Preocupación por trata de personas (posible visa T)",
  "Crime victim helping law enforcement (possible U visa)":
    "Víctima de delito colaborando con autoridades (posible visa U)"
};

const GUIDE_RESULT_ES = {
  "Travel can affect your SEVIS record and I-20 signatures. Always coordinate with your designated school official (DSO) before international trips or visa appointments.":
    "Los viajes pueden afectar su registro SEVIS y las firmas del I-20. Coordine siempre con el oficial designado por la escuela (DSO) antes de viajes internacionales o citas de visa.",
  "Work authorization rules for students are strict. Your DSO and USCIS materials explain what counts as authorized training or employment.":
    "Las reglas de autorización de trabajo para estudiantes son estrictas. Su DSO y los materiales de USCIS explican qué cuenta como capacitación o empleo autorizado.",
  "Changes to school, program, or enrollment usually require an updated I-20 and timely reporting in SEVIS. Missteps can affect status.":
    "Los cambios de escuela, programa o inscripción suelen requerir un I-20 actualizado y reportes oportunos en SEVIS. Los errores pueden afectar el estatus.",
  "If you are unsure how a life change affects F-1 status, speak with your DSO first, then consider nonprofit legal screening for complex questions.":
    "Si no está seguro de cómo un cambio vital afecta el estatus F-1, hable primero con su DSO y luego considere una evaluación legal sin fines de lucro para preguntas complejas.",
  "The two-year rule can limit changes of status or some green-card paths until it is waived or fulfilled. Requirements are fact-specific—get individualized advice.":
    "La regla de dos años puede limitar cambios de estatus o algunas vías a la residencia hasta que se otorgue una exención o se cumpla. Los requisitos dependen de los hechos: busque asesoría individualizada.",
  "Still confirm with your program sponsor. Maintain health insurance and program rules noted on your DS-2019.":
    "Confirme aun así con el patrocinador del programa. Mantenga seguro médico y las reglas del programa indicadas en su DS-2019.",
  "Ask your J-1 sponsor which category you are in and whether any skills list or government funding triggers the two-year rule.":
    "Pregunte a su patrocinador J-1 en qué categoría está y si alguna lista de habilidades o financiamiento gubernamental activa la regla de dos años.",
  "M-1 programs are tightly tied to vocational training limits. Practical training rules differ from F-1—confirm every change with your school.":
    "Los programas M-1 están ligados a límites de capacitación vocacional. Las reglas de práctica difieren de F-1: confirme cada cambio con su escuela.",
  "H-1B has annual caps and strict employer requirements. Keep copies of LCA postings, approval notices, and pay records.":
    "El H-1B tiene cupos anuales y requisitos estrictos del empleador. Guarde copias de avisos LCA, aprobaciones y registros de pago.",
  "Portability rules may allow you to start new employment after a filing is made, but timelines and notices matter—do not assume it is automatic.":
    "Las reglas de portabilidad pueden permitir iniciar un nuevo empleo tras una presentación, pero los plazos y avisos importan: no asuma que es automático.",
  "A job loss can affect status quickly. Nonprofit attorneys can explain grace periods, change of employer filings, or other options for your facts.":
    "Perder el empleo puede afectar el estatus rápidamente. Los abogados sin fines de lucro pueden explicar periodos de gracia, cambios de empleador u otras opciones según sus hechos.",
  "Each category has different employer proof, renewals, and travel risks. Compare USCIS overviews and speak with counsel before major changes.":
    "Cada categoría tiene distintas pruebas del empleador, renovaciones y riesgos de viaje. Compare las guías de USCIS y consulte a un abogado antes de cambios importantes.",
  "Temporary labor programs depend on certified job orders and recruiters. Keep contracts, pay stubs, and housing agreements. Report labor violations to trusted advocates.":
    "Los programas de trabajo temporal dependen de órdenes de trabajo certificadas y reclutadores. Guarde contratos, comprobantes de pago y acuerdos de vivienda. Reporte abusos laborales a defensores de confianza.",
  "Some adjustment or humanitarian categories allow an Employment Authorization Document while a case is pending. Filing windows and travel rules vary.":
    "Algunas categorías de ajuste o humanitarias permiten un documento de autorización de empleo mientras el caso está pendiente. Las ventanas de presentación y reglas de viaje varían.",
  "If none of the above fits, a nonprofit legal consult can map your category and next filings.":
    "Si ninguna opción encaja, una consulta legal sin fines de lucro puede orientar su categoría y próximas presentaciones.",
  "Immigration categories range from humanitarian parole to investor visas. A short consult with a nonprofit attorney can prevent costly mistakes.":
    "Las categorías migratorias van del parole humanitario a visas de inversionista. Una consulta breve con un abogado sin fines de lucro puede evitar errores costosos.",
  "Most family-based paths abroad go through the National Visa Center after USCIS approves a petition. Priority dates move monthly—track the Visa Bulletin.":
    "La mayoría de las vías familiares en el extranjero pasan por el Centro Nacional de Visas tras la aprobación de USCIS. Las fechas de prioridad cambian cada mes: siga el Boletín de Visas.",
  "Gather civil documents early, review medical exam instructions, and understand public-charge and inadmissibility topics with counsel if anything is unclear.":
    "Reúna documentos civiles con anticipación, revise instrucciones del examen médico y aclare temas de carga pública e inadmisibilidad con un abogado si algo no está claro.",
  "Adjustment bundles many forms and evidence topics—travel, work authorization, and interviews. Legal help is strongly recommended for complex histories.":
    "El ajuste agrupa muchos formularios y pruebas—viaje, permiso de trabajo y entrevistas. Se recomienda encarecidamente ayuda legal para historiales complejos.",
  "Start with who qualifies as an immediate relative vs. a family-preference category, then learn how petitions and priority dates work.":
    "Comience viendo quién califica como familiar inmediato frente a categoría de preferencia familiar, y luego cómo funcionan las peticiones y las fechas de prioridad.",
  "Asylum law is complex and time-sensitive. USCIS publishes a high-level overview; individualized strategy belongs with qualified counsel.":
    "El asilo es complejo y sensible al tiempo. USCIS publica una visión general; la estrategia personalizada corresponde a un abogado calificado.",
  "Court deadlines are strict. Keep a hearing calendar, share updates with your attorney, and know how to verify your case online through EOIR.":
    "Los plazos en tribunal son estrictos. Lleve un calendario de audiencias, informe a su abogado y sepa cómo verificar su caso en línea con EOIR.",
  "Safety planning and legal screening should happen together. Reach out to a nonprofit immigration legal services provider as soon as you can.":
    "La planificación de seguridad y la evaluación legal deben ir juntas. Contacte lo antes posible a un proveedor sin fines de lucro de servicios legales de inmigración.",
  "Carry honest, consistent documents about the purpose and length of your visit. Officers decide admissibility at the border or consulate.":
    "Lleve documentos honestos y coherentes sobre el propósito y la duración de la visita. Los oficiales deciden la admisibilidad en la frontera o el consulado.",
  "B-1 permits certain business activities but not performing local labor for hire. If you are unsure, read DOS guidance and ask counsel.":
    "B-1 permite ciertas actividades de negocios, no desempeñar trabajo local remunerado. Si duda, lea la guía del Departamento de Estado y consulte.",
  "CBP publishes traveler tips. If you have prior removals, overstays, or criminal history, get legal advice before traveling.":
    "CBP publica consejos para viajeros. Si tiene expulsiones previas, estadías vencidas o antecedentes penales, busque asesoría legal antes de viajar.",
  "Follow USCIS instructions for renewals carefully. Policies change—verify current filing forms, fees, and timelines on the official DACA page.":
    "Siga con cuidado las instrucciones de USCIS para renovaciones. Las políticas cambian: verifique formularios, tarifas y plazos vigentes en la página oficial de DACA.",
  "Community organizations track litigation and policy updates. Pair community resources with legal screening when possible.":
    "Las organizaciones comunitarias siguen litigios y cambios de política. Combine recursos comunitarios con evaluación legal cuando sea posible.",
  "Extended trips can raise abandonment questions. Understand passport, card, and re-entry permit rules before you leave.":
    "Estancias prolongadas pueden plantear abandono de residencia. Entienda reglas de pasaporte, tarjeta y permiso de reingreso antes de salir.",
  "Use USCIS instructions for renewal/replacement. Keep copies of filings and evidence of lawful status while you wait.":
    "Use las instrucciones de USCIS para renovación o reemplazo. Guarde copias de lo presentado y prueba de estatus legal mientras espera.",
  "Naturalization has residence, good moral character, testing, and travel requirements. Start with USCIS eligibility materials.":
    "La naturalización tiene requisitos de residencia, buen carácter moral, examen y viajes. Comience con los materiales de elegibilidad de USCIS.",
  "Review eligibility, filing addresses, biometrics, and interview expectations. Community legal programs often host workshops and clinics.":
    "Revise elegibilidad, direcciones de envío, biometría y qué esperar en la entrevista. Los programas legales comunitarios suelen ofrecer talleres y clínicas.",
  "T visas have cooperation and reporting requirements. Safety planning is urgent—contact experienced advocates and attorneys.":
    "Las visas T tienen requisitos de cooperación e informes. La seguridad es urgente: contacte defensores y abogados con experiencia.",
  "U visas require a qualifying certification from certain officials. Timelines are long—legal help improves completeness of evidence.":
    "Las visas U requieren certificación calificada de ciertos funcionarios. Los tiempos son largos: la ayuda legal mejora la evidencia presentada."
};

function localizeGuideTree(node) {
  if (!node || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map(localizeGuideTree);
  const out = { ...node };
  if (out.label) out.label = GUIDE_LABEL_ES[out.label] || out.label;
  if (out.result != null) {
    if (typeof out.result === "string") {
      out.result = GUIDE_RESULT_ES[out.result] || out.result;
    } else if (typeof out.result === "object") {
      out.result = {
        ...out.result,
        text: GUIDE_RESULT_ES[out.result.text] || out.result.text
      };
    }
  }
  if (out.options) out.options = out.options.map(localizeGuideTree);
  if (out.next) out.next = localizeGuideTree(out.next);
  return out;
}

const stateSelect = document.getElementById("stateSelect");
const stateLink = document.getElementById("stateLink");
const guideContainer = document.getElementById("guideContainer");
const resetGuideBtn = document.getElementById("resetGuideBtn");
const themeSelect = document.getElementById("themeSelect");
const langEnBtn = document.getElementById("langEn");
const langEsBtn = document.getElementById("langEs");

let currentLang = localStorage.getItem(LANG_KEY) === "es" ? "es" : "en";
let stateLookupReady = false;

function t(key) {
  return STRINGS[currentLang][key] ?? STRINGS.en[key] ?? key;
}

function getJourneyTree() {
  if (currentLang !== "es") return journeyTreeEn;
  return localizeGuideTree(JSON.parse(JSON.stringify(journeyTreeEn)));
}

function highlightNav() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  let file = "index.html";
  if (parts.length) {
    const last = parts[parts.length - 1];
    if (last.endsWith(".html")) file = last;
  }

  document.querySelectorAll(".nav-list a[href]").forEach((a) => {
    const href = a.getAttribute("href").replace(/^\.\//, "");
    const match = href === file || (href === "index.html" && file === "index.html");
    if (match) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

function applyI18n() {
  document.documentElement.lang = currentLang === "es" ? "es" : "en";

  const titleKey = document.body.getAttribute("data-title-key");
  if (titleKey && STRINGS[currentLang][titleKey]) {
    document.title = STRINGS[currentLang][titleKey];
  } else {
    document.title = t("welcomePageTitle");
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && STRINGS[currentLang][key] !== undefined) {
      el.textContent = STRINGS[currentLang][key];
    }
  });

  if (stateSelect) {
    const firstOpt = stateSelect.querySelector("option[value='']");
    if (firstOpt) firstOpt.textContent = t("statePlaceholder");
  }

  syncStateLinkText();
  highlightNav();
}

function currentThemeId() {
  const fromBody = document.body.dataset.theme;
  if (THEME_IDS.includes(fromBody)) return fromBody;
  const saved = localStorage.getItem(THEME_KEY);
  if (THEME_IDS.includes(saved)) return saved;
  return "usa";
}

function populateThemeSelect() {
  if (!themeSelect) return;
  const id = currentThemeId();
  themeSelect.innerHTML = "";
  const labels = STRINGS[currentLang].themeLabels;
  THEME_IDS.forEach((tid) => {
    const opt = document.createElement("option");
    opt.value = tid;
    opt.textContent = labels[tid] || tid;
    themeSelect.appendChild(opt);
  });
  themeSelect.value = id;
}

function syncStateLinkText() {
  if (!stateSelect || !stateLink) return;
  const selectedState = stateSelect.value;
  const link = legalResourcesByState[selectedState];
  if (!link) {
    stateLink.href = "#";
    stateLink.textContent = t("stateLinkIdle");
    stateLink.setAttribute("aria-disabled", "true");
    return;
  }
  stateLink.href = link;
  stateLink.textContent = t("stateLinkOpen").replace("{{state}}", selectedState);
  stateLink.setAttribute("aria-disabled", "false");
}

function setupStateLookup() {
  if (!stateSelect || stateLookupReady) return;
  const states = Object.keys(legalResourcesByState).sort();
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });
  stateSelect.addEventListener("change", syncStateLinkText);
  stateLookupReady = true;
  syncStateLinkText();
}

function renderStep(node, trail = []) {
  if (!guideContainer) return;
  guideContainer.innerHTML = "";
  trail.forEach((step) => {
    guideContainer.appendChild(step);
  });

  const stepEl = document.createElement("div");
  stepEl.className = "guide-step";

  const question = document.createElement("p");
  question.textContent = node.label;
  stepEl.appendChild(question);

  if (node.result != null && node.result !== "") {
    const result = document.createElement("div");
    result.className = "result";
    const payload = node.result;
    const bodyText = typeof payload === "string" ? payload : payload.text;
    const para = document.createElement("p");
    para.textContent = bodyText;
    result.appendChild(para);
    const links = typeof payload === "object" && payload.links ? payload.links : [];
    if (links.length > 0) {
      const linkTitle = document.createElement("p");
      linkTitle.className = "result-links-title";
      linkTitle.textContent = t("guideResourcesHeading");
      result.appendChild(linkTitle);
      const ul = document.createElement("ul");
      ul.className = "result-links";
      links.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = t(item.labelKey);
        li.appendChild(a);
        ul.appendChild(li);
      });
      result.appendChild(ul);
    }
    stepEl.appendChild(result);
    guideContainer.appendChild(stepEl);
    return;
  }

  const optionsWrap = document.createElement("div");
  optionsWrap.className = "options";

  node.options.forEach((optionNode) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = optionNode.label;
    btn.addEventListener("click", () => {
      const completedStep = document.createElement("div");
      completedStep.className = "guide-step";
      const completedQuestion = document.createElement("p");
      completedQuestion.textContent = node.label;
      completedStep.appendChild(completedQuestion);
      const selected = document.createElement("p");
      const selectedLabel = t("selectedLabel");
      selected.innerHTML = `<strong>${selectedLabel}</strong> ${optionNode.label}`;
      completedStep.appendChild(selected);
      renderStep(optionNode.next || optionNode, [...trail, completedStep]);
    });
    optionsWrap.appendChild(btn);
  });

  stepEl.appendChild(optionsWrap);
  guideContainer.appendChild(stepEl);
}

function setLang(lang) {
  currentLang = lang === "es" ? "es" : "en";
  localStorage.setItem(LANG_KEY, currentLang);
  if (langEnBtn && langEsBtn) {
    langEnBtn.classList.toggle("is-active", currentLang === "en");
    langEsBtn.classList.toggle("is-active", currentLang === "es");
    langEnBtn.setAttribute("aria-pressed", currentLang === "en" ? "true" : "false");
    langEsBtn.setAttribute("aria-pressed", currentLang === "es" ? "true" : "false");
  }
  applyI18n();
  populateThemeSelect();
  if (guideContainer) {
    renderStep(getJourneyTree());
  }
  if (document.body.dataset.page === "quiz") {
    refreshCivicsQuizLanguage();
  }
}

function setTheme(themeId) {
  const id = THEME_IDS.includes(themeId) ? themeId : "usa";
  document.body.dataset.theme = id;
  localStorage.setItem(THEME_KEY, id);
  if (themeSelect && themeSelect.options.length) {
    themeSelect.value = id;
  }
}

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    setTheme(themeSelect.value);
  });
}

if (langEnBtn) langEnBtn.addEventListener("click", () => setLang("en"));
if (langEsBtn) langEsBtn.addEventListener("click", () => setLang("es"));

if (resetGuideBtn) {
  resetGuideBtn.addEventListener("click", () => renderStep(getJourneyTree()));
}

setupStateLookup();

const savedTheme = localStorage.getItem(THEME_KEY);
setTheme(THEME_IDS.includes(savedTheme) ? savedTheme : "usa");
populateThemeSelect();

if (currentLang === "es" && langEnBtn && langEsBtn) {
  langEnBtn.classList.remove("is-active");
  langEsBtn.classList.add("is-active");
  langEnBtn.setAttribute("aria-pressed", "false");
  langEsBtn.setAttribute("aria-pressed", "true");
}

applyI18n();

if (guideContainer) {
  renderStep(getJourneyTree());
}

mountCivicsQuiz();
