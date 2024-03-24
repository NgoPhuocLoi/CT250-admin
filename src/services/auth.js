import createApiClient from "./api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

class AuthService {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }

  async login(data) {
    return (await this.api.post("/adminLogin", data)).data;
  }

  async loginWithGoogle(data) {
    return (await this.api.post("/adminLoginWithGoogle", data)).data;
  }

  async getLoggedInAccount(token) {
    return (
      await this.api.request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        url: BASE_URL + "/api/auth/logged-in-account",
      })
    ).data;
  }
}

export default new AuthService();
