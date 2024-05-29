<template>
  <v-card height="400">
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-caption font-weight-bold">
        月度销售额
      </v-toolbar-title>
      <v-spacer />
      <v-btn @click="fetch" icon="mdi-sync" size="small"></v-btn>
    </v-toolbar>
    <v-card-text>
      <div
        ref="chartRef"
        class="text-caption"
        style="font-family: unset !important; color: black; height: 300px"
      ></div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import * as echarts from "echarts";

const chartRef = ref();
const xAxisData = ref(getDaysInCurrentMonth());
const items = ref<number[]>(new Array(xAxisData.value.length).fill(0));

const initChart = () => {
  const chart = echarts.init(chartRef.value);
  chart.setOption({
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "2%",
      left: "7%",
      right: "4%",
      bottom: "7%",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData.value,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: [
      {
        data: items.value,
        type: "line",
      },
    ],
  });
  window.addEventListener(
    "resize",
    () => {
      chart.resize();
    },
    false
  );
};

function getDaysInCurrentMonth(): string[] {
  // 获取当前日期
  const now = new Date();
  // 获取当前年的当前月
  const year = now.getFullYear();
  const month = now.getMonth(); // 注意：月份是从0开始的
  // 获取当前月的天数
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // 创建一个数组，存储当月的所有日期
  const daysArray: string[] = [];
  // 将每一天的日期写入数组
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(new Date(year, month, day).toISOString().split("T")[0]);
  }
  return daysArray;
}

const fetch = async () => {
  const { success, data } = await BFSDK.analysticsMonthOrders();
  if (!success) {
    items.value = new Array(getDaysInCurrentMonth().length).fill(0);
    return;
  }

  if (data && data.length) {
    // Reset items to ensure all days are covered
    items.value = new Array(xAxisData.value.length).fill(0);
    data.forEach((item) => {
      const idx = xAxisData.value.findIndex((date) => date === item.day);
      if (idx >= 0) {
        items.value[idx] = item.payAmount / 100;
      }
    });
  } else {
    items.value = new Array(getDaysInCurrentMonth().length).fill(0);
  }
};

onMounted(async () => {
  await fetch();
  initChart();
});
</script>
