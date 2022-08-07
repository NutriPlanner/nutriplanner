import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { routesNames } from '@/config/routes'

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
        state = _.merge(state, newState)
    },
}

export const actions = {

    // API CALLS

    async login ( { state, commit, dispatch } ) {
        commit('set', { loading: true } )

        const params = { ...state.data }

        const { status, data, message, error } = await dispatch('authorization/login', params, { root: true } )

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    // VIEW ACTIONS

    redirectToForgonPassword (_ctx) {
        this.$router.push( { name: routesNames.RECOVER_PASSWORD } )
    },
}
