import moment from 'moment'
import base from './base'

export const state = base.state

export const getters = base.getters

export const mutations = base.mutations

export const actions = {
    ...base.actions,

    async getPendings( { dispatch }, { filter, sortBy, limit, page } = {} ) {
        const filters = JSON.stringify( {
            date: { $lte: moment.utc().toISOString() },
            ...JSON.parse(filter),
        } )

        return await dispatch('fetch', { filter: filters, sortBy, limit, page, options: { url: '/pendings' } } )
    },
}
