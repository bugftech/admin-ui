<template>
  <v-card height="400">
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-caption font-weight-bold">
        当日销售额
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
let echart = echarts;
const chartRef = ref();

const xAxisData = ref(generate24Hours());
const items = ref<any[]>([]);

const initChart = () => {
  let chart = echart.init(chartRef.value);
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

function generate24Hours(): string[] {
  const hoursArray: string[] = [];

  for (let i = 0; i < 24; i++) {
    const hourString = i + "时";
    hoursArray.push(hourString);
  }

  return hoursArray;
}

const fetch = async () => {
  const { success, data } = await BFSDK.analysticsDailyOrders();
  if (!success) {
    items.value = new Array(24).fill(0);
    return;
  }

  if (data && data.length) {
    items.value = data
  } else {
    items.value = new Array(24).fill(0);
  }
};




onMounted(async () => {
  await fetch()
  initChart();
});
</script>
