import { getField } from 'vuex-map-fields'
import { breadcrumbs } from '@/config/routes'

export const state = () => ( {
    items  : [],
    active : null,
} )

export const getters = {
    getField,
    
    items: state => state.items,
}

export const mutations = {
    setup (state, fullPath) {
        const params = fullPath ? fullPath.substring(1).split('/') : []
        const crumbs = []

        let path = ''

        params.forEach( (param) => {
            path = `${path}/${param}`
            const match = this.$router.match(path)

            if (match.name != null && match.name !== 'custom') {
                const active =path === fullPath

                crumbs.push( {
                    id   : match.name,
                    text : breadcrumbs[match.name]?.text || param.replace(/-/g, ' '),
                    to   : { path },
                    active,
                } )

                if (active)
                    state.active = match.name
            }
        } )

        state.items = crumbs
    },
}

export const actions = {
    setup ( { commit }, fullPath) {
        commit('setup', fullPath)
    },
}
