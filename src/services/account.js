import createApiClient from "./api";

class AccountService {
  constructor() {
    this.api = createApiClient("/api/accounts");
  }

  async getAllAccounts() {
    return (await this.api.get("/")).data;
  }
}

export default new AccountService();
