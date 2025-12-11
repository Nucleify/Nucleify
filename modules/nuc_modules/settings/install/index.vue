<template>
  <ad-button
    ad-type="main"
    text
    rounded
    icon="prime:upload"
    class="install-module-button"
    @click="visible = true"
  />

  <Dialog 
    v-model:visible="visible" 
    :modal="true" 
    :dismissable-mask="true"
    class="install-module-dialog"
  >
    <template #default>
      <FileUpload 
        name="file"
        :url="apiUrl() + '/modules/install'"
        :maxFileSize="1000000"
        :withCredentials="true"
        @before-upload="beforeUpload"
        @upload="onUpload"
        @error="onError"
      >
        <template #empty>
          <span>Drag and drop files to here to upload.</span>
        </template>
        <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
          <ad-button
            text
            ad-type="main"
            icon="prime:upload"
            @click="chooseCallback()"
            :disabled="files && files.length > 0"
          >
            <label>Choose</label>
          </ad-button>
          <ad-button
            text
            severity="success"
            icon="prime:cloud-upload"
            :disabled="!files || files.length === 0"
            @click="uploadCallback()"
          >
            <label>Upload</label>
          </ad-button>
          <ad-button 
            severity="secondary"
            text 
            icon="prime:times" 
            :disabled="!files || files.length === 0" 
            @click="clearCallback()" 
          >
            <label>Clear</label>
          </ad-button>
        </template>
        <template #content="slotProps">
          <div v-for="file in slotProps.files" :key="file.name">
            <span>{{ file.name }}</span>
            <div>{{ formatSize(file.size) }}</div>
          </div>
        </template>
      </FileUpload>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useInstallModule } from '.'

const visible = ref(false)

const emit = defineEmits<{
  moduleInstalled: []
}>()

const {
  beforeUpload,
  onUpload: handleUpload,
  onError,
  formatSize,
} = useInstallModule((): void => {
  visible.value = false
  emit('moduleInstalled')
})

function onUpload(): void {
  handleUpload()
}
</script>