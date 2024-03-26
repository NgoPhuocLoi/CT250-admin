<script setup>
import { onMounted, ref, toDisplayString, watch } from "vue";
// import { Modal, Ripple, initTWE, Select } from "tw-elements";
import { Modal, Ripple, initTWE } from "tw-elements";
import EmptyBoxIcon from "@/components/icons/EmptyBoxIcon.vue";
import TickIcon from "@/components/icons/TickIcon.vue";
import addressService from "@/services/address";
import { useAddressStore } from "@/stores";

const emits = defineEmits(["addressChanged"]);
const addressStore = useAddressStore();

const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);
const modal = ref();

watch(
  () => addressStore.addressToUpdate,
  async () => {
    console.log("TRIGGER");
    if (addressStore.isUpdatingAddress) {
      await Promise.all([
        getDistrictsOfProvince(addressStore.addressToUpdate.provinceId),
        getWardsOfDistrict(addressStore.addressToUpdate.districtId),
      ]);
      userAddress.value = addressStore.addressToUpdate;
    }
  }
);

const userAddress = ref({
  provinceId: 0,
  districtId: 0,
  wardCode: 0,
  detailAddress: "",
  contactName: "",
  contactPhone: "",
  isDefault: false,
});

onMounted(async () => {
  // initTWE({ Modal, Ripple, Select });
  initTWE({ Modal, Ripple });

  const modalElement = document.getElementById("addAddressModal");

  modal.value = new Modal(modalElement);

  modalElement.addEventListener("hidden.twe.modal", (e) => {
    resetModal();
    addressStore.setIsUpdatingAddress(false);
    addressStore.setAddressToUpdate(null);
    console.log("RESET");
  });

  await getProvinces();
});

async function onProvinceChange(e) {
  userAddress.value.districtId = 0;
  userAddress.value.wardCode = 0;
  await getDistrictsOfProvince(e.target.value);
}

async function onDistrictChange(e) {
  userAddress.value.wardCode = 0;
  await getWardsOfDistrict(e.target.value);
}

function resetModal() {
  userAddress.value = {
    provinceId: 0,
    districtId: 0,
    wardCode: 0,
    detailAddress: "",
    contactName: "",
    contactPhone: "",
    isDefault: false,
  };
}

async function handleAddNewAddress() {
  try {
    await addressService.addAddress(userAddress.value);
    modal.value.hide();
    emits("addressChanged");
    Toast.fire({
      icon: "success",
      title: "Địa chỉ mới đã được thêm",
    });
    resetModal();
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateAddress() {
  try {
    await addressService.update(
      addressStore.addressToUpdate.id,
      userAddress.value
    );
    modal.value.hide();
    emits("addressChanged");
    Toast.fire({
      icon: "success",
      title: "Địa chỉ đã được cập nhật",
    });
    resetModal();
  } catch (error) {
    console.log(error);
  }
}

async function getProvinces() {
  try {
    const res = await addressService.getProvinces();
    provinces.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}

async function getDistrictsOfProvince(provinceId) {
  try {
    const res = await addressService.getDistricts(provinceId);
    districts.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}

async function getWardsOfDistrict(districtId) {
  try {
    const res = await addressService.getWards(districtId);
    wards.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <!-- Modal -->
  <div data-twe-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="addAddressModal" tabindex="-1" aria-labelledby="addAddressModalLabel" aria-hidden="true">
    <div data-twe-modal-dialog-ref
      class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[830px]">
      <div
        class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
        <div
          class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4">
          <!--Modal title-->
          <h5 class="text-xl font-medium leading-normal text-neutral-800 text-center w-full" id="addAddressModalLabel">
            {{
              addressStore.isUpdatingAddress
                ? "Cập nhật địa chỉ"
                : "Thêm địa chỉ mới"
            }}
          </h5>
          <!--Close button-->
          <button type="button"
            class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-twe-modal-dismiss aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!--Modal body-->
        <div class="relative grid grid-cols-3 gap-4 gap-y-3 md:gap-y-6 p-4 text-[15px] md:text-lg"
          data-twe-modal-body-ref>
          <div class="col-span-full lg:col-span-2">
            <label class="block">Họ và tên</label>
            <input type="text"
              class="w-full h-[40px] md:h-[55px] border mt-2 p-1 md:p-3 text-md text-gray-600 border-gray-400 rounded"
              placeholder="Nhập họ và tên..." v-model="userAddress.contactName" />
          </div>

          <div class="col-span-full lg:col-span-1">
            <label class="block">Số điện thoại</label>
            <input type="text"
              class="w-full h-[40px] md:h-[55px] border mt-2 p-1 md:p-3 text-md text-gray-600 border-gray-400 rounded"
              placeholder="Nhập số điện thoại..." v-model="userAddress.contactPhone" />
          </div>

          <div class="col-span-full lg:col-span-1">
            <label class="block">Tỉnh/ Thành phố</label>

            <select
              class="w-full h-[40px] md:h-[55px] border mt-2 p-1 md:p-3 text-md text-gray-600 bg-white border-gray-400 rounded"
              @change="onProvinceChange" v-model="userAddress.provinceId">
              <option selected disabled value="0">Chọn tỉnh thành</option>
              <option v-for="province of provinces" :value="province.ProvinceID" :key="province.ProvinceID">
                {{ province.ProvinceName }}
              </option>
            </select>
          </div>

          <div class="col-span-full lg:col-span-1">
            <label class="block">Quận/ Huyện</label>

            <select
              class="w-full h-[40px] md:h-[55px] border mt-2 p-1 md:p-3 text-md text-gray-600 bg-white border-gray-400 rounded"
              v-model="userAddress.districtId" @change="onDistrictChange">
              <option selected disabled value="0">Chọn Quận/ Huyện</option>
              <option v-for="district of districts" :key="district.DistrictID" :value="district.DistrictID">
                {{ district.DistrictName }}
              </option>
            </select>
          </div>

          <div class="col-span-full lg:col-span-1">
            <label class="block">Khu vực</label>

            <select
              class="w-full h-[40px] md:h-[55px] border mt-2 p-1 md:p-3 text-md text-gray-600 bg-white border-gray-400 rounded"
              v-model="userAddress.wardCode">
              <option selected disabled value="0">Chọn khu vực</option>
              <option v-for="ward of wards" :key="ward.WardCode" :value="ward.WardCode">
                {{ ward.WardName }}
              </option>
            </select>
          </div>

          <div class="col-span-full lg:col-span-3">
            <label class="block">Địa chỉ cụ thể</label>
            <input type="text"
              class="w-full h-[40px] md:h-[55px] border mt-2 p-1 md:p-3 text-md text-gray-600 border-gray-400 rounded"
              placeholder="Nhập địa chỉ cụ thể..." v-model="userAddress.detailAddress" />
          </div>

          <div class="flex gap-2 items-center col-span-full">
            <div @click="userAddress.isDefault = !userAddress.isDefault">
              <TickIcon v-if="userAddress.isDefault" />
              <EmptyBoxIcon v-else />
            </div>
            <label class="">Đặt làm mặc định</label>
          </div>
        </div>

        <!--Modal footer-->
        <div
          class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-neutral-100 border-opacity-100 p-4">
          <button @click="
              addressStore.isUpdatingAddress
                ? handleUpdateAddress()
                : handleAddNewAddress()
              " class="btn-basic px-8 py-2 mx-auto text-[15px] md:text-lg">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
