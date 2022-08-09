import { getField, updateField } from 'vuex-map-fields'
import { ResponseStatus, ErrorHandler, Store } from '@/utils'
import clientsErrors from '@/store/errors/clients.errors'

const { setupErrorHandler, errorHandler } = ErrorHandler
setupErrorHandler(clientsErrors)

const apiNamespace = 'clients'

const defaultData = {
    herba_id  : '',
    name      : '',
    last_name : '',
    rut       : '',
    birthday  : '',
    address   : '',
    phone     : '',
    email     : '',
}

export const state = () => ( {
    data: {
        ...defaultData,
    },
    loading: false,
} )

export const getters = {
    getField,
}

export const mutations = {
    updateField,
    
    set (state, newState) {
        Store.set(state, newState)
    },

    resetData(state) {
        state.data = {
            ...defaultData,
        }
    },
}

export const actions = {

    // API CALLS

    async fetch ( { commit }, id) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.get(`/${apiNamespace}/${id}`)
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            commit('set', {
                data: {
                    ...defaultData,
                    ...data,
                },
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async create ( { state, commit } ) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.post(`/${apiNamespace}`, state.data)
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            this._vm.$bvToast.toast('El cliente se ha registrado correctamente.', {
                title   : 'Registro completado',
                variant : 'success',
                solid   : false,
            } )

            commit('resetData')
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async update ( { state, commit } ) {
        commit('set', { loading: true } )

        const { id, ...params } = state.data

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.put(`/${apiNamespace}/${id}`, params)
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            this._vm.$bvToast.toast('El cliente ha sido modificado correctamente.', {
                title   : 'Registro actualizado',
                variant : 'success',
                solid   : false,
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    // VIEW ACTIONS

    resetData ( { commit } ) {
        commit('resetData')
    },
}
