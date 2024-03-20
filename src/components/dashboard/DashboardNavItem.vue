<script setup>
import { useDashboardStore } from "@/stores";
const dashboardStore = useDashboardStore();
const props = defineProps(["item", "index"]);
</script>
<template>
  <div
    class="bg-[#0174bcd9] rounded-lg p-4 w-full h-[160px] flex justify-between items-center"
  >
    <div class="flex flex-col gap-3 text-bold text-white">
      <div class="uppercase text-lg">{{ item.title }} (30 ngày)</div>
      <div class="text-4xl">
        {{
          index == 0
            ? new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dashboardStore.totalSaleOf30Days)
            : index == 1
            ? dashboardStore.totalProductOf30Days
            : dashboardStore.totalUserOf30Days
        }}
      </div>
    </div>
    <div class="w-[60px] h-[60px]">
      <component :is="item.icon" />
    </div>
  </div>
</template>
