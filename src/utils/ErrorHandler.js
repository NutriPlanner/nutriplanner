import { ResponseStatus } from '@/utils'

let errorsHandler = {}

export const setupErrorHandler = (errorListeners) => {
    errorsHandler = {
        ...errorsHandler,
        ...errorListeners,
    }
}

export const errorHandler = async (next, ctx) => {
    if (!ctx)
        throw new Error('ctx is required in errorHandler')
  

    try {
        const response = await next()

        return {
            status : ResponseStatus.FULLFILLED,
            data   : response?.data || {},
        }
    }
    catch (error) {
        // in case of cancel operation we don't want to show the error
        if (error.__CANCEL__) {
            return {
                status  : ResponseStatus.CANCELLED,
                message : error.message,
            }
        }

        if (error.response && error.response.data) {
            const { internalCode, data } = error.response.data

            if (errorsHandler[internalCode] ) {
                const { message, type } = errorsHandler[internalCode](data)
                ctx._vm.$bvToast.toast(message, {
                    title         : 'Error!',
                    variant       : type || 'danger',
                    solid         : false,
                    autoHideDelay : 7000,
                } )

                return {
                    status : ResponseStatus.REJECTED,
                    message,
                    error  : error.response.data,
                }
            }
            else {
                const message = 'Ha ocurrido un error no controlado, contacte a soporte para más información.'
                ctx._vm.$bvToast.toast(message, {
                    title   : 'Error!',
                    variant : 'danger',
                    solid   : false,
                } )

                return {
                    status : ResponseStatus.REJECTED,
                    message,
                    error  : error.response.data,
                }
            }
        }
        else {
            const message = 'Ha ocurrido un error no controlado, contacte a soporte para más información.'
            ctx._vm.$bvToast.toast(message, {
                title   : 'Error!',
                variant : 'danger',
                solid   : false,
            } )

            return {
                status: ResponseStatus.REJECTED,
                message,
                error,
            }
        }
    }
}

export default {
    setupErrorHandler,
    errorHandler,
}
