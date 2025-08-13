import type { NavLinkObjectInterface } from '.'

export const navLinks: NavLinkObjectInterface[] = [
  {
    label: 'links.home.label',
    href: 'links.home.href',
  },
  {
    label: 'links.services.label',
    href: 'links.services.href',
  },
  {
    label: 'links.about.label',
    href: 'links.about.href',
  },
  {
    label: 'links.blog.label',
    href: 'links.blog.href',
  },
  {
    label: 'links.login.label',
    href: 'links.login.href',
    isButton: true,
    class: 'login-button',
  },
]
