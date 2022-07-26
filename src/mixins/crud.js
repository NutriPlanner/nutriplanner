export default {
  methods: {
    __setupCrudStore (_id, data) {
      this.$store.dispatch('crud/setup', {
        _id,
        ...data
      })
    },

    __crudGet (_id, path) {
      return this.$store.getters['crud/get'](_id, path)
    },

    async __callCrud (_id, method, data) {
      switch (method) {
        case 'GET': {
          this.$store.dispatch('crud/call', {
            _id,
            method,
            data
          })
          break
        }

        case 'POST_REDIRECT': {
          this.$store.dispatch('crud/call', {
            _id,
            method,
            data
          })

          break
        }

        case 'POST': {
          this.$store.dispatch('crud/call', {
            _id,
            method,
            data
          })
          break
        }

        case 'PUT_REDIRECT': {
          this.$store.dispatch('crud/call', {
            _id,
            method,
            data
          })

          break
        }

        case 'PUT': {
          this.$store.dispatch('crud/call', {
            _id,
            method,
            data
          })
          break
        }

        case 'DELETE': {
          const confirmed = await this.$bvModal.msgBoxConfirm('¿Está seguro de deseas eliminar este registro? Esta operación no es reversible.', {
            title: 'Confirmar eliminación',
            okVariant: 'danger',
            okTitle: 'Eliminar',
            cancelVariant: 'outline-primary',
            cancelTitle: 'Cancelar'
          })

          if (confirmed) {
            await this.$store.dispatch('crud/call', {
              _id,
              method,
              data
            })
          }
          break
        }

        default:
          break
      }
    }
  }
}
