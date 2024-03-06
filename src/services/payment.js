import createApiClient from "./api";

class PaymentService {
  constructor() {
    this.api = createApiClient("/api/payments");
  }

  async getAllPaymentStatuses() {
    return (await this.api.get("/statuses")).data;
  }
}

export default new PaymentService();
