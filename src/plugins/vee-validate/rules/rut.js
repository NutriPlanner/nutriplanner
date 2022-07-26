import { validate as validateRut } from 'rut.js'

export default {
  validate (value) {
    return validateRut(value)
  },
  message (fieldName) {
    return `El campo ${fieldName} no es válido`
  }
}
