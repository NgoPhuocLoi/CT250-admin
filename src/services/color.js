import createApiClient from "./api";

class ColorService {
  constructor(baseUrl = "/api/colors") {
    this.api = createApiClient(baseUrl);
  }

  // async getAll(data) {
  //   return (await this.api.get("/")).data;
  // }

  async create(data) {
    return (await this.api.post("/", data)).data; // name, productId, thumbnailImageId, productImageId
  }
}

export default new ColorService();
