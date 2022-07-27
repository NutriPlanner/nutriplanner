<template>
  <div class="np-page np-page--login">
    <div class="pb-3">
      <b-row align-h="center">
        <b-col>
          <b-card title="Inicio de Sesión" class="np-page--login__card">
            <b-card-text>
              <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(onSubmit)">
                  <validation-provider
                    v-slot="validationContext"
                    name="correo"
                    rules="required"
                  >
                    <b-form-group
                      id="input-group-email"
                      label="Correo electrónico"
                      label-for="input-email"
                    >
                      <b-form-input
                        id="input-email"
                        v-model="form.email"
                        trim
                        aria-describedby="input-email-feedback"
                        :state="__getValidationState(validationContext)"
                      />

                      <b-form-invalid-feedback id="input-email-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                  <validation-provider
                    v-slot="validationContext"
                    name="correo"
                    rules="required"
                  >
                    <b-form-group
                      id="input-group-password"
                      label="Contraseña"
                      label-for="input-password"
                    >
                      <b-form-input
                        id="input-password"
                        v-model="form.password"
                        type="password"
                        aria-describedby="input-password-feedback"
                        :state="__getValidationState(validationContext)"
                      />

                      <b-form-invalid-feedback id="input-password-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                  <Overlay :loading="loading">
                    <b-button block type="submit" variant="primary">
                      Ingresar
                    </b-button>
                  </Overlay>

                  <Overlay :loading="loading">
                    <b-button block variant="link" to="/recover-password">
                      Recuperar contraseña
                    </b-button>
                  </Overlay>
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
import _ from "lodash";

export default {
  name: "LoginPage",
  layout: "start",
  auth: "guest",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.authorization.loading;
    },
  },
  methods: {
    onSubmit() {
      const params = _.cloneDeep(this.form);
      this.$store.dispatch("authorization/login", { params });
    },
  },
};
</script>

<style lang="scss" scoped>
.np-page--login__card {
  margin: auto;
  max-width: 25rem;
}
</style>
