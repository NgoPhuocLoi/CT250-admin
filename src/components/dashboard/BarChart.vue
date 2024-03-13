<script setup>
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = ref({
    labels: [
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
    ],
    datasets: [
        {
            label: "Doanh thu",
            backgroundColor: "rgba(1, 116, 188, 0.50)",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
    ]
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false
});

const typeOptions = ref([
    "Theo ngày",
    "Theo tuần",
    "Theo tháng",
    "Theo năm"
]);

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
                    <p>Bắt đầu:</p>
                    <select class="px-3 border rounded-md py-2 outline-none" v-model="typeOptionIndex">
                        <option v-for="(option, index) in typeOptions" :key="index" :value="index"
                            :class="[{ 'text-gray-900': index === typeOptionIndex }, optionClass]">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div class="flex items-center justify-center gap-3">
                    <p>Kết thúc:</p>
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