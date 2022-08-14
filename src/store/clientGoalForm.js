import moment from 'moment'
import { getField, updateField } from 'vuex-map-fields'
import { Store, Fetch, ErrorHandler, ResponseStatus } from '@/utils'
import clientsGoalsErrors from '@/store/errors/clientsGoals.errors'
import clientsConfigs from '@/store/configs/clients.configs'

const namespace = 'clientGoals'

const { setupErrorHandler, errorHandler } = ErrorHandler
setupErrorHandler(clientsGoalsErrors)

const defaultData = {
    name           : '',
    status         : clientsConfigs.GOAL_STATUS.INCOMPLETE,
    start_date     : moment().format('YYYY-MM-DD'),
    plan           : null,
    tasks          : [],
    extra_sessions : [],
    client         : '',
}

export const state = () => ( {
    data: {
        ...defaultData,
    },
    loading      : false,
    isNew        : true,
    planResults  : [],
    loadingPlans : false,
} )

export const getters = {
    getField,

    status() {
        return clientsConfigs.GOAL_STATUS
    },

    statusOptions() {
        return clientsConfigs.goalStatusOptions
    },

    planOptions(state) {
        return state.planResults.map(plan => ( {
            text  : plan.name,
            value : plan.id,
        } ))
    },

    progress(state) {
        return {
            completed : state.data.tasks.filter(task => task.completed).length,
            total     : state.data.tasks.length,
        }
    },

    startDate(state) {
        return moment(state.data.start_date, 'YYYY-MM-DD').startOf('day').toISOString()
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

    async get ( { commit }, id) {
        commit('set', { loading: true } )
       
        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.get(`/${namespace}/${id}`)
        }, this)

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async fetch ( { state, commit }, { clientId } ) {
        commit('set', { loading: true } )

        const params = {
            filter: {
                client : clientId,
                active : true,
            },
            limit : 1,
            page  : 1,
        }

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.get(`/${namespace}`, { params } )
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            // if exists, then it's not a new goal
            if (data.results[0] ) {
                commit('set', {
                    isNew : false,
                    data  : {
                        ...state.data,
                        ...data.results[0],
                        start_date: moment(data.results[0].start_date).local().format('YYYY-MM-DD'),
                    },
                } )
            }
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async save ( { state, dispatch } ) {
        if (state.isNew)
            return await dispatch('create')
        else
            return await dispatch('update')
    },

    async create ( { state, commit, getters } ) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.post(`/${namespace}`, {
                ...state.data,
                start_date : getters.startDate,
                client     : this.$router.currentRoute.query.id,
            } )
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            this._vm.$bvToast.toast('El objetivo se ha registrado correctamente.', {
                title   : 'Registro completado',
                variant : 'success',
                solid   : false,
            } )

            commit('set', {
                data: {
                    ...defaultData,
                    ...data,
                    start_date: getLocalFormatedDate(data.start_date),
                },
                isNew: false,
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async update ( { state, commit, getters } ) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.put(`/${namespace}/${state.data.id}`, {
                ...state.data,
                start_date : getters.startDate,
                client     : this.$router.currentRoute.query.id,
            } )
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            this._vm.$bvToast.toast('El objetivo ha sido modificado correctamente.', {
                title   : 'Registro actualizado',
                variant : 'success',
                solid   : false,
            } )

            commit('set', {
                data: {
                    ...defaultData,
                    ...data,
                    start_date: getLocalFormatedDate(data.start_date),
                },
                isNew: false,
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async close ( { commit, state } ) {
        commit('set', { loading: true } )

        const { status, data, message, error } = await errorHandler(async () => {
            return await this.$axios.put(`/${namespace}/close/${state.data.id}`)
        }, this)

        if (status === ResponseStatus.FULLFILLED) {
            this._vm.$bvToast.toast('El objetivo se ha cerrado correctamente.', {
                title   : 'Objetivo completado',
                variant : 'success',
                solid   : false,
            } )

            commit('resetData')
            commit('set', {
                'data.id' : undefined,
                "isNew"   : true,
            } )
        }

        commit('set', { loading: false } )

        return { status, data, message, error }
    },

    async fetchPlanOptions ( { dispatch, commit }, name) {
        commit('set', { loadingPlans: true } )

        const nameFilter = Fetch.setFilterParam( [ 'name' ], name)
        const params = {
            filter: JSON.stringify( {
                page  : 1,
                limit : 10,
                ...JSON.parse(nameFilter),
            } ),
        }

        const { status, data } = await dispatch('plans/fetch', params, { root: true } )

        if (status === ResponseStatus.FULLFILLED)
            commit('set', { planResults: data.results } )
        else
            commit('set', { planResults: [] } )

        commit('set', { loadingPlans: false } )
    },


    // VIEW ACTIONS

    addNewTask ( { state, commit } ) {
        commit('set', {
            'data.tasks': [
                ...state.data.tasks,
                {
                    completed   : false,
                    description : '',
                },
            ],
        } )
    },

    deleteTask ( { state, commit }, index) {
        const newTasks = _.cloneDeep(state.data.tasks)
        newTasks.splice(index, 1)

        commit('set', {
            'data.tasks': newTasks,
        } )
    },

    addNewExtraSession ( { commit, state } ) {
        commit('set', {
            'data.extra_sessions': [
                ...state.data.extra_sessions,
                {
                    subject : '',
                    start   : '7',
                },
            ],
        } )
    },

    deleteExtraSession ( { state, commit }, index) {
        const newExtraSessions = _.cloneDeep(state.data.extra_sessions)
        newExtraSessions.splice(index, 1)

        commit('set', {
            'data.extra_sessions': newExtraSessions,
        } )
    },

    resetData ( { commit } ) {
        commit('resetData')
    },
}


// UTILS

const getLocalFormatedDate = (utcDate) => {
    return moment(utcDate).local().format('YYYY-MM-DD')
}
