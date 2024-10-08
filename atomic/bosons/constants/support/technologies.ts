import { TechnologyInterface } from 'atomic/bosons/types'

const techData: readonly TechnologyInterface[] = [
    ['php.svg', 'https://www.php.net/'],
    ['laravel.svg', 'https://laravel.com/'],
    ['typescript.svg', 'https://www.typescriptlang.org/'],
    ['vue.svg', 'https://vuejs.org/'],
    ['primevue.png', 'https://v3.primevue.org/'],
    ['html5.png', 'https://html.spec.whatwg.org/multipage/'],
    ['scss.svg', 'https://sass-lang.com/'],
    ['mysql.svg', 'https://www.mysql.com/'],
    ['docker.svg', 'https://www.docker.com/'],
    ['heroku.svg', 'https://www.heroku.com/'],
    ['vite.svg', 'https://vitejs.dev/'],
    ['vitest.svg', 'https://vitest.dev/'],
    ['pest.png', 'https://pestphp.com/'],
    ['storybook.png', 'https://storybook.js.org/'],
    ['cypress.png', 'https://www.cypress.io/'],
    ['sonarcloud.svg', 'https://www.sonarsource.com/products/sonarcloud/'],
    ['eslint.svg', 'https://eslint.org/'],
    ['husky.svg', 'https://typicode.github.io/husky/'],
    ['prettier.svg', 'https://prettier.io/'],
] as const

export const technologies: readonly TechnologyInterface[] = techData.map(
    ([image, url]): readonly TechnologyInterface[] => ({
        image,
        url,
    })
) as const
