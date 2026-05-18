import {
  NucModulesSettings,
  NucModulesSettingsDetail,
} from './settings/index.ts'

interface ComponentRegistrar {
  component: (name: string, component: unknown) => ComponentRegistrar
}

export function registerNucModules(app: ComponentRegistrar): void {
  app
    .component('nuc-modules-settings', NucModulesSettings)
    .component('nuc-modules-settings-detail', NucModulesSettingsDetail)
}
