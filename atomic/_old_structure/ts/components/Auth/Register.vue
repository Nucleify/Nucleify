<template>
    <back-link />
    <div class="authCardContainer">
        <Card class="registerCard">
            <template #header>
                <div class="authCardHeaderContainer">
                    <div class="authCardHeader">
                        <heading-atom :tag="1" text="Register" />

                        <paragraph-atom class="mb-2" text="Already have an account?">
                            <anchor-molecule href="/login" :label="'Log in!'" />
                        </paragraph-atom>
                    </div>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="submitForm(registerFields)">
                    <float-label-molecule
                        v-for="(field, index) in registerInputs"
                        :key="index"
                    >
                        <input-text-atom
                            v-model="registerFields[field.model]"
                            :type="field.type"
                            :id="field.id"
                            class="authInputText"
                            :autofocus="field.autofocus"
                        />
                        <label-atom :for="field.id" :label="field.label" />
                    </float-label-molecule>

                    <button-atom
                        label="Register"
                        type="submit"
                        class="primaryButton -mb-1 mt-2"
                        padding="10px 10px"
                    />
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { useAuthForm } from 'atomic/bosons/utils'

const { submitForm, registerFields, registerInputs } = useAuthForm()
</script>
