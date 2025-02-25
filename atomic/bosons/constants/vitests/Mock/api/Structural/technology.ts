import { TechnologyInterface } from 'atomic'

export const mockTechnology: TechnologyInterface = {
  id: 999,
  user_id: Number(window.sessionStorage.getItem('user_id')),
  href: 'Example href',
  src: 'Example src',
  label: 'Example label',
  description: 'Example description',
  category: 'example',
  display: false,
}
