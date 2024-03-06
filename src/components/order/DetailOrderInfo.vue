<script setup>
import { ORDER_STATUS_ID_MAPPING } from "../constant/orderStatus";
import OrderStatus from "./OrderStatus.vue";

const props = defineProps(["order"]);
</script>
<template>
  <div class="p-4 border-b border-[#ccc]">
    <div class="text-black text-[20px] font-bold flex gap-4 items-center">
      <div>Đơn hàng</div>
      <div>
        <OrderStatus :order-status="props.order?.currentStatus" />
      </div>
    </div>

    <div
      v-for="item of props.order?.OrderDetail"
      :key="item.id"
      class="grid grid-cols-6 gap-3 h-[100px] mt-8"
    >
      <div class="flex items-start justify-center relative">
        <img
          class="w-[100px] h-[100px] rounded border object-cover"
          :src="item.variant.color.productImage.image.path"
          alt=""
        />

        <div
          class="w-[30px] h-[30px] rounded-full absolute top-[-10px] right-0 flex items-center justify-center text-sm text-black-2 bg-[#ccc]"
        >
          {{ item.quantity }}
        </div>
      </div>

      <div class="col-span-3 flex flex-col gap-2">
        <div
          :title="item.variant.product.name"
          class="text-black font-bold text-lg truncate"
        >
          {{ item.variant.product.name }}
        </div>

        <div class="flex">
          <span class="text-black block min-w-[70px]">Màu: </span>
          <p>{{ item.variant.color.name }}</p>
        </div>
        <div class="flex">
          <span class="text-black block min-w-[70px]">Kích cỡ: </span>
          <p>{{ item.variant.size.name }}</p>
        </div>
      </div>

      <div class="text-black flex items-center gap-1 justify-start">
        <span>{{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(+item.price)
        }}</span>
        x <span>{{ item.quantity }}</span>
      </div>

      <div class="flex items-center text-black justify-end">
        <span>{{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(+item.price * item.quantity)
        }}</span>
      </div>
    </div>
  </div>
</template>
