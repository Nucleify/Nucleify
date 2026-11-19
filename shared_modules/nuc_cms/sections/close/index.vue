<template>
  <section
    ref="rootEl"
    :id="domId"
    class="nuc-close nuc-panel"
    :class="{ 'is-form': formOpen }"
    aria-labelledby="nuc-close-title"
  >
    <div class="nuc-close-stage">
      <div class="nuc-close-pitch" :aria-hidden="formOpen">
        <div class="nuc-close-panel">
          <div class="nuc-close-copy">
            <h2 id="nuc-close-title" class="nuc-title">
              {{ copy.closeTitle }}
            </h2>
            <p class="nuc-support">{{ copy.closeSupport }}</p>
          </div>
          <div class="nuc-close-cta">
            <nui-button
              :label="copy.closeCta"
              variant="primary"
              icon="mdi:send-outline"
              :iconPos.prop="'right'"
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
              {{ copy.closeModalTitle }}
            </h3>
          </div>
          <button
            type="button"
            class="nuc-close-back"
            :aria-label="copy.closeCancel"
            @click="closeForm"
          >
            <nui-icon icon="mdi:arrow-left" mode="svg" />
            <span>{{ copy.closeCancel }}</span>
          </button>
        </header>
        <p class="nuc-close-commerce-support">
          {{ copy.closeModalSupport }}
        </p>

        <form class="nuc-close-form" novalidate @submit.prevent="onSubmit">
          <div class="nuc-close-grid">
            <div class="nuc-close-field">
              <span class="nuc-close-label">{{ copy.closeEmailLabel }}</span>
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
              <span v-if="errors.email" class="nuc-close-error" role="alert">
                {{ errors.email }}
              </span>
            </div>

            <div
              class="nuc-close-field"
              :class="{ 'is-select-open': selectOpen }"
            >
              <span class="nuc-close-label">{{ copy.closeTypeLabel }}</span>
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
                class="nuc-close-error"
                role="alert"
              >
                {{ errors.website_type }}
              </span>
            </div>

            <div class="nuc-close-field nuc-close-field-wide">
              <span class="nuc-close-label">{{ copy.closeNoteLabel }}</span>
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
                :label="copy.closeSubmit"
                :loading="loading"
                :disabled="loading"
                fluid
                width="100%"
                icon="mdi:send-outline"
                :iconPos.prop="'right'"
                @click="onSubmit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, ref } from 'vue'

import {
  closeReveal,
  coalesceArray,
  NUC_HOME_CONTACT_TYPES,
  useCmsAttrs,
  useContactFormPanel,
  useFrameSectionReveal,
  useHomeCmsCopy,
  useSectionDomId,
} from '@shared_modules'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useFrameSectionReveal(rootEl, closeReveal)

const cms = useCmsAttrs()
const domId = useSectionDomId('start')
const copy = useHomeCmsCopy()
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

const contactTypes = coalesceArray(
  cms.contactTypes,
  NUC_HOME_CONTACT_TYPES
) as { label: string; value: string }[]
const typeOptions = contactTypes.map((opt) => ({
  label: opt.label,
  value: opt.value,
}))
const defaultWebsiteType =
  contactTypes[0]?.value ?? NUC_HOME_CONTACT_TYPES[0].value

const {
  formOpen,
  formKey,
  selectOpen,
  loading,
  websiteType,
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
} = useContactFormPanel({
  defaultWebsiteType: () => defaultWebsiteType,
  lang,
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
