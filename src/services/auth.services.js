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

export default {
  login,
  logout,
};
