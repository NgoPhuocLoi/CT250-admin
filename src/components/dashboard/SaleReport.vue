<script setup>
import { onMounted, ref, computed } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

import { useDashboardStore } from "@/stores";

const dashboardStore = useDashboardStore();

onMounted(async () => {
    await dashboardStore.fetchOrders();
});

const chartData = computed(() => {
    let labelArray = [];
    let dataArray = [];
    switch (dashboardStore.typeOptionIndex) {
        case 1:
            labelArray = dashboardStore.months.slice(dashboardStore.beginMonthIndex, dashboardStore.endMonthIndex + 1);
            dataArray = dashboardStore.prices.slice(dashboardStore.beginMonthIndex, dashboardStore.endMonthIndex + 1);
            break;
        case 2:
            labelArray = dashboardStore.years.slice(dashboardStore.beginYear - dashboardStore.currentYear + 4, dashboardStore.endYear - dashboardStore.currentYear + 5);
            dataArray = dashboardStore.prices.slice(dashboardStore.beginYear - dashboardStore.currentYear + 4, dashboardStore.endYear - dashboardStore.currentYear + 5);
            break;
    }

    return {
        labels: labelArray,
        datasets: [
            {
                label: "Doanh thu",
                backgroundColor: "#6cbbecd9",
                data: dataArray,
            }
        ]
    }
});

const chartPlugin = ref([
    ChartDataLabels,
])

const chartOptions = ref({
    layout: {
        padding: 20
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            // position: 'bottom',
            // align: 'start',
            labels: {
                font: { size: 20 }
            },
        },
        datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: function (value) {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(value);
            },
            color: '#fd0',
            font: {
                size: 20,
                weight: 'bold'
            }
        }
    }
});

</script>
<template>
    <div class="h-[500px] flex flex-col gap-2">
        <div class="flex justify-between">
            <h2 class="uppercase text-xl font-bold text-black">Biểu đồ doanh thu</h2>
            <div class="flex gap-8">
                <div class="flex items-center justify-center gap-3">
                    <p>Định dạng:</p>
                    <select class="px-3 border rounded-md py-2 outline-none" v-model="dashboardStore.typeOptionIndex">
                        <option v-for="(option, index) in dashboardStore.typeOptions" :key="index" :value="index">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <!-- monthly -->
                <div v-if="dashboardStore.typeOptionIndex == 1" class="flex items-center justify-center gap-3">
                    <div class="flex items-center justify-center gap-3">
                        <p>Từ:</p>
                        <select class="px-3 border rounded-md py-2 outline-none"
                            v-model="dashboardStore.beginMonthIndex">
                            <option v-for="(n, i) in dashboardStore.endMonthIndex + 1" :key="i" :value="i">
                                {{ dashboardStore.months[i] }}
                            </option>
                        </select>
                    </div>
                    <div class="flex items-center justify-center gap-3">
                        <p>Đến:</p>
                        <select class="px-3 border rounded-md py-2 outline-none" v-model="dashboardStore.endMonthIndex">
                            <option v-for="(n, i) in dashboardStore.currentMonthIndex + 6" :key="i" :value="i">
                                {{ dashboardStore.months[i] }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- yearly -->
                <div v-if="dashboardStore.typeOptionIndex == 2" class="flex items-center justify-center gap-3">
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

            </div>
        </div>
        <div class="text-xl">Tổng doanh thu:
            <span class="text-[#3CCF4E] text-2xl font-bold">
                {{ new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(dashboardStore.totalPrice) }}
            </span>
        </div>
        <Bar id="my-chart-id" :plugins="chartPlugin" :options="chartOptions" :data="chartData" />
    </div>
</template>