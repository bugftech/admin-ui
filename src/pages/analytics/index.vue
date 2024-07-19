<template>
  <v-card height="200px" color="indigo" rounded="0" variant="flat">
    <v-card-item class="mt-4">
      <v-card-subtitle class="text-subtitle-2">
        当月交易流水（线上+线下）
      </v-card-subtitle>
      <v-card-title class="text-h5">
        ¥ 41028.00
        <v-chip prepend-icon="mdi-alert" size="x-small" color="orange"
          >交易流水隔天刷新</v-chip
        >
      </v-card-title>

      <template v-slot:append>
        <div class="text-subtitle-1 font-weight-medium">
          <v-icon start>mdi-trending-up</v-icon> 增长率: + 157%
        </div>
      </template>
    </v-card-item>
  </v-card>
  <v-container style="margin-top: -100px">
    <v-row>
      <v-col cols="12" md="3" v-for="(item, i) in totalItems" :key="i">
        <v-card>
          <v-card-item>
            <v-card-title class="text-subtitle-2">
              {{ item.title }}
            </v-card-title>
            <v-card-subtitle class="text-caption">
              <v-chip color="blue-grey" size="x-small"
                >上次更新: 1分钟以前</v-chip
              >
            </v-card-subtitle>
          </v-card-item>

          <v-card-item>
            <v-card-title> {{ item.value }} </v-card-title>
          </v-card-item>
          <v-card-item>
            <template v-slot:prepend>
              <div class="text-caption">
                <v-icon :color="item.up ? 'green' : 'red'" start>{{
                  item.up ? "mdi-trending-up" : "mdi-trending-down"
                }}</v-icon>
                <span :class="item.up ? 'text-green' : 'text-red'">
                  {{ item.growth }}</span
                >
              </div>
            </template>
            <v-card-subtitle class="text-caption"> 对比昨天 </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <ChartOrder />
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-item>
            <v-card-title class="text-subtitle-2"> 热门商品 </v-card-title>
            <v-card-subtitle class="text-caption">
              历史销售商品TOP5
            </v-card-subtitle>
          </v-card-item>
          <v-card-text style="height: 300px" class="px-0">
            <v-list three-line bg-color="transparent">
              <v-list-item v-for="(item, i) in topProducts" :key="i">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="item.icon"></v-img>
                  </v-avatar>
                </template>

                <v-list-item-title class="text-caption"
                  >{{ item.title }}
                </v-list-item-title>
                <template v-slot:append>
                  <div class="text-caption v-label">
                    上月销售: {{ item.sales }}
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-item>
            <v-card-title class="text-subtitle-2">
              近7天的注册人数
            </v-card-title>
            <v-card-subtitle class="text-caption">
              <v-chip color="blue-grey" size="x-small">上次更新: 一天前</v-chip>
            </v-card-subtitle>
            <template v-slot:append>
              <v-icon color="green">mdi-trending-up</v-icon>
              <div class="text-caption text-green ml-2">200%</div>
            </template>
          </v-card-item>
          <v-card-text style="height: 300px" class="px-0">
            <Line :data="registerData" :options="registerOptions"></Line>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <ChartChannel />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const tab = ref(null);
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
import { registerOptions, registerData } from "./registerData.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const totalItems: any[] = [
  {
    icon: "mdi-store",
    title: "今日销售金额(Total Sales)",
    subtitle: "当天已完成的订单成交额",
    growth: "+15.6%",
    up: true,
    value: "¥ 2816.00",
  },
  {
    icon: "",
    title: "今日订单(Daily Orders)",
    subtitle: "当天已完成的订单成交额",
    growth: "+100%",
    up: true,
    value: "4",
  },
  {
    icon: "",
    title: "今日UV(Daily User Views)",
    subtitle: "当天已完成的订单成交额",
    growth: "-158%",
    up: false,
    value: "102",
  },
  {
    icon: "",
    title: "今日成交金额(Compelted Orders)",
    subtitle: "当天已完成的订单成交额",
    growth: "+120%",
    up: false,
    value: "596元",
  },
];

const topProducts = [
  {
    icon: "https://test-1308806451.cos.ap-shanghai.myqcloud.com/tmpl/sku-三小时陪诊.png",
    sales: 25,
    title: "三小时陪诊",
  },
  {
    icon: "https://test-1308806451.cos.ap-shanghai.myqcloud.com/tmpl/sku-八小时陪诊.png",
    sales: 18,
    title: "全天陪诊",
  },
  {
    icon: "https://test-1308806451.cos.ap-shanghai.myqcloud.com/tmpl/sku-陪诊续时1.png",
    sales: 12,
    title: "陪诊续时",
  },
  {
    icon: "https://test-1308806451.cos.ap-shanghai.myqcloud.com/tmpl/sku-%E8%BE%85%E5%8A%A9%E7%BA%A6%E5%8F%B7.png",
    sales: 8,
    title: "辅助约号",
  },
  {
    icon: "https://test-1308806451.cos.ap-shanghai.myqcloud.com/tmpl/sku-代取切片报告.png",
    sales: 5,
    title: "代取切片/报告",
  },
];
</script>

<route lang="yaml">
meta:
  title: "数据分析"
  breadcrumb: "数据分析"
</route>
