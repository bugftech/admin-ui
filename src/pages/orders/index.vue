<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn
            variant="elevated"
            prepend-icon="mdi-download-circle-outline"
            size="small"
            class="me-2"
          >
            下载CSV
          </v-btn>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                variant="elevated"
                prepend-icon="mdi-dots-horizontal-circle-outline"
                v-bind="props"
                size="small"
              >
                更多的操作
              </v-btn>
            </template>
            <v-list> </v-list>
          </v-menu>
        </AppBreadcrumb>
        <v-card class="my-4">
          <v-row noGutters class="align-center justify-center">
            <v-col cols="12" md="2" xs="3">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-sheet
                    v-bind="props"
                    :color="isHovering ? '#ebebeb' : undefined"
                    class="d-flex align-center justify-center ma-2"
                    rounded="lg"
                    height="52"
                  >
                    <div
                      class="d-flex align-center justify-center text-subtitle-2"
                    >
                      <v-icon>mdi-calendar-range</v-icon
                      ><span class="ml-2">今天</span>
                    </div>
                  </v-sheet>
                </template>
              </v-hover>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="12" md="2" xs="3">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-sheet
                    v-bind="props"
                    :color="isHovering ? '#ebebeb' : undefined"
                    class="ma-2 d-flex justify-space-between flex-column py-2 px-4"
                    rounded="lg"
                    height="64"
                  >
                    <div class="text-caption v-label">总订单数</div>
                    <div class="text-h6">{{ total }}</div>
                  </v-sheet>
                </template>
              </v-hover>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="12" md="2" xs="3">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-sheet
                    v-bind="props"
                    :color="isHovering ? '#ebebeb' : undefined"
                    class="ma-2 d-flex justify-space-between flex-column py-2 px-4"
                    rounded="lg"
                    height="64"
                  >
                    <div class="text-caption v-label">已发货</div>
                    <div class="text-h6">{{ shipped }}</div>
                  </v-sheet>
                </template>
              </v-hover>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="12" md="2" xs="3">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-sheet
                    v-bind="props"
                    :color="isHovering ? '#ebebeb' : undefined"
                    class="ma-2 d-flex justify-space-between flex-column py-2 px-4"
                    rounded="lg"
                    height="64"
                  >
                    <div class="text-caption v-label">已完成</div>
                    <div class="text-h6">{{ completed }}</div>
                  </v-sheet>
                </template>
              </v-hover>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="12" md="4">
              <v-sparkline
                fill
                height="52"
                smooth
                :gradient="['#f72047', '#ffd200', '#1feaea']"
                auto-draw
                :labels="labels"
                :model-value="value"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-col>
          </v-row>
        </v-card>
        <!--工具栏-->
        <OrderDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useOrderStore } from "@/store/orders";
import { storeToRefs } from "pinia";

const labels = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
const value = [200, 675, 410, 390, 310, 460, 250, 240];
const order = useOrderStore();

const { total, shipped, completed } = storeToRefs(order);

onMounted(async () => {
  const { success, data } = await order.fetch();
  if (!success) {
    console.log("failed to get orders");
  }
});
</script>

<route lang="yaml">
name: "orders"
meta:
  breadcrumb: "订单"
</route>
