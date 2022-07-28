import Routes from "../config/routes";

export const state = () => ({
  items: [],
});

export const getters = {
  items: (state) => state.items,
};

export const mutations = {
  setup(state) {
    const fullPath = this.$router.currentRoute.fullPath;
    const params = fullPath.substring(1).split("/");
    const crumbs = [];

    let path = "";

    params.forEach((param, index) => {
      path = `${path}/${param}`;
      const match = this.$router.match(path);

      if (match.name !== null) {
        crumbs.push({
          id: match.name,
          text: Routes[match.name]?.text || param.replace(/-/g, " "),
          to: { path },
          active: path === fullPath,
        });
      }
    });

    state.items = crumbs;
  },
};

export const actions = {
  setup({ commit }) {
    commit("setup");
  },
};