let axios

const fetchTrackings = async (params, { cancelToken } ) => {
    return await axios.get('/trackings', { params, cancelToken } )
}

const addTracking = async (data, { cancelToken } ) => {
    return await axios.post('/trackings', data, { cancelToken } )
}

const updateTracking = async ( { id, ...data }, { cancelToken } ) => {
    return await axios.put('/trackings/' + id, data, { cancelToken } )
}

const deleteTracking = async (id, { cancelToken } ) => {
    return await axios.delete('/trackings/' + id, { cancelToken } )
}

export default {
    fetchTrackings,
    addTracking,
    updateTracking,
    deleteTracking,
}
