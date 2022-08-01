<template>
    <div class="np-component np-component--user-password-info">
        <b-card title="Contraseña">
            <b-card-text>
                <p class="text-justify">
                    Para cambiar contraseña, debe ingresar el código de autorización
                    enviado a su correo electrónico después de haber presionado en el botón <code>SOLICITAR CÓDIGO</code>.
                </p>

                <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                    <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                        <validation-provider
                            v-slot="validationContext"
                            name="código"
                            :rules="{
                                required: true,
                                min: CODE_LENGTH,
                                max: CODE_LENGTH,
                            }"
                        >
                            <b-form-group
                                id="input-group-code"
                                label="Código de Autorización"
                                label-for="input-code"
                            >
                                <b-form-input
                                    id="input-code"
                                    v-model="form.code"
                                    v-input-upper
                                    v-input-max-length="CODE_LENGTH"
                                    aria-describedby="input-code-feedback"
                                    trim
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-code-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <b-button
                            block variant="outline-primary" :disabled="loading"
                            class="mb-4"
                            @click="requestCode"
                        >
                            {{ requestingCodeLoading ? codeCounter : 'SOLICITAR CÓDIGO' }}
                        </b-button>

                        <validation-provider
                            v-slot="validationContext"
                            name="contraseña"
                            :rules="{ required: true, min: 8 }"
                        >
                            <b-form-group
                                id="input-group-password"
                                label="Nueva Contraseña"
                                label-for="input-password"
                            >
                                <b-form-input
                                    id="input-password"
                                    v-model="form.password"
                                    aria-describedby="input-password-feedback"
                                    type="password"
                                    trim
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-password-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <validation-provider
                            v-slot="validationContext"
                            name="confirmar contraseña"
                            :rules="{
                                required: true,
                                equalValues: {
                                    otherValue: form.password,
                                    otherName: 'contraseña',
                                },
                            }"
                        >
                            <b-form-group
                                id="input-group-confirm-password"
                                label="Confirmar Contraseña"
                                label-for="input-confirm-password"
                            >
                                <b-form-input
                                    id="input-confirm-password"
                                    v-model="form.confirmPassword"
                                    aria-describedby="input-confirm-password-feedback"
                                    type="password"
                                    trim
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback
                                    id="input-confirm-password-feedback"
                                >
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <Overlay :loading="loading">
                            <b-button block type="submit" variant="primary">
                                Cambiar contraseña
                            </b-button>
                        </Overlay>
                    </b-form>
                </validation-observer>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import _ from 'lodash'
import { FULLFILLED } from '@/utils/responseStatus'

const initialFormState = {
    code            : '',
    password        : '',
    confirmPassword : '',
}

export default {
    name: 'UserPasswordInfoComponent',
    data() {
        return {
            CODE_LENGTH: 6,

            form: _.cloneDeep(initialFormState),

            requestingCodeLoading : false,
            codeCounter           : 30,
        }
    },
    computed: {
        userEmail() {
            return this.$store.state.auth.user.email || ''
        },

        loading() {
            return this.$store.state.authorization.loading
        },
    },
    methods: {
        requestCode() {
            if (!this.requestingCodeLoading) {
                this.requestingCodeLoading = true
                this.codeCounter = 30
                this.codeInterval = setInterval( () => {
                    this.codeCounter--
                    if (this.codeCounter === 0) {
                        clearInterval(this.codeInterval)
                        this.requestingCodeLoading = false
                    }
                }, 1000)

                this.$store.dispatch('authorization/requestChangePassword', {
                    params: {
                        email: this.userEmail,
                    },
                } )
            }
        },

        async onSubmit() {
            const { status } = await this.$store.dispatch('authorization/changePassword', {
                params: {
                    ...this.form,
                    email: this.userEmail,
                },
            } )

            if (status === FULLFILLED) {
                this.form = _.cloneDeep(initialFormState),
                setTimeout( () => {
                    this.$refs.formObserver.validate()
                }, 100)
            }
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
