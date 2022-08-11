import { getField, updateField } from 'vuex-map-fields'
import { ResponseStatus, ErrorHandler, Store } from '@/utils'
import trackingsErrors from '@/store/errors/trackings.errors'
import trackingsConfigs from '@/store/configs/trackings.configs'

const { setupErrorHandler, errorHandler } = ErrorHandler
setupErrorHandler(trackingsErrors)

const apiNamespace = 'trackings'

const defaultData = {
    status      : 'PENDING',
    subject     : '',
    measurement : {
        chest     : '',
        waist     : '',
        arm       : '',
        stomach   : '',
        thigh     : '',
        bottom    : '',
        body_mass : '',
    },
    note: '',
}


export const state = () => ( {
    data: {
        ...defaultData,
    },
    loading: false,
} )

export const getters = {
    getField,

    statusOptions () {
        return trackingsConfigs.statusOptions
    },
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

        const paramsWithClientId = {
            ...state.data,
            client: this.$router.currentRoute.query.clientId,
        }

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.post(`/${apiNamespace}`, paramsWithClientId)
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            this._vm.$bvToast.toast('El seguimiento se ha registrado correctamente.', {
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
            this._vm.$bvToast.toast('El seguimiento ha sido modificado correctamente.', {
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
