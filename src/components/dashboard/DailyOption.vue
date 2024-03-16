<script setup>
import { useDashboardStore } from "@/stores";
const dashboardStore = useDashboardStore();
</script>
<template>
    <div class="flex items-center justify-center gap-3">
        <div class="flex items-center justify-center gap-3">
            <p>Từ:</p>
            <select class="px-3 border rounded-md py-2 outline-none" v-model="dashboardStore.beginDateIndex">
                <option v-for="(n, i) in dashboardStore.endDateIndex + 1" :key="i" :value="i">
                    {{ dashboardStore.dates[i] }}
                </option>
            </select>
        </div>
        <div class="flex items-center justify-center gap-3">
            <p>Đến:</p>
            <select class="px-3 border rounded-md py-2 outline-none" v-model="dashboardStore.endDateIndex">
                <option v-for="(n, i) in 15" :key="i" :value="i">
                    {{ dashboardStore.dates[i] }}
                </option>
            </select>
        </div>
    </div>
</template>


