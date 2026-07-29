# @nucleify/shared-modules

Thin shared surface used by `root` (and later admin/docs/compiler).

Currently absorbed (not git submodules):

- `nuc_api`
- `nuc_colors`
- `nuc_dark_mode`
- `nuc_globals`
- `nuc_languages`

Apps import from here directly (or via the `modules` alias → this package). There is no `root/modules` copy.
