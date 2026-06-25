/* ============================================================
   data.js — Contenido del portfolio + i18n (ES·EN·DE·IT·FR)
   + base de conocimiento del copiloto "Ask Albert AI"
   Edita aquí tus textos. Todo es texto plano, sin dependencias.
   ============================================================ */
window.PORTFOLIO = {
  langs: [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ],

  themes: [
    { id: "cyberpunk", name: "Cyberpunk" },
    { id: "dark", name: "Dark+" },
    { id: "light", name: "Light" },
    { id: "dracula", name: "Dracula" },
    { id: "synthwave", name: "Synthwave '84" },
  ],

  filesMeta: [
    { name: "welcome", icon: "🏠", lang: "home", home: true },
    { name: "about.js", icon: "👤", lang: "js" },
    { name: "projects.json", icon: "📦", lang: "json" },
    { name: "skills.md", icon: "🧩", lang: "md" },
    { name: "experience.log", icon: "📈", lang: "log" },
    { name: "interests.md", icon: "🎯", lang: "md" },
    { name: "contact.md", icon: "✉️", lang: "md" },
    { name: "README.md", icon: "📖", lang: "md" },
    { name: "game.js", icon: "🎮", lang: "js", game: true },
  ],

  // Intenciones del copiloto: si alguna keyword aparece en la pregunta → esa respuesta
  intents: [
    { id: "help", kw: ["help", "ayuda", "hilfe", "aiuto", "aide", "puedes", "can you", "kannst", "puoi", "peux"] },
    { id: "contact", kw: ["contact", "contacto", "contatt", "kontakt", "contacter", "email", "correo", "mail", "hire", "contrat", "embauch", "assum", "linkedin"] },
    { id: "projects", kw: ["project", "proyecto", "progett", "projekt", "projet", "trabajo", "work", "portfolio", "dolistore", "modul", "módul"] },
    { id: "experience", kw: ["experien", "esperienz", "erfahrung", "expérience", "trayectoria", "career", "carrera", "laboral", "trabajado"] },
    { id: "languages", kw: ["idioma", "hablas", "speak", "spoken", "sprich", "parli", "parles", "langue"] },
    { id: "location", kw: ["where", "donde", "dónde", "wo ", "dove", "où", "ubica", "país", "country", "land", "vive"] },
    { id: "skills", kw: ["skill", "tecnolog", "tech", "habilidad", "stack", "php", "javascript", "herramient", "tool", "werkzeug", "strument", "outil", "competen", "kompeten", "linguagg"] },
    { id: "about", kw: ["who", "about", "quien", "quién", "sobre", "wer", "über", "chi", "qui es", "qui est", "name", "nombre", "preséntate", "presentati"] },
    { id: "fun", kw: ["fun", "broma", "joke", "cool", "meta", "easter", "secret", "secreto", "witz", "scherzo", "blague"] },
  ],

  // Proyectos destacados (el dashboard y projects.json se generan de aquí)
  projectsData: [
    { name: "Mensaru", icon: "💬", url: "https://mensaru.com", stack: ["SaaS", "API", "IA"],
      desc: { es: "Plataforma SaaS de mensajería para empresas: WhatsApp (API oficial), agentes de IA, API REST y webhooks.",
              en: "Business messaging SaaS: WhatsApp (official API), AI agents, REST API and webhooks.",
              de: "Business-Messaging-SaaS: WhatsApp (offizielle API), KI-Agenten, REST-API und Webhooks.",
              it: "SaaS di messaggistica per aziende: WhatsApp (API ufficiale), agenti IA, API REST e webhook.",
              fr: "SaaS de messagerie pour entreprises : WhatsApp (API officielle), agents IA, API REST et webhooks." } },
    { name: "easyOCR Panel", icon: "🧾", url: "#", stack: ["Laravel", "PHP", "API"],
      desc: { es: "Panel SaaS de OCR: API REST, webhooks, API keys, facturación e IMAP.",
              en: "OCR SaaS panel: REST API, webhooks, API keys, billing and IMAP.",
              de: "OCR-SaaS-Panel: REST-API, Webhooks, API-Keys, Abrechnung und IMAP.",
              it: "Pannello SaaS OCR: API REST, webhook, API key, fatturazione e IMAP.",
              fr: "Panneau SaaS OCR : API REST, webhooks, clés API, facturation et IMAP." } },
    { name: "Módulos Dolibarr", icon: "🧩", url: "https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60", stack: ["PHP", "Dolibarr"],
      desc: { es: "Cientos de módulos comerciales publicados en Dolistore.",
              en: "Hundreds of commercial modules published on Dolistore.",
              de: "Hunderte kommerzielle Module auf Dolistore veröffentlicht.",
              it: "Centinaia di moduli commerciali pubblicati su Dolistore.",
              fr: "Des centaines de modules commerciaux publiés sur Dolistore." } },
    { name: "Dolibarr v18 ERP", icon: "📦", url: "https://wiki.easysoft.es", stack: ["PHP", "MySQL"],
      desc: { es: "Personalizaciones del ERP a medida para clientes reales.",
              en: "Custom ERP tailoring for real clients.",
              de: "Maßgeschneiderte ERP-Anpassungen für echte Kunden.",
              it: "Personalizzazioni ERP su misura per clienti reali.",
              fr: "Personnalisations ERP sur mesure pour de vrais clients." } },
  ],

  // Textos del dashboard (pantalla de inicio)
  dashI18n: {
    es: { headline: "CTO y Cofundador @ EasySoft Tech · Especialista en ERP, SaaS y Full-Stack", available: "Disponible para proyectos", askAI: "Pregúntale a la IA", hire: "Contáctame", statModules: "Módulos Dolibarr", featured: "Proyectos destacados", activity: "Actividad", quicklinks: "Enlaces" },
    en: { headline: "CTO & Co-founder @ EasySoft Tech · ERP, SaaS & Full-Stack expert", available: "Available for projects", askAI: "Ask the AI", hire: "Contact me", statModules: "Dolibarr modules", featured: "Featured projects", activity: "Activity", quicklinks: "Links" },
    de: { headline: "CTO & Mitgründer @ EasySoft Tech · ERP, SaaS & Full-Stack", available: "Verfügbar für Projekte", askAI: "Frag die KI", hire: "Kontaktiere mich", statModules: "Dolibarr-Module", featured: "Ausgewählte Projekte", activity: "Aktivität", quicklinks: "Links" },
    it: { headline: "CTO & Cofondatore @ EasySoft Tech · ERP, SaaS e Full-Stack", available: "Disponibile per progetti", askAI: "Chiedi all'IA", hire: "Contattami", statModules: "Moduli Dolibarr", featured: "Progetti in evidenza", activity: "Attività", quicklinks: "Link" },
    fr: { headline: "CTO & Cofondateur @ EasySoft Tech · ERP, SaaS & Full-Stack", available: "Disponible pour des projets", askAI: "Demander à l'IA", hire: "Me contacter", statModules: "Modules Dolibarr", featured: "Projets phares", activity: "Activité", quicklinks: "Liens" },
  },

  i18n: {
    /* ===================== ESPAÑOL ===================== */
    es: {
      ui: {
        menu: { file: "Archivo", edit: "Editar", view: "Ver", go: "Ir", run: "Ejecutar", terminal: "Terminal", help: "Ayuda" },
        explorer: "Explorador", terminalTab: "Terminal", problems: "Problemas", output: "Salida",
        statusReady: "Listo", searchPlaceholder: "Escribe el nombre de un archivo…",
        aiTitle: "Ask Albert AI", aiSubtitle: "Pregúntame sobre Albert",
        aiPlaceholder: "Escribe tu pregunta…", aiThinking: "Albert AI está escribiendo",
        langTitle: "Paquetes de idioma", langSubtitle: "Elige el idioma de la interfaz",
        langActive: "Activo", langInstall: "Activar",
        themeTitle: "Temas de color", themeSubtitle: "Elige tu tema",
        boot: ["$ boot albert-os", "Cargando kernel del portfolio…", "Montando módulos: about, projects, skills…", "Iniciando copiloto Ask Albert AI…", "Listo ✓"],
        bootEnter: "Pulsa para entrar",
        tip: "Tip: abre la terminal y escribe help",
        aiHint: "✦ Pregúntale a la IA sobre Albert",
        opening: "Abriendo",
        help:
          "Comandos disponibles:\n" +
          "  help            Esta ayuda\n" +
          "  ls              Lista los archivos\n" +
          "  open <archivo>  Abre un archivo\n" +
          "  cat <archivo>   Imprime un archivo\n" +
          "  about / projects / skills / experience / interests / contact\n" +
          "  game            Mini-juego Snake 🎮\n" +
          "  ai <pregunta>   Pregúntale al copiloto\n" +
          "  lang <es|en|de|it|fr>   Cambia el idioma\n" +
          "  theme <dark|light|dracula|synthwave>\n" +
          "  social          Mis enlaces\n" +
          "  clear           Limpia la terminal",
      },
      files: {
        "about.js":
          "/**\n * about.js — Albert Luque Rivas\n * Full-Stack Developer · Especialista en Dolibarr ERP\n */\n\n" +
          "const albert = {\n" +
          '  name: "Albert Luque Rivas",\n' +
          '  headline: "CTO & Cofundador @ EasySoft Tech | ERP · SaaS · Full-Stack",\n' +
          '  company: "Easysoft Tech S.L.",\n' +
          '  location: "Córdoba, España",\n' +
          "  available: true,\n" +
          '  focus: ["Dolibarr ERP", "PHP", "JavaScript", "MySQL"],\n\n' +
          '  bio: "Desarrollador full-stack centrado en software de gestión. " +\n' +
          '       "Creo módulos a medida para Dolibarr ERP, informes avanzados " +\n' +
          '       "e integraciones que resuelven problemas reales de negocio.",\n' +
          "};\n\nexport default albert;",
        "projects.json":
          "{\n  \"projects\": [\n" +
          "    { \"name\": \"ERP Dolibarr v18\", \"stack\": [\"PHP\", \"MySQL\"], \"desc\": \"Personalizaciones del ERP a medida para clientes reales.\", \"url\": \"https://wiki.easysoft.es\" },\n" +
          "    { \"name\": \"Módulos Easysoft\", \"stack\": [\"PHP\", \"JS\"], \"desc\": \"Módulos comerciales publicados en Dolistore.\", \"url\": \"https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60\" },\n" +
          "    { \"name\": \"Baterías a Domicilio\", \"stack\": [\"PHP\", \"Dolibarr\"], \"desc\": \"Gestión de servicio de baterías a domicilio.\", \"url\": \"#\" },\n" +
          "    { \"name\": \"Reportes a medida\", \"stack\": [\"PHP\", \"SQL\"], \"desc\": \"Informes de ventas por vendedor, cliente y sucursal.\", \"url\": \"#\" }\n" +
          "  ]\n}",
        "skills.md":
          "# Skills & Tecnologías\n\n## Lenguajes\n" +
          "- **PHP**          ██████████████  100%\n" +
          "- **JavaScript**   ███████████░░░  80%\n" +
          "- **SQL / MySQL**  ████████████░░  85%\n" +
          "- **HTML & CSS**   ████████████░░  88%\n\n" +
          "## Plataformas\n" +
          "- **Dolibarr ERP** ██████████████  100%\n" +
          "- **React**        █████████░░░░░  65%\n" +
          "- **Node.js**      ████████░░░░░░  60%\n\n" +
          "## Herramientas\nGit · Docker · Laravel · REST APIs · Composer · Laragon · Dolistore\n\n> Siempre aprendiendo algo nuevo 🚀",
        "experience.log":
          "[ago 2025 — actualidad] EasySoft Tech SL · CTO & Cofundador\n" +
          "  INFO  Dirección técnica y arquitectura de producto (ERP · SaaS)\n" +
          "  OK    Cofundador de la empresa\n\n" +
          "[oct 2020 — dic 2025] Cleverbyte Consulting · Full-Stack Developer\n" +
          "  INFO  Desarrollo full-stack para clientes (5 años)\n" +
          "  OK    Proyectos web y de gestión a medida\n\n" +
          "[sep 2021 — jun 2023] MEDAC Arena · Profesor de FP\n" +
          "  INFO  Docencia de informática en Formación Profesional\n\n" +
          "[dic 2019 — abr 2020] Synergenia IT Consulting · Responsable de proyectos\n" +
          "  INFO  Gestión de proyectos y desarrollo\n\n" +
          "# Educación\n" +
          "  Ing. Informática — Universidad de Córdoba (2016–2020) · Nota 8.40\n" +
          "  Grado Superior ASIR (2014–2016) · Nota 9.14 · Matrícula de honor 🏅\n" +
          "  Grado Medio SMR (2011–2013) · Nota 9.90 · Matrícula de honor 🏅",
        "interests.md":
          "# Intereses & Aficiones\n\n## Profesional\n" +
          "- 🤖 Automatización y herramientas que ahorran tiempo\n" +
          "- 🧹 Código limpio y buenas prácticas\n" +
          "- 🌍 Open source y la comunidad Dolibarr\n\n" +
          "## Personal\n" +
          "- 🎮 Videojuegos y crear pequeños juegos\n" +
          "- 🎧 Música mientras programo\n" +
          "- ✈️ Viajar y descubrir sitios nuevos\n\n" +
          "> (edita esta sección con tus aficiones reales)",
        "contact.md":
          "# Contacto\n\n¿Tienes un proyecto en mente? Hablemos.\n\n" +
          "- 📧 [aluquerivasdev@gmail.com](mailto:aluquerivasdev@gmail.com)\n- 🏢 [desarrollo@easysoft.es](mailto:desarrollo@easysoft.es)\n" +
          "- 💼 [LinkedIn](https://es.linkedin.com/in/albertoluquerivas)\n- 🐙 [GitHub](https://github.com/aluquerivas-dev)\n" +
          "- 🌐 [easysoft.es](https://easysoft.es)\n" +
          "- 📚 [wiki.easysoft.es](https://wiki.easysoft.es)\n" +
          "- 🛒 [Dolistore](https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60)",
        "README.md":
          "# Portfolio — Albert Luque Rivas\n\n" +
          "Portfolio con **interfaz tipo IDE**, copiloto de **IA** y soporte de **5 idiomas**.\n" +
          "Hecho con HTML, CSS y JavaScript vanilla. Sin build.\n\n" +
          "## Uso\nAbre index.html o sírvelo con Live Server.\n\n" +
          "## Idiomas\nPulsa el icono 🌐 (barra lateral) y elige idioma.\n\n" +
          "## IA\nPulsa el icono ✦ para abrir el copiloto y pregúntale sobre Albert.",
        "game.js":
          "// game.js — mini-juego Snake en canvas (vanilla, sin dependencias)\n" +
          "// Pulsa Jugar. Controles: flechas / WASD · swipe en el móvil.",
      },
      ai: {
        greeting: "¡Hola! 👋 Soy el copiloto de Albert. Pregúntame por sus skills, proyectos, experiencia o cómo contactarlo.",
        suggestions: [
          { label: "🧩 Skills", q: "¿Qué tecnologías dominas?" },
          { label: "📦 Proyectos", q: "Háblame de tus proyectos" },
          { label: "📈 Experiencia", q: "¿Cuál es tu experiencia?" },
          { label: "✉️ Contacto", q: "¿Cómo te contacto?" },
        ],
        answers: {
          about: "Albert Luque Rivas es **CTO y cofundador de EasySoft Tech**. Ingeniero informático experto en **ERP, SaaS y arquitectura full-stack** (PHP, Dolibarr, Laravel, JavaScript).",
          skills: "Domina **PHP**, **JavaScript**, **SQL/MySQL** y **HTML/CSS**, y sobre todo **Dolibarr ERP**. También usa React, Node.js, Git y Docker. Abre `skills.md` para verlo con detalle.",
          projects: "Ha hecho personalizaciones de Dolibarr v18, módulos comerciales en **Dolistore**, una app de baterías a domicilio y reportes de ventas a medida. Mira `projects.json`.",
          experience: "**CTO y cofundador de EasySoft Tech** desde 2025. Antes: 5 años como full-stack en Cleverbyte Consulting y profesor de FP en MEDAC. Mira `experience.log`.",
          contact: "Escríbele a **aluquerivasdev@gmail.com**, por **LinkedIn** (in/albertoluquerivas) o visita easysoft.es. Abre `contact.md`.",
          languages: "Español nativo e inglés técnico.",
          location: "Está en **Córdoba (España)** y trabaja en remoto.",
          fun: "Este portfolio entero es un IDE con copiloto de IA y soporte de 5 idiomas. Bastante meta, ¿no? 😎 Prueba a abrir `game.js`.",
          help: "Puedes preguntarme por sus **skills**, **proyectos**, **experiencia**, **idiomas** o **cómo contactarlo**.",
          fallback: "Buena pregunta 🤔. Aún soy un copiloto sencillo: prueba a preguntarme por sus skills, proyectos, experiencia o contacto.",
        },
      },
    },

    /* ===================== ENGLISH ===================== */
    en: {
      ui: {
        menu: { file: "File", edit: "Edit", view: "View", go: "Go", run: "Run", terminal: "Terminal", help: "Help" },
        explorer: "Explorer", terminalTab: "Terminal", problems: "Problems", output: "Output",
        statusReady: "Ready", searchPlaceholder: "Type a file name…",
        aiTitle: "Ask Albert AI", aiSubtitle: "Ask me about Albert",
        aiPlaceholder: "Type your question…", aiThinking: "Albert AI is typing",
        langTitle: "Language packs", langSubtitle: "Choose the interface language",
        langActive: "Active", langInstall: "Activate",
        themeTitle: "Color themes", themeSubtitle: "Choose your theme",
        boot: ["$ boot albert-os", "Loading portfolio kernel…", "Mounting modules: about, projects, skills…", "Starting Ask Albert AI copilot…", "Ready ✓"],
        bootEnter: "Click to enter",
        tip: "Tip: open the terminal and type help",
        aiHint: "✦ Ask the AI about Albert",
        opening: "Opening",
        help:
          "Available commands:\n" +
          "  help            This help\n" +
          "  ls              List files\n" +
          "  open <file>     Open a file\n" +
          "  cat <file>      Print a file\n" +
          "  about / projects / skills / experience / interests / contact\n" +
          "  game            Snake mini-game 🎮\n" +
          "  ai <question>   Ask the copilot\n" +
          "  lang <es|en|de|it|fr>   Change language\n" +
          "  theme <dark|light|dracula|synthwave>\n" +
          "  social          My links\n" +
          "  clear           Clear the terminal",
      },
      files: {
        "about.js":
          "/**\n * about.js — Albert Luque Rivas\n * Full-Stack Developer · Dolibarr ERP Specialist\n */\n\n" +
          "const albert = {\n" +
          '  name: "Albert Luque Rivas",\n' +
          '  headline: "CTO & Co-founder @ EasySoft Tech | ERP · SaaS · Full-Stack",\n' +
          '  company: "Easysoft Tech S.L.",\n' +
          '  location: "Córdoba, Spain",\n' +
          "  available: true,\n" +
          '  focus: ["Dolibarr ERP", "PHP", "JavaScript", "MySQL"],\n\n' +
          '  bio: "Full-stack developer focused on business management software. " +\n' +
          '       "I build custom Dolibarr ERP modules, advanced reports and " +\n' +
          '       "integrations that solve real business problems.",\n' +
          "};\n\nexport default albert;",
        "projects.json":
          "{\n  \"projects\": [\n" +
          "    { \"name\": \"Dolibarr v18 ERP\", \"stack\": [\"PHP\", \"MySQL\"], \"desc\": \"Custom ERP tailoring for real clients.\", \"url\": \"https://wiki.easysoft.es\" },\n" +
          "    { \"name\": \"Easysoft modules\", \"stack\": [\"PHP\", \"JS\"], \"desc\": \"Commercial modules published on Dolistore.\", \"url\": \"https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60\" },\n" +
          "    { \"name\": \"Batteries at Home\", \"stack\": [\"PHP\", \"Dolibarr\"], \"desc\": \"Management for a home battery service.\", \"url\": \"#\" },\n" +
          "    { \"name\": \"Custom reports\", \"stack\": [\"PHP\", \"SQL\"], \"desc\": \"Sales reports by seller, client and branch.\", \"url\": \"#\" }\n" +
          "  ]\n}",
        "skills.md":
          "# Skills & Technologies\n\n## Languages\n" +
          "- **PHP**          ██████████████  100%\n" +
          "- **JavaScript**   ███████████░░░  80%\n" +
          "- **SQL / MySQL**  ████████████░░  85%\n" +
          "- **HTML & CSS**   ████████████░░  88%\n\n" +
          "## Platforms\n" +
          "- **Dolibarr ERP** ██████████████  100%\n" +
          "- **React**        █████████░░░░░  65%\n" +
          "- **Node.js**      ████████░░░░░░  60%\n\n" +
          "## Tools\nGit · Docker · Laravel · REST APIs · Composer · Laragon · Dolistore\n\n> Always learning something new 🚀",
        "experience.log":
          "[Aug 2025 — present] EasySoft Tech SL · CTO & Co-founder\n" +
          "  INFO  Technical leadership and product architecture (ERP · SaaS)\n" +
          "  OK    Company co-founder\n\n" +
          "[Oct 2020 — Dec 2025] Cleverbyte Consulting · Full-Stack Developer\n" +
          "  INFO  Full-stack development for clients (5 years)\n" +
          "  OK    Custom web and business apps\n\n" +
          "[Sep 2021 — Jun 2023] MEDAC Arena · Teacher (vocational IT)\n" +
          "  INFO  Teaching IT in vocational training\n\n" +
          "[Dec 2019 — Apr 2020] Synergenia IT Consulting · Project lead\n" +
          "  INFO  Project management and development\n\n" +
          "# Education\n" +
          "  Computer Science Eng. — University of Córdoba (2016–2020) · GPA 8.40\n" +
          "  Higher VET ASIR (2014–2016) · 9.14 · Honors 🏅\n" +
          "  VET SMR (2011–2013) · 9.90 · Honors 🏅",
        "interests.md":
          "# Interests & Hobbies\n\n## Professional\n" +
          "- 🤖 Automation and time-saving tools\n" +
          "- 🧹 Clean code and best practices\n" +
          "- 🌍 Open source and the Dolibarr community\n\n" +
          "## Personal\n" +
          "- 🎮 Video games and building small games\n" +
          "- 🎧 Music while coding\n" +
          "- ✈️ Traveling and discovering new places\n\n" +
          "> (edit this section with your real hobbies)",
        "contact.md":
          "# Contact\n\nGot a project in mind? Let's talk.\n\n" +
          "- 📧 [aluquerivasdev@gmail.com](mailto:aluquerivasdev@gmail.com)\n- 🏢 [desarrollo@easysoft.es](mailto:desarrollo@easysoft.es)\n" +
          "- 💼 [LinkedIn](https://es.linkedin.com/in/albertoluquerivas)\n- 🐙 [GitHub](https://github.com/aluquerivas-dev)\n" +
          "- 🌐 [easysoft.es](https://easysoft.es)\n" +
          "- 📚 [wiki.easysoft.es](https://wiki.easysoft.es)\n" +
          "- 🛒 [Dolistore](https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60)",
        "README.md":
          "# Portfolio — Albert Luque Rivas\n\n" +
          "Portfolio with an **IDE-style interface**, an **AI** copilot and **5 languages**.\n" +
          "Built with vanilla HTML, CSS and JavaScript. No build step.\n\n" +
          "## Usage\nOpen index.html or serve it with Live Server.\n\n" +
          "## Languages\nClick the 🌐 icon (side bar) and pick a language.\n\n" +
          "## AI\nClick the ✦ icon to open the copilot and ask about Albert.",
        "game.js":
          "// game.js — Snake mini-game on canvas (vanilla, no dependencies)\n" +
          "// Press Play. Controls: arrows / WASD · swipe on mobile.",
      },
      ai: {
        greeting: "Hi! 👋 I'm Albert's copilot. Ask me about his skills, projects, experience or how to reach him.",
        suggestions: [
          { label: "🧩 Skills", q: "What technologies do you know?" },
          { label: "📦 Projects", q: "Tell me about your projects" },
          { label: "📈 Experience", q: "What is your experience?" },
          { label: "✉️ Contact", q: "How can I contact you?" },
        ],
        answers: {
          about: "Albert Luque Rivas is **CTO & co-founder of EasySoft Tech**. Computer engineer specialized in **ERP, SaaS and full-stack architecture** (PHP, Dolibarr, Laravel, JavaScript).",
          skills: "He's strong in **PHP**, **JavaScript**, **SQL/MySQL** and **HTML/CSS**, and especially **Dolibarr ERP**. He also uses React, Node.js, Git and Docker. Open `skills.md`.",
          projects: "He's done Dolibarr v18 customizations, commercial modules on **Dolistore**, a home-battery service app and custom sales reports. See `projects.json`.",
          experience: "**CTO & co-founder of EasySoft Tech** since 2025. Before: 5 years as full-stack at Cleverbyte Consulting and IT teacher at MEDAC. See `experience.log`.",
          contact: "Reach him at **aluquerivasdev@gmail.com**, on **LinkedIn** (in/albertoluquerivas) or at easysoft.es. Open `contact.md`.",
          languages: "Native Spanish and technical English.",
          location: "He's based in **Córdoba, Spain** and works remotely.",
          fun: "This whole portfolio is an IDE with an AI copilot and 5 languages. Pretty meta, right? 😎 Try opening `game.js`.",
          help: "You can ask me about his **skills**, **projects**, **experience**, **languages** or **how to contact him**.",
          fallback: "Good question 🤔. I'm still a simple copilot: try asking about his skills, projects, experience or contact.",
        },
      },
    },

    /* ===================== DEUTSCH ===================== */
    de: {
      ui: {
        menu: { file: "Datei", edit: "Bearbeiten", view: "Ansicht", go: "Gehe zu", run: "Ausführen", terminal: "Terminal", help: "Hilfe" },
        explorer: "Explorer", terminalTab: "Terminal", problems: "Probleme", output: "Ausgabe",
        statusReady: "Bereit", searchPlaceholder: "Dateinamen eingeben…",
        aiTitle: "Ask Albert AI", aiSubtitle: "Frag mich über Albert",
        aiPlaceholder: "Stelle deine Frage…", aiThinking: "Albert AI schreibt",
        langTitle: "Sprachpakete", langSubtitle: "Wähle die Sprache der Oberfläche",
        langActive: "Aktiv", langInstall: "Aktivieren",
        themeTitle: "Farbthemen", themeSubtitle: "Wähle dein Thema",
        boot: ["$ boot albert-os", "Portfolio-Kernel wird geladen…", "Module werden geladen: about, projects, skills…", "Ask Albert AI Copilot wird gestartet…", "Bereit ✓"],
        bootEnter: "Zum Eintreten klicken",
        tip: "Tipp: öffne das Terminal und tippe help",
        aiHint: "✦ Frag die KI über Albert",
        opening: "Öffne",
        help:
          "Verfügbare Befehle:\n" +
          "  help            Diese Hilfe\n" +
          "  ls              Dateien auflisten\n" +
          "  open <datei>    Datei öffnen\n" +
          "  cat <datei>     Datei ausgeben\n" +
          "  about / projects / skills / experience / interests / contact\n" +
          "  game            Snake-Minispiel 🎮\n" +
          "  ai <frage>      Frag den Copiloten\n" +
          "  lang <es|en|de|it|fr>   Sprache wechseln\n" +
          "  theme <dark|light|dracula|synthwave>\n" +
          "  social          Meine Links\n" +
          "  clear           Terminal leeren",
      },
      files: {
        "about.js":
          "/**\n * about.js — Albert Luque Rivas\n * Full-Stack-Entwickler · Dolibarr-ERP-Spezialist\n */\n\n" +
          "const albert = {\n" +
          '  name: "Albert Luque Rivas",\n' +
          '  headline: "CTO & Mitgründer @ EasySoft Tech | ERP · SaaS · Full-Stack",\n' +
          '  company: "Easysoft Tech S.L.",\n' +
          '  location: "Córdoba, Spanien",\n' +
          "  available: true,\n" +
          '  focus: ["Dolibarr ERP", "PHP", "JavaScript", "MySQL"],\n\n' +
          '  bio: "Full-Stack-Entwickler mit Fokus auf Unternehmenssoftware. " +\n' +
          '       "Ich entwickle maßgeschneiderte Dolibarr-ERP-Module, " +\n' +
          '       "erweiterte Berichte und Integrationen für echte Geschäftsprobleme.",\n' +
          "};\n\nexport default albert;",
        "projects.json":
          "{\n  \"projects\": [\n" +
          "    { \"name\": \"Dolibarr v18 ERP\", \"stack\": [\"PHP\", \"MySQL\"], \"desc\": \"Maßgeschneiderte ERP-Anpassungen für echte Kunden.\", \"url\": \"https://wiki.easysoft.es\" },\n" +
          "    { \"name\": \"Easysoft-Module\", \"stack\": [\"PHP\", \"JS\"], \"desc\": \"Kommerzielle Module auf Dolistore veröffentlicht.\", \"url\": \"https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60\" },\n" +
          "    { \"name\": \"Batterien nach Hause\", \"stack\": [\"PHP\", \"Dolibarr\"], \"desc\": \"Verwaltung eines Batterie-Lieferdienstes.\", \"url\": \"#\" },\n" +
          "    { \"name\": \"Eigene Berichte\", \"stack\": [\"PHP\", \"SQL\"], \"desc\": \"Verkaufsberichte nach Verkäufer, Kunde und Filiale.\", \"url\": \"#\" }\n" +
          "  ]\n}",
        "skills.md":
          "# Skills & Technologien\n\n## Sprachen\n" +
          "- **PHP**          ██████████████  100%\n" +
          "- **JavaScript**   ███████████░░░  80%\n" +
          "- **SQL / MySQL**  ████████████░░  85%\n" +
          "- **HTML & CSS**   ████████████░░  88%\n\n" +
          "## Plattformen\n" +
          "- **Dolibarr ERP** ██████████████  100%\n" +
          "- **React**        █████████░░░░░  65%\n" +
          "- **Node.js**      ████████░░░░░░  60%\n\n" +
          "## Werkzeuge\nGit · Docker · Laravel · REST APIs · Composer · Laragon · Dolistore\n\n> Immer Neues lernen 🚀",
        "experience.log":
          "[Aug 2025 — heute] EasySoft Tech SL · CTO & Mitgründer\n" +
          "  INFO  Technische Leitung und Produktarchitektur (ERP · SaaS)\n" +
          "  OK    Mitgründer des Unternehmens\n\n" +
          "[Okt 2020 — Dez 2025] Cleverbyte Consulting · Full-Stack-Entwickler\n" +
          "  INFO  Full-Stack-Entwicklung für Kunden (5 Jahre)\n" +
          "  OK    Web- und Unternehmensanwendungen nach Maß\n\n" +
          "[Sep 2021 — Jun 2023] MEDAC Arena · Dozent (IT-Ausbildung)\n" +
          "  INFO  IT-Unterricht in der Berufsausbildung\n\n" +
          "[Dez 2019 — Apr 2020] Synergenia IT Consulting · Projektleiter\n" +
          "  INFO  Projektmanagement und Entwicklung\n\n" +
          "# Ausbildung\n" +
          "  Informatik-Ing. — Universität Córdoba (2016–2020) · Note 8.40\n" +
          "  ASIR Fachausbildung (2014–2016) · 9.14 · mit Auszeichnung 🏅\n" +
          "  SMR Ausbildung (2011–2013) · 9.90 · mit Auszeichnung 🏅",
        "interests.md":
          "# Interessen & Hobbys\n\n## Beruflich\n" +
          "- 🤖 Automatisierung und zeitsparende Werkzeuge\n" +
          "- 🧹 Sauberer Code und Best Practices\n" +
          "- 🌍 Open Source und die Dolibarr-Community\n\n" +
          "## Persönlich\n" +
          "- 🎮 Videospiele und kleine Spiele entwickeln\n" +
          "- 🎧 Musik beim Programmieren\n" +
          "- ✈️ Reisen und neue Orte entdecken\n\n" +
          "> (bearbeite diesen Abschnitt mit deinen echten Hobbys)",
        "contact.md":
          "# Kontakt\n\nHast du ein Projekt im Kopf? Lass uns reden.\n\n" +
          "- 📧 [aluquerivasdev@gmail.com](mailto:aluquerivasdev@gmail.com)\n- 🏢 [desarrollo@easysoft.es](mailto:desarrollo@easysoft.es)\n" +
          "- 💼 [LinkedIn](https://es.linkedin.com/in/albertoluquerivas)\n- 🐙 [GitHub](https://github.com/aluquerivas-dev)\n" +
          "- 🌐 [easysoft.es](https://easysoft.es)\n" +
          "- 📚 [wiki.easysoft.es](https://wiki.easysoft.es)\n" +
          "- 🛒 [Dolistore](https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60)",
        "README.md":
          "# Portfolio — Albert Luque Rivas\n\n" +
          "Portfolio mit **IDE-Oberfläche**, **KI**-Copilot und **5 Sprachen**.\n" +
          "Mit reinem HTML, CSS und JavaScript gebaut. Ohne Build.\n\n" +
          "## Nutzung\nÖffne index.html oder nutze Live Server.\n\n" +
          "## Sprachen\nKlicke auf das 🌐-Symbol (Seitenleiste) und wähle eine Sprache.\n\n" +
          "## KI\nKlicke auf das ✦-Symbol für den Copiloten und frag über Albert.",
        "game.js":
          "// game.js — Snake-Minispiel auf Canvas (vanilla, ohne Abhängigkeiten)\n" +
          "// Drücke Play. Steuerung: Pfeile / WASD · Wischen am Handy.",
      },
      ai: {
        greeting: "Hallo! 👋 Ich bin Alberts Copilot. Frag mich nach seinen Skills, Projekten, Erfahrung oder Kontakt.",
        suggestions: [
          { label: "🧩 Skills", q: "Welche Technologien kannst du?" },
          { label: "📦 Projekte", q: "Erzähl mir von deinen Projekten" },
          { label: "📈 Erfahrung", q: "Was ist deine Erfahrung?" },
          { label: "✉️ Kontakt", q: "Wie kann ich dich kontaktieren?" },
        ],
        answers: {
          about: "Albert Luque Rivas ist **CTO & Mitgründer von EasySoft Tech**. Informatiker mit Schwerpunkt **ERP, SaaS und Full-Stack-Architektur** (PHP, Dolibarr, Laravel, JavaScript).",
          skills: "Stark in **PHP**, **JavaScript**, **SQL/MySQL** und **HTML/CSS**, vor allem in **Dolibarr ERP**. Außerdem React, Node.js, Git und Docker. Öffne `skills.md`.",
          projects: "Dolibarr-v18-Anpassungen, kommerzielle Module auf **Dolistore**, eine Batterie-Lieferdienst-App und eigene Verkaufsberichte. Siehe `projects.json`.",
          experience: "**CTO & Mitgründer von EasySoft Tech** seit 2025. Davor: 5 Jahre Full-Stack bei Cleverbyte Consulting und IT-Dozent bei MEDAC. Siehe `experience.log`.",
          contact: "Erreich ihn unter **aluquerivasdev@gmail.com**, über **LinkedIn** (in/albertoluquerivas) oder easysoft.es. Öffne `contact.md`.",
          languages: "Spanisch als Muttersprache und technisches Englisch.",
          location: "Er ist in **Córdoba (Spanien)** und arbeitet remote.",
          fun: "Dieses ganze Portfolio ist eine IDE mit KI-Copilot und 5 Sprachen. Ziemlich meta, oder? 😎 Öffne mal `game.js`.",
          help: "Frag mich nach seinen **Skills**, **Projekten**, seiner **Erfahrung**, **Sprachen** oder **Kontakt**.",
          fallback: "Gute Frage 🤔. Ich bin noch ein einfacher Copilot: frag nach Skills, Projekten, Erfahrung oder Kontakt.",
        },
      },
    },

    /* ===================== ITALIANO ===================== */
    it: {
      ui: {
        menu: { file: "File", edit: "Modifica", view: "Visualizza", go: "Vai", run: "Esegui", terminal: "Terminale", help: "Aiuto" },
        explorer: "Esplora risorse", terminalTab: "Terminale", problems: "Problemi", output: "Output",
        statusReady: "Pronto", searchPlaceholder: "Scrivi il nome di un file…",
        aiTitle: "Ask Albert AI", aiSubtitle: "Chiedimi di Albert",
        aiPlaceholder: "Scrivi la tua domanda…", aiThinking: "Albert AI sta scrivendo",
        langTitle: "Pacchetti lingua", langSubtitle: "Scegli la lingua dell'interfaccia",
        langActive: "Attivo", langInstall: "Attiva",
        themeTitle: "Temi colore", themeSubtitle: "Scegli il tuo tema",
        boot: ["$ boot albert-os", "Caricamento kernel del portfolio…", "Montaggio moduli: about, projects, skills…", "Avvio del copilota Ask Albert AI…", "Pronto ✓"],
        bootEnter: "Clicca per entrare",
        tip: "Suggerimento: apri il terminale e scrivi help",
        aiHint: "✦ Chiedi all'IA di Albert",
        opening: "Apro",
        help:
          "Comandi disponibili:\n" +
          "  help            Questo aiuto\n" +
          "  ls              Elenca i file\n" +
          "  open <file>     Apre un file\n" +
          "  cat <file>      Stampa un file\n" +
          "  about / projects / skills / experience / interests / contact\n" +
          "  game            Mini-gioco Snake 🎮\n" +
          "  ai <domanda>    Chiedi al copilota\n" +
          "  lang <es|en|de|it|fr>   Cambia lingua\n" +
          "  theme <dark|light|dracula|synthwave>\n" +
          "  social          I miei link\n" +
          "  clear           Pulisci il terminale",
      },
      files: {
        "about.js":
          "/**\n * about.js — Albert Luque Rivas\n * Sviluppatore Full-Stack · Specialista Dolibarr ERP\n */\n\n" +
          "const albert = {\n" +
          '  name: "Albert Luque Rivas",\n' +
          '  headline: "CTO & Cofondatore @ EasySoft Tech | ERP · SaaS · Full-Stack",\n' +
          '  company: "Easysoft Tech S.L.",\n' +
          '  location: "Córdoba, Spagna",\n' +
          "  available: true,\n" +
          '  focus: ["Dolibarr ERP", "PHP", "JavaScript", "MySQL"],\n\n' +
          '  bio: "Sviluppatore full-stack focalizzato sul software gestionale. " +\n' +
          '       "Creo moduli Dolibarr ERP su misura, report avanzati e " +\n' +
          '       "integrazioni che risolvono problemi reali di business.",\n' +
          "};\n\nexport default albert;",
        "projects.json":
          "{\n  \"projects\": [\n" +
          "    { \"name\": \"Dolibarr v18 ERP\", \"stack\": [\"PHP\", \"MySQL\"], \"desc\": \"Personalizzazioni ERP su misura per clienti reali.\", \"url\": \"https://wiki.easysoft.es\" },\n" +
          "    { \"name\": \"Moduli Easysoft\", \"stack\": [\"PHP\", \"JS\"], \"desc\": \"Moduli commerciali pubblicati su Dolistore.\", \"url\": \"https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60\" },\n" +
          "    { \"name\": \"Batterie a Domicilio\", \"stack\": [\"PHP\", \"Dolibarr\"], \"desc\": \"Gestione di un servizio di batterie a domicilio.\", \"url\": \"#\" },\n" +
          "    { \"name\": \"Report su misura\", \"stack\": [\"PHP\", \"SQL\"], \"desc\": \"Report di vendita per venditore, cliente e filiale.\", \"url\": \"#\" }\n" +
          "  ]\n}",
        "skills.md":
          "# Competenze & Tecnologie\n\n## Linguaggi\n" +
          "- **PHP**          ██████████████  100%\n" +
          "- **JavaScript**   ███████████░░░  80%\n" +
          "- **SQL / MySQL**  ████████████░░  85%\n" +
          "- **HTML & CSS**   ████████████░░  88%\n\n" +
          "## Piattaforme\n" +
          "- **Dolibarr ERP** ██████████████  100%\n" +
          "- **React**        █████████░░░░░  65%\n" +
          "- **Node.js**      ████████░░░░░░  60%\n\n" +
          "## Strumenti\nGit · Docker · Laravel · REST APIs · Composer · Laragon · Dolistore\n\n> Sempre in formazione 🚀",
        "experience.log":
          "[ago 2025 — oggi] EasySoft Tech SL · CTO & Cofondatore\n" +
          "  INFO  Direzione tecnica e architettura di prodotto (ERP · SaaS)\n" +
          "  OK    Cofondatore dell'azienda\n\n" +
          "[ott 2020 — dic 2025] Cleverbyte Consulting · Sviluppatore Full-Stack\n" +
          "  INFO  Sviluppo full-stack per clienti (5 anni)\n" +
          "  OK    App web e gestionali su misura\n\n" +
          "[set 2021 — giu 2023] MEDAC Arena · Docente (IT)\n" +
          "  INFO  Insegnamento di informatica nella formazione professionale\n\n" +
          "[dic 2019 — apr 2020] Synergenia IT Consulting · Responsabile progetti\n" +
          "  INFO  Gestione progetti e sviluppo\n\n" +
          "# Istruzione\n" +
          "  Ing. Informatica — Università di Córdoba (2016–2020) · Voto 8.40\n" +
          "  ASIR (2014–2016) · 9.14 · Lode 🏅\n" +
          "  SMR (2011–2013) · 9.90 · Lode 🏅",
        "interests.md":
          "# Interessi & Hobby\n\n## Professionale\n" +
          "- 🤖 Automazione e strumenti che fanno risparmiare tempo\n" +
          "- 🧹 Codice pulito e buone pratiche\n" +
          "- 🌍 Open source e la community Dolibarr\n\n" +
          "## Personale\n" +
          "- 🎮 Videogiochi e creare piccoli giochi\n" +
          "- 🎧 Musica mentre programmo\n" +
          "- ✈️ Viaggiare e scoprire posti nuovi\n\n" +
          "> (modifica questa sezione con i tuoi hobby reali)",
        "contact.md":
          "# Contatti\n\nHai un progetto in mente? Parliamone.\n\n" +
          "- 📧 [aluquerivasdev@gmail.com](mailto:aluquerivasdev@gmail.com)\n- 🏢 [desarrollo@easysoft.es](mailto:desarrollo@easysoft.es)\n" +
          "- 💼 [LinkedIn](https://es.linkedin.com/in/albertoluquerivas)\n- 🐙 [GitHub](https://github.com/aluquerivas-dev)\n" +
          "- 🌐 [easysoft.es](https://easysoft.es)\n" +
          "- 📚 [wiki.easysoft.es](https://wiki.easysoft.es)\n" +
          "- 🛒 [Dolistore](https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60)",
        "README.md":
          "# Portfolio — Albert Luque Rivas\n\n" +
          "Portfolio con **interfaccia tipo IDE**, copilota **IA** e **5 lingue**.\n" +
          "Fatto con HTML, CSS e JavaScript vanilla. Senza build.\n\n" +
          "## Uso\nApri index.html o servilo con Live Server.\n\n" +
          "## Lingue\nClicca l'icona 🌐 (barra laterale) e scegli la lingua.\n\n" +
          "## IA\nClicca l'icona ✦ per aprire il copilota e chiedere di Albert.",
        "game.js":
          "// game.js — mini-gioco Snake su canvas (vanilla, senza dipendenze)\n" +
          "// Premi Gioca. Controlli: frecce / WASD · swipe su mobile.",
      },
      ai: {
        greeting: "Ciao! 👋 Sono il copilota di Albert. Chiedimi delle sue competenze, progetti, esperienza o come contattarlo.",
        suggestions: [
          { label: "🧩 Competenze", q: "Che tecnologie conosci?" },
          { label: "📦 Progetti", q: "Parlami dei tuoi progetti" },
          { label: "📈 Esperienza", q: "Qual è la tua esperienza?" },
          { label: "✉️ Contatti", q: "Come posso contattarti?" },
        ],
        answers: {
          about: "Albert Luque Rivas è **CTO e cofondatore di EasySoft Tech**. Ingegnere informatico specializzato in **ERP, SaaS e architettura full-stack** (PHP, Dolibarr, Laravel, JavaScript).",
          skills: "Forte in **PHP**, **JavaScript**, **SQL/MySQL** e **HTML/CSS**, soprattutto in **Dolibarr ERP**. Usa anche React, Node.js, Git e Docker. Apri `skills.md`.",
          projects: "Personalizzazioni Dolibarr v18, moduli commerciali su **Dolistore**, un'app per batterie a domicilio e report di vendita su misura. Vedi `projects.json`.",
          experience: "**CTO e cofondatore di EasySoft Tech** dal 2025. Prima: 5 anni full-stack in Cleverbyte Consulting e docente IT al MEDAC. Vedi `experience.log`.",
          contact: "Scrivigli a **aluquerivasdev@gmail.com**, su **LinkedIn** (in/albertoluquerivas) o su easysoft.es. Apri `contact.md`.",
          languages: "Spagnolo madrelingua e inglese tecnico.",
          location: "È a **Córdoba (Spagna)** e lavora da remoto.",
          fun: "Tutto questo portfolio è un IDE con copilota IA e 5 lingue. Parecchio meta, vero? 😎 Prova ad aprire `game.js`.",
          help: "Puoi chiedermi delle sue **competenze**, **progetti**, **esperienza**, **lingue** o **come contattarlo**.",
          fallback: "Bella domanda 🤔. Sono ancora un copilota semplice: prova a chiedermi di competenze, progetti, esperienza o contatti.",
        },
      },
    },

    /* ===================== FRANÇAIS ===================== */
    fr: {
      ui: {
        menu: { file: "Fichier", edit: "Édition", view: "Affichage", go: "Aller", run: "Exécuter", terminal: "Terminal", help: "Aide" },
        explorer: "Explorateur", terminalTab: "Terminal", problems: "Problèmes", output: "Sortie",
        statusReady: "Prêt", searchPlaceholder: "Tape le nom d'un fichier…",
        aiTitle: "Ask Albert AI", aiSubtitle: "Pose-moi des questions sur Albert",
        aiPlaceholder: "Écris ta question…", aiThinking: "Albert AI écrit",
        langTitle: "Modules de langue", langSubtitle: "Choisis la langue de l'interface",
        langActive: "Actif", langInstall: "Activer",
        themeTitle: "Thèmes de couleur", themeSubtitle: "Choisis ton thème",
        boot: ["$ boot albert-os", "Chargement du noyau du portfolio…", "Montage des modules : about, projects, skills…", "Démarrage du copilote Ask Albert AI…", "Prêt ✓"],
        bootEnter: "Clique pour entrer",
        tip: "Astuce : ouvre le terminal et tape help",
        aiHint: "✦ Demande à l'IA à propos d'Albert",
        opening: "Ouverture de",
        help:
          "Commandes disponibles :\n" +
          "  help            Cette aide\n" +
          "  ls              Liste les fichiers\n" +
          "  open <fichier>  Ouvre un fichier\n" +
          "  cat <fichier>   Affiche un fichier\n" +
          "  about / projects / skills / experience / interests / contact\n" +
          "  game            Mini-jeu Snake 🎮\n" +
          "  ai <question>   Demande au copilote\n" +
          "  lang <es|en|de|it|fr>   Change de langue\n" +
          "  theme <dark|light|dracula|synthwave>\n" +
          "  social          Mes liens\n" +
          "  clear           Efface le terminal",
      },
      files: {
        "about.js":
          "/**\n * about.js — Albert Luque Rivas\n * Développeur Full-Stack · Spécialiste Dolibarr ERP\n */\n\n" +
          "const albert = {\n" +
          '  name: "Albert Luque Rivas",\n' +
          '  headline: "CTO & Cofondateur @ EasySoft Tech | ERP · SaaS · Full-Stack",\n' +
          '  company: "Easysoft Tech S.L.",\n' +
          '  location: "Córdoba, Espagne",\n' +
          "  available: true,\n" +
          '  focus: ["Dolibarr ERP", "PHP", "JavaScript", "MySQL"],\n\n' +
          '  bio: "Développeur full-stack spécialisé dans les logiciels de gestion. " +\n' +
          '       "Je crée des modules Dolibarr ERP sur mesure, des rapports avancés " +\n' +
          '       "et des intégrations qui résolvent de vrais problèmes métier.",\n' +
          "};\n\nexport default albert;",
        "projects.json":
          "{\n  \"projects\": [\n" +
          "    { \"name\": \"Dolibarr v18 ERP\", \"stack\": [\"PHP\", \"MySQL\"], \"desc\": \"Personnalisations ERP sur mesure pour de vrais clients.\", \"url\": \"https://wiki.easysoft.es\" },\n" +
          "    { \"name\": \"Modules Easysoft\", \"stack\": [\"PHP\", \"JS\"], \"desc\": \"Modules commerciaux publiés sur Dolistore.\", \"url\": \"https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60\" },\n" +
          "    { \"name\": \"Batteries à Domicile\", \"stack\": [\"PHP\", \"Dolibarr\"], \"desc\": \"Gestion d'un service de batteries à domicile.\", \"url\": \"#\" },\n" +
          "    { \"name\": \"Rapports sur mesure\", \"stack\": [\"PHP\", \"SQL\"], \"desc\": \"Rapports de ventes par vendeur, client et agence.\", \"url\": \"#\" }\n" +
          "  ]\n}",
        "skills.md":
          "# Compétences & Technologies\n\n## Langages\n" +
          "- **PHP**          ██████████████  100%\n" +
          "- **JavaScript**   ███████████░░░  80%\n" +
          "- **SQL / MySQL**  ████████████░░  85%\n" +
          "- **HTML & CSS**   ████████████░░  88%\n\n" +
          "## Plateformes\n" +
          "- **Dolibarr ERP** ██████████████  100%\n" +
          "- **React**        █████████░░░░░  65%\n" +
          "- **Node.js**      ████████░░░░░░  60%\n\n" +
          "## Outils\nGit · Docker · Laravel · REST APIs · Composer · Laragon · Dolistore\n\n> Toujours en train d'apprendre 🚀",
        "experience.log":
          "[août 2025 — présent] EasySoft Tech SL · CTO & Cofondateur\n" +
          "  INFO  Direction technique et architecture produit (ERP · SaaS)\n" +
          "  OK    Cofondateur de l'entreprise\n\n" +
          "[oct 2020 — déc 2025] Cleverbyte Consulting · Développeur Full-Stack\n" +
          "  INFO  Développement full-stack pour clients (5 ans)\n" +
          "  OK    Applications web et de gestion sur mesure\n\n" +
          "[sep 2021 — juin 2023] MEDAC Arena · Enseignant (informatique)\n" +
          "  INFO  Enseignement de l'informatique en formation pro\n\n" +
          "[déc 2019 — avr 2020] Synergenia IT Consulting · Chef de projets\n" +
          "  INFO  Gestion de projets et développement\n\n" +
          "# Formation\n" +
          "  Ing. Informatique — Université de Córdoba (2016–2020) · Note 8.40\n" +
          "  ASIR (2014–2016) · 9.14 · Mention d'honneur 🏅\n" +
          "  SMR (2011–2013) · 9.90 · Mention d'honneur 🏅",
        "interests.md":
          "# Centres d'intérêt & Loisirs\n\n## Professionnel\n" +
          "- 🤖 Automatisation et outils qui font gagner du temps\n" +
          "- 🧹 Code propre et bonnes pratiques\n" +
          "- 🌍 Open source et la communauté Dolibarr\n\n" +
          "## Personnel\n" +
          "- 🎮 Jeux vidéo et création de petits jeux\n" +
          "- 🎧 Musique en codant\n" +
          "- ✈️ Voyager et découvrir de nouveaux endroits\n\n" +
          "> (modifie cette section avec tes vrais loisirs)",
        "contact.md":
          "# Contact\n\nUn projet en tête ? Parlons-en.\n\n" +
          "- 📧 [aluquerivasdev@gmail.com](mailto:aluquerivasdev@gmail.com)\n- 🏢 [desarrollo@easysoft.es](mailto:desarrollo@easysoft.es)\n" +
          "- 💼 [LinkedIn](https://es.linkedin.com/in/albertoluquerivas)\n- 🐙 [GitHub](https://github.com/aluquerivas-dev)\n" +
          "- 🌐 [easysoft.es](https://easysoft.es)\n" +
          "- 📚 [wiki.easysoft.es](https://wiki.easysoft.es)\n" +
          "- 🛒 [Dolistore](https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60)",
        "README.md":
          "# Portfolio — Albert Luque Rivas\n\n" +
          "Portfolio avec une **interface type IDE**, un copilote **IA** et **5 langues**.\n" +
          "Fait en HTML, CSS et JavaScript vanilla. Sans build.\n\n" +
          "## Utilisation\nOuvre index.html ou sers-le avec Live Server.\n\n" +
          "## Langues\nClique sur l'icône 🌐 (barre latérale) et choisis une langue.\n\n" +
          "## IA\nClique sur l'icône ✦ pour ouvrir le copilote et poser des questions.",
        "game.js":
          "// game.js — mini-jeu Snake sur canvas (vanilla, sans dépendances)\n" +
          "// Appuie sur Jouer. Commandes : flèches / WASD · swipe sur mobile.",
      },
      ai: {
        greeting: "Salut ! 👋 Je suis le copilote d'Albert. Demande-moi ses compétences, projets, expérience ou comment le contacter.",
        suggestions: [
          { label: "🧩 Compétences", q: "Quelles technologies maîtrises-tu ?" },
          { label: "📦 Projets", q: "Parle-moi de tes projets" },
          { label: "📈 Expérience", q: "Quelle est ton expérience ?" },
          { label: "✉️ Contact", q: "Comment te contacter ?" },
        ],
        answers: {
          about: "Albert Luque Rivas est **CTO & cofondateur d'EasySoft Tech**. Ingénieur informatique spécialisé en **ERP, SaaS et architecture full-stack** (PHP, Dolibarr, Laravel, JavaScript).",
          skills: "Solide en **PHP**, **JavaScript**, **SQL/MySQL** et **HTML/CSS**, surtout en **Dolibarr ERP**. Aussi React, Node.js, Git et Docker. Ouvre `skills.md`.",
          projects: "Personnalisations Dolibarr v18, modules commerciaux sur **Dolistore**, une app de batteries à domicile et des rapports de ventes sur mesure. Voir `projects.json`.",
          experience: "**CTO & cofondateur d'EasySoft Tech** depuis 2025. Avant : 5 ans full-stack chez Cleverbyte Consulting et enseignant IT au MEDAC. Voir `experience.log`.",
          contact: "Contacte-le à **aluquerivasdev@gmail.com**, sur **LinkedIn** (in/albertoluquerivas) ou easysoft.es. Ouvre `contact.md`.",
          languages: "Espagnol natif et anglais technique.",
          location: "Il est à **Córdoba (Espagne)** et travaille à distance.",
          fun: "Tout ce portfolio est un IDE avec copilote IA et 5 langues. Plutôt méta, non ? 😎 Essaie d'ouvrir `game.js`.",
          help: "Tu peux me demander ses **compétences**, **projets**, **expérience**, **langues** ou **comment le contacter**.",
          fallback: "Bonne question 🤔. Je suis encore un copilote simple : essaie compétences, projets, expérience ou contact.",
        },
      },
    },
  },
};
