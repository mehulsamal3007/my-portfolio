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
  githubUrl: string
  projectUrl: string
  accent: string
}

export const profile = {
  name: 'Mehul',
  title: 'QA Automation Engineer',
  intro:
    'Building reliable, scalable and maintainable test automation solutions that help teams ship with confidence.',
  availability: 'Open to new opportunities',
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const heroBadges = [
  'Playwright',
  'TypeScript',
  'Selenium',
  'Java',
  'API Testing',
]

export const aboutStats = [
  { value: '~6', label: 'Years Experience' },
  { value: 'Automation', label: 'Primary Focus' },
  { value: 'Web + API', label: 'Testing' },
]

export const skills: SkillGroup[] = [
  {
    title: 'AUTOMATION',
    items: ['Playwright', 'Selenium', 'TestNG', 'Cucumber BDD'],
  },
  {
    title: 'LANGUAGES',
    items: ['TypeScript', 'Java'],
  },
  {
    title: 'API TESTING',
    items: ['REST API', 'RestAssured', 'Postman'],
  },
  {
    title: 'TESTING',
    items: [
      'Manual Testing',
      'Functional Testing',
      'Regression Testing',
      'Test Planning',
      'Defect Management',
    ],
  },
  {
    title: 'TOOLS',
    items: ['Git', 'GitHub', 'GitHub Copilot'],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: '[COMPANY NAME]',
    role: 'QA Automation Engineer',
    period: '[START DATE] — [END DATE / PRESENT]',
    responsibilities: [
      'Developed and maintained automated test suites.',
      'Worked with Playwright and Selenium to improve validation coverage.',
      'Created reusable automation components and test utilities.',
      'Performed functional and regression testing across critical flows.',
      'Worked on API testing for backend validation and contract checks.',
      'Participated in test planning and release-readiness reviews.',
      'Reported and managed defects through the QA lifecycle.',
      'Collaborated with QA and development teams to improve product quality.',
    ],
  },
  {
    company: '[COMPANY NAME]',
    role: 'QA Engineer',
    period: '[START DATE] — [END DATE]',
    responsibilities: [
      'Executed manual and automated testing for web applications.',
      'Validated business-critical user journeys and regression scenarios.',
      'Contributed to defect reporting, triage, and tracking.',
      'Supported end-to-end quality validation across UI and API layers.',
      'Helped maintain a consistent testing mindset across the release process.',
    ],
  },
]

export const automationPipeline: PipelineStep[] = [
  {
    title: 'Requirement Review',
    description: 'Translate scope into validation goals and risk areas.',
  },
  {
    title: 'Test Design',
    description: 'Build robust scenarios that cover real user behavior.',
  },
  {
    title: 'Automation',
    description: 'Create maintainable flows with scalable test architecture.',
  },
  {
    title: 'Execution',
    description: 'Run checks with consistent environments and fail-fast feedback.',
  },
  {
    title: 'Reporting',
    description: 'Communicate outcomes clearly and track quality signals.',
  },
  {
    title: 'Defect Analysis',
    description: 'Investigate failures to uncover root causes and prevent recurrence.',
  },
  {
    title: 'Continuous Improvement',
    description: 'Refine coverage and execution quality over time.',
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'Playwright Automation Framework',
    description:
      'End-to-end automation framework designed for scalable and maintainable web application testing.',
    technologies: ['Playwright', 'TypeScript', 'BDD', 'Git'],
    githubUrl: '#',
    projectUrl: '#',
    accent: 'from-cyan-500/20 to-sky-500/5',
  },
  {
    title: 'Selenium Automation Framework',
    description:
      'Web automation framework focused on reusable page objects, test execution and maintainability.',
    technologies: ['Selenium', 'Java', 'TestNG', 'POM'],
    githubUrl: '#',
    projectUrl: '#',
    accent: 'from-indigo-500/20 to-blue-500/5',
  },
  {
    title: 'API Automation',
    description:
      'Automated API validation covering functional scenarios and response verification.',
    technologies: ['REST API', 'RestAssured', 'Postman'],
    githubUrl: '#',
    projectUrl: '#',
    accent: 'from-emerald-500/20 to-cyan-500/5',
  },
  {
    title: 'Test Automation Strategy',
    description:
      'Structured approach to designing maintainable automation coverage across functional and regression scenarios.',
    technologies: ['Automation', 'Regression', 'BDD', 'API Testing'],
    githubUrl: '#',
    projectUrl: '#',
    accent: 'from-violet-500/20 to-sky-500/5',
  },
]

export const techMarquee = [
  'PLAYWRIGHT',
  'TYPESCRIPT',
  'SELENIUM',
  'JAVA',
  'TESTNG',
  'CUCUMBER',
  'REST ASSURED',
  'POSTMAN',
  'GIT',
  'GITHUB',
]

export const contactLinks = {
  email: 'YOUR_EMAIL',
  phone: 'YOUR_PHONE_NUMBER',
  linkedin: 'YOUR_LINKEDIN_URL',
  github: 'YOUR_GITHUB_URL',
}

export const siteContent = {
  profile,
  navItems,
  hero: {
    badges: heroBadges,
    projectButtonLabel: 'View My Work',
    resumeButtonLabel: 'Download Resume',
    resumeUrl: '/Mehul-Resume.pdf',
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
  about: {
    eyebrow: 'About Me',
    heading: 'Quality-first engineering with a testing mindset.',
    paragraphs: [
      'I’m a QA Automation Engineer with approximately 6 years of experience building dependable test automation for web and API workflows. My work focuses on creating maintainable automation frameworks using Playwright, Selenium, TypeScript, Java, and API testing tools that help teams release with greater confidence.',
      'I’ve worked across functional testing, regression validation, defect management, and test planning while supporting both manual and automated quality initiatives. My experience spans e-commerce and mass & media domains, where reliability, traceability, and delivery confidence are critical.',
    ],
    stats: aboutStats,
  },
  skillsSection: {
    eyebrow: 'Skills',
    heading: 'Tools and practices for dependable quality delivery.',
    groups: skills,
  },
  experienceSection: {
    eyebrow: 'Experience',
    heading: 'Practical experience across quality engineering and automation.',
    items: experience,
  },
  automationSection: {
    eyebrow: 'Automation Showcase',
    heading: 'How I think about quality.',
    steps: automationPipeline,
  },
  projectsSection: {
    eyebrow: 'Projects',
    heading: 'A few representative automation initiatives.',
    items: projects,
    githubButtonLabel: 'GitHub',
    projectButtonLabel: 'View Project',
  },
  terminal: {
    title: 'QA Automation Terminal',
    lines: [
      '$ npm run test',
      'Initializing test suite…',
      '✓ Login test',
      '✓ Search test',
      '✓ Product validation',
      '✓ Checkout test',
      '✓ API validation',
      'Tests: 42',
      'Passed: 42',
      'Failed: 0',
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
