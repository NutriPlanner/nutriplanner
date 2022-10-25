const lowerLicensee = (data) => {
    return {
        message: 'Su usuario no tiene permisos para realizar operaciones que requieren una licencia superior. Si desea actualizar su suscripción, contacte a ventas: sales@nutriplanner.life.',
    }
}

const invalidCredentials = (data) => {
    return {
        message: 'Las credenciales ingresadas no son válidas.',
    }
}

const userNotFound = (data) => {
    return {
        message: `El usuario con el correo electrónico "${
            data.email || '?'
        }" no existe.`,
    }
}

const passwordResetFailed = (data) => {
    return {
        message: 'No se ha podido cambiar la contraseña. Por favor, inténtelo de nuevo. Si el problema persiste, puede que se deba a que su código expiró, de lo contrario, contacte a soporte para recibir ayuda.',
    }
}

const inactiveAccount = (data) => {
    return {
        message: 'Su usuario se encuentra inactivo. Si necesita ayuda, contacte a soporte para recibir ayuda.',
    }
}

export default {
    AUTH__LOWER_LICENSEE        : lowerLicensee,
    AUTH__INVALID_CREDENTIALS   : invalidCredentials,
    AUTH__USER_NOT_FOUND        : userNotFound,
    AUTH__PASSWORD_RESET_FAILED : passwordResetFailed,
    AUTH__INACTIVE_ACCOUNT      : inactiveAccount,
}
