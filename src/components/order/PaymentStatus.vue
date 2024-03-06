<script setup>
import { PAYMENT_STATUS_ID_MAPPING } from "../constant/paymentStatus";

const props = defineProps(["paymentStatus"]);
</script>
<template>
  <div
    class="flex items-center gap-[10px] mx-auto py-1 px-2 rounded-full"
    :class="{
      'bg-orange-300':
        props.paymentStatus?.id === PAYMENT_STATUS_ID_MAPPING.PENDING,
      'bg-green-300':
        props.paymentStatus?.id === PAYMENT_STATUS_ID_MAPPING.SUCCESS,
      'bg-red-400':
        props.paymentStatus?.id === PAYMENT_STATUS_ID_MAPPING.FAILED,
    }"
  >
    <div
      class="w-[12px] h-[12px] border-[3px] bg-transparent rounded-full"
      :class="{
        'border-orange-500':
          props.paymentStatus?.id === PAYMENT_STATUS_ID_MAPPING.PENDING,
        'border-green-500':
          props.paymentStatus?.id === PAYMENT_STATUS_ID_MAPPING.SUCCESS,
        'border-red-500':
          props.paymentStatus?.id === PAYMENT_STATUS_ID_MAPPING.FAILED,
      }"
    ></div>
    <p class="text-sm font-medium text-black">
      {{ props.paymentStatus?.name }}
    </p>
  </div>
</template>
