import type { EntityFieldInterface, UseFieldsInterface } from 'atomic'
import { languageCodes } from 'atomic'

export function useLinkFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['download', 'Download', 'input-text'],
    ['href', 'Href', 'input-text'],
    ['src', 'Src', 'input-text'],
    ['icon', 'Icon', 'input-text'],
    ['category', 'Category', 'input-text'],
    ['hreflang', 'Hreflang', 'input-text'],
    ['media', 'Media', 'input-text'],
    ['ping', 'Ping', 'input-text'],
    ['referrerpolicy', 'Referrer policy', 'select'],
    ['rel', 'Rel', 'select'],
    ['target', 'Target', 'select'],
    ['type', 'Type', 'input-text'],
    ['updated_at', 'Updated At', ''],
    ['created_at', 'Created At', ''],
  ] as const

  const referrerpolicyOptions: readonly string[] = [
    'no-referrer',
    'no-referrer-when-downgrade',
    'origin',
    'origin-when-cross-origin',
    'same-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url',
  ]

  const targetOptions = ['_blank', '_parent', '_self', '_top']
  const relOptions = [
    'alternate',
    'author',
    'bookmark',
    'external',
    'help',
    'license',
    'next',
    'nofollow',
    'noreferrer',
    'noopener',
    'prev',
    'search',
    'tag',
  ]

  const createAndEditFields: readonly EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): EntityFieldInterface => {
      const props =
        name === 'hreflang'
          ? {
              options: languageCodes,
              placeholder: 'Select a language code',
            }
          : name === 'referrerpolicy'
            ? {
                options: referrerpolicyOptions,
                placeholder: 'Select a referrer policy',
              }
            : name === 'target'
              ? {
                  options: targetOptions,
                  placeholder: 'Select a target',
                }
              : name === 'rel'
                ? {
                    options: relOptions,
                    placeholder: 'Select a rel attribute',
                  }
                : undefined

      return { name, label, type, props }
    })

  const showFields: readonly { label: string; key: string }[] = fieldData.map(
    ([key, label]) => ({
      name: key,
      key,
      label,
    })
  )

  return {
    createAndEditFields,
    showFields,
  }
}
