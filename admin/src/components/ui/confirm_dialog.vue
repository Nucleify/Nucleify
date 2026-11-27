<template>
  <nui-dialog
    v-if="open"
    visible
    :header="title"
    dismissable-mask
    @hide="onHide"
  >
    <p class="admin-muted" style="margin: 0">{{ message }}</p>
    <div slot="footer" class="admin-actions">
      <nui-button
        type="button"
        variant="outlined"
        :label="cancelLabel"
        @click="emit('cancel')"
      />
      <nui-button
        type="button"
        variant="filled"
        :label="confirmLabel"
        @click="onConfirm"
      />
    </div>
  </nui-dialog>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    open?: boolean
    title?: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
  }>(),
  {
    open: false,
    title: 'Confirm',
    message: 'Are you sure?',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
  }
)

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

let closingViaConfirm = false

function onConfirm() {
  closingViaConfirm = true
  emit('confirm')
}

function onHide() {
  if (closingViaConfirm) {
    closingViaConfirm = false
    return
  }
  emit('cancel')
}
</script>
