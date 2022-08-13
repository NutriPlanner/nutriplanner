import _ from 'lodash'

export const set = (state, newState) => {
    for (const key in newState)
        _.set(state, key, newState[key] )
}

export default {
    set,
}
