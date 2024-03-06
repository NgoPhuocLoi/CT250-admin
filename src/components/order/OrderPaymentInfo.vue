<script setup>
import { computed } from "vue";
import PaymentStatus from "./PaymentStatus.vue";

const props = defineProps(["order"]);

const totalItems = computed(() =>
  props.order?.OrderDetail.reduce((prev, current) => prev + current.quantity, 0)
);
</script>
<template>
  <div class="p-4 border-b border-[#ccc]">
    <div class="text-black text-[20px] font-bold flex gap-4 items-center">
      <div>Thanh toán</div>
      <div>
        <PaymentStatus :payment-status="props.order?.Payment.paymentStatus" />
      </div>
    </div>

    <div class="grid grid-cols-4 gap-3 text-black mt-5">
      <div>Phương thức</div>

      <div class="col-span-2">
        {{ props.order?.Payment.paymentMethod.name }}
      </div>

      <div class="text-right"></div>
    </div>

    <div class="grid grid-cols-4 gap-3 text-black mt-2">
      <div>Tổng tiền hàng</div>

      <div class="col-span-2">{{ totalItems }} món</div>

      <div class="text-right">
        {{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.order?.totalPrice)
        }}
      </div>
    </div>

    <div class="grid grid-cols-4 gap-3 text-black mt-2">
      <div>Phí vận chuyển</div>

      <div class="col-span-2"></div>

      <div class="text-right">
        {{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.order?.shippingFee)
        }}
      </div>
    </div>

    <div class="grid grid-cols-4 gap-3 text-black mt-2">
      <div>Giảm giá</div>

      <div class="col-span-2"></div>

      <div class="text-right">
        {{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.order?.totalDiscount)
        }}
      </div>
    </div>

    <div class="grid grid-cols-4 gap-3 text-black mt-2">
      <div class="font-bold">Tổng cộng</div>

      <div class="col-span-2"></div>

      <div class="text-right font-bold">
        {{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.order?.finalPrice)
        }}
      </div>
    </div>
  </div>
</template>
