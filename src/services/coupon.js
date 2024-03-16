import createApiClient from "./api";

class CouponService {
  constructor() {
    this.api = createApiClient("/api/coupons", { needAuth: true });
  }

  async getAllCoupons() {
    return (await this.api.get("/")).data;
  }

  async getByCode(code) {
    return (await this.api.get(`/${code}`)).data;
  }

  async createCoupon(coupon) {
    return (await this.api.post("/", coupon)).data;
  }

  async updateCoupon(couponId, updatedData) {
    return (await this.api.put(`/${couponId}`, updatedData)).data;
  }
}

export default new CouponService();
