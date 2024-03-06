<script setup>
import { onMounted, ref } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import OrderTable from "@/components/order/OrderTable.vue";
import orderService from "@/services/order";

const orders = ref([]);

onMounted(async () => {
  await fetchOrders();
});

async function fetchOrders(filter) {
  try {
    const res = await orderService.getAll(filter);
    orders.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <Breadcrumb page-title="Đơn hàng" />

  <OrderTable :orders="orders" />
</template>
