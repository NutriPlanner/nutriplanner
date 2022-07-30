import axios from "axios";
import { setupErrorHandler, errorHandler } from "../utils/ErrorHandler";
import { FULLFILLED } from "../utils/responseStatus";
import trackingErrors from "../services/tracking.errors";
import trackingServices from "../services/tracking.services";

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

setupErrorHandler(trackingErrors);

export const state = () => ({
  list: [],
  update: {},
  loading: false,
  error: null,
  totalPages: 0,
  totalResults: 0,
  page: 1,
  selectedClientId: null,
});

export const mutations = {
  set(state, data) {
    for (const key in data) {
      state[key] = data[key];
    }
  },
};

export const actions = {
  set({ commit }, data) {
    commit("set", data);
  },

  setClientId({ dispatch }, id) {
    dispatch("set", { selectedClientId: id });
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

  async fetch({ state, commit, dispatch }, params) {
    dispatch("abortPreviousRequests");

    if (state.selectedClientId) {
      commit("set", { loading: true });

      const filter = JSON.parse(params.filter);
      const paramsWithClientId = {
        ...params,
        filter: JSON.stringify({ ...filter, client: state.selectedClientId }),
      };

      const { status, data, message, error } = await errorHandler(async () => {
        return await trackingServices.fetchTrackings(paramsWithClientId, {
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
    }

    return {};
  },

  async create({ commit, dispatch }, params) {
    dispatch("abortPreviousRequests");
    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await trackingServices.addTracking(params, {
        cancelToken: source.token,
      });
    }, this);

    if (status === FULLFILLED) {
      this._vm.$bvToast.toast(
        "El seguimiento se ha registrado correctamente.",
        {
          title: "Registro completado",
          variant: "success",
          solid: false,
        }
      );
    }

    commit("set", { loading: false });

    return { status, data, message, error };
  },

  async update({ commit, dispatch }, params) {
    dispatch("abortPreviousRequests");
    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await trackingServices.updateTracking(params, {
        cancelToken: source.token,
      });
    }, this);

    if (status === FULLFILLED) {
      this._vm.$bvToast.toast(
        "El seguimiento ha sido modificado correctamente.",
        {
          title: "Registro actualizado",
          variant: "success",
          solid: false,
        }
      );
    }

    commit("set", { loading: false });

    return { status, data, message, error };
  },

  async delete({ commit, dispatch }, params) {
    dispatch("abortPreviousRequests");
    commit("set", { loading: true });

    const { status, data, message, error } = await errorHandler(async () => {
      return await trackingServices.deleteTracking(params, {
        cancelToken: source.token,
      });
    }, this);

    if (status === FULLFILLED) {
      this._vm.$bvToast.toast("El seguimiento se ha eliminado correctamente.", {
        title: "Eliminación completada",
        variant: "success",
        solid: false,
      });
    }

    commit("set", { loading: false });

    return { status, data, message, error };
  },
};
