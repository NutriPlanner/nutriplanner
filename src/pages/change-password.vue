<template>
    <div class="np-page np-page--change-password">
        <div class="pb-3">
            <b-row align-h="center">
                <b-col>
                    <b-card
                        title="Nueva Contraseña"
                        class="np-page--change-password__card"
                    >

                        <!-- HELP -->
                        <p class="text-justify">
                            Para cambiar contraseña, ingrese el código de autorización
                            enviado a su correo electrónico.
                        </p>


                        <!-- FORM -->
                        <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                            <b-form @submit.stop.prevent="handleSubmit(changePassword)">


                                <!-- EMAIL -->
                                <b-form-group
                                    id="input-group-email"
                                    label="Correo electrónico"
                                    label-for="input-email"
                                >
                                    <b-form-input
                                        id="input-email"
                                        :value="email"
                                        type="email"
                                        disabled
                                    />
                                </b-form-group>


                                <!-- CODE -->
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
                                            v-model="code"
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


                                <!-- PASSWORD -->
                                <validation-provider v-slot="validationContext" name="contraseña" :rules="{ required: true, min: PASSWORD_LENGTH }">
                                    <b-form-group
                                        id="input-group-password"
                                        label="Nueva Contraseña"
                                        label-for="input-password"
                                    >
                                        <b-form-input
                                            id="input-password"
                                            v-model="password"
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


                                <!-- CONFIRM PASSWORD -->
                                <validation-provider
                                    v-slot="validationContext"
                                    name="confirmar contraseña"
                                    :rules="{
                                        required: true,
                                        equalValues: {
                                            otherValue: password,
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
                                            v-model="confirmPassword"
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


                                <!-- SUBMIT BUTTON -->
                                <Overlay :loading="loading">
                                    <b-button block type="submit" variant="primary">
                                        Cambiar contraseña
                                    </b-button>
                                </Overlay>


                                <!-- BACK BUTTON -->
                                <b-button
                                    block
                                    variant="link"
                                    :disabled="loading"
                                    @click="redirectToLogin"
                                >
                                    Volver
                                </b-button>
                            </b-form>
                        </validation-observer>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
    name   : 'ChangePasswordPage',
    layout : 'start',
    auth   : 'guest',

    computed: {
        ...mapFields('changePassword', {
            email           : 'data.email',
            code            : 'data.code',
            password        : 'data.password',
            confirmPassword : 'data.confirmPassword',
            loading         : 'loading',
            CODE_LENGTH     : 'rules.codeLength',
            PASSWORD_LENGTH : 'rules.passwordMinLength',
        } ),
    },

    mounted() {
        this.email = this.$route.query.email

        setTimeout(() => {
            this.$refs.formObserver.validate()
        }, 100)
    },

    methods: {
        ...mapActions('changePassword', {
            changePassword  : 'changePassword',
            redirectToLogin : 'redirectToLogin',
        } ),
    },
}
</script>

<style lang="scss" scoped>
.np-page--change-password__card {
  margin: auto;
  max-width: 25rem;
}
</style>
