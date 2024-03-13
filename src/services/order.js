import createApiClient from "./api";

class OrderService {
  constructor() {
    this.api = createApiClient("/api/orders", { needAuth: true });
  }

  async getAll(filter) {
    return (await this.api.get("/all")).data;
  }

  async getAllPrice() {
    return (await this.api.get("/allPrice")).data;
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

  async updateOrderStatus(orderId, { fromStatus, toStatus }) {
    return (await this.api.put(`/${orderId}/status`, { fromStatus, toStatus }))
      .data;
  }
}

export default new OrderService();
