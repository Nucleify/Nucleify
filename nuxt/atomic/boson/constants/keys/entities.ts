export const entitiesKeys: string[] = ['article', 'contact', 'money', 'user']

export const structuralEntitiesKeys: string[] = [
  'card',
  'feature',
  'link',
  'question',
  'technology',
]

export const allEntitiesKeys: string[] = [
  'activity',
  ...entitiesKeys,
  ...structuralEntitiesKeys,
  'task',
]
