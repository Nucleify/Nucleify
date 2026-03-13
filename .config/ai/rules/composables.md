# Composables

## Auto-imports

Directories auto-imported by Nuxt (no explicit imports needed): `nuxt/composables/**`, `nuxt/atomic/**`, `modules/**`.

## useConfig / apiUrl / appUrl

Singleton runtime config wrapper in `nuxt/composables/config/`:

```typescript
const config = useConfig()
config.get('apiUrl') // returns runtime config value

// Shorthand helpers (auto-imported)
apiUrl()  // API base URL (e.g. 'http://localhost/api')
appUrl()  // App URL (e.g. 'http://localhost:3000')
appEnv()  // Environment (e.g. 'local', 'production')
```

Used in API request composables:

```typescript
await apiHandle<T>({ url: apiUrl() + '/articles', ... })
```

## Other Key Composables (from modules)

- `useOfficeType()` (`nuc_pages`) — returns layout name based on current route
- `useDarkMode()` (`nuc_dark_mode`) — `{ isDark }` reactive dark mode state
- `useLoading()` (`nuc_loading`) — `{ loading, setLoading }` for async operations
- `useNucDialog()` (`nuc_dialog`) — `{ closeDialog }` for dialog management
- `useNucToast()` — toast notifications
