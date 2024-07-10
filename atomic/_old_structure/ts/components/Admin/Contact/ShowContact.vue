<template>
    <Dialog :visible="visible" modal header="Show contact" class="myDialog">
        <template #header>
            <heading-atom :tag="3" :text="contact!.full_name" />
        </template>
        <div v-if="contact" class="showDataContainer">
            <div>
                <h5 class="showDataHeader">Email</h5>
                <div>
                    {{ contact.email }}
                </div>
            </div>
            <div class="showDataPhoneNumbersContainer">
                <div class="showDataPhoneNumber col-6">
                    <h5 class="showDataHeader">Personal Phone</h5>
                    <div>{{ contact.personal_phone }}</div>
                </div>
                <div class="showDataPhoneNumber col-6">
                    <h5 class="showDataHeader">Work Phone</h5>
                    <div>{{ contact.work_phone }}</div>
                </div>
            </div>
            <div>
                <h5 class="showDataHeader">Address</h5>
                <div>{{ contact.address }}</div>
            </div>
            <div>
                <h5 class="showDataHeader">Birthday</h5>
                <div>{{ contact.birthday }}</div>
            </div>
            <div>
                <h5 class="showDataHeader">Contact Groups</h5>
                <div>
                    {{ contact.contact_groups }}
                    <p v-if="!contact.contact_groups">
                        This contact have no contact groups.
                    </p>
                </div>
            </div>
            <div class="showDataRole">
                <h5 class="showDataHeader">Role</h5>
                <div>{{ contact.role }}</div>
            </div>
            <div class="showDataDatesContainer">
                <div class="showDataDate col-6">
                    <h5 class="showDataHeader">Created At</h5>
                    <div>{{ contact.created_at }}</div>
                </div>
                <div class="showDataDate col-6">
                    <h5 class="showDataHeader">Updated At</h5>
                    <div>{{ contact.updated_at }}</div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialogButtonsContainer">
                <button-atom
                    label="Close"
                    severity="secondary"
                    @click="props.close('show')"
                    :rounded="true"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ContactInterface } from '@/types'

const props = defineProps<{
    visible: boolean
    contact: ContactInterface | undefined
    close: (action: string) => void
}>()
</script>
