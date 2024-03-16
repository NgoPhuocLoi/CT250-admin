<script setup>
import { useRoute } from "vue-router";
import CustomerInfo from "@/components/order/CustomerInfor.vue";
import orderService from "@/services/order";
import { onMounted, ref } from "vue";
import DetailOrderInfo from "@/components/order/DetailOrderInfo.vue";
import OrderPaymentInfo from "@/components/order/OrderPaymentInfo.vue";
import OrderActions from "@/components/order/OrderActions.vue";
import DetailPageHeader from "@/components/common/DetailPageHeader.vue";

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
  <DetailPageHeader
    :title="`Chi tiết đơn hàng #${route.params.orderId}`"
    return-url="/don-hang"
  />

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
