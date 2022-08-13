<template>
    <div class="np-page np-page--recover-password">
        <div class="pb-3">
            <b-row align-h="center">
                <b-col>
                    <b-card
                        title="Recuperar Contraseña"
                        class="np-page--recover-password__card"
                    >

                        <!-- HELP -->
                        <p class="text-justify">
                            Para recuperar contraseña, ingrese su correo electrónico. Luego,
                            se le enviará un correo con un código de autorización para que
                            pueda hacer efectivo el cambio.
                        </p>


                        <!-- FORM -->
                        <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                            <b-form @submit.stop.prevent="handleSubmit(getCode)">


                                <!-- EMAIL -->
                                <validation-provider v-slot="validationContext" name="correo" rules="required|email">
                                    <b-form-group
                                        id="input-group-email"
                                        label="Correo electrónico"
                                        label-for="input-email"
                                    >
                                        <b-form-input
                                            id="input-email"
                                            v-model="email"
                                            type="email"
                                            aria-describedby="input-email-feedback"
                                            trim
                                            :state="__getValidationState(validationContext)"
                                        />

                                        <b-form-invalid-feedback id="input-email-feedback">
                                            {{ validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </validation-provider>


                                <!-- GET CODE BUTTON -->
                                <Overlay :loading="loading">
                                    <b-button block type="submit" variant="primary">
                                        Obtener código
                                    </b-button>
                                </Overlay>


                                <!-- TO CHANGE PASSWORD BUTTON -->
                                <b-button
                                    block
                                    variant="outline-primary"
                                    :disabled="loading"
                                    @click="redirectToChangePassword"
                                >
                                    Ya poseo un código
                                </b-button>


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
    name   : 'RecoverPasswordPage',
    layout : 'start',
    auth   : 'guest',

    computed: {
        ...mapFields('recoverPassword', {
            email   : 'data.email',
            loading : 'loading',
        } ),
    },

    mounted() {
        setTimeout( () => {
            this.$refs.formObserver.validate()
        }, 100)
    },

    methods: {
        ...mapActions('recoverPassword', {
            getCode                        : 'getCode',
            redirectToChangePasswordAction : 'redirectToChangePassword',
            redirectToLogin                : 'redirectToLogin',
        } ),

        redirectToChangePassword () {
            this.$refs.formObserver.validate().then( (valid) => {
                if (valid)
                    this.redirectToChangePasswordAction()
            } )
        },
    },
}
</script>

<style lang="scss" scoped>
.np-page--recover-password__card {
  margin: auto;
  max-width: 25rem;
}
</style>
