<script setup>
import moment from "moment";
import orderService from "@/services/order";
import paymentService from "@/services/payment";
import { onMounted, ref } from "vue";
import { ORDER_STATUS_ID_MAPPING } from "../constant/orderStatus";
import { PAYMENT_STATUS_ID_MAPPING } from "../constant/paymentStatus";

const props = defineProps(["orders"]);
const orderStatuses = ref([]);
const paymentStatuses = ref([]);

const color = ref("green");

onMounted(async () => {
  await Promise.all([fetchAllOrderStatuses(), fetAllPaymentStatuses()]);
});

async function fetchAllOrderStatuses() {
  try {
    const res = await orderService.getAllOrderStatus();
    orderStatuses.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}

async function fetAllPaymentStatuses() {
  try {
    const res = await paymentService.getAllPaymentStatuses();
    paymentStatuses.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="rounded-sm border border-stroke bg-white shadow-default">
    <!-- Table Header -->
    <div
      style="grid-template-columns: repeat(20, minmax(0, 1fr))"
      class="grid border-t border-stroke py-4.5 px-4"
    >
      <div class="col-span-3 flex">
        <div class="flex items-center mt-8 mr-4">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
        </div>

        <div class="flex flex-col items-center justify-center gap-2">
          <p class="font-medium">Mã đơn hàng</p>
          <input
            type="text"
            class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
            placeholder="Mã sản phẩm"
          />
        </div>
      </div>

      <div class="col-span-2 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Ngày đặt hàng</p>
        <input
          type="text"
          class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
          placeholder="Ngày đặt hàng"
        />
      </div>
      <div class="col-span-5 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Email khách hàng</p>
        <input
          type="text"
          class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
          placeholder="Email khách hàng"
        />
      </div>
      <div class="col-span-3 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Trạng thái đơn hàng</p>
        <select
          class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%] bg-white"
        >
          <option value="0" selected disabled>Chọn trạng thái đơn</option>
          <option
            v-for="orderStatus of orderStatuses"
            :key="orderStatus.id"
            :value="orderStatus.id"
          >
            {{ orderStatus.name }}
          </option>
        </select>
      </div>
      <div class="col-span-3 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Trạng thái giao dịch</p>
        <select
          class="px-3 border h-[40px] bg-white rounded-md py-2 outline-none w-[90%]"
        >
          <option value="0" selected disabled>Chọn trạng thái giao dịch</option>
          <option
            v-for="paymentStatus of paymentStatuses"
            :key="paymentStatus.id"
            :value="paymentStatus.id"
          >
            {{ paymentStatus.name }}
          </option>
        </select>
      </div>
      <div class="col-span-4 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Tổng tiền</p>
        <div class="flex gap-1 px-1">
          <input
            type="text"
            class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
            placeholder="Từ"
          />
          <input
            type="text"
            class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
            placeholder="Đến"
          />
        </div>
      </div>
    </div>

    <!-- Table Rows -->
    <div v-for="order in props.orders" :key="order.id">
      <div
        style="grid-template-columns: repeat(20, minmax(0, 1fr))"
        class="grid border-t border-stroke py-4.5 px-4"
      >
        <div class="col-span-3">
          <div class="flex items-center">
            <div class="flex items-center justify-items-start">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
            <p class="text-sm font-medium text-black mx-auto">
              #{{ order.id }}
            </p>
          </div>
        </div>

        <div class="col-span-2 flex">
          <p class="text-sm font-medium text-black mx-auto">
            {{ moment(order.createdAt).format("DD-MM-YYYY") }}
          </p>
        </div>

        <div class="col-span-5 flex">
          <p class="text-sm font-medium text-black ml-7">
            {{ order.buyer.email }}
          </p>
        </div>

        <div class="col-span-3 flex">
          <div
            class="flex items-center gap-[10px] mx-auto py-1 px-2 rounded-full"
            :class="{
              'bg-orange-300':
                order.currentStatusId ===
                ORDER_STATUS_ID_MAPPING.AWAITING_CONFIRM,
              'bg-orange-200':
                order.currentStatusId ===
                ORDER_STATUS_ID_MAPPING.AWAITING_FULFILLMENT,
              'bg-green-200':
                order.currentStatusId === ORDER_STATUS_ID_MAPPING.DELIVERING,
              'bg-green-300':
                order.currentStatusId === ORDER_STATUS_ID_MAPPING.DELIVERED,
              'bg-red-300':
                order.currentStatusId === ORDER_STATUS_ID_MAPPING.CANCELED,
            }"
          >
            <div
              class="w-[12px] h-[12px] border-[3px] bg-transparent rounded-full"
              :class="{
                'border-orange-400':
                  order.currentStatusId ===
                  ORDER_STATUS_ID_MAPPING.AWAITING_CONFIRM,
                'border-orange-500':
                  order.currentStatusId ===
                  ORDER_STATUS_ID_MAPPING.AWAITING_FULFILLMENT,
                'border-green-500':
                  order.currentStatusId === ORDER_STATUS_ID_MAPPING.DELIVERING,
                'border-green-500':
                  order.currentStatusId === ORDER_STATUS_ID_MAPPING.DELIVERED,
                'border-red-500':
                  order.currentStatusId === ORDER_STATUS_ID_MAPPING.CANCELED,
              }"
            ></div>
            <p class="text-sm font-medium text-black">
              {{ order.currentStatus.name }}
            </p>
          </div>
        </div>

        <div class="col-span-3 flex">
          <div
            class="flex items-center gap-[10px] mx-auto py-1 px-2 rounded-full"
            :class="{
              'bg-orange-300':
                order.Payment.paymentStatus.id ===
                PAYMENT_STATUS_ID_MAPPING.PENDING,
              'bg-green-300':
                order.Payment.paymentStatus.id ===
                PAYMENT_STATUS_ID_MAPPING.SUCCESS,
              'bg-red-400':
                order.Payment.paymentStatus.id ===
                PAYMENT_STATUS_ID_MAPPING.FAILED,
            }"
          >
            <div
              class="w-[12px] h-[12px] border-[3px] bg-transparent rounded-full"
              :class="{
                'border-orange-500':
                  order.Payment.paymentStatus.id ===
                  PAYMENT_STATUS_ID_MAPPING.PENDING,
                'border-green-500':
                  order.Payment.paymentStatus.id ===
                  PAYMENT_STATUS_ID_MAPPING.SUCCESS,
                'border-red-500':
                  order.Payment.paymentStatus.id ===
                  PAYMENT_STATUS_ID_MAPPING.FAILED,
              }"
            ></div>
            <p class="text-sm font-medium text-black">
              {{ order.Payment.paymentStatus.name }}
            </p>
          </div>
        </div>

        <div class="col-span-4 flex">
          <p class="text-sm font-medium text-black mx-auto">
            {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order.finalPrice)
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
