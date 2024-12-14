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
          <ad-heading :tag="5" class="title">
            <div class="shiny-text">Atomic Design&nbsp;</div>
            <span> Approach </span>
          </ad-heading>
          <ad-paragraph
            text="
                            Utilizing Atomic Design principles to develop dynamic, modular solutions that enhance
                            scalability and ensure seamless integration in your development processes.
                        "
            class="description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { StructureAnimation } from 'atomic'
</script>
