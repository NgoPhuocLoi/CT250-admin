import createApiClient from "./api";

class VariantService {
  constructor() {
    this.api = createApiClient("/api/variants");
  }

  async getByVariantIds(variantIds = []) {
    return (
      await this.api.get(`/`, {
        params: {
          variantIds,
        },
      })
    ).data;
  }
}

export default new VariantService();
