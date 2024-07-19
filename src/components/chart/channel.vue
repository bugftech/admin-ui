<template>
  <v-card>
    <v-card-item>
      <v-card-title class="text-subtitle-2"> 扫码次数 </v-card-title>
      <v-card-subtitle class="text-caption">
        <v-chip color="blue-grey" size="x-small">微信小程序扫码统计</v-chip>
      </v-card-subtitle>
      <template v-slot:append>
        <v-btn
          :loading="loading"
          size="small"
          icon="mdi-check"
          variant="text"
        ></v-btn>
      </template>
    </v-card-item>
    <v-card-text style="height: 300px">
      <PolarArea :data="data" :options="options" :key="diff" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "vue-chartjs";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const loading = ref(true);

const data = reactive({
  labels: ["小红书", "渠道扫码", "小程序搜索", "腾讯广告"],
  datasets: [
    {
      label: "扫码次数",
      backgroundColor: ["#3F51B5", "#673AB7", "#2196F3", "#009688"],
      data: [0, 0, 0, 0],
    },
  ],
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

// 计算从早上8点到现在的分钟数
function getMinutesSince8AM() {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    0,
    0
  );
  const diffInMinutes = Math.floor(
    (now.getTime() - startOfToday.getTime()) / 60000
  );
  return Math.max(diffInMinutes, 0); // 确保不为负值
}

const diff = ref(new Date().getTime())
// 模拟数据更新
function updateData() {
  loading.value = true;
  const minutesSince8AM = getMinutesSince8AM();
  const scansPerMinute = 5 / 600; // 每分钟大约生成的扫码次数

  // 基础值设定广告投放占比较大
  const baseValues = [0.5, 0.5, 1, 3];
  const newData = baseValues.map((value) =>
    Math.round(minutesSince8AM * scansPerMinute * value * (0.5 + Math.random()))
  );

  data.datasets[0].data = data.datasets[0].data.map((value, index) =>
    value + newData[index]
  );

  diff.value = new Date().getTime()
  loading.value = false;
}

// 在组件挂载后每分钟更新数据
onMounted(() => {
  loading.value = false;
  updateData();
  setInterval(updateData, 60000);
});
</script>
