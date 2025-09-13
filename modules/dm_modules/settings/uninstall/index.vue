<template>
    <ad-button
      ad-type="main"
      text
      rounded
      icon="prime:trash"
      class="uninstall-module-button"
      @click="openConfirmationDialog"
    />
    
    <ad-dialog
      modal
      :visible="visible"
      confirmButtonLabel="Uninstall"
      cancelButtonLabel="Cancel"
      confirm="handleUninstall"
      :close="closeDialog"
      :dismissable-mask="true"
    >
      <template #default>
        <div>Are you sure you want to uninstall this module?</div>
      </template>
    </ad-dialog>
</template>

<script setup lang="ts">
import type { DmModulesUninstallModuleInterface } from '.'
import { uninstallModule } from '.'

const props = defineProps<DmModulesUninstallModuleInterface>()

const emit = defineEmits<{
  moduleUninstalled: []
}>()

const visible = ref(false)

const openConfirmationDialog = (e: Event) => {
  e.preventDefault()
  visible.value = true
}

const handleUninstall = async () => {
  await uninstallModule(props.name, () => {
    emit('moduleUninstalled')
  })
}

const closeDialog = () => {
  visible.value = false
}
</script>
