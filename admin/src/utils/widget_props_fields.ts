import type { FieldConfig } from '../../../shared_modules/nuc_admin/cms/fields/types'
import type { WidgetPropSchema } from '../../../shared_modules/nuc_admin/cms/registry'

/** Map widget propsSchema → FieldConfig[] for SchemaFormRenderer. */
export function fieldsFromPropsSchema(schema: WidgetPropSchema): FieldConfig[] {
  return Object.entries(schema).map(([name, def]) => {
    const required = Boolean(def.required)
    switch (def.type) {
      case 'number':
        return { type: 'number', name, label: name, required }
      case 'boolean':
        return { type: 'checkbox', name, label: name, required }
      case 'array':
      case 'object':
        return { type: 'json', name, label: name, required }
      default:
        return { type: 'text', name, label: name, required }
    }
  })
}
