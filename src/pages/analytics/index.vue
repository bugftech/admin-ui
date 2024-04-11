<template>
  <v-container fluid>
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
          <v-btn size="small" variant="elevated" prepend-icon="mdi-calendar"
            >今天</v-btn
          >
          <v-spacer />
          <v-checkbox hide-details density="compact" class="me-3">
            <template v-slot:label>
              <div class="text-caption">60秒刷新一次</div>
            </template>
          </v-checkbox>
          <v-btn
            size="small"
            variant="elevated"
            prepend-icon="mdi-finance"
            >自定义分析</v-btn
          >
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="400">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-caption"> 总销售额度 </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="400">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-caption">
              按渠道显示销售额
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="400">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-caption">
              在线商店访问
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="400">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-caption"> 总销售额度 </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="400">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-caption">
              在线商店转化率
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="400">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-caption"> 总订单数 </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="400">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-caption"> 畅销产品 </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="400">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-caption">
              客户群体分析
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  title: "数据分析"
  breadcrumb: "数据分析"
</route>
