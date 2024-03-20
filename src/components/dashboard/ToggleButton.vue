<script setup>
import { useDashboardStore } from "@/stores";
import { ref } from "vue";
const dashboardStore = useDashboardStore();

const isChecked = ref(false);

const handleCheckboxChange = (e) => {
  dashboardStore.subjectIndex = 1 - dashboardStore.subjectIndex;
};
</script>

<template>
  <label class="relative inline-flex cursor-pointer items-center">
    <input
      @change="handleCheckboxChange"
      type="checkbox"
      value=""
      checked
      class="peer sr-only"
    />
    <div
      class="peer flex h-8 w-[210px] items-center gap-4 rounded-full px-3 after:absolute after:left-1 after: after:h-6 after:w-[48.5%] after:rounded-full after:bg-white/40 after:transition-all after:content-[''] bg-stone-600 peer-checked:after:translate-x-full peer-focus:outline-none text-sm text-white"
    >
      <span class="flex-1 text-center">Sản phẩm</span>
      <span class="flex-1 text-center">Doanh thu</span>
    </div>
  </label>
</template>
