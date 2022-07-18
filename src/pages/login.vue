<template>
  <div class="np-page np-page--login">
    <div class="pb-3">
      <b-row align-h="center">
        <b-col>
          <b-card title="Inicio de Sesión" class="np-page--login__card">
            <b-card-text>
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  id="input-group-username"
                  label="Correo electrónico"
                  label-for="input-username"
                >
                  <b-form-input
                    id="input-username"
                    v-model="form.username"
                    type="email"
                    required
                    trim
                  />
                </b-form-group>

                <b-form-group
                  id="input-group-password"
                  label="Contraseña"
                  label-for="input-password"
                >
                  <b-form-input
                    id="input-password"
                    v-model="form.password"
                    type="password"
                    required
                  />
                </b-form-group>
              </b-form>
            </b-card-text>

            <b-button block type="submit" variant="primary">
              Ingresar
            </b-button>

            <b-button block variant="link" to="/recover-password">
              Recuperar contraseña
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'start',
  data () {
    return {
      form: {
        username: ''
      }
    }
  },

  methods: {
    onSubmit (event) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.np-page--login__card {
  margin: auto;
  max-width: 25rem;
}

</style>
