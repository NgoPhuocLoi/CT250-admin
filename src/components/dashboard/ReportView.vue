<script setup>
import { onMounted, ref, computed } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

import ToggleButton from "@/components/dashboard/ToggleButton.vue";
import DailyOption from "@/components/dashboard/DailyOption.vue";
import MonthlyOption from "@/components/dashboard/MonthlyOption.vue";
import YearlyOption from "@/components/dashboard/YearlyOption.vue";

import { useDashboardStore } from "@/stores";

const dashboardStore = useDashboardStore();

onMounted(async () => {
    await dashboardStore.fetchOrders();
});

const chartData = computed(() => {
    let labelArray = [];
    let saleDataArray = [];
    let productDataArray = [];
    switch (dashboardStore.typeOptionIndex) {
        case 0:
            labelArray = dashboardStore.dates.slice(dashboardStore.beginDateIndex, dashboardStore.endDateIndex + 1);
            saleDataArray = dashboardStore.prices.slice(dashboardStore.beginDateIndex, dashboardStore.endDateIndex + 1);
            productDataArray = dashboardStore.quantities.slice(dashboardStore.beginDateIndex, dashboardStore.endDateIndex + 1);
            break;
        case 1:
            labelArray = dashboardStore.months.slice(dashboardStore.beginMonthIndex, dashboardStore.endMonthIndex + 1);
            saleDataArray = dashboardStore.prices.slice(dashboardStore.beginMonthIndex, dashboardStore.endMonthIndex + 1);
            productDataArray = dashboardStore.quantities.slice(dashboardStore.beginMonthIndex, dashboardStore.endMonthIndex + 1);
            break;
        case 2:
            labelArray = dashboardStore.years.slice(dashboardStore.beginYear - dashboardStore.currentYear + 4, dashboardStore.endYear - dashboardStore.currentYear + 5);
            saleDataArray = dashboardStore.prices.slice(dashboardStore.beginYear - dashboardStore.currentYear + 4, dashboardStore.endYear - dashboardStore.currentYear + 5);
            productDataArray = dashboardStore.quantities.slice(dashboardStore.beginYear - dashboardStore.currentYear + 4, dashboardStore.endYear - dashboardStore.currentYear + 5);
            break;
    }

    return (dashboardStore.subjectIndex == 0) ? {
        labels: labelArray,
        datasets: [
            {
                label: "Doanh thu",
                backgroundColor: "#6cbbecd9",
                data: saleDataArray,
            }
        ]
    } : {
        labels: labelArray,
        datasets: [
            {
                label: "Sản phẩm đã bán",
                backgroundColor: "#6cbbecd9",
                data: productDataArray,
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
            labels: {
                font: { size: 20 }
            },
        },
        datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: function (value) {
                return (dashboardStore.subjectIndex == 0) ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(value) : value;
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
            <h2 class="uppercase text-xl font-bold text-black">
                {{ dashboardStore.subjectIndex == 0 ? 'Biểu đồ doanh thu' : 'Biểu đồ sản phẩm đã bán' }}
            </h2>
            <ToggleButton />
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
        <div v-if="dashboardStore.subjectIndex == 0" class="text-xl">Tổng doanh thu:
            <span class="text-[#3CCF4E] text-2xl font-bold">
                {{ new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(dashboardStore.totalPrice) }}
            </span>
        </div>
        <div v-else>Tổng sản phẩm đã bán:
            <span class="text-[#3CCF4E] text-2xl font-bold">
                {{ dashboardStore.totalQuantity }}
            </span>
        </div>
        <Bar id="my-chart-id" :plugins="chartPlugin" :options="chartOptions" :data="chartData" />
    </div>
</template>