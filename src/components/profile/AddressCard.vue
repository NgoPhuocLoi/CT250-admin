<template>
  <div class="border-[0.5px] border-gray-300 lg:p-5 p-1 lg:m-5 mt-7 rounded-sm">
    <div class="flex items-center justify-between p-2 rounded-sm">
      <div class="flex items-center">
        <p class="text-[16px] lg:text-2xl mr-4">
          {{ props.address.contactName }}
        </p>
        <div
          v-if="props.address.isDefault"
          class="flex text-sm justify-center items-center px-4 py-2 h-10 bg-orange-200 text-orange-600 rounded-full"
        >
          Mặc định
        </div>
      </div>
      <div class="flex cursor-pointer gap-3">
        <EditIcon
          data-twe-toggle="modal"
          data-twe-target="#addAddressModal"
          @click="() => updateAddress(props.address)"
        />
        <DeleteIcon
          data-twe-toggle="modal"
          data-twe-target="#deleteAddressConfirmModal"
          @click="addressStore.setAddressIdToDelete(props.address.id)"
        />
      </div>
    </div>
    <div class="flex flex-col p-2 rounded-[3px] text-[15px] lg:text-lg">
      <div class="flex flex-col gap-1 lg:gap-4">
        <p class="flex items-start gap-3">
          <label class="min-w-[90px] lg:w-[100px]">Địa chỉ:</label>
          <span
            >{{ props.address.detailAddress }}, {{ props.address.wardName }},
            {{ props.address.districtName }},
            {{ props.address.provinceName }}</span
          >
        </p>
        <p class="flex items-start gap-3">
          <label class="lg:w-[100px] w-[90px]">Điện thoại:</label>
          <span>{{ props.address.contactPhone }}</span>
        </p>
      </div>
      <div class="flex justify-end">
        <button
          v-if="!props.address.isDefault"
          class="mt-3 p-[8px] text-center py-1 lg:py-3 rounded border border-slate-900 hover:opacity-85 focus:outline-none text-[15px] lg:text-lg"
          @click="() => setDefaultAddress(props.address.id)"
        >
          Đặt làm mặc định
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAddressStore } from "@/stores";
import { EditIcon, DeleteIcon } from "../icons";
import addressService from "@/services/address";

const props = defineProps(["address"]);
const emits = defineEmits(["addressChanged"]);

const addressStore = useAddressStore();

async function setDefaultAddress(addressId) {
  try {
    await addressService.setDefault(addressId);
    emits("addressChanged");
  } catch (error) {
    console.log(error);
  }
}

function updateAddress(address) {
  addressStore.setIsUpdatingAddress(true);
  addressStore.setAddressToUpdate(address);
}
</script>

<style></style>
