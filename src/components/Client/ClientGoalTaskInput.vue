<template>
    <b-row
        class="np-component np-component--client-goal-task-input mt-3" no-gutters align-v="start"
        align-h="end"
    >
        <b-col cols="auto">
            <validation-provider ref="input-ready" name="check">
                <b-form-group
                    :id="`input-group-completed-${_uid}`"
                    class="mt-1"
                >
                    <b-form-checkbox
                        :id="`input-completed-${_uid}`"
                        :checked="completed"
                        :disabled="disabled"
                        @input="$emit('update:completed', $event)"
                    />
                </b-form-group>
            </validation-provider>
        </b-col>

        <b-col class="pr-2">
            <validation-provider
                v-slot="validationContext"
                ref="input-description"
                name="descripción"
                :rules="{ required: true }"
            >
                <b-form-group id="input-group-description">
                    <b-form-input
                        id="input-description"
                        v-input-upper
                        :value="description"
                        size="sm"
                        aria-describedby="input-description-feedback"
                        :state="__getValidationState(validationContext)"
                        @input="$emit('update:description', $event)"
                    />

                    <b-form-invalid-feedback id="input-description-feedback">
                        {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>
        </b-col>

        <b-col cols="auto">
            <b-button
                v-if="!confirm" variant="outline-danger" size="sm"
                :disabled="disabled" @click="confirm = true"
            >
                Eliminar
            </b-button>

            <div v-else>
                <b-button
                    variant="outline-danger" size="sm"
                    :disabled="disabled" @click="onConfirmDelete"
                >
                    Confirmar
                </b-button>

                <b-button
                    variant="outline-primary" size="sm"
                    :disabled="disabled" @click="confirm = false"
                >
                    Cancelar
                </b-button>
            </div>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name  : 'ClientGoalTaskInputComponent',
    props : {
        completed: {
            type     : Boolean,
            required : false,
            default  : false,
        },
        description: {
            type     : String,
            required : true,
        },
        disabled: {
            type     : Boolean,
            default  : false,
            required : false,
        },
    },
    data() {
        return {
            confirm: false,
        }
    },
    methods: {
        async validate() {
            const { valid } = await this.$refs['input-description'].validate()

            return valid
        },

        onChangeDescription(description) {
            this.$emit('change', this.completed, description)
        },

        onChangeCompleted(completed) {
            this.$emit('change', completed, this.description)
        },

        onConfirmDelete() {
            this.$emit('delete')
            this.confirm = false
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
