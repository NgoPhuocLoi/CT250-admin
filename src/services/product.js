import createApiClient from "./api";

class ProductService {
  constructor(baseUrl = "/api/products") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return await this.getByType("All");
  }

  async getByType(type, limit = 10) {
    return (await this.api.get("/", { params: { type, limit } })).data;
  }

  async getByCategories({ categoryIds = [], type, limit = 10 }) {
    return (await this.api.get("/", { params: { type, limit, categoryIds } }))
      .data;
  }

  async getByProductIds({ productIds = [], type = "All", limit = 10 }) {
    return (await this.api.get("/", { params: { type, limit, productIds } }))
      .data;
  }

  async getOneBySlug(slug) {
    return (await this.api.get(`/slug/${slug}`)).data;
  }
}

export default new ProductService();
