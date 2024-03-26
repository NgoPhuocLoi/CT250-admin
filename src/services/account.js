import createApiClient from "./api";

class AccountService {
  constructor() {
    this.api = createApiClient("/api/accounts", { needAuth: true });
  }

  async getAllAccounts() {
    return (await this.api.get("/")).data;
  }

  async updateInfo(updatedInfo) {
    return (await this.api.put("", updatedInfo)).data;
  }
}

export default new AccountService();
