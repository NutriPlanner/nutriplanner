<template>
    <div class="np-component np-component--tracking-form">
        <b-row>
            <b-col cols="12" md="auto">
                <TrackingFormClientInfo class="mt-3 mb-3" />
            </b-col>

            <b-col class="mt-3">
                <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                    <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                        <validation-provider
                            v-slot="validationContext"
                            name="estado"
                            :rules="{ required: true }"
                        >
                            <b-form-group
                                id="input-group-status"
                                label="Estado"
                                label-for="input-status"
                            >
                                <b-form-select
                                    id="input-status"
                                    v-model="form.status"
                                    :options="statusOptions"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-status-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="asunto"
                            :rules="{ required: true }"
                        >
                            <b-form-group
                                id="input-group-subject"
                                label="Asunto"
                                label-for="input-subject"
                            >
                                <b-form-input
                                    id="input-subject"
                                    v-model="form.subject"
                                    aria-describedby="input-subject-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-subject-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <p class="mt-5 mb-3">
                            MEDIDAS DEL CUERPO
                        </p>
                        <hr>

                        <validation-provider
                            v-slot="validationContext"
                            name="pecho"
                            :rules="{ required: false }"
                        >
                            <b-form-group
                                id="input-group-chest"
                                label="Pecho (cm)"
                                label-for="input-chest"
                            >
                                <b-form-input
                                    id="input-chest"
                                    v-model="form.measurement.chest"
                                    v-input-max-decimals="2"
                                    type="number"
                                    step="0.01"
                                    aria-describedby="input-chest-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-chest-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="brazo"
                            :rules="{ required: false }"
                        >
                            <b-form-group
                                id="input-group-arm"
                                label="Brazo (cm)"
                                label-for="input-arm"
                            >
                                <b-form-input
                                    id="input-arm"
                                    v-model="form.measurement.arm"
                                    v-input-max-decimals="2"
                                    type="number"
                                    step="0.01"
                                    aria-describedby="input-arm-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-arm-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="abdomen ombligo"
                            :rules="{ required: false }"
                        >
                            <b-form-group
                                id="input-group-stomach"
                                label="Abdomen (cm)"
                                label-for="input-stomach"
                            >
                                <b-form-input
                                    id="input-stomach"
                                    v-model="form.measurement.stomach"
                                    v-input-max-decimals="2"
                                    type="number"
                                    step="0.01"
                                    aria-describedby="input-stomach-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-stomach-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="abdomen cintura"
                            :rules="{ required: false }"
                        >
                            <b-form-group
                                id="input-group-waist"
                                label="Cintura (cm)"
                                label-for="input-waist"
                            >
                                <b-form-input
                                    id="input-waist"
                                    v-model="form.measurement.waist"
                                    v-input-max-decimals="2"
                                    type="number"
                                    step="0.01"
                                    aria-describedby="input-waist-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-waist-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="muslo"
                            :rules="{ required: false }"
                        >
                            <b-form-group
                                id="input-group-thigh"
                                label="Muslo (cm)"
                                label-for="input-thigh"
                            >
                                <b-form-input
                                    id="input-thigh"
                                    v-model="form.measurement.thigh"
                                    v-input-max-decimals="2"
                                    type="number"
                                    step="0.01"
                                    aria-describedby="input-thigh-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-thigh-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="gluteos"
                            :rules="{ required: false }"
                        >
                            <b-form-group
                                id="input-group-bottom"
                                label="Gluteos (cm)"
                                label-for="input-bottom"
                            >
                                <b-form-input
                                    id="input-bottom"
                                    v-model="form.measurement.bottom"
                                    v-input-max-decimals="2"
                                    type="number"
                                    step="0.01"
                                    aria-describedby="input-bottom-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-bottom-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="masa corporal"
                            :rules="{ required: false }"
                        >
                            <b-form-group
                                id="input-group-body_mass"
                                label="Masa corporal (kg)"
                                label-for="input-body_mass"
                            >
                                <b-form-input
                                    id="input-body_mass"
                                    v-model="form.measurement.body_mass"
                                    v-input-max-decimals="2"
                                    type="number"
                                    step="0.01"
                                    aria-describedby="input-body_mass-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-body_mass-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="notas"
                            :rules="{ required: false }"
                        >
                            <b-form-group
                                id="input-group-note"
                                label="Notas"
                                label-for="input-note"
                                class="mt-5"
                            >
                                <b-form-textarea
                                    id="input-note"
                                    v-model="form.note"
                                    placeholder="Escriba sus notas aquí..."
                                    rows="4"
                                    aria-describedby="input-note-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-note-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <Overlay :loading="loading">
                            <b-button block type="submit" variant="primary">
                                Enviar
                            </b-button>
                        </Overlay>
                    </b-form>
                </validation-observer>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import _ from 'lodash'

const statusOptions = [
    { text: 'PENDIENTE', value: 'PENDING' },
    { text: 'FINALIZADO', value: 'DONE' },
]

export default {
    name  : 'TrackingFormComponent',
    props : {
        formInitialData: {
            type     : Object,
            required : true,
        },
    },
    data () {
        return {
            statusOptions,
            form: _.cloneDeep(this.formInitialData),
        }
    },
    computed: {
        loading () {
            return this.$store.state.trackings.loading
        },
    },
    mounted () {
        this.reset()
    },
    methods: {
        onSubmit () {
            this.$emit('submit', _.cloneDeep(this.form) )
        },
        reset (newData) {
            this.form = _.cloneDeep(newData || this.formInitialData)
            setTimeout( () => {
                this.$refs.formObserver.validate()
            }, 100)
        },
    },
}
</script>

<style lang="scss" scoped></style>
