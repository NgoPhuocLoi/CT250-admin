<script setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartData = ref({
    labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
    ],
    datasets: [
        {
            label: "Data 1",
            data: [2, 10, 5, 9, 0, 6, 20],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
        }
    ]
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    title: {
        display: true,
        text: "My Data"
    }
});

</script>
<template>
    <div class="h-[500px] flex flex-col gap-3">
        <Line :options="chartOptions" :data="chartData" />
    </div>
</template>