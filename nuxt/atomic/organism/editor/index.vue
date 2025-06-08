<template>
  <Editor
    :v-model="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :placeholder="props.placeholder"
    :readonly="props.readonly"
    :invalid="props.invalid"
    :formats="props.formats"
    :editor-style="props.editorStyle"
    :modules="props.modules"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { EditorInterface } from 'atomic'

const props = defineProps<EditorInterface>()
</script>
