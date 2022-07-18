export default {
  validate (value, { otherValue }) {
    return value === otherValue
  },
  params: ['otherValue', 'otherName'],
  message (fieldName, { otherName }) {
    return `El campo ${fieldName} debe ser igual al campo ${otherName}`
  }
}
