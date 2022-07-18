<template>
  <div class="np-page np-page--recover-password">
    <div class="pb-3">
      <b-row align-h="center">
        <b-col>
          <b-card title="Recuperar Contraseña" class="np-page--recover-password__card">
            <b-card-text>
              <p class="text-justify">
                Para recuperar contraseña, ingrese su correo electrónico. Luego, se le enviará un correo con un código de autorización para que pueda hacer efectivo el cambio.
              </p>

              <b-form validated @submit="onSubmit">
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
                    :state="isEmail"
                  />
                </b-form-group>
              </b-form>
            </b-card-text>

            <b-button block type="submit" variant="primary">
              Obtener código
            </b-button>

            <b-button block type="submit" variant="outline-primary">
              Ya poseo un código
            </b-button>

            <b-button block variant="link" to="/login">
              Volver
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import validator from 'validator'

export default {
  name: 'RecoverPasswordPage',
  layout: 'start',
  data () {
    return {
      form: {
        username: ''
      }
    }
  },

  methods: {
    isEmail (email) {
      return validator.isEmail(email)
    },

    onSubmit (event) {
      event.preventDefault()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.np-page--recover-password__card {
  margin: auto;
  max-width: 25rem;
}

</style>
