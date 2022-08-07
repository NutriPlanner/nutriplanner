import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { routesNames } from '@/config/routes'
import { ResponseStatus } from '@/utils'

const defaultData = {
    email           : '',
    code            : '',
    password        : '',
    confirmPassword : '',
}

export const state = () => ( {
    data: {
        ...defaultData,
    },
    loading : false,
    rules   : {
        codeLength        : 6,
        passwordMinLength : 8,
    },
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

    async changePassword ( { state, commit, dispatch } ) {
        commit('set', { loading: true } )

        const params = { ...state.data }

        const { status, data, message, error } = await dispatch('authorization/changePassword', params, { root: true } )

        if (status === ResponseStatus.FULLFILLED) {
            await dispatch('authorization/login', params, { root: true } )
            commit('resetData')
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    // VIEW ACTIONS

    redirectToLogin ( { commit } ) {
        this.$router.push( { name: routesNames.LOGIN } )
        commit('resetData')
    },
}
