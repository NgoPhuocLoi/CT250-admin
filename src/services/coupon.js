import createApiClient from "./api";

class CouponService {
  constructor() {
    this.api = createApiClient("/api/coupons", { needAuth: true });
  }

  async getAllCoupons() {
    return (await this.api.get("/")).data;
  }
}

export default new CouponService();
