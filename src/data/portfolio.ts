export type NavItem = {
  label: string
  href: string
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  responsibilities: string[]
}

export type PipelineStep = {
  title: string
  description: string
}

export type ProjectItem = {
  title: string
  description: string
  technologies: string[]
  status: string
  githubUrl: string
  projectUrl: string
  accent: string
}

export const profile = {
  name: 'Mehul Samal',
  title: 'Software Test Automation Engineer',
  photoUrl: '',
  intro:
    'Building reliable, scalable and maintainable test automation solutions that help teams ship with confidence.',
  availability: 'Bangalore, Karnataka',
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Demo Projects', href: '#demo-projects' },
  { label: 'Contact', href: '#contact' },
]

export const heroBadges = [
  'Playwright',
  'Selenium WebDriver',
  'TypeScript',
  'Java',
  'Cucumber BDD',
]

export const aboutStats = [
  { value: '6+', label: 'Years Experience' },
  { value: '30% to 95%', label: 'Automation Pass Rate' },
  { value: 'Java + TypeScript', label: 'Automation Languages' },
]

export const skills: SkillGroup[] = [
  {
    title: 'AUTOMATION',
    items: ['Selenium WebDriver', 'Playwright', 'Micro Focus UFT'],
  },
  {
    title: 'LANGUAGES',
    items: ['TypeScript', 'Java'],
  },
  {
    title: 'FRAMEWORKS',
    items: ['Cucumber BDD', 'LAT'],
  },
  {
    title: 'DATABASE',
    items: ['JDBC', 'MySQL'],
  },
  {
    title: 'TEST MANAGEMENT',
    items: ['HP ALM', 'Jira', 'Zephyr'],
  },
  {
    title: 'VERSION CONTROL',
    items: ['GitHub', 'Bitbucket'],
  },
  {
    title: 'DEVELOPMENT TOOLS',
    items: ['GitHub Copilot', 'IntelliJ IDEA', 'Eclipse', 'VS Code'],
  },
  {
    title: 'TESTING EXPERTISE',
    items: [
      'Functional Testing',
      'Regression Testing',
      'Test Planning',
      'Defect Tracking',
      'Automation Framework Design & Maintenance',
    ],
  },
  {
    title: 'OPERATING SYSTEMS',
    items: ['Windows', 'macOS', 'iOS', 'Android'],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: 'Infosys',
    role: 'Quality Engineering Analyst',
    period: 'June 2024 — Present',
    responsibilities: [
      'Designed and executed automated e-commerce test scripts using Selenium WebDriver, Java, and Cucumber.',
      'Migrated a legacy Selenium/Java framework to Playwright/TypeScript to improve scalability and execution speed.',
      'Built Playwright test cases with GitHub Copilot to accelerate automation development.',
      'Added network logging, traces, and video capture for failed tests to improve debugging and root-cause analysis.',
      'Centralized test inputs outside feature files and automated regression prerequisite checks.',
      'Performed manual testing for non-automatable scenarios, reviewed test coverage, and tracked defects.',
    ],
  },
  {
    company: 'Capgemini Technology Services India Limited',
    role: 'Consultant',
    period: 'July 2020 — June 2024',
    responsibilities: [
      'Developed and maintained Selenium WebDriver automation using Java for web applications.',
      'Redesigned automation frameworks to improve maintainability and execution efficiency.',
      'Improved the automation passing rate from 30% to 95% with JDBC-based data handling.',
      'Executed functional and regression testing, and tracked defects in HP ALM.',
      'Prepared test plans, estimates, and daily and weekly status reports.',
      'Led and mentored QA team members on automation practices and coding standards.',
      'Worked with business and development teams across requirements, testing, defect management, and Waterfall releases.',
    ],
  },
]

export const automationPipeline: PipelineStep[] = [
  {
    title: 'Framework Migration',
    description: 'Moved legacy Selenium/Java automation to Playwright/TypeScript.',
  },
  {
    title: 'Test Development',
    description: 'Built automated web tests with Selenium, Java, and Cucumber.',
  },
  {
    title: 'Test Data',
    description: 'Centralized test inputs and used JDBC-based data handling.',
  },
  {
    title: 'Regression',
    description: 'Automated prerequisite checks for smoother regression runs.',
  },
  {
    title: 'Failure Analysis',
    description: 'Captured network logs, traces, and video for failed tests.',
  },
  {
    title: 'Defect Tracking',
    description: 'Documented and tracked defects to support timely resolution.',
  },
  {
    title: 'Team Delivery',
    description: 'Collaborated across QA, business, and development teams.',
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'Playwright E2E Framework',
    description:
      'A planned sample framework for maintainable browser tests, reusable fixtures, parallel execution, and clear failure diagnostics.',
    technologies: ['Playwright', 'TypeScript', 'Fixtures', 'Trace Viewer'],
    status: 'Planned demo',
    githubUrl: '',
    projectUrl: '',
    accent: 'from-cyan-500/20 to-sky-500/5',
  },
  {
    title: 'Selenium + Cucumber BDD',
    description:
      'A planned Java demo showing readable Gherkin scenarios, reusable step definitions, and a page-object approach.',
    technologies: ['Selenium WebDriver', 'Java', 'Cucumber BDD'],
    status: 'Planned demo',
    githubUrl: '',
    projectUrl: '',
    accent: 'from-indigo-500/20 to-blue-500/5',
  },
  {
    title: 'API Testing Collection',
    description:
      'A planned API testing demo covering organized requests, positive and negative cases, and response validation.',
    technologies: ['REST API', 'Postman', 'Assertions'],
    status: 'Planned demo',
    githubUrl: '',
    projectUrl: '',
    accent: 'from-emerald-500/20 to-cyan-500/5',
  },
  {
    title: 'Test Data and Regression Strategy',
    description:
      'A planned example of data-driven test design, regression selection, and setup checks for repeatable runs.',
    technologies: ['Test Strategy', 'Test Data', 'Regression'],
    status: 'Planned demo',
    githubUrl: '',
    projectUrl: '',
    accent: 'from-violet-500/20 to-sky-500/5',
  },
]

export const techMarquee = [
  'PLAYWRIGHT',
  'SELENIUM WEBDRIVER',
  'JAVA',
  'TYPESCRIPT',
  'CUCUMBER BDD',
  'MICRO FOCUS UFT',
  'JDBC',
  'MYSQL',
  'JIRA',
  'ZEPHYR',
  'HP ALM',
  'BITBUCKET',
]

export const contactLinks = {
  email: 'mehul.samal0797@gmail.com',
  phone: '7021609322',
  linkedin: 'https://www.linkedin.com/in/mehul-samal-539474117/',
  github: '',
}

export const siteContent = {
  profile,
  navItems,
  hero: {
    badges: heroBadges,
    projectButtonLabel: 'Demo Projects',
    connectLabel: 'Let’s Connect',
    qualityLabel: 'Quality Focus',
    qualityTitle: 'Reliable by design',
    automationLabel: 'Automation',
    automationValue: 'Playwright',
    frameworkLabel: 'Framework',
    frameworkValue: 'TypeScript',
    coverageLabel: 'Coverage',
    coverage: [
      { label: 'UI', value: 92 },
      { label: 'API', value: 88 },
      { label: 'Regression', value: 95 },
    ],
  },
  welcomePopup: {
    enabled: true,
    greeting: 'Hi, I’m Mehul!',
    introduction: 'Welcome to my portfolio. I’m a QA Automation Engineer with 6+ years of experience building reliable test automation across e-commerce and media & entertainment. Explore my experience and demo projects to learn more about my work and approach.',
  },
  videoIntroduction: {
    enabled: false,
    title: 'Video Introduction',
    caption: 'A short introduction from me.',
    videoUrl: '',
  },
  about: {
    eyebrow: 'About Me',
    heading: 'Automation engineering focused on reliable releases.',
    paragraphs: [
      'I am a QA Automation Engineer with 6+ years of experience in automation and manual testing across e-commerce and media & entertainment. My work includes Selenium WebDriver with Java, Playwright with TypeScript, Cucumber BDD, automation framework development, and regression testing.',
      'I have migrated legacy automation frameworks, optimized test data handling, and improved debugging with network logs, traces, and video capture. At Capgemini, JDBC-based data handling helped improve the automation passing rate from 30% to 95%.',
      'I hold a B.E. in Computer Engineering from Saraswati College of Engineering (2015–2019). My contributions have been recognized with an Innovation Award and a Delivery Excellence Award, along with promotions from Senior Analyst to Associate Consultant and Consultant.',
    ],
    stats: aboutStats,
  },
  skillsSection: {
    eyebrow: 'Skills',
    heading: 'Tools and practices used across test automation and quality engineering.',
    groups: skills,
  },
  experienceSection: {
    eyebrow: 'Experience',
    heading: 'Quality engineering experience at Infosys and Capgemini.',
    items: experience,
  },
  automationSection: {
    eyebrow: 'Automation Showcase',
    heading: 'How I think about quality.',
    steps: automationPipeline,
  },
  projectsSection: {
    eyebrow: 'Demo Projects',
    heading: 'Planned demos to showcase my testing approach and technical skills.',
    intro: 'These personal showcase concepts are separate from the professional work listed in Experience. I’ll add project links as I build them.',
    items: projects,
    githubButtonLabel: 'GitHub',
    projectButtonLabel: 'View Project',
  },
  terminal: {
    title: 'Automation Delivery Highlights',
    lines: [
      'Selenium / Java to Playwright / TypeScript migration',
      'Network logs, traces, and video for failed tests',
      'Centralized test inputs outside feature files',
      'Automated regression prerequisite checks',
      'Automation passing rate improved from 30% to 95%',
    ],
  },
  techMarquee,
  contact: {
    ...contactLinks,
    eyebrow: 'Contact',
    heading: 'Let’s Build Better Quality.',
    body: 'Have an opportunity, project, or simply want to connect? I’d be happy to hear from you.',
    emailButtonLabel: 'Email Me',
    linkedinButtonLabel: 'LinkedIn',
    phoneButtonLabel: 'Call Me',
  },
}

export type SiteContent = typeof siteContent
