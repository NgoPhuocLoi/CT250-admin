<script setup>
import { ORDER_STATUS_ID_MAPPING } from "../constant/orderStatus";

const props = defineProps(["orderStatus"]);
</script>
<template>
  <div
    class="flex items-center gap-[10px] mx-auto py-1 px-2 rounded-full"
    :class="{
      'bg-orange-300':
        props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.AWAITING_CONFIRM,
      'bg-orange-200':
        props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.AWAITING_FULFILLMENT,
      'bg-green-200':
        props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.DELIVERING,
      'bg-green-300':
        props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.DELIVERED,
      'bg-red-300': props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.CANCELED,
    }"
  >
    <div
      class="w-[12px] h-[12px] border-[3px] bg-transparent rounded-full"
      :class="{
        'border-orange-400':
          props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.AWAITING_CONFIRM,
        'border-orange-500':
          props.orderStatus?.id ===
          ORDER_STATUS_ID_MAPPING.AWAITING_FULFILLMENT,
        'border-green-500':
          props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.DELIVERING,
        'border-green-500':
          props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.DELIVERED,
        'border-red-500':
          props.orderStatus?.id === ORDER_STATUS_ID_MAPPING.CANCELED,
      }"
    ></div>
    <p class="text-sm font-medium text-black">
      {{ props.orderStatus?.name }}
    </p>
  </div>
</template>
