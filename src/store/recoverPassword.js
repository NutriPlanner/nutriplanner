import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { routesNames } from '@/config/routes'
import { ResponseStatus } from '@/utils'

const defaultData = {
    email: '',
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

    resetData(state) {
        state.data = {
            ...defaultData,
        }
    },
}

export const actions = {

    // API CALLS

    async getCode ( { state, commit, dispatch } ) {
        commit('set', { loading: true } )

        const params = { ...state.data }

        const { status, data, message, error } = await dispatch('authorization/requestChangePassword', params, { root: true } )

        if (status === ResponseStatus.FULLFILLED)
            dispatch('redirectToChangePassword')
        
        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    // VIEW ACTIONS

    redirectToChangePassword ( { state, commit } ) {
        this.$router.push( {
            name  : routesNames.CHANGE_PASSWORD,
            query : {
                email: state.data.email,
            },
        } )

        commit('resetData')
    },

    redirectToLogin ( { commit } ) {
        this.$router.push( { name: routesNames.LOGIN } )
        commit('resetData')
    },
}
