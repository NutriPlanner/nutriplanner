const planToDeleteNotFound = (data) => {
    return {
        message: 'El plan que desea eliminar no se encuentra en nuestros registros. Refresque el sitio y vuelva a intentar.',
    }
}

const planToUpdateNotFound = (data) => {
    return {
        message: 'El plan que desea modificar no se encuentra en nuestros registros. Refresque el sitio y vuelva a intentar.',
    }
}

export default {
    PLAN__DELETE__NOT_FOUND : planToDeleteNotFound,
    PLAN__UPDATE__NOT_FOUND : planToUpdateNotFound,
}
