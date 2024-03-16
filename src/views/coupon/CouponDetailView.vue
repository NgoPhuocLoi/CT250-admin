<script setup>
import DetailPageHeader from "@/components/common/DetailPageHeader.vue";
import couponService from "@/services/coupon";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import CouponForm from "@/components/coupon/CouponForm.vue";

const route = useRoute();
const coupon = ref();

onMounted(async () => {
  await fetchCouponInformation();
});

async function fetchCouponInformation() {
  try {
    const res = await couponService.getByCode(route.params.couponCode);
    coupon.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <DetailPageHeader
    :title="`Chi tiết mã giảm giá #${route.params.couponCode}`"
    return-url="/ma-giam-gia"
  />

  <CouponForm :coupon="coupon" mode="edit" />
</template>
