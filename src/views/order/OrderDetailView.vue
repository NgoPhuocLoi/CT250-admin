<script setup>
import { useRoute } from "vue-router";
import CustomerInfo from "@/components/order/CustomerInfor.vue";
import orderService from "@/services/order";
import { onMounted, ref } from "vue";
import DetailOrderInfo from "@/components/order/DetailOrderInfo.vue";
import OrderPaymentInfo from "@/components/order/OrderPaymentInfo.vue";
import OrderActions from "@/components/order/OrderActions.vue";

const route = useRoute();
const order = ref();

onMounted(async () => {
  await fetchOrderInformation();
});

async function fetchOrderInformation() {
  try {
    const res = await orderService.getOrderById(+route.params.orderId);
    order.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div
    class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <h2 class="text-title-md2 font-semibold text-black flex gap-3 items-center">
      <RouterLink to="/don-hang" class="p-2 border rounded hover:opacity-90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </RouterLink>
      Chi tiết đơn hàng #{{ route.params.orderId }}
    </h2>
  </div>

  <div class="grid grid-cols-3 gap-5">
    <div class="col-span-2">
      <div class="bg-white border border-[#ccc] rounded">
        <DetailOrderInfo :order="order" />

        <div class="p-4 flex justify-end">
          <OrderActions
            @updated-order-status="fetchOrderInformation"
            :order="order"
          />
        </div>
      </div>

      <div class="mt-5 bg-white border border-[#ccc] rounded">
        <OrderPaymentInfo :order="order" />

        <div class="p-4 flex justify-end"></div>
      </div>
    </div>
    <div class="bg-white border border-[#ccc] rounded h-fit">
      <CustomerInfo
        :customer="order?.buyer"
        :delivery-address="order?.deliveryAddress"
      />
    </div>
  </div>
</template>
