export const vueConfig = {
  compilerOptions: {
    isCustomElement: (tag: string) => tag.startsWith('nui-'),
  },
}
