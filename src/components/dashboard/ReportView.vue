<script setup>
import { onMounted, ref, computed } from "vue";
import { Line, Pie, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  let menSaleDataArray = [];
  let womenSaleDataArray = [];
  let childrenSaleDataArray = [];
  let menProductDataArray = [];
  let womenProductDataArray = [];
  let childrenProductDataArray = [];

  let menSalePercentage = 0;
  let womenSalePercentage = 0;
  let childrenSalePercentage = 0;

  let menProductPercentage = 0;
  let womenProductPercentage = 0;
  let childrenProductPercentage = 0;

  switch (dashboardStore.typeOptionIndex) {
    case 0:
      labelArray = dashboardStore.dates.slice(
        dashboardStore.beginDateIndex,
        dashboardStore.endDateIndex + 1
      );
      // price
      menSaleDataArray = dashboardStore.menPrices.slice(
        dashboardStore.beginDateIndex,
        dashboardStore.endDateIndex + 1
      );
      womenSaleDataArray = dashboardStore.womenPrices.slice(
        dashboardStore.beginDateIndex,
        dashboardStore.endDateIndex + 1
      );
      childrenSaleDataArray = dashboardStore.childrenPrices.slice(
        dashboardStore.beginDateIndex,
        dashboardStore.endDateIndex + 1
      );
      // quantity
      menProductDataArray = dashboardStore.menQuantities.slice(
        dashboardStore.beginDateIndex,
        dashboardStore.endDateIndex + 1
      );
      womenProductDataArray = dashboardStore.womenQuantities.slice(
        dashboardStore.beginDateIndex,
        dashboardStore.endDateIndex + 1
      );
      childrenProductDataArray = dashboardStore.childrenQuantities.slice(
        dashboardStore.beginDateIndex,
        dashboardStore.endDateIndex + 1
      );
      break;
    case 1:
      labelArray = dashboardStore.months.slice(
        dashboardStore.beginMonthIndex,
        dashboardStore.endMonthIndex + 1
      );
      // price
      menSaleDataArray = dashboardStore.menPrices.slice(
        dashboardStore.beginMonthIndex,
        dashboardStore.endMonthIndex + 1
      );
      womenSaleDataArray = dashboardStore.womenPrices.slice(
        dashboardStore.beginMonthIndex,
        dashboardStore.endMonthIndex + 1
      );
      childrenSaleDataArray = dashboardStore.childrenPrices.slice(
        dashboardStore.beginMonthIndex,
        dashboardStore.endMonthIndex + 1
      );
      // quantity
      menProductDataArray = dashboardStore.menQuantities.slice(
        dashboardStore.beginMonthIndex,
        dashboardStore.endMonthIndex + 1
      );
      womenProductDataArray = dashboardStore.womenQuantities.slice(
        dashboardStore.beginMonthIndex,
        dashboardStore.endMonthIndex + 1
      );
      childrenProductDataArray = dashboardStore.childrenQuantities.slice(
        dashboardStore.beginMonthIndex,
        dashboardStore.endMonthIndex + 1
      );
      break;
    case 2:
      labelArray = dashboardStore.years.slice(
        dashboardStore.beginYear - dashboardStore.currentYear + 4,
        dashboardStore.endYear - dashboardStore.currentYear + 5
      );
      // price
      menSaleDataArray = dashboardStore.menPrices.slice(
        dashboardStore.beginYear - dashboardStore.currentYear + 4,
        dashboardStore.endYear - dashboardStore.currentYear + 5
      );
      womenSaleDataArray = dashboardStore.womenPrices.slice(
        dashboardStore.beginYear - dashboardStore.currentYear + 4,
        dashboardStore.endYear - dashboardStore.currentYear + 5
      );
      childrenSaleDataArray = dashboardStore.childrenPrices.slice(
        dashboardStore.beginYear - dashboardStore.currentYear + 4,
        dashboardStore.endYear - dashboardStore.currentYear + 5
      );
      // quantity
      menProductDataArray = dashboardStore.menQuantities.slice(
        dashboardStore.beginYear - dashboardStore.currentYear + 4,
        dashboardStore.endYear - dashboardStore.currentYear + 5
      );
      womenProductDataArray = dashboardStore.womenQuantities.slice(
        dashboardStore.beginYear - dashboardStore.currentYear + 4,
        dashboardStore.endYear - dashboardStore.currentYear + 5
      );
      childrenProductDataArray = dashboardStore.childrenQuantities.slice(
        dashboardStore.beginYear - dashboardStore.currentYear + 4,
        dashboardStore.endYear - dashboardStore.currentYear + 5
      );
      break;
  }

  // calculate data for pie-chart
  // sale
  let totalSale = menSaleDataArray.reduce((a, b) => a + b, 0) + womenSaleDataArray.reduce((a, b) => a + b, 0) + childrenSaleDataArray.reduce((a, b) => a + b, 0);
  menSalePercentage = Number(((menSaleDataArray.reduce((a, b) => a + b, 0) / totalSale) * 100).toFixed(2));
  womenSalePercentage = Number(((womenSaleDataArray.reduce((a, b) => a + b, 0) / totalSale) * 100).toFixed(2));
  childrenSalePercentage = Number(((childrenSaleDataArray.reduce((a, b) => a + b, 0) / totalSale) * 100).toFixed(2));
  // product
  let totalProduct = menProductDataArray.reduce((a, b) => a + b, 0) + womenProductDataArray.reduce((a, b) => a + b, 0) + childrenProductDataArray.reduce((a, b) => a + b, 0);
  menProductPercentage = Number(((menProductDataArray.reduce((a, b) => a + b, 0) / totalProduct) * 100).toFixed(2));
  womenProductPercentage = Number(((womenProductDataArray.reduce((a, b) => a + b, 0) / totalProduct) * 100).toFixed(2));
  childrenProductPercentage = Number(((childrenProductDataArray.reduce((a, b) => a + b, 0) / totalProduct) * 100).toFixed(2));

  const menColor = "#40A2E3";
  const womenColor = "#EE4266";
  const childrenColor = "#FF9800";

  return dashboardStore.subjectIndex == 0
    ? [
      {
        labels: labelArray,
        datasets: [
          {
            label: "Nam",
            borderColor: menColor,
            backgroundColor: menColor,
            fill: false,
            data: menSaleDataArray,
          },
          {
            label: "Nữ",
            borderColor: womenColor,
            backgroundColor: womenColor,
            fill: false,
            data: womenSaleDataArray,
          },
          {
            label: "Trẻ em",
            borderColor: childrenColor,
            backgroundColor: childrenColor,
            fill: false,
            data: childrenSaleDataArray,
          },
        ],
      },
      {
        labels: ["Nam", "Nữ", "Trẻ em"],
        datasets: [
          {
            backgroundColor: [menColor, womenColor, childrenColor],
            data: [menSalePercentage, womenSalePercentage, childrenSalePercentage],
          },
        ],
      }
    ]
    : [
      {
        labels: labelArray,
        datasets: [
          {
            label: "Nam",
            borderColor: menColor,
            backgroundColor: menColor,
            fill: false,
            data: menProductDataArray,
          },
          {
            label: "Nữ",
            borderColor: womenColor,
            backgroundColor: womenColor,
            fill: false,
            data: womenProductDataArray,
          },
          {
            label: "Trẻ em",
            borderColor: childrenColor,
            backgroundColor: childrenColor,
            fill: false,
            data: childrenProductDataArray,
          },
        ],
      },
      {
        labels: ["Nam", "Nữ", "Trẻ em"],
        datasets: [
          {
            backgroundColor: [menColor, womenColor, childrenColor],
            data: [menProductPercentage, womenProductPercentage, childrenProductPercentage],
          },
        ],
      }
    ];
});

const chartPlugin = ref([ChartDataLabels]);
ChartJS.defaults.font.size = 20;
const chartOptions = ref({
  layout: {
    padding: 20,
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        font: { size: 20 },
      },
    },
    datalabels: {
      anchor: "end",
      align: "top",
      formatter: function (value) {
        return dashboardStore.subjectIndex == 0
          ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value)
          : value;
      },
      color: "black",
      font: {
        size: 20,
        weight: "bold",
      },
    },
  },
});

const pieChartOptions = ref({
  layout: {
    padding: 20,
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        font: { size: 20 },
      },
    },
    datalabels: {
      anchor: "end",
      align: "top",
      formatter: function (value) {
        return value + "%";
      },
      color: "black",
      font: {
        size: 20,
        weight: "bold",
      },
    },
  },
});

</script>
<template>
  <div class="h-[500px] flex flex-col gap-2">
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
    <div class="grid grid-cols-3 w-full">
      <div class="col-span-2">
        <Line :plugins="chartPlugin" :options="chartOptions" :data="chartData[0]" />
      </div>
      <div class="col-span-1">
        <Pie :plugins="chartPlugin" :options="pieChartOptions" :data="chartData[1]" />
      </div>
    </div>
    <Bar :plugins="chartPlugin" :options="chartOptions" :data="chartData[0]" />
  </div>
</template>
