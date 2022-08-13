import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'
import { ResponseStatus, ErrorHandler, Fetch, Store } from '@/utils'
import { routesNames } from '@/config/routes'
import trackingsErrors from '@/store/errors/trackings.errors'
import trackingsConfigs from '@/store/configs/trackings.configs'

const CancelToken = axios.CancelToken
let source = CancelToken.source()

const { setupErrorHandler, errorHandler } = ErrorHandler
setupErrorHandler(trackingsErrors)

const apiNamespace = 'trackings'

const defaultData = {
    trackings    : [],
    totalPages   : 0,
    totalResults : 0,
    page         : 1,
}

export const state = () => ( {
    data: {
        ...defaultData,
    },
    loading: false,
} )

export const getters = {
    getField,

    tableFields () {
        return trackingsConfigs.tableFields
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

    async fetch ( { state, commit }, { filter, sortBy, limit, page, options } = {} ) {
        source = Fetch.abortPreviousRequest(source)
        commit('set', { loading: true } )

        const params = {
            filter : filter || '{}',
            sortBy : sortBy || '',
            limit  : limit || 10,
            page   : page || state.data.page,
        }

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.get(`/${apiNamespace}${options?.url || ''}`, { params, cancelToken: source.token } )
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            commit('set', {
                'data.trackings'    : data.results,
                'data.totalPages'   : data.totalPages,
                'data.totalResults' : data.totalResults,
            } )
        }
        
        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async deleteRegistry ( { commit }, id) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.delete(`/${apiNamespace}/` + id)
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            this._vm.$bvToast.toast('El seguimiento se ha eliminado correctamente.', {
                title   : 'Eliminación completada',
                variant : 'success',
                solid   : false,
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    // VIEW ACTIONS

    redirectToPost ( { commit }, { clientId } ) {
        commit('resetData')
        this.$router.push( { name: routesNames.HOME_TRACKING_POST, query: { clientId } } )
    },

    redirectToPut ( { commit }, { id } ) {
        commit('resetData')
        this.$router.push( { name: routesNames.HOME_TRACKING_PUT, query: { id } } )
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
