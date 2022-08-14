<template>
    <div class="np-page np-page--login">
        <div class="pb-3">
            <b-row align-h="center">
                <b-col>
                    <b-card title="Inicio de Sesión" class="np-page--login__card">
                        <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                            <b-form @submit.prevent="handleSubmit(login)">

                                <!-- EMAIL -->
                                <validation-provider v-slot="validationContext" name="correo" :rules="{ required: true }">
                                    <b-form-group
                                        id="input-group-email"
                                        label="Correo electrónico"
                                        label-for="input-email"
                                    >
                                        <b-form-input
                                            id="input-email"
                                            v-model="email"
                                            trim
                                            aria-describedby="input-email-feedback"
                                            :state="__getValidationState(validationContext)"
                                        />

                                        <b-form-invalid-feedback id="input-email-feedback">
                                            {{ validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </validation-provider>


                                <!-- PASSWORD -->
                                <validation-provider v-slot="validationContext" name="correo" rules="required">
                                    <b-form-group
                                        id="input-group-password"
                                        label="Contraseña"
                                        label-for="input-password"
                                    >
                                        <b-form-input
                                            id="input-password"
                                            v-model="password"
                                            type="password"
                                            aria-describedby="input-password-feedback"
                                            :state="__getValidationState(validationContext)"
                                        />

                                        <b-form-invalid-feedback id="input-password-feedback">
                                            {{ validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </validation-provider>


                                <!-- SUBMIT BUTTON -->
                                <Overlay :loading="loading">
                                    <b-button block type="submit" variant="primary">
                                        Ingresar
                                    </b-button>
                                </Overlay>


                                <!-- RECOVER PASSWORD BUTTON -->
                                <b-button
                                    block
                                    variant="link"
                                    :disabled="loading"
                                    @click="redirectToForgonPassword"
                                >
                                    Recuperar contraseña
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
    name   : 'LoginPage',
    layout : 'start',
    auth   : 'guest',

    computed: {
        ...mapFields('login', {
            email    : 'data.email',
            password : 'data.password',
            loading  : 'loading',
        } ),
    },

    mounted() {
        setTimeout(() => {
            this.$refs.formObserver.validate()
        }, 100)
    },

    methods: {
        ...mapActions('login', {
            login                    : 'login',
            redirectToForgonPassword : 'redirectToForgonPassword',
        } ),
    },
}
</script>

<style lang="scss" scoped>
.np-page--login__card {
  margin: auto;
  max-width: 25rem;
}
</style>
