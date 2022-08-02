import Routes from '../config/routes'

export const state = () => ( {
    items: [],
} )

export const getters = {
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
                crumbs.push( {
                    id     : match.name,
                    text   : Routes[match.name]?.text || param.replace(/-/g, ' '),
                    to     : { path },
                    active : path === fullPath,
                } )
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
