import createApiClient from "./api";

class OrderService {
  constructor() {
    this.api = createApiClient("/api/orders", { needAuth: true });
  }

  async getAll(filter) {
    return (await this.api.get("/")).data;
  }

  async getAllOrderStatus() {
    return (await this.api.get("/status-all")).data;
  }

  async getOrdersByStatus(orderStatusId) {
    return (await this.api.get("/?orderStatusId=" + orderStatusId)).data;
  }

  async getOrderById(orderId) {
    return (await this.api.get("/" + orderId)).data;
  }
}

export default new OrderService();
