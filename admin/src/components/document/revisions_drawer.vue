<template>
  <Teleport to="body">
    <div v-if="open" class="admin-drawer" role="dialog" aria-modal="true">
      <div class="admin-drawer__head">
        <h2 style="margin: 0; font-size: 1rem">Revisions</h2>
        <nui-button
          type="button"
          variant="outlined"
          label="Close"
          @click="emit('close')"
        />
      </div>
      <div class="admin-drawer__body">
        <div class="admin-actions" style="margin-bottom: 0.75rem">
          <nui-button
            type="button"
            variant="outlined"
            label="Save revision"
            :disabled.prop="saving"
            @click="emit('save')"
          />
        </div>
        <p v-if="!revisions.length" class="admin-muted">No revisions yet.</p>
        <div
          v-for="rev in revisions"
          :key="rev.id"
          class="admin-drawer__item"
        >
          <span class="admin-muted" style="font-size: 0.85rem">
            {{ rev.note || 'Revision' }} · {{ formatTime(rev.created_at) }}
          </span>
          <nui-button
            type="button"
            variant="outlined"
            label="Restore"
            @click="emit('restore', rev.id)"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  revisions: { id: string; note: string; created_at: string }[]
  saving?: boolean
}>()

const emit = defineEmits<{
  close: []
  save: []
  restore: [id: string]
}>()

function formatTime(value: string) {
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}
</script>
