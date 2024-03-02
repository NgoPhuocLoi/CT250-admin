import createApiClient from "./api";

class SizeService {
  constructor(baseUrl = "/api/sizes") {
    this.api = createApiClient(baseUrl);
  }

  async getAll(data) {
    return (await this.api.get("/")).data;
  }
}

export default new SizeService();
