import createApiClient from "./api";

class UploadService {
  constructor() {
    this.api = createApiClient("/api/upload");
  }

  async uploadImage(formData) {
    return (await this.api.post("/image", formData)).data;
  }

  async uploadImages(formData) {
    return (await this.api.post("/images", formData)).data;
  }

  async destroyImage(uploadedImageId) {
    return (await this.api.delete("/" + uploadedImageId)).data;
  }
}

export default new UploadService();
