import { ErrorHandler } from '@/utils'
import { FULLFILLED } from '@/utils/responseStatus'
import userErrors from '@/services/user.errors'
import userServices from '@/services/user.services'

const { setupErrorHandler, errorHandler } = ErrorHandler
setupErrorHandler(userErrors)

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
    set ( { commit }, data) {
        commit('set', data)
    },

    async update ( { commit, rootState }, params) {
        commit('set', { loading: true } )

        const customParams = {
            ...params,
            id: rootState.auth.user.id,
        }

        const { status, data, message, error } = await errorHandler(async () => {
            return await userServices.updateUser(customParams, {
                cancelToken: source.token,
            } )
        }, this)

        if (status === FULLFILLED) {
            this._vm.$bvToast.toast('Sus datos han sido actualizados correctamente.', {
                title   : 'Datos actualizados',
                variant : 'success',
                solid   : false,
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },
}
