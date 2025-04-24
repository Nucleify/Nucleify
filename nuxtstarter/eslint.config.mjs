import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  // ...options for Nuxt integration
})
  .append(
    // ...append other flat config items
  )
  .prepend(
    // ...prepend other flat config items before the base config
  )
  // override a specific config item based on their name
  .override(
    'nuxt/rules', // specify the name of the target config, or index
    {
      rules: {
        // ...override the rules
        'vue/html-self-closing': 'off',
        'vue/multi-word-component-names': 'off'
      }
    }
  )
