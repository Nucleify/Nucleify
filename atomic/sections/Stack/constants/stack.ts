import { BoxInterface } from 'atomic'

const stackData: readonly [string, string, string][] = [
  [
    'php.svg',
    'PHP',
    'Popular server-side programming language, often used for creating dynamic websites and web applications.',
  ],
  [
    'laravel.svg',
    'Laravel',
    'A PHP open-source framework designed for simple web application development with elegant and readable code.',
  ],
  [
    'typescript.svg',
    'TypeScript',
    'A superset of JavaScript that adds static typing, which helps detect errors and improves code readability',
  ],
  [
    'vue.svg',
    'Vue.js',
    'A progressive JavaScript framework for building user interfaces, known for its simplicity and performance.',
  ],
  [
    'primevue.svg',
    'PrimeVue',
    'A UI component library for the Vue.js framework, offering a rich selection of ready-made user interface elements.',
  ],
  [
    'html5.svg',
    'HTML5',
    'The latest version of the HTML markup language. It enables the creation of responsive and semantic websites with multimedia support, without the need for additional plugins.',
  ],
  [
    'scss.svg',
    'SCSS (Sass)',
    'A CSS preprocessor that extends its capabilities by adding variables, nesting rules, and other advanced features.',
  ],
  [
    'mysql.svg',
    'MySQL',
    'A relational database, popular in web applications. It enables the storage and management of large sets of data',
  ],
  [
    'docker.svg',
    'Docker',
    'A platform for containerizing applications, enabling the execution of apps in isolated environments. It simplifies the creation, deployment, and management of applications.',
  ],
  [
    'heroku.svg',
    'Heroku',
    'A cloud-based PaaS (Platform-as-a-Service) platform, allowing easy deployment, scaling, and management of web applications',
  ],
  [
    'vite.svg',
    'Vite',
    'A tool for building frontend projects, offering an ultra-fast development process and instant refresh during work',
  ],
  [
    'vitest.svg',
    'Vitest',
    'A lightweight and fast testing framework for applications written in TypeScript and JavaScript, designed to work as a companion to Vite.',
  ],
  [
    'pest.svg',
    'Pest',
    'A simple and elegant unit testing framework for PHP, designed with readability and performance in mind.',
  ],
  [
    'storybook.svg',
    'Storybook',
    'A tool for building, testing, and documenting user interface components in isolation, supporting various frontend frameworks.',
  ],
  [
    'cypress.svg',
    'Cypress',
    'An end-to-end testing framework for web applications. It allows fast and easy writing of user interface tests in real browsers.',
  ],
  [
    'sonarcloud.svg',
    'SonarCloud',
    'A cloud-based tool for code quality analysis. It helps identify bugs, security issues, and technical debt.',
  ],
  [
    'eslint.svg',
    'ESLint',
    'A tool for static analysis of JavaScript and TypeScript code. It helps detect errors and coding convention violations, ensuring better code quality.',
  ],
  [
    'stylelint.svg',
    'Stylelint',
    'A linter for CSS and SCSS, helping enforce styling standards and detect errors in code.',
  ],
  [
    'husky.svg',
    'Husky',
    'A tool for managing Git hooks, enabling the execution of scripts (e.g., linting) before committing changes to a repository.',
  ],
  [
    'prettier.svg',
    'Prettier',
    'An automatic code formatting tool that supports multiple programming languages, ensuring a consistent coding style.',
  ],
] as const

export const technologyStack: readonly BoxInterface[] = stackData.map(
  ([src, title, description]): BoxInterface => ({
    src,
    title,
    description,
  })
)
