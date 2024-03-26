<template>
  <div class="flex justify-end pr-5">
    <button
      type="button"
      class="p-[8px] btn-basic focus:outline-none text-[15px] lg:text-lg"
      data-twe-toggle="modal"
      data-twe-target="#addAddressModal"
    >
      Thêm địa chỉ mới
    </button>

    <AddAddressModal @address-changed="fetchAddressList" />
  </div>
  <div class="lg:mt-6">
    <div v-for="address of addresses" :key="address.id">
      <AddressCard @address-changed="fetchAddressList" :address="address" />
    </div>
  </div>

  <DeleteConfirmModal @address-changed="fetchAddressList" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import AddressCard from "./AddressCard.vue";
import addressService from "@/services/address";
import DeleteConfirmModal from "../address/DeleteConfirmModal.vue";
import AddAddressModal from "@/components/address/AddAddressModal.vue";

const addresses = ref([]);

onMounted(async () => {
  await fetchAddressList();
});

async function fetchAddressList() {
  try {
    const res = await addressService.getAddressesOfCurrentUser();
    addresses.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}
</script>
