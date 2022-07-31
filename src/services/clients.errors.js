const fieldAlreadyTaken = (data) => {
    return {
        message: `Ya existe un registro con el mismo valor para el campo ${
            data?.field || '?'
        }.`,
    }
}

const clientToDeleteNotFound = (data) => {
    return {
        message:
      'El cliente que desea eliminar no se encuentra en nuestros registros. Refresque el sitio y vuelva a intentar.',
    }
}

const clientToUpdateNotFound = (data) => {
    return {
        message:
      'El cliente que desea modificar no se encuentra en nuestros registros. Refresque el sitio y vuelva a intentar.',
    }
}

export default {
    GLOBAL__FIELD_ALREADY_TAKEN : fieldAlreadyTaken,
    CLIENT__DELETE__NOT_FOUND   : clientToDeleteNotFound,
    CLIENT__UPDATE__NOT_FOUND   : clientToUpdateNotFound,
}
