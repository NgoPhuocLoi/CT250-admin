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

import { useDashboardStore } from "@/stores";
const dashboardStore = useDashboardStore();

import ReportHeader from "@/components/dashboard/ReportHeader.vue";
import ChartSkeleton from "@/components/skeleton/ChartSkeleton.vue";

const fetchingData = ref(false);

onMounted(async () => {
  fetchingData.value = true;
  await dashboardStore.fetchOrders();
  fetchingData.value = false;
});

const sliceArray = (array, beginIndex, endIndex) => {
  return array.slice(beginIndex, endIndex + 1);
};

const getPercentage = (dataArray, total) => {
  return Number(((dataArray.reduce((a, b) => a + b, 0) / total) * 100).toFixed(2));
};

const chartData = computed(() => {
  let labelArray = [];
  let menSaleDataArray = [];
  let womenSaleDataArray = [];
  let childrenSaleDataArray = [];
  let totalSaleDataArray = [];
  let menProductDataArray = [];
  let womenProductDataArray = [];
  let childrenProductDataArray = [];
  let totalProductDataArray = [];

  let menSalePercentage = 0;
  let womenSalePercentage = 0;
  let childrenSalePercentage = 0;

  let menProductPercentage = 0;
  let womenProductPercentage = 0;
  let childrenProductPercentage = 0;

  // fetch data
  let beginIdx, endIdx;

  switch (dashboardStore.typeOptionIndex) {
    case 0:
      beginIdx = dashboardStore.beginDateIndex;
      endIdx = dashboardStore.endDateIndex;
      labelArray = sliceArray(dashboardStore.dates, beginIdx, endIdx);
      break;
    case 1:
      beginIdx = dashboardStore.beginMonthIndex;
      endIdx = dashboardStore.endMonthIndex;
      labelArray = sliceArray(dashboardStore.months, beginIdx, endIdx);
      break;
    case 2:
      beginIdx = dashboardStore.beginYear - dashboardStore.currentYear + 4;
      endIdx = dashboardStore.endYear - dashboardStore.currentYear + 4;
      labelArray = sliceArray(dashboardStore.years, beginIdx, endIdx);
      break;
  }

  // price
  menSaleDataArray = sliceArray(dashboardStore.menPrices, beginIdx, endIdx);
  womenSaleDataArray = sliceArray(dashboardStore.womenPrices, beginIdx, endIdx);
  childrenSaleDataArray = sliceArray(dashboardStore.childrenPrices, beginIdx, endIdx);
  totalSaleDataArray = menSaleDataArray.map((value, index) => value + womenSaleDataArray[index] + childrenSaleDataArray[index]);
  // quantity
  menProductDataArray = sliceArray(dashboardStore.menQuantities, beginIdx, endIdx);
  womenProductDataArray = sliceArray(dashboardStore.womenQuantities, beginIdx, endIdx);
  childrenProductDataArray = sliceArray(dashboardStore.childrenQuantities, beginIdx, endIdx);
  totalProductDataArray = menProductDataArray.map((value, index) => value + womenProductDataArray[index] + childrenProductDataArray[index]);

  // calculate data for pie-chart
  // sale
  let totalSale = menSaleDataArray.reduce((a, b) => a + b, 0) + womenSaleDataArray.reduce((a, b) => a + b, 0) + childrenSaleDataArray.reduce((a, b) => a + b, 0);
  menSalePercentage = getPercentage(menSaleDataArray, totalSale);
  womenSalePercentage = getPercentage(womenSaleDataArray, totalSale);
  childrenSalePercentage = getPercentage(childrenSaleDataArray, totalSale);

  // product
  let totalProduct = menProductDataArray.reduce((a, b) => a + b, 0) + womenProductDataArray.reduce((a, b) => a + b, 0) + childrenProductDataArray.reduce((a, b) => a + b, 0);
  menProductPercentage = getPercentage(menProductDataArray, totalProduct);
  womenProductPercentage = getPercentage(womenProductDataArray, totalProduct);
  childrenProductPercentage = getPercentage(childrenProductDataArray, totalProduct);

  const menColor = "#40A2E3";
  const womenColor = "#EE4266";
  const childrenColor = "#FF9800";

  return [
    {
      labels: labelArray,
      datasets: [
        {
          label: "Nam",
          borderColor: menColor,
          backgroundColor: menColor,
          fill: false,
          data: (dashboardStore.subjectIndex == 0) ? menSaleDataArray : menProductDataArray,
        },
        {
          label: "Nữ",
          borderColor: womenColor,
          backgroundColor: womenColor,
          fill: false,
          data: (dashboardStore.subjectIndex == 0) ? womenSaleDataArray : womenProductDataArray,
        },
        {
          label: "Trẻ em",
          borderColor: childrenColor,
          backgroundColor: childrenColor,
          fill: false,
          data: (dashboardStore.subjectIndex == 0) ? childrenSaleDataArray : childrenProductDataArray,
        },
      ],
    },
    {
      labels: ["Nam", "Nữ", "Trẻ em"],
      datasets: [
        {
          backgroundColor: [menColor, womenColor, childrenColor],
          data: (dashboardStore.subjectIndex == 0) ?
            [menSalePercentage, womenSalePercentage, childrenSalePercentage]
            : [menProductPercentage, womenProductPercentage, childrenProductPercentage],
        },
      ],
    },
    {
      labels: labelArray,
      datasets: [
        {
          label: (dashboardStore.subjectIndex == 0) ? "Doanh thu" : "Sản phẩm",
          borderColor: '#87A922',
          backgroundColor: '#87A922',
          fill: false,
          data: (dashboardStore.subjectIndex == 0) ? totalSaleDataArray : totalProductDataArray,
        }
      ],
    }
  ]
});

const legendMargin = {
  beforeInit: function (chart) {
    const fitValue = chart.legend.fit;
    chart.legend.fit = function () {
      fitValue.bind(chart.legend)();
      return this.height += 40;
    };
  },
}

const chartPlugin = ref([ChartDataLabels, legendMargin]);

ChartJS.defaults.font.size = 20;
const chartOptions = computed(() => {
  return {
    layout: {
      padding: 20,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: dashboardStore.typeOptionIndex == 0 ? 'Ngày' : dashboardStore.typeOptionIndex == 1 ? 'Tháng' : 'Năm',
          color: '#911',
          font: {
            family: 'Courier New',
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 }
        }
      },
      y: {
        min: 0,
        ticks: {
          stepSize: dashboardStore.subjectIndex == 0 ? 500000 : 1,
        },
        display: true,
        title: {
          display: true,
          text: dashboardStore.subjectIndex == 0 ? 'Doanh thu' : 'Sản phẩm',
          color: '#191',
          font: {
            family: 'Courier New',
            size: 20,
            weight: 'bold',
            lineHeight: 1.2
          },
          padding: { top: 0, left: 0, right: 0, bottom: 10 }
        }
      }
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
  }
});

const generalChartOptions = computed(() => {
  return {
    ...chartOptions.value,
    lineTension: 0.35,
  }
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
      align: "start",
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
  <div class="flex flex-col gap-2">
    <ReportHeader />
    <div class="">
      <div class="text-2xl text-[#EE4266] text-center">Thống kê theo danh mục sản phẩm</div>
      <div class="grid grid-cols-3 w-full">
        <div class="col-span-2 h-[600px]">
          <ChartSkeleton v-if="fetchingData" />
          <Line v-else :plugins="chartPlugin" :options="chartOptions" :data="chartData[0]" />
        </div>
        <div class="col-span-1 h-[600px]">
          <ChartSkeleton v-if="fetchingData" />
          <Pie v-else :plugins="chartPlugin" :options="pieChartOptions" :data="chartData[1]" />
        </div>
      </div>
      <div class="h-[600px]">
        <ChartSkeleton v-if="fetchingData" />
        <Bar v-else :plugins="chartPlugin" :options="chartOptions" :data="chartData[0]" />
      </div>
    </div>
    <div class="">
      <div class="text-2xl text-[#EE4266] text-center">Thống kê chung</div>
      <div class="h-[600px]">
        <ChartSkeleton v-if="fetchingData" />
        <Line v-else :plugins="chartPlugin" :options="generalChartOptions" :data="chartData[2]" />
      </div>
    </div>
  </div>
</template>
