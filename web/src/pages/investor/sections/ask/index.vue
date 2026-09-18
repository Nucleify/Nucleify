<template>
  <section
    id="ask"
    class="nuc-investor-ask nuc-home-panel"
    aria-labelledby="nuc-investor-ask-title"
  >
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
          @click="openModal"
        />
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

    <nui-dialog
      v-if="dialogReady"
      ref="dialogEl"
      class="nuc-investor-ask-dialog-host"
      width="26rem"
      dismissable-mask
      close-on-escape
      dialog-class="nuc-home-close-dialog"
      @hide="closeModal"
      @change="onDialogChange"
      @show="onDialogShow"
    >
      <div slot="header" class="nuc-investor-ask-dialog-title">
        {{ copy.askModalTitle }}
      </div>

      <form class="nuc-investor-ask-form" novalidate @submit.prevent="onSubmit">
        <p class="nuc-investor-ask-form-support">
          {{ copy.askModalSupport }}
        </p>

        <label class="nuc-investor-ask-field">
          <span class="nuc-investor-ask-label">{{ copy.askEmailLabel }}</span>
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
          <span v-if="errors.email" class="nuc-investor-ask-error" role="alert">
            {{ errors.email }}
          </span>
        </label>

        <label class="nuc-investor-ask-field">
          <span class="nuc-investor-ask-label">{{ copy.askTypeLabel }}</span>
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
      </form>

      <div slot="footer" class="nuc-investor-ask-actions">
        <nui-button
          type="button"
          variant="primary"
          fluid
          :label="copy.askSubmit"
          :loading="loading"
          :disabled="loading"
          icon="mdi:send-outline"
          icon-pos="right"
          @click="onSubmit"
        />
      </div>
    </nui-dialog>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'

import {
  investorDocsHref,
  investorHomeHref,
  NUC_INVESTOR_CONTACT_TYPES,
  NUC_INVESTOR_COPY,
} from '../../constants/content'
import { setHomeContactDialogOverflow } from '../../../home/utils/contact_dialog_overflow'
import {
  type HomeContactWebsiteType,
  submitHomeContactForm,
  validateHomeContactForm,
} from '../../../home/utils/submit_contact_form'

type NuiDialogHost = HTMLElement & { visible?: boolean }

const copy = NUC_INVESTOR_COPY
const year = new Date().getFullYear()
const typeOptions = [...NUC_INVESTOR_CONTACT_TYPES]
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const docsHref = computed(() => investorDocsHref(lang.value))
const homeHref = computed(() => investorHomeHref(lang.value))

const dialogReady = ref(false)
const dialogOpen = ref(false)
const loading = ref(false)
const email = ref('')
const websiteType = ref('')
const dialogEl = ref<NuiDialogHost | null>(null)
const emailInput = ref<HTMLElement | null>(null)
const errors = reactive<{
  email?: string
  website_type?: string
}>({})

function syncDialogVisible(visible: boolean): void {
  const host = dialogEl.value
  if (host) host.visible = visible
}

onMounted(() => {
  dialogReady.value = true
})

watch(dialogOpen, (visible) => {
  syncDialogVisible(visible)
})

watch(dialogReady, async (ready) => {
  if (!ready) return
  await nextTick()
  syncDialogVisible(dialogOpen.value)
})

function clearErrors(): void {
  delete errors.email
  delete errors.website_type
}

function resetForm(): void {
  email.value = ''
  websiteType.value = ''
  clearErrors()
}

function openModal(): void {
  dialogOpen.value = true
}

function closeModal(): void {
  setHomeContactDialogOverflow(dialogEl.value, false)
  dialogOpen.value = false
}

function focusEmail(): void {
  const root = emailInput.value as
    | (HTMLElement & { shadowRoot?: ShadowRoot | null })
    | null
  const input =
    root?.shadowRoot?.querySelector('input') || root?.querySelector?.('input')
  if (input instanceof HTMLInputElement) input.focus()
}

async function onDialogShow(): Promise<void> {
  await nextTick()
  setHomeContactDialogOverflow(dialogEl.value, true)
  window.setTimeout(focusEmail, 40)
}

function onDialogChange(event: CustomEvent<{ visible: boolean }>): void {
  dialogOpen.value = event.detail.visible
  if (!event.detail.visible) {
    setHomeContactDialogOverflow(dialogEl.value, false)
    resetForm()
  }
}

function onEmailInput(event: CustomEvent<{ value: string }>): void {
  email.value = event.detail.value
  delete errors.email
}

function onTypeChange(event: CustomEvent<{ value: string }>): void {
  websiteType.value = event.detail.value
  delete errors.website_type
}

async function onSubmit(): Promise<void> {
  if (loading.value) return

  clearErrors()
  const validation = validateHomeContactForm({
    email: email.value,
    websiteType: websiteType.value,
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
  })
  loading.value = false

  if (result.ok) {
    resetForm()
    dialogOpen.value = false
  }
}
</script>
