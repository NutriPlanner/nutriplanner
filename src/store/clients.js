import axios from "axios";
import { setupErrorHandler, errorHandler } from "../utils/ErrorHandler";
import { FULLFILLED } from "../utils/responseStatus";
import clientsErrors from "../services/clients.errors";
import clientsServices from "../services/clients.services";

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

setupErrorHandler(clientsErrors);

const allowedProperties = [
  "list",
  "update",
  "loading",
  "error",
  "totalPages",
  "totalResults",
  "page",
];

export const state = () => ({
  list: [],
  update: {},
  loading: false,
  error: null,
  totalPages: 0,
  totalResults: 0,
  page: 1,
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
  set({ commit }, data) {
    commit("set", data);
  },

  abortPreviousRequests() {
    // abort previous operations
    const cancelMemory = { oldSource: source, newSource: CancelToken.source() };
    source = cancelMemory.newSource;

    // this timeout is important to await the source is injected in the axios instance
    setTimeout(() => {
      cancelMemory.oldSource.cancel("Operation canceled by the user.");
    }, 100);
  },

  async fetch({ commit, dispatch }, params) {
    dispatch("abortPreviousRequests");
    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await clientsServices.fetchClients(params, {
        cancelToken: source.token,
      });
    }, this);

    if (status === FULLFILLED) {
      commit("set", {
        list: data.results,
        totalPages: data.totalPages,
        totalResults: data.totalResults,
        page: params.page,
      });
    }

    commit("set", { loading: false });

    return { status, data, message, error };
  },

  async create({ commit, dispatch }, params) {
    dispatch("abortPreviousRequests");
    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await clientsServices.addClient(params, {
        cancelToken: source.token,
      });
    }, this);

    if (status === FULLFILLED) {
      this._vm.$bvToast.toast("El cliente se ha registrado correctamente.", {
        title: "Registro completado",
        variant: "success",
        solid: false,
      });
    }

    commit("set", { loading: false });

    return { status, data, message, error };
  },

  async update({ commit, dispatch }, params) {
    dispatch("abortPreviousRequests");
    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await clientsServices.updateClient(params, {
        cancelToken: source.token,
      });
    }, this);

    if (status === FULLFILLED) {
      this._vm.$bvToast.toast("El cliente ha sido modificado correctamente.", {
        title: "Registro actualizado",
        variant: "success",
        solid: false,
      });
    }

    commit("set", { loading: false });

    return { status, data, message, error };
  },

  async delete({ commit, dispatch }, params) {
    dispatch("abortPreviousRequests");
    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await clientsServices.deleteClient(params, {
        cancelToken: source.token,
      });
    }, this);

    if (status === FULLFILLED) {
      this._vm.$bvToast.toast("El cliente se ha eliminado correctamente.", {
        title: "Eliminación completada",
        variant: "success",
        solid: false,
      });
    }

    commit("set", { loading: false });

    return { status, data, message, error };
  },
};
