<template>
  <section
    ref="rootEl"
    id="ask"
    class="nuc-close nuc-panel"
    :class="{ 'is-form': formOpen }"
    aria-labelledby="nuc-ask-title"
  >
    <div class="nuc-close-stage">
      <div class="nuc-close-pitch" :aria-hidden="formOpen">
        <div class="nuc-close-panel">
          <div class="nuc-close-copy">
            <h2 id="nuc-ask-title" class="nuc-title">
              {{ copy.askTitle }}
            </h2>
            <p class="nuc-support">{{ copy.askSupport }}</p>
          </div>
          <div class="nuc-close-cta">
            <nui-button
              :label="copy.askCta"
              variant="primary"
              icon="mdi:email-outline"
              icon-pos="right"
              @click="openForm"
            />
          </div>
        </div>
      </div>

      <div
        class="nuc-close-commerce"
        :aria-hidden="!formOpen"
        :inert="!formOpen"
      >
        <header class="nuc-close-commerce-head">
          <div>
            <h3 class="nuc-close-commerce-title">
              {{ copy.askModalTitle }}
            </h3>
          </div>
          <button
            type="button"
            class="nuc-close-back"
            :aria-label="copy.askCancel"
            @click="closeForm"
          >
            <nui-icon icon="mdi:arrow-left" mode="svg" />
            <span>{{ copy.askCancel }}</span>
          </button>
        </header>
        <p class="nuc-close-commerce-support">
          {{ copy.askModalSupport }}
        </p>

        <form class="nuc-close-form" novalidate @submit.prevent="onSubmit">
          <div class="nuc-close-grid">
            <div class="nuc-close-field">
              <span class="nuc-close-label">{{ copy.askEmailLabel }}</span>
              <nui-input-text
                :key="`email-${formKey}`"
                ref="emailInput"
                type="email"
                name="email"
                fluid
                autocomplete="email"
                :placeholder="copy.askEmailPlaceholder"
                :invalid.prop="Boolean(errors.email)"
                @input="onEmailInput"
              />
              <span v-if="errors.email" class="nuc-close-error" role="alert">
                {{ errors.email }}
              </span>
            </div>

            <div
              class="nuc-close-field"
              :class="{ 'is-select-open': selectOpen }"
            >
              <span class="nuc-close-label">{{ copy.askTypeLabel }}</span>
              <nui-select
                :key="`type-${formKey}`"
                ref="typeSelect"
                :options.prop="typeOptions"
                :value.prop="websiteType"
                fluid
                :placeholder="copy.askTypePlaceholder"
                :invalid.prop="Boolean(errors.website_type)"
                @nui-select-open="selectOpen = true"
                @nui-change="onTypeChange"
              />
              <span
                v-if="errors.website_type"
                class="nuc-close-error"
                role="alert"
              >
                {{ errors.website_type }}
              </span>
            </div>

            <div class="nuc-close-field nuc-close-field-wide">
              <span class="nuc-close-label">{{ copy.askNoteLabel }}</span>
              <nui-textarea
                :key="`note-${formKey}`"
                ref="noteInput"
                name="message"
                fluid
                :rows="4"
                :placeholder="copy.askNotePlaceholder"
                :invalid.prop="Boolean(errors.message)"
                @input="onNoteInput"
              />
              <span v-if="errors.message" class="nuc-close-error" role="alert">
                {{ errors.message }}
              </span>
            </div>
          </div>

          <div class="nuc-close-foot">
            <div class="nuc-close-actions">
              <nui-button
                type="button"
                variant="primary"
                :label="copy.askSubmit"
                :loading="loading"
                :disabled="loading"
                fluid
                width="100%"
                icon="mdi:send-outline"
                icon-pos="right"
                @click="onSubmit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>

    <footer class="nuc-close-footer">
      <span>© {{ year }} Nucleify</span>
      <nav class="nuc-close-footer-links" aria-label="Footer">
        <a :href="homeHref">{{ copy.navHome }}</a>
        <a :href="docsHref">{{ copy.navDocs }}</a>
        <a :href="copy.githubHref" target="_blank" rel="noopener noreferrer">
          {{ copy.navGitHub }}
        </a>
      </nav>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { navigateTo, useRoute } from 'nuxt/app'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from 'vue'

import {
  coalesceArray,
  composeHomeContactMessage,
  homeThankYouHref,
  type HomeContactWebsiteType,
  investorDocsHref,
  investorHomeHref,
  NUC_INVESTOR_CONTACT_TYPES,
  nuiHostValue,
  nuiValueFromEvent,
  pageHref,
  submitHomeContactForm,
  useCmsAttrs,
  useInvestorCmsCopy,
  useShellSectionReveal,
  validateHomeContactForm,
} from '@web'
import { askReveal } from './motion'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, askReveal)

const cms = useCmsAttrs()
const copy = useInvestorCmsCopy()
const year = new Date().getFullYear()
const contactTypes = coalesceArray(
  cms.contactTypes,
  NUC_INVESTOR_CONTACT_TYPES
) as { label: string; value: string }[]
const typeOptions = contactTypes.map((opt) => ({
  label: opt.label,
  value: opt.value,
}))
const defaultWebsiteType =
  contactTypes[0]?.value ?? NUC_INVESTOR_CONTACT_TYPES[0].value
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const docsHref = computed(() => investorDocsHref(lang.value))
const homeHref = computed(() => investorHomeHref(lang.value))

const formOpen = ref(false)
const formKey = ref(0)
const selectOpen = ref(false)
const loading = ref(false)
const email = ref('')
const websiteType = ref(defaultWebsiteType)
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
  websiteType.value = defaultWebsiteType
  note.value = ''
  selectOpen.value = false
  clearErrors()
  formKey.value += 1
}

function focusEmail(): void {
  const root = emailInput.value as
    | (HTMLElement & { shadowRoot?: ShadowRoot | null })
    | null
  const input =
    root?.shadowRoot?.querySelector('input') || root?.querySelector?.('input')
  if (input instanceof HTMLInputElement) input.focus()
}

function syncFromHosts(): void {
  const liveEmail = nuiHostValue(emailInput.value as { value?: unknown } | null)
  const liveType = nuiHostValue(typeSelect.value as { value?: unknown } | null)
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

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onDocClick, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onDocClick, true)
})

async function openForm(): Promise<void> {
  formOpen.value = true
  await nextTick()
  window.setTimeout(focusEmail, 280)
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
    if (validation.email) focusEmail()
    return
  }

  loading.value = true
  const result = await submitHomeContactForm({
    email: email.value.trim().toLowerCase(),
    website_type: websiteType.value as HomeContactWebsiteType,
    ...(message ? { message } : {}),
  })
  if (result.ok) {
    window.location.href = pageHref(lang.value, 'thank-you')
    return
  }

  loading.value = false
}
</script>

<style lang="scss" scoped>
@import '../close/index';
</style>
