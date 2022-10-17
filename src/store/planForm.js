import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { ResponseStatus, ErrorHandler, Store } from '@/utils'
import plansErrors from '@/store/errors/plans.errors'

const { setupErrorHandler, errorHandler } = ErrorHandler
setupErrorHandler(plansErrors)

const apiNamespace = 'plans'

const defaultData = {
    name           : '',
    description    : '',
    sessions       : [],
    sessions_count : 1,
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
            this._vm.$bvToast.toast('El plan se ha registrado correctamente.', {
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
            this._vm.$bvToast.toast('El plan ha sido modificado correctamente.', {
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

    setSessions ( { state, commit } ) {
        // trunc the array to the number of sessions in order to keep the modifications made by the user
        if (state.data.sessions.length > Number(state.data.sessions_count)) {
            commit('set', {
                'data.sessions': state.data.sessions.slice(0, Number(state.data.sessions_count)),
            } )
        }

        // add new sessions if the number of sessions is greater than the length of sessions array
        if (state.data.sessions.length < Number(state.data.sessions_count)) {
            const start = state.data.sessions.length + 1
            const end = Number(state.data.sessions_count) + 1

            commit('set', {
                'data.sessions': state.data.sessions.concat(
                    _.range(start, end).map(i => ( {
                        subject : `SG[${i}] - ${state.data.name}`,
                        start   : '7',
                    } )),
                ),
            } )
        }
    },

    removeSession ( { state, commit }, index) {
        commit('set', {
            'data.sessions': state.data.sessions.slice(0, index),
        } )
    },
}
