import createApiClient from "./api";

class CategoryService {
  constructor(baseUrl = "/api/categories") {
    this.api = createApiClient(baseUrl);
  }

  async getAll(data) {
    return (await this.api.get("/")).data;
  }
}

export default new CategoryService();
