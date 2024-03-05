import createApiClient from "./api";

class ColorService {
  constructor(baseUrl = "/api/colors") {
    this.api = createApiClient(baseUrl);
  }

  // async getAll(data) {
  //   return (await this.api.get("/")).data;
  // }
}

export default new ColorService();
