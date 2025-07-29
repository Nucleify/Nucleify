<template>
  <Dialog :visible="showCaptcha" :show-header="false" class="captcha-dialog">
    <dm-captcha @validateCaptcha="handleValidateCaptcha" />
  </Dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['validateCaptcha'])

const showCaptcha = ref(false)

onMounted(() => {
  setTimeout(() => {
    showCaptcha.value = true
  }, 1500)
})

function handleValidateCaptcha(isValid: boolean) {
  showCaptcha.value = !isValid
  emit('validateCaptcha', isValid)
}
</script>

<style lang="scss">
.captcha-dialog {
  width: 342px;
  height: 107px;

  .p-dialog-content {
    overflow: hidden;
  }
}
</style>