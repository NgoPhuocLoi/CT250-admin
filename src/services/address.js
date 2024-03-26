import createApiClient from "./api";

class AddressService {
  constructor(baseUrl = "/api/addresses") {
    this.api = createApiClient(baseUrl, { needAuth: true });
  }

  async getProvinces() {
    return (await this.api.get("/provinces")).data;
  }

  async getDistricts(provinceId) {
    return (await this.api.get("/districts?provinceId=" + provinceId)).data;
  }

  async getWards(districtId) {
    return (await this.api.get("/wards?districtId=" + districtId)).data;
  }

  async addAddress(userAddress) {
    return (await this.api.post("/", userAddress)).data;
  }

  async getAddressesOfCurrentUser() {
    return (await this.api.get("/current-account")).data;
  }

  async setDefault(addressId) {
    return (await this.api.put("/" + addressId, { isDefault: true })).data;
  }

  async update(addressId, updatedAddress) {
    return (await this.api.put("/" + addressId, updatedAddress)).data;
  }

  async delete(addressId) {
    return (await this.api.delete("/" + addressId)).data;
  }
}

export default new AddressService();
