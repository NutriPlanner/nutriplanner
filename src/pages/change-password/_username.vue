<template>
  <div class="np-page np-page--change-password">
    <div class="pb-3">
      <b-row align-h="center">
        <b-col>
          <b-card
            title="Nueva Contraseña"
            class="np-page--change-password__card"
          >
            <b-card-text>
              <p class="text-justify">
                Para cambiar contraseña, ingrese el código de autorización
                enviado a su correo electrónico.
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

                  <b-button block type="submit" variant="primary">
                    Cambiar contraseña
                  </b-button>

                  <b-button block variant="link" to="/login"> Volver </b-button>
                </b-form>
              </validation-observer>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordPage",
  layout: "start",
  auth: "guest",
  data() {
    return {
      CODE_LENGTH: 6,

      form: {
        code: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  methods: {
    onSubmit() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.np-page--change-password__card {
  margin: auto;
  max-width: 25rem;
}
</style>
