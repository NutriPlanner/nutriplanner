import axios from '../utils/HttpClient'

const fetchClients = async ({ params, cancelToken }) => {
  return await axios.get('/clients', { params, cancelToken })
}

const addClient = async (data, { cancelToken }) => {
  return await axios.post('/clients', data, { cancelToken })
}

const updateClient = async ({ id, ...data }, { cancelToken }) => {
  const params = data
  delete params.tenant
  return await axios.put('/clients/' + id, params, { cancelToken })
}

const deleteClient = async (id, { cancelToken }) => {
  return await axios.delete('/clients/' + id, { cancelToken })
}

export default {
  fetchClients,
  addClient,
  updateClient,
  deleteClient
}
