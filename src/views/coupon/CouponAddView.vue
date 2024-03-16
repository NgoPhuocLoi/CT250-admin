<script setup>
import DetailPageHeader from "@/components/common/DetailPageHeader.vue";
import CouponForm from "@/components/coupon/CouponForm.vue";
import { onMounted } from "vue";
</script>
<template>
  <DetailPageHeader :title="`Thêm mã giảm giá`" return-url="/ma-giam-gia" />
  <CouponForm :coupon="coupon" mode="add" />
</template>
