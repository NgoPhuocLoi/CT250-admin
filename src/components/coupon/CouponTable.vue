<script setup>
import { onMounted, ref } from "vue";
import couponService from "@/services/coupon";
import moment from "moment";

const coupons = ref([]);

onMounted(async () => {
  await fetchCoupons();
});

async function fetchCoupons() {
  try {
    const res = await couponService.getAllCoupons();
    coupons.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="rounded-sm border border-stroke bg-white shadow-default">
    <!-- Table Header -->
    <div
      style="grid-template-columns: repeat(10, minmax(0, 1fr))"
      class="grid border-t border-stroke py-4.5 px-4"
    >
      <div class="col-span-2 flex">
        <div class="flex items-center mt-8 mr-4">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
        </div>

        <div class="flex flex-col items-center justify-center gap-2">
          <p class="font-medium">Mã code</p>
          <input
            type="text"
            class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
            placeholder="Mã sản phẩm"
          />
        </div>
      </div>

      <div class="col-span-2 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Ngày bắt đầu</p>
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
      <div class="col-span-2 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Ngày kết thúc</p>
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
      <div class="col-span-2 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Trạng thái</p>
        <select
          class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%] bg-white"
        >
          <option value="0" selected disabled>Chọn trạng thái</option>
          <!-- <option
            v-for="orderStatus of orderStatuses"
            :key="orderStatus.id"
            :value="orderStatus.id"
          >
            {{ orderStatus.name }}
          </option> -->
        </select>
      </div>
      <div class="col-span-2 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Số lần dùng</p>
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
    <div v-for="coupon in coupons" :key="coupon.id">
      <div
        style="grid-template-columns: repeat(10, minmax(0, 1fr))"
        class="grid border-t border-stroke py-4.5 px-4"
      >
        <div class="col-span-2">
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
            <RouterLink
              :to="`/ma-giam-gia/chinh-sua/${coupon.code}`"
              class="text-sm font-bold text-black mx-auto"
            >
              {{ coupon.code }}
            </RouterLink>
          </div>
        </div>

        <div class="col-span-2 flex">
          <p class="text-sm font-medium text-black mx-auto">
            {{ moment(coupon.startDate).format("DD-MM-YYYY") }}
          </p>
        </div>

        <div class="col-span-2 flex">
          <p class="text-sm font-medium text-black mx-auto">
            {{ moment(coupon.endDate).format("DD-MM-YYYY") }}
          </p>
        </div>

        <div class="col-span-2 flex justify-center">
          <div>{{ coupon.visible ? "Hiển thị" : "Ẩn" }}</div>
        </div>

        <div class="col-span-2 flex justify-center">
          <div>{{ coupon.currentUse }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
