const clientGoalToUpdateNotFound = (data) => {
    return {
        message: 'El objetivo que desea modificar no se encuentra en nuestros registros. Refresque el sitio y vuelva a intentar.',
    }
}

const planNotFound = () => {
    return {
        message: 'El plan seleccionado no se encuentra. Intente buscando nuevamente.',
    }
}

const clientNotFound = () => {
    return {
        message: 'El cliente no se encuentra. Refresque el sitio y vuelva a intentar.',
    }
}

const clientGoalExistsOneActive = () => {
    return {
        message: 'Ya existe un objetivo activo para este cliente. No puede haber más de uno activo a la vez.',
    }
}

export default {
    CLIENT__NOT_FOUND              : clientNotFound,
    PLAN__NOT_FOUND                : planNotFound,
    CLIENT_GOAL__UPDATE__NOT_FOUND : clientGoalToUpdateNotFound,
    CLIENT_GOAL__EXISTS_ONE_ACTIVE : clientGoalExistsOneActive,
}
