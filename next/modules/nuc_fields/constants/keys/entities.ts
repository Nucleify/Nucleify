export const entitiesKeys: string[] = ['article', 'contact', 'money', 'user']

export const structuralEntitiesKeys: string[] = ['question', 'technology']

export const allEntitiesKeys: string[] = [
  'activity',
  'file',
  ...entitiesKeys,
  ...structuralEntitiesKeys,
]
