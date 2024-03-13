<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

import orderService from "@/services/order";

const orders = ref([]);

onMounted(async () => {
    await fetchOrders();
});

async function fetchOrders(filter) {
    try {
        const res = await orderService.getAll(filter);
        orders.value = res.metadata;
    } catch (error) {
        console.log(error);
    }
}

const prices = ref();
watch(orders, async () => {
    console.log(orders.value);
    const priceArray = orders.value.map((order) => (order.finalPrice));
    prices.value = priceArray.reduce((prev, current) => prev + current, 0);
    console.log(prices.value);
});

// const prices = computed(() => {
//     console.log(orders.value);
//     const priceArray = orders.value.map((order) => (order.finalPrice));
//     console.log(priceArray);
//     return priceArray.reduce((prev, current) => prev + current, 0);
// })

const typeOptions = ref([
    "Theo ngày",
    "Theo tháng",
    "Theo năm"
]);

const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const chartData = ref({
    labels: monthOptions,
    datasets: [
        {
            label: "Doanh thu",
            backgroundColor: "rgba(1, 116, 188, 0.50)",
            data: [4000000, 2000000, 1200000, 3900000, 1000000, 4000000, 3900000, 8000000, 4000000, 2000000, 1200000, +prices.value]
        }
    ]
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false
});

const typeOptionIndex = ref(2);

</script>
<template>
    <div class="h-[500px] flex flex-col gap-2">
        <div class="flex justify-between">
            <h2 class="uppercase text-xl font-bold text-black">Biểu đồ doanh thu</h2>
            <div class="flex gap-8">
                <div class="flex items-center justify-center gap-3">
                    <p>Định dạng:</p>
                    <select class="px-3 border rounded-md py-2 outline-none" v-model="typeOptionIndex">
                        <option v-for="(option, index) in typeOptions" :key="index" :value="index"
                            :class="[{ 'text-gray-900': index === typeOptionIndex }, optionClass]">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div class="flex items-center justify-center gap-3">
                    <p>Từ:</p>
                    <select class="px-3 border rounded-md py-2 outline-none" v-model="typeOptionIndex">
                        <option v-for="(option, index) in typeOptions" :key="index" :value="index"
                            :class="[{ 'text-gray-900': index === typeOptionIndex }, optionClass]">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div class="flex items-center justify-center gap-3">
                    <p>Đến:</p>
                    <select class="px-3 border rounded-md py-2 outline-none" v-model="typeOptionIndex">
                        <option v-for="(option, index) in typeOptions" :key="index" :value="index"
                            :class="[{ 'text-gray-900': index === typeOptionIndex }, optionClass]">
                            {{ option }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="text-xl">Tổng doanh thu: 2.000.000 VND</div>
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>