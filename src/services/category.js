import createApiClient from "./api";

class CategoryService {
  constructor(baseUrl = "/api/categories") {
    this.api = createApiClient(baseUrl);
  }

  async getAll(data) {
    return (await this.api.get("/")).data;
  }

  async getOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async getRootParent(id) {
    return (await this.api.get(`/parent/${id}`)).data;
  }

}

export default new CategoryService();
