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
            <p class="nuc-home-close-eyebrow">Contact</p>
            <h3 class="nuc-home-close-commerce-title">
              {{ copy.closeModalTitle }}
            </h3>
            <p class="nuc-home-close-commerce-support">
              {{ copy.closeModalSupport }}
            </p>
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

        <form class="nuc-home-close-form" novalidate @submit.prevent="onSubmit">
          <div class="nuc-home-close-grid">
            <label class="nuc-home-close-field">
              <span class="nuc-home-close-label"
                >{{ copy.closeNameLabel }}</span
              >
              <nui-input-text
                :value="name"
                type="text"
                name="name"
                fluid
                autocomplete="organization"
                :placeholder="copy.closeNamePlaceholder"
                @input="onNameInput"
              />
            </label>

            <label class="nuc-home-close-field">
              <span class="nuc-home-close-label"
                >{{ copy.closeEmailLabel }}</span
              >
              <nui-input-text
                ref="emailInput"
                :value="email"
                type="email"
                name="email"
                fluid
                autocomplete="email"
                :placeholder="copy.closeEmailPlaceholder"
                :invalid="Boolean(errors.email)"
                @input="onEmailInput"
              />
              <span
                v-if="errors.email"
                class="nuc-home-close-error"
                role="alert"
              >
                {{ errors.email }}
              </span>
            </label>

            <label class="nuc-home-close-field nuc-home-close-field-wide">
              <span class="nuc-home-close-label"
                >{{ copy.closeTypeLabel }}</span
              >
              <nui-select
                :value="websiteType"
                :options="typeOptions"
                fluid
                :placeholder="copy.closeTypePlaceholder"
                :invalid="Boolean(errors.website_type)"
                @nui-change="onTypeChange"
              />
              <span
                v-if="errors.website_type"
                class="nuc-home-close-error"
                role="alert"
              >
                {{ errors.website_type }}
              </span>
            </label>

            <label class="nuc-home-close-field nuc-home-close-field-wide">
              <span class="nuc-home-close-label"
                >{{ copy.closeNoteLabel }}</span
              >
              <textarea
                :value="note"
                class="nuc-home-close-textarea"
                name="message"
                :rows="4"
                :placeholder="copy.closeNotePlaceholder"
                :aria-invalid="Boolean(errors.message)"
                @input="onNoteInput"
              />
              <span
                v-if="errors.message"
                class="nuc-home-close-error"
                role="alert"
              >
                {{ errors.message }}
              </span>
            </label>
          </div>

          <div class="nuc-home-close-actions">
            <nui-button
              type="button"
              variant="outlined"
              :label="copy.closeCancel"
              :disabled="loading"
              @click="closeForm"
            />
            <nui-button
              type="button"
              variant="primary"
              :label="copy.closeSubmit"
              :loading="loading"
              :disabled="loading"
              icon="mdi:send-outline"
              icon-pos="right"
              @click="onSubmit"
            />
          </div>

          <ul class="nuc-home-close-trust" aria-label="What to expect">
            <li v-for="item in copy.closeTrust" :key="item">{{ item }}</li>
          </ul>
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
import { useRoute } from 'nuxt/app'
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
  NUC_HOME_CONTACT_TYPES,
  NUC_HOME_COPY,
} from '../../constants/content'
import {
  composeHomeContactMessage,
  type HomeContactWebsiteType,
  submitHomeContactForm,
  validateHomeContactForm,
} from '../../utils/submit_contact_form'

const copy = NUC_HOME_COPY
const year = new Date().getFullYear()
const typeOptions = [...NUC_HOME_CONTACT_TYPES]
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const docsHref = computed(() => homeDocsHref(lang.value, 'intro'))

const formOpen = ref(false)
const loading = ref(false)
const name = ref('')
const email = ref('')
const websiteType = ref('')
const note = ref('')
const emailInput = ref<HTMLElement | null>(null)
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
  name.value = ''
  email.value = ''
  websiteType.value = ''
  note.value = ''
  clearErrors()
}

function focusEmail(): void {
  const root = emailInput.value as
    | (HTMLElement & { shadowRoot?: ShadowRoot | null })
    | null
  const input =
    root?.shadowRoot?.querySelector('input') || root?.querySelector?.('input')
  if (input instanceof HTMLInputElement) input.focus()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && formOpen.value && !loading.value) {
    event.preventDefault()
    closeForm()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
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

function onNameInput(event: CustomEvent<{ value: string }>): void {
  name.value = event.detail.value
}

function onEmailInput(event: CustomEvent<{ value: string }>): void {
  email.value = event.detail.value
  delete errors.email
}

function onTypeChange(event: CustomEvent<{ value: string }>): void {
  websiteType.value = event.detail.value
  delete errors.website_type
}

function onNoteInput(event: { target: EventTarget | null }): void {
  const target = event.target
  if (target instanceof HTMLTextAreaElement) {
    note.value = target.value
  }
  delete errors.message
}

async function onSubmit(): Promise<void> {
  if (loading.value) return

  const message = composeHomeContactMessage({
    name: name.value,
    note: note.value,
  })

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
  }
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
