<template>
  <section id="structure">
    <div class="structure-container">
      <div class="content">
        <div class="animation-container">
          <DeferredContent>
            <StructureAnimation />
          </DeferredContent>
        </div>
        <div class="description-container">
          <ad-heading :tag="3" class="title">
            <template v-if="locale === 'pl'">
              <span>{{ t('home.structure.title.text') }}</span>
              <div class="shiny">{{ t('home.structure.title.highlight') }}</div>
            </template>
            <template v-else>
              <div class="shiny">{{ t('home.structure.title.highlight') }}</div>
              <span>{{ t('home.structure.title.text') }}</span>
            </template>
          </ad-heading>
          <ad-paragraph
            :text="t('home.structure.description')"
            class="description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { StructureAnimation } from './'

const { t, locale } = useI18n()
</script>
