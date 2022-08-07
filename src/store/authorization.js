import { setupErrorHandler, errorHandler } from '@/utils/ErrorHandler'
import { FULLFILLED } from '@/utils/responseStatus'
import authErrors from '@/store/errors/auth.errors'

setupErrorHandler(authErrors)

export const state = () => ( {
    loading: false,
} )

export const mutations = {
    set (state, data) {
        for (const key in data)
            state[key] = data[key]
    },
}

export const actions = {
    async login ( { commit }, { email, password } ) {
        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$auth.login( { data: { email, password } } )
        }, this)

        return { status, data, message, error }
    },

    async logout ( { commit } ) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$auth.logout( {
                data: {
                    refreshToken: this.$auth.strategies.local.refreshToken.get(),
                },
            } )
        }, this)

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async requestChangePassword ( { commit }, { params } ) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.post('/auth/forgot-password', params)
        }, this)

        if (status === FULLFILLED) {
            this._vm.$bvToast.toast(
                'Se ha generado un código de autorización. Revise la bandeja de entrada de su correo electrónico.',
                {
                    title         : 'Código enviado',
                    variant       : 'success',
                    solid         : false,
                    autoHideDelay : 10000,
                },
            )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async changePassword ( { commit }, { email, code, password } ) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.post('/auth/reset-password', { email, code, password } )
        }, this)

        if (status === FULLFILLED) {
            this._vm.$bvToast.toast('La contraseña se ha modificado correctamente.', {
                title   : 'Cambio aplicado',
                variant : 'success',
                solid   : false,
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },
}
