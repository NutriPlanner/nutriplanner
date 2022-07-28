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
                      id="input-group-email"
                      label="Correo electrónico"
                      label-for="input-email"
                    >
                      <b-form-input
                        id="input-email"
                        v-model="form.email"
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

                  <Overlay :loading="loading">
                    <b-button block type="submit" variant="primary">
                      Obtener código
                    </b-button>
                  </Overlay>

                  <b-button
                    block
                    variant="outline-primary"
                    :disabled="loading"
                    @click="toChangePasswordView"
                  >
                    Ya poseo un código
                  </b-button>

                  <b-button
                    block
                    variant="link"
                    to="/login"
                    :disabled="loading"
                  >
                    Volver
                  </b-button>
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
import { FULLFILLED } from "@/utils/responseStatus";

export default {
  name: "RecoverPasswordPage",
  layout: "start",
  auth: "guest",
  data() {
    return {
      form: {
        email: "",
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.authorization.loading;
    },
  },
  methods: {
    async onSubmit() {
      const { status } = await this.$store.dispatch(
        "authorization/requestChangePassword",
        {
          params: _.cloneDeep(this.form),
        }
      );
      if (status === FULLFILLED) {
        this.$router.push({
          name: "change-password",
          query: {
            email: this.form.email,
          },
        });
      }
    },
    toChangePasswordView() {
      this.$refs.formObserver.validate().then((valid) => {
        if (valid) {
          this.$router.push({
            name: "change-password",
            query: {
              email: this.form.email,
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
