import { technologiesImgUrl } from 'atomic'

const techData: readonly [string, string, string, string][] = [
  ['PHP', 'php.svg', 'https://www.php.net/', technologiesImgUrl],
  ['Laravel 11', 'laravel.svg', 'https://laravel.com/', technologiesImgUrl],
  [
    'TypeScript',
    'typescript.svg',
    'https://www.typescriptlang.org/',
    technologiesImgUrl,
  ],
  ['Vue', 'vue.svg', 'https://vuejs.org/', technologiesImgUrl],
  [
    'PrimeVue 4',
    'primevue.svg',
    'https://v3.primevue.org/',
    technologiesImgUrl,
  ],
  [
    'HTML5',
    'html5.svg',
    'https://html.spec.whatwg.org/multipage/',
    technologiesImgUrl,
  ],
  ['SCSS', 'scss.svg', 'https://sass-lang.com/', technologiesImgUrl],
  ['MySQL', 'mysql.svg', 'https://www.mysql.com/', technologiesImgUrl],
  ['Docker', 'docker.svg', 'https://www.docker.com/', technologiesImgUrl],
  ['Heroku', 'heroku.svg', 'https://www.heroku.com/', technologiesImgUrl],
  ['Vite', 'vite.svg', 'https://vitejs.dev/', technologiesImgUrl],
  ['Vitest', 'vitest.svg', 'https://vitest.dev/', technologiesImgUrl],
  ['Pest', 'pest.svg', 'https://pestphp.com/', technologiesImgUrl],
  [
    'Storybook',
    'storybook.svg',
    'https://storybook.js.org/',
    technologiesImgUrl,
  ],
  ['Cypress', 'cypress.svg', 'https://www.cypress.io/', technologiesImgUrl],
  [
    'Sonarcloud',
    'sonarcloud.svg',
    'https://www.sonarsource.com/products/sonarcloud/',
    technologiesImgUrl,
  ],
  ['ESLint', 'eslint.svg', 'https://eslint.org/', technologiesImgUrl],
  ['Stylelint', 'stylelint.svg', 'https://stylelint.io/', technologiesImgUrl],
  [
    'Husky',
    'husky.svg',
    'https://typicode.github.io/husky/',
    technologiesImgUrl,
  ],
  ['Prettier', 'prettier.svg', 'https://prettier.io/', technologiesImgUrl],
] as const

export const technologies = techData.map(([name, image, url, prefix]) => ({
  name,
  image,
  url,
  prefix,
}))
