let axios

const updateUser = async ( { id, ...params }, { cancelToken } ) => {
    return await axios.patch('/users/' + id, params, { cancelToken } )
}

export default {
    updateUser,
}
