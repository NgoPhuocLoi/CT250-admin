import createApiClient from "./api";

class UploadService {
  constructor(baseUrl = "/api/upload") {
    this.api = createApiClient(baseUrl);
  }

  async uploadImage(data) {
    return (await this.api.post("/image", data)).data;
  }
}

export default new UploadService();
