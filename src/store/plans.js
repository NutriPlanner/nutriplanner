import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'
import { ResponseStatus, ErrorHandler, Fetch, Store } from '@/utils'
import { routesNames } from '@/config/routes'
import plansErrors from '@/store/errors/plans.errors'
import plansConfigs from '@/store/configs/plans.configs'

const CancelToken = axios.CancelToken
let source = CancelToken.source()

const { setupErrorHandler, errorHandler } = ErrorHandler
setupErrorHandler(plansErrors)

const apiNamespace = 'plans'

const defaultData = {
    plans        : [],
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
        return plansConfigs.tableFields
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

    async fetch ( { commit, state }, { filter, sortBy, limit, page } = {} ) {
        source = Fetch.abortPreviousRequest(source)
        commit('set', { loading: true } )

        const params = {
            filter : filter || '{}',
            sortBy : sortBy || '',
            limit  : limit || 10,
            page   : page || state.data.page,
        }

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.get(`/${apiNamespace}`, { params, cancelToken: source.token } )
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            commit('set', {
                'data.plans'        : data.results,
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
            this._vm.$bvToast.toast('El plan se ha eliminado correctamente.', {
                title   : 'Eliminación completada',
                variant : 'success',
                solid   : false,
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },


    // VIEW ACTIONS

    redirectToPost ( { commit } ) {
        commit('resetData')
        this.$router.push( { name: routesNames.HOME_PLANS_POST } )
    },

    redirectToPut ( { commit }, { id } ) {
        commit('resetData')
        this.$router.push( { name: routesNames.HOME_PLANS_PUT, query: { id } } )
    },
}
