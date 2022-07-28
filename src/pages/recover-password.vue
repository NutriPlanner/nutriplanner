<template>
  <div class="np-page np-page--recover-password">
    <div class="pb-3">
      <b-row align-h="center">
        <b-col>
          <b-card
            title="Recuperar Contraseña"
            class="np-page--recover-password__card"
          >
            <b-card-text>
              <p class="text-justify">
                Para recuperar contraseña, ingrese su correo electrónico. Luego,
                se le enviará un correo con un código de autorización para que
                pueda hacer efectivo el cambio.
              </p>

              <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                  <validation-provider
                    v-slot="validationContext"
                    name="correo"
                    rules="required|email"
                  >
                    <b-form-group
                      id="input-group-username"
                      label="Correo electrónico"
                      label-for="input-username"
                    >
                      <b-form-input
                        id="input-username"
                        v-model="form.username"
                        type="email"
                        aria-describedby="input-username-feedback"
                        trim
                        :state="__getValidationState(validationContext)"
                      />

                      <b-form-invalid-feedback id="input-username-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                  <b-button block type="submit" variant="primary">
                    Obtener código
                  </b-button>

                  <b-button
                    block
                    variant="outline-primary"
                    @click="toChangePasswordView"
                  >
                    Ya poseo un código
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
  name: "RecoverPasswordPage",
  layout: "start",
  auth: "guest",
  data() {
    return {
      form: {
        username: "",
      },
    };
  },

  methods: {
    onSubmit() {
      this.$router.push("/");
    },

    toChangePasswordView() {
      this.$refs.formObserver.validate().then((valid) => {
        if (valid) {
          this.$router.push({
            path: "/change-password",
            params: {
              username: this.form.username,
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.np-page--recover-password__card {
  margin: auto;
  max-width: 25rem;
}
</style>
