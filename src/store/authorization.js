import { getBindedServices } from "../utils/AutoBindServices";
import { setupErrorHandler, errorHandler } from "../utils/ErrorHandler";
import authErrors from "../services/auth.errors";
import authServices from "../services/auth.services";

setupErrorHandler(authErrors);

const allowedProperties = ["loading"];

export const state = () => ({
  loading: false,
});

export const mutations = {
  set(state, data) {
    for (const key in data) {
      if (allowedProperties.includes(key)) {
        state[key] = data[key];
      } else {
        console.warn(`${key} is not allowed in clients.set`);
      }
    }
  },
};

export const actions = {
  async login({ commit }, { params }) {
    const authBindedServices = getBindedServices(authServices, this);

    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await authBindedServices.login({ params });
    }, this);

    commit("set", { loading: false });

    return { status, data, message, error };
  },

  async logout({ commit }) {
    const authBindedServices = getBindedServices(authServices, this);

    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await authBindedServices.logout();
    }, this);

    commit("set", { loading: false });

    return { status, data, message, error };
  },
};
