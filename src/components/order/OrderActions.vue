<script setup>
import { ORDER_STATUS_ID_MAPPING } from "../constant/orderStatus";
import orderService from "@/services/order";

const props = defineProps(["order"]);
const emits = defineEmits(["updatedOrderStatus"]);

const popupInfoMapping = {
  1: {
    text: "Bạn muốn xác nhận đơn hàng này không?",
    icon: "info",
    buttonText: "Xác nhận đơn hàng",
  },
  2: {
    text: "Bạn muốn xác nhận đã giao cho vận chuyển đơn hàng này không?",
    icon: "success",
    buttonText: "Giao hàng cho vận chuyển",
  },
  3: {
    text: "Bạn muốn xác nhận đơn hàng đã giao thành công?",
    icon: "success",
    buttonText: "Xác nhận đã giao",
  },
};

function handleClickActionButton() {
  Swal.fire({
    ...popupInfoMapping[props.order?.currentStatusId],
    title: "Xác nhận",
    confirmButtonColor: "#3085d6",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Dừng",
  }).then(async ({ isConfirmed }) => {
    if (isConfirmed) {
      await handleUpdateOrderStatus(props.order.id, {
        fromStatus: props.order.currentStatusId,
        toStatus: props.order.currentStatusId + 1,
      });
    }
  });
}

async function handleUpdateOrderStatus(orderId, { fromStatus, toStatus }) {
  try {
    const res = await orderService.updateOrderStatus(orderId, {
      fromStatus,
      toStatus,
    });

    Swal.fire({
      title: "Thành công",
      text: "Đơn hàng đã được cập nhật trạng thái thành công",
      icon: "success",
    }).then(() => {
      emits("updatedOrderStatus");
    });
  } catch (error) {
    console.log(error);

    Swal.fire({
      title: "Thất bại",
      text: "Đã xảy ra lỗi. Vui lòng thử lại sau!",
      icon: "error",
    });
  }
}
</script>
<template>
  <button
    v-if="
      props.order?.currentStatusId >=
        ORDER_STATUS_ID_MAPPING.AWAITING_CONFIRM &&
      props.order?.currentStatusId <= ORDER_STATUS_ID_MAPPING.DELIVERING
    "
    @click="handleClickActionButton"
    :class="`px-4 py-2 ${
      props.order?.currentStatusId === ORDER_STATUS_ID_MAPPING.DELIVERING
        ? 'bg-green-500'
        : 'bg-blue-500'
    } hover:opacity-90 text-white rounded`"
  >
    {{ popupInfoMapping[props.order?.currentStatusId]?.buttonText }}
  </button>
</template>
