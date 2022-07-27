import { setupClient } from "../utils/HttpClient";

export default ({ app }) => {
  setupClient(app.$axios);
};
