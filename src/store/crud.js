import _ from 'lodash'

export const subState = {
  GET: {
    loading: false,
    url: null,
    data: []
  },

  POST: {
    loading: false,
    url: null,
    data: null
  },

  PUT: {
    loading: false,
    url: null,
    data: null
  },

  DELETE: {
    loading: false,
    url: null,
    data: null
  }
}

export const state = () => ({
  subscribers: {}
})

export const getters = {
  get: state => (_id, path) => {
    return _.get(state.subscribers[_id], path)
  }
}

export const mutations = {
  reset (state) {
    state.subscribers = {}
  },

  setup (state, { _id, ...data }) {
    state.subscribers[_id] = _.merge(subState, { ...data })
  },

  set (state, { _id, data }) {
    const stateClone = _.cloneDeep(state.subscribers)
    state.subscribers = _.merge(stateClone, { ...state.subscribers, [_id]: { ...data } })
  }
}

export const actions = {
  setup ({ commit }, data) {
    commit('setup', data)
  },

  call ({ state, commit, ...ctx }, { _id, method, data }) {
    try {
      switch (method) {
        case 'POST_REDIRECT': {
          commit('set', { _id, data: { POST: { data: (data || null) } } })

          const fullPath = this.$router.currentRoute.fullPath + '/post'
          this.$router.push(fullPath)

          break
        }

        case 'PUT_REDIRECT': {
          commit('set', { _id, data: { PUT: { data: (data || null) } } })

          const fullPath = this.$router.currentRoute.fullPath + '/put'
          this.$router.push(fullPath)

          break
        }
      }
    } catch (error) {
      this._vm.$bvToast.toast('Ha ocurrido un error no controlado, contacte a soporte para más información.', {
        title: 'Error!',
        variant: 'danger',
        solid: false
      })
    }
  }
}
