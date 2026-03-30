import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'en' | 'bg'

interface LanguageContextType {
  lang: Lang
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.howItWorks': { en: 'How It Works', bg: 'Как работи' },
  'nav.modules': { en: 'Modules', bg: 'Модули' },
  'nav.uxTrust': { en: 'UX & Trust', bg: 'UX & Доверие' },
  'nav.faq': { en: 'FAQ', bg: 'ЧЗВ' },
  'nav.aboutUs': { en: 'About Us', bg: 'За нас' },
  'nav.home': { en: 'Home', bg: 'Начало' },

  // Hero
  'hero.title1': { en: 'Financial literacy', bg: 'Финансова грамотност' },
  'hero.title2': { en: 'as an epic quest.', bg: 'като епично приключение.' },
  'hero.subtitle': { en: 'Learn. Play. Build lasting financial habits.', bg: 'Учи. Играй. Изгради трайни финансови навици.' },
  'hero.cta': { en: 'Launch the App', bg: 'Стартирай приложението' },
  'hero.howItWorks': { en: 'See How It Works', bg: 'Виж как работи' },
  'hero.scroll': { en: 'Scroll', bg: 'Скролни' },

  // About section
  'about.badge': { en: 'Strategic analysis of gamification for financial education', bg: 'Стратегически анализ на геймификацията за финансово образование' },
  'about.title1': { en: 'Where RPG simulation meets ', bg: 'Където RPG симулацията среща ' },
  'about.title2': { en: 'real-world finance.', bg: 'реалните финанси.' },
  'about.desc': { en: 'Octolio combines RPG simulation (inspired by Cashflow) with psychology-driven gamification: autonomy, competence, and relatedness. The goal isn\'t "a game for points" — it\'s lasting financial habits.', bg: 'Octolio съчетава RPG симулация (вдъхновена от Cashflow) с геймификация, базирана на психология: автономия, компетентност и свързаност. Целта не е "игра за точки" — а трайни финансови навици.' },
  'about.stat1': { en: 'micro-lesson sessions', bg: 'микро-урочни сесии' },
  'about.stat2': { en: 'learning on demand', bg: 'учене при нужда' },
  'about.stat3': { en: 'logic-based scenarios', bg: 'логически сценарии' },
  'about.commandCenter': { en: 'Command Center', bg: 'Команден център' },
  'about.northStar': { en: 'North Star: "Buy a Home"', bg: 'Цел: "Купи дом"' },
  'about.readiness': { en: 'Financial Readiness: 72%', bg: 'Финансова готовност: 72%' },
  'about.dailyQuest': { en: 'Daily Quest #1', bg: 'Дневна мисия #1' },
  'about.dailyQuestDesc': { en: 'Identify the interest in "compound interest"', bg: 'Идентифицирай лихвата при "сложна лихва"' },
  'about.done': { en: 'Done', bg: 'Готово' },
  'about.nextMission': { en: 'Next Mission', bg: 'Следваща мисия' },
  'about.chooseAvalanche': { en: 'Choose "Avalanche"', bg: 'Избери "Лавина"' },
  'about.fasterDebt': { en: 'for faster debt clearance', bg: 'за по-бързо изчистване на дълг' },
  'about.tip': { en: 'Tip', bg: 'Съвет' },
  'about.jitLesson': { en: 'Just-in-Time Lesson', bg: 'Урок в точния момент' },
  'about.riskMatters': { en: 'where risk matters most', bg: 'където рискът е най-важен' },
  'about.whyWorks': { en: 'Why This Works', bg: 'Защо работи' },
  'about.whyWorksDesc': { en: 'When progress is visible instantly, competence grows, autonomy remains your choice, and the community keeps you motivated.', bg: 'Когато прогресът е видим незабавно, компетентността расте, автономията остава твой избор, а общността те мотивира.' },

  // Features
  'features.eyebrow': { en: 'Octolio in 60 Seconds', bg: 'Octolio за 60 секунди' },
  'features.title': { en: 'A learning system that builds habits', bg: 'Система за учене, която изгражда навици' },
  'features.desc': { en: 'Not just "read and memorize" — practice decisions in a simulation, see the consequences, and get a lesson in the moment.', bg: 'Не просто "четене и запаметяване" — практикувай решения в симулация, виж последствията и получи урок в момента.' },
  'features.f1.title': { en: 'Psychology, Not Points', bg: 'Психология, не точки' },
  'features.f1.desc': { en: 'Gamification driven by self-determination: autonomy, competence, and relatedness — with feedback at the right moment.', bg: 'Геймификация, водена от самоопределение: автономия, компетентност и свързаност — с обратна връзка в точния момент.' },
  'features.f2.title': { en: 'Instant Reward', bg: 'Мигновена награда' },
  'features.f2.desc': { en: 'Progress is visible immediately: visual cues for your actions and learning that kicks in when you need it.', bg: 'Прогресът е видим веднага: визуални подсказки за действията ти и учене, което се включва, когато е нужно.' },
  'features.f3.title': { en: 'Scaffolding Complexity', bg: 'Стъпаловидна сложност' },
  'features.f3.desc': { en: 'We break financial concepts into small, achievable goals that build toward "financial freedom."', bg: 'Разбиваме финансовите концепции на малки, постижими цели, които водят към "финансова свобода."' },
  'features.f4.title': { en: 'Goal-Based Community', bg: 'Общност, базирана на цели' },
  'features.f4.desc': { en: 'Guilds and cooperative missions that motivate without creating toxic comparison.', bg: 'Гилдии и кооперативни мисии, които мотивират без токсично сравнение.' },
  'features.f5.title': { en: 'Simulation With Purpose', bg: 'Симулация с цел' },
  'features.f5.desc': { en: 'We demonstrate the impact of decisions (like interest, debt, and cash flow) through interactive scenarios.', bg: 'Демонстрираме въздействието на решенията (като лихва, дълг и паричен поток) чрез интерактивни сценарии.' },
  'features.f6.title': { en: 'Trust & Security', bg: 'Доверие и сигурност' },
  'features.f6.desc': { en: 'Designed with transparency: clear messaging, accessibility, and UX that respects the seriousness of finance.', bg: 'Проектирано с прозрачност: ясни съобщения, достъпност и UX, който уважава сериозността на финансите.' },

  // How it works
  'hiw.eyebrow': { en: 'Core Loop', bg: 'Основен цикъл' },
  'hiw.title': { en: 'How a mission unfolds', bg: 'Как се развива една мисия' },
  'hiw.desc': { en: 'Example flow: from onboarding to simulation, academy, and social support.', bg: 'Пример: от въвеждане до симулация, академия и социална подкрепа.' },
  'hiw.s1.title': { en: 'Onboarding & Digital Twin', bg: 'Въвеждане и дигитален двойник' },
  'hiw.s1.desc': { en: 'A short assessment determines your starting level and adjusts simulation difficulty.', bg: 'Кратка оценка определя началното ти ниво и настройва трудността на симулацията.' },
  'hiw.s2.title': { en: 'Command Center', bg: 'Команден център' },
  'hiw.s2.desc': { en: 'Daily quests + a Health Bar tracking progress toward your financial well-being.', bg: 'Дневни мисии + лента на здравето, следяща прогреса към финансовото ти благополучие.' },
  'hiw.s3.title': { en: 'Simulation Arena', bg: 'Симулационна арена' },
  'hiw.s3.desc': { en: 'Virtual time, drag-and-drop budgeting, and life decisions with realistic consequences.', bg: 'Виртуално време, бюджетиране с плъзгане и пускане и житейски решения с реалистични последствия.' },
  'hiw.s4.title': { en: 'Academy: Just-in-Time', bg: 'Академия: точно навреме' },
  'hiw.s4.desc': { en: 'When the game challenges you, it instantly shows a lesson that solves the specific problem.', bg: 'Когато играта те предизвика, тя мигновено показва урок, който решава конкретния проблем.' },
  'hiw.s5.title': { en: 'Social Hub', bg: 'Социален център' },
  'hiw.s5.desc': { en: 'Guilds that train habits together — with challenges oriented toward sustainable progress.', bg: 'Гилдии, които тренират навици заедно — с предизвикателства, ориентирани към устойчив прогрес.' },

  // Modules
  'mod.eyebrow': { en: 'Academy Modules', bg: 'Модули на академията' },
  'mod.title': { en: 'Curriculum as a knowledge map', bg: 'Учебна програма като карта на знанието' },
  'mod.desc': { en: 'Six "worlds" from basics to financial freedom. Each module is tied to a specific simulation mechanic.', bg: 'Шест "свята" от основите до финансовата свобода. Всеки модул е свързан с конкретна симулационна механика.' },
  'mod.mechanic': { en: 'Mechanic', bg: 'Механика' },
  'mod.m1.title': { en: '1. Survival Basics', bg: '1. Основи за оцеляване' },
  'mod.m1.mechanic': { en: '30-Day Detox', bg: '30-дневен детокс' },
  'mod.m1.desc': { en: 'Income/expenses, needs vs. wants, and emergency fund.', bg: 'Приходи/разходи, нужди vs. желания и спешен фонд.' },
  'mod.m2.title': { en: '2. Debt Slayer', bg: '2. Убиец на дългове' },
  'mod.m2.mechanic': { en: 'Avalanche vs. Snowball', bg: 'Лавина vs. Снежна топка' },
  'mod.m2.desc': { en: 'Types of debt, interest rates, and exit strategies.', bg: 'Видове дългове, лихвени проценти и стратегии за излизане.' },
  'mod.m3.title': { en: '3. Budgeting & Planning', bg: '3. Бюджетиране и планиране' },
  'mod.m3.mechanic': { en: 'Build Your Budget', bg: 'Изгради бюджета си' },
  'mod.m3.desc': { en: '50/30/20 rule, cash flow forecasting, and scenarios.', bg: 'Правило 50/30/20, прогнозиране на паричния поток и сценарии.' },
  'mod.m4.title': { en: '4. Investing 101', bg: '4. Инвестиране 101' },
  'mod.m4.mechanic': { en: 'Training Portfolio', bg: 'Тренировъчно портфолио' },
  'mod.m4.desc': { en: 'Risk, return, and compound interest without real market risk.', bg: 'Риск, възвращаемост и сложна лихва без реален пазарен риск.' },
  'mod.m5.title': { en: '5. Protection & Security', bg: '5. Защита и сигурност' },
  'mod.m5.mechanic': { en: 'Scenario Quests', bg: 'Сценарийни мисии' },
  'mod.m5.desc': { en: 'Scam detection, insurance, and cyber hygiene.', bg: 'Разпознаване на измами, застраховки и кибер хигиена.' },
  'mod.m6.title': { en: '6. Financial Freedom', bg: '6. Финансова свобода' },
  'mod.m6.mechanic': { en: 'Fast Track Mode', bg: 'Бърз режим' },
  'mod.m6.desc': { en: 'Passive income, FIRE, tax planning, and real estate.', bg: 'Пасивен доход, FIRE, данъчно планиране и недвижими имоти.' },

  // Trust
  'trust.eyebrow': { en: 'UX & Trust', bg: 'UX & Доверие' },
  'trust.title': { en: 'Playing seriously', bg: 'Играем сериозно' },
  'trust.desc': { en: 'Financial topics demand transparency and respect. That\'s why the gamification is subtle: it encourages without manipulating.', bg: 'Финансовите теми изискват прозрачност и уважение. Затова геймификацията е деликатна: насърчава без да манипулира.' },
  'trust.archTitle': { en: 'Trust Architecture', bg: 'Архитектура на доверието' },
  'trust.archDesc': { en: 'Instead of dark patterns, Octolio uses clear messaging, unobtrusive security indicators, and progressive disclosure of details.', bg: 'Вместо тъмни модели, Octolio използва ясни съобщения, ненатрапчиви индикатори за сигурност и постепенно разкриване на детайли.' },
  'trust.progressive': { en: 'Progressive Disclosure', bg: 'Постепенно разкриване' },
  'trust.progressiveDesc': { en: 'Dashboard overview + details in 1–2 clicks.', bg: 'Преглед на таблото + детайли в 1–2 клика.' },
  'trust.accessibility': { en: 'Accessibility', bg: 'Достъпност' },
  'trust.accessibilityDesc': { en: 'Sufficient contrast, clear focus states, and comfortable navigation.', bg: 'Достатъчен контраст, ясни фокус състояния и удобна навигация.' },
  'trust.ethicalTitle': { en: 'Ethical Gamification', bg: 'Етична геймификация' },
  'trust.ethicalDesc': { en: 'Confetti and visual rewards are the "frame" for progress, but behavior is directed toward sustainable decisions.', bg: 'Конфети и визуални награди са "рамката" за прогрес, но поведението е насочено към устойчиви решения.' },
  'trust.reward': { en: 'Reward', bg: 'Награда' },
  'trust.rightMove': { en: 'for the right move', bg: 'за правилния ход' },
  'trust.lesson': { en: 'Lesson', bg: 'Урок' },
  'trust.rightMoment': { en: 'at the right moment', bg: 'в точния момент' },
  'trust.ctaTitle': { en: 'Call to Action', bg: 'Призив за действие' },
  'trust.ctaDesc': { en: 'Want to see a prototype? Click "Explore Demo Vision" and browse the modules below.', bg: 'Искаш да видиш прототип? Кликни "Разгледай демо визията" и прегледай модулите по-долу.' },
  'trust.goToModules': { en: 'Go to Modules', bg: 'Към модулите' },

  // FAQ
  'faq.eyebrow': { en: 'FAQ', bg: 'ЧЗВ' },
  'faq.title': { en: 'Frequently Asked Questions', bg: 'Често задавани въпроси' },
  'faq.desc': { en: 'Quick answers about the approach, simulations, and what you gain after training.', bg: 'Бързи отговори за подхода, симулациите и какво получаваш след обучението.' },
  'faq.q1': { en: 'Are points and leaderboards the core?', bg: 'Точките и класациите основното ли са?' },
  'faq.a1': { en: 'No. Points are just visual indicators of progress. The core is motivation (autonomy/competence/relatedness) and learning that guides you to make better decisions.', bg: 'Не. Точките са само визуални индикатори на прогреса. Основното е мотивацията (автономия/компетентност/свързаност) и ученето, което те насочва към по-добри решения.' },
  'faq.q2': { en: 'Is this a gambling game?', bg: 'Това хазартна игра ли е?' },
  'faq.a2': { en: 'The simulations are educational: outcomes follow the logic of your decisions (risk/return/resources), not RNG that punishes or randomly rewards.', bg: 'Симулациите са образователни: резултатите следват логиката на решенията ти (риск/възвращаемост/ресурси), а не случаен генератор, който наказва или награждава произволно.' },
  'faq.q3': { en: 'How much time do I need?', bg: 'Колко време ми трябва?' },
  'faq.a3': { en: 'Designed for micro-lessons and sessions of about 5–10 minutes. Every session ends with concrete progress and a clear next step.', bg: 'Проектирано за микро-уроци и сесии от около 5–10 минути. Всяка сесия завършва с конкретен прогрес и ясна следваща стъпка.' },
  'faq.q4': { en: 'Is it accessible and respectful?', bg: 'Достъпно и уважително ли е?' },
  'faq.a4': { en: 'Yes. Trust means clear messaging, accessible interfaces, and UX without dark patterns. We aim for a serious yet engaging design.', bg: 'Да. Доверие означава ясни съобщения, достъпни интерфейси и UX без тъмни модели. Целим сериозен, но ангажиращ дизайн.' },
  'faq.q5': { en: 'What do I actually get after training?', bg: 'Какво реално получавам след обучението?' },
  'faq.a5': { en: 'Not just knowledge, but habits: better budgeting, sustainable decisions, and progress toward financial goals — measurable through a Financial Wellness Score.', bg: 'Не просто знания, а навици: по-добро бюджетиране, устойчиви решения и прогрес към финансови цели — измерими чрез Финансов Уелнес Рейтинг.' },

  // CTA
  'cta.eyebrow': { en: 'Octolio • Early Vision', bg: 'Octolio • Ранна визия' },
  'cta.title': { en: 'Be the first to see the quest in action.', bg: 'Бъди първият, който вижда мисията в действие.' },
  'cta.desc': { en: 'Leave your email to get prototype access and updates. (This form is a demo.)', bg: 'Остави имейла си за достъп до прототип и новини. (Този формуляр е демо.)' },
  'cta.email': { en: 'Email', bg: 'Имейл' },
  'cta.placeholder': { en: 'name@example.com', bg: 'име@пример.com' },
  'cta.submit': { en: 'Sign Me Up for Prototype', bg: 'Запиши ме за прототипа' },
  'cta.disclaimer': { en: 'By clicking "Sign Me Up," you acknowledge this is a demonstration landing page.', bg: 'С натискане на "Запиши ме" потвърждаваш, че това е демонстрационна страница.' },
  'cta.thanks': { en: 'Thank you! This is a demo form for the landing page.', bg: 'Благодаря! Това е демо формуляр за лендинг страницата.' },

  // Footer
  'footer.desc': { en: 'Financial literacy turned into practice through RPG-inspired gamification.', bg: 'Финансова грамотност, превърната в практика чрез RPG-вдъхновена геймификация.' },
  'footer.contact': { en: 'Contact', bg: 'Контакти' },
  'footer.copy': { en: 'Demo landing page.', bg: 'Демо лендинг страница.' },

  // About page
  'aboutPage.badge': { en: 'Our Story', bg: 'Нашата история' },
  'aboutPage.title1': { en: 'Building the future of', bg: 'Изграждаме бъдещето на' },
  'aboutPage.title2': { en: 'financial education.', bg: 'финансовото образование.' },
  'aboutPage.subtitle': { en: 'We believe everyone deserves the tools to make smart financial decisions — and that learning shouldn\'t feel like a chore.', bg: 'Вярваме, че всеки заслужава инструментите за вземане на умни финансови решения — и че ученето не трябва да е задължение.' },
  'aboutPage.teamMembers': { en: 'Team Members', bg: 'Членове на екипа' },
  'aboutPage.learningModules': { en: 'Learning Modules', bg: 'Учебни модули' },
  'aboutPage.sharedMission': { en: 'Shared Mission', bg: 'Обща мисия' },
  'aboutPage.howStarted': { en: 'How It Started', bg: 'Как започна' },
  'aboutPage.originTitle': { en: 'From a school idea to a mission.', bg: 'От училищна идея до мисия.' },
  'aboutPage.problemTitle': { en: 'The Problem We Saw', bg: 'Проблемът, който видяхме' },
  'aboutPage.problemDesc': { en: 'In 2024, five students from the same school — each with different interests in design, engineering, psychology, and finance — kept running into the same wall: despite years of education, none of them felt truly prepared to handle money. Budgeting, saving, investing, insurance — the real-world financial skills that matter most were never taught in any classroom. So they decided to do something about it.', bg: 'През 2024 г. пет ученици от едно и също училище — всеки с различни интереси в дизайна, инженерството, психологията и финансите — продължаваха да се сблъскват с една и съща стена: въпреки годините образование, никой от тях не се чувстваше наистина подготвен да управлява пари. Бюджетиране, спестяване, инвестиране, застраховане — реалните финансови умения, които са най-важни, никога не бяха преподавани в класната стая. Затова решиха да направят нещо по въпроса.' },
  'aboutPage.sparkTitle': { en: 'The Spark 💡', bg: 'Искрата 💡' },
  'aboutPage.sparkDesc': { en: 'During a late-night gaming session, one of us said: "Why can\'t learning about money feel like this — like a quest where every decision matters and you actually see the consequences?" That question became the seed of Octolio. We realized that the problem wasn\'t a lack of information — it was a lack of engagement. Financial education was boring, abstract, and disconnected from real life. What if we could change that by combining RPG mechanics with behavioral psychology?', bg: 'По време на късна гейминг сесия, един от нас каза: "Защо ученето за пари не може да се усеща ето така — като мисия, в която всяко решение има значение и наистина виждаш последствията?" Този въпрос се превърна в семето на Octolio. Осъзнахме, че проблемът не е липсата на информация — а липсата на ангажираност. Финансовото образование беше скучно, абстрактно и откъснато от реалния живот. Какво ако можехме да променим това, комбинирайки RPG механики с поведенческа психология?' },
  'aboutPage.missionTitle': { en: 'The Mission 🎯', bg: 'Мисията 🎯' },
  'aboutPage.missionDesc': { en: 'Octolio was born from a simple belief: financial literacy should be a practice, not a lecture. We set out to build a platform where users learn by doing — making simulated financial decisions, seeing their consequences unfold in real-time, and receiving just-in-time lessons exactly when they need them. No dark patterns, no gambling mechanics, no toxic competition. Just meaningful progress toward real financial confidence.', bg: 'Octolio се роди от просто убеждение: финансовата грамотност трябва да е практика, а не лекция. Заехме се да изградим платформа, в която потребителите учат чрез правене — вземайки симулирани финансови решения, виждайки последствията им в реално време и получавайки уроци точно когато са им нужни. Без тъмни модели, без хазартни механики, без токсична конкуренция. Само смислен прогрес към реална финансова увереност.' },
  'aboutPage.nowTitle': { en: 'Where We Are Now 🚀', bg: 'Къде сме сега 🚀' },
  'aboutPage.nowDesc': { en: 'Today, Octolio is an early-stage vision — a demo of what financial education could look like when it\'s built with respect for the learner. We\'re refining our curriculum, testing simulation mechanics, and building toward a platform that helps people go from "financially anxious" to "financially confident," one quest at a time.', bg: 'Днес Octolio е визия в ранен етап — демо на това как може да изглежда финансовото образование, когато е изградено с уважение към обучаемия. Усъвършенстваме учебната програма, тестваме симулационни механики и изграждаме платформа, която помага на хората да преминат от "финансово тревожни" към "финансово уверени," една мисия наведнъж.' },
  'aboutPage.teamEyebrow': { en: 'The Team', bg: 'Екипът' },
  'aboutPage.teamTitle': { en: 'The people behind the quest.', bg: 'Хората зад мисията.' },
  'aboutPage.teamDesc': { en: 'A multidisciplinary team united by one goal: making financial literacy accessible, engaging, and lasting.', bg: 'Мултидисциплинарен екип, обединен от една цел: финансовата грамотност да е достъпна, ангажираща и трайна.' },
  'aboutPage.ctaTitle': { en: 'Ready to start your quest?', bg: 'Готов ли си да започнеш куеста?' },
  'aboutPage.ctaDesc': { en: 'Join us in reimagining how the world learns about money.', bg: 'Присъедини се в преосмислянето на начина, по който светът учи за парите.' },
  'aboutPage.backHome': { en: 'Back to Home', bg: 'Обратно към началото' },

  // Team roles
  'team.bh.role': { en: 'Co-Founder & Lead Designer', bg: 'Съосновател и водещ дизайнер' },
  'team.bh.bio': { en: 'Passionate about making complex financial concepts approachable through thoughtful design and gamification.', bg: 'Страстен към превръщането на сложните финансови концепции в достъпни чрез внимателен дизайн и геймификация.' },
  'team.kn.role': { en: 'Co-Founder & Lead Developer', bg: 'Съосновател и водещ разработчик' },
  'team.kn.bio': { en: 'Full-stack engineer obsessed with building systems that teach through experience, not lectures.', bg: 'Full-stack инженер, обсебен от изграждането на системи, които учат чрез опит, а не лекции.' },
  'team.nn.role': { en: 'Product Strategist', bg: 'Продуктов стратег' },
  'team.nn.bio': { en: 'Bridges the gap between behavioral psychology and product design to create experiences that stick.', bg: 'Свързва поведенческата психология с продуктовия дизайн, за да създава запомнящи се преживявания.' },
  'team.ns.role': { en: 'Content & Curriculum Lead', bg: 'Ръководител на съдържание и учебна програма' },
  'team.ns.bio': { en: 'Designs the learning paths and ensures every lesson drives real-world impact.', bg: 'Проектира учебните пътеки и гарантира, че всеки урок има реално въздействие.' },
  'team.sk.role': { en: 'Engineering & Infrastructure', bg: 'Инженерство и инфраструктура' },
  'team.sk.bio': { en: 'Builds the simulation engine and data pipelines that power adaptive learning across the platform.', bg: 'Изгражда симулационния двигател и данните, които захранват адаптивното учене в платформата.' },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang((l) => (l === 'en' ? 'bg' : 'en'))
  const t = (key: string) => translations[key]?.[lang] ?? key

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
