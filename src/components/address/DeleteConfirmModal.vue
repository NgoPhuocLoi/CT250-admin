<script setup>
import { Modal, Ripple, initTWE } from "tw-elements";
import { onMounted, ref } from "vue";
import addressService from "@/services/address";
import { useAddressStore } from "@/stores";

const addressStore = useAddressStore();
const modal = ref();
const emits = defineEmits(["addressChanged"]);

onMounted(() => {
  initTWE({ Modal, Ripple });

  modal.value = new Modal(document.getElementById("deleteAddressConfirmModal"));
});

async function handleDeleteAddress() {
  try {
    await addressService.delete(addressStore.addressIdToDelete);
    modal.value.hide();
    emits("addressChanged");
  } catch (error) {}
}
</script>
<template>
  <!-- Modal -->
  <div
    data-twe-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="deleteAddressConfirmModal"
    tabindex="-1"
    aria-labelledby="deleteAddressConfirmModalLabel"
    aria-hidden="true"
  >
    <div
      data-twe-modal-dialog-ref
      class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
    >
      <div
        class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none"
      >
        <div
          class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4"
        >
          <!--Modal title-->
          <h5
            class="text-xl font-medium leading-normal mx-auto text-neutral-800"
            id="deleteAddressConfirmModalLabel"
          >
            Xóa địa chỉ
          </h5>
          <!--Close button-->
          <button
            type="button"
            class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-twe-modal-dismiss
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!--Modal body-->
        <div class="relative flex-auto p-4 text-center" data-twe-modal-body-ref>
          Bạn có muốn xóa địa chỉ?
        </div>

        <!--Modal footer-->
        <div class="flex justify-center gap-6 p-4">
          <button
            type="button"
            class="px-8 py-2 border border-gray-800 rounded"
            data-twe-modal-dismiss
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            Hủy
          </button>
          <button
            type="button"
            class="btn-basic px-8 py-2 bg-red-600"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            @click="handleDeleteAddress"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
