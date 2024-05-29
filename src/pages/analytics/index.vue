<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn prepend-icon="mdi-fullscreen" size="small" variant="tonal"
            >全屏</v-btn
          >
        </AppBreadcrumb>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-toolbar color="transparent" density="compact">
          <AppDatePicker @change="onDateChange" />
          <v-spacer />
          <v-checkbox hide-details density="compact" class="me-3">
            <template v-slot:label>
              <div class="text-caption">60秒刷新一次</div>
            </template>
          </v-checkbox>
          <v-btn
            disabled
            size="small"
            variant="elevated"
            prepend-icon="mdi-finance"
            >自定义分析</v-btn
          >
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="6">
        <ChartDailySale />
      </v-col>
      <v-col cols="12" md="6">
        <ChartMonthSale />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const onDateChange = (e: any) => {
  console.log(e);
};
</script>

<route lang="yaml">
meta:
  title: "数据分析"
  breadcrumb: "数据分析"
</route>
