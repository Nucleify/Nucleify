import { TechnologyInterface } from 'atomic/bosons/types'

const techData: readonly TechnologyInterface[] = [
  ['php.svg', 'https://www.php.net/'],
  ['laravel.svg', 'https://laravel.com/'],
  ['typescript.svg', 'https://www.typescriptlang.org/'],
  ['vue.svg', 'https://vuejs.org/'],
  ['primevue.svg', 'https://v3.primevue.org/'],
  ['html5.svg', 'https://html.spec.whatwg.org/multipage/'],
  ['scss.svg', 'https://sass-lang.com/'],
  ['mysql.svg', 'https://www.mysql.com/'],
  ['docker.svg', 'https://www.docker.com/'],
  ['heroku.svg', 'https://www.heroku.com/'],
  ['vite.svg', 'https://vitejs.dev/'],
  ['vitest.svg', 'https://vitest.dev/'],
  ['pest.svg', 'https://pestphp.com/'],
  ['storybook.svg', 'https://storybook.js.org/'],
  ['cypress.svg', 'https://www.cypress.io/'],
  ['sonarcloud.svg', 'https://www.sonarsource.com/products/sonarcloud/'],
  ['eslint.svg', 'https://eslint.org/'],
  ['stylelint.svg', 'https://stylelint.io/'],
  ['husky.svg', 'https://typicode.github.io/husky/'],
  ['prettier.svg', 'https://prettier.io/'],
] as const

export const technologies: readonly TechnologyInterface[] = techData.map(
  ([image, url]): readonly TechnologyInterface[] => ({
    image,
    url,
  })
) as const
