import { technologiesImgUrl, TechnologyInterface } from 'atomic'

const techData: readonly [string, string, string][] = [
  ['php.svg', 'https://www.php.net/', technologiesImgUrl],
  ['laravel.svg', 'https://laravel.com/', technologiesImgUrl],
  ['typescript.svg', 'https://www.typescriptlang.org/', technologiesImgUrl],
  ['vue.svg', 'https://vuejs.org/', technologiesImgUrl],
  ['primevue.svg', 'https://v3.primevue.org/', technologiesImgUrl],
  ['html5.svg', 'https://html.spec.whatwg.org/multipage/', technologiesImgUrl],
  ['scss.svg', 'https://sass-lang.com/', technologiesImgUrl],
  ['mysql.svg', 'https://www.mysql.com/', technologiesImgUrl],
  ['docker.svg', 'https://www.docker.com/', technologiesImgUrl],
  ['heroku.svg', 'https://www.heroku.com/', technologiesImgUrl],
  ['vite.svg', 'https://vitejs.dev/', technologiesImgUrl],
  ['vitest.svg', 'https://vitest.dev/', technologiesImgUrl],
  ['pest.svg', 'https://pestphp.com/', technologiesImgUrl],
  ['storybook.svg', 'https://storybook.js.org/', technologiesImgUrl],
  ['cypress.svg', 'https://www.cypress.io/', technologiesImgUrl],
  [
    'sonarcloud.svg',
    'https://www.sonarsource.com/products/sonarcloud/',
    technologiesImgUrl,
  ],
  ['eslint.svg', 'https://eslint.org/', technologiesImgUrl],
  ['stylelint.svg', 'https://stylelint.io/', technologiesImgUrl],
  ['husky.svg', 'https://typicode.github.io/husky/', technologiesImgUrl],
  ['prettier.svg', 'https://prettier.io/', technologiesImgUrl],
] as const

export const technologies: readonly TechnologyInterface[] = techData.map(
  ([image, url, prefix]): TechnologyInterface => ({
    image,
    url,
    prefix,
  })
)
