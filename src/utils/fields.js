export const getNeededFields = (fields, neededField) => {
    return fields.filter(field => neededField.includes(field.key) )
}

export default {
    getNeededFields,
}
