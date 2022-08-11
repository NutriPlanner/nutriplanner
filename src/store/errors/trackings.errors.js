const trackingToDeleteNotFound = (data) => {
    return {
        message: 'El seguimiento que desea eliminar no se encuentra en nuestros registros. Refresque el sitio y vuelva a intentar.',
    }
}

const trackingToUpdateNotFound = (data) => {
    return {
        message: 'El seguimiento que desea modificar no se encuentra en nuestros registros. Refresque el sitio y vuelva a intentar.',
    }
}

export default {
    TRACKING__DELETE__NOT_FOUND : trackingToDeleteNotFound,
    TRACKING__UPDATE__NOT_FOUND : trackingToUpdateNotFound,
}
