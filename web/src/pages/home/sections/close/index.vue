<template>
  <section
    id="start"
    class="nuc-home-close nuc-home-panel"
    :class="{ 'is-form': formOpen }"
    aria-labelledby="nuc-home-close-title"
  >
    <div class="nuc-home-close-stage">
      <div class="nuc-home-close-pitch" :aria-hidden="formOpen">
        <div class="nuc-home-close-panel">
          <div class="nuc-home-close-copy">
            <h2 id="nuc-home-close-title" class="nuc-home-title">
              {{ copy.closeTitle }}
            </h2>
            <p class="nuc-home-support">{{ copy.closeSupport }}</p>
          </div>
          <div class="nuc-home-close-cta">
            <nui-button
              :label="copy.closeCta"
              variant="primary"
              icon="mdi:email-outline"
              icon-pos="right"
              @click="openForm"
            />
          </div>
        </div>
      </div>

      <div
        class="nuc-home-close-commerce"
        :aria-hidden="!formOpen"
        :inert="!formOpen"
      >
        <header class="nuc-home-close-commerce-head">
          <div>
            <h3 class="nuc-home-close-commerce-title">
              {{ copy.closeModalTitle }}
            </h3>
          </div>
          <button
            type="button"
            class="nuc-home-close-back"
            :aria-label="copy.closeCancel"
            @click="closeForm"
          >
            <nui-icon icon="mdi:arrow-left" mode="svg" />
            <span>{{ copy.closeCancel }}</span>
          </button>
        </header>
        <p class="nuc-home-close-commerce-support">
          {{ copy.closeModalSupport }}
        </p>

        <form class="nuc-home-close-form" novalidate @submit.prevent="onSubmit">
          <div class="nuc-home-close-grid">
            <div class="nuc-home-close-field">
              <span class="nuc-home-close-label"
                >{{ copy.closeEmailLabel }}</span
              >
              <nui-input-text
                :key="`email-${formKey}`"
                ref="emailInput"
                type="email"
                name="email"
                fluid
                autocomplete="email"
                :placeholder="copy.closeEmailPlaceholder"
                :invalid.prop="Boolean(errors.email)"
                @input="onEmailInput"
              />
              <span
                v-if="errors.email"
                class="nuc-home-close-error"
                role="alert"
              >
                {{ errors.email }}
              </span>
            </div>

            <div
              class="nuc-home-close-field"
              :class="{ 'is-select-open': selectOpen }"
            >
              <span class="nuc-home-close-label"
                >{{ copy.closeTypeLabel }}</span
              >
              <nui-select
                :key="`type-${formKey}`"
                ref="typeSelect"
                :options.prop="typeOptions"
                :value.prop="websiteType"
                fluid
                :placeholder="copy.closeTypePlaceholder"
                :invalid.prop="Boolean(errors.website_type)"
                @nui-select-open="selectOpen = true"
                @nui-change="onTypeChange"
              />
              <span
                v-if="errors.website_type"
                class="nuc-home-close-error"
                role="alert"
              >
                {{ errors.website_type }}
              </span>
            </div>

            <div class="nuc-home-close-field nuc-home-close-field-wide">
              <span class="nuc-home-close-label"
                >{{ copy.closeNoteLabel }}</span
              >
              <nui-textarea
                :key="`note-${formKey}`"
                ref="noteInput"
                name="message"
                fluid
                :rows="4"
                :placeholder="copy.closeNotePlaceholder"
                :invalid.prop="Boolean(errors.message)"
                @input="onNoteInput"
              />
              <span
                v-if="errors.message"
                class="nuc-home-close-error"
                role="alert"
              >
                {{ errors.message }}
              </span>
            </div>
          </div>

          <div class="nuc-home-close-foot">
            <div class="nuc-home-close-actions">
              <nui-button
                type="button"
                variant="primary"
                :label="copy.closeSubmit"
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

    <footer class="nuc-home-close-footer">
      <span>© {{ year }} Nucleify</span>
      <nav class="nuc-home-close-footer-links" aria-label="Footer">
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
  homeDocsHref,
  homeThankYouHref,
  NUC_HOME_CONTACT_TYPES,
  NUC_HOME_COPY,
} from '../../constants/content'
import {
  composeHomeContactMessage,
  type HomeContactWebsiteType,
  nuiHostValue,
  nuiValueFromEvent,
  submitHomeContactForm,
  validateHomeContactForm,
} from '../../utils/submit_contact_form'

const copy = NUC_HOME_COPY
const year = new Date().getFullYear()
const typeOptions = NUC_HOME_CONTACT_TYPES.map((opt) => ({
  label: opt.label,
  value: opt.value,
}))
const defaultWebsiteType = NUC_HOME_CONTACT_TYPES[0].value
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const docsHref = computed(() => homeDocsHref(lang.value, 'intro'))

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

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onDocClick, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onDocClick, true)
})

function onDocClick(event: MouseEvent): void {
  const host = typeSelect.value
  if (!host || !selectOpen.value) return
  if (event.composedPath().includes(host)) return
  selectOpen.value = false
}

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

async function onSubmit(): Promise<void> {
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
    if (validation.email) focusEmail()
    return
  }

  loading.value = true
  const result = await submitHomeContactForm({
    email: email.value.trim().toLowerCase(),
    website_type: websiteType.value as HomeContactWebsiteType,
    ...(message ? { message } : {}),
  })
  loading.value = false

  if (result.ok) {
    resetForm()
    formOpen.value = false
    await navigateTo(homeThankYouHref(lang.value))
  }
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
