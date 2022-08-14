<template>
    <div class="np-component np-component--tracking-form">
        <ClientCardInfo :client="client" :loading="loadingClient" :class="styles.clientCardInfo" />

        <ClientGoalCardInfo
            v-if="clientGoal?.id"
            :goal="clientGoal"
            :loading="loadingClientGoal"
            class="mb-5"
        />

        <!-- FORM -->
        <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onSubmit)">


                <!-- STATUS -->
                <validation-provider v-slot="validationContext" name="estado" :rules="{ required: true }">
                    <b-form-group
                        id="input-group-status"
                        label="Estado"
                        label-for="input-status"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-select
                            v-else
                            id="input-status"
                            v-model="status"
                            :options="statusOptions"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-status-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- SUBJECT -->
                <validation-provider v-slot="validationContext" name="asunto" :rules="{ required: true }">
                    <b-form-group
                        id="input-group-subject"
                        label="Asunto"
                        label-for="input-subject"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-subject"
                            v-model="subject"
                            aria-describedby="input-subject-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-subject-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- DATE -->
                <validation-provider v-slot="validationContext" name="fecha" :rules="{ required: true }">
                    <b-form-group
                        id="input-group-date"
                        label="Fecha"
                        label-for="input-date"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-datepicker
                            v-else
                            id="input-date"
                            v-model="date"
                            aria-describedby="input-date-feedback"
                            reset-button
                            label-reset-button="Limpiar"
                            label-no-date-selected="Fecha no seleccionada"
                            :date-format-options="{
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            }"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-date-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- MEASUREMENTS -->
                <p class="mt-5 mb-3">
                    MEDIDAS DEL CUERPO
                </p>
                <hr>


                <!-- MEASUREMENT CHEST -->
                <validation-provider v-slot="validationContext" name="pecho" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-chest"
                        label="Pecho (cm)"
                        label-for="input-chest"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-chest"
                            v-model="chest"
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


                <!-- MEASUREMENT ARM -->
                <validation-provider v-slot="validationContext" name="brazo" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-arm"
                        label="Brazo (cm)"
                        label-for="input-arm"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-arm"
                            v-model="arm"
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


                <!-- MEASUREMENT STOMACH -->
                <validation-provider v-slot="validationContext" name="abdomen ombligo" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-stomach"
                        label="Abdomen (cm)"
                        label-for="input-stomach"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-stomach"
                            v-model="stomach"
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


                <!-- MEASUREMENT WAIST -->
                <validation-provider v-slot="validationContext" name="abdomen cintura" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-waist"
                        label="Cintura (cm)"
                        label-for="input-waist"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-waist"
                            v-model="waist"
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


                <!-- MEASUREMENT THIGH -->
                <validation-provider v-slot="validationContext" name="muslo" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-thigh"
                        label="Muslo (cm)"
                        label-for="input-thigh"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-thigh"
                            v-model="thigh"
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


                <!-- MEASUREMENT BOTTOM -->
                <validation-provider v-slot="validationContext" name="gluteos" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-bottom"
                        label="Gluteos (cm)"
                        label-for="input-bottom"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-bottom"
                            v-model="bottom"
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


                <!-- MEASUREMENT BODY MASS -->
                <validation-provider v-slot="validationContext" name="masa corporal" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-body_mass"
                        label="Masa corporal (kg)"
                        label-for="input-body_mass"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-body_mass"
                            v-model="body_mass"
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


                <!-- NO.TES -->
                <validation-provider v-slot="validationContext" name="notas" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-note"
                        label="Notas"
                        label-for="input-note"
                        class="mt-5"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-textarea
                            v-else
                            id="input-note"
                            v-model="note"
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


                <!-- SUBMIT BUTTON -->
                <Overlay :loading="loading">
                    <b-button block type="submit" variant="primary">
                        Enviar
                    </b-button>
                </Overlay>
            </b-form>
        </validation-observer>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import cx from 'classnames'

export default {
    name: 'TrackingFormComponent',

    props: {
        client: {
            type     : Object,
            required : false,
            default  : () => ( {} ),
        },

        clientGoal: {
            type     : Object,
            required : false,
            default  : () => ( {} ),
        },
    },

    computed: {
        ...mapFields('trackings/form', {
            status    : 'data.status',
            subject   : 'data.subject',
            date      : 'data.date',
            chest     : 'data.measurement.chest',
            waist     : 'data.measurement.waist',
            arm       : 'data.measurement.arm',
            stomach   : 'data.measurement.stomach',
            thigh     : 'data.measurement.thigh',
            bottom    : 'data.measurement.bottom',
            body_mass : 'data.measurement.body_mass',
            note      : 'data.note',
            loading   : 'loading',
        } ),

        ...mapFields('clientForm', {
            loadingClient: 'loading',
        } ),

        ...mapFields('clientGoalForm', {
            loadingClientGoal: 'loading',
        } ),

        ...mapGetters('trackings/form', {
            statusOptions: 'statusOptions',
        } ),

        styles() {
            return {
                clientCardInfo: cx( {
                    'mb-5' : !this.clientGoal,
                    'mb-3' : this.clientGoal,
                } ),
            }
        },
    },

    watch: {
        loading() {
            if (!this.loading) {
                setTimeout(() => {
                    this.$refs.formObserver.validate()
                }, 100)
            }
        },
    },

    // post case
    mounted() {
        setTimeout(() => {
            this.$refs.formObserver.validate()
        }, 100)
    },

    methods: {
        onSubmit () {
            this.$emit('submit')
        },
    },
}
</script>

<style lang="scss" scoped></style>
