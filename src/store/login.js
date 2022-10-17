import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { routesNames } from '@/config/routes'
import { ResponseStatus, Store } from '@/utils'

const defaultData = {
    email    : '',
    password : '',
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

    async login ( { state, commit, dispatch } ) {
        commit('set', { loading: true } )

        const params = { ...state.data }

        const { status, data, message, error } = await dispatch('authorization/login', params, { root: true } )

        if (status === ResponseStatus.FULLFILLED)
            commit('resetData')
        
        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    // VIEW ACTIONS

    redirectToForgonPassword ( { commit } ) {
        this.$router.push( { name: routesNames.RECOVER_PASSWORD } )
        commit('resetData')
    },
}
