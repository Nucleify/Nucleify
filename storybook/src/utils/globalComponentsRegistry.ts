import { App, Component } from 'vue'

interface ComponentRegistry {
    [key: string]: Component
}

/**
 * Helper to register all Primevue components dynamically as: ...app.component('TabMenu', TabMenu);
 */
const globalComponentsRegistry = (
    components: ComponentRegistry,
    context: App
): void => {
    Object.entries(components).forEach(([keyName, definition]): void => {
        context.component(keyName, definition)
    })
}

export default globalComponentsRegistry
