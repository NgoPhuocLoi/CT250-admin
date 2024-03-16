<script setup>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import CouponTable from "@/components/coupon/CouponTable.vue";
</script>
<template>
  <Breadcrumb page-title="Mã giảm giá" />
  <div class="flex mb-3">
    <router-link
      to="/ma-giam-gia/them"
      class="ml-auto py-2 px-4 bg-blue-500 text-white rounded-md hover:opacity-95 duration-75"
    >
      Thêm mã giảm giá
    </router-link>
  </div>
  <CouponTable />
</template>
