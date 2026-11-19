import {
  type MaybeRefOrGetter,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toValue,
  watch,
} from 'vue'

import { homeThankYouHref } from '../cms/defaults/content/home'
import {
  composeHomeContactMessage,
  type HomeContactWebsiteType,
  lockNuiTextareaResize,
  nuiHostValue,
  nuiValueFromEvent,
  submitHomeContactForm,
  validateHomeContactForm,
} from '../utils/contact_form'

type Options = {
  defaultWebsiteType: MaybeRefOrGetter<string>
  lang: MaybeRefOrGetter<string>
}

function focusNuiInput(host: HTMLElement | null): void {
  const root = host as (HTMLElement & { shadowRoot?: ShadowRoot | null }) | null
  const input =
    root?.shadowRoot?.querySelector('input') || root?.querySelector?.('input')
  if (input instanceof HTMLInputElement) input.focus()
}

/** Shared open/close commerce form used by home `close` and investor `ask`. */
export function useContactFormPanel(options: Options) {
  const formOpen = ref(false)
  const formKey = ref(0)
  const selectOpen = ref(false)
  const loading = ref(false)
  const email = ref('')
  const websiteType = ref(toValue(options.defaultWebsiteType))
  const note = ref('')
  const emailInput = ref<HTMLElement | null>(null)
  const typeSelect = ref<HTMLElement | null>(null)
  const noteInput = ref<HTMLElement | null>(null)
  const errors = reactive<{
    email?: string
    website_type?: string
    message?: string
  }>({})

  function clearErrors(): void {
    delete errors.email
    delete errors.website_type
    delete errors.message
  }

  function resetForm(): void {
    email.value = ''
    websiteType.value = toValue(options.defaultWebsiteType)
    note.value = ''
    selectOpen.value = false
    clearErrors()
    formKey.value += 1
  }

  function syncFromHosts(): void {
    const liveEmail = nuiHostValue(
      emailInput.value as { value?: unknown } | null
    )
    const liveType = nuiHostValue(
      typeSelect.value as { value?: unknown } | null
    )
    const liveNote = nuiHostValue(noteInput.value as { value?: unknown } | null)
    if (liveEmail) email.value = liveEmail
    if (liveType) websiteType.value = liveType
    if (liveNote) note.value = liveNote
  }

  function onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && formOpen.value && !loading.value) {
      event.preventDefault()
      closeForm()
    }
    if (event.key === 'Escape') selectOpen.value = false
  }

  function onDocClick(event: MouseEvent): void {
    const host = typeSelect.value
    if (!host || !selectOpen.value) return
    if (event.composedPath().includes(host)) return
    selectOpen.value = false
  }

  watch(
    [noteInput, formKey],
    () => {
      void nextTick(() => lockNuiTextareaResize(noteInput.value))
    },
    { flush: 'post' }
  )

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
    document.addEventListener('click', onDocClick, true)
    lockNuiTextareaResize(noteInput.value)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    document.removeEventListener('click', onDocClick, true)
  })

  async function openForm(): Promise<void> {
    formOpen.value = true
    await nextTick()
    window.setTimeout(() => focusNuiInput(emailInput.value), 280)
  }

  function closeForm(): void {
    formOpen.value = false
    resetForm()
  }

  function onEmailInput(event: Event): void {
    const value = nuiValueFromEvent(event)
    if (value === null) return
    email.value = value
    delete errors.email
  }

  function onTypeChange(event: Event): void {
    const value = nuiValueFromEvent(event)
    if (value === null) return
    websiteType.value = value
    selectOpen.value = false
    delete errors.website_type
  }

  function onNoteInput(event: Event): void {
    const value = nuiValueFromEvent(event)
    if (value === null) return
    note.value = value
    delete errors.message
  }

  async function onSubmit(_event?: Event): Promise<void> {
    if (loading.value) return

    // Prefer live Lit host values - Vue refs can lag when CE stay uncontrolled.
    syncFromHosts()

    const message = composeHomeContactMessage({ note: note.value })

    clearErrors()
    const validation = validateHomeContactForm({
      email: email.value,
      websiteType: websiteType.value,
      message,
    })

    if (validation) {
      Object.assign(errors, validation)
      if (validation.email) focusNuiInput(emailInput.value)
      return
    }

    loading.value = true
    const result = await submitHomeContactForm({
      email: email.value.trim().toLowerCase(),
      website_type: websiteType.value as HomeContactWebsiteType,
      ...(message ? { message } : {}),
    })
    if (result.ok) {
      window.location.href = homeThankYouHref(toValue(options.lang))
      return
    }

    loading.value = false
  }

  return {
    formOpen,
    formKey,
    selectOpen,
    loading,
    email,
    websiteType,
    note,
    emailInput,
    typeSelect,
    noteInput,
    errors,
    openForm,
    closeForm,
    onEmailInput,
    onTypeChange,
    onNoteInput,
    onSubmit,
  }
}
