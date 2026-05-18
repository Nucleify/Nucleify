import type { ChartSettingsGroupInterface } from '../types/interfaces'

export function modulesGroups(
  withCategory: boolean = false
): ChartSettingsGroupInterface[] {
  return [
    {
      name: 'nuc_activity',
      items: ['Activity'],
    },
    {
      name: 'nuc_entities',
      items: [withCategory && 'Entities', 'Article', 'Contact', 'Money'].filter(
        Boolean
      ) as string[],
    },
    {
      name: 'nuc_entities_structural',
      items: [
        withCategory && 'Structural',
        'Card',
        'Feature',
        'Link',
        'Question',
        'Technology',
      ].filter(Boolean) as string[],
    },
    {
      name: 'nuc_files',
      items: ['File'],
    },
    {
      name: 'nuc_tasks',
      items: ['Task'],
    },
  ]
}
