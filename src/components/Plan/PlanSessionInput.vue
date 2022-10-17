<template>
    <b-row>
        <b-col cols="12" md="6" xl="7">
            <validation-provider
                ref="input-subject"
                v-slot="validationContext"
                name="asunto"
                :rules="{ required: true }"
            >
                <b-form-group
                    :id="`input-group-subject-${_uid}`"
                >
                    <b-form-input
                        :id="`input-subject-${_uid}`"
                        :value="subject"
                        placeholder="Asunto"
                        :aria-describedby="`input-subject--${_uid}-feedback`"
                        :state="__getValidationState(validationContext)"
                        :disabled="disabled"
                        @input="$emit('update:subject', $event)"
                    />

                    <b-form-invalid-feedback :id="`input-subject--${_uid}-feedback`">
                        {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>
        </b-col>

        <b-col cols="12" md="6" xl="5">
            <b-row no-gutters align-v="start" align-h="end">
                <b-col>
                    <validation-provider
                        v-slot="validationContext"
                        ref="input-start"
                        name="desde"
                        :rules="{ required: true, min_value: 0, max_value: 60 }"
                    >
                        <b-form-group
                            id="input-group-start"
                            style="min-width: 80px;"
                        >
                            <b-form-input
                                id="input-start"
                                :value="start"
                                type="number"
                                aria-describedby="input-start-feedback"
                                :state="__getValidationState(validationContext)"
                                :disabled="disabled"
                                @input="$emit('update:start', $event)"
                            />

                            <b-form-invalid-feedback id="input-start-feedback">
                                {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>
                </b-col>

                <b-col cols="auto" class="mx-2 mt-2">
                    <small>
                        días desde últ. sesión
                    </small>
                </b-col>

                <b-col cols="auto" class="mt-1">
                    <b-button
                        v-if="!confirm"
                        variant="outline-danger"
                        size="sm"
                        :disabled="disabled"
                        @click="confirm = true"
                    >
                        Eliminar
                    </b-button>

                    <div v-else>
                        <b-button
                            variant="outline-danger"
                            size="sm"
                            :disabled="disabled"
                            @click="onConfirmDelete"
                        >
                            Confirmar
                        </b-button>

                        <b-button
                            variant="outline-primary"
                            size="sm"
                            :disabled="disabled"
                            @click="confirm = false"
                        >
                            Cancelar
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name  : 'PlanSessionInputComponent',
    props : {
        subject: {
            type     : String,
            required : true,
        },
        start: {
            type     : String,
            required : true,
        },
        disabled: {
            type     : Boolean,
            required : false,
            default  : false,
        },
        allowDelete: {
            type     : Boolean,
            required : false,
            default  : false,
        },
    },
    data() {
        return {
            confirm: false,
        }
    },
    methods: {
        async validate() {
            const { valid: subjectValid } = await this.$refs['input-subject'].validate()
            const { valid: startValid } = await this.$refs['input-start'].validate()

            return subjectValid && startValid
        },

        onConfirmDelete() {
            this.$emit('delete-session')
            this.confirm = false
        },
    },
}
</script>
