<script setup>
import ToggleButton from "@/components/dashboard/ToggleButton.vue";
import DailyOption from "@/components/dashboard/DailyOption.vue";
import MonthlyOption from "@/components/dashboard/MonthlyOption.vue";
import YearlyOption from "@/components/dashboard/YearlyOption.vue";

import { useDashboardStore } from "@/stores";
const dashboardStore = useDashboardStore();
</script>
<template>
    <div class="flex justify-between">
      <div class="flex gap-2 items-center">
        <h2 class="uppercase text-xl font-bold text-black">Biểu đồ</h2>
        <ToggleButton />
      </div>
      <div class="flex gap-8">
        <div class="flex items-center justify-center gap-3">
          <p>Định dạng:</p>
          <select class="px-3 border rounded-md py-2 outline-none" v-model="dashboardStore.typeOptionIndex">
            <option v-for="(option, index) in dashboardStore.typeOptions" :key="index" :value="index">
              {{ option }}
            </option>
          </select>
        </div>
        <DailyOption v-if="dashboardStore.typeOptionIndex == 0" />
        <MonthlyOption v-else-if="dashboardStore.typeOptionIndex == 1" />
        <YearlyOption v-else />
      </div>
    </div>
    <div v-if="dashboardStore.subjectIndex == 0" class="text-xl">
      Tổng doanh thu:
      <span class="text-[#3CCF4E] text-2xl font-bold">
        {{
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(dashboardStore.totalPrice)
          }}
      </span>
    </div>
    <div v-else>
      Tổng sản phẩm đã bán:
      <span class="text-[#3CCF4E] text-2xl font-bold">
        {{ dashboardStore.totalQuantity }}
      </span>
    </div>
</template>



