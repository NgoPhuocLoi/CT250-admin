<script setup>
const props = defineProps(["customer", "deliveryAddress"]);
</script>
<template>
  <div class="p-4 border-b border-[#ccc]">
    <div class="text-black text-[20px] font-bold">Khách hàng</div>
    <div class="pt-4">
      <div class="flex">
        <span class="w-[110px] block text-black">Tên: </span>
        <p>{{ props.customer?.fullName }}</p>
      </div>
      <div class="flex">
        <span class="w-[110px] block text-black">Email:</span>
        <p>{{ props.customer?.email }}</p>
      </div>
    </div>
  </div>

  <div class="p-4 border-b border-[#ccc]">
    <div class="text-black text-lg font-bold">Thông tin liên hệ</div>
    <div class="pt-4">
      <div class="flex">
        <span class="w-[110px] block text-black">Điện thoại: </span>
        <p>{{ props.customer?.phone }}</p>
      </div>
    </div>
  </div>

  <div class="p-4 border-b border-[#ccc]">
    <div class="text-black text-lg font-bold">Địa chỉ giao hàng</div>
    <div class="pt-4">
      <div class="flex">
        <span class="w-[110px] block text-black">Người nhận: </span>
        <p>{{ props.deliveryAddress?.contactName }}</p>
      </div>

      <div class="flex">
        <span class="w-[110px] block text-black">Điện thoại: </span>
        <p>{{ props.deliveryAddress?.contactPhone }}</p>
      </div>

      <div class="flex">
        <span class="min-w-[110px] block text-black">Địa chỉ: </span>
        <p class="text-wrap">
          {{ props.deliveryAddress?.detailAddress }}
          <span v-if="props.deliveryAddress?.detailAddress">,</span>
          {{ props.deliveryAddress?.wardName }},
          {{ props.deliveryAddress?.districtName }},
          {{ props.deliveryAddress?.provinceName }}
        </p>
      </div>
    </div>
  </div>
</template>
