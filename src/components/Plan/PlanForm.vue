<template>
    <div class="np-component np-component--plan-form">

        <!-- FORM -->
        <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onSubmit)">

                <p class="mb-3">
                    DEFINICIÓN DEL PLAN
                </p>
                <hr>


                <!-- NAME -->
                <validation-provider
                    v-slot="validationContext"
                    ref="input-name"
                    name="nombre"
                    :rules="{ required: true }"
                >
                    <b-form-group
                        id="input-group-name"
                        label="Nombre"
                        label-for="input-name"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-name"
                            v-model="name"
                            v-input-upper
                            aria-describedby="input-name-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-name-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- DESCRIPTION -->
                <validation-provider
                    v-slot="validationContext"
                    name="descripción"
                    :rules="{ required: false }"
                >
                    <b-form-group
                        id="input-group-description"
                        label="Descripción"
                        label-for="input-description"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-textarea
                            v-else
                            id="input-description"
                            v-model="description"
                            rows="4"
                            aria-describedby="input-description-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-description-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- TRACKINGS -->
                <p class="mt-5 mb-3">
                    SESIONES DE SEGUIMIENTO
                </p>
                <hr>


                <!-- TRACKINGS COUNT -->
                <validation-provider
                    v-slot="validationContext"
                    ref="input-sessions"
                    name="ctd. de sesiones"
                    :rules="{ required: true, min_value: 1, max_value: 50 }"
                >
                    <b-form-group
                        id="input-group-sessions"
                        label="Cantidad de sesiones"
                        label-for="input-sessions"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-sessions"
                            v-model="sessions_count"
                            type="number"
                            aria-describedby="input-sessions-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-sessions-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- GENRATE TRACKING SESSIONS BUTTON -->
                <b-button
                    block
                    variant="outline-primary"
                    :disabled="loading"
                    @click="setSessions"
                >
                    Generar sesiones
                </b-button>


                <!-- SESSIONS -->
                <PlanSessionsGroup ref="sessionsGroup" :sessions="sessions" class="mt-4" />


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
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
    name: 'PlanFormComponent',

    computed: {
        ...mapFields('planForm', {
            name           : 'data.name',
            description    : 'data.description',
            sessions_count : 'data.sessions_count',
            loading        : 'loading',
        } ),

        ...mapMultiRowFields('planForm', {
            sessions: 'data.sessions',
        } ),
    },

    watch: {
        sessions() {
            if (this.$refs.sessionsGroup.validate) {
                setTimeout( () => {
                    this.$refs.sessionsGroup.validate()
                }, 100)
            }
        },

        loading() {
            if (!this.loading) {
                setTimeout( () => {
                    this.$refs.formObserver.validate()
                }, 100)
            }
        },
    },

    methods: {
        ...mapActions('planForm', {
            setSessionsAction: 'setSessions',
        } ),

        onSubmit () {
            this.$emit('submit')
        },

        async setSessions() {
            const { valid: validName } = await this.$refs['input-name'].validate()
            const { valid: validSessions } = await this.$refs['input-sessions'].validate()

            if (validName && validSessions) {
                this.setSessionsAction()
            }
            else if (!validName) {
                this.$bvToast.toast(
                    'Primero debe ingresar un nombre para su plan.',
                    {
                        title   : 'Acción necesaria',
                        variant : 'info',
                        solid   : true,
                    },
                )
            }
            else if (!validSessions) {
                this.$bvToast.toast(
                    'Primero debe ingresar una cantidad de sesiones para su plan.',
                    {
                        title   : 'Acción necesaria',
                        variant : 'info',
                        solid   : true,
                    },
                )
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
