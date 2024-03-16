<script setup>
import { useDashboardStore } from "@/stores";
const dashboardStore = useDashboardStore();
</script>
<template>
    <div class="flex items-center justify-center gap-3">
        <div class="flex items-center justify-center gap-3">
            <p>Từ:</p>
            <select class="px-3 border rounded-md py-2 outline-none" v-model="dashboardStore.beginYear">
                <option v-for="(n, i) in dashboardStore.endYear - dashboardStore.currentYear + 5" :key="i"
                    :value="i + dashboardStore.currentYear - 4">
                    {{ i + dashboardStore.currentYear - 4 }}
                </option>
            </select>
        </div>
        <div class="flex items-center justify-center gap-3">
            <p>Đến:</p>
            <select class="px-3 border rounded-md py-2 outline-none" v-model="dashboardStore.endYear">
                <option v-for="(n, i) in 5" :key="i" :value="i + dashboardStore.currentYear - 4">
                    {{ i + dashboardStore.currentYear - 4 }}
                </option>
            </select>
        </div>
    </div>
</template>
