<template>
  <v-card height="400">
    <v-card-title class="text-subtitle-2 d-flex align-center">
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <div v-bind="props" :class="isHovering ? 'text-indigo' : undefined" >
            <v-icon start class="mb-1">mdi-account-circle</v-icon>客户
          </div>
        </template>
      </v-hover>
      <v-divider vertical class="ma-2" /><span class="text-disabled ml-2"
        >用户注册趋势</span
      >
    </v-card-title>
    <v-card-text>
      <div
        ref="chartRef"
        style="font-family: unset !important; color: black; height: 300px"
      ></div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
let echart = echarts;
const chartRef = ref();

const initChart = () => {
  let chart = echart.init(chartRef.value);
  chart.setOption({
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "7%",
      left: "7%",
      right: "4%",
      bottom: "7%",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["3月20", "3月21", "3月22", "3月23", "3月24", "3月25", "3月26"],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: [
      {
        name: "小程序0",
        type: "line",
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
      },
      {
        name: "小程序1",
        type: "line",
        data: [8, 0, 2, 5, 8, 2, 2],
        markPoint: {
          data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [
            { type: "average", name: "Avg" },
            [
              {
                symbol: "none",
                x: "90%",
                yAxis: "max",
              },
              {
                symbol: "circle",
                label: {
                  position: "start",
                  formatter: "Max",
                },
                type: "max",
                name: "最高点",
              },
            ],
          ],
        },
      },
      {
        name: "小程序三",
        type: "line",
        data: [3, 2, 5, 1, 3, 8, 0],
        markPoint: {
          data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [
            { type: "average", name: "Avg" },
            [
              {
                symbol: "none",
                x: "90%",
                yAxis: "max",
              },
              {
                symbol: "circle",
                label: {
                  position: "start",
                  formatter: "Max",
                },
                type: "max",
                name: "最高点",
              },
            ],
          ],
        },
      },
      {
        name: "小程序4",
        type: "line",
        data: [1, 6, 2, 5, 3, 2, 1],
        markPoint: {
          data: [{ name: "周最低", value: 1, xAxis: 1, yAxis: 2 }],
        },
        markLine: {
          data: [
            { type: "average", name: "Avg" },
            [
              {
                symbol: "none",
                x: "90%",
                yAxis: "max",
              },
              {
                symbol: "circle",
                label: {
                  position: "start",
                  formatter: "Max",
                },
                type: "max",
                name: "最高点",
              },
            ],
          ],
        },
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

onMounted(() => {
  initChart();
});
</script>
