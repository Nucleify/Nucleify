/**
 * Helper to register all Primevue components dynamically as: ...app.component('TabMenu', TabMenu);
 */
const globalComponentsRegistry = (components: any, context: any): void => {
  Object.entries(components).forEach(([keyName, definition]): void => {
    context.component(keyName, definition)
  })
}

export default globalComponentsRegistry
