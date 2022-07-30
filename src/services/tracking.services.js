import axios from "../utils/HttpClient";

const fetchTrackings = async (params, { cancelToken }) => {
  return await axios.get("/tracking", { params, cancelToken });
};

const addTracking = async (data, { cancelToken }) => {
  return await axios.post("/tracking", data, { cancelToken });
};

const updateTracking = async ({ id, ...data }, { cancelToken }) => {
  const params = data;
  delete params.tenant;
  return await axios.put("/tracking/" + id, params, { cancelToken });
};

const deleteTracking = async (id, { cancelToken }) => {
  return await axios.delete("/tracking/" + id, { cancelToken });
};

export default {
  fetchTrackings,
  addTracking,
  updateTracking,
  deleteTracking,
};
