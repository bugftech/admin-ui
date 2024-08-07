<template>
  <v-card>
    <v-card-item>
      <v-card-title class="text-subtitle-2"> 近7天的订单数据 </v-card-title>
      <v-card-subtitle class="text-caption">
        对比上个周期的数据<v-chip color="blue-grey" size="x-small" class="ml-2"
          >上次更新: 一天前</v-chip
        >
      </v-card-subtitle>
      <template v-slot:append>
        <v-icon color="green">mdi-trending-up</v-icon>
        <div class="text-caption text-green ml-2">
          {{ growthRate.toFixed(2) }}%
        </div>
      </template>
    </v-card-item>
    <v-card-text style="height: 300px">
      <Line :data="data" :options="options"> </Line>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getLast7Days(): string[] {
  const today = new Date();
  const last7Days: string[] = [];

  for (let i = 1; i <= 7; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    last7Days.push(pastDate.toISOString().split("T")[0]);
  }

  return last7Days;
}

function calculateTotal(data: number[]): number {
  return data.reduce((total, num) => total + num, 0);
}

function calculateGrowthRate(
  currentTotal: number,
  previousTotal: number
): number {
  return ((currentTotal - previousTotal) / previousTotal) * 100;
}

// 近7天和上个周期的数据
const currentPeriodData = [3, 4, 1, 5, 2, 8, 3];
const previousPeriodData = [4, 3, 1, 4, 3, 5, 4];

// 计算总和
const currentPeriodTotal = calculateTotal(currentPeriodData);
const previousPeriodTotal = calculateTotal(previousPeriodData);

// 计算增长率
const growthRate = calculateGrowthRate(
  currentPeriodTotal,
  previousPeriodTotal
);

const data = {
  labels: getLast7Days().reverse(),
  datasets: [
    {
      label: "近7天订单",
      backgroundColor: "#3F51B5",
      borderColor: "#3F51B5",
      borderWidth: 3,
      data: currentPeriodData,
      fill: true,
    },
    {
      label: "上个周期",
      backgroundColor: "#C5CAE9",
      data: previousPeriodData,
      fill: true,
      borderColor: "#C5CAE9",
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: true, // 隐藏X轴的网格线
      },
    },
    y: {
      grid: {
        display: false, // 隐藏Y轴的网格线
      },
    },
  },
};
</script>
