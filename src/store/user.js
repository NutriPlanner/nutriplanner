import axios from 'axios'
import { setupErrorHandler, errorHandler } from '../utils/ErrorHandler'
import { FULLFILLED } from '../utils/responseStatus'
import userErrors from '../services/user.errors'
import userServices from '../services/user.services'

const CancelToken = axios.CancelToken
let source = CancelToken.source()

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

    abortPreviousRequests () {
    // abort previous operations
        const cancelMemory = { oldSource: source, newSource: CancelToken.source() }
        source = cancelMemory.newSource

        // this timeout is important to await the source is injected in the axios instance
        setTimeout( () => {
            cancelMemory.oldSource.cancel('Operation canceled by the user.')
        }, 100)
    },

    async update ( { commit, dispatch, rootState }, params) {
        dispatch('abortPreviousRequests')
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
