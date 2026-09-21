<template>
  <section
    id="ask"
    class="nuc-investor-ask nuc-home-panel"
    :class="{ 'is-form': formOpen }"
    aria-labelledby="nuc-investor-ask-title"
  >
    <div class="nuc-investor-ask-stage">
      <div class="nuc-investor-ask-pitch" :aria-hidden="formOpen">
        <div class="nuc-investor-ask-panel">
          <div class="nuc-investor-ask-copy">
            <h2 id="nuc-investor-ask-title" class="nuc-home-title">
              {{ copy.askTitle }}
            </h2>
            <p class="nuc-home-support">{{ copy.askSupport }}</p>
          </div>
          <div class="nuc-investor-ask-cta">
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
        class="nuc-investor-ask-commerce"
        :aria-hidden="!formOpen"
        :inert="!formOpen"
      >
        <header class="nuc-investor-ask-commerce-head">
          <div>
            <p class="nuc-investor-ask-eyebrow">Investor desk</p>
            <h3 class="nuc-investor-ask-commerce-title">
              {{ copy.askModalTitle }}
            </h3>
            <p class="nuc-investor-ask-commerce-support">
              {{ copy.askModalSupport }}
            </p>
          </div>
          <button
            type="button"
            class="nuc-investor-ask-back"
            :aria-label="copy.askCancel"
            @click="closeForm"
          >
            <nui-icon icon="mdi:arrow-left" mode="svg" />
            <span>{{ copy.askCancel }}</span>
          </button>
        </header>

        <form
          class="nuc-investor-ask-form"
          novalidate
          @submit.prevent="onSubmit"
        >
          <div class="nuc-investor-ask-grid">
            <label class="nuc-investor-ask-field">
              <span class="nuc-investor-ask-label"
                >{{ copy.askNameLabel }}</span
              >
              <nui-input-text
                :value="name"
                type="text"
                name="name"
                fluid
                autocomplete="organization"
                :placeholder="copy.askNamePlaceholder"
                @input="onNameInput"
              />
            </label>

            <label class="nuc-investor-ask-field">
              <span class="nuc-investor-ask-label"
                >{{ copy.askEmailLabel }}</span
              >
              <nui-input-text
                ref="emailInput"
                :value="email"
                type="email"
                name="email"
                fluid
                autocomplete="email"
                :placeholder="copy.askEmailPlaceholder"
                :invalid="Boolean(errors.email)"
                @input="onEmailInput"
              />
              <span
                v-if="errors.email"
                class="nuc-investor-ask-error"
                role="alert"
              >
                {{ errors.email }}
              </span>
            </label>

            <label class="nuc-investor-ask-field nuc-investor-ask-field-wide">
              <span class="nuc-investor-ask-label"
                >{{ copy.askTypeLabel }}</span
              >
              <nui-select
                :value="websiteType"
                :options="typeOptions"
                fluid
                :placeholder="copy.askTypePlaceholder"
                :invalid="Boolean(errors.website_type)"
                @nui-change="onTypeChange"
              />
              <span
                v-if="errors.website_type"
                class="nuc-investor-ask-error"
                role="alert"
              >
                {{ errors.website_type }}
              </span>
            </label>

            <label class="nuc-investor-ask-field nuc-investor-ask-field-wide">
              <span class="nuc-investor-ask-label"
                >{{ copy.askNoteLabel }}</span
              >
              <textarea
                :value="note"
                class="nuc-investor-ask-textarea"
                name="message"
                rows="4"
                :placeholder="copy.askNotePlaceholder"
                :aria-invalid="Boolean(errors.message)"
                @input="onNoteInput"
              />
              <span
                v-if="errors.message"
                class="nuc-investor-ask-error"
                role="alert"
              >
                {{ errors.message }}
              </span>
            </label>
          </div>

          <div class="nuc-investor-ask-actions">
            <nui-button
              type="button"
              variant="outlined"
              :label="copy.askCancel"
              :disabled="loading"
              @click="closeForm"
            />
            <nui-button
              type="button"
              variant="primary"
              :label="copy.askSubmit"
              :loading="loading"
              :disabled="loading"
              icon="mdi:send-outline"
              icon-pos="right"
              @click="onSubmit"
            />
          </div>

          <ul class="nuc-investor-ask-trust" aria-label="What to expect">
            <li v-for="item in copy.askTrust" :key="item">{{ item }}</li>
          </ul>
        </form>
      </div>
    </div>

    <footer class="nuc-investor-ask-footer">
      <span>© {{ year }} Nucleify</span>
      <nav class="nuc-investor-ask-footer-links" aria-label="Footer">
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
  investorDocsHref,
  investorHomeHref,
  NUC_INVESTOR_CONTACT_TYPES,
  NUC_INVESTOR_COPY,
} from '../../constants/content'
import {
  composeHomeContactMessage,
  type HomeContactWebsiteType,
  submitHomeContactForm,
  validateHomeContactForm,
} from '../../../home/utils/submit_contact_form'

const copy = NUC_INVESTOR_COPY
const year = new Date().getFullYear()
const typeOptions = [...NUC_INVESTOR_CONTACT_TYPES]
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const docsHref = computed(() => investorDocsHref(lang.value))
const homeHref = computed(() => investorHomeHref(lang.value))

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

function onNoteInput(event: Event): void {
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
