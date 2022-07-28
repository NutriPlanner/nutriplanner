import axios from "../utils/HttpClient";

const login = async function ({ params }) {
  return await this.$auth.login({ data: params });
};

const logout = async function () {
  return await this.$auth.logout({
    data: {
      refreshToken: this.$auth.strategies.local.refreshToken.get(),
    },
  });
};

const requestChangePassword = async function ({ params }) {
  return await axios.post("/auth/forgot-password", params);
};

const changePassword = async function ({ params }) {
  return await axios.post("/auth/reset-password", params);
};

export default {
  login,
  logout,
  requestChangePassword,
  changePassword,
};
